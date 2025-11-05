// src/pages/ambassador.js
import React, { useState, useEffect } from "react";

const Ambassador = () => {
  const [progress, setProgress] = useState(40);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 10 : prev));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-semibold mb-4 text-gray-800">
        Ambassador Path
      </h1>

      <div className="bg-white p-6 rounded-2xl shadow-md max-w-lg">
        <p className="text-gray-600 mb-4">
          Complete your journey to become a certified ambassador.
        </p>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
          <div
            className="bg-blue-500 h-4 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-sm text-gray-700 font-medium">
          Progress: {progress}%
        </p>
      </div>
    </div>
  );
};

export default Ambassador;
