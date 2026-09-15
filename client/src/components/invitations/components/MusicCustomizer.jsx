import React, { useState, useRef, useEffect } from 'react';
import {
  Music,
  Play,
  Pause,
  Upload,
  Sparkles,
  Check,
  Volume2,
  VolumeX,
  Radio,
  FileAudio,
  Trash2,
  Link2,
} from 'lucide-react';
import { musicPresets } from '../../../data/musicPresets';
import api from '../../../api/client';
import { useNotification } from '../../../context/NotificationContext';

const MusicCustomizer = ({
  currentMusicUrl = '',
  currentMusicTitle = '',
  musicEnabled = true,
  onChange = () => {},
  isAdmin = false,
}) => {
  const { addToast } = useNotification();
  const [playingId, setPlayingId] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [customAudioName, setCustomAudioName] = useState(
    currentMusicTitle && !musicPresets.some((p) => p.url === currentMusicUrl)
      ? currentMusicTitle
      : ''
  );
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [manualUrl, setManualUrl] = useState(currentMusicUrl || '');

  const previewAudioRef = useRef(null);

  // Stop preview audio when component unmounts
  useEffect(() => {
    return () => {
      if (previewAudioRef.current) {
        previewAudioRef.current.pause();
      }
    };
  }, []);

  const handlePlayPreview = (id, url) => {
    if (!previewAudioRef.current) return;

    if (playingId === id) {
      previewAudioRef.current.pause();
      setPlayingId(null);
    } else {
      previewAudioRef.current.src = url;
      previewAudioRef.current
        .play()
        .then(() => setPlayingId(id))
        .catch((err) => {
          console.log('Audio preview error:', err);
          addToast({
            title: 'Audio Preview',
            message: 'Click again to play sample audio.',
            type: 'info',
          });
        });
    }
  };

  const handleSelectPreset = (preset) => {
    onChange({
      music_url: preset.url,
      musicUrl: preset.url,
      music_title: preset.title,
      musicTitle: preset.title,
      music_enabled: true,
      musicEnabled: true,
    });
    setCustomAudioName('');
    addToast({
      title: 'Music Selected 🎵',
      message: `Selected "${preset.title}" for your invitation.`,
      type: 'success',
    });
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate audio file
    if (!file.type.startsWith('audio/') && !file.name.match(/\.(mp3|wav|m4a|aac|ogg)$/i)) {
      addToast({
        title: 'Invalid File',
        message: 'Please upload an audio file (MP3, WAV, M4A, AAC).',
        type: 'error',
      });
      return;
    }

    // Size limit check (max 15MB)
    if (file.size > 15 * 1024 * 1024) {
      addToast({
        title: 'File Too Large',
        message: 'Audio file must be under 15MB.',
        type: 'error',
      });
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', 'moonlight/invitation-audio');

    try {
      const res = await api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const audioUrl = res.data?.url || res.data?.secure_url || res.data?.data?.url;

      if (audioUrl) {
        const cleanName = file.name.replace(/\.[^/.]+$/, '');
        setCustomAudioName(cleanName);
        onChange({
          music_url: audioUrl,
          musicUrl: audioUrl,
          music_title: cleanName,
          musicTitle: cleanName,
          music_enabled: true,
          musicEnabled: true,
        });

        addToast({
          title: 'Custom Audio Uploaded! 🎶',
          message: `"${cleanName}" is now set as your background soundtrack.`,
          type: 'success',
        });
      }
    } catch (err) {
      // If server upload not configured, create a high-performance local blob/data preview for client
      const reader = new FileReader();
      reader.onload = () => {
        const localUrl = reader.result;
        const cleanName = file.name.replace(/\.[^/.]+$/, '');
        setCustomAudioName(cleanName);
        onChange({
          music_url: localUrl,
          musicUrl: localUrl,
          music_title: cleanName,
          musicTitle: cleanName,
          music_enabled: true,
          musicEnabled: true,
        });

        addToast({
          title: 'Custom Audio Ready! 🎶',
          message: `"${cleanName}" has been set for your invitation.`,
          type: 'success',
        });
      };
      reader.readAsDataURL(file);
    } finally {
      setUploading(false);
    }
  };

  const handleManualUrlSubmit = (e) => {
    e.preventDefault();
    if (!manualUrl.trim()) return;

    onChange({
      music_url: manualUrl.trim(),
      musicUrl: manualUrl.trim(),
      music_title: 'Custom Audio Link',
      musicTitle: 'Custom Audio Link',
      music_enabled: true,
      musicEnabled: true,
    });

    setCustomAudioName('Custom Web Audio');
    addToast({
      title: 'Audio URL Set',
      message: 'Custom audio stream URL updated successfully.',
      type: 'success',
    });
  };

  const isCustomTrack =
    Boolean(currentMusicUrl) &&
    !musicPresets.some((p) => p.url === currentMusicUrl);

  return (
    <div className="space-y-4 pt-2">
      {/* Hidden Audio Element for Samples */}
      <audio
        ref={previewAudioRef}
        onEnded={() => setPlayingId(null)}
        onError={() => setPlayingId(null)}
      />

      {/* Header & Main Toggle */}
      <div className="flex items-center justify-between border-b border-amber-900/10 pb-2.5">
        <div className="flex items-center space-x-2">
          <div className="w-7 h-7 rounded-lg bg-amber-100 flex items-center justify-center text-amber-800">
            <Music className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-serif text-base font-bold text-neutral-900">
              Background Sound & Royal Music
            </h3>
            <p className="text-[11px] text-neutral-500 font-sans">
              Choose from curated royal melodies or upload your own song
            </p>
          </div>
        </div>

        {/* Master Toggle */}
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={musicEnabled !== false}
            onChange={(e) => {
              onChange({
                music_enabled: e.target.checked,
                musicEnabled: e.target.checked,
              });
            }}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-stone-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
        </label>
      </div>

      {musicEnabled !== false && (
        <div className="space-y-4 animate-fade-in">
          {/* Active Track Highlight Banner */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-100/60 border border-amber-300/80 shadow-xs flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-md">
                <Music className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <span className="text-[9px] uppercase font-mono font-bold text-amber-900 tracking-widest block">
                  Active Invitation Audio
                </span>
                <h4 className="font-serif text-sm font-bold text-neutral-900">
                  {currentMusicTitle || (isCustomTrack ? 'Custom Uploaded Soundtrack' : musicPresets[0].title)}
                </h4>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() =>
                  handlePlayPreview('active', currentMusicUrl || musicPresets[0].url)
                }
                className="px-3 py-1.5 rounded-xl bg-amber-900 hover:bg-amber-950 text-white text-xs font-bold flex items-center space-x-1.5 shadow-sm transition-all cursor-pointer"
              >
                {playingId === 'active' ? (
                  <>
                    <Pause className="w-3.5 h-3.5" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5" />
                    <span>Listen</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* ========================================================= */}
          {/* 1. CURATED ROYAL SOUNDTRACK PRESETS */}
          {/* ========================================================= */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Curated Royal Soundtracks
              </span>
              <span className="text-[10px] text-neutral-400 font-mono">1-Click Select</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {musicPresets.map((preset) => {
                const isSelected =
                  currentMusicUrl === preset.url ||
                  (!currentMusicUrl && preset.id === 'rajputana-shehnai');
                const isPlaying = playingId === preset.id;

                return (
                  <div
                    key={preset.id}
                    className={`p-3 rounded-2xl border transition-all flex items-center justify-between text-left cursor-pointer ${
                      isSelected
                        ? 'bg-amber-500/10 border-amber-500 shadow-sm ring-1 ring-amber-400/50'
                        : 'bg-white border-stone-200 hover:border-amber-300 hover:bg-amber-50/30'
                    }`}
                    onClick={() => handleSelectPreset(preset)}
                  >
                    <div className="flex items-center space-x-2.5 overflow-hidden">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePlayPreview(preset.id, preset.url);
                        }}
                        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform active:scale-90 cursor-pointer ${
                          isPlaying
                            ? 'bg-amber-600 text-white shadow-md'
                            : 'bg-amber-100 text-amber-900 hover:bg-amber-200'
                        }`}
                        title={isPlaying ? 'Pause' : 'Play Preview'}
                      >
                        {isPlaying ? (
                          <Pause className="w-3.5 h-3.5" />
                        ) : (
                          <Play className="w-3.5 h-3.5 ml-0.5" />
                        )}
                      </button>

                      <div className="truncate">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-neutral-900 truncate">
                            {preset.title}
                          </span>
                        </div>
                        <p className="text-[10px] text-neutral-500 truncate">
                          {preset.subtitle} • {preset.duration}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 ml-2">
                      {isSelected ? (
                        <div className="w-5 h-5 rounded-full bg-amber-600 text-white flex items-center justify-center shadow-xs">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      ) : (
                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-stone-100 text-stone-600 font-mono font-medium">
                          {preset.tag.split(' ')[0]}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ========================================================= */}
          {/* 2. CUSTOM AUDIO UPLOAD & EXTERNAL URL */}
          {/* ========================================================= */}
          <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-dashed border-stone-300 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h5 className="font-serif text-xs font-bold text-neutral-900 flex items-center gap-1.5">
                  <FileAudio className="w-3.5 h-3.5 text-amber-700" />
                  Custom Audio Upload (MP3 / WAV / M4A)
                </h5>
                <p className="text-[11px] text-neutral-500">
                  Upload your favourite song, voice note, or background track
                </p>
              </div>

              <label className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold text-xs uppercase tracking-wider shadow-sm flex items-center justify-center space-x-1.5 transition-all cursor-pointer">
                <Upload className="w-3.5 h-3.5" />
                <span>{uploading ? 'Uploading...' : 'Upload Audio File'}</span>
                <input
                  type="file"
                  accept="audio/*,.mp3,.wav,.m4a,.aac,.ogg"
                  className="hidden"
                  disabled={uploading}
                  onChange={handleFileUpload}
                />
              </label>
            </div>

            {/* Custom Track Status */}
            {isCustomTrack && (
              <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs text-emerald-900">
                <div className="flex items-center space-x-2 truncate">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-medium truncate">
                    Custom track active: <strong>{currentMusicTitle || 'Custom Audio'}</strong>
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleSelectPreset(musicPresets[0])}
                  className="text-stone-400 hover:text-red-500 p-1 cursor-pointer"
                  title="Reset to Royal Default Preset"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Direct URL Toggle */}
            <div className="pt-1">
              <button
                type="button"
                onClick={() => setShowUrlInput(!showUrlInput)}
                className="text-[11px] font-mono font-bold text-amber-800 hover:text-amber-950 flex items-center gap-1 cursor-pointer"
              >
                <Link2 className="w-3 h-3" />
                <span>{showUrlInput ? 'Hide MP3 Link Field' : 'Or paste a direct MP3 / Audio Link'}</span>
              </button>

              {showUrlInput && (
                <form onSubmit={handleManualUrlSubmit} className="mt-2 flex gap-2">
                  <input
                    type="url"
                    value={manualUrl}
                    onChange={(e) => setManualUrl(e.target.value)}
                    placeholder="https://example.com/soundtrack.mp3"
                    className="flex-1 bg-white border border-stone-300 rounded-xl px-3 py-1.5 text-xs text-neutral-900 focus:border-amber-600 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-1.5 rounded-xl bg-amber-900 hover:bg-amber-950 text-white font-bold text-xs uppercase tracking-wider cursor-pointer"
                  >
                    Apply URL
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MusicCustomizer;
