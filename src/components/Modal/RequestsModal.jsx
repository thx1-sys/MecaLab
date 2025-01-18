import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./RequestsModal.css";
import CloseIcon from "../svg/CloseIcon"; // Asegúrate de que la ruta sea correcta

function RequestsModal({ onClose, show }) {
  const solicitudes = [
    { id: 1, nombre: "Juan Pérez", fecha: "2023-10-01", estado: "Pendiente" },
    { id: 2, nombre: "María López", fecha: "2023-10-02", estado: "Aprobado" },
    { id: 3, nombre: "Carlos Gómez", fecha: "2023-10-03", estado: "Pendiente" },
    { id: 4, nombre: "Ana García", fecha: "2023-10-04", estado: "Rechazado" },
    {
      id: 5,
      nombre: "Pedro Sánchez",
      fecha: "2023-10-05",
      estado: "Pendiente",
    },
    {
      id: 6,
      nombre: "Sofía Rodríguez",
      fecha: "2023-10-06",
      estado: "Aprobado",
    },
    {
      id: 7,
      nombre: "Lucía Herrera",
      fecha: "2023-10-07",
      estado: "Pendiente",
    },
    { id: 8, nombre: "Andrés Castro", fecha: "2023-10-08", estado: "Aprobado" },
    {
      id: 9,
      nombre: "Ximena Morales",
      fecha: "2023-10-09",
      estado: "Pendiente",
    },
    {
      id: 10,
      nombre: "Daniel Medina",
      fecha: "2023-10-10",
      estado: "Rechazado",
    },
  ];

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-20 backdrop-blur-md z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="modal-content relative w-11/12 max-w-3xl p-8 rounded-lg shadow-lg border border-white bg-gray-300/20 z-40"
            initial={{ scale: 0.8, y: -50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.8, y: 50, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <button onClick={onClose} className="absolute top-4 right-4">
              <CloseIcon className="h-8 w-8 svg-icon text-white opacity-60 hover:opacity-100 transform translate duration-500" />
            </button>
            <h2 className="text-2xl font-bold mb-6 text-center text-white">
              Solicitudes enviadas
            </h2>
            <div className="max-h-72 overflow-y-auto custom-scrollbar rounded-lg">
              <table className="min-w-full text-white border border-white border-opacity-30 rounded-lg overflow-hidden">
                <thead className="bg-white bg-opacity-10 text-sm uppercase tracking-wider">
                  <tr>
                    <th className="py-2 px-4 border-b border-white border-opacity-20">
                      ID
                    </th>
                    <th className="py-2 px-4 border-b border-white border-opacity-20">
                      Nombre
                    </th>
                    <th className="py-2 px-4 border-b border-white border-opacity-20">
                      Fecha
                    </th>
                    <th className="py-2 px-4 border-b border-white border-opacity-20">
                      Estado
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {solicitudes.map(({ id, nombre, fecha, estado }) => (
                    <tr
                      key={id}
                      className="border-b border-white border-opacity-20 hover:bg-white hover:bg-opacity-5 transition duration-300"
                    >
                      <td className="py-2 px-4">{id}</td>
                      <td className="py-2 px-4">{nombre}</td>
                      <td className="py-2 px-4">{fecha}</td>
                      <td className="py-2 px-4">{estado}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button
              className="mt-6 btn-change-blue w-full py-2 bg-transparent border border-white text-white rounded-lg hover:bg-blue-500 hover:border-blue-500 transition duration-500"
              onClick={onClose}
            >
              Regresar
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default RequestsModal;
