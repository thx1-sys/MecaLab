import React from "react";
import { Modal } from "antd";

const CartModal = ({ visible, onCancel, currentRequest }) => {
  return (
    <Modal
      title="Carrito de Materiales"
      visible={visible}
      onCancel={onCancel}
      footer={null}
    >
      <div className="grid grid-cols-1 gap-4">
        {currentRequest.materials.length > 0 ? (
          <ul className="list-disc pl-5">
            {currentRequest.materials.map((material) => (
              <li key={material.material_id}>
                {material.material_name} - Cantidad: {material.quantity}
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay materiales en el carrito.</p>
        )}
      </div>
    </Modal>
  );
};

export default CartModal;
