import React, { useState, useEffect } from "react";
import { SearchOutlined, EyeOutlined, EditOutlined } from "@ant-design/icons";
import axios from "axios";
import Cookies from "js-cookie";
import { Table, notification, Modal, Select, Button } from "antd";

const { Option } = Select;

const RequestsContent = () => {
  const [requests, setRequests] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isStatusModalVisible, setIsStatusModalVisible] = useState(false);
  const [currentRequest, setCurrentRequest] = useState({
    student_id: "",
    full_name: "",
    institutional_email: "",
    phone_number: "",
    career: "",
    semester: "",
    request_date: "",
    expected_return_date: "",
    material_id: "",
    material_quantity: 0,
    request_reason: "",
    subject: "",
    teacher: "",
    group: "",
    loan_type: "",
    request_status: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  useEffect(() => {
    fetchRequests();
  }, [pagination.current, pagination.pageSize, searchText]);

  const fetchRequests = async () => {
    setIsLoading(true);
    try {
      const token = sessionStorage.getItem("token") || Cookies.get("token");
      if (!token) {
        throw new Error("No token found");
      }

      const response = await axios.get(
        `${import.meta.env.VITE_HOST_EXPRESS}/api/requests`,
        {
          params: {
            search: searchText,
            page: pagination.current,
            limit: pagination.pageSize,
          },
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the headers
          },
        }
      );
      setRequests(response.data);
      setFilteredRequests(response.data);
      setPagination({
        ...pagination,
        total: response.data.length,
      });
    } catch (error) {
      console.error("Error al obtener solicitudes:", error);
    }
    setIsLoading(false);
  };

  const handleSearch = () => {
    fetchRequests();
  };

  const handleSearchInputChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearchKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleView = (request) => {
    setCurrentRequest(request);
    setIsModalVisible(true);
  };

  const handleStatusChange = (request) => {
    setCurrentRequest(request);
    setIsStatusModalVisible(true);
  };

  const handleStatusUpdate = async () => {
    try {
      const token = sessionStorage.getItem("token") || Cookies.get("token");
      if (!token) {
        throw new Error("No token found");
      }

      await axios.put(
        `${import.meta.env.VITE_HOST_EXPRESS}/api/requests/${
          currentRequest.request_id
        }/status`,
        { request_status: currentRequest.request_status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      showNotification(
        "success",
        "Estado de la solicitud actualizado con éxito"
      );
      fetchRequests();
      setIsStatusModalVisible(false);
    } catch (error) {
      console.error("Error al actualizar el estado de la solicitud:", error);
      showNotification(
        "error",
        "Error al actualizar el estado de la solicitud"
      );
    }
  };

  const showNotification = (type, message) => {
    notification[type]({
      message: message,
      placement: "bottomRight",
    });
  };

  const handleTableChange = (pagination) => {
    setPagination({
      ...pagination,
      current: pagination.current,
      pageSize: pagination.pageSize,
    });
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Fecha no disponible";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Intl.DateTimeFormat("es-ES", options).format(
      new Date(dateString)
    );
  };

  const getStatusText = (status) => {
    switch (status) {
      case 0:
        return "En proceso";
      case 1:
        return "Aprobado";
      case 2:
        return "Denegado";
      case 3:
        return "Retraso";
      default:
        return "Desconocido";
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 0:
        return "text-yellow-500";
      case 1:
        return "text-green-500";
      case 2:
        return "text-red-500";
      case 3:
        return "text-orange-500";
      default:
        return "text-gray-500";
    }
  };

  const columns = [
    {
      title: "ID de Solicitud",
      dataIndex: "request_id",
      key: "request_id",
    },
    {
      title: "Nombre Completo",
      dataIndex: "full_name",
      key: "full_name",
    },
    {
      title: "Correo Institucional",
      dataIndex: "institutional_email",
      key: "institutional_email",
    },
    {
      title: "Teléfono",
      dataIndex: "phone_number",
      key: "phone_number",
    },
    {
      title: "Carrera",
      dataIndex: "career",
      key: "career",
    },
    {
      title: "Semestre",
      dataIndex: "semester",
      key: "semester",
    },
    {
      title: "Fecha de Solicitud",
      dataIndex: "request_date",
      key: "request_date",
      render: (text) => formatDate(text),
    },
    {
      title: "Fecha de Devolución",
      dataIndex: "expected_return_date",
      key: "expected_return_date",
      render: (text) => formatDate(text),
    },
    {
      title: "Tipo de Préstamo",
      dataIndex: "loan_type",
      key: "loan_type",
    },
    {
      title: "Estado",
      dataIndex: "request_status",
      key: "request_status",
      render: (status) => (
        <span className={getStatusClass(status)}>{getStatusText(status)}</span>
      ),
    },
    {
      title: "Acciones",
      key: "actions",
      render: (text, record) => (
        <div className="flex justify-center space-x-2">
          <button
            className="text-blue-500 border border-blue-500 rounded px-2 py-1 transition duration-500 transform hover:bg-blue-500 hover:text-white"
            onClick={() => handleView(record)}
          >
            <EyeOutlined />
          </button>
          <button
            className="text-yellow-500 border border-yellow-500 rounded px-2 py-1 transition duration-500 transform hover:bg-yellow-500 hover:text-white"
            onClick={() => handleStatusChange(record)}
          >
            <EditOutlined />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Administrar Solicitudes</h1>
        <div className="flex space-x-4">
          <div className="flex space-x-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar solicitudes"
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
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={filteredRequests}
        loading={isLoading}
        rowKey="request_id"
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          position: ["bottomCenter"],
        }}
        onChange={handleTableChange}
      />
      <Modal
        title="Ver Solicitud"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700">Nombre Completo:</label>
            <input
              type="text"
              value={currentRequest.full_name}
              readOnly
              className="w-full p-2 mb-4 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700">Correo Institucional:</label>
            <input
              type="email"
              value={currentRequest.institutional_email}
              readOnly
              className="w-full p-2 mb-4 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700">Teléfono:</label>
            <input
              type="text"
              value={currentRequest.phone_number}
              readOnly
              className="w-full p-2 mb-4 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700">Carrera:</label>
            <input
              type="text"
              value={currentRequest.career}
              readOnly
              className="w-full p-2 mb-4 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700">Semestre:</label>
            <input
              type="text"
              value={currentRequest.semester}
              readOnly
              className="w-full p-2 mb-4 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700">Número de Control:</label>
            <input
              type="text"
              value={currentRequest.student_id}
              readOnly
              className="w-full p-2 mb-4 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700">Fecha de Solicitud:</label>
            <input
              type="text"
              value={formatDate(currentRequest.request_date)}
              readOnly
              className="w-full p-2 mb-4 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700">Fecha de Devolución:</label>
            <input
              type="text"
              value={formatDate(currentRequest.expected_return_date)}
              readOnly
              className="w-full p-2 mb-4 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700">ID del Material:</label>
            <input
              type="text"
              value={currentRequest.material_id}
              readOnly
              className="w-full p-2 mb-4 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700">
              Cantidad del Material:
            </label>
            <input
              type="number"
              value={currentRequest.material_quantity}
              readOnly
              className="w-full p-2 mb-4 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700">
              Razón de la Solicitud:
            </label>
            <input
              type="text"
              value={currentRequest.request_reason}
              readOnly
              className="w-full p-2 mb-4 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700">Asignatura:</label>
            <input
              type="text"
              value={currentRequest.subject}
              readOnly
              className="w-full p-2 mb-4 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700">Profesor:</label>
            <input
              type="text"
              value={currentRequest.teacher}
              readOnly
              className="w-full p-2 mb-4 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700">Grupo:</label>
            <input
              type="text"
              value={currentRequest.group}
              readOnly
              className="w-full p-2 mb-4 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700">Tipo de Préstamo:</label>
            <input
              type="text"
              value={currentRequest.loan_type}
              readOnly
              className="w-full p-2 mb-4 border rounded-lg"
            />
          </div>
        </div>
      </Modal>
      <Modal
        title="Actualizar Estado de Solicitud"
        visible={isStatusModalVisible}
        onCancel={() => setIsStatusModalVisible(false)}
        centered
        footer={[
          <Button key="cancel" onClick={() => setIsStatusModalVisible(false)}>
            Cancelar
          </Button>,
          <Button key="update" type="primary" onClick={handleStatusUpdate}>
            Actualizar
          </Button>,
        ]}
      >
        <div>
          <label className="block text-gray-700">Estado:</label>
          <Select
            value={currentRequest.request_status}
            onChange={(value) =>
              setCurrentRequest({ ...currentRequest, request_status: value })
            }
            className="w-full"
          >
            <Option value={0}>En proceso</Option>
            <Option value={1}>Aprobado</Option>
            <Option value={2}>Denegado</Option>
            <Option value={3}>Retraso</Option>
          </Select>
        </div>
      </Modal>
    </div>
  );
};

export default RequestsContent;
