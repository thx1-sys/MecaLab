import React from "react";
import { Table } from "antd";

const RequestsTable = ({
  columns,
  dataSource,
  loading,
  pagination,
  handleTableChange,
}) => {
  const getRowClassName = (record) => {
    if (record.loan_type === "Material") {
      return "bg-red-100"; // Clase para fondo rojo
    } else if (record.loan_type === "Máquina") {
      return "bg-green-100"; // Clase para fondo verde
    }
    return "";
  };

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      loading={loading}
      rowKey="request_id"
      pagination={pagination}
      onChange={handleTableChange}
      rowClassName={getRowClassName}
    />
  );
};

export default RequestsTable;
