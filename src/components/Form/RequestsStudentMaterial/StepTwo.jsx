import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import DateInputField from "../../Input/DateInputField";
import ChevronRightIcon from "../Icons/ChevronRightIcon";
import ChevronLeftIcon from "../Icons/ChevronLeftIcon";
import AutocompleteField from "../../Input/AutocompleteField";
import SelectField from "../../Input/SelectField";
import axios from "axios";
import { Modal } from "antd";

const StepTwo = ({
  selectedMaterial,
  setSelectedMaterial,
  selectedQuantity,
  setSelectedQuantity,
  requestDate,
  setRequestDate,
  expectedReturnDate,
  setExpectedReturnDate,
  handleNextStep,
  handlePreviousStep,
}) => {
  const [materials, setMaterials] = useState([]);
  const [materialInfo, setMaterialInfo] = useState(null);
  const [isImageModalVisible, setIsImageModalVisible] = useState(false);
  const [pagination, setPagination] = useState({ page: 1, limit: 10 });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchMaterials();
    // Cargar datos desde sessionStorage cuando el componente se monta
    const storedSelectedMaterial = JSON.parse(
      sessionStorage.getItem("selectedMaterial")
    );
    const storedSelectedQuantity = sessionStorage.getItem("selectedQuantity");
    const storedRequestDate = sessionStorage.getItem("requestDate");
    const storedExpectedReturnDate =
      sessionStorage.getItem("expectedReturnDate");

    if (storedSelectedMaterial) setSelectedMaterial(storedSelectedMaterial);
    if (storedSelectedQuantity) setSelectedQuantity(storedSelectedQuantity);
    if (storedRequestDate) setRequestDate(storedRequestDate);
    if (storedExpectedReturnDate)
      setExpectedReturnDate(storedExpectedReturnDate);
  }, []);

  const fetchMaterials = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_HOST_EXPRESS}/api/materials`,
        {
          params: {
            page: pagination.page,
            limit: pagination.limit,
          },
        }
      );
      const materialsData = response.data.materials.map((material) => ({
        value: material.id,
        label: material.name,
        image_url: material.image_url,
        available_quantity: material.available_quantity,
      }));
      setMaterials(materialsData);
    } catch (error) {
      console.error("Error al obtener materiales:", error);
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

    if (!selectedMaterial.value)
      newErrors.selectedMaterial = "El material es obligatorio";
    if (!selectedQuantity)
      newErrors.selectedQuantity = "La cantidad es obligatoria";

    // Permitir fecha igual a 'todayString'
    if (!requestDate) {
      newErrors.requestDate = "La fecha de solicitud es obligatoria";
    } else if (requestDate < todayString || requestDate > maxDateString) {
      newErrors.requestDate =
        "La fecha de solicitud debe estar dentro de los próximos 30 días";
    }

    if (!expectedReturnDate) {
      newErrors.expectedReturnDate =
        "La fecha de devolución esperada es obligatoria";
    } else if (
      expectedReturnDate < todayString ||
      expectedReturnDate > maxDateString
    ) {
      newErrors.expectedReturnDate =
        "La fecha de devolución debe estar dentro de los próximos 30 días";
    } else if (expectedReturnDate < requestDate) {
      newErrors.expectedReturnDate =
        "La fecha de devolución no puede ser menor que la fecha de solicitud";
    }

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
        "selectedMaterial",
        JSON.stringify(selectedMaterial)
      );
      sessionStorage.setItem("selectedQuantity", selectedQuantity);
      sessionStorage.setItem("requestDate", requestDate);
      sessionStorage.setItem("expectedReturnDate", expectedReturnDate);
      handleNextStep();
    }
  };

  const handleBack = () => {
    handlePreviousStep();
  };

  const handleOpenMaterialInfo = (material) => {
    setMaterialInfo(material);
    setSelectedMaterial(material);
  };

  const handleCloseImageModal = () => {
    setIsImageModalVisible(false);
  };

  const generateQuantityOptions = (availableQuantity) => {
    const options = [];
    for (let i = 1; i <= availableQuantity; i++) {
      options.push({ value: i.toString(), label: i.toString() });
    }
    return options;
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
          Selecciona el material y la cantidad
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
              <DateInputField
                label="Fecha de devolución esperada"
                name="expected-return-date"
                id="expected-return-date"
                placeholder=""
                value={expectedReturnDate}
                onChange={(e) => {
                  setExpectedReturnDate(e.target.value);
                  sessionStorage.setItem("expectedReturnDate", e.target.value);
                }}
                error={errors.expectedReturnDate}
                min={today}
                max={maxDateString}
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
                onChange={(newValue) => {
                  setSelectedMaterial(newValue);
                  sessionStorage.setItem(
                    "selectedMaterial",
                    JSON.stringify(newValue)
                  );
                  handleOpenMaterialInfo(newValue);
                }}
                options={materials}
                error={errors.selectedMaterial}
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
                onChange={(e) => {
                  setSelectedQuantity(e.target.value);
                  sessionStorage.setItem("selectedQuantity", e.target.value);
                }}
                options={generateQuantityOptions(
                  selectedMaterial.available_quantity
                )}
                error={errors.selectedQuantity}
              />
            </motion.div>
          </div>
        </motion.form>

        {materialInfo && materialInfo.image_url && (
          <div className="flex justify-center mt-4">
            <img
              src={materialInfo.image_url}
              alt={materialInfo.label}
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
        {materialInfo && (
          <img
            src={materialInfo.image_url}
            alt={materialInfo.label}
            className="w-full h-auto object-cover"
          />
        )}
      </Modal>
    </div>
  );
};

export default StepTwo;
