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
      <div className="bg-[#141418]/95 border border-gold-500/40 rounded-full p-1.5 sm:p-2 pl-3 sm:pl-4 pr-2 sm:pr-3 shadow-2xl backdrop-blur-2xl flex items-center justify-between gap-2 text-white">
        <div className="flex items-center space-x-2 truncate">
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gold-500/20 border border-gold-400 flex items-center justify-center text-gold-400 shrink-0">
            <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </div>
          <div className="truncate text-[10px] sm:text-xs min-w-0">
            <span className="font-bold text-white truncate block sm:inline">
              <span className="xs:hidden">2026 Dates Open</span>
              <span className="hidden xs:inline">2026 – 2027 Season Dates Open</span>
            </span>
            <span className="hidden sm:inline text-neutral-400 text-[11px] ml-1.5 font-light">
              • Exclusive Muhurat
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-1.5 sm:space-x-2 shrink-0">
          <a
            href="https://api.whatsapp.com/send?phone=919229229323"
            target="_blank"
            rel="noreferrer"
            className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-emerald-500/15 hover:bg-emerald-600 border border-emerald-500/40 text-emerald-400 hover:text-white text-[9px] sm:text-[10.5px] font-bold uppercase tracking-wider transition-all flex items-center shadow-sm min-h-[32px]"
          >
            <Phone className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-1" />
            <span className="hidden xs:inline">WhatsApp</span>
          </a>

          <Link
            to="/enquiry"
            className="px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full bg-gold-gradient text-black font-extrabold text-[9px] sm:text-[10.5px] uppercase tracking-wider shadow-sm hover:brightness-110 active:scale-95 transition-all flex items-center btn-shimmer min-h-[32px]"
          >
            <span>Book</span>
            <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 ml-1" />
          </Link>

          <button
            onClick={() => setDismissed(true)}
            className="p-1.5 text-neutral-400 hover:text-white rounded-full transition-colors min-w-[32px] min-h-[32px] flex items-center justify-center"
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
