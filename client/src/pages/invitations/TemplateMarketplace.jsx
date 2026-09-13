import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import SEO from '../../components/common/SEO';
import {
  Crown,
  Eye,
  ChevronDown,
  Instagram,
  Mail,
} from 'lucide-react';

const invitationTypes = [
  { id: 'wedding', label: 'Wedding Invitation' },
  { id: 'engagement', label: 'Engagement Invitation' },
  { id: 'wedding-reception', label: 'Wedding & Reception Invitation' },
  { id: 'reception', label: 'Reception only invitation' },
  { id: 'birthday', label: 'Birthday Invitation' },
  { id: 'opening-ceremony', label: 'Opening Ceremony Invitation' },
  { id: 'anniversary', label: 'Anniversary Invitation' },
  { id: 'housewarming', label: 'Housewarming Invitations' },
  { id: 'party', label: 'Party Invitations' },
  { id: 'baby-shower', label: 'Baby shower' },
  { id: 'custom', label: 'Custom invitation' },
];

const royalTemplates = [
  {
    id: 'rose-gold-blush-royal',
    name: 'Royal Imperial',
    desc: 'Cinematic rose-gold opening with luxurious motion storytelling',
    video: '/videos/rose-gold-blush.mp4',
    poster: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    tag: 'Cinematic',
    tagColor: 'bg-amber-500 text-neutral-950 font-bold',
  },
  {
    id: 'royal-majesty',
    name: 'Royal Majesty',
    desc: 'Porcelain blue ballroom romance with painterly cinematic grandeur',
    video: '/videos/royal-majesty.mp4',
    poster: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80',
    tag: 'New',
    tagColor: 'bg-amber-600 text-white font-bold',
  },
  {
    id: 'royal-elegance-royal',
    name: 'Royal Elegance',
    desc: 'Velvet cream and crimson cinematic experience with palace motifs',
    video: '/videos/royal-elegance-royal.mp4',
    poster: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
    tag: 'Premium',
    tagColor: 'bg-amber-700 text-white font-bold',
  },
  {
    id: 'royal-prestige',
    name: 'Royal Prestige',
    desc: 'Prestigious cinematic opening with refined elegance and grandeur',
    video: '/videos/royal-prestige.mp4',
    poster: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
    tag: 'New',
    tagColor: 'bg-amber-600 text-white font-bold',
  },
  {
    id: 'royal-heritage',
    name: 'Royal Heritage',
    desc: 'Timeless cinematic opening with regal heritage storytelling',
    video: '/videos/royal-heritage.mp4',
    poster: 'https://images.unsplash.com/photo-1544078741-7ea0e0cb5b81?auto=format&fit=crop&w=800&q=80',
    tag: 'New',
    tagColor: 'bg-amber-600 text-white font-bold',
  },
  {
    id: 'royal-grace',
    name: 'Royal Grace',
    desc: 'Sage garden serenity with pearl drapes and graceful cinematic reveal',
    video: '/videos/royal-grace.mp4',
    poster: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80',
    tag: 'New',
    tagColor: 'bg-amber-600 text-white font-bold',
  },
  {
    id: 'royal-crest',
    name: 'Royal Crest',
    desc: 'Warm ivory florals, antique burgundy wax seal, and lakeside cinematic romance',
    video: '/videos/royal-crest.mp4',
    poster: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80',
    tag: 'New',
    tagColor: 'bg-amber-600 text-white font-bold',
  },
  {
    id: 'royal-legacy',
    name: 'Royal Legacy',
    desc: 'Burgundy velvet curtains, antique gold ornament, and a timeless cinematic reveal',
    video: '/videos/royal-legacy.mp4',
    poster: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=800&q=80',
    tag: 'New',
    tagColor: 'bg-amber-600 text-white font-bold',
  },
];

const classicTemplates = [
  {
    id: 'emerald-noir',
    name: 'Emerald Noir',
    desc: 'Deep green and gold with ornate corner accents and luxury door opening',
    bgStyle: 'bg-gradient-to-br from-[#0c2f1d] via-[#13492e] to-[#0a2316]',
    textColor: 'text-amber-300',
    tag: 'Limited Edition',
    tagColor: 'bg-amber-500 text-neutral-950 font-bold',
  },
  {
    id: 'ivory-elegance',
    name: 'Crimson Royale',
    desc: 'Dark charcoal base with gold and deep red accents, luxury card reveal',
    bgStyle: 'bg-gradient-to-br from-[#1c1415] via-[#3d181b] to-[#170e10]',
    textColor: 'text-amber-400',
    tag: 'Most Liked',
    tagColor: 'bg-rose-500 text-white font-bold',
  },
  {
    id: 'rose-gold-blush',
    name: 'Rose Gold Blush',
    desc: 'Blush pink and rose gold with ornate floral door animation',
    bgStyle: 'bg-gradient-to-br from-[#fde7ed] via-[#f8c9d4] to-[#fde7ed]',
    textColor: 'text-rose-700',
    tag: null,
  },
  {
    id: 'modern-minimal',
    name: 'Modern Minimal',
    desc: 'Deep navy and gold with geometric patterns and book-style opening',
    bgStyle: 'bg-gradient-to-br from-[#111928] via-[#1f2a3f] to-[#0c121e]',
    textColor: 'text-amber-400',
    tag: 'New',
    tagColor: 'bg-amber-600 text-white font-bold',
  },
  {
    id: 'royal-elegance',
    name: 'Majestic Love',
    desc: 'Classic ivory and gold with palace motifs and velvet curtain reveal',
    bgStyle: 'bg-gradient-to-br from-[#fdf6e9] via-[#faebd1] to-[#fdf6e9]',
    textColor: 'text-amber-800',
    tag: 'New',
    tagColor: 'bg-amber-600 text-white font-bold',
  },
];

