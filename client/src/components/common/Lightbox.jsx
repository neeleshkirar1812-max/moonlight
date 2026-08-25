import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Download, Heart, ZoomIn, Share2 } from 'lucide-react';

const Lightbox = ({
  images,
  currentIndex,
  onClose,
  onNext,
  onPrev,
  onToggleFavorite,
  isFavorite = false,
  allowDownload = true,
}) => {
  const currentImage = images[currentIndex];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrev]);

  if (!currentImage) return null;

  const imageUrl = currentImage.displayUrl || currentImage.url;

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 md:p-8 animate-fade-in">
      {/* Top Controls Bar */}
      <div className="flex items-center justify-between z-10">
        <div className="text-xs tracking-widest text-neutral-400 uppercase font-sans">
          {currentIndex + 1} / {images.length} • {currentImage.title || currentImage.caption || 'Master Photograph'}
        </div>

        <div className="flex items-center space-x-3 text-white">
          {onToggleFavorite && (
            <button
              onClick={() => onToggleFavorite(currentImage._id || currentImage.id)}
              className={`p-2.5 rounded-full border transition-all ${
                isFavorite
                  ? 'bg-red-500/20 border-red-500 text-red-500'
                  : 'bg-obsidian-200 border-white/20 hover:border-gold-400 hover:text-gold-400'
              }`}
              title="Add to Favorites"
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500' : ''}`} />
            </button>
          )}

          {allowDownload && (
            <a
              href={imageUrl}
              target="_blank"
              rel="noreferrer"
              download
              className="p-2.5 rounded-full bg-obsidian-200 border border-white/20 hover:border-gold-400 hover:text-gold-400 transition-all text-neutral-300"
              title="Download Master Image"
            >
              <Download className="w-4 h-4" />
            </a>
          )}

          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-obsidian-200 border border-white/20 hover:border-gold-400 hover:text-gold-400 transition-all text-neutral-300"
            title="Close Lightbox"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Image Stage */}
      <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden select-none">
        <img
          src={imageUrl}
          alt={currentImage.caption || currentImage.title || 'Lumiere Master Photograph'}
          className="max-h-[82vh] max-w-[92vw] object-contain rounded shadow-2xl transition-all duration-300"
        />

        {/* Previous Button */}
        {images.length > 1 && (
          <button
            onClick={onPrev}
            className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-obsidian/70 border border-white/20 text-white hover:border-gold-400 hover:text-gold-400 transition-all backdrop-blur-md"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Next Button */}
        {images.length > 1 && (
          <button
            onClick={onNext}
            className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-obsidian/70 border border-white/20 text-white hover:border-gold-400 hover:text-gold-400 transition-all backdrop-blur-md"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Caption & Metadata Footer */}
      <div className="text-center text-xs text-neutral-400 font-sans tracking-wide">
        {currentImage.caption && <p className="text-sm font-serif text-neutral-200 italic mb-1">"{currentImage.caption}"</p>}
        {currentImage.dimensions && <span>{currentImage.dimensions.width} × {currentImage.dimensions.height}px</span>}
        {currentImage.section && <span className="ml-3 px-2 py-0.5 rounded bg-gold-500/20 text-gold-300 border border-gold-500/30 text-[10px]">{currentImage.section}</span>}
      </div>
    </div>
  );
};

export default Lightbox;
