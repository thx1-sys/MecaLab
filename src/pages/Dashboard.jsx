import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ContentRenderer from "../components/Container/ContentRenderer";
import Header from "../components/Header/HeaderDashboard";
import Sidebar from "../components/Menu/SidebarDashboard";
import { notification } from "antd";
import io from "socket.io-client";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeContent, setActiveContent] = useState("home");

  useEffect(() => {
    const socket = io(import.meta.env.VITE_HOST_EXPRESS);

    socket.on("notification", (data) => {
      notification.open({
        message: "Notificación",
        description: data.message,
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

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
        <div className="content flex-grow overflow-y-auto custom-scrollbar-home-dahsboard h-full mb-2">
          <ContentRenderer
            activeContent={activeContent}
            setActiveContent={setActiveContent}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
