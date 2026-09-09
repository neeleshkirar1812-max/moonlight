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
    <div className="space-y-8 animate-fade-in text-neutral-900">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-900/10 pb-6">
        <div>
          <span className="text-xs uppercase tracking-widest text-amber-700 font-bold block">
            Private Client Albums
          </span>
          <h1 className="font-serif text-3xl font-bold text-neutral-900 mt-1">Your Wedding Archives</h1>
        </div>
        <p className="text-xs text-neutral-600 max-w-sm font-light">
          PIN-protected, high-resolution galleries. Curate your favorites for album design and download master prints.
        </p>
      </div>

      {loading ? (
        <CardSkeleton count={2} height="h-80" />
      ) : galleries.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-amber-900/15 space-y-4 shadow-sm">
          <Sparkles className="w-10 h-10 text-amber-600 mx-auto opacity-70" />
          <h3 className="font-serif text-2xl text-neutral-900 font-bold">Your Album is in Post-Production</h3>
          <p className="text-xs text-neutral-500 max-w-md mx-auto">
            Our colorists and editors are currently grading your photographs. You will receive an email and notification as soon as your album is released.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {galleries.map((gallery) => (
            <div
              key={gallery._id}
              className="bg-white rounded-3xl overflow-hidden group border border-amber-900/15 shadow-sm hover:shadow-md hover:border-amber-500/40 relative flex flex-col justify-between transition-all"
            >
              <div className="relative aspect-[16/10] bg-stone-100 overflow-hidden">
                <img
                  src={gallery.coverImage}
                  alt={gallery.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/95 backdrop-blur-sm rounded-full text-[10px] text-amber-950 font-bold uppercase tracking-widest border border-amber-300 flex items-center shadow-sm">
                    <Lock className="w-3 h-3 mr-1 text-amber-700" /> Private Album
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-[10px] text-amber-300 font-mono tracking-wider font-semibold">
                    {gallery.eventDate ? new Date(gallery.eventDate).toLocaleDateString('en-US', { dateStyle: 'long' }) : 'Wedding Archive'}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-white group-hover:text-amber-200 transition-colors">
                    {gallery.title}
                  </h3>
                </div>
              </div>

              <div className="p-6 flex items-center justify-between border-t border-stone-100 bg-stone-50/60">
                <div className="text-xs text-neutral-600">
                  <span className="font-bold text-neutral-900">{gallery.totalPhotos || 0} Photos</span> • {gallery.sections?.length || 1} Sections
                </div>

                <Link
                  to={`/customer/gallery/${gallery.slug || gallery._id}`}
                  className="inline-flex items-center px-5 py-2.5 rounded-full bg-gold-gradient text-neutral-950 font-bold text-xs uppercase tracking-wider shadow-gold-subtle hover:scale-105 transition-all"
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
