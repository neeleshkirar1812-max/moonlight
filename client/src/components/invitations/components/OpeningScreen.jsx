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

const getThemeStyles = (templateId) => {
  switch (templateId) {
    // 1. Royal Emerald & Forest Jade
    case 'emerald-noir':
    case 'emerald-heritage':
    case 'botanical-eucalyptus':
    case 'sweet-first-birthday':
      return {
        doorBgLeft: 'linear-gradient(135deg, #052317 0%, #0c4630 45%, #02140c 100%)',
        doorBgRight: 'linear-gradient(225deg, #052317 0%, #0c4630 45%, #02140c 100%)',
        doorBorder: 'border-emerald-400/80',
        innerGlow: 'from-emerald-500/35 via-emerald-950/75 to-black',
        goldAccent: '#d4af37',
        sealBg: 'linear-gradient(135deg, #064e3b 0%, #022c22 100%)',
        sealBorder: 'border-emerald-300',
        accentText: 'text-emerald-300',
        frameBorder: 'border-emerald-500/50',
      };

    // 2. Royal Crimson & Antique Sandstone
    case 'crimson-royale':
    case 'royal-love':
    case 'mughal-courtyard':
    case 'vintage-rajputana':
    case 'golden-jubilee-royal':
      return {
        doorBgLeft: 'linear-gradient(135deg, #380710 0%, #5e0d1f 45%, #200308 100%)',
        doorBgRight: 'linear-gradient(225deg, #380710 0%, #5e0d1f 45%, #200308 100%)',
        doorBorder: 'border-amber-400/80',
        innerGlow: 'from-rose-500/30 via-amber-950/70 to-black',
        goldAccent: '#d4af37',
        sealBg: 'linear-gradient(135deg, #881337 0%, #4c0519 100%)',
        sealBorder: 'border-amber-300',
        accentText: 'text-rose-300',
        frameBorder: 'border-amber-400/50',
      };

    // 3. Rose Gold & Romantic Blossom
    case 'rose-gold-blush':
    case 'blooming-dreams':
    case 'pastel-peony':
    case 'fairy-tale-princess':
    case 'sweet-nesting-baby':
      return {
        doorBgLeft: 'linear-gradient(135deg, #2d131f 0%, #4a1d32 45%, #190911 100%)',
        doorBgRight: 'linear-gradient(225deg, #2d131f 0%, #4a1d32 45%, #190911 100%)',
        doorBorder: 'border-rose-400/80',
        innerGlow: 'from-rose-400/35 via-pink-950/65 to-black',
        goldAccent: '#e0a899',
        sealBg: 'linear-gradient(135deg, #9d174d 0%, #700b34 100%)',
        sealBorder: 'border-rose-300',
        accentText: 'text-rose-300',
        frameBorder: 'border-rose-400/50',
      };

    // 4. Jaipur Haveli & Terracotta Earth
    case 'jaipur-heritage':
    case 'terracotta-boho':
      return {
        doorBgLeft: 'linear-gradient(135deg, #42151d 0%, #682330 45%, #23080e 100%)',
        doorBgRight: 'linear-gradient(225deg, #42151d 0%, #682330 45%, #23080e 100%)',
        doorBorder: 'border-amber-400/80',
        innerGlow: 'from-rose-600/30 via-orange-950/65 to-black',
        goldAccent: '#f5d061',
        sealBg: 'linear-gradient(135deg, #9f1239 0%, #4c0519 100%)',
        sealBorder: 'border-amber-300',
        accentText: 'text-rose-200',
        frameBorder: 'border-rose-500/50',
      };

    // 5. Royal Purple & Twilight Lavender
    case 'royal-engagement-regal':
    case 'lavender-mist':
      return {
        doorBgLeft: 'linear-gradient(135deg, #240b36 0%, #3d1259 45%, #11031b 100%)',
        doorBgRight: 'linear-gradient(225deg, #240b36 0%, #3d1259 45%, #11031b 100%)',
        doorBorder: 'border-purple-400/80',
        innerGlow: 'from-purple-500/35 via-indigo-950/70 to-black',
        goldAccent: '#f3cf5b',
        sealBg: 'linear-gradient(135deg, #581c87 0%, #2e1065 100%)',
        sealBorder: 'border-purple-300',
        accentText: 'text-purple-300',
        frameBorder: 'border-purple-500/50',
      };

    // 6. Shahi Sangeet Magenta
    case 'shahi-sangeet':
      return {
        doorBgLeft: 'linear-gradient(135deg, #3b0928 0%, #611043 45%, #1a0312 100%)',
        doorBgRight: 'linear-gradient(225deg, #3b0928 0%, #611043 45%, #1a0312 100%)',
        doorBorder: 'border-pink-400/80',
        innerGlow: 'from-pink-500/35 via-rose-950/70 to-black',
        goldAccent: '#f3cf5b',
        sealBg: 'linear-gradient(135deg, #831843 0%, #500724 100%)',
        sealBorder: 'border-pink-300',
        accentText: 'text-pink-300',
        frameBorder: 'border-pink-500/50',
      };

    // 7. Awadh & Mysore Peacock Turquoise
    case 'nawab-of-awadh':
    case 'mysore-grandeur':
    case 'coastal-breeze':
      return {
        doorBgLeft: 'linear-gradient(135deg, #062424 0%, #0d4a4a 45%, #021212 100%)',
        doorBgRight: 'linear-gradient(225deg, #062424 0%, #0d4a4a 45%, #021212 100%)',
        doorBorder: 'border-teal-400/80',
        innerGlow: 'from-teal-500/35 via-cyan-950/70 to-black',
        goldAccent: '#d4af37',
        sealBg: 'linear-gradient(135deg, #134e4a 0%, #042f2e 100%)',
        sealBorder: 'border-teal-300',
        accentText: 'text-teal-300',
        frameBorder: 'border-teal-500/50',
      };

    // 8. Sacred Griha Pravesh Saffron & Marigold
    case 'royal-griha-utsav':
    case 'griha-pravesh':
    case 'sunset-citrus':
    case 'navaratna-puja':
    case 'mehendi-magic':
      return {
        doorBgLeft: 'linear-gradient(135deg, #3b1207 0%, #5e200e 45%, #1a0702 100%)',
        doorBgRight: 'linear-gradient(225deg, #3b1207 0%, #5e200e 45%, #1a0702 100%)',
        doorBorder: 'border-amber-400/80',
        innerGlow: 'from-amber-500/35 via-orange-950/75 to-black',
        goldAccent: '#f59e0b',
        sealBg: 'linear-gradient(135deg, #9a3412 0%, #431407 100%)',
        sealBorder: 'border-amber-300',
        accentText: 'text-amber-300',
        frameBorder: 'border-amber-500/50',
      };

    // 9. Warm Swarna Amber & Golden Milestones
    case 'majestic-love':
    case 'bikaner-riyasat':
    case 'little-sunshine':
    case 'golden-fifty-love':
      return {
        doorBgLeft: 'linear-gradient(135deg, #2a1708 0%, #4d2b0e 45%, #140a03 100%)',
        doorBgRight: 'linear-gradient(225deg, #2a1708 0%, #4d2b0e 45%, #140a03 100%)',
        doorBorder: 'border-amber-400/80',
        innerGlow: 'from-amber-400/35 via-[#2d2013]/75 to-black',
        goldAccent: '#d4af37',
        sealBg: 'linear-gradient(135deg, #78350f 0%, #451a03 100%)',
        sealBorder: 'border-amber-300',
        accentText: 'text-amber-300',
        frameBorder: 'border-amber-400/50',
      };

    // 10. Taj Imperial Marble & Silver Monochrome
    case 'taj-imperial':
    case 'monochrome-chic':
    case 'silver-anniversary':
    case 'minimalist-arch':
      return {
        doorBgLeft: 'linear-gradient(135deg, #151c24 0%, #263240 45%, #0a0e13 100%)',
        doorBgRight: 'linear-gradient(225deg, #151c24 0%, #263240 45%, #0a0e13 100%)',
        doorBorder: 'border-slate-300/80',
        innerGlow: 'from-slate-400/30 via-slate-900/80 to-black',
        goldAccent: '#e2e8f0',
        sealBg: 'linear-gradient(135deg, #334155 0%, #0f172a 100%)',
        sealBorder: 'border-slate-300',
        accentText: 'text-slate-200',
        frameBorder: 'border-slate-400/50',
      };

    // 11. Baby Shower Celestial Blue
    case 'baby-blessing-cradle':
      return {
        doorBgLeft: 'linear-gradient(135deg, #0c1c28 0%, #15344d 45%, #060e14 100%)',
        doorBgRight: 'linear-gradient(225deg, #0c1c28 0%, #15344d 45%, #060e14 100%)',
        doorBorder: 'border-sky-300/80',
        innerGlow: 'from-sky-400/35 via-sky-950/70 to-black',
        goldAccent: '#7dd3fc',
        sealBg: 'linear-gradient(135deg, #075985 0%, #082f49 100%)',
        sealBorder: 'border-sky-300',
        accentText: 'text-sky-200',
        frameBorder: 'border-sky-400/50',
      };

    // 12. Champagne Jet Black & 24K Gold
    case 'champagne-glamour':
      return {
        doorBgLeft: 'linear-gradient(135deg, #181410 0%, #2a2218 45%, #0d0b08 100%)',
        doorBgRight: 'linear-gradient(225deg, #181410 0%, #2a2218 45%, #0d0b08 100%)',
        doorBorder: 'border-amber-300',
        innerGlow: 'from-amber-400/35 via-neutral-900/85 to-black',
        goldAccent: '#d4af37',
        sealBg: 'linear-gradient(135deg, #78350f 0%, #1c1917 100%)',
        sealBorder: 'border-amber-200',
        accentText: 'text-amber-200',
        frameBorder: 'border-amber-300/60',
      };

    // 13. Udaipur Lake Palace & Jodhpur Midnight Sapphire (Default Luxury)
    case 'udaivilas-palace':
    case 'jodhpur-sun-city':
    case 'royal-reception-gala':
    case 'royal-yuvraj-arrival':
    case 'celestial-night':
    case 'celestial-starlight':
    case 'modern-minimal':
    default:
      return {
        doorBgLeft: 'linear-gradient(135deg, #0B132B 0%, #1C2541 45%, #050B1B 100%)',
        doorBgRight: 'linear-gradient(225deg, #0B132B 0%, #1C2541 45%, #050B1B 100%)',
        doorBorder: 'border-[#d4af37]',
        innerGlow: 'from-[#d4af37]/35 via-[#1C2541]/85 to-[#0B132B]',
        goldAccent: '#d4af37',
        sealBg: 'linear-gradient(135deg, #990000 0%, #550000 100%)',
        sealBorder: 'border-[#d4af37]',
        accentText: 'text-[#f3cf5b]',
        frameBorder: 'border-[#d4af37]/50',
      };
  }
};

