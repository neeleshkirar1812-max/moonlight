import React, { useState, useEffect } from 'react';
import api from '../../api/client';
import { useNotification } from '../../context/NotificationContext';
import { Briefcase, Plus, Trash2, X } from 'lucide-react';

const AdminCareers = () => {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const { addToast } = useNotification();

  const [form, setForm] = useState({
    title: '',
    department: 'Photography',
    location: 'Mumbai / On-Location Worldwide',
    jobType: 'Full-Time',
    experienceRequired: '3+ Years',
    description: '',
    salaryRange: '₹10,00,000 – ₹16,00,000 / Year',
  });

  const fetchCareers = async () => {
    setLoading(true);
    try {
      const res = await api.get('/careers');
      setCareers(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCareers();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post('/careers', form);
      addToast({ title: 'Position Published', message: 'Career opening is now live.', type: 'success' });
      setModalOpen(false);
      setForm({ title: '', department: 'Photography', location: 'Mumbai', jobType: 'Full-Time', experienceRequired: '', description: '', salaryRange: '' });
      fetchCareers();
    } catch (err) {
      addToast({ title: 'Error', message: err.message, type: 'error' });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete position?')) return;
    try {
      await api.delete(`/careers/${id}`);
      setCareers((prev) => prev.filter((c) => c._id !== id));
      addToast({ title: 'Deleted', message: 'Position removed.', type: 'success' });
    } catch (err) {
      addToast({ title: 'Error', message: err.message, type: 'error' });
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold block">
            Talent Acquisition
          </span>
          <h1 className="font-serif text-3xl font-bold text-white">Careers & Job Openings</h1>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-5 py-2.5 rounded-full bg-gold-gradient text-black font-bold text-xs uppercase tracking-wider shadow-gold-subtle flex items-center"
        >
          <Plus className="w-4 h-4 mr-1.5" /> Post New Vacancy
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {careers.map((c) => (
          <div key={c._id} className="luxury-card rounded-2xl p-6 border border-white/10 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-gold-500/20 text-gold-300 text-[10px] font-mono uppercase">
                  {c.department}
                </span>
                <span className="text-[11px] text-neutral-400 font-mono">{c.jobType}</span>
              </div>
              <h3 className="font-serif text-xl font-bold text-white">{c.title}</h3>
              <p className="text-xs text-neutral-300 line-clamp-2 leading-relaxed">{c.description}</p>
              <p className="text-xs text-gold-400 font-mono pt-1">{c.salaryRange}</p>
            </div>

            <div className="pt-4 border-t border-white/5 flex justify-end">
              <button
                onClick={() => handleDelete(c._id)}
                className="p-2 rounded-lg bg-red-950/40 text-red-400 hover:bg-red-900/50 border border-red-900/30"
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
              <h3 className="font-serif text-xl font-bold text-white">Post New Vacancy</h3>
              <button onClick={() => setModalOpen(false)} className="text-neutral-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>

            <form onSubmit={handleCreate} className="space-y-3">
              <div>
                <label className="text-neutral-300 block mb-1">Position Title *</label>
                <input
                  type="text"
                  required
                  placeholder="Lead Cinematographer"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full bg-obsidian-500 border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-neutral-300 block mb-1">Department</label>
                  <select
                    value={form.department}
                    onChange={(e) => setForm({ ...form, department: e.target.value })}
                    className="w-full bg-obsidian-500 border border-white/15 rounded-xl px-2.5 py-2 text-white"
                  >
                    <option value="Photography">Photography</option>
                    <option value="Cinematography">Cinematography</option>
                    <option value="Post-Production">Post-Production</option>
                    <option value="Production & Client Relations">Production</option>
                  </select>
                </div>
                <div>
                  <label className="text-neutral-300 block mb-1">Job Type</label>
                  <select
                    value={form.jobType}
                    onChange={(e) => setForm({ ...form, jobType: e.target.value })}
                    className="w-full bg-obsidian-500 border border-white/15 rounded-xl px-2.5 py-2 text-white"
                  >
                    <option value="Full-Time">Full-Time</option>
                    <option value="Part-Time">Part-Time</option>
                    <option value="Freelance / Contract">Contract</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-neutral-300 block mb-1">Salary / Compensation</label>
                <input
                  type="text"
                  value={form.salaryRange}
                  onChange={(e) => setForm({ ...form, salaryRange: e.target.value })}
                  className="w-full bg-obsidian-500 border border-white/15 rounded-xl px-3 py-2 text-white font-mono"
                />
              </div>

              <div>
                <label className="text-neutral-300 block mb-1">Description *</label>
                <textarea
                  rows={3}
                  required
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full bg-obsidian-500 border border-white/15 rounded-xl p-2 text-white"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-white/10">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 rounded-full border border-white/15 text-neutral-300">Cancel</button>
                <button type="submit" className="px-6 py-2 rounded-full bg-gold-gradient text-black font-bold uppercase">Post Opening</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCareers;
