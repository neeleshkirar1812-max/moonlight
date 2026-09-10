import React, { useState, useRef, useEffect } from 'react';
import { Music, Volume2, VolumeX, Play, Pause } from 'lucide-react';

const MusicPlayer = ({ musicUrl, theme, autoPlayTrigger }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const streamUrl =
    musicUrl ||
    'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-wedding-113828.mp3';

  // Autoplay triggered on user interaction (like door opening)
  useEffect(() => {
    if (autoPlayTrigger && audioRef.current && !isPlaying) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((e) => console.warn('[Audio AutoPlay Notice]:', e));
    }
  }, [autoPlayTrigger]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((e) => console.warn('[Audio Play Error]:', e));
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 animate-fade-in font-sans">
      <audio ref={audioRef} src={streamUrl} loop preload="auto" />

      <button
        type="button"
        onClick={togglePlay}
        className={`flex items-center space-x-2 px-3.5 py-2.5 rounded-full shadow-2xl border transition-all duration-300 ${
          isPlaying
            ? 'bg-amber-500 text-neutral-950 border-amber-300 ring-4 ring-amber-400/30 scale-105'
            : 'bg-black/70 backdrop-blur-md text-white border-white/20 hover:bg-black/90'
        }`}
        title={isPlaying ? 'Pause Background Music' : 'Play Background Music'}
      >
        <div className={`relative ${isPlaying ? 'animate-spin-slow' : ''}`}>
          <Music className="w-4 h-4" />
        </div>

        <span className="text-[11px] font-mono font-bold uppercase tracking-wider hidden xs:inline-block">
          {isPlaying ? 'Music Playing' : 'Play Music'}
        </span>

        {isPlaying ? (
          <Pause className="w-3.5 h-3.5 shrink-0" />
        ) : (
          <Play className="w-3.5 h-3.5 shrink-0 fill-current" />
        )}
      </button>
    </div>
  );
};

export default MusicPlayer;
