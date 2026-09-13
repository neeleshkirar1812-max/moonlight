import React, { useState, useEffect } from 'react';
import { Sparkles, ChevronDown } from 'lucide-react';

/**
 * Web Audio API Multi-Profile Synthesizer
 * Generates distinct harmonic sound profiles tailored to each gate transition:
 * - 'royal': Opulent Shehnai & Brass Chime
 * - 'temple': Sacred Resonant Temple Bell Chimes
 * - 'floral': Romantic Harp & Flute Arpeggio
 * - 'celestial': Shimmering High Cosmic Crystal Chime
 * - 'birthday': Joyful Festive Bells & Glockenspiel
 * - 'modern': Clean Harmonic Platinum Resonance
 * - 'sangeet': Energetic Festive Rhythm Chimes
 * - 'velvet': Deep Harmonic String Crescendo
 */
const playDoorSound = (profile = 'royal') => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    let notes = [];
    if (profile === 'temple') {
      // Deep resonant sacred temple bells
      notes = [
        { freq: 261.63, time: 0.0, dur: 2.2, gain: 0.28, type: 'sine' },
        { freq: 392.00, time: 0.1, dur: 2.4, gain: 0.24, type: 'triangle' },
        { freq: 523.25, time: 0.25, dur: 2.6, gain: 0.20, type: 'sine' },
        { freq: 659.25, time: 0.45, dur: 2.8, gain: 0.16, type: 'sine' },
        { freq: 783.99, time: 0.7, dur: 3.0, gain: 0.12, type: 'triangle' },
      ];
    } else if (profile === 'floral') {
      // Gentle romantic harp & soft string arpeggio
      notes = [
        { freq: 523.25, time: 0.0, dur: 1.5, gain: 0.14, type: 'triangle' },
        { freq: 659.25, time: 0.12, dur: 1.6, gain: 0.16, type: 'triangle' },
        { freq: 783.99, time: 0.24, dur: 1.8, gain: 0.18, type: 'triangle' },
        { freq: 987.77, time: 0.38, dur: 2.0, gain: 0.15, type: 'sine' },
        { freq: 1046.50, time: 0.52, dur: 2.2, gain: 0.12, type: 'sine' },
      ];
    } else if (profile === 'celestial') {
      // Shimmering cosmic bell chords
      notes = [
        { freq: 659.25, time: 0.0, dur: 1.8, gain: 0.16, type: 'sine' },
        { freq: 987.77, time: 0.15, dur: 2.0, gain: 0.20, type: 'sine' },
        { freq: 1318.51, time: 0.3, dur: 2.3, gain: 0.22, type: 'triangle' },
        { freq: 1661.22, time: 0.48, dur: 2.5, gain: 0.18, type: 'sine' },
        { freq: 1975.53, time: 0.68, dur: 2.8, gain: 0.14, type: 'sine' },
      ];
    } else if (profile === 'birthday') {
      // Joyful bright celebration glockenspiel
      notes = [
        { freq: 392.00, time: 0.0, dur: 0.8, gain: 0.20, type: 'triangle' },
        { freq: 523.25, time: 0.1, dur: 1.0, gain: 0.24, type: 'triangle' },
        { freq: 659.25, time: 0.2, dur: 1.2, gain: 0.26, type: 'triangle' },
        { freq: 783.99, time: 0.32, dur: 1.5, gain: 0.28, type: 'triangle' },
        { freq: 1046.50, time: 0.46, dur: 2.0, gain: 0.22, type: 'sine' },
      ];
    } else if (profile === 'modern') {
      // Subtle crisp architectural harmonic
      notes = [
        { freq: 329.63, time: 0.0, dur: 1.4, gain: 0.15, type: 'sine' },
        { freq: 493.88, time: 0.15, dur: 1.6, gain: 0.18, type: 'triangle' },
        { freq: 659.25, time: 0.3, dur: 1.9, gain: 0.20, type: 'sine' },
        { freq: 987.77, time: 0.5, dur: 2.2, gain: 0.16, type: 'sine' },
      ];
    } else if (profile === 'sangeet') {
      // Energetic celebratory beats
      notes = [
        { freq: 440.0, time: 0.0, dur: 1.0, gain: 0.22, type: 'triangle' },
        { freq: 587.33, time: 0.12, dur: 1.2, gain: 0.25, type: 'triangle' },
        { freq: 739.99, time: 0.24, dur: 1.4, gain: 0.26, type: 'triangle' },
        { freq: 880.0, time: 0.36, dur: 1.8, gain: 0.28, type: 'triangle' },
        { freq: 1174.66, time: 0.50, dur: 2.2, gain: 0.20, type: 'sine' },
      ];
    } else if (profile === 'velvet') {
      // Deep orchestral string chords
      notes = [
        { freq: 220.0, time: 0.0, dur: 1.8, gain: 0.25, type: 'sine' },
        { freq: 329.63, time: 0.15, dur: 2.0, gain: 0.22, type: 'triangle' },
        { freq: 440.0, time: 0.30, dur: 2.2, gain: 0.24, type: 'triangle' },
        { freq: 659.25, time: 0.50, dur: 2.5, gain: 0.20, type: 'sine' },
      ];
    } else {
      // Classic royal shehnai & palace chime (default)
      notes = [
        { freq: 440.0, time: 0.0, dur: 1.2, gain: 0.18, type: 'triangle' },
        { freq: 554.37, time: 0.15, dur: 1.4, gain: 0.22, type: 'triangle' },
        { freq: 659.25, time: 0.3, dur: 1.6, gain: 0.24, type: 'triangle' },
        { freq: 880.0, time: 0.45, dur: 2.0, gain: 0.28, type: 'triangle' },
        { freq: 1108.73, time: 0.65, dur: 2.2, gain: 0.2, type: 'triangle' },
        { freq: 1318.51, time: 0.85, dur: 2.5, gain: 0.15, type: 'sine' },
      ];
    }

    notes.forEach(({ freq, time, dur, gain, type = 'triangle' }) => {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime + time);

      gainNode.gain.setValueAtTime(0.001, ctx.currentTime + time);
      gainNode.gain.exponentialRampToValueAtTime(gain, ctx.currentTime + time + 0.06);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + time + dur);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start(ctx.currentTime + time);
      osc.stop(ctx.currentTime + time + dur);
    });
  } catch (e) {
    console.warn('[Audio Chime Notice]:', e);
  }
};

/**
 * Visual Theme Styles for all 20 Distinct Suites
 */
