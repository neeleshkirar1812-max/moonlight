import React, { useState, useEffect, useRef } from 'react';
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
  Crown,
  Sparkles,
} from 'lucide-react';
import ZareqiaBody, { DamaskPattern } from './ZareqiaBody';

// =========================================================================
// 8 DISTINCT ROYAL SUITE THEME CONFIGURATIONS (Exact 1:1 Zareqia Mapping)
// =========================================================================
export const zareqiaRoyalThemes = {
  'rose-gold-blush-royal': {
    id: 'rose-gold-blush-royal',
    name: 'Royal Imperial',
    subtitle: 'Warm Gold & Champagne Rose',
    video: '/videos/rose-gold-blush.mp4',
    textColor: '#f5e6e0',
    accentColor: '#d4af37',
    primary: 'hsl(42, 75%, 48%)',
    fontStyle: 'dancing',
    scratch: {
      gradStart: '#e8cc82',
      gradMid: '#a9802d',
      gradEnd: '#5c421c',
      textColor: '#1a1208',
      accent: '#d4af37',
    },
    background: '#1C140E',
    musicPreset: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-wedding-113828.mp3',
  },
  'royal-majesty': {
    id: 'royal-majesty',
    name: 'Royal Majesty',
    subtitle: 'Porcelain Blue Ballroom & Silver Crystal',
    video: '/videos/royal-majesty.mp4',
    textColor: '#f1f5f9',
    accentColor: '#0284c7',
    primary: 'hsl(200, 75%, 48%)',
    fontStyle: 'dancing',
    scratch: {
      gradStart: '#bae6fd',
      gradMid: '#0284c7',
      gradEnd: '#082f49',
      textColor: '#ffffff',
      accent: '#38bdf8',
    },
    background: '#0b131e',
    musicPreset: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=piano-moment-9835.mp3',
  },
  'royal-elegance-royal': {
    id: 'royal-elegance-royal',
    name: 'Royal Elegance',
    subtitle: 'Crimson Velvet & Antique Gold Palace',
    video: '/videos/royal-elegance-royal.mp4',
    textColor: '#fef2f2',
    accentColor: '#dc2626',
    primary: 'hsl(0, 75%, 48%)',
    fontStyle: 'dancing',
    scratch: {
      gradStart: '#fca5a5',
      gradMid: '#b91c1c',
      gradEnd: '#450a0a',
      textColor: '#ffffff',
      accent: '#ef4444',
    },
    background: '#1a0303',
    musicPreset: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-wedding-113828.mp3',
  },
  'modern-minimal-royal': {
    id: 'royal-elegance-royal',
    name: 'Royal Elegance',
    subtitle: 'Crimson Velvet & Antique Gold Palace',
    video: '/videos/royal-elegance-royal.mp4',
    textColor: '#fef2f2',
    accentColor: '#dc2626',
    primary: 'hsl(0, 75%, 48%)',
    fontStyle: 'dancing',
    scratch: {
      gradStart: '#fca5a5',
      gradMid: '#b91c1c',
      gradEnd: '#450a0a',
      textColor: '#ffffff',
      accent: '#ef4444',
    },
    background: '#1a0303',
    musicPreset: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-wedding-113828.mp3',
  },
  'royal-prestige': {
    id: 'royal-prestige',
    name: 'Royal Prestige',
    subtitle: 'Blush Pink Velvet & Golden Foil',
    video: '/videos/royal-prestige.mp4',
    textColor: '#fde2e8',
    accentColor: '#be185d',
    primary: 'hsl(336, 75%, 48%)',
    fontStyle: 'dancing',
    scratch: {
      gradStart: '#fbcfe8',
      gradMid: '#db2777',
      gradEnd: '#831843',
      textColor: '#ffffff',
      accent: '#ec4899',
    },
    background: '#261019',
    musicPreset: 'https://cdn.pixabay.com/download/audio/2021/08/04/audio_bb630cc098.mp3?filename=acoustic-guitars-ambient-uplifting-11369.mp3',
  },
  'royal-heritage': {
    id: 'royal-heritage',
    name: 'Royal Heritage',
    subtitle: 'Mediterranean Sky Blue & Platinum Grandeur',
    video: '/videos/royal-heritage.mp4',
    textColor: '#e0f2fe',
    accentColor: '#0369a1',
    primary: 'hsl(200, 75%, 48%)',
    fontStyle: 'dancing',
    scratch: {
      gradStart: '#bae6fd',
      gradMid: '#0284c7',
      gradEnd: '#0c4a6e',
      textColor: '#ffffff',
      accent: '#38bdf8',
    },
    background: '#081926',
    musicPreset: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-wedding-113828.mp3',
  },
  'royal-grace': {
    id: 'royal-grace',
    name: 'Royal Grace',
    subtitle: 'Sage Botanical Serenity & Emerald Pearl',
    video: '/videos/royal-grace.mp4',
    textColor: '#ecfdf5',
    accentColor: '#065f46',
    primary: 'hsl(160, 75%, 40%)',
    fontStyle: 'dancing',
    scratch: {
      gradStart: '#a7f3d0',
      gradMid: '#059669',
      gradEnd: '#064e3b',
      textColor: '#ffffff',
      accent: '#10b981',
    },
    background: '#0f1f18',
    musicPreset: 'https://cdn.pixabay.com/download/audio/2022/03/10/audio_c3574c82c3.mp3?filename=indian-classical-instrumental-110825.mp3',
  },
  'royal-crest': {
    id: 'royal-crest',
    name: 'Royal Crest',
    subtitle: 'Lakeside Wax Seal & Deep Burgundy Romance',
    video: '/videos/royal-crest.mp4',
    textColor: '#fef2f2',
    accentColor: '#881337',
    primary: 'hsl(345, 75%, 48%)',
    fontStyle: 'cinzel',
    scratch: {
      gradStart: '#fda4af',
      gradMid: '#9f1239',
      gradEnd: '#4c0519',
      textColor: '#ffffff',
      accent: '#f43f5e',
    },
    background: '#1f0810',
    musicPreset: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-wedding-113828.mp3',
  },
  'royal-legacy': {
    id: 'royal-legacy',
    name: 'Royal Legacy',
    subtitle: 'Rajputana Imperial Velvet & Gold Filigree',
    video: '/videos/royal-legacy.mp4',
    textColor: '#fef3c7',
    accentColor: '#d97706',
    primary: 'hsl(38, 75%, 48%)',
    fontStyle: 'cinzel',
    scratch: {
      gradStart: '#fde68a',
      gradMid: '#d97706',
      gradEnd: '#78350f',
      textColor: '#1a1208',
      accent: '#f59e0b',
    },
    background: '#1f0a07',
    musicPreset: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-wedding-113828.mp3',
  },
  'emerald-noir-royal': {
    id: 'emerald-noir-royal',
    name: 'Emerald Noir Royal',
    subtitle: 'Emerald Green Palace & Gold Inlay',
    video: '/videos/emerald-noir-royal.mp4',
    textColor: '#ecfdf5',
    accentColor: '#10b981',
    primary: 'hsl(160, 75%, 40%)',
    fontStyle: 'cinzel',
    scratch: {
      gradStart: '#6ee7b7',
      gradMid: '#059669',
      gradEnd: '#022c1b',
      textColor: '#ffffff',
      accent: '#10b981',
    },
    background: '#031910',
    musicPreset: 'https://cdn.pixabay.com/download/audio/2022/03/10/audio_c3574c82c3.mp3?filename=indian-classical-instrumental-110825.mp3',
  },
  'ivory-elegance-royal': {
    id: 'ivory-elegance-royal',
    name: 'Ivory Elegance & Crimson Royale',
    subtitle: 'Dark Charcoal & Velvet Crimson',
    video: '/videos/ivory-elegance-royal.mp4',
    textColor: '#fff1f2',
    accentColor: '#e11d48',
    primary: 'hsl(348, 75%, 48%)',
    fontStyle: 'cinzel',
    scratch: {
      gradStart: '#fda4af',
      gradMid: '#be123c',
      gradEnd: '#4c0519',
      textColor: '#ffffff',
      accent: '#f43f5e',
    },
    background: '#200308',
    musicPreset: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-wedding-113828.mp3',
  },
};

