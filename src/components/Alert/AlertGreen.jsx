import React from "react";

const AlertGreen = ({ message }) => {
  return (
    <div
      className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50 flex items-center py-4 px-10 mb-4 text-sm text-green-800 border border-green-500 rounded-lg bg-black/90 slide-down"
      role="alert"
    >
      <svg
        className="flex-shrink-0 inline w-4 h-4 me-3 text-green-500"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M16.707 5.293a1 1 0 0 0-1.414 0L9 11.586 6.707 9.293a1 1 0 1 0-1.414 1.414l3 3a1 1 0 0 0 1.414 0l7-7a1 1 0 0 0 0-1.414Z" />
      </svg>
      <span className="sr-only">Success</span>
      <div>
        <span className="font-medium">Éxito:</span> {message}
      </div>
    </div>
  );
};

export default AlertGreen;
