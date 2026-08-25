import React from 'react';
import { Link } from 'react-router-dom';
import {
  Instagram,
  Youtube,
  Phone,
  Mail,
  MapPin,
  Heart,
  ArrowUpRight,
  Sparkles,
  ShieldCheck,
  Calendar,
  Send,
  Clock,
  CheckCircle2,
  ExternalLink,
  Camera,
  Film,
  Crown,
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#070708] border-t border-gold-500/20 text-neutral-300 relative overflow-hidden">
      {/* Top VIP Indian Wedding Booking Banner */}
      <div className="border-b border-white/10 bg-[#0E0E12]/90 backdrop-blur-md relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-gold-400 font-bold block">
              Moonlight Production • India Studio
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
              Booking Dates Open for 2026 – 2027 Royal Wedding Season
            </h3>
            <p className="text-xs text-neutral-400 font-light">
              Palace weddings in Rajasthan, Maheshwar Ghats, Goa beach ceremonies & all-India destination shoots.
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <a
              href="https://api.whatsapp.com/send?phone=919229229323"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 hover:bg-emerald-600 hover:text-white text-emerald-400 font-bold text-xs uppercase tracking-wider transition-all flex items-center shadow-sm"
            >
              <Phone className="w-3.5 h-3.5 mr-1.5" /> WhatsApp: +91 92292 29323
            </a>

            <Link
              to="/enquiry"
              className="px-5 py-2.5 rounded-full bg-gold-gradient text-black font-extrabold text-xs uppercase tracking-wider shadow-gold-subtle hover:brightness-110 active:scale-95 transition-all flex items-center btn-shimmer"
            >
              <Calendar className="w-3.5 h-3.5 mr-1.5" /> Plan Wedding Shoot
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Information */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand Identity & Social Column */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center space-x-3">
              <div className="w-11 h-11 rounded-full border border-gold-400 p-0.5 flex items-center justify-center bg-black shadow-gold-subtle overflow-hidden">
                <img
                  src="https://ugc.production.linktr.ee/bbcf2874-0602-4cdb-b362-ad612f9fc135_zV3Uuw-tQraxE7KwMApwOHbWTg75v6W5ZJJOyWhXSJBR8O1GMQMZMOQ4CvB8uCMV4mM0SXMK-Q-s800-c-k-c0x00ffffff-no-r.jpeg?io=true&size=avatar-v3_0"
                  alt="Moonlight Production"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <span className="font-serif text-2xl font-bold tracking-[0.16em] text-white">
                  MOONLIGHT
                </span>
                <p className="text-[9px] tracking-[0.25em] text-gold-400 font-mono uppercase font-bold">
                  Production • Indian Wedding Cinema
                </p>
              </div>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm font-light">
              Immortalizing Indian royal weddings, joyous Sangeet nights, vibrant Haldi rituals, and breathtaking cinematic pre-weddings across India.
            </p>

            {/* Direct Official Social Channels */}
            <div className="flex items-center space-x-3 text-neutral-400 pt-1">
              <a
                href="https://instagram.com/moonlight_production__"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:text-pink-400 hover:border-pink-500 transition-all"
                title="@moonlight_production__ on Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.youtube.com/@moonlightproductions_films"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:text-red-400 hover:border-red-500 transition-all"
                title="@moonlightproductions_films on YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://linktr.ee/moonlight_photography_in"
                target="_blank"
                rel="noreferrer"
                aria-label="Linktree"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:text-gold-300 hover:border-gold-400 transition-all text-xs font-mono font-bold"
                title="Moonlight Production Linktree"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://api.whatsapp.com/send?phone=919229229323"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:text-emerald-400 hover:border-emerald-500 transition-all"
                title="WhatsApp Concierge: +91 92292 29323"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Destination Wedding Circuits */}
          <div className="space-y-3.5">
            <h4 className="text-xs uppercase tracking-[0.2em] text-gold-400 font-bold font-mono">
              Top Wedding Circuits
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li className="flex items-center hover:text-white transition-colors"><MapPin className="w-3 h-3 text-gold-400 mr-1.5 shrink-0" /> Udaipur & Palace Unions</li>
              <li className="flex items-center hover:text-white transition-colors"><MapPin className="w-3 h-3 text-gold-400 mr-1.5 shrink-0" /> Jaipur & Jodhpur Forts</li>
              <li className="flex items-center hover:text-white transition-colors"><MapPin className="w-3 h-3 text-gold-400 mr-1.5 shrink-0" /> Maheshwar Ghats & MP</li>
              <li className="flex items-center hover:text-white transition-colors"><MapPin className="w-3 h-3 text-gold-400 mr-1.5 shrink-0" /> Bhopal Heritage & Lakes</li>
              <li className="flex items-center hover:text-white transition-colors"><MapPin className="w-3 h-3 text-gold-400 mr-1.5 shrink-0" /> Goa Beachside Sunset Pheras</li>
              <li className="flex items-center hover:text-white transition-colors"><MapPin className="w-3 h-3 text-gold-400 mr-1.5 shrink-0" /> Mumbai & Delhi Luxury</li>
            </ul>
          </div>

          {/* Wedding Services & Rituals */}
          <div className="space-y-3.5">
            <h4 className="text-xs uppercase tracking-[0.2em] text-gold-400 font-bold font-mono">
              Shoots & Coverage
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li><Link to="/portfolio/pre-wedding" className="hover:text-gold-300 transition-colors">Cinematic Pre-Wedding Shoots</Link></li>
              <li><Link to="/portfolio/films" className="hover:text-gold-300 transition-colors">4K Wedding Cinema & Teasers</Link></li>
              <li><Link to="/portfolio/wedding" className="hover:text-gold-300 transition-colors">Sangeet & Haldi Photo Shoots</Link></li>
              <li><Link to="/portfolio/wedding" className="hover:text-gold-300 transition-colors">Baraat & Varmala Candid Moments</Link></li>
              <li><Link to="/services" className="hover:text-gold-300 transition-colors">Luxury Physical Photo Albums</Link></li>
              <li><Link to="/services" className="hover:text-gold-300 transition-colors">4K Drone Aerial Shoots</Link></li>
            </ul>
          </div>

          {/* Contact Concierge & Login */}
          <div className="space-y-3.5">
            <h4 className="text-xs uppercase tracking-[0.2em] text-gold-400 font-bold font-mono">
              Studio Hotline
            </h4>
            <div className="space-y-2 text-xs font-mono text-neutral-400">
              <a
                href="https://api.whatsapp.com/send?phone=919229229323"
                target="_blank"
                rel="noreferrer"
                className="flex items-center text-emerald-400 hover:text-emerald-300 font-bold"
              >
                <Phone className="w-3.5 h-3.5 mr-1.5" /> +91 92292 29323
              </a>
              <a
                href="https://instagram.com/moonlight_production__"
                target="_blank"
                rel="noreferrer"
                className="flex items-center hover:text-pink-400 truncate"
              >
                <Instagram className="w-3.5 h-3.5 mr-1.5 text-pink-400" /> @moonlight_production__
              </a>
              <a
                href="https://www.youtube.com/@moonlightproductions_films"
                target="_blank"
                rel="noreferrer"
                className="flex items-center hover:text-red-400 truncate"
              >
                <Youtube className="w-3.5 h-3.5 mr-1.5 text-red-400" /> @moonlightproductions_films
              </a>
            </div>

            <div className="pt-2 border-t border-white/10 space-y-2">
              <Link
                to="/login?role=customer"
                className="flex items-center text-xs text-gold-300 hover:text-white font-semibold"
              >
                <Heart className="w-3 h-3 mr-1.5 text-gold-400" /> Couple Sanctuary Login
              </Link>
              <Link
                to="/login?role=admin"
                className="flex items-center text-[11px] text-neutral-400 hover:text-white"
              >
                <Crown className="w-3 h-3 mr-1.5 text-gold-400" /> Studio Admin Portal
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Editorial Bar */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-xs text-neutral-500 space-y-4 md:space-y-0">
          <p>© {new Date().getFullYear()} Moonlight Production & Wedding Films. Proudly Crafted in India 🇮🇳</p>
          <div className="flex space-x-6">
            <Link to="/privacy" className="hover:text-gold-300 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-gold-300 transition-colors">Terms of Service</Link>
            <Link to="/faq" className="hover:text-gold-300 transition-colors">FAQ</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
