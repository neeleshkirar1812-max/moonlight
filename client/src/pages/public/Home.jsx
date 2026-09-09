import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../api/client';
import TeslaHeroSlider from '../../components/common/TeslaHeroSlider';
import TeslaStickyBar from '../../components/common/TeslaStickyBar';
import VideoModal from '../../components/common/VideoModal';
import {
  Play,
  ArrowRight,
  Sparkles,
  Camera,
  Film,
  Compass,
  Star,
  ShieldCheck,
  Award,
  ChevronRight,
  Instagram,
  Heart,
  Calendar,
  DollarSign,
  MapPin,
  CheckCircle2,
  Users,
  Eye,
  Sliders,
  Check,
  Phone,
  Youtube,
  ExternalLink,
  Briefcase,
} from 'lucide-react';

import defaultMoonlightFilms from '../../data/moonlightFilms.json';

const pressLogos = [
  { name: 'VOGUE WEDDINGS', note: 'Featured Master Directors 2025' },
  { name: "HARPER'S BAZAAR BRIDE", note: 'Cover Story & Best Studio' },
  { name: 'CONDÉ NAST TRAVELLER', note: 'Top Destination Cinematographers' },
  { name: 'WEDDING SUTRA', note: 'Excellence in Royal Wedding Cinema' },
];

const teslaShowcases = [
  {
    id: 'pre-wedding',
    title: 'Cinematic Pre-Wedding Shoots',
    subtitle: 'Maheshwar Ghats, Bhopal Heritage & Mumbai Seasides',
    tag: 'Trending 2026',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=90',
    primaryCta: { label: 'Book Pre-Wedding', path: '/enquiry' },
    secondaryCta: { label: 'Watch 4K Trailers', path: '/portfolio/films' },
  },
  {
    id: 'royal-wedding',
    title: 'Royal Indian Wedding Suite',
    subtitle: '3-Day Ceremonies • Sangeet, Haldi, Baraat & Sacred Vedic Pheras',
    tag: 'Master Commission',
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1600&q=90',
    primaryCta: { label: 'Plan Wedding Shoot', path: '/enquiry' },
    secondaryCta: { label: 'View Photo Archives', path: '/portfolio/wedding' },
  },
];

