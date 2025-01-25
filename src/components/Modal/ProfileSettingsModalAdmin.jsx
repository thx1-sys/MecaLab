import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import ChangeImageModal from "../Modal/ChangeImageModal";
import CustomAlert from "../Alert/CustomAlert";
import UserImage from "../../assets/Img/Photo_Example_User.webp";

const ProfileSettingsModalAdmin = ({
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

        await axios.post(
          `${import.meta.env.VITE_HOST_EXPRESS}/api/upload-profile-image`,
          formData,
          config
        );
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

      await axios.put(url, data, config);

      onSave();
      setShowAlert(true);
      onClose();

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
    <>
      <Modal
        title="Configuraciones del Perfil"
        open={show}
        onCancel={onClose}
        footer={null}
        className="custom-ant-modal"
      >
        <div className="flex flex-col space-y-4 text-md">
          <div className="flex flex-col">
            <label className="text-sm text-gray-800 mb-1">Nombre</label>
            <input
              type="text"
              placeholder="Nombre"
              value={userInfo.first_name}
              onChange={(e) =>
                setUserInfo({ ...userInfo, first_name: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div className="flex flex-col md:flex-row md:space-x-4">
            <div className="flex flex-col w-full md:w-1/2">
              <label className="text-sm text-gray-800 mb-1">
                Apellido Paterno
              </label>
              <input
                type="text"
                placeholder="Apellido"
                value={userInfo.last_name}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, last_name: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
            <div className="flex flex-col w-full md:w-1/2">
              <label className="text-sm text-gray-800 mb-1">
                Número de Control
              </label>
              <input
                type="text"
                placeholder="Número de Control"
                value={userInfo.control_number}
                readOnly
                className="w-full px-4 py-2 border rounded-lg bg-gray-200 cursor-not-allowed"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-sm text-gray-800 mb-1">
              Tipo de Usuario
            </label>
            <input
              type="text"
              placeholder="Tipo de Usuario"
              value={getUserType(userInfo.user_type)}
              readOnly
              className="w-full px-4 py-2 border rounded-lg bg-gray-200 cursor-not-allowed"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm text-gray-800 mb-1">
              Correo Electrónico
            </label>
            <input
              type="text"
              placeholder="Correo Electrónico"
              value={userInfo.email}
              readOnly
              className="w-full px-4 py-2 border rounded-lg bg-gray-200 cursor-not-allowed"
            />
          </div>
          <div className="flex flex-col items-center mb-4">
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
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
              onClick={handleOpenChangeImageModal}
            >
              Cambiar Imagen
            </button>
          </div>
          <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 md:space-x-4">
            <button
              onClick={handleSave}
              className="w-full md:w-1/2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300"
            >
              Guardar
            </button>
            <button
              onClick={onClose}
              className="w-full md:w-1/2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300"
            >
              Cerrar
            </button>
          </div>
        </div>
      </Modal>

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
    </>
  );
};

export default ProfileSettingsModalAdmin;
