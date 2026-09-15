import React, { useState, useEffect, useRef } from 'react';
import {
  Heart,
  ChevronDown,
  Volume2,
  VolumeX,
  Share2,
  QrCode,
  Copy,
  Check,
  X,
  Crown,
  Sparkles,
} from 'lucide-react';
import ZareqiaBody, { DamaskPattern } from './ZareqiaBody';

// =========================================================================
// 10 DISTINCT ROYAL SUITE THEME CONFIGURATIONS (Exact 1:1 Zareqia Mapping)
// =========================================================================
export const zareqiaRoyalThemes = {
  'rose-gold-blush-royal': {
    id: 'rose-gold-blush-royal',
    name: 'Royal Imperial',
    subtitle: 'Warm Gold & Champagne Rose',
    video: '/videos/rose-gold-blush.mp4',
    cssVars: {
      '--primary': '15 38% 38%',
      '--primary-foreground': '20 30% 97%',
      '--background': '24 40% 96%',
      '--foreground': '18 25% 18%',
      '--card': '24 45% 94%',
      '--card-foreground': '18 25% 18%',
      '--muted-foreground': '18 18% 42%',
      '--cream': '24 40% 92%',
      '--gold': '15 42% 48%',
      '--gold-light': '18 45% 78%',
      '--border': '20 25% 82%',
      '--font-calligraphy': "'Dancing Script', cursive",
    },
    textColor: '#18120e',
    accentColor: '#b87a5e',
    background: 'hsl(24, 40%, 96%)',
    welcomeGradient: 'linear-gradient(to bottom, #564A42 0%, #7A6A5F 45%, #C7B6A8 78%, #F3E9E2 100%)',
    fontStyle: 'dancing',
    scratch: {
      gradStart: '#f7d3c5',
      gradMid: '#c47a6c',
      gradEnd: '#7a3e35',
      textColor: '#ffffff',
      accent: '#b87a5e',
    },
    musicPreset: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-wedding-113828.mp3',
  },
  'royal-majesty': {
    id: 'royal-majesty',
    name: 'Royal Majesty',
    subtitle: 'Porcelain Blue Ballroom & Silver Crystal',
    video: '/videos/royal-majesty.mp4',
    cssVars: {
      '--primary': '215 45% 38%',
      '--primary-foreground': '210 50% 98%',
      '--background': '208 40% 97%',
      '--foreground': '215 35% 20%',
      '--card': '208 45% 95%',
      '--card-foreground': '215 35% 20%',
      '--muted-foreground': '214 18% 42%',
      '--cream': '208 40% 94%',
      '--gold': '214 40% 48%',
      '--gold-light': '210 45% 80%',
      '--border': '210 28% 84%',
      '--font-calligraphy': "'Dancing Script', cursive",
    },
    textColor: '#141e2b',
    accentColor: '#0284c7',
    background: 'hsl(208, 40%, 97%)',
    welcomeGradient: 'linear-gradient(to bottom, #2c425c 0%, #466385 45%, #9cb2c9 78%, #EEF3F8 100%)',
    fontStyle: 'dancing',
    scratch: {
      gradStart: '#bae6fd',
      gradMid: '#0284c7',
      gradEnd: '#082f49',
      textColor: '#ffffff',
      accent: '#38bdf8',
    },
    musicPreset: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=piano-moment-9835.mp3',
  },
  'royal-elegance-royal': {
    id: 'royal-elegance-royal',
    name: 'Royal Elegance',
    subtitle: 'Crimson Velvet & Antique Gold Palace',
    video: '/videos/royal-elegance-royal.mp4',
    cssVars: {
      '--primary': '0 65% 42%',
      '--primary-foreground': '0 0% 100%',
      '--background': '36 42% 94%',
      '--foreground': '24 30% 14%',
      '--card': '36 40% 92%',
      '--card-foreground': '24 30% 14%',
      '--muted-foreground': '0 20% 40%',
      '--cream': '36 40% 90%',
      '--gold': '45 70% 50%',
      '--gold-light': '45 55% 65%',
      '--border': '0 30% 80%',
      '--font-calligraphy': "'Dancing Script', cursive",
    },
    textColor: '#241414',
    accentColor: '#b91c1c',
    background: 'hsl(36, 42%, 94%)',
    welcomeGradient: 'linear-gradient(to bottom, #540909 0%, #7A1212 45%, #c77b7b 78%, #FAF5EE 100%)',
    fontStyle: 'dancing',
    scratch: {
      gradStart: '#fca5a5',
      gradMid: '#b91c1c',
      gradEnd: '#450a0a',
      textColor: '#ffffff',
      accent: '#ef4444',
    },
    musicPreset: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-wedding-113828.mp3',
  },
  'royal-prestige': {
    id: 'royal-prestige',
    name: 'Royal Prestige',
    subtitle: 'Blush Pink Velvet & Golden Foil',
    video: '/videos/royal-prestige.mp4',
    cssVars: {
      '--primary': '350 60% 38%',
      '--primary-foreground': '350 60% 98%',
      '--background': '350 45% 96%',
      '--foreground': '348 45% 16%',
      '--card': '350 50% 94%',
      '--card-foreground': '348 45% 16%',
      '--muted-foreground': '348 22% 38%',
      '--cream': '350 45% 93%',
      '--gold': '350 65% 42%',
      '--gold-light': '350 55% 78%',
      '--border': '350 30% 82%',
      '--font-calligraphy': "'Dancing Script', cursive",
    },
    textColor: '#2a0e18',
    accentColor: '#db2777',
    background: 'hsl(350, 45%, 96%)',
    welcomeGradient: 'linear-gradient(to bottom, #4c0519 0%, #831843 45%, #e879a8 78%, #FDF2F8 100%)',
    fontStyle: 'dancing',
    scratch: {
      gradStart: '#fbcfe8',
      gradMid: '#db2777',
      gradEnd: '#831843',
      textColor: '#ffffff',
      accent: '#ec4899',
    },
    musicPreset: 'https://cdn.pixabay.com/download/audio/2021/08/04/audio_bb630cc098.mp3?filename=acoustic-guitars-ambient-uplifting-11369.mp3',
  },
  'royal-heritage': {
    id: 'royal-heritage',
    name: 'Royal Heritage',
    subtitle: 'Mediterranean Sky Blue & Platinum Grandeur',
    video: '/videos/royal-heritage.mp4',
    cssVars: {
      '--primary': '210 65% 32%',
      '--primary-foreground': '210 60% 98%',
      '--background': '210 45% 96%',
      '--foreground': '215 45% 16%',
      '--card': '210 50% 94%',
      '--card-foreground': '215 45% 16%',
      '--muted-foreground': '215 25% 38%',
      '--cream': '210 45% 93%',
      '--gold': '210 70% 38%',
      '--gold-light': '210 55% 78%',
      '--border': '210 35% 82%',
      '--font-calligraphy': "'Dancing Script', cursive",
    },
    textColor: '#0c1e2b',
    accentColor: '#0284c7',
    background: 'hsl(210, 45%, 96%)',
    welcomeGradient: 'linear-gradient(to bottom, #1e293b 0%, #334155 45%, #94a3b8 78%, #E5EDF5 100%)',
    fontStyle: 'dancing',
    scratch: {
      gradStart: '#bae6fd',
      gradMid: '#0284c7',
      gradEnd: '#0c4a6e',
      textColor: '#ffffff',
      accent: '#38bdf8',
    },
    musicPreset: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-wedding-113828.mp3',
  },
  'royal-grace': {
    id: 'royal-grace',
    name: 'Royal Grace',
    subtitle: 'Sage Botanical Serenity & Emerald Pearl',
    video: '/videos/royal-grace.mp4',
    cssVars: {
      '--primary': '95 20% 30%',
      '--primary-foreground': '45 40% 97%',
      '--background': '45 38% 96%',
      '--foreground': '95 25% 16%',
      '--card': '45 42% 94%',
      '--card-foreground': '95 25% 16%',
      '--muted-foreground': '95 12% 38%',
      '--cream': '42 40% 93%',
      '--gold': '40 45% 45%',
      '--gold-light': '42 50% 78%',
      '--border': '45 25% 82%',
      '--font-calligraphy': "'Dancing Script', cursive",
    },
    textColor: '#152418',
    accentColor: '#059669',
    background: 'hsl(45, 38%, 96%)',
    welcomeGradient: 'linear-gradient(to bottom, #143525 0%, #22543d 45%, #68d391 78%, #F2F7F4 100%)',
    fontStyle: 'dancing',
    scratch: {
      gradStart: '#a7f3d0',
      gradMid: '#059669',
      gradEnd: '#064e3b',
      textColor: '#ffffff',
      accent: '#10b981',
    },
    musicPreset: 'https://cdn.pixabay.com/download/audio/2022/03/10/audio_c3574c82c3.mp3?filename=indian-classical-instrumental-110825.mp3',
  },
  'royal-crest': {
    id: 'royal-crest',
    name: 'Royal Crest',
    subtitle: 'Lakeside Wax Seal & Deep Burgundy Romance',
    video: '/videos/royal-crest.mp4',
    cssVars: {
      '--primary': '8 45% 31%',
      '--primary-foreground': '42 45% 97%',
      '--background': '40 38% 96%',
      '--foreground': '8 45% 24%',
      '--card': '38 40% 94%',
      '--card-foreground': '8 45% 24%',
      '--muted-foreground': '8 35% 36%',
      '--cream': '37 36% 91%',
      '--gold': '8 45% 31%',
      '--gold-light': '8 38% 52%',
      '--border': '8 30% 70%',
      '--font-calligraphy': "'Dancing Script', cursive",
    },
    textColor: '#290c12',
    accentColor: '#881337',
    background: 'hsl(40, 38%, 96%)',
    welcomeGradient: 'linear-gradient(to bottom, #4c0519 0%, #881337 45%, #f43f5e 78%, #FDF6F7 100%)',
    fontStyle: 'cinzel',
    scratch: {
      gradStart: '#fda4af',
      gradMid: '#9f1239',
      gradEnd: '#4c0519',
      textColor: '#ffffff',
      accent: '#f43f5e',
    },
    musicPreset: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-wedding-113828.mp3',
  },
  'royal-legacy': {
    id: 'royal-legacy',
    name: 'Royal Legacy',
    subtitle: 'Rajputana Imperial Velvet & Gold Filigree',
    video: '/videos/royal-legacy.mp4',
    cssVars: {
      '--primary': '40 48% 38%',
      '--primary-foreground': '42 55% 96%',
      '--background': '40 36% 95%',
      '--foreground': '6 48% 20%',
      '--card': '40 38% 93%',
      '--card-foreground': '6 48% 20%',
      '--muted-foreground': '12 28% 36%',
      '--cream': '39 36% 90%',
      '--gold': '40 52% 42%',
      '--gold-light': '42 58% 70%',
      '--border': '39 34% 70%',
      '--font-calligraphy': "'Dancing Script', cursive",
    },
    textColor: '#2b140a',
    accentColor: '#d97706',
    background: 'hsl(40, 36%, 95%)',
    welcomeGradient: 'linear-gradient(to bottom, #451a03 0%, #78350f 45%, #d97706 78%, #FCF9F2 100%)',
    fontStyle: 'cinzel',
    scratch: {
      gradStart: '#fde68a',
      gradMid: '#d97706',
      gradEnd: '#78350f',
      textColor: '#1a1208',
      accent: '#f59e0b',
    },
    musicPreset: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-wedding-113828.mp3',
  },
  'emerald-noir-royal': {
    id: 'emerald-noir-royal',
    name: 'Royal Emerald Noir',
    subtitle: 'Deep Emerald Velvet & 24K Gold Luxury',
    video: '/videos/royal-legacy.mp4',
    videoFilter: 'hue-rotate(90deg) saturate(1.4) contrast(1.15) brightness(0.95)',
    cssVars: {
      '--primary': '155 70% 28%',
      '--primary-foreground': '150 40% 98%',
      '--background': '150 25% 96%',
      '--foreground': '160 50% 12%',
      '--card': '150 30% 94%',
      '--card-foreground': '160 50% 12%',
      '--muted-foreground': '160 20% 35%',
      '--cream': '150 25% 92%',
      '--gold': '45 75% 48%',
      '--gold-light': '45 60% 75%',
      '--border': '155 25% 80%',
      '--font-calligraphy': "'Dancing Script', cursive",
    },
    textColor: '#062b1b',
    accentColor: '#059669',
    background: 'hsl(150, 25%, 96%)',
    welcomeGradient: 'linear-gradient(to bottom, #022c22 0%, #064e3b 45%, #34d399 78%, #F2F8F5 100%)',
    fontStyle: 'dancing',
    scratch: {
      gradStart: '#6ee7b7',
      gradMid: '#059669',
      gradEnd: '#064e3b',
      textColor: '#ffffff',
      accent: '#10b981',
    },
    musicPreset: 'https://cdn.pixabay.com/download/audio/2022/03/10/audio_c3574c82c3.mp3?filename=indian-classical-instrumental-110825.mp3',
  },
  'ivory-elegance-royal': {
    id: 'ivory-elegance-royal',
    name: 'Royal Ivory & Velvet Noir',
    subtitle: 'Obsidian Midnight & 24K Champagne Gold Palace',
    video: '/videos/rose-gold-blush.mp4',
    videoFilter: 'sepia(0.6) contrast(1.3) brightness(0.85) saturate(0.8)',
    cssVars: {
      '--primary': '0 65% 42%',
      '--primary-foreground': '40 50% 98%',
      '--background': '40 30% 96%',
      '--foreground': '20 15% 12%',
      '--card': '40 35% 94%',
      '--card-foreground': '20 15% 12%',
      '--muted-foreground': '20 10% 38%',
      '--cream': '40 30% 92%',
      '--gold': '45 80% 48%',
      '--gold-light': '45 65% 75%',
      '--border': '40 20% 80%',
      '--font-calligraphy': "'Dancing Script', cursive",
    },
    textColor: '#1c1917',
    accentColor: '#b91c1c',
    background: 'hsl(40, 30%, 96%)',
    welcomeGradient: 'linear-gradient(to bottom, #1c1917 0%, #44403c 45%, #b91c1c 78%, #FAF6F0 100%)',
    fontStyle: 'dancing',
    scratch: {
      gradStart: '#fef08a',
      gradMid: '#ca8a04',
      gradEnd: '#713f12',
      textColor: '#1a1208',
      accent: '#eab308',
    },
    musicPreset: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-wedding-113828.mp3',
  },
  // =========================================================================
  // 👑 5 NEW SIGNATURE ROYAL TIER SUITES
  // =========================================================================
  'royal-farman': {
    id: 'royal-farman',
    name: 'Royal Shahi Farman',
    subtitle: 'Traditional Rajputana Royal Decree & Shehnai',
    video: '/videos/rose-gold-blush.mp4',
    videoFilter: 'sepia(0.6) hue-rotate(-20deg) contrast(1.15)',
    textColor: '#241414',
    accentColor: '#C99700',
    background: 'hsl(36, 42%, 94%)',
    welcomeGradient: 'linear-gradient(to bottom, #4a0d0d 0%, #751a1a 45%, #c47d7d 78%, #FAF5EE 100%)',
    fontStyle: 'dancing',
    scratch: {
      gradStart: '#fde68a',
      gradMid: '#d97706',
      gradEnd: '#78350f',
      textColor: '#ffffff',
      accent: '#d97706',
    },
    musicPreset: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=royal-ambient-112345.mp3',
  },
  'royal-jharokha': {
    id: 'royal-jharokha',
    name: 'Rajputana Jharokha Mandap',
    subtitle: 'Palace Arch, Glowing Diyas & Sunset Sitar',
    video: '/videos/royal-legacy.mp4',
    videoFilter: 'sepia(0.4) saturate(1.4) contrast(1.1)',
    textColor: '#261608',
    accentColor: '#D97706',
    background: 'hsl(32, 45%, 95%)',
    welcomeGradient: 'linear-gradient(to bottom, #3b1b05 0%, #69320a 45%, #bf8152 78%, #FDF7F2 100%)',
    fontStyle: 'dancing',
    scratch: {
      gradStart: '#fef08a',
      gradMid: '#d97706',
      gradEnd: '#78350f',
      textColor: '#ffffff',
      accent: '#f59e0b',
    },
    musicPreset: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=royal-ambient-112345.mp3',
  },
  'royal-solitaire': {
    id: 'royal-solitaire',
    name: 'Kohinoor Solitaire Luxe',
    subtitle: 'Sapphire Crystal & Diamond Glimmer',
    video: '/videos/royal-majesty.mp4',
    videoFilter: 'brightness(1.1) contrast(1.2) hue-rotate(10deg)',
    textColor: '#0c1b2b',
    accentColor: '#0284C7',
    background: 'hsl(210, 40%, 97%)',
    welcomeGradient: 'linear-gradient(to bottom, #0f172a 0%, #1e293b 45%, #64748b 78%, #F1F5F9 100%)',
    fontStyle: 'dancing',
    scratch: {
      gradStart: '#bae6fd',
      gradMid: '#0284c7',
      gradEnd: '#082f49',
      textColor: '#ffffff',
      accent: '#38bdf8',
    },
    musicPreset: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=piano-moment-9835.mp3',
  },
  'royal-emerald-sheesh': {
    id: 'royal-emerald-sheesh',
    name: 'Sheesh Mahal Emerald',
    subtitle: 'Mirrored Glass Mosaic & Regal Emerald Sitar',
    video: '/videos/royal-crest.mp4',
    videoFilter: 'hue-rotate(60deg) saturate(1.3) contrast(1.1)',
    textColor: '#082117',
    accentColor: '#059669',
    background: 'hsl(155, 35%, 96%)',
    welcomeGradient: 'linear-gradient(to bottom, #06231a 0%, #0c4a37 45%, #4fa389 78%, #F0FDF4 100%)',
    fontStyle: 'cinzel',
    scratch: {
      gradStart: '#a7f3d0',
      gradMid: '#059669',
      gradEnd: '#064e3b',
      textColor: '#ffffff',
      accent: '#10b981',
    },
    musicPreset: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=royal-ambient-112345.mp3',
  },
  'royal-destination': {
    id: 'royal-destination',
    name: 'Udaipur Lakefront Destination',
    subtitle: 'Lake Palace Sunset & Destination Grandeur',
    video: '/videos/royal-heritage.mp4',
    videoFilter: 'saturate(1.25) contrast(1.05)',
    textColor: '#0f1c2e',
    accentColor: '#0284C7',
    background: 'hsl(210, 45%, 96%)',
    welcomeGradient: 'linear-gradient(to bottom, #1e293b 0%, #334155 45%, #94a3b8 78%, #E5EDF5 100%)',
    fontStyle: 'dancing',
    scratch: {
      gradStart: '#bae6fd',
      gradMid: '#0284c7',
      gradEnd: '#0c4a6e',
      textColor: '#ffffff',
      accent: '#38bdf8',
    },
    musicPreset: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-wedding-113828.mp3',
  },

  // =========================================================================
  // 🕉️ 3 ROYAL HINDI LUXURY SUITES (Devanagari Typography & Shlokas)
  // =========================================================================
  'royal-shubh-vivah-hindi': {
    id: 'royal-shubh-vivah-hindi',
    name: 'राजसी शुभ विवाह (|| श्री गणेशाय नमः ||)',
    subtitle: 'वैदिक श्लोक, शुद्ध देवनागरी एवं राजसी शहनाई',
    video: '/videos/royal-elegance-royal.mp4',
    videoFilter: 'contrast(1.15) saturate(1.25)',
    textColor: '#2a1212',
    accentColor: '#DC2626',
    background: 'hsl(36, 45%, 95%)',
    welcomeGradient: 'linear-gradient(to bottom, #540909 0%, #7A1212 45%, #c77b7b 78%, #FAF5EE 100%)',
    fontStyle: 'devanagari',
    isHindi: true,
    scratch: {
      gradStart: '#fde68a',
      gradMid: '#d97706',
      gradEnd: '#78350f',
      textColor: '#ffffff',
      accent: '#ef4444',
    },
    musicPreset: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=royal-ambient-112345.mp3',
  },
  'royal-rajwada-utsav-hindi': {
    id: 'royal-rajwada-utsav-hindi',
    name: 'राजवाड़ा विवाह महोत्सव',
    subtitle: 'शाही रजवाड़ी ठाठ, हल्दी-कुमकुम एवं पाणिग्रहण',
    video: '/videos/royal-grace.mp4',
    videoFilter: 'sepia(0.3) saturate(1.3)',
    textColor: '#29180c',
    accentColor: '#B45309',
    background: 'hsl(34, 45%, 95%)',
    welcomeGradient: 'linear-gradient(to bottom, #451a03 0%, #78350f 45%, #d97706 78%, #FEF3C7 100%)',
    fontStyle: 'devanagari',
    isHindi: true,
    scratch: {
      gradStart: '#fef08a',
      gradMid: '#d97706',
      gradEnd: '#78350f',
      textColor: '#ffffff',
      accent: '#f59e0b',
    },
    musicPreset: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=royal-ambient-112345.mp3',
  },
  'royal-shahi-farman-hindi': {
    id: 'royal-shahi-farman-hindi',
    name: 'शाही फरमान निमंत्रण पत्रिका',
    subtitle: 'परंपरागत मांगलिक पत्रिका एवं शंख-शहनाई मंगल ध्वनि',
    video: '/videos/rose-gold-blush.mp4',
    videoFilter: 'sepia(0.5) contrast(1.2)',
    textColor: '#241414',
    accentColor: '#991B1B',
    background: 'hsl(36, 42%, 94%)',
    welcomeGradient: 'linear-gradient(to bottom, #4a0d0d 0%, #751a1a 45%, #c47d7d 78%, #FAF5EE 100%)',
    fontStyle: 'devanagari',
    isHindi: true,
    scratch: {
      gradStart: '#fca5a5',
      gradMid: '#b91c1c',
      gradEnd: '#450a0a',
      textColor: '#ffffff',
      accent: '#ef4444',
    },
    musicPreset: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=royal-ambient-112345.mp3',
  },
};

