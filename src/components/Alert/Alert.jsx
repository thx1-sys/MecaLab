import React from "react";
import { motion } from "framer-motion";

const Alert = ({ message }) => {
  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -50, opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="absolute w-full top-4 left-0 right-0 z-50 flex justify-center items-center"
      role="alert"
    >
      <div className="flex items-center py-4 px-10 mb-4 text-sm lg:text-lg text-red-500 rounded-lg bg-white">
        <svg
          className="flex-shrink-0 inline w-4 h-4 mr-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
        </svg>
        <span className="sr-only">Info</span>
        <div className="text-md">
          <span className="font-bold">Error:</span> {message}
        </div>
      </div>
    </motion.div>
  );
};

export default Alert;
