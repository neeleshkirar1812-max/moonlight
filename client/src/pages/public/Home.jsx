import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../api/client';
import TeslaHeroSlider from '../../components/common/TeslaHeroSlider';
import TeslaStickyBar from '../../components/common/TeslaStickyBar';
import VideoModal from '../../components/common/VideoModal';
import Lightbox from '../../components/common/Lightbox';
import {
  Play,
  ArrowRight,
  Sparkles,
  Camera,
  Film,
  Star,
  ShieldCheck,
  Award,
  ChevronRight,
  Heart,
  Calendar,
  DollarSign,
  MapPin,
  CheckCircle2,
  Users,
  Eye,
  Check,
  Phone,
  Youtube,
  ExternalLink,
  ZoomIn,
} from 'lucide-react';

import defaultMoonlightFilms from '../../data/moonlightFilms.json';

const pressLogos = [
  { name: 'VOGUE WEDDINGS', note: 'Featured Master Directors 2025' },
  { name: "HARPER'S BAZAAR BRIDE", note: 'Cover Story & Best Studio' },
  { name: 'CONDÉ NAST TRAVELLER', note: 'Top Destination Cinematographers' },
  { name: 'WEDDING SUTRA', note: 'Excellence in Royal Wedding Cinema' },
];

// 3 Core Signature Pillars (Crystal-Clear for Couples & Families)
const servicePillars = [
  {
    id: 'wedding',
    badge: 'Core Signature',
    title: 'Royal Wedding Photography & Cinema',
    subtitle: 'Vedic Pheras • Sangeet & Haldi • Baraat & Varmala Celebrations',
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=85',
    description:
      'Unscripted candid photojournalism, multi-camera 4K Sony FX6 cinema filming, aerial drone sweeps, and timeless heirloom photo albums for your multi-day celebration.',
    highlights: [
      'Multi-Camera 4K Cinema Coverage (Sony FX6 / FX3)',
      'Unobtrusive Candid Photography & Family Heirlooms',
      '4K Aerial Drone Coverage & Same-Week Teaser Reels',
      'Handcrafted Luxury Italian Flush-Mount Photo Albums',
    ],
    primaryLink: '/portfolio/wedding',
    primaryLabel: 'Explore Wedding Gallery',
    bookLink: '/enquiry',
  },
  {
    id: 'pre-wedding',
    badge: 'Trending & Romantic',
    title: 'Cinematic Pre-Wedding Shoots',
    subtitle: 'Maheshwar Ghats • Ahilya Fort • Scenic River Boats • Heritage Lakes',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85',
    description:
      'Poetic love story films and editorial portraits in iconic destination backdrops with curated wardrobe styling, 60fps slow-motion cinema, and private sunrise boat rides.',
    highlights: [
      'Story-Driven 4K Pre-Wedding Film & Teaser',
      'Narmada River Wooden Boat & Sunrise Lighting Concept',
      'Wardrobe, Color Palette & Hair/Makeup Guidance',
      'High-Resolution Edited Digital Photos with Full Rights',
    ],
    primaryLink: '/portfolio/pre-wedding',
    primaryLabel: 'Explore Pre-Wedding Stories',
    bookLink: '/enquiry',
  },
  {
    id: 'destination',
    badge: 'All-India Travel Included',
    title: 'Destination Wedding Celebrations',
    subtitle: 'Udaipur Palaces • Jaipur Forts • Goa Beachside Sunset Pheras',
    image: 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?auto=format&fit=crop&w=1200&q=85',
    description:
      'Seamless travel production with our senior director, master cinematographers, and full cinema kits travelling anywhere in India to capture palatial destination unions.',
    highlights: [
      'Dedicated On-Location Crew with All Equipment',
      'Coverage for 2 to 4 Days of Destination Festivities',
      'Palace Architecture Framing & Night Fireworks Shoots',
      'Direct WhatsApp Senior Director Communication',
    ],
    primaryLink: '/portfolio/films',
    primaryLabel: 'Explore Destination Films',
    bookLink: '/enquiry',
  },
];

