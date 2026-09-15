import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Heart,
  Calendar,
  Clock,
  MapPin,
  Car,
  Shirt,
  Sparkles,
  Gift,
  Building,
  Navigation,
  CalendarPlus,
  Send,
  CheckCircle2,
  Share2,
  QrCode,
  Volume2,
  VolumeX,
  Mail,
  Users,
} from 'lucide-react';
import { downloadIcsFile } from '../../../utils/calendarGenerator';
import api from '../../../api/client';

// =========================================================================
// SVG ORNAMENTS & LUXURY MOTIFS
// =========================================================================

export const WaveOrnament = ({ className = '', style = {} }) => (
  <svg viewBox="0 0 400 40" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M0 20 Q50 5 100 20 Q150 35 200 20 Q250 5 300 20 Q350 35 400 20"
      stroke="currentColor"
      strokeWidth="1"
      opacity="0.4"
    />
    <path
      d="M0 20 Q50 10 100 20 Q150 30 200 20 Q250 10 300 20 Q350 30 400 20"
      stroke="currentColor"
      strokeWidth="0.6"
      opacity="0.25"
    />
    {[50, 100, 150, 200, 250, 300, 350].map((t) => (
      <circle key={t} cx={t} cy={20 + Math.sin(t * 0.03) * 8} r="2" fill="currentColor" opacity="0.35" />
    ))}
  </svg>
);

export const DiamondDivider = ({ className = '', style = {} }) => (
  <div className={`flex items-center justify-center gap-3 my-4 ${className}`} style={style}>
    <div className="w-12 sm:w-16 h-px bg-current opacity-30" />
    <span className="text-xs opacity-75">✦</span>
    <div className="w-12 sm:w-16 h-px bg-current opacity-30" />
  </div>
);

export const HeartDivider = ({ className = '', style = {} }) => (
  <div className={`flex items-center justify-center gap-3 my-4 ${className}`} style={style}>
    <div className="w-12 sm:w-16 h-px bg-current opacity-30" />
    <Heart size={12} className="opacity-60" fill="currentColor" />
    <div className="w-12 sm:w-16 h-px bg-current opacity-30" />
  </div>
);

export const FlourishDivider = ({ className = '', style = {} }) => (
  <div className={`flex items-center justify-center gap-2 my-5 ${className}`} style={style}>
    <div className="w-10 sm:w-14 h-px bg-current opacity-30" />
    <span className="text-sm opacity-60">❖</span>
    <div className="w-10 sm:w-14 h-px bg-current opacity-30" />
  </div>
);

export const PalaceSkyline = ({ className = '', style = {} }) => (
  <svg viewBox="0 0 800 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
    <rect x="100" y="170" width="600" height="6" rx="2" stroke="currentColor" strokeWidth="1.2" fill="none" />
    <path d="M350 170 V100 Q350 40 400 25 Q450 40 450 100 V170" stroke="currentColor" strokeWidth="1.2" fill="none" />
    <circle cx="400" cy="20" r="3" stroke="currentColor" strokeWidth="1.2" fill="none" />
    <rect x="180" y="120" width="140" height="50" rx="2" stroke="currentColor" strokeWidth="1.2" fill="none" />
    <path d="M210 120 V90 Q210 65 250 55 Q290 65 290 90 V120" stroke="currentColor" strokeWidth="1.2" fill="none" />
    <circle cx="250" cy="50" r="2.5" stroke="currentColor" strokeWidth="1.2" fill="none" />
    <rect x="480" y="120" width="140" height="50" rx="2" stroke="currentColor" strokeWidth="1.2" fill="none" />
    <path d="M510 120 V90 Q510 65 550 55 Q590 65 590 90 V120" stroke="currentColor" strokeWidth="1.2" fill="none" />
    <circle cx="550" cy="50" r="2.5" stroke="currentColor" strokeWidth="1.2" fill="none" />
  </svg>
);

export const PalaceCorner = ({ className = '', style = {} }) => (
  <svg viewBox="0 0 100 100" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M5 5C5 5 20 10 30 25C40 40 35 55 25 60C15 65 10 55 15 45C20 35 35 30 45 35C55 40 50 55 40 60"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      opacity="0.5"
    />
    <path
      d="M10 2C10 2 25 8 32 20C39 32 36 42 30 46"
      stroke="currentColor"
      strokeWidth="0.8"
      strokeLinecap="round"
      opacity="0.3"
    />
    <circle cx="30" cy="25" r="2" fill="currentColor" opacity="0.4" />
    <circle cx="25" cy="60" r="1.5" fill="currentColor" opacity="0.3" />
    <circle cx="45" cy="35" r="1.5" fill="currentColor" opacity="0.4" />
  </svg>
);

export const FloralCorner = ({ className = '', style = {} }) => (
  <svg viewBox="0 0 120 120" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M10 100C10 100 25 75 40 60C55 45 70 50 65 65C60 80 40 80 35 65C30 50 50 35 65 40C80 45 75 70 60 80"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      opacity="0.35"
    />
    <circle cx="40" cy="60" r="4" fill="currentColor" opacity="0.2" />
    <circle cx="35" cy="65" r="2.5" fill="currentColor" opacity="0.15" />
    <path d="M50 45C48 40 52 36 56 38C60 40 58 46 54 47" stroke="currentColor" strokeWidth="0.6" opacity="0.25" />
  </svg>
);

export const MinimalCorner = ({ className = '', style = {} }) => (
  <svg viewBox="0 0 80 80" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 0L30 0L30 2L2 2L2 30L0 30Z" stroke="currentColor" strokeWidth="1" opacity="0.4" />
    <path d="M8 8L22 8L22 10L10 10L10 22L8 22Z" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
    <circle cx="15" cy="15" r="1" fill="currentColor" opacity="0.3" />
  </svg>
);

export const ClassicCorner = ({ className = '', style = {} }) => (
  <svg viewBox="0 0 80 80" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 5 L5 30 Q5 50 25 60 L50 70" stroke="currentColor" strokeWidth="0.8" fill="none" />
    <path d="M8 5 L8 25 Q8 40 20 48" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.5" />
    <circle cx="5" cy="5" r="2" fill="currentColor" opacity="0.4" />
  </svg>
);

export const DamaskPattern = () => (
  <div
    className="fixed inset-0 pointer-events-none z-0"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c9a96e' fill-opacity='0.025'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
    }}
  />
);

