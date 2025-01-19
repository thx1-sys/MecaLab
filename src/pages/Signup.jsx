import React, { useState } from "react";
import { Link } from "react-router-dom";
import ContainerBGRED from "../components/Container/ContainerBGRED";
import InputField from "../components/Input/InputField";
import Machine from "../assets/Img/Machine_2.webp";
import MecaLabIcon from "../components/svg/MecaLabIconDark";
import ImageITD from "../assets/Img/ITD_Logo.PNG";
import IconSquareCheck from "../components/svg/IconSquareCheck";

function Signup() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    numeroControl: "",
    correo: "",
    contrasena: "",
    confirmarContrasena: "",
  });

  const [showVerifyEmailForm, setShowVerifyEmailForm] = useState(false);
  const [showVerificationSuccess, setShowVerificationSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowVerifyEmailForm(true);
  };

  const handleVerifyEmail = (e) => {
    e.preventDefault();
    setShowVerificationSuccess(true);
  };

  return (
    <div className="min-w-screen h-screen flex flex-col relative overflow-y-auto">
      {/* Fondo e imagen en 'fixed' para que no interfiera con el scroll */}
      <div className="fixed top-0 left-0 w-full h-full -z-10">
        <ContainerBGRED />
        <img
          src={Machine}
          alt="Máquina del laboratorio"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Header */}
      <header className="w-full p-4 bg-transparent flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center transform transition duration-500 hover:scale-105 text-white"
        >
          <MecaLabIcon color="white" width="52" height="52" />
          <p className="font-bold text-2xl ml-2">MecaLab</p>
        </Link>
      </header>

      {/* Contenido principal */}
      <main className="flex flex-col items-center justify-center flex-grow w-full px-4 mt-4 mb-4">
        {showVerificationSuccess ? (
          <VerificationSuccess
            onBack={() => setShowVerificationSuccess(false)}
          />
        ) : showVerifyEmailForm ? (
          <VerifyEmailForm
            onSubmit={handleVerifyEmail}
            onBack={() => setShowVerifyEmailForm(false)}
          />
        ) : (
          <SignupForm
            onSubmit={handleSubmit}
            onBack={() => setShowVerifyEmailForm(false)}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="w-full p-4 flex justify-between items-center bg-transparent text-white opacity-60">
        <div className="text-center">
          Departamento de Metal-Mecanica del ITD
        </div>
        <div>
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
      </footer>
    </div>
  );
}

function SignupForm({ onSubmit, onBack }) {
  return (
    <div className="w-full max-w-md form-style p-8 shadow-md text-center text-white rounded-xl border border-white">
      <h2 className="text-2xl font-bold mb-4">Registro</h2>
      <p className="mb-1">
        ¡Bienvenido! Por favor, ingresa tus datos para registrarte
      </p>
      <div className="my-1">
        <InputField
          label="Nombre completo"
          type="text"
          name="fullName"
          id="fullName"
          placeholder="Nombre completo"
          error=""
          delay={0.2}
          className="w-full"
        />
      </div>
      <div className="my-1">
        <InputField
          label="Número de Control"
          type="text"
          name="controlNumber"
          id="controlNumber"
          placeholder="Número de Control"
          error=""
          delay={0.2}
        />
      </div>
      <div className="my-1">
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
      <div className="my-1">
        <InputField
          label="Contraseña"
          type="password"
          name="password"
          id="password"
          placeholder="Contraseña"
          error=""
          delay={0.2}
        />
      </div>
      <div className="my-1">
        <InputField
          label="Confirmar Contraseña"
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          placeholder="Confirmar Contraseña"
          error=""
          delay={0.2}
        />
      </div>
      <button
        onClick={onSubmit}
        className="btn-shadow-rose w-full py-2 bg-transparent border border-white text-white rounded-lg hover:bg-[#B42E61] hover:border-[#B42E61] transition duration-500"
      >
        Registrarse
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

function VerifyEmailForm({ onSubmit, onBack }) {
  return (
    <div className="form-style p-8 shadow-md text-center text-white rounded-xl border border-white">
      <h2 className="text-2xl font-bold mb-4">Verificar Correo Electrónico</h2>
      <p className="mb-4">
        Ingresa el código de verificación que fue enviado a tu <br />
        correo electrónico
      </p>
      <div className="my-2">
        <InputField
          label="Código de Verificación"
          type="text"
          name="verificationCode"
          id="verificationCode"
          placeholder="Código de Verificación"
          error=""
          delay={0.2}
        />
      </div>
      <button
        onClick={onSubmit}
        className="btn-shadow-rose w-full py-2 bg-transparent border border-white text-white rounded-lg hover:bg-[#B42E61] hover:border-[#B42E61] transition duration-500"
      >
        Verificar Código
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

function VerificationSuccess({ onBack }) {
  return (
    <div className="form-style p-8 shadow-md text-center text-white rounded-xl border border-white">
      <h2 className="text-2xl font-bold mb-4">Correo Verificado</h2>
      <p>Tu correo electrónico ha sido verificado exitosamente.</p>
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

export default Signup;
