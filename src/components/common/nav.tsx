import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useAuth,
} from "@clerk/clerk-react";

import CustomButton from "../ui/custom-button";
import { KeyRoundIcon } from "lucide-react";
import Logo from "./logo";
import React from "react";
import { motion } from "framer-motion";
import { notifyInfo } from "@/lib/toast";
import { primaryNav } from "../../constants/nav-options";

const Nav: React.FC = () => {
  const { isLoaded, isSignedIn } = useAuth();

  const handleNavClick = (e: React.MouseEvent) => {
    if (isLoaded && !isSignedIn) {
      e.preventDefault();
      notifyInfo(
        "🔒 Secure access required. Please sign in to view your insights.",
      );
      return;
    }
  };

  return (
    <motion.div className="z-9999 flex h-full w-full items-center justify-between border-b bg-white p-4 shadow-xl lg:bg-none lg:px-24 lg:shadow-none">
      <Logo />

      <motion.div className="hidden items-center justify-center gap-8 font-semibold text-slate-600 lg:flex">
        {primaryNav.map((navItem, index) => (
          <motion.a
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.3,
              delay: 0.1 * index,
            }}
            key={navItem.id}
            href={navItem.href}
            onClick={(e) => handleNavClick(e)}
            className="text-sm tracking-tight transition-colors hover:text-blue-600"
          >
            {navItem.label}
          </motion.a>
        ))}
      </motion.div>

      <div>
        <SignedOut>
          <SignInButton mode="modal">
            <CustomButton label="Sign in" logo={<KeyRoundIcon size={14} />} />
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <div className="flex items-center gap-4">
            <UserButton />
          </div>
        </SignedIn>
      </div>
    </motion.div>
  );
};

export default Nav;
