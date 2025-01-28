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
      className=" md:p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
        <h1 className="text-xl sm:text-2xl font-bold mb-4">
          Administrar Materias
        </h1>
        <div className="flex flex-wrap justify-center sm:justify-end space-x-2">
          <Input
            placeholder="Buscar materias..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onPressEnter={handleSearch}
            className="w-full mb-4  sm:w-64 h-12 px-4 py-2 border-gray500 text-sm text-[#0B192C] border rounded-lg transform transition duration-500 focus:scale-105 focus:shadow-lg"
          />
          <button
            className="text-xl w-32 h-12 rounded bg-emerald-500 text-white relative overflow-hidden group z-10 hover:text-white duration-1000"
            onClick={handleSearch}
          >
            <span className="absolute bg-emerald-600 w-36 h-36 rounded-full group-hover:scale-100 scale-0 -z-10 -left-2 -top-10 group-hover:duration-500 duration-700 origin-center transform transition-all"></span>
            <span className="absolute bg-emerald-800 w-36 h-36 -left-2 -top-10 rounded-full group-hover:scale-100 scale-0 -z-10 group-hover:duration-700 duration-500 origin-center transform transition-all"></span>
            <SearchOutlined />
          </button>
          <button
            className="text-sm w-32 h-12 rounded bg-emerald-500 text-white relative overflow-hidden group z-10 hover:text-white duration-1000"
            onClick={handleAdd}
          >
            <span className="absolute bg-emerald-600 w-36 h-36 rounded-full group-hover:scale-100 scale-0 -z-10 -left-2 -top-10 group-hover:duration-500 duration-700 origin-center transform transition-all"></span>
            <span className="absolute bg-emerald-800 w-36 h-36 -left-2 -top-10 rounded-full group-hover:scale-100 scale-0 -z-10 group-hover:duration-700 duration-500 origin-center transform transition-all"></span>
            <PlusOutlined />
          </button>
        </div>
      </div>
      <div className="md:p-4">
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
    <motion.div
      className=" md:p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
        <h1 className="text-xl sm:text-2xl font-bold mb-4">
          Administrar Grupos
        </h1>
        <div className="flex flex-wrap justify-center sm:justify-end space-x-2">
          <Input
            placeholder="Buscar grupos..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onPressEnter={handleSearch}
            className="w-full mb-4  sm:w-64 h-12 px-4 py-2 border-gray500 text-sm text-[#0B192C] border rounded-lg transform transition duration-500 focus:scale-105 focus:shadow-lg"
          />
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
      <div className="">
        <Table
          columns={columns}
          dataSource={data}
          loading={isLoading}
          rowKey="id"
          pagination={{ position: ["bottomCenter"] }}
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
    </motion.div>
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
    <motion.div
      className="md:p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
        <h1 className="text-xl sm:text-2xl font-bold mb-4">
          Administrar Docentes
        </h1>
        <div className="flex flex-wrap justify-center sm:justify-end space-x-2">
          <Input
            placeholder="Buscar docentes..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onPressEnter={handleSearch}
            className="w-full mb-4  sm:w-64 h-12 px-4 py-2 border-gray500 text-sm text-[#0B192C] border rounded-lg transform transition duration-500 focus:scale-105 focus:shadow-lg"
          />
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
      <div className="">
        <Table
          columns={columns}
          dataSource={data}
          loading={isLoading}
          rowKey="id"
          pagination={{ position: ["bottomCenter"] }}
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
    </motion.div>
  );
};

const ButtonOption = ({ label, onClick, width, isSelected }) => (
  <button
    className={`text-md md:text-xl ${width} h-12 rounded ${
      isSelected ? "bg-blue-900" : "bg-blue-500"
    } text-white relative overflow-hidden group z-10 hover:text-white duration-1000`}
    onClick={onClick}
  >
    <span className="absolute bg-blue-600 w-36 h-36 rounded-full group-hover:scale-100 scale-0 -z-10 -left-2 -top-10 group-hover:duration-500 duration-700 origin-center transform transition-all"></span>
    <span className="absolute bg-blue-800 w-36 h-36 -left-2 -top-10 rounded-full group-hover:scale-100 scale-0 -z-10 group-hover:duration-700 duration-500 origin-center transform transition-all"></span>
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
      className="p-4 sm:p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-0">
          Configuración
        </h1>
        <div className="flex flex-wrap justify-center sm:justify-end space-x-2">
          <ButtonOption
            label="Materias"
            onClick={() => setSelectedOption("Materias")}
            width="w-24 sm:w-32"
            isSelected={selectedOption === "Materias"}
          />
          <ButtonOption
            label="Grupos"
            onClick={() => setSelectedOption("Grupos")}
            width="w-24 sm:w-32"
            isSelected={selectedOption === "Grupos"}
          />
          <ButtonOption
            label="Docentes"
            onClick={() => setSelectedOption("Docentes")}
            width="w-24 sm:w-32"
            isSelected={selectedOption === "Docentes"}
          />
        </div>
      </div>
      <div className="p-2 sm:p-4">{renderContent()}</div>
      <div className="flex flex-col space-y-8 mt-6">
        <h2 className="text-xl font-bold md:mb-4">Configuración General</h2>
        <div className="flex items-center space-x-2 md:ml-12">
          <label className="relative inline-block h-7 w-[48px] cursor-pointer rounded-full bg-gray-900 transition [-webkit-tap-highlight-color:_transparent] has-[:checked]:bg-[#1976D2]">
            <input
              type="checkbox"
              id="toggleRequests"
              className="peer sr-only"
            />
            <span className="absolute inset-y-0 start-0 m-1 size-5 rounded-full bg-gray-300 ring-[5px] ring-inset ring-white transition-all peer-checked:start-7 bg-gray-900 peer-checked:w-2 peer-checked:bg-white peer-checked:ring-transparent"></span>
          </label>
          <span>Desactivar Solicitudes</span>
        </div>
        <div className="flex items-center space-x-2 md:ml-12">
          <label className="relative inline-block h-7 w-[48px] cursor-pointer rounded-full bg-gray-900 transition [-webkit-tap-highlight-color:_transparent] has-[:checked]:bg-[#1976D2]">
            <input type="checkbox" id="toggleSystem" className="peer sr-only" />
            <span className="absolute inset-y-0 start-0 m-1 size-5 rounded-full bg-gray-300 ring-[5px] ring-inset ring-white transition-all peer-checked:start-7 bg-gray-900 peer-checked:w-2 peer-checked:bg-white peer-checked:ring-transparent"></span>
          </label>
          <span>Desactivar Inicio al Sistema</span>
        </div>
        <div className="bg-transparent w-full h-[10vh] md:hidden"></div>
      </div>
    </motion.div>
  );
};

export default SettingsContent;
