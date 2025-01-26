import React, { useState, useEffect } from "react";
import {
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { Table, notification, Modal, Select } from "antd";

const UsersContent = () => {
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isUserTypeModalVisible, setIsUserTypeModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    control_number: "",
    user_type: 1,
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [selectedUserType, setSelectedUserType] = useState(1);

  useEffect(() => {
    fetchUsers();
  }, [pagination.current, pagination.pageSize]);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_HOST_EXPRESS}/api/users`,
        {
          params: {
            firstName: searchText,
            page: pagination.current,
            limit: pagination.pageSize,
          },
        }
      );
      setUsers(response.data.users);
      setPagination({ ...pagination, total: response.data.total });
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    }
    setIsLoading(false);
  };

  const handleSearch = () => {
    fetchUsers();
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
    setIsUserTypeModalVisible(true);
  };

  const handleUserTypeSelect = () => {
    setCurrentUser({
      first_name: "",
      last_name: "",
      email: "",
      control_number: "",
      user_type: selectedUserType,
      password: "",
    });
    setIsUserTypeModalVisible(false);
    setIsModalVisible(true);
  };

  const handleEdit = (user) => {
    setIsEditMode(true);
    setCurrentUser(user);
    setIsModalVisible(true);
  };

  const handleDeleteConfirm = (id) => {
    Modal.confirm({
      title: "¿Eliminar usuario?",
      okText: "Sí",
      okType: "danger",
      cancelText: "No",
      onOk: () => handleDelete(id),
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_HOST_EXPRESS}/api/users/${id}`
      );
      showNotification("success", "Usuario eliminado");
      fetchUsers();
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      showNotification("error", "Error al eliminar usuario");
    }
  };

  const handleSave = async () => {
    try {
      const payload = {
        firstName: currentUser.first_name,
        lastName: currentUser.last_name,
        email: currentUser.email,
        password: currentUser.password,
        controlNumber: currentUser.control_number,
        userType: currentUser.user_type,
      };

      if (isEditMode) {
        await axios.put(
          `${import.meta.env.VITE_HOST_EXPRESS}/api/users/${currentUser.id}`,
          payload
        );
        showNotification("success", "Usuario actualizado");
      } else {
        await axios.post(
          `${import.meta.env.VITE_HOST_EXPRESS}/api/users/add`,
          payload
        );
        showNotification("success", "Usuario agregado");
      }
      setIsModalVisible(false);
      fetchUsers();
    } catch (error) {
      console.error("Error al guardar usuario:", error);
      showNotification("error", "Error al guardar usuario");
    }
  };

  const showNotification = (type, message) => {
    notification[type]({
      message,
      placement: "bottomRight",
    });
  };

  const handleTableChange = (newPagination) => {
    setPagination({
      ...newPagination,
      current: newPagination.current,
      pageSize: newPagination.pageSize,
    });
  };

  const columns = [
    { title: "Nombre", dataIndex: "first_name", key: "first_name" },
    { title: "Apellido", dataIndex: "last_name", key: "last_name" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Tipo",
      dataIndex: "user_type",
      key: "user_type",
      render: (text) => {
        switch (text) {
          case 1:
            return "Estudiante";
          case 2:
            return "Docente";
          case 3:
            return "Admin";
          default:
            return "Desconocido";
        }
      },
    },
    {
      title: "Acciones",
      key: "actions",
      render: (_, record) => (
        <div className="flex space-x-2">
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
    },
  ];

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Administrar Usuarios</h1>
        <div className="flex space-x-4">
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Buscar usuarios..."
              value={searchText}
              onChange={handleSearchInputChange}
              onKeyPress={handleSearchKeyPress}
              className="p-2 border border-gray-300 rounded-lg w-64"
            />
            <button
              className="px-4 py-2 border rounded-lg text-sm text-black"
              onClick={handleSearch}
            >
              <SearchOutlined />
            </button>
          </div>
          <button
            className="px-4 py-2 border rounded-lg text-sm text-black"
            onClick={handleAdd}
          >
            <PlusOutlined />
            <span className="ml-1">Agregar Usuario</span>
          </button>
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={users}
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
      <Modal
        title="Seleccionar Tipo de Usuario"
        visible={isUserTypeModalVisible}
        onOk={handleUserTypeSelect}
        onCancel={() => setIsUserTypeModalVisible(false)}
        centered
      >
        <Select
          value={selectedUserType}
          onChange={(value) => setSelectedUserType(value)}
          className="w-full"
        >
          <Select.Option value={1}>Estudiante</Select.Option>
          <Select.Option value={2}>Docente</Select.Option>
          <Select.Option value={3}>Admin</Select.Option>
        </Select>
      </Modal>
      {isModalVisible && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-1/2">
            <h2 className="text-xl mb-4">
              {isEditMode ? "Editar Usuario" : "Agregar Usuario"}
            </h2>
            <div className="mb-2">
              <label className="block mb-1">Nombre</label>
              <input
                type="text"
                placeholder="Nombre"
                value={currentUser.first_name}
                onChange={(e) =>
                  setCurrentUser({ ...currentUser, first_name: e.target.value })
                }
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-2">
              <label className="block mb-1">Apellido</label>
              <input
                type="text"
                placeholder="Apellido"
                value={currentUser.last_name}
                onChange={(e) =>
                  setCurrentUser({ ...currentUser, last_name: e.target.value })
                }
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-2">
              <label className="block mb-1">Email</label>
              <input
                type="email"
                placeholder="Email"
                value={currentUser.email}
                onChange={(e) =>
                  setCurrentUser({ ...currentUser, email: e.target.value })
                }
                className="w-full p-2 border rounded"
              />
            </div>
            {currentUser.user_type === 1 && (
              <div className="mb-2">
                <label className="block mb-1">N° Control</label>
                <input
                  type="text"
                  placeholder="N° Control"
                  value={currentUser.control_number || ""}
                  onChange={(e) =>
                    setCurrentUser({
                      ...currentUser,
                      control_number: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded"
                />
              </div>
            )}
            {!isEditMode && (
              <div className="mb-2">
                <label className="block mb-1">Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  value={currentUser.password || ""}
                  onChange={(e) =>
                    setCurrentUser({ ...currentUser, password: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                />
              </div>
            )}
            <div className="mb-4">
              <label className="block mb-1">Tipo de Usuario</label>
              <select
                value={currentUser.user_type}
                onChange={(e) =>
                  setCurrentUser({
                    ...currentUser,
                    user_type: parseInt(e.target.value),
                  })
                }
                className="w-full p-2 border rounded"
              >
                <option value={1}>Estudiante</option>
                <option value={2}>Docente</option>
                <option value={3}>Admin</option>
              </select>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={() => setIsModalVisible(false)}
              >
                Cancelar
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleSave}
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersContent;
