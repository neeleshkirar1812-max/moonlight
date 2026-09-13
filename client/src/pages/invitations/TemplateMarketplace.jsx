import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/common/SEO';
import {
  Sparkles,
  CheckCircle2,
  Clock,
  MapPin,
  Music,
  Share2,
  ArrowRight,
  Eye,
  Heart,
  CalendarPlus,
  DoorClosed,
  Layers,
  Edit3,
  CreditCard,
  Send,
} from 'lucide-react';

const TemplateMarketplace = () => {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-neutral-900 font-sans selection:bg-amber-200 selection:text-amber-900">
      <SEO
        title="How It Works & Live Demo | Moonlight Digital Invitations"
        description="Fill in your event details and get a stunning animated digital invitation webpage in minutes."
      />

      {/* ========================================================================= */}
      {/* 1. HOW IT WORKS / SIMPLE PROCESS (THE ONLY DEMO SHOWCASE) */}
      {/* ========================================================================= */}
      <section className="py-12 sm:py-16 md:py-20 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-12 space-y-2">
          <span className="font-serif italic text-lg sm:text-xl text-[#C59B4E] block">
            Simple Process
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1E293B]">
            How It Works
          </h1>
          <div className="w-16 h-0.5 bg-[#C59B4E] mx-auto my-3" />
          <p className="text-[#64748B] text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Fill in your details — we transform them into a stunning invitation webpage.
          </p>
        </div>

        {/* 2-Column Side-by-Side Flow (Fill Details -> Arrow -> Get Invitation) */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] items-center gap-6 lg:gap-8 max-w-5xl mx-auto mb-16">
          {/* Left Column: FILL DETAILS */}
          <div className="space-y-3">
            <span className="text-[12px] font-mono tracking-[0.25em] text-[#C59B4E] font-bold block text-center uppercase">
              FILL DETAILS
            </span>

            <div className="bg-[#FAF8F5] rounded-2xl border border-[#E8DFD1] p-5 shadow-lg space-y-3">
              {/* Window Controls */}
              <div className="flex items-center space-x-2 pb-2 border-b border-[#E8DFD1]/50">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                <span className="text-[10px] text-neutral-400 font-sans ml-2">Create Invitation</span>
              </div>

              {/* Form inputs matching Screenshot */}
              <div className="space-y-2.5">
                <div className="bg-white rounded-xl border border-[#EDE6DB] p-2.5">
                  <span className="text-[9px] uppercase tracking-wider text-[#A69B8D] font-mono font-semibold block">
                    GROOM'S NAME
                  </span>
                  <span className="text-sm font-serif text-neutral-800 font-medium">
                    Rohan Mehra
                  </span>
                </div>

                <div className="bg-white rounded-xl border border-[#EDE6DB] p-2.5">
                  <span className="text-[9px] uppercase tracking-wider text-[#A69B8D] font-mono font-semibold block">
                    WEDDING DATE
                  </span>
                  <span className="text-sm font-serif text-neutral-800 font-medium">
                    14 Feb 2026
                  </span>
                </div>

                <div className="bg-white rounded-xl border border-[#EDE6DB] p-2.5">
                  <span className="text-[9px] uppercase tracking-wider text-[#A69B8D] font-mono font-semibold block">
                    VENUE
                  </span>
                  <span className="text-sm font-serif text-neutral-800 font-medium">
                    The Leela Palace, Udaipur
                  </span>
                </div>

                <div className="bg-white rounded-xl border border-[#EDE6DB] p-2.5">
                  <span className="text-[9px] uppercase tracking-wider text-[#A69B8D] font-mono font-semibold block">
                    WELCOME MESSAGE
                  </span>
                  <span className="text-sm font-serif text-neutral-800 font-medium truncate block">
                    With the blessings of our families...
                  </span>
                </div>

                <div className="bg-white rounded-xl border border-[#EDE6DB] p-2.5">
                  <span className="text-[9px] uppercase tracking-wider text-[#A69B8D] font-mono font-semibold block">
                    MEHENDI EVENT
                  </span>
                  <span className="text-sm font-serif text-neutral-800 font-medium">
                    12 Feb · 6:00 PM
                  </span>
                </div>

                <div className="bg-white rounded-xl border border-[#EDE6DB] p-2.5">
                  <span className="text-[9px] uppercase tracking-wider text-[#A69B8D] font-mono font-semibold block">
                    SANGEET EVENT
                  </span>
                  <span className="text-sm font-serif text-neutral-800 font-medium">
                    13 Feb · 7:30 PM
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Center Arrow */}
          <div className="flex justify-center my-2 lg:my-0">
            <div className="w-12 h-12 rounded-full bg-[#FAF5EE] border border-[#D9C4A2] flex items-center justify-center text-[#B3874B] shadow-md">
              <ArrowRight className="w-5 h-5 text-[#B3874B]" />
            </div>
          </div>

          {/* Right Column: GET INVITATION */}
          <div className="space-y-3">
            <span className="text-[12px] font-mono tracking-[0.25em] text-[#C59B4E] font-bold block text-center uppercase">
              GET INVITATION
            </span>

            <div className="relative rounded-2xl overflow-hidden border-2 border-[#D4AF37] shadow-2xl bg-neutral-950 group aspect-[4/5] sm:aspect-[4/4.5] lg:aspect-[4/5] max-h-[460px] flex items-center justify-center">
              <video
                src="/videos/rose-gold-blush.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

              {/* Hover / Link overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-end p-6 text-center">
                <Link
                  to="/invite/demo?template=rose-gold-blush-royal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-neutral-950 font-bold text-xs uppercase tracking-wider shadow-lg flex items-center space-x-2 transition-all hover:scale-105"
                >
                  <Eye className="w-4 h-4" />
                  <span>Open Live Experience ↗</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <Link
            to="/invitations/templates/rose-gold-blush-royal"
            className="w-full sm:w-auto flex-1 py-4 px-8 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-neutral-950 font-bold text-sm uppercase tracking-wider text-center transition-all shadow-md hover:scale-105"
          >
            Create My Invitation →
          </Link>
          <Link
            to="/invite/demo?template=rose-gold-blush-royal"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto py-4 px-8 rounded-full bg-white hover:bg-neutral-50 text-neutral-900 border border-neutral-300 hover:border-amber-600 font-semibold text-sm text-center transition-all shadow-xs"
          >
            Full Screen Demo ↗
          </Link>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. HOW TO USE IT (KAISE USE HOGA - STEP BY STEP GUIDE) */}
      {/* ========================================================================= */}
      <section className="py-16 md:py-24 bg-[#F4EFE6] border-t border-amber-900/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16 space-y-3">
            <span className="font-serif italic text-lg text-amber-800 block">
              Step-by-Step Guide
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-neutral-900">
              Kaise Use Karein — How It Works in 4 Steps
            </h2>
            <div className="w-12 h-0.5 bg-amber-700 mx-auto" />
            <p className="text-neutral-600 text-sm max-w-xl mx-auto">
              Apna digital invitation banana behad aasan hai. Sirf 2 minute me aapka personalized invitation link tayyar ho jayega.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                icon: Edit3,
                title: '1. Enter Details',
                hindiTitle: 'Event Details Dalein',
                desc: 'Dulha-Dulhan ka naam, wedding date, Mehendi/Sangeet timing aur Google Maps venue address enter karein.',
              },
              {
                step: '02',
                icon: DoorClosed,
                title: '2. Instant 4K Preview',
                hindiTitle: 'Live Preview Dekhein',
                desc: 'Aapka 4K Royal Gate, background music, golden scratch card aur RSVP system turant generate ho jayega.',
              },
              {
                step: '03',
                icon: CreditCard,
                title: '3. One-Time Payment',
                hindiTitle: 'Ek Baar Payment',
                desc: 'UPI (GPay, PhonePe) ya Cards se ₹1,199 / ₹1,999 pay karein. Koi monthly subscription ya extra charges nahi.',
              },
              {
                step: '04',
                icon: Send,
                title: '4. WhatsApp Par Bhejein',
                hindiTitle: 'WhatsApp Par Share Karein',
                desc: 'Apna unique live link aur QR code paayein aur 1-click me sabhi rishtedaaro aur guests ko WhatsApp par send karein.',
              },
            ].map((st, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-amber-900/10 p-6 space-y-4 shadow-sm hover:shadow-md hover:border-amber-400 transition-all text-center relative flex flex-col justify-between"
              >
                <div>
                  <span className="font-serif text-3xl font-bold text-amber-600 block mb-2">
                    {st.step}
                  </span>
                  <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto mb-3">
                    <st.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-base font-bold text-neutral-900">
                    {st.title}
                  </h3>
                  <span className="text-[11px] text-amber-800 font-medium block mb-2">
                    ({st.hindiTitle})
                  </span>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    {st.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/invitations/templates/rose-gold-blush-royal"
              className="inline-flex items-center space-x-2 px-9 py-4 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-neutral-950 font-bold text-sm uppercase tracking-wider shadow-lg transition-all hover:scale-105"
            >
              <span>Start Creating Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TemplateMarketplace;
