import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import ContainerBGRED from "../components/Container/ContainerBGRED";
import InputField from "../components/Input/InputField";
import PasswordInputField from "../components/Input/PasswordInputField";
import Machine from "../assets/Img/Machine_2.webp";
import MecaLabIcon from "../components/svg/MecaLabIconDark";
import ImageITD from "../assets/Img/ITD_Logo.PNG";
import IconSquareCheck from "../components/svg/IconSquareCheck";
import Loading from "../components/Loader/Loading";
import Alert from "../components/Alert/Alert";

function Signup() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    numeroControl: "",
    correo: "",
    contrasena: "",
    confirmarContrasena: "",
    verificationCode: "",
  });

  const [showVerifyEmailForm, setShowVerifyEmailForm] = useState(false);
  const [showVerificationSuccess, setShowVerificationSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 15000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await axios.post(
        `${import.meta.env.VITE_HOST_EXPRESS}/api/auth/register`,
        {
          firstName: formData.nombre,
          lastName: formData.apellido,
          email: formData.correo,
          password: formData.contrasena,
          controlNumber: formData.numeroControl,
        }
      );
      setShowVerifyEmailForm(true);
    } catch (error) {
      setError(error.response?.data || "Error al registrar el usuario.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await axios.post(
        `${import.meta.env.VITE_HOST_EXPRESS}/api/auth/verify-registration`,
        {
          email: formData.correo,
          verificationCode: formData.verificationCode,
        }
      );
      setShowVerificationSuccess(true);
    } catch (error) {
      setError(error.response?.data || "Error al verificar el código.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-w-screen h-screen flex flex-col relative overflow-y-auto custom-scrollbar-home">
      <div className="fixed top-0 left-0 w-full h-full -z-10">
        <ContainerBGRED />
        <img
          src={Machine}
          alt="Máquina del laboratorio"
          className="w-full h-full object-cover hidden lg:block"
        />
      </div>

      <motion.header
        className="w-full flex items-center justify-center md:justify-start p-4"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Link
          to="/"
          className="flex mt-4 items-center transform transition duration-500 hover:scale-105 text-white"
        >
          <MecaLabIcon color="white" width="52" height="52" />
          <p className="font-bold text-lg md:text-2xl ml-2">MecaLab</p>
        </Link>
      </motion.header>

      <main className="flex flex-col items-center justify-center flex-grow w-full px-4 mt-4 mb-4">
        {loading ? (
          <Loading />
        ) : showVerificationSuccess ? (
          <VerificationSuccess
            onBack={() => setShowVerificationSuccess(false)}
          />
        ) : showVerifyEmailForm ? (
          <VerifyEmailForm
            formData={formData}
            onChange={handleChange}
            onSubmit={handleVerifyEmail}
            onBack={() => setShowVerifyEmailForm(false)}
          />
        ) : (
          <SignupForm
            formData={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
            loading={loading}
            error={error}
          />
        )}
        {error && <Alert message={error} />}
      </main>

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
          <motion.img
            src={ImageITD}
            alt="ITD Logo"
            className="h-12 md:h-16 transition transform duration-500 hover:scale-110"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          />
        </a>
      </motion.footer>
    </div>
  );
}

function SignupForm({ formData, onChange, onSubmit, loading, error }) {
  return (
    <motion.div
      className="w-full max-w-4xl form-style-2 p-4 lg:p-8 shadow-md text-center text-white rounded-xl border border-white"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-2xl font-bold mb-4">Registro</h2>
      <p className="mb-1">
        ¡Bienvenido! Por favor, ingresa tus datos para registrarte
      </p>
      <div className="flex flex-wrap -mx-2">
        <div className="w-full md:w-1/2 px-2 my-1">
          <InputField
            label="Nombre"
            type="text"
            name="nombre"
            id="nombre"
            placeholder="Nombre completo"
            value={formData.nombre}
            onChange={onChange}
            error=""
            delay={0.2}
            className="w-full"
          />
        </div>
        <div className="w-full md:w-1/2 px-2 my-1">
          <InputField
            label="Apellido"
            type="text"
            name="apellido"
            id="apellido"
            placeholder="Apellido"
            value={formData.apellido}
            onChange={onChange}
            error=""
            delay={0.2}
          />
        </div>
        <div className="w-full md:w-1/2 px-2 my-1">
          <InputField
            label="Número de Control"
            type="text"
            name="numeroControl"
            id="numeroControl"
            placeholder="Número de Control"
            value={formData.numeroControl}
            onChange={onChange}
            error=""
            delay={0.2}
          />
        </div>
        <div className="w-full md:w-1/2 px-2 my-1">
          <InputField
            label="Correo Electrónico"
            type="email"
            name="correo"
            id="correo"
            placeholder="ejemplo@itdurango.edu.mx"
            value={formData.correo}
            onChange={onChange}
            error=""
            delay={0.2}
          />
        </div>
        <div className="w-full md:w-1/2 px-2 my-1">
          <PasswordInputField
            label="Contraseña"
            type="password"
            name="contrasena"
            id="contrasena"
            placeholder="Contraseña"
            value={formData.contrasena}
            onChange={onChange}
            error=""
            delay={0.2}
          />
        </div>
        <div className="w-full md:w-1/2 px-2 my-1">
          <PasswordInputField
            label="Confirmar Contraseña"
            type="password"
            name="confirmarContrasena"
            id="confirmarContrasena"
            placeholder="Confirmar Contraseña"
            value={formData.confirmarContrasena}
            onChange={onChange}
            error=""
            delay={0.2}
          />
        </div>
      </div>
      <div className="mt-4 w-full md:w-3/4 mx-auto">
        <motion.button
          onClick={onSubmit}
          className="btn-shadow-rose w-full py-2 bg-transparent border border-white text-white rounded-lg hover:bg-[#B42E61] hover:border-[#B42E61] transition duration-500"
          disabled={loading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Registrarse
        </motion.button>
        <Link to="/login">
          <motion.button
            className="mt-4 underline opacity-60 hover:opacity-100 hover:no-underline transform transition duration-500"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Volver al inicio de sesión
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
}

function VerifyEmailForm({ formData, onChange, onSubmit, onBack }) {
  return (
    <motion.div
      className="form-style p-8 shadow-md text-center text-white rounded-xl border border-white"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
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
          value={formData.verificationCode}
          onChange={onChange}
          error=""
          delay={0.2}
        />
      </div>
      <motion.button
        onClick={onSubmit}
        className="btn-shadow-rose w-full py-2 bg-transparent border border-white text-white rounded-lg hover:bg-[#B42E61] hover:border-[#B42E61] transition duration-500"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Verificar Código
      </motion.button>
      <Link to="/signup">
        <motion.button
          className="mt-4 underline opacity-60 hover:opacity-100 hover:no-underline transform transition duration-500"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Volver al inicio del registro
        </motion.button>
      </Link>
    </motion.div>
  );
}

function VerificationSuccess({ onBack }) {
  return (
    <motion.div
      className="form-style p-8 shadow-md text-center text-white rounded-xl border border-white"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-2xl font-bold mb-4">Correo Verificado</h2>
      <p>Tu correo electrónico ha sido verificado exitosamente.</p>
      <div className="flex items-center justify-center mt-4">
        <IconSquareCheck className="w-20 h-20" />
      </div>
      <Link to="/login">
        <motion.button
          className="mt-4 underline opacity-60 hover:opacity-100 hover:no-underline transform transition duration-500"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Volver al inicio de sesión
        </motion.button>
      </Link>
    </motion.div>
  );
}

export default Signup;
