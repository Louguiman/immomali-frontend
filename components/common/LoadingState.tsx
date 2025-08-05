import React from "react";
import { FaSpinner } from "react-icons/fa";

interface LoadingStateProps {
  message?: string;
  className?: string;
  fullScreen?: boolean;
}

const LoadingState: React.FC<LoadingStateProps> = ({
  message = "Loading...",
  className = "",
  fullScreen = false,
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center ${
        fullScreen ? "min-h-screen" : "py-8"
      } ${className}`}
      role="status"
      aria-live="polite"
    >
      <FaSpinner className="animate-spin text-4xl text-primary mb-4" />
      <p className="text-lg text-center text-gray-700 font-medium">{message}</p>
    </div>
  );
};

export default LoadingState;