// =========================================================================
// SECTION CONTAINER
// =========================================================================
export const ZareqiaSection = ({ children, className = '', cream = false, id = '', isDark = false, style = {} }) => (
  <section
    id={id}
    style={style}
    className={`py-12 sm:py-16 md:py-20 px-4 sm:px-6 relative overflow-hidden transition-all duration-700 ${
      cream ? (isDark ? 'bg-white/[0.03] backdrop-blur-xs' : 'bg-black/[0.02] backdrop-blur-xs') : ''
    } ${className}`}
  >
    {children}
  </section>
);

// =========================================================================
// 1. WELCOME QUOTATION BANNER
// =========================================================================
export const ZareqiaWelcomeQuote = ({
  groomName,
  brideName,
  coupleNames,
  welcomeMessage,
  gradient,
  textColor,
  accentColor,
  isDark = false,
}) => {
  return (
    <div
      id="invitation-welcome"
      className="w-full py-16 sm:py-20 px-6 text-center relative overflow-hidden transition-all duration-700 shadow-xl"
      style={{
        background: gradient || (isDark
          ? 'linear-gradient(to bottom, #000000 0%, #171717 50%, #262626 100%)'
          : 'linear-gradient(to bottom, #564A42 0%, #7A6A5F 45%, #C7B6A8 78%, #F3E9E2 100%)'),
        color: '#FAF5EE',
      }}
    >
      <div className="max-w-2xl mx-auto space-y-4 relative z-10">
        <span className="text-lg opacity-80 block" style={{ color: accentColor || '#D4AF37' }}>✦</span>

        <p className="font-serif italic text-base sm:text-lg md:text-xl leading-relaxed text-neutral-100 max-w-xl mx-auto px-4">
          {welcomeMessage ||
            `You are cordially invited to join us in celebrating the wedding celebration of ${coupleNames}, together with their families.`}
        </p>

        <p className="font-serif italic text-sm sm:text-base text-neutral-200 opacity-90 pt-1 flex items-center justify-center gap-1.5">
          <span>Join us as we step into forever, hand in hand with joy & love.</span>
          <span className="text-red-400">❤</span>
        </p>

        <span className="text-lg opacity-80 block pt-2" style={{ color: accentColor || '#D4AF37' }}>✦</span>
      </div>
    </div>
  );
};