const getThemeStyles = (templateId) => {
  switch (templateId) {
    // 1. Royal Rajwada Palace (Brass Carved Doors)
    case 'royal-love':
      return {
        doorBgLeft: 'linear-gradient(135deg, #1C140E 0%, #3d2919 45%, #140d08 100%)',
        doorBgRight: 'linear-gradient(225deg, #1C140E 0%, #3d2919 45%, #140d08 100%)',
        doorBorder: 'border-amber-400/90',
        innerGlow: 'from-amber-500/35 via-amber-950/75 to-black',
        goldAccent: '#d4af37',
        sealBg: 'linear-gradient(135deg, #881337 0%, #4c0519 100%)',
        sealBorder: 'border-amber-300',
        accentText: 'text-amber-300',
        frameBorder: 'border-amber-500/60',
        badgeText: 'Royal Rajwada',
      };

    // 2. Emerald Noir & Dynasty (Mughal Jaali Screen)
    case 'emerald-noir':
      return {
        doorBgLeft: 'linear-gradient(135deg, #031910 0%, #0c4630 45%, #02140c 100%)',
        doorBgRight: 'linear-gradient(225deg, #031910 0%, #0c4630 45%, #02140c 100%)',
        doorBorder: 'border-emerald-400/85',
        innerGlow: 'from-emerald-500/35 via-emerald-950/75 to-black',
        goldAccent: '#d4af37',
        sealBg: 'linear-gradient(135deg, #064e3b 0%, #022c22 100%)',
        sealBorder: 'border-emerald-300',
        accentText: 'text-emerald-300',
        frameBorder: 'border-emerald-500/50',
        badgeText: 'Mughal Jaali',
      };

    // 3. Crimson Royale & Velvet (Royal Velvet Drape)
    case 'crimson-royale':
      return {
        doorBgLeft: 'linear-gradient(135deg, #2a040b 0%, #5e0d1f 45%, #1a0206 100%)',
        doorBgRight: 'linear-gradient(225deg, #2a040b 0%, #5e0d1f 45%, #1a0206 100%)',
        doorBorder: 'border-rose-400/85',
        innerGlow: 'from-rose-500/35 via-amber-950/70 to-black',
        goldAccent: '#d4af37',
        sealBg: 'linear-gradient(135deg, #9f1239 0%, #4c0519 100%)',
        sealBorder: 'border-amber-300',
        accentText: 'text-rose-300',
        frameBorder: 'border-amber-400/50',
        badgeText: 'Royal Velvet',
      };

    // 4. Lake Palace Pichola Suite (Water-Reflection Portal)
    case 'udaivilas-palace':
      return {
        doorBgLeft: 'linear-gradient(135deg, #060D1F 0%, #15274d 45%, #040915 100%)',
        doorBgRight: 'linear-gradient(225deg, #060D1F 0%, #15274d 45%, #040915 100%)',
        doorBorder: 'border-sky-400/80',
        innerGlow: 'from-sky-500/35 via-indigo-950/80 to-[#060D1F]',
        goldAccent: '#f3cf5b',
        sealBg: 'linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%)',
        sealBorder: 'border-sky-300',
        accentText: 'text-sky-300',
        frameBorder: 'border-sky-400/50',
        badgeText: 'Lake Palace',
      };

    // 5. Jaipur Pink City Haveli (Sandstone Jharokhas)
    case 'jaipur-heritage':
      return {
        doorBgLeft: 'linear-gradient(135deg, #23080e 0%, #5c1b25 45%, #190509 100%)',
        doorBgRight: 'linear-gradient(225deg, #23080e 0%, #5c1b25 45%, #190509 100%)',
        doorBorder: 'border-amber-400/80',
        innerGlow: 'from-rose-600/30 via-orange-950/65 to-black',
        goldAccent: '#f5d061',
        sealBg: 'linear-gradient(135deg, #9f1239 0%, #4c0519 100%)',
        sealBorder: 'border-amber-300',
        accentText: 'text-rose-200',
        frameBorder: 'border-rose-500/50',
        badgeText: 'Pink City Haveli',
      };

    // 6. Shahi Sangeet & Musical Night (Silk Stage Curtains)
    case 'shahi-sangeet':
      return {
        doorBgLeft: 'linear-gradient(135deg, #1a0312 0%, #4a0933 45%, #12020d 100%)',
        doorBgRight: 'linear-gradient(225deg, #1a0312 0%, #4a0933 45%, #12020d 100%)',
        doorBorder: 'border-pink-400/80',
        innerGlow: 'from-pink-500/35 via-rose-950/70 to-black',
        goldAccent: '#f3cf5b',
        sealBg: 'linear-gradient(135deg, #831843 0%, #500724 100%)',
        sealBorder: 'border-pink-300',
        accentText: 'text-pink-300',
        frameBorder: 'border-pink-500/50',
        badgeText: 'Shahi Sangeet',
      };

    // 7. The Nawabi Awadh Suite (Awadh Arched Glides)
    case 'nawab-of-awadh':
      return {
        doorBgLeft: 'linear-gradient(135deg, #021212 0%, #0c3838 45%, #010c0c 100%)',
        doorBgRight: 'linear-gradient(225deg, #021212 0%, #0c3838 45%, #010c0c 100%)',
        doorBorder: 'border-teal-400/80',
        innerGlow: 'from-teal-500/35 via-cyan-950/70 to-black',
        goldAccent: '#d4af37',
        sealBg: 'linear-gradient(135deg, #134e4a 0%, #042f2e 100%)',
        sealBorder: 'border-teal-300',
        accentText: 'text-teal-300',
        frameBorder: 'border-teal-500/50',
        badgeText: 'Nawabi Awadh',
      };

    // 8. Sacred Swarna Griha Pravesh (Teak Temple Doors & Bells)
    case 'royal-griha-utsav':
      return {
        doorBgLeft: 'linear-gradient(135deg, #1a0702 0%, #421808 45%, #120401 100%)',
        doorBgRight: 'linear-gradient(225deg, #1a0702 0%, #421808 45%, #120401 100%)',
        doorBorder: 'border-amber-400/80',
        innerGlow: 'from-amber-500/35 via-orange-950/75 to-black',
        goldAccent: '#f59e0b',
        sealBg: 'linear-gradient(135deg, #9a3412 0%, #431407 100%)',
        sealBorder: 'border-amber-300',
        accentText: 'text-amber-300',
        frameBorder: 'border-amber-500/50',
        badgeText: 'Shubh Muhurat',
      };

    // 9. Taj Imperial Marble Suite (Makrana Marble Pivot Slabs)
    case 'taj-imperial':
      return {
        doorBgLeft: 'linear-gradient(135deg, #0c1015 0%, #1e2633 45%, #080a0e 100%)',
        doorBgRight: 'linear-gradient(225deg, #0c1015 0%, #1e2633 45%, #080a0e 100%)',
        doorBorder: 'border-slate-300/80',
        innerGlow: 'from-slate-400/30 via-slate-900/80 to-black',
        goldAccent: '#e2e8f0',
        sealBg: 'linear-gradient(135deg, #334155 0%, #0f172a 100%)',
        sealBorder: 'border-slate-300',
        accentText: 'text-slate-200',
        frameBorder: 'border-slate-400/50',
        badgeText: 'Taj Imperial',
      };

    // 10. Bikaner Riyasat Fortress (Studded Spiked Fortress Doors)
    case 'bikaner-riyasat':
      return {
        doorBgLeft: 'linear-gradient(135deg, #140a03 0%, #3b1f0a 45%, #0d0602 100%)',
        doorBgRight: 'linear-gradient(225deg, #140a03 0%, #3b1f0a 45%, #0d0602 100%)',
        doorBorder: 'border-amber-500/80',
        innerGlow: 'from-amber-500/35 via-yellow-950/75 to-black',
        goldAccent: '#d4af37',
        sealBg: 'linear-gradient(135deg, #78350f 0%, #451a03 100%)',
        sealBorder: 'border-amber-300',
        accentText: 'text-amber-300',
        frameBorder: 'border-amber-500/50',
        badgeText: 'Bikaner Riyasat',
      };

    // 11. Pastel Floral Symphony (Botanical Envelope Bloom)
    case 'blooming-dreams':
      return {
        doorBgLeft: 'linear-gradient(135deg, #1F1418 0%, #3d232e 45%, #140b0f 100%)',
        doorBgRight: 'linear-gradient(225deg, #1F1418 0%, #3d232e 45%, #140b0f 100%)',
        doorBorder: 'border-rose-400/80',
        innerGlow: 'from-rose-400/35 via-pink-950/65 to-black',
        goldAccent: '#e0a899',
        sealBg: 'linear-gradient(135deg, #9d174d 0%, #700b34 100%)',
        sealBorder: 'border-rose-300',
        accentText: 'text-rose-300',
        frameBorder: 'border-rose-400/50',
        badgeText: 'Floral Bloom',
      };

    // 12. Modern Minimalist Luxe (Frosted Glass Panels)
    case 'modern-minimal':
      return {
        doorBgLeft: 'linear-gradient(135deg, #0f1115 0%, #1e222b 45%, #0a0c0f 100%)',
        doorBgRight: 'linear-gradient(225deg, #0f1115 0%, #1e222b 45%, #0a0c0f 100%)',
        doorBorder: 'border-zinc-500/80',
        innerGlow: 'from-zinc-400/30 via-stone-900/80 to-black',
        goldAccent: '#e4e4e7',
        sealBg: 'linear-gradient(135deg, #27272a 0%, #18181b 100%)',
        sealBorder: 'border-zinc-400',
        accentText: 'text-zinc-300',
        frameBorder: 'border-zinc-600/50',
        badgeText: 'Minimal Luxe',
      };

    // 13. Rose Gold Botanical Ribbon (Silk Satin Ribbon Untie)
    case 'rose-gold-blush':
      return {
        doorBgLeft: 'linear-gradient(135deg, #180a12 0%, #361729 45%, #10060c 100%)',
        doorBgRight: 'linear-gradient(225deg, #180a12 0%, #361729 45%, #10060c 100%)',
        doorBorder: 'border-pink-400/80',
        innerGlow: 'from-pink-400/35 via-rose-950/65 to-black',
        goldAccent: '#fbcfe8',
        sealBg: 'linear-gradient(135deg, #be185d 0%, #831843 100%)',
        sealBorder: 'border-pink-300',
        accentText: 'text-pink-300',
        frameBorder: 'border-pink-400/50',
        badgeText: 'Silk Ribbon',
      };

    // 14. Celestial Starlight Galaxy (Constellation Sphere Split)
    case 'celestial-night':
      return {
        doorBgLeft: 'linear-gradient(135deg, #050b1b 0%, #101e40 45%, #030712 100%)',
        doorBgRight: 'linear-gradient(225deg, #050b1b 0%, #101e40 45%, #030712 100%)',
        doorBorder: 'border-sky-400/80',
        innerGlow: 'from-sky-400/35 via-indigo-950/75 to-black',
        goldAccent: '#7dd3fc',
        sealBg: 'linear-gradient(135deg, #0369a1 0%, #0c4a6e 100%)',
        sealBorder: 'border-sky-300',
        accentText: 'text-sky-200',
        frameBorder: 'border-sky-400/50',
        badgeText: 'Starlight Galaxy',
      };

    // 15. Bohemian Terracotta & Sage (Artisanal Linen Tri-Fold)
    case 'terracotta-boho':
      return {
        doorBgLeft: 'linear-gradient(135deg, #1c100a 0%, #3d2317 45%, #140b07 100%)',
        doorBgRight: 'linear-gradient(225deg, #1c100a 0%, #3d2317 45%, #140b07 100%)',
        doorBorder: 'border-amber-600/80',
        innerGlow: 'from-orange-500/30 via-amber-950/70 to-black',
        goldAccent: '#fed7aa',
        sealBg: 'linear-gradient(135deg, #c2410c 0%, #7c2d12 100%)',
        sealBorder: 'border-amber-400',
        accentText: 'text-amber-200',
        frameBorder: 'border-amber-600/50',
        badgeText: 'Boho Linen',
      };

    // 16. Marigold Henna Utsav (Henna Mandala Bloom)
    case 'mehendi-magic':
      return {
        doorBgLeft: 'linear-gradient(135deg, #1f1001 0%, #452403 45%, #140a01 100%)',
        doorBgRight: 'linear-gradient(225deg, #1f1001 0%, #452403 45%, #140a01 100%)',
        doorBorder: 'border-yellow-400/80',
        innerGlow: 'from-yellow-500/35 via-amber-950/75 to-black',
        goldAccent: '#fef08a',
        sealBg: 'linear-gradient(135deg, #a16207 0%, #713f12 100%)',
        sealBorder: 'border-yellow-300',
        accentText: 'text-yellow-300',
        frameBorder: 'border-yellow-500/50',
        badgeText: 'Henna Utsav',
      };

    // 17. Prince & Princess 1st Birthday (Fairy Castle Gates)
    case 'little-sunshine':
      return {
        doorBgLeft: 'linear-gradient(135deg, #10121d 0%, #252a42 45%, #0b0c14 100%)',
        doorBgRight: 'linear-gradient(225deg, #10121d 0%, #252a42 45%, #0b0c14 100%)',
        doorBorder: 'border-amber-300/80',
        innerGlow: 'from-amber-400/35 via-yellow-950/70 to-black',
        goldAccent: '#fef08a',
        sealBg: 'linear-gradient(135deg, #d97706 0%, #92400e 100%)',
        sealBorder: 'border-yellow-300',
        accentText: 'text-yellow-200',
        frameBorder: 'border-yellow-400/50',
        badgeText: '1st Birthday',
      };

    // 18. Sweet Cradle Baby Shower (Golden Cloud Wings)
    case 'sweet-nesting-baby':
      return {
        doorBgLeft: 'linear-gradient(135deg, #14081b 0%, #2c123b 45%, #0d0512 100%)',
        doorBgRight: 'linear-gradient(225deg, #14081b 0%, #2c123b 45%, #0d0512 100%)',
        doorBorder: 'border-purple-300/80',
        innerGlow: 'from-purple-400/35 via-pink-950/65 to-black',
        goldAccent: '#e9d5ff',
        sealBg: 'linear-gradient(135deg, #7e22ce 0%, #581c87 100%)',
        sealBorder: 'border-purple-300',
        accentText: 'text-purple-200',
        frameBorder: 'border-purple-400/50',
        badgeText: 'Baby Shower',
      };

    // 19. Silver & Gold Jubilee Milestone (Faceted Crystal Gates)
    case 'silver-anniversary':
      return {
        doorBgLeft: 'linear-gradient(135deg, #0a0c10 0%, #1a1e29 45%, #07080a 100%)',
        doorBgRight: 'linear-gradient(225deg, #0a0c10 0%, #1a1e29 45%, #07080a 100%)',
        doorBorder: 'border-slate-300/80',
        innerGlow: 'from-slate-300/30 via-zinc-900/80 to-black',
        goldAccent: '#e2e8f0',
        sealBg: 'linear-gradient(135deg, #475569 0%, #1e293b 100%)',
        sealBorder: 'border-slate-300',
        accentText: 'text-slate-200',
        frameBorder: 'border-slate-400/50',
        badgeText: 'Silver Jubilee',
      };

    // 20. Goa Coastal Beachfront (Louvered Beach Pavilion)
    case 'coastal-breeze':
    default:
      return {
        doorBgLeft: 'linear-gradient(135deg, #021317 0%, #072e38 45%, #010c0e 100%)',
        doorBgRight: 'linear-gradient(225deg, #021317 0%, #072e38 45%, #010c0e 100%)',
        doorBorder: 'border-cyan-400/80',
        innerGlow: 'from-cyan-400/35 via-teal-950/70 to-black',
        goldAccent: '#a5f3fc',
        sealBg: 'linear-gradient(135deg, #0e7490 0%, #155e75 100%)',
        sealBorder: 'border-cyan-300',
        accentText: 'text-cyan-200',
        frameBorder: 'border-cyan-400/50',
        badgeText: 'Coastal Breeze',
      };
  }
};

