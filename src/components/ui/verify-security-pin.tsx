import { AnimatePresence, motion } from "framer-motion";
import { HelpCircle, Lock, ShieldCheck } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect, useRef, useState } from "react";

import { BlueLoader } from "./utils/custom-loader";
import { notifyInfo } from "@/lib/toast";
import { verifyUserPin } from "@/redux/features/user/user-thunk";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const VerifyPinModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [pin, setPin] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const { verifyPinLoading, verifyPinError } = useAppSelector(
    (state) => state.user,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setTimeout(() => setPin(""), 0);
    }
  }, [isOpen]);

  const handleVerification = async () => {
    if (pin.length !== 4) return;
    const result = await dispatch(verifyUserPin({ pin }));
    if (result.meta.requestStatus === "fulfilled") {
      onClose();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "");
    if (val.length <= 4) {
      setPin(val);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && pin.length === 4) {
      handleVerification();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-100 overflow-hidden rounded-[2.5rem] bg-white p-10 shadow-2xl"
          >
            <input
              ref={inputRef}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              autoComplete="one-time-code"
              value={pin}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="pointer-events-none absolute opacity-0"
            />
            <div className="mb-10 flex flex-col items-center text-center">
              <motion.div
                animate={verifyPinLoading ? { rotateY: 360 } : {}}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-xl shadow-slate-200"
              >
                <Lock size={28} />
              </motion.div>
              <h2 className="text-2xl font-black tracking-tight text-slate-900">
                Security Check
              </h2>
              <p className="mt-2 text-sm font-medium text-slate-400">
                Type your 4-digit PIN to continue
              </p>
            </div>
            <motion.div
              animate={verifyPinError ? { x: [-10, 10, -10, 10, 0] } : {}}
              onClick={() => inputRef.current?.focus()}
              className="mb-12 flex cursor-pointer justify-center gap-6"
            >
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`h-5 w-5 rounded-full border-2 transition-all duration-200 ${
                    pin.length > i
                      ? "scale-110 border-slate-900 bg-slate-900"
                      : "border-slate-200 bg-transparent"
                  } ${verifyPinError ? "border-rose-500 bg-rose-500" : ""}`}
                />
              ))}
            </motion.div>

            <div className="mt-6">
              <button
                onClick={handleVerification}
                disabled={verifyPinLoading || pin.length < 4}
                className={`flex h-14 w-full items-center justify-center rounded-2xl font-bold transition-all duration-300 ${
                  pin.length === 4 && !verifyPinLoading
                    ? "bg-slate-900 text-white shadow-xl shadow-slate-200 hover:bg-black"
                    : "cursor-not-allowed bg-slate-100 text-slate-400"
                }`}
              >
                {verifyPinLoading ? <BlueLoader /> : "Verify Identity"}
              </button>
            </div>
            <div className="mt-10 flex flex-col items-center gap-4">
              <button
                onClick={() => notifyInfo("Feature coming soon!")}
                className="flex items-center gap-2 text-xs font-bold tracking-widest text-slate-400 uppercase transition-colors hover:text-indigo-600"
              >
                <HelpCircle size={14} /> Forgot PIN?
              </button>
              <div className="flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1">
                <ShieldCheck size={12} className="text-emerald-500" />
                <span className="text-[10px] font-bold text-emerald-600 uppercase">
                  Encrypted Session
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default VerifyPinModal;
