import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";

const ReportContent = () => {
  const [activeUsersData, setActiveUsersData] = useState([]);
  const [requestsData, setRequestsData] = useState([]);
  const [machinesData, setMachinesData] = useState([]);
  const [materialsData, setMaterialsData] = useState([]);

  useEffect(() => {
    fetchData(
      `${import.meta.env.VITE_HOST_EXPRESS}/api/dashboard/active-users`,
      setActiveUsersData
    );
    fetchData(
      `${import.meta.env.VITE_HOST_EXPRESS}/api/dashboard/requests-graph`,
      setRequestsData
    );
    fetchData(
      `${import.meta.env.VITE_HOST_EXPRESS}/api/dashboard/machines-graph`,
      setMachinesData
    );
    fetchData(
      `${import.meta.env.VITE_HOST_EXPRESS}/api/dashboard/materials-graph`,
      setMaterialsData
    );
  }, []);

  const fetchData = async (url, setData) => {
    try {
      const token = sessionStorage.getItem("token") || Cookies.get("token");
      if (!token) {
        throw new Error("No token found");
      }

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data);
    } catch (error) {
      console.error(`Error fetching data from ${url}:`, error);
    }
  };

  const handleDownloadReport = async (endpoint) => {
    try {
      const token = sessionStorage.getItem("token") || Cookies.get("token");
      if (!token) {
        throw new Error("No token found");
      }

      const response = await axios.get(
        `${import.meta.env.VITE_HOST_EXPRESS}/api/report/${endpoint}`,
        {
          responseType: "blob",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${endpoint}_report.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error(`Error downloading ${endpoint} report:`, error);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-xl font-bold mb-4">Reportes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-2">Usuarios Activos por Mes</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={activeUsersData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
              <XAxis
                dataKey="month"
                stroke="#333"
                tick={{ fontSize: 12, fill: "#333" }}
              />
              <YAxis stroke="#333" tick={{ fontSize: 12, fill: "#333" }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="total" stroke="#000" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-2">Solicitudes por Mes</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={requestsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
              <XAxis
                dataKey="month"
                stroke="#333"
                tick={{ fontSize: 12, fill: "#333" }}
              />
              <YAxis stroke="#333" tick={{ fontSize: 12, fill: "#333" }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="total" fill="#000" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-2">
            Máquinas Registradas por Mes
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={machinesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
              <XAxis
                dataKey="month"
                stroke="#333"
                tick={{ fontSize: 12, fill: "#333" }}
              />
              <YAxis stroke="#333" tick={{ fontSize: 12, fill: "#333" }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="total" stroke="#000" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-2">
            Materiales Disponibles por Mes
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={materialsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
              <XAxis
                dataKey="month"
                stroke="#333"
                tick={{ fontSize: 12, fill: "#333" }}
              />
              <YAxis stroke="#333" tick={{ fontSize: 12, fill: "#333" }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="total" fill="#000" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="flex justify-end space-x-4 mt-8">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          onClick={() => handleDownloadReport("machines")}
        >
          Descargar Reporte de Máquinas
        </button>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
          onClick={() => handleDownloadReport("materials")}
        >
          Descargar Reporte de Materiales
        </button>
      </div>
    </div>
  );
};

export default ReportContent;
