import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, ChevronDown, RotateCcw } from 'lucide-react';
import { getTemplateConfig } from '../engine/TemplateRegistry';

/**
 * Web Audio API Multi-Profile Synthesizer
 */
const playDoorSound = (profile = 'royal') => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    let notes = [];
    if (profile === 'temple') {
      notes = [
        { freq: 261.63, time: 0.0, dur: 2.2, gain: 0.28, type: 'sine' },
        { freq: 392.00, time: 0.1, dur: 2.4, gain: 0.24, type: 'triangle' },
        { freq: 523.25, time: 0.25, dur: 2.6, gain: 0.20, type: 'sine' },
        { freq: 659.25, time: 0.45, dur: 2.8, gain: 0.16, type: 'sine' },
      ];
    } else if (profile === 'floral') {
      notes = [
        { freq: 523.25, time: 0.0, dur: 1.5, gain: 0.14, type: 'triangle' },
        { freq: 659.25, time: 0.12, dur: 1.6, gain: 0.16, type: 'triangle' },
        { freq: 783.99, time: 0.24, dur: 1.8, gain: 0.18, type: 'triangle' },
        { freq: 987.77, time: 0.38, dur: 2.0, gain: 0.15, type: 'sine' },
      ];
    } else if (profile === 'celestial') {
      notes = [
        { freq: 659.25, time: 0.0, dur: 1.8, gain: 0.16, type: 'sine' },
        { freq: 987.77, time: 0.15, dur: 2.0, gain: 0.20, type: 'sine' },
        { freq: 1318.51, time: 0.3, dur: 2.3, gain: 0.22, type: 'triangle' },
      ];
    } else if (profile === 'birthday') {
      notes = [
        { freq: 392.00, time: 0.0, dur: 0.8, gain: 0.20, type: 'triangle' },
        { freq: 523.25, time: 0.1, dur: 1.0, gain: 0.24, type: 'triangle' },
        { freq: 659.25, time: 0.2, dur: 1.2, gain: 0.26, type: 'triangle' },
        { freq: 1046.50, time: 0.46, dur: 2.0, gain: 0.22, type: 'sine' },
      ];
    } else {
      // Classic royal shehnai & palace chime (default)
      notes = [
        { freq: 440.0, time: 0.0, dur: 1.2, gain: 0.18, type: 'triangle' },
        { freq: 554.37, time: 0.15, dur: 1.4, gain: 0.22, type: 'triangle' },
        { freq: 659.25, time: 0.3, dur: 1.6, gain: 0.24, type: 'triangle' },
        { freq: 880.0, time: 0.45, dur: 2.0, gain: 0.28, type: 'triangle' },
        { freq: 1108.73, time: 0.65, dur: 2.2, gain: 0.2, type: 'triangle' },
      ];
    }

    notes.forEach(({ freq, time, dur, gain, type = 'triangle' }) => {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime + time);

      gainNode.gain.setValueAtTime(0.001, ctx.currentTime + time);
      gainNode.gain.exponentialRampToValueAtTime(gain, ctx.currentTime + time + 0.06);
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

const getVideoForTemplate = (templateId) => {
  const map = {
    'rose-gold-blush-royal': '/videos/rose-gold-blush.mp4',
    'royal-love': '/videos/rose-gold-blush.mp4',
    'royal-prestige': '/videos/royal-prestige.mp4',
    'modern-minimal-royal': '/videos/royal-elegance-royal.mp4',
    'royal-elegance': '/videos/royal-elegance-royal.mp4',
    'royal-majesty': '/videos/royal-majesty.mp4',
    'royal-heritage': '/videos/royal-heritage.mp4',
    'royal-legacy': '/videos/royal-legacy.mp4',
    'royal-crest': '/videos/royal-crest.mp4',
    'royal-grace': '/videos/royal-grace.mp4',
    'emerald-noir-royal': '/videos/emerald-noir-royal.mp4',
    'emerald-noir': '/videos/emerald-noir-royal.mp4',
    'ivory-elegance-royal': '/videos/ivory-elegance-royal.mp4',
    'crimson-royale': '/videos/ivory-elegance-royal.mp4',
    'taj-imperial': '/videos/royal-majesty.mp4',
    'jaipur-heritage': '/videos/royal-heritage.mp4',
    'shahi-sangeet': '/videos/royal-legacy.mp4',
    'nawab-of-awadh': '/videos/royal-grace.mp4',
    'royal-griha-utsav': '/videos/royal-crest.mp4',
    'bikaner-riyasat': '/videos/royal-legacy.mp4',
    'udaivilas-palace': '/videos/royal-heritage.mp4',
  };
  return map[templateId] || null;
};

const OpeningScreen = ({
  invitation = {},
  theme = {},
  onEnter,
  onComplete,
  isPreview = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isRendered, setIsRendered] = useState(true);
  const [petals, setPetals] = useState([]);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);

  const videoRef = useRef(null);
  const templateId = invitation.template_id || invitation.templateId || 'rose-gold-blush-royal';
  const config = getTemplateConfig(templateId);
  const videoGateSrc = getVideoForTemplate(templateId) || config?.videoGate;

  const isRoyalVideo = Boolean(videoGateSrc);

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

    // 1. Play sound matching profile
    playDoorSound(isRoyalVideo ? 'royal' : 'floral');

    // 2. Play video if royal video gate
    if (videoRef.current && isRoyalVideo) {
      videoRef.current.currentTime = 0;
      videoRef.current.muted = true;
      videoRef.current.playsInline = true;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => console.log('Video play catch:', err));
      }
      setVideoPlaying(true);
    }

    // 3. Generate celebratory petals
    const confPool = ['🌹', '✨', '👑', '🥂', '🌸', '💎'];
    const newPetals = Array.from({ length: 26 }).map((_, i) => ({
      id: i,
      left: Math.random() * 92 + 4,
      size: Math.random() * 14 + 12,
      delay: Math.random() * 0.25,
      duration: Math.random() * 1.5 + 1.2,
      rotation: Math.random() * 360,
      type: confPool[i % confPool.length],
    }));
    setPetals(newPetals);

    // 4. Trigger state
    setIsOpen(true);

    if (onEnter) {
      onEnter();
    }

    if (isRoyalVideo) {
      // Start smooth cross-fade at 4.6s, finish at 5.6s
      setTimeout(() => {
        setIsFadingOut(true);
      }, 4600);

      setTimeout(() => {
        setIsRendered(false);
        if (onComplete) onComplete();
      }, 5800);
    } else {
      // Classic 3D doors smooth glide 1400ms
      setTimeout(() => {
        setIsFadingOut(true);
      }, 1100);

      setTimeout(() => {
        setIsRendered(false);
        if (onComplete) onComplete();
      }, 1450);
    }
  };

  const handleVideoEnded = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      setIsRendered(false);
      if (onComplete) onComplete();
    }, 1000);
  };

  if (!isRendered) return null;

  // =========================================================================
  // 1. CINEMATIC ROYAL VIDEO GATE (Exact Zareqia-style Royal Grandeur)
  // =========================================================================
  if (isRoyalVideo) {
    return (
      <div
        onClick={handleOpenDoors}
        className={`${
          isPreview ? 'absolute' : 'fixed'
        } inset-0 z-50 flex items-center justify-center font-sans select-none w-full h-full cursor-pointer overflow-hidden transition-all duration-1200 ease-in-out ${
          isFadingOut
            ? 'pointer-events-none opacity-0 scale-105 bg-transparent'
            : 'opacity-100 scale-100 bg-neutral-950'
        }`}
      >
        <div className="relative w-full h-full max-w-[480px] max-h-[820px] mx-auto overflow-hidden sm:rounded-3xl border border-amber-500/40 shadow-[0_0_60px_rgba(212,175,55,0.4)] bg-black flex flex-col justify-between">
          {/* Full-Bleed 4K Video Element */}
          <video
            ref={videoRef}
            src={videoGateSrc}
            playsInline
            muted
            preload="auto"
            controls={false}
            onEnded={handleVideoEnded}
            onLoadedData={() => setVideoLoaded(true)}
            className="absolute inset-0 w-full h-full object-cover z-10 transition-opacity duration-700"
          />

          {/* Dark luxury gradient overlay that smoothly clears when opening */}
          <div
            className={`absolute inset-0 z-20 pointer-events-none transition-opacity duration-1000 ${
              isOpen ? 'opacity-15' : 'opacity-75'
            }`}
            style={{
              background:
                'linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.85) 100%)',
            }}
          />

          {/* Front Center Wax Seal & Monogram (Rotates and Dissolves on Tap) */}
          <div
            className={`relative z-30 flex flex-col items-center justify-center text-center h-full px-6 transition-all duration-1000 ease-out ${
              isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
          >
            {/* Top Tagline */}
            <span
              className={`text-[10px] uppercase font-mono tracking-[0.3em] text-[#d4af37] font-bold drop-shadow mb-4 transition-opacity duration-700 ${
                isOpen ? 'opacity-0' : 'opacity-100'
              }`}
            >
              {config.name || 'Royal Digital Invitation'}
            </span>

            {/* Glowing Royal Wax Seal that Rotates 720° on Tap */}
            <div
              className="relative group cursor-pointer mb-5"
              style={{
                transform: isOpen ? 'rotate(720deg) scale(1.35)' : 'rotate(0deg) scale(1)',
                opacity: isOpen ? 0 : 1,
                transition: 'transform 1200ms cubic-bezier(0.22, 1, 0.36, 1), opacity 850ms ease-out',
              }}
            >
              <div className="absolute -inset-3 rounded-full bg-amber-400/40 blur-md animate-ping duration-1000" />
              <div className="absolute -inset-1 rounded-full bg-amber-300/50 blur-xs animate-pulse" />
              <div
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1.5 shadow-[0_0_40px_rgba(212,175,55,0.7)] border-2 border-amber-300 relative flex items-center justify-center group-hover:scale-105 active:scale-95 transition-transform"
                style={{
                  background: 'linear-gradient(135deg, #4a3410 0%, #b08820 55%, #2a1f08 100%)',
                }}
              >
                <div className="w-full h-full rounded-full border border-dashed border-amber-200/80 flex flex-col items-center justify-center bg-black/60 text-center p-1.5">
                  <span className="text-base">👑</span>
                  <span className="font-serif text-xl sm:text-2xl font-bold tracking-widest bg-gradient-to-r from-amber-100 via-yellow-100 to-amber-200 bg-clip-text text-transparent drop-shadow leading-tight my-0.5">
                    {getMonogram()}
                  </span>
                  <span className="text-[6.5px] uppercase font-mono tracking-widest text-[#f3cf5b] font-bold">
                    ROYAL SEAL
                  </span>
                </div>
              </div>
            </div>

            {/* Couple Names */}
            <h2
              className={`font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight drop-shadow-lg leading-tight mb-1 transition-opacity duration-700 ${
                isOpen ? 'opacity-0' : 'opacity-100'
              }`}
            >
              {invitation.names || 'Aarav & Kiara'}
            </h2>
            <p
              className={`text-[11px] text-amber-200 font-mono tracking-widest mb-6 transition-opacity duration-700 ${
                isOpen ? 'opacity-0' : 'opacity-100'
              }`}
            >
              {invitation.event_date || invitation.date || 'Nov 20, 2026'}
            </p>

            {/* Tap Button */}
            <button
              type="button"
              onClick={handleOpenDoors}
              className={`px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 hover:from-yellow-400 hover:to-amber-500 text-neutral-950 font-bold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(212,175,55,0.6)] transform hover:scale-105 active:scale-95 transition-all flex items-center justify-center space-x-2 border border-amber-200 cursor-pointer ${
                isOpen ? 'opacity-0 scale-90 pointer-events-none' : 'opacity-100 scale-100'
              }`}
            >
              <Sparkles className="w-4 h-4 text-neutral-950 animate-spin-slow" />
              <span>Tap to Open Royal Doors</span>
            </button>

            {/* Hint */}
            <div
              className={`mt-4 flex flex-col items-center text-[8.5px] text-amber-300/80 uppercase font-mono tracking-widest animate-pulse transition-opacity duration-700 ${
                isOpen ? 'opacity-0' : 'opacity-100'
              }`}
            >
              <span>Touch Screen to Enter</span>
              <ChevronDown className="w-3.5 h-3.5 animate-bounce text-amber-300 mt-0.5" />
            </div>
          </div>

          {/* Celebratory Petals Cascade */}
          {isOpen && (
            <div className="absolute inset-0 z-40 pointer-events-none overflow-hidden">
              {petals.map((petal) => (
                <div
                  key={petal.id}
                  className="absolute"
                  style={{
                    left: `${petal.left}%`,
                    top: '-25px',
                    animation: `fall-petal ${petal.duration}s linear ${petal.delay}s forwards`,
                    transform: `rotate(${petal.rotation}deg)`,
                  }}
                >
                  <span style={{ fontSize: `${petal.size}px` }} className="drop-shadow-md select-none">
                    {petal.type}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <style>{`
          @keyframes fall-petal {
            0% { transform: translateY(0) rotate(0deg) scale(0.8); opacity: 1; }
            50% { transform: translateY(45vh) rotate(180deg) scale(1.1); opacity: 0.95; }
            100% { transform: translateY(90vh) rotate(360deg) scale(0.6); opacity: 0; }
          }
          .animate-spin-slow { animation: spin 12s linear infinite; }
        `}</style>
      </div>
    );
  }

  // =========================================================================
  // 2. INTERACTIVE 3D CLASSIC SUITE DOORS
  // =========================================================================
  return (
    <div
      onClick={handleOpenDoors}
      className={`${
        isPreview ? 'absolute' : 'fixed'
      } inset-0 z-50 flex items-center justify-center font-sans select-none w-full h-full cursor-pointer overflow-hidden transition-all duration-1000 ease-in-out ${
        isFadingOut
          ? 'pointer-events-none opacity-0 scale-105 bg-transparent'
          : 'opacity-100 scale-100 bg-black/95'
      }`}
      style={{ perspective: '1400px' }}
    >
      <div className="relative w-full h-full max-w-[440px] max-h-[740px] mx-auto overflow-hidden sm:rounded-3xl border sm:border-2 border-amber-500/50 shadow-[0_0_60px_rgba(212,175,55,0.4)] bg-[#070D1F] flex flex-col justify-between">
        {/* Interior Reveal Glow */}
        <div className="absolute inset-0 z-0 flex flex-col items-center justify-center bg-gradient-to-b from-amber-500/30 via-neutral-950 to-black text-center p-6">
          <div className="w-56 h-56 rounded-full bg-amber-400/20 blur-3xl animate-pulse" />
          <div className="z-10 space-y-2 animate-fade-in max-w-xs">
            <Sparkles className="w-8 h-8 text-amber-300 mx-auto animate-spin-slow" />
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-amber-100 tracking-tight leading-tight drop-shadow-md">
              {invitation.names || 'Aarav & Kiara'}
            </h3>
            <p className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#f3cf5b] font-bold">
              Welcome To Our Celebration
            </p>
          </div>
        </div>

        {/* Left Door */}
        <div
          className="absolute top-0 bottom-0 left-0 w-1/2 z-20 flex flex-col justify-between p-3 border-r border-[#d4af37]/80 shadow-2xl pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, #1C140E 0%, #3d2919 45%, #140d08 100%)',
            transformOrigin: 'left center',
            transform: isOpen ? 'translateX(-100%) rotateY(-105deg)' : 'none',
            opacity: isOpen ? 0 : 1,
            transition: 'transform 1400ms cubic-bezier(0.16, 1, 0.3, 1), opacity 1400ms ease',
          }}
        >
          <div className="absolute inset-2 border border-[#d4af37]/50 rounded-lg" />
          <div className="relative z-10 w-full h-[15vh] min-h-[55px] rounded-t-lg border border-[#d4af37]/60 bg-[#0B132B]/80 flex flex-col items-center justify-center">
            <span className="text-base animate-pulse">👑</span>
            <span className="text-[7px] font-mono text-amber-300 uppercase tracking-widest">Royal</span>
          </div>
          <div className="relative z-10 w-full h-[15vh] min-h-[50px] rounded-b-lg border border-[#d4af37]/40 bg-[#0B132B]/80 flex items-center justify-center">
            <span className="text-[7px] uppercase font-mono tracking-widest text-[#d4af37]/60 font-bold">Shubh</span>
          </div>
        </div>

        {/* Right Door */}
        <div
          className="absolute top-0 bottom-0 right-0 w-1/2 z-20 flex flex-col justify-between p-3 border-l border-[#d4af37]/80 shadow-2xl pointer-events-none"
          style={{
            background: 'linear-gradient(225deg, #1C140E 0%, #3d2919 45%, #140d08 100%)',
            transformOrigin: 'right center',
            transform: isOpen ? 'translateX(100%) rotateY(105deg)' : 'none',
            opacity: isOpen ? 0 : 1,
            transition: 'transform 1400ms cubic-bezier(0.16, 1, 0.3, 1), opacity 1400ms ease',
          }}
        >
          <div className="absolute inset-2 border border-[#d4af37]/50 rounded-lg" />
          <div className="relative z-10 w-full h-[15vh] min-h-[55px] rounded-t-lg border border-[#d4af37]/60 bg-[#0B132B]/80 flex flex-col items-center justify-center">
            <span className="text-base animate-pulse">✨</span>
            <span className="text-[7px] font-mono text-amber-300 uppercase tracking-widest">Heritage</span>
          </div>
          <div className="relative z-10 w-full h-[15vh] min-h-[50px] rounded-b-lg border border-[#d4af37]/40 bg-[#0B132B]/80 flex items-center justify-center">
            <span className="text-[7px] uppercase font-mono tracking-widest text-[#d4af37]/60 font-bold">Labh</span>
          </div>
        </div>

        {/* Center Wax Seal */}
        <div
          className={`absolute inset-0 z-40 flex flex-col items-center justify-center pointer-events-auto p-4 transition-all duration-1000 ease-out ${
            isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <span
            className={`text-[9px] uppercase font-mono tracking-[0.25em] text-[#f3cf5b] font-bold drop-shadow mb-3 transition-opacity duration-700 ${
              isOpen ? 'opacity-0' : 'opacity-100'
            }`}
          >
            Cordially Invites You To Celebrate
          </span>

          <div
            onClick={handleOpenDoors}
            className="cursor-pointer group relative flex flex-col items-center justify-center"
            style={{
              transform: isOpen ? 'rotate(720deg) scale(1.35)' : 'rotate(0deg) scale(1)',
              opacity: isOpen ? 0 : 1,
              transition: 'transform 1200ms cubic-bezier(0.22, 1, 0.36, 1), opacity 850ms ease-out',
            }}
          >
            <div className="absolute -inset-4 rounded-full bg-[#d4af37]/40 blur-md animate-ping duration-1000" />
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full p-1.5 shadow-[0_0_35px_rgba(212,175,55,0.6)] border-2 border-[#d4af37] relative flex items-center justify-center bg-gradient-to-br from-amber-700 via-amber-900 to-black">
              <div className="w-full h-full rounded-full border border-dashed border-[#d4af37]/70 flex flex-col items-center justify-center bg-black/50 text-center p-1">
                <span className="text-sm">👑</span>
                <span className="font-serif text-lg font-bold tracking-widest bg-gradient-to-r from-amber-200 via-yellow-200 to-amber-100 bg-clip-text text-transparent">
                  {getMonogram()}
                </span>
                <span className="text-[6.5px] uppercase font-mono tracking-widest text-[#f3cf5b] font-bold">
                  VIP SEAL
                </span>
              </div>
            </div>
          </div>

          <div
            className={`mt-3 text-center space-y-0.5 max-w-[280px] transition-opacity duration-700 ${
              isOpen ? 'opacity-0' : 'opacity-100'
            }`}
          >
            <h2 className="font-serif text-lg sm:text-xl font-bold text-white tracking-tight drop-shadow-md">
              {invitation.names || 'Aarav & Kiara'}
            </h2>
            <p className="text-[9px] text-[#cbd5e1] font-mono tracking-wider">
              {invitation.event_date || invitation.date || 'Nov 20, 2026'}
            </p>
          </div>

          <div
            className={`mt-3 transition-opacity duration-700 ${
              isOpen ? 'opacity-0 scale-90 pointer-events-none' : 'opacity-100 scale-100'
            }`}
          >
            <button
              type="button"
              onClick={handleOpenDoors}
              className="px-5 py-2 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold text-[10.5px] uppercase tracking-wider shadow-lg flex items-center justify-center space-x-1.5 border border-amber-200 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-neutral-950 animate-spin-slow" />
              <span>Tap Seal to Open Doors</span>
            </button>
          </div>
        </div>

        {/* Confetti */}
        {isOpen && (
          <div className="absolute inset-0 z-50 pointer-events-none overflow-hidden">
            {petals.map((petal) => (
              <div
                key={petal.id}
                className="absolute"
                style={{
                  left: `${petal.left}%`,
                  top: '-25px',
                  animation: `fall-petal ${petal.duration}s linear ${petal.delay}s forwards`,
                  transform: `rotate(${petal.rotation}deg)`,
                }}
              >
                <span style={{ fontSize: `${petal.size}px` }} className="drop-shadow-md select-none">
                  {petal.type}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes fall-petal {
          0% { transform: translateY(0) rotate(0deg) scale(0.8); opacity: 1; }
          50% { transform: translateY(40vh) rotate(180deg) scale(1.1); opacity: 0.95; }
          100% { transform: translateY(85vh) rotate(360deg) scale(0.6); opacity: 0; }
        }
        .animate-spin-slow { animation: spin 12s linear infinite; }
      `}</style>
    </div>
  );
};

export default OpeningScreen;
