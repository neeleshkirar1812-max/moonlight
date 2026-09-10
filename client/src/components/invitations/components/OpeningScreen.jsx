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
      
      // Warm sine + harmonic warmth
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
    const newPetals = Array.from({ length: 32 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 14 + 10,
      delay: Math.random() * 0.8,
      duration: Math.random() * 2 + 2,
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
    }, 1800);
  };

  const handleVideoEnd = () => {
    setIsOpen(true);
    if (onEnter) onEnter();
    setTimeout(() => setIsRendered(false), 800);
  };

  if (!isRendered) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden font-sans select-none transition-opacity duration-700 ${
        isOpen ? 'pointer-events-none opacity-0 delay-1000' : 'opacity-100'
      }`}
      style={{
        perspective: '1500px',
        backgroundColor: '#0c0704',
      }}
    >
      {/* ========================================================================= */}
      {/* 1. CUSTOM VIDEO OPENING MODE (If video URL is provided) */}
      {/* ========================================================================= */}
      {isVideoMode ? (
        <div className="relative w-full h-full flex flex-col items-center justify-center bg-black">
          <video
            ref={videoRef}
            src={videoUrl}
            playsInline
            onEnded={handleVideoEnd}
            className="w-full h-full object-cover"
          />
          {!videoPlaying && (
            <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center p-6 text-center space-y-6">
              <div className="w-20 h-20 rounded-full border-2 border-amber-400 flex items-center justify-center shadow-2xl bg-black/60 backdrop-blur-md animate-pulse">
                <span className="font-serif text-2xl font-bold text-amber-300">
                  {getMonogram()}
                </span>
              </div>
              <div className="space-y-2 max-w-sm">
                <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-amber-300">
                  Moonlight Production
                </span>
                <h2 className="font-serif text-3xl font-bold text-white">
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
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-neutral-950 font-bold text-xs uppercase tracking-widest shadow-2xl hover:scale-105 transition-all flex items-center space-x-2"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Watch Grand Door Opening</span>
              </button>
            </div>
          )}
        </div>
      ) : (
        /* ========================================================================= */
        /* 2. OPULENT 3D ROYAL PALACE DOUBLE DOORS (Default Majestic Experience) */
        /* ========================================================================= */
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
          
          {/* Inner Palace Radiant Glow Backdrop (Revealed when doors swing open) */}
          <div className="absolute inset-0 z-0 flex flex-col items-center justify-center bg-gradient-to-b from-[#2B1B10] via-[#1A0E08] to-[#0A0503] text-center p-6">
            <div className="w-96 h-96 rounded-full bg-amber-500/20 blur-3xl animate-pulse" />
            <div className="space-y-3 z-10 animate-fade-in">
              <Sparkles className="w-8 h-8 text-amber-400 mx-auto animate-spin-slow" />
              <h3 className="font-serif text-3xl sm:text-5xl font-bold text-amber-200 tracking-tight">
                {invitation.names || 'Aarav & Kiara'}
              </h3>
              <p className="text-xs uppercase font-mono tracking-[0.3em] text-amber-400/80">
                Welcome To Our Celebration
              </p>
            </div>
          </div>

          {/* Top Hanging Royal Palace Toran / Garland */}
          <div className="absolute top-0 inset-x-0 z-40 flex justify-center pointer-events-none">
            <div className="relative w-full max-w-2xl px-4">
              {/* Mughal Scalloped Arch Frame */}
              <div className="h-10 sm:h-12 w-full bg-gradient-to-b from-amber-950 via-[#2E180A] to-transparent border-b-2 border-amber-500/40 flex items-center justify-around px-2 shadow-2xl">
                {Array.from({ length: 11 }).map((_, idx) => (
                  <div key={idx} className="flex flex-col items-center -space-y-1">
                    <span className="text-xs sm:text-sm text-amber-400 drop-shadow">🌼</span>
                    <div className="w-0.5 h-3 bg-amber-600/60" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Left Palace Wall Column / Lantern */}
          <div className="absolute left-2 sm:left-6 top-16 z-40 hidden sm:flex flex-col items-center space-y-2 pointer-events-none">
            <div className="w-0.5 h-12 bg-amber-600/40" />
            <div className="w-8 h-10 rounded-b-xl border border-amber-500/60 bg-amber-950/80 backdrop-blur-md flex items-center justify-center shadow-lg shadow-amber-500/20">
              <span className="text-sm animate-pulse">🪔</span>
            </div>
          </div>

          {/* Right Palace Wall Column / Lantern */}
          <div className="absolute right-2 sm:right-6 top-16 z-40 hidden sm:flex flex-col items-center space-y-2 pointer-events-none">
            <div className="w-0.5 h-12 bg-amber-600/40" />
            <div className="w-8 h-10 rounded-b-xl border border-amber-500/60 bg-amber-950/80 backdrop-blur-md flex items-center justify-center shadow-lg shadow-amber-500/20">
              <span className="text-sm animate-pulse">🪔</span>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* THE 3D DOUBLE DOORS CONTAINER */}
          {/* ========================================================================= */}
          <div className="relative w-full h-full flex z-20">
            
            {/* ------------------------------------------------------------- */}
            {/* LEFT PALACE DOOR */}
            {/* ------------------------------------------------------------- */}
            <div
              className="w-1/2 h-full relative flex flex-col justify-between p-3 sm:p-6 border-r border-amber-500/50 shadow-2xl transition-all duration-[1500ms] ease-[cubic-bezier(0.25,1,0.5,1)]"
              style={{
                background: 'linear-gradient(135deg, #1f1208 0%, #2e1a0d 45%, #190e06 100%)',
                transformOrigin: 'left center',
                transform: isOpen ? 'rotateY(-112deg) scale(1.02)' : 'rotateY(0deg)',
                boxShadow: 'inset -8px 0 25px rgba(0,0,0,0.85), inset 0 0 15px rgba(217, 119, 6, 0.25)',
              }}
            >
              {/* Outer Golden Border Filigree */}
              <div className="absolute inset-2 sm:inset-4 border border-amber-500/30 rounded-lg pointer-events-none" />
              <div className="absolute inset-3 sm:inset-5 border border-amber-400/15 rounded-md pointer-events-none" />

              {/* Top Jaali Arch Carved Panel (Left) */}
              <div className="relative z-10 w-full h-40 sm:h-56 rounded-t-2xl border-2 border-amber-500/40 bg-[#140b05]/90 p-3 flex flex-col items-center justify-center shadow-inner overflow-hidden">
                {/* SVG Mughal Jaali Lattice Motif */}
                <svg className="w-full h-full text-amber-500/25 fill-current" viewBox="0 0 100 100">
                  <path d="M50 5 C30 5 15 25 15 50 C15 75 30 95 50 95 C70 95 85 75 85 50 C85 25 70 5 50 5 Z M50 15 C65 15 75 30 75 50 C75 70 65 85 50 85 C35 85 25 70 25 50 C25 30 35 15 50 15 Z" />
                  <circle cx="50" cy="50" r="10" />
                  <line x1="0" y1="50" x2="100" y2="50" stroke="currentColor" strokeWidth="2" />
                  <line x1="50" y1="0" x2="50" y2="100" stroke="currentColor" strokeWidth="2" />
                </svg>
                <div className="absolute top-2 left-2 text-[10px] text-amber-400/70">✦</div>
                <div className="absolute top-2 right-2 text-[10px] text-amber-400/70">✦</div>
              </div>

              {/* Rows of 24K Brass Studs (Rivets) */}
              <div className="flex items-center justify-around py-3">
                {Array.from({ length: 4 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-gradient-to-br from-amber-200 via-amber-400 to-amber-700 shadow-md border border-amber-300/80 flex items-center justify-center"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-900/50" />
                  </div>
                ))}
              </div>

              {/* Left Door Center Knocker / Brass Lion Ring */}
              <div className="absolute right-4 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-amber-300 via-amber-500 to-amber-800 p-0.5 shadow-2xl border border-amber-200/80 flex items-center justify-center">
                  <div className="w-full h-full rounded-full bg-neutral-900 flex items-center justify-center">
                    <span className="text-base sm:text-lg">🦁</span>
                  </div>
                </div>
                {/* Brass Ring Hanging */}
                <div className="w-6 h-8 sm:w-7 sm:h-9 -mt-2 rounded-b-full border-4 border-amber-400 shadow-lg" />
              </div>

              {/* Bottom Carved Lotus Panel (Left) */}
              <div className="relative z-10 w-full h-40 sm:h-56 rounded-b-2xl border-2 border-amber-500/40 bg-[#140b05]/90 p-3 flex flex-col items-center justify-center shadow-inner overflow-hidden">
                <svg className="w-full h-full text-amber-500/20 fill-current" viewBox="0 0 100 100">
                  <polygon points="50,10 62,38 92,38 68,56 77,85 50,68 23,85 32,56 8,38 38,38" />
                </svg>
                <span className="text-[10px] uppercase font-mono tracking-widest text-amber-400/40 mt-1">
                  Moonlight
                </span>
              </div>
            </div>

            {/* ------------------------------------------------------------- */}
            {/* RIGHT PALACE DOOR */}
            {/* ------------------------------------------------------------- */}
            <div
              className="w-1/2 h-full relative flex flex-col justify-between p-3 sm:p-6 border-l border-amber-500/50 shadow-2xl transition-all duration-[1500ms] ease-[cubic-bezier(0.25,1,0.5,1)]"
              style={{
                background: 'linear-gradient(225deg, #1f1208 0%, #2e1a0d 45%, #190e06 100%)',
                transformOrigin: 'right center',
                transform: isOpen ? 'rotateY(112deg) scale(1.02)' : 'rotateY(0deg)',
                boxShadow: 'inset 8px 0 25px rgba(0,0,0,0.85), inset 0 0 15px rgba(217, 119, 6, 0.25)',
              }}
            >
              {/* Outer Golden Border Filigree */}
              <div className="absolute inset-2 sm:inset-4 border border-amber-500/30 rounded-lg pointer-events-none" />
              <div className="absolute inset-3 sm:inset-5 border border-amber-400/15 rounded-md pointer-events-none" />

              {/* Top Jaali Arch Carved Panel (Right) */}
              <div className="relative z-10 w-full h-40 sm:h-56 rounded-t-2xl border-2 border-amber-500/40 bg-[#140b05]/90 p-3 flex flex-col items-center justify-center shadow-inner overflow-hidden">
                <svg className="w-full h-full text-amber-500/25 fill-current" viewBox="0 0 100 100">
                  <path d="M50 5 C30 5 15 25 15 50 C15 75 30 95 50 95 C70 95 85 75 85 50 C85 25 70 5 50 5 Z M50 15 C65 15 75 30 75 50 C75 70 65 85 50 85 C35 85 25 70 25 50 C25 30 35 15 50 15 Z" />
                  <circle cx="50" cy="50" r="10" />
                  <line x1="0" y1="50" x2="100" y2="50" stroke="currentColor" strokeWidth="2" />
                  <line x1="50" y1="0" x2="50" y2="100" stroke="currentColor" strokeWidth="2" />
                </svg>
                <div className="absolute top-2 left-2 text-[10px] text-amber-400/70">✦</div>
                <div className="absolute top-2 right-2 text-[10px] text-amber-400/70">✦</div>
              </div>

              {/* Rows of 24K Brass Studs (Rivets) */}
              <div className="flex items-center justify-around py-3">
                {Array.from({ length: 4 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-gradient-to-br from-amber-200 via-amber-400 to-amber-700 shadow-md border border-amber-300/80 flex items-center justify-center"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-900/50" />
                  </div>
                ))}
              </div>

              {/* Right Door Center Knocker / Brass Lion Ring */}
              <div className="absolute left-4 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-amber-300 via-amber-500 to-amber-800 p-0.5 shadow-2xl border border-amber-200/80 flex items-center justify-center">
                  <div className="w-full h-full rounded-full bg-neutral-900 flex items-center justify-center">
                    <span className="text-base sm:text-lg">🦁</span>
                  </div>
                </div>
                <div className="w-6 h-8 sm:w-7 sm:h-9 -mt-2 rounded-b-full border-4 border-amber-400 shadow-lg" />
              </div>

              {/* Bottom Carved Lotus Panel (Right) */}
              <div className="relative z-10 w-full h-40 sm:h-56 rounded-b-2xl border-2 border-amber-500/40 bg-[#140b05]/90 p-3 flex flex-col items-center justify-center shadow-inner overflow-hidden">
                <svg className="w-full h-full text-amber-500/20 fill-current" viewBox="0 0 100 100">
                  <polygon points="50,10 62,38 92,38 68,56 77,85 50,68 23,85 32,56 8,38 38,38" />
                </svg>
                <span className="text-[10px] uppercase font-mono tracking-widest text-amber-400/40 mt-1">
                  Heritage
                </span>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* CENTER ROYAL WAX SEAL & UNLOCK CTA (Bridging the seam between the doors) */}
          {/* ========================================================================= */}
          <div
            className={`absolute z-40 inset-0 flex flex-col items-center justify-center pointer-events-auto p-4 transition-all duration-700 ${
              isOpen ? 'scale-125 opacity-0' : 'scale-100 opacity-100'
            }`}
          >
            {/* Royal Wax Seal Monogram Medallion */}
            <div
              onClick={handleOpenDoors}
              className="cursor-pointer group relative flex flex-col items-center justify-center transition-transform duration-300 hover:scale-105"
            >
              {/* Pulsating Radiance Rings */}
              <div className="absolute -inset-4 rounded-full bg-amber-500/20 blur-xl animate-ping duration-1000" />
              <div className="absolute -inset-2 rounded-full bg-amber-400/30 blur-md animate-pulse" />

              {/* The Wax Seal Outer Ring */}
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-br from-[#851919] via-[#5C1010] to-[#380909] p-1.5 shadow-2xl border-2 border-amber-400/80 relative flex items-center justify-center">
                {/* Scalloped Wax Border Details */}
                <div className="w-full h-full rounded-full border-2 border-dashed border-amber-300/40 flex flex-col items-center justify-center bg-gradient-to-b from-amber-500/15 to-black/50 text-center p-2">
                  <span className="text-sm sm:text-base">{theme.crestIcon || '👑'}</span>
                  
                  {/* Couple Monogram Initials */}
                  <span className="font-serif text-2xl sm:text-3xl font-bold tracking-widest bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 bg-clip-text text-transparent drop-shadow-md">
                    {getMonogram()}
                  </span>

                  <span className="text-[9px] uppercase font-mono tracking-[0.2em] text-amber-200/70 mt-0.5">
                    Royal Seal
                  </span>
                </div>

                {/* Subtle Gold Wax Stamp Notch */}
                <div className="absolute -top-1.5 px-2 py-0.5 rounded-full bg-amber-500 text-[8px] font-mono font-bold text-neutral-950 uppercase tracking-widest border border-amber-300 shadow">
                  Moonlight
                </div>
              </div>
            </div>

            {/* Couple Heading Details */}
            <div className="mt-6 text-center space-y-2 max-w-sm px-4">
              <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-amber-300/90 font-bold block drop-shadow">
                {invitation.opening_heading || 'Cordially Invites You To Celebrate'}
              </span>

              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white tracking-tight drop-shadow-lg">
                {invitation.names || 'Aarav & Kiara'}
              </h2>

              <p className="text-xs text-amber-200/80 font-mono tracking-widest">
                {invitation.event_date || invitation.date
                  ? new Date(invitation.event_date || invitation.date).toLocaleDateString('en-IN', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })
                  : 'November 20, 2026'}
              </p>
            </div>

            {/* Tap To Open Call-To-Action Button */}
            <div className="mt-6">
              <button
                type="button"
                onClick={handleOpenDoors}
                className="group relative px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold text-xs uppercase tracking-[0.2em] shadow-2xl transform hover:scale-105 active:scale-95 transition-all flex items-center justify-center space-x-2.5 border border-amber-200"
              >
                <Sparkles className="w-4 h-4 text-neutral-950 animate-spin-slow" />
                <span>Open Royal Palace Doors</span>
                <Sparkles className="w-4 h-4 text-neutral-950 animate-spin-slow" />
              </button>
            </div>

            {/* Bottom Hint */}
            <div className="mt-4 flex flex-col items-center space-y-1 text-[10px] text-amber-300/60 uppercase font-mono tracking-widest">
              <span>Tap Medallion or Button to Enter</span>
              <ChevronDown className="w-3.5 h-3.5 animate-bounce text-amber-400" />
            </div>
          </div>

          {/* ========================================================================= */}
          {/* FALLING FLORAL PETAL CONFETTI SHOWER (During Opening Animation) */}
          {/* ========================================================================= */}
          {isOpen && (
            <div className="absolute inset-0 z-50 pointer-events-none overflow-hidden">
              {petals.map((petal) => (
                <div
                  key={petal.id}
                  className="absolute"
                  style={{
                    left: `${petal.left}%`,
                    top: '-30px',
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
