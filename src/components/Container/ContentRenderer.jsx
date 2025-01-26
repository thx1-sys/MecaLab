import React from "react";
import HomeContent from "../Admin/HomeContent";
import RequestsContent from "../Admin/RequestsContent";
import MaterialsContent from "../Admin/MaterialsContent";
import UsersContent from "../Admin/UsersContent";
import SettingsContent from "../Admin/SettingsContent";
import MachineContent from "../Admin/MachineContent";

const ContentRenderer = ({ activeContent, setActiveContent }) => {
  switch (activeContent) {
    case "home":
      return <HomeContent setActiveContent={setActiveContent} />;
    case "requests":
      return <RequestsContent />;
    case "report":
      return <div>Report Content</div>;
    case "machines":
      return <MachineContent />;
    case "materials":
      return <MaterialsContent />;
    case "users":
      return <UsersContent />;
    case "settings":
      return <SettingsContent />;
    default:
      return <HomeContent />;
  }
};

export default ContentRenderer;
