import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Heart,
  ChevronDown,
  Volume2,
  VolumeX,
  Share2,
  QrCode,
  Copy,
  Check,
  X,
} from 'lucide-react';
import ZareqiaBody, {
  WaveOrnament,
  HeartDivider,
  PalaceCorner,
  FloralCorner,
  MinimalCorner,
  ClassicCorner,
  DamaskPattern,
} from './ZareqiaBody';

// =========================================================================
// THEME CONFIGURATIONS FOR THE 5 CLASSIC SUITES
// =========================================================================
export const zareqiaClassicThemes = {
  'emerald-noir': {
    id: 'emerald-noir',
    name: 'Emerald Noir',
    isDark: true,
    background: 'hsl(160, 25%, 8%)',
    foreground: 'hsl(40, 40%, 72%)',
    subText: 'hsl(40, 35%, 55%)',
    primaryColor: 'hsl(40, 40%, 72%)',
    accent: 'hsl(40, 50%, 55%)',
    doorLeftBg: 'linear-gradient(135deg, hsl(160, 30%, 12%) 0%, hsl(160, 25%, 16%) 50%, hsl(160, 20%, 10%) 100%)',
    doorRightBg: 'linear-gradient(225deg, hsl(160, 30%, 12%) 0%, hsl(160, 25%, 16%) 50%, hsl(160, 20%, 10%) 100%)',
    doorBorder: '1px solid hsl(40, 40%, 35%)',
    sealColor: 'hsl(160, 25%, 15%)',
    sealHighlight: 'hsl(160, 20%, 28%)',
    sealAccent: 'hsl(40, 50%, 65%)',
    doorType: '3d-swing',
    cornerType: 'classic',
    fontStyle: 'cinzel',
    scratch: {
      gradStart: '#d4af37',
      gradMid: '#2d6a4f',
      gradEnd: '#081c15',
      textColor: '#ffffff',
      accent: '#52b788',
    },
    musicPreset: 'https://cdn.pixabay.com/download/audio/2022/03/10/audio_c3574c82c3.mp3?filename=indian-classical-instrumental-110825.mp3',
  },
  'ivory-elegance': {
    id: 'ivory-elegance',
    name: 'Crimson Royale',
    isDark: true,
    background: 'hsl(0, 0%, 6%)',
    foreground: 'hsl(40, 45%, 70%)',
    subText: 'hsl(40, 35%, 55%)',
    primaryColor: 'hsl(40, 45%, 70%)',
    accent: 'hsl(0, 65%, 55%)',
    doorLeftBg: 'linear-gradient(135deg, hsl(0, 0%, 8%) 0%, hsl(0, 0%, 12%) 50%, hsl(0, 0%, 6%) 100%)',
    doorRightBg: 'linear-gradient(225deg, hsl(0, 0%, 8%) 0%, hsl(0, 0%, 12%) 50%, hsl(0, 0%, 6%) 100%)',
    doorBorder: '1px solid hsl(40, 40%, 25%)',
    sealColor: 'hsl(0, 65%, 22%)',
    sealHighlight: 'hsl(0, 55%, 42%)',
    sealAccent: 'hsl(40, 60%, 75%)',
    doorType: 'slide-split',
    cornerType: 'palace',
    fontStyle: 'cinzel',
    scratch: {
      gradStart: '#fda4af',
      gradMid: '#be123c',
      gradEnd: '#4c0519',
      textColor: '#ffffff',
      accent: '#f43f5e',
    },
    musicPreset: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-wedding-113828.mp3',
  },
  'rose-gold-blush': {
    id: 'rose-gold-blush',
    name: 'Rose Gold Blush',
    isDark: false,
    background: 'hsl(20, 30%, 97%)',
    foreground: 'hsl(350, 45%, 55%)',
    subText: 'hsl(350, 10%, 50%)',
    primaryColor: 'hsl(350, 45%, 55%)',
    accent: 'hsl(350, 45%, 55%)',
    doorLeftBg: 'linear-gradient(135deg, hsl(20, 35%, 94%) 0%, hsl(350, 30%, 90%) 50%, hsl(20, 25%, 88%) 100%)',
    doorRightBg: 'linear-gradient(225deg, hsl(20, 35%, 94%) 0%, hsl(350, 30%, 90%) 50%, hsl(20, 25%, 88%) 100%)',
    doorBorder: '1px solid hsl(350, 30%, 80%)',
    sealColor: 'hsl(350, 50%, 55%)',
    sealHighlight: 'hsl(350, 45%, 72%)',
    sealAccent: '#ffffff',
    doorType: '3d-swing',
    cornerType: 'floral',
    fontStyle: 'dancing',
    scratch: {
      gradStart: '#fbcfe8',
      gradMid: '#db2777',
      gradEnd: '#831843',
      textColor: '#ffffff',
      accent: '#ec4899',
    },
    musicPreset: 'https://cdn.pixabay.com/download/audio/2021/08/04/audio_bb630cc098.mp3?filename=acoustic-guitars-ambient-uplifting-11369.mp3',
  },
  'modern-minimal': {
    id: 'modern-minimal',
    name: 'Modern Minimal',
    isDark: true,
    background: 'hsl(220, 30%, 12%)',
    foreground: '#d4af37',
    subText: 'hsl(220, 10%, 60%)',
    primaryColor: '#d4af37',
    accent: '#d4af37',
    doorLeftBg: 'linear-gradient(135deg, hsl(220, 30%, 10%) 0%, hsl(220, 25%, 15%) 50%, hsl(220, 30%, 8%) 100%)',
    doorRightBg: 'linear-gradient(225deg, hsl(220, 30%, 10%) 0%, hsl(220, 25%, 15%) 50%, hsl(220, 30%, 8%) 100%)',
    doorBorder: '1px solid hsl(45, 40%, 35%)',
    sealColor: 'hsl(45, 70%, 45%)',
    sealHighlight: 'hsl(45, 60%, 60%)',
    sealAccent: 'hsl(220, 30%, 12%)',
    doorType: 'slide-split',
    cornerType: 'minimal',
    fontStyle: 'cinzel',
    scratch: {
      gradStart: '#fde68a',
      gradMid: '#d97706',
      gradEnd: '#1e293b',
      textColor: '#ffffff',
      accent: '#fbbf24',
    },
    musicPreset: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-wedding-113828.mp3',
  },
  'royal-elegance': {
    id: 'royal-elegance',
    name: 'Majestic Love',
    isDark: false,
    background: 'hsl(40, 30%, 96%)',
    foreground: 'hsl(40, 60%, 35%)',
    subText: 'hsl(40, 30%, 50%)',
    primaryColor: 'hsl(40, 60%, 35%)',
    accent: 'hsl(40, 60%, 45%)',
    doorLeftBg: 'linear-gradient(to right, hsl(0, 65%, 18%), hsl(0, 60%, 30%))',
    doorRightBg: 'linear-gradient(to left, hsl(0, 65%, 18%), hsl(0, 60%, 30%))',
    doorBorder: '1px solid hsl(40, 50%, 50%)',
    sealColor: 'hsl(0, 65%, 22%)',
    sealHighlight: 'hsl(0, 55%, 42%)',
    sealAccent: 'hsl(40, 60%, 75%)',
    doorType: 'curtain-skew',
    cornerType: 'palace',
    fontStyle: 'dancing',
    scratch: {
      gradStart: '#e8cc82',
      gradMid: '#a9802d',
      gradEnd: '#5c421c',
      textColor: '#1a1208',
      accent: '#d4af37',
    },
    musicPreset: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-wedding-113828.mp3',
  },
};

