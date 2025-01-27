import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import CookieCard from "../components/Card/CookieCard";

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);
  const [isPolicyVisible, setIsPolicyVisible] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  useEffect(() => {
    const consent = Cookies.get("cookieConsent");
    const dontShow = Cookies.get("dontShowAgain");
    if (!consent && !dontShow) {
      setShowConsent(true);
    }
  }, []);

  const handleAccept = () => {
    Cookies.set("cookieConsent", "true", { expires: 30 });
    if (dontShowAgain) {
      Cookies.set("dontShowAgain", "true", { expires: 365 });
    }
    setShowConsent(false);
  };

  const handleReject = () => {
    if (dontShowAgain) {
      Cookies.set("dontShowAgain", "true", { expires: 365 });
    }
    setShowConsent(false);
  };

  const handlePolicyClick = (event) => {
    event.preventDefault();
    setIsPolicyVisible(true);
  };

  const handleCheckboxChange = (e) => {
    setDontShowAgain(e.target.checked);
  };

  const handleClosePolicy = () => {
    setIsPolicyVisible(false);
  };

  if (!showConsent) {
    return null;
  }

  return (
    <div className="fixed inset-0 text-white flex justify-center items-center z-50 animate-fadeIn">
      <div className="w-full h-full bg-black bg-opacity-50 backdrop-filter backdrop-blur-lg text-gray-300 p-4 rounded-lg shadow-lg flex flex-col justify-center items-center">
        <p className="mb-4 text-center md:text-2xl mx-4 md:mx-20">
          Este sitio web utiliza cookies para asegurar que obtengas la mejor
          experiencia posible.
          <a
            href="#"
            onClick={handlePolicyClick}
            className="underline transition duration-500 hover:text-white"
          >
            Lee nuestras políticas de cookies
          </a>
          &nbsp;para más información.
        </p>
        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-row items-center gap-4">
            <button
              onClick={handleReject}
              className="bg-[#3B0F0F] cursor-pointer px-6 py-2 text-[#FF0000] font-inter rounded-xl hover:bg-[#FF0000] hover:text-[#3B0F0F] hover:shadow-red-lg transform transition duration-500 text-md border border-[#FF0000]"
            >
              Cancelar
            </button>
            <button
              onClick={handleAccept}
              className="bg-[#0A170D] cursor-pointer px-6 py-2 text-[#3E9055] font-inter rounded-xl hover:bg-[#3E9055] hover:text-[#0A170D] hover:shadow-green-lg transform transition duration-500 text-md border border-[#3E9055]"
            >
              Aceptar
            </button>
          </div>
          <div className="transition duration-500 opacity-90 hover:opacity-100">
            <label
              htmlFor="dontShowAgain"
              className="flex flex-row items-end gap-2 text-gray-300 font-light text-sm hover:text-white transition duration-500"
            >
              <input
                id="dontShowAgain"
                type="checkbox"
                className="peer hidden"
                checked={dontShowAgain}
                onChange={handleCheckboxChange}
              />
              <div className="h-5 w-5 flex rounded-md border border-[#3e3e3e] hover:border-[#212121] peer-checked:bg-[#3375C8] transition peer-checked:shadow-blue-lg cursor-pointer text-white">
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  className="w-5 h-5 stroke-[#212121] transition duration-500 hover:stroke-white "
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 12.6111L8.92308 17.5L20 6.5"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </div>
              No mostrar más
            </label>
          </div>
        </div>
      </div>
      {isPolicyVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <CookieCard onClose={handleClosePolicy} />
        </div>
      )}
    </div>
  );
};

export default CookieConsent;
