import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import Cookies from "js-cookie";
import MecaLabIcon from "../svg/MecaLabIconDark";
import InputField from "../Input/InputField";
import PasswordInputField from "../Input/PasswordInputField";
import Machine from "../../assets/Img/Machine_1.webp";
import ImageITD from "../../assets/Img/ITD_Logo.png";
import Alert from "../Alert/Alert";

function LoginForm({
  email,
  password,
  handleEmailChange,
  handlePasswordChange,
  handleShowNewComponent,
}) {
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token") || sessionStorage.getItem("token");
    if (token) {
      validateToken();
    }
  }, [navigate]);

  useEffect(() => {
    if (error) {
      setIsButtonDisabled(true);
      const timer = setTimeout(() => {
        setError("");
        setIsButtonDisabled(false);
      }, 3000); // 3 segundos

      return () => clearTimeout(timer);
    }
  }, [error]);

  const validateToken = () => {
    const token = Cookies.get("token") || sessionStorage.getItem("token");
    if (!token) {
      console.log("Token not found");
      return;
    }

    axios
      .get(`${import.meta.env.VITE_HOST_EXPRESS}/api/protected`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status !== 200) return;
        const userType = response.data.user.user_type;
        console.log(userType);
        if (userType === 1) {
          navigate("/student-home");
        } else if (userType === 2) {
          navigate("/instructor-home");
        } else if (userType === 3) {
          navigate("/dashboardadmin");
        } else {
          console.log("Unknown user type");
        }
      })
      .catch((error) => {
        console.error("Error validating token:", error);
      });
  };

  useEffect(() => {
    if (isAuthenticated) {
      validateToken();
    }
  }, [isAuthenticated, navigate]);

  const validateForm = () => {
    let isValid = true;
    if (!email) {
      setEmailError("El correo electrónico es obligatorio");
      isValid = false;
    } else {
      setEmailError("");
    }
    if (!password) {
      setPasswordError("La contraseña es obligatoria");
      isValid = false;
    } else if (password.length < 8) {
      setPasswordError("La contraseña debe tener más de 8 caracteres");
      isValid = false;
    } else {
      setPasswordError("");
    }
    return isValid;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_HOST_EXPRESS}/api/auth/login`,
        {
          email,
          password,
          rememberMe,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.token) {
        if (rememberMe) {
          document.cookie = `token=${response.data.token}; path=/; max-age=${
            30 * 24 * 60 * 60
          }`;
        } else {
          sessionStorage.setItem("token", response.data.token);
        }
        setError("");
        setIsAuthenticated(true);
      } else {
        setError(
          "Datos incorrectos. Por favor, verifica tu usuario y contraseña."
        );
      }
    } catch (error) {
      setError(
        "Datos incorrectos. Por favor, verifica tu usuario y contraseña."
      );
    }
  };

  return (
    <>
      {error && <Alert message={error} />}
      <motion.div
        className="w-full h-full flex flex-col md:flex-row overflow-y-auto md:overflow-y-hidden overflow-x-hidden"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full md:w-1/2 h-full flex flex-col">
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
          <motion.main
            className="h-[100vh] md:[60vh] flex flex-col text-center md:text-start text-white justify-center md:items-start p-8"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="opacity-60 text-sm font-extralight">
              Inicio para MecaLab
            </h2>
            <h1 className="font-extrabold text-4xl mt-4">Inicia Sesión</h1>
            <p className="my-8 text-xl">
              ¡Bienvenido de nuevo! Por favor, ingresa tus datos
            </p>
            <div className="w-full md:w-2/3">
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
              {emailError && (
                <p className="text-red-500 text-sm text-start">{emailError}</p>
              )}
            </div>
            <div className="w-full md:w-2/3 my-2">
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
              {passwordError && (
                <p className="text-red-500 text-sm text-start">
                  {passwordError}
                </p>
              )}
            </div>
            <div className="my-4 w-full md:w-2/3 flex justify-between items-center">
              <div className="flex items-center justify-center transform transition duration-500">
                <label
                  htmlFor="rememberMe"
                  className="flex flex-row items-end gap-2 text-white font-light text-sm"
                >
                  <input
                    id="rememberMe"
                    type="checkbox"
                    className="peer hidden"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                  />
                  <div
                    htmlFor="rememberMe"
                    className="h-5 w-5 flex rounded-md border border-white hover:border-[#F0F0F0] peer-checked:bg-[#3375C8] peer-checked:border-[#3375C8] peer-checked:shadow-blue-lg cursor-pointer transform transition duration-500"
                  ></div>
                  Recordarme
                </label>
              </div>
              <motion.div
                className="text-right transform transition duration-500 opacity-50 hover:opacity-100"
                whileHover={{ scale: 1.05 }}
              >
                <a
                  className="text-white text-sm cursor-pointer underline hover:no-underline"
                  onClick={handleShowNewComponent}
                >
                  ¿Olvidaste tu contraseña?
                </a>
              </motion.div>
            </div>
            <motion.button
              className="w-full md:w-2/3 mt-6 btn-change-blue py-2 bg-transparent border border-white text-white rounded-lg hover:bg-blue-500 hover:border-blue-500 transition duration-500"
              onClick={handleLogin}
              disabled={isButtonDisabled}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Iniciar Sesión
            </motion.button>
            <p className="mt-3 text-lg opacity-70">
              ¿No Estás registrado?{" "}
              <Link
                to="/signup"
                className="underline font-bold opacity-70 transform transition duration-500 hover:opacity-100 hover:scale-105 hover:no-underline"
              >
                Registrate
              </Link>
            </p>
          </motion.main>

          <footer className="h-[20vh] flex lg:items-end lg:justify-between items-center justify-center p-4">
            <p className="text-white text-xs text-center lg:text-sm opacity-60">
              Departamento de Metal-Mecanica del ITD
            </p>
          </footer>
        </div>

        <motion.div
          className="w-full md:w-1/2 h-full flex items-center justify-end md:block hidden"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src={Machine}
            alt="Máquina del laboratorio"
            className="h-full w-full object-cover"
          />
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute hidden lg:block bottom-0 right-0 p-4 transform transition duration-500 hover:scale-110 opacity-80 hover:opacity-100"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
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
      </motion.div>
    </>
  );
}

export default LoginForm;
