import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Calendar, Phone, Sparkles, MapPin } from 'lucide-react';

const slides = [
  {
    id: 1,
    title: 'Royal Indian Weddings',
    subtitle: 'Sacred Vedic Pheras, Sangeet Nights & Palace Baraat',
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
    title: 'Destination Commissions',
    subtitle: 'Goa Sunset Beach, Rajasthan Forts & Heritage Resorts',
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
      className="relative w-full h-[100dvh] min-h-[520px] max-h-[1080px] bg-black overflow-hidden flex flex-col justify-between select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Image Carousel */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover object-center filter brightness-[0.72] contrast-[1.08]"
            />
            {/* Top & Bottom Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/60" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Top Floating Badge */}
      <div className="relative z-10 pt-20 sm:pt-28 text-center px-4">
        <motion.div
          key={`badge-${slide.id}`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-black/60 border border-gold-400/50 backdrop-blur-md text-[9.5px] sm:text-[11px] font-mono uppercase tracking-[0.18em] text-gold-300 shadow-xl"
        >
          <Sparkles className="w-3 h-3 text-gold-400 shrink-0" />
          <span>Moonlight Production • India</span>
        </motion.div>
      </div>

      {/* Center-Aligned Tesla-Grade Hero Typography & Dual Action Buttons */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto space-y-3 sm:space-y-5 pb-16 sm:pb-24">
        {/* Slide Title & Subtitle */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`content-${slide.id}`}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.6 }}
            className="space-y-1.5 sm:space-y-3"
          >
            <h1 className="font-serif text-3xl sm:text-5xl md:text-7xl font-black text-white tracking-tight drop-shadow-2xl leading-tight">
              {slide.title}
            </h1>
            <p className="text-xs sm:text-base md:text-lg text-neutral-100 font-medium tracking-wide max-w-xl mx-auto drop-shadow-md line-clamp-2">
              {slide.subtitle}
            </p>
            <p className="text-[10px] sm:text-xs text-gold-300 font-mono tracking-widest uppercase flex items-center justify-center">
              <MapPin className="w-3 h-3 mr-1 text-gold-400 shrink-0" />
              <span className="truncate max-w-[280px] sm:max-w-none">{slide.location}</span>
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Dual Action Buttons (Side-by-Side on Mobile and Desktop) */}
        <div className="flex flex-row items-center justify-center gap-2 sm:gap-3.5 pt-2 max-w-md mx-auto w-full px-2">
          {/* Primary CTA */}
          {slide.primaryCta.external ? (
            <a
              href={slide.primaryCta.external}
              target="_blank"
              rel="noreferrer"
              className="flex-1 py-2.5 sm:py-3.5 px-3 sm:px-6 rounded-full bg-gold-gradient text-black font-black text-[10px] sm:text-xs uppercase tracking-wider shadow-gold-subtle active:scale-95 transition-all text-center truncate btn-shimmer"
            >
              {slide.primaryCta.label}
            </a>
          ) : (
            <Link
              to={slide.primaryCta.path}
              className="flex-1 py-2.5 sm:py-3.5 px-3 sm:px-6 rounded-full bg-gold-gradient text-black font-black text-[10px] sm:text-xs uppercase tracking-wider shadow-gold-subtle active:scale-95 transition-all text-center truncate btn-shimmer"
            >
              {slide.primaryCta.label}
            </Link>
          )}

          {/* Secondary CTA */}
          {slide.secondaryCta.external ? (
            <a
              href={slide.secondaryCta.external}
              target="_blank"
              rel="noreferrer"
              className="flex-1 py-2.5 sm:py-3.5 px-3 sm:px-6 rounded-full bg-white/20 hover:bg-white/30 border border-white/40 text-white font-bold text-[10px] sm:text-xs uppercase tracking-wider backdrop-blur-xl active:scale-95 transition-all text-center truncate"
            >
              {slide.secondaryCta.label}
            </a>
          ) : (
            <Link
              to={slide.secondaryCta.path}
              className="flex-1 py-2.5 sm:py-3.5 px-3 sm:px-6 rounded-full bg-white/20 hover:bg-white/30 border border-white/40 text-white font-bold text-[10px] sm:text-xs uppercase tracking-wider backdrop-blur-xl active:scale-95 transition-all text-center truncate"
            >
              {slide.secondaryCta.label}
            </Link>
          )}
        </div>

        {/* Quick 1-Click 4K Video Preview Modal Button */}
        {onPlayVideo && slide.videoModalId && (
          <div className="pt-1">
            <button
              onClick={() => onPlayVideo(slide.videoModalId, slide.title)}
              className="inline-flex items-center text-[10.5px] sm:text-xs text-gold-300 hover:text-white font-mono tracking-wider transition-colors"
            >
              <Play className="w-3 h-3 mr-1 fill-gold-400 text-gold-400" />
              Watch Sample 4K Teaser Film
            </button>
          </div>
        )}
      </div>

      {/* Desktop Left/Right Navigation Chevrons */}
      <button
        onClick={prevSlide}
        aria-label="Previous Slide"
        className="hidden md:flex absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-black/80 border border-white/20 text-white items-center justify-center backdrop-blur-md hover:scale-110 active:scale-95 transition-all shadow-2xl group"
      >
        <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next Slide"
        className="hidden md:flex absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-black/80 border border-white/20 text-white items-center justify-center backdrop-blur-md hover:scale-110 active:scale-95 transition-all shadow-2xl group"
      >
        <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
      </button>

      {/* Bottom Pagination Dots (Tesla Style) */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center space-x-2">
        {slides.map((s, index) => (
          <button
            key={s.id}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`transition-all duration-300 rounded-full ${
              currentSlide === index
                ? 'w-6 sm:w-8 h-1.5 sm:h-2 bg-gold-400 shadow-gold-subtle'
                : 'w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default TeslaHeroSlider;
