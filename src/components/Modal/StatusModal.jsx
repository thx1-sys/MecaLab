import React from "react";
import { Modal, Select, Button } from "antd";

const { Option } = Select;

const StatusModal = ({
  visible,
  onCancel,
  onUpdate,
  currentRequest,
  setCurrentRequest,
}) => {
  return (
    <Modal
      title="Actualizar Estado de Solicitud"
      visible={visible}
      onCancel={onCancel}
      centered
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancelar
        </Button>,
        <Button key="update" type="primary" onClick={onUpdate}>
          Actualizar
        </Button>,
      ]}
    >
      <div>
        <label className="block text-gray-700">Estado:</label>
        <Select
          value={currentRequest.request_status}
          onChange={(value) =>
            setCurrentRequest({ ...currentRequest, request_status: value })
          }
          className="w-full"
        >
          <Option value={0}>En proceso</Option>
          <Option value={1}>Aprobado</Option>
          <Option value={2}>Denegado</Option>
          <Option value={3}>Retraso</Option>
        </Select>
      </div>
    </Modal>
  );
};

export default StatusModal;
