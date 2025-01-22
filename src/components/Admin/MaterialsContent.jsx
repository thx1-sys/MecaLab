import React, { useState, useEffect, useRef } from "react";
import {
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  CameraOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { Table, notification, Modal } from "antd";

const MaterialsContent = () => {
  const [materials, setMaterials] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredMaterials, setFilteredMaterials] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentMaterial, setCurrentMaterial] = useState({
    name: "",
    description: "",
    total_quantity: 0,
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
    fetchMaterials();
  }, [pagination.current, pagination.pageSize, searchText]);

  const fetchMaterials = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_HOST_EXPRESS}/api/materials`,
        {
          params: {
            search: searchText,
            page: pagination.current,
            limit: pagination.pageSize,
          },
        }
      );
      setMaterials(response.data.materials);
      setFilteredMaterials(response.data.materials);
      setPagination({
        ...pagination,
        total: response.data.total,
      });
    } catch (error) {
      console.error("Error al obtener materiales:", error);
    }
    setIsLoading(false);
  };

  const handleSearch = () => {
    fetchMaterials();
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
    setCurrentMaterial({ name: "", description: "", total_quantity: 0 });
    setIsModalVisible(true);
  };

  const handleEdit = (material) => {
    setIsEditMode(true);
    setCurrentMaterial(material);
    setIsModalVisible(true);
  };

  const showDeleteConfirm = (id) => {
    Modal.confirm({
      title: "¿Estás seguro de que quieres eliminar este material?",
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
        `${import.meta.env.VITE_HOST_EXPRESS}/api/materials/${id}`
      );
      fetchMaterials();
      showNotification("success", "Material eliminado con éxito");
    } catch (error) {
      console.error("Error al eliminar material:", error);
      showNotification("error", "Error al eliminar material");
    }
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("name", currentMaterial.name);
    formData.append("description", currentMaterial.description);
    formData.append("total_quantity", currentMaterial.total_quantity);
    if (file) {
      formData.append("image", file);
    }

    try {
      if (isEditMode) {
        await axios.put(
          `${import.meta.env.VITE_HOST_EXPRESS}/api/materials/update/${
            currentMaterial.id
          }`,
          formData
        );
        showNotification("success", "Material actualizado con éxito");
      } else {
        await axios.post(
          `${import.meta.env.VITE_HOST_EXPRESS}/api/materials/add`,
          formData
        );
        showNotification("success", "Material agregado con éxito");
      }
      fetchMaterials();
      setIsModalVisible(false);
    } catch (error) {
      console.error("Error al guardar material:", error);
      showNotification("error", "Error al guardar material");
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
      title: "Cantidad",
      dataIndex: "total_quantity",
      key: "total_quantity",
    },
    {
      title: "Imagen",
      dataIndex: "image_url",
      key: "image_url",
      render: (text) =>
        text ? (
          <img
            src={text}
            alt="Material"
            style={{ width: "50px", cursor: "pointer" }}
            onClick={() => handleImageClick(text)}
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
        </div>
      ),
    },
  ];

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Administrar Materiales</h1>
        <div className="flex space-x-4">
          <div className="flex space-x-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar materiales"
                value={searchText}
                onChange={handleSearchInputChange}
                onKeyPress={handleSearchKeyPress}
                className="p-2 pl-10 border-[#0B192C]/30 border rounded-lg text-black placeholder-gray-400 text-sm w-64"
              />
              <SearchOutlined className="absolute left-3 top-3 text-gray-400" />
            </div>
            <button
              className="px-4 py-2 border-[#0B192C] text-xs text-[#0B192C] border rounded-xl transform transition duration-500 hover:scale-105 hover:bg-[#0B192C] hover:text-white hover:shadow-lg space-x-2"
              onClick={handleSearch}
            >
              <SearchOutlined />
            </button>
          </div>
          <button
            className="px-4 py-2 border-[#0B192C] text-xs text-[#0B192C] border rounded-xl transform transition duration-500 hover:scale-105 hover:bg-[#0B192C] hover:text-white hover:shadow-lg space-x-2"
            onClick={handleAdd}
          >
            <PlusOutlined />
            <span>Agregar Material</span>
          </button>
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={filteredMaterials}
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
            {isEditMode ? "Editar Material" : "Agregar Material"}
          </h2>
          <input
            type="text"
            placeholder="Nombre"
            value={currentMaterial.name}
            onChange={(e) =>
              setCurrentMaterial({ ...currentMaterial, name: e.target.value })
            }
            className="w-full p-2 mb-4 border rounded-lg"
          />
          <input
            type="text"
            placeholder="Descripción"
            value={currentMaterial.description}
            onChange={(e) =>
              setCurrentMaterial({
                ...currentMaterial,
                description: e.target.value,
              })
            }
            className="w-full p-2 mb-4 border rounded-lg"
          />
          <input
            type="number"
            placeholder="Cantidad Total"
            value={currentMaterial.total_quantity}
            onChange={(e) =>
              setCurrentMaterial({
                ...currentMaterial,
                total_quantity: e.target.value,
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
        <img src={imageSrc} alt="Material" style={{ width: "100%" }} />
      </Modal>
    </div>
  );
};

export default MaterialsContent;
