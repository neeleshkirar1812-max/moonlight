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
    <div className="fixed bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 w-[95%] sm:w-[92%] max-w-2xl animate-fade-in">
      <div className="bg-white/95 border-2 border-black rounded-full p-1.5 sm:p-2 pl-3 sm:pl-4 pr-2 sm:pr-3 shadow-2xl backdrop-blur-2xl flex items-center justify-between gap-2 text-black">
        <div className="flex items-center space-x-2 truncate">
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gold-100 border border-gold-600 flex items-center justify-center text-black shrink-0">
            <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </div>
          <div className="truncate text-[11px] sm:text-xs">
            <span className="font-extrabold text-black truncate block sm:inline">
              2026 – 2027 Season Dates Open
            </span>
            <span className="hidden sm:inline text-neutral-600 text-[11px] ml-1.5 font-medium">
              • Exclusive Muhurat
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-1.5 sm:space-x-2 shrink-0">
          <a
            href="https://api.whatsapp.com/send?phone=919229229323"
            target="_blank"
            rel="noreferrer"
            className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-emerald-50 hover:bg-emerald-600 border border-emerald-600 text-emerald-900 hover:text-white text-[9.5px] sm:text-[10.5px] font-black uppercase tracking-wider transition-all flex items-center shadow-sm"
          >
            <Phone className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-1" /> WhatsApp
          </a>

          <Link
            to="/enquiry"
            className="px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-black hover:bg-neutral-800 text-white font-extrabold text-[9.5px] sm:text-[10.5px] uppercase tracking-wider shadow-sm hover:brightness-110 transition-all flex items-center btn-shimmer"
          >
            <span>Book</span>
            <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 ml-1 text-gold-400" />
          </Link>

          <button
            onClick={() => setDismissed(true)}
            className="p-1 text-neutral-500 hover:text-black rounded-full transition-colors"
            aria-label="Dismiss banner"
          >
            <X className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeslaStickyBar;
