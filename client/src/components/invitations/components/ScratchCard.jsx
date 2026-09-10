import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Gift, CheckCircle2 } from 'lucide-react';

const ScratchCard = ({ invitation, theme }) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const canvasRef = useRef(null);
  const isDrawing = useRef(false);

  const revealText =
    invitation.scratch_reveal_text ||
    invitation.scratchMessage ||
    "YOU’RE INVITED ♡\nWe can't wait to celebrate with you.";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    canvas.width = width;
    canvas.height = height;

    // Draw shimmering gold foil background
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#D4AF37');
    grad.addColorStop(0.3, '#F5E6AB');
    grad.addColorStop(0.6, '#AA820A');
    grad.addColorStop(1, '#E6CA65');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Decorative Jaali / Border Frame
    ctx.strokeStyle = '#5E430B';
    ctx.lineWidth = 3;
    ctx.strokeRect(6, 6, width - 12, height - 12);

    // Scratch Text
    ctx.fillStyle = '#1A1208';
    ctx.font = 'bold 15px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✦ SCRATCH HERE ✦', width / 2, height / 2 - 6);

    ctx.font = '10px Arial, sans-serif';
    ctx.fillStyle = '#3E2D07';
    ctx.fillText('Swipe with finger or mouse', width / 2, height / 2 + 14);

    let clearedCount = 0;
    const totalPixels = width * height;

    const scratch = (clientX, clientY) => {
      const rect = canvas.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 24, 0, Math.PI * 2);
      ctx.fill();

      clearedCount += 400;
      if (clearedCount > totalPixels * 0.35) {
        setIsRevealed(true);
      }
    };

    // Touch Events
    const handleTouchStart = (e) => {
      isDrawing.current = true;
      const touch = e.touches[0];
      if (touch) scratch(touch.clientX, touch.clientY);
    };

    const handleTouchMove = (e) => {
      if (!isDrawing.current) return;
      const touch = e.touches[0];
      if (touch) scratch(touch.clientX, touch.clientY);
    };

    const handleTouchEnd = () => {
      isDrawing.current = false;
    };

    // Mouse Events
    const handleMouseDown = (e) => {
      isDrawing.current = true;
      scratch(e.clientX, e.clientY);
    };

    const handleMouseMove = (e) => {
      if (!isDrawing.current) return;
      scratch(e.clientX, e.clientY);
    };

    const handleMouseUp = () => {
      isDrawing.current = false;
    };

    canvas.addEventListener('touchstart', handleTouchStart, { passive: true });
    canvas.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);

      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isRevealed]);

  return (
    <section className="py-12 px-4 sm:px-6 max-w-xl mx-auto space-y-6 text-center font-sans">
      <div className="space-y-1.5">
        <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-amber-400 font-bold block">
          ✦ Interactive Surprise ✦
        </span>
        <h2
          className={`font-serif text-2xl sm:text-3xl font-bold tracking-tight bg-gradient-to-r ${theme.goldGradient} bg-clip-text text-transparent`}
        >
          Special Card Reveal
        </h2>
        <div className="w-12 h-0.5 bg-amber-500/40 mx-auto" />
      </div>

      <div
        className={`${theme.cardBg} backdrop-blur-md rounded-3xl p-6 sm:p-8 border ${theme.borderColor} shadow-2xl space-y-4 relative overflow-hidden`}
      >
        <p className="text-xs text-neutral-300 font-sans">
          Scratch away the golden card below to unlock a personalized blessing:
        </p>

        {/* Scratch Card Container */}
        <div className="relative w-full h-36 sm:h-40 rounded-2xl overflow-hidden bg-gradient-to-br from-amber-950 via-[#2E1E12] to-neutral-950 border-2 border-amber-500/40 shadow-inner flex items-center justify-center select-none">
          {/* Revealed Secret Content Underneath */}
          <div className="p-4 text-center space-y-2 animate-fade-in z-0">
            <div className="w-9 h-9 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 flex items-center justify-center mx-auto shadow">
              <Gift className="w-5 h-5 text-amber-400" />
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-amber-300 tracking-wide drop-shadow">
              {revealText.split('\n')[0]}
            </h3>
            {revealText.split('\n')[1] && (
              <p className="text-xs text-amber-100/90 font-sans max-w-xs mx-auto italic">
                {revealText.split('\n')[1]}
              </p>
            )}
          </div>

          {/* Canvas Gold Cover Layer (Removed as scratched) */}
          {!isRevealed && (
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full cursor-crosshair z-10 touch-none"
            />
          )}
        </div>

        {/* Status Hint */}
        <div className="pt-2 flex items-center justify-center space-x-2 text-[11px] text-amber-300 font-mono">
          {isRevealed ? (
            <span className="flex items-center text-emerald-400 font-bold">
              <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Revealed Successfully!
            </span>
          ) : (
            <span className="flex items-center text-amber-300/80">
              <Sparkles className="w-3.5 h-3.5 mr-1 text-amber-400" /> Swipe or drag to reveal
            </span>
          )}
        </div>
      </div>
    </section>
  );
};

export default ScratchCard;
