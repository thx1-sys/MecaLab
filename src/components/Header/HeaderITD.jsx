import React from "react";
import LogoITD from "../../assets/Img/ITD_Logo.png";

const HeaderITD = () => {
  return (
    <div className="hidden lg:flex flex-col lg:flex-row items-center justify-between p-2 bg-gradient-to-r from-[#4E142A] to-[#B42E61] h-auto lg:h-[5vh] animate-slideDownFadeIn">
      <a
        href="https://www.itdurango.edu.mx/"
        target="_blank"
        rel="noopener noreferrer"
        className="transform transition duration-500 hover:scale-110 mb-2 lg:mb-0"
      >
        <img src={LogoITD} alt="Logo" className="h-8" />
      </a>
      <h1 className="flex-grow text-center text-sm text-white mx-4 mb-2 lg:mb-0">
        Instituto Tecnológico de Durango
      </h1>
      <a
        href="https://www.itdurango.edu.mx/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <button className="border text-xs px-3 py-1 rounded-lg text-white hover:bg-white hover:text-black transform transition duration-500">
          Sitio Web
        </button>
      </a>
    </div>
  );
};

export default HeaderITD;
