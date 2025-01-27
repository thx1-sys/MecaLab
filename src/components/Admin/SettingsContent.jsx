import React, { useState, useEffect } from "react";
import {
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { Table, notification, Modal, Input, Button } from "antd";
import { motion } from "framer-motion";

// Configurar la posición de las notificaciones
notification.config({
  placement: "bottomRight",
});

const StyledButton = ({ icon, label, onClick }) => (
  <button
    className="flex items-center justify-center h-12 px-4 py-2 border-[#0B192C] text-sm text-[#0B192C] border rounded-xl transform transition duration-500 hover:scale-105 hover:bg-[#0B192C] hover:text-white hover:shadow-lg"
    onClick={onClick}
  >
    {icon}
    {label && <span className="ml-2">{label}</span>}
  </button>
);

const Materias = () => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentMateria, setCurrentMateria] = useState({ nombre_materia: "" });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchMaterias();
  }, [searchText]);

  const fetchMaterias = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_HOST_EXPRESS}/api/academic/subjects/search`,
        {
          params: { nombre_materia: searchText },
        }
      );
      setData(response.data);
    } catch (error) {
      notification.error({ message: "Error al obtener materias" });
    }
    setIsLoading(false);
  };

  const handleSearch = () => {
    fetchMaterias();
  };

  const handleAdd = () => {
    setIsEditMode(false);
    setCurrentMateria({ nombre_materia: "" });
    setIsModalVisible(true);
  };

  const handleEdit = (materia) => {
    setIsEditMode(true);
    setCurrentMateria(materia);
    setIsModalVisible(true);
  };

  const handleDeleteConfirm = (id) => {
    Modal.confirm({
      title: "¿Eliminar materia?",
      okText: "Sí",
      okType: "danger",
      cancelText: "No",
      onOk: () => handleDelete(id),
      centered: true,
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_HOST_EXPRESS}/api/academic/subjects/${id}`
      );
      notification.success({ message: "Materia eliminada" });
      fetchMaterias();
    } catch (error) {
      notification.error({ message: "Error al eliminar materia" });
    }
  };

  const handleSave = async () => {
    try {
      if (isEditMode) {
        await axios.put(
          `${import.meta.env.VITE_HOST_EXPRESS}/api/academic/subjects/${
            currentMateria.id
          }`,
          currentMateria
        );
        notification.success({ message: "Materia actualizada" });
      } else {
        await axios.post(
          `${import.meta.env.VITE_HOST_EXPRESS}/api/academic/subjects`,
          currentMateria
        );
        notification.success({ message: "Materia agregada" });
      }
      setIsModalVisible(false);
      fetchMaterias();
    } catch (error) {
      notification.error({ message: "Error al guardar materia" });
    }
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Nombre", dataIndex: "nombre_materia", key: "nombre_materia" },
    {
      title: "Acciones",
      key: "actions",
      render: (_, record) => (
        <div className="flex justify-center space-x-2">
          <button
            className="text-blue-500 border border-blue-500 rounded px-2 py-1 transition duration-500 transform hover:bg-blue-500 hover:text-white"
            onClick={() => handleEdit(record)}
          >
            <EditOutlined />
          </button>
          <button
            className="text-red-500 border border-red-500 rounded px-2 py-1 transition duration-500 transform hover:bg-red-500 hover:text-white"
            onClick={() => handleDeleteConfirm(record.id)}
          >
            <DeleteOutlined />
          </button>
        </div>
      ),
      width: 150,
    },
  ];

  return (
    <motion.div
      className=""
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Administrar Materias</h1>
        <div className="flex space-x-2">
          <Input
            placeholder="Buscar materias..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onPressEnter={handleSearch}
            className="w-64 h-12 px-4 py-2 border-[#0B192C] text-sm text-[#0B192C] border rounded-xl transform transition duration-500 focus:scale-105 focus:shadow-lg"
          />
          <StyledButton icon={<SearchOutlined />} onClick={handleSearch} />
          <StyledButton
            icon={<PlusOutlined />}
            onClick={handleAdd}
            label="Agregar Materia"
          />
        </div>
      </div>
      <div className="p-4">
        <Table
          columns={columns}
          dataSource={data}
          loading={isLoading}
          rowKey="id"
          pagination={{ position: ["bottomCenter"] }}
        />
      </div>
      <Modal
        title={isEditMode ? "Editar Materia" : "Agregar Materia"}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleSave}
        centered
      >
        <Input
          placeholder="Nombre"
          value={currentMateria.nombre_materia}
          onChange={(e) =>
            setCurrentMateria({
              ...currentMateria,
              nombre_materia: e.target.value,
            })
          }
          className="mb-2"
        />
      </Modal>
    </motion.div>
  );
};
const Grupos = () => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentGrupo, setCurrentGrupo] = useState({ nombre_grupo: "" });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchGrupos();
  }, [searchText]);

  const fetchGrupos = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_HOST_EXPRESS}/api/academic/groups/search`,
        {
          params: { nombre_grupo: searchText },
        }
      );
      setData(response.data);
    } catch (error) {
      notification.error({ message: "Error al obtener grupos" });
    }
    setIsLoading(false);
  };

  const handleSearch = () => {
    fetchGrupos();
  };

  const handleAdd = () => {
    setIsEditMode(false);
    setCurrentGrupo({ nombre_grupo: "" });
    setIsModalVisible(true);
  };

  const handleEdit = (grupo) => {
    setIsEditMode(true);
    setCurrentGrupo(grupo);
    setIsModalVisible(true);
  };

  const handleDeleteConfirm = (id) => {
    Modal.confirm({
      title: "¿Eliminar grupo?",
      okText: "Sí",
      okType: "danger",
      cancelText: "No",
      onOk: () => handleDelete(id),
      centered: true,
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_HOST_EXPRESS}/api/academic/groups/${id}`
      );
      notification.success({ message: "Grupo eliminado" });
      fetchGrupos();
    } catch (error) {
      notification.error({ message: "Error al eliminar grupo" });
    }
  };

  const handleSave = async () => {
    try {
      if (isEditMode) {
        await axios.put(
          `${import.meta.env.VITE_HOST_EXPRESS}/api/academic/groups/${
            currentGrupo.id
          }`,
          currentGrupo
        );
        notification.success({ message: "Grupo actualizado" });
      } else {
        await axios.post(
          `${import.meta.env.VITE_HOST_EXPRESS}/api/academic/groups`,
          currentGrupo
        );
        notification.success({ message: "Grupo agregado" });
      }
      setIsModalVisible(false);
      fetchGrupos();
    } catch (error) {
      notification.error({ message: "Error al guardar grupo" });
    }
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Nombre", dataIndex: "nombre_grupo", key: "nombre_grupo" },
    {
      title: "Acciones",
      key: "actions",
      render: (_, record) => (
        <div className="flex justify-center space-x-2">
          <button
            className="text-blue-500 border border-blue-500 rounded px-2 py-1 transition duration-500 transform hover:bg-blue-500 hover:text-white"
            onClick={() => handleEdit(record)}
          >
            <EditOutlined />
          </button>
          <button
            className="text-red-500 border border-red-500 rounded px-2 py-1 transition duration-500 transform hover:bg-red-500 hover:text-white"
            onClick={() => handleDeleteConfirm(record.id)}
          >
            <DeleteOutlined />
          </button>
        </div>
      ),
      width: 150,
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Administrar Grupos</h1>
        <div className="flex space-x-2">
          <Input
            placeholder="Buscar grupos..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onPressEnter={handleSearch}
            className="w-64 h-12 px-4 py-2 border-[#0B192C] text-sm text-[#0B192C] border rounded-xl transform transition duration-500 focus:scale-105 focus:shadow-lg"
          />
          <StyledButton icon={<SearchOutlined />} onClick={handleSearch} />
          <StyledButton
            icon={<PlusOutlined />}
            onClick={handleAdd}
            label="Agregar Grupo"
          />
        </div>
      </div>
      <div className="p-4">
        <Table
          columns={columns}
          dataSource={data}
          loading={isLoading}
          rowKey="id"
          pagination={{ position: ["bottomCenter"] }} // Centra la paginación
        />
      </div>
      <Modal
        title={isEditMode ? "Editar Grupo" : "Agregar Grupo"}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleSave}
        centered
      >
        <Input
          placeholder="Nombre"
          value={currentGrupo.nombre_grupo}
          onChange={(e) =>
            setCurrentGrupo({
              ...currentGrupo,
              nombre_grupo: e.target.value,
            })
          }
          className="mb-2"
        />
      </Modal>
    </div>
  );
};

