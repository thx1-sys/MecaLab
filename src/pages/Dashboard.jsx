import React, { useState } from "react";
import { motion } from "framer-motion";
import ContentRenderer from "../components/Container/ContentRenderer";
import Header from "../components/Header/HeaderDashboard";
import Sidebar from "../components/Menu/SidebarDashboard";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeContent, setActiveContent] = useState("home");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-[#C4C4C4]/25">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setActiveContent={setActiveContent}
        activeContent={activeContent}
      />
      <div className="flex-1 h-full flex flex-col">
        <header className="animate-slideDownFadeIn">
          <Header
            toggleSidebar={toggleSidebar}
            isSidebarOpen={isSidebarOpen}
            setActiveContent={setActiveContent}
            activeContent={activeContent}
          />
        </header>
        <div className="content flex-grow">
          <ContentRenderer activeContent={activeContent} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
