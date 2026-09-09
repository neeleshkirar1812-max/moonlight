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
    <div className="space-y-8 animate-fade-in text-neutral-900">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-900/10 pb-6">
        <div>
          <span className="text-xs uppercase tracking-widest text-amber-700 font-bold block">
            Media Management
          </span>
          <h1 className="font-serif text-3xl font-bold text-neutral-900 mt-1">Public Portfolio CMS</h1>
          <p className="text-neutral-600 text-xs font-light mt-1">
            Manage public portfolio stories, categories, featured films, and high-resolution galleries.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-5 py-2.5 rounded-full bg-gold-gradient text-neutral-950 font-bold text-xs uppercase tracking-wider shadow-gold-subtle flex items-center hover:scale-105 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 mr-1.5" /> Publish New Story
        </button>
      </div>

      {/* Portfolio Items Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-72 rounded-2xl bg-stone-100 animate-pulse border border-stone-200" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-amber-900/15 space-y-3 shadow-sm">
          <Image className="w-8 h-8 text-amber-600 mx-auto opacity-70" />
          <h3 className="font-serif text-xl text-neutral-900 font-bold">No Portfolio Stories Found</h3>
          <p className="text-xs text-neutral-500">Publish your first royal wedding story above.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item) => (
            <div key={item._id} className="bg-white rounded-2xl overflow-hidden border border-amber-900/15 hover:border-amber-500/40 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div className="relative aspect-[16/10] bg-stone-100 overflow-hidden">
                <img src={item.coverImage} alt={item.title} className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-sm text-[10px] text-amber-900 uppercase tracking-wider font-mono font-bold shadow-sm">
                    {item.category}
                  </span>
                </div>
                {item.isFeatured && (
                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-0.5 rounded-full bg-gold-gradient text-neutral-950 text-[9px] font-bold uppercase tracking-wider shadow-sm">
                      Featured
                    </span>
                  </div>
                )}
              </div>

              <div className="p-5 space-y-2">
                <h3 className="font-serif text-lg font-bold text-neutral-900 line-clamp-1">{item.title}</h3>
                <p className="text-xs text-neutral-600 line-clamp-2">{item.description}</p>
                <span className="text-[11px] text-amber-800 font-mono block font-semibold">{item.location?.city} • {item.coupleName}</span>
              </div>

              <div className="p-4 border-t border-amber-900/10 flex justify-end space-x-2">
                <button
                  onClick={() => handleDelete(item._id)}
                  className="p-2 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 transition-colors"
                  title="Delete Story"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Publish Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-amber-900/20 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6 animate-fade-in max-h-[90vh] overflow-y-auto text-neutral-900">
            <div className="flex items-center justify-between pb-3 border-b border-amber-900/10">
              <h3 className="font-serif text-xl font-bold text-neutral-900">Publish Portfolio Story</h3>
              <button onClick={() => setModalOpen(false)} className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-neutral-600 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreatePortfolio} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="text-neutral-700 uppercase font-bold text-[11px]">Story Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Royal Union at City Palace, Udaipur"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-neutral-900 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/30"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-neutral-700 uppercase font-bold text-[11px]">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2.5 text-neutral-900 focus:border-amber-500 focus:outline-none"
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
                  <label className="text-neutral-700 uppercase font-bold text-[11px]">Couple Names</label>
                  <input
                    type="text"
                    placeholder="e.g. Aarav & Ananya"
                    value={form.coupleName}
                    onChange={(e) => setForm({ ...form, coupleName: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-neutral-900 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/30"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-neutral-700 uppercase font-bold text-[11px]">City</label>
                  <input
                    type="text"
                    placeholder="Udaipur"
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-neutral-900 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/30"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-neutral-700 uppercase font-bold text-[11px]">Venue</label>
                  <input
                    type="text"
                    placeholder="The Oberoi Udaivilas"
                    value={form.venue}
                    onChange={(e) => setForm({ ...form, venue: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-neutral-900 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/30"
                  />
                </div>
              </div>

              {/* Cloudinary Cover Image */}
              <div className="space-y-1.5">
                <label className="text-neutral-700 uppercase font-bold text-[11px]">Cover Image URL (or Cloudinary Upload) *</label>
                <input
                  type="url"
                  required
                  placeholder="https://images.unsplash.com/... or Cloudinary URL"
                  value={form.coverImage}
                  onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-neutral-900 focus:border-amber-500 focus:outline-none font-mono text-[11px]"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="text-xs text-neutral-600 file:mr-2 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:bg-amber-100 file:text-amber-900 hover:file:bg-amber-200"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-neutral-700 uppercase font-bold text-[11px]">Description</label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Atmospheric narrative and artistic notes..."
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3 text-neutral-900 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/30"
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="featuredCheck"
                  checked={form.isFeatured}
                  onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
                  className="accent-amber-600 w-4 h-4 rounded"
                />
                <label htmlFor="featuredCheck" className="text-neutral-700 font-semibold cursor-pointer">Feature on Homepage Showcase</label>
              </div>

              <div className="pt-4 border-t border-stone-200 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-full border border-stone-300 text-neutral-600 hover:text-neutral-900 hover:bg-stone-50 font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2 rounded-full bg-gold-gradient text-neutral-950 font-bold uppercase tracking-wider shadow-gold-subtle hover:scale-105 transition-all"
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
