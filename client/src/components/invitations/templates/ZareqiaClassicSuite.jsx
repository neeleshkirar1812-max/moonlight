import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Heart,
  ChevronDown,
  Calendar,
  Clock,
  MapPin,
  Car,
  Shirt,
  Sparkles,
  Gift,
  Building,
  Plane,
  Navigation,
  CalendarPlus,
  Send,
  CheckCircle2,
  Volume2,
  VolumeX,
  Share2,
  QrCode,
  Copy,
  Check,
  X,
} from 'lucide-react';
import { downloadIcsFile } from '../../../utils/calendarGenerator';
import api from '../../../api/client';

export const zareqiaClassicThemes = {
  'emerald-noir': {
    id: 'emerald-noir',
    name: 'Emerald Noir',
    isDark: true,
    background: 'hsl(160, 25%, 8%)',
    foreground: 'hsl(40, 30%, 85%)',
    cardBg: 'hsl(160, 20%, 12%)',
    borderColor: 'rgba(201, 163, 85, 0.3)',
    accent: 'hsl(40, 50%, 55%)',
    accentLight: 'hsl(40, 60%, 75%)',
    mutedText: 'hsl(40, 35%, 55%)',
    doorLeftBg: 'linear-gradient(135deg, hsl(160, 30%, 12%) 0%, hsl(160, 25%, 16%) 50%, hsl(160, 20%, 10%) 100%)',
    doorRightBg: 'linear-gradient(225deg, hsl(160, 30%, 12%) 0%, hsl(160, 25%, 16%) 50%, hsl(160, 20%, 10%) 100%)',
    doorBorder: '1px solid hsl(40, 40%, 35%)',
    sealColor: 'hsl(160, 25%, 15%)',
    sealHighlight: 'hsl(160, 20%, 28%)',
    sealAccent: 'hsl(40, 50%, 65%)',
    doorType: '3d-swing',
    welcome: {
      gradient: 'linear-gradient(to bottom, #07150e 0%, #102e20 40%, #06120c 100%)',
      accent: 'hsl(40, 50%, 60%)',
      textColor: '#f5eee0',
      textShadow: '0 2px 12px rgba(0,0,0,0.7)',
    },
    scratch: {
      gradStart: '#d4af37',
      gradMid: '#2d6a4f',
      gradEnd: '#081c15',
      textColor: '#ffffff',
      accent: '#52b788',
    },
    musicPreset: 'https://cdn.pixabay.com/download/audio/2022/03/10/audio_c3574c82c3.mp3?filename=indian-classical-instrumental-110825.mp3',
    fontStyle: 'serif',
  },
  'ivory-elegance': {
    id: 'ivory-elegance',
    name: 'Crimson Royale',
    isDark: true,
    background: 'hsl(0, 0%, 6%)',
    foreground: 'hsl(40, 30%, 85%)',
    cardBg: 'hsl(0, 0%, 10%)',
    borderColor: 'rgba(201, 163, 85, 0.3)',
    accent: 'hsl(0, 65%, 55%)',
    accentLight: 'hsl(40, 60%, 75%)',
    mutedText: 'hsl(40, 35%, 55%)',
    doorLeftBg: 'linear-gradient(135deg, hsl(0, 0%, 8%) 0%, hsl(0, 0%, 12%) 50%, hsl(0, 0%, 6%) 100%)',
    doorRightBg: 'linear-gradient(225deg, hsl(0, 0%, 8%) 0%, hsl(0, 0%, 12%) 50%, hsl(0, 0%, 6%) 100%)',
    doorBorder: '1px solid hsl(40, 40%, 25%)',
    sealColor: 'hsl(0, 65%, 22%)',
    sealHighlight: 'hsl(0, 55%, 42%)',
    sealAccent: 'hsl(40, 60%, 75%)',
    doorType: 'slide-split',
    welcome: {
      gradient: 'linear-gradient(to bottom, #1f0408 0%, #4a0e16 40%, #140205 100%)',
      accent: 'hsl(0, 65%, 55%)',
      textColor: '#fff1f2',
      textShadow: '0 2px 12px rgba(0,0,0,0.7)',
    },
    scratch: {
      gradStart: '#fda4af',
      gradMid: '#be123c',
      gradEnd: '#4c0519',
      textColor: '#ffffff',
      accent: '#f43f5e',
    },
    musicPreset: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-wedding-113828.mp3',
    fontStyle: 'serif',
  },
  'rose-gold-blush': {
    id: 'rose-gold-blush',
    name: 'Rose Gold Blush',
    isDark: false,
    background: 'hsl(20, 30%, 97%)',
    foreground: 'hsl(350, 20%, 20%)',
    cardBg: 'hsl(20, 25%, 94%)',
    borderColor: 'rgba(203, 82, 110, 0.25)',
    accent: 'hsl(350, 45%, 55%)',
    accentLight: 'hsl(350, 35%, 72%)',
    mutedText: 'hsl(350, 10%, 50%)',
    doorLeftBg: 'linear-gradient(135deg, hsl(20, 35%, 94%) 0%, hsl(350, 30%, 90%) 50%, hsl(20, 25%, 88%) 100%)',
    doorRightBg: 'linear-gradient(225deg, hsl(20, 35%, 94%) 0%, hsl(350, 30%, 90%) 50%, hsl(20, 25%, 88%) 100%)',
    doorBorder: '1px solid hsl(350, 30%, 80%)',
    sealColor: 'hsl(350, 50%, 55%)',
    sealHighlight: 'hsl(350, 45%, 72%)',
    sealAccent: '#ffffff',
    doorType: '3d-swing',
    welcome: {
      gradient: 'linear-gradient(to bottom, #fdf2f4 0%, #fae1e6 40%, #f7d6dc 100%)',
      accent: 'hsl(350, 45%, 55%)',
      textColor: '#3d2b2f',
      textShadow: '0 1px 4px rgba(0,0,0,0.1)',
    },
    scratch: {
      gradStart: '#fbcfe8',
      gradMid: '#db2777',
      gradEnd: '#831843',
      textColor: '#ffffff',
      accent: '#ec4899',
    },
    musicPreset: 'https://cdn.pixabay.com/download/audio/2021/08/04/audio_bb630cc098.mp3?filename=acoustic-guitars-ambient-uplifting-11369.mp3',
    fontStyle: 'dancing',
  },
  'modern-minimal': {
    id: 'modern-minimal',
    name: 'Modern Minimal',
    isDark: true,
    background: 'hsl(220, 30%, 12%)',
    foreground: 'hsl(40, 20%, 90%)',
    cardBg: 'hsl(220, 25%, 16%)',
    borderColor: 'rgba(217, 170, 38, 0.3)',
    accent: 'hsl(45, 70%, 50%)',
    accentLight: 'hsl(45, 55%, 65%)',
    mutedText: 'hsl(220, 10%, 60%)',
    doorLeftBg: 'linear-gradient(135deg, hsl(220, 30%, 10%) 0%, hsl(220, 25%, 15%) 50%, hsl(220, 30%, 8%) 100%)',
    doorRightBg: 'linear-gradient(225deg, hsl(220, 30%, 10%) 0%, hsl(220, 25%, 15%) 50%, hsl(220, 30%, 8%) 100%)',
    doorBorder: '1px solid hsl(45, 40%, 35%)',
    sealColor: 'hsl(45, 70%, 45%)',
    sealHighlight: 'hsl(45, 60%, 60%)',
    sealAccent: 'hsl(220, 30%, 12%)',
    doorType: 'slide-split',
    welcome: {
      gradient: 'linear-gradient(to bottom, #0f1722 0%, #1e293b 40%, #0a1018 100%)',
      accent: 'hsl(45, 70%, 50%)',
      textColor: '#f1f5f9',
      textShadow: '0 2px 12px rgba(0,0,0,0.7)',
    },
    scratch: {
      gradStart: '#e8cc82',
      gradMid: '#a9802d',
      gradEnd: '#5c421c',
      textColor: '#1a1208',
      accent: '#d4af37',
    },
    musicPreset: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=piano-moment-9835.mp3',
    fontStyle: 'serif',
  },
  'royal-elegance': {
    id: 'royal-elegance',
    name: 'Majestic Love',
    isDark: false,
    background: 'hsl(350, 20%, 97%)',
    foreground: 'hsl(350, 30%, 15%)',
    cardBg: 'hsl(350, 20%, 94%)',
    borderColor: 'rgba(194, 56, 90, 0.25)',
    accent: 'hsl(350, 55%, 55%)',
    accentLight: 'hsl(350, 45%, 75%)',
    mutedText: 'hsl(350, 10%, 50%)',
    doorLeftBg: 'linear-gradient(135deg, hsl(0, 65%, 18%) 0%, hsl(0, 60%, 28%) 50%, hsl(0, 65%, 15%) 100%)',
    doorRightBg: 'linear-gradient(225deg, hsl(0, 65%, 18%) 0%, hsl(0, 60%, 28%) 50%, hsl(0, 65%, 15%) 100%)',
    doorBorder: '1px solid hsl(40, 50%, 55%)',
    sealColor: 'hsl(0, 65%, 22%)',
    sealHighlight: 'hsl(0, 55%, 42%)',
    sealAccent: 'hsl(40, 60%, 75%)',
    doorType: 'curtain-skew',
    welcome: {
      gradient: 'linear-gradient(to bottom, #fdf2f4 0%, #fae1e6 40%, #f7d6dc 100%)',
      accent: 'hsl(350, 55%, 55%)',
      textColor: '#321820',
      textShadow: '0 1px 4px rgba(0,0,0,0.1)',
    },
    scratch: {
      gradStart: '#fca5a5',
      gradMid: '#b91c1c',
      gradEnd: '#450a0a',
      textColor: '#ffffff',
      accent: '#ef4444',
    },
    musicPreset: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-wedding-113828.mp3',
    fontStyle: 'dancing',
  },
};

