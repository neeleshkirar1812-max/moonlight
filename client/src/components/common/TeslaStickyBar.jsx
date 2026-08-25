import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Phone, Sparkles, X, ArrowRight } from 'lucide-react';

const TeslaStickyBar = () => {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past hero section (300px)
      if (window.scrollY > 300 && !dismissed) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [dismissed]);

  if (!visible || dismissed) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-2xl animate-fade-in">
      <div className="bg-white/95 border border-gold-400/60 rounded-full p-2 pl-4 pr-3 shadow-2xl backdrop-blur-2xl flex items-center justify-between gap-3 text-neutral-900">
        <div className="flex items-center space-x-2.5 truncate">
          <div className="w-7 h-7 rounded-full bg-gold-50 border border-gold-400 flex items-center justify-center text-gold-700 shrink-0">
            <Calendar className="w-3.5 h-3.5" />
          </div>
          <div className="truncate text-xs">
            <span className="font-bold text-neutral-900 truncate block sm:inline">
              Dates Open for 2026 – 2027 Season
            </span>
            <span className="hidden sm:inline text-neutral-500 text-[11px] ml-2">
              • Exclusive Muhurat Blocking
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <a
            href="https://api.whatsapp.com/send?phone=919229229323"
            target="_blank"
            rel="noreferrer"
            className="px-3 py-1.5 rounded-full bg-emerald-50 hover:bg-emerald-600 border border-emerald-400 text-emerald-800 hover:text-white text-[10.5px] font-bold uppercase tracking-wider transition-all flex items-center shadow-sm"
          >
            <Phone className="w-3 h-3 mr-1" /> WhatsApp
          </a>

          <Link
            to="/enquiry"
            className="px-4 py-1.5 rounded-full bg-neutral-900 hover:bg-black text-white font-bold text-[10.5px] uppercase tracking-wider shadow-sm hover:brightness-110 transition-all flex items-center btn-shimmer"
          >
            <span>Book Shoot</span>
            <ArrowRight className="w-3 h-3 ml-1 text-gold-400" />
          </Link>

          <button
            onClick={() => setDismissed(true)}
            className="p-1 text-neutral-400 hover:text-neutral-900 rounded-full transition-colors ml-1"
            aria-label="Dismiss banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeslaStickyBar;
