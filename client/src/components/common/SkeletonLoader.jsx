import React from 'react';

export const CardSkeleton = ({ count = 3, height = 'h-80' }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`${height} rounded-2xl bg-stone-100 border border-neutral-200/80 relative overflow-hidden animate-pulse`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-100/50 to-transparent animate-shimmer" />
          <div className="absolute bottom-4 left-4 right-4 space-y-2">
            <div className="h-4 bg-stone-300 rounded w-3/4" />
            <div className="h-3 bg-stone-200 rounded w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
};
