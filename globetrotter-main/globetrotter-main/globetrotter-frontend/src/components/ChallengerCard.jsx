import React, { useEffect, useState } from "react";
import service from "../services/service";
import toast from "react-hot-toast";

const ChallengerCard = ({ username, score }) => {
  const [loading, setLoading] = useState(true);
  const [challenger, setChallenger] = useState(null);

  useEffect(() => {
    const fetchChallenger = async () => {
      setLoading(true);
      try {
        const res = await service.getUser(username);
        if (res) {
          setChallenger(res.data);
        }
      } catch (error) {
        console.error("Error fetching challenger:", error.message);
      }
      setLoading(false);
    };

    fetchChallenger();
  }, [username]);

  useEffect(() => {
    if (score >= challenger?.score) {
      toast.success("You won the challenge!🥳🎉🎊");
    }
  }, [score]);

  return (
    <>
      <div className="absolute top-65 right-6">
        {loading ? (
          <p>Loading...</p>
        ) : challenger ? (
          <div className="w-64 bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 transition-all hover:shadow-2xl">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
              Challenger
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              <span className="font-medium">Username:</span>{" "}
              {challenger.username}
            </p>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              <span className="font-medium">Score:</span> {challenger.score}
            </p>
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">
            No challenger found
          </p>
        )}
      </div>
    </>
  );
};

export default ChallengerCard;
