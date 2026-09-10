import React, { useState, useEffect, useRef } from 'react';
import api from '../../../api/client';
import { useNotification } from '../../../context/NotificationContext';
import OpeningScreen from '../components/OpeningScreen';
import { Volume2, VolumeX, MapPin, CheckCircle2, Heart, DoorClosed } from 'lucide-react';

const ModernMinimalInvitation = ({ invitation = {}, isPreview = false, onRsvpSuccess }) => {
  const { addToast } = useNotification();
  const [isPlaying, setIsPlaying] = useState(false);
  const [showDoors, setShowDoors] = useState(true);
  const [doorKey, setDoorKey] = useState(0);
  const [rsvpSubmitting, setRsvpSubmitting] = useState(false);
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
  
  const [rsvpForm, setRsvpForm] = useState({
    name: '',
    guests: '1',
    message: '',
    attending: 'yes',
  });

  const audioRef = useRef(null);

  // Derive Couple Names & Initials
  const coupleNames =
    invitation.names ||
    ((invitation.bride_name || invitation.brideName) && (invitation.groom_name || invitation.groomName)
      ? `${invitation.bride_name || invitation.brideName} & ${invitation.groom_name || invitation.groomName}`
      : 'Aisha Khan & Rohan Mehra');

  const nameParts = coupleNames.split('&');
  const brideDisplay = invitation.bride_name || invitation.brideName || nameParts[0]?.trim() || 'Aisha Khan';
  const groomDisplay = invitation.groom_name || invitation.groomName || nameParts[1]?.trim() || 'Rohan Mehra';
  const initials = `${brideDisplay.charAt(0)} & ${groomDisplay.charAt(0)}`;

  const hostSubtitle =
    invitation.host_names ||
    invitation.hostNames ||
    invitation.opening_heading ||
    'Together with their families';

  const welcomeMessage =
    invitation.welcome_text ||
    invitation.message ||
    invitation.story ||
    invitation.story_text ||
    'Invite you to share in the joy of the beginning of their new life together.';

  const targetDateStr = invitation.event_date || invitation.date || '2026-11-20';
  const targetTimeStr = invitation.event_time || invitation.time || '19:00';

  // Real-time Countdown Timer calculation
  const [timeLeft, setTimeLeft] = useState({ days: 45, hours: 12, minutes: 30, seconds: 0 });

  useEffect(() => {
    const calculateTime = () => {
      try {
        const target = new Date(`${targetDateStr}T${targetTimeStr.length === 5 ? targetTimeStr : '19:00'}:00`).getTime();
        const now = new Date().getTime();
        const diff = target - now;

        if (diff > 0) {
          setTimeLeft({
            days: Math.floor(diff / (1000 * 60 * 60 * 24)),
            hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((diff / 1000 / 60) % 60),
            seconds: Math.floor((diff / 1000) % 60),
          });
        }
      } catch (e) {
        // fallback to default
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDateStr, targetTimeStr]);

  // Handle Cover Overlay Timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      setOverlayActive(false);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  // Music toggle
  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const defaultEvents = [
    {
      title: 'Mehendi Ceremony',
      date: '2026-11-19',
      time: '06:00 PM',
      venue: 'The Leela Palace, Courtyard',
      address: 'Udaipur, Rajasthan',
    },
    {
      title: 'Sangeet Night',
      date: '2026-11-19',
      time: '07:30 PM',
      venue: 'The Royal Ballroom',
      address: 'Udaipur, Rajasthan',
    },
    {
      title: 'Wedding Reception',
      date: '2026-11-20',
      time: '08:00 PM',
      venue: 'Grand Lawn, The Leela Palace',
      address: 'Udaipur, Rajasthan',
    },
  ];

  const eventsList =
    invitation.events && invitation.events.length > 0
      ? invitation.events
      : defaultEvents;

  const handleRsvpSubmit = async (e) => {
    e.preventDefault();
    if (!rsvpForm.name.trim()) return;

    setRsvpSubmitting(true);
    try {
      await api.post('/rsvp', {
        invitationId: invitation.id || invitation._id || 'demo-inv',
        guestName: rsvpForm.name,
        guestCount: parseInt(rsvpForm.guests) || 1,
        message: rsvpForm.message,
        attending: rsvpForm.attending === 'yes',
      });

      setRsvpSubmitted(true);
      if (addToast) {
        addToast({
          title: 'RSVP Received!',
          message: 'Thank you for your blessings and confirmation.',
          type: 'success',
        });
      }
      if (onRsvpSuccess) onRsvpSuccess(rsvpForm);
    } catch (err) {
      setRsvpSubmitted(true);
    } finally {
      setRsvpSubmitting(false);
    }
  };

  const musicUrl =
    invitation.music_url ||
    invitation.musicUrl ||
    'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-wedding-113828.mp3';

  return (
    <div className="relative min-h-screen bg-[#0B132B] text-[#f8f9fa] font-sans selection:bg-[#d4af37] selection:text-black overflow-x-hidden">
      
      {/* Audio Element */}
      <audio ref={audioRef} src={musicUrl} loop preload="auto" />

      {/* Embedded CSS for Exact Visual Reproduction */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Montserrat:wght@300;400;500;600&display=swap');

        .modern-minimal-container {
          --bg-navy: #0B132B;
          --bg-navy-light: #1C2541;
          --gold: #d4af37;
          --gold-light: #f3cf5b;
          --text-light: #f8f9fa;
          --text-muted: #cbd5e1;
          --heading-font: 'Cormorant Garamond', Georgia, serif;
          --body-font: 'Montserrat', sans-serif;
          font-family: var(--body-font);
        }

        .cover-overlay-anim {
          animation: mmSlideOut 1.2s ease-in-out 2.2s forwards;
        }

        .geometric-accent-spin {
          animation: mmSpin 2.5s linear infinite;
        }

        @keyframes mmSlideOut {
          0% { transform: scale(1); opacity: 1; visibility: visible; }
          100% { transform: scale(1.08); opacity: 0; visibility: hidden; pointer-events: none; }
        }

        @keyframes mmSpin {
          100% { transform: rotate(405deg); }
        }

        .geometric-border {
          position: absolute;
          top: 1.5rem;
          bottom: 1.5rem;
          left: 1.5rem;
          right: 1.5rem;
          border: 1px solid rgba(212, 175, 55, 0.35);
          pointer-events: none;
        }
        .geometric-border::before, .geometric-border::after {
          content: '';
          position: absolute;
          width: 18px;
          height: 18px;
          border: 1px solid #d4af37;
        }
        .geometric-border::before { top: -9px; left: -9px; }
        .geometric-border::after { bottom: -9px; right: -9px; }

        .event-card-top-line::before {
          content: '';
          position: absolute;
          top: 0; left: 50%;
          transform: translateX(-50%);
          width: 45px;
          height: 1px;
          background: #d4af37;
        }
      `}</style>

      {/* 1. Cinematic 3D Royal Palace Double Doors & Wax Seal Opening */}
      {showDoors && (
        <OpeningScreen
          key={doorKey}
          invitation={invitation}
          theme={{ crestIcon: '👑', fontHeading: 'font-serif' }}
          onEnter={() => {
            if (audioRef.current && !isPlaying) {
              audioRef.current.play().catch(() => {});
              setIsPlaying(true);
            }
          }}
          isPreview={isPreview}
        />
      )}

      {/* Floating Toolbar: Replay Doors & Music Toggle */}
      <div className={`${isPreview ? 'absolute top-3 right-3 z-30' : 'fixed top-4 right-4 z-40'} flex items-center space-x-2`}>
        <button
          type="button"
          onClick={() => {
            setDoorKey((prev) => prev + 1);
            setShowDoors(true);
          }}
          className="px-3 py-1.5 rounded-full bg-black/70 hover:bg-black/90 backdrop-blur-md border border-[#d4af37]/50 text-[#d4af37] shadow-xl text-[11px] font-serif flex items-center space-x-1.5 cursor-pointer transition-transform hover:scale-105"
          title="Replay Palace Doors"
        >
          <DoorClosed className="w-3.5 h-3.5 text-[#d4af37]" />
          <span>Replay Doors</span>
        </button>
      </div>

      {/* 2. Floating Music Toggle */}
      {invitation.music_enabled !== false && (
        <button
          type="button"
          onClick={toggleMusic}
          className={`${
            isPreview ? 'absolute bottom-4 right-4 z-30' : 'fixed bottom-6 right-6 z-50'
          } w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#d4af37]/20 hover:bg-[#d4af37] hover:text-[#0B132B] text-[#d4af37] border border-[#d4af37] flex items-center justify-center cursor-pointer backdrop-blur-md shadow-lg transition-all duration-300`}
          title={isPlaying ? 'Pause Music' : 'Play Music'}
        >
          {isPlaying ? <span className="font-mono text-sm tracking-tighter">ılılı</span> : <span>♪</span>}
        </button>
      )}

      {/* 3. Main Container (max-w-[600px] Centered Mobile Experience) */}
      <div className="modern-minimal-container max-w-[600px] mx-auto bg-gradient-to-b from-[#0B132B] to-[#111a36] min-h-screen relative shadow-2xl border-x border-[#d4af37]/20 pb-16">
        
        {/* HERO SECTION */}
        <section className="relative text-center py-20 px-6 sm:px-8">
          <div className="geometric-border" />
          
          <p className="text-xs uppercase tracking-[4px] text-[#d4af37] mb-6 font-medium">
            {hostSubtitle}
          </p>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white font-semibold leading-[1.15] mb-6">
            <span>{brideDisplay}</span>
            <span className="block text-3xl sm:text-4xl text-[#d4af37] italic my-2 font-serif">&</span>
            <span>{groomDisplay}</span>
          </h1>

          <p className="text-sm sm:text-base text-[#cbd5e1] max-w-[85%] mx-auto italic font-serif leading-relaxed">
            "{welcomeMessage}"
          </p>
        </section>

        {/* COUNTDOWN SECTION */}
        <section className="py-10 px-6 bg-[#1C2541]/90 text-center border-y border-[#d4af37]/20">
          <h2 className="font-serif text-[#d4af37] text-2xl sm:text-3xl mb-6">
            The Big Day
          </h2>
          <div className="flex justify-center gap-4 sm:gap-6">
            <div className="flex flex-col items-center">
              <span className="font-serif text-3xl sm:text-4xl text-white font-bold leading-none">
                {timeLeft.days}
              </span>
              <span className="text-[10px] uppercase tracking-[2px] text-[#d4af37] mt-2">
                Days
              </span>
            </div>
            <div className="text-2xl text-[#d4af37]/60 font-serif">:</div>
            <div className="flex flex-col items-center">
              <span className="font-serif text-3xl sm:text-4xl text-white font-bold leading-none">
                {timeLeft.hours}
              </span>
              <span className="text-[10px] uppercase tracking-[2px] text-[#d4af37] mt-2">
                Hrs
              </span>
            </div>
            <div className="text-2xl text-[#d4af37]/60 font-serif">:</div>
            <div className="flex flex-col items-center">
              <span className="font-serif text-3xl sm:text-4xl text-white font-bold leading-none">
                {timeLeft.minutes}
              </span>
              <span className="text-[10px] uppercase tracking-[2px] text-[#d4af37] mt-2">
                Min
              </span>
            </div>
            <div className="text-2xl text-[#d4af37]/60 font-serif">:</div>
            <div className="flex flex-col items-center">
              <span className="font-serif text-3xl sm:text-4xl text-white font-bold leading-none">
                {timeLeft.seconds}
              </span>
              <span className="text-[10px] uppercase tracking-[2px] text-[#d4af37] mt-2">
                Sec
              </span>
            </div>
          </div>
        </section>

        {/* CELEBRATION EVENTS SECTION */}
        <section className="py-14 px-6 sm:px-8">
          <h2 className="font-serif text-3xl sm:text-4xl text-[#d4af37] text-center mb-10">
            Celebration Events
          </h2>

          <div className="space-y-6">
            {eventsList.map((ev, idx) => {
              const googleMapsUrl =
                ev.address || ev.venue
                  ? `https://maps.google.com/?q=${encodeURIComponent(`${ev.venue || ''} ${ev.address || ''}`)}`
                  : '#';

              return (
                <div
                  key={idx}
                  className="event-card-top-line bg-[#1C2541]/50 border border-[#d4af37]/20 p-6 sm:p-8 text-center relative rounded-xs hover:border-[#d4af37]/40 transition-colors"
                >
                  <h3 className="font-serif text-xl sm:text-2xl text-white mb-2">
                    {ev.title}
                  </h3>
                  <p className="text-[#d4af37] text-xs sm:text-sm font-medium tracking-wide mb-3">
                    {ev.date ? new Date(ev.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '12 Feb 2026'} • {ev.time || '06:00 PM'}
                  </p>
                  <p className="text-[#cbd5e1] text-xs sm:text-sm mb-5 leading-relaxed">
                    {ev.venue || 'The Leela Palace'}<br />
                    <span className="text-[11px] text-[#cbd5e1]/80">{ev.address || 'Udaipur, Rajasthan'}</span>
                  </p>
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block px-5 py-2 bg-transparent border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-[#0B132B] text-xs uppercase tracking-[2px] transition-all duration-300 font-semibold"
                  >
                    View Map
                  </a>
                </div>
              );
            })}
          </div>
        </section>

        {/* RSVP & WISHES SECTION */}
        {invitation.rsvp_enabled !== false && (
          <section className="py-12 px-6 sm:px-8 bg-[#1C2541]/80 border-t border-[#d4af37]/20 text-center">
            <h2 className="font-serif text-3xl text-[#d4af37] mb-8">
              RSVP & Wishes
            </h2>

            {rsvpSubmitted ? (
              <div className="p-8 bg-[#0B132B]/80 border border-[#d4af37]/40 rounded-xl space-y-3 animate-fade-in">
                <CheckCircle2 className="w-10 h-10 text-[#d4af37] mx-auto" />
                <h3 className="font-serif text-xl text-white">Message Sent Successfully!</h3>
                <p className="text-xs text-[#cbd5e1]">
                  Thank you for confirming your attendance and sending your warm blessings.
                </p>
              </div>
            ) : (
              <form onSubmit={handleRsvpSubmit} className="space-y-4 max-w-md mx-auto text-left">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#d4af37] mb-1 font-semibold">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={rsvpForm.name}
                    onChange={(e) => setRsvpForm({ ...rsvpForm, name: e.target.value })}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full bg-transparent border border-[#d4af37]/30 focus:border-[#d4af37] p-3 text-sm text-white placeholder-slate-500 outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#d4af37] mb-1 font-semibold">
                    Number of Guests Attending
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    required
                    value={rsvpForm.guests}
                    onChange={(e) => setRsvpForm({ ...rsvpForm, guests: e.target.value })}
                    placeholder="1"
                    className="w-full bg-transparent border border-[#d4af37]/30 focus:border-[#d4af37] p-3 text-sm text-white placeholder-slate-500 outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#d4af37] mb-1 font-semibold">
                    Blessings & Message for the Couple
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={rsvpForm.message}
                    onChange={(e) => setRsvpForm({ ...rsvpForm, message: e.target.value })}
                    placeholder="Leave your heartfelt wishes..."
                    className="w-full bg-transparent border border-[#d4af37]/30 focus:border-[#d4af37] p-3 text-sm text-white placeholder-slate-500 outline-none transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={rsvpSubmitting}
                  className="w-full py-3.5 bg-[#d4af37] hover:bg-[#f3cf5b] text-[#0B132B] font-bold text-xs uppercase tracking-[2px] transition-all duration-300 cursor-pointer shadow-md disabled:opacity-50"
                >
                  {rsvpSubmitting ? 'Sending Wishes...' : 'Send Message'}
                </button>
              </form>
            )}
          </section>
        )}

        {/* Footer Credit */}
        <div className="pt-10 pb-4 text-center text-[10px] text-slate-500 font-mono">
          Moonlight Digital Invitations • Crafted with Love
        </div>
      </div>
    </div>
  );
};

export default ModernMinimalInvitation;
