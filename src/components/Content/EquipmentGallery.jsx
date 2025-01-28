import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import EquipmentCard from "../Card/EquipmentCard";

const EquipmentGallery = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const equipment = [
    {
      title: "Mesas de Trabajo",
      imageName: "Machine_1.webp",
    },
    {
      title: "Robot Kuka",
      imageName: "Machine_2.webp",
    },
    {
      title: "Sistemas Hidraulicos",
      imageName: "Machine_3.webp",
    },
    {
      title: "CNC",
      imageName: "Machine_4.webp",
    },
    {
      title: "PLC",
      imageName: "Machine_5.webp",
    },
    {
      title: "Hidraulica",
      imageName: "Machine_6.webp",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      id="equipos"
      className="w-screen min-h-screen flex flex-col items-center justify-center pb-20 bg-white"
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      <motion.div
        className="w-full max-w-screen-xl text-center mb-4 mt-20 px-8 md:px-16 lg:px-40"
        variants={itemVariants}
      >
        <h3 className="text-4xl font-bold bg-gradient-to-b from-black to-gray-200 bg-clip-text text-transparent">
          ¿Qué equipos están disponibles en el laboratorio de Metal-Mecánica?
          <span className="block text-xl font-normal text-[#757575] mt-4">
            Accede a una variedad de herramientas y maquinaria especializada,
            diseñadas para apoyar a estudiantes y profesores en el desarrollo de
            proyectos y prácticas con tecnología avanzada.
          </span>
        </h3>
      </motion.div>
      <motion.div
        className="w-full max-w-screen-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-4 sm:p-8"
        variants={containerVariants}
      >
        {equipment.map((item, index) => (
          <motion.div key={index} variants={itemVariants}>
            <EquipmentCard
              title={item.title}
              imageName={item.imageName}
              className="aspect-w-1 aspect-h-1"
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default EquipmentGallery;
