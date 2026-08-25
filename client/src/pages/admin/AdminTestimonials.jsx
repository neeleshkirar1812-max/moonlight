import React, { useState, useEffect } from 'react';
import api from '../../api/client';
import { useNotification } from '../../context/NotificationContext';
import { Star, Plus, Trash2, X } from 'lucide-react';

const AdminTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const { addToast } = useNotification();

  const [form, setForm] = useState({
    clientName: '',
    partnerName: '',
    eventType: 'Royal Palace Wedding',
    weddingDate: 'December 2025',
    location: 'Udaipur, Rajasthan',
    quote: '',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    isFeatured: true,
  });

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const res = await api.get('/testimonials');
      setTestimonials(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post('/testimonials', form);
      addToast({ title: 'Testimonial Published', message: 'Client review added.', type: 'success' });
      setModalOpen(false);
      setForm({ clientName: '', partnerName: '', eventType: 'Royal Palace Wedding', weddingDate: '', location: '', quote: '', rating: 5, avatar: '', isFeatured: true });
      fetchTestimonials();
    } catch (err) {
      addToast({ title: 'Error', message: err.message, type: 'error' });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete review?')) return;
    try {
      await api.delete(`/testimonials/${id}`);
      setTestimonials((prev) => prev.filter((t) => t._id !== id));
      addToast({ title: 'Deleted', message: 'Review removed.', type: 'success' });
    } catch (err) {
      addToast({ title: 'Error', message: err.message, type: 'error' });
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold block">
            Social Proof
          </span>
          <h1 className="font-serif text-3xl font-bold text-white">Client Reviews & Testimonials</h1>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-5 py-2.5 rounded-full bg-gold-gradient text-black font-bold text-xs uppercase tracking-wider shadow-gold-subtle flex items-center"
        >
          <Plus className="w-4 h-4 mr-1.5" /> Add New Review
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((test) => (
          <div key={test._id} className="luxury-card rounded-2xl p-6 border border-white/10 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-1 text-gold-400">
                {Array.from({ length: test.rating || 5 }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-gold-400 text-gold-400" />
                ))}
              </div>
              <p className="text-xs text-neutral-300 italic leading-relaxed">"{test.quote}"</p>
            </div>

            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <img src={test.avatar} alt={test.clientName} className="w-8 h-8 rounded-full object-cover border border-gold-500/50" />
                <div>
                  <h4 className="text-xs font-bold text-white">{test.clientName}</h4>
                  <span className="text-[10px] text-neutral-400 font-mono">{test.location}</span>
                </div>
              </div>

              <button
                onClick={() => handleDelete(test._id)}
                className="p-1.5 rounded-lg text-neutral-500 hover:text-red-400"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-obsidian-400 border border-gold-500/40 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4 animate-fade-in text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="font-serif text-xl font-bold text-white">Add Client Review</h3>
              <button onClick={() => setModalOpen(false)} className="text-neutral-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>

            <form onSubmit={handleCreate} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-neutral-300 block mb-1">Couple Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Aarav & Ananya"
                    value={form.clientName}
                    onChange={(e) => setForm({ ...form, clientName: e.target.value })}
                    className="w-full bg-obsidian-500 border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-neutral-300 block mb-1">Location *</label>
                  <input
                    type="text"
                    required
                    placeholder="Udaipur"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    className="w-full bg-obsidian-500 border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-neutral-300 block mb-1">Review Quote *</label>
                <textarea
                  rows={4}
                  required
                  value={form.quote}
                  onChange={(e) => setForm({ ...form, quote: e.target.value })}
                  placeholder="Share the client praise and emotional words..."
                  className="w-full bg-obsidian-500 border border-white/15 rounded-xl p-2.5 text-white focus:outline-none"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-white/10">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 rounded-full border border-white/15 text-neutral-300">Cancel</button>
                <button type="submit" className="px-6 py-2 rounded-full bg-gold-gradient text-black font-bold uppercase">Save Review</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTestimonials;
