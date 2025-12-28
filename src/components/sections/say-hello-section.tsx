import React from "react";
import { motion } from "motion/react";
import type { Variants, Transition } from "motion/react";
import { TextAnimate } from "../ui/text-animate";
import { Ripple } from "../ui/ripple";
import splito_mock from "@/assets/splito.png";
import InsightCard from "../ui/insight-card";

const SayHello: React.FC = () => {
  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.15,
      },
    },
    whileInView: { once: true },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 16,
      },
    },
  };

  const transition: Transition = {
    opacity: { duration: 0.6, ease: "easeOut" },
    y: {
      duration: 4,
      repeat: Infinity,
      repeatType: "mirror",
      ease: "easeInOut",
    },
    rotateX: {
      duration: 4,
      repeat: Infinity,
      repeatType: "mirror",
      ease: "easeInOut",
    },
    rotateZ: {
      duration: 6,
      repeat: Infinity,
      repeatType: "mirror",
      ease: "easeInOut",
    },
  };

  return (
    <div className="relative h-screen w-full">
      <div className="z-9">
        <Ripple />
      </div>
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="z-999 mt-12 flex flex-col items-center justify-center text-5xl leading-tight font-medium lg:mt-0 lg:text-8xl"
      >
        <TextAnimate className="mt-2 hidden text-xl text-gray-400 lg:block">
          Make better decisions on your spendings.
        </TextAnimate>
        <motion.p variants={item} className="text-blue-950">
          Say Hello
        </motion.p>
        <motion.p variants={item} className="text-blue-950 lg:-mt-6">
          to <span className="font-black text-blue-600">Splito.</span>
        </motion.p>
      </motion.div>
      <div className="pointer-events-none absolute inset-x-0 bottom-12 z-9999 flex h-full w-full items-end justify-center">
        <motion.img
          src={splito_mock}
          alt="Splito Mock"
          className="h-[70%] will-change-transform"
          initial={{ opacity: 0, y: 40 }}
          animate={{
            opacity: 1,
            y: [0, -12, 0],
            rotateX: [0, 6, 0],
            rotateZ: [-1, 1, -1],
          }}
          transition={transition}
        />
        <InsightCard
          title="This month"
          value="₹1,200 saved"
          className="absolute top-[30%] left-[5%] lg:top-[40%] lg:left-[28%]"
          delay={0.2}
        />
        <InsightCard
          title="Available Soon!"
          value="On Your Smartphone"
          className="absolute bottom-[0%] left-[48%] bg-sky-500/30"
          delay={0.2}
        />
        <InsightCard
          title="Pending"
          value="3 unsettlements"
          className="absolute bottom-[18%] left-[30%] hidden lg:block"
          delay={0.4}
        />
        <InsightCard
          title="Top category"
          value="Food 🍕"
          className="absolute top-[55%] right-[70%] lg:right-[30%]"
          delay={0.6}
        />
        <InsightCard
          title="Active groups"
          value="2 groups ongoing"
          className="absolute top-[50%] right-[5%] lg:top-[35%] lg:right-[28%]"
          delay={0.8}
        />
        <InsightCard
          title="Avg. settle time"
          value="2 days faster"
          className="absolute right-[5%] bottom-[16%] lg:right-[22%]"
          delay={1}
        />
      </div>
    </div>
  );
};

export default SayHello;