const TemplateMarketplace = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [activeTab, setActiveTab] = useState(
    searchParams.get('collection') === 'classic' ? 'classic' : 'royal'
  );
  const [selectedType, setSelectedType] = useState(
    searchParams.get('type') || 'wedding'
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSelectDesign = (templateId) => {
    navigate('/create/' + templateId + '?type=' + selectedType);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-neutral-900 font-sans flex flex-col justify-between selection:bg-amber-200 selection:text-amber-900">
      <SEO
        title="Invitation Templates | 13 Premium Designs - Zareqia"
        description="Browse 13 premium animated digital invitation templates for weddings, birthdays, baby showers, and parties."
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 w-full">
        {/* Top Dropdown Header */}
        <div className="text-center mb-6 space-y-2">
          <span className="text-[11px] md:text-xs uppercase tracking-[0.2em] text-neutral-500 font-serif font-semibold block">
            INVITATION TYPE
          </span>

          <div className="relative inline-block text-left">
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-[270px] md:w-[320px] h-11 px-4 rounded-xl border border-neutral-300 bg-white/90 text-sm font-medium text-neutral-800 shadow-sm flex items-center justify-between hover:border-amber-500 transition-all cursor-pointer"
            >
              <span>{invitationTypes.find((t) => t.id === selectedType)?.label || 'Wedding Invitation'}</span>
              <ChevronDown className="w-4 h-4 text-neutral-500" />
            </button>

            {dropdownOpen && (
              <div className="absolute left-0 right-0 mt-1.5 py-1.5 rounded-xl border border-neutral-200 bg-white shadow-xl z-50 max-h-[300px] overflow-y-auto custom-scrollbar text-left text-xs">
                {invitationTypes.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setSelectedType(item.id);
                      setDropdownOpen(false);
                    }}
                    className={'w-full px-4 py-2.5 text-left transition-colors cursor-pointer ' + (selectedType === item.id ? 'bg-amber-50 font-bold text-amber-900' : 'text-neutral-700 hover:bg-neutral-50')}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <p className="text-[11px] text-neutral-500 pt-1">
            Royal plan includes both royal + classic templates.
          </p>
        </div>

        {/* Segmented Royal / Classics Toggle (1:1 Zareqia) */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex items-center p-1 rounded-full border border-neutral-300/80 bg-white shadow-md">
            <button
              type="button"
              onClick={() => setActiveTab('royal')}
              className={'flex items-center space-x-1.5 px-6 md:px-8 py-2.5 rounded-full text-xs md:text-sm font-bold transition-all cursor-pointer ' + (activeTab === 'royal' ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-950 shadow-md' : 'text-neutral-600 hover:text-neutral-900')}
            >
              <Crown className="w-3.5 h-3.5" />
              <span>Zareqia Royal</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('classic')}
              className={'px-6 md:px-8 py-2.5 rounded-full text-xs md:text-sm font-bold transition-all cursor-pointer ' + (activeTab === 'classic' ? 'bg-neutral-900 text-white shadow-md' : 'text-neutral-600 hover:text-neutral-900')}
            >
              <span>Zareqia Classics</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 1. ROYAL TEMPLATES TAB (Screenshot 2) */}
        {/* ========================================================================= */}
        {activeTab === 'royal' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {royalTemplates.map((template) => (
              <div
                key={template.id}
                className="group rounded-2xl overflow-hidden border border-amber-900/20 bg-gradient-to-b from-[#1c150e] to-[#2b1c12] text-white shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between"
              >
                {/* Visual Video Poster */}
                <div className="relative h-44 sm:h-48 overflow-hidden bg-neutral-950">
                  {template.tag && (
                    <span className={'absolute top-2.5 left-2.5 z-20 px-2.5 py-0.5 rounded-md text-[10px] uppercase tracking-wider ' + template.tagColor}>
                      {template.tag}
                    </span>
                  )}

                  <video
                    src={template.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                  {/* View Demo Button */}
                  <Link
                    to={'/invite/demo?template=' + template.id + '&type=' + selectedType}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-x-0 bottom-2.5 z-20 flex items-center justify-center"
                  >
                    <span className="inline-flex items-center rounded-full bg-black/60 hover:bg-black/85 backdrop-blur-md px-3.5 py-1 text-[11px] font-medium text-amber-200 border border-amber-400/40 shadow-md transition-transform active:scale-95">
                      <Eye className="w-3.5 h-3.5 mr-1 text-amber-300" />
                      View Demo
                    </span>
                  </Link>
                </div>

                {/* Card Content & CTA */}
                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <h3 className="font-serif text-base font-bold text-amber-200 tracking-wide">
                      {template.name}
                    </h3>
                    <p className="text-[11px] text-amber-100/70 leading-relaxed line-clamp-2">
                      {template.desc}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleSelectDesign(template.id)}
                    className="w-full py-2 rounded-md bg-gradient-to-r from-[#2a1d12] via-[#3a2818] to-[#2a1d12] hover:brightness-125 border border-amber-400/60 text-amber-300 font-serif font-bold text-xs uppercase tracking-wider shadow-sm transition-all cursor-pointer"
                  >
                    USE THIS DESIGN
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ========================================================================= */}
        {/* 2. CLASSICS TEMPLATES TAB (Screenshot 1) */}
        {/* ========================================================================= */}
        {activeTab === 'classic' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {classicTemplates.map((template) => (
              <div
                key={template.id}
                className="group rounded-2xl overflow-hidden border border-[#E8DFD1] bg-white shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between"
              >
                {/* Visual Color Block Header */}
                <div className={'relative h-44 sm:h-48 ' + template.bgStyle + ' p-4 flex flex-col justify-between items-center text-center overflow-hidden'}>
                  {template.tag && (
                    <span className={'absolute top-2.5 left-2.5 z-20 px-2 py-0.5 rounded-md text-[9px] uppercase tracking-wider ' + template.tagColor}>
                      {template.tag}
                    </span>
                  )}

                  <div className="my-auto px-2">
                    <h4 className={'font-serif text-lg font-bold tracking-wide ' + template.textColor + ' drop-shadow-sm'}>
                      {template.name}
                    </h4>
                  </div>

                  {/* View Demo Button */}
                  <Link
                    to={'/invite/demo?template=' + template.id + '&type=' + selectedType}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center z-10"
                  >
                    <span className="inline-flex items-center rounded-full bg-black/60 hover:bg-black/85 backdrop-blur-md px-3.5 py-1 text-[11px] font-medium text-white border border-white/30 shadow-md transition-transform active:scale-95">
                      <Eye className="w-3.5 h-3.5 mr-1 text-amber-300" />
                      View Demo
                    </span>
                  </Link>
                </div>

                {/* Card Content & CTA */}
                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <h3 className="font-serif text-sm font-bold text-neutral-900">
                      {template.name}
                    </h3>
                    <p className="text-[11px] text-neutral-600 leading-relaxed line-clamp-2">
                      {template.desc}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleSelectDesign(template.id)}
                    className="w-full py-2 rounded-md bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold text-xs uppercase tracking-wider shadow-xs transition-all cursor-pointer"
                  >
                    Use This Design
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* ========================================================================= */}
      {/* FOOTER (1:1 ZAREQIA) */}
      {/* ========================================================================= */}
      <footer className="border-t border-amber-900/10 bg-white/70 py-10 px-4 text-center space-y-4">
        <h3 className="font-serif text-xl font-bold text-amber-800 tracking-wide">
          Zareqia
        </h3>

        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-neutral-600 font-serif">
          <Link to="/about" className="hover:text-amber-900 transition-colors">About</Link>
          <Link to="/contact" className="hover:text-amber-900 transition-colors">Contact</Link>
          <Link to="/terms" className="hover:text-amber-900 transition-colors">Terms & Conditions</Link>
          <Link to="/privacy" className="hover:text-amber-900 transition-colors">Privacy Policy</Link>
          <Link to="/refund" className="hover:text-amber-900 transition-colors">Refund Policy</Link>
          <Link to="/shipping" className="hover:text-amber-900 transition-colors">Shipping & Delivery</Link>
          <Link to="/affiliate" className="hover:text-amber-900 transition-colors">Become an Affiliate</Link>
        </div>

        <div className="flex items-center justify-center space-x-4 text-neutral-500 pt-2">
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-amber-800">
            <Instagram className="w-4 h-4" />
          </a>
          <a href="mailto:support@zareqia.com" className="hover:text-amber-800">
            <Mail className="w-4 h-4" />
          </a>
        </div>

        <p className="text-[11px] text-neutral-500 font-serif">
          © 2026 Zareqia. Crafted with love
        </p>
        <p className="text-[10px] text-neutral-400">
          Digital invitation service • No physical products shipped
        </p>
      </footer>
    </div>
  );
};

export default TemplateMarketplace;
