import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DateInputField from "../../Input/DateInputField";
import ChevronRightIcon from "../Icons/ChevronRightIcon";
import ChevronLeftIcon from "../Icons/ChevronLeftIcon";
import PlusIcon from "../Icons/PlusIcon";
import AutocompleteField from "../../Input/AutocompleteField";
import SelectField from "../../Input/SelectField";
import axios from "axios";
import { Modal } from "antd";
import ShoppingCartIcon from "../Icons/ShoppingCartIcon"; // Importa el ícono de carrito
import TrashIcon from "../Icons/TrashIcon"; // Importa el ícono de eliminar
import "./Loader.css";

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
  selectedMaterials,
  setSelectedMaterials,
}) => {
  const [materials, setMaterials] = useState([]);
  const [materialInfo, setMaterialInfo] = useState(null);
  const [isImageModalVisible, setIsImageModalVisible] = useState(false);
  const [isCartModalVisible, setIsCartModalVisible] = useState(false);
  const [pagination, setPagination] = useState({ page: 1, limit: 10 });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [shakeCart, setShakeCart] = useState(false);

  useEffect(() => {
    fetchMaterials();
    // Cargar datos desde sessionStorage cuando el componente se monta
    const storedSelectedMaterials = JSON.parse(
      sessionStorage.getItem("selectedMaterials")
    );
    const storedRequestDate = sessionStorage.getItem("requestDate");
    const storedExpectedReturnDate =
      sessionStorage.getItem("expectedReturnDate");

    if (storedSelectedMaterials) setSelectedMaterials(storedSelectedMaterials);
    if (storedRequestDate) setRequestDate(storedRequestDate);
    if (storedExpectedReturnDate)
      setExpectedReturnDate(storedExpectedReturnDate);
  }, []);

  const fetchMaterials = async (search = "") => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_HOST_EXPRESS}/api/materials`,
        {
          params: {
            search,
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
    } finally {
      setLoading(false);
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

    if (selectedMaterials.length === 0)
      newErrors.selectedMaterials = "Debe seleccionar al menos un material";

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
      if (selectedMaterials.length === 0) {
        setShakeCart(true);
        setTimeout(() => setShakeCart(false), 2000);
      }
    } else {
      setErrors({});
      // Guardar los datos en sessionStorage
      sessionStorage.setItem(
        "selectedMaterials",
        JSON.stringify(selectedMaterials)
      );
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

  const handleOpenCartModal = () => {
    setIsCartModalVisible(true);
  };

  const handleCloseCartModal = () => {
    setIsCartModalVisible(false);
  };

  const generateQuantityOptions = (availableQuantity) => {
    const options = [];
    for (let i = 1; i <= availableQuantity; i++) {
      options.push({ value: i.toString(), label: i.toString() });
    }
    return options;
  };

  const addMaterialToCart = () => {
    if (selectedMaterial && selectedQuantity) {
      const existingMaterialIndex = selectedMaterials.findIndex(
        (item) => item.material_id === selectedMaterial.value
      );

      if (existingMaterialIndex !== -1) {
        // Si el material ya está en el carrito, suma la cantidad
        const updatedMaterials = [...selectedMaterials];
        updatedMaterials[existingMaterialIndex].quantity += parseInt(
          selectedQuantity,
          10
        );
        setSelectedMaterials(updatedMaterials);
      } else {
        // Si el material no está en el carrito, agrégalo
        const newMaterial = {
          material_id: selectedMaterial.value,
          label: selectedMaterial.label,
          quantity: parseInt(selectedQuantity, 10),
        };
        setSelectedMaterials([...selectedMaterials, newMaterial]);
      }

      setSelectedMaterial(null);
      setSelectedQuantity("");
      // Actualizar sessionStorage
      sessionStorage.setItem(
        "selectedMaterials",
        JSON.stringify(selectedMaterials)
      );
    }
  };

  const removeMaterialFromCart = (index) => {
    const updatedMaterials = selectedMaterials.filter((_, i) => i !== index);
    setSelectedMaterials(updatedMaterials);
    // Actualizar sessionStorage
    sessionStorage.setItem(
      "selectedMaterials",
      JSON.stringify(updatedMaterials)
    );
  };

  const today = new Date().toISOString().split("T")[0];
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);
  const maxDateString = maxDate.toISOString().split("T")[0];

  return (
    <div>
      {loading && (
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
      <div
        className={`w-full max-w-4xl mx-auto ${loading ? "opacity-50" : ""}`}
      >
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
                  selectedMaterial?.available_quantity || 0
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
            className="py-2 px-4 btn-change-blue bg-transparent text-white border rounded-lg hover:bg-blue-500 hover:border-blue-500 hover:text-white transition duration-500 flex items-center"
            type="button"
            onClick={addMaterialToCart}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 3 }}
          >
            <span className="mr-2">Agregar al carrito</span>
            <PlusIcon className="w-6 h-6" />
          </motion.button>
        </div>

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

      <Modal
        visible={isCartModalVisible}
        footer={null}
        onCancel={handleCloseCartModal}
        centered
      >
        <div className="p-6">
          <h3 className="text-2xl font-bold text-center mb-4">
            Carrito de Materiales
          </h3>
          <ul className="space-y-2">
            <AnimatePresence>
              {selectedMaterials.map((material, index) => (
                <motion.li
                  key={index}
                  className="flex justify-between items-center p-2 bg-gray-100 rounded-md"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex flex-col">
                    <span className="font-semibold">{material.label}</span>
                    <span className="text-sm">
                      Cantidad: {material.quantity}
                    </span>
                  </div>
                  <button
                    className="ml-4 text-black opacity-60 hover:text-red-700 hover:opacity-100 transform transition duration-500"
                    onClick={() => removeMaterialFromCart(index)}
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </div>
      </Modal>

      <div
        className={`fixed bottom-4 right-4 p-4 cursor-pointer opacity-60 hover:opacity-100 hover:scale-105 transform transition duration-300 ${
          shakeCart ? "animate-shake text-red-500" : ""
        }`}
        onClick={handleOpenCartModal}
      >
        <div className="relative text-white">
          <ShoppingCartIcon className="w-10 h-10" />
          {selectedMaterials.length > 0 && (
            <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-blue-100 bg-blue-600 rounded-full">
              {selectedMaterials.length}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default StepTwo;
