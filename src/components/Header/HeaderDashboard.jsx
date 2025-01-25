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
import UserImage from "../../assets/Img/Photo_Example_User.webp";
import axios from "axios";
import Cookies from "js-cookie";
import { Modal, Dropdown, Menu } from "antd";

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
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [latestRequests, setLatestRequests] = useState([]);
  const [isProfileSettingsVisible, setIsProfileSettingsVisible] =
    useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true); // Estado para controlar la visibilidad del header

  useEffect(() => {
    const getUserData = async () => {
      const userData = await fetchUser();
      if (userData) {
        setUsername(userData.username);
        setProfileImageUrl(userData.profileImageUrl || UserImage);
      }
    };

    const fetchNotifications = async () => {
      try {
        const token = sessionStorage.getItem("token") || Cookies.get("token");
        if (!token) {
          throw new Error("Token not found");
        }

        const response = await axios.get(
          `${import.meta.env.VITE_HOST_EXPRESS}/api/notifications`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUnreadNotifications(response.data.length);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    getUserData();
    fetchNotifications();

    const interval = setInterval(fetchNotifications, 60000); // Actualiza cada 1 minuto

    return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleNotificationClick = async () => {
    try {
      const token = sessionStorage.getItem("token") || Cookies.get("token");
      if (!token) {
        throw new Error("Token not found");
      }

      const response = await axios.get(
        `${import.meta.env.VITE_HOST_EXPRESS}/api/notifications`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNotifications(response.data);
      setIsModalVisible(true);

      await axios.put(
        `${import.meta.env.VITE_HOST_EXPRESS}/api/notifications/read`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUnreadNotifications(0);
    } catch (error) {
      console.error("Error marking notifications as read:", error);
    }
  };

  const filteredMenuItems = menuItems.filter((item) =>
    item.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const fetchLatestRequests = async () => {
    try {
      const token = sessionStorage.getItem("token") || Cookies.get("token");
      if (!token) throw new Error("Token not found");

      const response = await axios.get(
        `${import.meta.env.VITE_HOST_EXPRESS}/api/requests/latest`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setLatestRequests(response.data);
    } catch (error) {
      console.error("Error fetching latest requests:", error);
    }
  };

  useEffect(() => {
    fetchLatestRequests();
  }, []);

  const handleProfileMenuClick = ({ key }) => {
    if (key === "settings") {
      setIsProfileSettingsVisible(true);
    } else if (key === "logout") {
      // Implement logout functionality here
    }
  };

  const profileMenu = (
    <Menu onClick={handleProfileMenuClick}>
      <Menu.Item key="settings">Configuración</Menu.Item>
      <Menu.Item key="logout">Cerrar Sesión</Menu.Item>
    </Menu>
  );

  return (
    <>
      {isHeaderVisible && ( // Condición para mostrar u ocultar el header
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
              <div className="flex items-center space-x-1">
                <button
                  className="p-2 rounded transition-colors duration-300 hover:bg-gray-100 relative"
                  onClick={handleNotificationClick}
                >
                  <NotificationIcon className="text-gray-500" />
                  {unreadNotifications > 0 && (
                    <motion.span
                      className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {unreadNotifications}
                    </motion.span>
                  )}
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
            <Dropdown overlay={profileMenu} trigger={["click"]}>
              <img
                src={profileImageUrl}
                alt="Profile"
                className="w-10 h-10 md:w-12 md:h-12 rounded-full cursor-pointer"
              />
            </Dropdown>
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
                  {filteredMenuItems.map(
                    ({ key, icon: IconComponent, label }) => (
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
                    )
                  )}
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
          <Modal
            title="Solicitudes Recientes"
            visible={isModalVisible}
            onCancel={() => setIsModalVisible(false)}
            footer={null}
            centered
          >
            <ul className="space-y-2">
              {latestRequests.map((request) => (
                <li
                  key={request.request_id}
                  className="p-2 border-b border-gray-200"
                >
                  <div className="text-sm text-gray-700">
                    {request.full_name} - {request.loan_type}
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(request.request_date).toLocaleString()}
                  </div>
                </li>
              ))}
            </ul>
          </Modal>
          <Modal
            title="Configuración del Perfil"
            visible={isProfileSettingsVisible}
            onCancel={() => setIsProfileSettingsVisible(false)}
            footer={null}
            centered
          >
            {/* Aquí puedes agregar el contenido del modal de configuración del perfil */}
          </Modal>
        </header>
      )}
    </>
  );
};

export default HeaderDashboard;
