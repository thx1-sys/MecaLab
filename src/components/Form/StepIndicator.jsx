import React from "react";
import { motion } from "framer-motion";

const StepIndicator = ({ currentStep, stepNumber, label }) => {
  const isActive = currentStep >= stepNumber;
  const isCompleted = currentStep > stepNumber;

  return (
    <li
      className={`step-indicator flex flex-col items-center w-full ${
        isActive ? "text-white opacity-100" : "text-gray-500 opacity-50"
      }`}
    >
      <motion.span
        className="flex items-center mb-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {isCompleted && (
          <svg
            className="h-4 w-4 mr-2 svg-icon text-white opacity-60 hover:opacity-100 transform translate duration-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
          </svg>
        )}
        {label}
      </motion.span>
      <div className="flex-1 w-full h-1 border-b border-white dark:border-gray-500"></div>
    </li>
  );
};

export default StepIndicator;