// Curated Real Wedding Photographs for Instant Showcase
const featuredGallery = [
  {
    id: 1,
    title: 'Royal Vedic Mandap Pheras',
    couple: 'Vinit & Anupma',
    category: 'Wedding',
    location: 'Palace Resort, Rajasthan',
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=85',
    displayUrl: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=2000&q=95',
  },
  {
    id: 2,
    title: 'Sunrise Narmada River Boat Romance',
    couple: 'Anant & Sonam',
    category: 'Pre-Wedding',
    location: 'Ahilya Ghats, Maheshwar',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85',
    displayUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=95',
  },
  {
    id: 3,
    title: 'Palace Courtyard Royal Union',
    couple: 'Kabir & Maya',
    category: 'Destination',
    location: 'Jehan Numa Palace, Bhopal',
    image: 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?auto=format&fit=crop&w=1200&q=85',
    displayUrl: 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?auto=format&fit=crop&w=2000&q=95',
  },
  {
    id: 4,
    title: 'Joyful Haldi Marigold Petal Shower',
    couple: 'Rohan & Kritika',
    category: 'Wedding',
    location: 'Lakefront Courtyard, Bhopal',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=85',
    displayUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=2000&q=95',
  },
  {
    id: 5,
    title: 'Seaside Sunset Couple Promenade',
    couple: 'Shubhanshu & Monika',
    category: 'Pre-Wedding',
    location: 'Marine Drive, Mumbai',
    image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=85',
    displayUrl: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=2000&q=95',
  },
  {
    id: 6,
    title: 'Royal Sandstone Archway Candid Moment',
    couple: 'Karan & Vaishali',
    category: 'Wedding',
    location: 'Ahilya Fort & Sandstone Ghats',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=85',
    displayUrl: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=2000&q=95',
  },
  {
    id: 7,
    title: 'Lake Pichola Sunset Vows',
    couple: 'Aditya & Rhea',
    category: 'Destination',
    location: 'Lake Palace, Udaipur',
    image: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=85',
    displayUrl: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=2000&q=95',
  },
  {
    id: 8,
    title: 'High-Energy Sangeet Night Performance',
    couple: 'Piyush & Priyanka',
    category: 'Wedding',
    location: 'Heritage Lawn, Central India',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=85',
    displayUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=2000&q=95',
  },
];

