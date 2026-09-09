import React from 'react';
import { useNotification } from '../../context/NotificationContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer = () => {
  const { toasts, removeToast } = useNotification();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-start space-x-3 p-4 rounded-xl shadow-xl border backdrop-blur-xl transition-all duration-300 animate-fade-in ${
            toast.type === 'error'
              ? 'bg-red-50 border-red-300 text-red-900'
              : toast.type === 'warning'
              ? 'bg-amber-50 border-amber-300 text-amber-900'
              : 'bg-white border-amber-900/20 text-neutral-900 shadow-md'
          }`}
        >
          <div className="shrink-0 mt-0.5">
            {toast.type === 'error' ? (
              <AlertCircle className="w-5 h-5 text-red-600" />
            ) : toast.type === 'warning' ? (
              <AlertCircle className="w-5 h-5 text-amber-600" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-amber-800" />
            )}
          </div>

          <div className="flex-1">
            {toast.title && <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900">{toast.title}</h4>}
            <p className="text-xs text-neutral-700 mt-0.5 leading-relaxed font-medium">{toast.message}</p>
          </div>

          <button
            onClick={() => removeToast(toast.id)}
            className="text-neutral-400 hover:text-neutral-800 shrink-0 p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
