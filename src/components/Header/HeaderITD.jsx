import React from "react";
import LogoITD from "../../assets/Img/ITD_Logo.png";

const HeaderITD = () => {
  return (
    <div className="flex items-center justify-between p-2 bg-gradient-to-r from-[#4E142A] to-[#B42E61] h-[5vh]">
      <a
        href="https://www.itdurango.edu.mx/"
        target="_blank"
        rel="noopener noreferrer"
        className="transform transition duration-500 hover:scale-110"
      >
        <img src={LogoITD} alt="Logo" className="h-10" />
      </a>
      <h1 className="flex-grow text-center text-sm text-white mx-4">
        Instituto Tecnológico de Durango
      </h1>
      <a
        href="https://www.itdurango.edu.mx/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <button className="border px-3 py-1 rounded-lg text-white hover:bg-white hover:text-black transform transition duration-500">
          Sitio Web
        </button>
      </a>
    </div>
  );
};

export default HeaderITD;