const Home = () => {
  const [videos, setVideos] = useState(defaultMoonlightFilms.slice(0, 4));
  const [activeVideo, setActiveVideo] = useState(null);
  const [selectedPhotoCategory, setSelectedPhotoCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // Interactive Live Budget Estimator State
  const [selectedServices, setSelectedServices] = useState(['Photography', '4K Cinema Film', 'Aerial Drone']);
  const [guestTier, setGuestTier] = useState('300-500');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const vidRes = await api.get('/videos?isFeatured=true');
        if (vidRes.data && vidRes.data.length > 0) {
          setVideos(vidRes.data);
        } else {
          setVideos(defaultMoonlightFilms.slice(0, 4));
        }
      } catch (err) {
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

  const filteredGallery = featuredGallery.filter((item) => {
    if (selectedPhotoCategory === 'All') return true;
    return item.category === selectedPhotoCategory;
  });

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
                <span className="text-[9px] sm:text-[9.5px] text-neutral-600 font-medium tracking-wider font-sans block mt-0.5">
                  {p.note}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. THE 3 CORE PILLARS: WEDDING, PRE-WEDDING & DESTINATION WEDDING */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-600/20 text-amber-800 text-xs font-mono font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>Signature Photography & Cinema</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 leading-tight">
            Crafted for Unforgettable Celebrations
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base font-normal max-w-2xl mx-auto leading-relaxed">
            Choose from our three core master collections tailored for modern Indian couples, royal palace unions, and destination celebrations across India.
          </p>
        </div>

        {/* 3-Column Clean Luxury Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {servicePillars.map((pillar) => (
            <div
              key={pillar.id}
              className="bg-white rounded-3xl overflow-hidden border border-amber-900/15 hover:border-amber-600/50 shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col justify-between group"
            >
              <div>
                {/* Image Container with Zoom & Badge */}
                <div className="relative aspect-[16/11] overflow-hidden bg-neutral-950">
                  <img
                    src={pillar.image}
                    alt={pillar.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95 group-hover:brightness-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3.5 py-1 rounded-full bg-black/80 backdrop-blur-md text-[10.5px] text-gold-300 font-mono font-bold uppercase tracking-wider border border-gold-500/40 shadow-md">
                      {pillar.badge}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 sm:p-7 space-y-4">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-neutral-900 group-hover:text-amber-800 transition-colors leading-snug">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-amber-800 font-mono font-bold mt-1 tracking-wide">
                      {pillar.subtitle}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                    {pillar.description}
                  </p>

                  {/* Bullet Highlights */}
                  <div className="pt-2 space-y-2 border-t border-amber-900/10">
                    <span className="text-[11px] font-mono uppercase font-bold text-neutral-800 block">
                      Package Inclusions:
                    </span>
                    <ul className="space-y-1.5">
                      {pillar.highlights.map((item, idx) => (
                        <li key={idx} className="flex items-start text-xs text-neutral-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 mr-2 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-6 sm:p-7 pt-0 flex items-center gap-3">
                <Link
                  to={pillar.primaryLink}
                  className="flex-1 py-3 px-4 rounded-full bg-[#FAF8F5] hover:bg-amber-100 border border-amber-900/15 text-neutral-900 font-bold text-xs uppercase tracking-wider text-center transition-all shadow-sm"
                >
                  {pillar.primaryLabel}
                </Link>
                <Link
                  to={pillar.bookLink}
                  className="py-3 px-5 rounded-full bg-gold-gradient text-neutral-950 font-extrabold text-xs uppercase tracking-wider shadow-sm hover:brightness-105 active:scale-95 transition-all text-center btn-shimmer shrink-0"
                >
                  Book Shoot
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. CURATED REAL WEDDING PHOTO SHOWCASE (WITH INSTANT CATEGORY TABS) */}
      <section className="py-16 sm:py-24 bg-[#F5EFEB] border-t border-amber-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs uppercase font-mono tracking-[0.25em] text-amber-800 font-bold block">
                Master Portfolio
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900">
                Moments Captured in Full Frame
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 font-normal">
                Explore authentic memories from palace courtyards, Maheshwar ghats, and royal Indian wedding mandaps.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center space-x-2 overflow-x-auto pb-2 sm:pb-0 custom-scrollbar">
              {['All', 'Wedding', 'Pre-Wedding', 'Destination'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedPhotoCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap ${
                    selectedPhotoCategory === cat
                      ? 'bg-gold-gradient text-neutral-950 font-extrabold shadow-sm'
                      : 'bg-white text-neutral-700 hover:text-neutral-900 border border-neutral-300 shadow-sm'
                  }`}
                >
                  {cat === 'All' ? 'All Photos' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Photo Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredGallery.map((photo, idx) => (
              <div
                key={photo.id}
                onClick={() => setLightboxIndex(idx)}
                className="group relative rounded-2xl overflow-hidden bg-white border border-amber-900/15 shadow-md hover:shadow-xl cursor-pointer transition-all aspect-[4/5] flex flex-col justify-end p-4"
              >
                <img
                  src={photo.image}
                  alt={photo.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent group-hover:via-black/20 transition-colors" />

                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-8 h-8 rounded-full bg-black/70 backdrop-blur-md text-white flex items-center justify-center border border-white/20 shadow-md">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                </div>

                <div className="relative z-10 space-y-1 text-white">
                  <span className="text-[10px] font-mono uppercase font-bold text-gold-300 tracking-wider block">
                    {photo.category} • {photo.location}
                  </span>
                  <h4 className="font-serif text-base font-bold leading-tight group-hover:text-gold-200 transition-colors">
                    {photo.title}
                  </h4>
                  <p className="text-[11px] text-neutral-300 font-sans">{photo.couple}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-4">
            <Link
              to="/portfolio"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-gold-gradient text-neutral-950 font-extrabold text-xs uppercase tracking-wider shadow-md hover:brightness-105 active:scale-95 transition-all btn-shimmer"
            >
              Explore Complete Photo Archive <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. REAL MOONLIGHT PRODUCTION 4K YOUTUBE FILMS SECTION */}
      {videos.length > 0 && (
        <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-xs uppercase font-mono tracking-[0.25em] text-amber-700 font-bold block">
              Official YouTube Cinema
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900">
              Moonlight Production 4K Films
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 font-normal">
              Every film crafted with emotional depth, custom color grades, and royal storytelling from @moonlightproductions_films.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
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
                  className="group relative rounded-3xl overflow-hidden bg-white border border-amber-900/15 hover:border-amber-600/40 cursor-pointer transition-all shadow-md hover:shadow-2xl flex flex-col justify-between"
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
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gold-gradient text-neutral-950 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Play className="w-6 h-6 fill-neutral-950 ml-0.5" />
                      </div>
                    </div>

                    {vid.duration && (
                      <span className="absolute bottom-3 right-3 px-2.5 py-0.5 rounded bg-black/80 backdrop-blur-md text-[10px] font-mono font-bold text-white flex items-center border border-white/20">
                        {vid.duration}
                      </span>
                    )}
                  </div>

                  <div className="p-5 sm:p-6 space-y-1">
                    <div className="flex items-center justify-between text-[10.5px] uppercase font-mono text-amber-800 font-bold">
                      <span>Moonlight Cinema • 4K Full Frame</span>
                      {vid.views && <span className="text-neutral-500 font-normal lowercase">{vid.views}</span>}
                    </div>
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-neutral-900 group-hover:text-amber-800 line-clamp-1 transition-colors">
                      {vid.title}
                    </h3>
                    <div className="pt-2 flex items-center text-xs text-amber-700 font-bold uppercase tracking-wider">
                      <Play className="w-3.5 h-3.5 mr-1.5" /> Click to Watch in 4K
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/portfolio/films"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3.5 rounded-full bg-gold-gradient text-neutral-950 font-extrabold text-xs uppercase tracking-wider shadow-md hover:brightness-105 active:scale-95 transition-all btn-shimmer"
            >
              Explore All 30+ 4K Wedding Films <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Link>
            <a
              href="https://www.youtube.com/@moonlightproductions_films"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-red-50 hover:bg-red-600 text-red-700 hover:text-white border border-red-500/30 text-xs font-bold uppercase tracking-wider transition-all font-mono shadow-sm"
            >
              <Youtube className="w-4 h-4 mr-1.5" /> YouTube Channel
            </a>
          </div>
        </section>
      )}

      {/* 6. INTERACTIVE 8-STEP WEDDING PLANNER ESTIMATOR */}
      <section className="py-16 sm:py-24 bg-[#FAF8F5] border-t border-amber-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden border border-amber-900/15 bg-white p-6 sm:p-12 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              {/* Left Description */}
              <div className="lg:col-span-7 space-y-4">
                <span className="px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-800 text-[10.5px] font-mono font-bold uppercase tracking-widest border border-amber-600/20 inline-block">
                  Wedding Cost Calculator & Planner
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 leading-tight">
                  Plan Your Indian Wedding Shoot in 8 Easy Steps
                </h2>
                <p className="text-xs sm:text-base text-neutral-600 leading-relaxed font-normal">
                  Calculate estimated budgets, select your palace destination, configure 4K drone cinematography, and receive a bespoke proposal with direct WhatsApp assistance.
                </p>

                <div className="pt-2">
                  <Link
                    to="/enquiry"
                    className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-gold-gradient text-neutral-950 font-extrabold text-xs uppercase tracking-wider shadow-md hover:brightness-105 active:scale-95 transition-all btn-shimmer"
                  >
                    <Calendar className="w-3.5 h-3.5 mr-2" />
                    Launch 8-Step Wedding Planner
                  </Link>
                </div>
              </div>

              {/* Right Live Calculator Card */}
              <div className="lg:col-span-5 bg-[#FAF8F5] rounded-3xl p-6 sm:p-7 border border-amber-900/15 shadow-sm space-y-5">
                <div className="flex items-center justify-between border-b border-amber-900/10 pb-3">
                  <span className="text-xs uppercase font-mono tracking-wider text-amber-800 font-bold">
                    Quick Estimate Calculator
                  </span>
                  <span className="text-[10px] text-neutral-500 font-mono">Live AI Estimate</span>
                </div>

                {/* Service Pills Selector */}
                <div className="space-y-2">
                  <label className="text-[11px] uppercase font-mono text-neutral-800 font-bold block">
                    Select Coverage Options:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {['Photography', '4K Cinema Film', 'Aerial Drone', 'Italian Album'].map((s) => {
                      const isSelected = selectedServices.includes(s);
                      return (
                        <button
                          key={s}
                          type="button"
                          onClick={() => toggleCalculatorService(s)}
                          className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all flex items-center space-x-1.5 ${
                            isSelected
                              ? 'bg-amber-100 border border-amber-600 text-amber-900 font-bold shadow-sm'
                              : 'bg-white border border-neutral-300 text-neutral-600 hover:text-neutral-900 hover:border-neutral-400'
                          }`}
                        >
                          {isSelected ? (
                            <Check className="w-3 h-3 text-amber-700 stroke-[3]" />
                          ) : (
                            <span className="w-3 h-3 block" />
                          )}
                          <span>{s}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Guest Tier */}
                <div className="space-y-2">
                  <label className="text-[11px] uppercase font-mono text-neutral-800 font-bold block">
                    Celebration Scale (Guests):
                  </label>
                  <div className="grid grid-cols-3 gap-2">
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
                    <span className="text-[10px] uppercase font-mono text-neutral-500 block">
                      Estimated Investment
                    </span>
                    <span className="font-serif text-2xl font-bold text-amber-700">
                      ₹{calculateEstimate().toLocaleString('en-IN')}
                    </span>
                  </div>

                  <Link
                    to="/enquiry"
                    className="px-4 py-2 rounded-full bg-neutral-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
                  >
                    Lock Estimate →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. WHY COUPLES CHOOSE MOONLIGHT (TRUST & EXCELLENCE) */}
      <section className="py-16 sm:py-20 bg-[#F2ECE4] border-t border-amber-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div className="p-6 bg-white rounded-3xl border border-amber-900/15 shadow-sm space-y-2">
              <span className="font-serif text-3xl sm:text-4xl font-bold text-amber-800 block">500+</span>
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900">Royal Weddings</h4>
              <p className="text-[11px] text-neutral-600">Covered across Rajasthan, MP, Goa, and pan-India.</p>
            </div>
            <div className="p-6 bg-white rounded-3xl border border-amber-900/15 shadow-sm space-y-2">
              <span className="font-serif text-3xl sm:text-4xl font-bold text-amber-800 block">Sony FX6</span>
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900">Full Frame 4K</h4>
              <p className="text-[11px] text-neutral-600">Cinema optics & DaVinci Resolve color grading.</p>
            </div>
            <div className="p-6 bg-white rounded-3xl border border-amber-900/15 shadow-sm space-y-2">
              <span className="font-serif text-3xl sm:text-4xl font-bold text-amber-800 block">72 Hours</span>
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900">Fast Teasers</h4>
              <p className="text-[11px] text-neutral-600">Social media reels & teaser delivered in 3 days.</p>
            </div>
            <div className="p-6 bg-white rounded-3xl border border-amber-900/15 shadow-sm space-y-2">
              <span className="font-serif text-3xl sm:text-4xl font-bold text-amber-800 block">100%</span>
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900">Heirloom Quality</h4>
              <p className="text-[11px] text-neutral-600">Italian leather albums & PIN-protected galleries.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. TESLA FLOATING BOTTOM STICKY ACTION BAR */}
      <TeslaStickyBar />

      {/* Video Modal Player */}
      {activeVideo && <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />}

      {/* Image Lightbox Modal */}
      {lightboxIndex !== null && (
        <Lightbox
          images={filteredGallery}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNext={() => setLightboxIndex((prev) => (prev + 1) % filteredGallery.length)}
          onPrev={() => setLightboxIndex((prev) => (prev - 1 + filteredGallery.length) % filteredGallery.length)}
          allowDownload={true}
        />
      )}
    </div>
  );
};

export default Home;
