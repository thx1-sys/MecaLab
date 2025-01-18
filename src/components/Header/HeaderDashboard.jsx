import React from "react";
import SidebarOpenIcon from "./Icons/SidebarOpenIcon";
import UserImage from "../../assets/Img/Photo_Example_User.webp";
import SidebarCloseIcon from "./Icons/SidebarCloseIcon";
import SearchIcon from "./Icons/SearchIcon";
import NotificationIcon from "./Icons/NotificationIcon";
import MailIcon from "./Icons/MailIcon";

const HeaderDashboard = ({ toggleSidebar, isSidebarOpen }) => {
  return (
    <header className="flex justify-between items-center bg-white w-full p-6">
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded mr-4 transition-colors duration-300 hover:bg-gray-100"
        >
          {isSidebarOpen ? <SidebarOpenIcon /> : <SidebarCloseIcon />}
        </button>
        <div>
          <h1 className="text-xl font-bold">Dashboard</h1>
          <h2 className="text-lg">Inicio</h2>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#131010]/40">
            <SearchIcon />
          </span>
          <input
            type="text"
            placeholder="Buscar algo..."
            className="p-2 pl-10 border rounded-lg bg-[#D9D9D9]/40 text-black placeholder-gray-400 text-sm w-64"
          />
        </div>
        <div className="flex items-center space-x-1">
          <button className="p-2 rounded transition-colors duration-300 hover:bg-gray-100">
            <NotificationIcon className="text-gray-500" />
          </button>
          <button className="p-2 rounded transition-colors duration-300 hover:bg-gray-100">
            <MailIcon className="text-gray-500" />
          </button>
        </div>
        <div className="flex flex-col items-end mr-2">
          <span className="text-sm font-medium">Nombre</span>
          <span className="text-xs text-gray-500">Admin</span>
        </div>
        <img src={UserImage} alt="Profile" className="w-12 h-12 rounded-full" />
      </div>
    </header>
  );
};

export default HeaderDashboard;
