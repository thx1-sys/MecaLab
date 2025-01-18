import React from "react";
import HeaderITD from "../components/Header/HeaderITD";
import ContainerHome from "../components/Container/ContainerBG";
import HomeMenu from "../components/Menu/HomeMenu";
import Robot from "../assets/Img/Robot.webp";

const HomePage = () => {
  return (
    <div className="overflow-auto h-screen">
      <HeaderITD />
      <header>
        <ContainerHome />
        <HomeMenu />
      </header>
      <main className="bg-transparent w-full h-[85vh]">
        <div className="w-full h-[80vh] flex items-center">
          <div className="w-1/2 flex flex-col justify-start pl-12 text-white">
            <h1 className="font-bold text-8xl">MecaLab</h1>
            <p className="mt-8 text-2xl">
              Bienvenido al Sistema de Administración <br /> de Laboratorio del
              Departamento de <br /> Metal-Mecánica.
            </p>
            <div>
              <button className="mt-4 text-xl py-2 px-2 rounded-lg underline text-white hover:bg-white hover:text-black hover:scale-105 hover:px-4 transform transition-all duration-500 ease-in-out btn-shadow-white hover:no-underline">
                Realiza tu primera solicitud ahora
              </button>
            </div>
            <div>
              <button className="mt-4 border text-xl text-white px-3 py-1 rounded-lg hover:bg-white hover:text-black hover:scale-105 transform transition duration-500 btn-shadow-white">
                Más información
              </button>
            </div>
          </div>
          <div className="w-1/2 flex justify-center">
            <img src={Robot} alt="Description" className="max-h-full" />
          </div>
        </div>
        <div className="w-full h-[5v]">
          <p className="text-center text-white text-sm opacity-60">
            Departamento de Metal-Mecanica del ITD
          </p>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
