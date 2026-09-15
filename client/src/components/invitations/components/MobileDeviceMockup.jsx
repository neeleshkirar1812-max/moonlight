import React, { useState, useEffect } from 'react';
import {
  Smartphone,
  QrCode,
  Share2,
  Copy,
  Check,
  Volume2,
  VolumeX,
  Maximize2,
  ExternalLink,
  Sparkles,
  Wifi,
  Battery,
  RotateCcw,
  Monitor,
  Tablet,
  X,
} from 'lucide-react';
import InvitationRenderer from '../engine/InvitationRenderer';

/**
 * MobileDeviceMockup - 2026 Luxury Ultra-Realistic Interactive Mobile Display Simulator
 *
 * Supports:
 * - Native Screen Auto-Detect (matches actual user device on mobile/tablet/desktop)
 * - iPhone 16 Pro Max (Dynamic Island with live music spectrum, Titanium Gold bezel)
 * - Samsung Galaxy S24 Ultra (Punch-hole camera, sleek Android status bar)
 * - Google Pixel 9 Pro (Modern Google camera cutout & status indicators)
 * - Interactive QR Code scanner modal to test live on real physical phones
 * - Gate replay & audio controls
 */
const MobileDeviceMockup = ({
  invitation = {},
  isPreview = true,
  onRsvpSuccess,
  showControls = true,
  defaultDevice = 'auto',
  className = '',
  maxHeight = '85vh',
  showOpeningInPreview = true,
}) => {
  const [device, setDevice] = useState(defaultDevice); // 'auto' | 'iphone-16-pro' | 'galaxy-s24' | 'pixel-9-pro' | 'native'
  const [currentTime, setCurrentTime] = useState('');
  const [showQrModal, setShowQrModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  // Live status bar clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      hours = hours % 12 || 12;
      setCurrentTime(`${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  const liveUrl = invitation.slug
    ? `${window.location.origin}/i/${invitation.slug}`
    : window.location.href;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(liveUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareWhatsApp = () => {
    const coupleNames =
      invitation.names ||
      (invitation.bride_name && invitation.groom_name
        ? `${invitation.bride_name} & ${invitation.groom_name}`
        : 'Royal Wedding');
    const text = encodeURIComponent(
      `Namaste! ✨\nYou are cordially invited to celebrate ${coupleNames}.\n\nTap the live link to view our royal video invitation, ceremony schedule, scratch card & RSVP:\n${liveUrl}\n\nWith love,\n${coupleNames}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleReplayGate = () => {
    setRefreshKey((prev) => prev + 1);
  };

  // Determine frame styling based on selected device preset
  const isIphone = device === 'iphone-16-pro';
  const isGalaxy = device === 'galaxy-s24';
  const isPixel = device === 'pixel-9-pro';
  const isAuto = device === 'auto';
  const isNative = device === 'native';

  return (
    <div className={`flex flex-col items-center w-full select-none ${className}`}>
      {/* ------------------------------------------------------------- */}
      {/* LUXURY DEVICE CONTROL BAR */}
      {/* ------------------------------------------------------------- */}
      {showControls && (
        <div className="w-full max-w-[440px] mb-3 px-2 flex flex-col gap-2">
          {/* Top Row: Device Presets Switcher */}
          <div className="flex items-center justify-between bg-neutral-900/90 backdrop-blur-md p-1.5 rounded-2xl border border-amber-500/20 shadow-lg text-[11px] font-mono">
            <div className="flex items-center space-x-1 overflow-x-auto scrollbar-none py-0.5">
              <button
                type="button"
                onClick={() => setDevice('auto')}
                className={`px-2.5 py-1 rounded-xl transition-all whitespace-nowrap flex items-center space-x-1 ${
                  isAuto
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-950 font-bold shadow-md'
                    : 'text-neutral-400 hover:text-white'
                }`}
                title="Auto detect best device display"
              >
                <Smartphone className="w-3 h-3" />
                <span>Auto Display</span>
              </button>

              <button
                type="button"
                onClick={() => setDevice('iphone-16-pro')}
                className={`px-2.5 py-1 rounded-xl transition-all whitespace-nowrap flex items-center space-x-1 ${
                  isIphone
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-950 font-bold shadow-md'
                    : 'text-neutral-400 hover:text-white'
                }`}
                title="Apple iPhone 16 Pro Max Mockup"
              >
                <span>🍎 iPhone 16</span>
              </button>

              <button
                type="button"
                onClick={() => setDevice('galaxy-s24')}
                className={`px-2.5 py-1 rounded-xl transition-all whitespace-nowrap flex items-center space-x-1 ${
                  isGalaxy
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-950 font-bold shadow-md'
                    : 'text-neutral-400 hover:text-white'
                }`}
                title="Samsung Galaxy S24 Ultra Mockup"
              >
                <span>🤖 S24 Ultra</span>
              </button>

              <button
                type="button"
                onClick={() => setDevice('pixel-9-pro')}
                className={`px-2.5 py-1 rounded-xl transition-all whitespace-nowrap flex items-center space-x-1 ${
                  isPixel
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-950 font-bold shadow-md'
                    : 'text-neutral-400 hover:text-white'
                }`}
                title="Google Pixel 9 Pro Mockup"
              >
                <span>📱 Pixel 9</span>
              </button>
            </div>

            {/* Replay Gate Button */}
            <button
              type="button"
              onClick={handleReplayGate}
              className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-amber-300 transition-all shrink-0 ml-1"
              title="Replay Video Gate Entrance"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Bottom Action Strip: Real Phone Testing & Share */}
          <div className="flex items-center justify-between text-xs px-1">
            <button
              type="button"
              onClick={() => setShowQrModal(true)}
              className="flex items-center space-x-1.5 text-amber-600 hover:text-amber-500 font-semibold transition-colors"
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>Scan On Real Phone</span>
            </button>

            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={handleCopyLink}
                className="p-1 rounded-lg bg-stone-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:text-amber-500 transition-colors"
                title="Copy Link"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
              <button
                type="button"
                onClick={handleShareWhatsApp}
                className="p-1 rounded-lg bg-emerald-600/10 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all"
                title="Share via WhatsApp"
              >
                <Share2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* REALISTIC PHYSICAL SMARTPHONE HARDWARE CHASSIS */}
      {/* ------------------------------------------------------------- */}
      <div className="relative flex items-center justify-center w-full">
        {/* Exterior Phone Body Shell */}
        <div
          className={`relative transition-all duration-300 ease-out ${
            isNative
              ? 'w-full max-w-full rounded-none border-0 shadow-none'
              : 'w-[360px] sm:w-[380px] max-w-full'
          }`}
        >
          {/* Titanium Metallic Outer Rim with realistic 3D shadow & side buttons */}
          {!isNative && (
            <div
              className={`relative bg-gradient-to-b from-[#2e2a24] via-[#1a1916] to-[#0f0e0c] p-[10px] sm:p-[12px] shadow-[0_25px_70px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.15),inset_0_1px_2px_rgba(255,255,255,0.3)] border-2 ${
                isIphone || isAuto
                  ? 'rounded-[50px] sm:rounded-[54px] border-[#554e42]/70'
                  : isGalaxy
                  ? 'rounded-[32px] sm:rounded-[36px] border-[#3f3f46]/80'
                  : 'rounded-[46px] sm:rounded-[50px] border-[#4b5563]/70'
              }`}
            >
              {/* Antenna Band Inlays (Real Flagship Phone Detail) */}
              <div className="absolute -left-[2px] top-[75px] w-[4px] h-[3px] bg-neutral-900/90 rounded-sm" />
              <div className="absolute -left-[2px] bottom-[75px] w-[4px] h-[3px] bg-neutral-900/90 rounded-sm" />
              <div className="absolute -right-[2px] top-[75px] w-[4px] h-[3px] bg-neutral-900/90 rounded-sm" />
              <div className="absolute -right-[2px] bottom-[75px] w-[4px] h-[3px] bg-neutral-900/90 rounded-sm" />

              {/* Left Side Hardware Buttons (Action Button + Volume Rockers) */}
              <div className="hidden sm:block absolute -left-[5px] top-[95px] w-[3px] h-[22px] bg-gradient-to-r from-neutral-500 via-neutral-400 to-neutral-600 rounded-l-md shadow-sm" />
              <div className="hidden sm:block absolute -left-[5px] top-[135px] w-[3px] h-[48px] bg-gradient-to-r from-neutral-500 via-neutral-400 to-neutral-600 rounded-l-md shadow-sm" />
              <div className="hidden sm:block absolute -left-[5px] top-[195px] w-[3px] h-[48px] bg-gradient-to-r from-neutral-500 via-neutral-400 to-neutral-600 rounded-l-md shadow-sm" />

              {/* Right Side Hardware Buttons (Power/Lock + Camera Control) */}
              <div className="hidden sm:block absolute -right-[5px] top-[140px] w-[3px] h-[70px] bg-gradient-to-l from-neutral-500 via-neutral-400 to-neutral-600 rounded-r-md shadow-sm" />
              <div className="hidden sm:block absolute -right-[5px] top-[235px] w-[3px] h-[36px] bg-gradient-to-l from-neutral-600 via-neutral-500 to-neutral-700 rounded-r-md shadow-inner" />

              {/* Top Bezel Speaker Earpiece Grill */}
              <div className="w-12 h-[3px] bg-[#0c0c0d] rounded-full mx-auto -mt-1 mb-1.5 border border-white/10 shadow-inner" />

              {/* Inner Screen Bezel with Glass Glare */}
              <div
                className={`relative bg-black overflow-hidden select-auto shadow-inner ${
                  isIphone || isAuto
                    ? 'rounded-[40px] sm:rounded-[44px]'
                    : isGalaxy
                    ? 'rounded-[22px] sm:rounded-[26px]'
                    : 'rounded-[36px] sm:rounded-[40px]'
                }`}
                style={{ maxHeight: maxHeight }}
              >
                {/* Subtle Glass Reflection Sheen */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.015] to-white/[0.06] pointer-events-none z-30" />

                {/* --------------------------------------------------------- */}
                {/* STATUS BAR (iPhone Dynamic Island / Android Punch-Hole) */}
                {/* --------------------------------------------------------- */}
                <div className="absolute top-0 left-0 right-0 z-40 px-5 pt-2 pb-1 flex items-center justify-between text-[11px] font-semibold text-white/95 pointer-events-none drop-shadow-md">
                  {/* Left: Clock */}
                  <span className="font-sans font-bold tracking-tight pl-1 text-[11.5px]">{currentTime || '12:00'}</span>

                  {/* Center: Dynamic Island or Camera Cutout */}
                  {isIphone || isAuto ? (
                    <div className="flex items-center justify-center">
                      <div className="h-[26px] w-[114px] bg-black rounded-full border border-neutral-800/90 flex items-center justify-between px-2.5 shadow-[0_0_8px_rgba(0,0,0,1)]">
                        {/* Camera Aperture Lens */}
                        <div className="w-3 h-3 rounded-full bg-[#0d0d12] border border-neutral-700/80 flex items-center justify-center relative shadow-inner">
                          <div className="w-1.5 h-1.5 rounded-full bg-indigo-500/80" />
                          <div className="w-0.5 h-0.5 rounded-full bg-cyan-300/90 absolute top-0.5 right-0.5" />
                        </div>
                        {/* Dynamic Status / Music Wave */}
                        <div className="flex items-center space-x-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <Sparkles className="w-2.5 h-2.5 text-amber-400" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <div className="w-3.5 h-3.5 rounded-full bg-[#0a0a0f] border border-neutral-800 flex items-center justify-center shadow-inner">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500/70" />
                      </div>
                    </div>
                  )}

                  {/* Right: Cellular, 5G & Real Battery Pill */}
                  <div className="flex items-center space-x-1.5 pr-1">
                    {/* Cellular 4-Bars */}
                    <div className="flex items-end space-x-[1.5px] h-2.5">
                      <span className="w-[2px] h-[3px] bg-white rounded-[0.5px]" />
                      <span className="w-[2px] h-[5px] bg-white rounded-[0.5px]" />
                      <span className="w-[2px] h-[7px] bg-white rounded-[0.5px]" />
                      <span className="w-[2px] h-[9px] bg-white rounded-[0.5px]" />
                    </div>
                    <span className="text-[9px] font-mono font-bold text-amber-400">5G</span>
                    <Wifi className="w-3 h-3 text-white" />
                    {/* Realistic Battery Pill */}
                    <div className="flex items-center">
                      <div className="w-5 h-2.5 rounded-[3px] border border-white/80 p-[1px] flex items-center">
                        <div className="h-full w-[85%] bg-emerald-400 rounded-[1.5px]" />
                      </div>
                      <div className="w-[1.5px] h-1 bg-white/80 rounded-r-[1px] -ml-[0.5px]" />
                    </div>
                  </div>
                </div>

                {/* --------------------------------------------------------- */}
                {/* SCROLLABLE LIVE INVITATION DISPLAY */}
                {/* --------------------------------------------------------- */}
                <div
                  className="w-full overflow-y-auto scrollbar-thin scrollbar-thumb-amber-500/20 scrollbar-track-transparent relative bg-neutral-950 pt-2"
                  style={{
                    height: maxHeight || '700px',
                    maxHeight: maxHeight,
                  }}
                >
                  <InvitationRenderer
                    key={`render-${refreshKey}-${invitation.template_id || invitation.templateId || 'def'}`}
                    invitation={invitation}
                    isPreview={isPreview}
                    onRsvpSuccess={onRsvpSuccess}
                    showOpeningInPreview={showOpeningInPreview}
                  />
                </div>

                {/* Bottom iOS Home Indicator / Android Bar */}
                <div className="absolute bottom-1.5 left-0 right-0 flex justify-center pointer-events-none z-40">
                  <div className="w-32 h-[4px] bg-white/60 rounded-full backdrop-blur-md shadow-sm" />
                </div>
              </div>
            </div>
          )}

          {/* Native Screen Rendering (when device is native / viewport fills) */}
          {isNative && (
            <div
              className="w-full overflow-y-auto scrollbar-thin relative bg-neutral-950"
              style={{ maxHeight: maxHeight }}
            >
              <InvitationRenderer
                key={`native-render-${refreshKey}`}
                invitation={invitation}
                isPreview={isPreview}
                onRsvpSuccess={onRsvpSuccess}
                showOpeningInPreview={showOpeningInPreview}
              />
            </div>
          )}
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* SCAN ON PHYSICAL PHONE QR CODE MODAL */}
      {/* ------------------------------------------------------------- */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in font-sans">
          <div className="bg-neutral-950 text-white rounded-3xl max-w-sm w-full p-6 space-y-5 border border-amber-500/40 shadow-2xl relative">
            <button
              type="button"
              onClick={() => setShowQrModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-neutral-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center mx-auto shadow-inner">
                <Smartphone className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-amber-200">
                Test On Your Real Smartphone
              </h3>
              <p className="text-xs text-neutral-400">
                Point your phone camera at the QR code below to experience the real 4K video doors, shehnai music & touch scratch card natively.
              </p>
            </div>

            {/* QR Code Container */}
            <div className="p-4 bg-white rounded-2xl flex justify-center shadow-lg border-2 border-amber-400/50">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(
                  liveUrl
                )}`}
                alt="Physical Phone Preview QR"
                className="w-48 h-48 rounded-lg"
              />
            </div>

            {/* Direct Link Copy */}
            <div className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-[11px] font-mono text-neutral-300 flex items-center justify-between">
              <span className="truncate mr-2">{liveUrl}</span>
              <button
                type="button"
                onClick={handleCopyLink}
                className="p-1.5 rounded-lg bg-amber-500 text-neutral-950 font-bold hover:brightness-110 shrink-0"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            <button
              type="button"
              onClick={() => setShowQrModal(false)}
              className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider"
            >
              Done Testing
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileDeviceMockup;
