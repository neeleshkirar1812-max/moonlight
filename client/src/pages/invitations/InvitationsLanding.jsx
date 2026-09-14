import React, { useState, useEffect } from 'react';
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
  ChevronDown,
  Eye,
  Heart,
  CalendarPlus,
  Star,
  DoorClosed,
  Layers,
  Image as ImageIcon,
  Check,
  X,
  Send,
  Edit3,
  ShieldCheck,
} from 'lucide-react';

const occasionsList = [
  { id: 'wedding', label: 'Wedding Invitation' },
  { id: 'engagement', label: 'Engagement Invitation' },
  { id: 'wedding-reception', label: 'Wedding & Reception Invitation' },
  { id: 'reception', label: 'Reception only invitation' },
  { id: 'birthday', label: 'Birthday Invitation' },
  { id: 'opening-ceremony', label: 'Opening Ceremony Invitation' },
  { id: 'anniversary', label: 'Anniversary Invitation' },
  { id: 'housewarming', label: 'Housewarming Invitations' },
  { id: 'party', label: 'Party Invitations' },
  { id: 'baby-shower', label: 'Baby shower' },
  { id: 'custom', label: 'Custom invitation' },
];

const formDemoFields = [
  { label: 'Template', value: 'Emerald Noir', type: 'select' },
  { label: "Bride's Name", value: 'Aisha Khan', type: 'text' },
  { label: "Groom's Name", value: 'Rohan Mehra', type: 'text' },
  { label: 'Wedding Date', value: '14 Feb 2026', type: 'date' },
  { label: 'Venue', value: 'The Leela Palace, Udaipur', type: 'text' },
  { label: 'Welcome Message', value: 'With the blessings of our families…', type: 'textarea' },
  { label: 'Mehendi Event', value: '12 Feb · 6:00 PM', type: 'text' },
  { label: 'Sangeet Event', value: '13 Feb · 7:30 PM', type: 'text' },
  { label: 'Reception', value: '15 Feb · 8:00 PM', type: 'text' },
  { label: 'Background Music', value: 'Soft Sitar Melody', type: 'select' },
  { label: 'Hero Image', value: 'couple-portrait.jpg', type: 'file' },
  { label: 'Slideshow', value: '4 images uploaded', type: 'file' },
];

const featuresList = [
  {
    icon: Share2,
    title: 'Share to Unlimited Guests',
    desc: 'One link, infinite reach — no per-guest charges, ever.',
  },
  {
    icon: Edit3,
    title: 'Unlimited Edits Until the Event Date',
    desc: 'Refine every detail right up to your big day.',
  },
  {
    icon: Sparkles,
    title: 'Scratch to Reveal Date',
    desc: 'Interactive scratch card reveals the event date with a delightful surprise.',
  },
  {
    icon: Clock,
    title: 'Live Countdown',
    desc: 'Animated countdown timer to your special day.',
  },
  {
    icon: Heart,
    title: 'Guest Messaging & Inbox',
    desc: 'Receive messages, attendance confirmations & guest counts.',
  },
  {
    icon: Music,
    title: 'Background Music',
    desc: 'Romantic instrumentals with elegant mute toggle.',
  },
  {
    icon: MapPin,
    title: 'Venue with Maps',
    desc: 'Embedded Google Maps for seamless directions.',
  },
  {
    icon: DoorClosed,
    title: 'Premium Animations',
    desc: '3D door reveals, curtains, sparkles & more.',
  },
  {
    icon: ImageIcon,
    title: 'Custom Image Upload',
    desc: 'Upload slideshow photos & hero background images.',
  },
  {
    icon: Layers,
    title: 'Full Customization',
    desc: 'Toggle sections, dress codes, events & more.',
  },
];

const comparisonData = [
  { feature: 'Cost', paper: '₹5,000–₹50,000+', digital: '₹499 / ₹699 Single • ₹1,199 / ₹1,499 Full Pass' },
  { feature: 'Delivery Time', paper: '2–4 weeks', digital: 'Instant' },
  { feature: 'Interactive Features (3D Gates & Scratch Card)', paper: '❌ Not Possible', digital: '✅ Included' },
  { feature: 'Messaging & Guest Inbox', paper: '❌ Not Possible', digital: '✅ Included' },
  { feature: 'Editable After Sending', paper: '❌ Impossible', digital: '✅ Unlimited Instant Edits' },
  { feature: 'Background Music', paper: '❌ Impossible', digital: '✅ Included' },
  { feature: 'Google Maps Integration', paper: '❌ Static Paper Map', digital: '✅ 1-Tap GPS' },
  { feature: 'Eco-Friendly', paper: '❌ Paper Waste', digital: '✅ 100% Eco-Friendly' },
  { feature: 'Shareable via Link', paper: '❌ Physical Handover', digital: '✅ 1-Click WhatsApp' },
];

