// src/components/Admin/Users.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import SelectField from "../Input/SelectField";
import InputField from "../Input/InputField";
import AlertGreen from "../Alert/AlertGreen";

const userTypeMap = {
  1: "Estudiante",
  2: "Docente",
  3: "Admin",
};

const Users = () => {
  const [users, setUsers] = useState([]);
  const [editedUser, setEditedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    userType: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 7;

  // Search and Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_HOST_EXPRESS}/api/users`
      );
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      setErrorMessage("Error al obtener usuarios.");
    }
  };

  const handleEditClick = (user) => {
    setEditedUser(user);
    setFormData({
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      userType: user.user_type,
    });
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_HOST_EXPRESS}/api/users/${editedUser.id}`,
        formData
      );
      fetchUsers();
      setIsModalOpen(false);
      setEditedUser(null);
      setErrorMessage("");
      setSuccessMessage("Usuario actualizado correctamente."); // Establecer mensaje de éxito
      setTimeout(() => setSuccessMessage(""), 5000); // Limpiar el mensaje después de 5 segundos
    } catch (error) {
      console.error("Error updating user:", error);
      setErrorMessage("No se pudo actualizar el usuario. Inténtalo de nuevo.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
      return;
    }
    try {
      await axios.delete(
        `${import.meta.env.VITE_HOST_EXPRESS}/api/users/${id}`
      );
      fetchUsers();
      setSuccessMessage("Usuario eliminado correctamente."); // Establecer mensaje de éxito
      setTimeout(() => setSuccessMessage(""), 5000); // Limpiar el mensaje después de 5 segundos
    } catch (error) {
      console.error("Error deleting user:", error);
      setErrorMessage("No se pudo eliminar el usuario. Inténtalo de nuevo.");
    }
  };

  // Handle Search and Filter
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleFilterChange = (e) => {
    setFilterType(e.target.value);
    setCurrentPage(1);
  };

  const filteredUsers = users.filter((user) => {
    const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
    const email = user.email.toLowerCase();
    const search = searchTerm.toLowerCase();
    const matchesSearch = fullName.includes(search) || email.includes(search);
    const matchesFilter = filterType
      ? user.user_type === parseInt(filterType)
      : true;
    return matchesSearch && matchesFilter;
  });

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div
      className={`p-6 bg-[#151515]/40 backdrop-filter backdrop-blur-sm w-full h-full text-white border ${
        isModalOpen ? "border-gray-700" : "border-[#757575]"
      } rounded-lg shadow-lg transform transition duration-500 hover:shadow-gray-lg hover:bg-black hover:bg-opacity-30 hover:backdrop-filter hover:backdrop-blur-3xl`}
    >
      {successMessage && <AlertGreen message={successMessage} />}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-[#F0F0F0]">Usuarios</h3>
        <div className="flex space-x-4">
          <InputField
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="px-4 py-2 bg-transparent border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
          />
          <SelectField
            name="filterType"
            id="filterType"
            options={[
              { value: "", label: "Filtrar por Tipo" },
              { value: "1", label: "Estudiante" },
              { value: "2", label: "Docente" },
              { value: "3", label: "Admin" },
            ]}
            value={filterType}
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
              <th className="py-3 px-5 bg-[#303030]">Apellido</th>
              <th className="py-3 px-5 bg-[#303030]">Email</th>
              <th className="py-3 px-5 bg-[#303030]">Tipo de Usuario</th>
              <th className="py-3 px-5 bg-[#303030] rounded-tr-lg">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr
                key={user.id}
                className="border-t border-[#303030] bg-[#151515] text-center rounded-b-lg"
              >
                <td className="py-3 px-5">{user.first_name}</td>
                <td className="py-3 px-5">{user.last_name}</td>
                <td className="py-3 px-5">{user.email}</td>
                <td className="py-3 px-5">{userTypeMap[user.user_type]}</td>
                <td className="py-3 px-5 flex justify-center space-x-4">
                  <button
                    onClick={() => handleEditClick(user)}
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
                      className="icon icon-tabler icons-tabler-outline icon-tabler-edit mr-2"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
                      <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
                      <path d="M16 5l3 3" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
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
                      className="icon icon-tabler icons-tabler-outline icon-tabler-trash mr-2"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M4 7l16 0" />
                      <path d="M10 11l0 6" />
                      <path d="M14 11l0 6" />
                      <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                      <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                    </svg>
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
                className={`px-3 py-2 mr-2 leading-tight  ${
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
                  currentPage === 1
                    ? "text-white border-[#757575]  hover:bg-gray-100 hover:text-gray-900"
                    : "text-[#606060] border-[#757575] cursor-not-allowed"
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
            className={`bg-black/60 py-8 px-6 md:px-8 lg:px-12 rounded-2xl shadow-lg text-white border ${
              editedUser ? "border-[#757575] " : "border-[#757575]"
            } transform transition duration-500 hover:shadow-gray-lg hover:bg-black hover:bg-opacity-30 hover:backdrop-filter hover:backdrop-blur-3xl`}
          >
            <h4 className="text-xl font-semibold mb-4 text-[#F0F0F0]">
              Editar Usuario
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
              <div className="mb-4">
                <InputField
                  label="Nombre"
                  type="text"
                  name="firstName"
                  id="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <InputField
                  label="Apellido"
                  type="text"
                  name="lastName"
                  id="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <InputField
                  label="Email"
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <SelectField
                  label="Tipo de Usuario"
                  name="userType"
                  id="userType"
                  options={[
                    { value: "", label: "Selecciona un tipo" },
                    { value: "1", label: "Estudiante" },
                    { value: "2", label: "Docente" },
                    { value: "3", label: "Admin" },
                  ]}
                  value={formData.userType}
                  onChange={handleChange}
                />
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

export default Users;
