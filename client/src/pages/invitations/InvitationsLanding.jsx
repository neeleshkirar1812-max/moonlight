import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { invitationTemplates, invitationCategories } from '../../data/invitationTemplates';
import SEO from '../../components/common/SEO';
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
  Star,
  ChevronDown,
  ShieldCheck,
  Zap,
  Smartphone,
  Eye,
  ShoppingBag,
} from 'lucide-react';

const featuresList = [
  {
    icon: <Share2 className="w-5 h-5 text-amber-700" />,
    title: 'Shareable Live Link',
    desc: 'Instant personalized URL (e.g., yoursite.com/i/aarav-kiara) for WhatsApp & social sharing.',
  },
  {
    icon: <CheckCircle2 className="w-5 h-5 text-emerald-600" />,
    title: 'Guest RSVP Management',
    desc: 'Collect confirmed attendance (Yes / No / Maybe), guest counts, and personal wishes in real-time.',
  },
  {
    icon: <Clock className="w-5 h-5 text-amber-700" />,
    title: 'Live Event Countdown',
    desc: 'Dynamic countdown clock building anticipation and excitement for the celebration.',
  },
  {
    icon: <Gift className="w-5 h-5 text-purple-600" />,
    title: 'Interactive Scratch Card',
    desc: 'Guests scratch the gold card on their phone screen to reveal "YOU’RE INVITED ♡" or custom text.',
  },
  {
    icon: <ImageIcon className="w-5 h-5 text-rose-600" />,
    title: 'Couple Photo Gallery',
    desc: 'Showcase your pre-wedding story and favorite moments in a fluid, high-resolution carousel.',
  },
  {
    icon: <MapPin className="w-5 h-5 text-blue-600" />,
    title: '1-Tap Google Maps',
    desc: 'Guests tap the venue card to open instant turn-by-turn navigation in Google Maps.',
  },
  {
    icon: <Music className="w-5 h-5 text-amber-600" />,
    title: 'Background Music',
    desc: 'Include your favorite romantic song or celebratory tune that plays as guests open your invite.',
  },
  {
    icon: <Edit3 className="w-5 h-5 text-amber-800" />,
    title: 'Instant Customization',
    desc: 'Update venue, timings, or ceremony details anytime directly from your customer dashboard.',
  },
];

