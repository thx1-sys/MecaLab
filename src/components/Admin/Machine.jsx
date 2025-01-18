// src/components/Admin/Machine.jsx
import React, { useState } from "react";
import SelectField from "../Input/SelectField";
import InputField from "../Input/InputField";
import AlertGreen from "../Alert/AlertGreen";

const machineStatusMap = {
  0: "Available",
  1: "In Use",
  2: "Under Maintenance",
  // Add more statuses as needed
};

const mockMachines = [
  {
    machine_id: 1,
    name: "Laser Cutter",
    type: "Cutting",
    manufacturer: "XYZ Corp",
    year: 2018,
    location: "Workshop A",
    status: 0,
  },
  {
    machine_id: 2,
    name: "3D Printer",
    type: "Printing",
    manufacturer: "ABC Inc",
    year: 2020,
    location: "Workshop B",
    status: 1,
  },
  // Add more machines as necessary
];

const Machine = () => {
  const [machines, setMachines] = useState(mockMachines);
  const [editedMachine, setEditedMachine] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    manufacturer: "",
    year: "",
    location: "",
    status: "",
    // Add more fields as needed
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const machinesPerPage = 7;

  // Search and Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const handleEditClick = (machine) => {
    setEditedMachine(machine);
    setFormData({
      name: machine.name,
      type: machine.type,
      manufacturer: machine.manufacturer,
      year: machine.year,
      location: machine.location,
      status: machine.status,
      // Initialize more fields as needed
    });
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    if (!editedMachine) return;
    const updatedMachines = machines.map((machine) =>
      machine.machine_id === editedMachine.machine_id
        ? { ...machine, ...formData }
        : machine
    );
    setMachines(updatedMachines);
    setIsModalOpen(false);
    setEditedMachine(null);
    setErrorMessage("");
    setSuccessMessage("Machine updated successfully.");
    setTimeout(() => setSuccessMessage(""), 5000);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this machine?")) {
      return;
    }
    const updatedMachines = machines.filter(
      (machine) => machine.machine_id !== id
    );
    setMachines(updatedMachines);
    setSuccessMessage("Machine deleted successfully.");
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

  const filteredMachines = machines.filter((machine) => {
    const name = machine.name.toLowerCase();
    const type = machine.type.toLowerCase();
    const search = searchTerm.toLowerCase();
    const matchesSearch = name.includes(search) || type.includes(search);
    const matchesFilter = filterStatus
      ? machine.status === parseInt(filterStatus)
      : true;
    return matchesSearch && matchesFilter;
  });

  // Pagination logic
  const indexOfLastMachine = currentPage * machinesPerPage;
  const indexOfFirstMachine = indexOfLastMachine - machinesPerPage;
  const currentMachines = filteredMachines.slice(
    indexOfFirstMachine,
    indexOfLastMachine
  );
  const totalPages = Math.ceil(filteredMachines.length / machinesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div
      className={`p-6 bg-[#151515]/40 backdrop-filter backdrop-blur-sm w-full h-full text-white border ${
        isModalOpen ? "border-gray-700" : "border-[#757575]"
      } rounded-lg shadow-lg transform transition duration-500 hover:shadow-gray-lg hover:bg-black hover:bg-opacity-30 hover:backdrop-filter hover:backdrop-blur-3xl`}
    >
      {successMessage && <AlertGreen message={successMessage} />}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-[#F0F0F0]">Machines</h3>
        <div className="flex space-x-4">
          <InputField
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="px-4 py-2 bg-transparent border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
          />
          <SelectField
            name="filterStatus"
            id="filterStatus"
            options={[
              { value: "", label: "Filter by Status" },
              { value: "0", label: "Available" },
              { value: "1", label: "In Use" },
              { value: "2", label: "Under Maintenance" },
              // Add more options as needed
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
              <th className="py-3 px-5 bg-[#303030] rounded-tl-lg">Name</th>
              <th className="py-3 px-5 bg-[#303030]">Type</th>
              <th className="py-3 px-5 bg-[#303030]">Manufacturer</th>
              <th className="py-3 px-5 bg-[#303030]">Year</th>
              <th className="py-3 px-5 bg-[#303030]">Location</th>
              <th className="py-3 px-5 bg-[#303030]">Status</th>
              <th className="py-3 px-5 bg-[#303030] rounded-tr-lg">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentMachines.map((machine) => (
              <tr
                key={machine.machine_id}
                className="border-t border-[#303030] bg-[#151515] text-center rounded-b-lg"
              >
                <td className="py-3 px-5">{machine.name}</td>
                <td className="py-3 px-5">{machine.type}</td>
                <td className="py-3 px-5">{machine.manufacturer}</td>
                <td className="py-3 px-5">{machine.year}</td>
                <td className="py-3 px-5">{machine.location}</td>
                <td className="py-3 px-5">
                  {machineStatusMap[machine.status]}
                </td>
                <td className="py-3 px-5 flex justify-center space-x-4">
                  <button
                    onClick={() => handleEditClick(machine)}
                    className="w-32 h-12 bg-[#091422] text-[#3375C8] hover:bg-[#3375C8] hover:text-[#091422] hover:shadow-blue-lg transform transition duration-500 text-lg border border-[#3375C8] rounded-md flex items-center justify-center"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(machine.machine_id)}
                    className="w-32 h-12 bg-red-500 bg-opacity-30 hover:bg-red-600 text-red-400 hover:shadow-red-lg transform transition duration-300 text-md border border-red-500 rounded-md flex items-center justify-center"
                  >
                    Delete
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
                Previous
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
                Next
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
              Edit Machine
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
                  label="Name"
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                />
                <InputField
                  label="Type"
                  type="text"
                  name="type"
                  id="type"
                  value={formData.type}
                  onChange={handleChange}
                />
                <InputField
                  label="Manufacturer"
                  type="text"
                  name="manufacturer"
                  id="manufacturer"
                  value={formData.manufacturer}
                  onChange={handleChange}
                />
                <InputField
                  label="Year"
                  type="number"
                  name="year"
                  id="year"
                  value={formData.year}
                  onChange={handleChange}
                />
                <InputField
                  label="Location"
                  type="text"
                  name="location"
                  id="location"
                  value={formData.location}
                  onChange={handleChange}
                />
                <SelectField
                  label="Status"
                  name="status"
                  id="status"
                  options={[
                    { value: "", label: "Select a status" },
                    { value: "0", label: "Available" },
                    { value: "1", label: "In Use" },
                    { value: "2", label: "Under Maintenance" },
                    // Add more options as needed
                  ]}
                  value={formData.status}
                  onChange={handleChange}
                />
                {/* Add more fields if necessary */}
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
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-32 h-12 bg-[#091422] text-[#3375C8] hover:bg-[#3375C8] hover:text-[#091422] hover:shadow-blue-lg transform transition duration-500 text-lg border border-[#3375C8] rounded-md flex items-center justify-center"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Machine;
