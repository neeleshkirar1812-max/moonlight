import React, { useState, useEffect } from 'react';
import api from '../../api/client';
import { useNotification } from '../../context/NotificationContext';
import { Image, Plus, Trash2, Edit3, Star, UploadCloud, X, MapPin } from 'lucide-react';

const AdminPortfolio = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { addToast } = useNotification();

  const [form, setForm] = useState({
    title: '',
    category: 'wedding',
    coupleName: '',
    city: '',
    venue: '',
    coverImage: '',
    description: '',
    isFeatured: false,
    tags: '',
  });

  const fetchPortfolio = async () => {
    setLoading(true);
    try {
      const res = await api.get('/portfolio?limit=50');
      setItems(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', 'Moonlight/portfolio');

    try {
      addToast({ title: 'Uploading', message: 'Uploading image to Cloudinary...', type: 'warning' });
      const res = await api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setForm((prev) => ({ ...prev, coverImage: res.data.secure_url }));
      addToast({ title: 'Uploaded', message: 'Cloudinary image CDN URL generated.', type: 'success' });
    } catch (err) {
      addToast({ title: 'Upload Failed', message: err.message, type: 'error' });
    }
  };

  const handleCreatePortfolio = async (e) => {
    e.preventDefault();
    if (!form.title || !form.coverImage) {
      addToast({ title: 'Fields Required', message: 'Please provide title and cover image.', type: 'warning' });
      return;
    }

    setSubmitting(true);
    try {
      await api.post('/portfolio', {
        title: form.title,
        category: form.category,
        coupleName: form.coupleName,
        location: { city: form.city, venue: form.venue },
        coverImage: form.coverImage,
        description: form.description,
        isFeatured: form.isFeatured,
        tags: form.tags,
      });

      addToast({ title: 'Success', message: 'Portfolio item published to public gallery.', type: 'success' });
      setModalOpen(false);
      setForm({ title: '', category: 'wedding', coupleName: '', city: '', venue: '', coverImage: '', description: '', isFeatured: false, tags: '' });
      fetchPortfolio();
    } catch (err) {
      addToast({ title: 'Error', message: err.message, type: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this portfolio story?')) return;
    try {
      await api.delete(`/portfolio/${id}`);
      setItems((prev) => prev.filter((i) => i._id !== id));
      addToast({ title: 'Deleted', message: 'Portfolio story removed.', type: 'success' });
    } catch (err) {
      addToast({ title: 'Error', message: err.message, type: 'error' });
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold block">
            Media Management
          </span>
          <h1 className="font-serif text-3xl font-bold text-white">Public Portfolio CMS</h1>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-5 py-2.5 rounded-full bg-gold-gradient text-black font-bold text-xs uppercase tracking-wider shadow-gold-subtle flex items-center"
        >
          <Plus className="w-4 h-4 mr-1.5" /> Publish New Story
        </button>
      </div>

      {/* Portfolio Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((item) => (
          <div key={item._id} className="luxury-card rounded-2xl overflow-hidden border border-white/10 flex flex-col justify-between">
            <div className="relative aspect-[16/10] bg-obsidian-300 overflow-hidden">
              <img src={item.coverImage} alt={item.title} className="w-full h-full object-cover" />
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-0.5 rounded-full bg-black/80 text-[10px] text-gold-300 uppercase tracking-wider font-mono">
                  {item.category}
                </span>
              </div>
              {item.isFeatured && (
                <div className="absolute top-3 right-3">
                  <span className="px-2 py-0.5 rounded-full bg-gold-500 text-black text-[9px] font-bold uppercase tracking-wider">
                    Featured
                  </span>
                </div>
              )}
            </div>

            <div className="p-5 space-y-2">
              <h3 className="font-serif text-lg font-bold text-white line-clamp-1">{item.title}</h3>
              <p className="text-xs text-neutral-400 line-clamp-2">{item.description}</p>
              <span className="text-[11px] text-gold-400 font-mono block">{item.location?.city} • {item.coupleName}</span>
            </div>

            <div className="p-4 border-t border-white/5 flex justify-end space-x-2">
              <button
                onClick={() => handleDelete(item._id)}
                className="p-2 rounded-lg bg-red-950/40 text-red-400 hover:bg-red-900/50 border border-red-900/30"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Publish Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-obsidian-400 border border-gold-500/40 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6 animate-fade-in max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="font-serif text-xl font-bold text-white">Publish Portfolio Story</h3>
              <button onClick={() => setModalOpen(false)} className="text-neutral-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePortfolio} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="text-neutral-300 uppercase font-semibold">Story Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Royal Union at City Palace, Udaipur"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full bg-obsidian-500 border border-white/15 rounded-xl px-4 py-2.5 text-white focus:border-gold-400 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-neutral-300 uppercase font-semibold">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full bg-obsidian-500 border border-white/15 rounded-xl px-3 py-2.5 text-white focus:outline-none"
                  >
                    <option value="wedding">Royal Wedding</option>
                    <option value="pre-wedding">Pre-Wedding</option>
                    <option value="destination-wedding">Destination Wedding</option>
                    <option value="films">Wedding Films</option>
                    <option value="couple-shoot">Couple Shoot</option>
                    <option value="bridal">Bridal Couture</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-neutral-300 uppercase font-semibold">Couple Names</label>
                  <input
                    type="text"
                    placeholder="e.g. Aarav & Ananya"
                    value={form.coupleName}
                    onChange={(e) => setForm({ ...form, coupleName: e.target.value })}
                    className="w-full bg-obsidian-500 border border-white/15 rounded-xl px-4 py-2.5 text-white focus:border-gold-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-neutral-300 uppercase font-semibold">City</label>
                  <input
                    type="text"
                    placeholder="Udaipur"
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    className="w-full bg-obsidian-500 border border-white/15 rounded-xl px-4 py-2.5 text-white focus:border-gold-400 focus:outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-neutral-300 uppercase font-semibold">Venue</label>
                  <input
                    type="text"
                    placeholder="The Oberoi Udaivilas"
                    value={form.venue}
                    onChange={(e) => setForm({ ...form, venue: e.target.value })}
                    className="w-full bg-obsidian-500 border border-white/15 rounded-xl px-4 py-2.5 text-white focus:border-gold-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Cloudinary Cover Image */}
              <div className="space-y-1.5">
                <label className="text-neutral-300 uppercase font-semibold">Cover Image URL (or Cloudinary Upload) *</label>
                <input
                  type="url"
                  required
                  placeholder="https://images.unsplash.com/... or Cloudinary URL"
                  value={form.coverImage}
                  onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
                  className="w-full bg-obsidian-500 border border-white/15 rounded-xl px-4 py-2.5 text-white focus:border-gold-400 focus:outline-none font-mono text-[11px]"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="text-xs text-neutral-400 file:mr-2 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:bg-gold-500 file:text-black hover:file:bg-gold-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-neutral-300 uppercase font-semibold">Description</label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Atmospheric narrative and artistic notes..."
                  className="w-full bg-obsidian-500 border border-white/15 rounded-xl p-3 text-white focus:border-gold-400 focus:outline-none"
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="featuredCheck"
                  checked={form.isFeatured}
                  onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
                  className="accent-gold-500"
                />
                <label htmlFor="featuredCheck" className="text-neutral-300">Feature on Homepage Showcase</label>
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-full border border-white/15 text-neutral-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2 rounded-full bg-gold-gradient text-black font-bold uppercase tracking-wider"
                >
                  {submitting ? 'Publishing...' : 'Publish to Portfolio'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPortfolio;
