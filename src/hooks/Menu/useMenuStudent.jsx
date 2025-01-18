import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useMenuStudent = (showMenu, setShowMenu) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [showProfileSettings, setShowProfileSettings] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showChangeImageModal, setShowChangeImageModal] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const defaultProfileImage =
    "https://images.pexels.com/photos/21701368/pexels-photo-21701368/free-photo-of-mesa-de-centro-en-casa.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu, setShowMenu]);

  const handleLogout = () => {
    setShowConfirm(true);
  };

  const handleConfirmLogout = () => {
    setShowConfirm(false);
    navigate("/");
  };

  const handleCancelLogout = () => {
    setShowConfirm(false);
  };

  const handleProfileSettings = () => {
    setShowProfileSettings(true);
  };

  const handleCloseProfileSettings = () => {
    setShowProfileSettings(false);
  };

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setProfileImage(URL.createObjectURL(event.target.files[0]));
      handleCloseChangeImageModal();
    }
  };

  const handleImageClick = () => {
    setShowImageModal(true);
  };

  const handleCloseImageModal = () => {
    setShowImageModal(false);
  };

  const handleOpenChangeImageModal = () => {
    setShowChangeImageModal(true);
  };

  const handleCloseChangeImageModal = () => {
    setShowChangeImageModal(false);
  };

  const handleSaveChanges = () => {
    // Save changes logic
  };

  return {
    showConfirm,
    setShowConfirm,
    showProfileSettings,
    setShowProfileSettings,
    profileImage,
    setProfileImage,
    showImageModal,
    setShowImageModal,
    showChangeImageModal,
    setShowChangeImageModal,
    menuRef,
    handleLogout,
    handleConfirmLogout,
    handleCancelLogout,
    handleProfileSettings,
    handleCloseProfileSettings,
    handleImageChange,
    handleImageClick,
    handleCloseImageModal,
    handleOpenChangeImageModal,
    handleCloseChangeImageModal,
    handleSaveChanges,
    defaultProfileImage,
  };
};

export default useMenuStudent;
