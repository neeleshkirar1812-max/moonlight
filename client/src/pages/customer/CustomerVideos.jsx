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
    <div className="space-y-8 animate-fade-in">
      <div>
        <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold block">
          Motion Heirlooms
        </span>
        <h1 className="font-serif text-3xl font-bold text-white">Private Wedding Films & Cinema</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {videos.map((video) => (
          <div
            key={video._id}
            className="luxury-card rounded-3xl overflow-hidden group cursor-pointer border border-white/10"
            onClick={() => setActiveVideo(video)}
          >
            <div className="relative aspect-video bg-obsidian-300 overflow-hidden">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-gold-gradient text-black flex items-center justify-center shadow-gold-glow group-hover:scale-110 transition-transform">
                  <Play className="w-5 h-5 fill-black ml-0.5" />
                </div>
              </div>
            </div>
            <div className="p-6 space-y-2">
              <span className="text-[10px] text-gold-400 font-mono tracking-wider">{video.category} • {video.duration || '4K Cinema'}</span>
              <h3 className="font-serif text-lg font-bold text-white group-hover:text-gold-200 transition-colors">{video.title}</h3>
              <p className="text-xs text-neutral-400 line-clamp-2">{video.description}</p>
            </div>
          </div>
        ))}
      </div>

      {activeVideo && <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />}
    </div>
  );
};

export default CustomerVideos;
