import React, { useState } from "react";
import { Link } from "react-router-dom";
import MecaLabIcon from "../svg/MecaLabIconDark";
import InputField from "../Input/InputField";
import PasswordInputField from "../Input/PasswordInputField";
import ImageITD from "../../assets/Img/ITD_Logo.PNG";
import IconSquareCheck from "./Icon/IconSquareCheck";

function ForgotPassword({ onBack }) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  const handlePasswordChange = () => {
    setIsPasswordChanged(true);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center absolute top-0 left-0 bg-transparent bg-opacity-90">
      <header className="absolute top-4 left-4 flex items-center">
        <Link
          to="/"
          className="flex items-center transform transition duration-500 hover:scale-105 text-white ml-4"
        >
          <MecaLabIcon color="white" width="52" height="52" />
          <p className="font-bold text-2xl ml-2">MecaLab</p>
        </Link>
      </header>
      <div>
        <div className="flex items-center justify-center p-4">
          <MecaLabIcon color="white" width="52" height="52" />
        </div>
        {isPasswordChanged ? (
          <PasswordChanged onBack={onBack} />
        ) : isSubmitted ? (
          <CodeSent onBack={onBack} onPasswordChange={handlePasswordChange} />
        ) : (
          <ResetPasswordForm onSubmit={handleSubmit} onBack={onBack} />
        )}
      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white opacity-60">
        Departamento de Metal-Mecanica del ITD
      </div>
      <div className="absolute bottom-4 right-4">
        <a
          href="https://www.itdurango.edu.mx/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={ImageITD}
            alt="Descripción de la segunda imagen"
            className="h-12"
          />
        </a>
      </div>
    </div>
  );
}

function ResetPasswordForm({ onSubmit, onBack }) {
  return (
    <div className="form-style p-8 shadow-md text-center text-white rounded-xl border border-white">
      <h2 className="text-2xl font-bold mb-4">Restablecer Contraseña</h2>
      <p className="mb-4">
        Ingresa tu correo electrónico para restablecer tu <br />
        contraseña
      </p>
      <div className="my-2">
        <InputField
          label="Correo Electrónico"
          type="email"
          name="email"
          id="email"
          placeholder="ejemplo@itdurango.edu.mx"
          error=""
          delay={0.2}
        />
      </div>
      <button
        onClick={onSubmit}
        className="btn-change-blue w-full py-2 bg-transparent border border-white text-white rounded-lg hover:bg-blue-500 hover:border-blue-500 transition duration-500"
      >
        Enviar Código de Verificación
      </button>
      <button
        onClick={onBack}
        className="mt-4 underline opacity-60 hover:opacity-100 hover:no-underline transform transition duration-500"
      >
        Volver al inicio de sesión
      </button>
    </div>
  );
}

function CodeSent({ onBack, onPasswordChange }) {
  return (
    <div className="form-style p-8 shadow-md text-center text-white rounded-xl border border-white">
      <h2 className="text-2xl font-bold mb-4">Verificar Código</h2>
      <p>
        Ingresa el código de verificación y tu nueva <br /> contraseña
      </p>
      <InputField
        label="Código de Verificación"
        type="text"
        name="verificationCode"
        id="verificationCode"
        placeholder="Ingresa el código de verificación"
        error=""
        delay={0.2}
      />
      <PasswordInputField
        label="Nueva Contraseña"
        type="password"
        name="newPassword"
        id="newPassword"
        placeholder="Ingresa tu nueva contraseña"
        error=""
        delay={0.4}
      />
      <PasswordInputField
        label="Confirmar Contraseña"
        type="password"
        name="confirmPassword"
        id="confirmPassword"
        placeholder="Confirma tu nueva contraseña"
        error=""
        delay={0.4}
      />
      <button
        onClick={onPasswordChange}
        className="mt-2 btn-change-blue w-full py-2 bg-transparent border border-white text-white rounded-lg hover:bg-blue-500 hover:border-blue-500 transition duration-500"
      >
        Restablecer Contraseña
      </button>
      <button
        onClick={onBack}
        className="mt-4 underline opacity-60 hover:opacity-100 hover:no-underline transform transition duration-500"
      >
        Volver al inicio de sesión
      </button>
    </div>
  );
}

function PasswordChanged({ onBack }) {
  return (
    <div className="form-style p-8 shadow-md text-center text-white rounded-xl border border-white">
      <h2 className="text-2xl font-bold mb-4">Contraseña Cambiada</h2>
      <p>Tu contraseña ha sido cambiada exitosamente.</p>
      <div className="flex items-center justify-center mt-4">
        <IconSquareCheck className="w-20 h-20" />
      </div>
      <button
        onClick={onBack}
        className="mt-4 underline opacity-60 hover:opacity-100 hover:no-underline transform transition duration-500"
      >
        Volver al inicio de sesión
      </button>
    </div>
  );
}

export default ForgotPassword;