/**
 * 20 Distinct Gate Transition & Animation Configurations
 */
const getTransitionConfig = (templateId) => {
  switch (templateId) {
    // 1. RAJWADA CARVED DOORS (3D Deep Palace Double Swing)
    case 'royal-love':
      return {
        styleType: 'rajwada-heavy-doors',
        leftTransform: 'translateX(-100%) rotateY(-110deg) scale(0.96)',
        rightTransform: 'translateX(100%) rotateY(110deg) scale(0.96)',
        leftOrigin: 'left center',
        rightOrigin: 'right center',
        easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
        duration: '1200ms',
        sealSpin: 'rotate(720deg) scale(1.3)',
        soundProfile: 'royal',
        confetti: ['🌹', '✨', '👑', '🥂'],
        topToranType: 'royal-marigold',
        knockerIcon: '🦁',
      };

    // 2. MUGHAL JAALI SWING (Lattice screen swing with glowing backlight)
    case 'emerald-noir':
      return {
        styleType: 'emerald-jaali-swing',
        leftTransform: 'translateX(-105%) rotateY(-90deg) rotateZ(-2deg)',
        rightTransform: 'translateX(105%) rotateY(90deg) rotateZ(2deg)',
        leftOrigin: 'left top',
        rightOrigin: 'right top',
        easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
        duration: '1150ms',
        sealSpin: 'rotate(540deg) scale(0.3) opacity(0)',
        soundProfile: 'royal',
        confetti: ['✨', '🌿', '💎', '🟢'],
        topToranType: 'emerald-jaali',
        knockerIcon: '⚜️',
      };

    // 3. ROYAL VELVET CURTAIN (Velvet drape gather and center parting)
    case 'crimson-royale':
      return {
        styleType: 'royal-velvet-curtain',
        leftTransform: 'translateX(-115%) skewY(-5deg) scaleX(0.7)',
        rightTransform: 'translateX(115%) skewY(5deg) scaleX(0.7)',
        leftOrigin: 'left top',
        rightOrigin: 'right top',
        easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
        duration: '1100ms',
        sealSpin: 'rotate(360deg) scale(0.2) translateY(-40px)',
        soundProfile: 'velvet',
        confetti: ['🌹', '🍷', '✨', '👑'],
        topToranType: 'velvet-garland',
        knockerIcon: '👑',
      };

    // 4. PICHOLA WATER PORTAL (Lake reflection arched portal with zoom)
    case 'udaivilas-palace':
      return {
        styleType: 'pichola-water-portal',
        leftTransform: 'translateX(-120%) translateZ(-190px) rotateY(-50deg)',
        rightTransform: 'translateX(120%) translateZ(-190px) rotateY(50deg)',
        leftOrigin: 'left center',
        rightOrigin: 'right center',
        easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
        duration: '1300ms',
        sealSpin: 'rotate(1080deg) scale(2) opacity(0)',
        soundProfile: 'celestial',
        confetti: ['🌊', '✨', '🌟', '🌙'],
        topToranType: 'starlight-arch',
        knockerIcon: '🏰',
      };

    // 5. HAVELI JHAROKHA SWING (Sandstone Jharokha balcony gates)
    case 'jaipur-heritage':
      return {
        styleType: 'haveli-jharokha-swing',
        leftTransform: 'translateX(-105%) rotateY(-85deg) translateY(-8px)',
        rightTransform: 'translateX(105%) rotateY(85deg) translateY(-8px)',
        leftOrigin: 'left top',
        rightOrigin: 'right top',
        easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
        duration: '1200ms',
        sealSpin: 'rotate(720deg) scale(1.3)',
        soundProfile: 'royal',
        confetti: ['🦚', '🌼', '✨', '🌹'],
        topToranType: 'marigold-toran',
        knockerIcon: '🦚',
      };

    // 6. FESTIVE STAGE CURTAINS (Magenta silk stage curtain reveal)
    case 'shahi-sangeet':
      return {
        styleType: 'festive-stage-curtains',
        leftTransform: 'translateX(-115%) scaleX(0.72) translateY(-10px)',
        rightTransform: 'translateX(115%) scaleX(0.72) translateY(-10px)',
        leftOrigin: 'left top',
        rightOrigin: 'right top',
        easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
        duration: '1050ms',
        sealSpin: 'rotate(720deg) scale(1.4)',
        soundProfile: 'sangeet',
        confetti: ['🎵', '✨', '💃', '🎉'],
        topToranType: 'velvet-garland',
        knockerIcon: '🎵',
      };

    // 7. AWADH ARCH SLIDE (Gliding arched screens with gold filigree)
    case 'nawab-of-awadh':
      return {
        styleType: 'awadh-arch-slide',
        leftTransform: 'translateX(-115%) rotateY(-35deg)',
        rightTransform: 'translateX(115%) rotateY(35deg)',
        leftOrigin: 'left center',
        rightOrigin: 'right center',
        easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
        duration: '1150ms',
        sealSpin: 'rotate(540deg) scale(1.25)',
        soundProfile: 'royal',
        confetti: ['🌙', '✨', '💎', '🕌'],
        topToranType: 'emerald-jaali',
        knockerIcon: '🌙',
      };

    // 8. SACRED TEMPLE DOORS (Solid teakwood doors & hanging brass bells)
    case 'royal-griha-utsav':
      return {
        styleType: 'sacred-temple-doors',
        leftTransform: 'translateX(-100%) rotateY(-105deg) scale(0.96)',
        rightTransform: 'translateX(100%) rotateY(105deg) scale(0.96)',
        leftOrigin: 'left center',
        rightOrigin: 'right center',
        easing: 'cubic-bezier(0.25, 0.8, 0.25, 1)',
        duration: '1250ms',
        sealSpin: 'rotate(360deg) scale(1.3)',
        soundProfile: 'temple',
        confetti: ['🪔', '🌼', '🌿', '🥥', '✨'],
        topToranType: 'sacred-mango-toran',
        knockerIcon: '🪔',
      };

    // 9. MARBLE MONUMENTAL PIVOT (Makrana white marble pivot slabs)
    case 'taj-imperial':
      return {
        styleType: 'marble-monumental-pivot',
        leftTransform: 'translateX(-105%) rotateY(-80deg)',
        rightTransform: 'translateX(105%) rotateY(80deg)',
        leftOrigin: 'left center',
        rightOrigin: 'right center',
        easing: 'cubic-bezier(0.2, 0.9, 0.3, 1)',
        duration: '1200ms',
        sealSpin: 'rotate(360deg) scale(1.2)',
        soundProfile: 'modern',
        confetti: ['🏛️', '💎', '🤍', '✨'],
        topToranType: 'minimal-line',
        knockerIcon: '🏛️',
      };

    // 10. FORTRESS DOUBLE GATES (Heavy studded iron & brass knockers)
    case 'bikaner-riyasat':
      return {
        styleType: 'fortress-double-gates',
        leftTransform: 'translateX(-100%) rotateY(-105deg) scale(0.95)',
        rightTransform: 'translateX(100%) rotateY(105deg) scale(0.95)',
        leftOrigin: 'left center',
        rightOrigin: 'right center',
        easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
        duration: '1200ms',
        sealSpin: 'rotate(720deg) scale(1.3)',
        soundProfile: 'royal',
        confetti: ['🛡️', '☀️', '✨', '🪙'],
        topToranType: 'royal-marigold',
        knockerIcon: '🛡️',
      };

    // 11. FLORAL ENVELOPE BLOOM (Botanical envelope unfold with petals)
    case 'blooming-dreams':
      return {
        styleType: 'floral-envelope-bloom',
        leftTransform: 'translateX(-105%) rotateZ(-14deg) scale(0.9)',
        rightTransform: 'translateX(105%) rotateZ(14deg) scale(0.9)',
        leftOrigin: 'bottom left',
        rightOrigin: 'bottom right',
        easing: 'cubic-bezier(0.34, 1.3, 0.64, 1)',
        duration: '1150ms',
        sealSpin: 'rotate(360deg) scale(1.5)',
        soundProfile: 'floral',
        confetti: ['🌸', '🌺', '💖', '✨'],
        topToranType: 'rose-garland',
        knockerIcon: '🌸',
      };

    // 12. MINIMALIST FROSTED SLIDE (Dual frosted glass sliding panels)
    case 'modern-minimal':
      return {
        styleType: 'minimalist-frosted-slide',
        leftTransform: 'translateX(-110%) scaleX(0.85)',
        rightTransform: 'translateX(110%) scaleX(0.85)',
        leftOrigin: 'left center',
        rightOrigin: 'right center',
        easing: 'cubic-bezier(0.2, 0.9, 0.3, 1)',
        duration: '1000ms',
        sealSpin: 'scale(0.8) translateY(-25px)',
        soundProfile: 'modern',
        confetti: ['💎', '🪙', '✨', '🤍'],
        topToranType: 'minimal-line',
        knockerIcon: '💎',
      };

    // 13. SILK RIBBON UNTIE (Silk ribbon unties with side reveal)
    case 'rose-gold-blush':
      return {
        styleType: 'silk-ribbon-untie',
        leftTransform: 'translateX(-105%) rotateZ(-8deg)',
        rightTransform: 'translateX(105%) rotateZ(8deg)',
        leftOrigin: 'top left',
        rightOrigin: 'top right',
        easing: 'cubic-bezier(0.34, 1.2, 0.64, 1)',
        duration: '1100ms',
        sealSpin: 'rotate(540deg) scale(1.4)',
        soundProfile: 'floral',
        confetti: ['💕', '🌸', '✨', '🎀'],
        topToranType: 'rose-garland',
        knockerIcon: '💖',
      };

    // 14. CELESTIAL STARLIGHT ZOOM (3D Constellation sphere split)
    case 'celestial-night':
      return {
        styleType: 'celestial-starlight-zoom',
        leftTransform: 'translateX(-120%) translateZ(-180px) rotateY(-45deg)',
        rightTransform: 'translateX(120%) translateZ(-180px) rotateY(45deg)',
        leftOrigin: 'left center',
        rightOrigin: 'right center',
        easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
        duration: '1250ms',
        sealSpin: 'rotate(1080deg) scale(2) opacity(0)',
        soundProfile: 'celestial',
        confetti: ['🌟', '✨', '💫', '🌙'],
        topToranType: 'starlight-arch',
        knockerIcon: '🌙',
      };

    // 15. BOHO LINEN FOLD (Artisanal textured linen tri-fold)
    case 'terracotta-boho':
      return {
        styleType: 'boho-linen-fold',
        leftTransform: 'translateX(-110%) rotateY(70deg) scaleX(0.85)',
        rightTransform: 'translateX(110%) rotateY(-70deg) scaleX(0.85)',
        leftOrigin: 'left center',
        rightOrigin: 'right center',
        easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
        duration: '1150ms',
        sealSpin: 'rotate(360deg) scale(1.3)',
        soundProfile: 'floral',
        confetti: ['🌿', '🌾', '🍂', '✨'],
        topToranType: 'sacred-mango-toran',
        knockerIcon: '🌿',
      };

    // 16. MANDALA KALEIDOSCOPE REVEAL (Rotating henna mandala blooming)
    case 'mehendi-magic':
      return {
        styleType: 'mandala-kaleidoscope-reveal',
        leftTransform: 'translateX(-105%) rotate(-25deg) scale(0.85)',
        rightTransform: 'translateX(105%) rotate(25deg) scale(0.85)',
        leftOrigin: 'bottom left',
        rightOrigin: 'bottom right',
        easing: 'cubic-bezier(0.34, 1.4, 0.64, 1)',
        duration: '1100ms',
        sealSpin: 'rotate(720deg) scale(1.5)',
        soundProfile: 'sangeet',
        confetti: ['🌼', '🌻', '✨', '💛'],
        topToranType: 'marigold-toran',
        knockerIcon: '🌼',
      };

    // 17. FAIRY CASTLE GATES (Enchanted castle gates with balloon pop)
    case 'little-sunshine':
      return {
        styleType: 'fairy-castle-gates',
        leftTransform: 'translateX(-115%) rotate(-10deg) scale(0.9)',
        rightTransform: 'translateX(115%) rotate(10deg) scale(0.9)',
        leftOrigin: 'bottom left',
        rightOrigin: 'bottom right',
        easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        duration: '950ms',
        sealSpin: 'rotate(720deg) scale(1.6)',
        soundProfile: 'birthday',
        confetti: ['🎈', '🎉', '⭐', '🎂', '✨'],
        topToranType: 'bunting-banner',
        knockerIcon: '👑',
      };

    // 18. CRADLE CLOUD PART (Golden-lit fluffy cloud wings parting)
    case 'sweet-nesting-baby':
      return {
        styleType: 'cradle-cloud-part',
        leftTransform: 'translateX(-115%) translateY(-15px) scale(0.88)',
        rightTransform: 'translateX(115%) translateY(-15px) scale(0.88)',
        leftOrigin: 'top left',
        rightOrigin: 'top right',
        easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
        duration: '1200ms',
        sealSpin: 'rotate(360deg) scale(1.4)',
        soundProfile: 'floral',
        confetti: ['🍼', '🧸', '✨', '💜', '⭐'],
        topToranType: 'rose-garland',
        knockerIcon: '🍼',
      };

    // 19. CRYSTAL LUXE SPLIT (Faceted crystal glass refraction gates)
    case 'silver-anniversary':
      return {
        styleType: 'crystal-luxe-split',
        leftTransform: 'translateX(-110%) rotateY(60deg) scale(0.9)',
        rightTransform: 'translateX(110%) rotateY(-60deg) scale(0.9)',
        leftOrigin: 'left center',
        rightOrigin: 'right center',
        easing: 'cubic-bezier(0.2, 0.9, 0.3, 1)',
        duration: '1050ms',
        sealSpin: 'scale(1.25) rotate(360deg)',
        soundProfile: 'modern',
        confetti: ['🥂', '💎', '🪙', '✨', '🤍'],
        topToranType: 'minimal-line',
        knockerIcon: '🥂',
      };

    // 20. TROPICAL PALM SHUTTER (Louvered beach pavilion shutters)
    case 'coastal-breeze':
    default:
      return {
        styleType: 'tropical-palm-shutter',
        leftTransform: 'translateX(-110%) translateY(12px) rotate(-8deg)',
        rightTransform: 'translateX(110%) translateY(12px) rotate(8deg)',
        leftOrigin: 'top left',
        rightOrigin: 'top right',
        easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
        duration: '1200ms',
        sealSpin: 'rotate(540deg) scale(1.3)',
        soundProfile: 'floral',
        confetti: ['🐚', '🏖️', '🌊', '🌴', '✨'],
        topToranType: 'eucalyptus-wreath',
        knockerIcon: '🐚',
      };
  }
};

