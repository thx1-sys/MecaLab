import React from "react";

const ButtonDashboard = ({ children }) => {
  return (
    <button className="px-4 py-2 border-[#0B192C] text-sm text-[#0B192C] border rounded-xl transform transition duration-500 hover:scale-105 hover:bg-[#0B192C] hover:text-white hover:shadow-lg">
      {children}
    </button>
  );
};

export default ButtonDashboard;
