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
  const [videoPlaying, setVideoPlaying] = useState(false);
  const videoRef = useRef(null);

  const videoUrl = invitation.door_video_url || invitation.doorVideoUrl;
  const isVideoMode = Boolean(videoUrl);

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

  const handleOpenDoors = () => {
    if (isOpen) return;

    // 1. Play Royal Chime sound effect
    playRoyalDoorChime();

    // 2. Generate falling floral petal shower
    const newPetals = Array.from({ length: 22 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 10 + 7,
      delay: Math.random() * 0.5,
      duration: Math.random() * 1.5 + 1.5,
      rotation: Math.random() * 360,
      color: i % 2 === 0 ? 'rose' : 'marigold',
    }));
    setPetals(newPetals);

    // 3. Trigger door 3D opening animation
    setIsOpen(true);

    // 4. Notify parent to start music & unlock main view
    if (onEnter) {
      onEnter();
    }

    // 5. Unmount opening screen after animation finishes
    setTimeout(() => {
      setIsRendered(false);
    }, 1400);
  };

  const handleWheelOrTouch = () => {
    if (!isOpen) {
      handleOpenDoors();
    }
  };

  if (!isRendered) return null;

  return (
    <div
      onWheel={handleWheelOrTouch}
      onTouchMove={handleWheelOrTouch}
      className={`${
        isPreview ? 'absolute' : 'fixed'
      } inset-0 z-50 flex items-center justify-center overflow-hidden font-sans select-none transition-all duration-700 p-2 sm:p-4 ${
        isOpen ? 'pointer-events-none opacity-0 delay-700 bg-transparent' : 'opacity-100 bg-black/90'
      }`}
      style={{
        perspective: '1400px',
      }}
    >
      {/* ========================================================================= */}
      {/* 1. CUSTOM VIDEO OPENING MODE (If video URL is provided) */}
      {/* ========================================================================= */}
      {isVideoMode ? (
        <div className="relative w-full h-full max-w-[360px] sm:max-w-md max-h-[640px] sm:max-h-[720px] mx-auto rounded-2xl sm:rounded-3xl border-2 border-amber-400 shadow-2xl flex flex-col items-center justify-center bg-black overflow-hidden">
          <video
            ref={videoRef}
            src={videoUrl}
            playsInline
            muted={false}
            onEnded={() => {
              setIsOpen(true);
              if (onEnter) onEnter();
              setTimeout(() => setIsRendered(false), 500);
            }}
            className="w-full h-full object-contain sm:object-cover object-center"
          />
          {!videoPlaying && (
            <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center p-4 text-center space-y-3">
              <div className="w-14 h-14 sm:w-18 sm:h-18 rounded-full border-2 border-amber-400 flex items-center justify-center shadow-2xl bg-black/70 backdrop-blur-md animate-pulse">
                <span className="font-serif text-lg sm:text-xl font-bold text-amber-300">
                  {getMonogram()}
                </span>
              </div>
              <div className="space-y-1 max-w-xs">
                <span className="text-[8px] uppercase font-mono tracking-[0.25em] text-amber-300">
                  Moonlight Production
                </span>
                <h2 className="font-serif text-lg sm:text-xl font-bold text-white leading-tight">
                  {invitation.names || 'Royal Wedding Invitation'}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => {
                  setVideoPlaying(true);
                  if (videoRef.current) {
                    videoRef.current.play().catch(() => {});
                  }
                  if (onEnter) onEnter();
                }}
                className="px-5 py-2 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-neutral-950 font-bold text-[11px] uppercase tracking-wider shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center space-x-1.5 cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Watch Grand Door Opening</span>
              </button>
            </div>
          )}
        </div>
      ) : (
        /* ========================================================================= */
        /* 2. RESPONSIVE 3D ROYAL PALACE DOUBLE DOORS (Guaranteed Render & Perfect Proportions) */
        /* ========================================================================= */
        <div
          onClick={handleOpenDoors}
          className="w-full max-w-[360px] sm:max-w-md h-full max-h-[640px] relative flex flex-col justify-between overflow-hidden rounded-2xl sm:rounded-3xl border-2 sm:border-4 border-amber-400 shadow-[0_0_50px_rgba(245,158,11,0.5)] bg-[#1e0e05] select-none cursor-pointer"
        >
          
          {/* Inner Palace Radiant Glow Backdrop (Revealed when doors swing open) */}
          <div className="absolute inset-0 z-0 flex flex-col items-center justify-center bg-gradient-to-b from-amber-500/20 via-amber-900/40 to-black/80 text-center p-4">
            <div className="w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-amber-400/30 blur-2xl animate-pulse" />
            <div className="space-y-1.5 z-10 animate-fade-in max-w-xs">
              <Sparkles className="w-6 h-6 text-amber-300 mx-auto animate-spin-slow" />
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-amber-100 tracking-tight leading-tight drop-shadow-md">
                {invitation.names || 'Aarav & Kiara'}
              </h3>
              <p className="text-[10px] uppercase font-mono tracking-[0.25em] text-amber-300 font-bold">
                Welcome To Our Celebration
              </p>
            </div>
          </div>

          {/* Top Hanging Royal Palace Toran / Garland */}
          <div className="absolute top-0 inset-x-0 z-40 flex justify-center pointer-events-none">
            <div className="w-full px-1.5">
              <div className="h-8 sm:h-9 w-full bg-gradient-to-b from-amber-950 via-[#3d1a08] to-transparent border-b border-amber-400/60 flex items-center justify-around px-1 shadow-md">
                {Array.from({ length: 7 }).map((_, idx) => (
                  <div key={idx} className="flex flex-col items-center -space-y-0.5">
                    <span className="text-[10px] sm:text-xs text-amber-300 drop-shadow">🌼</span>
                    <div className="w-0.5 h-2 bg-amber-500/70" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* THE 3D DOUBLE DOORS CONTAINER */}
          {/* ========================================================================= */}
          <div className="absolute inset-0 z-20 flex w-full h-full overflow-hidden pointer-events-none">
            
            {/* ------------------------------------------------------------- */}
            {/* LEFT PALACE DOOR */}
            {/* ------------------------------------------------------------- */}
            <div
              className="w-1/2 h-full relative flex flex-col justify-between p-2 sm:p-3 border-r-2 border-amber-400 shadow-2xl transition-all duration-[1200ms] ease-[cubic-bezier(0.25,1,0.5,1)]"
              style={{
                background: 'linear-gradient(135deg, #451d08 0%, #78350f 45%, #2e1003 100%)',
                transformOrigin: 'left center',
                transform: isOpen ? 'rotateY(-105deg) scale(0.95)' : 'rotateY(0deg) scale(1)',
                boxShadow: 'inset -6px 0 20px rgba(0,0,0,0.9), inset 0 0 15px rgba(245, 158, 11, 0.3)',
              }}
            >
              {/* Outer Golden Border Filigree */}
              <div className="absolute inset-1 sm:inset-2 border-2 border-amber-400/60 rounded-lg pointer-events-none" />

              {/* Top Jaali Arch Carved Panel (Left) */}
              <div className="relative z-10 w-full h-[16vh] min-h-[60px] max-h-[100px] rounded-t-lg sm:rounded-t-xl border-2 border-amber-400/70 bg-[#250d03]/95 p-1 flex flex-col items-center justify-center shadow-inner overflow-hidden">
                <svg className="w-full h-full text-amber-400/40 fill-current" viewBox="0 0 100 100">
                  <path d="M50 5 C30 5 15 25 15 50 C15 75 30 95 50 95 C70 95 85 75 85 50 C85 25 70 5 50 5 Z M50 15 C65 15 75 30 75 50 C75 70 65 85 50 85 C35 85 25 70 25 50 C25 30 35 15 50 15 Z" />
                  <circle cx="50" cy="50" r="10" />
                  <line x1="0" y1="50" x2="100" y2="50" stroke="currentColor" strokeWidth="2" />
                  <line x1="50" y1="0" x2="50" y2="100" stroke="currentColor" strokeWidth="2" />
                </svg>
                <div className="absolute top-0.5 left-1 text-[8px] text-amber-300 font-bold">✦</div>
                <div className="absolute top-0.5 right-1 text-[8px] text-amber-300 font-bold">✦</div>
              </div>

              {/* Rows of 24K Brass Studs (Rivets) */}
              <div className="flex items-center justify-around py-1 sm:py-2">
                {Array.from({ length: 3 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-gradient-to-br from-amber-200 via-amber-400 to-amber-700 shadow border border-amber-300/80 flex items-center justify-center"
                  >
                    <div className="w-0.5 h-0.5 rounded-full bg-amber-900/50" />
                  </div>
                ))}
              </div>

              {/* Left Door Center Knocker / Brass Lion Ring */}
              <div className="absolute right-1.5 sm:right-2 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center pointer-events-none">
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-br from-amber-300 via-amber-500 to-amber-800 p-0.5 shadow-lg border border-amber-200/80 flex items-center justify-center">
                  <div className="w-full h-full rounded-full bg-neutral-900 flex items-center justify-center">
                    <span className="text-[10px] sm:text-xs">🦁</span>
                  </div>
                </div>
                <div className="w-3.5 h-4 sm:w-4 sm:h-5 -mt-0.5 rounded-b-full border border-amber-400 shadow" />
              </div>

              {/* Bottom Carved Lotus Panel (Left) */}
              <div className="relative z-10 w-full h-[16vh] min-h-[55px] max-h-[95px] rounded-b-lg sm:rounded-b-xl border border-amber-500/40 bg-[#100803]/90 p-1 flex flex-col items-center justify-center shadow-inner overflow-hidden">
                <svg className="w-full h-full text-amber-500/20 fill-current" viewBox="0 0 100 100">
                  <polygon points="50,10 62,38 92,38 68,56 77,85 50,68 23,85 32,56 8,38 38,38" />
                </svg>
                <span className="text-[7px] uppercase font-mono tracking-widest text-amber-400/40">
                  Royal
                </span>
              </div>
            </div>

            {/* ------------------------------------------------------------- */}
            {/* RIGHT PALACE DOOR */}
            {/* ------------------------------------------------------------- */}
            <div
              className="w-1/2 h-full relative flex flex-col justify-between p-2 sm:p-3 border-l-2 border-amber-400 shadow-2xl transition-all duration-[1200ms] ease-[cubic-bezier(0.25,1,0.5,1)]"
              style={{
                background: 'linear-gradient(225deg, #451d08 0%, #78350f 45%, #2e1003 100%)',
                transformOrigin: 'right center',
                transform: isOpen ? 'rotateY(105deg) scale(0.95)' : 'rotateY(0deg) scale(1)',
                boxShadow: 'inset 6px 0 20px rgba(0,0,0,0.9), inset 0 0 15px rgba(245, 158, 11, 0.3)',
              }}
            >
              {/* Outer Golden Border Filigree */}
              <div className="absolute inset-1 sm:inset-2 border-2 border-amber-400/60 rounded-lg pointer-events-none" />

              {/* Top Jaali Arch Carved Panel (Right) */}
              <div className="relative z-10 w-full h-[16vh] min-h-[60px] max-h-[100px] rounded-t-lg sm:rounded-t-xl border-2 border-amber-400/70 bg-[#250d03]/95 p-1 flex flex-col items-center justify-center shadow-inner overflow-hidden">
                <svg className="w-full h-full text-amber-400/40 fill-current" viewBox="0 0 100 100">
                  <path d="M50 5 C30 5 15 25 15 50 C15 75 30 95 50 95 C70 95 85 75 85 50 C85 25 70 5 50 5 Z M50 15 C65 15 75 30 75 50 C75 70 65 85 50 85 C35 85 25 70 25 50 C25 30 35 15 50 15 Z" />
                  <circle cx="50" cy="50" r="10" />
                  <line x1="0" y1="50" x2="100" y2="50" stroke="currentColor" strokeWidth="2" />
                  <line x1="50" y1="0" x2="50" y2="100" stroke="currentColor" strokeWidth="2" />
                </svg>
                <div className="absolute top-0.5 left-1 text-[8px] text-amber-300 font-bold">✦</div>
                <div className="absolute top-0.5 right-1 text-[8px] text-amber-300 font-bold">✦</div>
              </div>

              {/* Rows of 24K Brass Studs (Rivets) */}
              <div className="flex items-center justify-around py-1 sm:py-2">
                {Array.from({ length: 3 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 shadow-md border border-amber-200 flex items-center justify-center"
                  >
                    <div className="w-0.5 h-0.5 rounded-full bg-amber-950/60" />
                  </div>
                ))}
              </div>

              {/* Right Door Center Knocker / Brass Lion Ring */}
              <div className="absolute left-1.5 sm:left-2 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center pointer-events-none">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 p-0.5 shadow-xl border border-amber-200 flex items-center justify-center">
                  <div className="w-full h-full rounded-full bg-neutral-950 flex items-center justify-center">
                    <span className="text-[11px] sm:text-xs">🦁</span>
                  </div>
                </div>
                <div className="w-4 h-4 sm:w-4.5 sm:h-5 -mt-0.5 rounded-b-full border-2 border-amber-300 shadow" />
              </div>

              {/* Bottom Carved Lotus Panel (Right) */}
              <div className="relative z-10 w-full h-[16vh] min-h-[60px] max-h-[100px] rounded-b-lg sm:rounded-b-xl border-2 border-amber-400/70 bg-[#250d03]/95 p-1 flex flex-col items-center justify-center shadow-inner overflow-hidden">
                <svg className="w-full h-full text-amber-400/35 fill-current" viewBox="0 0 100 100">
                  <polygon points="50,10 62,38 92,38 68,56 77,85 50,68 23,85 32,56 8,38 38,38" />
                </svg>
                <span className="text-[8px] uppercase font-mono tracking-widest text-amber-300 font-bold">
                  Heritage
                </span>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* CENTER ROYAL WAX SEAL & UNLOCK CTA (Bridging the seam between the doors) */}
          {/* ========================================================================= */}
          <div
            className={`absolute z-40 inset-0 flex flex-col items-center justify-center pointer-events-auto p-2 sm:p-3 transition-all duration-700 ${
              isOpen ? 'scale-125 opacity-0 pointer-events-none' : 'scale-100 opacity-100'
            }`}
          >
            {/* Royal Wax Seal Monogram Medallion */}
            <div
              onClick={handleOpenDoors}
              className="cursor-pointer group relative flex flex-col items-center justify-center transition-transform duration-300 hover:scale-105 active:scale-95"
            >
              {/* Pulsating Radiance Rings */}
              <div className="absolute -inset-3 rounded-full bg-amber-400/30 blur-md animate-ping duration-1000" />
              <div className="absolute -inset-1 rounded-full bg-amber-300/40 blur-sm animate-pulse" />

              {/* The Wax Seal Outer Ring */}
              <div className="w-18 h-18 sm:w-22 sm:h-22 rounded-full bg-gradient-to-br from-[#990000] via-[#660000] to-[#330000] p-1.5 shadow-2xl border-2 border-amber-300 relative flex items-center justify-center">
                <div className="w-full h-full rounded-full border border-dashed border-amber-300/70 flex flex-col items-center justify-center bg-gradient-to-b from-amber-500/25 to-black/60 text-center p-0.5">
                  <span className="text-xs sm:text-sm">{theme.crestIcon || '👑'}</span>
                  
                  {/* Couple Monogram Initials */}
                  <span className="font-serif text-lg sm:text-xl font-bold tracking-widest bg-gradient-to-r from-amber-200 via-yellow-200 to-amber-100 bg-clip-text text-transparent drop-shadow-md">
                    {getMonogram()}
                  </span>

                  <span className="text-[7px] uppercase font-mono tracking-widest text-amber-200 font-bold">
                    Royal Seal
                  </span>
                </div>

                <div className="absolute -top-1.5 px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-[7px] sm:text-[8px] font-mono font-bold text-neutral-950 uppercase tracking-widest border border-amber-200 shadow-md">
                  Royal
                </div>
              </div>
            </div>

            {/* Couple Heading Details */}
            <div className="mt-2.5 text-center space-y-0.5 max-w-[280px] px-1">
              <span className="text-[8px] sm:text-[9px] uppercase font-mono tracking-[0.2em] text-amber-300/90 font-bold block drop-shadow">
                {invitation.opening_heading || 'Cordially Invites You To Celebrate'}
              </span>

              <h2 className="font-serif text-base sm:text-xl font-bold text-white tracking-tight drop-shadow-md leading-tight">
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

            {/* Tap To Open Call-To-Action Button */}
            <div className="mt-2.5">
              <button
                type="button"
                onClick={handleOpenDoors}
                className="group relative px-4 sm:px-5 py-2 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold text-[10px] sm:text-[11px] uppercase tracking-wider shadow-lg transform hover:scale-105 active:scale-95 transition-all flex items-center justify-center space-x-1 border border-amber-200"
              >
                <Sparkles className="w-3 h-3 text-neutral-950 animate-spin-slow" />
                <span>Open Royal Palace Doors</span>
              </button>
            </div>

            {/* Bottom Scroll / Tap Hint */}
            <div className="mt-2 flex flex-col items-center space-y-0.5 text-[8px] sm:text-[9px] text-amber-300/80 uppercase font-mono tracking-widest animate-pulse">
              <span>Scroll Down or Tap to Enter</span>
              <ChevronDown className="w-3 h-3 animate-bounce text-amber-400" />
            </div>
          </div>

          {/* ========================================================================= */}
          {/* FALLING FLORAL PETAL CONFETTI SHOWER */}
          {/* ========================================================================= */}
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
                    {petal.color === 'rose' ? '🌹' : '🌼'}
                  </span>
                </div>
              ))}
            </div>
          )}

        </div>
      )}

      {/* Global Petal Falling CSS Keyframes */}
      <style>{`
        @keyframes fall-petal {
          0% {
            transform: translateY(0) rotate(0deg) scale(0.8);
            opacity: 1;
          }
          50% {
            transform: translateY(50vh) rotate(180deg) scale(1.1);
            opacity: 0.9;
          }
          100% {
            transform: translateY(105vh) rotate(360deg) scale(0.6);
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
