import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./FormComponentStudent.css";
import { MaterialIcon } from "./Icons/MaterialIcon";
import { MachineIcon } from "./Icons/MachineIcon";
import { RequestsIcon } from "./Icons/RequestsIcon";
import MaterialForm from "./MaterialForm";
import MachineForm from "./MachineForm";
import RequestsModal from "../Modal/RequestsModal";

function FormComponentStudent() {
  const [view, setView] = useState("main");
  const [showModal, setShowModal] = useState(false);

  const buttonBase =
    "bg-[#D9D9D9] bg-opacity-10 border border-white text-white font-medium rounded-xl hover:bg-white hover:text-black hover:bg-opacity-100 transition transform duration-500 hover-shadow-white";

  const renderView = () => {
    if (view === "requests") {
      return (
        <RequestsModal
          onClose={() => {
            setShowModal(false);
            setView("main");
          }}
          show={showModal}
        />
      );
    }

    return (
      <div className="flex justify-center items-center min-h-screen ">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5 }}
          className={`form-style rounded-3xl p-8 border-[#999999] border-2 w-full ${
            view === "material" ? "max-w-5xl" : "max-w-xl"
          } z-50`} // Added z-50 class here
        >
          <AnimatePresence exitBeforeEnter>
            {(() => {
              switch (view) {
                case "material":
                  return (
                    <motion.div
                      key="material"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.5 }}
                      className={view === "material" ? "w-full" : "w-auto"}
                    >
                      <MaterialForm onBack={() => setView("main")} />
                    </motion.div>
                  );
                case "machine":
                  return (
                    <motion.div
                      key="machine"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.5 }}
                      className={view === "machine" ? "w-full" : "w-auto"}
                    >
                      <MachineForm onBack={() => setView("main")} />
                    </motion.div>
                  );
                default:
                  return (
                    <>
                      <h2 className="text-2xl font-bold mb-6 text-center text-white">
                        Selecciona una opción para continuar con tu solicitud.
                      </h2>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className={`mb-4 flex justify-center space-x-4 ${
                          view === "material" ? "w-full" : "w-auto"
                        }`}
                      >
                        <button
                          className={`${buttonBase} w-1/2 py-8 px-4 mb-4 flex flex-col items-center justify-center`}
                          type="button"
                          onClick={() => setView("material")}
                        >
                          <MaterialIcon className="w-12 h-12 mb-2 fill-current" />
                          Pedir prestado material
                        </button>

                        <button
                          className={`${buttonBase} w-1/2 py-8 px-4 mb-4 flex flex-col items-center justify-center`}
                          type="button"
                          onClick={() => setView("machine")}
                        >
                          <MachineIcon className="w-12 h-12 mb-2 fill-current" />
                          Rentar una máquina
                        </button>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="flex items-center justify-center"
                      >
                        <button
                          className={`${buttonBase} w-auto py-4 px-6 mb-4 flex items-center justify-center`}
                          type="button"
                          onClick={() => {
                            setShowModal(true);
                            setView("requests");
                          }}
                        >
                          <RequestsIcon className="w-6 h-6 mr-2" />
                          Ver solicitudes enviadas
                        </button>
                      </motion.div>
                    </>
                  );
              }
            })()}
          </AnimatePresence>
        </motion.div>
      </div>
    );
  };

  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          {renderView()}
        </motion.div>
      </AnimatePresence>
    </>
  );
}

export default FormComponentStudent;
