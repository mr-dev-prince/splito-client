import React from "react";
import { motion } from "motion/react";
import { primaryNav } from "../../constants/nav-options";
import { KeyRoundIcon } from "lucide-react";
import CustomButton from "../ui/custom-button";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import Logo from "./logo";

const Nav: React.FC = () => {
  return (
    <motion.div className="z-9999 flex h-full w-full items-center justify-between border-b p-4 shadow-xl lg:bg-none lg:px-24 lg:shadow-none">
      <Logo />
      <motion.div className="hidden items-center justify-center gap-6 font-medium text-gray-600 lg:flex">
        {primaryNav.map((navItem) => (
          <motion.a
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.3,
              delay: 0.1 * primaryNav.indexOf(navItem),
            }}
            key={navItem.id}
            href={navItem.href}
            className="hover:text-blue-500"
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
          <UserButton />
        </SignedIn>
      </div>
    </motion.div>
  );
};

export default Nav;
