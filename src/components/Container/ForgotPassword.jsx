import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import MecaLabIcon from "../svg/MecaLabIconDark";
import InputField from "../Input/InputField";
import PasswordInputField from "../Input/PasswordInputField";
import ImageITD from "../../assets/Img/ITD_Logo.PNG";
import IconSquareCheck from "./Icon/IconSquareCheck";
import Loading from "../Loader/Loading";
import Alert from "../Alert/Alert";

function ForgotPassword({ onBack }) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const timer = setTimeout(() => {
        setErrors({});
      }, 15000); // 15 segundos

      return () => clearTimeout(timer);
    }
  }, [errors]);

  const validatePassword = (password) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;
    return regex.test(password);
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setIsButtonDisabled(true);
    setErrors({});
    setIsLoading(true);

    if (!forgotEmail) {
      setErrors({ forgotEmail: "El correo electrónico es requerido." });
      setIsButtonDisabled(false);
      setIsLoading(false);
      return;
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_HOST_EXPRESS}/api/auth/forgot-password`,
        { email: forgotEmail },
        { headers: { "Content-Type": "application/json" } }
      );
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error al enviar el código de verificación:", error);
      setErrors({ forgotEmail: "Error al enviar el código de verificación." });
    } finally {
      setIsButtonDisabled(false);
      setIsLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setIsButtonDisabled(true);
    setErrors({});
    setIsLoading(true);

    if (!verificationCode || !newPassword || !confirmPassword) {
      setErrors({ form: "Todos los campos son requeridos." });
      setIsButtonDisabled(false);
      setIsLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrors({ confirmPassword: "Las contraseñas no coinciden." });
      setIsButtonDisabled(false);
      setIsLoading(false);
      return;
    }

    if (!validatePassword(newPassword)) {
      setErrors({
        newPassword:
          "La contraseña debe tener al menos 8 caracteres, incluyendo una letra mayúscula, una letra minúscula, un número y un carácter especial.",
      });
      setIsButtonDisabled(false);
      setIsLoading(false);
      return;
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_HOST_EXPRESS}/api/auth/reset-password`,
        {
          email: forgotEmail,
          verificationCode,
          newPassword,
        },
        { headers: { "Content-Type": "application/json" } }
      );
      setIsPasswordChanged(true);
    } catch (error) {
      console.error("Error al cambiar la contraseña:", error);
      setErrors({ form: "Error al cambiar la contraseña." });
    } finally {
      setIsButtonDisabled(false);
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-between relative overflow-y-auto p-4">
      {/* Header */}
      <motion.header
        className="w-full flex items-center justify-center md:justify-start p-4"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Link
          to="/"
          className="flex items-center transform transition duration-500 hover:scale-105 text-white"
        >
          <MecaLabIcon color="white" width="52" height="52" />
          <p className="font-bold text-lg md:text-2xl ml-2">MecaLab</p>
        </Link>
      </motion.header>

      {/* Main Content */}
      <motion.div
        className="w-full max-w-md p-4 flex-grow flex flex-col justify-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {isLoading ? (
          <Loading />
        ) : isPasswordChanged ? (
          <PasswordChanged onBack={onBack} />
        ) : isSubmitted ? (
          <CodeSent
            onBack={onBack}
            onPasswordChange={handlePasswordChange}
            setVerificationCode={setVerificationCode}
            setNewPassword={setNewPassword}
            setConfirmPassword={setConfirmPassword}
            email={forgotEmail}
            errors={errors}
          />
        ) : (
          <ResetPasswordForm
            onSubmit={handleForgotPassword}
            onBack={onBack}
            setForgotEmail={setForgotEmail}
            errors={errors}
          />
        )}
        {Object.keys(errors).length > 0 && (
          <Alert message={Object.values(errors).join(", ")} />
        )}
      </motion.div>

      {/* Footer */}
      <motion.footer
        className="w-full flex flex-col lg:flex-row items-center lg:justify-between gap-4 p-4"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-xs md:text-sm text-white opacity-60 text-center lg:text-left">
          Departamento de Metal-Mecánica del ITD
        </p>
        <a
          href="https://www.itdurango.edu.mx/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={ImageITD}
            alt="ITD Logo"
            className="h-12 md:h-16 transition transform duration-500 hover:scale-110"
          />
        </a>
      </motion.footer>
    </div>
  );
}

function ResetPasswordForm({ onSubmit, onBack, setForgotEmail, errors }) {
  return (
    <div className="form-style p-6 md:p-8 bg-white bg-opacity-10 shadow-md text-center text-white rounded-xl border border-white">
      <h2 className="text-xl md:text-2xl font-bold mb-4">
        Restablecer Contraseña
      </h2>
      <p className="mb-4 text-sm md:text-base">
        Ingresa tu correo electrónico para restablecer tu contraseña
      </p>
      <InputField
        label="Correo Electrónico"
        type="email"
        placeholder="ejemplo@itdurango.edu.mx"
        error={errors.forgotEmail}
        delay={0.2}
        onChange={(e) => setForgotEmail(e.target.value)}
      />
      <button
        onClick={onSubmit}
        className="btn-change-blue w-full py-2 mt-4 bg-transparent border border-white text-white rounded-lg hover:bg-blue-500 hover:border-blue-500 transition duration-500"
      >
        Enviar Código de Verificación
      </button>
      <button
        onClick={onBack}
        className="mt-4 underline text-sm opacity-60 hover:opacity-100 transform duration-500"
      >
        Volver al inicio de sesión
      </button>
    </div>
  );
}

function CodeSent({
  onBack,
  onPasswordChange,
  setVerificationCode,
  setNewPassword,
  setConfirmPassword,
  email,
  errors,
}) {
  return (
    <div className="form-style p-6 md:p-8 bg-white bg-opacity-10 shadow-md text-center text-white rounded-xl border border-white">
      <h2 className="text-xl md:text-2xl font-bold mb-4">Verificar Código</h2>
      <InputField
        label="Código de Verificación"
        type="text"
        placeholder="Ingresa el código de verificación"
        error={errors.verificationCode}
        delay={0.2}
        onChange={(e) => setVerificationCode(e.target.value)}
      />
      <PasswordInputField
        label="Nueva Contraseña"
        type="password"
        placeholder="Nueva contraseña"
        error={errors.newPassword}
        delay={0.4}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <PasswordInputField
        label="Confirmar Contraseña"
        type="password"
        placeholder="Confirmar contraseña"
        error={errors.confirmPassword}
        delay={0.4}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button
        onClick={onPasswordChange}
        className="btn-change-blue w-full py-2 mt-4 bg-transparent border border-white text-white rounded-lg hover:bg-blue-500 hover:border-blue-500 transition duration-500"
      >
        Restablecer Contraseña
      </button>
      <button
        onClick={onBack}
        className="mt-4 underline text-sm opacity-60 hover:opacity-100 transform duration-500"
      >
        Volver al inicio de sesión
      </button>
    </div>
  );
}

function PasswordChanged({ onBack }) {
  return (
    <div className="form-style p-6 md:p-8 bg-white bg-opacity-10 shadow-md text-center text-white rounded-xl border border-white">
      <h2 className="text-xl md:text-2xl font-bold mb-4">
        Contraseña Cambiada
      </h2>
      <p>Tu contraseña ha sido cambiada exitosamente.</p>
      <IconSquareCheck className="w-16 h-16 mx-auto mt-4" />
      <button
        onClick={onBack}
        className="mt-4 underline text-sm opacity-60 hover:opacity-100 transform duration-500"
      >
        Volver al inicio de sesión
      </button>
    </div>
  );
}

export default ForgotPassword;
