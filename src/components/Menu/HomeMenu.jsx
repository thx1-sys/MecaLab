import React from "react";
import { useLocation, Link } from "react-router-dom";
import MecaLabIcon from "../svg/MecaLabIconDark";
import HomeIcon from "./Icons/HomeIcon";

const HomeMenu = () => {
  const location = useLocation();

  const getLinkClass = (path) => {
    return location.pathname === path
      ? "text-white font-bold opacity-100 scale-105 hover:scale-110 transform duration-500"
      : "text-white opacity-40 transform hover:opacity-100 transform duration-500";
  };

  return (
    <div className="flex items-center justify-between p-4 h-[10vh] mx-8 border-b border-gray-300 border-opacity-20">
      <Link
        to="/"
        className="flex items-center transform transition duration-500 hover:scale-105 text-white"
      >
        <MecaLabIcon color="white" width="52" height="52" />
        <p className="font-bold text-2xl ml-4">MecaLab</p>
      </Link>
      <ul className="flex space-x-6">
        <li className="flex items-center justify-center">
          <Link to="/" className={`${getLinkClass("/")} flex items-center`}>
            {location.pathname === "/" && (
              <HomeIcon className="w-4 h-4 inline-block mr-2" />
            )}
            Inicio
          </Link>
        </li>
        <li>
          <a href="#section2" className={getLinkClass("#section2")}>
            Catálogo de Materiales
          </a>
        </li>
        <li>
          <a href="#section3" className={getLinkClass("#section3")}>
            Solicitar Equipo
          </a>
        </li>
        <li>
          <a href="#section4" className={getLinkClass("#section4")}>
            Sobre Nosotros
          </a>
        </li>
        <li>
          <a href="#section5" className={getLinkClass("#section5")}>
            Ayuda
          </a>
        </li>
      </ul>
      <div className="flex space-x-4">
        <Link to="/login">
          <button className="px-3 py-1 rounded-lg text-white hover:bg-white hover:text-black hover:scale-105 transform transition duration-500 btn-shadow-white">
            Iniciar sesión
          </button>
        </Link>
        <Link to="/signup">
          <button className="border px-3 py-1 rounded-lg text-white hover:bg-white hover:text-black hover:scale-105 transform transition duration-500 btn-shadow-white">
            Regístrate
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HomeMenu;
