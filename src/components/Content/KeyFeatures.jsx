import useFetchImage from "../../hooks/useFetchImage";
import { FeatureCard } from "../Card/FeatureCard";

const KeyFeatures = () => {
  const features = [
    {
      title: "Reservar Equipos",
      description:
        "Los estudiantes pueden reservar equipos y herramientas del laboratorio de manera rápida y sencilla, asegurando su disponibilidad cuando los necesiten.",
      imageName: "Card_1.webp",
    },
    {
      title: "Generar Reportes",
      description:
        "Los estudiantes pueden generar reportes detallados sobre el uso de los equipos y herramientas, facilitando el seguimiento de sus actividades y proyectos.",
      imageName: "Card_2.webp",
    },
    {
      title: "Consultar Historial",
      description:
        "Los estudiantes pueden acceder a un registro detallado del uso de los equipos y herramientas, permitiéndoles revisar su historial de préstamos y devoluciones.",
      imageName: "Card_3.webp",
    },
    {
      title: "Personalizar Perfil",
      description:
        "Cada estudiante puede personalizar su perfil, incluyendo información personal y preferencias, para una experiencia de usuario más personalizada.",
      imageName: "Card_4.webp",
    },
    {
      title: "Acceso Multiplataforma",
      description:
        "Los estudiantes pueden acceder al sistema desde cualquier dispositivo, ya sea un ordenador, tableta o móvil, facilitando la gestión de recursos en cualquier momento y lugar.",
      imageName: "Card_5.webp",
    },
    {
      title: "Interfaz Intuitiva",
      description:
        "Los estudiantes disfrutan de una interfaz de usuario amigable y fácil de navegar, lo que facilita el acceso a todas las funcionalidades del sistema.",
      imageName: "Card_6.webp",
    },
  ];

  return (
    <div id="KeyFeatures" className="w-full flex flex-col items-center pb-20">
      <div className="w-full max-w-screen-xl text-center mb-4 mt-20 px-4">
        <h3 className="text-4xl font-bold bg-gradient-to-b from-white to-gray-200 bg-clip-text text-transparent">
          ¿Qué pueden hacer los estudiantes en MechSys Manager?
          <span className="block text-2xl font-normal text-white/30 mt-2 pt-2">
            Todo lo que necesitas para gestionar tus actividades en el
            laboratorio de Metal-Mecánica de manera eficiente.
          </span>
        </h3>
      </div>
      <div className="w-full max-w-screen-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-4 sm:p-8">
        {features.map((feature, index) => {
          const { imageUrl, error } = useFetchImage(feature.imageName);
          const finalImageUrl = error
            ? "https://via.placeholder.com/150"
            : imageUrl;
          return (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              imageUrl={finalImageUrl}
              className="aspect-w-1 aspect-h-1"
            />
          );
        })}
      </div>
    </div>
  );
};

export default KeyFeatures;
