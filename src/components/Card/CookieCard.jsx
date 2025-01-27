import React from "react";
import "./CookieCard.css";

function CookieCard({ onClose }) {
  const handleOutsideClick = (e) => {
    if (e.target.classList.contains("overlay")) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10 z-50 overlay"
      onClick={handleOutsideClick}
    >
      <div
        className="cookie-card bg-[#151515] bg-opacity-50 p-6 rounded-lg shadow-lg max-w-3xl mx-auto backdrop-filter backdrop-blur-lg transform transition duration-500 hover:bg-opacity-50 px-12"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="title text-3xl font-bold mb-4 text-gray-100">
          Bienvenido al Sistema de Administración de Laboratorio
        </h2>
        <div className="description max-h-[500px] overflow-auto hide-scrollbar">
          <h3 className="font-semibold mb-2 text-gray-100 text-lg">
            Departamento de Metal-Mecánica
          </h3>
          <p className="font-semibold mb-2 text-gray-100 text-lg">
            Instituto Tecnológico de Durango
          </p>
          <p className="text-gray-300 text-base">
            Esta plataforma facilita la gestión de inventarios, reservación de
            equipos y control de préstamos, asegurando un manejo eficiente de
            los recursos del laboratorio para estudiantes y profesores.
          </p>
          <h3 className="font-semibold mb-2 mt-4 text-gray-100 text-lg">
            Funcionalidades del Sistema
          </h3>
          <ol className="list-decimal pl-5 text-gray-300 text-base">
            <li>
              <h4 className="font-semibold mb-2 text-gray-100 text-lg">
                Gestión de Inventarios
              </h4>
              <p>
                Permite llevar un control detallado de los materiales y equipos
                disponibles en el laboratorio, facilitando su localización y
                uso.
              </p>
            </li>
            <li>
              <h4 className="font-semibold mb-2 mt-4 text-gray-100 text-lg">
                Reservación de Equipos
              </h4>
              <p>
                Los estudiantes y profesores pueden reservar equipos para su uso
                en proyectos y prácticas, asegurando la disponibilidad de los
                recursos necesarios.
              </p>
            </li>
            <li>
              <h4 className="font-semibold mb-2 mt-4 text-gray-100 text-lg">
                Control de Préstamos
              </h4>
              <p>
                Facilita el seguimiento de los préstamos de equipos y materiales
                a los estudiantes, asegurando su devolución en tiempo y forma.
              </p>
            </li>
            <li>
              <h4 className="font-semibold mb-2 mt-4 text-gray-100 text-lg">
                Reportes y Estadísticas
              </h4>
              <p>
                Genera reportes detallados sobre el uso de los recursos del
                laboratorio, ayudando en la toma de decisiones y en la mejora
                continua del servicio.
              </p>
            </li>
          </ol>
        </div>
        <div className="actions mt-8 flex justify-center">
          <button
            className="bg-[#3B0F0F] cursor-pointer px-16 py-2 text-[#FF0000] font-inter rounded-xl hover:bg-[#FF0000] hover:text-[#3B0F0F] hover:shadow-red-lg transform transition duration-500 text-md border border-[#FF0000] w-full md:w-auto"
            onClick={onClose}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}

export default CookieCard;
