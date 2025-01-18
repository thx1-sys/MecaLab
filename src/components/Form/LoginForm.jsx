import React from "react";
import { Link } from "react-router-dom";
import MecaLabIcon from "../svg/MecaLabIconDark";
import InputField from "../Input/InputField";
import PasswordInputField from "../Input/PasswordInputField";
import Machine from "../../assets/Img/Machine_1.webp";
import ImageITD from "../../assets/Img/ITD_Logo.PNG";

function LoginForm({
  email,
  password,
  handleEmailChange,
  handlePasswordChange,
  handleShowNewComponent,
}) {
  return (
    <>
      <div className="w-1/2 h-full flex flex-col p-8">
        <header className="h-1/5 flex items-start">
          <Link
            to="/"
            className="flex items-center transform transition duration-500 hover:scale-105 text-white"
          >
            <MecaLabIcon color="white" width="52" height="52" />
            <p className="font-bold text-2xl ml-4">MecaLab</p>
          </Link>
        </header>
        <main className="h-3/5 flex flex-col text-white justify-center">
          <h2 className="opacity-60 text-sm font-extralight">
            Inicio para MecaLab
          </h2>
          <h1 className="font-extrabold text-4xl mt-4">Inicia Sesión</h1>
          <p className="my-8 text-xl">
            ¡Bienvenido de nuevo! Por favor, ingresa tus datos
          </p>
          <div className="w-2/3">
            <InputField
              label="Correo Electrónico"
              type="email"
              name="email"
              id="email"
              placeholder="ejemplo@itdurango.edu.mx"
              value={email}
              onChange={handleEmailChange}
              error=""
              delay={0.2}
            />
          </div>
          <div className="w-2/3 my-2">
            <PasswordInputField
              label="Contraseña"
              type="password"
              name="password"
              id="password"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={handlePasswordChange}
              error=""
              delay={0.4}
            />
          </div>
          <div className="my-4 w-2/3 flex justify-between items-center">
            <div className="flex items-center justify-center transform transition duration-500">
              <label
                htmlFor="rememberMe"
                className="flex flex-row items-end gap-2 text-white font-light text-sm "
              >
                <input
                  id="rememberMe"
                  type="checkbox"
                  className="peer hidden"
                />
                <div
                  htmlFor="rememberMe"
                  className="h-5 w-5 flex rounded-md border border-white hover:border-[#F0F0F0] peer-checked:bg-[#3375C8] peer-checked:border-[#3375C8] peer-checked:shadow-blue-lg cursor-pointer transform transition duration-500"
                ></div>
                Recordarme
              </label>
            </div>
            <div className="text-right transform transition duration-500 opacity-50 hover:opacity-100">
              <a
                className="text-white text-sm cursor-pointer transform transition duration-500 underline hover:no-underline"
                onClick={handleShowNewComponent}
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>
          </div>
          <p className="mt-3 text-lg opacity-70">
            ¿No Estás registrado?{" "}
            <Link
              to="/signup"
              className="underline font-bold opacity-70 transform transition duration-500 hover:opacity-100 hover:scale-105 hover:no-underline"
            >
              Registrate
            </Link>
          </p>
        </main>
        <footer className="h-1/5 flex items-end">
          <p className="text-center text-white text-sm opacity-60">
            Departamento de Metal-Mecanica del ITD
          </p>
        </footer>
      </div>
      <div className="w-1/2 h-full flex items-center justify-end">
        <img src={Machine} alt="Máquina del laboratorio" className="h-full" />
      </div>
      <div className="absolute bottom-0 right-0 p-4 transform transition duration-500 hover:scale-110 opacity-80 hover:opacity-100">
        <a
          href="https://www.itdurango.edu.mx/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={ImageITD}
            alt="Descripción de la segunda imagen"
            className="h-20"
          />
        </a>
      </div>
    </>
  );
}

export default LoginForm;
