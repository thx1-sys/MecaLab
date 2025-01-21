import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { motion, AnimatePresence } from "framer-motion";
import CloseIcon from "../svg/CloseIcon";
import ChangeImageModal from "../Modal/ChangeImageModal";
import CustomAlert from "../Alert/CustomAlert";
import UserImage from "../../assets/Img/Photo_Example_User.webp";

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
  const [userInfo, setUserInfo] = useState({
    first_name: "",
    last_name: "",
    control_number: "",
    user_type: "",
    email: "",
  });
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [newProfileImage, setNewProfileImage] = useState(null);

  const handleOpenChangeImageModal = () => {
    setShowChangeImageModal(true);
  };

  const handleCloseChangeImageModal = () => {
    setShowChangeImageModal(false);
  };

  const handleSave = async () => {
    try {
      const token = Cookies.get("token") || sessionStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      if (newProfileImage) {
        const formData = new FormData();
        formData.append("profile_image", newProfileImage);

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        };

        const response = await axios.post(
          `${import.meta.env.VITE_HOST_EXPRESS}/api/upload-profile-image`,
          formData,
          config
        );

        console.log("Profile image uploaded successfully:", response.data);
      }

      const url = `${import.meta.env.VITE_HOST_EXPRESS}/api/users/update-name/${
        userInfo.id
      }`;
      const data = {
        firstName: userInfo.first_name,
        lastName: userInfo.last_name,
      };
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      console.log("Sending PUT request to:", url);
      console.log("Data:", data);
      console.log("Config:", config);

      await axios.put(url, data, config);

      onSave();
      setShowAlert(true); // Mostrar alerta
      onClose(); // Cerrar el modal

      // Recargar la página después de 5 segundos
      setTimeout(() => {
        window.location.reload();
      }, 5000);
    } catch (error) {
      console.error("Error updating name and last name:", error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = Cookies.get("token") || sessionStorage.getItem("token");
        if (!token) {
          console.error("No token found");
          return;
        }

        const userResponse = await axios.get(
          `${import.meta.env.VITE_HOST_EXPRESS}/api/user`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const profileImageUrl = userResponse.data.profile_image_url
          ? `${import.meta.env.VITE_HOST_EXPRESS}/api/profile-image?filename=${
              userResponse.data.profile_image_url
            }`
          : null;

        let imageUrl = null;
        if (profileImageUrl) {
          const imageResponse = await axios.get(profileImageUrl, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            responseType: "blob",
          });

          imageUrl =
            imageResponse.status === 200
              ? URL.createObjectURL(imageResponse.data)
              : null;
        }

        setUserInfo({
          id: userResponse.data.id,
          first_name: userResponse.data.first_name,
          last_name: userResponse.data.last_name,
          control_number: userResponse.data.control_number,
          user_type: userResponse.data.user_type,
          email: userResponse.data.email,
        });

        setProfileImageUrl(imageUrl || UserImage);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  const getUserType = (type) => {
    switch (type) {
      case 1:
        return "Estudiante";
      case 2:
        return "Maestro";
      case 3:
        return "Administrativo";
      default:
        return "Desconocido";
    }
  };

  return (
    <div>
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 w-screen min-h-screen flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-md z-40 overflow-y-auto"
          >
            <div className="modal-content relative w-full max-w-lg mx-auto bg-white bg-opacity-50 text-xl py-8 px-4 md:px-12 shadow-lg md:border md:rounded-xl max-h-screen overflow-y-auto">
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
                    value={userInfo.first_name}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, first_name: e.target.value })
                    }
                    className="w-full px-4 py-2 bg-transparent text-white border rounded-lg"
                  />
                </div>
                <div className="flex flex-col md:flex-row md:space-x-4">
                  <div className="flex flex-col w-full md:w-1/2">
                    <label className="text-sm text-white mb-1">
                      Apellido Paterno
                    </label>
                    <input
                      type="text"
                      placeholder="Apellido"
                      value={userInfo.last_name}
                      onChange={(e) =>
                        setUserInfo({ ...userInfo, last_name: e.target.value })
                      }
                      className="w-full px-4 py-2 bg-transparent text-white border rounded-lg"
                    />
                  </div>
                  <div className="flex flex-col w-full md:w-1/2 opacity-60">
                    <label className="text-sm text-white mb-1">
                      Número de Control
                    </label>
                    <input
                      type="text"
                      placeholder="Número de Control"
                      value={userInfo.control_number}
                      className="w-full px-4 py-2 bg-transparent text-white border rounded-lg"
                      readOnly
                    />
                  </div>
                </div>
                <div className="flex flex-col opacity-60">
                  <label className="text-sm text-white mb-1">
                    Tipo de Usuario
                  </label>
                  <input
                    type="text"
                    placeholder="Tipo de Usuario"
                    value={getUserType(userInfo.user_type)}
                    className="w-full px-4 py-2 bg-transparent text-white border rounded-lg"
                    readOnly
                  />
                </div>
                <div className="flex flex-col opacity-60">
                  <label className="text-sm text-white mb-1">
                    Correo Electrónico
                  </label>
                  <input
                    type="text"
                    placeholder="Correo Electrónico"
                    value={userInfo.email}
                    className="w-full px-4 py-2 bg-transparent text-white border rounded-lg"
                    readOnly
                  />
                </div>
                <div className="flex flex-col items-center">
                  <img
                    src={profileImageUrl}
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
                <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 md:space-x-4 text-md">
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
          </motion.div>
        )}
      </AnimatePresence>

      <ChangeImageModal
        show={showChangeImageModal}
        onClose={handleCloseChangeImageModal}
        onImageChange={(file) => {
          const imageUrl = URL.createObjectURL(file);
          setProfileImageUrl(imageUrl);
          setNewProfileImage(file);
        }}
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
    </div>
  );
};

export default ProfileSettingsModal;
