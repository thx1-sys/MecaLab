import React, { useEffect } from "react";
import MainLogin from "../components/Main/MainStudentHome";
import MainLayout from "../layouts/MainLayoutSutudent";
import ContainerBG from "../components/Container/ContainerBG";

function StudentHome() {
  return (
    <div
      className="h-screen overflow-y-auto overflow-x-hidden custom-scrollbar-home"
      style={{ WebkitOverflowScrolling: "touch" }}
    >
      <MainLayout>
        <ContainerBG />
        <div className="relative">
          <MainLogin />
        </div>
      </MainLayout>
    </div>
  );
}

export default StudentHome;
