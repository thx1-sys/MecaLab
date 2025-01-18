import React, { useState, useEffect, useRef } from "react";
import Typing from "react-typing-effect";
import { motion } from "framer-motion";
import ButtonWhite from "../Button/ButtonWhite";
import FormComponent from "../Form/FormComponentStudent";
import "./MainStudentHome.css";

function MainStudentHome() {
  const [showParagraph, setShowParagraph] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const hasSeenWelcome = sessionStorage.getItem("hasSeenWelcome");

    if (hasSeenWelcome) {
      setShowForm(true);
    } else {
      const paragraphTimeout = setTimeout(() => setShowParagraph(true), 5000);
      const buttonTimeout = setTimeout(() => setShowButton(true), 6000);

      return () => {
        clearTimeout(paragraphTimeout);
        clearTimeout(buttonTimeout);
      };
    }
  }, []);

  const handleButtonClick = () => {
    setShowForm(true);
    sessionStorage.setItem("hasSeenWelcome", "true");
  };

  return (
    <main className="w-full h-[80vh] flex items-center justify-center">
      <div className="bg-transparent p-8 rounded-lg text-center w-full min-h-screen flex justify-center items-center">
        <div className="flex-grow">
          {!showForm && (
            <>
              <h1 className="text-4xl font-extrabold mb-4 text-white">
                <Typing
                  text={[
                    "¡Bienvenido al Sistema de Administración de Laboratorio!",
                  ]}
                  speed={50}
                  eraseDelay={1000000}
                />
                <span className="font-emoji">👋</span>
              </h1>
              {showParagraph && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-2xl text-white mb-8"
                >
                  Nombre de Usuario
                </motion.p>
              )}
              {showButton && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <ButtonWhite
                    text="Iniciar"
                    onClick={handleButtonClick}
                    width="200px"
                    height="50px"
                  />
                </motion.div>
              )}
            </>
          )}
          {showForm && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <FormComponent />
            </motion.div>
          )}
        </div>
      </div>
    </main>
  );
}

export default MainStudentHome;
