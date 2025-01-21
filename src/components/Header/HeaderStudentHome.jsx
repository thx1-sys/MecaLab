import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import MecaLabIcon from "../svg/MecaLabIconDark";
import MenuStudent from "../Menu/MenuStudent";
import UserImage from "../../assets/Img/Photo_Example_User.webp";
import { fetchUser } from "../../services/userService";
import "./HeaderStudentHome.css";

function HeaderStudentHome() {
  const [showHeader, setShowHeader] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [username, setUsername] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState(UserImage);
  const nodeRef = useRef(null);

  useEffect(() => {
    setShowHeader(true);

    const getUserData = async () => {
      const userData = await fetchUser();
      if (userData) {
        setUsername(userData.username);
        setProfileImageUrl(userData.profileImageUrl || UserImage);
      }
    };

    getUserData();
  }, []);

  return (
    <div className="w-full flex justify-center z-20">
      <CSSTransition
        in={showHeader}
        timeout={500}
        classNames="fade-down"
        unmountOnExit
        nodeRef={nodeRef}
      >
        <header
          ref={nodeRef}
          className="w-11/12 h-[10vh] p-4 bg-transparent text-white flex justify-between items-center border-b border-white border-opacity-30 z-0"
        >
          <Link
            to="/student-home"
            className="flex items-center transform transition duration-500 hover:scale-105"
            onClick={() => window.location.reload()}
          >
            <MecaLabIcon color="white" width="42" height="42" />
            <p className="font-bold text-2xl ml-4 hidden sm:block">MecaLab</p>
          </Link>
          <div className="font-bold text-3xl text-center hidden md:block">
            Solicitud de Laboratorio Metal-Mecánica
          </div>
          <div className="flex items-center relative">
            <div className="flex flex-col text-right space-y-1 mr-4 hidden md:block">
              <div className="font-bold text-xs md:text-sm">{username}</div>
              <div className="text-xs md:text-sm">Estudiante</div>
            </div>
            <img
              src={profileImageUrl}
              alt="Imagen de Usuario"
              className="w-10 h-10 md:w-12 md:h-12 rounded-full transform transition duration-500 hover:scale-105 cursor-pointer"
              onClick={() => setShowMenu(!showMenu)}
            />
            <MenuStudent showMenu={showMenu} setShowMenu={setShowMenu} />
          </div>
        </header>
      </CSSTransition>
    </div>
  );
}

export default HeaderStudentHome;
