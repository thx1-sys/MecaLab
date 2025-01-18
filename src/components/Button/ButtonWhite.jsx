import React from "react";

function ButtonWhite({ text, onClick, width = "auto", height = "auto" }) {
  return (
    <button
      className="bg-white text-primaryBlue text-2xl font-bold rounded-xl shadow opacity-80 transform transition duration-500 hover:opacity-100 hover:scale-105 hover:shadow-[0_0_15px_5px_rgba(255,255,255,0.5)]"
      style={{ width, height }}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default ButtonWhite;
