import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/client';
import { CardSkeleton } from '../../components/common/SkeletonLoader';
import { Sparkles, Lock, ArrowRight, Image as ImageIcon, Calendar } from 'lucide-react';

const CustomerGallery = () => {
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGalleries = async () => {
      try {
        const res = await api.get('/galleries');
        setGalleries(res.data || []);
      } catch (err) {
        console.error('Error fetching galleries', err);
      } finally {
        setLoading(false);
      }
    };
    fetchGalleries();
  }, []);

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold block">
            Private Client Albums
          </span>
          <h1 className="font-serif text-3xl font-bold text-white">Your Wedding Archives</h1>
        </div>
        <p className="text-xs text-neutral-400 max-w-sm">
          PIN-protected, high-resolution galleries. Curate your favorites for album design and download master prints.
        </p>
      </div>

      {loading ? (
        <CardSkeleton count={2} height="h-80" />
      ) : galleries.length === 0 ? (
        <div className="text-center py-20 bg-obsidian-400 rounded-3xl border border-white/10 space-y-4">
          <Sparkles className="w-10 h-10 text-gold-400 mx-auto opacity-50" />
          <h3 className="font-serif text-2xl text-white">Your Album is in Post-Production</h3>
          <p className="text-xs text-neutral-400 max-w-md mx-auto">
            Our colorists and editors are currently grading your photographs. You will receive an email and notification as soon as your album is released.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {galleries.map((gallery) => (
            <div
              key={gallery._id}
              className="luxury-card rounded-3xl overflow-hidden group border border-white/10 relative flex flex-col justify-between"
            >
              <div className="relative aspect-[16/10] bg-obsidian-300 overflow-hidden">
                <img
                  src={gallery.coverImage}
                  alt={gallery.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-black/80 rounded-full text-[10px] text-gold-300 font-semibold uppercase tracking-widest border border-gold-500/30 flex items-center">
                    <Lock className="w-3 h-3 mr-1 text-gold-400" /> Private Album
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-[10px] text-gold-400 font-mono tracking-wider">
                    {gallery.eventDate ? new Date(gallery.eventDate).toLocaleDateString('en-US', { dateStyle: 'long' }) : 'Wedding Archive'}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-white group-hover:text-gold-200 transition-colors">
                    {gallery.title}
                  </h3>
                </div>
              </div>

              <div className="p-6 flex items-center justify-between border-t border-white/5 bg-obsidian-500/50">
                <div className="text-xs text-neutral-300">
                  <span className="font-semibold text-white">{gallery.totalPhotos || 0} Photos</span> • {gallery.sections?.length || 1} Sections
                </div>

                <Link
                  to={`/customer/gallery/${gallery.slug || gallery._id}`}
                  className="inline-flex items-center px-5 py-2 rounded-full bg-gold-gradient text-black font-bold text-xs uppercase tracking-wider shadow-gold-subtle hover:brightness-110 transition-all"
                >
                  Enter Album <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomerGallery;
