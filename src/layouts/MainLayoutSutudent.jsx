import React from "react";
import HeaderLogin from "../components/Header/HeaderStudentHome";
import FooterLogin from "../components/Footer/FooterLogin";

function MainLayoutSutudent({ children }) {
  return (
    <div className="w-screen h-screen bg-[#0B192C] relative">
      <div className="relative z-10">
        <HeaderLogin />
        {children}
        <FooterLogin />
      </div>
    </div>
  );
}

export default MainLayoutSutudent;
