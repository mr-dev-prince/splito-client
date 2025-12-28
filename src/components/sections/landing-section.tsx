import React from "react";
import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { TextAnimate } from "@/components/ui/text-animate";
import CustomButton from "@/components/ui/custom-button";
import { ChevronRight } from "lucide-react";
import { TypingAnimation } from "@/components/ui/typing-animation";
import ManageExpense from "@/components/ui/manage-expense-card";
import YourExpensesCard from "@/components/ui/your-expense-card";
import DebtCredCard from "@/components/ui/debt-cred-card";
import FeatureCard from "@/components/ui/feature-card";
import { features } from "@/constants/feature-options";
import { Particles } from "../ui/particles";

const Landing: React.FC = () => {
  return (
    <div className="relative flex h-fit w-full flex-col items-center pt-20 lg:h-screen">
      <InteractiveGridPattern
        className={cn(
          "mask-[radial-gradient(400px_circle_at_center,white,transparent)]",
        )}
        width={60}
        height={60}
        squares={[80, 80]}
        squaresClassName="hover:fill-blue-500"
      />
      <Particles
        className="absolute inset-0 z-0"
        quantity={150}
        ease={80}
        color={"#000000"}
        refresh
      />
      <motion.div className="z-999 flex h-fit flex-col items-center justify-center">
        <motion.h1
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6 }}
          whileInView={"show"}
          className="hidden text-3xl font-bold text-black lg:block lg:text-6xl"
        >
          <TextAnimate animation="slideUp" by="word" className="font-black">
            Split Bills. Not Friendships.
          </TextAnimate>
        </motion.h1>
        <TypingAnimation className="hidden text-gray-500 lg:block text-xl mt-4">
          Track expenses, settle balances, and keep money conversations simple.
        </TypingAnimation>
      </motion.div>
      <div>
        <h1 className="text-center text-4xl font-black text-blue-950 lg:hidden">
          Split Bills. <br /> Not Friendships.
        </h1>
        <p className="mt-4 text-center text-gray-600 lg:hidden">
          Track expenses, settle balances, and keep money conversations simple.
        </p>
      </div>
      <motion.div className="z-999 mt-4 flex gap-4">
        <CustomButton label="Try Now" logo={<ChevronRight size={14} />} />
      </motion.div>
      <motion.div className="z-999 flex flex-col gap-4 lg:mt-12 lg:flex-row">
        <div className="flex flex-col items-end justify-center gap-8">
          <FeatureCard options={features} />
          <DebtCredCard type="debt" />
        </div>
        <div className="flex flex-col">
          <ManageExpense />
          <YourExpensesCard />
        </div>
        <div className="flex items-center justify-center opacity-60">
          <DebtCredCard type="credit" amount={134} userName="Jane Myers" />
        </div>
      </motion.div>
    </div>
  );
};

export default Landing;
