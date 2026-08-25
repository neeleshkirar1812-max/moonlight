import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../api/client';
import Lightbox from '../../components/common/Lightbox';
import VideoModal from '../../components/common/VideoModal';
import { CardSkeleton } from '../../components/common/SkeletonLoader';
import { ArrowLeft, Play, ZoomIn, MapPin, Sparkles, Youtube, Eye, Clock, ExternalLink } from 'lucide-react';
import defaultMoonlightFilms from '../../data/moonlightFilms.json';

const categoryTitles = {
  wedding: { title: 'Royal Wedding Photography', desc: 'Regal ceremonies, sacred vows, and timeless palace celebrations by Moonlight Production.' },
  'pre-wedding': { title: 'Pre-Wedding Editorial Shoots', desc: 'Cinematic romance and intimate love stories in Maheshwar, Bhopal, Mumbai, and destination locations.' },
  'destination-wedding': { title: 'Destination Wedding Archives', desc: 'Bespoke destination celebrations captured with authentic emotional intimacy.' },
  films: { title: 'Moonlight Production 4K Cinema Films', desc: 'Official 4K wedding films, pre-wedding teasers, and docu-cinemas from @moonlightproductions_films.' },
};

const PortfolioCategoryPage = () => {
  const { category = 'wedding' } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeVideo, setActiveVideo] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [filmFilter, setFilmFilter] = useState('all');

  const categoryMeta = categoryTitles[category] || {
    title: `${category.charAt(0).toUpperCase() + category.slice(1)} Showcase`,
    desc: 'Curated visual heirlooms by Moonlight Production & Films.',
  };

  useEffect(() => {
    const fetchCategoryData = async () => {
      setLoading(true);
      try {
        if (category === 'films') {
          try {
            const res = await api.get('/videos');
            if (res.data && res.data.length > 0) {
              setItems(res.data);
            } else {
              setItems(defaultMoonlightFilms);
            }
          } catch (err) {
            setItems(defaultMoonlightFilms);
          }
        } else {
          const res = await api.get(`/portfolio?category=${category}`);
          setItems(res.data || []);
        }
      } catch (err) {
        console.error('Error fetching category data', err);
        if (category === 'films') {
          setItems(defaultMoonlightFilms);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchCategoryData();
  }, [category]);

  const filteredFilms = items.filter((f) => {
    if (filmFilter === 'all') return true;
    if (filmFilter === 'pre-wedding') return f.title?.toLowerCase().includes('pre') || f.title?.toLowerCase().includes('teaser');
    if (filmFilter === 'wedding') return !f.title?.toLowerCase().includes('pre');
    return true;
  });

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-black pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8 sm:space-y-12">
        {/* Back navigation & Header */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Link
              to="/portfolio"
              className="inline-flex items-center text-xs uppercase tracking-widest text-black hover:text-gold-800 font-black group font-mono"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to All Archives
            </Link>

            {category === 'films' && (
              <a
                href="https://www.youtube.com/@moonlightproductions_films"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center px-4 py-1.5 rounded-full bg-red-50 hover:bg-red-600 text-red-700 hover:text-white border-2 border-red-300 text-xs font-black uppercase tracking-wider transition-all font-mono shadow-sm"
              >
                <Youtube className="w-3.5 h-3.5 mr-1.5" /> Subscribe on YouTube
              </a>
            )}
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black text-black">
            {categoryMeta.title}
          </h1>
          <p className="text-neutral-700 text-xs sm:text-base font-semibold max-w-2xl">
            {categoryMeta.desc}
          </p>

          {/* Sub-Filters for Films */}
          {category === 'films' && (
            <div className="flex items-center space-x-2 pt-2 overflow-x-auto pb-2 custom-scrollbar">
              <button
                onClick={() => setFilmFilter('all')}
                className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap ${
                  filmFilter === 'all'
                    ? 'bg-black text-white font-black shadow-md'
                    : 'bg-white text-black hover:bg-neutral-100 border-2 border-neutral-300 font-bold shadow-sm'
                }`}
              >
                All 4K Films ({items.length})
              </button>
              <button
                onClick={() => setFilmFilter('pre-wedding')}
                className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap ${
                  filmFilter === 'pre-wedding'
                    ? 'bg-black text-white font-black shadow-md'
                    : 'bg-white text-black hover:bg-neutral-100 border-2 border-neutral-300 font-bold shadow-sm'
                }`}
              >
                Pre-Wedding & Teasers
              </button>
              <button
                onClick={() => setFilmFilter('wedding')}
                className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap ${
                  filmFilter === 'wedding'
                    ? 'bg-black text-white font-black shadow-md'
                    : 'bg-white text-black hover:bg-neutral-100 border-2 border-neutral-300 font-bold shadow-sm'
                }`}
              >
                Wedding Ceremonies & Highlights
              </button>
            </div>
          )}
        </div>

        {/* Content Showcase */}
        {loading ? (
          <CardSkeleton count={6} height="h-80" />
        ) : category === 'films' ? (
          // Video Grid for Real Moonlight Production YouTube Videos
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredFilms.map((video, vIdx) => {
              const vidObj = {
                title: video.title,
                youtubeUrl: video.youtubeUrl || `https://www.youtube.com/watch?v=${video.id}`,
                youtubeVideoId: video.id || video.youtubeVideoId || video.youtubeUrl?.split('v=')[1]?.substring(0, 11),
                category: video.category || 'Moonlight Cinema',
                clientNames: video.clientNames || 'Moonlight Couple',
                description: video.description || `Official wedding film produced by Moonlight Production.`,
              };

              return (
                <div
                  key={video.id || video._id || vIdx}
                  className="bg-white rounded-3xl overflow-hidden group cursor-pointer border-2 border-neutral-300 hover:border-black transition-all flex flex-col justify-between shadow-xl hover:shadow-2xl"
                  onClick={() => setActiveVideo(vidObj)}
                >
                  <div className="relative aspect-video bg-black overflow-hidden">
                    <img
                      src={video.hqThumbnail || video.thumbnail || `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95 group-hover:brightness-100"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://img.youtube.com/vi/${video.id}/0.jpg`;
                      }}
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                        <Play className="w-6 h-6 fill-current ml-0.5 text-gold-700" />
                      </div>
                    </div>

                    {/* Duration Badge */}
                    {video.duration && (
                      <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-black text-[10px] font-mono text-white flex items-center border border-white/30 font-bold">
                        <Clock className="w-3 h-3 mr-1 text-gold-400" /> {video.duration}
                      </span>
                    )}
                  </div>

                  <div className="p-5 sm:p-6 space-y-2">
                    <div className="flex items-center justify-between text-[10px] text-gold-800 font-mono font-black uppercase">
                      <span>Moonlight Production • 4K</span>
                      {video.views && (
                        <span className="text-black font-bold flex items-center">
                          <Eye className="w-3 h-3 mr-1 text-gold-700" /> {video.views}
                        </span>
                      )}
                    </div>
                    <h3 className="font-serif text-base sm:text-lg font-black text-black group-hover:text-gold-800 transition-colors line-clamp-2">
                      {video.title}
                    </h3>
                    <div className="pt-2 flex items-center justify-between border-t border-neutral-200 text-xs text-black font-bold">
                      <span className="flex items-center hover:text-gold-800">
                        <Play className="w-3.5 h-3.5 mr-1 text-gold-700" /> Watch 4K Film
                      </span>
                      <a
                        href={video.youtubeUrl || `https://www.youtube.com/watch?v=${video.id}`}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-neutral-500 hover:text-red-600 flex items-center"
                        title="Open on YouTube"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-neutral-300 shadow-md space-y-3">
            <Sparkles className="w-8 h-8 text-gold-700 mx-auto opacity-50" />
            <h3 className="font-serif text-xl font-black text-black">No entries found in this collection.</h3>
          </div>
        ) : (
          // Photo Masonry
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {items.map((item, index) => (
              <div
                key={item._id || index}
                className="break-inside-avoid group relative rounded-2xl overflow-hidden bg-white border-2 border-neutral-300 shadow-lg hover:shadow-2xl cursor-pointer"
                onClick={() => setLightboxIndex(index)}
              >
                <img
                  src={item.coverImage}
                  alt={item.title}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end">
                  <span className="text-[10.5px] text-gold-300 font-mono font-bold">{item.location?.city}</span>
                  <h3 className="font-serif text-lg font-black text-white">{item.title}</h3>
                  <p className="text-xs text-neutral-200 line-clamp-2 font-medium">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox / Video modals */}
      {lightboxIndex !== null && (
        <Lightbox
          images={items.map((it) => ({
            url: it.coverImage,
            title: it.title,
            caption: `${it.coupleName || it.title} • ${it.location?.city || ''}`,
          }))}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNext={() => setLightboxIndex((prev) => (prev + 1) % items.length)}
          onPrev={() => setLightboxIndex((prev) => (prev - 1 + items.length) % items.length)}
        />
      )}

      {activeVideo && <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />}
    </div>
  );
};

export default PortfolioCategoryPage;
