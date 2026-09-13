import React, { useState, useEffect, useRef } from 'react';
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

// Theme Definitions extracted directly from Zareqia
export const zareqiaRoyalThemes = {
  'rose-gold-blush-royal': {
    id: 'rose-gold-blush-royal',
    name: 'Royal Imperial',
    video: '/videos/rose-gold-blush.mp4',
    textColor: '#f5e6e0',
    accentColor: '#d4af37',
    welcome: {
      gradient: 'linear-gradient(to bottom, #4a3410 0%, #b08820 40%, #2a1f08 100%)',
      accent: '#d4af37',
      textColor: '#fff0cf',
      textShadow: '0 2px 12px rgba(45,15,10,0.55)',
    },
    scratch: {
      gradStart: '#e8cc82',
      gradMid: '#a9802d',
      gradEnd: '#5c421c',
      textColor: '#1a1208',
      accent: '#d4af37',
    },
    background: '#1C140E',
    cardBg: '#2A1D13',
    borderColor: 'rgba(212, 175, 55, 0.3)',
    musicPreset: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-wedding-113828.mp3',
  },
  'royal-prestige': {
    id: 'royal-prestige',
    name: 'Royal Prestige',
    video: '/videos/royal-prestige.mp4',
    textColor: '#fde2e8',
    accentColor: '#be185d',
    welcome: {
      gradient: 'linear-gradient(to bottom, #4a1525 0%, #832845 40%, #2b0814 100%)',
      accent: '#f472b6',
      textColor: '#fde2e8',
      textShadow: '0 2px 12px rgba(40,10,20,0.55)',
    },
    scratch: {
      gradStart: '#fbcfe8',
      gradMid: '#db2777',
      gradEnd: '#831843',
      textColor: '#ffffff',
      accent: '#ec4899',
    },
    background: '#261019',
    cardBg: '#3b1927',
    borderColor: 'rgba(244, 114, 182, 0.3)',
    musicPreset: 'https://cdn.pixabay.com/download/audio/2021/08/04/audio_bb630cc098.mp3?filename=acoustic-guitars-ambient-uplifting-11369.mp3',
  },
  'modern-minimal-royal': {
    id: 'modern-minimal-royal',
    name: 'Royal Elegance',
    video: '/videos/royal-elegance-royal.mp4',
    textColor: '#fef2f2',
    accentColor: '#dc2626',
    welcome: {
      gradient: 'linear-gradient(to bottom, #3a0808 0%, #7a1212 40%, #1a0303 100%)',
      accent: '#f87171',
      textColor: '#fee2e2',
      textShadow: '0 2px 12px rgba(30,5,5,0.55)',
    },
    scratch: {
      gradStart: '#fca5a5',
      gradMid: '#b91c1c',
      gradEnd: '#450a0a',
      textColor: '#ffffff',
      accent: '#ef4444',
    },
    background: '#1a0303',
    cardBg: '#3a0808',
    borderColor: 'rgba(239, 68, 68, 0.3)',
    musicPreset: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-wedding-113828.mp3',
  },
  'royal-majesty': {
    id: 'royal-majesty',
    name: 'Royal Majesty',
    video: '/videos/royal-majesty.mp4',
    textColor: '#f1f5f9',
    accentColor: '#0284c7',
    welcome: {
      gradient: 'linear-gradient(to bottom, #0f2438 0%, #1e456a 40%, #081420 100%)',
      accent: '#38bdf8',
      textColor: '#e0f2fe',
      textShadow: '0 2px 12px rgba(10,25,45,0.55)',
    },
    scratch: {
      gradStart: '#bae6fd',
      gradMid: '#0284c7',
      gradEnd: '#082f49',
      textColor: '#ffffff',
      accent: '#38bdf8',
    },
    background: '#0b131e',
    cardBg: '#16253b',
    borderColor: 'rgba(56, 189, 248, 0.3)',
    musicPreset: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=piano-moment-9835.mp3',
  },
  'royal-heritage': {
    id: 'royal-heritage',
    name: 'Royal Heritage',
    video: '/videos/royal-heritage.mp4',
    textColor: '#e0f2fe',
    accentColor: '#0369a1',
    welcome: {
      gradient: 'linear-gradient(to bottom, #0f2d44 0%, #1e5a88 40%, #081926 100%)',
      accent: '#38bdf8',
      textColor: '#e0f2fe',
      textShadow: '0 2px 12px rgba(8,25,38,0.55)',
    },
    scratch: {
      gradStart: '#e8cc82',
      gradMid: '#a9802d',
      gradEnd: '#5c421c',
      textColor: '#1a1208',
      accent: '#d4af37',
    },
    background: '#081926',
    cardBg: '#0f2d44',
    borderColor: 'rgba(56, 189, 248, 0.3)',
    musicPreset: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-wedding-113828.mp3',
  },
  'royal-legacy': {
    id: 'royal-legacy',
    name: 'Royal Legacy',
    video: '/videos/royal-legacy.mp4',
    textColor: '#fef3c7',
    accentColor: '#d97706',
    welcome: {
      gradient: 'linear-gradient(to bottom, #38130d 0%, #6e271a 40%, #1f0a07 100%)',
      accent: '#f59e0b',
      textColor: '#fef3c7',
      textShadow: '0 2px 12px rgba(31,10,7,0.55)',
    },
    scratch: {
      gradStart: '#fde68a',
      gradMid: '#d97706',
      gradEnd: '#78350f',
      textColor: '#1a1208',
      accent: '#f59e0b',
    },
    background: '#1f0a07',
    cardBg: '#38130d',
    borderColor: 'rgba(245, 158, 11, 0.3)',
    musicPreset: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-wedding-113828.mp3',
  },
  'royal-crest': {
    id: 'royal-crest',
    name: 'Royal Crest',
    video: '/videos/royal-crest.mp4',
    textColor: '#fef2f2',
    accentColor: '#881337',
    welcome: {
      gradient: 'linear-gradient(to bottom, #D4C0A7 0%, #E7D9C4 40%, #F5EFE4 100%)',
      accent: '#71352b',
      textColor: '#71352b',
      textShadow: '0 1px 6px rgba(255,250,240,0.6)',
    },
    scratch: {
      gradStart: '#c9826f',
      gradMid: '#9a4a3c',
      gradEnd: '#71352b',
      textColor: '#ffffff',
      accent: '#71352b',
    },
    background: '#1c140d',
    cardBg: '#332518',
    borderColor: 'rgba(212, 175, 55, 0.3)',
    musicPreset: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=piano-moment-9835.mp3',
  },
  'royal-grace': {
    id: 'royal-grace',
    name: 'Royal Grace',
    video: '/videos/royal-grace.mp4',
    textColor: '#ecfdf5',
    accentColor: '#065f46',
    welcome: {
      gradient: 'linear-gradient(to bottom, #1c382c 0%, #2f5f4b 40%, #0f1f18 100%)',
      accent: '#34d399',
      textColor: '#ecfdf5',
      textShadow: '0 2px 12px rgba(15,31,24,0.55)',
    },
    scratch: {
      gradStart: '#a7f3d0',
      gradMid: '#059669',
      gradEnd: '#064e3b',
      textColor: '#ffffff',
      accent: '#10b981',
    },
    background: '#0f1f18',
    cardBg: '#1c382c',
    borderColor: 'rgba(52, 211, 153, 0.3)',
    musicPreset: 'https://cdn.pixabay.com/download/audio/2022/03/10/audio_c3574c82c3.mp3?filename=indian-classical-instrumental-110825.mp3',
  },
  'emerald-noir-royal': {
    id: 'emerald-noir-royal',
    name: 'Emerald Noir Royal',
    video: '/videos/emerald-noir-royal.mp4',
    textColor: '#ecfdf5',
    accentColor: '#10b981',
    welcome: {
      gradient: 'linear-gradient(to bottom, #072a1b 0%, #0f5135 40%, #031910 100%)',
      accent: '#34d399',
      textColor: '#d1fae5',
      textShadow: '0 2px 12px rgba(3,25,16,0.55)',
    },
    scratch: {
      gradStart: '#6ee7b7',
      gradMid: '#059669',
      gradEnd: '#022c1b',
      textColor: '#ffffff',
      accent: '#10b981',
    },
    background: '#031910',
    cardBg: '#072a1b',
    borderColor: 'rgba(16, 185, 129, 0.3)',
    musicPreset: 'https://cdn.pixabay.com/download/audio/2022/03/10/audio_c3574c82c3.mp3?filename=indian-classical-instrumental-110825.mp3',
  },
  'ivory-elegance-royal': {
    id: 'ivory-elegance-royal',
    name: 'Ivory Elegance & Crimson Royale',
    video: '/videos/ivory-elegance-royal.mp4',
    textColor: '#fff1f2',
    accentColor: '#e11d48',
    welcome: {
      gradient: 'linear-gradient(to bottom, #3b0914 0%, #6e1227 40%, #200308 100%)',
      accent: '#fb7185',
      textColor: '#ffe4e6',
      textShadow: '0 2px 12px rgba(32,3,8,0.55)',
    },
    scratch: {
      gradStart: '#fda4af',
      gradMid: '#be123c',
      gradEnd: '#4c0519',
      textColor: '#ffffff',
      accent: '#f43f5e',
    },
    background: '#200308',
    cardBg: '#3b0914',
    borderColor: 'rgba(244, 63, 94, 0.3)',
    musicPreset: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-wedding-113828.mp3',
  },
};

