import React, { useState, useEffect } from "react";
import { fetchUser } from "../../services/userService";

const ButtonDashboard = ({ children }) => {
  return (
    <button className="flex items-center justify-center w-full h-12 px-4 py-2 border-[#0B192C] text-sm text-[#0B192C] border rounded-xl transform transition duration-500 hover:scale-105 hover:bg-[#0B192C] hover:text-white hover:shadow-lg">
      {children}
    </button>
  );
};

const HeaderAdmin = ({ setActiveContent }) => {
  const [username, setUsername] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const getUserData = async () => {
      const userData = await fetchUser();
      if (userData) {
        setUsername(userData.username);
      }
    };

    const updateDate = () => {
      const date = new Date();
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      const formattedDate = date.toLocaleDateString("es-ES", options);
      setCurrentDate(formattedDate);
    };

    getUserData();
    updateDate();
  }, []);

  return (
    <header className="m-4 h-auto flex flex-col md:flex-row justify-between px-4">
      <div className="my-4 md:mb-0">
        <h1 className="text-lg font-bold">
          Bienvenido, {username} (Admin) <span className="font-emoji">👋</span>
        </h1>
        <p className="text-sm">{currentDate}</p>
      </div>
      <div className="flex flex-wrap justify-center md:justify-end gap-2 w-full md:w-auto">
        <div
          onClick={() => setActiveContent("requests")}
          className="w-full md:w-auto hidden md:block"
        >
          <ButtonDashboard>Ver solicitudes</ButtonDashboard>
        </div>
        <div
          onClick={() => setActiveContent("machines")}
          className="w-full md:w-auto hidden md:block"
        >
          <ButtonDashboard>Ver Equipos</ButtonDashboard>
        </div>
        <div
          onClick={() => setActiveContent("materials")}
          className="w-full md:w-auto hidden md:block"
        >
          <ButtonDashboard>Ver Materiales</ButtonDashboard>
        </div>
        <div
          onClick={() => setActiveContent("users")}
          className="w-full md:w-auto hidden md:block"
        >
          <ButtonDashboard>Ver Usuarios</ButtonDashboard>
        </div>
      </div>
    </header>
  );
};

export default HeaderAdmin;
