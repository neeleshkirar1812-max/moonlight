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
} from 'lucide-react';
import { downloadIcsFile } from '../../../utils/calendarGenerator';
import api from '../../../api/client';

// =========================================================================
// SVG ORNAMENTS & LUXURY MOTIFS REVERSE-ENGINEERED FROM ZAREQIA
// =========================================================================

export const WaveOrnament = ({ className = '' }) => (
  <svg viewBox="0 0 400 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M0 20 Q50 5 100 20 Q150 35 200 20 Q250 5 300 20 Q350 35 400 20"
      stroke="currentColor"
      strokeWidth="1"
      opacity="0.3"
    />
    <path
      d="M0 20 Q50 10 100 20 Q150 30 200 20 Q250 10 300 20 Q350 30 400 20"
      stroke="currentColor"
      strokeWidth="0.5"
      opacity="0.2"
    />
    {[50, 100, 150, 200, 250, 300, 350].map((t) => (
      <circle key={t} cx={t} cy={20 + Math.sin(t * 0.03) * 8} r="2" fill="currentColor" opacity="0.25" />
    ))}
  </svg>
);

export const HeartDivider = ({ className = '' }) => (
  <div className={`flex items-center justify-center gap-3 my-6 ${className}`}>
    <div className="w-16 h-px bg-current opacity-30" />
    <Heart size={12} className="opacity-60" fill="currentColor" />
    <div className="w-16 h-px bg-current opacity-30" />
  </div>
);

export const PalaceSkyline = ({ className = '' }) => (
  <svg viewBox="0 0 800 300" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="100" y="250" width="600" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <path d="M350 250 V160 Q350 80 400 60 Q450 80 450 160 V250" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <circle cx="400" cy="55" r="4" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <rect x="150" y="180" width="200" height="70" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <path d="M200 180 V140 Q200 110 250 100 Q300 110 300 140 V180" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <circle cx="250" cy="96" r="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <rect x="450" y="180" width="200" height="70" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <path d="M500 180 V140 Q500 110 550 100 Q600 110 600 140 V180" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <circle cx="550" cy="96" r="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
  </svg>
);

