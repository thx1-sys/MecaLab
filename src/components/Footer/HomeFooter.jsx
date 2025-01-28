import React from "react";
import { Link } from "react-router-dom";
import PhoneIcon from "../svg/PhoneIcon";
import MailIcon from "../svg/MailIcon";
import MecaLabIcon from "../svg/MecaLabIconDark";

const HomeFooter = () => {
  return (
    <footer id="contacto" className="color-footer text-white py-8  ">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full lg:w-1/3 mb-6 lg:mb-0">
            <h2 className="text-2xl font-bold bg-gradient-to-b from-white to-gray-200 bg-clip-text text-transparent mb-4">
              Contacto
            </h2>
            <p className="flex items-center mb-2 text-[#FFF7FC]">
              <PhoneIcon className="mr-2" />
              618-829-0900
            </p>
            <p className="flex items-center mb-2 text-[#FFF7FC]">
              <MailIcon className="mr-2" />
              metalmecanica@itdurango.edu.mx
            </p>
          </div>

          <div className="w-full lg:w-1/3 mb-6 lg:mb-0 lg:pr-8">
            <h2 className="text-2xl font-bold bg-gradient-to-b from-white to-gray-200 bg-clip-text text-transparent mb-4">
              Comentarios y Sugerencias
            </h2>
            <p className="mb-2 text-[#FFF7FC]">
              Si tienes comentarios sobre tu experiencia con el Sistema de
              Administración de Laboratorio o sugerencias para mejorar su
              funcionalidad, nos encantaría escucharlas. Tus opiniones son muy
              importantes para nosotros y estamos comprometidos a mejorar
              continuamente la plataforma para facilitar el trabajo de
              estudiantes y profesores en el laboratorio de Metal-Mecánica.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap justify-between items-center mt-8 pt-2 ">
          <div className="w-full lg:w-auto mb-4 lg:mb-0">
            <p className="text-[#FFF7FC] text-center lg:text-left">
              © 2025 MecaLab, ITD.
            </p>
          </div>
          <div className="w-full lg:w-auto">
            <div className="flex items-center justify-center lg:justify-end">
              <Link
                to="/student-home"
                className="flex items-center"
                onClick={() => window.location.reload()}
              >
                <MecaLabIcon color="white" width="42" height="42" />
                <p className="font-bold text-2xl ml-4 hidden sm:block">
                  MecaLab
                </p>
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center items-center space-x-4 mt-8">
          <div className="flex justify-center items-center space-x-4">
            <img
              src="/img/Teg_log.png"
              alt="Logo del instituto tecnológico de México"
              className="w-20 h-20 object-contain"
            />
            <img
              src="/img/Gob_log.png"
              alt="Logo del gobierno de México"
              className="w-20 h-20 object-contain"
            />
            <img
              src="/img/LogoITD_1.png"
              alt="Logo del instituto tecnológico de Durango"
              className="w-20 h-20 object-contain"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default HomeFooter;
