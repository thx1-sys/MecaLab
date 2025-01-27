import EquipmentCard from "../Card/EquipmentCard";

const EquipmentGallery = () => {
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

  return (
    <div
      id="equipos"
      className="w-screen min-h-screen flex flex-col items-center justify-center pb-20 bg-white"
    >
      <div className="w-full max-w-screen-xl text-center mb-4 mt-20 px-8 md:px-16 lg:px-40">
        <h3 className="text-4xl font-bold bg-gradient-to-b from-black to-gray-200 bg-clip-text text-transparent">
          ¿Qué equipos están disponibles en el laboratorio de Metal-Mecánica?
          <span className="block text-xl font-normal text-[#757575] mt-4">
            Accede a una variedad de herramientas y maquinaria especializada,
            diseñadas para apoyar a estudiantes y profesores en el desarrollo de
            proyectos y prácticas con tecnología avanzada.
          </span>
        </h3>
      </div>
      <div className="w-full max-w-screen-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-4 sm:p-8">
        {equipment.map((item, index) => (
          <EquipmentCard
            key={index}
            title={item.title}
            imageName={item.imageName}
            className="aspect-w-1 aspect-h-1"
          />
        ))}
      </div>
    </div>
  );
};

export default EquipmentGallery;
