import React from "react";
import clsx from "clsx";

type LoaderSize = "sm" | "md" | "lg";

interface LoaderProps {
  loading: boolean;
  size?: LoaderSize;
  overlay?: boolean;
  className?: string;
}

const sizeMap: Record<LoaderSize, string> = {
  sm: "h-4 w-4 border-2",
  md: "h-8 w-8 border-3",
  lg: "h-14 w-14 border-4",
};

const Loader: React.FC<LoaderProps> = ({
  loading,
  size = "md",
  overlay = false,
  className,
}) => {
  if (!loading) return null;

  const spinner = (
    <div
      className={clsx(
        "animate-spin rounded-full border-gray-300 border-t-blue-600",
        sizeMap[size],
        className,
      )}
    />
  );

  if (!overlay) return spinner;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      {spinner}
    </div>
  );
};

export default Loader;
