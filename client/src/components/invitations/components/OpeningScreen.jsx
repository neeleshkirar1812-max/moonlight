import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, ChevronDown, Music, Heart, Volume2, Play } from 'lucide-react';

/**
 * Web Audio API Royal Chime & Shehnai Synthesizer
 * Generates an opulent, harmonic Indian royal chime and resonance on door opening
 * with zero network dependencies or missing audio files.
 */
const playRoyalDoorChime = () => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const notes = [
      { freq: 440.0, time: 0.0, dur: 1.2, gain: 0.18 }, // A4
      { freq: 554.37, time: 0.15, dur: 1.4, gain: 0.22 }, // C#5
      { freq: 659.25, time: 0.3, dur: 1.6, gain: 0.24 }, // E5
      { freq: 880.0, time: 0.45, dur: 2.0, gain: 0.28 }, // A5
      { freq: 1108.73, time: 0.65, dur: 2.2, gain: 0.2 }, // C#6
      { freq: 1318.51, time: 0.85, dur: 2.5, gain: 0.15 }, // E6
    ];

    notes.forEach(({ freq, time, dur, gain }) => {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + time);
      
      gainNode.gain.setValueAtTime(0.001, ctx.currentTime + time);
      gainNode.gain.exponentialRampToValueAtTime(gain, ctx.currentTime + time + 0.08);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + time + dur);
      
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      osc.start(ctx.currentTime + time);
      osc.stop(ctx.currentTime + time + dur);
    });
  } catch (e) {
    console.warn('[Audio Chime Notice]:', e);
  }
};

