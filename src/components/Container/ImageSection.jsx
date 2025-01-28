import React from "react";
import { useInView } from "react-intersection-observer";
import "./ImageSection.css"; // Import the CSS file

const ImageSection = ({ image }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      id="image-section"
      ref={ref}
      className={`h-[100vh] flex flex-col justify-center px-4 md:px-0 hover:scale-105 transition-transform duration-[1000ms] ease-in-out ${
        inView
          ? "transform translate-y-0 opacity-100"
          : "transform translate-y-40 opacity-0"
      }`}
    >
      <h2 className="text-center text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
        ¡Bienvenido a MecaLab!
      </h2>
      <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 mx-auto relative rounded-xl overflow-hidden animated-box-shadow">
        <div className="bg-[#0B192C] rounded-t-lg p-2 flex items-center justify-between">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div></div>
        </div>
        <img src={image} alt="Imagen" className="w-full rounded-b-lg shadow" />
      </div>
    </section>
  );
};

export default ImageSection;
