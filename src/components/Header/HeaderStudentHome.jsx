import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import MecaLabIcon from "../svg/MecaLabIconDark";
import UserImage from "../../assets/Img/Photo_Example_User.webp";
import MenuStudent from "../Menu/MenuStudent";
import "./HeaderStudentHome.css";

function HeaderLogin() {
  const [showHeader, setShowHeader] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const nodeRef = useRef(null);

  useEffect(() => {
    setShowHeader(true);
  }, []);

  return (
    <div className="w-full flex justify-center">
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
            <MecaLabIcon color="white" width="52" height="52" />
            <p className="font-bold text-2xl ml-4">MecaLab</p>
          </Link>
          <div className="font-bold text-3xl text-center">
            Solicitud de Laboratorio Metal-Mecánica
          </div>
          <div className="flex items-center relative">
            <div className="flex flex-col text-right space-y-1 mr-4">
              <div className="font-bold text-xs">Usuario</div>
              <div className="text-sm text-xs">Estudiante</div>
            </div>
            <img
              src={UserImage}
              alt="Imagen de Usuario"
              className="w-12 h-12 rounded-full transform transition duration-500 hover:scale-105 cursor-pointer"
              onClick={() => setShowMenu(!showMenu)}
            />
            <MenuStudent showMenu={showMenu} setShowMenu={setShowMenu} />
          </div>
        </header>
      </CSSTransition>
    </div>
  );
}

export default HeaderLogin;
