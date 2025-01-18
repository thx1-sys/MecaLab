import React, { useState } from "react";
import ContainerBG from "../components/Container/ContainerBG";
import LoginForm from "../components/Form/LoginForm";
import ForgotPassword from "../components/Container/ForgotPassword";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showNewComponent, setShowNewComponent] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleShowNewComponent = () => {
    setShowNewComponent(true);
  };

  const handleBackClick = () => {
    setShowNewComponent(false);
  };

  return (
    <div className="w-screen h-screen flex relative">
      <ContainerBG />
      {showNewComponent ? (
        <ForgotPassword onBack={handleBackClick} />
      ) : (
        <LoginForm
          email={email}
          password={password}
          handleEmailChange={handleEmailChange}
          handlePasswordChange={handlePasswordChange}
          handleShowNewComponent={handleShowNewComponent}
        />
      )}
    </div>
  );
}

export default Login;
