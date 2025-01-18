import React from "react";
import HomeContent from "../Admin/HomeContent";
import RequestsContent from "../Admin/RequestsContent";

const ContentRenderer = ({ activeContent }) => {
  switch (activeContent) {
    case "home":
      return <HomeContent />;
    case "requests":
      return <RequestsContent />;
    case "report":
      return <div>Report Content</div>;
    case "machines":
      return <div>Machines Content</div>;
    case "materials":
      return <div>Materials Content</div>;
    case "users":
      return <div>Users Content</div>;
    case "settings":
      return <div>Settings Content</div>;
    default:
      return <HomeContent />;
  }
};

export default ContentRenderer;
