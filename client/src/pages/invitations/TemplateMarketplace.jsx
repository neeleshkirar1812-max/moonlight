import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { invitationCategories, invitationTemplates } from '../../data/invitationTemplates';
import SEO from '../../components/common/SEO';
import InvitationRenderer from '../../components/invitations/engine/InvitationRenderer';
import {
  Sparkles,
  ChevronDown,
  Eye,
  Crown,
  Check,
  X,
  ArrowRight,
  ShieldCheck,
  Plus,
} from 'lucide-react';

const TemplateMarketplace = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState('Wedding Invitation');
  const [selectedTier, setSelectedTier] = useState('classic'); // 'classic' | 'royal'
  const [demoTemplate, setDemoTemplate] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Filter templates based on Category and Tier
  const filteredTemplates = invitationTemplates.filter((template) => {
    const matchesCategory =
      selectedCategory === 'All Categories' || template.category === selectedCategory;
    
    // If royal tier is selected, show royal + classic (as indicated by "Royal plan includes both royal + classic templates.")
    const matchesTier =
      selectedTier === 'royal' ? true : template.tier === 'classic' || template.tier === undefined;

    return matchesCategory && matchesTier;
  });

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-neutral-900 font-sans selection:bg-amber-200 selection:text-amber-900">
      <SEO
        title="Luxury Digital Invitation Templates | Moonlight Production"
        description="Browse luxury digital invitation suites for Weddings, Engagements, Birthdays, and Griha Pravesh with 3D door reveals and live RSVP."
      />

      {/* ========================================================================= */}
      {/* 1. TOP MINIMAL NAVIGATION BAR */}
      {/* ========================================================================= */}
      <nav className="border-b border-amber-900/10 bg-[#FBF9F5]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/invitations" className="flex items-center space-x-2">
            <span className="font-serif text-2xl sm:text-3xl font-bold tracking-wide text-[#b48638] hover:text-[#916724] transition-colors">
              Moonlight
            </span>
          </Link>

          <div className="flex items-center space-x-5">
            {isAuthenticated ? (
              <Link
                to="/invitations/dashboard"
                className="font-serif text-xs sm:text-sm font-semibold text-neutral-800 hover:text-amber-800 transition-colors"
              >
                Dashboard ({user?.name || 'Account'})
              </Link>
            ) : (
              <Link
                to="/invitations/login"
                className="font-serif text-xs sm:text-sm font-semibold text-neutral-800 hover:text-amber-800 transition-colors"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* ========================================================================= */}
      {/* 2. INVITATION TYPE & TIER SELECTOR */}
      {/* ========================================================================= */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-8 text-center space-y-5">
        {/* Admin Bar if Admin is browsing */}
        {(user?.role === 'admin' || user?.role === 'superadmin') && (
          <div className="p-3.5 rounded-2xl bg-amber-900 text-amber-50 flex items-center justify-between shadow-xs mb-4 max-w-2xl mx-auto">
            <div className="flex items-center space-x-2.5 text-xs">
              <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
              <span>
                <strong>Administrator Access:</strong> You can assign templates for ₹0.
              </span>
            </div>
            <Link
              to="/invitations/admin"
              className="px-3 py-1 rounded-xl bg-white text-amber-950 font-bold text-xs uppercase hover:bg-amber-100 transition-all shadow-xs"
            >
              Admin Portal →
            </Link>
          </div>
        )}

        {/* Small Tracked Header */}
        <span className="text-[11px] uppercase font-serif tracking-[0.25em] text-neutral-500 font-semibold block">
          INVITATION TYPE
        </span>

        {/* Dropdown Select Capsule */}
        <div className="relative inline-block text-left">
          <button
            type="button"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="inline-flex items-center justify-between w-72 sm:w-80 px-6 py-3 bg-white border border-[#E2D8C7] rounded-full shadow-xs text-sm font-serif text-neutral-900 hover:border-amber-400 focus:outline-none transition-all"
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
            <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-72 sm:w-80 rounded-2xl bg-white border border-[#E2D8C7] shadow-xl py-2 z-50 animate-fade-in font-serif text-sm">
              {invitationCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setDropdownOpen(false);
                  }}
                  className={`w-full text-left px-5 py-2.5 hover:bg-amber-50 transition-colors flex items-center justify-between ${
                    selectedCategory === cat ? 'text-amber-900 font-bold bg-amber-50/60' : 'text-neutral-800'
                  }`}
                >
                  <span>{cat}</span>
                  {selectedCategory === cat && <Check className="w-4 h-4 text-amber-700" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Subtext info */}
        <p className="text-xs text-neutral-500 italic font-serif">
          Royal plan includes both royal + classic templates.
        </p>

        {/* Segmented Plan / Tier Switcher Pills */}
        <div className="pt-3 flex justify-center">
          <div className="inline-flex items-center p-1.5 rounded-full bg-[#EFE9DD] border border-[#E3D8C8] shadow-inner space-x-1">
            <button
              onClick={() => setSelectedTier('classic')}
              className={`px-6 py-2 rounded-full text-xs sm:text-sm font-serif font-semibold transition-all ${
                selectedTier === 'classic'
                  ? 'bg-white text-neutral-900 shadow-md font-bold'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Moonlight Classics
            </button>
            <button
              onClick={() => setSelectedTier('royal')}
              className={`px-6 py-2 rounded-full text-xs sm:text-sm font-serif font-semibold transition-all flex items-center space-x-1.5 ${
                selectedTier === 'royal'
                  ? 'bg-white text-neutral-900 shadow-md font-bold'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <Crown className="w-3.5 h-3.5 text-amber-700" />
              <span>Moonlight Royal</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. TEMPLATE CARDS GRID */}
      {/* ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {filteredTemplates.length === 0 ? (
          <div className="text-center py-16 space-y-3 bg-white rounded-3xl border border-[#E2D8C7] max-w-lg mx-auto p-8 shadow-xs">
            <Sparkles className="w-8 h-8 text-amber-700 mx-auto" />
            <h3 className="font-serif text-lg font-bold text-neutral-900">No templates found</h3>
            <p className="text-xs text-neutral-500 font-serif">
              Try switching the invitation type or tier above.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All Categories');
                setSelectedTier('royal');
              }}
              className="px-4 py-2 rounded-full bg-amber-100 text-amber-900 text-xs font-bold font-serif hover:bg-amber-200"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {filteredTemplates.map((template) => {
              return (
                <div
                  key={template.id}
                  className="bg-white rounded-2xl border border-[#E5DAC8] overflow-hidden shadow-xs hover:shadow-lg hover:border-amber-400 transition-all duration-300 flex flex-col justify-between group"
                >
                  {/* Top Colored Box Presentation */}
                  <div
                    className={`relative h-48 sm:h-52 ${template.cardBg || 'bg-[#0d3b25]'} p-4 flex flex-col justify-between items-center text-center overflow-hidden transition-all`}
                  >
                    {/* Top Left Badge */}
                    <div className="w-full flex justify-start">
                      {template.badge && (
                        <span
                          className={`text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-xs ${
                            template.badgeColor || 'bg-amber-500 text-neutral-950'
                          }`}
                        >
                          {template.badge}
                        </span>
                      )}
                    </div>

                    {/* Template Center Title */}
                    <div className="my-auto px-2">
                      <h3
                        className={`font-serif text-lg sm:text-xl font-bold tracking-wide ${
                          template.cardTextColor || 'text-[#d4af37]'
                        }`}
                      >
                        {template.name}
                      </h3>
                    </div>

                    {/* Center Bottom: View Demo Button */}
                    <button
                      onClick={() => setDemoTemplate(template)}
                      className="px-4 py-1.5 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur text-white text-xs font-serif font-medium border border-white/20 flex items-center space-x-1.5 shadow-sm transition-all hover:scale-105 active:scale-95"
                    >
                      <Eye className="w-3.5 h-3.5 text-white/90" />
                      <span>View Demo</span>
                    </button>
                  </div>

                  {/* Bottom Info Section */}
                  <div className="p-4 space-y-3 flex-1 flex flex-col justify-between bg-white">
                    <div className="space-y-1.5">
                      <h4 className="font-serif text-sm font-bold text-neutral-900 leading-snug">
                        {template.name}
                      </h4>
                      <p className="text-[11px] text-neutral-600 leading-relaxed font-sans line-clamp-2">
                        {template.description}
                      </p>
                    </div>

                    {/* Price & Select Action */}
                    <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-neutral-400 line-through mr-1 font-mono">
                          ₹{template.originalPrice}
                        </span>
                        <span className="font-serif text-base font-bold text-amber-900">
                          ₹{template.price}
                        </span>
                      </div>

                      <Link
                        to={`/invitations/templates/${template.slug}`}
                        className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-neutral-950 font-bold text-xs font-sans tracking-wide transition-all shadow-xs hover:scale-105"
                      >
                        Select & Edit
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 4. INTERACTIVE LIVE DEMO SIMULATOR MODAL */}
      {/* ========================================================================= */}
      {demoTemplate && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="relative w-full max-w-sm sm:max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] border border-[#E0D7C7]">
            {/* Modal Header */}
            <div className="px-5 py-3.5 bg-[#FAF8F5] border-b border-[#E8DFD1] flex items-center justify-between">
              <div>
                <span className="text-[9px] uppercase font-mono font-bold text-amber-800 tracking-wider">
                  Live Preview Simulator
                </span>
                <h3 className="font-serif text-sm font-bold text-neutral-900">{demoTemplate.name}</h3>
              </div>
              <button
                onClick={() => setDemoTemplate(null)}
                className="p-1.5 rounded-full hover:bg-neutral-200 text-neutral-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body Simulator */}
            <div className="flex-1 overflow-y-auto p-4 bg-neutral-100 flex justify-center items-center">
              <div className="w-[320px] h-[520px] rounded-[36px] border-[6px] border-neutral-900 bg-black shadow-2xl overflow-hidden relative">
                <InvitationRenderer
                  invitation={{
                    template_id: demoTemplate.id,
                    names: 'Aarav & Kiara',
                    title: `${demoTemplate.name} Demo`,
                    eventType: demoTemplate.category,
                    date: '2026-11-20',
                    time: '19:00',
                    venue: 'Jehan Numa Palace, Bhopal',
                    venueAddress: '152 Shamla Hills, Bhopal',
                    story_text: 'Two hearts, one lifelong promise under royal starry skies.',
                    scratch_reveal_text: 'YOU’RE INVITED ♡',
                    scratch_enabled: true,
                    rsvp_enabled: true,
                    music_enabled: true,
                  }}
                  isPreview={true}
                />
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="p-4 bg-white border-t border-[#E8DFD1] flex items-center justify-between gap-3">
              <div>
                <span className="text-[10px] text-neutral-400 line-through font-mono">
                  ₹{demoTemplate.originalPrice}
                </span>
                <span className="font-serif text-lg font-bold text-amber-900 ml-1">
                  ₹{demoTemplate.price}
                </span>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => setDemoTemplate(null)}
                  className="px-4 py-2 rounded-full border border-neutral-300 text-xs font-semibold text-neutral-700 hover:bg-neutral-100"
                >
                  Close
                </button>
                <Link
                  to={`/invitations/templates/${demoTemplate.slug}`}
                  className="px-5 py-2 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-neutral-950 font-bold text-xs shadow-xs"
                >
                  Use This Template
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateMarketplace;
