import React, { useEffect } from "react";
import MainLogin from "../components/Main/MainStudentHome";
import MainLayout from "../layouts/MainLayoutSutudent";
import "./StudentHome.css";

function StudentHome() {
  useEffect(() => {
    const shapesContainer = document.querySelector(".shapes");
    shapesContainer.innerHTML = ""; // Limpiar el contenedor de formas

    const numberOfShapes = Math.floor(Math.random() * 9) + 7; // Número aleatorio entre 7 y 15
    const shapeTypes = ["circle", "square", "triangle"];

    for (let i = 0; i < numberOfShapes; i++) {
      const shape = document.createElement("div");
      const shapeType =
        shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
      shape.classList.add("shape", shapeType);

      const top = Math.random() * 80; // Reducir rango para evitar superposición en los bordes
      const left = Math.random() * 80; // Reducir rango para evitar superposición en los bordes
      const size = Math.random() * 400 + 200; // Tamaño aleatorio entre 200px y 600px
      const startOpacity = Math.random() * 0.9 + 0.1; // Opacidad inicial aleatoria entre 0.1 y 1
      const endOpacity = Math.random() * 0.9 + 0.1; // Opacidad final aleatoria entre 0.1 y 1
      const duration = Math.random() * 20 + 10; // Duración aleatoria entre 10s y 30s
      const translateX = Math.random() * 200 - 100; // translateX aleatorio entre -100% y 100%
      const translateY = Math.random() * 200 - 100; // translateY aleatorio entre -100% y 100%
      const startScale = Math.random() * 0.5 + 0.5; // Escala inicial aleatoria entre 0.5 y 1
      const endScale = Math.random() * 0.5 + 1; // Escala final aleatoria entre 1 y 1.5

      shape.style.top = `${top}%`;
      shape.style.left = `${left}%`;
      shape.style.width = shapeType === "triangle" ? "0" : `${size}px`;
      shape.style.height = shapeType === "triangle" ? "0" : `${size}px`;
      shape.style.background =
        shapeType === "triangle"
          ? "none"
          : `rgba(42, 57, 144, ${startOpacity})`;
      shape.style.animation = `float ${duration}s infinite ease-in-out, changeOpacity ${duration}s infinite ease-in-out, changeSize ${duration}s infinite ease-in-out`;

      shape.style.setProperty("--translateX", `${translateX}%`);
      shape.style.setProperty("--translateY", `${translateY}%`);
      shape.style.setProperty("--startOpacity", startOpacity);
      shape.style.setProperty("--endOpacity", endOpacity);
      shape.style.setProperty("--startScale", startScale);
      shape.style.setProperty("--endScale", endScale);

      shapesContainer.appendChild(shape);
    }
  }, []);

  return (
    <MainLayout>
      <div className="absolute inset-0 w-full h-full -z-50">
        <div className="shapes"></div>
      </div>
      <div className="relative -z-10">
        <MainLogin />
      </div>
    </MainLayout>
  );
}

export default StudentHome;
