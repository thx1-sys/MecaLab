// src/components/Admin/Materials.jsx
import React, { useState } from "react";
import SelectField from "../Input/SelectField";
import InputField from "../Input/InputField";
import AlertGreen from "../Alert/AlertGreen";

const materialStatusMap = {
  0: "Disponible",
  1: "Bajo Stock",
  2: "Agotado",
  // Añade más estados según sea necesario
};

const mockMaterials = [
  {
    material_id: 1,
    name: "Resistor",
    type: "Componente Electrónico",
    quantity: 500,
    unit: "pcs",
    location: "Almacén 1",
    status: 0,
  },
  {
    material_id: 2,
    name: "Cable de Cobre",
    type: "Cable",
    quantity: 1000,
    unit: "metros",
    location: "Almacén 2",
    status: 1,
  },
  // Añade más materiales según sea necesario
];

const Materials = () => {
  const [materials, setMaterials] = useState(mockMaterials);
  const [editedMaterial, setEditedMaterial] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    quantity: "",
    unit: "",
    location: "",
    status: "",
    // Añade más campos si es necesario
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const materialsPerPage = 7;

  // Búsqueda y Filtro
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const handleEditClick = (material) => {
    setEditedMaterial(material);
    setFormData({
      name: material.name,
      type: material.type,
      quantity: material.quantity,
      unit: material.unit,
      location: material.location,
      status: material.status,
      // Inicializa más campos si es necesario
    });
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    if (!editedMaterial) return;
    const updatedMaterials = materials.map((material) =>
      material.material_id === editedMaterial.material_id
        ? { ...material, ...formData }
        : material
    );
    setMaterials(updatedMaterials);
    setIsModalOpen(false);
    setEditedMaterial(null);
    setErrorMessage("");
    setSuccessMessage("Material actualizado correctamente.");
    setTimeout(() => setSuccessMessage(""), 5000);
  };

  const handleDelete = (id) => {
    if (
      !window.confirm("¿Estás seguro de que deseas eliminar este material?")
    ) {
      return;
    }
    const updatedMaterials = materials.filter(
      (material) => material.material_id !== id
    );
    setMaterials(updatedMaterials);
    setSuccessMessage("Material eliminado correctamente.");
    setTimeout(() => setSuccessMessage(""), 5000);
  };

  // Búsqueda y Filtro
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
    setCurrentPage(1);
  };

  const filteredMaterials = materials.filter((material) => {
    const name = material.name.toLowerCase();
    const type = material.type.toLowerCase();
    const search = searchTerm.toLowerCase();
    const matchesSearch = name.includes(search) || type.includes(search);
    const matchesFilter = filterStatus
      ? material.status === parseInt(filterStatus)
      : true;
    return matchesSearch && matchesFilter;
  });

  // Lógica de paginación
  const indexOfLastMaterial = currentPage * materialsPerPage;
  const indexOfFirstMaterial = indexOfLastMaterial - materialsPerPage;
  const currentMaterials = filteredMaterials.slice(
    indexOfFirstMaterial,
    indexOfLastMaterial
  );
  const totalPages = Math.ceil(filteredMaterials.length / materialsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div
      className={`p-6 bg-[#151515]/40 backdrop-filter backdrop-blur-sm w-full h-full text-white border ${
        isModalOpen ? "border-gray-700" : "border-[#757575]"
      } rounded-lg shadow-lg transform transition duration-500 hover:shadow-gray-lg hover:bg-black hover:bg-opacity-30 hover:backdrop-filter hover:backdrop-blur-3xl`}
    >
      {successMessage && <AlertGreen message={successMessage} />}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-[#F0F0F0]">Materiales</h3>
        <div className="flex space-x-4">
          <InputField
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="px-4 py-2 bg-transparent border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
          />
          <SelectField
            name="filterStatus"
            id="filterStatus"
            options={[
              { value: "", label: "Filtrar por Estado" },
              { value: "0", label: "Disponible" },
              { value: "1", label: "Bajo Stock" },
              { value: "2", label: "Agotado" },
              // Añade más opciones según sea necesario
            ]}
            value={filterStatus}
            onChange={handleFilterChange}
          />
        </div>
      </div>
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
      <div className="overflow-x-auto">
        <table className="w-full bg-[#151515]/60 backdrop-filter backdrop-blur-sm rounded-lg">
          <thead>
            <tr>
              <th className="py-3 px-5 bg-[#303030] rounded-tl-lg">Nombre</th>
              <th className="py-3 px-5 bg-[#303030]">Tipo</th>
              <th className="py-3 px-5 bg-[#303030]">Cantidad</th>
              <th className="py-3 px-5 bg-[#303030]">Unidad</th>
              <th className="py-3 px-5 bg-[#303030]">Ubicación</th>
              <th className="py-3 px-5 bg-[#303030]">Estado</th>
              <th className="py-3 px-5 bg-[#303030] rounded-tr-lg">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentMaterials.map((material) => (
              <tr
                key={material.material_id}
                className="border-t border-[#303030] bg-[#151515] text-center rounded-b-lg"
              >
                <td className="py-3 px-5">{material.name}</td>
                <td className="py-3 px-5">{material.type}</td>
                <td className="py-3 px-5">{material.quantity}</td>
                <td className="py-3 px-5">{material.unit}</td>
                <td className="py-3 px-5">{material.location}</td>
                <td className="py-3 px-5">
                  {materialStatusMap[material.status]}
                </td>
                <td className="py-3 px-5 flex justify-center space-x-4">
                  <button
                    onClick={() => handleEditClick(material)}
                    className="w-32 h-12 bg-[#091422] text-[#3375C8] hover:bg-[#3375C8] hover:text-[#091422] hover:shadow-blue-lg transform transition duration-500 text-lg border border-[#3375C8] rounded-md flex items-center justify-center"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(material.material_id)}
                    className="w-32 h-12 bg-red-500 bg-opacity-30 hover:bg-red-600 text-red-400 hover:shadow-red-lg transform transition duration-300 text-md border border-red-500 rounded-md flex items-center justify-center"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Controles de Paginación */}
      <div className="flex justify-center mt-4">
        <nav>
          <ul className="inline-flex items-center -space-x-px">
            <li>
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-2 mr-2 leading-tight ${
                  currentPage === 1
                    ? "text-[#606060] border-[#757575] cursor-not-allowed"
                    : "text-white border-[#757575] hover:bg-gray-100 hover:text-gray-900"
                } bg-[#151515] border-[#757575] border rounded-l-lg`}
              >
                Anterior
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index + 1}>
                <button
                  onClick={() => paginate(index + 1)}
                  className={`px-4 py-2 mx-1 leading-tight rounded-md transition duration-300 ${
                    currentPage === index + 1
                      ? "text-white bg-[#285a9e] border border-[#3375C8] hover:bg-[#3375C8]"
                      : "text-[#F0F0F0] bg-transparent border border-[#757575] hover:bg-[#303030] hover:text-white"
                  }`}
                >
                  {index + 1}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-2 ml-2 leading-tight transform transition duration-300 ${
                  currentPage === totalPages
                    ? "text-[#606060] border-[#757575] cursor-not-allowed"
                    : "text-white border-[#757575] hover:bg-gray-100 hover:text-gray-900"
                } bg-[#151515] border-[#757575] border rounded-r-lg`}
              >
                Siguiente
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div
            className={`bg-black/60 py-8 px-6 md:px-8 lg:px-12 rounded-2xl shadow-lg text-white border border-[#757575] transform transition duration-500 hover:shadow-gray-lg hover:bg-black hover:bg-opacity-30 hover:backdrop-filter hover:backdrop-blur-3xl`}
          >
            <h4 className="text-xl font-semibold mb-4 text-[#F0F0F0]">
              Editar Material
            </h4>
            {errorMessage && (
              <p className="text-red-500 mb-4">{errorMessage}</p>
            )}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdate();
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <InputField
                  label="Nombre"
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                />
                <InputField
                  label="Tipo"
                  type="text"
                  name="type"
                  id="type"
                  value={formData.type}
                  onChange={handleChange}
                />
                <InputField
                  label="Cantidad"
                  type="number"
                  name="quantity"
                  id="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                />
                <InputField
                  label="Unidad"
                  type="text"
                  name="unit"
                  id="unit"
                  value={formData.unit}
                  onChange={handleChange}
                />
                <InputField
                  label="Ubicación"
                  type="text"
                  name="location"
                  id="location"
                  value={formData.location}
                  onChange={handleChange}
                />
                <SelectField
                  label="Estado"
                  name="status"
                  id="status"
                  options={[
                    { value: "", label: "Selecciona un estado" },
                    { value: "0", label: "Disponible" },
                    { value: "1", label: "Bajo Stock" },
                    { value: "2", label: "Agotado" },
                    // Añade más opciones según sea necesario
                  ]}
                  value={formData.status}
                  onChange={handleChange}
                />
                {/* Añade más campos si es necesario */}
              </div>
              <div className="flex justify-between gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setErrorMessage("");
                  }}
                  className="w-32 h-12 bg-red-500 bg-opacity-30 hover:bg-red-600 text-red-400 hover:shadow-red-lg transform transition duration-300 text-md border border-red-500 rounded-md flex items-center justify-center"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="w-32 h-12 bg-[#091422] text-[#3375C8] hover:bg-[#3375C8] hover:text-[#091422] hover:shadow-blue-lg transform transition duration-500 text-lg border border-[#3375C8] rounded-md flex items-center justify-center"
                >
                  Actualizar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Materials;
