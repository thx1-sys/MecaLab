// src/components/Admin/Solicitudes.jsx
import React, { useState } from "react";
import SelectField from "../Input/SelectField";
import InputField from "../Input/InputField";
import AlertGreen from "../Alert/AlertGreen";

const solicitudStatusMap = {
  0: "Pendiente",
  1: "Completada",
  2: "En Progreso",
  // Añade más estados según sea necesario
};

const mockSolicitudes = [
  {
    request_id: 1,
    full_name: "Juan Pérez",
    institutional_email: "juan.perez@institucion.edu",
    phone_number: "1234567890",
    career: "Ingeniería",
    semester: 5,
    request_reason: "Proyecto de fin de carrera",
    loan_type: "Material",
    request_status: 0,
  },
  {
    request_id: 2,
    full_name: "María López",
    institutional_email: "maria.lopez@institucion.edu",
    phone_number: "0987654321",
    career: "Arquitectura",
    semester: 3,
    request_reason: "Diseño de maquetas",
    loan_type: "Máquina",
    request_status: 1,
  },
  // Añade más solicitudes según sea necesario
];

const Solicitudes = () => {
  const [solicitudes, setSolicitudes] = useState(mockSolicitudes);
  const [editedSolicitud, setEditedSolicitud] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    institutional_email: "",
    phone_number: "",
    career: "",
    semester: "",
    request_reason: "",
    loan_type: "",
    request_status: "",
    // Añade más campos según sea necesario
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const solicitudesPerPage = 7;

  // Search and Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const handleEditClick = (solicitud) => {
    setEditedSolicitud(solicitud);
    setFormData({
      full_name: solicitud.full_name,
      institutional_email: solicitud.institutional_email,
      phone_number: solicitud.phone_number,
      career: solicitud.career,
      semester: solicitud.semester,
      request_reason: solicitud.request_reason,
      loan_type: solicitud.loan_type,
      request_status: solicitud.request_status,
      // Inicializa más campos según sea necesario
    });
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    if (!editedSolicitud) return;
    const updatedSolicitudes = solicitudes.map((solicitud) =>
      solicitud.request_id === editedSolicitud.request_id
        ? { ...solicitud, ...formData }
        : solicitud
    );
    setSolicitudes(updatedSolicitudes);
    setIsModalOpen(false);
    setEditedSolicitud(null);
    setErrorMessage("");
    setSuccessMessage("Solicitud actualizada correctamente.");
    setTimeout(() => setSuccessMessage(""), 5000);
  };

  const handleDelete = (id) => {
    if (
      !window.confirm("¿Estás seguro de que deseas eliminar esta solicitud?")
    ) {
      return;
    }
    const updatedSolicitudes = solicitudes.filter(
      (solicitud) => solicitud.request_id !== id
    );
    setSolicitudes(updatedSolicitudes);
    setSuccessMessage("Solicitud eliminada correctamente.");
    setTimeout(() => setSuccessMessage(""), 5000);
  };

  // Handle Search and Filter
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
    setCurrentPage(1);
  };

  const filteredSolicitudes = solicitudes.filter((solicitud) => {
    const fullName = solicitud.full_name.toLowerCase();
    const email = solicitud.institutional_email.toLowerCase();
    const search = searchTerm.toLowerCase();
    const matchesSearch = fullName.includes(search) || email.includes(search);
    const matchesFilter = filterStatus
      ? solicitud.request_status === parseInt(filterStatus)
      : true;
    return matchesSearch && matchesFilter;
  });

  // Pagination logic
  const indexOfLastSolicitud = currentPage * solicitudesPerPage;
  const indexOfFirstSolicitud = indexOfLastSolicitud - solicitudesPerPage;
  const currentSolicitudes = filteredSolicitudes.slice(
    indexOfFirstSolicitud,
    indexOfLastSolicitud
  );
  const totalPages = Math.ceil(filteredSolicitudes.length / solicitudesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div
      className={`p-6 bg-[#151515]/40 backdrop-filter backdrop-blur-sm w-full h-full text-white border ${
        isModalOpen ? "border-gray-700" : "border-[#757575]"
      } rounded-lg shadow-lg transform transition duration-500 hover:shadow-gray-lg hover:bg-black hover:bg-opacity-30 hover:backdrop-filter hover:backdrop-blur-3xl`}
    >
      {successMessage && <AlertGreen message={successMessage} />}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-[#F0F0F0]">Solicitudes</h3>
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
              { value: "0", label: "Pendiente" },
              { value: "1", label: "Completada" },
              { value: "2", label: "En Progreso" },
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
              <th className="py-3 px-5 bg-[#303030]">Email</th>
              <th className="py-3 px-5 bg-[#303030]">Teléfono</th>
              <th className="py-3 px-5 bg-[#303030]">Carrera</th>
              <th className="py-3 px-5 bg-[#303030]">Semestre</th>
              <th className="py-3 px-5 bg-[#303030]">Razón</th>
              <th className="py-3 px-5 bg-[#303030]">Tipo de Préstamo</th>
              <th className="py-3 px-5 bg-[#303030]">Estado</th>
              <th className="py-3 px-5 bg-[#303030] rounded-tr-lg">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentSolicitudes.map((solicitud) => (
              <tr
                key={solicitud.request_id}
                className="border-t border-[#303030] bg-[#151515] text-center rounded-b-lg"
              >
                <td className="py-3 px-5">{solicitud.full_name}</td>
                <td className="py-3 px-5">{solicitud.institutional_email}</td>
                <td className="py-3 px-5">{solicitud.phone_number}</td>
                <td className="py-3 px-5">{solicitud.career}</td>
                <td className="py-3 px-5">{solicitud.semester}</td>
                <td className="py-3 px-5">{solicitud.request_reason}</td>
                <td className="py-3 px-5">{solicitud.loan_type}</td>
                <td className="py-3 px-5">
                  {solicitudStatusMap[solicitud.request_status]}
                </td>
                <td className="py-3 px-5 flex justify-center space-x-4">
                  <button
                    onClick={() => handleEditClick(solicitud)}
                    className="w-32 h-12 bg-[#091422] text-[#3375C8] hover:bg-[#3375C8] hover:text-[#091422] hover:shadow-blue-lg transform transition duration-500 text-lg border border-[#3375C8] rounded-md flex items-center justify-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="icon icon-tabler icon-tabler-edit mr-2"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
                      <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
                      <path d="M16 5l3 3" />
                    </svg>
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(solicitud.request_id)}
                    className="w-32 h-12 bg-red-500 bg-opacity-30 hover:bg-red-600 text-red-400 hover:shadow-red-lg transform transition duration-300 text-md border border-red-500 rounded-md flex items-center justify-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="icon icon-tabler icon-tabler-trash mr-2"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M4 7l16 0" />
                      <path d="M10 11l0 6" />
                      <path d="M14 11l0 6" />
                      <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                      <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                    </svg>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
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
              Editar Solicitud
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
                  name="full_name"
                  id="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                />
                <InputField
                  label="Email Institucional"
                  type="email"
                  name="institutional_email"
                  id="institutional_email"
                  value={formData.institutional_email}
                  onChange={handleChange}
                />
                <InputField
                  label="Teléfono"
                  type="text"
                  name="phone_number"
                  id="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                />
                <InputField
                  label="Carrera"
                  type="text"
                  name="career"
                  id="career"
                  value={formData.career}
                  onChange={handleChange}
                />
                <InputField
                  label="Semestre"
                  type="number"
                  name="semester"
                  id="semester"
                  value={formData.semester}
                  onChange={handleChange}
                />
                <InputField
                  label="Razón de la Solicitud"
                  type="text"
                  name="request_reason"
                  id="request_reason"
                  value={formData.request_reason}
                  onChange={handleChange}
                />
                <SelectField
                  label="Tipo de Préstamo"
                  name="loan_type"
                  id="loan_type"
                  options={[
                    { value: "", label: "Selecciona un tipo" },
                    { value: "Material", label: "Material" },
                    { value: "Máquina", label: "Máquina" },
                    // Añade más opciones según sea necesario
                  ]}
                  value={formData.loan_type}
                  onChange={handleChange}
                />
                <SelectField
                  label="Estado"
                  name="request_status"
                  id="request_status"
                  options={[
                    { value: "", label: "Selecciona un estado" },
                    { value: "0", label: "Pendiente" },
                    { value: "1", label: "Completada" },
                    { value: "2", label: "En Progreso" },
                    // Añade más opciones según sea necesario
                  ]}
                  value={formData.request_status}
                  onChange={handleChange}
                />
              </div>
              {/* Añade más campos según sea necesario */}
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

export default Solicitudes;
