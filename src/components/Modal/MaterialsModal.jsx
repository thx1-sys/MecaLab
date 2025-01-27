import React from "react";
import { Modal, Button } from "antd";

function MaterialsModal({ onClose, show, materials }) {
  return (
    <Modal
      title="Materiales Solicitados"
      visible={show}
      onCancel={onClose}
      centered
      footer={[]}
    >
      <ul className="space-y-2">
        {materials.map((material, index) => (
          <li
            key={index}
            className="flex justify-between items-center p-2 bg-gray-100 rounded-md"
          >
            <span>{material.material_name}</span>
            <span className="font-semibold">Cantidad: {material.quantity}</span>
          </li>
        ))}
      </ul>
    </Modal>
  );
}

export default MaterialsModal;
