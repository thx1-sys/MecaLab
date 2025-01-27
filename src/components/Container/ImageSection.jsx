import React from "react";
import { useInView } from "react-intersection-observer";

const ImageSection = ({ image }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      id="image-section"
      ref={ref}
      className={`h-[100vh] mb-8 mt-4 flex flex-col justify-center transition-transform duration-[1000ms] ease-in-out ${
        inView
          ? "transform translate-y-0 opacity-100"
          : "transform translate-y-20 opacity-0"
      }`}
    >
      <h2 className="text-center text-4xl font-bold mb-12 text-white">
        ¡Bienvenido a MecaLab!
      </h2>
      <div
        className="w-full md:w-2/3 lg:w-1/2 mx-auto relative rounded-xl overflow-hidden"
        style={{
          boxShadow:
            "0 0 40px rgba(37, 83, 146, 0.5), 0 0 40px rgba(37, 83, 146, 0.5), 0 0 60px rgba(37, 83, 146, 0.5)",
        }}
      >
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
