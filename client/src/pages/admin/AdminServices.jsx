import React, { useState, useEffect } from 'react';
import api from '../../api/client';
import { useNotification } from '../../context/NotificationContext';
import { FileCheck, Plus, Trash2, Edit3, X, CheckCircle2, Sparkles } from 'lucide-react';

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const { addToast } = useNotification();

  const [form, setForm] = useState({
    title: '',
    shortDescription: '',
    fullDescription: '',
    startingPrice: 150000,
    coverImage: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
    features: '',
    deliverables: '',
  });

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await api.get('/services');
      setServices(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleCreateService = async (e) => {
    e.preventDefault();
    try {
      await api.post('/services', {
        ...form,
        startingPrice: Number(form.startingPrice),
        features: form.features.split('\n').filter((f) => f.trim() !== ''),
        deliverables: form.deliverables.split('\n').filter((d) => d.trim() !== ''),
      });
      addToast({ title: 'Service Published', message: 'Service tier created.', type: 'success' });
      setModalOpen(false);
      setForm({ title: '', shortDescription: '', fullDescription: '', startingPrice: 150000, coverImage: '', features: '', deliverables: '' });
      fetchServices();
    } catch (err) {
      addToast({ title: 'Error', message: err.message, type: 'error' });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete service tier?')) return;
    try {
      await api.delete(`/services/${id}`);
      setServices((prev) => prev.filter((s) => s._id !== id));
      addToast({ title: 'Deleted', message: 'Service tier removed.', type: 'success' });
    } catch (err) {
      addToast({ title: 'Error', message: err.message, type: 'error' });
    }
  };

  return (
    <div className="space-y-8 animate-fade-in text-neutral-900">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-900/10 pb-6">
        <div>
          <span className="text-xs uppercase tracking-widest text-amber-700 font-bold block">
            Offerings Configuration
          </span>
          <h1 className="font-serif text-3xl font-bold text-neutral-900 mt-1">Services & Pricing Tiers</h1>
          <p className="text-neutral-600 text-xs font-light mt-1">
            Configure custom luxury packages, cinematographic deliverables, and base investment rates.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-5 py-2.5 rounded-full bg-gold-gradient text-neutral-950 font-bold text-xs uppercase tracking-wider shadow-gold-subtle hover:scale-105 transition-all flex items-center self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 mr-1.5" /> Create Service Tier
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-64 rounded-2xl bg-stone-100 animate-pulse border border-stone-200" />
          ))}
        </div>
      ) : services.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-amber-900/15 space-y-3 shadow-sm">
          <FileCheck className="w-8 h-8 text-amber-600 mx-auto opacity-70" />
          <h3 className="font-serif text-xl text-neutral-900 font-bold">No Service Tiers Found</h3>
          <p className="text-xs text-neutral-500">Add a new wedding package tier above.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((srv) => (
            <div key={srv._id} className="bg-white rounded-2xl p-6 border border-amber-900/15 hover:border-amber-500/40 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="text-[10px] uppercase font-mono text-amber-800 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  Starting at ₹{srv.startingPrice?.toLocaleString('en-IN')}
                </span>
                <h3 className="font-serif text-xl font-bold text-neutral-900">{srv.title}</h3>
                <p className="text-xs text-neutral-600 line-clamp-3 leading-relaxed">{srv.shortDescription}</p>
              </div>

              <div className="pt-4 border-t border-stone-100 flex justify-end space-x-2">
                <button
                  onClick={() => handleDelete(srv._id)}
                  className="p-2 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 transition-colors"
                  title="Delete Service"
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
          <div className="bg-white border border-amber-900/20 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4 animate-fade-in max-h-[90vh] overflow-y-auto text-xs text-neutral-900">
            <div className="flex items-center justify-between pb-3 border-b border-amber-900/10">
              <h3 className="font-serif text-xl font-bold text-neutral-900">Create Service Tier</h3>
              <button onClick={() => setModalOpen(false)} className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-neutral-600 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateService} className="space-y-3">
              <div>
                <label className="text-neutral-700 font-bold block mb-1">Service Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Royal Wedding Photography"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-neutral-900 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/30"
                />
              </div>

              <div>
                <label className="text-neutral-700 font-bold block mb-1 font-mono">Starting Price (INR) *</label>
                <input
                  type="number"
                  required
                  value={form.startingPrice}
                  onChange={(e) => setForm({ ...form, startingPrice: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-neutral-900 font-mono focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/30"
                />
              </div>

              <div>
                <label className="text-neutral-700 font-bold block mb-1">Short Summary *</label>
                <textarea
                  rows={2}
                  required
                  value={form.shortDescription}
                  onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 text-neutral-900 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/30"
                />
              </div>

              <div>
                <label className="text-neutral-700 font-bold block mb-1">Inclusions (One per line)</label>
                <textarea
                  rows={3}
                  placeholder="2 Master Photographers&#10;Full Color Graded Gallery&#10;Online Cloud Proofing"
                  value={form.features}
                  onChange={(e) => setForm({ ...form, features: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 text-neutral-900 focus:border-amber-500 focus:outline-none font-mono text-[11px]"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-stone-200">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 rounded-full border border-stone-300 text-neutral-600 hover:text-neutral-900 hover:bg-stone-50 font-semibold transition-colors">Cancel</button>
                <button type="submit" className="px-6 py-2.5 rounded-full bg-gold-gradient text-neutral-950 font-bold uppercase tracking-wider shadow-gold-subtle hover:scale-105 transition-all">Save Service</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminServices;
