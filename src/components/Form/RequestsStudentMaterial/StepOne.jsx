import React, { useState } from "react";
import { motion } from "framer-motion";
import InputField from "../../Input/InputField";
import SelectField from "../../Input/SelectField";
import ChevronRightIcon from "../Icons/ChevronRightIcon";
import ChevronLeftIcon from "../Icons/ChevronLeftIcon";

const StepOne = ({
  fullName,
  setFullName,
  studentId,
  setStudentId,
  institutionalEmail,
  setInstitutionalEmail,
  phoneNumber,
  setPhoneNumber,
  career,
  setCareer,
  semester,
  setSemester,
  handleNextStep,
  onBack,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [errors, setErrors] = useState({});

  const handleNext = () => {
    setErrors({}); // Reset errors
    handleNextStep();
  };

  const handleBack = () => {
    setIsVisible(false);
    setTimeout(onBack, 0); // Call onBack immediately after setting isVisible to false
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {isVisible && (
        <>
          <motion.h2
            className="text-2xl font-bold text-center text-white mt-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Ingresa tus datos
          </motion.h2>
          <motion.form
            action="#"
            className="mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="grid gap-6 mb-6 sm:grid-cols-2">
              <InputField
                label="Nombre completo"
                type="text"
                name="full-name"
                id="full-name"
                placeholder="Escribe tu nombre completo"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                error={errors.fullName}
                delay={1}
              />
              <InputField
                label="Número de control"
                type="text"
                name="student-id"
                id="student-id"
                placeholder="Escribe tu número de control"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                error={errors.studentId}
                delay={1.25}
              />
              <InputField
                label="Correo electrónico institucional"
                type="email"
                name="institutional-email"
                id="institutional-email"
                placeholder="ejemplo@itdurango.edu.mx"
                value={institutionalEmail}
                onChange={(e) => setInstitutionalEmail(e.target.value)}
                error={errors.institutionalEmail}
                delay={1.5}
              />
              <InputField
                label="Número de teléfono"
                type="tel"
                name="phone-number"
                id="phone-number"
                placeholder="Escribe tu número de teléfono"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                error={errors.phoneNumber}
                delay={1.75}
              />
              <SelectField
                label="Carrera"
                name="career"
                id="career"
                options={[
                  { value: "", label: "Selecciona tu carrera" },
                  { value: "mecanica", label: "Mecánica" },
                  { value: "mecatronica", label: "Mecatrónica" },
                ]}
                value={career}
                onChange={setCareer}
                error={errors.career}
                delay={2}
              />
              <SelectField
                label="Semestre"
                name="semester"
                id="semester"
                options={[
                  { value: "", label: "Selecciona tu semestre" },
                  { value: "1", label: "1" },
                  { value: "2", label: "2" },
                  { value: "3", label: "3" },
                  { value: "4", label: "4" },
                  { value: "5", label: "5" },
                  { value: "6", label: "6" },
                  { value: "7", label: "7" },
                  { value: "8", label: "8" },
                  { value: "9", label: "9" },
                  { value: "10", label: "10" },
                  { value: "11", label: "11" },
                  { value: "12", label: "12" },
                ]}
                value={semester}
                onChange={setSemester}
                error={errors.semester}
                delay={2.25}
              />
            </div>
          </motion.form>
          <div className="flex justify-center space-x-4 mt-4">
            <motion.button
              className="py-2 px-4 btn-confirm-no bg-transparent text-white border rounded-lg hover:bg-white hover:text-black transition duration-500 flex items-center"
              type="button"
              onClick={handleBack}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 2.5 }}
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
              transition={{ duration: 1, delay: 2.75 }}
            >
              <span className="mr-2">Siguiente</span>
              <ChevronRightIcon className="w-6 h-6" />
            </motion.button>
          </div>
        </>
      )}
    </div>
  );
};

export default StepOne;