// =========================================================================
// 2. SCRATCH TO REVEAL (Supports 'heart' for Royal & 'rect' for Classic)
// =========================================================================
export const ZareqiaScratchCard = ({
  weddingDateStr,
  weddingTimeStr,
  venueName,
  palette,
  coupleNames,
  welcomeMessage,
  venueAddress,
  accentColor,
  textColor,
  cardShape = 'heart', // 'heart' (Royal) or 'rect' (Classic)
  isDark = false,
}) => {
  const canvasRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [showCalOptions, setShowCalOptions] = useState(false);

  const formattedDate = useMemo(() => {
    try {
      const d = new Date(weddingDateStr);
      return d.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }).toUpperCase();
    } catch {
      return weddingDateStr;
    }
  }, [weddingDateStr]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.offsetWidth || (cardShape === 'rect' ? 260 : 220);
    const height = canvas.offsetHeight || (cardShape === 'rect' ? 140 : 200);
    const dpr = window.devicePixelRatio || 1;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // Radial Metallic Foil Gradient
    const grad = ctx.createRadialGradient(
      width * 0.45,
      height * 0.35,
      10,
      width * 0.5,
      height * 0.5,
      Math.max(width, height) * 0.75
    );
    grad.addColorStop(0, palette?.gradStart || '#fde68a');
    grad.addColorStop(0.45, palette?.gradMid || '#d97706');
    grad.addColorStop(1, palette?.gradEnd || '#78350f');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Rich Glitter Dust Speckles
    const speckCount = Math.floor(width * height * 0.28);
    for (let i = 0; i < speckCount; i++) {
      const sx = Math.random() * width;
      const sy = Math.random() * height;
      const r = Math.random();
      let color;
      if (r < 0.55) {
        color = 'rgba(255, 245, 210, ' + (0.4 + Math.random() * 0.5) + ')';
      } else if (r < 0.85) {
        color = 'rgba(255, 255, 255, ' + (0.5 + Math.random() * 0.5) + ')';
      } else {
        color = 'rgba(100, 60, 15, ' + (0.3 + Math.random() * 0.4) + ')';
      }
      ctx.fillStyle = color;
      const sz = Math.random() < 0.9 ? 1 : 1.6;
      ctx.fillRect(sx, sy, sz, sz);
    }

    // Sparkle Stardust Stars
    for (let i = 0; i < 50; i++) {
      const sx = Math.random() * width;
      const sy = Math.random() * height;
      ctx.fillStyle = 'rgba(255, 255, 255, ' + (0.8 + Math.random() * 0.2) + ')';
      ctx.beginPath();
      ctx.arc(sx, sy, 1 + Math.random() * 0.9, 0, Math.PI * 2);
      ctx.fill();
    }

    // Foil Center Prompt Text
    ctx.fillStyle = palette?.textColor || '#ffffff';
    ctx.font = 'bold 12px "Playfair Display", serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✦ Scratch to Reveal ✦', width / 2, height / 2);

    let cleared = 0;
    const total = width * height;

    const scratch = (x, y) => {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 22, 0, Math.PI * 2);
      ctx.fill();

      cleared += 380;
      if (cleared > total * 0.3) {
        setIsRevealed(true);
      }
    };

    const handleTouch = (e) => {
      const rect = canvas.getBoundingClientRect();
      const t = e.touches[0];
      if (t) scratch(t.clientX - rect.left, t.clientY - rect.top);
    };

    const handleMouseDown = (e) => {
      const rect = canvas.getBoundingClientRect();
      scratch(e.clientX - rect.left, e.clientY - rect.top);
    };

    const handleMouseMove = (e) => {
      if (e.buttons !== 1) return;
      const rect = canvas.getBoundingClientRect();
      scratch(e.clientX - rect.left, e.clientY - rect.top);
    };

    canvas.addEventListener('touchstart', handleTouch, { passive: true });
    canvas.addEventListener('touchmove', handleTouch, { passive: true });
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);

    return () => {
      canvas.removeEventListener('touchstart', handleTouch);
      canvas.removeEventListener('touchmove', handleTouch);
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isRevealed, palette, cardShape]);

  const handleDownloadIcs = () => {
    downloadIcsFile({
      title: `${coupleNames} - Wedding Celebration`,
      description: welcomeMessage || 'You are cordially invited to celebrate our wedding ceremony.',
      venue: venueName,
      address: venueAddress,
      date: weddingDateStr,
      time: weddingTimeStr,
      url: window.location.href,
    });
    setShowCalOptions(false);
  };

  const handleGoogleCalendar = () => {
    try {
      const dateClean = weddingDateStr.replace(/-/g, '');
      const timeClean = (weddingTimeStr || '19:00').replace(/:/g, '') + '00';
      const startDateTime = `${dateClean}T${timeClean}`;
      const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
        coupleNames + ' Wedding Celebration'
      )}&dates=${startDateTime}/${startDateTime}&details=${encodeURIComponent(
        welcomeMessage || 'Wedding Invitation'
      )}&location=${encodeURIComponent(venueName + ', ' + venueAddress)}`;
      window.open(url, '_blank');
    } catch {}
    setShowCalOptions(false);
  };

  return (
    <div className="max-w-md mx-auto text-center space-y-6">
      {/* SVG Clip Path Definition for Heart Shape */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <clipPath id="zareqiaHeartClip" clipPathUnits="objectBoundingBox">
            <path d="M 0.5, 0.88 C 0.5, 0.88 0.05, 0.58 0.05, 0.32 C 0.05, 0.12 0.22, 0.02 0.36, 0.02 C 0.45, 0.02 0.5, 0.12 0.5, 0.12 C 0.5, 0.12 0.55, 0.02 0.64, 0.02 C 0.78, 0.02 0.95, 0.12 0.95, 0.32 C 0.95, 0.58 0.5, 0.88 0.5, 0.88 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* Title */}
      <div className="space-y-1">
        <span className="text-base opacity-75" style={{ color: accentColor || '#D4AF37' }}>✦</span>
        <h2
          className="font-dancing text-4xl sm:text-5xl font-normal tracking-wide"
          style={{ color: accentColor || textColor }}
        >
          Scratch to Reveal
        </h2>
        <span className="text-base opacity-75" style={{ color: accentColor || '#D4AF37' }}>✦</span>
      </div>

      {cardShape === 'rect' ? (
        /* Rectangular Gold Scratch Foil (Classic Suite 1:1) */
        <div
          className={`relative w-60 sm:w-72 h-36 sm:h-40 mx-auto rounded-2xl overflow-hidden border shadow-2xl flex items-center justify-center select-none ${
            isDark ? 'bg-black/60 border-amber-400/40 text-white' : 'bg-white/90 border-amber-500/40 text-neutral-900'
          }`}
        >
          {/* Revealed Secret Wedding Info */}
          <div className="p-4 text-center space-y-1 z-0 animate-fade-in">
            <span className="text-xs opacity-75 block" style={{ color: accentColor }}>✦</span>
            <h3 className="font-serif text-base sm:text-lg font-bold tracking-wider leading-tight" style={{ color: textColor }}>
              {formattedDate}
            </h3>
            <p className="text-[11px] font-mono opacity-90 font-semibold" style={{ color: accentColor }}>
              AT {weddingTimeStr || '07:00 PM'}
            </p>
            <p className={`text-[9px] uppercase tracking-widest truncate max-w-[180px] mx-auto ${isDark ? 'text-neutral-300' : 'text-neutral-600'}`}>
              {venueName}
            </p>
          </div>

          {/* Canvas Scratch Foil Layer */}
          {!isRevealed && (
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full cursor-crosshair z-10 touch-none transition-opacity duration-700 rounded-2xl"
            />
          )}
        </div>
      ) : (
        /* Heart Shaped Gold Scratch Foil (Royal Suite 1:1) */
        <div className="relative w-52 h-48 sm:w-60 sm:h-56 mx-auto flex items-center justify-center select-none filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.12)]">
          <div
            className={`absolute inset-0 w-full h-full flex flex-col items-center justify-center p-6 text-center border ${
              isDark ? 'bg-black/60 border-amber-400/30 text-white' : 'bg-white/90 border-neutral-200/50 text-neutral-900'
            }`}
            style={{
              clipPath: 'url(#zareqiaHeartClip)',
              WebkitClipPath: 'url(#zareqiaHeartClip)',
            }}
          >
            <span className="text-xs opacity-75 mb-1" style={{ color: accentColor }}>✦</span>
            <h3 className="font-serif text-base sm:text-lg font-bold tracking-wider leading-tight" style={{ color: textColor }}>
              {formattedDate}
            </h3>
            <p className="text-[11px] font-mono opacity-90 pt-1" style={{ color: accentColor }}>
              AT {weddingTimeStr || '07:00 PM'}
            </p>
            <p className={`text-[9px] uppercase tracking-widest pt-1 max-w-[120px] truncate ${isDark ? 'text-neutral-300' : 'text-neutral-500'}`}>
              {venueName}
            </p>
          </div>

          {!isRevealed && (
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full cursor-crosshair z-10 touch-none transition-opacity duration-700"
              style={{
                clipPath: 'url(#zareqiaHeartClip)',
                WebkitClipPath: 'url(#zareqiaHeartClip)',
              }}
            />
          )}
        </div>
      )}

      {/* Save to Calendar Button */}
      <div className="relative inline-block text-center pt-2">
        <button
          type="button"
          onClick={() => setShowCalOptions((v) => !v)}
          className="px-8 py-2.5 rounded-full text-white font-mono text-xs uppercase tracking-[0.15em] font-semibold shadow-lg hover:opacity-90 transition-all flex items-center space-x-2 mx-auto cursor-pointer"
          style={{
            backgroundColor: accentColor || '#8B5A2B',
          }}
        >
          <CalendarPlus className="w-3.5 h-3.5 text-white" />
          <span>Save The Date</span>
        </button>

        {showCalOptions && (
          <div className={`absolute left-1/2 -translate-x-1/2 mt-3 w-56 backdrop-blur-xl rounded-2xl shadow-2xl z-40 overflow-hidden text-left py-1 text-xs font-sans animate-fade-in border ${
            isDark ? 'bg-neutral-900/95 text-white border-white/20' : 'bg-white/95 text-neutral-900 border-neutral-300'
          }`}>
            <button
              onClick={handleGoogleCalendar}
              className={`w-full px-4 py-2.5 flex items-center space-x-2 transition-colors cursor-pointer ${
                isDark ? 'hover:bg-white/10 text-neutral-100' : 'hover:bg-neutral-100 text-neutral-800'
              }`}
            >
              <span>📅 Google Calendar</span>
            </button>
            <button
              onClick={handleDownloadIcs}
              className={`w-full px-4 py-2.5 flex items-center space-x-2 transition-colors border-t cursor-pointer ${
                isDark ? 'hover:bg-white/10 text-neutral-100 border-white/10' : 'hover:bg-neutral-100 text-neutral-800 border-neutral-100'
              }`}
            >
              <span>🍏 Apple / Outlook (.ics)</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// =========================================================================
// 3. MOMENTS OF LOVE / PHOTO CARD
// =========================================================================
export const ZareqiaPhotoCard = ({ coverImage, photos = [], accentColor, isDark = false }) => {
  const defaultPhoto =
    coverImage ||
    (photos && photos.length > 0 ? photos[0] : null) ||
    'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85';

  return (
    <div className="max-w-2xl mx-auto text-center space-y-4">
      <span className="text-base opacity-75" style={{ color: accentColor || '#D4AF37' }}>✦</span>

      <div className={`w-full rounded-2xl overflow-hidden shadow-2xl border transform transition-transform duration-700 hover:scale-[1.01] ${
        isDark ? 'border-white/10 bg-black/40' : 'border-black/10 bg-black/5'
      }`}>
        <img
          src={defaultPhoto}
          alt="Moments of Love"
          className="w-full h-64 sm:h-80 md:h-96 object-cover"
        />
      </div>
    </div>
  );
};

// =========================================================================
// 4. COUNTDOWN TO FOREVER
// =========================================================================
export const ZareqiaCountdown = ({ weddingDateStr, weddingTimeStr, accentColor, textColor, isDark = false, isHindi = false }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetTime = new Date(
      `${weddingDateStr}T${weddingTimeStr && weddingTimeStr.length === 5 ? weddingTimeStr + ':00' : weddingTimeStr || '19:00:00'}`
    ).getTime();

    const updateTimer = () => {
      const now = Date.now();
      const diff = targetTime - now;
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [weddingDateStr, weddingTimeStr]);

  const units = [
    { label: 'DAYS', val: timeLeft.days },
    { label: 'HOURS', val: timeLeft.hours },
    { label: 'MINUTES', val: timeLeft.minutes },
    { label: 'SECONDS', val: timeLeft.seconds },
  ];

  return (
    <div className="text-center relative max-w-xl mx-auto space-y-4">
      <h2
        className="font-dancing text-4xl sm:text-5xl font-normal tracking-wide"
        style={{ color: accentColor || textColor }}
      >
        {isHindi ? 'शुभ विवाह की उल्टी गिनती' : 'Counting Down to Forever'}
      </h2>
      <span className="text-base opacity-75" style={{ color: accentColor || '#D4AF37' }}>✦</span>

      <div className="flex justify-center gap-2 sm:gap-4 md:gap-6 pt-2">
        {units.map((unit, i) => (
          <div key={i} className="text-center">
            <div
              className={`w-16 sm:w-20 md:w-24 px-1 py-3 sm:px-3 sm:py-4 mb-2 rounded-xl border backdrop-blur-sm shadow-md ${
                isDark ? 'bg-white/10 border-white/20' : 'bg-white/60 border-black/10'
              }`}
              style={{ borderColor: accentColor ? accentColor + '40' : undefined }}
            >
              <span
                className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold block leading-none"
                style={{ color: accentColor || textColor }}
              >
                {String(unit.val).padStart(2, '0')}
              </span>
            </div>
            <span className={`text-[10px] uppercase font-mono tracking-[0.2em] font-medium ${
              isDark ? 'text-neutral-300' : 'text-neutral-600'
            }`}>
              {unit.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// =========================================================================
// 5. PROGRAM TIMELINE
// =========================================================================
export const ZareqiaTimeline = ({ events = [], accentColor, textColor, isDark = false, isHindi = false }) => {
  if (!events || events.length === 0) return null;

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="text-center space-y-1">
        <span className="text-base opacity-75" style={{ color: accentColor || '#D4AF37' }}>❖</span>
        <h2
          className="font-dancing text-4xl sm:text-5xl font-normal tracking-wide"
          style={{ color: accentColor || textColor }}
        >
          {isHindi ? 'मांगलिक कार्यक्रम' : 'Program Timeline'}
        </h2>
        <span className="text-base opacity-75" style={{ color: accentColor || '#D4AF37' }}>✦</span>
      </div>

      <div className="pt-4 pl-4 sm:pl-8">
        {events.map((ev, idx) => (
          <div key={idx} className="flex gap-4 sm:gap-6 mb-8 last:mb-0">
            {/* Continuous Line */}
            <div className="flex flex-col items-center pt-1.5">
              <div
                className="w-3.5 h-3.5 rounded-full shadow-md ring-4"
                style={{
                  backgroundColor: accentColor || '#8B5A2B',
                  ringColor: accentColor ? accentColor + '30' : 'rgba(0,0,0,0.1)',
                }}
              />
              {idx < events.length - 1 && (
                <div
                  className="w-px flex-1 mt-2 min-h-[60px]"
                  style={{ backgroundColor: accentColor ? accentColor + '40' : 'rgba(0,0,0,0.2)' }}
                />
              )}
            </div>

            {/* Event Details */}
            <div className="pb-4 flex-1 space-y-1">
              <h3
                className="font-display font-semibold text-lg sm:text-xl leading-snug"
                style={{ color: accentColor || textColor }}
              >
                ✦ {ev.title || ev.name}
              </h3>
              <div className={`flex flex-wrap items-center gap-2 text-xs font-mono ${
                isDark ? 'text-neutral-300' : 'text-neutral-600'
              }`}>
                <Clock size={12} style={{ color: accentColor }} />
                <span>{ev.time}</span>
                {ev.date && (
                  <>
                    <span className="opacity-40">•</span>
                    <span>{ev.date}</span>
                  </>
                )}
              </div>
              {ev.venue && (
                <p className={`text-xs flex items-center gap-1.5 pt-0.5 ${
                  isDark ? 'text-neutral-200' : 'text-neutral-700'
                }`}>
                  <MapPin size={12} style={{ color: accentColor }} className="shrink-0" />
                  <span>{ev.venue}</span>
                </p>
              )}
              {ev.description && (
                <p className={`text-xs mt-1 whitespace-pre-wrap break-words leading-relaxed ${
                  isDark ? 'text-neutral-300' : 'text-neutral-600'
                }`}>
                  {ev.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// =========================================================================
// 6. VENUE & MAP
// =========================================================================
export const ZareqiaVenue = ({ venueName, venueAddress, accentColor, textColor, isDark = false, isHindi = false }) => {
  const fullAddress = [venueName, venueAddress].filter(Boolean).join(', ');
  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(fullAddress)}&t=m&z=14&output=embed`;
  const mapDirectUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`;

  return (
    <div className="max-w-2xl mx-auto space-y-6 text-center">
      <div className="space-y-1">
        <MapPin className="mx-auto" size={24} style={{ color: accentColor || '#8B5A2B' }} />
        <h2
          className={`text-4xl sm:text-5xl font-normal tracking-wide ${isHindi ? 'font-rozha' : 'font-dancing'}`}
          style={{ color: accentColor || textColor }}
        >
          {isHindi ? 'विवाह स्थल' : 'Venue'}
        </h2>
        <span className="text-base opacity-75" style={{ color: accentColor || '#D4AF37' }}>✦</span>
      </div>

      <div className="space-y-1 mb-4">
        <p className="font-serif text-xl sm:text-2xl font-semibold" style={{ color: textColor }}>
          {venueName}
        </p>
        <p className={`text-xs sm:text-sm max-w-lg mx-auto ${isDark ? 'text-neutral-300' : 'text-neutral-600'}`}>
          {venueAddress}
        </p>
      </div>

      {/* Embedded Map */}
      <div className={`w-full h-64 sm:h-72 md:h-80 rounded-2xl overflow-hidden shadow-xl border ${
        isDark ? 'border-white/10 bg-black/40' : 'border-black/10 bg-neutral-100'
      }`}>
        <iframe
          src={mapEmbedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Wedding Venue Map"
        />
      </div>

      {/* Palace Silhouette & Maps Button */}
      <div className="max-w-sm mx-auto text-center pt-2 space-y-4">
        <PalaceSkyline className="w-full opacity-35 h-10" style={{ color: accentColor || '#8B5A2B' }} />
        <a
          href={mapDirectUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 px-8 py-2.5 rounded-full text-white font-mono text-xs uppercase tracking-[0.15em] font-semibold shadow-lg hover:opacity-90 transition-all cursor-pointer"
          style={{
            backgroundColor: accentColor || '#8B5A2B',
          }}
        >
          <Navigation size={13} />
          <span>{isHindi ? 'गूगल मैप पर देखें' : 'View on Google Maps'}</span>
        </a>
      </div>
    </div>
  );
};

// =========================================================================
// 7. DRESS CODE
// =========================================================================
export const ZareqiaDressCode = ({ accentColor, textColor, isDark = false }) => (
  <div className="max-w-xl mx-auto space-y-6 text-center">
    <div className="space-y-1">
      <Shirt className="mx-auto" size={24} style={{ color: accentColor || '#8B5A2B' }} />
      <h2
        className="font-dancing text-4xl sm:text-5xl font-normal tracking-wide"
        style={{ color: accentColor || textColor }}
      >
        Dress Code
      </h2>
      <span className="text-base opacity-75" style={{ color: accentColor || '#D4AF37' }}>✦</span>
    </div>

    <div className="grid grid-cols-2 gap-4 sm:gap-6 pt-2 text-center">
      <div className={`py-5 px-4 rounded-2xl border backdrop-blur-sm space-y-2 ${
        isDark ? 'bg-white/5 border-white/15' : 'bg-white/50 border-black/10'
      }`}>
        <h3 className="font-mono text-xs uppercase tracking-widest font-bold" style={{ color: accentColor || '#8B5A2B' }}>
          MEN
        </h3>
        <p className={`text-xs leading-relaxed ${isDark ? 'text-neutral-300' : 'text-neutral-600'}`}>
          Traditional Indian Sherwanis, Bandhgalas, or Classic Tuxedos.
        </p>
      </div>

      <div className={`py-5 px-4 rounded-2xl border backdrop-blur-sm space-y-2 ${
        isDark ? 'bg-white/5 border-white/15' : 'bg-white/50 border-black/10'
      }`}>
        <h3 className="font-mono text-xs uppercase tracking-widest font-bold" style={{ color: accentColor || '#8B5A2B' }}>
          WOMEN
        </h3>
        <p className={`text-xs leading-relaxed ${isDark ? 'text-neutral-300' : 'text-neutral-600'}`}>
          Traditional Lehengas, Sarees, Anarkalis, or Elegant Evening Gowns.
        </p>
      </div>
    </div>
  </div>
);

// =========================================================================
// 8. PRE-WEDDING EVENTS
// =========================================================================
export const ZareqiaPreWeddingEvents = ({ events = [], accentColor, textColor, isDark = false, isHindi = false }) => {
  const preEvents =
    events && events.length > 0
      ? events
      : [
          {
            title: 'Mehendi Ceremony',
            date: 'December 22, 2026',
            time: '04:00 PM',
            venue: 'Poolside Lawn',
          },
          {
            title: 'Haldi Ritual',
            date: 'December 23, 2026',
            time: '11:00 AM',
            venue: 'Courtyard Garden',
          },
          {
            title: 'Sangeet & Cocktail',
            date: 'December 23, 2026',
            time: '07:30 PM',
            venue: 'Grand Royal Ballroom',
          },
        ];

  return (
    <div className="max-w-xl mx-auto space-y-6 text-center">
      <div className="space-y-1">
        <Sparkles className="mx-auto" size={24} style={{ color: accentColor || '#8B5A2B' }} />
        <h2
          className={`text-4xl sm:text-5xl font-normal tracking-wide ${isHindi ? 'font-rozha' : 'font-dancing'}`}
          style={{ color: accentColor || textColor }}
        >
          {isHindi ? 'वैवाहिक उत्सव' : 'Pre-Wedding Events'}
        </h2>
        <span className="text-base opacity-75" style={{ color: accentColor || '#D4AF37' }}>✦</span>
      </div>

      <div className="space-y-4 pt-2">
        {preEvents.map((ev, i) => (
          <div key={i} className="space-y-0.5">
            <h3 className="font-serif text-base sm:text-lg font-semibold" style={{ color: textColor }}>
              {ev.title || ev.name}
            </h3>
            <p className={`text-xs ${isDark ? 'text-neutral-300' : 'text-neutral-600'}`}>
              {ev.date} • {ev.time}
            </p>
            {ev.venue && (
              <p className={`text-[11px] italic ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
                {ev.venue}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// =========================================================================
