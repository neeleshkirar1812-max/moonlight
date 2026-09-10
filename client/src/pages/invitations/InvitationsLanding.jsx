import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { invitationTemplates, invitationCategories } from '../../data/invitationTemplates';
import SEO from '../../components/common/SEO';
import InvitationRenderer from '../../components/invitations/engine/InvitationRenderer';
import {
  Sparkles,
  CheckCircle2,
  Clock,
  Gift,
  Image as ImageIcon,
  MapPin,
  Music,
  Edit3,
  Share2,
  ArrowRight,
  ChevronDown,
  ShieldCheck,
  Eye,
  Crown,
  Heart,
  Calendar,
  Check,
  Star,
  X,
  RotateCcw,
} from 'lucide-react';

/**
 * Individual Landing Showcase Card Component with Inline 3D Gate Demo Simulator
 */
const LandingCardItem = ({ template, isActiveDemo, onOpenDemo, onCloseDemo }) => {
  const [demoKey, setDemoKey] = useState(0);

  const demoInvitationData = {
    template_id: template.id,
    templateId: template.id,
    opening_screen_enabled: true,
    opening_style: template.features?.gateStyle || 'royal-curtain',
    opening_title: 'The Royal Celebration',
    opening_seal_text: template.tier === 'royal' ? 'ROYAL SEAL' : 'VIP',
    bride_name: template.id === 'modern-minimal' ? 'Ananya Sharma' : 'Aarav Singhania',
    groom_name: template.id === 'modern-minimal' ? 'Rohan Mehra' : 'Kiara Advani',
    names: template.id === 'modern-minimal' ? 'Ananya & Rohan' : 'Aarav & Kiara',
    title: `${template.name} Demo`,
    eventType: template.category,
    date: '2026-11-20',
    time: '19:00',
    venue: template.id === 'modern-minimal' ? 'The Leela Palace, Udaipur' : 'Jehan Numa Palace, Bhopal',
    venueAddress: template.id === 'modern-minimal' ? 'Lake Pichola, Udaipur, Rajasthan' : '152 Shamla Hills, Bhopal',
    story_text: 'Two hearts, one lifelong promise under royal starry skies.',
    scratch_reveal_text: 'YOU’RE INVITED ♡',
    scratch_enabled: true,
    rsvp_enabled: true,
    music_enabled: true,
    events: [
      {
        title: 'Mehendi & Sangeet Gala',
        date: '2026-11-19',
        time: '06:00 PM',
        venue: 'The Leela Palace Courtyard',
        address: 'Udaipur, Rajasthan',
      },
      {
        title: 'The Royal Wedding & Pheras',
        date: '2026-11-20',
        time: '07:30 PM',
        venue: 'Grand Lawn, The Leela Palace',
        address: 'Udaipur, Rajasthan',
      },
      {
        title: 'Royal Grand Reception',
        date: '2026-11-21',
        time: '08:00 PM',
        venue: 'The Royal Ballroom',
        address: 'Udaipur, Rajasthan',
      },
    ],
  };

  return (
    <div
      className={`bg-white border rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between group ${
        isActiveDemo
          ? 'border-amber-500 ring-2 ring-amber-400/50 shadow-xl'
          : 'border-[#E8DFD1] hover:border-amber-500 hover:shadow-lg shadow-xs'
      }`}
    >
      {/* Live In-Card Demo Viewport vs Normal Cover */}
      {isActiveDemo ? (
        <div className="relative h-80 sm:h-96 w-full bg-neutral-950 flex flex-col overflow-hidden border-b border-amber-500/30">
          {/* Top Demo Bar Controls inside the card */}
          <div className="absolute top-2.5 inset-x-2.5 z-60 flex items-center justify-between pointer-events-auto">
            <span className="px-2.5 py-1 rounded-full bg-black/85 backdrop-blur-xs text-amber-300 text-[9px] font-mono font-bold uppercase border border-amber-400/40 shadow-xs flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Live 3D Gate Demo</span>
            </span>

            <div className="flex items-center space-x-1.5">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setDemoKey((k) => k + 1);
                }}
                className="px-2.5 py-1 rounded-full bg-black/85 hover:bg-neutral-800 text-amber-200 text-[10px] font-sans border border-amber-400/40 flex items-center space-x-1 cursor-pointer transition-transform active:scale-95 shadow"
                title="Replay Gate Opening"
              >
                <RotateCcw className="w-3 h-3 text-amber-300" />
                <span>Replay</span>
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onCloseDemo();
                }}
                className="w-6 h-6 rounded-full bg-black/85 hover:bg-rose-900/90 text-white text-[11px] font-bold border border-white/30 flex items-center justify-center cursor-pointer transition-colors shadow"
                title="Close Demo"
                aria-label="Close Demo"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Invitation Renderer embedded inside this specific card */}
          <div className="w-full h-full overflow-y-auto custom-scrollbar relative">
            <InvitationRenderer
              key={demoKey}
              invitation={demoInvitationData}
              isPreview={true}
            />
          </div>
        </div>
      ) : (
        /* Normal Cover Image Box */
        <div className="relative h-60 overflow-hidden bg-neutral-100">
          <img
            src={template.coverImage}
            alt={template.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/95 text-neutral-900 text-[10px] font-mono font-bold uppercase border border-amber-300 shadow-xs">
            {template.badge}
          </span>

          {/* View Demo Button on card */}
          <button
            type="button"
            onClick={() => onOpenDemo(template.id)}
            className="absolute top-3 right-3 px-3 py-1.5 rounded-full bg-black/70 hover:bg-black/90 backdrop-blur-xs text-white text-[11px] font-medium border border-white/30 flex items-center space-x-1.5 transition-transform hover:scale-105 active:scale-95 cursor-pointer shadow-md"
          >
            <Eye className="w-3.5 h-3.5 text-amber-300" />
            <span>Open 3D Demo</span>
          </button>

          <div className="absolute bottom-3 left-4 right-4">
            <span className="text-[10px] uppercase font-mono tracking-wider text-amber-300 font-bold block drop-shadow">
              {template.category}
            </span>
            <h4 className="font-serif text-lg font-bold text-white drop-shadow">{template.name}</h4>
          </div>
        </div>
      )}

      {/* Body Info & CTA */}
      <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
        <p className="text-neutral-600 text-xs leading-relaxed line-clamp-2">
          {template.description}
        </p>

        <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
          <div>
            <span className="text-xs text-neutral-400 line-through mr-1 font-mono">
              ₹{template.originalPrice}
            </span>
            <span className="font-serif text-xl font-bold text-amber-900">
              ₹{template.price}
            </span>
            <span className="text-[10px] text-neutral-500 block font-mono">One-time payment</span>
          </div>

          <div className="flex items-center space-x-2">
            {isActiveDemo ? (
              <button
                type="button"
                onClick={onCloseDemo}
                className="px-3 py-2 rounded-full border border-neutral-300 hover:bg-neutral-100 text-neutral-700 text-xs font-semibold transition-all cursor-pointer"
              >
                Close
              </button>
            ) : (
              <button
                type="button"
                onClick={() => onOpenDemo(template.id)}
                className="px-3 py-2 rounded-full border border-neutral-300 hover:border-amber-600 text-neutral-800 text-xs font-semibold transition-all cursor-pointer"
              >
                Demo
              </button>
            )}
            <Link
              to={`/invitations/templates/${template.slug}`}
              className="px-4 py-2 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-neutral-950 font-bold text-xs transition-all shadow-xs"
            >
              Select
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const occasionsList = [
  {
    title: 'Wedding Invitation',
    desc: 'Elegant templates with luxury animations like 3D double door reveals, harmonic chime music, and falling rose petals.',
    icon: '👑',
    category: 'Wedding',
  },
  {
    title: 'Engagement Invitation',
    desc: 'Beautiful cinematic styles with photo carousels to announce your special ring ceremony with style.',
    icon: '💍',
    category: 'Engagement',
  },
  {
    title: 'Birthday Invitation',
    desc: 'Interactive countdown timers, dynamic scratch-to-reveal dates, and celebratory themes for all ages.',
    icon: '🎂',
    category: 'Birthday',
  },
  {
    title: 'Housewarming / Griha Pravesh',
    desc: 'Embedded 1-tap Google Maps directions and venue itinerary for seamless guest arrival to your new home.',
    icon: '🏡',
    category: 'Celebration',
  },
  {
    title: 'Baby Shower / Naming Ceremony',
    desc: 'Soft pastel palettes, warm blessings, and beautiful couple and baby photo slideshow integrations.',
    icon: '🍼',
    category: 'Celebration',
  },
  {
    title: 'Custom Event & Reception',
    desc: 'Full customization: Toggle sections, upload custom background music, and manage live RSVPs in real time.',
    icon: '✨',
    category: 'Anniversary',
  },
];

