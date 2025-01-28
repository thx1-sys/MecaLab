import React, { useState, useEffect, useRef } from "react";
import {
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  CameraOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { Table, notification, Modal } from "antd";

const MachineContent = () => {
  const [machines, setMachines] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredMachines, setFilteredMachines] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentMachine, setCurrentMachine] = useState({
    name: "",
    description: "",
  });
  const [file, setFile] = useState(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isImageModalVisible, setIsImageModalVisible] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    fetchMachines();
  }, [pagination.current, pagination.pageSize, searchText]);

  const fetchMachines = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_HOST_EXPRESS}/api/machines`,
        {
          params: {
            search: searchText,
            page: pagination.current,
            limit: pagination.pageSize,
          },
        }
      );
      setMachines(response.data);
      setFilteredMachines(response.data);
      setPagination({
        ...pagination,
        total: response.data.length,
      });
    } catch (error) {
      console.error("Error al obtener máquinas:", error);
    }
    setIsLoading(false);
  };

  const handleSearch = () => {
    fetchMachines();
  };

  const handleSearchInputChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearchKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleAdd = () => {
    setIsEditMode(false);
    setCurrentMachine({
      name: "",
      description: "",
    });
    setIsModalVisible(true);
  };

  const handleEdit = (machine) => {
    setIsEditMode(true);
    setCurrentMachine(machine);
    setIsModalVisible(true);
  };

  const showDeleteConfirm = (id) => {
    Modal.confirm({
      title: "¿Estás seguro de que quieres eliminar esta máquina?",
      content: "Esta acción no se puede deshacer.",
      okText: "Sí",
      okType: "danger",
      cancelText: "No",
      centered: true,
      onOk: () => handleDelete(id),
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_HOST_EXPRESS}/api/machines/${id}`
      );
      fetchMachines();
      showNotification("success", "Máquina eliminada con éxito");
    } catch (error) {
      console.error("Error al eliminar máquina:", error);
      showNotification("error", "Error al eliminar máquina");
    }
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("name", currentMachine.name);
    formData.append("description", currentMachine.description);
    if (file) {
      formData.append("image", file);
    }

    try {
      if (isEditMode) {
        await axios.put(
          `${import.meta.env.VITE_HOST_EXPRESS}/api/machines/update/${
            currentMachine.id
          }`,
          formData
        );
        showNotification("success", "Máquina actualizada con éxito");
      } else {
        await axios.post(
          `${import.meta.env.VITE_HOST_EXPRESS}/api/machines/add`,
          formData
        );
        showNotification("success", "Máquina agregada con éxito");
      }
      fetchMachines();
      setIsModalVisible(false);
    } catch (error) {
      console.error("Error al guardar máquina:", error);
      showNotification("error", "Error al guardar máquina");
    }
  };

  const handleToggleEnable = async (id, isEnabled) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_HOST_EXPRESS}/api/machines/toggle/${id}`,
        { is_enabled: !isEnabled }
      );
      fetchMachines();
      showNotification("success", "Estado de la máquina actualizado con éxito");
    } catch (error) {
      console.error("Error al actualizar el estado de la máquina:", error);
      showNotification("error", "Error al actualizar el estado de la máquina");
    }
  };

  const openCamera = () => {
    setIsCameraOpen(true);
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      })
      .catch((err) => {
        console.error("Error al acceder a la cámara:", err);
      });
  };

  const capturePhoto = () => {
    const context = canvasRef.current.getContext("2d");
    context.drawImage(
      videoRef.current,
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
    canvasRef.current.toBlob((blob) => {
      setFile(blob);
      setIsCameraOpen(false);
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
    });
  };

  const showNotification = (type, message) => {
    notification[type]({
      message: message,
      placement: "bottomRight",
    });
  };

  const handleImageClick = (src) => {
    setImageSrc(src);
    setIsImageModalVisible(true);
  };

  const handleTableChange = (pagination) => {
    setPagination({
      ...pagination,
      current: pagination.current,
      pageSize: pagination.pageSize,
    });
  };

  const columns = [
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Descripción",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Imagen",
      dataIndex: "image_url",
      key: "image_url",
      render: (text) =>
        text ? (
          <img
            src={`${import.meta.env.VITE_HOST_EXPRESS}${text}`}
            alt="Máquina"
            style={{ width: "50px", cursor: "pointer" }}
            onClick={() =>
              handleImageClick(`${import.meta.env.VITE_HOST_EXPRESS}${text}`)
            }
          />
        ) : (
          "No Image"
        ),
    },
    {
      title: "Acciones",
      key: "actions",
      render: (text, record) => (
        <div className="flex justify-center space-x-2">
          <button
            className="text-blue-500 border border-blue-500 rounded px-2 py-1 transition duration-500 transform hover:bg-blue-500 hover:text-white"
            onClick={() => handleEdit(record)}
          >
            <EditOutlined />
          </button>
          <button
            className="text-red-500 border border-red-500 rounded px-2 py-1 transition duration-500 transform hover:bg-red-500 hover:text-white"
            onClick={() => showDeleteConfirm(record.id)}
          >
            <DeleteOutlined />
          </button>
          <button
            className={`${
              record.is_enabled ? "text-green-500" : "text-gray-500"
            } border border-green-500 rounded px-2 py-1 transition duration-500 transform ${
              record.is_enabled
                ? "hover:bg-green-500 hover:text-white"
                : "hover:bg-gray-500 hover:text-white"
            }`}
            onClick={() => handleToggleEnable(record.id, record.is_enabled)}
          >
            {record.is_enabled ? <CheckOutlined /> : <CloseOutlined />}
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl sm:text-2xl font-bold mb-4">
          Administrar Máquinas
        </h1>
        <div className="flex space-x-4">
          <div className="flex space-x-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar máquinas..."
                value={searchText}
                onChange={handleSearchInputChange}
                onKeyPress={handleSearchKeyPress}
                className="w-full mb-4 sm:w-64 h-12 px-4 py-2 border-gray500 text-sm text-[#0B192C] border rounded-lg transform transition duration-500 focus:scale-105 focus:shadow-lg"
              />
            </div>
            <button
              className="text-xl w-32 h-12 rounded bg-emerald-500 text-white relative overflow-hidden group z-10 hover:text-white duration-1000"
              onClick={handleSearch}
            >
              <span className="absolute bg-emerald-600 w-36 h-36 rounded-full group-hover:scale-100 scale-0 -z-10 -left-2 -top-10 group-hover:duration-500 duration-700 origin-center transform transition-all"></span>
              <span className="absolute bg-emerald-800 w-36 h-36 -left-2 -top-10 rounded-full group-hover:scale-100 scale-0 -z-10 group-hover:duration-700 duration-500 origin-center transform transition-all"></span>
              <SearchOutlined />
            </button>
            <button
              className="text-xl w-32 h-12 rounded bg-emerald-500 text-white relative overflow-hidden group z-10 hover:text-white duration-1000"
              onClick={handleAdd}
            >
              <span className="absolute bg-emerald-600 w-36 h-36 rounded-full group-hover:scale-100 scale-0 -z-10 -left-2 -top-10 group-hover:duration-500 duration-700 origin-center transform transition-all"></span>
              <span className="absolute bg-emerald-800 w-36 h-36 -left-2 -top-10 rounded-full group-hover:scale-100 scale-0 -z-10 group-hover:duration-700 duration-500 origin-center transform transition-all"></span>
              <PlusOutlined />
            </button>
          </div>
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={filteredMachines}
        loading={isLoading}
        rowKey="id"
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          position: ["bottomCenter"],
        }}
        onChange={handleTableChange}
      />
      <div
        className={`fixed inset-0 bg-gray-600 bg-opacity-50 ${
          isModalVisible ? "flex" : "hidden"
        } justify-center items-center`}
      >
        <div className="bg-white p-4 rounded-lg w-1/2">
          <h2 className="text-xl mb-4">
            {isEditMode ? "Editar Máquina" : "Agregar Máquina"}
          </h2>
          <input
            type="text"
            placeholder="Nombre"
            value={currentMachine.name}
            onChange={(e) =>
              setCurrentMachine({ ...currentMachine, name: e.target.value })
            }
            className="w-full p-2 mb-4 border rounded-lg"
          />
          <input
            type="text"
            placeholder="Descripción"
            value={currentMachine.description}
            onChange={(e) =>
              setCurrentMachine({
                ...currentMachine,
                description: e.target.value,
              })
            }
            className="w-full p-2 mb-4 border rounded-lg"
          />
          <div className="mb-4">
            <label className="block mb-2">Subir Imagen</label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 mb-4"
            onClick={openCamera}
          >
            <CameraOutlined />
            <span>Tomar Foto</span>
          </button>
          {isCameraOpen && (
            <div className="mb-4">
              <video ref={videoRef} className="w-full mb-2" />
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-lg"
                onClick={capturePhoto}
              >
                Capturar Foto
              </button>
              <canvas
                ref={canvasRef}
                className="hidden"
                width="640"
                height="480"
              />
            </div>
          )}
          <div className="flex justify-end space-x-2">
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded-lg"
              onClick={() => setIsModalVisible(false)}
            >
              Cancelar
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              onClick={handleSave}
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
      <Modal
        visible={isImageModalVisible}
        footer={null}
        onCancel={() => setIsImageModalVisible(false)}
        centered
      >
        <img src={imageSrc} alt="Máquina" style={{ width: "100%" }} />
      </Modal>
    </div>
  );
};

export default MachineContent;
