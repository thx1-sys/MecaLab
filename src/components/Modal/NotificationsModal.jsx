import React from "react";
import { Modal } from "antd";

const NotificationsModal = ({
  isModalVisible,
  setIsModalVisible,
  latestRequests,
}) => {
  return (
    <Modal
      title="Solicitudes Recientes"
      visible={isModalVisible}
      onCancel={() => setIsModalVisible(false)}
      footer={null}
      centered
    >
      <ul className="space-y-2">
        {latestRequests.map((request) => (
          <li key={request.request_id} className="p-2 border-b border-gray-200">
            <div className="text-sm text-gray-700">
              {request.full_name} - {request.loan_type}
            </div>
            <div className="text-xs text-gray-500">
              {new Date(request.request_date).toLocaleString()}
            </div>
          </li>
        ))}
      </ul>
    </Modal>
  );
};

export default NotificationsModal;
