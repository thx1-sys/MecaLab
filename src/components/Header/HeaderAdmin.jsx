import React from "react";
import Button from "../Button/ButtonDashboard";

const HeaderAdmin = () => {
  return (
    <header className="my-4 h-10 flex justify-between items-center p-4">
      <div>
        <h1 className="text-lg font-bold">
          Bienvenido, Paolo Vitali (Admin){" "}
          <span className="font-emoji">👋</span>
        </h1>
        <p className="text-sm">Es Sábado. 1 Diciembre 2024</p>
      </div>
      <div className="flex space-x-2">
        <Button>Ver solicitudes</Button>
        <Button>Ver Equipos</Button>
        <Button>Ver Materiales</Button>
        <Button>Ver Usuarios</Button>
      </div>
    </header>
  );
};

export default HeaderAdmin;
