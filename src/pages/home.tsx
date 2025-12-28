import React from "react";
import Landing from "@/components/sections/landing-section";
import Stats from "@/components/sections/stat-section";
import SayHello from "@/components/sections/say-hello-section";
import BentoSection from "@/components/sections/bento-section";
import FAQSection from "@/components/sections/frequently-asked-ques";
import ExpenseModesSection from "@/components/sections/general-personal-section";

const Home: React.FC = () => {
  return (
    <div className="flex h-fit w-full flex-col">
      <Landing />
      <Stats />
      <SayHello />
      <ExpenseModesSection />
      <BentoSection />
      <FAQSection />
    </div>
  );
};

export default Home;
