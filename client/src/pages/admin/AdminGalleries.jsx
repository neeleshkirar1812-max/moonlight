import React, { useState, useEffect } from 'react';
import api from '../../api/client';
import { useNotification } from '../../context/NotificationContext';
import { FolderLock, Plus, UploadCloud, Lock, Sparkles, Image as ImageIcon, CheckCircle2, X, User, Mail, Search } from 'lucide-react';

const AdminGalleries = () => {
  const [galleries, setGalleries] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [selectedGallery, setSelectedGallery] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [search, setSearch] = useState('');
  const { addToast } = useNotification();

  const [galleryForm, setGalleryForm] = useState({
    title: '',
    clientName: '',
    clientEmail: '',
    customer: '',
    booking: '',
    coverImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    accessPin: '2026',
    watermarked: false,
    downloadAllowed: true,
  });

  const [itemBatch, setItemBatch] = useState([
    { url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80', title: 'Royal Phere & Varmala Ceremony', section: 'Ceremony' },
    { url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80', title: 'Sunset Palace Portraiture', section: 'Portraits' },
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

  // When admin selects an existing customer from dropdown, autofill
  const handleCustomerSelect = (e) => {
    const selectedId = e.target.value;
    if (!selectedId) {
      setGalleryForm({
        ...galleryForm,
        customer: '',
        clientName: '',
        clientEmail: '',
      });
      return;
    }

    const found = customers.find((c) => (c.user?._id || c._id) === selectedId);
    if (found) {
      setGalleryForm({
        ...galleryForm,
        customer: selectedId,
        clientName: found.user?.name || found.name || '',
        clientEmail: found.user?.email || found.email || '',
        title: galleryForm.title || `${found.user?.name || found.name} | Royal Wedding Archives`,
      });
    }
  };

  const handleCreateGallery = async (e) => {
    e.preventDefault();
    if (!galleryForm.title || (!galleryForm.clientName && !galleryForm.customer)) {
      addToast({ title: 'Fields Required', message: 'Please provide Client Name and Album Title.', type: 'warning' });
      return;
    }

    setSubmitting(true);
    try {
      const clientName = galleryForm.clientName || 'Valued Couple';
      const clientEmail = galleryForm.clientEmail || 'client@moonlight.com';

      const payload = {
        ...galleryForm,
        clientName: clientName,
        clientEmail: clientEmail,
        customer: {
          _id: galleryForm.customer || `cust-${Date.now()}`,
          name: clientName,
          email: clientEmail,
        },
        totalPhotos: 2,
        items: itemBatch,
      };

      const res = await api.post('/galleries', payload);
      const newGal = res.data || payload;

      setGalleries((prev) => [newGal, ...prev]);
      addToast({ title: 'Client Album Created', message: `Private gallery created for ${clientName}!`, type: 'success' });
      setCreateModalOpen(false);
      setGalleryForm({
        title: '',
        clientName: '',
        clientEmail: '',
        customer: '',
        booking: '',
        coverImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
        accessPin: '2026',
        watermarked: false,
        downloadAllowed: true,
      });
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
      
      // Update local state
      setGalleries((prev) =>
        prev.map((g) =>
          g._id === selectedGallery._id
            ? { ...g, totalPhotos: (g.totalPhotos || 0) + validItems.length }
            : g
        )
      );

      addToast({ title: 'Photos Added', message: `Added ${validItems.length} photos to album!`, type: 'success' });
      setUploadModalOpen(false);
      setItemBatch([{ url: '', title: '', section: 'Highlights' }]);
    } catch (err) {
      addToast({ title: 'Error', message: err.message, type: 'error' });
    }
  };

  const filteredGalleries = galleries.filter((gal) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    const title = (gal.title || '').toLowerCase();
    const name = (gal.clientName || gal.customer?.name || '').toLowerCase();
    const email = (gal.clientEmail || gal.customer?.email || '').toLowerCase();
    return title.includes(q) || name.includes(q) || email.includes(q);
  });

  return (
    <div className="space-y-8 animate-fade-in text-neutral-900">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-900/10 pb-6">
        <div>
          <span className="text-xs uppercase tracking-widest text-amber-700 font-bold block">
            Private Client Media
          </span>
          <h1 className="font-serif text-3xl font-bold text-neutral-900 mt-1">Private Wedding Galleries & Albums</h1>
          <p className="text-xs text-neutral-600 mt-1">
            Create password-protected high-resolution wedding archives for couples to select and download photos.
          </p>
        </div>

        <button
          onClick={() => setCreateModalOpen(true)}
          className="px-5 py-2.5 rounded-full bg-gold-gradient text-neutral-950 font-bold text-xs uppercase tracking-wider shadow-gold-subtle hover:scale-105 transition-all flex items-center shrink-0 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 mr-1.5" /> Create Client Album
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search by couple name, album title, or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white border border-amber-900/20 rounded-full pl-9 pr-4 py-2 text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30 font-mono"
        />
      </div>

      {/* Galleries Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
          <div className="h-64 rounded-2xl bg-stone-100 border border-stone-200" />
          <div className="h-64 rounded-2xl bg-stone-100 border border-stone-200" />
          <div className="h-64 rounded-2xl bg-stone-100 border border-stone-200" />
        </div>
      ) : filteredGalleries.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-amber-900/15 space-y-3 shadow-sm">
          <FolderLock className="w-8 h-8 text-amber-600 mx-auto opacity-70" />
          <h3 className="font-serif text-xl text-neutral-900 font-bold">No Client Galleries Found</h3>
          <p className="text-xs text-neutral-500">Click "Create Client Album" to provision a new wedding gallery.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGalleries.map((gal) => (
            <div key={gal._id} className="bg-white rounded-2xl overflow-hidden border border-amber-900/15 flex flex-col justify-between hover:border-amber-500/40 shadow-sm hover:shadow-md transition-all">
              <div className="relative aspect-[16/10] bg-stone-100 overflow-hidden group">
                <img src={gal.coverImage} alt={gal.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-white/95 backdrop-blur-sm text-[10px] text-amber-900 uppercase tracking-wider font-mono font-bold flex items-center border border-amber-300 shadow-sm">
                    <Lock className="w-3 h-3 mr-1 text-amber-700" /> PIN: {gal.accessPin}
                  </span>
                </div>
              </div>

              <div className="p-5 space-y-2">
                <h3 className="font-serif text-lg font-bold text-neutral-900 line-clamp-1">{gal.title}</h3>
                
                {/* Client Name Display (Always Visible & Prominent) */}
                <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 space-y-0.5">
                  <div className="flex items-center space-x-1.5 text-amber-900 font-bold text-xs">
                    <User className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                    <span className="truncate">{gal.clientName || gal.customer?.name || 'Aarav & Ananya Sharma'}</span>
                  </div>
                  <div className="flex items-center space-x-1.5 text-neutral-500 font-mono text-[10.5px]">
                    <Mail className="w-3 h-3 text-neutral-500 shrink-0" />
                    <span className="truncate">{gal.clientEmail || gal.customer?.email || 'couple@gmail.com'}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-neutral-600 pt-1 font-mono">
                  <span className="text-amber-800 font-bold">{gal.totalPhotos || 2} Photos Uploaded</span>
                  <span>Watermark: {gal.watermarked ? 'On' : 'Off'}</span>
                </div>
              </div>

              <div className="p-4 border-t border-stone-100 flex items-center justify-between bg-stone-50/50">
                <button
                  onClick={() => {
                    setSelectedGallery(gal);
                    setUploadModalOpen(true);
                  }}
                  className="px-4 py-2 rounded-full bg-gold-gradient text-neutral-950 font-bold text-xs uppercase tracking-wider shadow-gold-subtle hover:scale-105 transition-all flex items-center"
                >
                  <UploadCloud className="w-3.5 h-3.5 mr-1.5" /> + Add Photos
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Gallery Modal */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-amber-900/20 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-5 animate-fade-in text-neutral-900">
            <div className="flex items-center justify-between pb-3 border-b border-amber-900/10">
              <h3 className="font-serif text-xl font-bold text-neutral-900">Create Private Client Album</h3>
              <button onClick={() => setCreateModalOpen(false)} className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-neutral-600 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateGallery} className="space-y-4 text-xs">
              {/* Optional Quick Select */}
              <div className="space-y-1">
                <label className="text-[10.5px] uppercase font-bold text-amber-800 tracking-wider block font-mono">
                  ⚡ Auto-Fill from Registered Client (Optional)
                </label>
                <select
                  value={galleryForm.customer}
                  onChange={handleCustomerSelect}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-neutral-900 focus:outline-none focus:border-amber-500"
                >
                  <option value="">-- Choose Existing Client OR Type Below --</option>
                  {customers.map((c) => (
                    <option key={c._id} value={c.user?._id || c._id}>
                      {c.user?.name || c.name} ({c.user?.email || c.email})
                    </option>
                  ))}
                </select>
              </div>

              {/* Direct Client Name & Email Inputs (Guarantees Name is Always Present) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-2xl bg-stone-50 border border-stone-200">
                <div className="space-y-1">
                  <label className="text-neutral-700 uppercase font-bold text-[11px]">Client / Couple Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikram & Radhika"
                    value={galleryForm.clientName}
                    onChange={(e) => setGalleryForm({ ...galleryForm, clientName: e.target.value })}
                    className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-neutral-900 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/30"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-neutral-700 uppercase font-bold text-[11px]">Client Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. couple@gmail.com"
                    value={galleryForm.clientEmail}
                    onChange={(e) => setGalleryForm({ ...galleryForm, clientEmail: e.target.value })}
                    className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-neutral-900 focus:border-amber-500 focus:outline-none font-mono"
                  />
                </div>
              </div>

              {/* Album Title */}
              <div className="space-y-1.5">
                <label className="text-neutral-700 uppercase font-bold text-[11px]">Album Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vikram & Radhika | Royal Palace Archives"
                  value={galleryForm.title}
                  onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-neutral-900 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/30"
                />
              </div>

              {/* Cover Image URL */}
              <div className="space-y-1.5">
                <label className="text-neutral-700 uppercase font-bold text-[11px]">Cover Image URL *</label>
                <input
                  type="url"
                  required
                  placeholder="https://images.unsplash.com/..."
                  value={galleryForm.coverImage}
                  onChange={(e) => setGalleryForm({ ...galleryForm, coverImage: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2 text-neutral-900 focus:border-amber-500 focus:outline-none font-mono text-[11px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-neutral-700 uppercase font-bold text-[11px]">Security PIN Code</label>
                  <input
                    type="text"
                    value={galleryForm.accessPin}
                    onChange={(e) => setGalleryForm({ ...galleryForm, accessPin: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-neutral-900 font-mono focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div className="flex items-center space-x-2 pt-6">
                  <input
                    type="checkbox"
                    id="watermarkCheck"
                    checked={galleryForm.watermarked}
                    onChange={(e) => setGalleryForm({ ...galleryForm, watermarked: e.target.checked })}
                    className="accent-amber-600 w-4 h-4 rounded"
                  />
                  <label htmlFor="watermarkCheck" className="text-neutral-700 text-[11px] font-semibold cursor-pointer">
                    Enable Studio Watermark
                  </label>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  className="px-4 py-2 rounded-full border border-stone-300 text-neutral-600 hover:text-neutral-900 hover:bg-stone-50 font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 rounded-full bg-gold-gradient text-neutral-950 font-bold uppercase tracking-wider shadow-gold-subtle hover:scale-105 transition-all"
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
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-amber-900/20 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6 animate-fade-in max-h-[90vh] overflow-y-auto custom-scrollbar text-neutral-900">
            <div className="flex items-center justify-between pb-3 border-b border-amber-900/10">
              <div>
                <h3 className="font-serif text-xl font-bold text-neutral-900">Add 4K Photos to Album</h3>
                <p className="text-xs text-amber-700 font-mono">{selectedGallery.title}</p>
              </div>
              <button onClick={() => setUploadModalOpen(false)} className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-neutral-600 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddItems} className="space-y-4 text-xs">
              <div className="space-y-3">
                {itemBatch.map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-amber-900">Photo {idx + 1}</span>
                      {itemBatch.length > 1 && (
                        <button
                          type="button"
                          onClick={() => setItemBatch(itemBatch.filter((_, i) => i !== idx))}
                          className="text-rose-600 text-[10px] font-semibold hover:underline"
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
                      className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-neutral-900 font-mono text-[11px] focus:border-amber-500 focus:outline-none"
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
                        className="bg-white border border-stone-300 rounded-lg px-3 py-1.5 text-neutral-900 focus:border-amber-500 focus:outline-none"
                      />
                      <select
                        value={item.section}
                        onChange={(e) => {
                          const copy = [...itemBatch];
                          copy[idx].section = e.target.value;
                          setItemBatch(copy);
                        }}
                        className="bg-white border border-stone-300 rounded-lg px-2.5 py-1.5 text-neutral-900 focus:border-amber-500 focus:outline-none"
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
                className="w-full py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 border border-stone-300 text-amber-900 font-bold transition-colors"
              >
                + Add Another Photo Entry
              </button>

              <div className="flex justify-end space-x-3 pt-4 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setUploadModalOpen(false)}
                  className="px-4 py-2 rounded-full border border-stone-300 text-neutral-600 hover:text-neutral-900 hover:bg-stone-50 font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-gold-gradient text-neutral-950 font-bold uppercase tracking-wider shadow-gold-subtle hover:scale-105 transition-all"
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
