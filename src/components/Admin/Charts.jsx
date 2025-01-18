// src/components/Admin/Charts.jsx
import React from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const dataUsuarios = [
  { name: "Enero", usuarios: 400 },
  { name: "Febrero", usuarios: 300 },
  { name: "Marzo", usuarios: 500 },
  // Añade más datos según sea necesario
];

const dataSolicitudes = [
  { name: "Enero", solicitudes: 240 },
  { name: "Febrero", solicitudes: 139 },
  { name: "Marzo", solicitudes: 980 },
  // Añade más datos según sea necesario
];

const dataMaquinas = [
  { name: "Enero", maquinas: 200 },
  { name: "Febrero", maquinas: 450 },
  { name: "Marzo", maquinas: 300 },
  // Añade más datos según sea necesario
];

const Charts = () => {
  const generarReporte = () => {
    // Lógica para generar el reporte
    alert("Reporte generado exitosamente.");
  };

  return (
    <div className="p-6">
      <h3 className="text-2xl font-bold mb-6">Panel de Gráficas</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Gráfico de Usuarios Activos */}
        <div className="h-full w-full bg-[#151515] bg-opacity-40 backdrop-filter backdrop-blur-sm rounded-xl text-white flex flex-col items-center py-10 overflow-hidden border transition transform duration-300 border-white border-opacity-30 hover:border-opacity-60">
          <h4 className="text-xl font-semibold mb-4">
            Gráfica de Usuarios Activos
          </h4>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dataUsuarios}>
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="usuarios" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico de Solicitudes */}
        <div className="h-full w-full bg-[#151515] bg-opacity-40 backdrop-filter backdrop-blur-sm rounded-xl text-white flex flex-col items-center py-10 overflow-hidden border transition transform duration-300 border-white border-opacity-30 hover:border-opacity-60">
          <h4 className="text-xl font-semibold mb-4">Gráfica de Solicitudes</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dataSolicitudes}>
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="solicitudes" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico de Máquinas */}
        <div className="h-full w-full bg-[#151515] bg-opacity-40 backdrop-filter backdrop-blur-sm rounded-xl text-white flex flex-col items-center py-10 overflow-hidden border transition transform duration-300 border-white border-opacity-30 hover:border-opacity-60">
          <h4 className="text-xl font-semibold mb-4">Gráfica de Máquinas</h4>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dataMaquinas}>
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="maquinas" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Añade más gráficos según sea necesario */}
      </div>

      {/* Botón para Generar Reporte */}
      <div className="flex justify-center mt-6">
        <button
          onClick={generarReporte}
          className="px-6 py-3 bg-[#3375C8] text-white rounded-lg hover:bg-[#285a9e] transition duration-300"
        >
          Generar Reporte
        </button>
      </div>
    </div>
  );
};

export default Charts;
