import React from "react";
import Icon from "../svg/Icon";

const SidebarHeader = ({ isSidebarOpen, setActiveContent, showText }) => (
  <div
    onClick={() => setActiveContent("home")}
    className={`flex items-center px-2 py-4 bg-gradient-to-r from-[#0B192C] to-[#255392] justify-center text-center text-xl rounded-tl-xl rounded-br-xl shadow-lg transition-transform duration-500 hover:scale-105 cursor-pointer`}
    style={{ transform: isSidebarOpen ? "scale(1)" : "scale(0.95)" }}
  >
    <div className="flex items-center transform transition duration-500">
      <div
        className="flex items-center transition-transform duration-500"
        style={{ transform: isSidebarOpen ? "scale(1)" : "scale(0.95)" }}
      >
        <Icon
          className={`fill-white ${isSidebarOpen ? "w-12 h-10" : "w-8 h-10"}`}
        />
        {isSidebarOpen && showText && (
          <span className="ml-2 font-bold text-white transition text-lg">
            MecaLab
          </span>
        )}
      </div>
    </div>
  </div>
);

export default SidebarHeader;
