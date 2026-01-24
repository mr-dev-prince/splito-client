import React from "react";
import { motion } from "framer-motion";
import HeroSection from "./hero-section";
import Stats from "./stats";
import ContactDetails from "./contact-details";
import InfoCard from "./info-card";

const ProfileTab: React.FC = () => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
      className="w-full space-y-8 rounded-xl bg-white p-6 pb-20 shadow-2xl"
    >
      <HeroSection />
      <Stats />
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <ContactDetails />
        <InfoCard />
      </div>
    </motion.div>
  );
};

export default ProfileTab;
