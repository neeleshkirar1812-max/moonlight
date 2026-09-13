import React, { useState, useMemo } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
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
  { id: 'housewarming', label: 'Housewarming Invitations' },
  { id: 'baby-shower', label: 'Baby shower' },
  { id: 'anniversary', label: 'Anniversary Invitation' },
  { id: 'party', label: 'Party Invitations' },
  { id: 'opening-ceremony', label: 'Opening Ceremony Invitation' },
  { id: 'custom', label: 'Custom invitation' },
];

// Exact 8 Royal 4K Video Gate Templates (media_1789305808153.png)
const royalTemplates = [
  {
    id: 'rose-gold-blush-royal',
    name: 'Royal Imperial',
    desc: 'Cinematic rose-gold opening with luxurious motion storytelling',
    video: '/videos/rose-gold-blush.mp4',
    tag: 'Cinematic',
    tagColor: 'bg-[#E5A83B] text-neutral-950 font-bold',
  },
  {
    id: 'royal-majesty',
    name: 'Royal Majesty',
    desc: 'Porcelain blue ballroom romance with painterly cinematic grandeur',
    video: '/videos/royal-majesty.mp4',
    tag: 'New',
    tagColor: 'bg-[#E5A83B] text-neutral-950 font-bold',
  },
  {
    id: 'royal-elegance-royal',
    name: 'Royal Elegance',
    desc: 'Velvet cream and crimson cinematic experience with palace motifs',
    video: '/videos/royal-elegance-royal.mp4',
    tag: 'Premium',
    tagColor: 'bg-[#E5A83B] text-neutral-950 font-bold',
  },
  {
    id: 'royal-prestige',
    name: 'Royal Prestige',
    desc: 'Prestigious cinematic opening with refined elegance and grandeur',
    video: '/videos/royal-prestige.mp4',
    tag: 'New',
    tagColor: 'bg-[#E5A83B] text-neutral-950 font-bold',
  },
  {
    id: 'royal-heritage',
    name: 'Royal Heritage',
    desc: 'Timeless cinematic opening with regal heritage storytelling',
    video: '/videos/royal-heritage.mp4',
    tag: 'New',
    tagColor: 'bg-[#E5A83B] text-neutral-950 font-bold',
  },
  {
    id: 'royal-grace',
    name: 'Royal Grace',
    desc: 'Sage garden serenity with pearl drapes and graceful cinematic reveal',
    video: '/videos/royal-grace.mp4',
    tag: 'New',
    tagColor: 'bg-[#E5A83B] text-neutral-950 font-bold',
  },
  {
    id: 'royal-crest',
    name: 'Royal Crest',
    desc: 'Warm ivory florals, antique burgundy wax seal, and lakeside cinematic romance',
    video: '/videos/royal-crest.mp4',
    tag: 'New',
    tagColor: 'bg-[#E5A83B] text-neutral-950 font-bold',
  },
  {
    id: 'royal-legacy',
    name: 'Royal Legacy',
    desc: 'Burgundy velvet curtains, antique gold ornament, and a timeless cinematic reveal',
    video: '/videos/royal-legacy.mp4',
    tag: 'New',
    tagColor: 'bg-[#E5A83B] text-neutral-950 font-bold',
  },
];

// Exact 5 Classic 3D Gate Templates (media_1789305807997.png)
const classicTemplates = [
  {
    id: 'emerald-noir',
    name: 'Emerald Noir',
    desc: 'Deep green and gold with ornate corner accents and luxury door opening',
    previewBg: 'bg-gradient-to-br from-[#0c2e1a] to-[#071f11]',
    accentText: 'text-amber-300',
    tag: 'Limited Edition',
    tagColor: 'bg-[#E5A83B] text-neutral-950 font-bold',
  },
  {
    id: 'ivory-elegance',
    name: 'Crimson Royale',
    desc: 'Dark charcoal base with gold and deep red accents, luxury card reveal',
    previewBg: 'bg-gradient-to-br from-[#1a1415] via-[#3a1518] to-[#120e0f]',
    accentText: 'text-amber-300',
    tag: 'Most Liked',
    tagColor: 'bg-[#e11d48] text-white font-bold',
  },
  {
    id: 'rose-gold-blush',
    name: 'Rose Gold Blush',
    desc: 'Blush pink and rose gold with ornate floral door animation',
    previewBg: 'bg-gradient-to-br from-[#fce7ed] to-[#f9c5d3]',
    accentText: 'text-[#db2777]',
    tag: null,
    tagColor: null,
  },
  {
    id: 'modern-minimal',
    name: 'Modern Minimal',
    desc: 'Deep navy and gold with geometric patterns and book-style opening',
    previewBg: 'bg-gradient-to-br from-[#111827] to-[#1e293b]',
    accentText: 'text-amber-300',
    tag: 'New',
    tagColor: 'bg-[#b8860b] text-white font-bold',
  },
  {
    id: 'royal-elegance',
    name: 'Majestic Love',
    desc: 'Classic ivory and gold with palace motifs and velvet curtain reveal',
    previewBg: 'bg-gradient-to-br from-[#fef3c7] to-[#fde68a]',
    accentText: 'text-amber-900',
    tag: 'New',
    tagColor: 'bg-[#b8860b] text-white font-bold',
  },
];

