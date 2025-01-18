import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import LayoutGridAddIcon from "./Icons/LayoutGridAddIcon";
import ButtonDashboard from "../Button/ButtonDashboard";

const RequestsCard = () => {
  const completedRequests = 75; // Example value, replace with actual data

  const data = [
    { col1: "Solicitud 1", col2: "Completada" },
    { col1: "Solicitud 2", col2: "Pendiente" },
    { col1: "Solicitud 3", col2: "En Proceso" },
    { col1: "Solicitud 1", col2: "Completada" },
    { col1: "Solicitud 2", col2: "Pendiente" },
    { col1: "Solicitud 3", col2: "En Proceso" },
    { col1: "Solicitud 1", col2: "Completada" },
    { col1: "Solicitud 2", col2: "Pendiente" },
  ];

  return (
    <div className="bg-white rounded-lg p-4 shadow-md h-full flex flex-col justify-between items-start">
      <div className="flex justify-between items-start w-full">
        <div>
          <h2 className="text-lg font-bold">Solicitudes</h2>
          <p>Todas Solicitudes</p>
        </div>
        <button className="border border-[#0B192C] text-[#0B192C] fill-[#0B192C] w-12 h-12 rounded-lg flex items-center justify-center hover:shadow-xl hover:bg-[#0B192C] hover:text-white hover:fill-white transform transition duration-500">
          <LayoutGridAddIcon />
        </button>
      </div>
      <div className="w-full flex flex-col justify-center items-center mt-4 h-1/3">
        <h3 className="text-md font-bold mb-2">Solicitudes Completadas</h3>
        <div className="w-32 h-32">
          <CircularProgressbar
            value={completedRequests}
            text={`${completedRequests}%`}
            styles={buildStyles({
              textSize: "16px",
              pathColor: `#0B192C`,
              textColor: "#0B192C",
              trailColor: "#d6d6d6",
            })}
          />
        </div>
      </div>
      <div className="w-full mt-4 h-2/3 overflow-x-auto">
        <h3 className="text-md font-bold mb-2">Ultimas de Solicitudes</h3>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700">
                Solicitud
              </th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700">
                Estado
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">
                  {row.col1}
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">
                  {row.col2}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 flex justify-center">
          <button className="w-full py-2 border-[#0B192C] text-sm text-[#0B192C] border rounded-xl transform transition duration-500  hover:bg-[#0B192C] hover:text-white hover:shadow-lg">
            ver mas
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestsCard;
