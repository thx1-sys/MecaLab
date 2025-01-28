import React, { useEffect } from "react";
import MainLogin from "../components/Main/MainStudentHome";
import MainLayout from "../layouts/MainLayoutSutudentInstructor";
import ContainerBG from "../components/Container/ContainerBGRED";

function InstructorPage() {
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

export default InstructorPage;