const OpeningScreen = ({ invitation = {}, theme = {}, onEnter, isPreview = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRendered, setIsRendered] = useState(true);
  const [petals, setPetals] = useState([]);

  const getMonogram = () => {
    if (invitation.bride_name && invitation.groom_name) {
      return `${invitation.bride_name.trim().charAt(0)} & ${invitation.groom_name.trim().charAt(0)}`;
    }
    const names = invitation.names || 'Aarav & Kiara';
    const parts = names.split('&');
    if (parts.length >= 2) {
      return `${parts[0].trim().charAt(0)} & ${parts[1].trim().charAt(0)}`;
    }
    return names.slice(0, 2).toUpperCase();
  };

  const handleOpenDoors = (e) => {
    if (e) {
      e.stopPropagation();
    }
    if (isOpen) return;

    // 1. Play Royal Chime sound effect
    playRoyalDoorChime();

    // 2. Generate falling floral petal shower
    const newPetals = Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      left: Math.random() * 92 + 4,
      size: Math.random() * 12 + 10,
      delay: Math.random() * 0.3,
      duration: Math.random() * 1.4 + 1.2,
      rotation: Math.random() * 360,
      type: i % 3 === 0 ? '🌹' : i % 3 === 1 ? '🌼' : '✨',
    }));
    setPetals(newPetals);

    // 3. Trigger wax seal rotation & door opening animation
    setIsOpen(true);

    // 4. Notify parent to start background music
    if (onEnter) {
      onEnter();
    }

    // 5. Unmount opening screen after smooth animation
    setTimeout(() => {
      setIsRendered(false);
    }, 1000);
  };

  if (!isRendered) return null;

  return (
    <div
      onClick={handleOpenDoors}
      className={`${
        isPreview ? 'absolute' : 'fixed'
      } inset-0 z-50 flex items-center justify-center font-sans select-none w-full h-full cursor-pointer overflow-hidden transition-opacity duration-700 ${
        isOpen ? 'pointer-events-none opacity-0 delay-700 bg-transparent' : 'opacity-100 bg-black/95'
      }`}
      style={{
        perspective: '1200px',
      }}
    >
      {/* ------------------------------------------------------------- */}
      {/* ROYAL PALACE FRAME & DOORS CONTAINER */}
      {/* ------------------------------------------------------------- */}
      <div
        className="relative w-full h-full max-w-[440px] max-h-[740px] mx-auto overflow-hidden sm:rounded-3xl border sm:border-2 border-amber-400/50 shadow-[0_0_60px_rgba(212,175,55,0.4)] bg-[#1a0c04] flex flex-col justify-between"
      >
        {/* Palace Interior Glow (Revealed behind opening doors) */}
        <div className="absolute inset-0 z-0 flex flex-col items-center justify-center bg-gradient-to-b from-amber-500/25 via-amber-900/50 to-black text-center p-6">
          <div className="w-56 h-56 rounded-full bg-amber-400/30 blur-3xl animate-pulse" />
          <div className="z-10 space-y-2 animate-fade-in max-w-xs">
            <Sparkles className="w-8 h-8 text-amber-300 mx-auto animate-spin-slow" />
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-amber-100 tracking-tight leading-tight drop-shadow-md">
              {invitation.names || 'Aarav & Kiara'}
            </h3>
            <p className="text-[10px] uppercase font-mono tracking-[0.25em] text-amber-300 font-bold">
              Welcome To Our Celebration
            </p>
          </div>
        </div>

        {/* Top Hanging Royal Garland / Toran */}
        <div className="absolute top-0 inset-x-0 z-30 flex justify-center pointer-events-none">
          <div className="w-full h-7 bg-gradient-to-b from-amber-950 via-[#3d1a08] to-transparent border-b border-amber-400/50 flex items-center justify-around px-2 shadow">
            {Array.from({ length: 7 }).map((_, idx) => (
              <span key={idx} className="text-[10px] text-amber-300 drop-shadow">🌼</span>
            ))}
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* 1. LEFT PALACE DOOR */}
        {/* ------------------------------------------------------------- */}
        <div
          className="absolute top-0 bottom-0 left-0 w-1/2 z-20 flex flex-col justify-between p-3 border-r border-amber-400/80 shadow-2xl pointer-events-none transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]"
          style={{
            background: 'linear-gradient(135deg, #351404 0%, #5c2207 45%, #200902 100%)',
            transformOrigin: 'left center',
            transform: isOpen ? 'translateX(-100%) rotateY(-90deg)' : 'translateX(0) rotateY(0deg)',
            opacity: isOpen ? 0 : 1,
            boxShadow: 'inset -6px 0 20px rgba(0,0,0,0.9), inset 0 0 15px rgba(212, 175, 55, 0.25)',
          }}
        >
          {/* Inner Golden Border */}
          <div className="absolute inset-2 border border-amber-400/50 rounded-lg pointer-events-none" />

          {/* Top Jaali Arch */}
          <div className="relative z-10 w-full h-[15vh] min-h-[55px] max-h-[95px] rounded-t-lg border border-amber-400/60 bg-[#1c0a02]/90 p-1 flex flex-col items-center justify-center shadow-inner overflow-hidden">
            <svg className="w-full h-full text-amber-400/35 fill-current" viewBox="0 0 100 100">
              <path d="M50 5 C30 5 15 25 15 50 C15 75 30 95 50 95 C70 95 85 75 85 50 C85 25 70 5 50 5 Z M50 15 C65 15 75 30 75 50 C75 70 65 85 50 85 C35 85 25 70 25 50 C25 30 35 15 50 15 Z" />
              <circle cx="50" cy="50" r="10" />
            </svg>
            <div className="absolute top-1 left-1 text-[8px] text-amber-300">✦</div>
            <div className="absolute top-1 right-1 text-[8px] text-amber-300">✦</div>
          </div>

          {/* Brass Rivets */}
          <div className="flex items-center justify-around py-2">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div
                key={idx}
                className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-amber-200 via-amber-400 to-amber-700 shadow border border-amber-300/80"
              />
            ))}
          </div>

          {/* Left Lion Knocker */}
          <div className="absolute right-2 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-300 via-amber-500 to-amber-800 p-0.5 shadow-lg border border-amber-200 flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-neutral-900 flex items-center justify-center">
                <span className="text-xs">🦁</span>
              </div>
            </div>
            <div className="w-4 h-4 -mt-0.5 rounded-b-full border border-amber-400 shadow" />
          </div>

          {/* Bottom Carved Panel */}
          <div className="relative z-10 w-full h-[15vh] min-h-[50px] max-h-[90px] rounded-b-lg border border-amber-500/40 bg-[#120601]/90 p-1 flex flex-col items-center justify-center shadow-inner overflow-hidden">
            <svg className="w-full h-full text-amber-500/20 fill-current" viewBox="0 0 100 100">
              <polygon points="50,10 62,38 92,38 68,56 77,85 50,68 23,85 32,56 8,38 38,38" />
            </svg>
            <span className="text-[7px] uppercase font-mono tracking-widest text-amber-400/50">
              Royal
            </span>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* 2. RIGHT PALACE DOOR */}
        {/* ------------------------------------------------------------- */}
        <div
          className="absolute top-0 bottom-0 right-0 w-1/2 z-20 flex flex-col justify-between p-3 border-l border-amber-400/80 shadow-2xl pointer-events-none transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]"
          style={{
            background: 'linear-gradient(225deg, #351404 0%, #5c2207 45%, #200902 100%)',
            transformOrigin: 'right center',
            transform: isOpen ? 'translateX(100%) rotateY(90deg)' : 'translateX(0) rotateY(0deg)',
            opacity: isOpen ? 0 : 1,
            boxShadow: 'inset 6px 0 20px rgba(0,0,0,0.9), inset 0 0 15px rgba(212, 175, 55, 0.25)',
          }}
        >
          {/* Inner Golden Border */}
          <div className="absolute inset-2 border border-amber-400/50 rounded-lg pointer-events-none" />

          {/* Top Jaali Arch */}
          <div className="relative z-10 w-full h-[15vh] min-h-[55px] max-h-[95px] rounded-t-lg border border-amber-400/60 bg-[#1c0a02]/90 p-1 flex flex-col items-center justify-center shadow-inner overflow-hidden">
            <svg className="w-full h-full text-amber-400/35 fill-current" viewBox="0 0 100 100">
              <path d="M50 5 C30 5 15 25 15 50 C15 75 30 95 50 95 C70 95 85 75 85 50 C85 25 70 5 50 5 Z M50 15 C65 15 75 30 75 50 C75 70 65 85 50 85 C35 85 25 70 25 50 C25 30 35 15 50 15 Z" />
              <circle cx="50" cy="50" r="10" />
            </svg>
            <div className="absolute top-1 left-1 text-[8px] text-amber-300">✦</div>
            <div className="absolute top-1 right-1 text-[8px] text-amber-300">✦</div>
          </div>

          {/* Brass Rivets */}
          <div className="flex items-center justify-around py-2">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div
                key={idx}
                className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-amber-200 via-amber-400 to-amber-700 shadow border border-amber-300/80"
              />
            ))}
          </div>

          {/* Right Lion Knocker */}
          <div className="absolute left-2 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-300 via-amber-500 to-amber-800 p-0.5 shadow-lg border border-amber-200 flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-neutral-900 flex items-center justify-center">
                <span className="text-xs">🦁</span>
              </div>
            </div>
            <div className="w-4 h-4 -mt-0.5 rounded-b-full border border-amber-400 shadow" />
          </div>

          {/* Bottom Carved Panel */}
          <div className="relative z-10 w-full h-[15vh] min-h-[50px] max-h-[90px] rounded-b-lg border border-amber-500/40 bg-[#120601]/90 p-1 flex flex-col items-center justify-center shadow-inner overflow-hidden">
            <svg className="w-full h-full text-amber-500/20 fill-current" viewBox="0 0 100 100">
              <polygon points="50,10 62,38 92,38 68,56 77,85 50,68 23,85 32,56 8,38 38,38" />
            </svg>
            <span className="text-[7px] uppercase font-mono tracking-widest text-amber-400/50">
              Heritage
            </span>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* 3. CENTER WAX SEAL (ROTATING UNLOCK) & CALL-TO-ACTION */}
        {/* ------------------------------------------------------------- */}
        <div
          className="absolute inset-0 z-40 flex flex-col items-center justify-center pointer-events-auto p-4 transition-all duration-700"
          style={{
            transform: isOpen ? 'scale(1.2)' : 'scale(1)',
            opacity: isOpen ? 0 : 1,
            pointerEvents: isOpen ? 'none' : 'auto',
          }}
        >
          {/* Top Tagline */}
          <span className="text-[9px] uppercase font-mono tracking-[0.25em] text-amber-300/90 font-bold drop-shadow mb-3">
            {invitation.opening_heading || 'Cordially Invites You To Celebrate'}
          </span>

          {/* Rotating Wax Seal Medallion */}
          <div
            onClick={handleOpenDoors}
            className="cursor-pointer group relative flex flex-col items-center justify-center transition-all duration-1000"
            style={{
              transform: isOpen ? 'rotate(720deg) scale(1.3)' : 'rotate(0deg) scale(1)',
              transition: 'transform 0.9s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.5s ease',
            }}
          >
            {/* Glowing Ring Auras */}
            <div className="absolute -inset-4 rounded-full bg-amber-400/30 blur-md animate-ping duration-1000" />
            <div className="absolute -inset-1.5 rounded-full bg-amber-300/40 blur-sm animate-pulse" />

            {/* Wax Seal 3D Body */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-[#990000] via-[#660000] to-[#330000] p-1.5 shadow-[0_0_30px_rgba(245,158,11,0.5)] border-2 border-amber-300 relative flex items-center justify-center group-hover:scale-105 active:scale-95 transition-transform">
              <div className="w-full h-full rounded-full border border-dashed border-amber-300/70 flex flex-col items-center justify-center bg-gradient-to-b from-amber-500/25 to-black/70 text-center p-1">
                <span className="text-sm">{theme.crestIcon || '👑'}</span>
                
                {/* Couple Monogram Initials */}
                <span className="font-serif text-lg sm:text-xl font-bold tracking-widest bg-gradient-to-r from-amber-200 via-yellow-200 to-amber-100 bg-clip-text text-transparent drop-shadow-md leading-none my-0.5">
                  {getMonogram()}
                </span>

                <span className="text-[6.5px] uppercase font-mono tracking-widest text-amber-200 font-bold">
                  Royal Seal
                </span>
              </div>

              {/* Mini Badge */}
              <div className="absolute -top-1 px-2 py-0.2 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-[7px] font-mono font-bold text-neutral-950 uppercase tracking-widest border border-amber-200 shadow">
                Royal
              </div>
            </div>
          </div>

          {/* Couple Heading */}
          <div className="mt-3 text-center space-y-0.5 max-w-[280px]">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-white tracking-tight drop-shadow-md leading-tight">
              {invitation.names || 'Aarav & Kiara'}
            </h2>
            <p className="text-[9px] text-amber-200/80 font-mono tracking-wider">
              {invitation.event_date || invitation.date
                ? new Date(invitation.event_date || invitation.date).toLocaleDateString('en-IN', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })
                : 'Nov 20, 2026'}
            </p>
          </div>

          {/* Action Button */}
          <div className="mt-3">
            <button
              type="button"
              onClick={handleOpenDoors}
              className="px-5 py-2 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold text-[10.5px] uppercase tracking-wider shadow-lg transform hover:scale-105 active:scale-95 transition-all flex items-center justify-center space-x-1.5 border border-amber-200 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-neutral-950 animate-spin-slow" />
              <span>Tap Seal to Open Doors</span>
            </button>
          </div>

          {/* Tap / Scroll Hint */}
          <div className="mt-2 flex flex-col items-center space-y-0.5 text-[8px] text-amber-300/80 uppercase font-mono tracking-widest animate-pulse">
            <span>Tap to Enter Palace</span>
            <ChevronDown className="w-3 h-3 animate-bounce text-amber-400" />
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* 4. FLORAL PETAL CONFETTI SHOWER */}
        {/* ------------------------------------------------------------- */}
        {isOpen && (
          <div className="absolute inset-0 z-50 pointer-events-none overflow-hidden">
            {petals.map((petal) => (
              <div
                key={petal.id}
                className="absolute"
                style={{
                  left: `${petal.left}%`,
                  top: '-20px',
                  animation: `fall-petal ${petal.duration}s linear ${petal.delay}s forwards`,
                  transform: `rotate(${petal.rotation}deg)`,
                }}
              >
                <span
                  style={{ fontSize: `${petal.size}px` }}
                  className="drop-shadow-md select-none"
                >
                  {petal.type}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Global Petal Falling & Spin Keyframes */}
      <style>{`
        @keyframes fall-petal {
          0% {
            transform: translateY(0) rotate(0deg) scale(0.8);
            opacity: 1;
          }
          50% {
            transform: translateY(40vh) rotate(180deg) scale(1.1);
            opacity: 0.9;
          }
          100% {
            transform: translateY(85vh) rotate(360deg) scale(0.6);
            opacity: 0;
          }
        }
        .animate-spin-slow {
          animation: spin 12s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default OpeningScreen;