const Docentes = () => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentDocente, setCurrentDocente] = useState({ nombre_maestro: "" });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchDocentes();
  }, [searchText]);

  const fetchDocentes = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_HOST_EXPRESS}/api/academic/teachers/search`,
        {
          params: { nombre_maestro: searchText },
        }
      );
      setData(response.data);
    } catch (error) {
      notification.error({ message: "Error al obtener docentes" });
    }
    setIsLoading(false);
  };

  const handleSearch = () => {
    fetchDocentes();
  };

  const handleAdd = () => {
    setIsEditMode(false);
    setCurrentDocente({ nombre_maestro: "" });
    setIsModalVisible(true);
  };

  const handleEdit = (docente) => {
    setIsEditMode(true);
    setCurrentDocente(docente);
    setIsModalVisible(true);
  };

  const handleDeleteConfirm = (id) => {
    Modal.confirm({
      title: "¿Eliminar docente?",
      okText: "Sí",
      okType: "danger",
      cancelText: "No",
      onOk: () => handleDelete(id),
      centered: true,
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_HOST_EXPRESS}/api/academic/teachers/${id}`
      );
      notification.success({ message: "Docente eliminado" });
      fetchDocentes();
    } catch (error) {
      notification.error({ message: "Error al eliminar docente" });
    }
  };

  const handleSave = async () => {
    try {
      if (isEditMode) {
        await axios.put(
          `${import.meta.env.VITE_HOST_EXPRESS}/api/academic/teachers/${
            currentDocente.id
          }`,
          currentDocente
        );
        notification.success({ message: "Docente actualizado" });
      } else {
        await axios.post(
          `${import.meta.env.VITE_HOST_EXPRESS}/api/academic/teachers`,
          currentDocente
        );
        notification.success({ message: "Docente agregado" });
      }
      setIsModalVisible(false);
      fetchDocentes();
    } catch (error) {
      notification.error({ message: "Error al guardar docente" });
    }
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Nombre", dataIndex: "nombre_maestro", key: "nombre_maestro" },
    {
      title: "Acciones",
      key: "actions",
      render: (_, record) => (
        <div className="flex justify-center space-x-2">
          <button
            className="text-blue-500 border border-blue-500 rounded px-2 py-1 transition duration-500 transform hover:bg-blue-500 hover:text-white"
            onClick={() => handleEdit(record)}
          >
            <EditOutlined />
          </button>
          <button
            className="text-red-500 border border-red-500 rounded px-2 py-1 transition duration-500 transform hover:bg-red-500 hover:text-white"
            onClick={() => handleDeleteConfirm(record.id)}
          >
            <DeleteOutlined />
          </button>
        </div>
      ),
      width: 150,
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Administrar Docentes</h1>
        <div className="flex space-x-2">
          <Input
            placeholder="Buscar docentes..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onPressEnter={handleSearch}
            className="w-64 h-12 px-4 py-2 border-[#0B192C] text-sm text-[#0B192C] border rounded-xl transform transition duration-500 focus:scale-105 focus:shadow-lg"
          />
          <StyledButton icon={<SearchOutlined />} onClick={handleSearch} />
          <StyledButton
            icon={<PlusOutlined />}
            onClick={handleAdd}
            label="Agregar Docente"
          />
        </div>
      </div>
      <div className="p-4">
        <Table
          columns={columns}
          dataSource={data}
          loading={isLoading}
          rowKey="id"
          pagination={{ position: ["bottomCenter"] }} // Centra la paginación
        />
      </div>
      <Modal
        title={isEditMode ? "Editar Docente" : "Agregar Docente"}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleSave}
        centered
      >
        <Input
          placeholder="Nombre"
          value={currentDocente.nombre_maestro}
          onChange={(e) =>
            setCurrentDocente({
              ...currentDocente,
              nombre_maestro: e.target.value,
            })
          }
          className="mb-2"
        />
      </Modal>
    </div>
  );
};

