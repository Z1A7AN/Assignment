import { useEffect } from "react";

const Timer = ({ timeLeft, setTimeLeft, totalTime = 15 }) => {
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timerId = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timerId);
  }, [timeLeft, setTimeLeft]);

  // Smaller circle settings
  const radius = 5;
  const stroke = 1;
  const normalizedRadius = radius - stroke * 0.5; // keep stroke within bounds
  const circumference = 2 * Math.PI * normalizedRadius;
  const progress = timeLeft / totalTime;
  const dashOffset = circumference * (1 - progress);

  return (
    <div className="relative w-15 h-15">
      <svg
        className="w-15 h-15 transform -rotate-90"
        viewBox={`0 0 ${radius * 2} ${radius * 2}`}
      >
        {/* Background Circle */}
        <circle
          stroke="#e5e7eb"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        {/* Progress Circle */}
        <circle
          stroke="#06b6d4"
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
        />
      </svg>
      {/* Centered Timer Text */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <span className="text-md font-semibold text-black">{timeLeft}s</span>
      </div>
    </div>
  );
};

export default Timer;