const ZareqiaClassicSuite = ({ invitation = {}, isPreview = false, onRsvpSuccess }) => {
  const templateId =
    invitation.template_id ||
    invitation.templateId ||
    'emerald-noir';

  const theme =
    zareqiaClassicThemes[templateId] ||
    zareqiaClassicThemes['emerald-noir'];

  const audioRef = useRef(null);
  const [hasDoorOpened, setHasDoorOpened] = useState(false);
  const [doorsFadedOut, setDoorsFadedOut] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Couple Info
  const groomName = invitation.groom_name || invitation.groomName || 'Aarav Singhania';
  const brideName = invitation.bride_name || invitation.brideName || 'Kiara Malhotra';
  const coupleNames = invitation.names || `${groomName} & ${brideName}`;
  const groomParents =
    invitation.groom_parents || invitation.groomParents || 'Son of Mrs. Sunita & Mr. Rajesh Singhania';
  const brideParents =
    invitation.bride_parents || invitation.brideParents || 'Daughter of Mrs. Poonam & Mr. Anand Malhotra';

  const handleOpenDoors = () => {
    if (hasDoorOpened) return;
    setHasDoorOpened(true);
    if (audioRef.current) {
      audioRef.current.play().then(() => setIsPlayingMusic(true)).catch(() => {});
    }
    setTimeout(() => {
      setDoorsFadedOut(true);
    }, 2800);
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlayingMusic) {
      audioRef.current.pause();
      setIsPlayingMusic(false);
    } else {
      audioRef.current.play().then(() => setIsPlayingMusic(true)).catch(() => {});
    }
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `Namaste! ✨\nYou are cordially invited to celebrate the wedding of ${coupleNames}.\n\nView our live digital invitation:\n${window.location.href}\n\nWith love,\n${coupleNames}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleScrollDown = () => {
    const el = document.getElementById('invitation-welcome');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollBy({ top: window.innerHeight * 0.85, behavior: 'smooth' });
    }
  };

  const sparkles = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => ({
        id: i,
        tx: (Math.random() - 0.5) * 600,
        ty: (Math.random() - 0.5) * 600,
        size: 3 + Math.random() * 4,
      })),
    []
  );

  return (
    <div
      className={`font-sans selection:bg-amber-600 selection:text-white ${
        !doorsFadedOut ? 'h-screen overflow-hidden' : 'min-h-screen'
      }`}
      style={{
        backgroundColor: theme.background,
        color: theme.foreground,
        '--primary': theme.accent,
      }}
    >
      <DamaskPattern />

      {/* Audio Element */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        src={invitation.music_url || invitation.musicUrl || theme.musicPreset}
      />

      {/* Floating Toolbar */}
      <div className="fixed top-4 right-4 z-50 flex items-center space-x-2">
        <button
          type="button"
          onClick={toggleMusic}
          className="p-2.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white hover:bg-black/80 shadow-2xl transition-all"
          title={isPlayingMusic ? 'Mute Music' : 'Play Music'}
        >
          {isPlayingMusic ? (
            <Volume2 className="w-4 h-4 text-amber-300 animate-pulse" />
          ) : (
            <VolumeX className="w-4 h-4 text-neutral-400" />
          )}
        </button>
        <button
          type="button"
          onClick={() => setQrOpen(true)}
          className="p-2.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white hover:bg-black/80 shadow-2xl transition-all"
          title="Share QR Code"
        >
          <QrCode className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={handleShareWhatsApp}
          className="px-3.5 py-2 rounded-full bg-emerald-600/90 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider shadow-xl flex items-center space-x-1.5 transition-all"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span className="hidden xs:inline">Share</span>
        </button>
      </div>

      {/* =========================================================================
          AUTHENTIC CLASSIC OPENING DOORS (Zareqia 1:1 Animation)
         ========================================================================= */}
      {!doorsFadedOut && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center select-none"
          style={{ perspective: '1600px', perspectiveOrigin: '50% 50%' }}
        >
          <div
            className={`absolute inset-0 transition-opacity duration-1000 ${
              hasDoorOpened ? 'opacity-20' : 'opacity-100'
            }`}
            style={{
              background: 'radial-gradient(ellipse at center, rgba(201,163,85,0.05) 0%, rgba(10,15,12,1) 100%)',
            }}
          />

          {/* Left Door */}
          <div
            className={`absolute top-0 left-0 w-1/2 h-full transition-transform duration-[2400ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
              theme.doorType === 'slide-split'
                ? hasDoorOpened
                  ? '-translate-x-full'
                  : 'translate-x-0'
                : theme.doorType === 'curtain-skew'
                ? hasDoorOpened
                  ? '-translate-x-full -skew-x-3'
                  : 'translate-x-0'
                : hasDoorOpened
                ? '-rotate-y-[90deg]'
                : 'rotate-y-0'
            }`}
            style={{
              transformOrigin: 'left center',
              transformStyle: 'preserve-3d',
              background: theme.doorLeftBg,
              borderRight: theme.doorBorder,
            }}
          >
            {theme.cornerType === 'floral' ? (
              <FloralCorner className="absolute top-6 left-6 w-20 h-20 opacity-30 text-rose-400" />
            ) : theme.cornerType === 'minimal' ? (
              <MinimalCorner className="absolute top-6 left-6 w-16 h-16 opacity-35 text-amber-400" />
            ) : (
              <ClassicCorner className="absolute top-6 right-6 w-16 h-16 opacity-30 text-amber-300" />
            )}
          </div>

          {/* Right Door */}
          <div
            className={`absolute top-0 right-0 w-1/2 h-full transition-transform duration-[2400ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
              theme.doorType === 'slide-split'
                ? hasDoorOpened
                  ? 'translate-x-full'
                  : 'translate-x-0'
                : theme.doorType === 'curtain-skew'
                ? hasDoorOpened
                  ? 'translate-x-full skew-x-3'
                  : 'translate-x-0'
                : hasDoorOpened
                ? 'rotate-y-[90deg]'
                : 'rotate-y-0'
            }`}
            style={{
              transformOrigin: 'right center',
              transformStyle: 'preserve-3d',
              background: theme.doorRightBg,
              borderLeft: theme.doorBorder,
            }}
          >
            {theme.cornerType === 'floral' ? (
              <FloralCorner className="absolute top-6 right-6 w-20 h-20 opacity-30 text-rose-400 -scale-x-100" />
            ) : theme.cornerType === 'minimal' ? (
              <MinimalCorner className="absolute top-6 right-6 w-16 h-16 opacity-35 text-amber-400 -scale-x-100" />
            ) : (
              <ClassicCorner className="absolute top-6 left-6 w-16 h-16 opacity-30 text-amber-300 -scale-x-100" />
            )}
          </div>

          {/* Center Royal Seal Button */}
          {!hasDoorOpened ? (
            <div
              onClick={handleOpenDoors}
              className="absolute z-20 flex flex-col items-center cursor-pointer group transform hover:scale-105 transition-transform duration-300"
            >
              <div
                className="w-28 h-28 md:w-36 md:h-36 rounded-full flex items-center justify-center shadow-2xl relative border-2 border-white/20 animate-pulse"
                style={{
                  background: `radial-gradient(circle at 35% 35%, ${theme.sealHighlight}, ${theme.sealColor})`,
                  boxShadow: '0 0 35px rgba(201, 163, 85, 0.4), inset 0 2px 4px rgba(255,255,255,0.3)',
                }}
              >
                <div
                  className="w-20 h-20 md:w-28 md:h-28 rounded-full border border-dashed flex flex-col items-center justify-center p-2 text-center"
                  style={{ borderColor: theme.sealAccent }}
                >
                  <span
                    className="font-serif text-xs md:text-sm uppercase tracking-[0.2em] font-bold"
                    style={{ color: theme.sealAccent }}
                  >
                    TAP TO
                  </span>
                  <span
                    className="font-serif text-sm md:text-base font-extrabold uppercase tracking-widest"
                    style={{ color: theme.sealAccent }}
                  >
                    OPEN
                  </span>
                </div>
              </div>
              <p
                className="mt-4 font-mono text-[11px] uppercase tracking-[0.3em] font-semibold"
                style={{ color: theme.foreground }}
              >
                {theme.name}
              </p>
            </div>
          ) : (
            <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
              {sparkles.map((sp) => (
                <div
                  key={sp.id}
                  className="absolute rounded-full animate-ping"
                  style={{
                    width: sp.size,
                    height: sp.size,
                    background: theme.accent,
                    transform: `translate(${sp.tx}px, ${sp.ty}px)`,
                    transition: 'all 1.5s ease-out',
                    opacity: 0,
                  }}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
          SECTION 1: REVEALED HERO SECTION (Exact Zareqia Layout)
         ========================================================================= */}
      <section
        className={`min-h-screen flex flex-col items-center justify-center px-6 text-center relative overflow-hidden transition-opacity duration-1000 ${
          doorsFadedOut ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 50% 40%, ${theme.accent}15, transparent 65%)`,
          }}
        />

        {/* 4 Corner Ornaments */}
        {theme.cornerType === 'floral' ? (
          <>
            <FloralCorner className="absolute top-6 left-6 w-24 h-24 text-rose-400 opacity-35" />
            <FloralCorner className="absolute top-6 right-6 w-24 h-24 text-rose-400 opacity-35 -scale-x-100" />
            <FloralCorner className="absolute bottom-6 left-6 w-24 h-24 text-rose-400 opacity-35 -scale-y-100" />
            <FloralCorner className="absolute bottom-6 right-6 w-24 h-24 text-rose-400 opacity-35 -scale-x-100 -scale-y-100" />
          </>
        ) : theme.cornerType === 'minimal' ? (
          <>
            <MinimalCorner className="absolute top-8 left-8 w-16 h-16 text-amber-400 opacity-40" />
            <MinimalCorner className="absolute top-8 right-8 w-16 h-16 text-amber-400 opacity-40 -scale-x-100" />
            <MinimalCorner className="absolute bottom-8 left-8 w-16 h-16 text-amber-400 opacity-40 -scale-y-100" />
            <MinimalCorner className="absolute bottom-8 right-8 w-16 h-16 text-amber-400 opacity-40 -scale-x-100 -scale-y-100" />
          </>
        ) : theme.cornerType === 'palace' ? (
          <>
            <PalaceCorner className="absolute top-6 left-6 w-20 h-20 text-primary opacity-35" />
            <PalaceCorner className="absolute top-6 right-6 w-20 h-20 text-primary opacity-35 -scale-x-100" />
            <PalaceCorner className="absolute bottom-6 left-6 w-20 h-20 text-primary opacity-35 -scale-y-100" />
            <PalaceCorner className="absolute bottom-6 right-6 w-20 h-20 text-primary opacity-35 -scale-x-100 -scale-y-100" />
          </>
        ) : (
          ['top-6 left-6', 'top-6 right-6 -scale-x-100', 'bottom-6 left-6 -scale-y-100', 'bottom-6 right-6 -scale-x-100 -scale-y-100'].map(
            (posClass, i) => (
              <ClassicCorner
                key={i}
                className={`absolute ${posClass} w-20 h-20 opacity-30 z-10 pointer-events-none text-primary`}
              />
            )
          )
        )}

        {/* Top Diamond Line Divider */}
        <div className="absolute top-16 md:top-20 left-1/2 -translate-x-1/2 w-64 md:w-80 z-10">
          <div className="flex items-center gap-4">
            <div
              className="flex-1 h-px"
              style={{ background: `linear-gradient(90deg, transparent, ${theme.accent})` }}
            />
            <div
              className="w-2.5 h-2.5 rotate-45 border"
              style={{ borderColor: theme.accent, backgroundColor: theme.background }}
            />
            <div
              className="flex-1 h-px"
              style={{ background: `linear-gradient(270deg, transparent, ${theme.accent})` }}
            />
          </div>
        </div>

        {/* Hero Card Typography */}
        <div className="relative z-10 max-w-lg space-y-4 pt-8">
          <p
            className="font-calligraphic text-xs tracking-[0.4em] uppercase font-bold"
            style={{ color: theme.subText }}
          >
            THE WEDDING CELEBRATION OF
          </p>

          <div className="space-y-1">
            <h1
              className={`text-5xl md:text-7xl lg:text-8xl font-normal tracking-wide ${
                theme.fontStyle === 'dancing' ? 'font-dancing' : 'font-cinzel'
              }`}
              style={{
                color: theme.foreground,
                textShadow: '0 2px 14px rgba(0,0,0,0.6)',
              }}
            >
              {groomName}
            </h1>
            {groomParents && (
              <p
                className="text-xs md:text-sm font-display italic opacity-85 pt-1"
                style={{ color: theme.accent }}
              >
                {groomParents}
              </p>
            )}
          </div>

          {/* Center Heart / Ampersand */}
          <div className="my-2 flex items-center justify-center gap-4">
            <div
              className="w-20 h-px"
              style={{ background: `linear-gradient(90deg, transparent, ${theme.accent})` }}
            />
            <span
              className="font-dancing text-3xl md:text-4xl"
              style={{ color: theme.accent }}
            >
              &
            </span>
            <div
              className="w-20 h-px"
              style={{ background: `linear-gradient(270deg, transparent, ${theme.accent})` }}
            />
          </div>

          <div className="space-y-1">
            <h1
              className={`text-5xl md:text-7xl lg:text-8xl font-normal tracking-wide ${
                theme.fontStyle === 'dancing' ? 'font-dancing' : 'font-cinzel'
              }`}
              style={{
                color: theme.foreground,
                textShadow: '0 2px 14px rgba(0,0,0,0.6)',
              }}
            >
              {brideName}
            </h1>
            {brideParents && (
              <p
                className="text-xs md:text-sm font-display italic opacity-85 pt-1"
                style={{ color: theme.accent }}
              >
                {brideParents}
              </p>
            )}
          </div>
        </div>

        {/* Bouncing Scroll Down Trigger */}
        <div
          onClick={handleScrollDown}
          className="absolute inset-x-0 bottom-8 z-20 flex flex-col items-center gap-2 cursor-pointer transition-all duration-700 animate-bounce pointer-events-auto"
        >
          <span
            className="text-[10px] uppercase tracking-[0.25em] font-mono"
            style={{ color: theme.subText }}
          >
            Scroll
          </span>
          <ChevronDown size={20} style={{ color: theme.accent }} />
        </div>
      </section>

      {/* =========================================================================
          SECTION 2 TO 9: SEAMLESS ZAREQIA INSIDE BODY
         ========================================================================= */}
      <ZareqiaBody
        data={invitation}
        invitationId={invitation._id || invitation.id || invitation.slug}
        theme={theme}
        scratchPalette={theme.scratch}
      />

      {/* QR Code Sharing Modal */}
      {qrOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
          onClick={() => setQrOpen(false)}
        >
          <div
            className="relative w-full max-w-sm rounded-3xl p-6 border border-primary/30 shadow-2xl text-center space-y-4 bg-neutral-900"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setQrOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 text-neutral-300 hover:text-white"
            >
              <X size={18} />
            </button>
            <h3 className="font-serif text-xl font-bold text-primary">Scan & Share Invitation</h3>
            <p className="text-xs text-neutral-400">Share this QR code with your guests:</p>
            <div className="p-4 bg-white rounded-2xl inline-block shadow-inner">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
                  window.location.href
                )}`}
                alt="Invitation QR Code"
                className="w-44 h-44 mx-auto"
              />
            </div>
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="w-full py-2.5 rounded-full border border-primary/40 text-primary font-mono text-xs uppercase tracking-wider flex items-center justify-center space-x-1.5 hover:bg-primary/10 transition-all"
            >
              {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
              <span>{copied ? 'Link Copied!' : 'Copy Invitation Link'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ZareqiaClassicSuite;
