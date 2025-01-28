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
              <Line type="monotone" dataKey="total" stroke="#2A004E" />
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
              <Bar dataKey="total" fill="#F72C5B" />
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
              <Line type="monotone" dataKey="total" stroke="#16C47F" />
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
              <Bar dataKey="total" fill="#4635B1" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="flex justify-end space-x-4 mt-8">
        <button
          className="text-md w-48 h-16 rounded bg-blue-500 text-white relative overflow-hidden group z-10 hover:text-white duration-1000"
          onClick={() => handleDownloadReport("machines")}
        >
          <span className="absolute bg-blue-600 w-48 h-48 rounded-full group-hover:scale-100 scale-0 -z-10 -left-2 -top-10 group-hover:duration-500 duration-700 origin-center transform transition-all"></span>
          <span className="absolute bg-blue-800 w-48 h-48 -left-2 -top-10 rounded-full group-hover:scale-100 scale-0 -z-10 group-hover:duration-700 duration-500 origin-center transform transition-all"></span>
          Descargar Reporte de Máquinas
        </button>
        <button
          className="text-md w-48 h-16 rounded bg-green-500 text-white relative overflow-hidden group z-10 hover:text-white duration-1000"
          onClick={() => handleDownloadReport("materials")}
        >
          <span className="absolute bg-green-600 w-48 h-48 rounded-full group-hover:scale-100 scale-0 -z-10 -left-2 -top-10 group-hover:duration-500 duration-700 origin-center transform transition-all"></span>
          <span className="absolute bg-green-800 w-48 h-48 -left-2 -top-10 rounded-full group-hover:scale-100 scale-0 -z-10 group-hover:duration-700 duration-500 origin-center transform transition-all"></span>
          Descargar Reporte de Materiales
        </button>
      </div>
    </div>
  );
};

export default ReportContent;
