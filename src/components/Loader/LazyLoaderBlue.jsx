import React from "react";
import ContainerHome from "../Container/ContainerBG";
import "./LazyLoaderBlue.css";

const LazyLoaderBlue = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <ContainerHome />
      <div className="loader">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default LazyLoaderBlue;
