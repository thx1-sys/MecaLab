import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt, FaCogs, FaBox, FaBars } from "react-icons/fa";
import SidebarHeader from "../Header/SidebarHeader";
import HomeIcon from "./Icons/HomeIcon";
import MailIcon from "./Icons/MailIcon";
import GraphIcon from "./Icons/GraphIcon";
import UsersIcon from "./Icons/UsersIcon";
import SettingsIcon from "./Icons/SettingsIcon";
import { useMediaQuery } from "react-responsive";
import { motion } from "framer-motion";
import { Modal } from "antd";
import Cookies from "js-cookie";

const menuItems = [
  { key: "home", icon: HomeIcon, label: "Inicio" },
  { key: "requests", icon: MailIcon, label: "Solicitudes" },
  { key: "report", icon: GraphIcon, label: "Reportes" },
  { key: "machines", icon: FaCogs, label: "Máquinas" },
  { key: "materials", icon: FaBox, label: "Materiales" },
  { key: "users", icon: UsersIcon, label: "Usuarios" },
  { key: "settings", icon: SettingsIcon, label: "Ajustes" },
];

const Sidebar = ({ isSidebarOpen, setActiveContent, activeContent }) => {
  const [showText, setShowText] = useState(false);
  const navigate = useNavigate();
  const [showIconText, setShowIconText] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    // Limpiar el sessionStorage
    sessionStorage.clear();
    // Limpiar el localStorage
    localStorage.clear();
    // Borrar las cookies
    Cookies.remove("token");

    setIsModalVisible(false);
    navigate("/");
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    if (isSidebarOpen) {
      const timer = setTimeout(() => setShowText(true), 500);
      return () => clearTimeout(timer);
    } else {
      setShowText(false);
    }
  }, [isSidebarOpen]);

  useEffect(() => {
    if (isSidebarOpen) {
      const timer = setTimeout(() => setShowIconText(true), 500);
      return () => clearTimeout(timer);
    } else {
      setShowIconText(false);
    }
  }, [isSidebarOpen]);

  const baseBtnClasses =
    "group flex items-center px-2 py-2 cursor-pointer duration-500 transform rounded-lg gap-x-2 scale-90";

  const hoverClasses =
    "hover:bg-[#255392] hover:shadow-lg hover:scale-105 transition-transform duration-500";

  const iconGroupHoverClasses =
    "group-hover:text-white group-hover:fill-white group-hover:opacity-100";

  const spanGroupHoverClasses =
    "group-hover:text-white group-hover:opacity-100";

  const textColorClass = "text-[#131010] opacity-60 fill-[#131010]";
  const activeClass = "font-semibold opacity-100";

  const primaryMenuItems = menuItems.slice(1, 5);

  if (isMobile) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-2 flex justify-around items-center z-50">
        {primaryMenuItems.map(({ key, icon: IconComponent }) => (
          <div
            key={key}
            onClick={() => setActiveContent(key)}
            className={`${baseBtnClasses} ${
              activeContent === key ? activeClass : ""
            } ${hoverClasses}`}
          >
            <IconComponent
              className={`w-6 h-6 ${
                activeContent === key ? "opacity-100" : "opacity-30"
              } fill-[#131010] ${iconGroupHoverClasses}`}
            />
          </div>
        ))}
        <div
          onClick={() => setActiveContent("home")}
          className="absolute bottom-6 bg-gradient-to-r from-[#0B192C] to-[#255392] p-4 rounded-full shadow-lg transform transition-transform duration-500 border-4"
        >
          <HomeIcon
            className={`w-8 h-8 ${
              activeContent === "home" ? "opacity-100" : "opacity-30"
            } fill-white ${iconGroupHoverClasses}`}
          />
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className={`animate-slideLeftFadeIn bg-white text-white ${
        isSidebarOpen ? "w-52" : "w-28"
      } transition-width duration-500 md:block`}
      animate={{ width: isSidebarOpen ? 208 : 112 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-4 relative h-full">
        {/* Encabezado */}
        <SidebarHeader
          isSidebarOpen={isSidebarOpen}
          setActiveContent={setActiveContent}
          showText={showText}
        />

        {/* Opciones */}
        <div className="m-4 text-sm">
          {menuItems.map(({ key, icon: IconComponent, label }) => (
            <div
              key={key}
              onClick={() => setActiveContent(key)}
              className={`${baseBtnClasses} mb-2 ${
                activeContent === key ? activeClass : ""
              } ${!isSidebarOpen ? "justify-center" : ""} ${hoverClasses}`}
            >
              <IconComponent
                className={`w-6 h-6 ${
                  activeContent === key ? "opacity-100" : "opacity-30"
                } fill-[#131010] ${iconGroupHoverClasses}`}
              />
              {isSidebarOpen && showIconText && (
                <span
                  className={`ml-2 ${
                    activeContent === key
                      ? "text-[#131010] text-opacity-100"
                      : textColorClass
                  } ${spanGroupHoverClasses}`}
                >
                  {label}
                </span>
              )}
            </div>
          ))}
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <div
            onClick={showModal}
            className={`${baseBtnClasses} flex justify-center text-[#131010] hover:text-red-500`}
          >
            <FaSignOutAlt className="w-6 h-6 fill-[#131010] opacity-60 hover:text-red-500 group-hover:fill-red-500 group-hover:opacity-100 transition transform duration-500 " />
            {isSidebarOpen && showIconText && (
              <span className={`ml-2 ${spanGroupHoverClasses}`}>Salir</span>
            )}
          </div>
          <Modal
            title="Confirmación"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            centered
            okText="Sí"
            cancelText="No"
            okButtonProps={{
              style: { backgroundColor: "red", borderColor: "red" },
            }}
          >
            <p>¿Estás seguro de que quieres salir?</p>
          </Modal>
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
