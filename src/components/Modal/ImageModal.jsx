import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { CSSTransition } from "react-transition-group";
import CloseIcon from "../svg/CloseIcon";
import UserImage from "../../assets/Img/Photo_Example_User.webp";

const ImageModal = ({ show, onClose }) => {
  const [profileImageUrl, setProfileImageUrl] = useState("");

  useEffect(() => {
    const fetchUserImage = async () => {
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

        setProfileImageUrl(imageUrl || UserImage);
      } catch (error) {
        console.error("Error fetching user image:", error);
      }
    };

    fetchUserImage();
  }, []);

  return (
    <CSSTransition in={show} timeout={300} classNames="modal" unmountOnExit>
      <div className="fixed inset-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-md z-50">
        <div className="modal-content relative bg-white text-xl py-8 px-12 shadow-lg border rounded-xl">
          <button onClick={onClose} className="absolute top-4 right-4">
            <CloseIcon className="text-white opacity-60 hover:text-red-500 hover:scale-105 hover:opacity-100 transform transition duration-500" />
          </button>
          <img
            src={profileImageUrl}
            alt="Profile"
            className="w-64 h-64 rounded-full mb-8"
          />
          <button
            onClick={onClose}
            className="w-full btn-confirm-red text-center px-8 py-2 bg-transparent text-white border rounded-lg hover:bg-red-500 hover:border-red-500 transition duration-500"
          >
            Cerrar
          </button>
        </div>
      </div>
    </CSSTransition>
  );
};

export default ImageModal;
