import React from "react";
import { CSSTransition } from "react-transition-group";
import CloseIcon from "../svg/CloseIcon";

const ChangeImageModal = ({ show, onClose, onImageChange }) => {
  const handleImageChange = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (!file) return;

    onImageChange(file); // Actualiza la imagen en el componente padre
    onClose(); // Cierra el modal después de seleccionar la imagen
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      const fileEvent = {
        target: { files: [file] },
      };
      handleImageChange(fileEvent);
    }
  };

  return (
    <CSSTransition in={show} timeout={300} classNames="modal" unmountOnExit>
      <div className="custum-file-upload fixed inset-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-md z-50">
        <div className="modal-content relative bg-white text-xl py-8 px-12 shadow-lg border rounded-xl">
          <button onClick={onClose} className="absolute top-4 right-4">
            <CloseIcon className="text-white opacity-60 hover:text-red-500 hover:scale-105 hover:opacity-100 transform transition duration-500" />
          </button>
          <p className="mb-8 text-center">Cambiar Imagen de Perfil</p>
          <label
            htmlFor="file"
            className="btn-change-blue h-48 w-72 flex flex-col items-center justify-center gap-5 cursor-pointer border-2 border-dashed border-[#e8e8e8] p-6 rounded-[10px] bg-transparent text-white hover:bg-blue-500 hover:border-blue-500 transform transition duration-500"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <div className="icon flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                fill=""
                xmlns="http://www.w3.org/2000/svg"
                className="w-12 h-12 fill-white"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z"
                ></path>
              </svg>
            </div>
            <div className="text flex items-center justify-center">
              <span className="text-[#e8e8e8] text-center text-sm">
                Haz clic para subir imagen o arrastra y suelta
              </span>
            </div>
            <input id="file" type="file" onChange={handleImageChange} />
          </label>
          <div className="flex justify-between space-x-4 text-md mt-8">
            <button
              onClick={onClose}
              className="w-full btn-confirm-red text-center px-8 py-2 bg-transparent text-white border rounded-lg hover:bg-red-500 hover:border-red-500 transition duration-500"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

export default ChangeImageModal;