const faqs = [
  {
    q: 'How does the digital invitation work?',
    a: 'After purchase, you fill in your event details through a simple form. We generate a unique link for your personalized invitation webpage that you can share with guests via WhatsApp, email, or any messaging platform.',
  },
  {
    q: 'Can I edit my invitation after creating it?',
    a: 'Yes! You can edit your invitation details anytime for unlimited times until the event date & time from your dashboard. Changes are reflected instantly on the live invitation page.',
  },
  {
    q: 'How many invitations can I create?',
    a: 'Our base/main plan allows you to create your full personalized invitation webpage. Each invitation gets its own unique shareable link.',
  },
  {
    q: 'Is there a limit on how many guests can view my invitation?',
    a: 'No! Your invitation link can be viewed by unlimited guests with no additional charges.',
  },
  {
    q: 'What payment methods are accepted?',
    a: 'We accept UPI (GPay, PhonePe, Paytm), credit cards, debit cards, net banking, and wallets through our secure payment gateway.',
  },
];

const reviewsList = [
  {
    name: 'Priya & Arjun',
    location: 'The Oberoi Udaivilas, Udaipur',
    rating: 5,
    message: 'Absolutely stunning! Our guests loved the digital invitation. The 4K royal video gate opening was magical.',
  },
  {
    name: 'Sarah & Michael',
    location: 'Goa Marriott Resort',
    rating: 5,
    message: 'So easy to set up and the design quality is unmatched. Having Google Maps and RSVP tracking made our destination wedding effortless.',
  },
  {
    name: 'Aarav & Kiara',
    location: 'Taj Falaknuma, Hyderabad',
    rating: 5,
    message: 'The typography, romantic background music, and golden scratch card looked breathtaking on mobile phones. Best decision ever!',
  },
];

