import React from 'react';
import { ShieldCheck, Lock, AlertTriangle } from 'lucide-react';

export const ContentProtectionBanner = ({ isBlurred, securityAlert, watermark = true }) => {
  return (
    <>
      {/* 1. Temporary Blur Obfuscation Shield during screenshot/screen grab attempt */}
      {isBlurred && (
        <div className="fixed inset-0 z-[99999] backdrop-blur-3xl bg-neutral-950/85 flex items-center justify-center pointer-events-none select-none transition-all duration-300">
          <div className="text-center p-8 rounded-3xl bg-neutral-900/90 border border-amber-500/40 text-amber-200 shadow-2xl max-w-md mx-4 animate-fade-in">
            <ShieldCheck className="w-12 h-12 text-amber-400 mx-auto mb-3 animate-pulse" />
            <h3 className="font-serif text-xl font-bold text-white mb-1">Protected Digital Invitation</h3>
            <p className="text-xs text-neutral-300 font-sans leading-relaxed">
              Screenshots, snipping tools & screen recordings are restricted to preserve client privacy & royal copyright.
            </p>
            <div className="mt-4 inline-flex items-center text-[10px] font-mono uppercase tracking-widest text-amber-400/80">
              <Lock className="w-3 h-3 mr-1" /> Moonlight Production Digital Rights
            </div>
          </div>
        </div>
      )}

      {/* 2. Security Notification Toast */}
      {securityAlert && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[99998] pointer-events-none select-none animate-bounce">
          <div className="px-5 py-3 rounded-2xl bg-neutral-950/95 border-2 border-amber-500 text-amber-200 shadow-2xl flex items-center space-x-3 text-xs font-sans">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="font-medium">{securityAlert}</span>
          </div>
        </div>
      )}

      {/* 3. Subtle Non-Intrusive Background Security Watermark */}
      {watermark && (
        <div className="fixed inset-0 pointer-events-none select-none z-[1] overflow-hidden opacity-[0.035] flex items-center justify-center rotate-[-30deg]">
          <span className="text-5xl md:text-8xl font-serif font-black tracking-widest text-neutral-950 uppercase whitespace-nowrap">
            MOONLIGHT ENCRYPTED DIGITAL SUITE • COPYRIGHT PROTECTED
          </span>
        </div>
      )}
    </>
  );
};

export default ContentProtectionBanner;