const ButtonOption = ({ label, onClick, width }) => (
  <button
    className={`flex items-center justify-center ${width} h-12 px-4 py-2 border-[#0B192C] text-sm text-[#0B192C] border rounded-xl transform transition duration-500 hover:scale-105 hover:bg-[#0B192C] hover:text-white hover:shadow-lg`}
    onClick={onClick}
  >
    {label}
  </button>
);

const SettingsContent = () => {
  const [selectedOption, setSelectedOption] = useState("Materias");

  const renderContent = () => {
    switch (selectedOption) {
      case "Materias":
        return <Materias />;
      case "Grupos":
        return <Grupos />;
      case "Docentes":
        return <Docentes />;
      default:
        return <Materias />;
    }
  };

  return (
    <motion.div
      className="p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Configuración</h1>
        <div className="flex space-x-2">
          <ButtonOption
            label="Materias"
            onClick={() => setSelectedOption("Materias")}
            width="w-32"
          />
          <ButtonOption
            label="Grupos"
            onClick={() => setSelectedOption("Grupos")}
            width="w-32"
          />
          <ButtonOption
            label="Docentes"
            onClick={() => setSelectedOption("Docentes")}
            width="w-32"
          />
        </div>
      </div>
      <div className="p-4">{renderContent()}</div>
    </motion.div>
  );
};

export default SettingsContent;
