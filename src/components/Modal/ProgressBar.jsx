import React from "react";
import { motion } from "framer-motion";

const ProgressBar = ({ currentStep, totalSteps }) => {
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-blue-500 z-50"
      initial={{ width: 0 }}
      animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    />
  );
};

export default ProgressBar;
