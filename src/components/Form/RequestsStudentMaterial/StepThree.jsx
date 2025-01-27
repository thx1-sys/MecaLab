import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import Cookies from "js-cookie";
import { Modal } from "antd";
import ChevronLeftIcon from "../Icons/ChevronLeftIcon";
import HomeIcon from "../Icons/HomeIcon";
import SendIcon from "../Icons/SendIcon";
import confirmationImage from "../../../assets/Img/Img_10.png";
import "./Loader.css";

const StepThree = ({
  fullName,
  studentId,
  institutionalEmail,
  phoneNumber,
  career,
  semester,
  requestDate,
  expectedReturnDate,
  reason,
  subject,
  teacher,
  group,
  selectedMaterials,
  handlePreviousStep,
  onBack,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  console.log("selectedMaterials:", selectedMaterials);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const token = sessionStorage.getItem("token") || Cookies.get("token");
      if (!token) {
        throw new Error("No token found");
      }

      // Prepare materials data for the request
      const materials = selectedMaterials.map((material) => ({
        material_id: material.material_id,
        quantity: material.quantity,
      }));

      // Submit the request
      const requestResponse = await axios.post(
        `${import.meta.env.VITE_HOST_EXPRESS}/api/requests`,
        {
          student_id: studentId,
          full_name: fullName,
          institutional_email: institutionalEmail,
          phone_number: phoneNumber,
          career,
          semester,
          request_date: requestDate,
          expected_return_date: expectedReturnDate,
          request_reason: reason.label,
          subject: subject.label,
          teacher: teacher.label,
          group: group.label,
          loan_type: "Material",
          materials,
          material_quantity: materials.reduce(
            (total, m) => total + m.quantity,
            0
          ), // Sum of all material quantities
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update material quantities
      for (const material of materials) {
        await axios.put(
          `${import.meta.env.VITE_HOST_EXPRESS}/api/materials/${
            material.material_id
          }/update-quantity`,
          { used_quantity: material.quantity },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      // Clear session storage
      sessionStorage.clear();

      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting request:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <motion.div
      className="w-full max-w-4xl mx-auto p-4 relative"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-50">
          <div className="loader">
            <div className="cell d-0"></div>
            <div className="cell d-1"></div>
            <div className="cell d-2"></div>
            <div className="cell d-1"></div>
            <div className="cell d-2"></div>
            <div className="cell d-2"></div>
            <div className="cell d-3"></div>
            <div className="cell d-3"></div>
            <div className="cell d-4"></div>
          </div>
        </div>
      )}

      {!isSubmitted ? (
        <>
          <h2 className="text-2xl font-bold text-center text-white mt-4">
            Confirmación
          </h2>
          <motion.form
            action="#"
            className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="mt-4">
              <label className="block text-gray-400">Nombre:</label>
              <p className="text-white">{fullName}</p>
            </div>
            <div className="mt-4">
              <label className="block text-gray-400">Número de control:</label>
              <p className="text-white">{studentId}</p>
            </div>
            <div className="mt-4 flex flex-col items-center">
              <label className="block text-gray-400">Materiales:</label>
              <button
                className="w-1/2 opacity-80 text-center bg-transparent text-white underline hover:scale-105 hover:opacity-100 hover:no-underline tansition duration-500 flex items-center justify-center"
                type="button"
                onClick={showModal}
              >
                Ver Materiales
              </button>
            </div>
            <div className="mt-4">
              <label className="block text-gray-400">Fecha de inicio:</label>
              <p className="text-white">{requestDate}</p>
            </div>
            <div className="mt-4">
              <label className="block text-gray-400">Fecha final:</label>
              <p className="text-white">{expectedReturnDate}</p>
            </div>
            <div className="mt-4">
              <label className="block text-gray-400">Motivo:</label>
              <p className="text-white">{reason.label}</p>
            </div>
            <div className="mt-4">
              <label className="block text-gray-400">Materia:</label>
              <p className="text-white">{subject.label}</p>
            </div>
            <div className="mt-4">
              <label className="block text-gray-400">Profesor:</label>
              <p className="text-white">{teacher.label}</p>
            </div>
            <div className="mt-4">
              <label className="block text-gray-400">Grupo:</label>
              <p className="text-white">{group.label}</p>
            </div>
          </motion.form>

          <p className="text-center text-white mt-4">
            ¿Desea confirmar la solicitud?
          </p>

          <div className="flex justify-center space-x-4 mt-4">
            <motion.button
              className="py-2 px-4 btn-confirm-no bg-transparent text-white border rounded-lg hover:bg-white hover:text-black transition duration-500 flex items-center w-40 justify-center"
              type="button"
              onClick={handlePreviousStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
            >
              <ChevronLeftIcon className="w-6 h-6" />
              <span className="ml-2">Regresar</span>
            </motion.button>
            <motion.button
              className="py-2 px-4 btn-confirm-no bg-transparent text-white border rounded-lg hover:bg-white hover:text-black transition duration-500 flex items-center w-40 justify-center"
              type="button"
              onClick={handleSubmit}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.25 }}
              disabled={isLoading || isSubmitted}
            >
              <SendIcon className="w-6 h-6 mr-2" />
              <span>Enviar</span>
            </motion.button>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-full">
          <h2 className="text-2xl font-bold text-center text-white mt-4">
            Solicitud enviada
          </h2>
          <motion.img
            src={confirmationImage}
            alt="Envio exitoso"
            className="w-48 h-48 mt-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          />
          <motion.button
            className="py-2 px-4 btn-confirm-no bg-transparent text-white border rounded-lg hover:bg-white hover:text-black transition duration-500 flex items-center w-40 justify-center mt-4"
            type="button"
            onClick={onBack}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <HomeIcon className="w-6 h-6" />
            <span className="ml-2">Inicio</span>
          </motion.button>
        </div>
      )}

      <Modal
        title="Materiales Seleccionados"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        centered // Add this line to center the modal
        footer={[]}
      >
        <ul className="space-y-2">
          {selectedMaterials.map((material, index) => (
            <li
              key={index}
              className="flex justify-between items-center p-2 bg-gray-100 rounded-md"
            >
              <span>{material.label}</span>
              <span className="font-semibold">
                Cantidad: {material.quantity}
              </span>
            </li>
          ))}
        </ul>
      </Modal>
    </motion.div>
  );
};

export default StepThree;
