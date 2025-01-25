import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Points from "./Icons/Dots";
import PendingIcon from "./Icons/PendingIcon"; // Importa tus íconos
import MaterialsIcon from "./Icons/MaterialsIcon";
import ReportIcon from "./Icons/ReportIcon";
import MachinesIcon from "./Icons/MachinesIcon";
import Cookies from "js-cookie";
import axios from "axios";
import CountUp from "react-countup";

const Card = ({
  title,
  description,
  count,
  buttonText,
  background,
  onClick,
  Icon,
}) => (
  <motion.div
    className="bg-gray-100 rounded-lg p-6 shadow-lg h-full text-white"
    style={{ background }}
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -50 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex items-center justify-between">
      <div className="flex justify-between w-full">
        <div>
          <h3 className="text-xl font-extrabold">{title}</h3>
          <p className="text-md text-white/60">
            {description}{" "}
            <span className="font-bold text-white/100">
              <CountUp end={count} duration={2} />
            </span>
          </p>
        </div>
      </div>
      <Icon className="ml-4 w-14 h-14" />
    </div>
    <button
      className="mt-6 text-sm bg-white text-[#0B192C] px-6 py-3 rounded-lg transform transition duration-500 hover:scale-105"
      onClick={onClick}
    >
      {buttonText}
    </button>
  </motion.div>
);

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  const handleClickOutside = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      onClose();
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      onClick={handleClickOutside}
    >
      <motion.div
        className="bg-white rounded-lg p-6 shadow-lg w-11/12 md:w-1/2 lg:w-1/3 relative"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

const SummaryCard = ({ setActiveContent }) => {
  const [pendingRequestsCount, setPendingRequestsCount] = useState(0);
  const [availableMaterialsCount, setAvailableMaterialsCount] = useState(0);
  const [registeredMachinesCount, setRegisteredMachinesCount] = useState(0);
  const [materialStatusCount, setMaterialStatusCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_HOST_EXPRESS}/api/requests/counts`,
          {
            headers: {
              Authorization: `Bearer ${
                sessionStorage.getItem("token") || Cookies.get("token")
              }`,
            },
          }
        );
        setPendingRequestsCount(response.data.pendingRequestsCount);
        setAvailableMaterialsCount(response.data.availableMaterialsCount);
        setRegisteredMachinesCount(response.data.registeredMachinesCount);
        setMaterialStatusCount(response.data.materialStatusCount);
      } catch (error) {
        console.error("Error fetching requests counts:", error);
      }
    };

    fetchCounts();
  }, []);

  useEffect(() => {
    let interval;
    if (isModalOpen) {
      interval = setInterval(() => {
        setCurrentCardIndex((prevIndex) => (prevIndex + 1) % cards.length);
      }, 3000); // Cambia de tarjeta cada 3 segundos

      setTimeout(() => {
        setIsModalOpen(false);
        setCurrentCardIndex(0); // Reinicia el índice de la tarjeta al cerrar el modal
      }, 12000); // Cierra el modal después de 12 segundos
    }
    return () => clearInterval(interval);
  }, [isModalOpen]);

  const cards = [
    {
      title: "Solicitudes Pendientes",
      description: "Tienes",
      count: pendingRequestsCount,
      buttonText: "Ver todas las solicitudes",
      background: "conic-gradient(from 190deg at 70% 40%, #B42E61, #4E142A)",
      onClick: () => setActiveContent("requests"),
      Icon: PendingIcon,
    },
    {
      title: "Materiales Disponibles",
      description: "Artículos disponibles",
      count: availableMaterialsCount,
      buttonText: "Explorar inventario completo",
      background: "conic-gradient(from 190deg at 70% 40%, #1C4985, #0B192C)",
      onClick: () => setActiveContent("materials"),
      Icon: MaterialsIcon,
    },
    {
      title: "Estado del material",
      description: "Artículos disponibles",
      count: materialStatusCount,
      buttonText: "Explorar inventario completo",
      background: "conic-gradient(from 190deg at 70% 40%, #B42E61, #4E142A)",
      onClick: () => setActiveContent("report"),
      Icon: ReportIcon,
    },
    {
      title: "Equipos Registrados",
      description: "Equipos registrados",
      count: registeredMachinesCount,
      buttonText: "Mostrar equipos",
      background: "conic-gradient(from 190deg at 70% 40%, #1C4985, #0B192C)",
      onClick: () => setActiveContent("machines"),
      Icon: MachinesIcon,
    },
  ];

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg h-full flex flex-col justify-between items-start">
      <div className="flex justify-between items-start w-full">
        <div>
          <h2 className="text-xl font-bold">Resumen</h2>
          <p>Últimos datos actualizados</p>
        </div>
        <button
          className="border border-[#0B192C] text-[#0B192C] fill-[#0B192C] w-12 h-12 rounded-lg flex items-center justify-center hover:shadow-xl hover:bg-[#0B192C] hover:text-white hover:fill-white transform transition duration-500"
          onClick={() => setIsModalOpen(true)}
        >
          <Points />
        </button>
      </div>
      <div className="grid grid-cols-1 gap-6 mt-6 w-full h-full">
        {cards.map((card, index) => (
          <Card key={index} {...card} />
        ))}
      </div>
      <AnimatePresence>
        {isModalOpen && (
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <Card {...cards[currentCardIndex]} />
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SummaryCard;
