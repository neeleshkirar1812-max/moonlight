import React, { useState } from 'react';
import { getTemplateConfig } from './TemplateRegistry';
import OpeningScreen from '../components/OpeningScreen';
import HeroSection from '../components/HeroSection';
import StorySection from '../components/StorySection';
import EventsTimeline from '../components/EventsTimeline';
import InteractiveGallery from '../components/InteractiveGallery';
import ThingsToKnow from '../components/ThingsToKnow';
import ScratchCard from '../components/ScratchCard';
import RsvpSection from '../components/RsvpSection';
import MusicPlayer from '../components/MusicPlayer';
import { Share2, QrCode, Copy, Check, X, Sparkles, RefreshCw, DoorClosed } from 'lucide-react';

const InvitationRenderer = ({
  invitation = {},
  isPreview = false,
  onRsvpSuccess,
  showOpeningInPreview = false,
}) => {
  const templateId = invitation.template_id || invitation.templateId || 'royal-love';
  const config = getTemplateConfig(templateId);
  const theme = config.theme;

  const [qrOpen, setQrOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [doorsOpenCount, setDoorsOpenCount] = useState(0);
  const [openingKey, setOpeningKey] = useState(0);
  const [showOpeningScreen, setShowOpeningScreen] = useState(!isPreview || showOpeningInPreview);

  const handleDoorEnter = () => {
    setDoorsOpenCount((prev) => prev + 1);
  };

  const handleReplayDoors = () => {
    setOpeningKey((prev) => prev + 1);
    setShowOpeningScreen(true);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareWhatsApp = () => {
    const coupleNames =
      invitation.names || `${invitation.bride_name || 'Bride'} & ${invitation.groom_name || 'Groom'}`;
    const text = encodeURIComponent(
      `Namaste! ✨\nYou are cordially invited to celebrate with us for ${coupleNames}.\n\nTap the live invitation link below to view our royal double doors entrance, ceremony schedule, scratch card, and RSVP:\n${window.location.href}\n\nWith love,\n${coupleNames}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <div
      className={`min-h-screen ${theme.pageBg} ${theme.textPrimary} relative selection:bg-amber-600 selection:text-white font-sans`}
    >
      {/* 1. Cinematic 3D Royal Palace Double Doors & Video Curtain */}
      {showOpeningScreen && (
        <OpeningScreen
          key={openingKey}
          invitation={invitation}
          theme={theme}
          onEnter={handleDoorEnter}
          isPreview={isPreview}
        />
      )}

      {/* 2. Hero Section & Live Countdown */}
      <HeroSection invitation={invitation} theme={theme} />

      {/* 3. Story Section */}
      <StorySection invitation={invitation} theme={theme} />

      {/* 4. Multi-Event Schedule Timeline & Google Maps Navigation */}
      <EventsTimeline
        events={invitation.events || invitation.event_schedule}
        invitation={invitation}
        theme={theme}
      />

      {/* 5. Interactive Photo Gallery & Lightbox Viewer */}
      <InteractiveGallery
        images={invitation.gallery_images || invitation.galleryUrls}
        theme={theme}
      />

      {/* 6. Things To Know (Dress code, Stay, Valet, Weather, Gifts) */}
      <ThingsToKnow invitation={invitation} theme={theme} />

      {/* 7. Interactive HTML5 Touch Scratch Card */}
      {invitation.scratch_enabled !== false && invitation.scratchEnabled !== false && (
        <ScratchCard invitation={invitation} theme={theme} />
      )}

      {/* 8. Live RSVP Online Form & WhatsApp RSVP */}
      {invitation.rsvp_enabled !== false && invitation.rsvpEnabled !== false && (
        <RsvpSection invitation={invitation} theme={theme} onRsvpSuccess={onRsvpSuccess} />
      )}

      {/* 9. Background Music Player (Auto-triggered when doors open) */}
      {invitation.music_enabled !== false && invitation.musicEnabled !== false && (
        <MusicPlayer
          musicUrl={invitation.music_url || invitation.musicUrl}
          theme={theme}
          autoPlayTrigger={doorsOpenCount}
        />
      )}

      {/* Floating Share, Replay & QR Toolbar */}
      <div className="fixed top-4 right-4 z-40 flex items-center space-x-2">
        {/* Replay Doors Button */}
        <button
          type="button"
          onClick={handleReplayDoors}
          className="px-3 py-2 rounded-full bg-black/60 backdrop-blur-md border border-amber-500/40 text-amber-300 hover:bg-black/90 shadow-xl transition-all flex items-center space-x-1.5 text-xs font-mono font-bold"
          title="Replay Royal Door Opening"
        >
          <DoorClosed className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden sm:inline">Replay Entrance</span>
        </button>

        {!isPreview && (
          <>
            <button
              type="button"
              onClick={() => setQrOpen(true)}
              className="p-2.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white hover:bg-black shadow-xl transition-all"
              title="Show QR Code"
            >
              <QrCode className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleShareWhatsApp}
              className="px-3.5 py-2 rounded-full bg-emerald-600/90 backdrop-blur-md hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider shadow-xl flex items-center space-x-1.5 transition-all"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Share</span>
            </button>
          </>
        )}
      </div>

      {/* Footer Branding */}
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

      {/* QR Modal */}
      {qrOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-neutral-900 border border-amber-500/30 rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center space-y-4 relative shadow-2xl">
            <button
              type="button"
              onClick={() => setQrOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-1">
              <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-amber-400 font-bold block">
                Scan With Any Phone
              </span>
              <h3 className="font-serif text-xl font-bold text-white">
                {invitation.names || 'Digital Invitation'}
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
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center shadow"
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
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center shadow"
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

export default InvitationRenderer;