const TemplateMarketplace = () => {
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
        title="Invitation Templates | Zareqia"
        description="Choose from 13 premium animated digital invitation templates across Zareqia Royal & Classic collections."
      />

      {/* Top Navbar (1:1 Zareqia) */}
      <header className="w-full border-b border-neutral-200/80 bg-[#FAF8F5]/90 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="font-serif text-2xl font-bold tracking-wide text-[#C59B27] hover:opacity-90 transition-opacity">
            Zareqia
          </Link>
          <Link
            to="/invitations/dashboard"
            className="text-sm font-medium text-neutral-800 hover:text-[#C59B27] transition-colors"
          >
            Dashboard
          </Link>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 w-full">
        {/* Top Dropdown Header (1:1 Zareqia) */}
        <div className="text-center mb-6 space-y-2">
          <span className="text-[11px] md:text-xs uppercase tracking-[0.2em] text-neutral-500 font-serif font-semibold block">
            INVITATION TYPE
          </span>

          <div className="relative inline-block text-left">
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-[280px] md:w-[320px] h-11 px-4 rounded-xl border border-neutral-300 bg-white text-sm font-medium text-neutral-800 shadow-xs flex items-center justify-between hover:border-amber-500 transition-all cursor-pointer"
            >
              <span>{invitationTypes.find((t) => t.id === selectedType)?.label || 'Wedding Invitation'}</span>
              <ChevronDown className="w-4 h-4 text-neutral-500" />
            </button>

            {dropdownOpen && (
              <div className="absolute left-0 right-0 mt-1.5 py-1.5 rounded-xl border border-neutral-200 bg-white shadow-xl z-50 max-h-[320px] overflow-y-auto custom-scrollbar text-left text-xs">
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

        {/* Segmented Royal / Classics Capsule Switcher (1:1 Zareqia Screenshot) */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex items-center p-1 rounded-full bg-neutral-200/60 shadow-xs border border-neutral-300/40">
            <button
              type="button"
              onClick={() => setActiveTab('royal')}
              className={'flex items-center space-x-1.5 px-6 md:px-8 py-2 rounded-full text-xs md:text-sm font-medium transition-all cursor-pointer ' + (activeTab === 'royal' ? 'bg-[#E5A83B] text-neutral-950 font-bold shadow-sm' : 'text-neutral-700 hover:text-neutral-900')}
            >
              <Crown className="w-3.5 h-3.5" />
              <span>Zareqia Royal</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('classic')}
              className={'px-6 md:px-8 py-2 rounded-full text-xs md:text-sm font-medium transition-all cursor-pointer ' + (activeTab === 'classic' ? 'bg-white text-neutral-900 font-bold shadow-md' : 'text-neutral-700 hover:text-neutral-900')}
            >
              <span>Zareqia Classics</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 1. ROYAL TEMPLATES TAB (8 4K Cinematic Video Gate Suites - media_1789305808153.png) */}
        {/* ========================================================================= */}
        {activeTab === 'royal' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4.5 max-w-[1400px] mx-auto">
            {royalTemplates.map((template) => (
              <div
                key={template.id}
                className="group rounded-xl overflow-hidden border border-neutral-800 bg-[#16120E] text-white shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between relative"
              >
                {/* Visual Video Poster */}
                <div className="relative h-64 sm:h-72 overflow-hidden bg-neutral-950">
                  {template.tag && (
                    <span className={'absolute top-2.5 left-2.5 z-20 px-2 py-0.5 rounded-sm text-[10px] uppercase tracking-wider ' + template.tagColor}>
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30" />

                  {/* View Demo Button Pill */}
                  <Link
                    to={'/invite/demo?template=' + template.id + '&type=' + selectedType}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-x-0 bottom-3 z-20 flex items-center justify-center"
                  >
                    <span className="inline-flex items-center rounded-full bg-black/70 hover:bg-black/90 backdrop-blur-md px-3.5 py-1 text-[11px] font-medium text-white border border-white/20 shadow-md transition-transform active:scale-95">
                      <Eye className="w-3.5 h-3.5 mr-1 text-amber-300" />
                      View Demo
                    </span>
                  </Link>
                </div>

                {/* Card Bottom: Title, Description & CTA Button */}
                <div className="p-3.5 space-y-2.5 flex-1 flex flex-col justify-between bg-[#16120E]">
                  <div className="space-y-1">
                    <h3 className="font-serif text-sm font-bold text-white tracking-wide">
                      {template.name}
                    </h3>
                    <p className="text-[11px] text-neutral-300 leading-snug line-clamp-2">
                      {template.desc}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleSelectDesign(template.id)}
                    className="w-full py-2 rounded-md bg-[#14100C] hover:bg-[#201810] border border-[#C59B27] text-[#E5A83B] font-serif font-bold text-[11px] uppercase tracking-wider shadow-xs transition-all cursor-pointer"
                  >
                    USE THIS DESIGN
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ========================================================================= */}
        {/* 2. CLASSICS TEMPLATES TAB (5 3D Door Gate Suites - media_1789305807997.png) */}
        {/* ========================================================================= */}
        {activeTab === 'classic' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4.5 max-w-[1400px] mx-auto">
            {classicTemplates.map((template) => (
              <div
                key={template.id}
                className="group rounded-xl overflow-hidden border border-neutral-200 bg-white shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between"
              >
                {/* Visual 3D Door Card Header */}
                <div className={'relative h-52 sm:h-56 ' + template.previewBg + ' p-3 flex flex-col justify-between items-center text-center overflow-hidden'}>
                  {template.tag && (
                    <span className={'absolute top-2.5 left-2.5 z-20 px-2 py-0.5 rounded-sm text-[10px] uppercase tracking-wider ' + template.tagColor}>
                      {template.tag}
                    </span>
                  )}

                  {/* Centered Name inside preview box */}
                  <h4 className={'font-serif text-lg font-bold tracking-wide my-auto text-center ' + template.accentText + ' drop-shadow-sm'}>
                    {template.name}
                  </h4>

                  {/* View Demo Button Pill */}
                  <Link
                    to={'/invite/demo?template=' + template.id + '&type=' + selectedType}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center z-10"
                  >
                    <span className="inline-flex items-center rounded-full bg-black/60 hover:bg-black/85 backdrop-blur-md px-3.5 py-1 text-[11px] font-medium text-white border border-white/20 shadow-md transition-transform active:scale-95">
                      <Eye className="w-3.5 h-3.5 mr-1" />
                      View Demo
                    </span>
                  </Link>
                </div>

                {/* Card Bottom: Title, Description & Solid Gold CTA Button */}
                <div className="p-3.5 space-y-2.5 flex-1 flex flex-col justify-between bg-white border-t border-neutral-100">
                  <div className="space-y-1">
                    <h3 className="font-serif text-sm font-bold text-neutral-900">
                      {template.name}
                    </h3>
                    <p className="text-[11px] text-neutral-500 leading-snug line-clamp-2">
                      {template.desc}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleSelectDesign(template.id)}
                    className="w-full py-2 rounded-md bg-[#b8860b] hover:bg-[#9a7009] text-white font-serif font-bold text-[11px] uppercase tracking-wider shadow-xs transition-colors cursor-pointer"
                  >
                    Use This Design
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Exact 1:1 Zareqia Footer */}
      <footer className="w-full border-t border-neutral-200/80 bg-[#FAF8F5] py-12 px-6 text-center space-y-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <Link to="/" className="font-serif text-xl font-bold tracking-wide text-[#C59B27] inline-block">
            Zareqia
          </Link>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-neutral-600">
            <Link to="/about" className="hover:text-neutral-900 transition-colors">About</Link>
            <Link to="/contact" className="hover:text-neutral-900 transition-colors">Contact</Link>
            <Link to="/terms" className="hover:text-neutral-900 transition-colors">Terms & Conditions</Link>
            <Link to="/privacy-policy" className="hover:text-neutral-900 transition-colors">Privacy Policy</Link>
            <Link to="/refund-policy" className="hover:text-neutral-900 transition-colors">Refund Policy</Link>
            <Link to="/shipping-policy" className="hover:text-neutral-900 transition-colors">Shipping & Delivery</Link>
            <Link to="/affiliate" className="hover:text-neutral-900 transition-colors">Become an Affiliate</Link>
          </div>

          <div className="flex items-center justify-center space-x-4 text-neutral-500">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-900 transition-colors">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="mailto:support@zareqia.com" className="hover:text-neutral-900 transition-colors">
              <Mail className="w-4 h-4" />
            </a>
          </div>

          <div className="space-y-1 text-[11px] text-neutral-400">
            <p>© 2026 Zareqia. Crafted with love</p>
            <p>Digital invitation service • No physical products shipped</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TemplateMarketplace;
