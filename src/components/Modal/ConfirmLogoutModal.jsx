import React from "react";
import { CSSTransition } from "react-transition-group";

const ConfirmLogoutModal = ({ show, onConfirm, onCancel }) => {
  const handleConfirm = () => {
    // Limpiar el sessionStorage
    sessionStorage.clear();
    // Llamar a la función onConfirm pasada como prop
    onConfirm();
  };

  return (
    <CSSTransition in={show} timeout={300} classNames="modal" unmountOnExit>
      <div className="fixed inset-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-md z-40">
        <div className="modal-content bg-white text-xl py-8 px-12 shadow-lg border rounded-xl">
          <p className="mb-4 text-center">¿Deseas salir?</p>
          <div className="flex space-x-4 text-md">
            <button
              onClick={handleConfirm}
              className="btn-confirm-red px-8 py-2 bg-transparent text-white border rounded-lg hover:bg-red-500 hover:border-red-500 transition duration-500"
            >
              Sí
            </button>
            <button
              onClick={onCancel}
              className="btn-confirm-no px-8 py-2 bg-transparent text-white border rounded-lg hover:bg-white hover:text-black transition duration-500"
            >
              No
            </button>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

export default ConfirmLogoutModal;
