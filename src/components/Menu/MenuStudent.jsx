import React from "react";
import { CSSTransition } from "react-transition-group";
import IconSettings from "./Icons/IconSettings";
import IconLogout from "./Icons/IconLogout";
import ConfirmLogoutModal from "../Modal/ConfirmLogoutModal";
import ProfileSettingsModal from "../Modal/ProfileSettingsModal";
import ImageModal from "../Modal/ImageModal";
import ChangeImageModal from "../Modal/ChangeImageModal";
import useMenuStudent from "../../hooks/Menu/useMenuStudent";
import "./MenuStudent.css";

const MenuStudent = ({ showMenu, setShowMenu }) => {
  const {
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
  } = useMenuStudent(showMenu, setShowMenu);

  const handleButtonClick = () => {
    setShowMenu(false);
  };

  return (
    <>
      <CSSTransition
        in={showMenu}
        timeout={300}
        classNames="scale-fade"
        unmountOnExit
        nodeRef={menuRef}
      >
        <div
          ref={menuRef}
          className="menu-style absolute top-full right-0 mt-2 text-white shadow p-4 min-w-[12rem] max-w-[90vw] md:max-w-[20rem] border-[#999999] border rounded-xl transition-transform transform-gpu z-50 md:top-full md:right-0 md:mt-2 md:transform-none md:translate-x-0 md:translate-y-0"
        >
          <p className="font-normal text-center mb-2">Menú</p>
          <button
            className="block w-full text-left p-2 flex items-center opacity-60 hover:opacity-100 hover:text-shadow-white my-2 rounded-md transition duration-500"
            onClick={() => {
              handleProfileSettings();
              handleButtonClick();
            }}
          >
            <IconSettings />
            Perfil
          </button>
          <button
            className="block w-full text-left p-2 flex items-center opacity-60 hover:text-red-500 hover:opacity-100 hover:text-shadow-red my-2 rounded-md transition duration-500"
            onClick={() => {
              handleLogout();
              handleButtonClick();
            }}
          >
            <IconLogout />
            Salir
          </button>
        </div>
      </CSSTransition>

      <ConfirmLogoutModal
        show={showConfirm}
        onConfirm={handleConfirmLogout}
        onCancel={handleCancelLogout}
      />

      <ProfileSettingsModal
        show={showProfileSettings}
        onClose={handleCloseProfileSettings}
        profileImage={profileImage || defaultProfileImage}
        onImageClick={handleImageClick}
        onImageChange={handleImageChange}
        onSave={handleSaveChanges}
      />

      <ImageModal
        show={showImageModal}
        imageSrc={profileImage || defaultProfileImage}
        onClose={handleCloseImageModal}
      />

      <ChangeImageModal
        show={showChangeImageModal}
        onClose={handleCloseChangeImageModal}
        onImageChange={handleImageChange}
      />
    </>
  );
};

export default MenuStudent;
