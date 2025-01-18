import React from "react";
import ChartAreaLineIcon from "./Icons/ChartAreaLineIcon";
import {
  FaUser,
  FaEnvelope,
  FaCog,
  FaBox,
  FaCheckCircle,
  FaBell,
} from "react-icons/fa";

const Card = ({ icon: Icon, title, value }) => (
  <div className="flex items-center justify-center border p-4 border-[#151515] rounded-xl min-h-full">
    <div className="flex flex-col items-center justify-center text-center">
      <Icon className="text-4xl text-[#0B192C] mb-2" />
      <h4 className="text-xl font-semibold mb-2 text-[#151515] min-h-[3rem] flex items-center">
        {title}
      </h4>
      <p className="text-3xl font-bold text-[#151515]">{value}</p>
      <p className="text-sm text-gray-400">En los últimos 24 horas</p>
    </div>
  </div>
);

const ActivityCard = () => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-md h-full flex flex-col">
      <div className="flex justify-between items-start w-full mb-4">
        <div>
          <h2 className="text-lg font-bold">Actividad</h2>
          <p>Última actividad.</p>
        </div>
        <button className="border border-[#0B192C] text-[#0B192C] fill-[#0B192C] w-12 h-12 rounded-lg flex items-center justify-center hover:shadow-xl hover:bg-[#0B192C] hover:text-white hover:fill-white transform transition duration-500">
          <ChartAreaLineIcon />
        </button>
      </div>
      <div className="flex-1 flex justify-center items-center overflow-y-auto minimal-scrollbar p-4 bg-transparent">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl">
          <Card icon={FaUser} title="Usuarios Totales" value="0" />
          <Card icon={FaEnvelope} title="Nuevas Solicitudes" value="0" />
          <Card icon={FaCog} title="Máquinas Registradas" value="0" />
          <Card icon={FaBox} title="Materiales Disponibles" value="0" />
          <Card
            icon={FaCheckCircle}
            title="Solicitudes Completadas"
            value="0"
          />
          <Card icon={FaBell} title="Alertas Recientes" value="0" />
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;
