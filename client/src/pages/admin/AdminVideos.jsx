import React, { useState, useEffect } from 'react';
import api from '../../api/client';
import { useNotification } from '../../context/NotificationContext';
import { Film, Plus, Trash2, Play, X, Sparkles } from 'lucide-react';

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
    <div className="space-y-8 animate-fade-in text-neutral-900">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-900/10 pb-6">
        <div>
          <span className="text-xs uppercase tracking-widest text-amber-700 font-bold block">
            Motion Heirlooms CMS
          </span>
          <h1 className="font-serif text-3xl font-bold text-neutral-900 mt-1">Featured YouTube Wedding Films</h1>
          <p className="text-neutral-600 text-xs font-light mt-1">
            Embed 4K cinematic wedding trailers, teasers, and royal documentary films.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-5 py-2.5 rounded-full bg-gold-gradient text-neutral-950 font-bold text-xs uppercase tracking-wider shadow-gold-subtle hover:scale-105 transition-all flex items-center self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 mr-1.5" /> Add New Cinema Film
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-72 rounded-2xl bg-stone-100 animate-pulse border border-stone-200" />
          ))}
        </div>
      ) : videos.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-amber-900/15 space-y-3 shadow-sm">
          <Film className="w-8 h-8 text-amber-600 mx-auto opacity-70" />
          <h3 className="font-serif text-xl text-neutral-900 font-bold">No Wedding Films Found</h3>
          <p className="text-xs text-neutral-500">Publish your first 4K cinema film above.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {videos.map((vid) => (
            <div key={vid._id} className="bg-white rounded-2xl overflow-hidden border border-amber-900/15 hover:border-amber-500/40 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div className="relative aspect-video bg-stone-100 overflow-hidden group">
                <img src={vid.thumbnail} alt={vid.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-sm text-[10px] text-amber-900 font-mono font-bold shadow-sm">
                  {vid.category}
                </div>
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 rounded-full bg-gold-gradient text-neutral-950 flex items-center justify-center shadow-gold-subtle">
                    <Play className="w-5 h-5 ml-0.5 fill-current" />
                  </div>
                </div>
              </div>

              <div className="p-5 space-y-2">
                <h3 className="font-serif text-lg font-bold text-neutral-900 line-clamp-1">{vid.title}</h3>
                <p className="text-xs text-neutral-600 line-clamp-2">{vid.description}</p>
                <span className="text-[11px] text-amber-800 font-mono block font-semibold">{vid.clientNames} • {vid.location?.city}</span>
              </div>

              <div className="p-4 border-t border-stone-100 flex justify-end space-x-2">
                <button
                  onClick={() => handleDelete(vid._id)}
                  className="p-2 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 transition-colors"
                  title="Delete Video"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-amber-900/20 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4 animate-fade-in text-xs text-neutral-900">
            <div className="flex items-center justify-between pb-3 border-b border-amber-900/10">
              <h3 className="font-serif text-xl font-bold text-neutral-900">Add Wedding Film</h3>
              <button onClick={() => setModalOpen(false)} className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-neutral-600 transition-colors"><X className="w-4 h-4" /></button>
            </div>

            <form onSubmit={handleCreateVideo} className="space-y-3">
              <div>
                <label className="text-neutral-700 font-bold block mb-1">Film Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. The Eternal Vows: Aarav & Ananya"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-neutral-900 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/30"
                />
              </div>

              <div>
                <label className="text-neutral-700 font-bold block mb-1">YouTube URL or ID *</label>
                <input
                  type="url"
                  required
                  placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                  value={form.youtubeUrl}
                  onChange={(e) => setForm({ ...form, youtubeUrl: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-neutral-900 font-mono text-[11px] focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/30"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-neutral-700 font-bold block mb-1">Couple Names *</label>
                  <input
                    type="text"
                    required
                    placeholder="Aarav & Ananya"
                    value={form.clientNames}
                    onChange={(e) => setForm({ ...form, clientNames: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-neutral-900 focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-neutral-700 font-bold block mb-1">City / Venue</label>
                  <input
                    type="text"
                    placeholder="Udaipur"
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-neutral-900 focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-neutral-700 font-bold block mb-1">Thumbnail Image URL *</label>
                <input
                  type="url"
                  required
                  value={form.thumbnail}
                  onChange={(e) => setForm({ ...form, thumbnail: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-neutral-900 font-mono text-[11px] focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-neutral-700 font-bold block mb-1">Narrative Description</label>
                <textarea
                  rows={2}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 text-neutral-900 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/30"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-stone-200">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 rounded-full border border-stone-300 text-neutral-600 hover:text-neutral-900 hover:bg-stone-50 font-semibold transition-colors">Cancel</button>
                <button type="submit" className="px-6 py-2.5 rounded-full bg-gold-gradient text-neutral-950 font-bold uppercase tracking-wider shadow-gold-subtle hover:scale-105 transition-all">Save Video</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminVideos;
