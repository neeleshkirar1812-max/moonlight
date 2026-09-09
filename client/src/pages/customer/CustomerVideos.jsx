import React, { useState, useEffect } from 'react';
import api from '../../api/client';
import VideoModal from '../../components/common/VideoModal';
import { Film, Play, Sparkles } from 'lucide-react';

const CustomerVideos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await api.get('/videos');
        setVideos(res.data || []);
      } catch (err) {
        console.error('Error fetching videos', err);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  return (
    <div className="space-y-8 animate-fade-in text-neutral-900">
      <div className="border-b border-amber-900/10 pb-6">
        <span className="text-xs uppercase tracking-widest text-amber-700 font-bold block">
          Motion Heirlooms
        </span>
        <h1 className="font-serif text-3xl font-bold text-neutral-900 mt-1">Private Wedding Films & Cinema</h1>
        <p className="text-neutral-600 text-xs font-light mt-1">
          Stream 4K master films, cinematic teasers, and emotional wedding documentaries in full clarity.
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-64 rounded-3xl bg-stone-100 animate-pulse border border-stone-200" />
          ))}
        </div>
      ) : videos.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-amber-900/15 space-y-4 shadow-sm">
          <Film className="w-10 h-10 text-amber-600 mx-auto opacity-70" />
          <h3 className="font-serif text-2xl text-neutral-900 font-bold">Your Wedding Films are in the Editing Suite</h3>
          <p className="text-xs text-neutral-500 max-w-md mx-auto">
            Our master editors are color grading your cinema footage. Your films will be published here upon release.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video) => (
            <div
              key={video._id}
              className="bg-white rounded-3xl overflow-hidden group cursor-pointer border border-amber-900/15 shadow-sm hover:shadow-md hover:border-amber-500/40 transition-all flex flex-col justify-between"
              onClick={() => setActiveVideo(video)}
            >
              <div className="relative aspect-video bg-stone-100 overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/15 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-gold-gradient text-neutral-950 flex items-center justify-center shadow-gold-subtle group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-neutral-950 ml-0.5" />
                  </div>
                </div>
              </div>
              <div className="p-6 space-y-2 bg-stone-50/50 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] text-amber-800 font-mono tracking-wider font-bold">{video.category} • {video.duration || '4K Cinema'}</span>
                  <h3 className="font-serif text-lg font-bold text-neutral-900 group-hover:text-amber-900 transition-colors mt-1">{video.title}</h3>
                  <p className="text-xs text-neutral-600 line-clamp-2 mt-1">{video.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeVideo && <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />}
    </div>
  );
};

export default CustomerVideos;
