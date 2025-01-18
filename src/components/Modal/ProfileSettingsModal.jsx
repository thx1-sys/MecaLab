import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import CloseIcon from "../svg/CloseIcon";
import ChangeImageModal from "../Modal/ChangeImageModal";
import CustomAlert from "../Alert/CustomAlert"; // Agrega tu ruta correcta

const ProfileSettingsModal = ({
  show,
  onClose,
  profileImage,
  onImageClick,
  onImageChange,
  onSave,
}) => {
  const [showChangeImageModal, setShowChangeImageModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleOpenChangeImageModal = () => {
    setShowChangeImageModal(true);
  };

  const handleCloseChangeImageModal = () => {
    setShowChangeImageModal(false);
  };

  const handleSave = () => {
    onSave();
    setShowAlert(true); // Mostrar alerta
    onClose(); // Cerrar el modal
  };

  return (
    <>
      <CSSTransition in={show} timeout={300} classNames="modal" unmountOnExit>
        <div className="fixed inset-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-md z-40">
          <div className="modal-content relative w-3/4 max-w-xl mx-auto bg-white bg-opacity-50 text-xl py-8 px-12 shadow-lg border rounded-xl">
            <button onClick={onClose} className="absolute top-4 right-4">
              <CloseIcon className="text-white opacity-60 hover:text-red-500 hover:scale-105 hover:opacity-100 transform transition duration-500" />
            </button>
            <p className="mb-4 text-center">Configuraciones del Perfil</p>
            <div className="flex flex-col space-y-4 text-md">
              <div className="flex flex-col">
                <label className="text-sm text-white mb-1">Nombre</label>
                <input
                  type="text"
                  placeholder="Nombre"
                  className="w-full px-4 py-2 bg-transparent text-white border rounded-lg"
                />
              </div>
              <div className="flex flex-row space-x-4">
                <div className="flex flex-col w-1/2">
                  <label className="text-sm text-white mb-1">
                    Apellido Paterno
                  </label>
                  <input
                    type="text"
                    placeholder="Apellido Paterno"
                    className="w-full px-4 py-2 bg-transparent text-white border rounded-lg"
                  />
                </div>
                <div className="flex flex-col w-1/2">
                  <label className="text-sm text-white mb-1">
                    Apellido Materno
                  </label>
                  <input
                    type="text"
                    placeholder="Apellido Materno"
                    className="w-full px-4 py-2 bg-transparent text-white border rounded-lg"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label className="text-sm text-white mb-1">
                  Número de Control
                </label>
                <input
                  type="text"
                  placeholder="Número de Control"
                  className="w-full px-4 py-2 bg-transparent text-white border rounded-lg"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm text-white mb-1">Carrera</label>
                <input
                  type="text"
                  placeholder="Carrera"
                  className="w-full px-4 py-2 bg-transparent text-white border rounded-lg"
                />
              </div>
              <div className="flex flex-col items-center">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-24 h-24 rounded-full mb-4 cursor-pointer"
                  onClick={onImageClick}
                />
                <input
                  type="file"
                  onChange={onImageChange}
                  className="hidden"
                  id="file-input"
                />
                <label
                  className="w-full btn-change-img text-center px-4 py-2 bg-transparent text-white border rounded-lg cursor-pointer hover:bg-blue-500 hover:border-blue-500 transition duration-500"
                  onClick={handleOpenChangeImageModal}
                >
                  Cambiar Imagen
                </label>
              </div>
              <div className="flex justify-between space-x-4 text-md">
                <button
                  onClick={handleSave}
                  className="btn-save-changes flex-1 px-8 py-2 bg-transparent text-white border rounded-lg hover:bg-green-500 hover:border-green-500 transition duration-500"
                >
                  Guardar
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 btn-confirm-red px-8 py-2 bg-transparent text-white border rounded-lg hover:bg-red-500 hover:border-red-500 transition duration-500"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      </CSSTransition>

      <ChangeImageModal
        show={showChangeImageModal}
        onClose={handleCloseChangeImageModal}
        onImageChange={onImageChange}
      />

      {showAlert && (
        <div className="fixed bottom-4 right-4 z-50">
          <CustomAlert
            type="success"
            title="Guardado exitoso"
            message="Los cambios se han guardado correctamente."
            onViewMore={() => console.log("Detalles...")}
            onDismiss={() => setShowAlert(false)}
          />
        </div>
      )}
    </>
  );
};

export default ProfileSettingsModal;
