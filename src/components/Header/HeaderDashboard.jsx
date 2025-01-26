// Código principal dividido
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaBars, FaCogs, FaBox } from "react-icons/fa";
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
import { Dropdown, Menu } from "antd";

import MenuButton from "../Button/MenuButton";
import MobileMenu from "../Menu/MobileMenu";
import NotificationsModal from "../Modal/NotificationsModal";
import ProfileSettingsModal from "../Modal/ProfileSettingsModalAdmin";

const menuItems = [
  { key: "home", icon: HomeIcon, label: "Inicio" },
  { key: "requests", icon: MailIcon, label: "Solicitudes" },
  { key: "report", icon: GraphIcon, label: "Reportes" },
  { key: "machines", icon: FaCogs, label: "Máquinas" },
  { key: "materials", icon: FaBox, label: "Materiales" },
  { key: "users", icon: UsersIcon, label: "Usuarios" },
  { key: "settings", icon: SettingsIcon, label: "Ajustes" },
];

const HeaderDashboard = ({
  toggleSidebar,
  isSidebarOpen,
  setActiveContent,
  activeContent,
}) => {
  const [username, setUsername] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState(UserImage);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm] = useState("");
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [latestRequests, setLatestRequests] = useState([]);
  const [isProfileSettingsVisible, setIsProfileSettingsVisible] =
    useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

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
    const interval = setInterval(fetchNotifications, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
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
    fetchLatestRequests();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setNotifications(response.data);
      setIsModalVisible(true);
      await axios.put(
        `${import.meta.env.VITE_HOST_EXPRESS}/api/notifications/read`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
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

  const handleProfileMenuClick = ({ key }) => {
    if (key === "settings") {
      setIsProfileSettingsVisible(true);
    } else if (key === "logout") {
      // Logout
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
      {isHeaderVisible && (
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
        </header>
      )}
      <MobileMenu
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        filteredMenuItems={filteredMenuItems}
        activeContent={activeContent}
        setActiveContent={setActiveContent}
      />
      <NotificationsModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        latestRequests={latestRequests}
      />
      <ProfileSettingsModal
        isProfileSettingsVisible={isProfileSettingsVisible}
        setIsProfileSettingsVisible={setIsProfileSettingsVisible}
      />
    </>
  );
};

export default HeaderDashboard;
