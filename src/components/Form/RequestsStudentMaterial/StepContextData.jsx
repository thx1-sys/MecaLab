import React, { useState } from "react";
import { motion } from "framer-motion";
import ChevronRightIcon from "../Icons/ChevronRightIcon";
import ChevronLeftIcon from "../Icons/ChevronLeftIcon";
import AutocompleteField from "../../Input/AutocompleteField";

const StepContextData = ({ handleNextStep, handlePreviousStep }) => {
  const [reason, setReason] = useState({ value: "", label: "" });
  const [subject, setSubject] = useState({ value: "", label: "" });
  const [teacher, setTeacher] = useState({ value: "", label: "" });
  const [group, setGroup] = useState({ value: "", label: "" });

  const handleNext = () => {
    handleNextStep();
  };

  const reasons = [
    { value: "1", label: "Investigación" },
    { value: "2", label: "Proyecto" },
  ];

  const subjects = [
    { value: "1", label: "Matemáticas" },
    { value: "2", label: "Física" },
  ];

  const teachers = [
    { value: "1", label: "Profesor A" },
    { value: "2", label: "Profesor B" },
  ];

  const groups = [
    { value: "1", label: "Grupo 1" },
    { value: "2", label: "Grupo 2" },
  ];

  return (
    <>
      <div className="w-full max-w-4xl mx-auto p-4">
        <motion.h2
          className="text-2xl font-bold text-center text-white mt-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Ingrese los datos de contexto
        </motion.h2>
        <motion.form
          action="#"
          className="mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="grid gap-6 mb-6 sm:grid-cols-2">
            <AutocompleteField
              label="Motivo"
              name="reason"
              id="reason"
              value={reason}
              onChange={(newValue) => setReason(newValue)}
              options={reasons}
              delay={0.5}
            />
            <AutocompleteField
              label="Materia"
              name="subject"
              id="subject"
              value={subject}
              onChange={(newValue) => setSubject(newValue)}
              options={subjects}
              delay={1}
            />
            <AutocompleteField
              label="Profesor"
              name="teacher"
              id="teacher"
              value={teacher}
              onChange={(newValue) => setTeacher(newValue)}
              options={teachers}
              delay={1.5}
            />
            <AutocompleteField
              label="Grupo"
              name="group"
              id="group"
              value={group}
              onChange={(newValue) => setGroup(newValue)}
              options={groups}
              delay={1.75}
            />
          </div>
        </motion.form>

        <div className="flex justify-center space-x-4 mt-4">
          <motion.button
            className="py-2 px-4 btn-confirm-no bg-transparent text-white border rounded-lg hover:bg-white hover:text-black transition duration-500 flex items-center"
            type="button"
            onClick={handlePreviousStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 3 }}
          >
            <ChevronLeftIcon className="w-6 h-6" />
            <span className="ml-2">Regresar</span>
          </motion.button>
          <motion.button
            className="py-2 px-4 btn-confirm-no bg-transparent text-white border rounded-lg hover:bg-white hover:text-black transition duration-500 flex items-center"
            type="button"
            onClick={handleNext}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 3.25 }}
          >
            <span className="mr-2">Siguiente</span>
            <ChevronRightIcon className="w-6 h-6" />
          </motion.button>
        </div>
      </div>
    </>
  );
};

export default StepContextData;