export const PalaceCorner = ({ className = '' }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
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

export const FloralCorner = ({ className = '', style }) => (
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

export const MinimalCorner = ({ className = '' }) => (
  <svg viewBox="0 0 80 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 0L30 0L30 2L2 2L2 30L0 30Z" stroke="currentColor" strokeWidth="1" opacity="0.4" />
    <path d="M8 8L22 8L22 10L10 10L10 22L8 22Z" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
    <circle cx="15" cy="15" r="1" fill="currentColor" opacity="0.3" />
  </svg>
);

export const ClassicCorner = ({ className = '' }) => (
  <svg viewBox="0 0 80 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
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
// SECTION WRAPPER (Rt) - Open, Seamless Luxury Container
// =========================================================================
export const ZareqiaSection = ({ children, className = '', cream = false, id = '' }) => (
  <section
    id={id}
    className={`py-16 md:py-20 px-6 relative overflow-hidden transition-all duration-700 ${
      cream ? 'bg-black/10 backdrop-blur-sm' : ''
    } ${className}`}
  >
    {children}
  </section>
);

// =========================================================================
// INTERACTIVE CANVAS SCRATCH CARD (ro / qte) - Exact 1:1 Zareqia Style
// =========================================================================
export const ZareqiaScratchCard = ({
  weddingDateStr,
  weddingTimeStr,
  venueName,
  palette,
  coupleNames,
  welcomeMessage,
  venueAddress,
}) => {
  const canvasRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [showCalOptions, setShowCalOptions] = useState(false);

  const formattedDate = useMemo(() => {
    try {
      const d = new Date(weddingDateStr);
      return d.toLocaleDateString('en-IN', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return weddingDateStr;
    }
  }, [weddingDateStr]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.offsetWidth || 340;
    const height = canvas.offsetHeight || 160;
    const dpr = window.devicePixelRatio || 1;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // Radial Gold Foil Gradient
    const grad = ctx.createRadialGradient(
      width * 0.4,
      height * 0.35,
      10,
      width * 0.5,
      height * 0.5,
      Math.max(width, height) * 0.75
    );
    grad.addColorStop(0, palette?.gradStart || '#e8cc82');
    grad.addColorStop(0.45, palette?.gradMid || '#a9802d');
    grad.addColorStop(1, palette?.gradEnd || '#5c421c');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Noise speckles (Gold dust texture)
    const speckCount = Math.floor(width * height * 0.22);
    for (let i = 0; i < speckCount; i++) {
      const sx = Math.random() * width;
      const sy = Math.random() * height;
      const r = Math.random();
      let color;
      if (r < 0.55) {
        color = 'rgba(255, 235, 180, ' + (0.35 + Math.random() * 0.55) + ')';
      } else if (r < 0.85) {
        color = 'rgba(212, 175, 55, ' + (0.4 + Math.random() * 0.5) + ')';
      } else if (r < 0.95) {
        color = 'rgba(120, 80, 20, ' + (0.4 + Math.random() * 0.4) + ')';
      } else {
        color = 'rgba(255, 255, 255, ' + (0.55 + Math.random() * 0.4) + ')';
      }
      ctx.fillStyle = color;
      const sz = Math.random() < 0.92 ? 1 : 1.5;
      ctx.fillRect(sx, sy, sz, sz);
    }

    // Sparkle stardust stars
    for (let i = 0; i < 70; i++) {
      const sx = Math.random() * width;
      const sy = Math.random() * height;
      ctx.fillStyle = 'rgba(255, 245, 200, ' + (0.7 + Math.random() * 0.3) + ')';
      ctx.beginPath();
      ctx.arc(sx, sy, 1.2 + Math.random() * 0.8, 0, Math.PI * 2);
      ctx.fill();
    }

    // Border
    ctx.strokeStyle = palette?.accent || '#d4af37';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(8, 8, width - 16, height - 16);

    // Text on Scratch Foil
    ctx.fillStyle = palette?.textColor || '#1a1208';
    ctx.font = 'bold 15px "Cormorant Garamond", "Playfair Display", serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✦ SCRATCH TO REVEAL ✦', width / 2, height / 2 - 8);

    ctx.font = '11px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = palette?.textColor ? palette.textColor + 'cc' : 'rgba(0,0,0,0.7)';
    ctx.fillText('Swipe or drag with finger to unlock', width / 2, height / 2 + 15);

    let cleared = 0;
    const total = width * height;

    const scratch = (x, y) => {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 24, 0, Math.PI * 2);
      ctx.fill();

      cleared += 400;
      if (cleared > total * 0.35) {
        setIsRevealed(true);
      }
    };

    const handleTouch = (e) => {
      const rect = canvas.getBoundingClientRect();
      const t = e.touches[0];
      if (t) scratch(t.clientX - rect.left, t.clientY - rect.top);
    };

    const handleMouse = (e) => {
      if (e.buttons !== 1) return;
      const rect = canvas.getBoundingClientRect();
      scratch(e.clientX - rect.left, e.clientY - rect.top);
    };

    canvas.addEventListener('touchmove', handleTouch, { passive: true });
    canvas.addEventListener('mousemove', handleMouse);

    return () => {
      canvas.removeEventListener('touchmove', handleTouch);
      canvas.removeEventListener('mousemove', handleMouse);
    };
  }, [isRevealed, palette]);

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
      <div className="space-y-1.5">
        <span className="text-[11px] uppercase tracking-[0.25em] text-primary font-mono font-medium block">
          ✦ Save The Date ✦
        </span>
        <h2 className="font-serif text-3xl md:text-4xl text-primary font-normal tracking-wide">
          Special Card Reveal
        </h2>
        <HeartDivider />
      </div>

      {/* Luxury Scratch Card Frame */}
      <div className="relative w-full h-44 sm:h-48 rounded-xl overflow-hidden bg-black/40 border border-primary/30 shadow-2xl flex items-center justify-center select-none">
        {/* Revealed Secret Wedding Information */}
        <div className="p-6 text-center space-y-2 z-0 animate-fade-in">
          <span className="text-[10px] uppercase tracking-[0.3em] text-primary/80 font-mono font-semibold block">
            YOU ARE CORDIALLY INVITED
          </span>
          <h3 className="font-serif text-xl sm:text-2xl font-semibold text-foreground tracking-wide">
            {formattedDate}
          </h3>
          <div className="flex items-center justify-center gap-2 text-xs text-primary/90 font-mono">
            <Clock size={13} className="text-primary" />
            <span>Ceremony Begins at {weddingTimeStr}</span>
          </div>
          <p className="text-xs text-muted-foreground pt-1 flex items-center justify-center gap-1.5">
            <MapPin size={12} className="text-primary/70" />
            <span>{venueName}</span>
          </p>
        </div>

        {/* Scratch Foil Layer */}
        {!isRevealed && (
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full cursor-crosshair z-10 touch-none transition-opacity duration-700"
          />
        )}
      </div>

      {/* Save to Calendar Button */}
      <div className="relative inline-block text-center">
        <button
          type="button"
          onClick={() => setShowCalOptions((v) => !v)}
          className="px-7 py-3 rounded-full bg-primary/20 hover:bg-primary/30 text-primary border border-primary/40 font-mono text-xs uppercase tracking-[0.15em] shadow-lg flex items-center justify-center space-x-2 transition-all mx-auto"
        >
          <CalendarPlus className="w-4 h-4 text-primary" />
          <span>Save The Date</span>
        </button>

        {showCalOptions && (
          <div className="absolute left-1/2 -translate-x-1/2 mt-3 w-56 bg-neutral-900/95 border border-primary/30 backdrop-blur-xl rounded-xl shadow-2xl z-40 overflow-hidden text-left py-1 text-xs font-sans animate-fade-in">
            <button
              onClick={handleGoogleCalendar}
              className="w-full px-4 py-2.5 text-neutral-200 hover:bg-primary/20 hover:text-primary flex items-center space-x-2 transition-colors"
            >
              <span>📅 Google Calendar</span>
            </button>
            <button
              onClick={handleDownloadIcs}
              className="w-full px-4 py-2.5 text-neutral-200 hover:bg-primary/20 hover:text-primary flex items-center space-x-2 transition-colors border-t border-white/5"
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
// LUXURY COUNTDOWN TO FOREVER (Hte) - Frosted Glass Pills
// =========================================================================
export const ZareqiaCountdown = ({ weddingDateStr, weddingTimeStr }) => {
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
    { label: 'Days', val: timeLeft.days },
    { label: 'Hours', val: timeLeft.hours },
    { label: 'Minutes', val: timeLeft.minutes },
    { label: 'Seconds', val: timeLeft.seconds },
  ];

  return (
    <div className="text-center relative max-w-xl mx-auto space-y-4">
      <h2 className="font-serif text-3xl md:text-5xl text-primary font-normal tracking-wide">
        Counting Down to Forever
      </h2>
      <HeartDivider />

      <div className="flex justify-center gap-2.5 sm:gap-4 md:gap-6 pt-2">
        {units.map((unit, i) => (
          <div key={i} className="text-center">
            <div className="w-16 sm:w-20 md:w-24 px-1 py-3 sm:px-3 sm:py-4 mb-2 rounded-xl border border-primary/25 bg-primary/10 backdrop-blur-md shadow-lg">
              <span className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold text-primary block leading-none">
                {String(unit.val).padStart(2, '0')}
              </span>
            </div>
            <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-foreground/75 font-medium">
              {unit.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// =========================================================================
// PROGRAM TIMELINE (Jte) - Continuous Golden Thread
// =========================================================================
export const ZareqiaTimeline = ({ events = [] }) => {
  if (!events || events.length === 0) return null;

  return (
    <div className="max-w-xl mx-auto space-y-4">
      <div className="text-center">
        <Calendar className="mx-auto text-primary mb-3" size={28} />
        <h2 className="font-serif text-3xl md:text-5xl text-primary font-normal tracking-wide">
          Program Timeline
        </h2>
        <HeartDivider />
      </div>

      <div className="pt-6 pl-2 sm:pl-6">
        {events.map((ev, idx) => (
          <div key={idx} className="flex gap-4 sm:gap-6 mb-8 last:mb-0">
            {/* Golden Timeline Node & Line */}
            <div className="flex flex-col items-center pt-1.5">
              <div className="w-3.5 h-3.5 rounded-full bg-primary shadow-[0_0_12px_rgba(212,175,55,0.6)] ring-4 ring-primary/20" />
              {idx < events.length - 1 && <div className="w-px flex-1 bg-primary/30 mt-2 min-h-[50px]" />}
            </div>

            {/* Event Details */}
            <div className="pb-4 flex-1 space-y-1">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-primary/80">
                <Clock size={12} className="text-primary" />
                <span>{ev.time}</span>
                {ev.date && (
                  <>
                    <span className="opacity-40">•</span>
                    <span>{ev.date}</span>
                  </>
                )}
              </div>
              <h3 className="text-primary font-display font-semibold text-lg md:text-xl leading-snug">
                {ev.title || ev.name}
              </h3>
              {ev.venue && (
                <p className="text-xs text-foreground/80 flex items-center gap-1.5 pt-0.5">
                  <MapPin size={12} className="text-primary/70 shrink-0" />
                  <span>{ev.venue}</span>
                </p>
              )}
              {ev.description && (
                <p className="text-xs text-muted-foreground mt-1 whitespace-pre-wrap break-words leading-relaxed">
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
// WEDDING VENUE & GOOGLE MAPS SECTION
// =========================================================================
export const ZareqiaVenue = ({ venueName, venueAddress }) => {
  const fullAddress = [venueName, venueAddress].filter(Boolean).join(', ');
  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(fullAddress)}&t=m&z=14&output=embed`;
  const mapDirectUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`;

  return (
    <div className="max-w-2xl mx-auto space-y-6 text-center">
      <MapPin className="mx-auto text-primary mb-3" size={28} />
      <h2 className="font-serif text-3xl md:text-5xl text-primary font-normal tracking-wide">
        Wedding Venue
      </h2>
      <HeartDivider />

      <div className="space-y-1.5 mb-6">
        <p className="font-display text-xl md:text-2xl font-semibold text-foreground">
          {venueName}
        </p>
        <p className="text-sm text-muted-foreground max-w-lg mx-auto">
          {venueAddress}
        </p>
      </div>

      {/* Embedded Map */}
      <div className="w-full h-72 md:h-80 rounded-2xl overflow-hidden shadow-2xl border border-primary/25 bg-black/20">
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
        <PalaceSkyline className="w-full text-primary opacity-25 h-12" />
        <a
          href={mapDirectUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 px-7 py-3 rounded-full bg-primary text-primary-foreground font-mono text-xs uppercase tracking-[0.15em] font-bold shadow-xl hover:opacity-90 transition-all"
        >
          <Navigation size={14} />
          <span>View on Google Maps</span>
        </a>
      </div>
    </div>
  );
};

// =========================================================================
// DRESS CODE SECTION
// =========================================================================
export const ZareqiaDressCode = () => (
  <div className="max-w-xl mx-auto space-y-6 text-center">
    <Shirt className="mx-auto text-primary mb-3" size={28} />
    <h2 className="font-serif text-3xl md:text-5xl text-primary font-normal tracking-wide">
      Dress Code
    </h2>
    <HeartDivider />

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
      <div className="py-4 px-6 rounded-xl border border-primary/20 bg-primary/5 backdrop-blur-sm space-y-2">
        <h3 className="font-display text-base font-semibold text-primary tracking-wide">
          Women
        </h3>
        <div className="w-8 h-px bg-primary/30 mx-auto" />
        <p className="text-xs text-muted-foreground leading-relaxed">
          Traditional Indian Lehengas, Sarees, Anarkalis, or Formal Evening Gowns in jewel tones.
        </p>
      </div>

      <div className="py-4 px-6 rounded-xl border border-primary/20 bg-primary/5 backdrop-blur-sm space-y-2">
        <h3 className="font-display text-base font-semibold text-primary tracking-wide">
          Men
        </h3>
        <div className="w-8 h-px bg-primary/30 mx-auto" />
        <p className="text-xs text-muted-foreground leading-relaxed">
          Royal Sherwanis, Bandhgalas, Kurtas with Nehru jackets, or Classic Tuxedos.
        </p>
      </div>
    </div>
  </div>
);

// =========================================================================
// GIFTS & BLESSINGS SECTION
// =========================================================================
export const ZareqiaGifts = () => (
  <div className="max-w-lg mx-auto space-y-4 text-center">
    <Gift className="mx-auto text-primary mb-3" size={28} />
    <h2 className="font-serif text-3xl md:text-5xl text-primary font-normal tracking-wide">
      Gifts & Blessings
    </h2>
    <HeartDivider />
    <p className="text-sm text-muted-foreground leading-relaxed italic whitespace-pre-line">
      "Your presence, warm smiles, and heartfelt blessings on our special day are the greatest gift of all.
      No boxed gifts please, only your blessings and love."
    </p>
  </div>
);

// =========================================================================
// RSVP & GUESTBOOK REGISTRY SECTION
// =========================================================================
export const ZareqiaRsvp = ({ invitationId, coupleNames }) => {
  const [name, setName] = useState('');
  const [attending, setAttending] = useState('Yes');
  const [guests, setGuests] = useState(1);
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
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
        response: attending,
        guests: Number(guests) || 1,
        phone: phone.trim(),
        message: message.trim(),
      });
      setIsSubmitted(true);
    } catch {
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto space-y-6 text-center">
      <Heart className="mx-auto text-primary mb-3" size={28} fill="currentColor" />
      <h2 className="font-serif text-3xl md:text-5xl text-primary font-normal tracking-wide">
        RSVP & Blessings
      </h2>
      <HeartDivider />

      {isSubmitted ? (
        <div className="p-8 rounded-2xl border border-primary/40 bg-primary/10 backdrop-blur-md text-center space-y-3 animate-fade-in">
          <CheckCircle2 className="w-12 h-12 text-primary mx-auto" />
          <h3 className="font-serif text-2xl font-semibold text-foreground">
            Thank You, {name}!
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Your response and warm blessings have been joyfully recorded. We cannot wait to celebrate together!
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 text-left text-xs">
          <div>
            <label className="block uppercase font-mono tracking-wider mb-1.5 text-primary/90 font-medium">
              Your Full Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Guest Name"
              className="w-full px-4 py-3 rounded-xl border border-primary/25 bg-black/40 text-foreground placeholder-neutral-500 focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block uppercase font-mono tracking-wider mb-1.5 text-primary/90 font-medium">
                Will you attend?
              </label>
              <select
                value={attending}
                onChange={(e) => setAttending(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-primary/25 bg-neutral-900 text-foreground focus:outline-none focus:border-primary transition-colors"
              >
                <option value="Yes">Joyfully Accept (Yes)</option>
                <option value="No">Regretfully Decline (No)</option>
              </select>
            </div>
            <div>
              <label className="block uppercase font-mono tracking-wider mb-1.5 text-primary/90 font-medium">
                Guest Count
              </label>
              <input
                type="number"
                min="1"
                max="10"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-primary/25 bg-black/40 text-foreground focus:outline-none focus:border-primary transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block uppercase font-mono tracking-wider mb-1.5 text-primary/90 font-medium">
              WhatsApp / Phone (Optional)
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 98765 43210"
              className="w-full px-4 py-3 rounded-xl border border-primary/25 bg-black/40 text-foreground placeholder-neutral-500 focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          <div>
            <label className="block uppercase font-mono tracking-wider mb-1.5 text-primary/90 font-medium">
              Wishes & Blessings for {coupleNames}
            </label>
            <textarea
              rows="3"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Share your love, blessings, or dietary notes..."
              className="w-full px-4 py-3 rounded-xl border border-primary/25 bg-black/40 text-foreground placeholder-neutral-500 focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-mono text-xs uppercase tracking-[0.15em] font-bold shadow-xl hover:opacity-90 flex items-center justify-center space-x-2 transition-all"
          >
            {isSubmitting ? (
              <Sparkles className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            <span>{isSubmitting ? 'Recording RSVP...' : 'Send RSVP & Blessings'}</span>
          </button>
        </form>
      )}
    </div>
  );
};

// =========================================================================
// MAIN EXPORTED ZAREQIA BODY ENGINE (yn)
// =========================================================================
const ZareqiaBody = ({
  data = {},
  invitationId = '',
  theme = {},
  scratchPalette = null,
}) => {
  const groomName = data.groom_name || data.groomName || 'Aarav Singhania';
  const brideName = data.bride_name || data.brideName || 'Kiara Malhotra';
  const coupleNames = data.names || `${groomName} & ${brideName}`;

  const weddingDateStr = data.event_date || data.date || '2026-11-20';
  const weddingTimeStr = data.event_time || data.time || '19:00';
  const venueName = data.venue_name || data.venue || 'The Leela Palace, Udaipur';
  const venueAddress =
    data.venue_address || data.venueAddress || 'Lake Pichola, Udaipur, Rajasthan 313001';
  const welcomeMessage =
    data.welcome_text ||
    data.message ||
    'Invite you to share in the joy of the beginning of their new life together.';

  const events =
    data.events && data.events.length > 0
      ? data.events
      : [
          {
            title: 'Mehendi & Sangeet Night',
            date: '2026-11-19',
            time: '06:00 PM',
            venue: 'The Leela Palace Courtyard',
            description: 'Vibrant henna rituals, joyful folk beats, and celebratory cocktail dinner.',
          },
          {
            title: 'The Royal Wedding & Pheras',
            date: '2026-11-20',
            time: '07:30 PM',
            venue: 'Grand Lawn, The Leela Palace',
            description: 'Baraat procession followed by sacred Vedic rituals under the starlit sky.',
          },
          {
            title: 'Imperial Gala Reception',
            date: '2026-11-21',
            time: '08:00 PM',
            venue: 'The Royal Ballroom',
            description: 'Opulent evening banquet celebrating the newlyweds with live orchestra.',
          },
        ];

  return (
    <div className="relative w-full z-10 space-y-4">
      {/* 1. Welcome Quotation Section */}
      {welcomeMessage && (
        <ZareqiaSection id="invitation-welcome">
          <div className="max-w-lg mx-auto text-center space-y-6">
            <WaveOrnament className="w-full text-primary opacity-60 mb-6" />
            <p className="font-calligraphic text-2xl md:text-3xl text-foreground leading-relaxed italic whitespace-pre-wrap break-words px-4">
              "{welcomeMessage}"
            </p>
            <WaveOrnament className="w-full text-primary opacity-60 mt-6 rotate-180" />
          </div>
        </ZareqiaSection>
      )}

      {/* 2. Interactive Scratch Card & Save The Date */}
      <ZareqiaSection cream={true} id="invitation-scratch">
        <ZareqiaScratchCard
          weddingDateStr={weddingDateStr}
          weddingTimeStr={weddingTimeStr}
          venueName={venueName}
          venueAddress={venueAddress}
          palette={scratchPalette || theme.scratch}
          coupleNames={coupleNames}
          welcomeMessage={welcomeMessage}
        />
      </ZareqiaSection>

      {/* 3. Live Countdown to Forever */}
      <ZareqiaSection id="invitation-countdown">
        <ZareqiaCountdown weddingDateStr={weddingDateStr} weddingTimeStr={weddingTimeStr} />
      </ZareqiaSection>

      {/* 4. Ceremony Timeline */}
      <ZareqiaSection cream={true} id="invitation-timeline">
        <ZareqiaTimeline events={events} />
      </ZareqiaSection>

      {/* 5. Venue & Google Maps */}
      <ZareqiaSection id="invitation-venue">
        <ZareqiaVenue venueName={venueName} venueAddress={venueAddress} />
      </ZareqiaSection>

      {/* 6. Dress Code */}
      <ZareqiaSection cream={true} id="invitation-dress-code">
        <ZareqiaDressCode />
      </ZareqiaSection>

      {/* 7. Gifts & Blessings */}
      <ZareqiaSection id="invitation-gifts">
        <ZareqiaGifts />
      </ZareqiaSection>

      {/* 8. RSVP & Guestbook */}
      <ZareqiaSection cream={true} id="invitation-rsvp">
        <ZareqiaRsvp invitationId={invitationId} coupleNames={coupleNames} />
      </ZareqiaSection>

      {/* 9. Luxury Footer */}
      <footer className="py-12 text-center text-xs opacity-60 font-mono tracking-widest border-t border-primary/20 space-y-2">
        <Heart size={14} className="mx-auto text-primary opacity-50" fill="currentColor" />
        <p>With Warm Love & Regards • {coupleNames}</p>
        <p className="text-[10px] opacity-40">Created with Moonlight Luxury Suites</p>
      </footer>
    </div>
  );
};

export default ZareqiaBody;
