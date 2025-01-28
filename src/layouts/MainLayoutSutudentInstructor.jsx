import React from "react";
import HeaderInstructorHome from "../components/Header/HeaderInstructorHome";
import FooterStudent from "../components/Footer/FooterStudent";

function MainLayoutSutudentInstructor({ children }) {
  return (
    <div className="w-screen">
      <div className="min-h-screen w-screen flex flex-col">
        <HeaderInstructorHome />
        <main className="flex items-center justify-center">{children}</main>
        <FooterStudent />
      </div>
    </div>
  );
}

export default MainLayoutSutudentInstructor;
