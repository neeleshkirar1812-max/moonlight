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
    <div className="relative bg-[#FAF8F5] text-black overflow-x-hidden selection:bg-gold-500 selection:text-white">
      {/* 1. TESLA-GRADE FULL-VIEWPORT HERO SLIDER */}
      <TeslaHeroSlider onPlayVideo={handleHeroVideoPlay} />

      {/* 2. PRESS & ROYAL RECOGNITIONS BAR (Mobile 2x2 Grid) */}
      <section className="py-5 sm:py-7 bg-white border-y-2 border-neutral-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:flex md:items-center md:justify-around gap-4 sm:gap-6 text-black text-xs font-mono uppercase tracking-[0.15em] text-center">
            {pressLogos.map((p, idx) => (
              <div key={idx} className="group cursor-default p-1">
                <span className="font-serif text-xs sm:text-sm font-black text-black group-hover:text-gold-700 transition-colors block">
                  {p.name}
                </span>
                <span className="text-[9px] sm:text-[9.5px] text-neutral-700 font-bold tracking-wider font-sans block mt-0.5">{p.note}</span>
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
            className="relative rounded-3xl overflow-hidden min-h-[420px] sm:min-h-[540px] flex flex-col justify-between p-6 sm:p-12 border-2 border-black/20 shadow-xl group"
          >
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <img
                src={showcase.image}
                alt={showcase.title}
                className="w-full h-full object-cover object-center filter brightness-[0.75] group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/50" />
            </div>

            {/* Top Tag */}
            <div className="relative z-10">
              <span className="px-3 py-1 rounded-full bg-white border-2 border-black text-black text-[9.5px] sm:text-[10.5px] font-mono uppercase font-black tracking-widest backdrop-blur-md shadow-md inline-block">
                {showcase.tag}
              </span>
            </div>

            {/* Center-Bottom Typography & Dual Buttons (Tesla Aesthetic) */}
            <div className="relative z-10 text-center max-w-2xl mx-auto space-y-3 sm:space-y-4">
              <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight drop-shadow-xl leading-tight">
                {showcase.title}
              </h2>
              <p className="text-xs sm:text-base text-neutral-100 font-medium tracking-wide drop-shadow-md line-clamp-2">
                {showcase.subtitle}
              </p>

              {/* Dual Action Buttons */}
              <div className="flex flex-row items-center justify-center gap-2 sm:gap-3 pt-2 w-full max-w-md mx-auto">
                <Link
                  to={showcase.primaryCta.path}
                  className="flex-1 py-2.5 sm:py-3.5 px-3 sm:px-8 rounded-full bg-white hover:bg-neutral-100 text-black font-black text-[10px] sm:text-xs uppercase tracking-wider shadow-2xl active:scale-95 transition-all text-center truncate"
                >
                  {showcase.primaryCta.label}
                </Link>

                <Link
                  to={showcase.secondaryCta.path}
                  className="flex-1 py-2.5 sm:py-3.5 px-3 sm:px-8 rounded-full bg-black/60 hover:bg-black border-2 border-white text-white font-bold text-[10px] sm:text-xs uppercase tracking-wider backdrop-blur-xl active:scale-95 transition-all text-center truncate"
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
        <section className="py-12 sm:py-20 bg-[#F6F4EF] border-t-2 border-neutral-300">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
            <div className="text-center space-y-1.5 max-w-2xl mx-auto px-2">
              <span className="text-[10px] sm:text-xs uppercase font-mono tracking-[0.25em] text-gold-800 font-black block">
                Official YouTube Cinema
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-black text-black">
                Moonlight Production 4K Films
              </h2>
              <p className="text-xs text-neutral-800 font-medium">
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
                    className="group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-white border-2 border-neutral-300 hover:border-black cursor-pointer transition-all shadow-lg hover:shadow-2xl"
                  >
                    <div className="relative aspect-video overflow-hidden img-zoom-container bg-black">
                      <img
                        src={vid.hqThumbnail || vid.thumbnail || `https://img.youtube.com/vi/${vid.id}/hqdefault.jpg`}
                        alt={vid.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = `https://img.youtube.com/vi/${vid.id}/0.jpg`;
                        }}
                      />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white text-black flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                          <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-current ml-0.5 text-gold-700" />
                        </div>
                      </div>

                      {vid.duration && (
                        <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-black text-[9.5px] font-mono font-bold text-white flex items-center border border-white/30">
                          {vid.duration}
                        </span>
                      )}
                    </div>

                    <div className="p-4 sm:p-6 space-y-1">
                      <div className="flex items-center justify-between text-[10px] uppercase font-mono text-gold-800 font-black">
                        <span>Moonlight Cinema • 4K</span>
                        {vid.views && <span className="text-black font-bold lowercase">{vid.views}</span>}
                      </div>
                      <h3 className="font-serif text-base sm:text-xl font-black text-black group-hover:text-gold-700 line-clamp-1">
                        {vid.title}
                      </h3>
                      <div className="pt-1.5 flex items-center text-xs text-black font-bold">
                        <Play className="w-3 h-3 mr-1 text-gold-700" /> Click to Watch in 4K
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="text-center pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/portfolio/films"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3 rounded-full bg-black hover:bg-neutral-800 text-white font-extrabold text-xs uppercase tracking-wider shadow-md hover:brightness-110 transition-all btn-shimmer"
              >
                Explore All 30+ 4K Wedding Films <ArrowRight className="w-3.5 h-3.5 ml-1.5 text-gold-400" />
              </Link>
              <a
                href="https://www.youtube.com/@moonlightproductions_films"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center px-5 sm:px-6 py-3 rounded-full bg-red-50 hover:bg-red-600 text-red-700 hover:text-white border-2 border-red-300 text-xs font-black uppercase tracking-wider transition-all font-mono shadow-sm"
              >
                <Youtube className="w-4 h-4 mr-1.5" /> YouTube Channel
              </a>
            </div>
          </div>
        </section>
      )}

      {/* 5. INTERACTIVE 8-STEP WEDDING PLANNER ESTIMATOR */}
      <section className="py-12 sm:py-20 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden border-2 border-neutral-300 bg-white p-5 sm:p-12 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center relative z-10">
            {/* Left Description */}
            <div className="lg:col-span-7 space-y-3 sm:space-y-4">
              <span className="px-3 py-1 rounded-full bg-gold-50 text-gold-900 text-[10px] sm:text-[10.5px] font-mono font-black uppercase tracking-widest border-2 border-gold-400 inline-block">
                Interactive Concierge Wizard
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-black text-black leading-tight">
                Plan Your Indian Wedding Shoot in 8 Easy Steps
              </h2>
              <p className="text-xs sm:text-sm text-neutral-800 leading-relaxed font-semibold">
                Calculate estimated budgets, select your palace destination, configure 4K drone cinematography, and receive a bespoke proposal with direct WhatsApp concierge assistance.
              </p>

              <div className="pt-2">
                <Link
                  to="/enquiry"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-7 py-3 rounded-full bg-black hover:bg-neutral-800 text-white font-extrabold text-xs uppercase tracking-wider shadow-md hover:brightness-110 transition-all btn-shimmer"
                >
                  <Calendar className="w-3.5 h-3.5 mr-2 text-gold-400" />
                  Launch Full 8-Step Wizard
                </Link>
              </div>
            </div>

            {/* Right Live Calculator Card */}
            <div className="lg:col-span-5 bg-[#FAF8F5] rounded-2xl sm:rounded-3xl p-5 sm:p-7 border-2 border-neutral-300 shadow-xl space-y-4 sm:space-y-5">
              <div className="flex items-center justify-between border-b-2 border-neutral-200 pb-3">
                <span className="text-xs uppercase font-mono tracking-wider text-black font-black">
                  Quick Estimate Calculator
                </span>
                <span className="text-[10px] text-neutral-700 font-bold">Live AI Estimate</span>
              </div>

              {/* Service Pills Selector */}
              <div className="space-y-2">
                <label className="text-[10.5px] sm:text-[11px] uppercase font-mono text-black font-black block">
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
                            ? 'bg-gold-100 border-2 border-gold-600 text-black font-black'
                            : 'bg-white border-2 border-neutral-300 text-neutral-800 font-bold hover:text-black hover:border-black'
                        }`}
                      >
                        {isSelected ? <Check className="w-3 h-3 text-gold-800 stroke-[3]" /> : <span className="w-3 h-3 block" />}
                        <span>{s}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Guest Tier */}
              <div className="space-y-2">
                <label className="text-[10.5px] sm:text-[11px] uppercase font-mono text-black font-black block">
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
                          ? 'bg-black text-white font-black'
                          : 'bg-white border-2 border-neutral-300 text-black font-bold hover:border-black'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Estimated Total Display */}
              <div className="pt-3 border-t-2 border-neutral-200 flex items-center justify-between">
                <div>
                  <span className="text-[9.5px] sm:text-[10px] uppercase font-mono text-neutral-700 font-bold block">Estimated Investment</span>
                  <span className="font-serif text-xl sm:text-2xl font-black text-black">
                    ₹{calculateEstimate().toLocaleString('en-IN')}
                  </span>
                </div>

                <Link
                  to="/enquiry"
                  className="px-3.5 sm:px-4 py-2 rounded-full bg-black hover:bg-neutral-800 text-white text-[11px] sm:text-xs font-black uppercase tracking-wider transition-all shadow-sm"
                >
                  Lock Estimate →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TESLA FLOATING BOTTOM STICKY ACTION BAR */}
      <TeslaStickyBar />

      {/* Video Modal Player */}
      {activeVideo && <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />}
    </div>
  );
};

export default Home;
