import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../api/client';
import Lightbox from '../../components/common/Lightbox';
import { CardSkeleton } from '../../components/common/SkeletonLoader';
import { Search, Filter, Sparkles, MapPin, ZoomIn, Heart, Play } from 'lucide-react';

const categories = [
  { id: 'all', name: 'All Archives' },
  { id: 'wedding', name: 'Royal Weddings' },
  { id: 'pre-wedding', name: 'Pre-Wedding' },
  { id: 'destination-wedding', name: 'Palaces & Forts' },
  { id: 'films', name: '4K Cinema Films' },
  { id: 'couple-shoot', name: 'Couple Shoots' },
  { id: 'bridal', name: 'Bridal & Haldi' },
];

const defaultIndianPortfolios = [
  {
    _id: 'p-1',
    title: 'Karan & Vaishali Royal Union at Maheshwar Ghats',
    slug: 'karan-vaishali-maheshwar',
    category: 'wedding',
    coupleName: 'Karan & Vaishali',
    location: { city: 'Maheshwar', venue: 'Ahilya Fort & Narmada Ghats' },
    coverImage: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
    description: 'A regal heritage Indian wedding celebrated against the sandstone arches of Maheshwar Ghats.',
  },
  {
    _id: 'p-2',
    title: 'Anant & Sonam Pre-Wedding Shoot | Heritage Maheshwar',
    slug: 'anant-sonam-prewedding',
    category: 'pre-wedding',
    coupleName: 'Anant & Sonam',
    location: { city: 'Maheshwar', venue: 'Holkar Fort Palace' },
    coverImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    description: 'Golden hour couple romance captured with full-frame cinema glass and slow-motion water reflections.',
  },
  {
    _id: 'p-3',
    title: 'Piyush & Priyanka Engagement & Ring Ceremony',
    slug: 'piyush-priyanka-engagement',
    category: 'wedding',
    coupleName: 'Piyush & Priyanka',
    location: { city: 'Central India', venue: 'Royal Grand Courtyard' },
    coverImage: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
    description: 'A magical ring ceremony filled with emotional family blessings, floral mandap, and joyous sparkles.',
  },
  {
    _id: 'p-4',
    title: 'Bhopal Heritage Palace: Kabir & Maya Celebration',
    slug: 'kabir-maya-bhopal',
    category: 'destination-wedding',
    coupleName: 'Kabir & Maya',
    location: { city: 'Bhopal', venue: 'Jehan Numa Palace' },
    coverImage: 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?auto=format&fit=crop&w=1200&q=80',
    description: 'Grand royal Indian banquet with candlelit palace terraces and bespoke Sabyasachi portraiture.',
  },
  {
    _id: 'p-5',
    title: 'Shubhanshu & Monika Pre-Wedding | Mumbai Coastal',
    slug: 'shubhanshu-monika-mumbai',
    category: 'pre-wedding',
    coupleName: 'Shubhanshu & Monika',
    location: { city: 'Mumbai', venue: 'Marine Drive & Seaside' },
    coverImage: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=80',
    description: 'High-fashion editorial pre-wedding capturing genuine couple laughter against the Mumbai coastline.',
  },
  {
    _id: 'p-6',
    title: 'Vinit & Anupma Royal Indian Wedding & Pheras',
    slug: 'vinit-anupma-wedding',
    category: 'wedding',
    coupleName: 'Vinit & Anupma',
    location: { city: 'Rajasthan', venue: 'Palace Heritage Resort' },
    coverImage: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=90',
    description: 'Sacred Vedic pheras under 1,000 marigolds with live shehnai and emotional vidai moments.',
  },
];

const Portfolio = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || 'all';
  const [items, setItems] = useState(defaultIndianPortfolios);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const query = activeCategory !== 'all' ? `?category=${activeCategory}` : '';
        const res = await api.get(`/portfolio${query}`);
        if (res.data && res.data.length > 0) {
          setItems(res.data);
        } else {
          setItems(defaultIndianPortfolios);
        }
      } catch (err) {
        console.error('Error fetching portfolio, using defaults', err);
        setItems(defaultIndianPortfolios);
      }
    };
    fetchPortfolio();
  }, [activeCategory]);

  const filteredItems = items.filter((it) => {
    const categoryMatches = activeCategory === 'all' || it.category === activeCategory;
    if (!categoryMatches) return false;
    if (!searchQuery) return true;
    const matchTitle = it.title?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCouple = it.coupleName?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCity = it.location?.city?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchTitle || matchCouple || matchCity;
  });

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-neutral-900 pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-[0.35em] text-gold-700 font-bold block">
            Moonlight Production Archives
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900">
            Indian Royal Wedding Portfolio
          </h1>
          <p className="text-neutral-600 text-sm sm:text-base font-light max-w-xl mx-auto">
            A curated anthology of timeless Indian love stories, regal palace unions, sacred Vedic rituals, and pre-wedding shoots.
          </p>
        </div>

        {/* Category Filter Tabs & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-neutral-200">
          {/* Tabs */}
          <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 custom-scrollbar">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSearchParams(cat.id === 'all' ? {} : { category: cat.id })}
                  className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-neutral-900 text-white font-bold shadow-md'
                      : 'bg-white text-neutral-700 hover:text-neutral-950 hover:border-gold-500 border border-neutral-300 shadow-sm'
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search city (Maheshwar, Bhopal, Udaipur)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-neutral-300 rounded-full pl-10 pr-4 py-2 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-gold-500 shadow-sm"
            />
          </div>
        </div>

        {/* Portfolio Masonry Grid */}
        {loading ? (
          <CardSkeleton count={6} height="h-96" />
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-neutral-200 shadow-sm space-y-4">
            <Sparkles className="w-10 h-10 text-gold-600 mx-auto opacity-50" />
            <h3 className="font-serif text-2xl text-neutral-900 font-bold">No Stories Found</h3>
            <p className="text-xs text-neutral-500">Try selecting a different category or refining your search term.</p>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            <AnimatePresence>
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item._id || index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="break-inside-avoid group relative rounded-2xl overflow-hidden bg-white border border-neutral-200 luxury-card cursor-pointer shadow-lg hover:shadow-2xl"
                  onClick={() => setLightboxIndex(index)}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={item.coverImage}
                      alt={item.title}
                      className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-between" />

                    {/* Top Tag */}
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-neutral-200 text-[10px] text-gold-800 font-bold uppercase tracking-widest font-mono shadow-sm">
                        {item.category}
                      </span>
                    </div>

                    {/* Bottom Info on Hover */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 space-y-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex items-center text-[10px] text-gold-300 font-mono tracking-wider">
                        <MapPin className="w-3 h-3 mr-1 text-gold-400" />
                        {item.location?.venue || item.location?.city}
                      </div>
                      <h3 className="font-serif text-lg font-bold text-white">{item.title}</h3>
                      <p className="text-xs text-neutral-200 line-clamp-2 font-light">{item.description}</p>
                      <div className="pt-2 flex items-center justify-between text-xs text-gold-300">
                        <span className="flex items-center"><ZoomIn className="w-3.5 h-3.5 mr-1" /> View Full-Screen</span>
                        <span>Moonlight Studio</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Lightbox Viewer */}
      {lightboxIndex !== null && (
        <Lightbox
          images={filteredItems.map((it) => ({
            url: it.coverImage,
            title: it.title,
            caption: `${it.coupleName || it.title} • ${it.location?.city || ''}`,
          }))}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNext={() => setLightboxIndex((prev) => (prev + 1) % filteredItems.length)}
          onPrev={() => setLightboxIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length)}
        />
      )}
    </div>
  );
};

export default Portfolio;
