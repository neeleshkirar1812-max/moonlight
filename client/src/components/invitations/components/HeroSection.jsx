import React, { useState, useEffect } from 'react';
import { Sparkles, Calendar, Clock, MapPin, ChevronDown } from 'lucide-react';

const HeroSection = ({ invitation, theme }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDateStr = invitation.event_date || invitation.date || '2026-11-20';
    const targetTimeStr = invitation.event_time || invitation.time || '19:00';
    const target = new Date(`${targetDateStr}T${targetTimeStr}:00`).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference < 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(interval);
      } else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [invitation.event_date, invitation.event_time, invitation.date, invitation.time]);

  const coverImage =
    invitation.coverPhoto ||
    invitation.cover_photo ||
    'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80';

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-between items-center text-center p-6 sm:p-10 overflow-hidden">
      {/* Background with Dark Blur / Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={coverImage}
          alt={invitation.names || 'Couple'}
          className="w-full h-full object-cover brightness-[0.4] scale-105 transition-transform duration-1000"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      </div>

      {/* Top Studio Monogram Tag */}
      <div className="relative z-10 pt-4">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-[10px] uppercase font-mono tracking-[0.25em] text-amber-300 shadow">
          <Sparkles className="w-3 h-3 text-amber-400" />
          <span>{invitation.event_type || invitation.eventType || 'Royal Wedding'} Suite</span>
        </div>
      </div>

      {/* Main Couple Names & Hero Content */}
      <div className="relative z-10 my-auto max-w-xl mx-auto space-y-4 py-8">
        <span className="text-[11px] uppercase font-mono tracking-[0.3em] text-amber-200/90 font-bold block drop-shadow-sm">
          {invitation.opening_heading || 'Together with their families'}
        </span>

        <h1
          className={`font-serif text-4xl sm:text-6xl font-bold tracking-tight bg-gradient-to-r ${theme.goldGradient} bg-clip-text text-transparent leading-[1.15] drop-shadow-lg`}
        >
          {invitation.names || `${invitation.bride_name || 'Bride'} & ${invitation.groom_name || 'Groom'}`}
        </h1>

        <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto" />

        <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed max-w-md mx-auto font-sans italic drop-shadow">
          "{invitation.welcome_text || invitation.message || 'With joyous hearts, we invite you to celebrate the beginning of our new chapter together.'}"
        </p>

        {/* Date & Venue Strip */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-amber-100/90">
          <div className="flex items-center space-x-1.5 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            <span>
              {invitation.event_date || invitation.date
                ? new Date(invitation.event_date || invitation.date).toLocaleDateString('en-IN', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })
                : 'Sat, Nov 20, 2026'}
            </span>
          </div>

          <div className="flex items-center space-x-1.5 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span className="max-w-[180px] truncate">{invitation.venue_name || invitation.venue || 'Bhopal, MP'}</span>
          </div>
        </div>
      </div>

      {/* Live Event Countdown Clock */}
      <div className="relative z-10 w-full max-w-md mx-auto pb-4">
        <div className="bg-black/50 backdrop-blur-lg rounded-2xl p-4 border border-white/15 shadow-2xl">
          <span className="text-[9px] uppercase font-mono tracking-[0.25em] text-amber-300 font-bold block mb-2.5">
            ✦ Celebration Countdown ✦
          </span>
          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="p-2 rounded-xl bg-white/5 border border-white/10">
              <span className="font-serif text-xl sm:text-2xl font-bold text-amber-300 block">
                {String(timeLeft.days).padStart(2, '0')}
              </span>
              <span className="text-[9px] uppercase font-mono text-neutral-400">Days</span>
            </div>
            <div className="p-2 rounded-xl bg-white/5 border border-white/10">
              <span className="font-serif text-xl sm:text-2xl font-bold text-amber-300 block">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="text-[9px] uppercase font-mono text-neutral-400">Hours</span>
            </div>
            <div className="p-2 rounded-xl bg-white/5 border border-white/10">
              <span className="font-serif text-xl sm:text-2xl font-bold text-amber-300 block">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="text-[9px] uppercase font-mono text-neutral-400">Mins</span>
            </div>
            <div className="p-2 rounded-xl bg-white/5 border border-white/10">
              <span className="font-serif text-xl sm:text-2xl font-bold text-amber-300 block">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="text-[9px] uppercase font-mono text-neutral-400">Secs</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
