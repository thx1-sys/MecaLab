import React, { useState } from "react";
import { motion } from "framer-motion";
import ChevronLeftIcon from "../Icons/ChevronLeftIcon";
import SendIcon from "../Icons/SendIcon";
import "./Loader.css";

const StepThree = ({ handlePreviousStep, onBack }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 3000); // Simula un tiempo de espera de 3 segundos
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
              <p className="text-white">Juan Pérez</p>
            </div>
            <div className="mt-4">
              <label className="block text-gray-400">Número de control:</label>
              <p className="text-white">12345678</p>
            </div>
            <div className="mt-4">
              <label className="block text-gray-400">Material:</label>
              <p className="text-white">Laptop</p>
            </div>
            <div className="mt-4">
              <label className="block text-gray-400">Cantidad:</label>
              <p className="text-white">1</p>
            </div>
            <div className="mt-4">
              <label className="block text-gray-400">Fecha de inicio:</label>
              <p className="text-white">01/01/2023</p>
            </div>
            <div className="mt-4">
              <label className="block text-gray-400">Fecha final:</label>
              <p className="text-white">01/02/2023</p>
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
