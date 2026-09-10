import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { invitationCategories, invitationTemplates } from '../../data/invitationTemplates';
import SEO from '../../components/common/SEO';
import InvitationRenderer from '../../components/invitations/engine/InvitationRenderer';
import {
  ChevronDown,
  Eye,
  Crown,
  Check,
  X,
  Instagram,
  Mail,
  Sparkles,
  RotateCcw,
} from 'lucide-react';

/**
 * Individual Marketplace Card Component with Inline 3D Gate Demo Simulator
 */
const MarketplaceCard = ({ template, isActiveDemo, onOpenDemo, onCloseDemo }) => {
  const [demoKey, setDemoKey] = useState(0);

  const demoInvitationData = {
    template_id: template.id,
    templateId: template.id,
    opening_screen_enabled: true,
    opening_style: template.features?.gateStyle || 'royal-curtain',
    opening_title: 'The Royal Celebration',
    opening_seal_text: template.tier === 'royal' ? 'ROYAL SEAL' : 'VIP',
    bride_name: template.id === 'modern-minimal' ? 'Ananya Sharma' : 'Aarav Singhania',
    groom_name: template.id === 'modern-minimal' ? 'Rohan Mehra' : 'Kiara Advani',
    names: template.id === 'modern-minimal' ? 'Ananya & Rohan' : 'Aarav & Kiara',
    title: `${template.name} Demo`,
    eventType: template.category,
    date: '2026-11-20',
    time: '19:00',
    venue: template.id === 'modern-minimal' ? 'The Leela Palace, Udaipur' : 'Jehan Numa Palace, Bhopal',
    venueAddress: template.id === 'modern-minimal' ? 'Lake Pichola, Udaipur, Rajasthan' : '152 Shamla Hills, Bhopal',
    story_text: 'Two hearts, one lifelong promise under royal starry skies.',
    scratch_reveal_text: 'YOU’RE INVITED ♡',
    scratch_enabled: true,
    rsvp_enabled: true,
    music_enabled: true,
    events: [
      {
        title: 'Mehendi & Sangeet Gala',
        date: '2026-11-19',
        time: '06:00 PM',
        venue: 'The Leela Palace Courtyard',
        address: 'Udaipur, Rajasthan',
      },
      {
        title: 'The Royal Wedding & Pheras',
        date: '2026-11-20',
        time: '07:30 PM',
        venue: 'Grand Lawn, The Leela Palace',
        address: 'Udaipur, Rajasthan',
      },
      {
        title: 'Royal Grand Reception',
        date: '2026-11-21',
        time: '08:00 PM',
        venue: 'The Royal Ballroom',
        address: 'Udaipur, Rajasthan',
      },
    ],
  };

  return (
    <div
      className={`bg-white rounded-xl border overflow-hidden transition-all duration-300 flex flex-col justify-between group ${
        isActiveDemo
          ? 'border-amber-500 ring-2 ring-amber-400/50 shadow-xl'
          : 'border-[#E5DAC8] hover:border-[#b88c3a] shadow-xs hover:shadow-md'
      }`}
    >
      {/* Visual / Live In-Card Demo Area */}
      {isActiveDemo ? (
        <div className="relative h-80 sm:h-96 w-full bg-neutral-950 flex flex-col overflow-hidden border-b border-amber-500/30">
          {/* Top Demo Bar Controls inside the card */}
          <div className="absolute top-2 inset-x-2 z-60 flex items-center justify-between pointer-events-auto">
            <span className="px-2 py-0.5 rounded-full bg-black/80 backdrop-blur-xs text-amber-300 text-[9px] font-mono font-bold uppercase border border-amber-400/40 shadow-xs flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Live 3D Gate Demo</span>
            </span>

            <div className="flex items-center space-x-1.5">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setDemoKey((k) => k + 1);
                }}
                className="px-2 py-0.5 rounded-full bg-black/80 hover:bg-neutral-800 text-amber-200 text-[10px] font-sans border border-amber-400/40 flex items-center space-x-1 cursor-pointer transition-transform active:scale-95 shadow"
                title="Replay 3D Gate Opening"
              >
                <RotateCcw className="w-3 h-3 text-amber-300" />
                <span>Replay</span>
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onCloseDemo();
                }}
                className="w-6 h-6 rounded-full bg-black/80 hover:bg-rose-900/90 text-white text-[11px] font-bold border border-white/30 flex items-center justify-center cursor-pointer transition-colors shadow"
                title="Close Demo"
                aria-label="Close Demo"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Invitation Renderer embedded inside this specific card */}
          <div className="w-full h-full overflow-y-auto custom-scrollbar relative">
            <InvitationRenderer
              key={demoKey}
              invitation={demoInvitationData}
              isPreview={true}
            />
          </div>
        </div>
      ) : (
        /* Top Visual Poster Box */
        <div
          className={`relative h-48 sm:h-52 ${template.cardBg || 'bg-[#0d3b25]'} p-3.5 flex flex-col justify-between items-center text-center`}
        >
          {/* Top Left Badge */}
          <div className="w-full flex justify-start">
            {template.badge && (
              <span
                className={`text-[9px] font-sans font-bold px-2 py-0.5 rounded shadow-xs ${
                  template.badgeColor || 'bg-amber-500 text-neutral-950'
                }`}
              >
                {template.badge}
              </span>
            )}
          </div>

          {/* Centered Golden Title */}
          <div className="my-auto px-1">
            <h4
              className={`font-serif text-base sm:text-lg tracking-wide ${
                template.cardTextColor || 'text-[#d4af37]'
              }`}
            >
              {template.name}
            </h4>
          </div>

          {/* Center-Bottom Open 3D Demo Button */}
          <button
            type="button"
            onClick={() => onOpenDemo(template.id)}
            className="px-3.5 py-1.5 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-xs text-white text-[11px] font-serif border border-white/20 flex items-center space-x-1.5 transition-transform hover:scale-105 active:scale-95 cursor-pointer shadow-sm"
          >
            <Eye className="w-3.5 h-3.5 text-amber-300" />
            <span>Open 3D Demo</span>
          </button>
        </div>
      )}

      {/* Bottom Content Area */}
      <div className="p-4 space-y-3 flex-1 flex flex-col justify-between bg-white">
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <h5 className="font-serif text-sm font-bold text-neutral-900 leading-tight">
              {template.name}
            </h5>
            <span className="font-serif text-xs font-bold text-[#8a6521]">
              ₹{template.price}
            </span>
          </div>
          <p className="text-[11px] text-neutral-500 leading-snug font-sans line-clamp-2">
            {template.description}
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-2 flex items-center space-x-2">
          {isActiveDemo ? (
            <button
              type="button"
              onClick={onCloseDemo}
              className="w-1/3 py-2 rounded-md border border-neutral-300 hover:bg-neutral-100 text-neutral-700 text-xs font-serif text-center transition-colors cursor-pointer"
            >
              Close
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onOpenDemo(template.id)}
              className="w-1/3 py-2 rounded-md border border-[#E0D5C3] hover:border-[#b88c3a] text-[#8a6521] text-xs font-serif text-center transition-colors cursor-pointer"
            >
              Demo
            </button>
          )}
          <Link
            to={`/invitations/templates/${template.slug}`}
            className="flex-1 py-2 rounded-md bg-[#b88c3a] hover:bg-[#9e752b] text-white font-serif font-semibold text-xs tracking-wide text-center block transition-colors shadow-xs"
          >
            Use Design
          </Link>
        </div>
      </div>
    </div>
  );
};

