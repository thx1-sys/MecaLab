import React, { useState, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import MecaLabIcon from "../svg/MecaLabIconDark";
import LogoITD from "../../assets/Img/ITD_Logo.png";
import "./FooterLogin.css";

function FooterLogin() {
  const [showFooter, setShowFooter] = useState(false);
  const nodeRef = useRef(null);

  useEffect(() => {
    setShowFooter(true);
  }, []);

  return (
    <div className="w-full flex justify-center">
      <CSSTransition
        in={showFooter}
        timeout={500}
        classNames="fade-up"
        unmountOnExit
        nodeRef={nodeRef}
      >
        <footer
          ref={nodeRef}
          className="w-11/12 h-[10vh] p-4 bg-transparent text-white flex justify-between items-center z-0"
        >
          <div className="text-base">
            <p>Departamento de Metal-Mecanica del ITD</p>
          </div>
          <a
            href="https://www.itdurango.edu.mx/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-4 transition duration-500 transform hover:scale-105"
          >
            <img
              src={LogoITD}
              alt="Escudo del Instituto Tecnológico de Durango"
              className="w-16 h-16 object-contain"
            />
          </a>
        </footer>
      </CSSTransition>
    </div>
  );
}

export default FooterLogin;
