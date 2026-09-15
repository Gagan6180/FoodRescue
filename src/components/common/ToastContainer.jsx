import React from 'react';
import { useFoodRescue } from '../../context/FoodRescueContext';
import { CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';

export default function ToastContainer() {
  const { toasts, removeToast } = useFoodRescue();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none"
    >
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isWarning = toast.type === 'warning';

        return (
          <div
            key={toast.id}
            role="status"
            className="pointer-events-auto flex items-start gap-3 p-3.5 bg-white rounded-lg border border-neutral-200/90 shadow-lg shadow-neutral-900/5 text-neutral-800 animate-fade-up text-sm"
          >
            <div className="shrink-0 mt-0.5">
              {isSuccess && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
              {isWarning && <AlertTriangle className="w-4 h-4 text-amber-600" />}
              {!isSuccess && !isWarning && <Info className="w-4 h-4 text-forest-700" />}
            </div>
            <div className="flex-1 font-normal leading-relaxed text-neutral-800">
              {toast.message}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="shrink-0 text-neutral-400 hover:text-neutral-600 transition-colors p-0.5"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
