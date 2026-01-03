import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Lock, User } from "lucide-react";
import { Particles } from "@/components/ui/particles";
import Logo from "@/components/common/logo";
import { SignInButton } from "@clerk/clerk-react";
import { FcGoogle } from "react-icons/fc";

const inputBase =
  "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100";

const AuthPage: React.FC = () => {
  const [mode, setMode] = useState<"signin" | "signup">("signin");

  return (
    <div className="relative flex h-screen flex-col items-center justify-start p-4 pt-8">
      <Particles
        className="absolute inset-0 z-0"
        quantity={150}
        ease={80}
        color={"#000000"}
        refresh
      />
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="z-999 mb-8 space-y-4 text-center"
      >
        <h1 className="text-5xl font-bold text-gray-800">
          Get started with Splito
        </h1>
        <p className="mt-1 text-xl text-gray-500">It only takes a minute.</p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="z-999 w-full max-w-md rounded-3xl border bg-white p-6 shadow-lg ring-1 ring-gray-100"
      >
        <div className="mb-4 text-center">
          <Logo />
          <p className="mt-1 text-sm text-gray-500">
            {mode === "signin"
              ? "Welcome back. Let’s settle up."
              : "Create an account to start splitting."}
          </p>
        </div>
        <div className="relative mb-4 flex h-16 items-center justify-center border-b px-12 pb-3">
          <SignInButton mode="modal">
            <div className="flex w-full cursor-pointer items-center justify-center gap-4 rounded-xl border p-2 text-center transition hover:bg-gray-50">
              <FcGoogle />
              <p className="text-sm">Continue with Google</p>
            </div>
          </SignInButton>
          <p className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-white px-4 font-medium text-gray-400">
            or
          </p>
        </div>
        <AnimatePresence mode="wait">
          {mode === "signin" ? (
            <motion.form
              key="signin"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              <div>
                <div className="flex justify-between pr-4">
                  <label className="mb-1 block text-xs text-gray-500">
                    Email
                  </label>
                  <label className="mb-1 block cursor-pointer text-xs text-gray-500 hover:text-blue-500">
                    Use phone
                  </label>
                </div>
                <div className="relative">
                  <Mail
                    className="absolute top-3.5 left-3 text-gray-400"
                    size={16}
                  />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className={`${inputBase} pl-10`}
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs text-gray-500">
                  Password
                </label>
                <div className="relative">
                  <Lock
                    className="absolute top-3.5 left-3 text-gray-400"
                    size={16}
                  />
                  <input
                    type="password"
                    placeholder="••••••••"
                    className={`${inputBase} pl-10`}
                  />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="w-full rounded-xl bg-blue-600 py-3 text-sm font-medium text-white shadow hover:bg-blue-700"
              >
                Sign in
              </motion.button>
            </motion.form>
          ) : (
            <motion.form
              key="signup"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              <div>
                <label className="mb-1 block text-xs text-gray-500">Name</label>
                <div className="relative">
                  <User
                    className="absolute top-3.5 left-3 text-gray-400"
                    size={16}
                  />
                  <input
                    type="text"
                    placeholder="Your name"
                    className={`${inputBase} pl-10`}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between pr-4">
                  <label className="mb-1 block text-xs text-gray-500">
                    Email
                  </label>
                  <label className="mb-1 block cursor-pointer text-xs text-gray-500 hover:text-blue-500">
                    Use phone
                  </label>
                </div>
                <div className="relative">
                  <Mail
                    className="absolute top-3.5 left-3 text-gray-400"
                    size={16}
                  />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className={`${inputBase} pl-10`}
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs text-gray-500">
                  Password
                </label>
                <div className="relative">
                  <Lock
                    className="absolute top-3.5 left-3 text-gray-400"
                    size={16}
                  />
                  <input
                    type="password"
                    placeholder="Create a password"
                    className={`${inputBase} pl-10`}
                  />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="w-full rounded-xl bg-blue-600 py-3 text-sm font-medium text-white shadow hover:bg-blue-700"
              >
                Create account
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>
        <div className="mt-6 text-center text-sm text-gray-500">
          {mode === "signin" ? (
            <button
              onClick={() => setMode("signup")}
              className="font-medium text-blue-600 hover:underline"
            >
              Don’t have an account? Sign up
            </button>
          ) : (
            <button
              onClick={() => setMode("signin")}
              className="font-medium text-blue-600 hover:underline"
            >
              Already have an account? Sign in
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;
