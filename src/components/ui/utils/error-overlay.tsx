import { motion } from "motion/react";
import { AlertTriangle, RotateCcw } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";

interface ErrorOverlayProps {
  error?: string | null;
  onRetry?: () => void;
  children: React.ReactNode;
  className?: string;
}

const ErrorOverlay: React.FC<ErrorOverlayProps> = ({
  error,
  onRetry,
  children,
  className,
}) => {
  return (
    <div className={cn("relative", className)}>
      {children}

      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-2xl bg-white/90 backdrop-blur-sm"
        >
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-600">
              <AlertTriangle size={18} />
            </div>

            <p className="text-sm font-medium text-gray-800">
              Failed to load data
            </p>
            <p className="max-w-55 text-xs text-gray-500">
              {error || "Something went wrong. Please try again."}
            </p>

            {onRetry && (
              <button
                onClick={onRetry}
                className="mt-2 inline-flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-100"
              >
                <RotateCcw size={14} />
                Retry
              </button>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ErrorOverlay;
