import React from "react";

const Home = ({ onPlay }) => {
  return (
    <div className="flex flex-col items-center space-y-8 mt-10">
      <img src="/city.svg" alt="city" className="w-[500px]" />
      <p className="text-xl text-white font-medium">Guess the destination from the clues!</p>
      <button
        onClick={onPlay}
        className="px-12 py-2 bg-blue-600 text-white hover:bg-blue-800 transition-colors duration-300 rounded-xl text-2xl cursor-pointer"
      >
        Play
      </button>
    </div>
  );
};

export default Home;
