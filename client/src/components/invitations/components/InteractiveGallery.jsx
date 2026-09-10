import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, X, Sparkles, Image as ImageIcon } from 'lucide-react';

const defaultGalleryImages = [
  'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=80',
];

const InteractiveGallery = ({ images = [], theme }) => {
  const galleryList = images && images.length > 0 ? images : defaultGalleryImages;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryList.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + galleryList.length) % galleryList.length);
  };

  return (
    <section className="py-12 px-4 sm:px-6 max-w-xl mx-auto space-y-5 font-sans">
      <div className="text-center space-y-1.5">
        <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-amber-400 font-bold block">
          ✦ Visual Moments ✦
        </span>
        <h2
          className={`font-serif text-2xl sm:text-3xl font-bold tracking-tight bg-gradient-to-r ${theme.goldGradient} bg-clip-text text-transparent`}
        >
          Photo Gallery
        </h2>
        <div className="w-12 h-0.5 bg-amber-500/40 mx-auto" />
      </div>

      {/* Main Carousel Card */}
      <div className={`${theme.cardBg} backdrop-blur-md rounded-3xl p-4 sm:p-5 border ${theme.borderColor} shadow-xl space-y-4`}>
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-950 group">
          <img
            src={galleryList[currentIndex]}
            alt={`Memory ${currentIndex + 1}`}
            className="w-full h-full object-cover transition-all duration-500"
            loading="lazy"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

          {/* Image Counter Badge */}
          <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[11px] font-mono font-bold text-white shadow">
            {currentIndex + 1} / {galleryList.length}
          </div>

          {/* Fullscreen Button */}
          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            className="absolute top-3 right-3 p-2 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white hover:bg-black/80 transition-colors"
            title="Open Fullscreen Lightbox"
          >
            <Maximize2 className="w-4 h-4" />
          </button>

          {/* Left / Right Nav Arrows */}
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white hover:bg-black/80 transition-all shadow"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white hover:bg-black/80 transition-all shadow"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Thumbnail Strip */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
          {galleryList.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              className={`relative shrink-0 w-14 h-14 rounded-xl overflow-hidden border-2 transition-all ${
                currentIndex === idx
                  ? 'border-amber-400 scale-105 shadow-md ring-2 ring-amber-400/40'
                  : 'border-white/20 opacity-60 hover:opacity-100'
              }`}
            >
              <img src={img} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-between p-4 sm:p-8 animate-fade-in">
          <div className="w-full flex justify-between items-center text-white px-2">
            <span className="font-mono text-xs text-amber-400">
              Moment {currentIndex + 1} of {galleryList.length}
            </span>
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="relative max-w-3xl w-full max-h-[75vh] flex items-center justify-center my-auto">
            <img
              src={galleryList[currentIndex]}
              alt="Fullscreen memory"
              className="max-w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl"
            />

            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-2 p-3 rounded-full bg-black/60 border border-white/20 text-white hover:bg-black transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="absolute right-2 p-3 rounded-full bg-black/60 border border-white/20 text-white hover:bg-black transition-all"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          <div className="text-[11px] font-mono text-neutral-400">
            Swipe or use arrows to browse • Tap X to close
          </div>
        </div>
      )}
    </section>
  );
};

export default InteractiveGallery;
