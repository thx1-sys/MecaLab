import React from "react";
import { FaCogs, FaBox } from "react-icons/fa";
import HomeIcon from "./Icons/HomeIcon";
import MailIcon from "./Icons/MailIcon";
import GraphIcon from "./Icons/GraphIcon";
import { useMediaQuery } from "react-responsive";

const menuItems = [
  { key: "home", icon: HomeIcon, label: "Inicio" },
  { key: "requests", icon: MailIcon, label: "Solicitudes" },
  { key: "report", icon: GraphIcon, label: "Reportes" },
  { key: "machines", icon: FaCogs, label: "Máquinas" },
  { key: "materials", icon: FaBox, label: "Materiales" },
];

const SidebarMobile = ({ setActiveContent, activeContent }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  if (!isMobile) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-2 flex justify-around items-center z-50">
      {menuItems.map(({ key, icon: IconComponent }) => (
        <div
          key={key}
          onClick={() => setActiveContent(key)}
          className={`group flex items-center px-2 py-2 cursor-pointer duration-500 transform rounded-lg gap-x-2 scale-90 ${
            activeContent === key ? "font-semibold opacity-100" : ""
          } hover:bg-[#255392] hover:shadow-lg hover:scale-105 transition-transform duration-500`}
        >
          <IconComponent
            className={`w-6 h-6 ${
              activeContent === key ? "opacity-100" : "opacity-30"
            } fill-[#131010] group-hover:text-white group-hover:fill-white group-hover:opacity-100`}
          />
        </div>
      ))}
      <div
        onClick={() => setActiveContent("home")}
        className="absolute bottom-6 bg-[#255392] p-4 rounded-full shadow-lg transform transition-transform duration-500"
      >
        <HomeIcon
          className={`w-8 h-8 ${
            activeContent === "home" ? "opacity-100" : "opacity-30"
          } fill-white group-hover:text-white group-hover:fill-white group-hover:opacity-100`}
        />
      </div>
    </div>
  );
};

export default SidebarMobile;