const TemplateMarketplace = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState('Wedding Invitation');
  const [selectedTier, setSelectedTier] = useState('classic'); // 'classic' | 'royal'
  const [activeDemoId, setActiveDemoId] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Filter templates based on Category and Tier
  const filteredTemplates = invitationTemplates.filter((template) => {
    const matchesCategory =
      selectedCategory === 'All Categories' || template.category === selectedCategory;
    
    const matchesTier =
      selectedTier === 'royal' ? true : template.tier === 'classic' || template.tier === undefined;

    return matchesCategory && matchesTier;
  });

  return (
    <div className="min-h-screen bg-[#F9F7F2] text-neutral-800 font-serif flex flex-col justify-between selection:bg-amber-200 selection:text-amber-900">
      <SEO
        title="Templates | Moonlight Digital Invitations"
        description="Select your digital invitation template with 3D royal doors, scratch cards, Google Maps, and RSVP tracking."
      />

      {/* ========================================================================= */}
      {/* 1. TOP HEADER (Exact match to reference) */}
      {/* ========================================================================= */}
      <header className="border-b border-neutral-200/70 bg-[#F9F7F2]/95 sticky top-0 z-40 backdrop-blur-xs">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link to="/invitations" className="text-2xl sm:text-3xl font-serif tracking-wide text-[#b88c3a] hover:opacity-90 transition-opacity">
            Moonlight
          </Link>

          {/* Right link */}
          <div>
            {isAuthenticated ? (
              <Link
                to="/invitations/dashboard"
                className="text-sm font-serif text-neutral-800 hover:text-[#b88c3a] transition-colors"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                to="/invitations/login"
                className="text-sm font-serif text-neutral-800 hover:text-[#b88c3a] transition-colors"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. MAIN SECTION */}
      {/* ========================================================================= */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-16 w-full">
        
        {/* Admin Bar if Admin is browsing */}
        {(user?.role === 'admin' || user?.role === 'superadmin') && (
          <div className="p-3.5 rounded-2xl bg-amber-900 text-amber-50 flex items-center justify-between shadow-xs mb-8 max-w-2xl mx-auto font-sans">
            <div className="flex items-center space-x-2.5 text-xs">
              <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
              <span>
                <strong>Administrator Access:</strong> Assign any template for ₹0 in Admin Console.
              </span>
            </div>
            <Link
              to="/invitations/admin"
              className="px-3 py-1 rounded-xl bg-white text-amber-950 font-bold text-xs uppercase hover:bg-amber-100 transition-all"
            >
              Admin Portal →
            </Link>
          </div>
        )}

        {/* Invitation Type Selector Header */}
        <div className="text-center space-y-4 max-w-xl mx-auto mb-10 sm:mb-12">
          <span className="text-[11px] uppercase font-serif tracking-[0.25em] text-neutral-500 font-semibold block">
            INVITATION TYPE
          </span>

          {/* Dropdown Capsule Button */}
          <div className="relative inline-block text-left">
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="inline-flex items-center justify-between w-72 sm:w-84 px-6 py-3 bg-white border border-[#E3D9CA] rounded-full shadow-xs text-sm font-serif text-neutral-800 hover:border-[#b88c3a] focus:outline-none transition-all cursor-pointer"
            >
              <span>{selectedCategory}</span>
              <ChevronDown
                className={`w-4 h-4 text-neutral-500 transition-transform duration-200 ${
                  dropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-72 sm:w-84 rounded-2xl bg-white border border-[#E3D9CA] shadow-xl py-2 z-50 animate-fade-in font-serif text-sm">
                {invitationCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setDropdownOpen(false);
                    }}
                    className={`w-full text-left px-5 py-2.5 hover:bg-amber-50/80 transition-colors flex items-center justify-between ${
                      selectedCategory === cat ? 'text-[#b88c3a] font-bold bg-amber-50/60' : 'text-neutral-800'
                    }`}
                  >
                    <span>{cat}</span>
                    {selectedCategory === cat && <Check className="w-4 h-4 text-[#b88c3a]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          <p className="text-xs text-neutral-500 italic font-serif">
            Royal plan includes both royal + classic templates.
          </p>

          {/* Segmented Pill Selector (Moonlight Classics vs Moonlight Royal) */}
          <div className="pt-2 flex justify-center">
            <div className="inline-flex items-center p-1.5 rounded-full bg-[#EBE4D8] border border-[#E0D5C3] shadow-inner">
              <button
                onClick={() => setSelectedTier('classic')}
                className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-serif transition-all cursor-pointer ${
                  selectedTier === 'classic'
                    ? 'bg-white text-neutral-900 shadow-sm font-semibold'
                    : 'text-neutral-600 hover:text-neutral-950 font-normal'
                }`}
              >
                Moonlight Classics
              </button>
              <button
                onClick={() => setSelectedTier('royal')}
                className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-serif transition-all flex items-center space-x-1.5 cursor-pointer ${
                  selectedTier === 'royal'
                    ? 'bg-white text-neutral-900 shadow-sm font-semibold'
                    : 'text-neutral-600 hover:text-neutral-950 font-normal'
                }`}
              >
                <Crown className="w-3.5 h-3.5 text-neutral-700" />
                <span>Moonlight Royal</span>
              </button>
            </div>
          </div>
        </div>

        {/* Quick Category Filter Pills */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar max-w-5xl mx-auto">
          {invitationCategories.map((cat) => {
            const count =
              cat === 'All Categories'
                ? invitationTemplates.filter((t) =>
                    selectedTier === 'royal' ? true : t.tier === 'classic' || t.tier === undefined
                  ).length
                : invitationTemplates.filter(
                    (t) =>
                      t.category === cat &&
                      (selectedTier === 'royal' ? true : t.tier === 'classic' || t.tier === undefined)
                  ).length;

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-serif whitespace-nowrap transition-all flex items-center space-x-1.5 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#b88c3a] text-white font-semibold shadow-xs'
                    : 'bg-white border border-[#E0D5C3] text-neutral-700 hover:border-[#b88c3a] hover:text-neutral-950'
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    selectedCategory === cat
                      ? 'bg-black/20 text-white'
                      : 'bg-neutral-100 text-neutral-600'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* 3. TEMPLATE CARDS (CATEGORY-WISE DISPLAY) */}
        {/* ========================================================================= */}
        {filteredTemplates.length === 0 ? (
          <div className="text-center py-16 space-y-3 bg-white rounded-3xl border border-[#E2D8C7] max-w-lg mx-auto p-8 shadow-xs">
            <h3 className="font-serif text-lg font-bold text-neutral-900">No templates found in this category</h3>
            <p className="text-xs text-neutral-500 font-serif">
              Try switching the invitation type or tier above.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All Categories');
                setSelectedTier('royal');
              }}
              className="px-5 py-2 rounded-full bg-[#b88c3a] text-white text-xs font-serif hover:bg-[#9e752b] transition-all cursor-pointer"
            >
              Show All Templates
            </button>
          </div>
        ) : selectedCategory === 'All Categories' ? (
          /* Grouped Category-Wise Sections */
          <div className="space-y-14">
            {invitationCategories
              .filter((cat) => cat !== 'All Categories')
              .map((categoryName) => {
                const categoryTemplates = invitationTemplates.filter(
                  (t) =>
                    t.category === categoryName &&
                    (selectedTier === 'royal' ? true : t.tier === 'classic' || t.tier === undefined)
                );

                if (categoryTemplates.length === 0) return null;

                const getCategoryMeta = (cat) => {
                  if (cat.includes('Wedding')) return { icon: '👑', desc: 'Opulent 3D Palace Gates, Shehnai & 24K Gold Suites' };
                  if (cat.includes('Engagement')) return { icon: '💍', desc: 'Romantic Rose Gold, Velvet & Ring Ceremony Suites' };
                  if (cat.includes('Birthday')) return { icon: '🎂', desc: 'Confetti Animations, Cake Smash & Milestone Galleries' };
                  if (cat.includes('Housewarming') || cat.includes('Griha')) return { icon: '🏡', desc: 'Sacred Toran Doors, Vastu Havan & Google Maps' };
                  if (cat.includes('Baby Shower') || cat.includes('Naming')) return { icon: '🍼', desc: 'Pastel Blossoms, Godh Bharai & Family Blessings' };
                  if (cat.includes('Anniversary')) return { icon: '✨', desc: 'Silver & Swarna Golden Jubilee Milestones' };
                  return { icon: '✦', desc: 'Luxury Digital Invitation Cards' };
                };

                const meta = getCategoryMeta(categoryName);

                return (
                  <section key={categoryName} className="space-y-5">
                    {/* Category Header Banner */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#E3D9CA] pb-3 gap-2">
                      <div className="flex items-center space-x-2.5">
                        <span className="text-xl">{meta.icon}</span>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="font-serif text-lg sm:text-xl font-bold text-neutral-900">
                              {categoryName}
                            </h3>
                            <span className="px-2 py-0.5 rounded-full bg-amber-100 text-[#8a6521] text-[10px] font-mono font-bold border border-amber-300">
                              {categoryTemplates.length} Designs
                            </span>
                          </div>
                          <p className="text-xs text-neutral-500 font-serif">{meta.desc}</p>
                        </div>
                      </div>

                      <button
                        onClick={() => setSelectedCategory(categoryName)}
                        className="text-xs font-serif text-[#b88c3a] hover:text-[#8a6521] font-semibold flex items-center space-x-1 cursor-pointer"
                      >
                        <span>Filter only {categoryName}</span>
                        <span>→</span>
                      </button>
                    </div>

                    {/* 5-Column Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
                      {categoryTemplates.map((template) => (
                        <MarketplaceCard
                          key={template.id}
                          template={template}
                          isActiveDemo={activeDemoId === template.id}
                          onOpenDemo={(id) => setActiveDemoId(id)}
                          onCloseDemo={() => setActiveDemoId(null)}
                        />
                      ))}
                    </div>
                  </section>
                );
              })}
          </div>
        ) : (
          /* Single Category Filtered View */
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-[#E3D9CA] pb-3">
              <div className="flex items-center space-x-2">
                <h3 className="font-serif text-lg sm:text-xl font-bold text-neutral-900">
                  {selectedCategory}
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-amber-100 text-[#8a6521] text-[10px] font-mono font-bold border border-amber-300">
                  {filteredTemplates.length} Designs
                </span>
              </div>
              <button
                onClick={() => setSelectedCategory('All Categories')}
                className="text-xs font-serif text-[#b88c3a] hover:text-[#8a6521] font-semibold cursor-pointer"
              >
                ← View All Categories
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
              {filteredTemplates.map((template) => (
                <MarketplaceCard
                  key={template.id}
                  template={template}
                  isActiveDemo={activeDemoId === template.id}
                  onOpenDemo={(id) => setActiveDemoId(id)}
                  onCloseDemo={() => setActiveDemoId(null)}
                />
              ))}
            </div>
          </div>
        )}
      </main>

      {/* ========================================================================= */}
      {/* 4. FOOTER (Exact match to reference) */}
      {/* ========================================================================= */}
      <footer className="border-t border-neutral-200/80 bg-[#F9F7F2] py-12 text-center text-xs text-neutral-600 font-serif space-y-4">
        {/* Brand Name */}
        <div className="text-xl font-serif text-[#b88c3a] font-normal">
          Moonlight
        </div>

        {/* Footer Navigation Links */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[12.5px] text-neutral-600">
          <Link to="/invitations" className="hover:text-neutral-900">About</Link>
          <a href="https://api.whatsapp.com/send?phone=919229229323" target="_blank" rel="noreferrer" className="hover:text-neutral-900">Contact</a>
          <Link to="/terms" className="hover:text-neutral-900">Terms & Conditions</Link>
          <Link to="/privacy" className="hover:text-neutral-900">Privacy Policy</Link>
          <Link to="/refund" className="hover:text-neutral-900">Refund Policy</Link>
          <Link to="/shipping" className="hover:text-neutral-900">Shipping & Delivery</Link>
          <Link to="/invitations/dashboard" className="hover:text-neutral-900">My Invitations</Link>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center space-x-3 pt-1">
          <a
            href="https://instagram.com/moonlight_production__"
            target="_blank"
            rel="noreferrer"
            className="w-7 h-7 rounded-full border border-neutral-400/80 flex items-center justify-center text-neutral-600 hover:text-neutral-900 hover:border-neutral-900 transition-colors"
            title="Instagram"
          >
            <Instagram className="w-3.5 h-3.5" />
          </a>
          <a
            href="mailto:Tarunrathore3435@gmail.com"
            className="w-7 h-7 rounded-full border border-neutral-400/80 flex items-center justify-center text-neutral-600 hover:text-neutral-900 hover:border-neutral-900 transition-colors"
            title="Email"
          >
            <Mail className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Copyright & Subtext */}
        <div className="space-y-1 pt-1 text-neutral-500 text-[11.5px]">
          <p>© {new Date().getFullYear()} Moonlight. Crafted with love</p>
          <p className="text-[10.5px] text-neutral-400 font-sans">Digital invitation service • No physical products shipped</p>
        </div>
      </footer>
    </div>
  );
};

export default TemplateMarketplace;