const ZareqiaClassicSuite = ({ invitation = {}, isPreview = false, onRsvpSuccess }) => {
  const rawId = invitation.template_id || invitation.templateId || 'emerald-noir';
  const templateId = rawId;
  const theme = zareqiaClassicThemes[templateId] || zareqiaClassicThemes['emerald-noir'];

  const [hasStarted, setHasStarted] = useState(false);
  const [hasDoorOpened, setHasDoorOpened] = useState(false);
  const [doorsFadedOut, setDoorsFadedOut] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [isScratchRevealed, setIsScratchRevealed] = useState(false);

  const audioRef = useRef(null);
  const canvasRef = useRef(null);

  const [rsvpName, setRsvpName] = useState('');
  const [rsvpAttending, setRsvpAttending] = useState('Yes');
  const [rsvpGuests, setRsvpGuests] = useState(1);
  const [rsvpPhone, setRsvpPhone] = useState('');
  const [rsvpMessage, setRsvpMessage] = useState('');
  const [rsvpSubmitting, setRsvpSubmitting] = useState(false);
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);

  const [qrOpen, setQrOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const groomName = invitation.groom_name || invitation.groomName || 'Aarav Singhania';
  const brideName = invitation.bride_name || invitation.brideName || 'Kiara Malhotra';
  const coupleNames = invitation.names || `${groomName} & ${brideName}`;
  const groomParents = invitation.groom_parents || invitation.groomParents || 'Son of Mrs. Sunita & Mr. Rajesh Singhania';
  const brideParents = invitation.bride_parents || invitation.brideParents || 'Daughter of Mrs. Poonam & Mr. Anand Malhotra';

  const weddingDateStr = invitation.event_date || invitation.date || '2026-11-20';
  const weddingTimeStr = invitation.event_time || invitation.time || '19:00';
  const venueName = invitation.venue_name || invitation.venue || 'The Leela Palace, Udaipur';
  const venueAddress = invitation.venue_address || invitation.venueAddress || 'Lake Pichola, Udaipur, Rajasthan 313001';
  const welcomeMessage = invitation.welcome_text || invitation.message || 'With joyous hearts, we request the honor of your presence to celebrate the beginning of our new life together.';

  const fullVenueQuery = [venueName, venueAddress].filter(Boolean).join(', ');
  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(fullVenueQuery)}&t=m&z=14&output=embed`;
  const mapDirectUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullVenueQuery)}`;

  const events = invitation.events && invitation.events.length > 0 ? invitation.events : [
    {
      title: 'Mehendi & Sangeet Night',
      date: '2026-11-19',
      time: '06:00 PM',
      venue: 'The Leela Palace Courtyard',
      address: 'Udaipur, Rajasthan',
      description: 'Vibrant henna rituals, joyful folk beats, and celebratory cocktail dinner.',
    },
    {
      title: 'The Royal Wedding & Pheras',
      date: '2026-11-20',
      time: '07:30 PM',
      venue: 'Grand Lawn, The Leela Palace',
      address: 'Udaipur, Rajasthan',
      description: 'Baraat procession followed by sacred Vedic rituals under the starlit sky.',
    },
    {
      title: 'Imperial Gala Reception',
      date: '2026-11-21',
      time: '08:00 PM',
      venue: 'The Royal Ballroom',
      address: 'Udaipur, Rajasthan',
      description: 'Opulent evening banquet celebrating the newlyweds with live orchestra.',
    },
  ];

  const galleryImages = invitation.gallery_images || invitation.galleryUrls || [
    'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
  ];

  useEffect(() => {
    const target = new Date(`${weddingDateStr}T${weddingTimeStr.length === 5 ? weddingTimeStr + ':00' : weddingTimeStr}`).getTime();
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const diff = target - now;
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(timer);
      } else {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000),
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [weddingDateStr, weddingTimeStr]);

  useEffect(() => {
    if (!doorsFadedOut) {
      document.body.style.overflow = 'hidden';
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [doorsFadedOut]);

  const handleOpenDoors = () => {
    if (hasStarted) return;
    setHasStarted(true);
    if (audioRef.current) {
      audioRef.current.play().then(() => setIsPlayingMusic(true)).catch(() => {});
    }
    setHasDoorOpened(true);
    setTimeout(() => {
      setDoorsFadedOut(true);
    }, 2800);
  };

  const handleScrollDown = (e) => {
    if (e) e.stopPropagation();
    const nextSection = document.getElementById('classic-welcome');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    }
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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || isScratchRevealed) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.offsetWidth || 340;
    const height = canvas.offsetHeight || 160;
    canvas.width = width;
    canvas.height = height;

    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, theme.scratch.gradStart);
    grad.addColorStop(0.5, theme.scratch.gradMid);
    grad.addColorStop(1, theme.scratch.gradEnd);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = theme.scratch.accent;
    ctx.lineWidth = 3;
    ctx.strokeRect(6, 6, width - 12, height - 12);

    ctx.fillStyle = theme.scratch.textColor;
    ctx.font = 'bold 16px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✦ SCRATCH TO REVEAL DATE ✦', width / 2, height / 2 - 8);

    ctx.font = '11px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = theme.scratch.textColor;
    ctx.fillText('Swipe or drag with finger to unlock', width / 2, height / 2 + 16);

    let cleared = 0;
    const total = width * height;
    const scratchAt = (x, y) => {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 26, 0, Math.PI * 2);
      ctx.fill();
      cleared += 450;
      if (cleared > total * 0.35) {
        setIsScratchRevealed(true);
      }
    };

    const handleTouch = (e) => {
      const rect = canvas.getBoundingClientRect();
      const t = e.touches[0];
      if (t) scratchAt(t.clientX - rect.left, t.clientY - rect.top);
    };

    const handleMouse = (e) => {
      if (e.buttons !== 1) return;
      const rect = canvas.getBoundingClientRect();
      scratchAt(e.clientX - rect.left, e.clientY - rect.top);
    };

    canvas.addEventListener('touchmove', handleTouch, { passive: true });
    canvas.addEventListener('mousemove', handleMouse);
    return () => {
      canvas.removeEventListener('touchmove', handleTouch);
      canvas.removeEventListener('mousemove', handleMouse);
    };
  }, [isScratchRevealed, theme]);

  const handleRsvpSubmit = async (e) => {
    e.preventDefault();
    if (!rsvpName.trim()) return;
    setRsvpSubmitting(true);
    try {
      await api.post('/rsvp', {
        invitationId: invitation._id || invitation.id || invitation.slug,
        name: rsvpName.trim(),
        response: rsvpAttending,
        guests: Number(rsvpGuests) || 1,
        phone: rsvpPhone.trim(),
        message: rsvpMessage.trim(),
      });
      setRsvpSubmitted(true);
      if (onRsvpSuccess) onRsvpSuccess();
    } catch (err) {
      setRsvpSubmitted(true);
    } finally {
      setRsvpSubmitting(false);
    }
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(`Namaste! ✨\nYou are cordially invited to celebrate the wedding of ${coupleNames}.\n\nView our live digital invitation:\n${window.location.href}\n\nWith love,\n${coupleNames}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleSaveCalendar = () => {
    downloadIcsFile({
      title: `${coupleNames} - Wedding Celebration`,
      description: welcomeMessage,
      venue: venueName,
      address: venueAddress,
      date: weddingDateStr,
      time: weddingTimeStr,
      url: window.location.href,
    });
  };

  const sparkles = useMemo(() => Array.from({ length: 24 }, (_, i) => ({
    id: i,
    tx: (Math.random() - 0.5) * 600,
    ty: (Math.random() - 0.5) * 600,
    size: 3 + Math.random() * 4,
  })), []);

  return (
    <div
      className={`font-sans selection:bg-amber-600 selection:text-white ${!doorsFadedOut ? 'h-screen overflow-hidden' : 'min-h-screen'}`}
      style={{ backgroundColor: theme.background, color: theme.foreground }}
    >
      <audio ref={audioRef} loop preload="auto" src={invitation.music_url || invitation.musicUrl || theme.musicPreset} />

      <div className="fixed top-4 right-4 z-50 flex items-center space-x-2">
        <button type="button" onClick={toggleMusic} className="p-2.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white hover:bg-black/80 shadow-2xl transition-all">
          {isPlayingMusic ? <Volume2 className="w-4 h-4 text-amber-300 animate-pulse" /> : <VolumeX className="w-4 h-4 text-neutral-400" />}
        </button>
        <button type="button" onClick={() => setQrOpen(true)} className="p-2.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white hover:bg-black/80 shadow-2xl transition-all">
          <QrCode className="w-4 h-4" />
        </button>
        <button type="button" onClick={handleShareWhatsApp} className="px-3.5 py-2 rounded-full bg-emerald-600/90 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider shadow-xl flex items-center space-x-1.5 transition-all">
          <Share2 className="w-3.5 h-3.5" />
          <span className="hidden xs:inline">Share</span>
        </button>
      </div>

      {!doorsFadedOut && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center select-none" style={{ perspective: '1600px', perspectiveOrigin: '50% 50%' }}>
          <div className={`absolute inset-0 transition-opacity duration-1000 ${hasDoorOpened ? 'opacity-20' : 'opacity-100'}`} style={{ background: 'radial-gradient(ellipse at center, rgba(201,163,85,0.05) 0%, rgba(10,15,12,1) 100%)' }} />

          <div
            className={`absolute top-0 left-0 w-1/2 h-full transition-transform duration-[2400ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
              theme.doorType === 'slide-split' ? (hasDoorOpened ? '-translate-x-full' : 'translate-x-0') : theme.doorType === 'curtain-skew' ? (hasDoorOpened ? '-translate-x-full -skew-x-3' : 'translate-x-0') : (hasDoorOpened ? '-rotate-y-[85deg]' : 'rotate-y-0')
            }`}
            style={{ transformOrigin: 'left center', transformStyle: 'preserve-3d', background: theme.doorLeftBg, borderRight: theme.doorBorder }}
          >
            <svg className="absolute top-4 right-4 w-16 h-16 opacity-30 pointer-events-none" viewBox="0 0 60 60" fill="none">
              <path d="M60 0 L60 20 Q60 40 40 50 L20 60" stroke={theme.accent} strokeWidth="0.8" fill="none" />
              <path d="M60 0 L60 15 Q60 30 45 40" stroke={theme.accent} strokeWidth="0.5" fill="none" opacity="0.5" />
            </svg>
            <svg className="absolute bottom-4 right-4 w-16 h-16 opacity-30 rotate-90 pointer-events-none" viewBox="0 0 60 60" fill="none">
              <path d="M60 0 L60 20 Q60 40 40 50 L20 60" stroke={theme.accent} strokeWidth="0.8" fill="none" />
            </svg>
            <div className="absolute top-8 bottom-8 right-6 w-px opacity-20 pointer-events-none" style={{ background: theme.accent }} />
          </div>

          <div
            className={`absolute top-0 right-0 w-1/2 h-full transition-transform duration-[2400ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
              theme.doorType === 'slide-split' ? (hasDoorOpened ? 'translate-x-full' : 'translate-x-0') : theme.doorType === 'curtain-skew' ? (hasDoorOpened ? 'translate-x-full skew-x-3' : 'translate-x-0') : (hasDoorOpened ? 'rotate-y-[85deg]' : 'rotate-y-0')
            }`}
            style={{ transformOrigin: 'right center', transformStyle: 'preserve-3d', background: theme.doorRightBg, borderLeft: theme.doorBorder }}
          >
            <svg className="absolute top-4 left-4 w-16 h-16 opacity-30 -scale-x-100 pointer-events-none" viewBox="0 0 60 60" fill="none">
              <path d="M60 0 L60 20 Q60 40 40 50 L20 60" stroke={theme.accent} strokeWidth="0.8" fill="none" />
              <path d="M60 0 L60 15 Q60 30 45 40" stroke={theme.accent} strokeWidth="0.5" fill="none" opacity="0.5" />
            </svg>
            <svg className="absolute bottom-4 left-4 w-16 h-16 opacity-30 -scale-x-100 rotate-90 pointer-events-none" viewBox="0 0 60 60" fill="none">
              <path d="M60 0 L60 20 Q60 40 40 50 L20 60" stroke={theme.accent} strokeWidth="0.8" fill="none" />
            </svg>
            <div className="absolute top-8 bottom-8 left-6 w-px opacity-20 pointer-events-none" style={{ background: theme.accent }} />
          </div>

          {!hasDoorOpened ? (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center">
              <button type="button" onClick={handleOpenDoors} className="relative w-28 h-28 md:w-36 md:h-36 rounded-full cursor-pointer focus:outline-none transform hover:scale-105 active:scale-95 transition-transform duration-300 animate-pulse" aria-label="Open invitation">
                <div className="absolute inset-0 rounded-full" style={{ background: `radial-gradient(circle at 35% 35%, ${theme.sealHighlight}, ${theme.sealColor})`, boxShadow: '0 8px 30px rgba(0,0,0,0.6), inset 0 2px 4px rgba(255,255,255,0.15), inset 0 -2px 6px rgba(0,0,0,0.4)' }} />
                <div className="absolute inset-1 rounded-full" style={{ background: `radial-gradient(circle at 40% 30%, ${theme.sealHighlight}, ${theme.sealColor})`, boxShadow: 'inset 0 1px 3px rgba(255,255,255,0.1)' }} />
                <div className="absolute inset-3 md:inset-4 rounded-full border-2 opacity-40" style={{ borderColor: theme.sealAccent }} />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-dancing text-2xl md:text-3xl font-bold tracking-wider" style={{ color: theme.sealAccent, textShadow: '0 1px 2px rgba(0,0,0,0.4)' }}>
                    {groomName.charAt(0)} & {brideName.charAt(0)}
                  </span>
                  <span className="text-[8px] md:text-[9.5px] tracking-[0.25em] uppercase mt-0.5 font-mono font-bold" style={{ color: theme.sealAccent }}>
                    Tap to Open
                  </span>
                </div>
              </button>
            </div>
          ) : (
            <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
              {sparkles.map((sp) => (
                <div key={sp.id} className="absolute rounded-full animate-ping" style={{ width: sp.size, height: sp.size, background: theme.accent, transform: `translate(${sp.tx}px, ${sp.ty}px)`, transition: 'all 1.5s ease-out', opacity: 0 }} />
              ))}
            </div>
          )}
        </div>
      )}

      {doorsFadedOut && (
        <div className="fixed inset-0 pointer-events-none z-[60] overflow-hidden">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="absolute animate-fall" style={{ left: `${(i * 9 + 4) % 100}%`, top: -20, fontSize: `${12 + (i % 3) * 4}px`, color: theme.accent, opacity: 0.25, animationDuration: `${8 + (i % 4) * 3}s`, animationDelay: `${i * 0.7}s`, animationIterationCount: 'infinite' }}>
              ❀
            </div>
          ))}
        </div>
      )}

      <section className={`min-h-screen flex flex-col items-center justify-center px-6 text-center relative overflow-hidden transition-opacity duration-1000 ${doorsFadedOut ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse at 50% 40%, ${theme.accent}15, transparent 65%)` }} />

        {['top-6 left-6', 'top-6 right-6 -scale-x-100', 'bottom-6 left-6 -scale-y-100', 'bottom-6 right-6 -scale-x-100 -scale-y-100'].map((posClass, i) => (
          <svg key={i} className={`absolute ${posClass} w-20 h-20 opacity-25 z-10 pointer-events-none`} viewBox="0 0 80 80" fill="none">
            <path d="M5 5 L5 30 Q5 50 25 60 L50 70" stroke={theme.accent} strokeWidth="0.8" fill="none" />
            <path d="M8 5 L8 25 Q8 40 20 48" stroke={theme.accent} strokeWidth="0.5" fill="none" opacity="0.5" />
            <circle cx="5" cy="5" r="2" fill={theme.accent} opacity="0.4" />
          </svg>
        ))}

        <div className="absolute top-16 md:top-20 left-1/2 -translate-x-1/2 w-64 md:w-80 z-10">
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, transparent, ${theme.accent})` }} />
            <div className="w-2.5 h-2.5 rotate-45 border" style={{ borderColor: theme.accent, backgroundColor: theme.cardBg }} />
            <div className="flex-1 h-px" style={{ background: `linear-gradient(270deg, transparent, ${theme.accent})` }} />
          </div>
        </div>

        <div className="relative z-10 max-w-lg space-y-4 pt-8">
          <p className="font-mono text-xs uppercase tracking-[0.4em] font-bold" style={{ color: theme.mutedText }}>
            THE WEDDING CELEBRATION OF
          </p>

          <div className="space-y-1">
            <h1 className={`text-5xl md:text-7xl font-bold tracking-tight ${theme.fontStyle === 'dancing' ? 'font-dancing' : 'font-serif'}`} style={{ color: theme.foreground, textShadow: '0 2px 14px rgba(0,0,0,0.5)' }}>
              {groomName}
            </h1>
            {groomParents && <p className="text-xs md:text-sm font-sans italic opacity-85" style={{ color: theme.accent }}>{groomParents}</p>}
          </div>

          <p className="font-dancing text-3xl md:text-4xl my-2" style={{ color: theme.accent }}>&</p>

          <div className="space-y-1">
            <h1 className={`text-5xl md:text-7xl font-bold tracking-tight ${theme.fontStyle === 'dancing' ? 'font-dancing' : 'font-serif'}`} style={{ color: theme.foreground, textShadow: '0 2px 14px rgba(0,0,0,0.5)' }}>
              {brideName}
            </h1>
            {brideParents && <p className="text-xs md:text-sm font-sans italic opacity-85" style={{ color: theme.accent }}>{brideParents}</p>}
          </div>

          <div className="pt-4 flex flex-col items-center gap-1.5 font-sans">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border text-xs uppercase font-mono tracking-widest" style={{ borderColor: theme.borderColor, backgroundColor: theme.cardBg }}>
              <Calendar className="w-3.5 h-3.5" style={{ color: theme.accent }} />
              <span>{new Date(weddingDateStr).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              <span className="opacity-40">•</span>
              <MapPin className="w-3.5 h-3.5" style={{ color: theme.accent }} />
              <span>{venueName.split(',')[0]}</span>
            </div>
          </div>
        </div>

        <div onClick={handleScrollDown} className="absolute inset-x-0 bottom-8 z-20 flex flex-col items-center gap-2 cursor-pointer transition-all duration-700 animate-bounce pointer-events-auto">
          <span className="text-xs uppercase tracking-widest font-mono" style={{ color: theme.mutedText }}>Scroll</span>
          <ChevronDown size={20} style={{ color: theme.accent }} />
        </div>
      </section>

      <section id="classic-welcome" className="relative px-6 py-20 md:py-28 overflow-hidden text-center" style={{ background: theme.welcome.gradient }}>
        <div className="max-w-2xl mx-auto space-y-6 relative z-10">
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-20" style={{ background: `linear-gradient(to right, transparent, ${theme.welcome.accent})` }} />
            <Heart size={14} style={{ color: theme.welcome.accent }} fill="currentColor" />
            <div className="h-px w-20" style={{ background: `linear-gradient(to left, transparent, ${theme.welcome.accent})` }} />
          </div>
          <p className="font-calligraphic text-2xl md:text-3xl leading-relaxed italic whitespace-pre-wrap break-words px-4" style={{ color: theme.welcome.textColor, textShadow: theme.welcome.textShadow }}>
            "{welcomeMessage}"
          </p>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-20" style={{ background: `linear-gradient(to right, transparent, ${theme.welcome.accent})` }} />
            <Heart size={14} style={{ color: theme.welcome.accent }} fill="currentColor" />
            <div className="h-px w-20" style={{ background: `linear-gradient(to left, transparent, ${theme.welcome.accent})` }} />
          </div>
        </div>
      </section>

      <section className="py-14 px-4 sm:px-6 max-w-xl mx-auto space-y-6 text-center font-sans">
        <div className="space-y-1">
          <span className="text-[10px] uppercase font-mono tracking-[0.25em] font-bold block" style={{ color: theme.accent }}>✦ Save The Date ✦</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-wide">Special Card Reveal</h2>
          <div className="w-12 h-0.5 mx-auto" style={{ backgroundColor: theme.accent }} />
        </div>
        <div className="backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 relative overflow-hidden" style={{ backgroundColor: theme.cardBg, borderColor: theme.borderColor, borderWidth: 1 }}>
          <p className="text-xs font-sans opacity-80">Scratch away the card below to unlock our wedding date & ceremony timing:</p>
          <div className="relative w-full h-40 sm:h-44 rounded-2xl overflow-hidden bg-neutral-950 border-2 shadow-inner flex items-center justify-center select-none" style={{ borderColor: theme.accent }}>
            <div className="p-4 text-center space-y-1.5 animate-fade-in z-0">
              <span className="text-[10px] uppercase font-mono tracking-widest font-bold block" style={{ color: theme.accent }}>YOU’RE CORDIALLY INVITED</span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-wider">
                {new Date(weddingDateStr).toLocaleDateString('en-IN', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
              </h3>
              <p className="text-xs font-mono text-neutral-300">Ceremony Begins at {weddingTimeStr}</p>
              <p className="text-[11px] text-neutral-400 pt-1">{venueName}</p>
            </div>
            {!isScratchRevealed && <canvas ref={canvasRef} className="absolute inset-0 w-full h-full cursor-crosshair z-10 touch-none" />}
          </div>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button type="button" onClick={handleSaveCalendar} className="w-full sm:w-auto px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center space-x-2 transition-all" style={{ backgroundColor: theme.accent, color: theme.isDark ? '#000000' : '#ffffff' }}>
              <CalendarPlus className="w-4 h-4" />
              <span>Add to Calendar (.ics)</span>
            </button>
          </div>
        </div>
      </section>

      <section className="py-10 px-4 sm:px-6 max-w-xl mx-auto text-center font-sans">
        <div className="backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4" style={{ backgroundColor: theme.cardBg, borderColor: theme.borderColor, borderWidth: 1 }}>
          <span className="text-[10px] uppercase font-mono tracking-[0.25em] font-bold block" style={{ color: theme.accent }}>✦ Countdown to the Big Day ✦</span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold">Until We Say "I Do"</h2>
          <div className="grid grid-cols-4 gap-2 pt-2">
            {[
              { label: 'Days', val: timeLeft.days },
              { label: 'Hours', val: timeLeft.hours },
              { label: 'Mins', val: timeLeft.minutes },
              { label: 'Secs', val: timeLeft.seconds },
            ].map((item, i) => (
              <div key={i} className="p-3 rounded-2xl border text-center shadow-sm" style={{ backgroundColor: `${theme.background}80`, borderColor: theme.borderColor }}>
                <span className="font-mono text-2xl sm:text-3xl font-bold block" style={{ color: theme.accent }}>{String(item.val).padStart(2, '0')}</span>
                <span className="text-[10px] uppercase tracking-wider opacity-70">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 px-4 sm:px-6 max-w-2xl mx-auto space-y-8 font-sans">
        <div className="text-center space-y-2">
          <span className="text-[10px] uppercase font-mono tracking-[0.25em] font-bold block" style={{ color: theme.accent }}>✦ Program Timeline ✦</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold">Celebration Schedule</h2>
          <div className="w-16 h-0.5 mx-auto" style={{ backgroundColor: theme.accent }} />
        </div>
        <div className="space-y-4">
          {events.map((evt, idx) => (
            <div key={idx} className="p-6 rounded-3xl border shadow-xl relative overflow-hidden group hover:scale-[1.01] transition-transform duration-300" style={{ backgroundColor: theme.cardBg, borderColor: theme.borderColor }}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-3 mb-3" style={{ borderColor: theme.borderColor }}>
                <div className="flex items-center space-x-2.5">
                  <span className="w-7 h-7 rounded-full flex items-center justify-center font-mono font-bold text-xs" style={{ backgroundColor: theme.accent, color: theme.isDark ? '#000' : '#fff' }}>{idx + 1}</span>
                  <h3 className="font-serif text-lg font-bold">{evt.title || evt.name}</h3>
                </div>
                <div className="flex items-center space-x-3 text-xs font-mono" style={{ color: theme.accent }}>
                  <span className="flex items-center space-x-1"><Calendar className="w-3.5 h-3.5" /><span>{evt.date}</span></span>
                  <span>•</span>
                  <span className="flex items-center space-x-1"><Clock className="w-3.5 h-3.5" /><span>{evt.time}</span></span>
                </div>
              </div>
              <div className="space-y-1 text-xs opacity-85">
                <p className="flex items-center space-x-1.5 font-medium"><MapPin className="w-3.5 h-3.5 shrink-0" style={{ color: theme.accent }} /><span>{evt.venue || venueName}</span></p>
                {evt.description && <p className="pt-1 italic pl-5">{evt.description}</p>}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-14 px-4 sm:px-6 max-w-2xl mx-auto space-y-6 text-center font-sans">
        <div className="space-y-2">
          <span className="text-[10px] uppercase font-mono tracking-[0.25em] font-bold block" style={{ color: theme.accent }}>✦ Venue & Directions ✦</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold">Location Map</h2>
          <div className="w-16 h-0.5 mx-auto" style={{ backgroundColor: theme.accent }} />
        </div>
        <div className="rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 border" style={{ backgroundColor: theme.cardBg, borderColor: theme.borderColor }}>
          <div>
            <h3 className="font-serif text-xl font-bold">{venueName}</h3>
            <p className="text-xs opacity-75 mt-1">{venueAddress}</p>
          </div>
          <div className="w-full h-72 rounded-2xl overflow-hidden shadow-inner border" style={{ borderColor: theme.borderColor }}>
            <iframe src={mapEmbedUrl} width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Venue Location Map" />
          </div>
          <div className="pt-2 flex justify-center">
            <a href={mapDirectUrl} target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center space-x-2 transition-all hover:scale-105" style={{ backgroundColor: theme.accent, color: theme.isDark ? '#000000' : '#ffffff' }}>
              <Navigation className="w-4 h-4" />
              <span>View on Google Maps</span>
            </a>
          </div>
        </div>
      </section>

      <section className="py-10 px-4 sm:px-6 max-w-xl mx-auto text-center font-sans">
        <div className="rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4 border" style={{ backgroundColor: theme.cardBg, borderColor: theme.borderColor }}>
          <div className="flex items-center justify-center space-x-2" style={{ color: theme.accent }}>
            <Shirt className="w-5 h-5" />
            <span className="text-[11px] uppercase font-mono tracking-widest font-bold">Dress Code & Palette</span>
          </div>
          <h3 className="font-serif text-2xl font-bold">Royal Traditional & Black Tie</h3>
          <p className="text-xs opacity-80 max-w-md mx-auto">We kindly encourage guests to dress in formal ethnic wear (Sherwani / Lehengas) or elegant evening attire.</p>
          <div className="flex items-center justify-center gap-3 pt-2">
            {['#d4af37', '#1b4332', '#7209b7', '#4a0404', '#e2d4c0'].map((col, idx) => (
              <span key={idx} className="w-7 h-7 rounded-full border shadow-md transform hover:scale-110 transition-transform" style={{ backgroundColor: col, borderColor: 'rgba(255,255,255,0.4)' }} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 px-4 sm:px-6 max-w-2xl mx-auto space-y-6 text-center font-sans">
        <div className="space-y-2">
          <span className="text-[10px] uppercase font-mono tracking-[0.25em] font-bold block" style={{ color: theme.accent }}>✦ Captured Moments ✦</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold">Memories & Love Story</h2>
          <div className="w-16 h-0.5 mx-auto" style={{ backgroundColor: theme.accent }} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {galleryImages.map((imgUrl, i) => (
            <div key={i} className="rounded-2xl overflow-hidden border shadow-lg aspect-square group relative" style={{ borderColor: theme.borderColor }}>
              <img src={imgUrl} alt={`Couple memory ${i + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3 justify-center">
                <span className="text-[10px] uppercase font-mono tracking-widest text-amber-200">Memory #{i + 1}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 max-w-xl mx-auto text-center font-sans">
        <div className="rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 border text-left" style={{ backgroundColor: theme.cardBg, borderColor: theme.borderColor }}>
          <div className="text-center space-y-1.5">
            <span className="text-[10px] uppercase font-mono tracking-[0.25em] font-bold block" style={{ color: theme.accent }}>✦ RSVP ✦</span>
            <h2 className="font-serif text-3xl font-bold">Confirm Your Attendance</h2>
            <p className="text-xs opacity-75">Please kindly respond by November 1st to help us plan comfortably.</p>
          </div>
          {rsvpSubmitted ? (
            <div className="p-6 rounded-2xl bg-emerald-900/40 border border-emerald-500/50 text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
              <h3 className="font-serif text-xl font-bold text-white">Thank You, {rsvpName}!</h3>
              <p className="text-xs text-neutral-300">Your RSVP has been saved. We look forward to celebrating together!</p>
            </div>
          ) : (
            <form onSubmit={handleRsvpSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block uppercase font-mono tracking-wider mb-1 font-semibold" style={{ color: theme.accent }}>Your Full Name *</label>
                <input type="text" required value={rsvpName} onChange={(e) => setRsvpName(e.target.value)} placeholder="Enter guest name" className="w-full px-4 py-3 rounded-xl border bg-black/40 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-amber-500" style={{ borderColor: theme.borderColor }} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block uppercase font-mono tracking-wider mb-1 font-semibold" style={{ color: theme.accent }}>Attending?</label>
                  <select value={rsvpAttending} onChange={(e) => setRsvpAttending(e.target.value)} className="w-full px-4 py-3 rounded-xl border bg-black/40 text-white focus:outline-none" style={{ borderColor: theme.borderColor }}>
                    <option value="Yes">Joyfully Accept (Yes)</option>
                    <option value="No">Regretfully Decline (No)</option>
                  </select>
                </div>
                <div>
                  <label className="block uppercase font-mono tracking-wider mb-1 font-semibold" style={{ color: theme.accent }}>Guest Count</label>
                  <input type="number" min="1" max="10" value={rsvpGuests} onChange={(e) => setRsvpGuests(e.target.value)} className="w-full px-4 py-3 rounded-xl border bg-black/40 text-white focus:outline-none" style={{ borderColor: theme.borderColor }} />
                </div>
              </div>
              <div>
                <label className="block uppercase font-mono tracking-wider mb-1 font-semibold" style={{ color: theme.accent }}>Phone / WhatsApp (Optional)</label>
                <input type="tel" value={rsvpPhone} onChange={(e) => setRsvpPhone(e.target.value)} placeholder="+91 98765 43210" className="w-full px-4 py-3 rounded-xl border bg-black/40 text-white placeholder-neutral-500 focus:outline-none" style={{ borderColor: theme.borderColor }} />
              </div>
              <div>
                <label className="block uppercase font-mono tracking-wider mb-1 font-semibold" style={{ color: theme.accent }}>Warm Wishes / Message for the Couple</label>
                <textarea rows="3" value={rsvpMessage} onChange={(e) => setRsvpMessage(e.target.value)} placeholder="Write your blessings..." className="w-full px-4 py-3 rounded-xl border bg-black/40 text-white placeholder-neutral-500 focus:outline-none" style={{ borderColor: theme.borderColor }} />
              </div>
              <button type="submit" disabled={rsvpSubmitting} className="w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow-xl flex items-center justify-center space-x-2 transition-all" style={{ backgroundColor: theme.accent, color: theme.isDark ? '#000000' : '#ffffff' }}>
                {rsvpSubmitting ? <Sparkles className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                <span>{rsvpSubmitting ? 'Submitting...' : 'Send RSVP'}</span>
              </button>
            </form>
          )}
        </div>
      </section>

      <footer className="py-8 text-center text-xs opacity-50 border-t font-mono" style={{ borderColor: theme.borderColor }}>
        <p>With Warm Regards • {coupleNames}</p>
      </footer>
    </div>
  );
};

export default ZareqiaClassicSuite;