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
          className={`pointer-events-auto flex items-start space-x-3 p-4 rounded-xl shadow-2xl border backdrop-blur-xl transition-all duration-300 animate-fade-in ${
            toast.type === 'error'
              ? 'bg-red-950/90 border-red-500/50 text-white'
              : toast.type === 'warning'
              ? 'bg-amber-950/90 border-amber-500/50 text-white'
              : 'bg-obsidian-300/95 border-gold-500/50 text-white shadow-gold-subtle'
          }`}
        >
          <div className="shrink-0 mt-0.5">
            {toast.type === 'error' ? (
              <AlertCircle className="w-5 h-5 text-red-400" />
            ) : toast.type === 'warning' ? (
              <AlertCircle className="w-5 h-5 text-amber-400" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-gold-400" />
            )}
          </div>

          <div className="flex-1">
            {toast.title && <h4 className="text-xs font-bold uppercase tracking-wider text-gold-200">{toast.title}</h4>}
            <p className="text-xs text-neutral-300 mt-0.5 leading-relaxed">{toast.message}</p>
          </div>

          <button
            onClick={() => removeToast(toast.id)}
            className="text-neutral-400 hover:text-white shrink-0 p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