// 9. TRANSPORTATION
// =========================================================================
export const ZareqiaTransportation = ({ accentColor, textColor, isDark = false, isHindi = false }) => (
  <div className="max-w-lg mx-auto space-y-4 text-center">
    <div className="space-y-1">
      <Car className="mx-auto" size={24} style={{ color: accentColor || '#8B5A2B' }} />
      <h2
        className={`text-4xl sm:text-5xl font-normal tracking-wide ${isHindi ? 'font-rozha' : 'font-dancing'}`}
        style={{ color: accentColor || textColor }}
      >
        {isHindi ? 'आवागमन व्यवस्था' : 'Transportation'}
      </h2>
      <span className="text-base opacity-75" style={{ color: accentColor || '#D4AF37' }}>✦</span>
    </div>
    <p className={`text-xs sm:text-sm leading-relaxed max-w-md mx-auto ${isDark ? 'text-neutral-300' : 'text-neutral-600'}`}>
      {isHindi
        ? 'अतिथियों के लिए निर्धारित होटलों से विवाह स्थल तक वाहन सुविधा उपलब्ध है। सभी अतिथियों हेतु वैले पार्किंग की व्यवस्था है।'
        : 'Shuttle services will be available from designated partner hotels to the wedding venue. Complimentary valet parking is provided for all guests.'}
    </p>
  </div>
);