const ZareqiaRoyalSuite = ({ invitation = {}, isPreview = false, onRsvpSuccess }) => {
  const templateId =
    invitation.template_id ||
    invitation.templateId ||
    'rose-gold-blush-royal';

  const theme =
    zareqiaRoyalThemes[templateId] ||
    zareqiaRoyalThemes['rose-gold-blush-royal'];

  // Video Gate & Audio Playback State
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const canvasRef = useRef(null);

  const [hasStarted, setHasStarted] = useState(false);
  const [hasRevealed, setHasRevealed] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [isScratchRevealed, setIsScratchRevealed] = useState(false);

  // RSVP Form State
  const [rsvpName, setRsvpName] = useState('');
  const [rsvpAttending, setRsvpAttending] = useState('Yes');
  const [rsvpGuests, setRsvpGuests] = useState(1);
  const [rsvpPhone, setRsvpPhone] = useState('');
  const [rsvpMessage, setRsvpMessage] = useState('');
  const [rsvpSubmitting, setRsvpSubmitting] = useState(false);
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);

  // QR Modal
  const [qrOpen, setQrOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Countdown State
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Data Extraction
  const groomName = invitation.groom_name || invitation.groomName || 'Aarav Singhania';
  const brideName = invitation.bride_name || invitation.brideName || 'Kiara Malhotra';
  const coupleNames = invitation.names || `${groomName} & ${brideName}`;
  const groomParents =
    invitation.groom_parents || invitation.groomParents || 'Son of Mrs. Sunita & Mr. Rajesh Singhania';
  const brideParents =
    invitation.bride_parents || invitation.brideParents || 'Daughter of Mrs. Poonam & Mr. Anand Malhotra';

  const weddingDateStr = invitation.event_date || invitation.date || '2026-11-20';
  const weddingTimeStr = invitation.event_time || invitation.time || '19:00';
  const venueName = invitation.venue_name || invitation.venue || 'The Leela Palace, Udaipur';
  const venueAddress = invitation.venue_address || invitation.venueAddress || 'Lake Pichola, Udaipur, Rajasthan 313001';
  const welcomeMessage =
    invitation.welcome_text ||
    invitation.message ||
    'Invite you to share in the joy of the beginning of their new life together.';

  const fullVenueQuery = [venueName, venueAddress].filter(Boolean).join(', ');
  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(fullVenueQuery)}&t=m&z=14&output=embed`;
  const mapDirectUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullVenueQuery)}`;

  // Events Sequence
  const events =
    invitation.events && invitation.events.length > 0
      ? invitation.events
      : [
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

  // Gallery Images
  const galleryImages =
    invitation.gallery_images ||
    invitation.galleryUrls || [
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
    ];

  // Countdown Calculation
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

  // Video Tap & Gate Opening handler
  const handleOpenGate = async () => {
    if (hasStarted) return;
    setHasStarted(true);

    // Play video
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.muted = true;
      videoRef.current.playsInline = true;
      try {
        await videoRef.current.play();
      } catch (err) {
        console.log('Video auto-play catch:', err);
      }
    }

    // Play background audio
    if (audioRef.current) {
      try {
        await audioRef.current.play();
        setIsPlayingMusic(true);
      } catch (err) {
        console.log('Audio autoplay blocked by browser:', err);
      }
    }

    // Zareqia exact timing: at 6000ms, couple names animate in over the video
    setTimeout(() => {
      setHasRevealed(true);
    }, 6000);
  };

  // Scroll Down to content
  const handleScrollDown = (e) => {
    if (e) e.stopPropagation();
    const nextSection = document.getElementById('invitation-welcome');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    }
  };

  // Toggle Music
  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlayingMusic) {
      audioRef.current.pause();
      setIsPlayingMusic(false);
    } else {
      audioRef.current.play().then(() => setIsPlayingMusic(true)).catch(() => {});
    }
  };

  // Scratch Card Canvas
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

  // Handle RSVP Submit
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
    const text = encodeURIComponent(
      `Namaste! ✨\nYou are cordially invited to celebrate the wedding of ${coupleNames}.\n\nView our live digital invitation:\n${window.location.href}\n\nWith love,\n${coupleNames}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleSaveCalendar = () => {
    downloadIcsFile({
      title: `${coupleNames} - Royal Wedding Celebration`,
      description: welcomeMessage,
      venue: venueName,
      address: venueAddress,
      date: weddingDateStr,
      time: weddingTimeStr,
      url: window.location.href,
    });
  };

  return (
    <div
      className="min-h-screen font-sans selection:bg-amber-600 selection:text-white"
      style={{ backgroundColor: theme.background, color: theme.textColor }}
    >
      {/* Background Audio */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        src={invitation.music_url || invitation.musicUrl || theme.musicPreset}
      />

      {/* Floating Audio & Action Toolbar */}
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
          SECTION 1: 4K VIDEO GATE & COUPLE NAME REVEAL HERO (Exact Zareqia Style)
         ========================================================================= */}
      <section
        className="relative min-h-screen w-full overflow-hidden flex items-center justify-center cursor-pointer select-none"
        style={{ backgroundColor: '#0f0f0f' }}
        onClick={handleOpenGate}
      >
        {/* Full-Bleed Video Element */}
        <video
          ref={videoRef}
          src={theme.video}
          playsInline
          muted
          preload="auto"
          controls={false}
          disablePictureInPicture
          controlsList="nodownload noplaybackrate noremoteplayback nofullscreen"
          onContextMenu={(e) => e.preventDefault()}
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Dark Luxury Gradient Overlay over Video */}
        <div
          className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${
            hasRevealed ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.15) 45%, rgba(0,0,0,0.55) 100%)',
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
            className="mb-3 whitespace-pre-line font-dancing text-2xl md:text-4xl"
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
              className="font-dancing text-6xl leading-none md:text-9xl tracking-wide"
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
              className="font-dancing text-6xl leading-none md:text-9xl tracking-wide"
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

        {/* Bottom Scroll Bounce Indicator - Only shown once gate has revealed */}
        {hasRevealed && (
          <div
            onClick={handleScrollDown}
            className="absolute inset-x-0 bottom-8 z-30 flex flex-col items-center gap-2 cursor-pointer transition-all duration-700 animate-bounce pointer-events-auto"
          >
            <span
              className="text-xs uppercase tracking-widest font-mono"
              style={{ color: 'rgba(245,230,224,0.8)', textShadow: '0 1px 6px rgba(0,0,0,0.7)' }}
            >
              Scroll
            </span>
            <ChevronDown size={20} style={{ color: theme.textColor }} />
          </div>
        )}
      </section>

      {/* =========================================================================
          SECTION 2: WELCOME MESSAGE (Exact Zareqia Welcome Section)
         ========================================================================= */}
      <section
        id="invitation-welcome"
        className="relative px-6 py-20 md:py-28 overflow-hidden text-center"
        style={{ background: theme.welcome.gradient }}
      >
        <div className="max-w-2xl mx-auto space-y-6 relative z-10">
          <div className="flex items-center justify-center gap-3">
            <div
              className="h-px w-20"
              style={{ background: `linear-gradient(to right, transparent, ${theme.welcome.accent})` }}
            />
            <Heart size={14} style={{ color: theme.welcome.accent }} fill="currentColor" />
            <div
              className="h-px w-20"
              style={{ background: `linear-gradient(to left, transparent, ${theme.welcome.accent})` }}
            />
          </div>

          <p
            className="font-calligraphic text-2xl md:text-3xl leading-relaxed italic whitespace-pre-wrap break-words px-4"
            style={{ color: theme.welcome.textColor, textShadow: theme.welcome.textShadow }}
          >
            "{welcomeMessage}"
          </p>

          <div className="flex items-center justify-center gap-3">
            <div
              className="h-px w-20"
              style={{ background: `linear-gradient(to right, transparent, ${theme.welcome.accent})` }}
            />
            <Heart size={14} style={{ color: theme.welcome.accent }} fill="currentColor" />
            <div
              className="h-px w-20"
              style={{ background: `linear-gradient(to left, transparent, ${theme.welcome.accent})` }}
            />
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: SAVE THE DATE & INTERACTIVE SCRATCH CARD (Zareqia Foil Reveal)
         ========================================================================= */}
      <section className="py-14 px-4 sm:px-6 max-w-xl mx-auto space-y-6 text-center font-sans">
        <div className="space-y-1">
          <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-amber-400 font-bold block">
            ✦ Save The Date ✦
          </span>
          <h2 className="font-dancing text-3xl sm:text-4xl font-bold tracking-wide text-white">
            Special Card Reveal
          </h2>
          <div className="w-12 h-0.5 bg-amber-500/40 mx-auto" />
        </div>

        <div
          className="backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 relative overflow-hidden"
          style={{ backgroundColor: theme.cardBg, borderColor: theme.borderColor, borderWidth: 1 }}
        >
          <p className="text-xs text-neutral-300 font-sans">
            Scratch away the golden card below to unlock our wedding date & ceremony timing:
          </p>

          {/* Scratch Card Container */}
          <div className="relative w-full h-40 sm:h-44 rounded-2xl overflow-hidden bg-neutral-950 border-2 border-amber-500/40 shadow-inner flex items-center justify-center select-none">
            {/* Secret Content Underneath */}
            <div className="p-4 text-center space-y-1.5 animate-fade-in z-0">
              <span className="text-[10px] uppercase font-mono tracking-widest text-amber-400 font-bold block">
                YOU’RE CORDIALLY INVITED
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-wider">
                {new Date(weddingDateStr).toLocaleDateString('en-IN', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </h3>
              <p className="text-xs text-amber-300 font-mono">
                Ceremony Begins at {weddingTimeStr}
              </p>
              <p className="text-[11px] text-neutral-400 pt-1">
                {venueName}
              </p>
            </div>

            {/* Canvas Scratch Foil Layer */}
            {!isScratchRevealed && (
              <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full cursor-crosshair z-10 touch-none"
              />
            )}
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleSaveCalendar}
              className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center space-x-2"
            >
              <CalendarPlus className="w-4 h-4 text-neutral-950" />
              <span>Add to Calendar (.ics)</span>
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: LIVE CELEBRATION COUNTDOWN CLOCK
         ========================================================================= */}
      <section className="py-10 px-4 sm:px-6 max-w-xl mx-auto text-center font-sans">
        <div
          className="backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4"
          style={{ backgroundColor: theme.cardBg, borderColor: theme.borderColor, borderWidth: 1 }}
        >
          <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-amber-400 font-bold block">
            ✦ Countdown to the Big Day ✦
          </span>
          <h2 className="font-dancing text-2xl sm:text-3xl font-bold text-white">
            Until We Say "I Do"
          </h2>

          <div className="grid grid-cols-4 gap-2 pt-2">
            {[
              { label: 'Days', val: timeLeft.days },
              { label: 'Hours', val: timeLeft.hours },
              { label: 'Mins', val: timeLeft.minutes },
              { label: 'Secs', val: timeLeft.seconds },
            ].map((item, i) => (
              <div key={i} className="p-3 rounded-2xl bg-black/50 border border-white/10 text-center">
                <span className="font-serif text-2xl sm:text-3xl font-bold text-amber-300 block">
                  {String(item.val).padStart(2, '0')}
                </span>
                <span className="text-[9px] uppercase font-mono text-neutral-400">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: CEREMONY TIMELINE (Program Timeline)
         ========================================================================= */}
      <section className="py-14 px-4 sm:px-6 max-w-xl mx-auto space-y-6 font-sans">
        <div className="text-center space-y-1">
          <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-amber-400 font-bold block">
            ✦ Program Timeline ✦
          </span>
          <h2 className="font-dancing text-3xl sm:text-4xl font-bold text-white">
            Events & Celebrations
          </h2>
          <div className="w-12 h-0.5 bg-amber-500/40 mx-auto" />
        </div>

        <div className="space-y-4">
          {events.map((ev, idx) => (
            <div
              key={idx}
              className="backdrop-blur-md rounded-2xl p-5 shadow-xl space-y-3 relative overflow-hidden"
              style={{ backgroundColor: theme.cardBg, borderColor: theme.borderColor, borderWidth: 1 }}
            >
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-[10px] font-mono text-amber-300 font-bold uppercase">
                  Event 0{idx + 1}
                </span>
                <div className="flex items-center space-x-1.5 text-xs text-amber-300 font-mono">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>{ev.time}</span>
                </div>
              </div>

              <div>
                <h3 className="font-dancing text-2xl font-bold text-white leading-tight">
                  {ev.title}
                </h3>
                {ev.description && (
                  <p className="text-xs text-neutral-300 pt-1 leading-relaxed">
                    {ev.description}
                  </p>
                )}
              </div>

              <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1 text-xs text-neutral-300">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="font-mono">
                    {ev.date
                      ? new Date(ev.date).toLocaleDateString('en-IN', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })
                      : 'Date TBD'}
                  </span>
                </div>
                <div className="flex items-start space-x-2 pt-1 border-t border-white/5">
                  <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">{ev.venue || venueName}</strong>
                    {ev.address && <span className="text-[11px] text-neutral-400">{ev.address}</span>}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: VENUE & EMBEDDED GOOGLE MAPS (Zareqia Map Section)
         ========================================================================= */}
      <section className="py-14 px-4 sm:px-6 max-w-xl mx-auto space-y-6 text-center font-sans">
        <div className="space-y-1">
          <MapPin className="w-6 h-6 text-amber-400 mx-auto" />
          <h2 className="font-dancing text-3xl sm:text-4xl font-bold text-white">
            Venue & Directions
          </h2>
          <div className="w-12 h-0.5 bg-amber-500/40 mx-auto" />
        </div>

        <div
          className="backdrop-blur-md rounded-3xl p-5 sm:p-6 shadow-2xl space-y-4"
          style={{ backgroundColor: theme.cardBg, borderColor: theme.borderColor, borderWidth: 1 }}
        >
          <div className="space-y-1">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
              {venueName}
            </h3>
            <p className="text-xs text-neutral-300 max-w-md mx-auto">
              {venueAddress}
            </p>
          </div>

          {/* Embedded Google Maps */}
          <div className="rounded-2xl overflow-hidden border border-white/10 shadow-lg h-56 w-full">
            <iframe
              src={mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Venue Google Maps"
            />
          </div>

          <a
            href={mapDirectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 text-neutral-950 font-bold text-xs uppercase tracking-wider shadow-lg transition-transform hover:scale-105"
          >
            <Navigation className="w-4 h-4 text-neutral-950" />
            <span>View on Google Maps</span>
          </a>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: PHOTO MEMORIES SLIDESHOW
         ========================================================================= */}
      <section className="py-12 px-4 sm:px-6 max-w-xl mx-auto space-y-5 text-center font-sans">
        <div className="space-y-1">
          <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-amber-400 font-bold block">
            ✦ Captured Moments ✦
          </span>
          <h2 className="font-dancing text-3xl sm:text-4xl font-bold text-white">
            Photo Memories
          </h2>
          <div className="w-12 h-0.5 bg-amber-500/40 mx-auto" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {galleryImages.map((img, i) => (
            <div key={i} className="aspect-[4/5] rounded-2xl overflow-hidden border border-white/15 shadow-lg group">
              <img
                src={img}
                alt={`Couple memory ${i + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 8: GUEST RSVP & ATTENDANCE SUBMISSION
         ========================================================================= */}
      <section className="py-14 px-4 sm:px-6 max-w-xl mx-auto space-y-6 font-sans">
        <div className="text-center space-y-1">
          <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-amber-400 font-bold block">
            ✦ Please Respond ✦
          </span>
          <h2 className="font-dancing text-3xl sm:text-4xl font-bold text-white">
            Guest RSVP
          </h2>
          <div className="w-12 h-0.5 bg-amber-500/40 mx-auto" />
        </div>

        <div
          className="backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5"
          style={{ backgroundColor: theme.cardBg, borderColor: theme.borderColor, borderWidth: 1 }}
        >
          {rsvpSubmitted ? (
            <div className="py-6 text-center space-y-3 animate-fade-in">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="font-dancing text-2xl font-bold text-white">
                Thank You, {rsvpName}!
              </h3>
              <p className="text-xs text-neutral-300 font-sans">
                Your attendance confirmation has been received with joy.
              </p>
            </div>
          ) : (
            <form onSubmit={handleRsvpSubmit} className="space-y-4">
              {/* Attendance Choice */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: 'Attending (Yes)', val: 'Yes', emoji: '🎉' },
                  { label: 'Cannot (No)', val: 'No', emoji: '🌸' },
                  { label: 'Maybe', val: 'Maybe', emoji: '✨' },
                ].map((item) => (
                  <button
                    key={item.val}
                    type="button"
                    onClick={() => setRsvpAttending(item.val)}
                    className={`py-2.5 px-2 rounded-2xl text-xs font-bold transition-all flex flex-col items-center justify-center space-y-0.5 ${
                      rsvpAttending === item.val
                        ? 'bg-amber-500 text-neutral-950 shadow-lg scale-[1.02] border-2 border-amber-300'
                        : 'bg-black/40 text-neutral-300 border border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <span>{item.emoji}</span>
                    <span className="text-[10.5px]">{item.label}</span>
                  </button>
                ))}
              </div>

              <div>
                <label className="font-mono uppercase font-bold text-neutral-300 block mb-1 text-[11px]">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vikram Singhania"
                  value={rsvpName}
                  onChange={(e) => setRsvpName(e.target.value)}
                  className="w-full bg-black/40 border border-white/15 rounded-xl px-4 py-3 text-xs text-white placeholder:text-neutral-500 focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-mono uppercase font-bold text-neutral-300 block mb-1 text-[11px]">
                    Guests Count
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={rsvpGuests}
                    onChange={(e) => setRsvpGuests(e.target.value)}
                    className="w-full bg-black/40 border border-white/15 rounded-xl px-4 py-3 text-xs text-white focus:border-amber-400 focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="font-mono uppercase font-bold text-neutral-300 block mb-1 text-[11px]">
                    WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={rsvpPhone}
                    onChange={(e) => setRsvpPhone(e.target.value)}
                    className="w-full bg-black/40 border border-white/15 rounded-xl px-4 py-3 text-xs text-white placeholder:text-neutral-500 focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-mono uppercase font-bold text-neutral-300 block mb-1 text-[11px]">
                  Heartfelt Wishes (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Wishing the happy couple a lifetime of love and joy..."
                  value={rsvpMessage}
                  onChange={(e) => setRsvpMessage(e.target.value)}
                  className="w-full bg-black/40 border border-white/15 rounded-xl p-3 text-xs text-white placeholder:text-neutral-500 focus:border-amber-400 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={rsvpSubmitting}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold text-xs uppercase tracking-widest shadow-xl flex items-center justify-center space-x-2 transition-all"
              >
                <Send className="w-4 h-4 text-neutral-950" />
                <span>{rsvpSubmitting ? 'Submitting RSVP...' : 'Submit RSVP Online'}</span>
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer Branding */}
      <footer className="py-12 border-t border-white/10 text-center space-y-2">
        <div className="flex items-center justify-center space-x-1.5 text-amber-400">
          <Sparkles className="w-4 h-4" />
          <span className="font-serif text-sm font-bold tracking-[0.2em] uppercase">
            MOONLIGHT PRODUCTION
          </span>
        </div>
        <p className="text-[11px] text-neutral-400 font-sans">
          Your Story. Our Vision. Forever.
        </p>
      </footer>

      {/* QR Modal */}
      {qrOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-neutral-900 border border-amber-500/30 rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center space-y-4 relative shadow-2xl">
            <button
              type="button"
              onClick={() => setQrOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-1">
              <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-amber-400 font-bold block">
                Scan With Any Phone
              </span>
              <h3 className="font-dancing text-2xl font-bold text-white">
                {coupleNames}
              </h3>
            </div>

            <div className="p-3 bg-white rounded-2xl inline-block mx-auto shadow-inner">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
                  window.location.href
                )}`}
                alt="QR Code"
                className="w-40 h-40 mx-auto"
              />
            </div>

            <div className="flex justify-center space-x-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center shadow"
              >
                {copied ? <Check className="w-3.5 h-3.5 mr-1 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 mr-1" />}
                {copied ? 'Copied Link!' : 'Copy Link'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ZareqiaRoyalSuite;
