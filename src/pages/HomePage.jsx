import React from "react";
import HeaderITD from "../components/Header/HeaderITD";
import ContainerHome from "../components/Container/ContainerBG";
import HomeMenu from "../components/Menu/HomeMenu";
import MainContent from "../components/Main/MainContent";

const HomePage = () => {
  return (
    <div className="h-screen overflow-y-auto overflow-x-hidden custom-scrollbar-home">
      <HeaderITD />
      <header>
        <ContainerHome />
        <HomeMenu />
      </header>
      <main className="bg-transparent w-full">
        <MainContent />
        <div></div>
      </main>
    </div>
  );
};

export default HomePage;