const faqs = [
  {
    q: 'How do I create a digital invitation?',
    a: 'Simply choose a template from our collection, log in to your account, complete the one-time payment via Razorpay, fill in your event details (names, date, venue, message), and click Publish. You will get your unique live invitation link immediately!',
  },
  {
    q: 'Can I edit the invitation after purchasing and publishing?',
    a: 'Yes, absolutely! You can log in to your dashboard anytime and update names, dates, venue addresses, or photos. The changes will reflect immediately on your live invitation link.',
  },
  {
    q: 'How does the 3D door opening animation work?',
    a: 'When your guests open your invitation link on mobile or desktop, they see the royal palace double doors with your custom wax seal. Tapping or scrolling opens the doors with realistic 3D perspective and harmonic chime music, smoothly unlocking the full invitation.',
  },
  {
    q: 'How does the interactive scratch card work?',
    a: 'Guests see a sparkling gold scratch card saying "SCRATCH HERE ✦". As they scratch or tap on it, it smoothly reveals your custom message like "YOU’RE INVITED ♡"!',
  },
  {
    q: 'Will my guests need to download an app or log in to see the invite?',
    a: 'No! Your guests do not need any app or account. The invitation opens smoothly in any mobile or desktop browser with zero friction.',
  },
  {
    q: 'How do I track guest RSVPs?',
    a: 'When guests submit their RSVP on your public invitation page, their response, guest count, and optional message appear instantly inside your private Customer Dashboard.',
  },
];

