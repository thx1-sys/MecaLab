import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import MecaLabIcon from "../../components/svg/MecaLabIconDark";
import Robot from "../../assets/Img/Robot.webp";

const MainContent = () => {
  return (
    <div className="w-full min-h-[80vh] flex flex-col lg:flex-row items-center justify-center lg:justify-between">
      {/* Icono MecaLab (visible solo en pantallas pequeñas) */}
      <motion.div
        className="lg:hidden flex justify-center w-full mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <MecaLabIcon color="white" width="100" height="100" />
      </motion.div>

      {/* Contenedor de texto */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center lg:items-start px-4 lg:pl-12 text-white text-center lg:text-left">
        <motion.h1
          className="font-bold text-4xl lg:text-8xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          MecaLab
        </motion.h1>
        <motion.p
          className="mt-4 lg:mt-8 text-lg lg:text-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          Bienvenido al Sistema de Administración de Laboratorio del
          Departamento de Metal-Mecánica.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.5 }}
        >
          <Link to="/student-home">
            <button className="mt-4 text-base lg:text-xl py-2 hover:px-4 rounded-lg underline text-white hover:bg-white hover:text-black hover:scale-105 transform transition-all duration-500 ease-in-out btn-shadow-white hover:no-underline">
              Realiza tu primera solicitud ahora
            </button>
          </Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.5 }}
        >
          <Link to="/inf">
            <button className="mt-4 border text-base lg:text-xl text-white px-4 py-2 rounded-lg hover:bg-white hover:text-black hover:scale-105 transform transition duration-500 btn-shadow-white">
              Más información
            </button>
          </Link>
        </motion.div>
      </div>

      {/* Imagen (oculta en pantallas pequeñas) */}
      <motion.div
        className="w-full lg:w-1/2 flex justify-center hidden lg:flex"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.0 }}
      >
        <img
          src={Robot}
          alt="Descripción"
          className="max-w-full h-auto px-4 lg:px-0"
        />
      </motion.div>
    </div>
  );
};

export default MainContent;
