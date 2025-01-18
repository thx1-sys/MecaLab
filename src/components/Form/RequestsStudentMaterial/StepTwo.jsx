import React, { useState } from "react";
import { motion } from "framer-motion";
import DateInputField from "../../Input/DateInputField";
import ChevronRightIcon from "../Icons/ChevronRightIcon";
import ChevronLeftIcon from "../Icons/ChevronLeftIcon";
import AutocompleteField from "../../Input/AutocompleteField";
import SelectField from "../../Input/SelectField";

const StepTwo = ({ handleNextStep, onBack, handlePreviousStep }) => {
  const [selectedMaterial, setSelectedMaterial] = useState({
    value: "",
    label: "",
  });
  const [selectedQuantity, setSelectedQuantity] = useState("");
  const [requestDate, setRequestDate] = useState("");
  const [expectedReturnDate, setExpectedReturnDate] = useState("");
  const [materialInfo, setMaterialInfo] = useState(null);

  const handleNext = () => {
    handleNextStep();
  };

  const handleBack = () => {
    onBack();
  };

  const handleOpenMaterialInfo = (material) => {
    setMaterialInfo(material);
  };

  const materials = [
    { value: "1", label: "Material 1" },
    { value: "2", label: "Material 2" },
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
          Selecciona el material y la cantidad
        </motion.h2>
        <motion.form
          action="#"
          className="mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="grid gap-6 mb-6 sm:grid-cols-2">
            <motion.div
              className="col-span-2 sm:col-span-1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <DateInputField
                label="Fecha de solicitud"
                name="request-date"
                id="request-date"
                placeholder=""
                value={requestDate}
                onChange={(e) => setRequestDate(e.target.value)}
              />
            </motion.div>

            <motion.div
              className="col-span-2 sm:col-span-1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
            >
              <DateInputField
                label="Fecha de devolución esperada"
                name="expected-return-date"
                id="expected-return-date"
                placeholder=""
                value={expectedReturnDate}
                onChange={(e) => setExpectedReturnDate(e.target.value)}
              />
            </motion.div>

            <motion.div
              className="col-span-2 sm:col-span-1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.5 }}
            >
              <AutocompleteField
                label="Material solicitado"
                name="requested-material"
                id="requested-material"
                value={selectedMaterial}
                onChange={(newValue) => setSelectedMaterial(newValue)}
                options={materials}
              />
            </motion.div>

            <motion.div
              className="col-span-2 sm:col-span-1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.75 }}
            >
              <SelectField
                label="Cantidad de material"
                name="material-quantity"
                id="material-quantity"
                value={selectedQuantity}
                onChange={(e) => setSelectedQuantity(e.target.value)}
                options={[
                  { value: "1", label: "1" },
                  { value: "2", label: "2" },
                ]}
              />
            </motion.div>
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

export default StepTwo;
