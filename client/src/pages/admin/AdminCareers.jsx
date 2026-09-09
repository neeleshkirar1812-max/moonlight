import React, { useState, useEffect } from 'react';
import api from '../../api/client';
import { useNotification } from '../../context/NotificationContext';
import { Briefcase, Plus, Trash2, X, Sparkles } from 'lucide-react';

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
    <div className="space-y-8 animate-fade-in text-neutral-900">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-900/10 pb-6">
        <div>
          <span className="text-xs uppercase tracking-widest text-amber-700 font-bold block">
            Talent Acquisition
          </span>
          <h1 className="font-serif text-3xl font-bold text-neutral-900 mt-1">Careers & Job Openings</h1>
          <p className="text-neutral-600 text-xs font-light mt-1">
            Publish open crew positions for cinematographers, directors, editors, and drone pilots.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-5 py-2.5 rounded-full bg-gold-gradient text-neutral-950 font-bold text-xs uppercase tracking-wider shadow-gold-subtle hover:scale-105 transition-all flex items-center self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 mr-1.5" /> Post New Vacancy
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map((n) => (
            <div key={n} className="h-64 rounded-2xl bg-stone-100 animate-pulse border border-stone-200" />
          ))}
        </div>
      ) : careers.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-amber-900/15 space-y-3 shadow-sm">
          <Briefcase className="w-8 h-8 text-amber-600 mx-auto opacity-70" />
          <h3 className="font-serif text-xl text-neutral-900 font-bold">No Job Openings Found</h3>
          <p className="text-xs text-neutral-500">Post a new talent recruitment vacancy above.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {careers.map((c) => (
            <div key={c._id} className="bg-white rounded-2xl p-6 border border-amber-900/15 hover:border-amber-500/40 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-[10px] font-mono font-bold uppercase">
                    {c.department}
                  </span>
                  <span className="text-[11px] text-neutral-500 font-mono font-semibold">{c.jobType}</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-neutral-900">{c.title}</h3>
                <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">{c.description}</p>
                <p className="text-xs text-amber-800 font-mono font-bold pt-1">{c.salaryRange}</p>
              </div>

              <div className="pt-4 border-t border-stone-100 flex justify-end">
                <button
                  onClick={() => handleDelete(c._id)}
                  className="p-2 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 transition-colors"
                  title="Delete Position"
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
              <h3 className="font-serif text-xl font-bold text-neutral-900">Post New Vacancy</h3>
              <button onClick={() => setModalOpen(false)} className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-neutral-600 transition-colors"><X className="w-4 h-4" /></button>
            </div>

            <form onSubmit={handleCreate} className="space-y-3">
              <div>
                <label className="text-neutral-700 font-bold block mb-1">Position Title *</label>
                <input
                  type="text"
                  required
                  placeholder="Lead Cinematographer"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-neutral-900 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/30"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-neutral-700 font-bold block mb-1">Department</label>
                  <select
                    value={form.department}
                    onChange={(e) => setForm({ ...form, department: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-2.5 py-2 text-neutral-900 focus:border-amber-500 focus:outline-none"
                  >
                    <option value="Photography">Photography</option>
                    <option value="Cinematography">Cinematography</option>
                    <option value="Post-Production">Post-Production</option>
                    <option value="Production & Client Relations">Production</option>
                  </select>
                </div>
                <div>
                  <label className="text-neutral-700 font-bold block mb-1">Job Type</label>
                  <select
                    value={form.jobType}
                    onChange={(e) => setForm({ ...form, jobType: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-2.5 py-2 text-neutral-900 focus:border-amber-500 focus:outline-none"
                  >
                    <option value="Full-Time">Full-Time</option>
                    <option value="Part-Time">Part-Time</option>
                    <option value="Freelance / Contract">Contract</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-neutral-700 font-bold block mb-1 font-mono">Salary / Compensation</label>
                <input
                  type="text"
                  value={form.salaryRange}
                  onChange={(e) => setForm({ ...form, salaryRange: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-neutral-900 font-mono focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/30"
                />
              </div>

              <div>
                <label className="text-neutral-700 font-bold block mb-1">Description *</label>
                <textarea
                  rows={3}
                  required
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 text-neutral-900 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/30"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-stone-200">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 rounded-full border border-stone-300 text-neutral-600 hover:text-neutral-900 hover:bg-stone-50 font-semibold transition-colors">Cancel</button>
                <button type="submit" className="px-6 py-2.5 rounded-full bg-gold-gradient text-neutral-950 font-bold uppercase tracking-wider shadow-gold-subtle hover:scale-105 transition-all">Post Opening</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCareers;
