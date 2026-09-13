import React, { useState, useMemo } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import SEO from '../../components/common/SEO';
import {
  Crown,
  Eye,
  ChevronDown,
  Instagram,
  Mail,
  Sparkles,
} from 'lucide-react';

const invitationTypes = [
  { id: 'all', label: 'All Categories' },
  { id: 'wedding', label: 'Wedding Invitation' },
  { id: 'engagement', label: 'Engagement Invitation' },
  { id: 'wedding-reception', label: 'Wedding & Reception Invitation' },
  { id: 'reception', label: 'Reception only invitation' },
  { id: 'birthday', label: 'Birthday Invitation' },
  { id: 'housewarming', label: 'Housewarming / Griha Pravesh' },
  { id: 'baby-shower', label: 'Baby shower / Naming Ceremony' },
  { id: 'anniversary', label: 'Anniversary Invitation' },
  { id: 'party', label: 'Party & Celebration Invitations' },
  { id: 'opening-ceremony', label: 'Opening Ceremony Invitation' },
  { id: 'custom', label: 'Custom invitation' },
];

const royalTemplates = [
  {
    id: 'rose-gold-blush-royal',
    name: 'Royal Imperial',
    category: 'wedding',
    desc: 'Cinematic rose-gold opening with luxurious motion storytelling, warm gold & champagne tones.',
    video: '/videos/rose-gold-blush.mp4',
    tag: 'Cinematic 👑',
    tagColor: 'bg-amber-500 text-neutral-950 font-bold',
  },
  {
    id: 'royal-majesty',
    name: 'Royal Majesty',
    category: 'wedding',
    desc: 'Porcelain blue ballroom romance with painterly cinematic grandeur & shimmering crystal portals.',
    video: '/videos/royal-majesty.mp4',
    tag: 'Trending ✨',
    tagColor: 'bg-sky-500 text-white font-bold',
  },
  {
    id: 'royal-elegance-royal',
    name: 'Royal Elegance',
    category: 'wedding',
    desc: 'Velvet cream and crimson cinematic experience with palace motifs & deep royal grandeur.',
    video: '/videos/royal-elegance-royal.mp4',
    tag: 'Grand Royale 🏰',
    tagColor: 'bg-red-700 text-white font-bold',
  },
  {
    id: 'royal-prestige',
    name: 'Royal Prestige',
    category: 'wedding',
    desc: 'Prestigious cinematic opening with refined elegance, blush pink velvet & golden foil embellishments.',
    video: '/videos/royal-prestige.mp4',
    tag: 'Luxe Romance ✦',
    tagColor: 'bg-pink-600 text-white font-bold',
  },
  {
    id: 'royal-heritage',
    name: 'Royal Heritage',
    category: 'wedding',
    desc: 'Timeless cinematic opening with regal heritage storytelling, sky blue & platinum palace grandeur.',
    video: '/videos/royal-heritage.mp4',
    tag: 'Dynasty 🏛️',
    tagColor: 'bg-blue-700 text-white font-bold',
  },
  {
    id: 'royal-grace',
    name: 'Royal Grace',
    category: 'wedding',
    desc: 'Sage garden serenity with pearl drapes, emerald motifs & graceful cinematic botanical reveal.',
    video: '/videos/royal-grace.mp4',
    tag: 'Botanical 🌿',
    tagColor: 'bg-emerald-600 text-white font-bold',
  },
  {
    id: 'royal-crest',
    name: 'Royal Crest',
    category: 'wedding',
    desc: 'Warm ivory florals, antique burgundy wax seal, and lakeside cinematic romance.',
    video: '/videos/royal-crest.mp4',
    tag: 'Wax Seal 🍷',
    tagColor: 'bg-rose-800 text-white font-bold',
  },
  {
    id: 'royal-legacy',
    name: 'Royal Legacy',
    category: 'wedding',
    desc: 'Burgundy velvet curtains, antique gold ornament, and a timeless Rajputana cinematic reveal.',
    video: '/videos/royal-legacy.mp4',
    tag: 'Rajputana 👑',
    tagColor: 'bg-amber-700 text-white font-bold',
  },
];

