import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import LayoutGridAddIcon from "./Icons/LayoutGridAddIcon";
import axios from "axios";
import Cookies from "js-cookie";
import { Table, notification, Modal } from "antd";
import moment from "moment";

const RequestsCard = ({ setActiveContent }) => {
  const [completedRequests, setCompletedRequests] = useState(0);
  const [latestRequests, setLatestRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const fetchCompletedPercentage = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_HOST_EXPRESS
          }/api/requests/completed-percentage`,
          {
            headers: {
              Authorization: `Bearer ${
                sessionStorage.getItem("token") || Cookies.get("token")
              }`,
            },
          }
        );
        setCompletedRequests(response.data.completedPercentage);
      } catch (error) {
        console.error("Error fetching completed requests percentage:", error);
      }
    };

    const fetchLatestRequests = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_HOST_EXPRESS}/api/requests/latest`,
          {
            headers: {
              Authorization: `Bearer ${
                sessionStorage.getItem("token") || Cookies.get("token")
              }`,
            },
          }
        );
        setLatestRequests(response.data);
      } catch (error) {
        console.error("Error fetching latest requests:", error);
      }
    };

    fetchCompletedPercentage();
    fetchLatestRequests();
  }, []);

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
      title: "Numero Solicitud",
      dataIndex: "request_id",
      key: "request_id",
    },
    {
      title: "Estado",
      dataIndex: "request_status",
      key: "request_status",
      render: (status) => (
        <span className={getStatusClass(status)}>{getStatusText(status)}</span>
      ),
    },
  ];

  const data = [
    ...latestRequests.slice(0, 5),
    ...Array.from({ length: 5 - latestRequests.length }).map((_, index) => ({
      key: `empty-${index}`,
      request_id: "Sin datos",
      request_status: "Sin solicitud",
    })),
  ];

  const handleRowClick = (record) => {
    setSelectedRequest(record);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedRequest(null);
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-md h-auto md:h-full flex flex-col justify-between items-start">
      <div className="flex justify-between items-start w-full">
        <div>
          <h2 className="text-lg font-bold">Solicitudes</h2>
          <p>Todas Solicitudes</p>
        </div>
        <button
          className="border border-[#0B192C] text-[#0B192C] fill-[#0B192C] w-12 h-12 rounded-lg flex items-center justify-center hover:shadow-xl hover:bg-[#0B192C] hover:text-white hover:fill-white transform transition duration-500"
          onClick={() => setActiveContent("requests")}
        >
          <LayoutGridAddIcon />
        </button>
      </div>
      <div className="w-full flex flex-col justify-center items-center mt-4 h-1/2">
        <h3 className="text-md font-bold mb-2">Solicitudes Completadas</h3>
        <div className="w-32 h-32">
          <CircularProgressbar
            value={completedRequests}
            text={`${completedRequests.toFixed(2)}%`}
            styles={buildStyles({
              textSize: "16px",
              pathColor: "#0B192C",
              textColor: "#0B192C",
              trailColor: "#d6d6d6",
            })}
            initialAnimation={true}
            animationDuration={5} // Duración de la animación en segundos
          />
        </div>
      </div>
      <div className="w-full mt-4 h-1/2">
        <h3 className="text-md font-bold mb-2">Últimas Solicitudes</h3>
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          rowKey={(record) => record.key || record.request_id}
          onRow={(record) => ({
            onClick: () => handleRowClick(record),
          })}
        />
        <div className="mt-4 flex justify-center">
          <button
            className="w-full py-2 border-[#0B192C] text-sm text-[#0B192C] border rounded-xl transform transition duration-500 hover:bg-[#0B192C] hover:text-white hover:shadow-lg"
            onClick={() => setActiveContent("requests")}
          >
            Ver más
          </button>
        </div>
      </div>
      <Modal
        title="Detalles de la Solicitud"
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
        centered
      >
        {selectedRequest && (
          <div>
            <p>
              <strong>ID:</strong> {selectedRequest.request_id}
            </p>
            <p>
              <strong>Estado:</strong>{" "}
              {getStatusText(selectedRequest.request_status)}
            </p>
            <p>
              <strong>Fecha:</strong>{" "}
              {moment(selectedRequest.request_date).format("YYYY-MM-DD")}
            </p>
            <p>
              <strong>Nombre Completo:</strong> {selectedRequest.full_name}
            </p>
            <p>
              <strong>Tipo:</strong> {selectedRequest.loan_type}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default RequestsCard;
