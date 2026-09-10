import React from 'react';
import { Heart, Sparkles, Quote } from 'lucide-react';

const StorySection = ({ invitation, theme }) => {
  const storyTitle = invitation.story_title || 'How Our Journey Began';
  const storyText =
    invitation.story_text ||
    'From a chance encounter that turned into endless midnight conversations, our bond grew with every shared laughter and quiet sunrise. Today, we stand ready to embark on our forever journey, surrounded by the people we cherish the most.';
  const quote = invitation.story_quote || 'In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine.';
  const hashtags = invitation.hashtags || '#AaravWedsKiara';

  return (
    <section className="py-12 px-5 sm:px-8 max-w-xl mx-auto space-y-6 text-center font-sans">
      {/* Top Section Badge */}
      <div className="space-y-1.5">
        <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-amber-400 font-bold block">
          ✦ Our Love Story ✦
        </span>
        <h2
          className={`font-serif text-2xl sm:text-3xl font-bold tracking-tight bg-gradient-to-r ${theme.goldGradient} bg-clip-text text-transparent`}
        >
          {storyTitle}
        </h2>
        <div className="w-12 h-0.5 bg-amber-500/40 mx-auto" />
      </div>

      {/* Story Card */}
      <div className={`${theme.cardBg} backdrop-blur-md rounded-3xl p-6 sm:p-8 border ${theme.borderColor} shadow-xl space-y-5 text-left`}>
        <div className="flex items-center space-x-2 text-amber-400">
          <Heart className="w-4 h-4 fill-amber-400" />
          <span className="text-xs font-mono font-bold tracking-wider uppercase">A Timeless Bond</span>
        </div>

        <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed font-sans">
          {storyText}
        </p>

        {/* Romantic Quote Block */}
        {quote && (
          <div className="p-4 rounded-2xl bg-black/40 border border-amber-500/20 space-y-2 relative">
            <Quote className="w-5 h-5 text-amber-400/40 absolute top-3 right-3" />
            <p className="text-xs italic text-amber-200/90 font-serif leading-relaxed pr-6">
              "{quote}"
            </p>
          </div>
        )}

        {/* Hashtags Strip */}
        {hashtags && (
          <div className="pt-2 border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
            <span className="text-[10.5px] uppercase font-mono tracking-wider text-neutral-400 font-semibold">
              Tag Our Celebration:
            </span>
            <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 font-mono font-bold text-xs tracking-wider">
              {hashtags.startsWith('#') ? hashtags : `#${hashtags}`}
            </span>
          </div>
        )}
      </div>
    </section>
  );
};

export default StorySection;
