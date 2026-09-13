import React from 'react';
import { Heart, Sparkles } from 'lucide-react';

const defaultGroomPhoto =
  'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=600&q=80';
const defaultBridePhoto =
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80';

const CoupleProfileSection = ({ invitation = {}, theme = {} }) => {
  const isIndividualBirthdayOrEvent =
    invitation.eventType?.toLowerCase().includes('birthday') ||
    invitation.category?.toLowerCase().includes('birthday') ||
    invitation.template_id?.includes('sunshine') ||
    invitation.templateId?.includes('sunshine');

  if (isIndividualBirthdayOrEvent) {
    return null;
  }

  const groomName = invitation.groom_name || invitation.groomName || 'Aarav Singhania';
  const brideName = invitation.bride_name || invitation.brideName || 'Kiara Malhotra';
  const groomParents =
    invitation.groom_parents || invitation.groomParents || 'Son of Mrs. Sunita & Mr. Rajesh Singhania';
  const brideParents =
    invitation.bride_parents || invitation.brideParents || 'Daughter of Mrs. Poonam & Mr. Anand Malhotra';
  const groomPhoto =
    invitation.groom_photo || invitation.groomPhoto || defaultGroomPhoto;
  const bridePhoto =
    invitation.bride_photo || invitation.bridePhoto || defaultBridePhoto;
  const groomBio =
    invitation.groom_bio || invitation.groomBio || 'Entrepreneur & Tech Enthusiast';
  const brideBio =
    invitation.bride_bio || invitation.brideBio || 'Architect & Classical Dancer';

  return (
    <section className="py-12 px-4 sm:px-6 max-w-xl mx-auto space-y-6 text-center font-sans">
      {/* Section Header */}
      <div className="space-y-1.5">
        <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-amber-400 font-bold block">
          ✦ The Happy Couple ✦
        </span>
        <h2
          className={`font-serif text-2xl sm:text-3xl font-bold tracking-tight bg-gradient-to-r ${theme.goldGradient || 'from-amber-400 via-amber-200 to-amber-500'} bg-clip-text text-transparent`}
        >
          Groom & Bride
        </h2>
        <div className="w-12 h-0.5 bg-amber-500/40 mx-auto" />
      </div>

      {/* Profile Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Groom Card */}
        <div
          className={`${theme.cardBg || 'bg-[#2A1D13]/95'} backdrop-blur-md rounded-3xl p-6 border ${theme.borderColor || 'border-amber-600/30'} shadow-xl flex flex-col items-center text-center space-y-3 relative group hover:border-amber-500/50 transition-all`}
        >
          <div className="absolute top-3 right-3">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-[9px] font-mono uppercase tracking-widest text-amber-300 font-bold">
              The Groom
            </span>
          </div>

          {/* Groom Photo with Royal Ring */}
          <div className="relative mt-2">
            <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-amber-500 via-yellow-300 to-amber-600 blur-xs opacity-75 group-hover:opacity-100 transition-opacity" />
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-amber-300 p-0.5 relative z-10 bg-black">
              <img
                src={groomPhoto}
                alt={groomName}
                className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
          </div>

          <div className="space-y-1 pt-1">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-tight">
              {groomName}
            </h3>
            <p className="text-[11px] text-amber-300/90 font-mono italic">
              {groomParents}
            </p>
            {groomBio && (
              <p className="text-[11px] text-neutral-300 font-sans pt-1 max-w-xs">
                {groomBio}
              </p>
            )}
          </div>
        </div>

        {/* Bride Card */}
        <div
          className={`${theme.cardBg || 'bg-[#2A1D13]/95'} backdrop-blur-md rounded-3xl p-6 border ${theme.borderColor || 'border-amber-600/30'} shadow-xl flex flex-col items-center text-center space-y-3 relative group hover:border-amber-500/50 transition-all`}
        >
          <div className="absolute top-3 right-3">
            <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 border border-rose-400/30 text-[9px] font-mono uppercase tracking-widest text-rose-300 font-bold">
              The Bride
            </span>
          </div>

          {/* Bride Photo with Royal Ring */}
          <div className="relative mt-2">
            <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-rose-400 via-pink-300 to-amber-400 blur-xs opacity-75 group-hover:opacity-100 transition-opacity" />
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-rose-300 p-0.5 relative z-10 bg-black">
              <img
                src={bridePhoto}
                alt={brideName}
                className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
          </div>

          <div className="space-y-1 pt-1">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-tight">
              {brideName}
            </h3>
            <p className="text-[11px] text-rose-300/90 font-mono italic">
              {brideParents}
            </p>
            {brideBio && (
              <p className="text-[11px] text-neutral-300 font-sans pt-1 max-w-xs">
                {brideBio}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoupleProfileSection;
