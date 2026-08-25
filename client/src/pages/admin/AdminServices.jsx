import React, { useState, useEffect } from 'react';
import api from '../../api/client';
import { useNotification } from '../../context/NotificationContext';
import { FileCheck, Plus, Trash2, Edit3, X, CheckCircle2 } from 'lucide-react';

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
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold block">
            Offerings Configuration
          </span>
          <h1 className="font-serif text-3xl font-bold text-white">Services & Pricing Tiers</h1>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-5 py-2.5 rounded-full bg-gold-gradient text-black font-bold text-xs uppercase tracking-wider shadow-gold-subtle flex items-center"
        >
          <Plus className="w-4 h-4 mr-1.5" /> Create Service Tier
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((srv) => (
          <div key={srv._id} className="luxury-card rounded-2xl p-6 border border-white/10 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-mono text-gold-400">Starting at ₹{srv.startingPrice?.toLocaleString('en-IN')}</span>
              <h3 className="font-serif text-xl font-bold text-white">{srv.title}</h3>
              <p className="text-xs text-neutral-300 line-clamp-3 leading-relaxed">{srv.shortDescription}</p>
            </div>

            <div className="pt-4 border-t border-white/5 flex justify-end space-x-2">
              <button
                onClick={() => handleDelete(srv._id)}
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
          <div className="bg-obsidian-400 border border-gold-500/40 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4 animate-fade-in max-h-[90vh] overflow-y-auto text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="font-serif text-xl font-bold text-white">Create Service Tier</h3>
              <button onClick={() => setModalOpen(false)} className="text-neutral-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>

            <form onSubmit={handleCreateService} className="space-y-3">
              <div>
                <label className="text-neutral-300 block mb-1">Service Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Royal Wedding Photography"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full bg-obsidian-500 border border-white/15 rounded-xl px-3 py-2 text-white focus:border-gold-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-neutral-300 block mb-1">Starting Price (INR) *</label>
                <input
                  type="number"
                  required
                  value={form.startingPrice}
                  onChange={(e) => setForm({ ...form, startingPrice: e.target.value })}
                  className="w-full bg-obsidian-500 border border-white/15 rounded-xl px-3 py-2 text-white font-mono focus:outline-none"
                />
              </div>

              <div>
                <label className="text-neutral-300 block mb-1">Short Summary *</label>
                <textarea
                  rows={2}
                  required
                  value={form.shortDescription}
                  onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
                  className="w-full bg-obsidian-500 border border-white/15 rounded-xl p-2 text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="text-neutral-300 block mb-1">Inclusions (One per line)</label>
                <textarea
                  rows={3}
                  placeholder="2 Master Photographers&#10;Full Color Graded Gallery&#10;Online Cloud Proofing"
                  value={form.features}
                  onChange={(e) => setForm({ ...form, features: e.target.value })}
                  className="w-full bg-obsidian-500 border border-white/15 rounded-xl p-2 text-white focus:outline-none font-mono text-[11px]"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-white/10">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 rounded-full border border-white/15 text-neutral-300">Cancel</button>
                <button type="submit" className="px-6 py-2 rounded-full bg-gold-gradient text-black font-bold uppercase">Save Service</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminServices;
