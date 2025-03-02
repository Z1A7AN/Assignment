import { useEffect, useState } from "react";
import service from "../services/service";
import ConfettiAnimation from "../components/ConfettiAnimation";
import Timer from "../components/Timer";

const Game = ({ updateScore, onRestart }) => {
  const [destination, setDestination] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(15);

  useEffect(() => {
    fetchDestination();
  }, []);

  const fetchDestination = async () => {
    setLoading(true);
    setFeedback(null);
    setSelectedOption("");
    setTimeLeft(15);
    try {
      const res = await service.getRandomDestination();
      if (res.success) {
        setDestination(res.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Stop timer when time is up
  useEffect(() => {
    if (timeLeft <= 0 && !feedback) {
      setFeedback({
        type: "timeout",
        message: "Time's up! No answer was selected.",
      });
      updateScore(false);
    }
  }, [timeLeft, feedback, updateScore]);

  const handleSubmit = async () => {
    if (!selectedOption) return;
    try {
      const res = await service.validateAnswer(
        destination.token,
        selectedOption
      );
      if (res.data.correct) {
        setFeedback({
          city: res.data.city,
          country: res.data.country,
          type: "correct",
          message: "Correct answer! 🎉, that's what I am talking about",
          fact: res.data.fact,
        });
        updateScore(true);
      } else {
        setFeedback({
          city: res.data.city,
          country: res.data.country,
          fact: res.data.fact,
          type: "incorrect",
          message:
            "Noo !!! This is a wrong answer, why would you choose that 😭",
        });
        updateScore(false);
      }
    } catch (error) {
      console.error(error);
    }
    setTimeLeft(0);
  };

  const handlePlayAgain = () => {
    fetchDestination();
  };

  if (loading) {
    return (
      <div className="text-2xl text-white text-center mt-8">Loading...</div>
    );
  }

  if (!destination) {
    return (
      <div className="w-[600px] h-[400px] mx-auto p-8 bg-white rounded-xl shadow-lg flex flex-col items-center justify-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Opps!!, No Destination Available
        </h2>
        <img
          src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZnQxanNsem5kZGM5aGczZHA3N2UxbWE0ZzlhaHNtaXM4bW5vd2tvYyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/xUStFKHmuFPYk/giphy.gif"
          alt="No Destination Available"
          className="mb-4 max-w-[400px] rounded-md"
        />
        <button
          onClick={fetchDestination}
          className="px-8 py-1 bg-blue-500 hover:bg-blue-600 transition-colors rounded-full text-xl cursor-pointer text-white font-medium"
        >
          Reload
        </button>
      </div>
    );
  }

  return (
    <div className="w-[600px] mx-auto p-8 bg-white rounded-xl shadow-lg overflow-auto">
      {feedback && feedback.type === "correct" && (
        <ConfettiAnimation duration={5000} />
      )}
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-2xl font-semibold text-gray-800">
          Can you guess the city?
        </h3>
        <Timer timeLeft={timeLeft} setTimeLeft={setTimeLeft} />
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-medium text-gray-800 mb-2">Clues:</h2>
        <ul className="list-disc pl-5 text-gray-700 space-y-1">
          {destination.clues.map((clue, index) => (
            <li key={index} className="text-base">
              {clue}
            </li>
          ))}
        </ul>
      </div>
      {!feedback ? (
        <>
          <div className="mb-6">
            <h2 className="text-xl font-medium text-gray-800 mb-2">Options:</h2>
            <div className="grid grid-cols-2 gap-4">
              {destination.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedOption(option)}
                  className={`px-4 py-2 rounded-full border cursor-pointer transition-colors duration-300 ${
                    selectedOption === option
                      ? "bg-blue-500 text-white border-blue-500"
                      : "bg-transparent text-gray-800 border-gray-300 hover:bg-blue-50"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={handleSubmit}
            className="w-full py-3 bg-blue-500 hover:bg-blue-600 transition-colors rounded-full text-xl cursor-pointer text-white font-medium"
          >
            Submit Answer
          </button>
        </>
      ) : (
        <div className="mt-6 flex flex-col items-center justify-center text-center">
          <p className="text-sm text-gray-800 text-center mb-4">{feedback.message}</p>
          {feedback.type !== "timeout" && <p>
            <span className="font-semibold text-xl text-gray-800">Answer:</span>{" "}
            <span className="font-semibold text-xl text-blue-500">
              {feedback.city}, {feedback.country}
            </span>
          </p>}
          {feedback.fact && (
            <p className="text-xl text-center text-gray-700 mb-2 max-w-[400px]">
              Fun Fact: {feedback.fact}
            </p>
          )}
          {feedback.type === "correct" && (
            <div className="mb-4">
              <img
                src="/correct.gif"
                alt="Funky Correct Animation"
                className="mx-auto rounded-md w-[200px]"
              />
            </div>
          )}
          {feedback.type === "incorrect" && (
            <div className="mb-4">
              <img
                src="/incorrect.gif"
                alt="Funky Sad Animation"
                className="mx-auto rounded-md w-[200px]"
              />
            </div>
          )}
          {feedback.type === "timeout" && (
            <div className="mb-4">
              <img
                src="/timeout.gif"
                alt="Funky Timeout Animation"
                className="mx-auto rounded-md w-[200px]"
              />
            </div>
          )}
          <div className="flex justify-between items-center gap-3">
            <button
              onClick={handlePlayAgain}
              className="px-6 py-3 bg-green-500 hover:bg-green-600 transition-colors rounded-full text-lg text-white cursor-pointer font-medium"
            >
              Play Again
            </button>
            <button
              onClick={onRestart}
              className="px-6 py-3 bg-red-500 hover:bg-red-600 transition-colors rounded-full text-lg text-white cursor-pointer font-medium"
            >
              Restart Game
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Game;