// =========================================================================
// 10. ACCOMMODATION
// =========================================================================
export const ZareqiaAccommodation = ({ accentColor, textColor, isDark = false, isHindi = false }) => (
  <div className="max-w-lg mx-auto space-y-4 text-center">
    <div className="space-y-1">
      <Building className="mx-auto" size={24} style={{ color: accentColor || '#8B5A2B' }} />
      <h2
        className={`text-4xl sm:text-5xl font-normal tracking-wide ${isHindi ? 'font-rozha' : 'font-dancing'}`}
        style={{ color: accentColor || textColor }}
      >
        {isHindi ? 'आवास व्यवस्था' : 'Accommodation'}
      </h2>
      <span className="text-base opacity-75" style={{ color: accentColor || '#D4AF37' }}>✦</span>
    </div>
    <p className={`text-xs sm:text-sm leading-relaxed max-w-md mx-auto ${isDark ? 'text-neutral-300' : 'text-neutral-600'}`}>
      {isHindi
        ? 'हमारे प्रिय अतिथियों के विश्राम हेतु हेरिटेज पैलेस में विशेष आवास व्यवस्था की गई है।'
        : 'Special room rates are reserved for our wedding guests at the Grand Palace Resort. Please mention our wedding party when booking.'}
    </p>
  </div>
);

