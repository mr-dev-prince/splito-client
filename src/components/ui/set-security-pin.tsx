import { AnimatePresence, motion } from "framer-motion";
import { Delete, Lock, RefreshCcw, ShieldCheck, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { getUserDetails, setUserPin } from "@/redux/features/user/user-thunk";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { BlueLoader } from "./utils/custom-loader";
import { notifyError } from "@/lib/toast";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const SetSecurityPinModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<"initial" | "confirm">("initial");
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [matchError, setMatchError] = useState(false);

  const { securityPinError, securityPinLoading } = useAppSelector(
    (state) => state.user,
  );

  const dispatch = useAppDispatch();

  const isReadyToSubmit =
    pin.length === 4 && confirmPin.length === 4 && pin === confirmPin;

  const resetState = () => {
    setStep("initial");
    setPin("");
    setConfirmPin("");
    setMatchError(false);
  };

  const handlePinSet = async () => {
    if (!isReadyToSubmit) return;
    const result = await dispatch(setUserPin({ pin }));
    if (result.meta.requestStatus === "fulfilled") {
      handleClose();
    }
    await dispatch(getUserDetails());
  };

  const handleRetry = () => {
    setConfirmPin("");
    setMatchError(false);
  };

  const handleKeyPress = (digit: string) => {
    if (step === "initial") {
      if (pin.length < 4) {
        const newVal = pin + digit;
        setPin(newVal);
        if (newVal.length === 4) {
          setTimeout(() => setStep("confirm"), 400);
        }
      }
    } else {
      if (confirmPin.length < 4) {
        const newVal = confirmPin + digit;
        setConfirmPin(newVal);
        if (newVal.length === 4 && newVal !== pin) {
          setMatchError(true);
        }
      }
    }
  };

  const handleDelete = () => {
    if (step === "initial") setPin(pin.slice(0, -1));
    else setConfirmPin(confirmPin.slice(0, -1));
  };

  useEffect(() => {
    if (securityPinError) {
      notifyError(`Failed to set security pin: ${securityPinError}`);
    }
  }, [securityPinError]);

  const handleClose = () => {
    resetState();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md overflow-hidden rounded-[2.5rem] bg-white p-8 shadow-2xl"
          >
            <button
              onClick={handleClose}
              className="absolute top-6 right-6 text-slate-400 transition-colors hover:text-slate-600"
            >
              <X size={20} />
            </button>

            <div className="mb-8 flex flex-col items-center text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 transition-all">
                {step === "initial" ? (
                  <Lock size={24} />
                ) : (
                  <ShieldCheck size={24} />
                )}
              </div>
              <h2 className="text-2xl font-black tracking-tight text-slate-900">
                {step === "initial" ? "Set Security PIN" : "Confirm PIN"}
              </h2>
              <p className="mt-1 text-sm font-medium text-slate-400">
                {matchError
                  ? "PINs do not match. Try again."
                  : step === "initial"
                    ? "Create a 4-digit code for app security"
                    : "Re-enter your PIN to verify"}
              </p>
            </div>

            <motion.div
              animate={matchError ? { x: [-10, 10, -10, 10, 0] } : {}}
              className="mb-10 flex justify-center gap-5"
            >
              {[0, 1, 2, 3].map((i) => {
                const active =
                  step === "initial" ? pin.length > i : confirmPin.length > i;
                return (
                  <div
                    key={i}
                    className={`h-4 w-4 rounded-full border-2 transition-all duration-300 ${
                      active
                        ? "scale-110 border-indigo-600 bg-indigo-600"
                        : "border-slate-200 bg-transparent"
                    } ${matchError ? "border-rose-500 bg-rose-500" : ""}`}
                  />
                );
              })}
            </motion.div>

            <div className="mx-auto min-h-80 max-w-70">
              {matchError ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center pt-10"
                >
                  <button
                    onClick={handleRetry}
                    className="group flex flex-col items-center gap-4 text-slate-500 transition-colors hover:text-indigo-600"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-50 group-hover:bg-indigo-50">
                      <RefreshCcw size={28} />
                    </div>
                    <span className="text-sm font-bold">Tap to Retry</span>
                  </button>
                </motion.div>
              ) : (
                <div className="grid grid-cols-3 gap-4">
                  {[
                    "1",
                    "2",
                    "3",
                    "4",
                    "5",
                    "6",
                    "7",
                    "8",
                    "9",
                    "",
                    "0",
                    "del",
                  ].map((key, i) => (
                    <button
                      key={i}
                      disabled={
                        key === "" ||
                        (step === "confirm" && confirmPin.length === 4)
                      }
                      onClick={() =>
                        key === "del" ? handleDelete() : handleKeyPress(key)
                      }
                      className={`flex h-16 w-16 items-center justify-center rounded-full text-xl font-bold transition-all active:scale-90 ${
                        key === "del"
                          ? "text-slate-400 hover:text-slate-600"
                          : key === ""
                            ? "opacity-0"
                            : "bg-slate-50 text-slate-900 hover:bg-slate-100"
                      }`}
                    >
                      {key === "del" ? <Delete size={20} /> : key}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-8 flex items-center justify-center gap-2">
              <div
                className={`h-1.5 w-8 rounded-full transition-all ${step === "initial" ? "bg-indigo-600" : "bg-indigo-100"}`}
              />
              <div
                className={`h-1.5 w-8 rounded-full transition-all ${step === "confirm" ? "bg-indigo-600" : "bg-indigo-100"}`}
              />
            </div>

            <div className="mt-6">
              <button
                onClick={handlePinSet}
                disabled={!isReadyToSubmit || securityPinLoading}
                className={`flex h-14 w-full items-center justify-center rounded-2xl font-bold transition-all duration-300 ${
                  isReadyToSubmit
                    ? "bg-slate-900 text-white shadow-xl shadow-slate-200 hover:bg-black"
                    : "cursor-not-allowed bg-slate-100 text-slate-400"
                }`}
              >
                {securityPinLoading ? <BlueLoader /> : "Set Security PIN"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SetSecurityPinModal;
