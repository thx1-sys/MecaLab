import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import Cookies from "js-cookie";
import ChevronLeftIcon from "../Icons/ChevronLeftIcon";
import SendIcon from "../Icons/SendIcon";
import HomeIcon from "../Icons/HomeIcon";
import confirmationImage from "../../../assets/Img/Img_10.png";
import "./Loader.css";

const StepThree = ({
  fullName,
  studentId,
  institutionalEmail,
  phoneNumber,
  career,
  semester,
  selectedMachine,
  requestDate,
  startTime,
  duration,
  reason,
  subject,
  teacher,
  group,
  handlePreviousStep,
  onBack,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // Nuevo estado para el mensaje de error

  const formatDateTimeForMySQL = (dateObj) => {
    const offset = dateObj.getTimezoneOffset() * 60000;
    const localTime = new Date(dateObj.getTime() - offset);
    return localTime.toISOString().slice(0, 19).replace("T", " ");
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setErrorMessage(""); // Limpiar el mensaje de error antes de enviar
    try {
      const token = sessionStorage.getItem("token") || Cookies.get("token");
      if (!token) {
        throw new Error("No token found");
      }

      const startDateObj = new Date(`${requestDate}T${startTime}`);
      const endDateObj = new Date(startDateObj.getTime() + duration * 3600000);

      const startMySQL = formatDateTimeForMySQL(startDateObj);
      const endMySQL = formatDateTimeForMySQL(endDateObj);

      const requestData = {
        machine_id: selectedMachine.value,
        start_time: startMySQL,
        end_time: endMySQL,
        student_id: studentId,
        full_name: fullName,
        institutional_email: institutionalEmail,
        phone_number: phoneNumber,
        career,
        semester,
        request_date: requestDate,
        expected_return_date: requestDate,
        selected_material: selectedMachine.label,
        material_quantity: 1,
        request_reason: reason.label,
        subject: subject.label,
        teacher: teacher.label,
        group: group.label,
        loan_type: "Máquina",
      };

      await axios.post(
        `${import.meta.env.VITE_HOST_EXPRESS}/api/machines/rent`,
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pasa el token como Bearer
          },
        }
      );

      sessionStorage.removeItem("fullName");
      sessionStorage.removeItem("studentId");
      sessionStorage.removeItem("institutionalEmail");
      sessionStorage.removeItem("phoneNumber");
      sessionStorage.removeItem("career");
      sessionStorage.removeItem("semester");
      sessionStorage.removeItem("selectedMachine");
      sessionStorage.removeItem("requestDate");
      sessionStorage.removeItem("startTime");
      sessionStorage.removeItem("duration");
      sessionStorage.removeItem("reason");
      sessionStorage.removeItem("subject");
      sessionStorage.removeItem("teacher");
      sessionStorage.removeItem("group");

      setIsSubmitted(true);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data); // Mostrar el mensaje de error del servidor
      } else {
        console.error("Error submitting request:", error);
      }
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
          {errorMessage && (
            <p className="text-center text-red-500 mt-4">{errorMessage}</p>
          )}
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
              <label className="block text-gray-400">Equipo:</label>
              <p className="text-white">{selectedMachine.label}</p>
            </div>
            <div className="mt-4">
              <label className="block text-gray-400">Fecha de solicitud:</label>
              <p className="text-white">{requestDate}</p>
            </div>
            <div className="mt-4">
              <label className="block text-gray-400">Hora de inicio:</label>
              <p className="text-white">{startTime}</p>
            </div>
            <div className="mt-4">
              <label className="block text-gray-400">Duración (horas):</label>
              <p className="text-white">{duration}</p>
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
    </motion.div>
  );
};

export default StepThree;
