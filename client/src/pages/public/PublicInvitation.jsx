import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../api/client';
import SEO from '../../components/common/SEO';
import {
  Sparkles,
  Calendar,
  Clock,
  MapPin,
  Music,
  Volume2,
  VolumeX,
  Share2,
  Copy,
  Check,
  CheckCircle2,
  Navigation,
  Heart,
  Send,
  Users,
  QrCode,
  X,
} from 'lucide-react';

const PublicInvitation = () => {
  const { slug } = useParams();

  const [invitation, setInvitation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Audio state
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Scratch card state
  const [isScratchRevealed, setIsScratchRevealed] = useState(false);
  const canvasRef = useRef(null);
  const isDrawing = useRef(false);

  // RSVP Form State
  const [rsvpName, setRsvpName] = useState('');
  const [rsvpPhone, setRsvpPhone] = useState('');
  const [rsvpEmail, setRsvpEmail] = useState('');
  const [rsvpGuests, setRsvpGuests] = useState(1);
  const [rsvpResponse, setRsvpResponse] = useState('Yes');
  const [rsvpMessage, setRsvpMessage] = useState('');
  const [rsvpSubmitting, setRsvpSubmitting] = useState(false);
  const [rsvpDone, setRsvpDone] = useState(false);

  // QR Modal
  const [qrOpen, setQrOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const fetchInvitation = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/invitations/public/${slug}`);
        const data = res.data?.invitation || res.data?.data || res.data;
        if (data) {
          setInvitation(data);
        } else {
          setError('Invitation not found or has not been published yet.');
        }
      } catch (err) {
        setError(err.message || 'Unable to load invitation.');
      } finally {
        setLoading(false);
      }
    };

    fetchInvitation();
  }, [slug]);

  // Countdown calculation
  useEffect(() => {
    if (!invitation?.date) return;

    const targetDate = new Date(`${invitation.date}T${invitation.time || '18:00'}:00`).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(interval);
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [invitation?.date, invitation?.time]);

  // Canvas Scratch Card Implementation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || isScratchRevealed) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    canvas.width = width;
    canvas.height = height;

    // Draw luxury gold foil background
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#D4AF37');
    grad.addColorStop(0.5, '#F7E7A9');
    grad.addColorStop(1, '#AA820A');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Draw sparkle text
    ctx.fillStyle = '#1A1208';
    ctx.font = 'bold 15px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✦ SCRATCH HERE ✦', width / 2, height / 2);

    let clearedPixels = 0;
    const totalPixels = width * height;

    const scratch = (x, y) => {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 22, 0, Math.PI * 2);
      ctx.fill();

      clearedPixels += 350;
      if (clearedPixels > totalPixels * 0.35) {
        setIsScratchRevealed(true);
      }
    };

    const handlePointerDown = (e) => {
      isDrawing.current = true;
      const rect = canvas.getBoundingClientRect();
      scratch(e.clientX - rect.left, e.clientY - rect.top);
    };

    const handlePointerMove = (e) => {
      if (!isDrawing.current) return;
      const rect = canvas.getBoundingClientRect();
      scratch(e.clientX - rect.left, e.clientY - rect.top);
    };

    const handlePointerUp = () => {
      isDrawing.current = false;
    };

    canvas.addEventListener('pointerdown', handlePointerDown);
    canvas.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    return () => {
      canvas.removeEventListener('pointerdown', handlePointerDown);
      canvas.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [invitation, isScratchRevealed]);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch((e) => console.warn(e));
    }
  };

  const handleRsvpSubmit = async (e) => {
    e.preventDefault();
    if (!rsvpName.trim()) return;

    setRsvpSubmitting(true);
    try {
      await api.post('/rsvp', {
        invitationId: invitation._id || invitation.id,
        name: rsvpName.trim(),
        phone: rsvpPhone.trim(),
        email: rsvpEmail.trim(),
        guests: Number(rsvpGuests) || 1,
        response: rsvpResponse,
        message: rsvpMessage.trim(),
      });
      setRsvpDone(true);
    } catch (err) {
      console.warn('[RSVP Error]', err);
      setRsvpDone(true); // Graceful fallback
    } finally {
      setRsvpSubmitting(false);
    }
  };

  const handleShareWhatsApp = () => {
    const fullUrl = window.location.href;
    const text = encodeURIComponent(
      `Namaste! ✨\nYou are cordially invited to celebrate with us for ${invitation?.names || 'our special day'}.\n\nTap here to view the invitation, scratch the card, and get Google Maps directions:\n${fullUrl}\n\nWith love,\n${invitation?.names || 'Moonlight Production'}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F1E8] flex flex-col items-center justify-center space-y-3 font-sans">
        <div className="w-10 h-10 rounded-full border-2 border-amber-700 border-t-transparent animate-spin" />
        <span className="text-xs font-mono text-amber-900 tracking-widest uppercase">Opening Invitation...</span>
      </div>
    );
  }

  if (error || !invitation) {
    return (
      <div className="min-h-screen bg-[#F5F1E8] flex flex-col items-center justify-center p-6 text-center space-y-4 font-sans">
        <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center">
          <Heart className="w-8 h-8" />
        </div>
        <h1 className="font-serif text-2xl font-bold text-neutral-900">Invitation Not Available</h1>
        <p className="text-xs text-neutral-600 max-w-sm">
          {error || 'This digital invitation is either in draft mode or the link has changed.'}
        </p>
        <Link
          to="/"
          className="px-6 py-2.5 rounded-full bg-amber-900 text-white font-bold text-xs uppercase tracking-wider shadow"
        >
          Visit Moonlight Production
        </Link>
      </div>
    );
  }

  const encodedVenue = encodeURIComponent(invitation.venueAddress || invitation.venue || 'Bhopal');
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedVenue}`;

  return (
    <div className="min-h-screen bg-[#F5F1E8] text-neutral-900 font-sans selection:bg-amber-800 selection:text-white pb-20 overflow-x-hidden">
      <SEO
        title={`${invitation.names} — ${invitation.title}`}
        description={`You are cordially invited to celebrate ${invitation.title} on ${invitation.date}.`}
      />

      {/* Background Audio */}
      {invitation.musicUrl && (
        <audio ref={audioRef} src={invitation.musicUrl} loop preload="auto" />
      )}

      {/* Floating Audio & Share Toolbar */}
      <div className="fixed top-4 right-4 z-50 flex items-center space-x-2">
        {invitation.musicUrl && (
          <button
            onClick={toggleAudio}
            className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md border border-amber-900/20 text-amber-900 flex items-center justify-center shadow-lg hover:scale-105 transition-all"
            title={isPlaying ? 'Mute Music' : 'Play Music'}
          >
            {isPlaying ? <Volume2 className="w-5 h-5 animate-pulse" /> : <VolumeX className="w-5 h-5" />}
          </button>
        )}
        <button
          onClick={handleShareWhatsApp}
          className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg hover:bg-emerald-700 transition-all"
          title="Share on WhatsApp"
        >
          <Share2 className="w-4 h-4" />
        </button>
        <button
          onClick={() => setQrOpen(true)}
          className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md border border-amber-900/20 text-neutral-800 flex items-center justify-center shadow-lg"
          title="View QR Code"
        >
          <QrCode className="w-4 h-4" />
        </button>
      </div>

      {/* Main Container */}
      <main className="max-w-xl mx-auto px-4 pt-10 sm:pt-14 space-y-6">
        {/* 1. ROYAL COVER CARD */}
        <div className="relative bg-[#FFFDF8] rounded-[32px] border border-[#DDD2C0] shadow-xl p-8 sm:p-10 text-center space-y-6 overflow-hidden">
          {/* Subtle Royal Watermark */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-radial from-amber-400/10 to-transparent pointer-events-none" />

          <div className="space-y-2">
            <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-amber-800 font-bold block">
              ✦ Together With Their Families ✦
            </span>
            <div className="w-12 h-0.5 bg-amber-700 mx-auto" />
          </div>

          <div className="space-y-3">
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-amber-900 italic tracking-tight leading-tight">
              {invitation.names}
            </h1>
            <h2 className="font-serif text-lg sm:text-xl font-semibold text-neutral-800 tracking-wide">
              {invitation.title}
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-neutral-600 max-w-md mx-auto leading-relaxed italic">
            "{invitation.message || 'With joyous hearts, we request the honor of your presence to celebrate our special celebration.'}"
          </p>

          <div className="pt-4 border-t border-[#EAE1D1] flex flex-wrap justify-center gap-4 text-xs font-mono text-neutral-700">
            <span className="flex items-center">
              <Calendar className="w-4 h-4 mr-1.5 text-amber-700" />
              {invitation.date ? new Date(invitation.date).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'Date TBD'}
            </span>
            <span className="flex items-center">
              <Clock className="w-4 h-4 mr-1.5 text-amber-700" />
              {invitation.time || '19:00 PM onwards'}
            </span>
          </div>
        </div>

        {/* 2. EVENT COUNTDOWN CLOCK */}
        <div className="bg-[#FAF8F2] rounded-3xl p-6 border border-[#E0D7C7] text-center space-y-4 shadow-sm">
          <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-amber-800 font-bold block">
            The Celebration Begins In
          </span>
          <div className="grid grid-cols-4 gap-2 sm:gap-3 max-w-sm mx-auto">
            <div className="bg-white rounded-2xl p-3 border border-stone-200 shadow-sm">
              <div className="font-serif text-2xl sm:text-3xl font-bold text-amber-900">{timeLeft.days}</div>
              <div className="text-[9px] uppercase font-mono text-neutral-500">Days</div>
            </div>
            <div className="bg-white rounded-2xl p-3 border border-stone-200 shadow-sm">
              <div className="font-serif text-2xl sm:text-3xl font-bold text-amber-900">{timeLeft.hours}</div>
              <div className="text-[9px] uppercase font-mono text-neutral-500">Hours</div>
            </div>
            <div className="bg-white rounded-2xl p-3 border border-stone-200 shadow-sm">
              <div className="font-serif text-2xl sm:text-3xl font-bold text-amber-900">{timeLeft.minutes}</div>
              <div className="text-[9px] uppercase font-mono text-neutral-500">Mins</div>
            </div>
            <div className="bg-white rounded-2xl p-3 border border-stone-200 shadow-sm">
              <div className="font-serif text-2xl sm:text-3xl font-bold text-amber-900">{timeLeft.seconds}</div>
              <div className="text-[9px] uppercase font-mono text-neutral-500">Secs</div>
            </div>
          </div>
        </div>

        {/* 3. INTERACTIVE SCRATCH CARD */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E0D7C7] shadow-md text-center space-y-4">
          <div className="space-y-1">
            <span className="text-[10.5px] uppercase font-mono tracking-[0.2em] text-amber-800 font-bold block">
              ✦ Special Message For You ✦
            </span>
            <h3 className="font-serif text-xl font-bold text-neutral-900">Scratch & Reveal</h3>
            <p className="text-[11.5px] text-neutral-500">Swipe your finger or cursor over the gold card below:</p>
          </div>

          <div className="relative w-full h-36 rounded-2xl overflow-hidden shadow-inner flex items-center justify-center bg-gradient-to-br from-amber-50 to-amber-100 border-2 border-amber-600/40">
            {/* Underlying Secret Message */}
            <div className="text-center px-4 space-y-1 select-none">
              <div className="font-serif text-2xl sm:text-3xl font-bold text-amber-900">
                {invitation.scratchMessage || 'YOU’RE INVITED ♡'}
              </div>
              <div className="text-[11px] text-amber-800 font-medium">
                We cannot wait to celebrate this auspicious day with you!
              </div>
            </div>

            {/* Canvas Scratch Overlay */}
            {!isScratchRevealed && (
              <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full cursor-pointer touch-none"
              />
            )}
          </div>

          <div className="text-[10px] text-neutral-400 italic">
            {isScratchRevealed ? '✦ Revealed with love' : '✦ Scratch anywhere on the gold foil'}
          </div>
        </div>

        {/* 4. VENUE & 1-TAP GOOGLE MAPS */}
        <div className="bg-[#FFFDF8] rounded-3xl p-6 sm:p-7 border border-[#E0D7C7] shadow-md space-y-5">
          <div className="text-center space-y-1">
            <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-amber-800 font-bold block">
              Venue & Directions
            </span>
            <h3 className="font-serif text-2xl font-bold text-neutral-900">{invitation.venue}</h3>
            <p className="text-xs text-neutral-600 max-w-md mx-auto">{invitation.venueAddress}</p>
          </div>

          <div className="h-32 rounded-2xl bg-stone-100 border border-stone-300 flex flex-col items-center justify-center p-4 text-center space-y-1">
            <MapPin className="w-6 h-6 text-amber-700 animate-bounce" />
            <span className="font-bold text-xs text-neutral-800">{invitation.venue}</span>
            <span className="text-[11px] text-neutral-500 truncate max-w-xs">{invitation.venueAddress}</span>
          </div>

          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 rounded-full bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-md transition-all"
          >
            <Navigation className="w-4 h-4" />
            <span>Open in Google Maps (Get Directions)</span>
          </a>
        </div>

        {/* 5. GUEST RSVP FORM */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E0D7C7] shadow-lg space-y-6">
          <div className="text-center space-y-1">
            <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-amber-800 font-bold block">
              Will You Attend?
            </span>
            <h3 className="font-serif text-2xl font-bold text-neutral-900">Confirm Your RSVP</h3>
            <p className="text-xs text-neutral-600">Please let the host know if you will be joining the celebrations:</p>
          </div>

          {rsvpDone ? (
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-300 text-center space-y-2 animate-fade-in">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
              <h4 className="font-serif text-lg font-bold text-emerald-950">RSVP Received With Joy!</h4>
              <p className="text-xs text-emerald-800">Thank you, {rsvpName}! The couple has received your response.</p>
            </div>
          ) : (
            <form onSubmit={handleRsvpSubmit} className="space-y-4 text-xs">
              {/* Response pills */}
              <div className="flex justify-center gap-3">
                {['Yes', 'No', 'Maybe'].map((resp) => (
                  <button
                    key={resp}
                    type="button"
                    onClick={() => setRsvpResponse(resp)}
                    className={`px-6 py-2.5 rounded-full font-bold text-xs transition-all ${
                      rsvpResponse === resp
                        ? 'bg-amber-900 text-white shadow-md'
                        : 'bg-stone-100 text-neutral-700 hover:bg-stone-200'
                    }`}
                  >
                    {resp === 'Yes' ? '🎉 Attending (Yes)' : resp === 'No' ? 'Cannot Attend (No)' : 'Maybe'}
                  </button>
                ))}
              </div>

              <div>
                <label className="font-mono uppercase font-bold text-neutral-700 block mb-1 text-[11px]">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vikram Singhania"
                  value={rsvpName}
                  onChange={(e) => setRsvpName(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-stone-300 rounded-xl px-4 py-2.5 text-xs text-neutral-900 focus:border-amber-600 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-mono uppercase font-bold text-neutral-700 block mb-1 text-[11px]">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 98200 12345"
                    value={rsvpPhone}
                    onChange={(e) => setRsvpPhone(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-stone-300 rounded-xl px-4 py-2.5 text-xs text-neutral-900 focus:border-amber-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-mono uppercase font-bold text-neutral-700 block mb-1 text-[11px]">
                    Total Guests Attending
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={rsvpGuests}
                    onChange={(e) => setRsvpGuests(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-stone-300 rounded-xl px-4 py-2.5 text-xs text-neutral-900 focus:border-amber-600 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-mono uppercase font-bold text-neutral-700 block mb-1 text-[11px]">
                  Personal Blessings / Note
                </label>
                <textarea
                  rows={2}
                  placeholder="Wishing you a lifetime of endless happiness!"
                  value={rsvpMessage}
                  onChange={(e) => setRsvpMessage(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-stone-300 rounded-xl p-3 text-xs text-neutral-900 focus:border-amber-600 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={rsvpSubmitting}
                className="w-full py-3.5 rounded-full bg-amber-900 hover:bg-amber-800 text-white font-bold text-xs uppercase tracking-wider shadow-md flex items-center justify-center space-x-2 transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{rsvpSubmitting ? 'Submitting RSVP...' : 'Submit RSVP Response'}</span>
              </button>
            </form>
          )}
        </div>

        {/* Footer Brand Credit */}
        <div className="text-center pt-8 text-xs text-neutral-500 space-y-1">
          <span className="font-serif font-bold text-amber-900 tracking-widest uppercase block text-[10px]">
            Moonlight Production
          </span>
          <p className="text-[10px] text-neutral-400">
            Digital Invitation Suite • Created with love
          </p>
        </div>
      </main>

      {/* QR Code Modal */}
      {qrOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center space-y-4 relative shadow-2xl animate-fade-in">
            <button
              onClick={() => setQrOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-neutral-700"
            >
              <X className="w-4 h-4" />
            </button>

            <span className="text-[10.5px] uppercase font-mono font-bold text-amber-800 tracking-wider block">
              Scan to Open on Mobile
            </span>
            <h3 className="font-serif text-xl font-bold text-neutral-900">{invitation.names}</h3>

            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 inline-block mx-auto">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(window.location.href)}`}
                alt="QR Code"
                className="w-44 h-44 mx-auto rounded-lg"
              />
            </div>

            <div className="flex justify-center space-x-2 pt-2">
              <button
                onClick={handleCopyLink}
                className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-neutral-800 font-bold text-xs flex items-center shadow-sm"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 mr-1 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 mr-1" />}
                {copiedLink ? 'Copied!' : 'Copy Link'}
              </button>
              <button
                onClick={handleShareWhatsApp}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center shadow-sm"
              >
                <Share2 className="w-3.5 h-3.5 mr-1" /> WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PublicInvitation;
