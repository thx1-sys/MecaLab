import React, { useEffect } from "react";
import HeaderITD from "../components/Header/HeaderITD";
import ContainerHome from "../components/Container/ContainerBG";
import HomeMenu from "../components/Menu/HomeMenu";
import MainContent from "../components/Main/MainContent";
import HomeFooter from "../components/Footer/HomeFooter";
import ImageSection from "../components/Container/ImageSection";
import EquipmentGallery from "../components/Content/EquipmentGallery";
import InfoPage from "../components/Home/InfoPage";
import CookieConsent from "../hooks/CookieConsent";
import image from "../assets/Video/video.png";

const ImageCard = ({ title, description, image }) => (
  <div className="bg-white border rounded shadow p-4 flex flex-col items-center w-60 m-2">
    <img src={image} alt={title} className="mb-2 rounded" />
    <h3 className="font-bold mb-1">{title}</h3>
    <p className="text-sm text-gray-600">{description}</p>
  </div>
);

const HomePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="h-screen overflow-y-auto overflow-x-hidden custom-scrollbar-home">
      <HeaderITD />
      <header>
        <ContainerHome />
        <HomeMenu />
      </header>
      <main className="bg-transparent w-full">
        <MainContent />
        <div className="h-[5vh] w-full text-center animate-slideUpFadeIn text-white opacity-60">
          Departamento de Metal-Mecanica del ITD
        </div>
        <ImageSection image={image} />
        <div>
          <InfoPage />
          <EquipmentGallery />
        </div>
      </main>
      <HomeFooter />
      <CookieConsent />
    </div>
  );
};

export default HomePage;
