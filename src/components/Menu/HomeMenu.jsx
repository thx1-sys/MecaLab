import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import MecaLabIcon from "../svg/MecaLabIconDark";
import HomeIcon from "./Icons/HomeIcon";

const HomeMenu = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getLinkClass = (path) => {
    return location.pathname === path
      ? "text-white font-bold opacity-100 scale-105 hover:scale-110 transform duration-500"
      : "text-white opacity-40 hover:opacity-100 transform duration-500";
  };

  return (
    <>
      {/* Barra superior (apariencia en pantallas grandes) */}
      <motion.div
        className="flex items-center justify-between p-4 h-[15vh] md:h-[10vh] border-b border-gray-300 border-opacity-20 mx-8"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.0, duration: 0.4 }}
      >
        {/* Logo */}
        <motion.div
          className="flex items-center transform transition duration-500 hover:scale-105 text-white"
          whileHover={{ scale: 1.03 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.4 }}
        >
          <Link
            to="/"
            className="flex items-center transform transition duration-500 hover:scale-105"
          >
            <MecaLabIcon
              color="white"
              width="32"
              height="32"
              className="lg:w-42 lg:h-42"
            />
            <p className="font-bold text-xl ml-2 lg:text-2xl lg:ml-4 hidden lg:block">
              MecaLab
            </p>
          </Link>
        </motion.div>

        {/* Enlaces centrados en pantallas grandes */}
        <div className="hidden lg:flex flex-1 justify-center">
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className={`${getLinkClass("/")}`}>
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
        </div>

        {/* Botones a la derecha en pantallas grandes */}
        <div className="hidden lg:flex items-center space-x-4">
          <Link to="/login">
            <motion.button
              className="px-3 py-1 rounded-lg text-white hover:bg-white hover:text-black hover:scale-105 transform transition duration-500 btn-shadow-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Iniciar sesión
            </motion.button>
          </Link>
          <Link to="/signup">
            <motion.button
              className="border px-3 py-1 rounded-lg text-white hover:bg-white hover:text-black hover:scale-105 transform transition duration-500 btn-shadow-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Regístrate
            </motion.button>
          </Link>
        </div>

        {/* Botón para pantallas pequeñas */}
        <button
          className="lg:hidden text-white focus:outline-none transform transition duration-500 hover:scale-105"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler-menu-deep"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M4 6h16" />
            <path d="M7 12h13" />
            <path d="M10 18h10" />
          </svg>
        </button>
      </motion.div>

      {/* Menú en pantalla completa para pantallas pequeñas */}
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
              xmlns="http://www.w3.org/2000/svg"
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
          <ul className="flex flex-col space-y-6 pb-4 text-center">
            <li>
              <Link
                to="/"
                className={`${getLinkClass("/")} text-2xl`}
                onClick={() => setIsMenuOpen(false)}
              >
                Inicio
              </Link>
            </li>
            <li>
              <a
                href="#section2"
                className={`${getLinkClass("#section2")} text-2xl`}
                onClick={() => setIsMenuOpen(false)}
              >
                Catálogo de Materiales
              </a>
            </li>
            <li>
              <a
                href="#section3"
                className={`${getLinkClass("#section3")} text-2xl`}
                onClick={() => setIsMenuOpen(false)}
              >
                Solicitar Equipo
              </a>
            </li>
            <li>
              <a
                href="#section4"
                className={`${getLinkClass("#section4")} text-2xl`}
                onClick={() => setIsMenuOpen(false)}
              >
                Sobre Nosotros
              </a>
            </li>
            <li>
              <a
                href="#section5"
                className={`${getLinkClass("#section5")} text-2xl`}
                onClick={() => setIsMenuOpen(false)}
              >
                Ayuda
              </a>
            </li>
          </ul>

          {/* Botones de sesión */}
          <div className="flex flex-col space-y-4 w-2/3">
            <Link to="/login">
              <button
                className="border w-full px-4 py-2 rounded-lg text-white hover:bg-white hover:text-black hover:scale-105 transform transition duration-500 btn-shadow-white"
                onClick={() => setIsMenuOpen(false)}
              >
                Iniciar sesión
              </button>
            </Link>
            <Link to="/signup">
              <button
                className="border w-full px-4 py-2 rounded-lg text-white hover:bg-white hover:text-black hover:scale-105 transform transition duration-500 btn-shadow-white"
                onClick={() => setIsMenuOpen(false)}
              >
                Regístrate
              </button>
            </Link>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default HomeMenu;
