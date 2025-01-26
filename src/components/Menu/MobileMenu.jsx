import React from "react";
import { motion } from "framer-motion";

const MobileMenu = ({
  isMenuOpen,
  setIsMenuOpen,
  filteredMenuItems,
  activeContent,
  setActiveContent,
}) => {
  if (!isMenuOpen) return null;
  return (
    <motion.div
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-90 z-50 flex flex-col items-center justify-center space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <button
        className="absolute top-4 right-4 text-white focus:outline-none"
        onClick={() => setIsMenuOpen(false)}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
      <div className="flex justify-center">
        <ul className="flex flex-col space-y-6 pb-4 text-center">
          {filteredMenuItems.map(({ key, icon: IconComponent, label }) => (
            <li key={key}>
              <button
                className={`text-2xl text-white/60 flex items-center justify-center gap-2 ${
                  activeContent === key ? "text-white/100" : ""
                }`}
                onClick={() => {
                  setActiveContent(key);
                  setIsMenuOpen(false);
                }}
              >
                <IconComponent className="w-6 h-6" />
                {label}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col space-y-4 w-2/3">
        <button
          className="border w-full px-4 py-2 rounded-lg text-white hover:bg-red-500 hover:scale-105 hover:border-red-500 transform transition duration-500 btn-shadow-rose"
          onClick={() => setIsMenuOpen(false)}
        >
          Cerrar Sesión
        </button>
      </div>
    </motion.div>
  );
};

export default MobileMenu;