const InvitationsLanding = () => {
  const [activeFaq, setActiveFaq] = useState(null);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-neutral-900 selection:bg-amber-200 selection:text-amber-900 font-sans">
      <SEO
        title="Create Invitation Webpage Online for All Events | Moonlight"
        description="Create a stunning digital invitation webpage in minutes for weddings, engagements, birthdays, anniversaries, baby showers, housewarmings, parties and more. 13 premium animated templates with music, maps, countdown timers & more. Share instantly via WhatsApp or email."
      />

      {/* ========================================================================= */}
      {/* 1. HERO SECTION (1:1 ZAREQIA EXACT) */}
      {/* ========================================================================= */}
      <section className="relative max-w-5xl mx-auto pt-16 sm:pt-24 pb-14 px-4 sm:px-6 text-center overflow-hidden">
        {/* Soft Radial Gold Aura */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-400/15 blur-[140px] rounded-full pointer-events-none" />

        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-amber-100/90 border border-amber-300 text-amber-900 text-xs uppercase tracking-widest font-bold mb-6 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-amber-700" />
          <span>Premium Digital Invitations</span>
        </div>

        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-neutral-900 leading-[1.1]">
          Create All Events Invitation
          <br />
          <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 bg-clip-text text-transparent italic font-normal">
            Webpage Online
          </span>
          <br />
          <span className="text-3xl md:text-5xl lg:text-6xl font-medium text-neutral-500">
            in Minutes
          </span>
        </h1>

        <p className="font-sans text-base md:text-xl text-neutral-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          Fill a simple form, get a stunning animated invitation webpage — share it with your guests instantly.
        </p>

        {/* Hero CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
          <Link
            to="/invitations/templates"
            className="w-full sm:w-auto px-10 py-4 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-neutral-950 font-bold text-sm uppercase tracking-wider transition-all shadow-md hover:scale-105 active:scale-95 text-center flex items-center justify-center space-x-2"
          >
            <span>Create My Invitation</span>
            <ArrowRight size={16} />
          </Link>
          <Link
            to="/invite/demo?template=rose-gold-blush-royal"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white hover:bg-neutral-50 text-neutral-900 border border-neutral-300 hover:border-amber-600 font-semibold text-sm transition-all text-center flex items-center justify-center space-x-2 shadow-xs"
          >
            <span>View Live Demo</span>
          </Link>
        </div>

        <p className="text-xs text-neutral-500">
          Trusted by hundreds of hosts & couples • One-time payment • No subscriptions
        </p>
      </section>

      {/* ========================================================================= */}
      {/* 2. OCCASIONS BROWSER (1:1 ZAREQIA macOS GLASS WINDOW) */}
      {/* ========================================================================= */}
      <section className="py-10 md:py-14 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-[28px] border border-amber-900/15 shadow-[0_20px_60px_-20px_rgba(184,140,58,0.35)] backdrop-blur-2xl bg-gradient-to-br from-white/90 via-white/70 to-amber-100/30">
          {/* Top Window Header */}
          <div className="flex items-center gap-2 px-5 py-3.5 border-b border-amber-900/10 bg-white/40">
            <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <span className="w-3 h-3 rounded-full bg-[#28c840]" />
            <span className="ml-auto text-[10px] uppercase tracking-[0.25em] text-neutral-500 font-mono font-bold">
              zareqia · invitations
            </span>
          </div>

          {/* Window Body */}
          <div className="px-6 py-9 md:px-12 md:py-12 text-center">
            <h2 className="font-serif text-2xl md:text-3xl font-bold mb-3 text-neutral-900">
              Access to{' '}
              <span className="bg-gradient-to-r from-amber-600 to-amber-700 bg-clip-text text-transparent font-bold">
                13 Premium Invitation Templates
              </span>{' '}
              for Every Event in just One Time Payment
            </h2>
            <p className="text-neutral-600 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
              Choose a template, fill in your event details, and get a personalized invitation webpage you can share via WhatsApp, email, or any platform.
            </p>

            <p className="mt-8 mb-4 text-[11px] uppercase tracking-[0.28em] text-amber-800 font-bold">
              Invitations for every occasion
            </p>

            <div className="flex flex-wrap justify-center gap-2 md:gap-2.5">
              {occasionsList.map((occ) => (
                <Link
                  key={occ.id}
                  to={`/invitations/templates?type=${occ.id}`}
                  className="inline-block rounded-full border border-amber-200/80 bg-white/80 hover:bg-amber-100/90 px-4 py-2 text-xs font-semibold text-neutral-800 shadow-xs transition-all hover:scale-105"
                >
                  {occ.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. SIMPLE PROCESS / HOW IT WORKS (1:1 ZAREQIA ONLY DEMO SIMULATOR) */}
      {/* ========================================================================= */}
      <section className="py-16 md:py-24 max-w-6xl mx-auto px-4 sm:px-6" id="how-it-works">
        {/* Section Header */}
        <div className="text-center mb-14 space-y-2">
          <p className="font-serif italic text-2xl md:text-3xl text-amber-700 font-bold mb-2">
            Simple Process
          </p>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-neutral-900 mb-4">
            How It Works
          </h2>
          <div className="w-16 h-0.5 bg-amber-600 mx-auto my-3" />
          <p className="text-neutral-600 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            Fill in your details — we transform them into a stunning invitation webpage.
          </p>
        </div>

        {/* 2-Column Side-by-Side Flow */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 md:gap-6 items-stretch max-w-5xl mx-auto">
          {/* Left Column: FILL DETAILS */}
          <div className="flex flex-col">
            <div className="text-center mb-3">
              <span className="inline-block text-sm md:text-base tracking-[0.2em] uppercase text-amber-800 font-bold">
                FILL DETAILS
              </span>
            </div>

            <div className="relative h-[420px] md:h-[460px] rounded-2xl border border-amber-200 bg-gradient-to-b from-white to-amber-50/40 shadow-xl overflow-hidden flex flex-col">
              {/* macOS Header */}
              <div className="flex items-center gap-1.5 px-3 py-2 border-b border-amber-200/60 bg-white/80">
                <span className="w-2 h-2 rounded-full bg-[#ff5f57]" />
                <span className="w-2 h-2 rounded-full bg-[#febc2e]" />
                <span className="w-2 h-2 rounded-full bg-[#28c840]" />
                <span className="ml-3 text-[10px] text-neutral-500 font-medium">Create Invitation</span>
              </div>

              {/* Top & Bottom fade gradients */}
              <div className="pointer-events-none absolute top-8 left-0 right-0 h-10 bg-gradient-to-b from-white to-transparent z-10" />
              <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-white to-transparent z-10" />

              {/* Form input items list */}
              <div className="p-4 space-y-2.5 overflow-y-auto custom-scrollbar flex-1 relative z-0">
                {formDemoFields.map((field, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-amber-200/80 bg-white px-3 py-2 shadow-xs"
                  >
                    <div className="text-[9px] uppercase tracking-wider text-amber-900/60 font-mono font-semibold mb-0.5">
                      {field.label}
                    </div>
                    {field.type === 'textarea' ? (
                      <div className="text-xs text-neutral-800 leading-snug line-clamp-2 font-serif">
                        {field.value}
                      </div>
                    ) : (
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs sm:text-sm text-neutral-900 font-medium font-serif truncate">
                          {field.value}
                        </span>
                        {field.type === 'select' && (
                          <span className="text-amber-700 text-xs">▾</span>
                        )}
                        {field.type === 'file' && (
                          <span className="text-[10px] text-amber-700 font-mono">uploaded</span>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Center Pulsing Arrow Badge */}
          <div className="flex md:flex-col items-center justify-center py-2">
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-amber-100 border border-amber-300 shadow-md text-amber-800">
              <ArrowRight className="w-6 h-6 animate-pulse" />
            </div>
          </div>

          {/* Right Column: GET INVITATION */}
          <div className="flex flex-col">
            <div className="text-center mb-3">
              <span className="inline-block text-sm md:text-base tracking-[0.2em] uppercase text-amber-800 font-bold">
                GET INVITATION
              </span>
            </div>

            <Link
              to="/invite/demo?template=rose-gold-blush-royal"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View Royal Imperial demo invitation"
              className="group relative h-[420px] md:h-[460px] rounded-2xl overflow-hidden shadow-2xl border-2 border-amber-400/80 cursor-pointer block transition-all duration-500 hover:scale-[1.02] bg-neutral-950"
            >
              <video
                src="/videos/rose-gold-blush.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

              {/* Bottom Live Experience overlay */}
              <div className="absolute inset-x-4 bottom-5 flex flex-col items-center text-center space-y-2">
                <span className="px-3 py-1 rounded-full bg-amber-400 text-neutral-950 font-bold text-[11px] uppercase tracking-wider shadow-md">
                  👑 Click To Open Live Experience
                </span>
                <span className="text-[11px] text-amber-200/90 font-serif drop-shadow">
                  4K Video Gate • Scratch Card • Music • RSVP
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. PREMIUM FEATURES (1:1 ZAREQIA GRID IN MASTER CONTAINER) */}
      {/* ========================================================================= */}
      <section className="py-20 md:py-28 bg-[#F4EFE6] relative overflow-hidden border-t border-amber-900/10" id="features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 space-y-3">
            <p className="font-serif italic text-lg text-amber-800 block">Everything You Need</p>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-neutral-900">
              Premium Features
            </h2>
            <div className="w-12 h-0.5 bg-amber-700 mx-auto" />
            <p className="text-neutral-600 text-sm max-w-lg mx-auto">
              Every invitation comes packed with interactive features that make your event announcement unforgettable.
            </p>
            <p className="text-xs text-neutral-500 italic max-w-md mx-auto pt-2">
              Your invitation stays publicly shareable until 30 days after the event, then turns private automatically — designed to protect your special day.
            </p>
          </div>

          <div className="relative max-w-3xl mx-auto">
            <div className="relative rounded-2xl bg-white border border-amber-300/60 shadow-xl overflow-hidden">
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-0">
                {featuresList.map((feat, idx) => (
                  <li
                    key={idx}
                    className="group flex items-center gap-4 sm:gap-5 px-5 sm:px-6 py-5 sm:py-6 transition-colors duration-300 hover:bg-amber-50/50 cursor-default border-b border-amber-100 sm:[&:nth-child(odd)]:border-r"
                  >
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-amber-100 border border-amber-300/60 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <feat.icon className="w-5 h-5 text-amber-800" />
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                      <h3 className="font-serif text-sm sm:text-base font-bold text-neutral-900 mb-0.5 leading-tight">
                        {feat.title}
                      </h3>
                      <p className="text-xs text-neutral-600 leading-relaxed">
                        {feat.desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. PAPER VS DIGITAL COMPARISON TABLE (1:1 ZAREQIA) */}
      {/* ========================================================================= */}
      <section className="py-20 md:py-28 max-w-3xl mx-auto px-4 sm:px-6 border-t border-amber-900/10" id="comparison">
        <div className="text-center mb-14 space-y-3">
          <p className="font-serif italic text-lg text-amber-800 block">Why Go Digital?</p>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-neutral-900">
            Paper vs Digital Invitations
          </h2>
          <div className="w-12 h-0.5 bg-amber-700 mx-auto" />
        </div>

        <div className="rounded-3xl border border-amber-900/15 overflow-hidden shadow-xl bg-white">
          <div className="grid grid-cols-3 gap-0 bg-neutral-900 text-white font-serif font-bold text-xs sm:text-sm">
            <div className="p-4 sm:p-5">Feature</div>
            <div className="p-4 sm:p-5 text-center border-l border-neutral-800 text-neutral-400">Paper Invitation</div>
            <div className="p-4 sm:p-5 text-center border-l border-neutral-800 text-amber-400 bg-amber-950/40">Digital Suite</div>
          </div>

          {comparisonData.map((row, idx) => (
            <div
              key={idx}
              className={`grid grid-cols-3 gap-0 text-xs sm:text-sm border-b border-neutral-100 last:border-0 ${
                idx % 2 === 1 ? 'bg-amber-50/20' : 'bg-white'
              }`}
            >
              <div className="p-3.5 sm:p-4 font-medium text-neutral-900">{row.feature}</div>
              <div className="p-3.5 sm:p-4 text-center text-neutral-500 border-l border-neutral-100 font-mono text-xs">
                {row.paper}
              </div>
              <div className="p-3.5 sm:p-4 text-center font-bold text-amber-900 border-l border-neutral-100 bg-amber-50/40">
                {row.digital}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. TRUSTED BANNER & REVIEWS (1:1 ZAREQIA) */}
      {/* ========================================================================= */}
      <section className="py-20 md:py-28 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-amber-900/10" id="reviews">
        {/* Giant Gold Banner */}
        <div className="text-center mb-16 space-y-3">
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-3">
            <span className="bg-gradient-to-r from-amber-700 via-amber-500 to-amber-700 bg-clip-text text-transparent">
              Trusted by 20,000+ Users
            </span>
          </h2>
          <p className="font-serif italic text-lg text-amber-800">Loved by Couples & Customers</p>
          <div className="w-12 h-0.5 bg-amber-700 mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviewsList.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-amber-900/10 p-7 space-y-4 flex flex-col justify-between shadow-sm hover:shadow-md transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center space-x-1 text-amber-500">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed italic">
                  "{item.message}"
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-100">
                <h4 className="font-serif text-sm font-bold text-neutral-900">{item.name}</h4>
                <span className="text-[11px] text-neutral-500 block">{item.location}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. PRICING SECTION (1:1 ZAREQIA) */}
      {/* ========================================================================= */}
      <section className="py-20 md:py-28 max-w-5xl mx-auto px-4 sm:px-6 border-t border-amber-900/10" id="pricing">
        <div className="text-center mb-16 space-y-3">
          <p className="font-serif italic text-lg text-amber-800 block">Transparent Pricing</p>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-neutral-900">
            Choose Your Invitation Experience
          </h2>
          <div className="w-12 h-0.5 bg-amber-700 mx-auto" />
          <p className="text-neutral-600 text-sm max-w-xl mx-auto">
            Elegant classic invitations or immersive cinematic luxury experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-5xl mx-auto items-stretch">
          {/* Classic 3D Collection Pass Card */}
          <div className="bg-[#1C1613] text-white rounded-[32px] border border-stone-700/80 p-8 sm:p-10 flex flex-col justify-between shadow-2xl hover:border-amber-500/50 transition-all duration-300 relative group">
            <div className="space-y-6">
              {/* Header */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-amber-400 font-bold">
                    3D DOOR REVEAL SUITES
                  </span>
                  <span className="px-3 py-0.5 rounded-full bg-stone-800 border border-stone-700 text-stone-300 text-[10.5px] font-mono">
                    13 Themes Included
                  </span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                  Classic 3D Collection Pass
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Full access to all 13 Classic 3D opening doors, floral arches & traditional Hindi Mandap suites.
                </p>
              </div>

              {/* Hero Pass Pricing Block */}
              <div className="p-5 rounded-2xl bg-black/40 border border-stone-800/90 space-y-2">
                <div className="flex items-baseline space-x-3">
                  <span className="font-serif text-4xl sm:text-5xl font-bold text-white">
                    ₹1,199
                  </span>
                  <span className="text-sm text-neutral-500 line-through font-mono">
                    ₹2,499
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400 text-[10px] font-mono font-bold">
                    SAVE 52%
                  </span>
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-stone-800/80 text-[11px]">
                  <span className="text-neutral-400">All-Access Lifetime Pass</span>
                  <span className="text-amber-300 font-mono font-semibold">Single Theme: ₹499</span>
                </div>
              </div>

              {/* Feature List */}
              <ul className="space-y-3 text-xs sm:text-[13px] text-neutral-300 pt-1">
                <li className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 mr-2.5 shrink-0 mt-0.5" />
                  <span><strong>13 Classic 3D Animations</strong> with double-door parting reveals</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 mr-2.5 shrink-0 mt-0.5" />
                  <span><strong>Interactive Scratch Card</strong> to reveal wedding date & secret surprise</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 mr-2.5 shrink-0 mt-0.5" />
                  <span><strong>Romantic Instrumental Audio</strong> with floating mute & play controls</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 mr-2.5 shrink-0 mt-0.5" />
                  <span><strong>Embedded Google Maps GPS</strong> for 1-click guest navigation</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 mr-2.5 shrink-0 mt-0.5" />
                  <span><strong>Live Guest RSVP Management</strong> & personal wishes inbox</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 mr-2.5 shrink-0 mt-0.5" />
                  <span><strong>Unlimited WhatsApp Broadcasts</strong> & lifetime unlimited edits</span>
                </li>
              </ul>
            </div>

            {/* Action Button */}
            <div className="pt-8">
              <Link
                to="/templates?collection=classic"
                className="w-full py-4 rounded-2xl bg-white hover:bg-neutral-100 text-neutral-950 font-extrabold text-xs uppercase tracking-wider text-center block transition-all shadow-lg hover:shadow-xl active:scale-[0.99] cursor-pointer"
              >
                Get Classic Pass (₹1,199) →
              </Link>
              <div className="text-center pt-2">
                <Link
                  to="/templates?collection=classic"
                  className="text-[11px] text-neutral-400 hover:text-amber-300 underline font-mono"
                >
                  Or explore single classic designs from ₹499
                </Link>
              </div>
            </div>
          </div>

          {/* Royal 4K Video Gates VIP Pass Card */}
          <div className="bg-gradient-to-b from-[#251A10] via-[#1E140C] to-[#150E09] text-white rounded-[32px] border-2 border-amber-500/80 p-8 sm:p-10 flex flex-col justify-between shadow-2xl relative overflow-hidden group">
            {/* VIP Shimmer Badge */}
            <div className="absolute top-5 right-5 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-neutral-950 text-[10px] font-mono font-extrabold px-3.5 py-1 rounded-full uppercase tracking-wider shadow-lg shadow-amber-900/40">
              MOST POPULAR VIP 👑
            </div>

            <div className="space-y-6">
              {/* Header */}
              <div className="space-y-1.5">
                <div className="flex items-center space-x-2">
                  <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-amber-300 font-bold">
                    4K CINEMATIC GATE SUITES
                  </span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-amber-100">
                  Royal 4K Collection VIP Pass
                </h3>
                <p className="text-xs text-amber-200/70 leading-relaxed">
                  Unlocks ALL 15 Royal 4K Video Gates, Shahi Farman scrolls, and Devnagari Vedic wedding suites.
                </p>
              </div>

              {/* Hero Pass Pricing Block */}
              <div className="p-5 rounded-2xl bg-black/60 border border-amber-500/40 space-y-2">
                <div className="flex items-baseline space-x-3">
                  <span className="font-serif text-4xl sm:text-5xl font-bold text-amber-300">
                    ₹1,499
                  </span>
                  <span className="text-sm text-amber-200/40 line-through font-mono">
                    ₹3,499
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/50 text-amber-300 text-[10px] font-mono font-bold">
                    SAVE 57%
                  </span>
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-amber-500/20 text-[11px]">
                  <span className="text-amber-200/80">All 15 Royal Suites Unlocked</span>
                  <span className="text-amber-300 font-mono font-semibold">Single Theme: ₹699</span>
                </div>
              </div>

              {/* Feature List */}
              <ul className="space-y-3 text-xs sm:text-[13px] text-amber-100/90 pt-1">
                <li className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 mr-2.5 shrink-0 mt-0.5" />
                  <span><strong>ALL 15 Royal 4K Video Gates</strong> & authentic Shahi Farman decrees</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 mr-2.5 shrink-0 mt-0.5" />
                  <span><strong>Full-Screen Cinematic Scroll-Lock</strong> until royal gates swing open</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 mr-2.5 shrink-0 mt-0.5" />
                  <span><strong>Live Countdown & Golden Timeline</strong> for Haldi, Sangeet & Pheras</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 mr-2.5 shrink-0 mt-0.5" />
                  <span><strong>Couple Photo Gallery</strong> with fine-art slideshow & story music</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 mr-2.5 shrink-0 mt-0.5" />
                  <span><strong>Real-Time Guest RSVP Management</strong> with 1-click Excel export</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 mr-2.5 shrink-0 mt-0.5" />
                  <span><strong>Priority VIP WhatsApp Concierge</strong> & instant design assistance</span>
                </li>
              </ul>
            </div>

            {/* Action Button */}
            <div className="pt-8">
              <Link
                to="/templates?collection=royal"
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:brightness-110 text-neutral-950 font-extrabold text-xs uppercase tracking-wider text-center block shadow-xl shadow-amber-950/50 active:scale-[0.99] transition-all cursor-pointer"
              >
                Get Royal VIP Pass (₹1,499) →
              </Link>
              <div className="text-center pt-2">
                <Link
                  to="/templates?collection=royal"
                  className="text-[11px] text-amber-300/70 hover:text-amber-200 underline font-mono"
                >
                  Or explore single royal designs from ₹699
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. FAQ SECTION (1:1 ZAREQIA) */}
      {/* ========================================================================= */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 border-t border-amber-900/10 max-w-4xl mx-auto" id="faq">
        <div className="text-center space-y-3 mb-14">
          <p className="font-serif italic text-lg text-amber-800 block">Got Questions?</p>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-neutral-900">
            Frequently Asked Questions
          </h2>
          <div className="w-12 h-0.5 bg-amber-700 mx-auto" />
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-amber-900/15 overflow-hidden shadow-xs transition-all"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                className="w-full p-5 sm:p-6 text-left flex justify-between items-center text-sm sm:text-base font-semibold text-neutral-900 hover:text-amber-800 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-amber-700 transition-transform duration-300 ${
                    activeFaq === i ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {activeFaq === i && (
                <div className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-neutral-600 leading-relaxed border-t border-neutral-100 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. BOTTOM CTA BANNER (1:1 ZAREQIA) */}
      {/* ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-t border-amber-900/10 text-center">
        <div className="bg-gradient-to-r from-amber-200/60 via-amber-100/80 to-amber-200/60 border border-amber-400/60 rounded-3xl p-10 sm:p-16 space-y-6 shadow-xl">
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-neutral-900">
            Ready to Create Your{' '}
            <span className="bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent italic font-normal">
              Perfect Invitation?
            </span>
          </h2>
          <p className="text-neutral-700 text-sm sm:text-base max-w-xl mx-auto">
            Choose your signature template, customize your celebration details in 2 minutes, and share directly with your loved ones on WhatsApp.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              to="/invitations/templates"
              className="px-9 py-4 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold text-sm uppercase tracking-wider transition-all shadow-lg hover:scale-105"
            >
              Create My Invitation →
            </Link>
            <Link
              to="/invitations/dashboard"
              className="px-9 py-4 rounded-full bg-white hover:bg-neutral-50 text-neutral-900 border border-neutral-300 font-semibold text-sm transition-all shadow-xs"
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
