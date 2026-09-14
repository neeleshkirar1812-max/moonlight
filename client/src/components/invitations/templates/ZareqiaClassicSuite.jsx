import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  DoorClosed,
  Navigation,
  Send,
  Camera,
  Shirt,
  Gift,
} from 'lucide-react';
import ZareqiaBody, {
  WaveOrnament,
  HeartDivider,
  PalaceCorner,
  FloralCorner,
  MinimalCorner,
  ClassicCorner,
  DamaskPattern,
  ZareqiaScratchCard,
  ZareqiaCountdown,
  ZareqiaTimeline,
  ZareqiaVenue,
  ZareqiaRsvp,
  ZareqiaDressCode,
  ZareqiaGifts,
} from './ZareqiaBody';

// =========================================================================
// 1. EXACT SVG ORNAMENTS & CORNER BRACKETS FROM ZAREQIA
// =========================================================================

// Rose Gold Botanical Floral Corner SVG (1:1 from Zareqia `of`)
export const ZareqiaFloralCornerSVG = ({ className = '', style = {} }) => (
  <svg
    viewBox="0 0 120 120"
    className={className}
    style={style}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10 100C10 100 25 75 40 60C55 45 70 50 65 65C60 80 40 80 35 65C30 50 50 35 65 40C80 45 75 70 60 80"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      opacity="0.35"
    />
    <circle cx="40" cy="60" r="4" fill="currentColor" opacity="0.2" />
    <circle cx="35" cy="65" r="2.5" fill="currentColor" opacity="0.15" />
    <path
      d="M50 45C48 40 52 36 56 38C60 40 58 46 54 47"
      stroke="currentColor"
      strokeWidth="0.6"
      opacity="0.25"
    />
  </svg>
);

// Modern Minimal Diamond Geometric Corner SVG (1:1 from Zareqia `sf`)
export const ZareqiaDiamondCornerSVG = ({ className = '', style = {} }) => (
  <svg
    viewBox="0 0 80 80"
    className={className}
    style={style}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0 0L30 0L30 2L2 2L2 30L0 30Z"
      stroke="currentColor"
      strokeWidth="1"
      opacity="0.4"
    />
    <path
      d="M8 8L22 8L22 10L10 10L10 22L8 22Z"
      stroke="currentColor"
      strokeWidth="0.5"
      opacity="0.3"
    />
    <circle cx="15" cy="15" r="1" fill="currentColor" opacity="0.4" />
  </svg>
);

// Palace Baroque Arch Corner SVG (1:1 from Zareqia `Ni`)
export const ZareqiaPalaceArchCornerSVG = ({ className = '', style = {} }) => (
  <svg
    viewBox="0 0 100 100"
    className={className}
    style={style}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5 5C5 5 20 10 30 25C40 40 35 55 25 60C15 65 10 55 15 45C20 35 35 30 45 35C55 40 50 55 40 60"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      opacity="0.5"
    />
    <path
      d="M10 2C10 2 25 8 32 20C39 32 36 42 30 46"
      stroke="currentColor"
      strokeWidth="0.8"
      opacity="0.3"
    />
  </svg>
);

// Mughal Arch Corner SVG (1:1 from Zareqia `tre`)
export const ZareqiaMughalCornerSVG = ({ className = '', style = {} }) => (
  <svg
    viewBox="0 0 60 60"
    className={className}
    style={style}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M60 0 L60 20 Q60 40 40 50 L20 60"
      stroke="currentColor"
      strokeWidth="0.8"
      fill="none"
    />
    <path
      d="M60 0 L60 15 Q60 30 45 40"
      stroke="currentColor"
      strokeWidth="0.5"
      fill="none"
      opacity="0.5"
    />
  </svg>
);

// Obsidian Flourish Corner SVG (1:1 from Zareqia `Jne`)
export const ZareqiaObsidianCornerSVG = ({ className = '', style = {} }) => (
  <svg
    viewBox="0 0 80 80"
    className={className}
    style={style}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M80 0 L80 25 Q80 50 55 65 L30 80"
      stroke="currentColor"
      strokeWidth="0.8"
      fill="none"
    />
    <path
      d="M80 0 L80 18 Q80 35 60 48"
      stroke="currentColor"
      strokeWidth="0.5"
      fill="none"
      opacity="0.5"
    />
    <circle cx="80" cy="0" r="2" fill="currentColor" opacity="0.4" />
  </svg>
);

// 3D Wax Seal Button (1:1 from Zareqia `no`)
export const ZareqiaWaxSealButton = ({
  onClick,
  letter = '',
  sealColor = 'hsl(0, 65%, 22%)',
  sealHighlight = 'hsl(0, 55%, 42%)',
  accentColor = 'hsl(40, 60%, 75%)',
}) => (
  <motion.button
    type="button"
    onClick={onClick}
    className="relative w-28 h-28 md:w-36 md:h-36 rounded-full cursor-pointer focus:outline-none select-none shadow-2xl"
    whileHover={{ scale: 1.08 }}
    whileTap={{ scale: 0.95 }}
    animate={{ y: [0, -6, 0] }}
    transition={{ y: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' } }}
    aria-label="Open invitation"
  >
    {/* Outer Wax Ring with Organic Ridges */}
    <div
      className="absolute inset-0 rounded-full shadow-[inset_0_4px_12px_rgba(255,255,255,0.3),0_8px_24px_rgba(0,0,0,0.6)]"
      style={{
        background: `radial-gradient(circle at 35% 35%, ${sealHighlight} 0%, ${sealColor} 70%, #000000 100%)`,
        border: `2px solid ${accentColor}`,
      }}
    >
      {/* Decorative Beaded Ring */}
      <div
        className="absolute inset-2.5 md:inset-3.5 rounded-full border border-dashed opacity-40"
        style={{ borderColor: accentColor }}
      />
      {/* Inner Recessed Medallion */}
      <div
        className="absolute inset-5 md:inset-7 rounded-full flex items-center justify-center shadow-[inset_0_2px_8px_rgba(0,0,0,0.8)]"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${sealColor} 0%, #000000 100%)`,
          border: '1px solid rgba(255,255,255,0.15)',
        }}
      >
        <span
          className="font-serif text-2xl md:text-4xl font-bold tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] select-none"
          style={{ color: accentColor }}
        >
          {letter || '✦'}
        </span>
      </div>
    </div>
  </motion.button>
);

// =========================================================================
// 2. THE 5 DISTINCT OPENING GATES (1:1 REPLICAS FROM ZAREQIA)
// =========================================================================

