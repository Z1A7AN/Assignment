import React from 'react';

const Scoreboard = ({ score }) => {
  return (
    <div className="absolute top-6 right-6 p-6 bg-gradient-to-r from-indigo-900 to-purple-900 bg-opacity-80 rounded-2xl shadow-2xl border border-gray-700 backdrop-blur-sm">
      <h4 className="text-2xl font-bold text-white mb-4">Score Board</h4>
      <div className="flex items-center gap-6">
        <div className="flex flex-col items-center">
          <span className="text-3xl font-semibold text-green-400">✅ {score.correct}</span>
          <span className="text-sm text-green-200">Correct</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-3xl font-semibold text-red-400">❌ {score.incorrect}</span>
          <span className="text-sm text-red-200">Incorrect</span>
        </div>
      </div>
    </div>
  );
};

export default Scoreboard;