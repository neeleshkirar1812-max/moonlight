import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { invitationCategories, invitationTemplates } from '../../data/invitationTemplates';
import SEO from '../../components/common/SEO';
import {
  Sparkles,
  Search,
  Filter,
  ArrowRight,
  CheckCircle2,
  Gift,
  Music,
  MapPin,
  Eye,
  SlidersHorizontal,
} from 'lucide-react';

const TemplateMarketplace = () => {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');

  const filteredTemplates = invitationTemplates
    .filter((template) => {
      const matchesCategory =
        selectedCategory === 'All Categories' || template.category === selectedCategory;
      const matchesSearch =
        template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      return 0; // Default order
    });

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-neutral-900 pt-28 pb-20 font-sans">
      <SEO
        title="Luxury Digital Invitation Templates | Moonlight Production"
        description="Browse handcrafted digital invitation suites for Royal Weddings, Engagements, Anniversaries, and Birthdays with interactive scratch cards, Google Maps, and RSVP tracking."
      />

      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 space-y-6">
        {/* Admin Bar if Admin is browsing */}
        {(user?.role === 'admin' || user?.role === 'superadmin') && (
          <div className="p-4 rounded-2xl bg-amber-900 text-amber-50 flex items-center justify-between shadow-md">
            <div className="flex items-center space-x-2.5 text-xs">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>
                <strong>Administrator Access:</strong> You can assign any of these templates for ₹0 in the Control Center.
              </span>
            </div>
            <Link
              to="/invitations/admin/manual"
              className="px-3.5 py-1.5 rounded-xl bg-white text-amber-950 font-bold text-xs uppercase tracking-wider hover:bg-amber-100 transition-all shadow-sm"
            >
              + Create Free Invitation →
            </Link>
          </div>
        )}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-100/80 border border-amber-300 text-amber-900 text-xs uppercase tracking-widest font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>Digital Invitation Marketplace</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-neutral-900 leading-tight">
            Handcrafted Luxury <span className="italic font-normal text-amber-800">Suites</span>
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-sans">
            Choose your signature design. Every template includes instant interactive scratch reveal,
            live RSVP guest collection, Google Maps routing, and background music.
          </p>
        </div>

        {/* Search and Category Filters */}
        <div className="mt-10 bg-white border border-amber-900/10 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
            {/* Search input */}
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search wedding, birthday, royal..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-200 text-xs sm:text-sm focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 font-sans"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
              <SlidersHorizontal className="w-4 h-4 text-neutral-500" />
              <span className="text-xs font-semibold text-neutral-500">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 rounded-xl border border-neutral-200 text-xs font-semibold text-neutral-800 bg-white focus:outline-none focus:border-amber-600"
              >
                <option value="popular">Most Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none pt-2 border-t border-neutral-100">
            {invitationCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-amber-900 text-amber-50 shadow-sm'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-amber-50 hover:text-amber-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Template Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredTemplates.length === 0 ? (
          <div className="bg-white border border-neutral-200 rounded-2xl p-12 text-center max-w-md mx-auto space-y-4">
            <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mx-auto">
              <Filter className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-neutral-900">No Templates Found</h3>
            <p className="text-xs text-neutral-500 font-sans">
              No invitation suites matched "{searchQuery}". Try selecting another category or clear your search query.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All Categories');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl bg-amber-800 text-white text-xs font-bold hover:bg-amber-900 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredTemplates.map((tpl) => (
              <div
                key={tpl.id}
                className="bg-white rounded-2xl border border-amber-900/10 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  {/* Card Cover */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-neutral-950">
                    <img
                      src={tpl.coverImage}
                      alt={tpl.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Category Badge */}
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[10px] uppercase font-bold tracking-widest text-white">
                      {tpl.category}
                    </div>

                    {/* Tag Badge */}
                    {tpl.badge && (
                      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-black font-extrabold text-[10px] tracking-wider uppercase shadow-md">
                        ✦ {tpl.badge}
                      </div>
                    )}

                    {/* Bottom overlay text */}
                    <div className="absolute bottom-3 left-3 right-3 text-white space-y-1">
                      <h3 className="font-serif text-lg font-bold leading-tight drop-shadow-md">
                        {tpl.name}
                      </h3>
                      <p className="text-[11px] text-amber-200/90 line-clamp-2 font-sans drop-shadow-sm">
                        {tpl.description}
                      </p>
                    </div>
                  </div>

                  {/* Feature Highlights */}
                  <div className="p-4 space-y-2">
                    <div className="flex flex-wrap gap-1.5">
                      {tpl.features.slice(0, 3).map((f, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded-md bg-amber-50 text-amber-900 border border-amber-200/60"
                        >
                          <CheckCircle2 className="w-2.5 h-2.5 mr-1 text-amber-700" />
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer: Price & CTA */}
                <div className="p-4 pt-2 border-t border-neutral-100 flex items-center justify-between bg-neutral-50/50">
                  <div>
                    <div className="flex items-baseline space-x-1.5">
                      <span className="font-serif text-lg font-bold text-neutral-950">₹{tpl.price}</span>
                      {tpl.originalPrice && (
                        <span className="text-xs text-neutral-400 line-through">₹{tpl.originalPrice}</span>
                      )}
                    </div>
                    <span className="text-[9px] uppercase tracking-wider text-emerald-600 font-bold block">
                      Lifetime Live Link
                    </span>
                  </div>

                  <div className="flex items-center space-x-1.5">
                    <Link
                      to={`/i/${tpl.slug}`}
                      target="_blank"
                      className="inline-flex items-center px-2.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-neutral-800 text-xs font-bold tracking-wider transition-colors shadow-sm"
                      title="Experience Royal Doors & Full Live Preview"
                    >
                      <Eye className="w-3.5 h-3.5 mr-1 text-amber-800" />
                      <span>Preview</span>
                    </Link>
                    <Link
                      to={`/invitations/templates/${tpl.slug}`}
                      className="inline-flex items-center px-3.5 py-2 rounded-xl bg-amber-900 hover:bg-amber-950 text-amber-50 text-xs font-bold tracking-wider transition-colors shadow-sm"
                    >
                      <span>Buy & Customize</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="bg-gradient-to-br from-amber-950 via-[#2A1D13] to-neutral-950 rounded-3xl p-8 sm:p-12 text-center text-white border border-amber-600/30 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 space-y-4">
            <Sparkles className="w-8 h-8 text-amber-400 mx-auto" />
            <h2 className="font-serif text-2xl sm:text-3xl font-bold">
              Need a Custom Haute Couture Design?
            </h2>
            <p className="text-xs sm:text-sm text-amber-200/80 max-w-xl mx-auto font-sans">
              Our master digital artisans can craft a completely bespoke animation, customized music score, and 3D monogram for your royal wedding.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
              <a
                href="https://api.whatsapp.com/send?phone=919229229323&text=Hi%20Moonlight%20Production,%20I%20want%20a%20custom%20bespoke%20digital%20invitation."
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-neutral-950 font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-opacity"
              >
                Chat with Designer on WhatsApp
              </a>
              <Link
                to="/invitations/dashboard"
                className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs uppercase tracking-wider transition-colors"
              >
                My Saved Invitations
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateMarketplace;