// =========================================================================
// 11. GIFTS
// =========================================================================
export const ZareqiaGifts = ({ accentColor, textColor, isDark = false, isHindi = false }) => (
  <div className="max-w-lg mx-auto space-y-4 text-center">
    <div className="space-y-1">
      <Gift className="mx-auto" size={24} style={{ color: accentColor || '#8B5A2B' }} />
      <h2
        className={`text-4xl sm:text-5xl font-normal tracking-wide ${isHindi ? 'font-rozha' : 'font-dancing'}`}
        style={{ color: accentColor || textColor }}
      >
        {isHindi ? 'शुभकामनाएं एवं उपहार' : 'Gifts'}
      </h2>
      <span className="text-base opacity-75" style={{ color: accentColor || '#D4AF37' }}>✦</span>
    </div>
    <p className={`text-xs sm:text-sm leading-relaxed italic max-w-md mx-auto ${isDark ? 'text-neutral-300' : 'text-neutral-600'}`}>
      {isHindi
        ? '"आपका स्नेह, आशीर्वाद और उपस्थिति ही हमारे लिए सबसे अनमोल उपहार है। कृपया कोई भौतिक उपहार न लाएं।"'
        : '"Your presence, prayers, and heartfelt blessings are the greatest gift we could ask for. No boxed gifts requested."'}
    </p>
  </div>
);

