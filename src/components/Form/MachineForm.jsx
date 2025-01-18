import React from "react";

function MachineForm({ onBack }) {
  return (
    <div>
      <h2>Formulario para rentar una máquina</h2>
      {/* Aquí va el contenido del formulario */}
      <button
        className="bg-blue-500 text-white font-medium rounded-xl py-2 px-4 mt-4"
        type="button"
        onClick={onBack}
      >
        Regresar
      </button>
    </div>
  );
}

export default MachineForm;