const ZareqiaRoyalSuite = ({ invitation = {}, isPreview = false, onRsvpSuccess }) => {
  const rawTemplateId =
    invitation.template_id ||
    invitation.templateId ||
    'rose-gold-blush-royal';

  const themeKey =
    zareqiaRoyalThemes[rawTemplateId] ? rawTemplateId :
    rawTemplateId === 'royal-elegance' ? 'royal-elegance-royal' :
    rawTemplateId === 'modern-minimal-royal' ? 'royal-elegance-royal' :
    'rose-gold-blush-royal';

  const theme = zareqiaRoyalThemes[themeKey] || zareqiaRoyalThemes['rose-gold-blush-royal'];

  const videoRef = useRef(null);
  const audioRef = useRef(null);

  const [hasStarted, setHasStarted] = useState(false);
  const [hasRevealed, setHasRevealed] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Couple Data
  const groomName = invitation.groom_name || invitation.groomName || 'Aarav Singhania';
  const brideName = invitation.bride_name || invitation.brideName || 'Kiara Malhotra';
  const coupleNames = invitation.names || `${groomName} & ${brideName}`;
  const groomParents =
    invitation.groom_parents || invitation.groomParents || 'Son of Mrs. Sunita & Mr. Rajesh Singhania';
  const brideParents =
    invitation.bride_parents || invitation.brideParents || 'Daughter of Mrs. Poonam & Mr. Anand Malhotra';

  // Release scroll when gate opens
  useEffect(() => {
    if (!hasRevealed) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [hasRevealed]);

  // Gate Tap to Open Trigger
  const handleOpenGate = async (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    if (hasStarted) return;
    setHasStarted(true);

    const vid = videoRef.current;
    if (vid) {
      try {
        vid.muted = true;
        vid.playsInline = true;
        vid.currentTime = 0;
        await vid.play();
      } catch {
        // Fallback if browser blocks video play
      }
    }

    if (audioRef.current) {
      audioRef.current.play().then(() => setIsPlayingMusic(true)).catch(() => {});
    }

    // 5.5s Gate Video reveal timing
    setTimeout(() => {
      setHasRevealed(true);
    }, 5500);
  };

  const handleVideoEnded = () => {
    setHasRevealed(true);
  };

  const handleScrollDown = () => {
    setHasRevealed(true);
    setTimeout(() => {
      const el = document.getElementById('invitation-welcome') || document.getElementById('invitation-scratch');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollBy({ top: window.innerHeight * 0.9, behavior: 'smooth' });
      }
    }, 100);
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
      `Namaste! ✨\nYou are cordially invited to celebrate the royal wedding of ${coupleNames}.\n\nView our live digital invitation:\n${window.location.href}\n\nWith love,\n${coupleNames}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <div
      className={`font-sans selection:bg-amber-600 selection:text-white ${
        !hasRevealed ? 'h-screen overflow-hidden' : 'min-h-screen'
      }`}
      style={{
        backgroundColor: theme.background,
        color: theme.textColor,
        '--primary': theme.accentColor,
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

      {/* Floating Action Toolbar */}
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
          SECTION 1: 4K VIDEO GATE & COUPLE NAME REVEAL HERO (Zareqia 1:1)
         ========================================================================= */}
      <section
        className="relative min-h-screen w-full overflow-hidden flex items-center justify-center cursor-pointer select-none"
        style={{ backgroundColor: '#0f0f0f' }}
        onClick={handleOpenGate}
      >
        {/* Full-Bleed Video Element */}
        <video
          ref={videoRef}
          key={theme.video}
          src={theme.video}
          playsInline
          muted
          preload="auto"
          controls={false}
          disablePictureInPicture
          controlsList="nodownload noplaybackrate noremoteplayback nofullscreen"
          onContextMenu={(e) => e.preventDefault()}
          onEnded={handleVideoEnded}
          onError={() => setHasRevealed(true)}
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Initial Gate Screen Interactive Prompt */}
        {!hasStarted && (
          <div className="relative z-30 flex flex-col items-center justify-center px-6 text-center animate-fade-in pointer-events-none">
            <div className="mb-5 relative pointer-events-auto">
              <button
                type="button"
                onClick={handleOpenGate}
                className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-amber-400/90 flex items-center justify-center bg-black/60 backdrop-blur-md shadow-[0_0_40px_rgba(212,175,55,0.4)] hover:scale-105 active:scale-95 transition-all cursor-pointer group"
              >
                <Crown className="w-10 h-10 md:w-12 md:h-12 text-amber-300 group-hover:text-amber-200 transition-colors" />
              </button>
              <div className="absolute -inset-2.5 rounded-full border border-amber-400/40 animate-ping pointer-events-none" />
            </div>

            <span className="text-[11px] md:text-xs font-mono uppercase tracking-[0.3em] text-amber-300 font-bold mb-1 drop-shadow-md">
              👑 {theme.name}
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-white tracking-wide mb-2 drop-shadow-lg">
              {coupleNames}
            </h2>
            <p className="text-xs md:text-sm text-neutral-300 font-serif italic mb-6">
              Cordially invite you to celebrate their Royal Wedding
            </p>

            <button
              type="button"
              onClick={handleOpenGate}
              className="pointer-events-auto px-8 py-3 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-serif font-bold text-xs uppercase tracking-widest shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center space-x-2"
            >
              <Sparkles className="w-4 h-4 text-neutral-900" />
              <span>TAP TO OPEN INVITATION</span>
            </button>
          </div>
        )}

        {/* Dark Luxury Gradient Overlay over Video */}
        <div
          className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${
            hasRevealed ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.2) 45%, rgba(0,0,0,0.65) 100%)',
          }}
        />

        {/* OPENED GATE REVEAL CONTENT (Zareqia Exact Overlay) */}
        <div
          className={`relative z-20 flex w-full flex-col items-center justify-center px-6 text-center pointer-events-none transition-all duration-1000 ${
            hasRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Top Heart Icon */}
          <div className="mb-3">
            <Heart size={26} className="mx-auto" style={{ color: theme.textColor }} fill="currentColor" />
          </div>

          {/* We are getting married */}
          <p
            className={`mb-3 whitespace-pre-line text-2xl md:text-4xl ${
              theme.fontStyle === 'cinzel' ? 'font-serif tracking-widest uppercase text-xl md:text-2xl' : 'font-dancing'
            }`}
            style={{ color: theme.textColor, textShadow: '0 2px 12px rgba(0,0,0,0.75)' }}
          >
            We are getting married
          </p>

          {/* Horizontal Lines with Center Heart */}
          <div className="my-3 flex items-center justify-center gap-3">
            <div className="h-px w-16" style={{ backgroundColor: 'rgba(245,230,224,0.45)' }} />
            <Heart size={10} style={{ color: theme.textColor }} fill="currentColor" />
            <div className="h-px w-16" style={{ backgroundColor: 'rgba(245,230,224,0.45)' }} />
          </div>

          {/* Groom Name */}
          <div className="space-y-1">
            <h1
              className={`leading-none tracking-wide text-6xl md:text-9xl ${
                theme.fontStyle === 'cinzel' ? 'font-serif uppercase tracking-wider text-4xl md:text-7xl' : 'font-dancing'
              }`}
              style={{ color: theme.textColor, textShadow: '0 2px 14px rgba(0,0,0,0.75)' }}
            >
              {groomName}
            </h1>
            {groomParents && (
              <p className="text-xs md:text-sm font-sans italic opacity-85 text-amber-200">
                {groomParents}
              </p>
            )}
          </div>

          {/* Ampersand */}
          <p
            className="my-2 font-dancing text-3xl md:text-4xl"
            style={{ color: 'rgba(245,230,224,0.85)', textShadow: '0 2px 10px rgba(0,0,0,0.6)' }}
          >
            &
          </p>

          {/* Bride Name */}
          <div className="space-y-1">
            <h1
              className={`leading-none tracking-wide text-6xl md:text-9xl ${
                theme.fontStyle === 'cinzel' ? 'font-serif uppercase tracking-wider text-4xl md:text-7xl' : 'font-dancing'
              }`}
              style={{ color: theme.textColor, textShadow: '0 2px 14px rgba(0,0,0,0.75)' }}
            >
              {brideName}
            </h1>
            {brideParents && (
              <p className="text-xs md:text-sm font-sans italic opacity-85 text-amber-200">
                {brideParents}
              </p>
            )}
          </div>
        </div>

        {/* Bottom Scroll Bounce Indicator */}
        {hasRevealed && (
          <div
            onClick={handleScrollDown}
            className="absolute inset-x-0 bottom-8 z-30 flex flex-col items-center gap-2 cursor-pointer transition-all duration-700 animate-bounce pointer-events-auto"
          >
            <span
              className="text-xs uppercase tracking-widest font-mono"
              style={{ color: 'rgba(245,230,224,0.8)', textShadow: '0 1px 6px rgba(0,0,0,0.7)' }}
            >
              Scroll Down
            </span>
            <ChevronDown size={20} style={{ color: theme.textColor }} />
          </div>
        )}
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

export default ZareqiaRoyalSuite;
