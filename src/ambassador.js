import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./App.css";

const Ambassador = () => {
  const [steps, setSteps] = useState([
    { id: 1, label: "Apply", completed: true },
    { id: 2, label: "Onboarding", completed: false },
    { id: 3, label: "Training", completed: false },
    { id: 4, label: "Active Ambassador", completed: false },
  ]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const completedCount = steps.filter((s) => s.completed).length;
    setProgress(Math.round((completedCount / steps.length) * 100));
  }, [steps]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Ambassador Path</h1>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
        <motion.div
          className="bg-green-600 h-2 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        ></motion.div>
      </div>

      {/* Grid of Steps */}
      <div className="grid grid-cols-1 sm:gri
