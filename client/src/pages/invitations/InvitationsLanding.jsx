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
  ChevronDown,
  ShieldCheck,
  Eye,
  Crown,
  Heart,
  Calendar,
  Check,
} from 'lucide-react';

const occasionsList = [
  {
    title: 'Wedding Invitation',
    desc: 'Elegant templates with luxury animations like 3D double door reveals, chime music, and falling rose petals.',
    icon: '👑',
    category: 'Wedding',
  },
  {
    title: 'Engagement Invitation',
    desc: 'Beautiful cinematic styles with photo carousels to announce your special ring ceremony.',
    icon: '💍',
    category: 'Engagement',
  },
  {
    title: 'Birthday Invitation',
    desc: 'Interactive countdown timers, dynamic scratch-to-reveal dates, and celebratory themes.',
    icon: '🎂',
    category: 'Birthday',
  },
  {
    title: 'Housewarming / Griha Pravesh',
    desc: 'Embedded 1-tap Google Maps directions and venue itinerary for seamless guest arrival.',
    icon: '🏡',
    category: 'Celebration',
  },
  {
    title: 'Baby Shower / Naming Ceremony',
    desc: 'Soft pastel palettes, warm blessings, and beautiful photo slideshow integrations.',
    icon: '🍼',
    category: 'Celebration',
  },
  {
    title: 'Custom Event & Reception',
    desc: 'Full customization: Toggle sections, upload custom background music, and manage live RSVPs.',
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

  const filteredTemplates =
    selectedCategory === 'All Categories'
      ? invitationTemplates
      : invitationTemplates.filter((t) => t.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#d4af37] selection:text-black font-sans">
      <SEO
        title="Moonlight Invitations | Premium Digital Event Invitations & RSVP Suite"
        description="Create animated digital wedding and event invitation webpages in minutes. Featuring 3D palace door reveals, touch scratch cards, Google Maps, background music, and live RSVP tracking."
      />

      {/* ========================================================================= */}
      {/* 1. HERO SECTION */}
      {/* ========================================================================= */}
      <section className="relative max-w-5xl mx-auto pt-20 sm:pt-28 pb-16 sm:pb-24 px-4 sm:px-6 text-center">
        {/* Glowing Background Radial */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#d4af37]/10 blur-[120px] rounded-full pointer-events-none" />

        <span className="text-[#d4af37] text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] mb-4 inline-block font-mono">
          ✦ Premium Digital Invitations
        </span>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.15] mb-6 bg-gradient-to-r from-white via-neutral-100 to-[#a1a1aa] bg-clip-text text-transparent">
          Create All Events Invitation Webpage Online in Minutes
        </h1>

        <p className="text-[#a1a1aa] text-sm sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          Fill a simple form, get a stunning animated invitation webpage — share it with your guests instantly via WhatsApp or Email.
        </p>

        {/* Hero CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-10">
          <Link
            to="/invitations/templates"
            className="w-full sm:w-auto px-8 py-3.5 rounded-md bg-[#d4af37] hover:bg-[#f3cf5b] text-black font-semibold text-sm transition-all shadow-lg hover:shadow-[#d4af37]/20 hover:scale-105 active:scale-95 text-center"
          >
            Create My Invitation
          </Link>
          <Link
            to="/i/royal-wedding-aarav-kiara"
            target="_blank"
            className="w-full sm:w-auto px-8 py-3.5 rounded-md bg-transparent hover:bg-white/10 text-white border border-[#27272a] hover:border-white/40 font-semibold text-sm transition-all text-center flex items-center justify-center space-x-2"
          >
            <Eye className="w-4 h-4 text-[#d4af37]" />
            <span>View Live Demo</span>
          </Link>
        </div>

        {/* Trust Metrics */}
        <div className="text-xs sm:text-sm text-[#a1a1aa] flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 border-t border-[#27272a] pt-8">
          <span className="flex items-center space-x-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#d4af37]" />
            <span>Trusted by hundreds of hosts & couples</span>
          </span>
          <span className="flex items-center space-x-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#d4af37]" />
            <span>One-time payment</span>
          </span>
          <span className="flex items-center space-x-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#d4af37]" />
            <span>No recurring subscriptions</span>
          </span>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. OCCASIONS GRID SECTION (#features) */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-t border-[#27272a]" id="features">
        <div className="text-center mb-12 sm:mb-16 space-y-3">
          <h2 className="text-2xl sm:text-4xl font-bold text-white">
            Invitations for every occasion
          </h2>
          <p className="text-[#a1a1aa] text-sm sm:text-base max-w-2xl mx-auto">
            Access to Premium Luxury Invitation Templates for Every Event in just One Time Payment
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {occasionsList.map((occ, idx) => (
            <div
              key={idx}
              className="bg-[#141414] border border-[#27272a] p-6 sm:p-8 rounded-xl hover:-translate-y-1 hover:border-[#d4af37]/40 transition-all duration-300 space-y-3 group"
            >
              <div className="text-2xl mb-2">{occ.icon}</div>
              <h3 className="text-lg font-bold text-[#d4af37] group-hover:text-[#f3cf5b] transition-colors">
                {occ.title}
              </h3>
              <p className="text-[#a1a1aa] text-xs sm:text-sm leading-relaxed">
                {occ.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. TEMPLATE SHOWCASE CATALOG */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-t border-[#27272a]" id="templates">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4">
          <div className="space-y-2">
            <span className="text-[#d4af37] text-xs font-mono uppercase tracking-widest font-bold">
              ✦ Handcrafted Designs
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-white">
              Choose Your Luxury Template
            </h2>
          </div>
          <Link
            to="/invitations/templates"
            className="text-xs sm:text-sm text-[#d4af37] hover:text-[#f3cf5b] font-semibold flex items-center space-x-1"
          >
            <span>View all designs</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {invitationCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-[#d4af37] text-black font-bold shadow'
                  : 'bg-[#141414] border border-[#27272a] text-[#a1a1aa] hover:text-white hover:border-[#a1a1aa]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className="bg-[#141414] border border-[#27272a] rounded-xl overflow-hidden hover:border-[#d4af37]/50 transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Cover Image */}
              <div className="relative h-60 overflow-hidden bg-black">
                <img
                  src={template.coverImage}
                  alt={template.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#0a0a0a]/90 text-[#d4af37] text-[10px] font-mono font-bold uppercase border border-[#d4af37]/40 shadow">
                  {template.badge}
                </span>
                <div className="absolute bottom-3 left-4 right-4">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-[#d4af37] font-bold block">
                    {template.category} Suite
                  </span>
                  <h3 className="font-serif text-lg font-bold text-white">{template.name}</h3>
                </div>
              </div>

              {/* Body Info & CTA */}
              <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                <p className="text-[#a1a1aa] text-xs leading-relaxed line-clamp-2">
                  {template.description}
                </p>

                <div className="pt-3 border-t border-[#27272a] flex items-center justify-between">
                  <div>
                    <span className="text-xs text-[#a1a1aa] line-through mr-1 font-mono">
                      ₹{template.originalPrice}
                    </span>
                    <span className="font-serif text-xl font-bold text-[#d4af37]">
                      ₹{template.price}
                    </span>
                    <span className="text-[10px] text-[#a1a1aa] block font-mono">One-time payment</span>
                  </div>

                  <div className="flex space-x-2">
                    <Link
                      to={`/invitations/templates/${template.slug}`}
                      className="px-4 py-2 rounded-md bg-[#d4af37] hover:bg-[#f3cf5b] text-black font-semibold text-xs transition-all shadow"
                    >
                      Select & Edit
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. PRICING SECTION (#pricing) */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-t border-[#27272a]" id="pricing">
        <div className="text-center mb-12 sm:mb-16 space-y-3">
          <span className="text-[#d4af37] text-xs font-mono uppercase tracking-widest font-bold block">
            ✦ Simple & Transparent
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-white">
            Choose Your Experience
          </h2>
          <p className="text-[#a1a1aa] text-sm sm:text-base max-w-xl mx-auto">
            Pay once per event with zero subscription or hidden fees. Full lifetime access to your live invitation link.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Classic Plan */}
          <div className="bg-[#141414] rounded-2xl border border-[#27272a] p-6 sm:p-8 space-y-6 flex flex-col justify-between hover:border-[#d4af37]/40 transition-all">
            <div className="space-y-4">
              <span className="text-xs uppercase font-mono font-bold text-[#a1a1aa] tracking-wider">
                Moonlight Classic
              </span>
              <div className="flex items-baseline space-x-2">
                <span className="font-serif text-4xl font-bold text-white">₹399</span>
                <span className="text-xs text-[#a1a1aa] font-mono">/ one-time</span>
              </div>
              <ul className="space-y-3 text-xs text-[#a1a1aa] pt-4 border-t border-[#27272a]">
                <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-[#d4af37] mr-2.5 shrink-0" /> Premium Birthday / Event Template</li>
                <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-[#d4af37] mr-2.5 shrink-0" /> Instant Customer Dashboard & Editor</li>
                <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-[#d4af37] mr-2.5 shrink-0" /> Unique Live Invitation URL</li>
                <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-[#d4af37] mr-2.5 shrink-0" /> Live Guest RSVP Counter & List</li>
                <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-[#d4af37] mr-2.5 shrink-0" /> 1-Tap Google Maps Venue Directions</li>
              </ul>
            </div>
            <Link
              to="/invitations/templates/little-sunshine"
              className="w-full py-3.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white font-semibold text-xs uppercase tracking-wider text-center block transition-all"
            >
              Choose Classic
            </Link>
          </div>

          {/* Royal Plan */}
          <div className="bg-gradient-to-b from-[#1c1708] to-[#141414] text-white rounded-2xl border-2 border-[#d4af37]/60 p-6 sm:p-8 space-y-6 shadow-2xl flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-[#d4af37] text-black text-[10px] font-mono font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow">
              Most Popular
            </div>
            <div className="space-y-4">
              <span className="text-xs uppercase font-mono font-bold text-[#d4af37] tracking-wider">
                Moonlight Royal Suite
              </span>
              <div className="flex items-baseline space-x-2">
                <span className="font-serif text-4xl font-bold text-[#d4af37]">₹699</span>
                <span className="text-xs text-[#a1a1aa] font-mono">/ one-time</span>
              </div>
              <ul className="space-y-3 text-xs text-neutral-200 pt-4 border-t border-[#27272a]">
                <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-[#d4af37] mr-2.5 shrink-0" /> Royal 3D Palace Double Door Entrance Reveal</li>
                <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-[#d4af37] mr-2.5 shrink-0" /> Interactive Touch Scratch Card ("YOU’RE INVITED ♡")</li>
                <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-[#d4af37] mr-2.5 shrink-0" /> Real-time Guest RSVP Management & Export</li>
                <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-[#d4af37] mr-2.5 shrink-0" /> Couple Memories Photo Gallery & Slideshow</li>
                <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-[#d4af37] mr-2.5 shrink-0" /> Romantic Background Music Soundtrack</li>
                <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-[#d4af37] mr-2.5 shrink-0" /> Live Event Countdown Timer</li>
                <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-[#d4af37] mr-2.5 shrink-0" /> 1-Tap Google Maps Turn-by-Turn Navigation</li>
              </ul>
            </div>
            <Link
              to="/invitations/templates/royal-love"
              className="w-full py-3.5 rounded-lg bg-[#d4af37] hover:bg-[#f3cf5b] text-black font-bold text-xs uppercase tracking-wider text-center block shadow-lg transition-all"
            >
              Choose Royal Suite
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. TRUSTED BY HOSTS & COUPLE REVIEWS */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#27272a]">
        <div className="text-center space-y-3 mb-12">
          <span className="text-[#d4af37] text-xs font-mono uppercase tracking-widest font-bold block">
            ✦ Client Stories
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-white">
            Loved by 5,000+ Couples & Hosts Across India
          </h2>
          <p className="text-[#a1a1aa] text-xs sm:text-sm max-w-xl mx-auto">
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
              className="bg-[#141414] rounded-xl border border-[#27272a] p-6 sm:p-8 space-y-4 flex flex-col justify-between hover:border-[#d4af37]/40 transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center space-x-1 text-[#d4af37]">
                  {[...Array(item.rating)].map((_, i) => (
                    <span key={i} className="text-[#d4af37] text-sm">★</span>
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-[#a1a1aa] leading-relaxed italic">
                  "{item.review}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#27272a] flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">{item.couple}</h4>
                  <span className="text-[11px] text-[#a1a1aa] block">{item.venue}</span>
                </div>
                <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded bg-[#0a0a0a] text-[#d4af37] border border-[#d4af37]/30">
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
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-t border-[#27272a] max-w-4xl mx-auto">
        <div className="text-center space-y-3 mb-12">
          <span className="text-[#d4af37] text-xs font-mono uppercase tracking-widest font-bold block">
            ✦ Got Questions?
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-[#a1a1aa] text-xs sm:text-sm">
            Everything you need to know about creating, editing, and sharing your digital invitation.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-[#141414] rounded-xl border border-[#27272a] overflow-hidden transition-all"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                className="w-full p-4 sm:p-5 text-left flex justify-between items-center text-sm sm:text-base font-semibold text-white hover:text-[#d4af37] transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-[#d4af37] transition-transform duration-300 ${
                    activeFaq === i ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {activeFaq === i && (
                <div className="px-4 sm:px-5 pb-5 text-xs text-[#a1a1aa] leading-relaxed border-t border-[#27272a] pt-3">
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
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-t border-[#27272a] text-center">
        <div className="bg-gradient-to-r from-[#1c1708] via-[#141414] to-[#1c1708] border border-[#d4af37]/40 rounded-2xl p-8 sm:p-14 space-y-6">
          <h2 className="text-2xl sm:text-4xl font-bold text-white">
            Ready to Impress Your Guests?
          </h2>
          <p className="text-[#a1a1aa] text-sm sm:text-base max-w-xl mx-auto">
            Choose your luxury template, customize your celebration details in 2 minutes, and share directly with your loved ones.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/invitations/templates"
              className="px-8 py-3.5 rounded-md bg-[#d4af37] hover:bg-[#f3cf5b] text-black font-bold text-sm transition-all shadow-lg hover:scale-105"
            >
              Explore Templates
            </Link>
            <Link
              to="/invitations/dashboard"
              className="px-8 py-3.5 rounded-md bg-transparent hover:bg-white/10 text-white border border-[#27272a] font-semibold text-sm transition-all"
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
