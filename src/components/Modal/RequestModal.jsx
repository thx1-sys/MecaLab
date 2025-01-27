import React from "react";
import { Modal } from "antd";

const RequestModal = ({ visible, onCancel, currentRequest, formatDate }) => {
  return (
    <Modal
      title="Ver Solicitud"
      visible={visible}
      onCancel={onCancel}
      footer={null}
    >
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700">Nombre Completo:</label>
          <input
            type="text"
            value={currentRequest.full_name}
            readOnly
            className="w-full p-2 mb-4 border rounded-lg"
          />
        </div>
        <div>
          <label className="block text-gray-700">Correo Institucional1:</label>
          <input
            type="email"
            value={currentRequest.institutional_email}
            readOnly
            className="w-full p-2 mb-4 border rounded-lg"
          />
        </div>
        <div>
          <label className="block text-gray-700">Teléfono:</label>
          <input
            type="text"
            value={currentRequest.phone_number}
            readOnly
            className="w-full p-2 mb-4 border rounded-lg"
          />
        </div>
        <div>
          <label className="block text-gray-700">Carrera:</label>
          <input
            type="text"
            value={currentRequest.career}
            readOnly
            className="w-full p-2 mb-4 border rounded-lg"
          />
        </div>
        <div>
          <label className="block text-gray-700">Semestre:</label>
          <input
            type="text"
            value={currentRequest.semester}
            readOnly
            className="w-full p-2 mb-4 border rounded-lg"
          />
        </div>
        <div>
          <label className="block text-gray-700">Número de Control:</label>
          <input
            type="text"
            value={currentRequest.student_id}
            readOnly
            className="w-full p-2 mb-4 border rounded-lg"
          />
        </div>
        <div>
          <label className="block text-gray-700">Fecha de Solicitud:</label>
          <input
            type="text"
            value={formatDate(currentRequest.request_date)}
            readOnly
            className="w-full p-2 mb-4 border rounded-lg"
          />
        </div>
        <div>
          <label className="block text-gray-700">Fecha de Devolución:</label>
          <input
            type="text"
            value={formatDate(currentRequest.expected_return_date)}
            readOnly
            className="w-full p-2 mb-4 border rounded-lg"
          />
        </div>
        {currentRequest.loan_type === "Material" && (
          <div className="col-span-2">
            <label className="block text-gray-700">Materiales:</label>
            <ul className="list-disc pl-5">
              {currentRequest.materials.map((material) => (
                <li key={material.material_id}>
                  {material.material_name} - Cantidad: {material.quantity}
                </li>
              ))}
            </ul>
          </div>
        )}
        {currentRequest.loan_type === "Máquina" && (
          <div className="col-span-2">
            <label className="block text-gray-700">Máquina:</label>
            <input
              type="text"
              value={currentRequest.selected_material}
              readOnly
              className="w-full p-2 mb-4 border rounded-lg"
            />
          </div>
        )}
        <div className="col-span-2">
          <label className="block text-gray-700">Razón de la Solicitud:</label>
          <input
            type="text"
            value={currentRequest.request_reason}
            readOnly
            className="w-full p-2 mb-4 border rounded-lg"
          />
        </div>
        <div className="col-span-2">
          <label className="block text-gray-700">Asignatura:</label>
          <input
            type="text"
            value={currentRequest.subject}
            readOnly
            className="w-full p-2 mb-4 border rounded-lg"
          />
        </div>
        <div className="col-span-2">
          <label className="block text-gray-700">Profesor:</label>
          <input
            type="text"
            value={currentRequest.teacher}
            readOnly
            className="w-full p-2 mb-4 border rounded-lg"
          />
        </div>
        <div className="col-span-2">
          <label className="block text-gray-700">Grupo:</label>
          <input
            type="text"
            value={currentRequest.group}
            readOnly
            className="w-full p-2 mb-4 border rounded-lg"
          />
        </div>
        <div className="col-span-2">
          <label className="block text-gray-700">Tipo de Préstamo:</label>
          <input
            type="text"
            value={currentRequest.loan_type}
            readOnly
            className="w-full p-2 mb-4 border rounded-lg"
          />
        </div>
      </div>
    </Modal>
  );
};

export default RequestModal;
