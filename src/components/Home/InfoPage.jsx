import { Link } from "react-router-dom";
import KeyFeatures from "../Content/KeyFeatures";
import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const InfoPage = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  useEffect(() => {
    const info = document.getElementById("info");
    if (!info) return;

    const shapesContainer = document.createElement("div");
    shapesContainer.style.position = "absolute";
    shapesContainer.style.top = 0;
    shapesContainer.style.left = 0;
    shapesContainer.style.width = "100%";
    shapesContainer.style.height = "100%";
    shapesContainer.style.overflow = "hidden";
    shapesContainer.style.zIndex = -1;
    info.appendChild(shapesContainer);

    const numberOfShapes = Math.floor(Math.random() * 6) + 5;
    const shapes = Array.from({ length: numberOfShapes }, () => {
      const shape = document.createElement("div");
      const top = Math.random() * 80;
      const left = Math.random() * 80;
      const size = Math.random() * 300 + 100;
      const startOpacity = Math.random() * 0.9 + 0.1;
      const endOpacity = Math.random() * 0.9 + 0.1;
      const duration = Math.random() * 20 + 10;
      const translateX = Math.random() * 400 - 200;
      const translateY = Math.random() * 400 - 200;

      shape.style.position = "absolute";
      shape.style.top = `${top}%`;
      shape.style.left = `${left}%`;
      shape.style.width = `${size}px`;
      shape.style.height = `${size}px`;
      shape.style.borderRadius = "50%";
      shape.style.filter = "blur(50px)";
      shape.style.background = `rgba(180, 46, 97, ${startOpacity})`;
      shape.style.animation = `float ${duration}s infinite ease-in-out, changeOpacity ${duration}s infinite ease-in-out`;
      shape.style.setProperty("--translateX", `${translateX}px`);
      shape.style.setProperty("--translateY", `${translateY}px`);
      shape.style.setProperty("--startOpacity", startOpacity);
      shape.style.setProperty("--endOpacity", endOpacity);

      return shape;
    });

    shapes.forEach((shape) => shapesContainer.appendChild(shape));

    const styleElement = document.createElement("style");
    styleElement.textContent = `
      @keyframes float {
        0% { transform: translateY(0) translateX(0) scale(1); }
        50% { transform: translateY(var(--translateY)) translateX(var(--translateX)) scale(1.2); }
        100% { transform: translateY(0) translateX(0) scale(1); }
      }
      @keyframes changeOpacity {
        0%, 100% { opacity: var(--startOpacity); }
        50% { opacity: var(--endOpacity); }
      }
    `;
    document.head.appendChild(styleElement);

    return () => {
      info.removeChild(shapesContainer);
      document.head.removeChild(styleElement);
    };
  }, []);

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
      id="info"
      className="relative w-screen min-h-screen flex flex-col items-center shadow-2xl"
      style={{ backgroundColor: "#4E142A", zIndex: 1 }}
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 1 } },
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "50px",
          background:
            "linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0))",
          zIndex: 2,
        }}
      ></div>
      <motion.div
        className="w-11/12 lg:w-20/24 mt-20 flex flex-col items-center"
        style={{ zIndex: 1 }}
        variants={containerVariants}
      >
        <motion.div
          className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8 items-center"
          variants={itemVariants}
        >
          <div className="text-white/40 w-full text-xl md:text-2xl lg:text-4xl col-span-1 lg:col-span-2">
            <h2>
              <span className="font-extrabold text-white">MecaLab</span> es el
              sistema de administración para laboratorios de Metal-Mecánica.
              Utilizado por los departamentos más avanzados, optimiza la gestión
              de inventarios, la reservación de equipos y el seguimiento de
              préstamos, mejorando la organización y el uso de recursos.
            </h2>
          </div>
          <div className="w-full flex items-center justify-center">
            <motion.ul
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center justify-center w-full"
              variants={containerVariants}
            >
              <motion.li className="h-16 w-full" variants={itemVariants}>
                <Link
                  to="/signup"
                  className="btn-shadow-rose w-full h-full flex items-center justify-center mt-6 py-4 bg-transparent border border-white text-white text-2xl rounded-lg hover:bg-[#B42E61] hover:border-[#B42E61] transition duration-500"
                >
                  Comenzar
                </Link>
              </motion.li>
              <motion.li className="h-16 w-full" variants={itemVariants}>
                <a
                  href="#KeyFeatures"
                  className="btn-shadow-rose w-full h-full flex items-center justify-center mt-6 py-4 bg-transparent border border-white text-white text-2xl rounded-lg hover:bg-[#B42E61] hover:border-[#B42E61] transition duration-500"
                >
                  Ver más
                </a>
              </motion.li>
            </motion.ul>
          </div>
        </motion.div>
        <div className="w-full mt-8" id="KeyFeatures">
          <KeyFeatures />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default InfoPage;
