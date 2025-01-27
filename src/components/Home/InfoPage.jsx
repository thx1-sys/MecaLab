import { Link } from "react-router-dom";
import ContainerHome from "../Container/ContainerHome";
import KeyFeatures from "../Content/KeyFeatures";

const InfoPage = () => {
  const handleScroll = (event, id) => {
    event.preventDefault();
    const section = document.getElementById(id);
    const offset = -50;
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = section.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition + offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });

    // Usar history.replaceState para ocultar el fragmento de la URL
    history.replaceState(null, null, " ");
  };

  return (
    <div
      id="info"
      className="w-screen min-h-screen flex flex-col items-center  shadow-2xl"
    >
      <div className="w-11/12 lg:w-20/24 mt-20 flex flex-col items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
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
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center justify-center w-full">
              <li className="h-16 w-full">
                <Link
                  to="/signup"
                  className="btn-change-blue w-full h-full flex items-center justify-center mt-6 py-4 bg-transparent border border-white text-white text-2xl rounded-lg hover:bg-blue-500 hover:border-blue-500 transition duration-500"
                >
                  Comenzar
                </Link>
              </li>
              <li className="h-16 w-full">
                <a
                  href="#KeyFeatures"
                  className="btn-change-blue w-full h-full flex items-center justify-center mt-6 py-4 bg-transparent border border-white text-white text-2xl rounded-lg hover:bg-blue-500 hover:border-blue-500 transition duration-500"
                >
                  Ver más
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="w-full mt-8" id="KeyFeatures">
          <KeyFeatures />
        </div>
      </div>
    </div>
  );
};

export default InfoPage;
