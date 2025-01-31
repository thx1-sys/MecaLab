import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import Cookies from "js-cookie";
import QRCode from "qrcode";
import { Modal } from "antd";
import "./RequestsModal.css";
import CloseIcon from "../svg/CloseIcon";
import MaterialsModal from "./MaterialsModal";

function RequestsModal({ onClose, show }) {
  const [solicitudes, setSolicitudes] = useState([]);
  const [selectedSolicitud, setSelectedSolicitud] = useState(null);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
  const [showMaterialsModal, setShowMaterialsModal] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [isQrModalVisible, setIsQrModalVisible] = useState(false);

  useEffect(() => {
    if (show) {
      fetchSolicitudes();
    }

    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [show]);

  const fetchSolicitudes = async () => {
    try {
      const token = sessionStorage.getItem("token") || Cookies.get("token");
      if (!token) {
        throw new Error("No token found");
      }

      const response = await axios.get(
        `${import.meta.env.VITE_HOST_EXPRESS}/api/requests`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const sortedSolicitudes = response.data.sort(
        (a, b) => new Date(b.request_date) - new Date(a.request_date)
      );
      setSolicitudes(sortedSolicitudes);
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  const formatDateTime = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return new Date(dateString).toLocaleString("es-ES", options);
  };

  const getStatusText = (status) => {
    switch (status) {
      case 0:
        return "En proceso";
      case 1:
        return "Aprobado";
      case 2:
        return "Denegado";
      case 3:
        return "Retraso";
      default:
        return "Desconocido";
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 0:
        return "text-yellow-500";
      case 1:
        return "text-green-500";
      case 2:
        return "text-red-500";
      case 3:
        return "text-orange-500";
      default:
        return "text-gray-500";
    }
  };

  const handleViewMore = (solicitud) => {
    setSelectedSolicitud(solicitud);
    if (solicitud.loan_type === "Material") {
      setSelectedMaterials(solicitud.materials || []);
      if (solicitud.request_status === 1) {
        generateQrCode(solicitud.request_id.toString());
      }
    } else {
      setSelectedMaterials([]);
    }
  };

  const handleCloseDetails = () => {
    setSelectedSolicitud(null);
    setSelectedMaterials([]);
    setQrCodeUrl("");
  };

  const handleOpenMaterialsModal = () => {
    setShowMaterialsModal(true);
  };

  const handleCloseMaterialsModal = () => {
    setShowMaterialsModal(false);
  };

  const generateQrCode = async (text) => {
    try {
      const url = await QRCode.toDataURL(text);
      setQrCodeUrl(url);
    } catch (error) {
      console.error("Error generating QR code:", error);
    }
  };

  const handleOpenQrModal = () => {
    setIsQrModalVisible(true);
  };

  const handleCloseQrModal = () => {
    setIsQrModalVisible(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-20 backdrop-blur-md z-100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="modal-content relative w-11/12 max-w-5xl p-4 md:p-8 rounded-lg shadow-lg border border-white bg-gray-300/20 z-40"
            initial={{ scale: 0.8, y: -50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.8, y: 50, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <button onClick={onClose} className="absolute top-4 right-4">
              <CloseIcon className="h-6 w-6 md:h-8 md:w-8 svg-icon text-white opacity-60 hover:opacity-100 transform translate duration-500" />
            </button>
            <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-center text-white">
              Solicitudes enviadas
            </h2>
            <div className="max-h-72 overflow-y-auto custom-scrollbar rounded-lg">
              <table className="hidden md:table min-w-full text-white border border-white border-opacity-30 rounded-lg overflow-hidden">
                <thead className="bg-white bg-opacity-10 text-xs md:text-sm uppercase tracking-wider">
                  <tr>
                    <th className="py-2 px-2 md:px-4 border-b border-white border-opacity-20">
                      ID
                    </th>
                    <th className="py-2 px-2 md:px-4 border-b border-white border-opacity-20">
                      Nombre
                    </th>
                    <th className="py-2 px-2 md:px-4 border-b border-white border-opacity-20">
                      Fecha de Solicitud
                    </th>
                    <th className="py-2 px-2 md:px-4 border-b border-white border-opacity-20">
                      Tipo
                    </th>
                    <th className="py-2 px-2 md:px-4 border-b border-white border-opacity-20">
                      Estado
                    </th>
                    <th className="py-2 px-2 md:px-4 border-b border-white border-opacity-20">
                      Acción
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {solicitudes.map((solicitud) => (
                    <tr
                      key={solicitud.request_id}
                      className="border-b border-white border-opacity-20 hover:bg-white hover:bg-opacity-5 transition duration-300"
                    >
                      <td className="py-2 px-2 md:px-4">
                        {solicitud.request_id}
                      </td>
                      <td className="py-2 px-2 md:px-4">
                        {solicitud.full_name}
                      </td>
                      <td className="py-2 px-2 md:px-4">
                        {formatDateTime(solicitud.request_date)}
                      </td>
                      <td className="py-2 px-2 md:px-4">
                        {solicitud.loan_type}
                      </td>
                      <td
                        className={`py-2 px-2 md:px-4 ${getStatusClass(
                          solicitud.request_status
                        )}`}
                      >
                        {getStatusText(solicitud.request_status)}
                      </td>
                      <td className="py-2 px-2 md:px-4">
                        <button
                          className="text-blue-500 hover:underline"
                          onClick={() => handleViewMore(solicitud)}
                        >
                          Ver más
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="md:hidden">
                {solicitudes.map((solicitud) => (
                  <div
                    key={solicitud.request_id}
                    className="bg-transparent bg-opacity-80 opacity-80 border border-[#BBBBBB] p-4 lg:p-6 shadow-lg transform transition duration-500 hover:bg-opacity-100 hover:opacity-100"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-white">
                        ID: {solicitud.request_id}
                      </span>
                      <button
                        className="text-blue-500 text-sm hover:scale-105 px-2 py-1 hover:bg-blue-500 hover:text-white rounded-xl transition transform duration-500"
                        onClick={() => handleViewMore(solicitud)}
                      >
                        Ver más detalles
                      </button>
                    </div>
                    <div className="mb-2 text-white">
                      <span className="font-semibold">Nombre:</span>{" "}
                      {solicitud.full_name}
                    </div>
                    <div className="mb-2 text-white">
                      <span className="font-semibold">Fecha de Solicitud:</span>{" "}
                      {formatDateTime(solicitud.request_date)}
                    </div>
                    <div className="mb-2 text-white">
                      <span className="font-semibold">Tipo:</span>{" "}
                      {solicitud.loan_type}
                    </div>
                    <div className="mb-2 text-white">
                      <span className="font-semibold">Estado:</span>{" "}
                      <span
                        className={`inline-block p-2 rounded ${
                          solicitud.request_status === 0
                            ? "text-yellow-500"
                            : solicitud.request_status === 1
                            ? "text-green-500"
                            : solicitud.request_status === 2
                            ? "text-red-500"
                            : "text-orange-500"
                        }`}
                      >
                        {getStatusText(solicitud.request_status)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button
              className="mt-4 md:mt-6 btn-change-blue w-full py-2 bg-transparent border border-white text-white rounded-lg hover:bg-blue-500 hover:border-blue-500 transition duration-500"
              onClick={onClose}
            >
              Regresar
            </button>
          </motion.div>
        </motion.div>
      )}

      {selectedSolicitud && (
        <motion.div
          className="fixed inset-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md z-100 overflow-y-auto py-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="modal-content relative w-11/12 max-w-5xl p-4 md:p-8 rounded-lg shadow-lg border border-white bg-gray-300/20 z-50 overflow-y-auto max-h-full"
            initial={{ scale: 0.8, y: -50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.8, y: 50, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <button
              onClick={handleCloseDetails}
              className="absolute top-4 right-4"
            >
              <CloseIcon className="h-6 w-6 md:h-8 md:w-8 svg-icon text-white opacity-60 hover:opacity-100 transform translate duration-500" />
            </button>
            <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-center text-white">
              Detalles de la Solicitud
            </h2>
            <div className="text-white text-sm md:text-base space-y-2">
              <p>
                <strong>ID:</strong> {selectedSolicitud.request_id}
              </p>
              <p>
                <strong>Nombre:</strong> {selectedSolicitud.full_name}
              </p>
              <p>
                <strong>Correo Institucional:</strong>{" "}
                {selectedSolicitud.institutional_email}
              </p>
              <p>
                <strong>Teléfono:</strong> {selectedSolicitud.phone_number}
              </p>
              <p>
                <strong>Carrera:</strong> {selectedSolicitud.career}
              </p>
              <p>
                <strong>Semestre:</strong> {selectedSolicitud.semester}
              </p>
              <p>
                <strong>Fecha de Solicitud:</strong>{" "}
                {formatDateTime(selectedSolicitud.request_date)}
              </p>
              <p>
                <strong>Fecha de Devolución Esperada:</strong>{" "}
                {formatDateTime(selectedSolicitud.expected_return_date)}
              </p>
              <p>
                <strong>Motivo:</strong> {selectedSolicitud.request_reason}
              </p>
              <p>
                <strong>Materia:</strong> {selectedSolicitud.subject}
              </p>
              <p>
                <strong>Profesor:</strong> {selectedSolicitud.teacher}
              </p>
              <p>
                <strong>Grupo:</strong> {selectedSolicitud.group}
              </p>
              <p>
                <strong>Tipo:</strong> {selectedSolicitud.loan_type}
              </p>
              <p>
                <strong>Estado:</strong>{" "}
                <span
                  className={getStatusClass(selectedSolicitud.request_status)}
                >
                  {getStatusText(selectedSolicitud.request_status)}
                </span>
              </p>
              {selectedSolicitud.loan_type === "Material" && (
                <div className="flex flex-col space-y-4">
                  <button
                    className="w-full mt-4 md:mt-6 btn-change-blue py-2 bg-transparent border border-white text-white rounded-lg hover:bg-blue-500 hover:border-blue-500 transition duration-500"
                    onClick={handleOpenQrModal}
                  >
                    Ver QR
                  </button>
                  <button
                    className="w-full mt-4 md:mt-6 btn-change-blue py-2 bg-transparent border border-white text-white rounded-lg hover:bg-blue-500 hover:border-blue-500 transition duration-500"
                    onClick={handleOpenMaterialsModal}
                  >
                    Ver Materiales Solicitados
                  </button>
                </div>
              )}
              {selectedSolicitud.loan_type === "Máquina" && (
                <div className="space-y-2">
                  <p>
                    <strong>Equipo Solicitado:</strong>{" "}
                    {selectedSolicitud.selected_material}
                  </p>
                  <p>
                    <strong>Hora de Inicio:</strong>{" "}
                    {formatDateTime(selectedSolicitud.start_time)}
                  </p>
                  <p>
                    <strong>Hora de Fin:</strong>{" "}
                    {formatDateTime(selectedSolicitud.end_time)}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}

      <MaterialsModal
        show={showMaterialsModal}
        onClose={handleCloseMaterialsModal}
        materials={selectedMaterials}
      />

      <Modal
        title="QR Code"
        visible={isQrModalVisible}
        onCancel={handleCloseQrModal}
        footer={null}
        centered
        width={800} // Adjust the width as needed
      >
        <div className="flex justify-center">
          <img
            src={qrCodeUrl}
            alt="QR Code"
            className="w-full h-auto max-w-lg"
          />
        </div>
      </Modal>
    </AnimatePresence>
  );
}

export default RequestsModal;
