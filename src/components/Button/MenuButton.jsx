import React from "react";

const MenuButton = ({ label, onClick, icon: IconComponent }) => (
  <button
    onClick={onClick}
    className="mt-2 p-2 bg-blue-500 text-white rounded w-full flex items-center justify-center gap-2"
  >
    <IconComponent className="w-5 h-5" />
    {label}
  </button>
);

export default MenuButton;
