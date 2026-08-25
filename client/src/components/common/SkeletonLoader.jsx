import React from 'react';

export const CardSkeleton = ({ count = 3, height = 'h-80' }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`${height} rounded-2xl bg-obsidian-300 border border-white/5 relative overflow-hidden animate-pulse`}
        >
          <div className="absolute inset-0 bg-gold-shimmer animate-shimmer" />
          <div className="absolute bottom-4 left-4 right-4 space-y-2">
            <div className="h-4 bg-white/10 rounded w-3/4" />
            <div className="h-3 bg-white/5 rounded w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
};
