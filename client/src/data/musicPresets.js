// =========================================================================
// 🎵 MASTER ROYAL MUSIC & AUDIO PRESETS FOR DIGITAL INVITATIONS
// =========================================================================

export const musicPresets = [
  {
    id: 'rajputana-shehnai',
    title: 'Royal Rajputana Shehnai & Nagada',
    subtitle: 'Grand Traditional Palace Entrance',
    genre: 'Traditional & Shehnai',
    tag: '👑 Most Popular',
    duration: '2:45',
    url: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-wedding-113828.mp3',
    icon: '🎺',
  },
  {
    id: 'vedic-mangalashtak',
    title: 'Vedic Pheras & Flute Melodies',
    subtitle: 'Sacred Mantras & Divine Bansuri',
    genre: 'Vedic & Classical',
    tag: '✨ Auspicious',
    duration: '3:12',
    url: 'https://cdn.pixabay.com/download/audio/2022/11/06/audio_c505307567.mp3?filename=indian-traditional-background-125866.mp3',
    icon: '🪈',
  },
  {
    id: 'kudmayi-sitar',
    title: 'Kudmayi Sitar & Acoustic Strings',
    subtitle: 'Soulful Modern Royal Romance',
    genre: 'Sitar & Acoustic',
    tag: '💖 Romantic',
    duration: '2:30',
    url: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=calm-acoustic-guitar-10360.mp3',
    icon: '🪕',
  },
  {
    id: 'palace-piano-violin',
    title: 'Imperial Palace Piano & Symphony',
    subtitle: 'Grand Ballroom Western Elegance',
    genre: 'Piano & Strings',
    tag: '🎹 Luxury Elegance',
    duration: '2:15',
    url: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=piano-moment-9835.mp3',
    icon: '🎻',
  },
  {
    id: 'sufi-celestial',
    title: 'Sufi Serenade & Celestial Harmonium',
    subtitle: 'Poetic Devotion & Warm Echoes',
    genre: 'Sufi & Fusion',
    tag: '🕊️ Soulful',
    duration: '2:50',
    url: 'https://cdn.pixabay.com/download/audio/2021/09/06/audio_9bc5740fcb.mp3?filename=ambient-piano-amp-strings-10711.mp3',
    icon: '🌙',
  },
  {
    id: 'rose-gold-blush',
    title: 'Rose Gold Blush Acoustic Waltz',
    subtitle: 'Soft Ambient Champagne Love',
    genre: 'Ambient Romance',
    tag: '🌸 Sweet Love',
    duration: '2:20',
    url: 'https://cdn.pixabay.com/download/audio/2022/02/10/audio_fc84f70622.mp3?filename=emotional-piano-melody-20898.mp3',
    icon: '🌹',
  },
];

export const getMusicPresetById = (id) => {
  return musicPresets.find((m) => m.id === id) || musicPresets[0];
};

export const getMusicPresetByUrl = (url) => {
  if (!url) return musicPresets[0];
  return musicPresets.find((m) => m.url === url) || null;
};
