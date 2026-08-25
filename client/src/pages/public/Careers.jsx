import React, { useState, useEffect } from 'react';
import api from '../../api/client';
import { useNotification } from '../../context/NotificationContext';
import { Briefcase, MapPin, DollarSign, Clock, CheckCircle2, ArrowRight, X, Sparkles } from 'lucide-react';

const Careers = () => {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [applying, setApplying] = useState(false);
  const { addToast } = useNotification();

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    portfolioUrl: '',
    coverLetter: '',
    yearsOfExperience: 2,
  });

  useEffect(() => {
    const fetchCareers = async () => {
      try {
        const res = await api.get('/careers');
        setCareers(res.data || []);
      } catch (err) {
        console.error('Error fetching careers', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCareers();
  }, []);

  const handleApply = async (e) => {
    e.preventDefault();
    if (!form.fullName || !form.email || !form.phone) {
      addToast({ title: 'Fields Required', message: 'Please fill in all required contact details.', type: 'warning' });
      return;
    }

    setApplying(true);
    try {
      await api.post('/careers/apply', {
        careerId: selectedJob._id,
        ...form,
      });
      addToast({
        title: 'Application Received',
        message: 'Thank you for applying. Our creative directors will review your portfolio.',
        type: 'success',
      });
      setApplyModalOpen(false);
      setForm({ fullName: '', email: '', phone: '', portfolioUrl: '', coverLetter: '', yearsOfExperience: 2 });
    } catch (err) {
      addToast({ title: 'Application Error', message: err.message, type: 'error' });
    } finally {
      setApplying(false);
    }
  };

  return (
    <div className="min-h-screen bg-obsidian text-white pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-[0.35em] text-gold-400 font-semibold block">
            Join Our Creative Guild
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
            Careers at Lumière Studios
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base font-light max-w-xl mx-auto">
            We are always seeking visionary photographers, cinematographers, drone pilots, and master editors who treat visual storytelling as high art.
          </p>
        </div>

        {/* Culture & Perks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="luxury-card rounded-2xl p-6 space-y-2 border border-white/10">
            <Sparkles className="w-6 h-6 text-gold-400" />
            <h3 className="font-serif text-lg font-bold text-white">Global Destination Shoots</h3>
            <p className="text-xs text-neutral-300 font-light">Travel across royal palaces in India, Lake Como, the Amalfi Coast, Paris, and Switzerland on high-profile commissions.</p>
          </div>
          <div className="luxury-card rounded-2xl p-6 space-y-2 border border-white/10">
            <Briefcase className="w-6 h-6 text-gold-400" />
            <h3 className="font-serif text-lg font-bold text-white">Flagship Cinema Systems</h3>
            <p className="text-xs text-neutral-300 font-light">Create on world-class Sony Alpha 1, RED Cinema, ARRI Mini LF, and DJI Inspire 3 aerial gear.</p>
          </div>
          <div className="luxury-card rounded-2xl p-6 space-y-2 border border-white/10">
            <DollarSign className="w-6 h-6 text-gold-400" />
            <h3 className="font-serif text-lg font-bold text-white">Industry-Leading Remuneration</h3>
            <p className="text-xs text-neutral-300 font-light">Competitive annual retainers, substantial per-shoot bonuses, health benefits, and continuous creative mentorship.</p>
          </div>
        </div>

        {/* Open Positions */}
        <div className="space-y-6">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">Open Commissions & Positions</h2>

          {loading ? (
            <div className="h-64 rounded-2xl bg-obsidian-300 animate-pulse" />
          ) : careers.length === 0 ? (
            <div className="p-12 text-center bg-obsidian-400 rounded-2xl border border-white/10">
              <p className="text-sm text-neutral-400">No active vacancies currently open. Please check back soon or write to us directly.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {careers.map((career) => (
                <div
                  key={career._id}
                  className="luxury-card rounded-2xl p-8 flex flex-col justify-between space-y-6 border border-white/10 group"
                >
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-3 py-1 bg-gold-500/20 text-gold-300 rounded-full text-[10px] font-semibold uppercase tracking-wider border border-gold-500/30">
                        {career.department}
                      </span>
                      <span className="px-3 py-1 bg-white/5 text-neutral-300 rounded-full text-[10px] uppercase font-mono">
                        {career.jobType}
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl font-bold text-white group-hover:text-gold-200 transition-colors">
                      {career.title}
                    </h3>
                    <p className="text-xs text-neutral-300 leading-relaxed font-light">{career.description}</p>

                    <div className="space-y-2 pt-2">
                      <h4 className="text-xs font-semibold text-gold-300 uppercase tracking-wider">Key Requirements:</h4>
                      <ul className="space-y-1 text-xs text-neutral-400">
                        {career.requirements?.slice(0, 3).map((r, rIdx) => (
                          <li key={rIdx} className="flex items-start space-x-2">
                            <span className="w-1 h-1 rounded-full bg-gold-400 mt-1.5 shrink-0" />
                            <span>{r}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xs font-mono text-gold-300">{career.salaryRange}</span>
                    <button
                      onClick={() => {
                        setSelectedJob(career);
                        setApplyModalOpen(true);
                      }}
                      className="px-5 py-2.5 rounded-full bg-gold-gradient text-black font-bold text-xs uppercase tracking-wider shadow-gold-subtle hover:brightness-110 transition-all flex items-center"
                    >
                      Apply Now <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Application Modal */}
      {applyModalOpen && selectedJob && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-obsidian-400 border border-gold-500/40 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative animate-fade-in">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div>
                <h3 className="font-serif text-xl font-bold text-white">Apply for Position</h3>
                <p className="text-xs text-gold-400">{selectedJob.title} • {selectedJob.department}</p>
              </div>
              <button
                onClick={() => setApplyModalOpen(false)}
                className="p-2 text-neutral-400 hover:text-white rounded-full bg-obsidian-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleApply} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-neutral-300 font-semibold uppercase">Full Name *</label>
                <input
                  type="text"
                  required
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  placeholder="e.g. Aryan Mehra"
                  className="w-full bg-obsidian-500 border border-white/15 rounded-xl px-4 py-2.5 text-white focus:border-gold-400 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-neutral-300 font-semibold uppercase">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="aryan@gmail.com"
                    className="w-full bg-obsidian-500 border border-white/15 rounded-xl px-4 py-2.5 text-white focus:border-gold-400 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-neutral-300 font-semibold uppercase">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+91 98200 12345"
                    className="w-full bg-obsidian-500 border border-white/15 rounded-xl px-4 py-2.5 text-white focus:border-gold-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-neutral-300 font-semibold uppercase">Portfolio / Showreel URL *</label>
                <input
                  type="url"
                  required
                  value={form.portfolioUrl}
                  onChange={(e) => setForm({ ...form, portfolioUrl: e.target.value })}
                  placeholder="https://instagram.com/mywork or Vimeo/Website"
                  className="w-full bg-obsidian-500 border border-white/15 rounded-xl px-4 py-2.5 text-white focus:border-gold-400 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-neutral-300 font-semibold uppercase">Brief Introduction & Experience</label>
                <textarea
                  rows={3}
                  value={form.coverLetter}
                  onChange={(e) => setForm({ ...form, coverLetter: e.target.value })}
                  placeholder="Tell us about your primary camera systems, weddings covered, and aesthetic philosophy..."
                  className="w-full bg-obsidian-500 border border-white/15 rounded-xl p-3 text-white focus:border-gold-400 focus:outline-none"
                />
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setApplyModalOpen(false)}
                  className="px-4 py-2 rounded-full border border-white/15 text-neutral-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={applying}
                  className="px-6 py-2 rounded-full bg-gold-gradient text-black font-bold uppercase tracking-wider shadow-gold-subtle disabled:opacity-50"
                >
                  {applying ? 'Submitting...' : 'Submit Application'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Careers;
