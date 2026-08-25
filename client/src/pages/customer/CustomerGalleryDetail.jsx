import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../api/client';
import Lightbox from '../../components/common/Lightbox';
import { useNotification } from '../../context/NotificationContext';
import {
  ArrowLeft,
  Lock,
  Sparkles,
  Download,
  Heart,
  Eye,
  ShieldCheck,
  CheckCircle2,
  ZoomIn,
  Key,
} from 'lucide-react';

const CustomerGalleryDetail = () => {
  const { id } = useParams();
  const [gallery, setGallery] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pinEntered, setPinEntered] = useState('');
  const [pinAuthorized, setPinAuthorized] = useState(false);
  const [activeSection, setActiveSection] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const { addToast } = useNotification();

  const fetchGallery = async (pin = '') => {
    setLoading(true);
    try {
      const res = await api.get(`/galleries/${id}${pin ? `?pin=${pin}` : ''}`);
      setGallery(res.gallery);
      setItems(res.items || []);
      setPinAuthorized(true);
    } catch (err) {
      if (err.message?.includes('PIN')) {
        setPinAuthorized(false);
      } else {
        addToast({ title: 'Access Error', message: err.message, type: 'error' });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, [id]);

  const handlePinSubmit = (e) => {
    e.preventDefault();
    fetchGallery(pinEntered);
  };

  const handleToggleFavorite = async (itemId) => {
    try {
      const res = await api.post(`/galleries/items/${itemId}/favorite`);
      setItems((prev) =>
        prev.map((it) => (it._id === itemId ? { ...it, isFavorite: res.isFavorite } : it))
      );
      addToast({
        title: res.isFavorite ? 'Added to Favorites' : 'Removed from Favorites',
        message: res.isFavorite ? 'Photo saved for luxury album curation.' : '',
        type: 'success',
      });
    } catch (err) {
      addToast({ title: 'Error', message: err.message, type: 'error' });
    }
  };

  if (!pinAuthorized && !loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-obsidian-400 border border-gold-500/40 rounded-3xl p-8 shadow-2xl text-center space-y-6 animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-gold-500/10 border border-gold-500/40 flex items-center justify-center text-gold-400 mx-auto shadow-gold-subtle">
            <Lock className="w-8 h-8" />
          </div>

          <div>
            <h2 className="font-serif text-2xl font-bold text-white">Private Wedding Album</h2>
            <p className="text-xs text-neutral-400 mt-1">Please enter your 4-digit security PIN to access this private client archive.</p>
          </div>

          <form onSubmit={handlePinSubmit} className="space-y-4">
            <div className="relative">
              <Key className="w-4 h-4 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                maxLength={6}
                required
                value={pinEntered}
                onChange={(e) => setPinEntered(e.target.value)}
                placeholder="Enter PIN (Demo: 2026)"
                className="w-full bg-obsidian-500 border border-white/20 rounded-2xl pl-11 pr-4 py-3.5 text-center text-lg tracking-widest text-white focus:border-gold-400 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-gold-gradient text-black font-bold text-xs uppercase tracking-widest shadow-gold-subtle hover:brightness-110 transition-all"
            >
              Unlock Private Archive
            </button>
          </form>

          <p className="text-[11px] text-neutral-500">PIN was provided in your welcome email.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return <div className="h-96 rounded-3xl bg-obsidian-400 animate-pulse" />;
  }

  const sections = ['All', ...new Set(items.map((i) => i.section).filter(Boolean))];

  const filteredItems = items.filter((it) => {
    if (showFavoritesOnly && !it.isFavorite) return false;
    if (activeSection !== 'All' && it.section !== activeSection) return false;
    return true;
  });

  const favoritesCount = items.filter((i) => i.isFavorite).length;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header & Controls */}
      <div className="space-y-4">
        <Link
          to="/customer/gallery"
          className="inline-flex items-center text-xs uppercase tracking-widest text-gold-400 hover:text-white font-semibold group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Albums
        </Link>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold block">
              Private Client Archive
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white">{gallery?.title}</h1>
            <p className="text-xs text-neutral-400 mt-1 font-mono">
              {gallery?.eventDate ? new Date(gallery.eventDate).toLocaleDateString('en-US', { dateStyle: 'long' }) : ''} • {items.length} Master Photographs
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center transition-all ${
                showFavoritesOnly
                  ? 'bg-red-500/20 text-red-300 border border-red-500'
                  : 'bg-obsidian-300 border border-white/15 text-neutral-300 hover:text-white'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 mr-1.5 ${showFavoritesOnly ? 'fill-red-400 text-red-400' : ''}`} />
              Favorites ({favoritesCount})
            </button>
          </div>
        </div>
      </div>

      {/* Section Filter Tabs */}
      {sections.length > 1 && (
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 border-b border-white/10 custom-scrollbar">
          {sections.map((sec) => (
            <button
              key={sec}
              onClick={() => setActiveSection(sec)}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap ${
                activeSection === sec
                  ? 'bg-gold-gradient text-black font-bold shadow-gold-subtle'
                  : 'bg-obsidian-300 text-neutral-300 hover:text-white border border-white/10'
              }`}
            >
              {sec}
            </button>
          ))}
        </div>
      )}

      {/* Photos Masonry / Grid */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-20 bg-obsidian-400 rounded-3xl border border-white/10 space-y-2">
          <Sparkles className="w-8 h-8 text-gold-400 mx-auto opacity-50" />
          <h3 className="font-serif text-xl text-white">No photos in this section.</h3>
        </div>
      ) : (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredItems.map((item, index) => (
            <div
              key={item._id || index}
              className="break-inside-avoid group relative rounded-2xl overflow-hidden bg-obsidian-400 border border-white/10 luxury-card cursor-pointer"
            >
              <img
                src={item.displayUrl || item.url}
                alt={item.title || 'Wedding Photo'}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                onClick={() => setLightboxIndex(index)}
              />

              {/* Hover Actions */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-between pointer-events-none">
                <div className="flex justify-between items-center pointer-events-auto">
                  <span className="px-2.5 py-1 rounded bg-black/80 text-[10px] text-gold-300 font-mono">
                    {item.section || 'Highlights'}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleFavorite(item._id);
                    }}
                    className={`p-2 rounded-full border transition-all ${
                      item.isFavorite
                        ? 'bg-red-500/30 border-red-500 text-red-500'
                        : 'bg-black/80 border-white/20 text-white hover:text-gold-400 hover:border-gold-500'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${item.isFavorite ? 'fill-red-500' : ''}`} />
                  </button>
                </div>

                <div className="flex items-center justify-between pointer-events-auto">
                  <span className="text-xs font-serif text-white truncate max-w-[180px]">{item.title}</span>
                  <div className="flex space-x-2">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      download
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 rounded-full bg-black/80 border border-white/20 text-white hover:text-gold-400"
                      title="Download"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox Viewer */}
      {lightboxIndex !== null && (
        <Lightbox
          images={filteredItems}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNext={() => setLightboxIndex((prev) => (prev + 1) % filteredItems.length)}
          onPrev={() => setLightboxIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length)}
          onToggleFavorite={handleToggleFavorite}
          isFavorite={filteredItems[lightboxIndex]?.isFavorite}
          allowDownload={gallery?.downloadAllowed}
        />
      )}
    </div>
  );
};

export default CustomerGalleryDetail;