const ZareqiaRoyalSuite = ({ invitation = {}, isPreview = false, onRsvpSuccess }) => {
  const rawTemplateId =
    invitation.template_id ||
    invitation.templateId ||
    'rose-gold-blush-royal';

  const themeKey =
    zareqiaRoyalThemes[rawTemplateId] ? rawTemplateId :
    rawTemplateId === 'royal-elegance' ? 'royal-elegance-royal' :
    rawTemplateId === 'emerald-noir' ? 'emerald-noir-royal' :
    rawTemplateId === 'ivory-elegance' ? 'ivory-elegance-royal' :
    rawTemplateId === 'rose-gold-blush' ? 'rose-gold-blush-royal' :
    rawTemplateId === 'modern-minimal-royal' ? 'royal-elegance-royal' :
    'rose-gold-blush-royal';

  const theme = zareqiaRoyalThemes[themeKey] || zareqiaRoyalThemes['rose-gold-blush-royal'];

  const videoRef = useRef(null);
  const audioRef = useRef(null);

  const [hasStarted, setHasStarted] = useState(false);
  const [hasRevealed, setHasRevealed] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Couple Data
  const groomName = invitation.groom_name || invitation.groomName || 'Aarav Singhania';
  const brideName = invitation.bride_name || invitation.brideName || 'Kiara Malhotra';
  const coupleNames = invitation.names || `${groomName} & ${brideName}`;
  const groomParents =
    invitation.groom_parents || invitation.groomParents || 'Son of Mrs. Sunita & Mr. Rajesh Singhania';
  const brideParents =
    invitation.bride_parents || invitation.brideParents || 'Daughter of Mrs. Poonam & Mr. Anand Malhotra';

  // Autoplay video immediately on mount so no black screen appears
  useEffect(() => {
    const vid = videoRef.current;
    if (vid) {
      vid.muted = true;
      vid.playsInline = true;
      vid.loop = true;
      const playPromise = vid.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay handled by browser policy
        });
      }
    }
  }, [theme.video]);

  // Release scroll when gate opens
  useEffect(() => {
    if (!hasRevealed) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [hasRevealed]);

  // Gate Tap to Open Trigger - Opens INSTANTLY on user tap/click
  const handleOpenGate = async (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    if (hasRevealed) return;
    setHasStarted(true);
    setHasRevealed(true);

    const vid = videoRef.current;
    if (vid) {
      try {
        vid.muted = true;
        vid.playsInline = true;
        vid.loop = false;
        await vid.play();
      } catch {
        // Fallback if browser blocks video play
      }
    }

    const isMusicEnabled =
      invitation.music_enabled !== false && invitation.musicEnabled !== false;

    if (audioRef.current && isMusicEnabled) {
      audioRef.current.play().then(() => setIsPlayingMusic(true)).catch(() => {});
    }

    // Smooth scroll down to the royal invitation farman / welcome after a gentle moment
    setTimeout(() => {
      const el = document.getElementById('invitation-welcome') || document.getElementById('invitation-scratch');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 350);
  };

  const handleVideoEnded = () => {
    setHasRevealed(true);
  };

  const handleScrollDown = () => {
    setHasRevealed(true);
    setTimeout(() => {
      const el = document.getElementById('invitation-welcome') || document.getElementById('invitation-scratch');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollBy({ top: window.innerHeight * 0.9, behavior: 'smooth' });
      }
    }, 100);
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlayingMusic) {
      audioRef.current.pause();
      setIsPlayingMusic(false);
    } else {
      audioRef.current.play().then(() => setIsPlayingMusic(true)).catch(() => {});
    }
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `Namaste! ✨\nYou are cordially invited to celebrate the royal wedding of ${coupleNames}.\n\nView our live digital invitation:\n${window.location.href}\n\nWith love,\n${coupleNames}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <div
      className={`font-sans selection:bg-amber-600 selection:text-white ${
        !hasRevealed ? 'h-screen overflow-hidden' : 'min-h-screen'
      }`}
      style={{
        backgroundColor: theme.background,
        color: theme.textColor,
        '--primary': theme.accentColor,
      }}
    >
      <DamaskPattern />

      {/* Background Audio */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        src={invitation.music_url || invitation.musicUrl || theme.musicPreset}
      />

      {/* Floating Action Toolbar */}
      <div className="fixed top-4 right-4 z-50 flex items-center space-x-2">
        <button
          type="button"
          onClick={toggleMusic}
          className="p-2.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white hover:bg-black/80 shadow-2xl transition-all cursor-pointer"
          title={isPlayingMusic ? 'Mute Music' : 'Play Music'}
        >
          {isPlayingMusic ? (
            <Volume2 className="w-4 h-4 text-amber-300 animate-pulse" />
          ) : (
            <VolumeX className="w-4 h-4 text-neutral-400" />
          )}
        </button>
        <button
          type="button"
          onClick={() => setQrOpen(true)}
          className="p-2.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white hover:bg-black/80 shadow-2xl transition-all cursor-pointer"
          title="Share QR Code"
        >
          <QrCode className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={handleShareWhatsApp}
          className="px-3.5 py-2 rounded-full bg-emerald-600/90 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider shadow-xl flex items-center space-x-1.5 transition-all cursor-pointer"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span className="hidden xs:inline">Share</span>
        </button>
      </div>

      {/* =========================================================================
          SECTION 1: 4K VIDEO GATE & COUPLE NAME REVEAL HERO (Zareqia 1:1)
         ========================================================================= */}
      <section
        className="relative min-h-screen w-full overflow-hidden flex items-center justify-center cursor-pointer select-none bg-gradient-to-b from-neutral-950 via-neutral-900 to-black"
        onClick={handleOpenGate}
      >
        {/* Full-Bleed 4K Video Element - Live & Playing immediately on Mount */}
        <video
          ref={videoRef}
          key={theme.video + (theme.videoFilter || '')}
          src={theme.video}
          style={{ filter: theme.videoFilter || 'none' }}
          autoPlay
          loop
          playsInline
          muted
          preload="auto"
          controls={false}
          disablePictureInPicture
          controlsList="nodownload noplaybackrate noremoteplayback nofullscreen"
          onContextMenu={(e) => e.preventDefault()}
          onClick={handleOpenGate}
          onEnded={handleVideoEnded}
          onError={() => setHasRevealed(true)}
          className="absolute inset-0 h-full w-full cursor-pointer object-cover z-0"
        />

        {/* Direct Clean 4K Video Screen - Instant Tap to Open Button Overlay */}
        {!hasRevealed && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-4 bg-black/25">
            <button
              type="button"
              onClick={handleOpenGate}
              className="group px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 hover:from-yellow-400 hover:to-amber-500 text-neutral-950 font-extrabold text-sm sm:text-base uppercase tracking-widest shadow-[0_0_50px_rgba(234,179,8,0.9)] transform hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center space-x-3 border-2 border-amber-100 cursor-pointer animate-pulse"
            >
              <Sparkles className="w-5 h-5 text-neutral-950 animate-spin-slow" />
              <span>{theme.isHindi ? 'शाही निमंत्रण खोलें' : 'Tap to Open Royal Invitation'}</span>
              <Crown className="w-5 h-5 text-neutral-950" />
            </button>
            <p className="mt-4 text-xs sm:text-sm font-serif tracking-widest text-amber-200/90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] uppercase">
              {theme.isHindi ? 'संगीत के साथ आनंद लें' : 'Experience with Royal Music'}
            </p>
          </div>
        )}

        {/* Dark Luxury Gradient Overlay over Video when Opened */}
        <div
          className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${
            hasRevealed ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.2) 45%, rgba(0,0,0,0.65) 100%)',
          }}
        />

        {/* OPENED GATE REVEAL CONTENT (100% Dead Center 1:1 Overlay) */}
        <div
          className={`relative z-20 flex w-full max-w-4xl mx-auto flex-col items-center justify-center px-4 sm:px-6 text-center pointer-events-none transition-all duration-1000 ${
            hasRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Top Diamond Icon */}
          <div className="mb-3">
            {theme.isHindi ? (
              <span className="text-sm sm:text-base font-bold font-rozha text-amber-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] tracking-widest block py-1">
                || 卐 श्री गणेशाय नमः 卐 ||
              </span>
            ) : (
              <span className="text-xl" style={{ color: theme.accentColor }}>✦</span>
            )}
          </div>

          {/* We are getting married */}
          <p
            className={`mb-3 whitespace-pre-line text-lg sm:text-2xl md:text-3xl px-4 max-w-xl mx-auto ${
              theme.isHindi ? 'font-rozha text-amber-200' : theme.fontStyle === 'cinzel' ? 'font-serif tracking-widest uppercase' : 'font-dancing'
            }`}
            style={{ color: '#FAF5EE', textShadow: '0 2px 12px rgba(0,0,0,0.85)' }}
          >
            {invitation.message || "we're getting married"}
          </p>

          {/* Horizontal Lines with Center Heart */}
          <div className="my-3 flex items-center justify-center gap-3">
            <div className="h-px w-12 sm:w-16" style={{ backgroundColor: 'rgba(245,230,224,0.45)' }} />
            <Heart size={10} style={{ color: '#FAF5EE' }} fill="currentColor" />
            <div className="h-px w-12 sm:w-16" style={{ backgroundColor: 'rgba(245,230,224,0.45)' }} />
          </div>

          {/* Groom Name */}
          <div className="space-y-1 w-full text-center">
            <h1
              className={`leading-tight tracking-wide text-4xl sm:text-6xl md:text-8xl lg:text-9xl break-words px-2 ${
                theme.isHindi ? 'font-rozha text-amber-300 font-bold' : theme.fontStyle === 'cinzel' ? 'font-serif uppercase tracking-wider' : 'font-dancing'
              }`}
              style={{ color: '#FAF5EE', textShadow: '0 2px 14px rgba(0,0,0,0.9)' }}
            >
              {groomName}
            </h1>
            {groomParents && (
              <p className="text-xs sm:text-sm font-sans italic text-neutral-200 px-4 max-w-lg mx-auto drop-shadow-md">
                {groomParents}
              </p>
            )}
          </div>

          {/* Ampersand */}
          <p
            className="my-2 font-dancing text-2xl sm:text-3xl md:text-4xl"
            style={{ color: 'rgba(245,230,224,0.9)', textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}
          >
            &
          </p>

          {/* Bride Name */}
          <div className="space-y-1 w-full text-center">
            <h1
              className={`leading-tight tracking-wide text-4xl sm:text-6xl md:text-8xl lg:text-9xl break-words px-2 ${
                theme.fontStyle === 'cinzel' ? 'font-serif uppercase tracking-wider' : 'font-dancing'
              }`}
              style={{ color: '#FAF5EE', textShadow: '0 2px 14px rgba(0,0,0,0.9)' }}
            >
              {brideName}
            </h1>
            {brideParents && (
              <p className="text-xs sm:text-sm font-sans italic text-neutral-200 px-4 max-w-lg mx-auto drop-shadow-md">
                {brideParents}
              </p>
            )}
          </div>
        </div>

        {/* Bottom Scroll Bounce Indicator */}
        {hasRevealed && (
          <div
            onClick={handleScrollDown}
            className="absolute inset-x-0 bottom-8 z-30 flex flex-col items-center gap-1.5 cursor-pointer transition-all duration-700 animate-bounce pointer-events-auto"
          >
            <span
              className="text-[10px] sm:text-xs uppercase tracking-widest font-mono"
              style={{ color: 'rgba(245,230,224,0.9)', textShadow: '0 1px 6px rgba(0,0,0,0.8)' }}
            >
              Scroll Down
            </span>
            <ChevronDown size={18} style={{ color: '#FAF5EE' }} />
          </div>
        )}
      </section>

      {/* =========================================================================
          SECTION 2 TO 15: SEAMLESS ZAREQIA INSIDE BODY (100% Match to Screenshots)
         ========================================================================= */}
      <ZareqiaBody
        data={invitation}
        invitationId={invitation._id || invitation.id || invitation.slug}
        theme={theme}
        scratchPalette={theme.scratch}
        onRsvpSuccess={onRsvpSuccess}
      />

      {/* QR Code Sharing Modal */}
      {qrOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
          onClick={() => setQrOpen(false)}
        >
          <div
            className="relative w-full max-w-sm rounded-3xl p-6 border border-primary/30 shadow-2xl text-center space-y-4 bg-neutral-900 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setQrOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 text-neutral-300 hover:text-white cursor-pointer"
            >
              <X size={18} />
            </button>
            <h3 className="font-serif text-xl font-bold text-amber-400">Scan & Share Invitation</h3>
            <p className="text-xs text-neutral-400">Share this QR code with your guests:</p>
            <div className="p-4 bg-white rounded-2xl inline-block shadow-inner">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
                  window.location.href
                )}`}
                alt="Invitation QR Code"
                className="w-44 h-44 mx-auto"
              />
            </div>
            <p className="text-[11px] text-neutral-400 font-mono break-all">{window.location.href}</p>
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="w-full py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-1.5 transition-all cursor-pointer"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              <span>{copied ? 'Link Copied!' : 'Copy Live Link'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ZareqiaRoyalSuite;
