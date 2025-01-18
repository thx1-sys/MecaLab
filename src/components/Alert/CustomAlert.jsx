import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CloseIcon from "../svg/CloseIcon";

const colorMap = {
  info: {
    container: "text-blue-800 bg-blue-50 dark:bg-gray-800 dark:text-blue-400",
  },
  danger: {
    container: "text-red-800 bg-red-50 dark:bg-gray-800 dark:text-red-400",
  },
  success: {
    container: "text-[#16C47F] bg-green-50",
  },
  warning: {
    container:
      "text-yellow-800 bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300",
  },
  dark: {
    container: "bg-gray-50 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
  },
};

function CustomAlert({ type = "info", icon, title, message, onDismiss }) {
  const [isVisible, setIsVisible] = useState(true);
  const color = colorMap[type] || colorMap.info;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onDismiss, 500); // Delay to allow exit animation
    }, 15000); // 15 seconds

    return () => clearTimeout(timer);
  }, [onDismiss]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onDismiss, 500); // Delay to allow exit animation
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className={`p-4 border border-white rounded-lg ${color.container} form-style`}
          role="alert"
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              {icon && <span className="mr-2">{icon}</span>}
              <h3 className="text-lg font-medium">{title}</h3>
            </div>
            <button onClick={handleClose} className="ml-4">
              <CloseIcon className="h-4 w-4 svg-icon text-white opacity-60 hover:opacity-100 transform translate duration-500" />
            </button>
          </div>
          <div className="mt-2 mb-2 text-sm text-white">{message}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default CustomAlert;
