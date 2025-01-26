import React, { useState, useEffect } from "react";
import { Modal, Alert } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import CloseIcon from "../svg/CloseIcon";
import UserImage from "../../assets/Img/Photo_Example_User.webp";

const ProfileSettingsModalAdmin = ({
  isProfileSettingsVisible,
  setIsProfileSettingsVisible,
}) => {
  const [showAlert, setShowAlert] = useState(false);
  const [userInfo, setUserInfo] = useState({
    id: "",
    first_name: "",
    last_name: "",
    user_type: "",
    email: "",
  });
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [newProfileImage, setNewProfileImage] = useState(null);

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
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const profileImageUrl = userResponse.data.profile_image_url
          ? `${import.meta.env.VITE_HOST_EXPRESS}/api/profile-image?filename=${
              userResponse.data.profile_image_url
            }`
          : null;
        let imageUrl = null;
        if (profileImageUrl) {
          const imageResponse = await axios.get(profileImageUrl, {
            headers: { Authorization: `Bearer ${token}` },
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
        const configUpload = {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        };
        await axios.post(
          `${import.meta.env.VITE_HOST_EXPRESS}/api/upload-profile-image`,
          formData,
          configUpload
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
        headers: { Authorization: `Bearer ${token}` },
      };
      await axios.put(url, data, config);
      setShowAlert(true);
      setIsProfileSettingsVisible(false);
      setTimeout(() => window.location.reload(), 5000);
    } catch (error) {
      console.error("Error updating name and last name:", error);
    }
  };

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

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImageUrl(URL.createObjectURL(file));
      setNewProfileImage(file);
    }
  };

  return (
    <>
      <Modal
        title={
          <div className="flex items-center justify-between z-10">
            <span>Configuraciones del Perfil</span>
          </div>
        }
        visible={isProfileSettingsVisible}
        onCancel={() => setIsProfileSettingsVisible(false)}
        footer={null}
        centered
      >
        <div className="flex flex-col space-y-4 mt-4">
          <div className="flex flex-col">
            <label className="text-sm mb-1">Nombre</label>
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
          <div className="flex flex-col">
            <label className="text-sm mb-1">Apellido</label>
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
          <div className="flex flex-col opacity-60">
            <label className="text-sm mb-1">Tipo de Usuario</label>
            <input
              type="text"
              placeholder="Tipo de Usuario"
              value={getUserType(userInfo.user_type)}
              className="w-full px-4 py-2 border rounded-lg"
              readOnly
            />
          </div>
          <div className="flex flex-col opacity-60">
            <label className="text-sm mb-1">Correo Electrónico</label>
            <input
              type="text"
              placeholder="Correo Electrónico"
              value={userInfo.email}
              className="w-full px-4 py-2 border rounded-lg"
              readOnly
            />
          </div>
          <div className="flex flex-col items-center">
            <img
              src={profileImageUrl}
              alt="Profile"
              className="w-24 h-24 rounded-full mb-4 cursor-pointer"
            />
            <label className="w-full border px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white text-center cursor-pointer">
              Cambiar Imagen
              <input
                type="file"
                accept=".png, .webp, .jpg"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>
          <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 md:space-x-4">
            <button
              onClick={handleSave}
              className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Guardar
            </button>
            <button
              onClick={() => setIsProfileSettingsVisible(false)}
              className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Cerrar
            </button>
          </div>
        </div>
      </Modal>

      {showAlert && (
        <div className="fixed bottom-4 right-4 z-50">
          <Alert
            message="Guardado exitoso"
            description="Los cambios se han guardado correctamente."
            type="success"
            showIcon
            closable
            onClose={() => setShowAlert(false)}
          />
        </div>
      )}
    </>
  );
};

export default ProfileSettingsModalAdmin;
