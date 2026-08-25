import React, { useState, useEffect } from 'react';
import api from '../../api/client';
import { useNotification } from '../../context/NotificationContext';
import { Film, Plus, Trash2, Play, X } from 'lucide-react';

const AdminVideos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const { addToast } = useNotification();

  const [form, setForm] = useState({
    title: '',
    youtubeUrl: '',
    thumbnail: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
    category: 'Wedding Film',
    clientNames: '',
    city: '',
    description: '',
    isFeatured: true,
  });

  const fetchVideos = async () => {
    setLoading(true);
    try {
      const res = await api.get('/videos');
      setVideos(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleCreateVideo = async (e) => {
    e.preventDefault();
    try {
      await api.post('/videos', {
        ...form,
        location: { city: form.city },
      });
      addToast({ title: 'Video Added', message: 'Wedding film published.', type: 'success' });
      setModalOpen(false);
      setForm({ title: '', youtubeUrl: '', thumbnail: '', category: 'Wedding Film', clientNames: '', city: '', description: '', isFeatured: true });
      fetchVideos();
    } catch (err) {
      addToast({ title: 'Error', message: err.message, type: 'error' });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete video?')) return;
    try {
      await api.delete(`/videos/${id}`);
      setVideos((prev) => prev.filter((v) => v._id !== id));
      addToast({ title: 'Deleted', message: 'Video removed.', type: 'success' });
    } catch (err) {
      addToast({ title: 'Error', message: err.message, type: 'error' });
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold block">
            Motion Heirlooms CMS
          </span>
          <h1 className="font-serif text-3xl font-bold text-white">Featured YouTube Wedding Films</h1>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-5 py-2.5 rounded-full bg-gold-gradient text-black font-bold text-xs uppercase tracking-wider shadow-gold-subtle flex items-center"
        >
          <Plus className="w-4 h-4 mr-1.5" /> Add New Cinema Film
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {videos.map((vid) => (
          <div key={vid._id} className="luxury-card rounded-2xl overflow-hidden border border-white/10 flex flex-col justify-between">
            <div className="relative aspect-video bg-obsidian-300">
              <img src={vid.thumbnail} alt={vid.title} className="w-full h-full object-cover" />
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 text-[10px] text-gold-300 font-mono">
                {vid.category}
              </div>
            </div>

            <div className="p-5 space-y-2">
              <h3 className="font-serif text-lg font-bold text-white line-clamp-1">{vid.title}</h3>
              <p className="text-xs text-neutral-400 line-clamp-2">{vid.description}</p>
              <span className="text-[11px] text-gold-400 font-mono block">{vid.clientNames} • {vid.location?.city}</span>
            </div>

            <div className="p-4 border-t border-white/5 flex justify-end space-x-2">
              <button
                onClick={() => handleDelete(vid._id)}
                className="p-2 rounded-lg bg-red-950/40 text-red-400 hover:bg-red-900/50 border border-red-900/30"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-obsidian-400 border border-gold-500/40 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4 animate-fade-in text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="font-serif text-xl font-bold text-white">Add Wedding Film</h3>
              <button onClick={() => setModalOpen(false)} className="text-neutral-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>

            <form onSubmit={handleCreateVideo} className="space-y-3">
              <div>
                <label className="text-neutral-300 block mb-1">Film Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. The Eternal Vows: Aarav & Ananya"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full bg-obsidian-500 border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="text-neutral-300 block mb-1">YouTube URL or ID *</label>
                <input
                  type="url"
                  required
                  placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                  value={form.youtubeUrl}
                  onChange={(e) => setForm({ ...form, youtubeUrl: e.target.value })}
                  className="w-full bg-obsidian-500 border border-white/15 rounded-xl px-3 py-2 text-white font-mono text-[11px] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-neutral-300 block mb-1">Couple Names *</label>
                  <input
                    type="text"
                    required
                    placeholder="Aarav & Ananya"
                    value={form.clientNames}
                    onChange={(e) => setForm({ ...form, clientNames: e.target.value })}
                    className="w-full bg-obsidian-500 border border-white/15 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-neutral-300 block mb-1">City / Venue</label>
                  <input
                    type="text"
                    placeholder="Udaipur"
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    className="w-full bg-obsidian-500 border border-white/15 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-neutral-300 block mb-1">Thumbnail Image URL *</label>
                <input
                  type="url"
                  required
                  value={form.thumbnail}
                  onChange={(e) => setForm({ ...form, thumbnail: e.target.value })}
                  className="w-full bg-obsidian-500 border border-white/15 rounded-xl px-3 py-2 text-white font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="text-neutral-300 block mb-1">Narrative Description</label>
                <textarea
                  rows={2}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full bg-obsidian-500 border border-white/15 rounded-xl p-2 text-white"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-white/10">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 rounded-full border border-white/15 text-neutral-300">Cancel</button>
                <button type="submit" className="px-6 py-2 rounded-full bg-gold-gradient text-black font-bold uppercase">Save Video</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminVideos;