const Home = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [services, setServices] = useState([]);
  const [videos, setVideos] = useState(defaultMoonlightFilms.slice(0, 4));
  const [testimonials, setTestimonials] = useState([]);
  const [activeVideo, setActiveVideo] = useState(null);

  // Interactive Live Budget Estimator State
  const [selectedServices, setSelectedServices] = useState(['Photography', '4K Cinema Film', 'Aerial Drone']);
  const [guestTier, setGuestTier] = useState('300-500');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [portRes, srvRes, vidRes, testRes] = await Promise.allSettled([
          api.get('/portfolio?isFeatured=true&limit=8'),
          api.get('/services'),
          api.get('/videos?isFeatured=true'),
          api.get('/testimonials?isFeatured=true'),
        ]);

        if (portRes.status === 'fulfilled' && portRes.value.data?.length > 0) setPortfolios(portRes.value.data);
        if (srvRes.status === 'fulfilled') setServices(srvRes.value.data || []);
        if (vidRes.status === 'fulfilled' && vidRes.value.data?.length > 0) {
          setVideos(vidRes.value.data);
        } else {
          setVideos(defaultMoonlightFilms.slice(0, 4));
        }
        if (testRes.status === 'fulfilled') setTestimonials(testRes.value.data || []);
      } catch (err) {
        console.error('Home data load error', err);
        setVideos(defaultMoonlightFilms.slice(0, 4));
      }
    };
    fetchData();
  }, []);

  const handleHeroVideoPlay = (videoId, title) => {
    setActiveVideo({
      title: title || 'Moonlight Production 4K Film',
      youtubeUrl: `https://www.youtube.com/watch?v=${videoId}`,
      youtubeVideoId: videoId,
      category: '4K Cinema',
      clientNames: 'Moonlight Couple',
      description: 'Official 4K wedding film from Moonlight Production.',
    });
  };

  const toggleCalculatorService = (serviceName) => {
    if (selectedServices.includes(serviceName)) {
      if (selectedServices.length === 1) return;
      setSelectedServices(selectedServices.filter((s) => s !== serviceName));
    } else {
      setSelectedServices([...selectedServices, serviceName]);
    }
  };

  const calculateEstimate = () => {
    let base = 250000;
    if (selectedServices.includes('4K Cinema Film')) base += 200000;
    if (selectedServices.includes('Aerial Drone')) base += 75000;
    if (selectedServices.includes('Italian Album')) base += 95000;
    if (guestTier === '500+') base += 100000;
    return base;
  };

  return (
    <div className="relative bg-[#FAF8F5] text-neutral-900 overflow-x-hidden selection:bg-gold-500 selection:text-black">
      {/* 1. TESLA-GRADE FULL-VIEWPORT HERO SLIDER */}
      <TeslaHeroSlider onPlayVideo={handleHeroVideoPlay} />

      {/* 2. PRESS & ROYAL RECOGNITIONS BAR */}
      <section className="py-5 sm:py-7 bg-[#F2ECE4] border-y border-amber-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:flex md:items-center md:justify-around gap-4 sm:gap-6 text-neutral-700 text-xs font-mono uppercase tracking-[0.15em] text-center">
            {pressLogos.map((p, idx) => (
              <div key={idx} className="group cursor-default p-1">
                <span className="font-serif text-xs sm:text-sm font-bold text-neutral-900 group-hover:text-amber-800 transition-colors block">
                  {p.name}
                </span>
                <span className="text-[9px] sm:text-[9.5px] text-neutral-600 font-medium tracking-wider font-sans block mt-0.5">{p.note}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. TESLA-STYLE FULL-WIDTH PRODUCT SHOWCASES */}
      <section className="space-y-8 sm:space-y-12 py-10 sm:py-16 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {teslaShowcases.map((showcase, index) => (
          <div
            key={showcase.id}
            className="relative rounded-3xl overflow-hidden min-h-[420px] sm:min-h-[540px] flex flex-col justify-between p-6 sm:p-12 border border-amber-900/15 shadow-xl group"
          >
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <img
                src={showcase.image}
                alt={showcase.title}
                className="w-full h-full object-cover object-center filter brightness-[0.7] group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-black/60" />
            </div>

            {/* Top Tag */}
            <div className="relative z-10">
              <span className="px-3 py-1 rounded-full bg-black/70 border border-gold-500/40 text-gold-300 text-[9.5px] sm:text-[10.5px] font-mono uppercase font-bold tracking-widest backdrop-blur-md shadow-md inline-block">
                {showcase.tag}
              </span>
            </div>

            {/* Center-Bottom Typography & Dual Buttons (Tesla Aesthetic) */}
            <div className="relative z-10 text-center max-w-2xl mx-auto space-y-3 sm:space-y-4">
              <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight drop-shadow-xl leading-tight">
                {showcase.title}
              </h2>
              <p className="text-xs sm:text-base text-neutral-200 font-light tracking-wide drop-shadow-md line-clamp-2">
                {showcase.subtitle}
              </p>

              {/* Dual Action Buttons (Stacked on mobile, side-by-side on >=380px) */}
              <div className="flex flex-col xs:flex-row items-center justify-center gap-2 sm:gap-3.5 pt-2 w-full max-w-md mx-auto">
                <Link
                  to={showcase.primaryCta.path}
                  className="w-full xs:flex-1 py-3 sm:py-3.5 px-4 sm:px-8 rounded-full bg-gold-gradient text-neutral-950 font-extrabold text-xs uppercase tracking-wider shadow-md active:scale-95 transition-all text-center min-h-[44px] flex items-center justify-center btn-shimmer"
                >
                  {showcase.primaryCta.label}
                </Link>

                <Link
                  to={showcase.secondaryCta.path}
                  className="w-full xs:flex-1 py-3 sm:py-3.5 px-4 sm:px-8 rounded-full bg-white/15 hover:bg-white/25 border border-white/30 text-white font-bold text-xs uppercase tracking-wider backdrop-blur-xl active:scale-95 transition-all text-center min-h-[44px] flex items-center justify-center"
                >
                  {showcase.secondaryCta.label}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* 4. REAL MOONLIGHT PRODUCTION 4K YOUTUBE FILMS SECTION */}
      {videos.length > 0 && (
        <section className="py-12 sm:py-20 bg-[#F5EFEB] border-t border-amber-900/10">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
            <div className="text-center space-y-1.5 max-w-2xl mx-auto px-2">
              <span className="text-[10px] sm:text-xs uppercase font-mono tracking-[0.25em] text-amber-700 font-bold block">
                Official YouTube Cinema
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-neutral-900">
                Moonlight Production 4K Films
              </h2>
              <p className="text-xs text-neutral-600 font-medium">
                Every film crafted with emotional depth, custom color grades, and royal storytelling from @moonlightproductions_films.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8">
              {videos.slice(0, 4).map((vid) => {
                const vidObj = {
                  title: vid.title,
                  youtubeUrl: vid.youtubeUrl || `https://www.youtube.com/watch?v=${vid.id}`,
                  youtubeVideoId: vid.id || vid.youtubeVideoId || vid.youtubeUrl?.split('v=')[1]?.substring(0, 11),
                  category: vid.category || 'Moonlight Cinema',
                  clientNames: vid.clientNames || 'Moonlight Couple',
                  description: vid.description || `Official wedding film produced by Moonlight Production.`,
                };

                return (
                  <div
                    key={vid.id || vid._id}
                    onClick={() => setActiveVideo(vidObj)}
                    className="group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-white border border-amber-900/10 hover:border-amber-600/40 cursor-pointer transition-all shadow-md hover:shadow-xl flex flex-col justify-between"
                  >
                    <div className="relative aspect-video overflow-hidden img-zoom-container bg-black">
                      <img
                        src={vid.hqThumbnail || vid.thumbnail || `https://img.youtube.com/vi/${vid.id}/hqdefault.jpg`}
                        alt={vid.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95 group-hover:brightness-100"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = `https://img.youtube.com/vi/${vid.id}/0.jpg`;
                        }}
                      />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gold-gradient text-neutral-950 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-neutral-950 ml-0.5" />
                        </div>
                      </div>

                      {vid.duration && (
                        <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-black/80 backdrop-blur-md text-[9.5px] font-mono font-bold text-white flex items-center border border-white/20">
                          {vid.duration}
                        </span>
                      )}
                    </div>

                    <div className="p-4 sm:p-6 space-y-1">
                      <div className="flex items-center justify-between text-[10px] uppercase font-mono text-amber-700 font-bold">
                        <span>Moonlight Cinema • 4K</span>
                        {vid.views && <span className="text-neutral-500 font-normal lowercase">{vid.views}</span>}
                      </div>
                      <h3 className="font-serif text-base sm:text-xl font-bold text-neutral-900 group-hover:text-amber-800 line-clamp-1 transition-colors">
                        {vid.title}
                      </h3>
                      <div className="pt-1.5 flex items-center text-xs text-amber-700 font-semibold">
                        <Play className="w-3 h-3 mr-1" /> Click to Watch in 4K
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="text-center pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/portfolio/films"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3 rounded-full bg-gold-gradient text-neutral-950 font-extrabold text-xs uppercase tracking-wider shadow-md hover:brightness-105 active:scale-95 transition-all btn-shimmer"
              >
                Explore All 30+ 4K Wedding Films <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Link>
              <a
                href="https://www.youtube.com/@moonlightproductions_films"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center px-5 sm:px-6 py-3 rounded-full bg-red-50 hover:bg-red-600 text-red-700 hover:text-white border border-red-500/30 text-xs font-bold uppercase tracking-wider transition-all font-mono shadow-sm"
              >
                <Youtube className="w-4 h-4 mr-1.5" /> YouTube Channel
              </a>
            </div>
          </div>
        </section>
      )}

      {/* 5. INTERACTIVE 8-STEP WEDDING PLANNER ESTIMATOR */}
      <section className="py-12 sm:py-20 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden border border-amber-900/15 bg-white p-5 sm:p-12 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center relative z-10">
            {/* Left Description */}
            <div className="lg:col-span-7 space-y-3 sm:space-y-4">
              <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-800 text-[10px] sm:text-[10.5px] font-mono font-bold uppercase tracking-widest border border-amber-600/20 inline-block">
                Wedding Cost Calculator & Planner
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 leading-tight">
                Plan Your Indian Wedding Shoot in 8 Easy Steps
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                Calculate estimated budgets, select your palace destination, configure 4K drone cinematography, and receive a bespoke proposal with direct WhatsApp assistance.
              </p>

              <div className="pt-2">
                <Link
                  to="/enquiry"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-7 py-3.5 rounded-full bg-gold-gradient text-neutral-950 font-extrabold text-xs uppercase tracking-wider shadow-md hover:brightness-105 active:scale-95 transition-all btn-shimmer"
                >
                  <Calendar className="w-3.5 h-3.5 mr-2" />
                  Launch 8-Step Wedding Planner
                </Link>
              </div>
            </div>

            {/* Right Live Calculator Card */}
            <div className="lg:col-span-5 bg-[#FAF8F5] rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-amber-900/15 shadow-sm space-y-4 sm:space-y-5">
              <div className="flex items-center justify-between border-b border-amber-900/10 pb-3">
                <span className="text-xs uppercase font-mono tracking-wider text-amber-800 font-bold">
                  Quick Estimate Calculator
                </span>
                <span className="text-[10px] text-neutral-500 font-mono">Live AI Estimate</span>
              </div>

              {/* Service Pills Selector */}
              <div className="space-y-2">
                <label className="text-[10.5px] sm:text-[11px] uppercase font-mono text-neutral-800 font-bold block">
                  Select Coverage Options:
                </label>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {['Photography', '4K Cinema Film', 'Aerial Drone', 'Italian Album'].map((s) => {
                    const isSelected = selectedServices.includes(s);
                    return (
                      <button
                        key={s}
                        type="button"
                        onClick={() => toggleCalculatorService(s)}
                        className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10.5px] sm:text-xs font-mono transition-all flex items-center space-x-1.5 ${
                          isSelected
                            ? 'bg-amber-100 border border-amber-600 text-amber-900 font-bold shadow-sm'
                            : 'bg-white border border-neutral-300 text-neutral-600 hover:text-neutral-900 hover:border-neutral-400'
                        }`}
                      >
                        {isSelected ? <Check className="w-3 h-3 text-amber-700 stroke-[3]" /> : <span className="w-3 h-3 block" />}
                        <span>{s}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Guest Tier */}
              <div className="space-y-2">
                <label className="text-[10.5px] sm:text-[11px] uppercase font-mono text-neutral-800 font-bold block">
                  Celebration Scale (Guests):
                </label>
                <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                  {['< 300', '300-500', '500+'].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setGuestTier(t)}
                      className={`py-1.5 rounded-xl text-xs font-mono transition-all ${
                        guestTier === t
                          ? 'bg-gold-gradient text-neutral-950 font-extrabold shadow-sm'
                          : 'bg-white border border-neutral-300 text-neutral-600 hover:text-neutral-900'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Estimated Total Display */}
              <div className="pt-3 border-t border-amber-900/10 flex items-center justify-between">
                <div>
                  <span className="text-[9.5px] sm:text-[10px] uppercase font-mono text-neutral-500 block">Estimated Investment</span>
                  <span className="font-serif text-xl sm:text-2xl font-bold text-amber-700">
                    ₹{calculateEstimate().toLocaleString('en-IN')}
                  </span>
                </div>

                <Link
                  to="/enquiry"
                  className="px-3.5 sm:px-4 py-2 rounded-full bg-neutral-900 hover:bg-black text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
                >
                  Lock Estimate →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CAREERS & CREATIVE TEAM HIRING SPOTLIGHT */}
      <section className="py-12 sm:py-20 bg-gradient-to-b from-[#FAF8F5] via-[#F3ECE4] to-[#FAF8F5] border-t border-amber-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden bg-white border border-amber-900/15 p-6 sm:p-12 shadow-xl">
            {/* Ambient Background Glow */}
            <div className="absolute -right-20 -top-20 w-80 h-80 bg-amber-200/40 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Heading & Mission */}
              <div className="lg:col-span-7 space-y-4 text-left">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-widest">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>We're Hiring • 5+ Active Roles</span>
                </div>

                <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 leading-tight">
                  Join India's Elite Wedding Cinema Team
                </h2>

                <p className="text-xs sm:text-base text-neutral-600 font-normal leading-relaxed">
                  Are you a passionate wedding cinematographer, candid portraitist, FPV drone specialist, or DaVinci Resolve colorist? Step into Moonlight Production and capture breathtaking royal palace destinations with cinema-grade Sony FX6 rigs and master prime optics.
                </p>

                {/* Quick Perks Grid */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-amber-900/10 space-y-1">
                    <div className="flex items-center space-x-2 text-amber-800 font-bold text-xs sm:text-sm font-serif">
                      <Camera className="w-4 h-4 text-amber-700" />
                      <span>Sony FX6 & FX3 Rigs</span>
                    </div>
                    <p className="text-[10px] sm:text-xs text-neutral-500">Cinema optics, DJI Ronin 4D & Inspire 3 gear provided.</p>
                  </div>

                  <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-amber-900/10 space-y-1">
                    <div className="flex items-center space-x-2 text-amber-800 font-bold text-xs sm:text-sm font-serif">
                      <MapPin className="w-4 h-4 text-amber-700" />
                      <span>Palace Destinations</span>
                    </div>
                    <p className="text-[10px] sm:text-xs text-neutral-500">All-expenses-paid luxury shoots across India & abroad.</p>
                  </div>

                  <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-amber-900/10 space-y-1">
                    <div className="flex items-center space-x-2 text-amber-800 font-bold text-xs sm:text-sm font-serif">
                      <DollarSign className="w-4 h-4 text-amber-700" />
                      <span>Top-Tier Pay</span>
                    </div>
                    <p className="text-[10px] sm:text-xs text-neutral-500">Industry-leading monthly CTC + event bonus incentives.</p>
                  </div>

                  <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-amber-900/10 space-y-1">
                    <div className="flex items-center space-x-2 text-amber-800 font-bold text-xs sm:text-sm font-serif">
                      <Award className="w-4 h-4 text-amber-700" />
                      <span>Vogue & Film Credits</span>
                    </div>
                    <p className="text-[10px] sm:text-xs text-neutral-500">Get your name recognized on luxury wedding cinema covers.</p>
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <Link
                    to="/careers"
                    className="inline-flex items-center justify-center px-6 sm:px-8 py-3.5 rounded-full bg-gold-gradient text-neutral-950 font-extrabold text-xs uppercase tracking-wider shadow-md hover:brightness-105 active:scale-95 transition-all btn-shimmer"
                  >
                    <Briefcase className="w-4 h-4 mr-2 text-neutral-950" />
                    View Job Openings & Apply
                    <ArrowRight className="w-4 h-4 ml-2 text-neutral-950" />
                  </Link>

                  <a
                    href="tel:+918817789498"
                    className="inline-flex items-center justify-center px-5 py-3.5 rounded-full bg-[#FAF8F5] hover:bg-neutral-100 border border-amber-900/15 text-neutral-800 text-xs font-bold uppercase tracking-wider transition-all"
                  >
                    <Phone className="w-3.5 h-3.5 mr-2 text-amber-700" />
                    Talent Hotline: +91 88177 89498
                  </a>
                </div>
              </div>

              {/* Right Column: Active Openings Card */}
              <div className="lg:col-span-5 bg-[#FAF8F5] rounded-3xl p-6 border border-amber-900/15 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-amber-900/10 pb-3">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-amber-700" />
                    <span className="text-xs uppercase font-mono tracking-wider text-amber-900 font-bold">
                      Open Positions (2026 Season)
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded-full">
                    Immediate
                  </span>
                </div>

                <div className="space-y-2.5">
                  {[
                    { title: 'Lead Wedding Cinematographer', loc: 'Bhopal / On-Location', exp: '3+ Yrs Exp', tag: 'Full Time' },
                    { title: 'Master Candid Photographer', loc: 'Bhopal / Central India', exp: '2+ Yrs Exp', tag: 'Full Time' },
                    { title: 'FPV Drone & Aerial Specialist', loc: 'Pan-India Destination', exp: 'DGCA Certified', tag: 'Contract' },
                    { title: 'DaVinci Resolve Colorist & Editor', loc: 'Bhopal Studio / Hybrid', exp: '2+ Yrs Exp', tag: 'Full Time' },
                    { title: 'Client Relationship & Booking Lead', loc: 'Bhopal Studio', exp: '1+ Yrs Exp', tag: 'Full Time' },
                  ].map((job, idx) => (
                    <Link
                      key={idx}
                      to="/careers"
                      className="group flex items-center justify-between p-3 rounded-2xl bg-white hover:bg-amber-50 border border-amber-900/10 hover:border-amber-600/30 transition-all shadow-sm"
                    >
                      <div className="space-y-0.5">
                        <h4 className="font-serif text-xs sm:text-sm font-bold text-neutral-900 group-hover:text-amber-800 transition-colors">
                          {job.title}
                        </h4>
                        <div className="flex items-center space-x-2 text-[10px] text-neutral-500 font-mono">
                          <span>{job.loc}</span>
                          <span>•</span>
                          <span className="text-amber-800 font-medium">{job.exp}</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                        {job.tag} →
                      </span>
                    </Link>
                  ))}
                </div>

                <div className="pt-2 text-center">
                  <Link
                    to="/careers"
                    className="text-xs text-amber-800 hover:text-amber-900 font-bold tracking-wide font-mono inline-flex items-center"
                  >
                    Explore full requirements & submit your portfolio <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. TESLA FLOATING BOTTOM STICKY ACTION BAR */}
      <TeslaStickyBar />

      {/* Video Modal Player */}
      {activeVideo && <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />}
    </div>
  );
};

export default Home;
