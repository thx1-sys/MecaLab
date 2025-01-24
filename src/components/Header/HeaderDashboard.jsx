import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaSignOutAlt, FaCogs, FaBox, FaBars } from "react-icons/fa";
import HomeIcon from "./Icons/HomeIcon";
import MailIcon from "./Icons/MailIcon";
import GraphIcon from "./Icons/GraphIcon";
import UsersIcon from "./Icons/UsersIcon";
import SidebarCloseIcon from "./Icons/SidebarCloseIcon";
import SidebarOpenIcon from "./Icons/SidebarOpenIcon";
import SearchIcon from "./Icons/SearchIcon";
import NotificationIcon from "./Icons/NotificationIcon";
import SettingsIcon from "./Icons/SettingsIcon";
import { fetchUser } from "../../services/userService";
import UserImage from "../../assets/Img/Photo_Example_User.webp"; // Asegúrate de que la ruta sea correcta

const menuItems = [
  { key: "home", icon: HomeIcon, label: "Inicio" },
  { key: "requests", icon: MailIcon, label: "Solicitudes" },
  { key: "report", icon: GraphIcon, label: "Reportes" },
  { key: "machines", icon: FaCogs, label: "Máquinas" },
  { key: "materials", icon: FaBox, label: "Materiales" },
  { key: "users", icon: UsersIcon, label: "Usuarios" },
  { key: "settings", icon: SettingsIcon, label: "Ajustes" },
];

const MenuButton = ({ label, onClick, icon: IconComponent }) => (
  <button
    onClick={onClick}
    className="mt-2 p-2 bg-blue-500 text-white rounded w-full flex items-center justify-center gap-2"
  >
    <IconComponent className="w-5 h-5" />
    {label}
  </button>
);

const HeaderDashboard = ({
  toggleSidebar,
  isSidebarOpen,
  setActiveContent,
  activeContent,
}) => {
  const [username, setUsername] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState(UserImage);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getUserData = async () => {
      const userData = await fetchUser();
      if (userData) {
        setUsername(userData.username);
        setProfileImageUrl(userData.profileImageUrl || UserImage);
      }
    };

    getUserData();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredMenuItems = menuItems.filter((item) =>
    item.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <header className="flex justify-between items-center bg-white w-full p-4 md:p-6">
      <div className="flex items-center">
        <button
          onClick={toggleMenu}
          className="p-2 rounded transition-colors duration-300 hover:bg-gray-100 md:hidden"
        >
          <FaBars className="w-6 h-6" />
        </button>
        <div className="hidden md:flex items-center">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded mr-4 transition-colors duration-300 hover:bg-gray-100"
          >
            {isSidebarOpen ? <SidebarOpenIcon /> : <SidebarCloseIcon />}
          </button>
          <div>
            <h1 className="text-lg md:text-xl font-bold">Dashboard</h1>
            <h2 className="text-md md:text-lg">Inicio</h2>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="hidden md:flex items-center space-x-4">
          {/* <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#131010]/40">
              <SearchIcon />
            </span>
            <input
              type="text"
              placeholder="Buscar algo..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="p-2 pl-10 border rounded-lg bg-[#D9D9D9]/40 text-black placeholder-gray-400 text-sm w-64"
            />
          </div> */}
          <div className="flex items-center space-x-1">
            <button className="p-2 rounded transition-colors duration-300 hover:bg-gray-100">
              <NotificationIcon className="text-gray-500" />
            </button>
            <button className="p-2 rounded transition-colors duration-300 hover:bg-gray-100">
              <MailIcon className="text-gray-500" />
            </button>
          </div>
          <div className="flex flex-col items-end mr-2">
            <span className="text-sm font-medium">{username}</span>
            <span className="text-xs text-gray-500">Admin</span>
          </div>
        </div>
        <img
          src={profileImageUrl}
          alt="Profile"
          className="w-10 h-10 md:w-12 md:h-12 rounded-full"
        />
      </div>
      {isMenuOpen && (
        <motion.div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-90 z-50 flex flex-col items-center justify-center space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {/* Botón para cerrar menú */}
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

          {/* Links centrados */}
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

          {/* Botones de sesión */}
          <div className="flex flex-col space-y-4 w-2/3">
            <button
              className="border w-full px-4 py-2 rounded-lg text-white hover:bg-red-500 hover:scale-105 hover:border-red-500 transform transition duration-500 btn-shadow-rose"
              onClick={() => setIsMenuOpen(false)}
            >
              Cerrar Sesión
            </button>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default HeaderDashboard;
