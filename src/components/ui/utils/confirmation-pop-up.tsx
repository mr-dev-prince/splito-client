import React from "react";
import Loader from "./loader-component";

interface ConfirmationPopUpProps {
  open: boolean;
  title?: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "info";
  loading?: boolean;
}

const ConfirmationPopUp: React.FC<ConfirmationPopUpProps> = ({
  open,
  title = "Are you sure ?",
  message,
  onConfirm,
  onCancel,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "danger",
  loading = false,
}) => {
  if (!open) return null;

  const accentColor =
    variant === "danger"
      ? "bg-red-600 hover:bg-red-700"
      : "bg-blue-600 hover:bg-blue-700";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm transition-opacity"
      role="dialog"
      aria-modal="true"
    >
      <div className="animate-in fade-in zoom-in w-full max-w-sm transform overflow-hidden rounded-2xl bg-white p-6 shadow-2xl transition-all duration-200">
        <div className="flex flex-col items-center text-center">
          {variant === "danger" && (
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
              <svg
                className="h-6 w-6 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
          )}

          <h3 className="text-lg leading-6 font-semibold text-gray-900">
            {title}
          </h3>

          <div className="mt-2">
            <p className="text-sm text-gray-500">{message}</p>
          </div>
        </div>
        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            onClick={onCancel}
            className="flex-1 rounded-xl bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 sm:flex-none"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 rounded-xl px-4 py-2.5 text-sm font-medium text-white transition-shadow hover:shadow-lg active:scale-95 sm:flex-none ${accentColor}`}
          >
            {loading ? <Loader loading={loading} size="sm" /> : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopUp;
