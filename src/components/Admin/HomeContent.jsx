import React, { useState, useEffect } from "react";
import Typing from "react-typing-effect";
import { motion } from "framer-motion";
import HeaderAdmin from "../Header/HeaderAdmin";
import SummaryCard from "../Card/SummaryCard";
import RequestsCard from "../Card/RequestsCard";
import ActivityCard from "../Card/ActivityCard";

const containerVariants = {
  hidden: {
    opacity: 0,
    transition: {
      staggerChildren: 0.2,
    },
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      when: "beforeChildren",
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5 },
  },
};

const HomeContent = ({ setActiveContent }) => {
  const [showContent, setShowContent] = useState(false);
  const [showWelcome, setShowWelcome] = useState(
    !sessionStorage.getItem("welcomeShown")
  );

  useEffect(() => {
    if (showWelcome) {
      const timeout = setTimeout(() => {
        setShowContent(true);
        sessionStorage.setItem("welcomeShown", "true");
      }, 5000); // Adjusted to wait for typing effect
      return () => clearTimeout(timeout);
    } else {
      setShowContent(true);
    }
  }, [showWelcome]);

  return (
    <motion.div
      className="h-full flex flex-col"
      initial="hidden"
      animate="visible"
    >
      {showWelcome && !showContent && (
        <motion.div
          className="h-full w-full text-center text-4xl font-bold my-4 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Typing
            text={["Bienvenido, Paolo Vitali (Admin)"]}
            speed={50}
            eraseDelay={1000000}
          />
          <p className="font-emoji">👋</p>
        </motion.div>
      )}
      {showContent && (
        <>
          <motion.div variants={childVariants}>
            <HeaderAdmin setActiveContent={setActiveContent} />
          </motion.div>
          <div className="flex-grow p-4 w-full h-full">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-full"
              variants={containerVariants}
            >
              <motion.div variants={childVariants}>
                <SummaryCard setActiveContent={setActiveContent} />
              </motion.div>
              <motion.div variants={childVariants}>
                <RequestsCard />
              </motion.div>
              <motion.div variants={childVariants}>
                <ActivityCard />
              </motion.div>
            </motion.div>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default HomeContent;
