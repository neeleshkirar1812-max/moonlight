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

// Exact 10 Royal 4K Video Gate Templates
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
  {
    id: 'emerald-noir-royal',
    name: 'Royal Emerald Noir',
    desc: '4K emerald green palace video gates with ornate gold inlay and royal symphony',
    video: '/videos/royal-legacy.mp4',
    videoFilter: 'hue-rotate(90deg) saturate(1.4) contrast(1.15) brightness(0.95)',
    tag: 'New',
    tagColor: 'bg-[#E5A83B] text-neutral-950 font-bold',
  },
  {
    id: 'ivory-elegance-royal',
    name: 'Royal Ivory & Velvet Noir',
    desc: '4K obsidian and champagne gold antique palace video arch with grand orchestral romance',
    video: '/videos/rose-gold-blush.mp4',
    videoFilter: 'sepia(0.6) contrast(1.3) brightness(0.85) saturate(0.8)',
    tag: 'New',
    tagColor: 'bg-[#E5A83B] text-neutral-950 font-bold',
  },
];

// Exact 5 Classic 3D Gate Templates
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
        title="Browse All Wedding & Event Invitation Templates - Zareqia Replica"
        description="Select from our Royal 4K Video Gates and Classic 3D Gate Suites."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 w-full flex-1">
        {/* Header Titles */}
        <div className="text-center space-y-2 mb-8">
          <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-amber-700 font-bold block">
            THE DIGITAL SUITE COLLECTION
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-neutral-900 tracking-tight">
            Choose Your Design
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 max-w-xl mx-auto font-sans">
            Select a theme to preview the opening door animations, interactive scratch card, maps, and live RSVP.
          </p>
        </div>

        {/* Category Dropdown Pill */}
        <div className="flex justify-center mb-8 relative z-30">
          <div className="relative inline-block text-left">
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="inline-flex items-center justify-between w-64 sm:w-72 px-4 py-2.5 rounded-full border border-neutral-300 bg-white text-xs sm:text-sm font-medium text-neutral-800 shadow-xs hover:border-amber-500 transition-colors cursor-pointer"
            >
              <span>{invitationTypes.find((t) => t.id === selectedType)?.label || 'Wedding Invitation'}</span>
              <ChevronDown className="w-4 h-4 text-neutral-500 ml-2" />
            </button>

            {dropdownOpen && (
              <div className="absolute left-0 right-0 mt-1.5 rounded-2xl bg-white border border-neutral-200 shadow-xl py-1 z-40 max-h-64 overflow-y-auto">
                {invitationTypes.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => {
                      setSelectedType(type.id);
                      setDropdownOpen(false);
                    }}
                    className={'w-full text-left px-4 py-2 text-xs transition-colors cursor-pointer ' +
                      (selectedType === type.id
                        ? 'bg-amber-50 text-amber-900 font-bold'
                        : 'text-neutral-700 hover:bg-neutral-50')}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Collection Tab Switcher */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1 rounded-full bg-[#EFEAE2] border border-[#E2DBD0]">
            <button
              type="button"
              onClick={() => setActiveTab('royal')}
              className={'px-6 sm:px-8 py-2 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer ' +
                (activeTab === 'royal'
                  ? 'bg-[#1C1814] text-white shadow-md font-bold'
                  : 'text-neutral-700 hover:text-neutral-900')}
            >
              👑 Royal Collection
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('classic')}
              className={'px-6 sm:px-8 py-2 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer ' +
                (activeTab === 'classic'
                  ? 'bg-white text-neutral-900 shadow-md font-bold'
                  : 'text-neutral-700 hover:text-neutral-900')}
            >
              Classic Collection
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 1. ROYAL COLLECTION TAB (10 Royal Video Gate Cards) */}
        {/* ========================================================================= */}
        {activeTab === 'royal' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {royalTemplates.map((template) => (
              <div
                key={template.id}
                className="group rounded-2xl overflow-hidden border border-neutral-200/80 bg-[#16120F] text-white shadow-md hover:shadow-xl hover:scale-[1.01] transition-all duration-300 flex flex-col justify-between"
              >
                {/* Video Area */}
                <div className="relative h-44 sm:h-48 overflow-hidden bg-neutral-950">
                  {template.tag && (
                    <span className={'absolute top-2.5 left-2.5 z-20 px-2.5 py-0.5 rounded text-[10px] tracking-wide ' + template.tagColor}>
                      {template.tag}
                    </span>
                  )}

                  <video
                    src={template.video}
                    style={{ filter: template.videoFilter || 'none' }}
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
                    className="absolute inset-x-0 bottom-3 z-20 flex items-center justify-center"
                  >
                    <span className="inline-flex items-center rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-md px-3.5 py-1 text-[11px] font-medium text-white border border-white/20 shadow-md transition-transform active:scale-95">
                      <Eye className="w-3.5 h-3.5 mr-1.5 text-[#E5A83B]" />
                      View Demo
                    </span>
                  </Link>
                </div>

                {/* Card Body */}
                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <h3 className="font-serif text-base font-bold text-white tracking-wide">
                      {template.name}
                    </h3>
                    <p className="text-[11px] text-neutral-400 leading-relaxed line-clamp-2">
                      {template.desc}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleSelectDesign(template.id)}
                    className="w-full py-2.5 rounded-lg border border-neutral-700 hover:border-amber-400/80 bg-neutral-900 hover:bg-neutral-800 text-white font-sans text-xs tracking-wider uppercase font-semibold transition-all cursor-pointer"
                  >
                    USE THIS DESIGN
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ========================================================================= */}
        {/* 2. CLASSIC COLLECTION TAB (5 Classic 3D Gate Cards) */}
        {/* ========================================================================= */}
        {activeTab === 'classic' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {classicTemplates.map((template) => (
              <div
                key={template.id}
                className="group rounded-2xl overflow-hidden border border-[#E8DFD1] bg-white shadow-sm hover:shadow-xl hover:scale-[1.01] transition-all duration-300 flex flex-col justify-between"
              >
                {/* Visual Card Header */}
                <div className={'relative h-44 sm:h-48 ' + template.previewBg + ' p-4 flex flex-col justify-between items-center text-center overflow-hidden'}>
                  {template.tag && (
                    <span className={'absolute top-2.5 left-2.5 z-20 px-2 py-0.5 rounded text-[10px] tracking-wide ' + template.tagColor}>
                      {template.tag}
                    </span>
                  )}

                  {/* 3D Door Preview Simulation */}
                  <div className="my-auto px-2 flex flex-col items-center space-y-1.5 z-10">
                    <h4 className={'font-serif text-xl font-bold tracking-wide ' + template.accentText + ' drop-shadow-sm'}>
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
                    <span className="inline-flex items-center rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-md px-3.5 py-1 text-[11px] font-medium text-white border border-white/20 shadow-md transition-transform active:scale-95">
                      <Eye className="w-3.5 h-3.5 mr-1.5 text-amber-300" />
                      View Demo
                    </span>
                  </Link>
                </div>

                {/* Card Body */}
                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <h3 className="font-serif text-sm font-bold text-neutral-900">
                      {template.name}
                    </h3>
                    <p className="text-[11px] text-neutral-500 leading-relaxed line-clamp-2">
                      {template.desc}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleSelectDesign(template.id)}
                    className="w-full py-2.5 rounded-lg bg-[#E5A83B] hover:bg-[#d4962a] text-neutral-950 font-sans text-xs tracking-wider uppercase font-bold transition-all cursor-pointer shadow-xs"
                  >
                    USE THIS DESIGN
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Minimal Notice */}
      <footer className="border-t border-neutral-200 bg-[#FAF8F5] py-8 text-center text-xs text-neutral-500 space-y-2">
        <p>© 2026 Moonlight Production · Digital Invitation Suites. All Rights Reserved.</p>
        <div className="flex justify-center space-x-4 pt-1 text-neutral-600">
          <Link to="/contact" className="hover:text-amber-700">Need Help?</Link>
          <span>·</span>
          <Link to="/faq" className="hover:text-amber-700">FAQ</Link>
          <span>·</span>
          <Link to="/terms" className="hover:text-amber-700">Terms of Service</Link>
        </div>
      </footer>
    </div>
  );
};

export default TemplateMarketplace;
