import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import MecaLabIcon from "../svg/MecaLabIconDark";
import InputField from "../Input/InputField";
import PasswordInputField from "../Input/PasswordInputField";
import Machine from "../../assets/Img/Machine_1.webp";
import ImageITD from "../../assets/Img/ITD_Logo.PNG";
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
        if (userType === 1 || userType === 2) {
          navigate("/home-request-user");
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
            {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
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
            {passwordError && (
              <p className="text-red-500 text-sm">{passwordError}</p>
            )}
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
            <div className="text-right transform transition duration-500 opacity-50 hover:opacity-100">
              <a
                className="text-white text-sm cursor-pointer transform transition duration-500 underline hover:no-underline"
                onClick={handleShowNewComponent}
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>
          </div>
          <button
            className="w-2/3 mt-6 btn-change-blue py-2 bg-transparent border border-white text-white rounded-lg hover:bg-blue-500 hover:border-blue-500 transition duration-500"
            onClick={handleLogin}
            disabled={isButtonDisabled}
          >
            Iniciar Sesión
          </button>
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