const classicTemplates = [
  {
    id: 'emerald-noir',
    name: 'Emerald Noir',
    category: 'wedding',
    desc: 'Deep green and gold with ornate corner accents and luxury door opening.',
    bgStyle: 'bg-gradient-to-br from-[#0c2f1d] via-[#13492e] to-[#0a2316]',
    textColor: 'text-amber-300',
    tag: 'Limited Edition',
    tagColor: 'bg-amber-500 text-neutral-950 font-bold',
  },
  {
    id: 'ivory-elegance',
    name: 'Crimson Royale',
    category: 'wedding',
    desc: 'Dark charcoal base with gold and deep red accents, luxury card reveal.',
    bgStyle: 'bg-gradient-to-br from-[#1c1415] via-[#3d181b] to-[#170e10]',
    textColor: 'text-amber-400',
    tag: 'Most Liked',
    tagColor: 'bg-rose-500 text-white font-bold',
  },
  {
    id: 'rose-gold-blush',
    name: 'Rose Gold Blush',
    category: 'engagement',
    desc: 'Blush pink and rose gold with ornate floral door animation.',
    bgStyle: 'bg-gradient-to-br from-[#fde7ed] via-[#f8c9d4] to-[#fde7ed]',
    textColor: 'text-rose-700',
    tag: 'Romantic',
    tagColor: 'bg-pink-500 text-white font-bold',
  },
  {
    id: 'modern-minimal',
    name: 'Modern Minimal',
    category: 'wedding',
    desc: 'Deep navy and gold with geometric patterns and book-style opening.',
    bgStyle: 'bg-gradient-to-br from-[#111928] via-[#1f2a3f] to-[#0c121e]',
    textColor: 'text-amber-400',
    tag: 'Minimal Luxe',
    tagColor: 'bg-amber-600 text-white font-bold',
  },
  {
    id: 'royal-elegance',
    name: 'Majestic Love',
    category: 'wedding',
    desc: 'Classic ivory and gold with palace motifs and velvet curtain reveal.',
    bgStyle: 'bg-gradient-to-br from-[#fdf6e9] via-[#faebd1] to-[#fdf6e9]',
    textColor: 'text-amber-800',
    tag: 'Palace Classic',
    tagColor: 'bg-amber-600 text-white font-bold',
  },
  {
    id: 'little-sunshine',
    name: 'Prince & Princess Birthday',
    category: 'birthday',
    desc: 'Fairy castle gates opening with confetti, crown seal, and joyful music.',
    bgStyle: 'bg-gradient-to-br from-[#1e1b4b] via-[#312e81] to-[#1e1b4b]',
    textColor: 'text-amber-300',
    tag: 'Birthday 🎂',
    tagColor: 'bg-amber-400 text-neutral-950 font-bold',
  },
  {
    id: 'sweet-nesting-baby',
    name: 'Sweet Cradle Baby Shower',
    category: 'baby-shower',
    desc: 'Golden-lit cloud wings parting gently with lavender tones and lullaby melody.',
    bgStyle: 'bg-gradient-to-br from-[#2e1065] via-[#3b0764] to-[#2e1065]',
    textColor: 'text-purple-200',
    tag: 'Baby Shower 👶',
    tagColor: 'bg-purple-600 text-white font-bold',
  },
  {
    id: 'silver-anniversary',
    name: 'Silver Jubilee Milestone',
    category: 'anniversary',
    desc: 'Faceted crystal glass gates opening with laurel wreath crest and toast chime.',
    bgStyle: 'bg-gradient-to-br from-[#18181b] via-[#27272a] to-[#18181b]',
    textColor: 'text-slate-200',
    tag: 'Milestone 🥂',
    tagColor: 'bg-zinc-600 text-white font-bold',
  },
  {
    id: 'terracotta-boho',
    name: 'Bohemian Griha Pravesh',
    category: 'housewarming',
    desc: 'Artisanal textured linen flaps with terracotta stamp and warm acoustic strings.',
    bgStyle: 'bg-gradient-to-br from-[#451a03] via-[#78350f] to-[#451a03]',
    textColor: 'text-amber-200',
    tag: 'Housewarming 🏡',
    tagColor: 'bg-amber-700 text-white font-bold',
  },
  {
    id: 'mehendi-magic',
    name: 'Marigold Henna Utsav',
    category: 'party',
    desc: 'Rotating henna mandala blooming outward with marigold yellow and folk beats.',
    bgStyle: 'bg-gradient-to-br from-[#451a03] via-[#713f12] to-[#451a03]',
    textColor: 'text-yellow-300',
    tag: 'Henna 🌼',
    tagColor: 'bg-yellow-600 text-white font-bold',
  },
  {
    id: 'celestial-night',
    name: 'Celestial Galaxy Night',
    category: 'party',
    desc: 'Constellation sphere splitting into glowing stardust nebulae and cosmic crystal chime.',
    bgStyle: 'bg-gradient-to-br from-[#030712] via-[#0f172a] to-[#030712]',
    textColor: 'text-cyan-300',
    tag: 'Party ✨',
    tagColor: 'bg-cyan-600 text-white font-bold',
  },
  {
    id: 'coastal-breeze',
    name: 'Goa Coastal Beachfront',
    category: 'wedding',
    desc: 'Louvered beach pavilion shutters with ocean breeze view and tropical harp music.',
    bgStyle: 'bg-gradient-to-br from-[#083344] via-[#164e63] to-[#083344]',
    textColor: 'text-cyan-200',
    tag: 'Beach Wedding 🏖️',
    tagColor: 'bg-cyan-700 text-white font-bold',
  },
];