const InvitationsLanding = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [activeFaq, setActiveFaq] = useState(null);
  const [activeDemoId, setActiveDemoId] = useState(null);

  const filteredTemplates =
    selectedCategory === 'All Categories'
      ? invitationTemplates
      : invitationTemplates.filter((t) => t.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-neutral-900 selection:bg-amber-200 selection:text-amber-900 font-sans">
      <SEO
        title="Moonlight Invitations | Premium Digital Event Invitations & RSVP Suite"
        description="Create animated digital wedding and event invitation webpages in minutes. Featuring 3D palace door reveals, touch scratch cards, Google Maps, background music, and live RSVP tracking."
      />

      {/* ========================================================================= */}
      {/* 1. HERO SECTION */}
      {/* ========================================================================= */}
      <section className="relative max-w-5xl mx-auto pt-16 sm:pt-24 pb-16 sm:pb-20 px-4 sm:px-6 text-center">
        {/* Soft Golden Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-300/20 blur-[130px] rounded-full pointer-events-none" />

        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-100/80 border border-amber-300 text-amber-900 text-xs uppercase tracking-widest font-bold mb-5 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-amber-700" />
          <span>Premium Digital Invitations</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 leading-[1.15] mb-6">
          Create All Events Invitation Webpage Online in <span className="italic font-normal text-amber-800">Minutes</span>
        </h1>

        <p className="text-neutral-600 text-sm sm:text-lg max-w-2xl mx-auto mb-8 leading-relaxed font-sans">
          Fill a simple form, get a stunning animated invitation webpage with 3D royal door entrance — share it with your guests instantly via WhatsApp or Email.
        </p>

        {/* Hero CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-10">
          <Link
            to="/invitations/templates"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-neutral-950 font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-md hover:scale-105 active:scale-95 text-center"
          >
            Create My Invitation
          </Link>
          <Link
            to="/i/royal-wedding-aarav-kiara"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white hover:bg-neutral-50 text-neutral-900 border border-neutral-300 hover:border-amber-600 font-semibold text-xs sm:text-sm transition-all text-center flex items-center justify-center space-x-2 shadow-xs"
          >
            <Eye className="w-4 h-4 text-amber-700" />
            <span>View Live Demo ↗</span>
          </Link>
        </div>

        {/* Trust Metrics */}
        <div className="text-xs sm:text-sm text-neutral-600 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 border-t border-amber-900/10 pt-8">
          <span className="flex items-center space-x-1.5 font-medium">
            <CheckCircle2 className="w-4 h-4 text-amber-700" />
            <span>Trusted by 5,000+ hosts & couples</span>
          </span>
          <span className="flex items-center space-x-1.5 font-medium">
            <CheckCircle2 className="w-4 h-4 text-amber-700" />
            <span>One-time payment</span>
          </span>
          <span className="flex items-center space-x-1.5 font-medium">
            <CheckCircle2 className="w-4 h-4 text-amber-700" />
            <span>No recurring subscriptions</span>
          </span>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. OCCASIONS GRID SECTION (#features) */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-t border-amber-900/10" id="features">
        <div className="text-center mb-12 sm:mb-16 space-y-3">
          <span className="text-amber-800 text-xs font-mono uppercase tracking-widest font-bold block">
            ✦ Every Celebration Covered
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-neutral-900">
            Invitations for Every Occasion
          </h2>
          <div className="w-12 h-0.5 bg-amber-700 mx-auto" />
          <p className="text-neutral-600 text-xs sm:text-base max-w-2xl mx-auto">
            Access premium animated luxury invitation templates for every event in one simple, affordable payment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {occasionsList.map((occ, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#E8DFD1] p-6 sm:p-8 rounded-2xl hover:-translate-y-1 hover:border-amber-500 hover:shadow-md transition-all duration-300 space-y-3 group shadow-xs"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform">
                {occ.icon}
              </div>
              <h3 className="font-serif text-lg font-bold text-neutral-900 group-hover:text-amber-900 transition-colors">
                {occ.title}
              </h3>
              <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed">
                {occ.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. TEMPLATE SHOWCASE CATALOG */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-t border-amber-900/10" id="templates">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4">
          <div className="space-y-2">
            <span className="text-amber-800 text-xs font-mono uppercase tracking-widest font-bold block">
              ✦ Handcrafted Signature Designs
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-neutral-900">
              Choose Your Luxury Template
            </h2>
          </div>
          <Link
            to="/invitations/templates"
            className="text-xs sm:text-sm text-amber-800 hover:text-amber-950 font-bold flex items-center space-x-1"
          >
            <span>View all designs</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {invitationCategories.map((cat) => {
            const count =
              cat === 'All Categories'
                ? invitationTemplates.length
                : invitationTemplates.filter((t) => t.category === cat).length;

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center space-x-1.5 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-amber-500 text-neutral-950 font-bold shadow-xs'
                    : 'bg-white border border-[#E0D6C6] text-neutral-700 hover:border-amber-500 hover:text-neutral-900'
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    selectedCategory === cat ? 'bg-black/20 text-neutral-950' : 'bg-neutral-100 text-neutral-600'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Templates Display: Category-Wise when "All Categories" is selected */}
        {selectedCategory === 'All Categories' ? (
          <div className="space-y-14">
            {invitationCategories
              .filter((c) => c !== 'All Categories')
              .map((categoryName) => {
                const categoryTemplates = invitationTemplates.filter((t) => t.category === categoryName);
                if (categoryTemplates.length === 0) return null;

                const getCatIcon = (cat) => {
                  if (cat.includes('Wedding')) return '👑';
                  if (cat.includes('Engagement')) return '💍';
                  if (cat.includes('Birthday')) return '🎂';
                  if (cat.includes('Housewarming') || cat.includes('Griha')) return '🏡';
                  if (cat.includes('Baby Shower') || cat.includes('Naming')) return '🍼';
                  if (cat.includes('Anniversary')) return '✨';
                  return '✦';
                };

                return (
                  <div key={categoryName} className="space-y-6">
                    {/* Category Header */}
                    <div className="flex items-center justify-between border-b border-amber-900/10 pb-3">
                      <div className="flex items-center space-x-2.5">
                        <span className="text-xl">{getCatIcon(categoryName)}</span>
                        <h3 className="font-serif text-xl sm:text-2xl font-bold text-neutral-900">
                          {categoryName}
                        </h3>
                        <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-xs font-mono font-bold">
                          {categoryTemplates.length} Designs
                        </span>
                      </div>
                      <button
                        onClick={() => setSelectedCategory(categoryName)}
                        className="text-xs text-amber-800 hover:text-amber-950 font-bold flex items-center space-x-1 cursor-pointer"
                      >
                        <span>View only {categoryName}</span>
                        <span>→</span>
                      </button>
                    </div>

                    {/* Category Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {categoryTemplates.map((template) => (
                        <LandingCardItem
                          key={template.id}
                          template={template}
                          isActiveDemo={activeDemoId === template.id}
                          onOpenDemo={(id) => setActiveDemoId(id)}
                          onCloseDemo={() => setActiveDemoId(null)}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
          </div>
        ) : (
          /* Single Category Filtered Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => (
              <LandingCardItem
                key={template.id}
                template={template}
                isActiveDemo={activeDemoId === template.id}
                onOpenDemo={(id) => setActiveDemoId(id)}
                onCloseDemo={() => setActiveDemoId(null)}
              />
            ))}
          </div>
        )}
      </section>

      {/* ========================================================================= */}
      {/* 4. PRICING SECTION (#pricing) */}
      {/* ========================================================================= */}
      <section className="max-w-5xl mx-auto py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-t border-amber-900/10" id="pricing">
        <div className="text-center mb-12 sm:mb-16 space-y-3">
          <span className="text-amber-800 text-xs font-mono uppercase tracking-widest font-bold block">
            ✦ Simple & Transparent
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-neutral-900">
            Choose Your Experience
          </h2>
          <div className="w-12 h-0.5 bg-amber-700 mx-auto" />
          <p className="text-neutral-600 text-xs sm:text-base max-w-xl mx-auto">
            Pay once per event with zero subscription or hidden fees. Full lifetime access to your live invitation link.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Classic Plan */}
          <div className="bg-white rounded-3xl border border-[#DFD4C2] p-6 sm:p-8 space-y-6 flex flex-col justify-between shadow-xs hover:shadow-md hover:border-amber-400 transition-all">
            <div className="space-y-4">
              <span className="text-xs uppercase font-mono font-bold text-neutral-500 tracking-wider">
                Moonlight Classic
              </span>
              <div className="flex items-baseline space-x-2">
                <span className="font-serif text-4xl font-bold text-neutral-900">₹399</span>
                <span className="text-xs text-neutral-500 font-mono">/ one-time</span>
              </div>
              <ul className="space-y-3 text-xs text-neutral-600 pt-4 border-t border-neutral-100">
                <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-amber-700 mr-2.5 shrink-0" /> Premium Birthday / Event Template</li>
                <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-amber-700 mr-2.5 shrink-0" /> Instant Customer Dashboard & Editor</li>
                <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-amber-700 mr-2.5 shrink-0" /> Unique Live Invitation URL</li>
                <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-amber-700 mr-2.5 shrink-0" /> Live Guest RSVP Counter & List</li>
                <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-amber-700 mr-2.5 shrink-0" /> 1-Tap Google Maps Venue Directions</li>
              </ul>
            </div>
            <Link
              to="/invitations/templates/little-sunshine"
              className="w-full py-3.5 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-900 font-bold text-xs uppercase tracking-wider text-center block transition-all"
            >
              Choose Classic
            </Link>
          </div>

          {/* Royal Plan */}
          <div className="bg-gradient-to-b from-[#241B12] to-[#3B2816] text-white rounded-3xl border-2 border-amber-600/60 p-6 sm:p-8 space-y-6 shadow-xl flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-amber-400 text-neutral-950 text-[10px] font-mono font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
              Most Popular
            </div>
            <div className="space-y-4">
              <span className="text-xs uppercase font-mono font-bold text-amber-400 tracking-wider">
                Moonlight Royal Suite
              </span>
              <div className="flex items-baseline space-x-2">
                <span className="font-serif text-4xl font-bold text-amber-300">₹699</span>
                <span className="text-xs text-amber-200/70 font-mono">/ one-time</span>
              </div>
              <ul className="space-y-3 text-xs text-amber-100/90 pt-4 border-t border-amber-900/50">
                <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-amber-400 mr-2.5 shrink-0" /> Royal 3D Palace Double Door Entrance Reveal</li>
                <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-amber-400 mr-2.5 shrink-0" /> Interactive Touch Scratch Card ("YOU’RE INVITED ♡")</li>
                <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-amber-400 mr-2.5 shrink-0" /> Real-time Guest RSVP Management & Export</li>
                <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-amber-400 mr-2.5 shrink-0" /> Couple Memories Photo Gallery & Slideshow</li>
                <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-amber-400 mr-2.5 shrink-0" /> Romantic Background Music Soundtrack</li>
                <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-amber-400 mr-2.5 shrink-0" /> Live Event Countdown Timer</li>
                <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-amber-400 mr-2.5 shrink-0" /> 1-Tap Google Maps Turn-by-Turn Navigation</li>
              </ul>
            </div>
            <Link
              to="/invitations/templates/royal-love"
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-neutral-950 font-bold text-xs uppercase tracking-wider text-center block shadow-md transition-all"
            >
              Choose Royal Suite
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. TRUSTED BY HOSTS & COUPLE REVIEWS */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-amber-900/10">
        <div className="text-center space-y-3 mb-12">
          <span className="text-amber-800 text-xs font-mono uppercase tracking-widest font-bold block">
            ✦ Client Stories
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-neutral-900">
            Loved by 5,000+ Couples & Hosts Across India
          </h2>
          <div className="w-12 h-0.5 bg-amber-700 mx-auto" />
          <p className="text-neutral-600 text-xs sm:text-sm max-w-xl mx-auto">
            See how modern hosts are transforming their event invitations with Moonlight Digital Suites.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              couple: 'Vikram & Radhika Singhania',
              venue: 'The Oberoi Udaivilas, Udaipur',
              rating: 5,
              review:
                'Our wedding guests were blown away by the royal palace 3D door opening animation! Tracking RSVPs directly from the dashboard made seating planning effortless.',
              template: 'Royal Love Suite',
            },
            {
              couple: 'Aarav & Kiara Sharma',
              venue: 'Jehan Numa Palace, Bhopal',
              rating: 5,
              review:
                'The 1-tap Google Maps integration saved our out-of-town guests so much confusion. The romantic background score and regal typography looked breathtaking on mobile.',
              template: 'Emerald Heritage Suite',
            },
            {
              couple: 'Kabir & Rhea Kapoor',
              venue: 'Taj Falaknuma, Hyderabad',
              rating: 5,
              review:
                'Zero apps needed for guests, instant 1-click WhatsApp sharing, and 10x cheaper than physical boxed cards. Best decision we made for our celebration!',
              template: 'Blooming Dreams Suite',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-[#E8DFD1] p-6 sm:p-8 space-y-4 flex flex-col justify-between hover:shadow-md hover:border-amber-400 transition-all shadow-xs"
            >
              <div className="space-y-3">
                <div className="flex items-center space-x-1 text-amber-500">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed italic">
                  "{item.review}"
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-sm font-bold text-neutral-900">{item.couple}</h4>
                  <span className="text-[11px] text-neutral-500 block">{item.venue}</span>
                </div>
                <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-200">
                  {item.template}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. FAQ SECTION */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-t border-amber-900/10 max-w-4xl mx-auto">
        <div className="text-center space-y-3 mb-12">
          <span className="text-amber-800 text-xs font-mono uppercase tracking-widest font-bold block">
            ✦ Got Questions?
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-neutral-900">
            Frequently Asked Questions
          </h2>
          <div className="w-12 h-0.5 bg-amber-700 mx-auto" />
          <p className="text-neutral-600 text-xs sm:text-sm">
            Everything you need to know about creating, editing, and sharing your digital invitation.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-[#E0D6C6] overflow-hidden shadow-xs transition-all"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                className="w-full p-4 sm:p-5 text-left flex justify-between items-center text-sm sm:text-base font-semibold text-neutral-900 hover:text-amber-800 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-amber-700 transition-transform duration-300 ${
                    activeFaq === i ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {activeFaq === i && (
                <div className="px-4 sm:px-5 pb-5 text-xs text-neutral-600 leading-relaxed border-t border-neutral-100 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. BOTTOM CTA BANNER */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-t border-amber-900/10 text-center">
        <div className="bg-gradient-to-r from-amber-100/80 via-amber-50 to-amber-100/80 border border-amber-300/80 rounded-3xl p-8 sm:p-14 space-y-6 shadow-sm">
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-neutral-900">
            Ready to Impress Your Guests?
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base max-w-xl mx-auto">
            Choose your signature template, customize your celebration details in 2 minutes, and share directly with your loved ones.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/invitations/templates"
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-neutral-950 font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-md hover:scale-105"
            >
              Explore Templates
            </Link>
            <Link
              to="/invitations/dashboard"
              className="px-8 py-3.5 rounded-full bg-white hover:bg-neutral-50 text-neutral-900 border border-neutral-300 font-semibold text-xs sm:text-sm transition-all shadow-xs"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InvitationsLanding;
