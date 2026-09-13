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
// THEME CONFIGURATIONS FOR THE 12 CLASSIC SUITES (1:1 Zareqia & Multi-Category)
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
  'little-sunshine': {
    id: 'little-sunshine',
    name: 'Prince & Princess Birthday',
    isDark: true,
    background: 'hsl(245, 45%, 12%)',
    foreground: 'hsl(45, 95%, 68%)',
    subText: 'hsl(245, 20%, 70%)',
    primaryColor: 'hsl(45, 95%, 68%)',
    accent: 'hsl(45, 95%, 60%)',
    doorLeftBg: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e1b4b 100%)',
    doorRightBg: 'linear-gradient(225deg, #1e1b4b 0%, #312e81 50%, #1e1b4b 100%)',
    doorBorder: '1px solid hsl(45, 90%, 50%)',
    sealColor: 'hsl(45, 90%, 45%)',
    sealHighlight: 'hsl(45, 95%, 65%)',
    sealAccent: '#1e1b4b',
    doorType: '3d-swing',
    cornerType: 'palace',
    fontStyle: 'cinzel',
    scratch: {
      gradStart: '#fde047',
      gradMid: '#ca8a04',
      gradEnd: '#1e1b4b',
      textColor: '#1e1b4b',
      accent: '#facc15',
    },
    musicPreset: 'https://cdn.pixabay.com/download/audio/2021/08/04/audio_bb630cc098.mp3?filename=acoustic-guitars-ambient-uplifting-11369.mp3',
  },
  'sweet-nesting-baby': {
    id: 'sweet-nesting-baby',
    name: 'Sweet Cradle Baby Shower',
    isDark: true,
    background: 'hsl(270, 50%, 12%)',
    foreground: 'hsl(280, 70%, 85%)',
    subText: 'hsl(270, 20%, 75%)',
    primaryColor: 'hsl(280, 70%, 85%)',
    accent: 'hsl(280, 60%, 70%)',
    doorLeftBg: 'linear-gradient(135deg, #2e1065 0%, #3b0764 50%, #2e1065 100%)',
    doorRightBg: 'linear-gradient(225deg, #2e1065 0%, #3b0764 50%, #2e1065 100%)',
    doorBorder: '1px solid hsl(280, 60%, 60%)',
    sealColor: 'hsl(280, 50%, 35%)',
    sealHighlight: 'hsl(280, 50%, 55%)',
    sealAccent: '#ffffff',
    doorType: 'slide-split',
    cornerType: 'floral',
    fontStyle: 'dancing',
    scratch: {
      gradStart: '#e9d5ff',
      gradMid: '#a855f7',
      gradEnd: '#3b0764',
      textColor: '#ffffff',
      accent: '#c084fc',
    },
    musicPreset: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=piano-moment-9835.mp3',
  },
  'silver-anniversary': {
    id: 'silver-anniversary',
    name: 'Silver Jubilee Milestone',
    isDark: true,
    background: 'hsl(240, 6%, 10%)',
    foreground: 'hsl(210, 20%, 90%)',
    subText: 'hsl(240, 5%, 65%)',
    primaryColor: 'hsl(210, 20%, 90%)',
    accent: 'hsl(210, 15%, 80%)',
    doorLeftBg: 'linear-gradient(135deg, #18181b 0%, #27272a 50%, #18181b 100%)',
    doorRightBg: 'linear-gradient(225deg, #18181b 0%, #27272a 50%, #18181b 100%)',
    doorBorder: '1px solid hsl(210, 15%, 50%)',
    sealColor: 'hsl(240, 5%, 25%)',
    sealHighlight: 'hsl(240, 5%, 45%)',
    sealAccent: '#ffffff',
    doorType: '3d-swing',
    cornerType: 'classic',
    fontStyle: 'cinzel',
    scratch: {
      gradStart: '#f4f4f5',
      gradMid: '#71717a',
      gradEnd: '#18181b',
      textColor: '#18181b',
      accent: '#a1a1aa',
    },
    musicPreset: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-wedding-113828.mp3',
  },
  'terracotta-boho': {
    id: 'terracotta-boho',
    name: 'Bohemian Griha Pravesh',
    isDark: true,
    background: 'hsl(24, 75%, 12%)',
    foreground: 'hsl(35, 80%, 75%)',
    subText: 'hsl(24, 30%, 65%)',
    primaryColor: 'hsl(35, 80%, 75%)',
    accent: 'hsl(24, 85%, 55%)',
    doorLeftBg: 'linear-gradient(135deg, #451a03 0%, #78350f 50%, #451a03 100%)',
    doorRightBg: 'linear-gradient(225deg, #451a03 0%, #78350f 50%, #451a03 100%)',
    doorBorder: '1px solid hsl(24, 70%, 40%)',
    sealColor: 'hsl(24, 80%, 30%)',
    sealHighlight: 'hsl(24, 80%, 50%)',
    sealAccent: '#fef3c7',
    doorType: 'slide-split',
    cornerType: 'minimal',
    fontStyle: 'cinzel',
    scratch: {
      gradStart: '#fed7aa',
      gradMid: '#c2410c',
      gradEnd: '#451a03',
      textColor: '#ffffff',
      accent: '#ea580c',
    },
    musicPreset: 'https://cdn.pixabay.com/download/audio/2021/08/04/audio_bb630cc098.mp3?filename=acoustic-guitars-ambient-uplifting-11369.mp3',
  },
  'mehendi-magic': {
    id: 'mehendi-magic',
    name: 'Marigold Henna Utsav',
    isDark: true,
    background: 'hsl(36, 80%, 12%)',
    foreground: 'hsl(48, 95%, 65%)',
    subText: 'hsl(36, 40%, 65%)',
    primaryColor: 'hsl(48, 95%, 65%)',
    accent: 'hsl(42, 95%, 50%)',
    doorLeftBg: 'linear-gradient(135deg, #451a03 0%, #713f12 50%, #451a03 100%)',
    doorRightBg: 'linear-gradient(225deg, #451a03 0%, #713f12 50%, #451a03 100%)',
    doorBorder: '1px solid hsl(42, 90%, 45%)',
    sealColor: 'hsl(42, 85%, 35%)',
    sealHighlight: 'hsl(42, 90%, 55%)',
    sealAccent: '#fef08a',
    doorType: '3d-swing',
    cornerType: 'floral',
    fontStyle: 'dancing',
    scratch: {
      gradStart: '#fef08a',
      gradMid: '#ca8a04',
      gradEnd: '#451a03',
      textColor: '#1a1208',
      accent: '#eab308',
    },
    musicPreset: 'https://cdn.pixabay.com/download/audio/2022/03/10/audio_c3574c82c3.mp3?filename=indian-classical-instrumental-110825.mp3',
  },
  'celestial-night': {
    id: 'celestial-night',
    name: 'Celestial Galaxy Night',
    isDark: true,
    background: 'hsl(222, 60%, 6%)',
    foreground: 'hsl(186, 90%, 75%)',
    subText: 'hsl(222, 30%, 70%)',
    primaryColor: 'hsl(186, 90%, 75%)',
    accent: 'hsl(186, 85%, 55%)',
    doorLeftBg: 'linear-gradient(135deg, #030712 0%, #0f172a 50%, #030712 100%)',
    doorRightBg: 'linear-gradient(225deg, #030712 0%, #0f172a 50%, #030712 100%)',
    doorBorder: '1px solid hsl(186, 70%, 40%)',
    sealColor: 'hsl(222, 50%, 20%)',
    sealHighlight: 'hsl(186, 80%, 50%)',
    sealAccent: '#06b6d4',
    doorType: 'slide-split',
    cornerType: 'minimal',
    fontStyle: 'cinzel',
    scratch: {
      gradStart: '#a5f3fc',
      gradMid: '#0891b2',
      gradEnd: '#020617',
      textColor: '#ffffff',
      accent: '#22d3ee',
    },
    musicPreset: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=piano-moment-9835.mp3',
  },
  'coastal-breeze': {
    id: 'coastal-breeze',
    name: 'Goa Coastal Beachfront',
    isDark: true,
    background: 'hsl(198, 70%, 12%)',
    foreground: 'hsl(190, 80%, 80%)',
    subText: 'hsl(198, 30%, 70%)',
    primaryColor: 'hsl(190, 80%, 80%)',
    accent: 'hsl(190, 75%, 55%)',
    doorLeftBg: 'linear-gradient(135deg, #083344 0%, #164e63 50%, #083344 100%)',
    doorRightBg: 'linear-gradient(225deg, #083344 0%, #164e63 50%, #083344 100%)',
    doorBorder: '1px solid hsl(190, 60%, 40%)',
    sealColor: 'hsl(198, 60%, 25%)',
    sealHighlight: 'hsl(190, 70%, 50%)',
    sealAccent: '#cffafe',
    doorType: '3d-swing',
    cornerType: 'classic',
    fontStyle: 'dancing',
    scratch: {
      gradStart: '#cffafe',
      gradMid: '#0e7490',
      gradEnd: '#083344',
      textColor: '#083344',
      accent: '#06b6d4',
    },
    musicPreset: 'https://cdn.pixabay.com/download/audio/2021/08/04/audio_bb630cc098.mp3?filename=acoustic-guitars-ambient-uplifting-11369.mp3',
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
    const el = document.getElementById('invitation-welcome') || document.getElementById('invitation-scratch');
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

      {/* Background Audio */}
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
          className="p-2.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white hover:bg-black/80 shadow-2xl transition-all cursor-pointer"
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
          className="p-2.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white hover:bg-black/80 shadow-2xl transition-all cursor-pointer"
          title="Share QR Code"
        >
          <QrCode className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={handleShareWhatsApp}
          className="px-3.5 py-2 rounded-full bg-emerald-600/90 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider shadow-xl flex items-center space-x-1.5 transition-all cursor-pointer"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span className="hidden xs:inline">Share</span>
        </button>
      </div>

      {/* =========================================================================
          INTERACTIVE 3D PALACE GATES / ENVELOPE OPENING OVERLAY
         ========================================================================= */}
      {!doorsFadedOut && (
        <div
          className={`fixed inset-0 z-40 flex items-center justify-center overflow-hidden transition-opacity duration-1000 select-none ${
            hasDoorOpened ? 'pointer-events-none opacity-0 delay-1000' : 'opacity-100'
          }`}
          style={{ perspective: '1400px' }}
          onClick={handleOpenDoors}
        >
          {/* Left Door Panel */}
          <div
            className="absolute inset-y-0 left-0 w-1/2 flex items-center justify-end z-20 shadow-2xl"
            style={{
              background: theme.doorLeftBg,
              borderRight: theme.doorBorder,
              transformOrigin: 'left center',
              transform: hasDoorOpened
                ? theme.doorType === 'slide-split'
                  ? 'translateX(-100%)'
                  : theme.doorType === 'curtain-skew'
                  ? 'translateX(-100%) skewY(-8deg)'
                  : 'rotateY(-115deg)'
                : 'rotateY(0deg)',
              transition: 'transform 2.2s cubic-bezier(0.25, 1, 0.5, 1)',
            }}
          >
            {/* Ornate Corner Elements */}
            <div className="absolute top-6 left-6 pointer-events-none opacity-40">
              {theme.cornerType === 'palace' && <PalaceCorner className="w-16 h-16" />}
              {theme.cornerType === 'floral' && <FloralCorner className="w-16 h-16" />}
              {theme.cornerType === 'minimal' && <MinimalCorner className="w-16 h-16" />}
              {theme.cornerType === 'classic' && <ClassicCorner className="w-16 h-16" />}
            </div>
            <div className="absolute bottom-6 left-6 pointer-events-none opacity-40 rotate-270">
              {theme.cornerType === 'palace' && <PalaceCorner className="w-16 h-16" />}
              {theme.cornerType === 'floral' && <FloralCorner className="w-16 h-16" />}
              {theme.cornerType === 'minimal' && <MinimalCorner className="w-16 h-16" />}
              {theme.cornerType === 'classic' && <ClassicCorner className="w-16 h-16" />}
            </div>
          </div>

          {/* Right Door Panel */}
          <div
            className="absolute inset-y-0 right-0 w-1/2 flex items-center justify-start z-20 shadow-2xl"
            style={{
              background: theme.doorRightBg,
              borderLeft: theme.doorBorder,
              transformOrigin: 'right center',
              transform: hasDoorOpened
                ? theme.doorType === 'slide-split'
                  ? 'translateX(100%)'
                  : theme.doorType === 'curtain-skew'
                  ? 'translateX(100%) skewY(8deg)'
                  : 'rotateY(115deg)'
                : 'rotateY(0deg)',
              transition: 'transform 2.2s cubic-bezier(0.25, 1, 0.5, 1)',
            }}
          >
            {/* Ornate Corner Elements */}
            <div className="absolute top-6 right-6 pointer-events-none opacity-40 rotate-90">
              {theme.cornerType === 'palace' && <PalaceCorner className="w-16 h-16" />}
              {theme.cornerType === 'floral' && <FloralCorner className="w-16 h-16" />}
              {theme.cornerType === 'minimal' && <MinimalCorner className="w-16 h-16" />}
              {theme.cornerType === 'classic' && <ClassicCorner className="w-16 h-16" />}
            </div>
            <div className="absolute bottom-6 right-6 pointer-events-none opacity-40 rotate-180">
              {theme.cornerType === 'palace' && <PalaceCorner className="w-16 h-16" />}
              {theme.cornerType === 'floral' && <FloralCorner className="w-16 h-16" />}
              {theme.cornerType === 'minimal' && <MinimalCorner className="w-16 h-16" />}
              {theme.cornerType === 'classic' && <ClassicCorner className="w-16 h-16" />}
            </div>
          </div>

          {/* Golden Center Wax Seal Emblem */}
          <div
            className={`relative z-30 flex flex-col items-center justify-center pointer-events-auto transition-all duration-700 ${
              hasDoorOpened ? 'scale-150 opacity-0 blur-md' : 'scale-100 opacity-100'
            }`}
          >
            <button
              type="button"
              onClick={handleOpenDoors}
              className="w-24 h-24 md:w-28 md:h-28 rounded-full border-2 border-amber-400/80 flex flex-col items-center justify-center shadow-[0_0_50px_rgba(212,175,55,0.45)] hover:scale-105 active:scale-95 transition-all cursor-pointer group"
              style={{
                background: theme.sealColor,
                boxShadow: `0 0 35px ${theme.sealHighlight}`,
              }}
            >
              <Heart
                size={28}
                className="transition-transform group-hover:scale-110 mb-1"
                style={{ color: theme.sealAccent }}
                fill="currentColor"
              />
              <span
                className="text-[9px] uppercase tracking-widest font-mono font-bold text-center px-1"
                style={{ color: theme.sealAccent }}
              >
                OPEN
              </span>
            </button>
            <span className="mt-4 text-xs tracking-[0.25em] uppercase font-mono text-amber-200/90 drop-shadow">
              Tap to Open Invitation
            </span>
          </div>

          {/* Sparkles Particle Burst on Opening */}
          {hasDoorOpened &&
            sparkles.map((s) => (
              <div
                key={s.id}
                className="absolute z-50 rounded-full pointer-events-none animate-ping"
                style={{
                  width: s.size,
                  height: s.size,
                  backgroundColor: theme.accent,
                  left: '50%',
                  top: '50%',
                  transform: `translate(${s.tx}px, ${s.ty}px)`,
                  transition: 'transform 1.8s cubic-bezier(0.1, 0.9, 0.2, 1), opacity 1.8s ease-out',
                }}
              />
            ))}
        </div>
      )}

      {/* =========================================================================
          HERO REVEAL AFTER DOORS OPEN
         ========================================================================= */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-6 py-20 overflow-hidden">
        {/* Top Ornament */}
        <div className="mb-4">
          <Heart size={28} className="mx-auto" style={{ color: theme.foreground }} fill="currentColor" />
        </div>

        <p
          className={`mb-3 text-2xl md:text-3xl italic ${
            theme.fontStyle === 'cinzel' ? 'font-serif uppercase tracking-widest text-lg md:text-xl' : 'font-dancing'
          }`}
          style={{ color: theme.foreground }}
        >
          We are getting married
        </p>

        <HeartDivider />

        <div className="space-y-2 max-w-2xl mx-auto">
          <h1
            className={`leading-none tracking-wide text-5xl md:text-8xl ${
              theme.fontStyle === 'cinzel' ? 'font-serif uppercase tracking-wider text-4xl md:text-6xl' : 'font-dancing'
            }`}
            style={{ color: theme.foreground }}
          >
            {groomName}
          </h1>
          {groomParents && (
            <p className="text-xs md:text-sm italic opacity-80" style={{ color: theme.subText }}>
              {groomParents}
            </p>
          )}

          <p
            className="my-3 font-dancing text-3xl md:text-4xl"
            style={{ color: theme.foreground, opacity: 0.85 }}
          >
            &
          </p>

          <h1
            className={`leading-none tracking-wide text-5xl md:text-8xl ${
              theme.fontStyle === 'cinzel' ? 'font-serif uppercase tracking-wider text-4xl md:text-6xl' : 'font-dancing'
            }`}
            style={{ color: theme.foreground }}
          >
            {brideName}
          </h1>
          {brideParents && (
            <p className="text-xs md:text-sm italic opacity-80" style={{ color: theme.subText }}>
              {brideParents}
            </p>
          )}
        </div>

        {/* Scroll down button */}
        <div
          onClick={handleScrollDown}
          className="mt-12 flex flex-col items-center gap-1.5 cursor-pointer animate-bounce transition-all hover:scale-110"
        >
          <span className="text-[10px] uppercase tracking-widest font-mono opacity-80">
            Scroll Down
          </span>
          <ChevronDown size={18} style={{ color: theme.foreground }} />
        </div>
      </section>

      {/* =========================================================================
          MAIN INVITATION BODY SECTIONS
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
              className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 text-neutral-300 hover:text-white cursor-pointer"
            >
              <X size={18} />
            </button>
            <h3 className="font-serif text-xl font-bold text-amber-400">Scan & Share Invitation</h3>
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
            <p className="text-[11px] text-neutral-400 font-mono break-all">{window.location.href}</p>
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="w-full py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-1.5 transition-all cursor-pointer"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              <span>{copied ? 'Link Copied!' : 'Copy Live Link'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ZareqiaClassicSuite;
