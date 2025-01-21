import React from "react";
import Container from "../Container/ContainerBGRED";
import "./loader.css";

const LazyLoaderRed = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Container />
      <div className="loader">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default LazyLoaderRed;
