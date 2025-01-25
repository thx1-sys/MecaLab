import React, { useEffect, useState } from "react";
import ChartAreaLineIcon from "./Icons/ChartAreaLineIcon";
import {
  FaUser,
  FaEnvelope,
  FaCog,
  FaBox,
  FaCheckCircle,
  FaBell,
} from "react-icons/fa";
import Cookies from "js-cookie";
import axios from "axios";
import CountUp from "react-countup";

const Card = ({ icon: Icon, title, value, subtitle }) => (
  <div className="flex items-center justify-center border p-4 border-[#151515] rounded-xl min-h-full">
    <div className="flex flex-col items-center justify-center text-center">
      <Icon className="text-4xl text-[#0B192C] mb-2" />
      <h4 className="text-xl font-semibold mb-2 text-[#151515] min-h-[3rem] flex items-center">
        {title}
      </h4>
      <p className="text-3xl font-bold text-[#151515]">
        <CountUp end={value} duration={2} />
      </p>
      {subtitle && <p className="text-sm text-gray-400">{subtitle}</p>}
    </div>
  </div>
);

const ActivityCard = ({ setActiveContent }) => {
  const [counts, setCounts] = useState({
    totalUsers: 0,
    newRequests: 0,
    registeredMachines: 0,
    availableMaterials: 0,
    completedRequests: 0,
    recentAlerts: 0,
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_HOST_EXPRESS}/api/counts`,
          {
            headers: {
              Authorization: `Bearer ${
                sessionStorage.getItem("token") || Cookies.get("token")
              }`,
            },
          }
        );
        setCounts(response.data);
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className="bg-white rounded-lg p-4 shadow-md h-full flex flex-col">
      <div className="flex justify-between items-start w-full mb-4">
        <div>
          <h2 className="text-lg font-bold">Actividad</h2>
          <p>Última actividad.</p>
        </div>
        <button
          className="border border-[#0B192C] text-[#0B192C] fill-[#0B192C] w-12 h-12 rounded-lg flex items-center justify-center hover:shadow-xl hover:bg-[#0B192C] hover:text-white hover:fill-white transform transition duration-500"
          onClick={() => setActiveContent("report")}
        >
          <ChartAreaLineIcon />
        </button>
      </div>
      <div className="flex-1 h-full flex justify-center items-center overflow-y-auto p-4 bg-transparent">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full h-full max-w-4xl">
          <Card
            icon={FaUser}
            title="Usuarios Totales"
            value={counts.totalUsers}
            subtitle="En total registrados"
          />
          <Card
            icon={FaEnvelope}
            title="Nuevas Solicitudes"
            value={counts.newRequests}
            subtitle="En las últimas 24 horas"
          />
          <Card
            icon={FaCog}
            title="Máquinas Registradas"
            value={counts.registeredMachines}
            subtitle="En total registrados"
          />
          <Card
            icon={FaBox}
            title="Materiales Disponibles"
            value={counts.availableMaterials}
            subtitle="En total registrados"
          />
          <Card
            icon={FaCheckCircle}
            title="Solicitudes Completadas"
            value={counts.completedRequests}
            subtitle="En los últimos 30 días"
          />
          <Card
            icon={FaBell}
            title="Alertas Recientes"
            value={counts.recentAlerts}
            subtitle="En las últimas 24 horas"
          />
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;
