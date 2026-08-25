import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppFloatingButton = ({
  phone = '+919229229323',
  message = 'Hello Moonlight Production, I would like to inquire about wedding photography and cinematic films for our upcoming celebration.',
}) => {
  const cleanPhone = phone.replace(/[^\d]/g, '');
  const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 left-6 z-40 flex items-center space-x-2 bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-500 hover:to-green-400 text-white px-4 py-3 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 group border border-emerald-400/40"
    >
      <MessageCircle className="w-5 h-5 text-white animate-pulse" />
      <span className="hidden sm:inline text-xs font-semibold tracking-wider uppercase font-sans">
        WhatsApp Concierge
      </span>
    </a>
  );
};

export default WhatsAppFloatingButton;
