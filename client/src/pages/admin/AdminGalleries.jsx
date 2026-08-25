import React, { useState, useEffect } from 'react';
import api from '../../api/client';
import { useNotification } from '../../context/NotificationContext';
import { FolderLock, Plus, UploadCloud, Lock, Sparkles, Image as ImageIcon, CheckCircle2, X } from 'lucide-react';

const AdminGalleries = () => {
  const [galleries, setGalleries] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [selectedGallery, setSelectedGallery] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const { addToast } = useNotification();

  const [galleryForm, setGalleryForm] = useState({
    title: '',
    customer: '',
    booking: '',
    coverImage: '',
    accessPin: '2026',
    watermarked: false,
    downloadAllowed: true,
  });

  const [itemBatch, setItemBatch] = useState([
    { url: '', title: '', section: 'Highlights' },
  ]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [gRes, cRes, bRes] = await Promise.allSettled([
        api.get('/galleries'),
        api.get('/admin/customers'),
        api.get('/bookings'),
      ]);
      if (gRes.status === 'fulfilled') setGalleries(gRes.value.data || []);
      if (cRes.status === 'fulfilled') setCustomers(cRes.value.data || []);
      if (bRes.status === 'fulfilled') setBookings(bRes.value.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateGallery = async (e) => {
    e.preventDefault();
    if (!galleryForm.title || !galleryForm.customer) {
      addToast({ title: 'Fields Required', message: 'Please select customer and provide album title.', type: 'warning' });
      return;
    }

    setSubmitting(true);
    try {
      await api.post('/galleries', galleryForm);
      addToast({ title: 'Album Created', message: 'Private client gallery album provisioned.', type: 'success' });
      setCreateModalOpen(false);
      setGalleryForm({ title: '', customer: '', booking: '', coverImage: '', accessPin: '2026', watermarked: false, downloadAllowed: true });
      fetchData();
    } catch (err) {
      addToast({ title: 'Error', message: err.message, type: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleAddItems = async (e) => {
    e.preventDefault();
    const validItems = itemBatch.filter((i) => i.url.trim() !== '');
    if (validItems.length === 0) {
      addToast({ title: 'No URLs', message: 'Please enter at least one photo URL.', type: 'warning' });
      return;
    }

    try {
      await api.post(`/galleries/${selectedGallery._id}/items`, { items: validItems });
      addToast({ title: 'Photos Added', message: `Added ${validItems.length} photos to client album.`, type: 'success' });
      setUploadModalOpen(false);
      setItemBatch([{ url: '', title: '', section: 'Highlights' }]);
      fetchData();
    } catch (err) {
      addToast({ title: 'Error', message: err.message, type: 'error' });
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold block">
            Private Client Media
          </span>
          <h1 className="font-serif text-3xl font-bold text-white">Private Wedding Galleries</h1>
        </div>

        <button
          onClick={() => setCreateModalOpen(true)}
          className="px-5 py-2.5 rounded-full bg-gold-gradient text-black font-bold text-xs uppercase tracking-wider shadow-gold-subtle flex items-center"
        >
          <Plus className="w-4 h-4 mr-1.5" /> Create Client Album
        </button>
      </div>

      {/* Galleries Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleries.map((gal) => (
          <div key={gal._id} className="luxury-card rounded-2xl overflow-hidden border border-white/10 flex flex-col justify-between">
            <div className="relative aspect-[16/10] bg-obsidian-300 overflow-hidden">
              <img src={gal.coverImage} alt={gal.title} className="w-full h-full object-cover" />
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-0.5 rounded-full bg-black/80 text-[10px] text-gold-300 uppercase tracking-wider font-mono flex items-center">
                  <Lock className="w-3 h-3 mr-1 text-gold-400" /> PIN: {gal.accessPin}
                </span>
              </div>
            </div>

            <div className="p-5 space-y-2">
              <h3 className="font-serif text-lg font-bold text-white line-clamp-1">{gal.title}</h3>
              <p className="text-xs text-neutral-400 font-mono">
                Client: {gal.customer?.name} ({gal.customer?.email})
              </p>
              <div className="flex items-center space-x-3 text-xs text-neutral-300 pt-1">
                <span>{gal.totalPhotos || 0} Photos</span>
                <span>•</span>
                <span>Watermark: {gal.watermarked ? 'Enabled' : 'Off'}</span>
              </div>
            </div>

            <div className="p-4 border-t border-white/5 flex items-center justify-between">
              <button
                onClick={() => {
                  setSelectedGallery(gal);
                  setUploadModalOpen(true);
                }}
                className="px-3.5 py-1.5 rounded-full bg-obsidian-300 hover:bg-gold-500 hover:text-black border border-white/15 text-gold-300 font-bold text-xs uppercase tracking-wider transition-all flex items-center"
              >
                <UploadCloud className="w-3.5 h-3.5 mr-1" /> Add Photos
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Gallery Modal */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-obsidian-400 border border-gold-500/40 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6 animate-fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="font-serif text-xl font-bold text-white">Create Private Album</h3>
              <button onClick={() => setCreateModalOpen(false)} className="text-neutral-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateGallery} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="text-neutral-300 uppercase font-semibold">Album Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aarav & Ananya | Udaipur Archives"
                  value={galleryForm.title}
                  onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                  className="w-full bg-obsidian-500 border border-white/15 rounded-xl px-4 py-2.5 text-white focus:border-gold-400 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-neutral-300 uppercase font-semibold">Assign Client *</label>
                <select
                  required
                  value={galleryForm.customer}
                  onChange={(e) => setGalleryForm({ ...galleryForm, customer: e.target.value })}
                  className="w-full bg-obsidian-500 border border-white/15 rounded-xl px-3 py-2.5 text-white focus:outline-none"
                >
                  <option value="">Select Customer</option>
                  {customers.map((c) => (
                    <option key={c._id} value={c.user?._id || c._id}>
                      {c.user?.name || c.name} ({c.user?.email || c.email})
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-neutral-300 uppercase font-semibold">Cover Image URL *</label>
                <input
                  type="url"
                  required
                  placeholder="https://images.unsplash.com/..."
                  value={galleryForm.coverImage}
                  onChange={(e) => setGalleryForm({ ...galleryForm, coverImage: e.target.value })}
                  className="w-full bg-obsidian-500 border border-white/15 rounded-xl px-4 py-2.5 text-white focus:border-gold-400 focus:outline-none font-mono text-[11px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-neutral-300 uppercase font-semibold">Security PIN</label>
                  <input
                    type="text"
                    value={galleryForm.accessPin}
                    onChange={(e) => setGalleryForm({ ...galleryForm, accessPin: e.target.value })}
                    className="w-full bg-obsidian-500 border border-white/15 rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>

                <div className="flex items-center space-x-2 pt-6">
                  <input
                    type="checkbox"
                    id="watermarkCheck"
                    checked={galleryForm.watermarked}
                    onChange={(e) => setGalleryForm({ ...galleryForm, watermarked: e.target.checked })}
                    className="accent-gold-500"
                  />
                  <label htmlFor="watermarkCheck" className="text-neutral-300 text-[11px]">Enable Watermark</label>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  className="px-4 py-2 rounded-full border border-white/15 text-neutral-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2 rounded-full bg-gold-gradient text-black font-bold uppercase tracking-wider"
                >
                  {submitting ? 'Creating...' : 'Create Album'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Photos to Album Modal */}
      {uploadModalOpen && selectedGallery && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-obsidian-400 border border-gold-500/40 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6 animate-fade-in max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div>
                <h3 className="font-serif text-xl font-bold text-white">Add Photos to Album</h3>
                <p className="text-xs text-gold-400">{selectedGallery.title}</p>
              </div>
              <button onClick={() => setUploadModalOpen(false)} className="text-neutral-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddItems} className="space-y-4 text-xs">
              <div className="space-y-3">
                {itemBatch.map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-obsidian-500 border border-white/10 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-gold-300">Photo {idx + 1}</span>
                      {itemBatch.length > 1 && (
                        <button
                          type="button"
                          onClick={() => setItemBatch(itemBatch.filter((_, i) => i !== idx))}
                          className="text-red-400 text-[10px]"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    <input
                      type="url"
                      required
                      placeholder="Photo Image URL (https://...)"
                      value={item.url}
                      onChange={(e) => {
                        const copy = [...itemBatch];
                        copy[idx].url = e.target.value;
                        setItemBatch(copy);
                      }}
                      className="w-full bg-obsidian-400 border border-white/15 rounded-lg px-3 py-2 text-white font-mono text-[11px]"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Caption / Title"
                        value={item.title}
                        onChange={(e) => {
                          const copy = [...itemBatch];
                          copy[idx].title = e.target.value;
                          setItemBatch(copy);
                        }}
                        className="bg-obsidian-400 border border-white/15 rounded-lg px-3 py-1.5 text-white"
                      />
                      <select
                        value={item.section}
                        onChange={(e) => {
                          const copy = [...itemBatch];
                          copy[idx].section = e.target.value;
                          setItemBatch(copy);
                        }}
                        className="bg-obsidian-400 border border-white/15 rounded-lg px-2.5 py-1.5 text-white"
                      >
                        <option value="Highlights">Highlights</option>
                        <option value="Ceremony">Ceremony</option>
                        <option value="Portraits">Portraits</option>
                        <option value="Reception">Reception</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setItemBatch([...itemBatch, { url: '', title: '', section: 'Highlights' }])}
                className="w-full py-2 rounded-xl bg-obsidian-300 border border-white/15 text-gold-300 font-semibold"
              >
                + Add Another Photo Entry
              </button>

              <div className="flex justify-end space-x-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setUploadModalOpen(false)}
                  className="px-4 py-2 rounded-full border border-white/15 text-neutral-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-gold-gradient text-black font-bold uppercase tracking-wider"
                >
                  Upload & Save Photos
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminGalleries;