// Gate 1: Emerald Mughal Jaali 3D Double Swing Gate (`tre`)
export const EmeraldNoirGate = ({ onComplete }) => {
  const [opening, setOpening] = useState(false);
  const [faded, setFaded] = useState(false);

  const handleOpen = () => {
    setOpening(true);
    setTimeout(() => setFaded(true), 3200);
    setTimeout(onComplete, 3600);
  };

  const particles = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => ({
        id: i,
        tx: (Math.random() - 0.5) * 550,
        ty: (Math.random() - 0.5) * 550,
        size: 2 + Math.random() * 4,
        delay: Math.random() * 0.3,
      })),
    []
  );

  return (
    <AnimatePresence>
      {!faded && (
        <motion.div
          className="fixed inset-0 z-[100]"
          style={{ perspective: '1600px', perspectiveOrigin: '50% 50%' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Radial Gold Aura */}
          <motion.div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse at center, rgba(201,163,85,0.0) 0%, rgba(15,25,20,1) 100%)',
            }}
            animate={
              opening
                ? {
                    background:
                      'radial-gradient(ellipse at center, rgba(201,163,85,0.1) 0%, rgba(15,25,20,0.2) 100%)',
                  }
                : {}
            }
            transition={{ duration: 2 }}
          />

          {/* Left 3D Mughal Jaali Door */}
          <motion.div
            className="absolute top-0 left-0 w-1/2 h-full"
            style={{
              transformOrigin: 'left center',
              transformStyle: 'preserve-3d',
              background:
                'linear-gradient(135deg, hsl(160, 30%, 12%) 0%, hsl(160, 25%, 16%) 50%, hsl(160, 20%, 10%) 100%)',
              borderRight: '1px solid hsl(40, 40%, 35%)',
            }}
            animate={opening ? { rotateY: -85 } : { rotateY: 0 }}
            transition={{ duration: 3.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <ZareqiaMughalCornerSVG className="absolute top-4 right-4 w-16 h-16 opacity-30 text-amber-300" />
            <ZareqiaMughalCornerSVG className="absolute bottom-4 right-4 w-16 h-16 opacity-30 rotate-90 text-amber-300" />
            <div
              className="absolute top-8 bottom-8 right-6 w-px opacity-20"
              style={{ background: 'hsl(40, 50%, 55%)' }}
            />
          </motion.div>

          {/* Right 3D Mughal Jaali Door */}
          <motion.div
            className="absolute top-0 right-0 w-1/2 h-full"
            style={{
              transformOrigin: 'right center',
              transformStyle: 'preserve-3d',
              background:
                'linear-gradient(225deg, hsl(160, 30%, 12%) 0%, hsl(160, 25%, 16%) 50%, hsl(160, 20%, 10%) 100%)',
              borderLeft: '1px solid hsl(40, 40%, 35%)',
            }}
            animate={opening ? { rotateY: 85 } : { rotateY: 0 }}
            transition={{ duration: 3.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <ZareqiaMughalCornerSVG className="absolute top-4 left-4 w-16 h-16 opacity-30 -scale-x-100 text-amber-300" />
            <ZareqiaMughalCornerSVG className="absolute bottom-4 left-4 w-16 h-16 opacity-30 rotate-90 -scale-x-100 text-amber-300" />
            <div
              className="absolute top-8 bottom-8 left-6 w-px opacity-20"
              style={{ background: 'hsl(40, 50%, 55%)' }}
            />
          </motion.div>

          {/* Center Wax Seal & Titles */}
          {!opening && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 text-center select-none pointer-events-auto">
              <motion.p
                className="font-serif text-sm md:text-base tracking-[0.25em] uppercase mb-6"
                style={{ color: 'hsl(40, 40%, 75%)' }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Request the pleasure of your company
              </motion.p>
              <ZareqiaWaxSealButton
                onClick={handleOpen}
                letter="ع"
                sealColor="hsl(160, 40%, 15%)"
                sealHighlight="hsl(40, 50%, 45%)"
                accentColor="hsl(40, 50%, 75%)"
              />
              <motion.p
                className="font-serif text-xs md:text-sm tracking-[0.2em] uppercase mt-6"
                style={{ color: 'hsl(40, 30%, 55%)' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                transition={{ delay: 0.7 }}
              >
                tap the seal to open
              </motion.p>
            </div>
          )}

          {/* Gold Sparkles Burst on Open */}
          {opening && (
            <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
              {particles.map((p) => (
                <motion.div
                  key={p.id}
                  className="absolute rounded-full bg-amber-300"
                  style={{ width: p.size, height: p.size }}
                  initial={{ x: 0, y: 0, opacity: 1 }}
                  animate={{ x: p.tx, y: p.ty, opacity: 0 }}
                  transition={{ duration: 1.8, delay: p.delay, ease: 'easeOut' }}
                />
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Gate 2: Crimson Royale Split Horizontal Sliding Gate (`Jne`)
export const CrimsonRoyaleGate = ({ onComplete }) => {
  const [opening, setOpening] = useState(false);
  const [faded, setFaded] = useState(false);

  const handleOpen = () => {
    setOpening(true);
    setTimeout(() => setFaded(true), 2800);
    setTimeout(onComplete, 3200);
  };

  const particles = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => ({
        id: i,
        tx: (Math.random() - 0.5) * 500,
        ty: (Math.random() - 0.5) * 500,
        size: 2 + Math.random() * 4,
      })),
    []
  );

  return (
    <AnimatePresence>
      {!faded && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
          style={{
            background:
              'linear-gradient(180deg, hsl(0, 0%, 5%) 0%, hsl(0, 0%, 10%) 100%)',
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Subtle Geometric Background */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0L40 20L20 40L0 20Z' stroke='%23c9a355' stroke-width='0.3' fill='none'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Left Split Door */}
          <motion.div
            className="absolute top-0 left-0 w-1/2 h-full"
            style={{
              transformOrigin: 'left center',
              background:
                'linear-gradient(135deg, hsl(0, 0%, 8%) 0%, hsl(0, 0%, 12%) 50%, hsl(0, 0%, 6%) 100%)',
              borderRight: '1px solid hsl(40, 40%, 25%)',
            }}
            animate={opening ? { x: '-100%' } : { x: '0%' }}
            transition={{ duration: 2.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <ZareqiaObsidianCornerSVG className="absolute top-6 right-6 w-20 h-20 opacity-25 text-amber-300" />
            <ZareqiaObsidianCornerSVG className="absolute bottom-6 right-6 w-20 h-20 opacity-25 rotate-90 text-amber-300" />
            <div
              className="absolute top-10 bottom-10 right-8 w-px opacity-15"
              style={{ background: 'hsl(0, 60%, 40%)' }}
            />
          </motion.div>

          {/* Right Split Door */}
          <motion.div
            className="absolute top-0 right-0 w-1/2 h-full"
            style={{
              transformOrigin: 'right center',
              background:
                'linear-gradient(225deg, hsl(0, 0%, 8%) 0%, hsl(0, 0%, 12%) 50%, hsl(0, 0%, 6%) 100%)',
              borderLeft: '1px solid hsl(40, 40%, 25%)',
            }}
            animate={opening ? { x: '100%' } : { x: '0%' }}
            transition={{ duration: 2.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <ZareqiaObsidianCornerSVG className="absolute top-6 left-6 w-20 h-20 opacity-25 -scale-x-100 text-amber-300" />
            <ZareqiaObsidianCornerSVG className="absolute bottom-6 left-6 w-20 h-20 opacity-25 rotate-90 -scale-x-100 text-amber-300" />
            <div
              className="absolute top-10 bottom-10 left-8 w-px opacity-15"
              style={{ background: 'hsl(0, 60%, 40%)' }}
            />
          </motion.div>

          {/* Ruby Wax Seal & Titles */}
          {!opening && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 text-center select-none pointer-events-auto">
              <motion.p
                className="font-serif text-sm md:text-base tracking-[0.25em] uppercase mb-6"
                style={{ color: 'hsl(0, 65%, 65%)' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Cordially invite you to celebrate
              </motion.p>
              <ZareqiaWaxSealButton
                onClick={handleOpen}
                letter="♚"
                sealColor="hsl(0, 65%, 22%)"
                sealHighlight="hsl(0, 55%, 42%)"
                accentColor="hsl(40, 60%, 75%)"
              />
              <motion.p
                className="font-serif text-xs md:text-sm tracking-[0.2em] uppercase mt-6"
                style={{ color: 'hsl(40, 25%, 50%)' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                transition={{ delay: 0.7 }}
              >
                tap the seal to open
              </motion.p>
            </div>
          )}

          {/* Crimson & Ruby Particles Burst */}
          {opening && (
            <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
              {particles.map((p) => (
                <motion.div
                  key={p.id}
                  className="absolute rounded-full"
                  style={{
                    width: p.size,
                    height: p.size,
                    background:
                      p.id % 2 === 0 ? 'hsl(0, 75%, 55%)' : 'hsl(40, 70%, 65%)',
                  }}
                  initial={{ x: 0, y: 0, opacity: 1 }}
                  animate={{ x: p.tx, y: p.ty, opacity: 0 }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                />
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Gate 3: Rose Gold Blush Ornate Floral Swing Gate (`Kne`)
export const RoseGoldBlushGate = ({ onComplete }) => {
  const [opening, setOpening] = useState(false);
  const [faded, setFaded] = useState(false);

  const handleOpen = () => {
    setOpening(true);
    setTimeout(onComplete, 1800);
    setTimeout(() => setFaded(true), 3000);
  };

  const particles = useMemo(
    () =>
      Array.from({ length: 28 }, (_, i) => ({
        id: i,
        size: 3 + Math.random() * 4,
        tx: (Math.random() - 0.5) * 500,
        ty: (Math.random() - 0.5) * 500,
        delay: Math.random() * 0.3,
      })),
    []
  );

  const bgSvg = `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5C30 5 40 15 40 25C40 35 30 45 30 45C30 45 20 35 20 25C20 15 30 5 30 5Z' stroke='%23b76e79' stroke-width='0.5' fill='none'/%3E%3Ccircle cx='30' cy='25' r='3' stroke='%23b76e79' stroke-width='0.3' fill='none'/%3E%3C/svg%3E")`;

  return (
    <AnimatePresence>
      {!faded && (
        <motion.div
          className="fixed inset-0 z-[100]"
          style={{ perspective: '1600px', perspectiveOrigin: '50% 50%' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          {/* Radial Blush Aura */}
          <motion.div
            className="absolute inset-0 z-0"
            style={{
              background:
                'radial-gradient(ellipse at center, rgba(183,110,121,0.0) 0%, rgba(245,230,224,1) 100%)',
            }}
            animate={
              opening
                ? {
                    background:
                      'radial-gradient(ellipse at center, rgba(183,110,121,0.12) 0%, rgba(245,230,224,0.2) 100%)',
                  }
                : {}
            }
            transition={{ duration: 1.8, delay: 0.5 }}
          />

          {/* Left Floral Arch Door */}
          <motion.div
            className="absolute top-0 left-0 w-1/2 h-full"
            style={{
              transformOrigin: 'left center',
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'hidden',
            }}
            animate={opening ? { rotateY: -100 } : { rotateY: 0 }}
            transition={{ duration: 3, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(160deg, #f5e6e0 0%, #e8cfc5 40%, #d4b5a8 100%)',
              }}
            >
              <div
                className="absolute inset-0 opacity-[0.08]"
                style={{ backgroundImage: bgSvg, backgroundSize: '60px 60px' }}
              />
              <div
                className="absolute inset-3 md:inset-5 rounded"
                style={{ border: '1.5px solid rgba(183,110,121,0.3)' }}
              >
                <div
                  className="absolute inset-2 md:inset-3 rounded"
                  style={{ border: '1px solid rgba(183,110,121,0.15)' }}
                />
              </div>
            </div>
          </motion.div>

          {/* Right Floral Arch Door */}
          <motion.div
            className="absolute top-0 right-0 w-1/2 h-full"
            style={{
              transformOrigin: 'right center',
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'hidden',
            }}
            animate={opening ? { rotateY: 100 } : { rotateY: 0 }}
            transition={{ duration: 3, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(200deg, #f5e6e0 0%, #e8cfc5 40%, #d4b5a8 100%)',
              }}
            >
              <div
                className="absolute inset-0 opacity-[0.08]"
                style={{ backgroundImage: bgSvg, backgroundSize: '60px 60px' }}
              />
              <div
                className="absolute inset-3 md:inset-5 rounded"
                style={{ border: '1.5px solid rgba(183,110,121,0.3)' }}
              >
                <div
                  className="absolute inset-2 md:inset-3 rounded"
                  style={{ border: '1px solid rgba(183,110,121,0.15)' }}
                />
              </div>
            </div>
          </motion.div>

          {/* Rose Gold Wax Seal */}
          {!opening && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 text-center select-none pointer-events-auto">
              <motion.p
                className="font-serif italic text-2xl md:text-3xl mb-4"
                style={{ color: '#9b4d5a' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                You're Invited
              </motion.p>
              <ZareqiaWaxSealButton
                onClick={handleOpen}
                letter="♥"
                sealColor="#9b4d5a"
                sealHighlight="#d4717a"
                accentColor="#f8e8e0"
              />
              <motion.p
                className="font-serif italic text-base md:text-lg mt-4"
                style={{ color: '#b5636e' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ delay: 0.8 }}
              >
                tap the seal to open
              </motion.p>
            </div>
          )}

          {/* Rose Petal Confetti Particles */}
          {opening && (
            <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
              {particles.map((p) => (
                <motion.div
                  key={p.id}
                  className="absolute rounded-full"
                  style={{
                    width: p.size,
                    height: p.size,
                    background:
                      p.id % 2 === 0 ? '#f43f5e' : '#fda4af',
                  }}
                  initial={{ x: 0, y: 0, opacity: 1 }}
                  animate={{ x: p.tx, y: p.ty, opacity: 0 }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                />
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Gate 4: Modern Minimal Architectural Sliding Panels (`Vne`)
export const ModernMinimalGate = ({ onComplete }) => {
  const [opening, setOpening] = useState(false);

  const handleOpen = () => {
    setOpening(true);
    setTimeout(onComplete, 2800);
  };

  const particles = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        tx: (Math.random() - 0.5) * 400,
        ty: (Math.random() - 0.5) * 400,
      })),
    []
  );

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Left Navy Panel */}
      <motion.div
        className="w-1/2 h-full relative overflow-hidden"
        style={{
          background: 'linear-gradient(to right, #0f1628, #1a2440)',
        }}
        animate={opening ? { x: '-100%' } : { x: '0%' }}
        transition={{ duration: 2.5, ease: [0.65, 0, 0.35, 1] }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30Z' stroke='%23d4af37' stroke-width='0.5' fill='none'/%3E%3C/svg%3E")`,
          }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-px"
          style={{
            background:
              'linear-gradient(to bottom, transparent, #d4af37, transparent)',
          }}
        />
      </motion.div>

      {/* Right Navy Panel */}
      <motion.div
        className="w-1/2 h-full relative overflow-hidden"
        style={{
          background: 'linear-gradient(to left, #0f1628, #1a2440)',
        }}
        animate={opening ? { x: '100%' } : { x: '0%' }}
        transition={{ duration: 2.5, ease: [0.65, 0, 0.35, 1] }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30Z' stroke='%23d4af37' stroke-width='0.5' fill='none'/%3E%3C/svg%3E")`,
          }}
        />
        <div
          className="absolute left-0 top-0 bottom-0 w-px"
          style={{
            background:
              'linear-gradient(to bottom, transparent, #d4af37, transparent)',
          }}
        />
      </motion.div>

      {/* Center Diamond Seal */}
      {!opening && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 text-center select-none pointer-events-auto">
          <motion.p
            className="font-serif text-sm tracking-[0.3em] uppercase mb-6"
            style={{ color: '#d4af37' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Wedding Invitation
          </motion.p>
          <ZareqiaWaxSealButton
            onClick={handleOpen}
            letter="◇"
            sealColor="#1a2440"
            sealHighlight="#2a3660"
            accentColor="#d4af37"
          />
          <motion.p
            className="font-serif text-xs tracking-[0.2em] uppercase mt-6"
            style={{ color: '#8090b0' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 0.8 }}
          >
            tap to open
          </motion.p>
        </div>
      )}

      {/* Gold Particles Burst */}
      {opening && (
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute w-1.5 h-1.5 rounded-full bg-amber-400"
              initial={{ x: 0, y: 0, opacity: 1 }}
              animate={{ x: p.tx, y: p.ty, opacity: 0 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

// Gate 5: Majestic Love Velvet Curtain Skew Reveal (`zne`)
export const MajesticLoveGate = ({ onComplete }) => {
  const [opening, setOpening] = useState(false);

  const handleOpen = () => {
    setOpening(true);
    setTimeout(onComplete, 2800);
  };

  const particles = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => ({
        id: i,
        tx: (Math.random() - 0.5) * 300,
        ty: (Math.random() - 0.5) * 300,
      })),
    []
  );

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Left Velvet Curtain Panel */}
      <motion.div
        className="w-1/2 h-full relative overflow-hidden"
        style={{ backgroundColor: 'hsl(0, 65%, 18%)' }}
        animate={opening ? { x: '-100%', skewX: -3 } : { x: '0%', skewX: 0 }}
        transition={{ duration: 2.5, ease: [0.65, 0, 0.35, 1] }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, hsl(0, 65%, 18%), hsl(0, 60%, 30%))',
            opacity: 0.8,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'repeating-linear-gradient(90deg, transparent, transparent 30px, rgba(0,0,0,0.05) 30px, rgba(0,0,0,0.05) 32px)',
          }}
        />
      </motion.div>

      {/* Right Velvet Curtain Panel */}
      <motion.div
        className="w-1/2 h-full relative overflow-hidden"
        style={{ backgroundColor: 'hsl(0, 65%, 18%)' }}
        animate={opening ? { x: '100%', skewX: 3 } : { x: '0%', skewX: 0 }}
        transition={{ duration: 2.5, ease: [0.65, 0, 0.35, 1] }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to left, hsl(0, 65%, 18%), hsl(0, 60%, 30%))',
            opacity: 0.8,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'repeating-linear-gradient(90deg, transparent, transparent 30px, rgba(0,0,0,0.05) 30px, rgba(0,0,0,0.05) 32px)',
          }}
        />
      </motion.div>

      {/* Center Royal Seal */}
      {!opening && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 text-center select-none pointer-events-auto">
          <motion.p
            className="font-serif italic text-2xl md:text-3xl mb-4 text-amber-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            You're Invited
          </motion.p>
          <ZareqiaWaxSealButton
            onClick={handleOpen}
            letter="👑"
            sealColor="hsl(0, 65%, 22%)"
            sealHighlight="hsl(40, 60%, 55%)"
            accentColor="hsl(40, 60%, 75%)"
          />
          <motion.p
            className="font-serif text-xs md:text-sm tracking-widest uppercase mt-4 text-amber-300/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 0.8 }}
          >
            tap the seal to open
          </motion.p>
        </div>
      )}

      {/* Golden Starlight Particles */}
      {opening && (
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute w-2 h-2 rounded-full bg-amber-400"
              initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              animate={{ x: p.tx, y: p.ty, opacity: 0, scale: 0 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

// =========================================================================
// 3. FLOATING PARTICLES HELPERS (1:1 FROM ZAREQIA `ere` & `Qne`)
// =========================================================================

// Animated Golden Dust Floating Effect (`ere`)
export const ZareqiaGoldDustEffect = () => (
  <div className="fixed inset-0 pointer-events-none z-[60] overflow-hidden">
    {[...Array(15)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 rounded-full bg-amber-300/40"
        style={{
          left: `${(i * 7) % 100}%`,
          top: -20,
        }}
        animate={{
          y: [0, 1200],
          x: [0, (i % 2 === 0 ? 30 : -30)],
          opacity: [0, 0.6, 0],
        }}
        transition={{
          duration: 6 + (i % 5),
          repeat: Infinity,
          delay: (i * 0.4),
          ease: 'linear',
        }}
      />
    ))}
  </div>
);

// Animated Crimson Glow Floating Effect (`Qne`)
export const ZareqiaCrimsonGlowEffect = () => (
  <div className="fixed inset-0 pointer-events-none z-[60] overflow-hidden">
    {[...Array(15)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1.5 h-1.5 rounded-full bg-rose-500/30"
        style={{
          left: `${(i * 7) % 100}%`,
          top: -20,
        }}
        animate={{
          y: [0, 1200],
          x: [0, (i % 2 === 0 ? 40 : -40)],
          opacity: [0, 0.5, 0],
        }}
        transition={{
          duration: 7 + (i % 4),
          repeat: Infinity,
          delay: (i * 0.5),
          ease: 'linear',
        }}
      />
    ))}
  </div>
);

// =========================================================================
// 4. THE 5 DISTINCT INSIDE HERO ARCHITECTURES (1:1 FROM ZAREQIA)
// =========================================================================

// Hero 1: Emerald Noir Architecture (`nre`)
export const EmeraldNoirHero = ({ invitation, onScrollDown }) => {
  const groomName = invitation.groom_name || invitation.groomName || 'Aarav';
  const brideName = invitation.bride_name || invitation.brideName || 'Kiara';
  const groomParents =
    invitation.groom_parents || invitation.groomParents || 'Son of Mrs. Sunita & Mr. Rajesh Singhania';
  const brideParents =
    invitation.bride_parents || invitation.brideParents || 'Daughter of Mrs. Poonam & Mr. Anand Malhotra';

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center relative overflow-hidden bg-[hsl(160,25%,8%)] text-[hsl(40,30%,85%)]">
      {/* Radial Gold Aura */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 40%, hsla(40, 50%, 50%, 0.08), transparent 60%)',
        }}
      />

      {/* Mughal Jaali Corner Filigrees */}
      <ZareqiaMughalCornerSVG className="absolute top-6 left-6 w-20 h-20 text-amber-400 opacity-60" />
      <ZareqiaMughalCornerSVG className="absolute top-6 right-6 w-20 h-20 text-amber-400 opacity-60 -scale-x-100" />
      <ZareqiaMughalCornerSVG className="absolute bottom-6 left-6 w-20 h-20 text-amber-400 opacity-60 -scale-y-100" />
      <ZareqiaMughalCornerSVG className="absolute bottom-6 right-6 w-20 h-20 text-amber-400 opacity-60 -scale-x-100 -scale-y-100" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-2xl mx-auto space-y-6">
        <motion.p
          className="font-serif text-xs md:text-sm tracking-[0.25em] uppercase text-amber-300/80"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {invitation.message || 'Request the pleasure of your company'}
        </motion.p>

        {/* Groom & Lineage */}
        <div className="space-y-1">
          <motion.h1
            className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wide text-amber-300 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)] break-words px-2 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.9 }}
          >
            {groomName}
          </motion.h1>
          {Boolean(groomParents) && (
            <p className="text-xs md:text-sm font-serif italic text-amber-200/70">
              {groomParents}
            </p>
          )}
        </div>

        {/* Gold Diamond Filigree Center Divider */}
        <motion.div
          className="flex items-center justify-center gap-4 my-2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="w-16 md:w-24 h-px bg-gradient-to-r from-transparent to-amber-400/60" />
          <span className="font-serif text-2xl md:text-3xl text-amber-300 italic">&</span>
          <div className="w-16 md:w-24 h-px bg-gradient-to-l from-transparent to-amber-400/60" />
        </motion.div>

        {/* Bride & Lineage */}
        <div className="space-y-1">
          <motion.h1
            className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wide text-amber-300 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)] break-words px-2 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.9 }}
          >
            {brideName}
          </motion.h1>
          {Boolean(brideParents) && (
            <p className="text-xs md:text-sm font-serif italic text-amber-200/70">
              {brideParents}
            </p>
          )}
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.button
        type="button"
        onClick={onScrollDown}
        className="absolute bottom-8 inset-x-0 mx-auto flex flex-col items-center gap-1 text-amber-300/60 hover:text-amber-300 transition-colors cursor-pointer"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-[10px] uppercase tracking-[0.25em]">Scroll Down</span>
        <ChevronDown className="w-4 h-4 text-amber-300" />
      </motion.button>
    </section>
  );
};

// Hero 2: Crimson Royale Architecture (`Xne`)
export const CrimsonRoyaleHero = ({ invitation, onScrollDown }) => {
  const groomName = invitation.groom_name || invitation.groomName || 'Karan';
  const brideName = invitation.bride_name || invitation.brideName || 'Natasha';
  const groomParents =
    invitation.groom_parents || invitation.groomParents || 'Son of Mrs. Simran & Mr. Harpreet Ahluwalia';
  const brideParents =
    invitation.bride_parents || invitation.brideParents || 'Daughter of Mrs. Neena & Mr. Rajiv Batra';

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center relative overflow-hidden bg-[hsl(0,0%,6%)] text-[hsl(40,30%,85%)]">
      {/* Geometric Gold Lattice Background */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z' fill='%23c9a355' fill-opacity='0.04'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Obsidian Corner Brackets */}
      <ZareqiaObsidianCornerSVG className="absolute top-6 left-6 w-20 h-20 text-rose-500 opacity-50" />
      <ZareqiaObsidianCornerSVG className="absolute top-6 right-6 w-20 h-20 text-rose-500 opacity-50 -scale-x-100" />
      <ZareqiaObsidianCornerSVG className="absolute bottom-6 left-6 w-20 h-20 text-rose-500 opacity-50 -scale-y-100" />
      <ZareqiaObsidianCornerSVG className="absolute bottom-6 right-6 w-20 h-20 text-rose-500 opacity-50 -scale-x-100 -scale-y-100" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-2xl mx-auto space-y-6">
        <motion.p
          className="font-serif text-xs md:text-sm tracking-[0.25em] uppercase text-rose-400/90"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {invitation.message || 'Cordially invite you to celebrate'}
        </motion.p>

        {/* Groom */}
        <div className="space-y-1">
          <motion.h1
            className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wide text-amber-200 drop-shadow-[0_2px_14px_rgba(225,29,72,0.4)] break-words px-2 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.9 }}
          >
            {groomName}
          </motion.h1>
          {Boolean(groomParents) && (
            <p className="text-xs md:text-sm font-serif italic text-rose-200/70">
              {groomParents}
            </p>
          )}
        </div>

        {/* Ruby Jewel Dot Divider */}
        <motion.div
          className="flex items-center justify-center gap-3 my-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="w-12 h-px bg-amber-500/40" />
          <div className="w-2.5 h-2.5 rounded-full bg-rose-600 shadow-[0_0_8px_rgba(225,29,72,0.8)]" />
          <div className="w-12 h-px bg-amber-500/40" />
        </motion.div>

        {/* Bride */}
        <div className="space-y-1">
          <motion.h1
            className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wide text-amber-200 drop-shadow-[0_2px_14px_rgba(225,29,72,0.4)] break-words px-2 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.9 }}
          >
            {brideName}
          </motion.h1>
          {Boolean(brideParents) && (
            <p className="text-xs md:text-sm font-serif italic text-rose-200/70">
              {brideParents}
            </p>
          )}
        </div>
      </div>

      {/* Scroll Down */}
      <motion.button
        type="button"
        onClick={onScrollDown}
        className="absolute bottom-8 inset-x-0 mx-auto flex flex-col items-center gap-1 text-rose-400/70 hover:text-rose-300 transition-colors cursor-pointer"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-[10px] uppercase tracking-[0.25em]">Scroll Down</span>
        <ChevronDown className="w-4 h-4 text-rose-400" />
      </motion.button>
    </section>
  );
};

// Hero 3: Rose Gold Blush Architecture (`Gne`)
export const RoseGoldBlushHero = ({ invitation, onScrollDown }) => {
  const groomName = invitation.groom_name || invitation.groomName || 'Rohan';
  const brideName = invitation.bride_name || invitation.brideName || 'Ananya';
  const groomParents =
    invitation.groom_parents || invitation.groomParents || 'Son of Mrs. & Mr. Kapoor';
  const brideParents =
    invitation.bride_parents || invitation.brideParents || 'Daughter of Mrs. & Mr. Mehra';

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center relative overflow-hidden bg-[hsl(20,30%,97%)] text-[hsl(350,20%,20%)]">
      {/* Soft Romantic Blush Gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(183,110,121,0.18), rgba(212,145,154,0.08))',
        }}
      />

      {/* Botanical Floral Corner SVGs */}
      <ZareqiaFloralCornerSVG className="absolute top-6 left-6 w-24 h-24 text-[#b76e79]" />
      <ZareqiaFloralCornerSVG className="absolute top-6 right-6 w-24 h-24 text-[#b76e79] -scale-x-100" />
      <ZareqiaFloralCornerSVG className="absolute bottom-6 left-6 w-24 h-24 text-[#b76e79] -scale-y-100" />
      <ZareqiaFloralCornerSVG className="absolute bottom-6 right-6 w-24 h-24 text-[#b76e79] -scale-x-100 -scale-y-100" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-2xl mx-auto space-y-6">
        {/* Heart Crest */}
        <motion.div
          className="mb-2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Heart className="w-8 h-8 mx-auto text-[#b76e79] fill-[#b76e79]/20" />
        </motion.div>

        <motion.p
          className="font-serif italic text-base md:text-lg text-[#9b4d5a]"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {invitation.message || 'With joyous hearts, we invite you to share in our celebration'}
        </motion.p>

        {/* Groom */}
        <div className="space-y-1">
          <motion.h1
            className="font-serif italic text-4xl sm:text-6xl md:text-8xl lg:text-9xl text-[#b76e79] drop-shadow-[0_2px_8px_rgba(183,110,121,0.2)] break-words px-2 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.9 }}
          >
            {groomName}
          </motion.h1>
          {Boolean(groomParents) && (
            <p className="text-xs md:text-sm font-serif italic text-[#9b4d5a]/80">
              {groomParents}
            </p>
          )}
        </div>

        {/* Romantic & Divider */}
        <motion.div
          className="flex items-center justify-center gap-4 my-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="w-16 h-px bg-[#b76e79]/30" />
          <span className="font-serif italic text-3xl md:text-4xl text-[#b76e79]">&</span>
          <div className="w-16 h-px bg-[#b76e79]/30" />
        </motion.div>

        {/* Bride */}
        <div className="space-y-1">
          <motion.h1
            className="font-serif italic text-4xl sm:text-6xl md:text-8xl lg:text-9xl text-[#b76e79] drop-shadow-[0_2px_8px_rgba(183,110,121,0.2)] break-words px-2 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.9 }}
          >
            {brideName}
          </motion.h1>
          {Boolean(brideParents) && (
            <p className="text-xs md:text-sm font-serif italic text-[#9b4d5a]/80">
              {brideParents}
            </p>
          )}
        </div>
      </div>

      {/* Scroll Down */}
      <motion.button
        type="button"
        onClick={onScrollDown}
        className="absolute bottom-8 inset-x-0 mx-auto flex flex-col items-center gap-1 text-[#b76e79]/70 hover:text-[#b76e79] transition-colors cursor-pointer"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-[10px] uppercase tracking-[0.25em]">Scroll Down</span>
        <ChevronDown className="w-4 h-4 text-[#b76e79]" />
      </motion.button>
    </section>
  );
};

// Hero 4: Modern Minimal Architecture (`Wne`)
export const ModernMinimalHero = ({ invitation, onScrollDown }) => {
  const groomName = invitation.groom_name || invitation.groomName || 'Arjun';
  const brideName = invitation.bride_name || invitation.brideName || 'Tara';
  const groomParents =
    invitation.groom_parents || invitation.groomParents || 'Son of Mrs. & Mr. Sharma';
  const brideParents =
    invitation.bride_parents || invitation.brideParents || 'Daughter of Mrs. & Mr. Verma';

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center relative overflow-hidden bg-[hsl(220,30%,12%)] text-[hsl(40,20%,90%)]">
      {/* 60x60 Diamond SVG Grid */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30Z' stroke='%23d4af37' stroke-width='0.3' fill='none'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Modern Diamond Corner Brackets */}
      <ZareqiaDiamondCornerSVG className="absolute top-8 left-8 w-16 h-16 text-[#d4af37]" />
      <ZareqiaDiamondCornerSVG className="absolute top-8 right-8 w-16 h-16 text-[#d4af37] -scale-x-100" />
      <ZareqiaDiamondCornerSVG className="absolute bottom-8 left-8 w-16 h-16 text-[#d4af37] -scale-y-100" />
      <ZareqiaDiamondCornerSVG className="absolute bottom-8 right-8 w-16 h-16 text-[#d4af37] -scale-x-100 -scale-y-100" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-2xl mx-auto space-y-6">
        <motion.p
          className="font-serif text-xs md:text-sm tracking-[0.4em] uppercase text-[#d4af37]"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {invitation.message || 'WEDDING INVITATION'}
        </motion.p>

        {/* Minimal Diamond Divider */}
        <div className="flex items-center justify-center gap-4 my-4">
          <div className="w-20 md:w-28 h-px bg-gradient-to-r from-transparent to-[#d4af37]" />
          <div className="w-2 h-2 rotate-45 border border-[#d4af37]" />
          <div className="w-20 md:w-28 h-px bg-gradient-to-l from-transparent to-[#d4af37]" />
        </div>

        {/* Groom */}
        <div className="space-y-1">
          <motion.h1
            className="font-serif text-3xl sm:text-5xl md:text-7xl lg:text-8xl tracking-[0.15em] uppercase text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] break-words px-2 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.9 }}
          >
            {groomName}
          </motion.h1>
          {Boolean(groomParents) && (
            <p className="text-xs md:text-sm font-sans tracking-widest uppercase text-slate-400">
              {groomParents}
            </p>
          )}
        </div>

        <motion.p
          className="font-serif text-xl md:text-2xl text-[#d4af37] my-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 0.4 }}
        >
          ◇
        </motion.p>

        {/* Bride */}
        <div className="space-y-1">
          <motion.h1
            className="font-serif text-3xl sm:text-5xl md:text-7xl lg:text-8xl tracking-[0.15em] uppercase text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] break-words px-2 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.9 }}
          >
            {brideName}
          </motion.h1>
          {Boolean(brideParents) && (
            <p className="text-xs md:text-sm font-sans tracking-widest uppercase text-slate-400">
              {brideParents}
            </p>
          )}
        </div>
      </div>

      {/* Scroll Down */}
      <motion.button
        type="button"
        onClick={onScrollDown}
        className="absolute bottom-8 inset-x-0 mx-auto flex flex-col items-center gap-1 text-[#d4af37]/60 hover:text-[#d4af37] transition-colors cursor-pointer"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-[10px] uppercase tracking-[0.25em]">Scroll Down</span>
        <ChevronDown className="w-4 h-4 text-[#d4af37]" />
      </motion.button>
    </section>
  );
};

// Hero 5: Majestic Love Architecture (`Fne`)
export const MajesticLoveHero = ({ invitation, onScrollDown }) => {
  const groomName = invitation.groom_name || invitation.groomName || 'Ranveer';
  const brideName = invitation.bride_name || invitation.brideName || 'Deepika';
  const groomParents =
    invitation.groom_parents || invitation.groomParents || 'Son of Mrs. & Mr. Bhavnani';
  const brideParents =
    invitation.bride_parents || invitation.brideParents || 'Daughter of Mrs. & Mr. Padukone';

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center relative overflow-hidden bg-[hsl(40,30%,96%)] text-[hsl(40,40%,15%)]">
      {/* Palace Baroque Corner Arches */}
      <ZareqiaPalaceArchCornerSVG className="absolute top-6 left-6 w-20 h-20 text-amber-600 opacity-60" />
      <ZareqiaPalaceArchCornerSVG className="absolute top-6 right-6 w-20 h-20 text-amber-600 opacity-60 -scale-x-100" />
      <ZareqiaPalaceArchCornerSVG className="absolute bottom-6 left-6 w-20 h-20 text-amber-600 opacity-60 -scale-y-100" />
      <ZareqiaPalaceArchCornerSVG className="absolute bottom-6 right-6 w-20 h-20 text-amber-600 opacity-60 -scale-x-100 -scale-y-100" />

      {/* 20 Floating Golden Starlight Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-amber-500 opacity-20 pointer-events-none"
          style={{
            left: `${(i * 13) % 100}%`,
            top: `${(i * 17) % 100}%`,
          }}
          animate={{ y: [0, -30, 0], opacity: [0.1, 0.4, 0.1] }}
          transition={{
            duration: 3 + (i % 4),
            repeat: Infinity,
            delay: (i * 0.2),
          }}
        />
      ))}

      {/* Hero Content */}
      <div className="relative z-10 max-w-2xl mx-auto space-y-6">
        <motion.p
          className="font-serif italic text-2xl md:text-3xl text-amber-900"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {invitation.message || 'We request the honor of your presence'}
        </motion.p>

        {/* Ornate Baroque Divider */}
        <div className="w-16 h-1.5 mx-auto bg-amber-600/60 rounded-full my-2" />

        {/* Groom */}
        <div className="space-y-1">
          <motion.h1
            className="font-serif italic text-4xl sm:text-6xl md:text-8xl lg:text-9xl text-amber-800 drop-shadow-[0_2px_10px_rgba(0,0,0,0.15)] break-words px-2 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.9 }}
          >
            {groomName}
          </motion.h1>
          {Boolean(groomParents) && (
            <p className="text-xs md:text-sm font-serif italic text-amber-900/70">
              {groomParents}
            </p>
          )}
        </div>

        <motion.p
          className="font-serif italic text-3xl md:text-4xl text-amber-700/80 my-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 0.4 }}
        >
          &
        </motion.p>

        {/* Bride */}
        <div className="space-y-1">
          <motion.h1
            className="font-serif italic text-4xl sm:text-6xl md:text-8xl lg:text-9xl text-amber-800 drop-shadow-[0_2px_10px_rgba(0,0,0,0.15)] break-words px-2 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.9 }}
          >
            {brideName}
          </motion.h1>
          {Boolean(brideParents) && (
            <p className="text-xs md:text-sm font-serif italic text-amber-900/70">
              {brideParents}
            </p>
          )}
        </div>
      </div>

      {/* Scroll Down */}
      <motion.button
        type="button"
        onClick={onScrollDown}
        className="absolute bottom-8 inset-x-0 mx-auto flex flex-col items-center gap-1 text-amber-800/70 hover:text-amber-800 transition-colors cursor-pointer"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-[10px] uppercase tracking-[0.25em]">Scroll Down</span>
        <ChevronDown className="w-4 h-4 text-amber-800" />
      </motion.button>
    </section>
  );
};

// =========================================================================
// 5. MASTER THEME MAPPINGS & CONFIGS
// =========================================================================
export const zareqiaClassicThemes = {
  'emerald-noir': {
    id: 'emerald-noir',
    name: 'Emerald Noir',
    font: "'Cinzel', serif",
    background: '#062017',
    foreground: '#FAF5EE',
    accent: '#D4AF37',
    welcomeGradient: 'linear-gradient(to bottom, #03130e 0%, #06231a 45%, #0a3326 100%)',
    isDark: true,
    scratch: {
      gradStart: '#fde68a',
      gradMid: '#d97706',
      gradEnd: '#78350f',
      textColor: '#ffffff',
    },
    musicPreset:
      'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=royal-ambient-112345.mp3',
  },
  'ivory-elegance': {
    id: 'ivory-elegance',
    name: 'Ivory Elegance',
    font: "'Dancing Script', cursive",
    background: '#0e0e0e',
    foreground: '#FAF5EE',
    accent: '#D4AF37',
    welcomeGradient: 'linear-gradient(to bottom, #000000 0%, #121212 45%, #1c1c1c 100%)',
    isDark: true,
    scratch: {
      gradStart: '#fde68a',
      gradMid: '#d97706',
      gradEnd: '#78350f',
      textColor: '#ffffff',
    },
    musicPreset:
      'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=piano-moment-9835.mp3',
  },
  'rose-gold-blush': {
    id: 'rose-gold-blush',
    name: 'Rose Gold Blush',
    font: "'Dancing Script', cursive",
    background: '#fcf6f7',
    foreground: '#2a1218',
    accent: '#b85d75',
    welcomeGradient: 'linear-gradient(to bottom, #4a1525 0%, #6b2138 45%, #e8a5b8 80%, #FCF6F7 100%)',
    isDark: false,
    scratch: {
      gradStart: '#fde68a',
      gradMid: '#d97706',
      gradEnd: '#78350f',
      textColor: '#ffffff',
    },
    musicPreset:
      'https://cdn.pixabay.com/download/audio/2022/10/14/audio_9939f792cb.mp3?filename=sweet-love-124434.mp3',
  },
  'modern-minimal': {
    id: 'modern-minimal',
    name: 'Modern Minimal',
    font: "'Cinzel', serif",
    background: '#0d1527',
    foreground: '#FAF5EE',
    accent: '#EAB308',
    welcomeGradient: 'linear-gradient(to bottom, #020617 0%, #0f172a 45%, #1e293b 100%)',
    isDark: true,
    scratch: {
      gradStart: '#fde68a',
      gradMid: '#d97706',
      gradEnd: '#78350f',
      textColor: '#ffffff',
    },
    musicPreset:
      'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=ambient-piano-amp-strings-10711.mp3',
  },
  'royal-elegance': {
    id: 'royal-elegance',
    name: 'Royal Elegance',
    font: "'Dancing Script', cursive",
    background: '#fdfbf7',
    foreground: '#1a1208',
    accent: '#b45309',
    welcomeGradient: 'linear-gradient(to bottom, #2e1065 0%, #4c1d95 45%, #c4b5fd 80%, #FDFBF7 100%)',
    isDark: false,
    scratch: {
      gradStart: '#fde68a',
      gradMid: '#d97706',
      gradEnd: '#78350f',
      textColor: '#ffffff',
    },
    musicPreset:
      'https://cdn.pixabay.com/download/audio/2022/03/24/audio_34e12c1bcf.mp3?filename=cinematic-fairy-tale-story-main-8697.mp3',
  },
  // Multi-Category Event Presets
  'little-sunshine': {
    id: 'little-sunshine',
    name: 'Prince 1st Birthday',
    isDark: false,
    background: 'hsl(45, 90%, 96%)',
    foreground: 'hsl(215, 50%, 20%)',
    primaryColor: '#0284c7',
    accent: '#eab308',
    scratch: {
      gradStart: '#bae6fd',
      gradMid: '#0284c7',
      gradEnd: '#0369a1',
      textColor: '#ffffff',
      accent: '#38bdf8',
    },
    musicPreset:
      'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=piano-moment-9835.mp3',
  },
  'sweet-nesting-baby': {
    id: 'sweet-nesting-baby',
    name: 'Baby Shower Blessing',
    isDark: false,
    background: 'hsl(140, 30%, 96%)',
    foreground: 'hsl(140, 40%, 20%)',
    primaryColor: '#059669',
    accent: '#10b981',
    scratch: {
      gradStart: '#a7f3d0',
      gradMid: '#059669',
      gradEnd: '#064e3b',
      textColor: '#ffffff',
      accent: '#34d399',
    },
    musicPreset:
      'https://cdn.pixabay.com/download/audio/2022/10/14/audio_9939f792cb.mp3?filename=sweet-love-124434.mp3',
  },
  'silver-anniversary': {
    id: 'silver-anniversary',
    name: 'Silver Jubilee 25th',
    isDark: true,
    background: 'hsl(215, 25%, 12%)',
    foreground: 'hsl(210, 20%, 90%)',
    primaryColor: '#cbd5e1',
    accent: '#94a3b8',
    scratch: {
      gradStart: '#f1f5f9',
      gradMid: '#94a3b8',
      gradEnd: '#1e293b',
      textColor: '#ffffff',
      accent: '#cbd5e1',
    },
    musicPreset:
      'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=ambient-piano-amp-strings-10711.mp3',
  },
  'terracotta-boho': {
    id: 'terracotta-boho',
    name: 'Griha Pravesh Housewarming',
    isDark: false,
    background: 'hsl(28, 45%, 95%)',
    foreground: 'hsl(16, 45%, 22%)',
    primaryColor: '#c2410c',
    accent: '#ea580c',
    scratch: {
      gradStart: '#fdba74',
      gradMid: '#c2410c',
      gradEnd: '#7c2d12',
      textColor: '#ffffff',
      accent: '#f97316',
    },
    musicPreset:
      'https://cdn.pixabay.com/download/audio/2021/08/04/audio_bb630cc098.mp3?filename=acoustic-guitars-ambient-uplifting-11369.mp3',
  },
  'mehendi-magic': {
    id: 'mehendi-magic',
    name: 'Marigold Mehendi Utsav',
    isDark: false,
    background: 'hsl(48, 95%, 94%)',
    foreground: 'hsl(24, 70%, 20%)',
    primaryColor: '#d97706',
    accent: '#f59e0b',
    scratch: {
      gradStart: '#fef08a',
      gradMid: '#d97706',
      gradEnd: '#78350f',
      textColor: '#ffffff',
      accent: '#fbbf24',
    },
    musicPreset:
      'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=royal-ambient-112345.mp3',
  },
  'celestial-night': {
    id: 'celestial-night',
    name: 'Galaxy Celestial Party',
    isDark: true,
    background: 'hsl(222, 60%, 6%)',
    foreground: 'hsl(186, 90%, 75%)',
    primaryColor: 'hsl(186, 90%, 75%)',
    accent: 'hsl(186, 85%, 55%)',
    scratch: {
      gradStart: '#a5f3fc',
      gradMid: '#0891b2',
      gradEnd: '#020617',
      textColor: '#ffffff',
      accent: '#22d3ee',
    },
    musicPreset:
      'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=piano-moment-9835.mp3',
  },
  'coastal-breeze': {
    id: 'coastal-breeze',
    name: 'Goa Coastal Beachfront',
    isDark: true,
    background: 'hsl(198, 70%, 12%)',
    foreground: 'hsl(190, 80%, 80%)',
    primaryColor: 'hsl(190, 80%, 80%)',
    accent: 'hsl(190, 75%, 55%)',
    scratch: {
      gradStart: '#cffafe',
      gradMid: '#0e7490',
      gradEnd: '#083344',
      textColor: '#083344',
      accent: '#06b6d4',
    },
    musicPreset:
      'https://cdn.pixabay.com/download/audio/2021/08/04/audio_bb630cc098.mp3?filename=acoustic-guitars-ambient-uplifting-11369.mp3',
  },
};

// =========================================================================
// 6. MASTER ZAREQIA CLASSIC SUITE COMPONENT
// =========================================================================
const ZareqiaClassicSuite = ({
  invitation = {},
  isPreview = false,
  onRsvpSuccess,
}) => {
  const rawId =
    invitation.template_id ||
    invitation.templateId ||
    'emerald-noir';

  // Alias mapper
  const aliases = {
    'crimson-royale': 'ivory-elegance',
    'majestic-love': 'royal-elegance',
    'garden-romance': 'rose-gold-blush',
    'mughal-emerald': 'emerald-noir',
    'midnight-royal': 'modern-minimal',
    'blooming-dreams': 'rose-gold-blush',
  };
  const templateId = aliases[rawId] || rawId;

  const theme =
    zareqiaClassicThemes[templateId] ||
    zareqiaClassicThemes['emerald-noir'];

  const audioRef = useRef(null);
  const [hasDoorOpened, setHasDoorOpened] = useState(false);
  const [doorsFadedOut, setDoorsFadedOut] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Couple names for share
  const groomName = invitation.groom_name || invitation.groomName || 'Groom';
  const brideName = invitation.bride_name || invitation.brideName || 'Bride';
  const coupleNames = invitation.names || `${groomName} & ${brideName}`;

  const handleDoorComplete = () => {
    setHasDoorOpened(true);
    setDoorsFadedOut(true);
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => setIsPlayingMusic(true))
        .catch(() => {});
    }
  };

  const handleReplayDoors = () => {
    setDoorsFadedOut(false);
    setHasDoorOpened(false);
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlayingMusic) {
      audioRef.current.pause();
      setIsPlayingMusic(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlayingMusic(true))
        .catch(() => {});
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `Namaste! ✨\nYou are cordially invited to celebrate the wedding of ${coupleNames}.\n\nView our live digital invitation:\n${window.location.href}\n\nWith love,\n${coupleNames}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleScrollDown = () => {
    const el =
      document.getElementById('invitation-welcome') ||
      document.getElementById('invitation-scratch') ||
      document.getElementById('invitation-countdown');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollBy({ top: window.innerHeight * 0.85, behavior: 'smooth' });
    }
  };

  // Select Gate Component based on Suite Architecture
  const renderGate = () => {
    if (doorsFadedOut) return null;

    switch (templateId) {
      case 'emerald-noir':
        return <EmeraldNoirGate onComplete={handleDoorComplete} />;
      case 'ivory-elegance':
        return <CrimsonRoyaleGate onComplete={handleDoorComplete} />;
      case 'rose-gold-blush':
      case 'sweet-nesting-baby':
      case 'mehendi-magic':
        return <RoseGoldBlushGate onComplete={handleDoorComplete} />;
      case 'modern-minimal':
      case 'celestial-night':
      case 'silver-anniversary':
        return <ModernMinimalGate onComplete={handleDoorComplete} />;
      case 'royal-elegance':
      case 'little-sunshine':
      case 'terracotta-boho':
      case 'coastal-breeze':
      default:
        return <MajesticLoveGate onComplete={handleDoorComplete} />;
    }
  };

  // Select Distinct Hero Architecture based on Suite
  const renderHero = () => {
    switch (templateId) {
      case 'emerald-noir':
        return (
          <EmeraldNoirHero
            invitation={invitation}
            onScrollDown={handleScrollDown}
          />
        );
      case 'ivory-elegance':
        return (
          <CrimsonRoyaleHero
            invitation={invitation}
            onScrollDown={handleScrollDown}
          />
        );
      case 'rose-gold-blush':
      case 'sweet-nesting-baby':
      case 'mehendi-magic':
        return (
          <RoseGoldBlushHero
            invitation={invitation}
            onScrollDown={handleScrollDown}
          />
        );
      case 'modern-minimal':
      case 'celestial-night':
      case 'silver-anniversary':
        return (
          <ModernMinimalHero
            invitation={invitation}
            onScrollDown={handleScrollDown}
          />
        );
      case 'royal-elegance':
      case 'little-sunshine':
      case 'terracotta-boho':
      case 'coastal-breeze':
      default:
        return (
          <MajesticLoveHero
            invitation={invitation}
            onScrollDown={handleScrollDown}
          />
        );
    }
  };

  return (
    <div
      className={`font-sans selection:bg-amber-600 selection:text-white ${
        !doorsFadedOut ? 'h-screen overflow-hidden' : 'min-h-screen'
      }`}
      style={{
        backgroundColor: theme.background,
        color: theme.foreground,
        '--primary': theme.accent,
      }}
    >
      {/* Ambient Floating Dust / Glow */}
      {templateId === 'emerald-noir' && <ZareqiaGoldDustEffect />}
      {templateId === 'ivory-elegance' && <ZareqiaCrimsonGlowEffect />}

      {/* Background Audio */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        src={invitation.music_url || invitation.musicUrl || theme.musicPreset}
      />

      {/* Floating Toolbar */}
      <div className="fixed top-4 right-4 z-50 flex items-center space-x-2">
        {/* Replay Doors */}
        <button
          type="button"
          onClick={handleReplayDoors}
          className="px-3 py-2 rounded-full bg-black/60 backdrop-blur-md border border-amber-500/40 text-amber-300 hover:bg-black/90 shadow-xl transition-all flex items-center space-x-1.5 text-xs font-mono font-bold cursor-pointer"
          title="Replay Gate Animation"
        >
          <DoorClosed className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden sm:inline">Replay</span>
        </button>

        {/* Music Button */}
        <button
          type="button"
          onClick={toggleMusic}
          className="p-2.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white hover:bg-black shadow-xl transition-all cursor-pointer"
          title={isPlayingMusic ? 'Mute Music' : 'Play Music'}
        >
          {isPlayingMusic ? (
            <Volume2 className="w-4 h-4 text-amber-400 animate-pulse" />
          ) : (
            <VolumeX className="w-4 h-4 text-neutral-400" />
          )}
        </button>

        {!isPreview && (
          <>
            <button
              type="button"
              onClick={() => setQrOpen(true)}
              className="p-2.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white hover:bg-black shadow-xl transition-all cursor-pointer"
              title="Show QR Code"
            >
              <QrCode className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleShareWhatsApp}
              className="px-3.5 py-2 rounded-full bg-emerald-600/90 backdrop-blur-md hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider shadow-xl flex items-center space-x-1.5 transition-all cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Share</span>
            </button>
          </>
        )}
      </div>

      {/* 1. Opening Gate Physics */}
      {renderGate()}

      {/* 2. Distinct Hero Section */}
      {renderHero()}

      {/* =========================================================================
          SECTION 2 TO 14: SEAMLESS EXACT ZAREQIA INSIDE BODY (Classic 1:1)
         ========================================================================= */}
      <ZareqiaBody
        data={invitation}
        invitationId={invitation._id || invitation.id || invitation.slug}
        theme={{
          ...theme,
          accentColor: theme.accent,
          textColor: theme.foreground,
          welcomeGradient: theme.welcomeGradient,
          cardShape: 'rect',
          isDark: theme.isDark || templateId === 'emerald-noir' || templateId === 'ivory-elegance' || templateId === 'modern-minimal',
        }}
        scratchPalette={theme.scratch}
        cardShape="rect"
        isDark={theme.isDark || templateId === 'emerald-noir' || templateId === 'ivory-elegance' || templateId === 'modern-minimal'}
        onRsvpSuccess={onRsvpSuccess}
      />
      <footer className="py-12 border-t border-white/10 text-center space-y-2">
        <div className="flex items-center justify-center space-x-1.5 text-amber-400">
          <Sparkles className="w-4 h-4" />
          <span className="font-serif text-sm font-bold tracking-[0.2em] uppercase">
            MOONLIGHT PRODUCTION
          </span>
        </div>
        <p className="text-[11px] text-neutral-400 font-sans">
          Your Story. Our Vision. Forever.
        </p>
      </footer>

      {/* QR Code Modal */}
      {qrOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-neutral-900 border border-amber-500/30 rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center space-y-4 relative shadow-2xl">
            <button
              type="button"
              onClick={() => setQrOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-1">
              <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-amber-400 font-bold block">
                Scan With Any Phone
              </span>
              <h3 className="font-serif text-xl font-bold text-white">
                {coupleNames}
              </h3>
            </div>

            <div className="p-3 bg-white rounded-2xl inline-block mx-auto shadow-inner">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
                  window.location.href
                )}`}
                alt="QR Code"
                className="w-40 h-40 mx-auto"
              />
            </div>

            <div className="flex justify-center space-x-2 pt-2">
              <button
                type="button"
                onClick={handleCopyLink}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center shadow cursor-pointer"
              >
                {copied ? (
                  <Check className="w-3.5 h-3.5 mr-1 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5 mr-1" />
                )}
                {copied ? 'Copied Link!' : 'Copy Link'}
              </button>
              <button
                type="button"
                onClick={handleShareWhatsApp}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center shadow cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5 mr-1" /> WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ZareqiaClassicSuite;