const OpeningScreen = ({ invitation = {}, theme = {}, onEnter, isPreview = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRendered, setIsRendered] = useState(true);
  const [petals, setPetals] = useState([]);

  const templateId = invitation.template_id || invitation.templateId || 'royal-love';
  const themeStyles = getThemeStyles(templateId);
  const transitionConfig = getTransitionConfig(templateId);

  const getMonogram = () => {
    if (invitation.bride_name && invitation.groom_name) {
      return `${invitation.bride_name.trim().charAt(0)} & ${invitation.groom_name.trim().charAt(0)}`;
    }
    const names = invitation.names || 'Aarav & Kiara';
    const parts = names.split('&');
    if (parts.length >= 2) {
      return `${parts[0].trim().charAt(0)} & ${parts[1].trim().charAt(0)}`;
    }
    return names.slice(0, 2).toUpperCase();
  };

  const handleOpenDoors = (e) => {
    if (e) {
      e.stopPropagation();
    }
    if (isOpen) return;

    // 1. Play sound matching specific gate style profile
    playDoorSound(transitionConfig.soundProfile);

    // 2. Generate customized confetti shower
    const confPool = transitionConfig.confetti;
    const newPetals = Array.from({ length: 28 }).map((_, i) => ({
      id: i,
      left: Math.random() * 92 + 4,
      size: Math.random() * 14 + 12,
      delay: Math.random() * 0.25,
      duration: Math.random() * 1.3 + 1.2,
      rotation: Math.random() * 360,
      type: confPool[i % confPool.length],
    }));
    setPetals(newPetals);

    // 3. Trigger door opening animation
    setIsOpen(true);

    // 4. Notify parent to start background music
    if (onEnter) {
      onEnter();
    }

    // 5. Unmount opening screen after smooth animation
    setTimeout(() => {
      setIsRendered(false);
    }, 1150);
  };

  if (!isRendered) return null;

  return (
    <div
      onClick={handleOpenDoors}
      className={`${
        isPreview ? 'absolute' : 'fixed'
      } inset-0 z-50 flex items-center justify-center font-sans select-none w-full h-full cursor-pointer overflow-hidden transition-opacity duration-700 ${
        isOpen ? 'pointer-events-none opacity-0 delay-700 bg-transparent' : 'opacity-100 bg-black/95'
      }`}
      style={{
        perspective: '1400px',
      }}
    >
      {/* ------------------------------------------------------------- */}
      {/* ROYAL PALACE FRAME & DOORS CONTAINER */}
      {/* ------------------------------------------------------------- */}
      <div
        className={`relative w-full h-full max-w-[440px] max-h-[740px] mx-auto overflow-hidden sm:rounded-3xl border sm:border-2 ${themeStyles.frameBorder} shadow-[0_0_60px_rgba(212,175,55,0.4)] bg-[#070D1F] flex flex-col justify-between`}
      >
        {/* Palace Interior Glow (Revealed behind opening doors) */}
        <div className={`absolute inset-0 z-0 flex flex-col items-center justify-center bg-gradient-to-b ${themeStyles.innerGlow} text-center p-6`}>
          <div className="w-56 h-56 rounded-full bg-[#d4af37]/30 blur-3xl animate-pulse" />
          <div className="z-10 space-y-2 animate-fade-in max-w-xs">
            <Sparkles className="w-8 h-8 text-[#f3cf5b] mx-auto animate-spin-slow" />
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-amber-100 tracking-tight leading-tight drop-shadow-md">
              {invitation.names || 'Aarav & Kiara'}
            </h3>
            <p className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#f3cf5b] font-bold">
              Welcome To Our Celebration
            </p>
          </div>
        </div>

        {/* Top Decorative Toran / Garland */}
        <div
          className={`absolute top-0 inset-x-0 z-30 flex justify-center pointer-events-none transition-all duration-700 ${
            isOpen ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'
          }`}
        >
          <div className="w-full h-7 bg-gradient-to-b from-black/80 via-[#1C2541]/70 to-transparent border-b border-[#d4af37]/50 flex items-center justify-around px-2 shadow">
            {Array.from({ length: 7 }).map((_, idx) => (
              <span key={idx} className="text-[10px] drop-shadow">
                {transitionConfig.topToranType === 'sacred-mango-toran'
                  ? '🌿'
                  : transitionConfig.topToranType === 'rose-garland'
                  ? '🌸'
                  : transitionConfig.topToranType === 'starlight-arch'
                  ? '✨'
                  : transitionConfig.topToranType === 'bunting-banner'
                  ? '🚩'
                  : transitionConfig.topToranType === 'emerald-jaali'
                  ? '🟢'
                  : '🌼'}
              </span>
            ))}
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* 1. LEFT DOOR PANEL */}
        {/* ------------------------------------------------------------- */}
        <div
          className="absolute top-0 bottom-0 left-0 w-1/2 z-20 flex flex-col justify-between p-3 border-r border-[#d4af37]/80 shadow-2xl pointer-events-none"
          style={{
            background: themeStyles.doorBgLeft,
            transformOrigin: transitionConfig.leftOrigin,
            transform: isOpen ? transitionConfig.leftTransform : 'none',
            opacity: isOpen ? 0 : 1,
            transition: `transform ${transitionConfig.duration} ${transitionConfig.easing}, opacity ${transitionConfig.duration} ease`,
            boxShadow: 'inset -6px 0 20px rgba(0,0,0,0.9), inset 0 0 15px rgba(212, 175, 55, 0.25)',
          }}
        >
          {/* Inner Golden Border */}
          <div className="absolute inset-2 border border-[#d4af37]/50 rounded-lg pointer-events-none" />

          {/* Top Panel Ornament */}
          <div className="relative z-10 w-full h-[15vh] min-h-[55px] max-h-[95px] rounded-t-lg border border-[#d4af37]/60 bg-[#0B132B]/80 p-1 flex flex-col items-center justify-center shadow-inner overflow-hidden">
            <div className="text-center text-amber-200">
              <span className="text-base animate-pulse">{transitionConfig.knockerIcon || '👑'}</span>
              <span className="text-[7px] block font-mono text-amber-300 uppercase tracking-widest">
                {themeStyles.badgeText || 'Royal'}
              </span>
            </div>
            <div className="absolute top-1 left-1 text-[8px] text-[#f3cf5b]">✦</div>
          </div>

          {/* Center Brass Rivets */}
          <div className="flex items-center justify-around py-2">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div
                key={idx}
                className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-amber-200 via-amber-400 to-amber-700 shadow border border-amber-300/80"
              />
            ))}
          </div>

          {/* Left Door Knocker */}
          <div className="absolute right-2 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-300 via-amber-500 to-amber-800 p-0.5 shadow-lg border border-amber-200 flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-neutral-900 flex items-center justify-center">
                <span className="text-xs">
                  {transitionConfig.knockerIcon || '👑'}
                </span>
              </div>
            </div>
            <div className="w-4 h-4 -mt-0.5 rounded-b-full border border-amber-400 shadow" />
          </div>

          {/* Bottom Carved Panel */}
          <div className="relative z-10 w-full h-[15vh] min-h-[50px] max-h-[90px] rounded-b-lg border border-[#d4af37]/40 bg-[#0B132B]/80 p-1 flex flex-col items-center justify-center shadow-inner overflow-hidden">
            <span className="text-[7px] uppercase font-mono tracking-widest text-[#d4af37]/60 font-bold">
              {transitionConfig.styleType.startsWith('sacred')
                ? 'Shubh'
                : transitionConfig.styleType.includes('floral')
                ? 'Elegance'
                : 'Royal'}
            </span>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* 2. RIGHT DOOR PANEL */}
        {/* ------------------------------------------------------------- */}
        <div
          className="absolute top-0 bottom-0 right-0 w-1/2 z-20 flex flex-col justify-between p-3 border-l border-[#d4af37]/80 shadow-2xl pointer-events-none"
          style={{
            background: themeStyles.doorBgRight,
            transformOrigin: transitionConfig.rightOrigin,
            transform: isOpen ? transitionConfig.rightTransform : 'none',
            opacity: isOpen ? 0 : 1,
            transition: `transform ${transitionConfig.duration} ${transitionConfig.easing}, opacity ${transitionConfig.duration} ease`,
            boxShadow: 'inset 6px 0 20px rgba(0,0,0,0.9), inset 0 0 15px rgba(212, 175, 55, 0.25)',
          }}
        >
          {/* Inner Golden Border */}
          <div className="absolute inset-2 border border-[#d4af37]/50 rounded-lg pointer-events-none" />

          {/* Top Panel Ornament */}
          <div className="relative z-10 w-full h-[15vh] min-h-[55px] max-h-[95px] rounded-t-lg border border-[#d4af37]/60 bg-[#0B132B]/80 p-1 flex flex-col items-center justify-center shadow-inner overflow-hidden">
            <div className="text-center text-amber-200">
              <span className="text-base animate-pulse">{transitionConfig.knockerIcon || '✨'}</span>
              <span className="text-[7px] block font-mono text-amber-300 uppercase tracking-widest">
                {themeStyles.badgeText || 'Heritage'}
              </span>
            </div>
            <div className="absolute top-1 right-1 text-[8px] text-[#f3cf5b]">✦</div>
          </div>

          {/* Center Brass Rivets */}
          <div className="flex items-center justify-around py-2">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div
                key={idx}
                className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-amber-200 via-amber-400 to-amber-700 shadow border border-amber-300/80"
              />
            ))}
          </div>

          {/* Right Door Knocker */}
          <div className="absolute left-2 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-300 via-amber-500 to-amber-800 p-0.5 shadow-lg border border-amber-200 flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-neutral-900 flex items-center justify-center">
                <span className="text-xs">
                  {transitionConfig.knockerIcon || '👑'}
                </span>
              </div>
            </div>
            <div className="w-4 h-4 -mt-0.5 rounded-b-full border border-amber-400 shadow" />
          </div>

          {/* Bottom Carved Panel */}
          <div className="relative z-10 w-full h-[15vh] min-h-[50px] max-h-[90px] rounded-b-lg border border-[#d4af37]/40 bg-[#0B132B]/80 p-1 flex flex-col items-center justify-center shadow-inner overflow-hidden">
            <span className="text-[7px] uppercase font-mono tracking-widest text-[#d4af37]/60 font-bold">
              {transitionConfig.styleType.startsWith('sacred')
                ? 'Labh'
                : transitionConfig.styleType.includes('floral')
                ? 'Romance'
                : 'Heritage'}
            </span>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* 3. CENTER WAX SEAL (CUSTOM MULTI-TRANSITION UNLOCK) */}
        {/* ------------------------------------------------------------- */}
        <div
          className="absolute inset-0 z-40 flex flex-col items-center justify-center pointer-events-auto p-4 transition-all duration-700"
          style={{
            transform: isOpen ? 'scale(1.2)' : 'scale(1)',
            opacity: isOpen ? 0 : 1,
            pointerEvents: isOpen ? 'none' : 'auto',
          }}
        >
          {/* Top Tagline */}
          <span className="text-[9px] uppercase font-mono tracking-[0.25em] text-[#f3cf5b] font-bold drop-shadow mb-3">
            {invitation.opening_heading || 'Cordially Invites You To Celebrate'}
          </span>

          {/* Rotating Wax Seal Medallion */}
          <div
            onClick={handleOpenDoors}
            className="cursor-pointer group relative flex flex-col items-center justify-center transition-all"
            style={{
              transform: isOpen ? transitionConfig.sealSpin : 'rotate(0deg) scale(1)',
              transition: `transform ${transitionConfig.duration} ${transitionConfig.easing}, opacity 0.5s ease`,
            }}
          >
            {/* Glowing Ring Auras */}
            <div className="absolute -inset-4 rounded-full bg-[#d4af37]/40 blur-md animate-ping duration-1000" />
            <div className="absolute -inset-1.5 rounded-full bg-[#f3cf5b]/50 blur-sm animate-pulse" />

            {/* Wax Seal 3D Body */}
            <div
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full p-1.5 shadow-[0_0_35px_rgba(212,175,55,0.6)] border-2 border-[#d4af37] relative flex items-center justify-center group-hover:scale-105 active:scale-95 transition-transform"
              style={{ background: themeStyles.sealBg }}
            >
              <div className="w-full h-full rounded-full border border-dashed border-[#d4af37]/70 flex flex-col items-center justify-center bg-black/50 text-center p-1">
                <span className="text-sm">{theme.crestIcon || transitionConfig.knockerIcon || '👑'}</span>

                {/* Couple Monogram Initials */}
                <span className="font-serif text-lg sm:text-xl font-bold tracking-widest bg-gradient-to-r from-amber-200 via-yellow-200 to-amber-100 bg-clip-text text-transparent drop-shadow-md leading-none my-0.5">
                  {getMonogram()}
                </span>

                <span className="text-[6.5px] uppercase font-mono tracking-widest text-[#f3cf5b] font-bold">
                  {themeStyles.badgeText || 'Royal Seal'}
                </span>
              </div>

              {/* Mini Badge */}
              <div className="absolute -top-1 px-2 py-0.2 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-[7px] font-mono font-bold text-neutral-950 uppercase tracking-widest border border-amber-200 shadow">
                {transitionConfig.styleType === 'fairy-castle-gates' ? 'Party' : 'VIP'}
              </div>
            </div>
          </div>

          {/* Couple Heading */}
          <div className="mt-3 text-center space-y-0.5 max-w-[280px]">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-white tracking-tight drop-shadow-md leading-tight">
              {invitation.names || 'Aarav & Kiara'}
            </h2>
            <p className="text-[9px] text-[#cbd5e1] font-mono tracking-wider">
              {invitation.event_date || invitation.date
                ? new Date(invitation.event_date || invitation.date).toLocaleDateString('en-IN', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })
                : 'Nov 20, 2026'}
            </p>
          </div>

          {/* Action Button */}
          <div className="mt-3">
            <button
              type="button"
              onClick={handleOpenDoors}
              className="px-5 py-2 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold text-[10.5px] uppercase tracking-wider shadow-lg transform hover:scale-105 active:scale-95 transition-all flex items-center justify-center space-x-1.5 border border-amber-200 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-neutral-950 animate-spin-slow" />
              <span>Tap Seal to Open Doors</span>
            </button>
          </div>

          {/* Tap / Scroll Hint */}
          <div className="mt-2 flex flex-col items-center space-y-0.5 text-[8px] text-[#f3cf5b] uppercase font-mono tracking-widest animate-pulse">
            <span>Tap to Enter Palace</span>
            <ChevronDown className="w-3 h-3 animate-bounce text-[#f3cf5b]" />
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* 4. DYNAMIC THEME CONFETTI SHOWER */}
        {/* ------------------------------------------------------------- */}
        {isOpen && (
          <div className="absolute inset-0 z-50 pointer-events-none overflow-hidden">
            {petals.map((petal) => (
              <div
                key={petal.id}
                className="absolute"
                style={{
                  left: `${petal.left}%`,
                  top: '-25px',
                  animation: `fall-petal ${petal.duration}s linear ${petal.delay}s forwards`,
                  transform: `rotate(${petal.rotation}deg)`,
                }}
              >
                <span
                  style={{ fontSize: `${petal.size}px` }}
                  className="drop-shadow-md select-none"
                >
                  {petal.type}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Global Petal Falling & Spin Keyframes */}
      <style>{`
        @keyframes fall-petal {
          0% {
            transform: translateY(0) rotate(0deg) scale(0.8);
            opacity: 1;
          }
          50% {
            transform: translateY(40vh) rotate(180deg) scale(1.1);
            opacity: 0.95;
          }
          100% {
            transform: translateY(85vh) rotate(360deg) scale(0.6);
            opacity: 0;
          }
        }
        .animate-spin-slow {
          animation: spin 12s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default OpeningScreen;
