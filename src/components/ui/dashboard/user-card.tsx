import { Mail, Phone } from "lucide-react";

import React from "react";
import { motion } from "motion/react";

interface UserCardProps {
  name: string;
  email: string;
  phone: string;
  avatar: string;
}

const UserCard: React.FC<UserCardProps> = ({ name, email, phone, avatar }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center rounded-[2.5rem] border border-slate-200 bg-white p-8 text-center shadow-sm md:col-span-4"
    >
      <div className="relative">
        <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-slate-100 text-slate-400 shadow-xl">
          <img src={avatar} className="object-cover" />
        </div>
        <div className="absolute right-0 bottom-0 h-6 w-6 rounded-full border-4 border-white bg-emerald-500" />
      </div>

      <h2 className="mt-6 text-2xl font-bold text-slate-900">{name}</h2>

      <div className="mt-8 w-full space-y-4">
        <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4">
          <Mail size={18} className="text-slate-400" />
          <span className="text-sm font-semibold text-slate-700">{email}</span>
        </div>
        <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4">
          <Phone size={18} className="text-slate-400" />
          <span className="text-sm font-semibold text-slate-700">{phone}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default UserCard;
