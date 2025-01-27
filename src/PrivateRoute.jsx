import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get("token") || sessionStorage.getItem("token");
    console.log("Token:", token); // Verificar si el token está presente
    if (token) {
      axios
        .get(`${import.meta.env.VITE_HOST_EXPRESS}/api/protected`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("API response:", response); // Verificar la respuesta de la API
          if (response.status === 200) {
            setIsAuthenticated(true);
          }
        })
        .catch((error) => {
          console.error("Error validating token:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
