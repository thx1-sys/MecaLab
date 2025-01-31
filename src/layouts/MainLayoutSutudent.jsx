import React from "react";
import HeaderLogin from "../components/Header/HeaderStudentHome";
import FooterStudent from "../components/Footer/FooterStudent";

function MainLayoutSutudent({ children }) {
  return (
    <div className="w-screen">
      <div className="min-h-screen w-screen flex flex-col">
        <HeaderLogin />
        <main className="flex items-center justify-center">{children}</main>
        <FooterStudent />
      </div>
    </div>
  );
}

export default MainLayoutSutudent;
