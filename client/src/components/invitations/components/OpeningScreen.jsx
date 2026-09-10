import React, { useState, useEffect } from 'react';
import { Sparkles, ChevronDown } from 'lucide-react';

const OpeningScreen = ({ invitation, theme, onEnter }) => {
  const [opened, setOpened] = useState(false);

  const handleOpen = () => {
    setOpened(true);
    if (onEnter) onEnter();
  };

  const getMonogram = () => {
    if (invitation.bride_name && invitation.groom_name) {
      return `${invitation.bride_name.charAt(0)} & ${invitation.groom_name.charAt(0)}`;
    }
    const names = invitation.names || 'Moonlight Couple';
    const parts = names.split('&');
    if (parts.length >= 2) {
      return `${parts[0].trim().charAt(0)} & ${parts[1].trim().charAt(0)}`;
    }
    return names.slice(0, 2).toUpperCase();
  };

  if (opened) return null;

  return (
    <div className={`fixed inset-0 z-50 ${theme.pageBg} flex flex-col items-center justify-between p-6 sm:p-10 text-center transition-opacity duration-700 font-sans`}>
      {/* Top subtle badge */}
      <div className="pt-6 animate-fade-in">
        <div className="inline-flex items-center space-x-2 px-4 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase font-mono tracking-[0.25em] text-amber-300">
          <Sparkles className="w-3 h-3 text-amber-400" />
          <span>Moonlight Production • Royal Suite</span>
        </div>
      </div>

      {/* Center Royal Monogram / Crest */}
      <div className="space-y-6 max-w-sm mx-auto my-auto animate-fade-in">
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-amber-400/50 p-1 flex items-center justify-center mx-auto relative shadow-2xl bg-black/40">
          <div className="w-full h-full rounded-full border border-amber-300/30 flex items-center justify-center bg-gradient-to-b from-amber-500/20 to-transparent">
            <span className={`font-serif text-2xl sm:text-3xl font-bold tracking-widest bg-gradient-to-r ${theme.goldGradient} bg-clip-text text-transparent`}>
              {getMonogram()}
            </span>
          </div>
          <span className="absolute -top-3 bg-black/80 px-2 text-sm">{theme.crestIcon || '👑'}</span>
        </div>

        <div className="space-y-2">
          <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-amber-200/70 block">
            {invitation.opening_heading || 'Cordially Invites You To The Celebration Of'}
          </span>
          <h1 className={`font-serif text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r ${theme.goldGradient} bg-clip-text text-transparent`}>
            {invitation.names || 'Aarav & Kiara'}
          </h1>
          <p className="text-xs text-amber-100/70 font-mono tracking-widest">
            {invitation.event_date ? new Date(invitation.event_date).toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' }) : 'November 20, 2026'}
          </p>
        </div>

        <div className="pt-4">
          <button
            onClick={handleOpen}
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold text-xs uppercase tracking-widest shadow-xl transform hover:scale-105 transition-all flex items-center justify-center space-x-2 mx-auto"
          >
            <span>Open Invitation</span>
            <Sparkles className="w-4 h-4 text-neutral-950" />
          </button>
        </div>
      </div>

      {/* Bottom hint */}
      <div className="pb-4 text-[10px] text-amber-200/40 uppercase font-mono tracking-widest flex flex-col items-center space-y-1">
        <span>Tap to Open</span>
        <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
      </div>
    </div>
  );
};

export default OpeningScreen;
