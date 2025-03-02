import React, { useState } from "react";
import service from "../services/service";
import { BiLogoWhatsapp } from "react-icons/bi";
import { FaCopy } from "react-icons/fa";

const ChallengeFriend = ({ score }) => {
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [shareLink, setShareLink] = useState("");
  const [dynamicImageUrl, setDynamicImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setUsername("");
    setIsRegistered(false);
    setShareLink("");
    setDynamicImageUrl("");
  };

  const handleSubmit = async () => {
    if (!username) return;
    setLoading(true);
    try {
      const res = await service.registerUser(username, score);
      console.log("Resoponse from challenge", res);
      if (res.success) {
        setIsRegistered(true);
        const link = `${window.location.origin}/game/challenge/${username}`;
        setShareLink(link);
        setDynamicImageUrl(res.data.imageUrl);
      } else {
        alert("Error registering your challenge. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to register challenge.");
    }
    setLoading(false);
  };

  const handleShare = async () => {
    const shareText = `🌍🚀 Join me in Globetrotter! I scored ${score}! Can you beat me? 🏆  
  🔗 Play here: ${shareLink}`;
    const imageUrl = dynamicImageUrl
      ? `🖼️ See my challenge card: ${dynamicImageUrl}`
      : "";

    // For Web Share API: Text includes both messages, URL is shareLink
    const webShareMessage = `${shareText} ${imageUrl}`;

    // For WhatsApp Fallback: Image URL comes first to generate preview
    const whatsappMessage = dynamicImageUrl
      ? `${imageUrl}\n\n${shareText}`
      : shareText;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Globetrotter Challenge",
          text: webShareMessage,
          url: shareLink,
        });
      } catch (error) {
        console.error("Error using Web Share API", error);
      }
    } else {
      const whatsappURL = `https://api.whatsapp.com/send?text=${encodeURIComponent(
        whatsappMessage
      )}`;
      window.open(whatsappURL, "_blank");
    }
  };

  return (
    <div className="flex justify-center items-center">
      <button
        onClick={handleOpenModal}
        className="px-6 py-2 absolute right-6 top-50 bg-blue-500 hover:bg-blue-600 transition-colors rounded-lg text-xl text-white font-medium cursor-pointer"
      >
        Challenge a Friend
      </button>

      {/* Modal Popup */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Modal Backdrop */}
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={handleCloseModal}
          ></div>
          {/* Modal Content */}
          <div className="relative bg-white p-8 rounded-2xl shadow-2xl max-w-sm w-full">
            <button
              onClick={handleCloseModal}
              className="absolute cursor-pointer top-3 right-3 text-gray-500 text-3xl hover:text-gray-700"
            >
              &times;
            </button>
            {!isRegistered ? (
              <div className="flex flex-col items-center">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">
                  Enter Your Username
                </h2>
                <input
                  type="text"
                  placeholder="Your unique username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:border-blue-500"
                />
                <button
                  onClick={handleSubmit}
                  disabled={!username || loading}
                  className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-colors cursor-pointer font-medium"
                >
                  {loading ? "Generating..." : "Generate Challenge Link"}
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">
                  Challenge Ready!
                </h2>
                {dynamicImageUrl && (
                  <img
                    src={dynamicImageUrl}
                    alt="Your Challenge Card"
                    className="mb-6 rounded-lg shadow-md"
                  />
                )}
                <div className="w-full bg-gray-100 p-4 rounded-lg mb-6 flex items-center justify-between">
                  <span className="text-sm text-gray-700 break-all">
                    {shareLink}
                  </span>
                  <button
                    onClick={() => navigator.clipboard.writeText(shareLink)}
                    className="text-blue-500 cursor-pointer hover:text-blue-600"
                    title="Copy Link"
                  >
                    <FaCopy className="text-2xl" />
                  </button>
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={handleShare}
                    className="flex gap-2 items-center px-4 py-3 bg-green-700 hover:bg-green-900 cursor-pointer text-white rounded-full transition-colors"
                  >
                    <BiLogoWhatsapp className="text-2xl" />
                    Share on WhatsApp
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChallengeFriend;
