import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import Cookies from "js-cookie";
import ChevronLeftIcon from "../Icons/ChevronLeftIcon";
import SendIcon from "../Icons/SendIcon";
import "./Loader.css";

const StepThree = ({
  fullName,
  studentId,
  institutionalEmail,
  phoneNumber,
  career,
  semester,
  selectedMaterial,
  selectedQuantity,
  requestDate,
  expectedReturnDate,
  reason,
  subject,
  teacher,
  group,
  handlePreviousStep,
  onBack,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_HOST_EXPRESS}/api/materials`
        );
        setMaterials(response.data.materials);
      } catch (error) {
        console.error("Error fetching materials:", error);
      }
    };

    fetchMaterials();
  }, []);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const token = sessionStorage.getItem("token") || Cookies.get("token");
      if (!token) {
        throw new Error("No token found");
      }

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
          material_id: selectedMaterial.value, // Use material_id instead of selected_material
          material_quantity: selectedQuantity,
          request_reason: reason.label,
          subject: subject.label,
          teacher: teacher.label,
          group: group.label,
          loan_type: "Material",
          selected_material: selectedMaterial.label, // Add selected_material to the request
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update material quantity
      await axios.put(
        `${import.meta.env.VITE_HOST_EXPRESS}/api/materials/${
          selectedMaterial.value
        }/update-quantity`,
        {
          used_quantity: selectedQuantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Clear session storage
      sessionStorage.removeItem("fullName");
      sessionStorage.removeItem("studentId");
      sessionStorage.removeItem("institutionalEmail");
      sessionStorage.removeItem("phoneNumber");
      sessionStorage.removeItem("career");
      sessionStorage.removeItem("semester");
      sessionStorage.removeItem("selectedMaterial");
      sessionStorage.removeItem("selectedQuantity");
      sessionStorage.removeItem("requestDate");
      sessionStorage.removeItem("expectedReturnDate");
      sessionStorage.removeItem("reason");
      sessionStorage.removeItem("subject");
      sessionStorage.removeItem("teacher");
      sessionStorage.removeItem("group");

      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting request:", error);
    } finally {
      setIsLoading(false);
    }
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
            <div className="mt-4">
              <label className="block text-gray-400">Material:</label>
              <p className="text-white">{selectedMaterial.label}</p>
            </div>
            <div className="mt-4">
              <label className="block text-gray-400">Cantidad:</label>
              <p className="text-white">{selectedQuantity}</p>
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
          <motion.button
            className="py-2 px-4 btn-confirm-no bg-transparent text-white border rounded-lg hover:bg-white hover:text-black transition duration-500 flex items-center w-40 justify-center mt-4"
            type="button"
            onClick={onBack}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <ChevronLeftIcon className="w-6 h-6" />
            <span className="ml-2">Regresar</span>
          </motion.button>
        </div>
      )}
    </motion.div>
  );
};

export default StepThree;
