import React, { useEffect } from "react";

function ContainerHome() {
  useEffect(() => {
    const shapesContainer = document.querySelector(".shapes-red");
    shapesContainer.innerHTML = ""; // Limpiar el contenedor de formas

    const numberOfShapes = Math.floor(Math.random() * 5) + 3; // Número aleatorio entre 3 y 7

    for (let i = 0; i < numberOfShapes; i++) {
      const shape = document.createElement("div");
      shape.classList.add("shape-red", "square-red");

      const top = Math.random() * 80; // Reducir rango para evitar superposición en los bordes
      const left = Math.random() * 80; // Reducir rango para evitar superposición en los bordes
      const size = Math.random() * 200 + 200; // Tamaño aleatorio entre 200px y 400px
      const opacity = Math.random() * 0.5 + 0.5; // Opacidad aleatoria entre 0.5 y 1

      shape.style.top = `${top}%`;
      shape.style.left = `${left}%`;
      shape.style.width = `${size}px`;
      shape.style.height = `${size}px`;
      shape.style.background = `rgba(156, 37, 77, ${opacity})`;
      shape.style.animation = `float 15s infinite ease-in-out`;

      shapesContainer.appendChild(shape);
    }
  }, []);

  return (
    <>
      <div className="absolute inset-0 h-[100vh] w-full -z-50 bg-[#360e1d]">
        <div className="shapes-red"></div>
      </div>
    </>
  );
}

export default ContainerHome;