// =========================================================================
// 12. RSVP
// =========================================================================
export const ZareqiaRsvp = ({ invitationId, coupleNames, accentColor, textColor, isDark = false, isHindi = false, onRsvpSuccess }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [attending, setAttending] = useState('Yes');
  const [guests, setGuests] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    setIsSubmitting(true);
    try {
      await api.post('/rsvp', {
        invitationId,
        name: name.trim(),
        email: email.trim(),
        response: attending,
        guests: Number(guests) || 1,
      });
      setIsSubmitted(true);
      if (onRsvpSuccess) onRsvpSuccess();
    } catch {
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-6 text-center">
      <div className="space-y-1">
        <Mail className="mx-auto" size={24} style={{ color: accentColor || '#8B5A2B' }} />
        <h2
          className={`text-4xl sm:text-5xl font-normal tracking-wide ${isHindi ? 'font-rozha' : 'font-dancing'}`}
          style={{ color: accentColor || textColor }}
        >
          {isHindi ? 'उपस्थिति स्वीकृति (RSVP)' : 'RSVP'}
        </h2>
        <span className="text-base opacity-75" style={{ color: accentColor || '#D4AF37' }}>✦</span>
      </div>

      {isSubmitted ? (
        <div className={`p-8 rounded-2xl border backdrop-blur-md text-center space-y-3 animate-fade-in shadow-lg ${
          isDark ? 'bg-white/10 border-white/20 text-white' : 'bg-white/80 border-neutral-300 text-neutral-900'
        }`}>
          <CheckCircle2 className="w-12 h-12 mx-auto" style={{ color: accentColor || '#059669' }} />
          <h3 className="font-serif text-2xl font-semibold">
            {isHindi ? `हार्दिक धन्यवाद, ${name}!` : `Thank You, ${name}!`}
          </h3>
          <p className={`text-xs leading-relaxed ${isDark ? 'text-neutral-300' : 'text-neutral-600'}`}>
            {isHindi
              ? 'आपकी स्वीकृति सप्रेम दर्ज कर ली गई है। हम आपके आगमन की प्रतीक्षा करेंगे!'
              : 'Your response has been joyfully recorded. We look forward to celebrating together!'}
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 text-left text-xs">
          <div>
            <label className={`block font-mono text-[11px] uppercase tracking-wider mb-1.5 font-medium ${
              isDark ? 'text-neutral-300' : 'text-neutral-700'
            }`}>
              {isHindi ? 'अतिथि का पूरा नाम *' : 'Full Name *'}
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={isHindi ? 'आपका शुभ नाम' : 'Your Name'}
              className={`w-full px-4 py-3 rounded-xl border focus:outline-none transition-all ${
                isDark ? 'bg-black/50 border-white/20 text-white placeholder-neutral-500' : 'bg-white/80 border-neutral-300 text-neutral-900 placeholder-neutral-400'
              }`}
            />
          </div>

          <div>
            <label className={`block font-mono text-[11px] uppercase tracking-wider mb-1.5 font-medium ${
              isDark ? 'text-neutral-300' : 'text-neutral-700'
            }`}>
              {isHindi ? 'ईमेल या फोन नंबर *' : 'Email *'}
            </label>
            <input
              type="text"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={isHindi ? 'contact@example.com' : 'your.email@example.com'}
              className={`w-full px-4 py-3 rounded-xl border focus:outline-none transition-all ${
                isDark ? 'bg-black/50 border-white/20 text-white placeholder-neutral-500' : 'bg-white/80 border-neutral-300 text-neutral-900 placeholder-neutral-400'
              }`}
            />
          </div>

          <div>
            <label className={`block font-mono text-[11px] uppercase tracking-wider mb-1.5 font-medium ${
              isDark ? 'text-neutral-300' : 'text-neutral-700'
            }`}>
              {isHindi ? 'कुल सदस्यों की संख्या *' : 'Total Guest(s) *'}
            </label>
            <select
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border focus:outline-none transition-all ${
                isDark ? 'bg-neutral-900 border-white/20 text-white' : 'bg-white border-neutral-300 text-neutral-900'
              }`}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <option key={num} value={num}>
                  {num} {isHindi ? 'सदस्य' : num === 1 ? 'Guest' : 'Guests'}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={`block font-mono text-[11px] uppercase tracking-wider mb-1.5 font-medium ${
              isDark ? 'text-neutral-300' : 'text-neutral-700'
            }`}>
              {isHindi ? 'क्या आप पधार रहे हैं? *' : 'Will you attend? *'}
            </label>
            <select
              value={attending}
              onChange={(e) => setAttending(e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border focus:outline-none transition-all ${
                isDark ? 'bg-neutral-900 border-white/20 text-white' : 'bg-white border-neutral-300 text-neutral-900'
              }`}
            >
              <option value="Yes">{isHindi ? 'सहर्ष स्वीकार (अवश्य पधारेंगे)' : 'Joyfully Accept'}</option>
              <option value="No">{isHindi ? 'सस्नेह असमर्थ' : 'Regretfully Decline'}</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 rounded-full text-white font-mono text-xs uppercase tracking-[0.15em] font-semibold shadow-xl hover:opacity-90 flex items-center justify-center space-x-2 transition-all cursor-pointer mt-4"
            style={{
              backgroundColor: accentColor || '#8B5A2B',
            }}
          >
            {isSubmitting ? (
              <Sparkles className="w-4 h-4 animate-spin text-white" />
            ) : (
              <Send className="w-4 h-4 text-white" />
            )}
            <span>{isSubmitting ? (isHindi ? 'स्वीकृति दर्ज हो रही है...' : 'Recording RSVP...') : (isHindi ? 'उपस्थिति दर्ज करें' : 'SUBMIT RSVP')}</span>
          </button>
        </form>
      )}
    </div>
  );
};

// =========================================================================
// 13. CLOSING BANNER
// =========================================================================
export const ZareqiaClosingBanner = ({ coupleNames, groomName, brideName, accentColor, textColor, isDark = false, isHindi = false }) => {
  const signature = groomName && brideName ? `${groomName} & ${brideName}` : coupleNames;

  return (
    <div className="max-w-xl mx-auto py-12 px-6 text-center space-y-3">
      <h2
        className={`text-3xl sm:text-4xl md:text-5xl font-normal tracking-wide ${isHindi ? 'font-rozha' : 'font-dancing'}`}
        style={{ color: accentColor || textColor }}
      >
        {isHindi ? 'आपकी स्नेहिल उपस्थिति प्रार्थनीय है!' : "We can't wait to celebrate with you!"}
      </h2>
      <p
        className={`font-serif italic text-lg sm:text-xl pt-1 ${
          isDark ? 'text-neutral-200' : 'text-neutral-700'
        }`}
        style={{ color: textColor }}
      >
        {signature}
      </p>
      <div className="pt-2">
        <WaveOrnament className="w-48 sm:w-64 mx-auto opacity-50" style={{ color: accentColor || '#8B5A2B' }} />
      </div>
    </div>
  );
};

