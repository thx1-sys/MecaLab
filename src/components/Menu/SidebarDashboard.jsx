import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt, FaCogs, FaBox } from "react-icons/fa";
import SidebarHeader from "../Header/SidebarHeader";
import HomeIcon from "./Icons/HomeIcon";
import MailIcon from "./Icons/MailIcon";
import GraphIcon from "./Icons/GraphIcon";
import UsersIcon from "./Icons/UsersIcon";
import SettingsIcon from "./Icons/SettingsIcon";
import LogoutIcon from "./Icons/LogoutIcon";

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

  const hoverClasses = "hover:bg-[#255392] hover:shadow-lg hover:scale-105";

  const iconGroupHoverClasses =
    "group-hover:text-white group-hover:fill-white group-hover:opacity-100";

  const spanGroupHoverClasses =
    "group-hover:text-white group-hover:opacity-100";

  const textColorClass = "text-[#131010] opacity-60 fill-[#131010]";
  const activeClass = "font-semibold opacity-100";

  return (
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
      {/* Opción Logout */}
      <div className="absolute bottom-4 left-0 right-0 m-4 text-[#AF1740] opacity-60 flex justify-center items-center text-sm hover:scale-105 hover:opacity-100 transform transition duration-500">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          <LogoutIcon className="w-6 h-6 mr-2" />
          {isSidebarOpen && showIconText && <span>Salir</span>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