const OpeningScreen = ({ invitation = {}, theme = {}, onEnter, isPreview = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRendered, setIsRendered] = useState(true);
  const [petals, setPetals] = useState([]);

  const templateId = invitation.template_id || invitation.templateId || 'modern-minimal';
  const themeStyles = getThemeStyles(templateId);

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
        className={`relative w-full h-full max-w-[440px] max-h-[740px] mx-auto overflow-hidden sm:rounded-3xl border sm:border-2 ${themeStyles.frameBorder} shadow-[0_0_60px_rgba(212,175,55,0.4)] bg-[#070D1F] flex flex-col justify-between`}
      >
        {/* Palace Interior Glow (Revealed behind opening doors) */}
        <div className={`absolute inset-0 z-0 flex flex-col items-center justify-center bg-gradient-to-b ${themeStyles.innerGlow} text-center p-6`}>
          <div className="w-56 h-56 rounded-full bg-[#d4af37]/30 blur-3xl animate-pulse" />
          <div className="z-10 space-y-2 animate-fade-in max-w-xs">
            <Sparkles className="w-8 h-8 text-[#f3cf5b] mx-auto animate-spin-slow" />
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-amber-100 tracking-tight leading-tight drop-shadow-md">
              {invitation.names || 'Aarav & Kiara'}
            </h3>
            <p className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#f3cf5b] font-bold">
              Welcome To Our Celebration
            </p>
          </div>
        </div>

        {/* Top Hanging Royal Garland / Toran */}
        <div className="absolute top-0 inset-x-0 z-30 flex justify-center pointer-events-none">
          <div className="w-full h-7 bg-gradient-to-b from-black/80 via-[#1C2541]/70 to-transparent border-b border-[#d4af37]/50 flex items-center justify-around px-2 shadow">
            {Array.from({ length: 7 }).map((_, idx) => (
              <span key={idx} className="text-[10px] text-amber-300 drop-shadow">🌼</span>
            ))}
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* 1. LEFT PALACE DOOR */}
        {/* ------------------------------------------------------------- */}
        <div
          className="absolute top-0 bottom-0 left-0 w-1/2 z-20 flex flex-col justify-between p-3 border-r border-[#d4af37]/80 shadow-2xl pointer-events-none transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]"
          style={{
            background: themeStyles.doorBgLeft,
            transformOrigin: 'left center',
            transform: isOpen ? 'translateX(-100%) rotateY(-90deg)' : 'translateX(0) rotateY(0deg)',
            opacity: isOpen ? 0 : 1,
            boxShadow: 'inset -6px 0 20px rgba(0,0,0,0.9), inset 0 0 15px rgba(212, 175, 55, 0.25)',
          }}
        >
          {/* Inner Golden Border */}
          <div className="absolute inset-2 border border-[#d4af37]/50 rounded-lg pointer-events-none" />

          {/* Top Jaali Arch */}
          <div className="relative z-10 w-full h-[15vh] min-h-[55px] max-h-[95px] rounded-t-lg border border-[#d4af37]/60 bg-[#0B132B]/80 p-1 flex flex-col items-center justify-center shadow-inner overflow-hidden">
            <svg className="w-full h-full text-[#d4af37]/40 fill-current" viewBox="0 0 100 100">
              <path d="M50 5 C30 5 15 25 15 50 C15 75 30 95 50 95 C70 95 85 75 85 50 C85 25 70 5 50 5 Z M50 15 C65 15 75 30 75 50 C75 70 65 85 50 85 C35 85 25 70 25 50 C25 30 35 15 50 15 Z" />
              <circle cx="50" cy="50" r="10" />
            </svg>
            <div className="absolute top-1 left-1 text-[8px] text-[#f3cf5b]">✦</div>
            <div className="absolute top-1 right-1 text-[8px] text-[#f3cf5b]">✦</div>
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
          <div className="relative z-10 w-full h-[15vh] min-h-[50px] max-h-[90px] rounded-b-lg border border-[#d4af37]/40 bg-[#0B132B]/80 p-1 flex flex-col items-center justify-center shadow-inner overflow-hidden">
            <svg className="w-full h-full text-[#d4af37]/25 fill-current" viewBox="0 0 100 100">
              <polygon points="50,10 62,38 92,38 68,56 77,85 50,68 23,85 32,56 8,38 38,38" />
            </svg>
            <span className="text-[7px] uppercase font-mono tracking-widest text-[#d4af37]/60">
              Royal
            </span>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* 2. RIGHT PALACE DOOR */}
        {/* ------------------------------------------------------------- */}
        <div
          className="absolute top-0 bottom-0 right-0 w-1/2 z-20 flex flex-col justify-between p-3 border-l border-[#d4af37]/80 shadow-2xl pointer-events-none transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]"
          style={{
            background: themeStyles.doorBgRight,
            transformOrigin: 'right center',
            transform: isOpen ? 'translateX(100%) rotateY(90deg)' : 'translateX(0) rotateY(0deg)',
            opacity: isOpen ? 0 : 1,
            boxShadow: 'inset 6px 0 20px rgba(0,0,0,0.9), inset 0 0 15px rgba(212, 175, 55, 0.25)',
          }}
        >
          {/* Inner Golden Border */}
          <div className="absolute inset-2 border border-[#d4af37]/50 rounded-lg pointer-events-none" />

          {/* Top Jaali Arch */}
          <div className="relative z-10 w-full h-[15vh] min-h-[55px] max-h-[95px] rounded-t-lg border border-[#d4af37]/60 bg-[#0B132B]/80 p-1 flex flex-col items-center justify-center shadow-inner overflow-hidden">
            <svg className="w-full h-full text-[#d4af37]/40 fill-current" viewBox="0 0 100 100">
              <path d="M50 5 C30 5 15 25 15 50 C15 75 30 95 50 95 C70 95 85 75 85 50 C85 25 70 5 50 5 Z M50 15 C65 15 75 30 75 50 C75 70 65 85 50 85 C35 85 25 70 25 50 C25 30 35 15 50 15 Z" />
              <circle cx="50" cy="50" r="10" />
            </svg>
            <div className="absolute top-1 left-1 text-[8px] text-[#f3cf5b]">✦</div>
            <div className="absolute top-1 right-1 text-[8px] text-[#f3cf5b]">✦</div>
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
          <div className="relative z-10 w-full h-[15vh] min-h-[50px] max-h-[90px] rounded-b-lg border border-[#d4af37]/40 bg-[#0B132B]/80 p-1 flex flex-col items-center justify-center shadow-inner overflow-hidden">
            <svg className="w-full h-full text-[#d4af37]/25 fill-current" viewBox="0 0 100 100">
              <polygon points="50,10 62,38 92,38 68,56 77,85 50,68 23,85 32,56 8,38 38,38" />
            </svg>
            <span className="text-[7px] uppercase font-mono tracking-widest text-[#d4af37]/60">
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
          <span className="text-[9px] uppercase font-mono tracking-[0.25em] text-[#f3cf5b] font-bold drop-shadow mb-3">
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
            <div className="absolute -inset-4 rounded-full bg-[#d4af37]/40 blur-md animate-ping duration-1000" />
            <div className="absolute -inset-1.5 rounded-full bg-[#f3cf5b]/50 blur-sm animate-pulse" />

            {/* Wax Seal 3D Body */}
            <div
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full p-1.5 shadow-[0_0_35px_rgba(212,175,55,0.6)] border-2 border-[#d4af37] relative flex items-center justify-center group-hover:scale-105 active:scale-95 transition-transform"
              style={{ background: themeStyles.sealBg }}
            >
              <div className="w-full h-full rounded-full border border-dashed border-[#d4af37]/70 flex flex-col items-center justify-center bg-black/50 text-center p-1">
                <span className="text-sm">{theme.crestIcon || '👑'}</span>
                
                {/* Couple Monogram Initials */}
                <span className="font-serif text-lg sm:text-xl font-bold tracking-widest bg-gradient-to-r from-amber-200 via-yellow-200 to-amber-100 bg-clip-text text-transparent drop-shadow-md leading-none my-0.5">
                  {getMonogram()}
                </span>

                <span className="text-[6.5px] uppercase font-mono tracking-widest text-[#f3cf5b] font-bold">
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
            <p className="text-[9px] text-[#cbd5e1] font-mono tracking-wider">
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
          <div className="mt-2 flex flex-col items-center space-y-0.5 text-[8px] text-[#f3cf5b] uppercase font-mono tracking-widest animate-pulse">
            <span>Tap to Enter Palace</span>
            <ChevronDown className="w-3 h-3 animate-bounce text-[#f3cf5b]" />
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
