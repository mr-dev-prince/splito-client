import React from "react";
import user from "@/assets/user.jpg";
import { motion } from "motion/react";
import { NumberTicker } from "./number-ticker";

interface DebtCredCardProps {
  type: CartType;
  amount?: number;
  userName?: string;
}

type CartType = "debt" | "credit";

const amountColor = {
  debt: "text-red-500",
  credit: "text-green-500",
};

const infoText = {
  debt: "You owe",
  credit: "Owes You",
};

const DebtCredCard: React.FC<DebtCredCardProps> = ({
  type,
  amount = 120,
  userName = "John Doe",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="hidden h-fit w-64 flex-col overflow-hidden rounded-xl bg-white/20 shadow-lg backdrop-blur-xs lg:flex"
    >
      <div className="flex items-center gap-3 bg-blue-500 p-2">
        <img src={user} alt="" className="h-8 rounded-lg" />
        <p className="text-xl font-semibold text-white">{userName}</p>
      </div>
      <div className="flex w-full items-center justify-between p-3">
        <p className={`font-semibold text-blue-950`}>{infoText[type]}</p>
        <p className="text-center">
          <span className={`text-lg font-semibold ${amountColor[type]}`}>
            $
          </span>
          <NumberTicker
            value={amount}
            className={`text-lg font-medium tracking-tighter whitespace-pre-wrap ${amountColor[type]}`}
          />
        </p>
      </div>
    </motion.div>
  );
};

export default DebtCredCard;
