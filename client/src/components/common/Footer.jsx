import React from 'react';
import { Link } from 'react-router-dom';
import {
  Instagram,
  Youtube,
  Phone,
  Mail,
  MapPin,
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
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#F2ECE4] border-t border-amber-900/15 text-neutral-800 relative overflow-hidden">
      {/* Top VIP Indian Wedding Booking Banner */}
      <div className="border-b border-amber-900/10 bg-[#EAE2D8] relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-amber-800 font-bold block">
              Moonlight Production • India Studio
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-neutral-900">
              Booking Dates Open for 2026 – 2027 Royal Wedding Season
            </h3>
            <p className="text-xs text-neutral-600 font-medium">
              Palace weddings in Rajasthan, Maheshwar Ghats, Goa beach ceremonies & all-India destination shoots.
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <a
              href="https://api.whatsapp.com/send?phone=919229229323"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-full border border-emerald-600/40 bg-emerald-600/10 hover:bg-emerald-600 hover:text-white text-emerald-800 font-bold text-xs uppercase tracking-wider transition-all flex items-center shadow-sm"
            >
              <Phone className="w-3.5 h-3.5 mr-1.5" /> WhatsApp: +91 92292 29323
            </a>

            <Link
              to="/enquiry"
              className="px-5 py-2.5 rounded-full bg-gold-gradient text-neutral-950 font-extrabold text-xs uppercase tracking-wider shadow-sm hover:brightness-105 active:scale-95 transition-all flex items-center btn-shimmer"
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
              <div className="w-11 h-11 rounded-full border-2 border-gold-500 p-0.5 flex items-center justify-center bg-white shadow-sm overflow-hidden">
                <img
                  src="https://ugc.production.linktr.ee/bbcf2874-0602-4cdb-b362-ad612f9fc135_zV3Uuw-tQraxE7KwMApwOHbWTg75v6W5ZJJOyWhXSJBR8O1GMQMZMOQ4CvB8uCMV4mM0SXMK-Q-s800-c-k-c0x00ffffff-no-r.jpeg?io=true&size=avatar-v3_0"
                  alt="Moonlight Production"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <span className="font-serif text-2xl font-bold tracking-[0.16em] text-neutral-900">
                  MOONLIGHT
                </span>
                <p className="text-[9px] tracking-[0.25em] text-amber-800 font-mono uppercase font-bold">
                  Production • Indian Wedding Cinema
                </p>
              </div>
            </div>

            <p className="text-xs text-neutral-600 leading-relaxed max-w-sm font-medium">
              Immortalizing Indian royal weddings, joyous Sangeet nights, vibrant Haldi rituals, and breathtaking cinematic pre-weddings across India.
            </p>

            {/* Direct Official Social Channels */}
            <div className="flex items-center space-x-3 text-neutral-600 pt-1">
              <a
                href="https://instagram.com/moonlight_production__"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-white border border-amber-900/15 flex items-center justify-center hover:text-pink-600 hover:border-pink-500 transition-all shadow-sm"
                title="@moonlight_production__ on Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.youtube.com/@moonlightproductions_films"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 rounded-full bg-white border border-amber-900/15 flex items-center justify-center hover:text-red-600 hover:border-red-500 transition-all shadow-sm"
                title="@moonlightproductions_films on YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://linktr.ee/moonlight_photography_in"
                target="_blank"
                rel="noreferrer"
                aria-label="Linktree"
                className="w-9 h-9 rounded-full bg-white border border-amber-900/15 flex items-center justify-center hover:text-amber-800 hover:border-amber-600 transition-all text-xs font-mono font-bold shadow-sm"
                title="Moonlight Production Linktree"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://api.whatsapp.com/send?phone=919229229323"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-full bg-white border border-amber-900/15 flex items-center justify-center hover:text-emerald-600 hover:border-emerald-500 transition-all shadow-sm"
                title="WhatsApp Concierge: +91 92292 29323"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Destination Wedding Circuits */}
          <div className="space-y-3.5">
            <h4 className="text-xs uppercase tracking-[0.2em] text-amber-800 font-bold font-mono">
              Top Wedding Circuits
            </h4>
            <ul className="space-y-2 text-xs text-neutral-600 font-medium">
              <li className="flex items-center hover:text-amber-900 transition-colors"><MapPin className="w-3 h-3 text-amber-600 mr-1.5 shrink-0" /> Udaipur & Palace Unions</li>
              <li className="flex items-center hover:text-amber-900 transition-colors"><MapPin className="w-3 h-3 text-amber-600 mr-1.5 shrink-0" /> Jaipur & Jodhpur Forts</li>
              <li className="flex items-center hover:text-amber-900 transition-colors"><MapPin className="w-3 h-3 text-amber-600 mr-1.5 shrink-0" /> Maheshwar Ghats & MP</li>
              <li className="flex items-center hover:text-amber-900 transition-colors"><MapPin className="w-3 h-3 text-amber-600 mr-1.5 shrink-0" /> Bhopal Heritage & Lakes</li>
              <li className="flex items-center hover:text-amber-900 transition-colors"><MapPin className="w-3 h-3 text-amber-600 mr-1.5 shrink-0" /> Goa Beachside Sunset Pheras</li>
              <li className="flex items-center hover:text-amber-900 transition-colors"><MapPin className="w-3 h-3 text-amber-600 mr-1.5 shrink-0" /> Mumbai & Delhi Luxury</li>
            </ul>
          </div>

          {/* Wedding Services & Rituals */}
          <div className="space-y-3.5">
            <h4 className="text-xs uppercase tracking-[0.2em] text-amber-800 font-bold font-mono">
              Shoots & Coverage
            </h4>
            <ul className="space-y-2 text-xs text-neutral-600 font-medium">
              <li><Link to="/portfolio/pre-wedding" className="hover:text-amber-900 transition-colors">Cinematic Pre-Wedding Shoots</Link></li>
              <li><Link to="/portfolio/films" className="hover:text-amber-900 transition-colors">4K Wedding Cinema & Teasers</Link></li>
              <li><Link to="/portfolio/wedding" className="hover:text-amber-900 transition-colors">Sangeet & Haldi Photo Shoots</Link></li>
              <li><Link to="/portfolio/wedding" className="hover:text-amber-900 transition-colors">Baraat & Varmala Candid Moments</Link></li>
              <li><Link to="/services" className="hover:text-amber-900 transition-colors">Luxury Physical Photo Albums</Link></li>
              <li><Link to="/services" className="hover:text-amber-900 transition-colors">4K Drone Aerial Shoots</Link></li>
            </ul>
          </div>

          {/* Contact Concierge & Careers */}
          <div className="space-y-3.5">
            <h4 className="text-xs uppercase tracking-[0.2em] text-amber-800 font-bold font-mono">
              Studio Hotline
            </h4>
            <div className="space-y-2 text-xs font-mono text-neutral-700">
              <a
                href="https://api.whatsapp.com/send?phone=919229229323"
                target="_blank"
                rel="noreferrer"
                className="flex items-center text-emerald-700 hover:text-emerald-800 font-bold"
              >
                <Phone className="w-3.5 h-3.5 mr-1.5" /> +91 92292 29323
              </a>
              <a
                href="https://instagram.com/moonlight_production__"
                target="_blank"
                rel="noreferrer"
                className="flex items-center hover:text-pink-600 truncate font-semibold"
              >
                <Instagram className="w-3.5 h-3.5 mr-1.5 text-pink-600" /> @moonlight_production__
              </a>
              <a
                href="https://www.youtube.com/@moonlightproductions_films"
                target="_blank"
                rel="noreferrer"
                className="flex items-center hover:text-red-600 truncate font-semibold"
              >
                <Youtube className="w-3.5 h-3.5 mr-1.5 text-red-600" /> @moonlightproductions_films
              </a>
            </div>

            <div className="pt-2 border-t border-neutral-300">
              <Link
                to="/careers"
                className="flex items-center text-xs text-amber-900 hover:text-amber-950 font-bold bg-amber-500/15 hover:bg-amber-500/25 px-2.5 py-2 rounded-lg border border-amber-500/30 transition-all group"
              >
                <Camera className="w-3.5 h-3.5 mr-1.5 text-amber-700" />
                <span>Careers & Job Openings</span>
                <span className="ml-auto px-1.5 py-0.2 rounded text-[9px] font-mono uppercase bg-emerald-600 text-white font-bold">
                  We're Hiring
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Editorial Bar */}
        <div className="mt-14 pt-8 border-t border-neutral-300 flex flex-col md:flex-row items-center justify-between text-xs text-neutral-500 space-y-4 md:space-y-0">
          <p>© {new Date().getFullYear()} Moonlight Production & Wedding Films. Proudly Crafted in India 🇮🇳</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link to="/careers" className="text-amber-900 font-bold hover:underline flex items-center">
              Careers & Hiring <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 ml-1.5 inline-block animate-pulse" />
            </Link>
            <Link to="/privacy" className="hover:text-amber-900 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-amber-900 transition-colors">Terms of Service</Link>
            <Link to="/faq" className="hover:text-amber-900 transition-colors">FAQ</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
