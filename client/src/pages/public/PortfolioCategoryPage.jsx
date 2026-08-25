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
  'pre-wedding': { title: 'Pre-Wedding Editorial Shoots', desc: 'Cinematic rendezvous and intimate love stories in Maheshwar, Bhopal, Mumbai, and global destinations.' },
  'destination-wedding': { title: 'Destination Wedding Archives', desc: 'Bespoke destination celebrations captured with authentic emotional intimacy.' },
  films: { title: 'Moonlight Production Wedding Cinema', desc: 'Official 4K wedding films, pre-wedding teasers, and docu-cinemas from @moonlightproductions_films.' },
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
    <div className="min-h-screen bg-obsidian text-white pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Back navigation & Header */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Link
              to="/portfolio"
              className="inline-flex items-center text-xs uppercase tracking-widest text-gold-400 hover:text-white font-semibold group font-mono"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to All Archives
            </Link>

            {category === 'films' && (
              <a
                href="https://www.youtube.com/@moonlightproductions_films"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center px-4 py-1.5 rounded-full bg-red-600/20 hover:bg-red-600 text-red-300 hover:text-white border border-red-500/40 text-xs font-semibold uppercase tracking-wider transition-all"
              >
                <Youtube className="w-3.5 h-3.5 mr-1.5" /> Subscribe on YouTube
              </a>
            )}
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
            {categoryMeta.title}
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base font-light max-w-2xl">
            {categoryMeta.desc}
          </p>

          {/* Sub-Filters for Films */}
          {category === 'films' && (
            <div className="flex items-center space-x-2 pt-4">
              <button
                onClick={() => setFilmFilter('all')}
                className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all ${
                  filmFilter === 'all'
                    ? 'bg-gold-gradient text-black font-bold shadow-gold-subtle'
                    : 'bg-obsidian-700 text-neutral-400 hover:text-white border border-white/10'
                }`}
              >
                All 4K Films ({items.length})
              </button>
              <button
                onClick={() => setFilmFilter('pre-wedding')}
                className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all ${
                  filmFilter === 'pre-wedding'
                    ? 'bg-gold-gradient text-black font-bold shadow-gold-subtle'
                    : 'bg-obsidian-700 text-neutral-400 hover:text-white border border-white/10'
                }`}
              >
                Pre-Wedding & Teasers
              </button>
              <button
                onClick={() => setFilmFilter('wedding')}
                className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all ${
                  filmFilter === 'wedding'
                    ? 'bg-gold-gradient text-black font-bold shadow-gold-subtle'
                    : 'bg-obsidian-700 text-neutral-400 hover:text-white border border-white/10'
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                  className="luxury-card rounded-3xl overflow-hidden group cursor-pointer border border-white/10 hover:border-gold-500/60 transition-all flex flex-col justify-between shadow-2xl bg-obsidian-800"
                  onClick={() => setActiveVideo(vidObj)}
                >
                  <div className="relative aspect-video bg-black overflow-hidden">
                    <img
                      src={video.hqThumbnail || video.thumbnail || `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95 group-hover:brightness-105"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://img.youtube.com/vi/${video.id}/0.jpg`;
                      }}
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors" />

                    {/* Duration Badge */}
                    {video.duration && (
                      <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md text-[10px] font-mono text-white flex items-center border border-white/15">
                        <Clock className="w-3 h-3 mr-1 text-gold-400" /> {video.duration}
                      </span>
                    )}

                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-gold-gradient text-black flex items-center justify-center shadow-gold-glow group-hover:scale-110 transition-transform">
                        <Play className="w-6 h-6 fill-black ml-1" />
                      </div>
                    </div>
                  </div>

                  <div className="p-6 space-y-2.5">
                    <div className="flex items-center justify-between text-[10px] text-gold-400 font-mono">
                      <span>Moonlight Production • 4K</span>
                      {video.views && (
                        <span className="text-neutral-400 flex items-center">
                          <Eye className="w-3 h-3 mr-1" /> {video.views}
                        </span>
                      )}
                    </div>
                    <h3 className="font-serif text-lg font-bold text-white group-hover:text-gold-200 transition-colors line-clamp-2">
                      {video.title}
                    </h3>
                    <div className="pt-2 flex items-center justify-between border-t border-white/10 text-xs text-gold-400">
                      <span className="flex items-center hover:text-white">
                        <Play className="w-3.5 h-3.5 mr-1" /> Watch 4K Film
                      </span>
                      <a
                        href={video.youtubeUrl || `https://www.youtube.com/watch?v=${video.id}`}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-neutral-400 hover:text-red-400 flex items-center"
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
          <div className="text-center py-20 bg-obsidian-400/50 rounded-3xl border border-white/5 space-y-3">
            <Sparkles className="w-8 h-8 text-gold-400 mx-auto opacity-50" />
            <h3 className="font-serif text-xl text-white">No entries found in this collection.</h3>
          </div>
        ) : (
          // Photo Masonry
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {items.map((item, index) => (
              <div
                key={item._id || index}
                className="break-inside-avoid group relative rounded-2xl overflow-hidden bg-obsidian-300 border border-white/10 luxury-card cursor-pointer"
                onClick={() => setLightboxIndex(index)}
              >
                <img
                  src={item.coverImage}
                  alt={item.title}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end">
                  <span className="text-[10px] text-gold-400 font-mono">{item.location?.city}</span>
                  <h3 className="font-serif text-lg font-bold text-white">{item.title}</h3>
                  <p className="text-xs text-neutral-300 line-clamp-2">{item.description}</p>
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
