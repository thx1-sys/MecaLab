import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import DateInputField from "../../Input/DateInputField";
import ChevronRightIcon from "../Icons/ChevronRightIcon";
import ChevronLeftIcon from "../Icons/ChevronLeftIcon";
import AutocompleteField from "../../Input/AutocompleteField";
import axios from "axios";
import { Modal } from "antd";

const StepTwo = ({
  selectedMachine,
  setSelectedMachine,
  requestDate,
  setRequestDate,
  handleNextStep,
  handlePreviousStep,
  startTime,
  setStartTime,
  duration,
  setDuration,
}) => {
  const [machines, setMachines] = useState([]);
  const [machineInfo, setMachineInfo] = useState(null);
  const [isImageModalVisible, setIsImageModalVisible] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchMachines();
    // Cargar datos desde sessionStorage cuando el componente se monta
    const storedSelectedMachine = JSON.parse(
      sessionStorage.getItem("selectedMachine")
    );
    const storedRequestDate = sessionStorage.getItem("requestDate");
    const storedStartTime = sessionStorage.getItem("startTime");
    const storedDuration = sessionStorage.getItem("duration");

    if (storedSelectedMachine) setSelectedMachine(storedSelectedMachine);
    if (storedRequestDate) setRequestDate(storedRequestDate);
    if (storedStartTime) setStartTime(storedStartTime);
    if (storedDuration) setDuration(storedDuration);
  }, []);

  const fetchMachines = async (search = "") => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_HOST_EXPRESS}/api/machines/available`,
        {
          params: {
            search,
          },
        }
      );
      const machinesData = response.data.map((machine) => ({
        value: machine.id,
        label: machine.name,
        image_url: machine.image_url,
      }));
      setMachines(machinesData);
    } catch (error) {
      console.error("Error al obtener máquinas disponibles:", error);
    }
  };

  const validate = () => {
    const newErrors = {};

    // Ajusta el cálculo de 'today' para reflejar el día local sin horas
    const localToday = new Date();
    localToday.setHours(0, 0, 0, 0);
    const todayString = localToday.toISOString().split("T")[0];

    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30);
    maxDate.setHours(0, 0, 0, 0);
    const maxDateString = maxDate.toISOString().split("T")[0];

    if (!selectedMachine.value)
      newErrors.selectedMachine = "El equipo es obligatorio";
    if (!requestDate)
      newErrors.requestDate = "La fecha de solicitud es obligatoria";
    if (!startTime) newErrors.startTime = "La hora de inicio es obligatoria";
    if (!duration) newErrors.duration = "La duración es obligatoria";

    return newErrors;
  };

  const handleNext = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      // Guardar los datos en sessionStorage
      sessionStorage.setItem(
        "selectedMachine",
        JSON.stringify(selectedMachine)
      );
      sessionStorage.setItem("requestDate", requestDate);
      sessionStorage.setItem("startTime", startTime);
      sessionStorage.setItem("duration", duration);
      handleNextStep();
    }
  };

  const handleBack = () => {
    handlePreviousStep();
  };

  const handleOpenMachineInfo = (machine) => {
    setMachineInfo(machine);
    setSelectedMachine(machine);
  };

  const handleCloseImageModal = () => {
    setIsImageModalVisible(false);
  };

  const today = new Date().toISOString().split("T")[0];
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);
  const maxDateString = maxDate.toISOString().split("T")[0];

  return (
    <div>
      <div className="w-full max-w-4xl mx-auto">
        <motion.h2
          className="text-2xl font-bold text-center text-white mt-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Selecciona el equipo que deseas solicitar
        </motion.h2>
        <motion.form
          action="#"
          className="mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="grid gap-6 sm:grid-cols-2">
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
                onChange={(e) => {
                  setRequestDate(e.target.value);
                  sessionStorage.setItem("requestDate", e.target.value);
                }}
                error={errors.requestDate}
                min={today}
                max={maxDateString}
              />
            </motion.div>

            <motion.div
              className="col-span-2 sm:col-span-1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
            >
              <AutocompleteField
                label="Equipo solicitado"
                name="requested-machine"
                id="requested-machine"
                value={selectedMachine}
                onChange={(newValue) => {
                  setSelectedMachine(newValue);
                  sessionStorage.setItem(
                    "selectedMachine",
                    JSON.stringify(newValue)
                  );
                  handleOpenMachineInfo(newValue);
                }}
                options={machines}
                error={errors.selectedMachine}
              />
            </motion.div>

            <motion.div
              className="col-span-2 sm:col-span-1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.5 }}
            >
              <div className="flex flex-col">
                <label htmlFor="start-time" className="text-white">
                  Hora de inicio
                </label>
                <input
                  type="time"
                  id="start-time"
                  name="start-time"
                  value={startTime}
                  onChange={(e) => {
                    setStartTime(e.target.value);
                    sessionStorage.setItem("startTime", e.target.value);
                  }}
                  className="mt-1 p-2 rounded-md"
                />
                {errors.startTime && (
                  <span className="text-red-500">{errors.startTime}</span>
                )}
              </div>
            </motion.div>

            <motion.div
              className="col-span-2 sm:col-span-1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.75 }}
            >
              <div className="flex flex-col">
                <label htmlFor="duration" className="text-white">
                  Duración (horas)
                </label>
                <input
                  type="number"
                  id="duration"
                  name="duration"
                  value={duration}
                  onChange={(e) => {
                    setDuration(e.target.value);
                    sessionStorage.setItem("duration", e.target.value);
                  }}
                  className="mt-1 p-2 rounded-md"
                />
                {errors.duration && (
                  <span className="text-red-500">{errors.duration}</span>
                )}
              </div>
            </motion.div>
          </div>
        </motion.form>

        {machineInfo && machineInfo.image_url && (
          <div className="flex justify-center mt-4">
            <img
              src={machineInfo.image_url}
              alt={machineInfo.label}
              className="w-32 h-32 object-cover rounded-lg cursor-pointer"
              onClick={() => setIsImageModalVisible(true)}
            />
          </div>
        )}

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

      <Modal
        visible={isImageModalVisible}
        footer={null}
        onCancel={handleCloseImageModal}
        centered
      >
        {machineInfo && (
          <img
            src={machineInfo.image_url}
            alt={machineInfo.label}
            className="w-full h-auto object-cover"
          />
        )}
      </Modal>
    </div>
  );
};

export default StepTwo;