const TemplateMarketplace = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [activeTab, setActiveTab] = useState(
    searchParams.get('collection') === 'classic' ? 'classic' : 'royal'
  );
  const [selectedType, setSelectedType] = useState(
    searchParams.get('type') || 'wedding'
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Filter templates based on selected category
  const filteredRoyal = useMemo(() => {
    if (selectedType === 'all' || selectedType === 'wedding' || selectedType === 'wedding-reception') {
      return royalTemplates;
    }
    const matches = royalTemplates.filter((t) => t.category === selectedType);
    return matches.length > 0 ? matches : royalTemplates;
  }, [selectedType]);

  const filteredClassic = useMemo(() => {
    if (selectedType === 'all') return classicTemplates;
    if (selectedType === 'wedding' || selectedType === 'wedding-reception') {
      return classicTemplates.filter((t) => ['wedding', 'engagement'].includes(t.category));
    }
    const matches = classicTemplates.filter((t) => t.category === selectedType);
    return matches.length > 0 ? matches : classicTemplates;
  }, [selectedType]);

  const handleSelectDesign = (templateId) => {
    navigate('/create/' + templateId + '?type=' + selectedType);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-neutral-900 font-sans flex flex-col justify-between selection:bg-amber-200 selection:text-amber-900">
      <SEO
        title="Invitation Templates | 20+ Premium Designs - Zareqia"
        description="Browse 20+ premium animated digital invitation templates for weddings, birthdays, baby showers, and parties across Zareqia Royal & Classic collections."
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
              className="w-[280px] md:w-[340px] h-11 px-4 rounded-xl border border-neutral-300 bg-white/95 text-sm font-medium text-neutral-800 shadow-sm flex items-center justify-between hover:border-amber-500 transition-all cursor-pointer"
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

        {/* Segmented Royal / Classics Toggle (1:1 Zareqia) */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex items-center p-1 rounded-full border border-neutral-300/80 bg-white shadow-md">
            <button
              type="button"
              onClick={() => setActiveTab('royal')}
              className={'flex items-center space-x-1.5 px-6 md:px-8 py-2.5 rounded-full text-xs md:text-sm font-bold transition-all cursor-pointer ' + (activeTab === 'royal' ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-950 shadow-md' : 'text-neutral-600 hover:text-neutral-900')}
            >
              <Crown className="w-3.5 h-3.5" />
              <span>Zareqia Royal ({filteredRoyal.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('classic')}
              className={'px-6 md:px-8 py-2.5 rounded-full text-xs md:text-sm font-bold transition-all cursor-pointer ' + (activeTab === 'classic' ? 'bg-neutral-900 text-white shadow-md' : 'text-neutral-600 hover:text-neutral-900')}
            >
              <span>Zareqia Classics ({filteredClassic.length})</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 1. ROYAL TEMPLATES TAB */}
        {/* ========================================================================= */}
        {activeTab === 'royal' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredRoyal.map((template) => (
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
        {/* 2. CLASSICS TEMPLATES TAB */}
        {/* ========================================================================= */}
        {activeTab === 'classic' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredClassic.map((template) => (
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
                    USE THIS DESIGN
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer Minimal Notice */}
      <footer className="border-t border-neutral-200 bg-[#FAF8F5] py-8 text-center text-xs text-neutral-500 space-y-2">
        <p>© 2026 Moonlight Production · Zareqia Digital Suites. All Rights Reserved.</p>
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
