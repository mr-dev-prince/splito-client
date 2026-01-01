import React, { useState } from "react";
import { motion } from "motion/react";
import { Mail, Phone, MapPin } from "lucide-react";

const ContactDetails: React.FC = () => {
  const [isEditing] = useState(false);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  };
  return (
    <motion.div variants={fadeInUp} className="space-y-6 md:col-span-2">
      <div className="rounded-3xl border border-gray-800 bg-[#1A1C1E] p-6">
        <h3 className="mb-6 text-lg font-bold text-white">
          Contact Information
        </h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="ml-1 text-[10px] font-bold text-gray-500 uppercase">
                Email Address
              </label>
              <div className="relative mt-2">
                <Mail
                  size={16}
                  className="absolute top-3 left-4 text-gray-600"
                />
                <input
                  type="email"
                  readOnly={!isEditing}
                  defaultValue="alex.t@fintech.com"
                  className="w-full rounded-xl border border-gray-800 bg-gray-900/50 py-2.5 pr-4 pl-11 text-sm text-white transition-all outline-none focus:border-blue-500"
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="ml-1 text-[10px] font-bold text-gray-500 uppercase">
                Phone Number
              </label>
              <div className="relative mt-2">
                <Phone
                  size={16}
                  className="absolute top-3 left-4 text-gray-600"
                />
                <input
                  type="tel"
                  readOnly={!isEditing}
                  defaultValue="+1 (555) 000-1234"
                  className="w-full rounded-xl border border-gray-800 bg-gray-900/50 py-2.5 pr-4 pl-11 text-sm text-white transition-all outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>
          <div>
            <label className="ml-1 text-[10px] font-bold text-gray-500 uppercase">
              Address
            </label>
            <div className="relative mt-2">
              <MapPin
                size={16}
                className="absolute top-3 left-4 text-gray-600"
              />
              <input
                type="text"
                readOnly={!isEditing}
                defaultValue="123 Fintech Way, San Francisco, CA"
                className="w-full rounded-xl border border-gray-800 bg-gray-900/50 py-2.5 pr-4 pl-11 text-sm text-white transition-all outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactDetails;
