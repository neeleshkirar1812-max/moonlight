import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Calendar, Phone, Sparkles, MapPin, Eye } from 'lucide-react';

const slides = [
  {
    id: 1,
    title: 'Royal Indian Weddings',
    subtitle: 'Sacred Vedic Pheras, Sangeet Nights & Grand Palace Baraat',
    location: 'Udaipur, Jaipur & Central India',
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=2000&q=90',
    primaryCta: { label: 'Plan Wedding Shoot', path: '/enquiry' },
    secondaryCta: { label: 'Explore Archives', path: '/portfolio/wedding' },
    videoModalId: 'ZXgYOwwY0yY',
  },
  {
    id: 2,
    title: 'Cinematic Pre-Wedding',
    subtitle: 'Maheshwar Ghats, Bhopal Heritage & Mumbai Seasides',
    location: 'Ahilya Fort, Narmada Ghats & Marine Drive',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=90',
    primaryCta: { label: 'Book Pre-Wedding', path: '/enquiry' },
    secondaryCta: { label: 'Watch 4K Teasers', path: '/portfolio/films' },
    videoModalId: 'MjxoZ8h01go',
  },
  {
    id: 3,
    title: '4K Cinema Feature Films',
    subtitle: 'Mastercrafted Motion Pictures from @moonlightproductions_films',
    location: 'Shot on 4K Full-Frame Cinema Systems',
    image: 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?auto=format&fit=crop&w=2000&q=90',
    primaryCta: { label: 'Watch 30+ 4K Films', path: '/portfolio/films' },
    secondaryCta: { label: 'YouTube Channel', external: 'https://www.youtube.com/@moonlightproductions_films' },
    videoModalId: 'FsCXOQJihF0',
  },
  {
    id: 4,
    title: 'Destination Wedding Commissions',
    subtitle: 'Goa Sunset Beach, Rajasthan Forts & Heritage Resorts Across India',
    location: 'All-India Travel & Production Crew Included',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=2000&q=90',
    primaryCta: { label: 'View Pricing Tiers', path: '/services' },
    secondaryCta: { label: 'WhatsApp Concierge', external: 'https://api.whatsapp.com/send?phone=919229229323' },
    videoModalId: 'fdPTAJ9MzyU',
  },
];

const TeslaHeroSlider = ({ onPlayVideo }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const slide = slides[currentSlide];

  return (
    <div
      className="relative w-full h-screen min-h-[640px] max-h-[1080px] bg-black overflow-hidden flex flex-col justify-between select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Image Carousel with Smooth Fade Transitions */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: 'easeOut' }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover object-center filter brightness-[0.72] contrast-[1.08]"
            />
            {/* Top & Bottom Cinematic Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/60" />
            <div className="absolute inset-0 bg-radial-vignette opacity-50" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Top Floating Badge */}
      <div className="relative z-10 pt-28 sm:pt-32 text-center">
        <motion.div
          key={`badge-${slide.id}`}
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-black/50 border border-gold-500/40 backdrop-blur-md text-[11px] font-mono uppercase tracking-[0.2em] text-gold-300 shadow-xl"
        >
          <Sparkles className="w-3.5 h-3.5 text-gold-400" />
          <span>Moonlight Production • India</span>
        </motion.div>
      </div>

      {/* Center-Aligned Tesla-Grade Hero Typography & Dual Action Buttons */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto space-y-6 pb-20 sm:pb-24">
        {/* Slide Title & Subtitle */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`content-${slide.id}`}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.7 }}
            className="space-y-3"
          >
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight drop-shadow-2xl">
              {slide.title}
            </h1>
            <p className="text-sm sm:text-lg md:text-xl text-neutral-200 font-light tracking-wide max-w-2xl mx-auto drop-shadow-md">
              {slide.subtitle}
            </p>
            <p className="text-xs text-gold-400 font-mono tracking-widest uppercase flex items-center justify-center">
              <MapPin className="w-3 h-3 mr-1" />
              {slide.location}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Dual Side-by-Side Action Buttons (Tesla Aesthetic) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4 max-w-md mx-auto">
          {/* Primary CTA (Bold Blue / Gold Solid Pill) */}
          {slide.primaryCta.external ? (
            <a
              href={slide.primaryCta.external}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-1/2 py-3.5 px-6 rounded-full bg-gold-gradient text-black font-bold text-xs uppercase tracking-widest shadow-gold-subtle hover:brightness-110 active:scale-95 transition-all text-center btn-shimmer"
            >
              {slide.primaryCta.label}
            </a>
          ) : (
            <Link
              to={slide.primaryCta.path}
              className="w-full sm:w-1/2 py-3.5 px-6 rounded-full bg-gold-gradient text-black font-bold text-xs uppercase tracking-widest shadow-gold-subtle hover:brightness-110 active:scale-95 transition-all text-center btn-shimmer"
            >
              {slide.primaryCta.label}
            </Link>
          )}

          {/* Secondary CTA (Frosted White / Glass Pill) */}
          {slide.secondaryCta.external ? (
            <a
              href={slide.secondaryCta.external}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-1/2 py-3.5 px-6 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 text-white font-semibold text-xs uppercase tracking-widest backdrop-blur-xl active:scale-95 transition-all text-center"
            >
              {slide.secondaryCta.label}
            </a>
          ) : (
            <Link
              to={slide.secondaryCta.path}
              className="w-full sm:w-1/2 py-3.5 px-6 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 text-white font-semibold text-xs uppercase tracking-widest backdrop-blur-xl active:scale-95 transition-all text-center"
            >
              {slide.secondaryCta.label}
            </Link>
          )}
        </div>

        {/* Quick 1-Click 4K Video Preview Modal Button */}
        {onPlayVideo && slide.videoModalId && (
          <div className="pt-2">
            <button
              onClick={() => onPlayVideo(slide.videoModalId, slide.title)}
              className="inline-flex items-center text-xs text-gold-300 hover:text-white font-mono tracking-wider transition-colors"
            >
              <Play className="w-3.5 h-3.5 mr-1 fill-gold-400 text-gold-400" />
              Watch Sample 4K Teaser Film
            </button>
          </div>
        )}
      </div>

      {/* Left Navigation Chevron Button */}
      <button
        onClick={prevSlide}
        aria-label="Previous Slide"
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-black/80 border border-white/15 text-white flex items-center justify-center backdrop-blur-md hover:scale-110 active:scale-95 transition-all shadow-2xl group"
      >
        <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
      </button>

      {/* Right Navigation Chevron Button */}
      <button
        onClick={nextSlide}
        aria-label="Next Slide"
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-black/80 border border-white/15 text-white flex items-center justify-center backdrop-blur-md hover:scale-110 active:scale-95 transition-all shadow-2xl group"
      >
        <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
      </button>

      {/* Bottom Pagination Dots (Tesla Style) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center space-x-2.5">
        {slides.map((s, index) => (
          <button
            key={s.id}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`transition-all duration-300 rounded-full ${
              currentSlide === index
                ? 'w-8 h-2 bg-gold-400 shadow-gold-subtle'
                : 'w-2 h-2 bg-white/40 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default TeslaHeroSlider;
