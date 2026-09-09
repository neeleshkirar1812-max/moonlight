import React, { useState, useEffect } from 'react';
import api from '../../api/client';
import { useNotification } from '../../context/NotificationContext';
import { Star, Plus, Trash2, X, MessageSquareQuote } from 'lucide-react';

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
    <div className="space-y-8 animate-fade-in text-neutral-900">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-900/10 pb-6">
        <div>
          <span className="text-xs uppercase tracking-widest text-amber-700 font-bold block">
            Social Proof
          </span>
          <h1 className="font-serif text-3xl font-bold text-neutral-900 mt-1">Client Reviews & Testimonials</h1>
          <p className="text-neutral-600 text-xs font-light mt-1">
            Display genuine royal wedding couples' heartfelt reviews and five-star rating endorsements.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-5 py-2.5 rounded-full bg-gold-gradient text-neutral-950 font-bold text-xs uppercase tracking-wider shadow-gold-subtle hover:scale-105 transition-all flex items-center self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 mr-1.5" /> Add New Review
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-64 rounded-2xl bg-stone-100 animate-pulse border border-stone-200" />
          ))}
        </div>
      ) : testimonials.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-amber-900/15 space-y-3 shadow-sm">
          <MessageSquareQuote className="w-8 h-8 text-amber-600 mx-auto opacity-70" />
          <h3 className="font-serif text-xl text-neutral-900 font-bold">No Client Reviews Found</h3>
          <p className="text-xs text-neutral-500">Add a client review endorsement above.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((test) => (
            <div key={test._id} className="bg-white rounded-2xl p-6 border border-amber-900/15 hover:border-amber-500/40 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-1 text-amber-500">
                  {Array.from({ length: test.rating || 5 }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <p className="text-xs text-neutral-700 italic leading-relaxed">"{test.quote}"</p>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <img src={test.avatar} alt={test.clientName} className="w-8 h-8 rounded-full object-cover border border-amber-300 shadow-sm" />
                  <div>
                    <h4 className="text-xs font-bold text-neutral-900">{test.clientName}</h4>
                    <span className="text-[10px] text-amber-800 font-mono">{test.location}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleDelete(test._id)}
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-rose-600 transition-colors"
                  title="Delete Review"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-amber-900/20 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4 animate-fade-in text-xs text-neutral-900">
            <div className="flex items-center justify-between pb-3 border-b border-amber-900/10">
              <h3 className="font-serif text-xl font-bold text-neutral-900">Add Client Review</h3>
              <button onClick={() => setModalOpen(false)} className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-neutral-600 transition-colors"><X className="w-4 h-4" /></button>
            </div>

            <form onSubmit={handleCreate} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-neutral-700 font-bold block mb-1">Couple Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Aarav & Ananya"
                    value={form.clientName}
                    onChange={(e) => setForm({ ...form, clientName: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-neutral-900 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/30"
                  />
                </div>
                <div>
                  <label className="text-neutral-700 font-bold block mb-1">Location *</label>
                  <input
                    type="text"
                    required
                    placeholder="Udaipur"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-neutral-900 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/30"
                  />
                </div>
              </div>

              <div>
                <label className="text-neutral-700 font-bold block mb-1">Review Quote *</label>
                <textarea
                  rows={4}
                  required
                  value={form.quote}
                  onChange={(e) => setForm({ ...form, quote: e.target.value })}
                  placeholder="Share the client praise and emotional words..."
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 text-neutral-900 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/30"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-stone-200">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 rounded-full border border-stone-300 text-neutral-600 hover:text-neutral-900 hover:bg-stone-50 font-semibold transition-colors">Cancel</button>
                <button type="submit" className="px-6 py-2.5 rounded-full bg-gold-gradient text-neutral-950 font-bold uppercase tracking-wider shadow-gold-subtle hover:scale-105 transition-all">Save Review</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTestimonials;