const comparisonData = [
  { feature: 'Distribution Speed', digital: 'Instant (1-Click WhatsApp)', paper: '2–3 Weeks Printing & Courier' },
  { feature: 'Cost per 500 Guests', digital: '₹499 – ₹699 Total', paper: '₹25,000 – ₹75,000+' },
  { feature: 'RSVP Tracking', digital: 'Live Dashboard & Real-Time Count', paper: 'Manual Phone Calls' },
  { feature: 'Interactive Elements', digital: 'Scratch Card, Music & Countdown', paper: 'Static Print' },
  { feature: 'Venue Navigation', digital: 'Direct Google Maps Directions', paper: 'Guests Get Lost' },
  { feature: 'Last-Minute Edits', digital: 'Instant Free Updates Anytime', paper: 'Impossible (Reprint Required)' },
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
    q: 'How does the interactive scratch card work?',
    a: 'When your guests open your invitation link on mobile or desktop, they see a sparkling gold scratch card saying "SCRATCH HERE ✦". As they scratch or tap on it, it smoothly reveals your custom message like "YOU’RE INVITED ♡"!',
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
  const [demoScratchRevealed, setDemoScratchRevealed] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  const filteredTemplates =
    selectedCategory === 'All Categories'
      ? invitationTemplates
      : invitationTemplates.filter((t) => t.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#F5F1E8] text-neutral-900 selection:bg-amber-700 selection:text-white font-sans">
      <SEO
        title="Digital Wedding & Event Invitations — WhatsApp Ready in Minutes"
        description="Create luxurious, interactive digital wedding and event invitations with live RSVP, Google Maps directions, background music, and interactive scratch cards. By Moonlight Production."
        keywords="digital wedding invitation, luxury e-invites, WhatsApp wedding card, interactive wedding invite, digital invitation marketplace India"
      />

      {/* 1. HERO SECTION */}
      <section className="relative pt-28 sm:pt-36 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-[#EFE8DB] via-[#FAF8F5] to-[#F5F1E8] border-b border-[#DDD2C0]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(212,175,55,0.18),transparent_25%),radial-gradient(circle_at_85%_15%,rgba(212,175,55,0.18),transparent_25%)] pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center space-y-5 sm:space-y-7 relative z-10">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/80 border border-amber-900/15 shadow-sm text-[11px] sm:text-xs font-mono font-bold tracking-[0.2em] text-amber-800 uppercase">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Moonlight Production • Digital Invitations</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 tracking-tight leading-[1.12]">
            Create Every Event Invitation
            <br />
            <span className="text-amber-800 italic">WhatsApp Ready in Minutes</span>
          </h1>

          <p className="text-neutral-600 text-xs sm:text-base max-w-2xl mx-auto leading-relaxed">
            Elegant, personalized digital invitations for royal weddings, engagements, anniversaries, and celebratory milestones with interactive scratch cards, music, and instant guest RSVP.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-2">
            <a
              href="#templates"
              className="px-7 py-3.5 rounded-full bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 hover:from-amber-800 hover:to-amber-800 text-white font-bold text-xs uppercase tracking-wider shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              Explore Templates
            </a>
            <Link
              to="/invitations/templates/royal-love"
              className="px-6 py-3.5 rounded-full bg-white hover:bg-stone-50 border border-neutral-300 text-neutral-900 font-bold text-xs uppercase tracking-wider shadow-sm transition-all"
            >
              View Live Demo
            </Link>
          </div>

          {/* Social Proof Stats */}
          <div className="pt-8 sm:pt-10 grid grid-cols-3 gap-4 max-w-lg mx-auto border-t border-amber-900/10 text-center">
            <div>
              <div className="font-serif text-2xl sm:text-3xl font-bold text-amber-900">5,000+</div>
              <div className="text-[10px] sm:text-xs text-neutral-500 uppercase font-mono tracking-wider">Happy Couples</div>
            </div>
            <div>
              <div className="font-serif text-2xl sm:text-3xl font-bold text-amber-900">100%</div>
              <div className="text-[10px] sm:text-xs text-neutral-500 uppercase font-mono tracking-wider">Mobile Ready</div>
            </div>
            <div>
              <div className="font-serif text-2xl sm:text-3xl font-bold text-amber-900">4.9 ★</div>
              <div className="text-[10px] sm:text-xs text-neutral-500 uppercase font-mono tracking-wider">Client Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TEMPLATE MARKETPLACE SECTION */}
      <section id="templates" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center space-y-3 mb-10 sm:mb-14">
          <span className="text-[11px] uppercase font-mono tracking-[0.25em] text-amber-800 font-bold block">
            Curated Luxury Catalog
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-neutral-900">
            Choose Your Invitation Design
          </h2>
          <div className="w-12 h-0.5 bg-amber-700 mx-auto" />
          <p className="text-neutral-600 text-xs sm:text-sm max-w-xl mx-auto">
            Select an invitation template, pay once securely, and personalize all names, venue, and photos from your dashboard.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 mb-8 gap-2 no-scrollbar">
          {invitationCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-amber-900 text-white shadow-sm font-bold'
                  : 'bg-white border border-stone-200 text-neutral-600 hover:text-neutral-950 hover:bg-stone-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className="group bg-white rounded-2xl border border-[#E0D6C6] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              {/* Card Art / Preview */}
              <div className="relative h-64 overflow-hidden bg-neutral-900">
                <img
                  src={template.coverImage}
                  alt={template.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full bg-amber-900/90 text-amber-200 text-[10px] font-mono font-bold tracking-wider uppercase border border-amber-500/30 shadow">
                    {template.badge}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-amber-300 font-bold block">
                    {template.category} Suite
                  </span>
                  <h3 className="font-serif text-xl font-bold">{template.name}</h3>
                </div>
              </div>

              {/* Info & CTA */}
              <div className="p-4 sm:p-5 space-y-3 flex-1 flex flex-col justify-between bg-[#FFFDF9]">
                <p className="text-neutral-600 text-xs line-clamp-2 leading-relaxed">
                  {template.description}
                </p>

                <div className="pt-2 border-t border-stone-200 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-neutral-400 line-through mr-1.5 font-mono">
                      ₹{template.originalPrice}
                    </span>
                    <span className="font-serif text-lg font-bold text-amber-900">
                      ₹{template.price}
                    </span>
                    <span className="text-[9.5px] text-neutral-500 block">One-time payment</span>
                  </div>

                  <div className="flex space-x-2">
                    <Link
                      to={`/invitations/templates/${template.slug}`}
                      className="px-3.5 py-2 rounded-xl bg-amber-900 hover:bg-amber-800 text-white font-bold text-xs flex items-center shadow-sm"
                    >
                      <span>Preview & Buy</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. HOW IT WORKS */}
      <section className="py-16 sm:py-20 bg-[#FAF8F2] border-y border-[#E0D7C7]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-2 mb-12">
            <span className="text-[11px] uppercase font-mono tracking-[0.25em] text-amber-800 font-bold block">
              Simple 5-Step Process
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-neutral-900">
              How Moonlight Invitations Work
            </h2>
            <div className="w-12 h-0.5 bg-amber-700 mx-auto" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { num: '01', title: 'Choose Template', desc: 'Browse our royal collection and pick your favorite aesthetic.' },
              { num: '02', title: 'Quick Signup', desc: 'Create your secure account in 10 seconds.' },
              { num: '03', title: 'Secure Payment', desc: 'Instant Razorpay checkout via UPI, Cards, or NetBanking.' },
              { num: '04', title: 'Add Event Info', desc: 'Enter couple names, ceremony dates, timings, venue, and photos.' },
              { num: '05', title: 'Publish & Share', desc: 'Receive your unique live URL ready for 1-click WhatsApp broadcast!' },
            ].map((step) => (
              <div
                key={step.num}
                className="bg-white rounded-2xl p-5 border border-stone-200 text-center space-y-2.5 shadow-sm"
              >
                <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-900 font-serif font-bold text-base flex items-center justify-center mx-auto border border-amber-300">
                  {step.num}
                </div>
                <h3 className="font-serif text-base font-bold text-neutral-900">{step.title}</h3>
                <p className="text-neutral-600 text-xs leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE FEATURES & LIVE SCRATCH CARD DEMO */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center space-y-3 mb-12">
          <span className="text-[11px] uppercase font-mono tracking-[0.25em] text-amber-800 font-bold block">
            Next-Gen Technology
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-neutral-900">
            Everything Your Wedding Guests Need
          </h2>
          <div className="w-12 h-0.5 bg-amber-700 mx-auto" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Features Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {featuresList.map((f, i) => (
              <div key={i} className="p-4 rounded-2xl bg-white border border-[#E0D7C7] space-y-2 shadow-sm">
                <div className="w-9 h-9 rounded-full bg-stone-100 flex items-center justify-center">
                  {f.icon}
                </div>
                <h3 className="font-serif text-sm font-bold text-neutral-900">{f.title}</h3>
                <p className="text-neutral-600 text-[11.5px] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>

          {/* Live Interactive Scratch Demo Card */}
          <div className="lg:col-span-5 bg-[#FFFDF8] rounded-3xl border-2 border-amber-700/30 p-6 shadow-xl space-y-4 text-center">
            <span className="text-[10.5px] uppercase font-mono tracking-[0.2em] text-amber-800 font-bold block">
              Try Interactive Scratch Card
            </span>
            <h3 className="font-serif text-xl font-bold text-neutral-900">Tap or Scratch to Reveal</h3>
            <p className="text-neutral-600 text-xs">
              Every guest gets this memorable delight when they open your invitation on their phone:
            </p>

            <div
              onClick={() => setDemoScratchRevealed(!demoScratchRevealed)}
              className={`h-36 rounded-2xl flex items-center justify-center p-4 cursor-pointer transition-all duration-500 shadow-md ${
                demoScratchRevealed
                  ? 'bg-gradient-to-br from-amber-50 to-amber-100 border-2 border-amber-600 text-amber-950 scale-[1.02]'
                  : 'bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 border-2 border-amber-400 text-white hover:opacity-95'
              }`}
            >
              {demoScratchRevealed ? (
                <div className="space-y-1 animate-fade-in">
                  <div className="font-serif text-2xl font-bold text-amber-900">YOU’RE INVITED ♡</div>
                  <div className="text-[11px] text-amber-800 font-medium">We can't wait to celebrate with you!</div>
                </div>
              ) : (
                <div className="space-y-1 font-mono">
                  <div className="text-sm font-extrabold tracking-widest flex items-center justify-center">
                    <Sparkles className="w-4 h-4 mr-1.5" /> SCRATCH HERE ✦
                  </div>
                  <div className="text-[10px] uppercase opacity-85">Click to Reveal</div>
                </div>
              )}
            </div>

            <div className="text-[11px] text-neutral-500 italic">
              ✦ Completely customizable reveal text inside your creator dashboard.
            </div>
          </div>
        </div>
      </section>

      {/* 5. PAPER VS DIGITAL COMPARISON TABLE */}
      <section className="py-16 sm:py-20 bg-[#FAF8F2] border-t border-[#E0D7C7]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-2 mb-10">
            <span className="text-[11px] uppercase font-mono tracking-[0.25em] text-amber-800 font-bold block">
              Why Couples Choose Moonlight
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-neutral-900">
              Traditional Paper vs. Moonlight Digital
            </h2>
            <div className="w-12 h-0.5 bg-amber-700 mx-auto" />
          </div>

          <div className="bg-white rounded-3xl border border-[#DFD4C2] overflow-hidden shadow-sm">
            <div className="grid grid-cols-3 bg-neutral-900 text-white p-4 font-mono text-xs font-bold uppercase tracking-wider">
              <div>Feature</div>
              <div className="text-amber-400">Moonlight Digital</div>
              <div className="text-neutral-400">Physical Paper</div>
            </div>
            {comparisonData.map((row, i) => (
              <div
                key={i}
                className={`grid grid-cols-3 p-4 text-xs border-t border-stone-200 ${
                  i % 2 === 0 ? 'bg-stone-50/50' : 'bg-white'
                }`}
              >
                <div className="font-bold text-neutral-800">{row.feature}</div>
                <div className="font-semibold text-emerald-700 flex items-center">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 shrink-0 text-emerald-600" />
                  {row.digital}
                </div>
                <div className="text-neutral-500">{row.paper}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PRICING PLANS */}
      <section id="pricing" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="text-center space-y-3 mb-12">
          <span className="text-[11px] uppercase font-mono tracking-[0.25em] text-amber-800 font-bold block">
            Transparent Pricing
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-neutral-900">
            Choose Your Experience
          </h2>
          <div className="w-12 h-0.5 bg-amber-700 mx-auto" />
          <p className="text-neutral-600 text-xs sm:text-sm">Pay once per event with zero subscription or hidden fees.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Classic Plan */}
          <div className="bg-white rounded-3xl border border-[#DFD4C2] p-6 sm:p-8 space-y-6 shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-xs uppercase font-mono font-bold text-neutral-500 tracking-wider">
                Moonlight Classic
              </span>
              <div className="flex items-baseline space-x-2">
                <span className="font-serif text-4xl font-bold text-neutral-900">₹399</span>
                <span className="text-xs text-neutral-500 font-mono">/ one-time</span>
              </div>
              <ul className="space-y-2.5 text-xs text-neutral-600 pt-2 border-t border-stone-200">
                <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-amber-700 mr-2 shrink-0" /> Premium Birthday / Event Template</li>
                <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-amber-700 mr-2 shrink-0" /> Instant Customer Dashboard</li>
                <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-amber-700 mr-2 shrink-0" /> Unique Live Invitation URL</li>
                <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-amber-700 mr-2 shrink-0" /> Guest RSVP Counter</li>
                <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-amber-700 mr-2 shrink-0" /> 1-Tap Google Maps Venue Directions</li>
              </ul>
            </div>
            <Link
              to="/invitations/templates/little-sunshine"
              className="w-full py-3 rounded-full bg-stone-100 hover:bg-stone-200 text-neutral-900 font-bold text-xs uppercase tracking-wider text-center block"
            >
              Choose Classic
            </Link>
          </div>

          {/* Royal Plan */}
          <div className="bg-gradient-to-b from-[#241B12] to-[#3B2816] text-white rounded-3xl border-2 border-amber-600/50 p-6 sm:p-8 space-y-6 shadow-xl flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-amber-500 text-neutral-950 text-[10px] font-mono font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow">
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
              <ul className="space-y-2.5 text-xs text-amber-100/90 pt-2 border-t border-amber-900/50">
                <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-amber-400 mr-2 shrink-0" /> Royal Heritage Wedding / Engagement Suite</li>
                <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-amber-400 mr-2 shrink-0" /> Interactive Scratch Card ("YOU’RE INVITED ♡")</li>
                <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-amber-400 mr-2 shrink-0" /> Real-time Guest RSVP Management</li>
                <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-amber-400 mr-2 shrink-0" /> Couple Memories Photo Gallery</li>
                <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-amber-400 mr-2 shrink-0" /> Romantic Background Music Soundtrack</li>
                <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-amber-400 mr-2 shrink-0" /> Live Event Countdown Timer</li>
                <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-amber-400 mr-2 shrink-0" /> 1-Tap Google Maps Turn-by-Turn Navigation</li>
              </ul>
            </div>
            <Link
              to="/invitations/templates/royal-love"
              className="w-full py-3 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-neutral-950 font-bold text-xs uppercase tracking-wider text-center block shadow-lg"
            >
              Choose Royal Suite
            </Link>
          </div>
        </div>
      </section>

      {/* 7. FAQ SECTION */}
      <section className="py-16 sm:py-20 bg-[#FAF8F2] border-t border-[#E0D7C7]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-2 mb-10">
            <span className="text-[11px] uppercase font-mono tracking-[0.25em] text-amber-800 font-bold block">
              Got Questions?
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-neutral-900">
              Frequently Asked Questions
            </h2>
            <div className="w-12 h-0.5 bg-amber-700 mx-auto" />
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-[#E0D6C6] overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full p-4 sm:p-5 text-left flex justify-between items-center font-serif text-sm sm:text-base font-bold text-neutral-900 hover:text-amber-800 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-amber-700 transition-transform duration-300 ${
                      activeFaq === i ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {activeFaq === i && (
                  <div className="px-4 sm:px-5 pb-5 text-xs text-neutral-600 leading-relaxed border-t border-stone-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FOOTER CTA */}
      <footer className="py-12 border-t border-[#DED4C3] bg-[#F5F1E8] text-center space-y-4 px-4">
        <div className="flex flex-col items-center space-y-1">
          <span className="font-serif text-xl font-bold tracking-[0.14em] text-neutral-900">
            MOONLIGHT
          </span>
          <span className="text-[9px] tracking-[0.25em] text-amber-800 font-mono uppercase font-bold">
            Production • Digital Invitations
          </span>
        </div>
        <div className="flex flex-wrap justify-center gap-5 text-xs text-neutral-600 font-medium">
          <a href="#templates" className="hover:text-amber-800">Templates</a>
          <a href="#pricing" className="hover:text-amber-800">Pricing</a>
          <Link to="/invitations/login" className="hover:text-amber-800">Customer Login</Link>
          <Link to="/invitations/dashboard" className="hover:text-amber-800">My Invitations</Link>
          <Link to="/invitations/admin" className="hover:text-amber-800">Admin Portal</Link>
        </div>
        <p className="text-[11px] text-neutral-500">
          © 2026 Moonlight Production • Crafted with love for weddings & grand celebrations.
        </p>
      </footer>
    </div>
  );
};

export default InvitationsLanding;