// =========================================================================
// MAIN EXPORTED ZAREQIA BODY ENGINE
// =========================================================================
const ZareqiaBody = ({
  data = {},
  invitationId = '',
  theme = {},
  scratchPalette = null,
  cardShape = 'heart', // 'heart' for Royal, 'rect' for Classic
  isDark = false,
  onRsvpSuccess,
}) => {
  const groomName = data.groom_name || data.groomName || 'Romeo';
  const brideName = data.bride_name || data.brideName || 'Juliet';
  const coupleNames = data.names || `${groomName} & ${brideName}`;

  const weddingDateStr = data.event_date || data.date || '2026-12-24';
  const weddingTimeStr = data.event_time || data.time || '19:00';
  const venueName = data.venue_name || data.venue || 'Grand Ballroom Hotel';
  const venueAddress =
    data.venue_address || data.venueAddress || '123 Grand Avenue, New York, NY 10001';
  const welcomeMessage =
    data.welcome_text ||
    data.message ||
    `You are cordially invited to join us in celebrating the wedding celebration of ${coupleNames}, together with their families.`;

  const coverImage = data.cover_image || data.coverImage;
  const photos = data.photos || data.gallery || [];

  const events =
    data.events && data.events.length > 0
      ? data.events
      : [
          {
            title: 'Guest Arrival',
            date: 'December 24, 2026',
            time: '10:00 AM - 11:00 AM',
            venue: 'Grand Welcome Foyer',
            description: 'Welcome drinks & traditional seating.',
          },
          {
            title: 'Wedding Ceremony',
            date: 'December 24, 2026',
            time: '11:30 AM - 01:00 PM',
            venue: 'Mandap Pavilion',
            description: 'The holy wedding vows and sacred pheras.',
          },
          {
            title: 'Reception Dinner',
            date: 'December 24, 2026',
            time: '07:00 PM onwards',
            venue: 'Grand Royal Ballroom',
            description: 'Gala dinner, music, and celebratory dance.',
          },
        ];

  const isHindi = Boolean(theme.isHindi || data.isHindi || data.language === 'hi');
  const effectiveIsDark = isDark || theme.isDark || (typeof theme.background === 'string' && (theme.background.includes('0%') || theme.background.includes('#0') || theme.background.includes('#1')));
  const effectiveShape = cardShape || theme.cardShape || 'heart';
  const accentColor = theme.accentColor || theme.accent || '#8B5A2B';
  const textColor = theme.textColor || theme.foreground || (effectiveIsDark ? '#FAF5EE' : '#1a1208');
  const welcomeGradient = theme.welcomeGradient;

  return (
    <div className="relative w-full z-10 space-y-4 font-sans">
      {/* 1. Welcome Quotation Top Banner */}
      <ZareqiaWelcomeQuote
        groomName={groomName}
        brideName={brideName}
        coupleNames={coupleNames}
        welcomeMessage={welcomeMessage}
        gradient={welcomeGradient}
        textColor={textColor}
        accentColor={accentColor}
        isDark={effectiveIsDark}
      />

      {/* 2. Interactive Scratch to Reveal Card */}
      <ZareqiaSection id="invitation-scratch" isDark={effectiveIsDark}>
        <ZareqiaScratchCard
          weddingDateStr={weddingDateStr}
          weddingTimeStr={weddingTimeStr}
          venueName={venueName}
          venueAddress={venueAddress}
          palette={scratchPalette || theme.scratch}
          coupleNames={coupleNames}
          welcomeMessage={welcomeMessage}
          accentColor={accentColor}
          textColor={textColor}
          cardShape={effectiveShape}
          isDark={effectiveIsDark}
        />
      </ZareqiaSection>

      {/* 3. Moments of Love / Photo Card Section */}
      <ZareqiaSection cream={true} id="invitation-photos" isDark={effectiveIsDark}>
        <ZareqiaPhotoCard
          coverImage={coverImage}
          photos={photos}
          accentColor={accentColor}
          isDark={effectiveIsDark}
        />
      </ZareqiaSection>

      {/* 4. Counting Down to Forever */}
      <ZareqiaSection id="invitation-countdown" isDark={effectiveIsDark}>
        <ZareqiaCountdown
          weddingDateStr={weddingDateStr}
          weddingTimeStr={weddingTimeStr}
          accentColor={accentColor}
          textColor={textColor}
          isDark={effectiveIsDark}
          isHindi={isHindi}
        />
      </ZareqiaSection>

      {/* 5. Program Timeline */}
      <ZareqiaSection cream={true} id="invitation-timeline" isDark={effectiveIsDark}>
        <ZareqiaTimeline
          events={events}
          accentColor={accentColor}
          textColor={textColor}
          isDark={effectiveIsDark}
          isHindi={isHindi}
        />
      </ZareqiaSection>

      {/* 6. Venue & Interactive Google Maps */}
      <ZareqiaSection id="invitation-venue" isDark={effectiveIsDark}>
        <ZareqiaVenue
          venueName={venueName}
          venueAddress={venueAddress}
          accentColor={accentColor}
          textColor={textColor}
          isDark={effectiveIsDark}
          isHindi={isHindi}
        />
      </ZareqiaSection>

      {/* 7. Dress Code */}
      <ZareqiaSection cream={true} id="invitation-dress-code" isDark={effectiveIsDark}>
        <ZareqiaDressCode
          accentColor={accentColor}
          textColor={textColor}
          isDark={effectiveIsDark}
          isHindi={isHindi}
        />
      </ZareqiaSection>

      {/* 8. Pre-Wedding Events */}
      <ZareqiaSection id="invitation-pre-wedding" isDark={effectiveIsDark}>
        <ZareqiaPreWeddingEvents
          events={data.pre_wedding_events || []}
          accentColor={accentColor}
          textColor={textColor}
          isDark={effectiveIsDark}
          isHindi={isHindi}
        />
      </ZareqiaSection>

      {/* 9. Transportation */}
      <ZareqiaSection cream={true} id="invitation-transportation" isDark={effectiveIsDark}>
        <ZareqiaTransportation
          accentColor={accentColor}
          textColor={textColor}
          isDark={effectiveIsDark}
          isHindi={isHindi}
        />
      </ZareqiaSection>

      {/* 10. Accommodation */}
      <ZareqiaSection id="invitation-accommodation" isDark={effectiveIsDark}>
        <ZareqiaAccommodation
          accentColor={accentColor}
          textColor={textColor}
          isDark={effectiveIsDark}
          isHindi={isHindi}
        />
      </ZareqiaSection>

      {/* 11. Gifts & Blessings */}
      <ZareqiaSection cream={true} id="invitation-gifts" isDark={effectiveIsDark}>
        <ZareqiaGifts
          accentColor={accentColor}
          textColor={textColor}
          isDark={effectiveIsDark}
          isHindi={isHindi}
        />
      </ZareqiaSection>

      {/* 12. RSVP Section */}
      <ZareqiaSection id="invitation-rsvp" isDark={effectiveIsDark}>
        <ZareqiaRsvp
          invitationId={invitationId}
          coupleNames={coupleNames}
          accentColor={accentColor}
          textColor={textColor}
          isDark={effectiveIsDark}
          isHindi={isHindi}
          onRsvpSuccess={onRsvpSuccess}
        />
      </ZareqiaSection>

      {/* 13. Closing Note Banner */}
      <ZareqiaSection cream={true} id="invitation-closing" isDark={effectiveIsDark}>
        <ZareqiaClosingBanner
          coupleNames={coupleNames}
          groomName={groomName}
          brideName={brideName}
          accentColor={accentColor}
          textColor={textColor}
          isDark={effectiveIsDark}
          isHindi={isHindi}
        />
      </ZareqiaSection>

      {/* 14. Luxury Footer */}
      <footer className={`py-10 text-center text-xs opacity-60 font-mono tracking-widest border-t space-y-2 ${
        effectiveIsDark ? 'border-white/10 text-neutral-300' : 'border-black/10 text-neutral-700'
      }`}>
        <Heart size={14} className="mx-auto opacity-50" fill="currentColor" style={{ color: accentColor }} />
        <p>With Warm Love & Regards • {coupleNames}</p>
        <p className="text-[10px] opacity-40">Created with Moonlight Luxury Suites</p>
      </footer>
    </div>
  );
};

export default ZareqiaBody;
