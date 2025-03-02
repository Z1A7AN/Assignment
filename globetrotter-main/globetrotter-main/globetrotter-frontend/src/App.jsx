import { useEffect, useState } from "react";
import Game from "./components/Game";
import Scoreboard from "./components/Scoreboard";
import Home from "./components/Home";
import ChallengeFriend from "./components/ChallengeFriend";
import ChallengerCard from "./components/ChallengerCard";

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [challengerUsername, setChallengerUsername] = useState("");

  const startGame = () => {
    setGameStarted(true);
  };

  const updateScore = (isCorrect) => {
    if (isCorrect) {
      setScore((prev) => ({ ...prev, correct: prev.correct + 1 }));
    } else {
      setScore((prev) => ({ ...prev, incorrect: prev.incorrect + 1 }));
    }
  };

  const resetGame = () => {
    setGameStarted(false);
    setScore({ correct: 0, incorrect: 0 });
  };

  useEffect(() => {
    const checkChallenge = () => {
      const path = window.location.pathname;
      const segments = path.split("/");
      const username = segments[segments.length - 1];
      if (username !== "") {
        setChallengerUsername(username);
      }
    };

    checkChallenge();
  }, []);

  return (
    <div className="min-h-screen select-none flex flex-col items-center p-5 bg-gradient-to-br from-sky-900 via-[#112D4E] to-indigo-900 relative overflow-hidden">
      <div className="flex gap-2">
        <img src="/travel.png" alt="travel" className="w-[45px] h-[45px]" />
        <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Globetrotter
        </h1>
      </div>
      {gameStarted && <Scoreboard score={score} />}
      {gameStarted && <ChallengeFriend score={score.correct} />}
      {gameStarted && challengerUsername && (
        <ChallengerCard username={challengerUsername} score={score.correct} />
      )}
      <div>
        {gameStarted ? (
          <div className="w-full flex mt-2 items-center">
            <Game updateScore={updateScore} onRestart={resetGame} />
          </div>
        ) : (
          <Home onPlay={startGame} />
        )}
      </div>
      <div className="absolute w-96 h-96 bg-indigo-800/30 rounded-full -top-48 -left-48 mix-blend-screen animate-blob"></div>
      <div className="absolute w-96 h-96 bg-cyan-600/20 rounded-full -top-32 -right-64 mix-blend-screen animate-blob animation-delay-2000"></div>
      <div className="text-white/50 absolute bottom-0 bg-[#112D4E] w-full text-center p-1">
        Made by Piyush Patel (piyushpatel1746@gmail.com) as part of headout
        assignment
      </div>
    </div>
  );
}

export default App;
