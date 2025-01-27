import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import StepOne from "./RequestsStudentMaterial/StepOne";
import StepTwo from "./RequestsStudentMaterial/StepTwo";
import StepThree from "./RequestsStudentMaterial/StepThree";
import StepContextData from "./RequestsStudentMaterial/StepContextData"; // Importa el nuevo paso
import StepIndicator from "./StepIndicator";
import IconChevronLeft from "./Icons/IconChevronLeft";

const MaterialForm = ({ onBack }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4; // Actualiza el total de pasos

  // Define los estados para los datos
  const [fullName, setFullName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [institutionalEmail, setInstitutionalEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [career, setCareer] = useState("");
  const [semester, setSemester] = useState("");

  // Define los estados para los datos de StepTwo
  const [selectedMaterial, setSelectedMaterial] = useState({
    value: "",
    label: "",
    available_quantity: 0,
  });
  const [selectedQuantity, setSelectedQuantity] = useState("");
  const [requestDate, setRequestDate] = useState("");
  const [expectedReturnDate, setExpectedReturnDate] = useState("");
  const [selectedMaterials, setSelectedMaterials] = useState([]);

  // Define los estados para los datos de StepContextData
  const [reason, setReason] = useState({ value: "", label: "" });
  const [subject, setSubject] = useState({ value: "", label: "" });
  const [teacher, setTeacher] = useState({ value: "", label: "" });
  const [group, setGroup] = useState({ value: "", label: "" });

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <StepOne
            fullName={fullName}
            setFullName={setFullName}
            studentId={studentId}
            setStudentId={setStudentId}
            institutionalEmail={institutionalEmail}
            setInstitutionalEmail={setInstitutionalEmail}
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            career={career}
            setCareer={setCareer}
            semester={semester}
            setSemester={setSemester}
            handleNextStep={handleNextStep}
            onBack={onBack}
          />
        );
      case 2:
        return (
          <StepTwo
            selectedMaterial={selectedMaterial}
            setSelectedMaterial={setSelectedMaterial}
            selectedQuantity={selectedQuantity}
            setSelectedQuantity={setSelectedQuantity}
            requestDate={requestDate}
            setRequestDate={setRequestDate}
            expectedReturnDate={expectedReturnDate}
            setExpectedReturnDate={setExpectedReturnDate}
            selectedMaterials={selectedMaterials}
            setSelectedMaterials={setSelectedMaterials}
            handleNextStep={handleNextStep}
            handlePreviousStep={handlePreviousStep}
          />
        );
      case 3:
        return (
          <StepContextData
            reason={reason}
            setReason={setReason}
            subject={subject}
            setSubject={setSubject}
            teacher={teacher}
            setTeacher={setTeacher}
            group={group}
            setGroup={setGroup}
            handleNextStep={handleNextStep}
            handlePreviousStep={handlePreviousStep}
          />
        );
      case 4:
        return (
          <StepThree
            fullName={fullName}
            studentId={studentId}
            institutionalEmail={institutionalEmail}
            phoneNumber={phoneNumber}
            career={career}
            semester={semester}
            selectedMaterial={selectedMaterial}
            selectedQuantity={selectedQuantity}
            requestDate={requestDate}
            expectedReturnDate={expectedReturnDate}
            reason={reason}
            subject={subject}
            teacher={teacher}
            group={group}
            selectedMaterials={selectedMaterials}
            handlePreviousStep={handlePreviousStep}
            onBack={onBack}
          />
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      className="w-full mx-auto relative"
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <button
        onClick={onBack}
        className="absolute top-0 left-0 p-2 hidden sm:block"
      >
        <IconChevronLeft className="h-6 w-6 svg-icon text-white opacity-60 hover:opacity-100 transform translate duration-500" />
      </button>
      <h2 className="text-white font-bold text-2xl mb-3">
        Formulario para pedir material
      </h2>
      <ol className="step-indicator-list flex items-center w-full text-sm font-medium text-center text-[#757575] sm:text-base">
        <StepIndicator
          currentStep={currentStep}
          stepNumber={1}
          label="Datos Personales"
        />
        <StepIndicator
          currentStep={currentStep}
          stepNumber={2}
          label="Datos Materiales"
        />
        <StepIndicator
          currentStep={currentStep}
          stepNumber={3}
          label="Datos Contexto"
        />
        <StepIndicator
          currentStep={currentStep}
          stepNumber={4}
          label="Confirmación"
        />
      </ol>
      <AnimatePresence>
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {renderStep()}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default MaterialForm;
