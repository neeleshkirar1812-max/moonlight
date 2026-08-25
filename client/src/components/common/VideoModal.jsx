import React, { useEffect } from 'react';
import { X } from 'lucide-react';

const VideoModal = ({ video, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!video) return null;

  const videoId = video.youtubeVideoId || video.youtubeUrl?.split('v=')[1]?.substring(0, 11) || 'dQw4w9WgXcQ';

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-8 animate-fade-in">
      <div className="relative w-full max-w-5xl bg-obsidian-400 border border-gold-500/30 rounded-2xl overflow-hidden shadow-2xl">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-obsidian-600">
          <div>
            <h3 className="font-serif text-lg text-white font-semibold">{video.title}</h3>
            <p className="text-xs text-gold-400 font-sans tracking-wider">{video.clientNames} • {video.category}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-obsidian-200 border border-white/15 text-neutral-300 hover:text-gold-400 hover:border-gold-400 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 16:9 Video Player */}
        <div className="relative pt-[56.25%] bg-black">
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Description */}
        {video.description && (
          <div className="p-6 text-sm text-neutral-300 leading-relaxed bg-obsidian-500">
            <p>{video.description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoModal;
