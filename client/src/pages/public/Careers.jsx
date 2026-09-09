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
    <div className="min-h-screen bg-[#FAF8F5] text-neutral-900 pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-[0.35em] text-amber-700 font-bold block">
            Join Our Creative Team
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900">
            Careers at Moonlight Production
          </h1>
          <p className="text-neutral-600 text-sm sm:text-base font-normal max-w-xl mx-auto">
            We are always seeking visionary photographers, cinematographers, drone pilots, and master editors who treat visual storytelling as high art.
          </p>
        </div>

        {/* Culture & Perks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 space-y-2 border border-amber-900/15 shadow-md">
            <Sparkles className="w-6 h-6 text-amber-700" />
            <h3 className="font-serif text-lg font-bold text-neutral-900">Global Destination Shoots</h3>
            <p className="text-xs text-neutral-600 font-normal">Travel across royal palaces in India, Lake Pichola, Udaipur, the Goa Sunset Beach, Paris, and Switzerland on high-profile commissions.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 space-y-2 border border-amber-900/15 shadow-md">
            <Briefcase className="w-6 h-6 text-amber-700" />
            <h3 className="font-serif text-lg font-bold text-neutral-900">Flagship Cinema Systems</h3>
            <p className="text-xs text-neutral-600 font-normal">Create on world-class Sony Alpha 1, RED Cinema, ARRI Mini LF, and DJI Inspire 3 aerial gear.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 space-y-2 border border-amber-900/15 shadow-md">
            <DollarSign className="w-6 h-6 text-amber-700" />
            <h3 className="font-serif text-lg font-bold text-neutral-900">Industry-Leading Remuneration</h3>
            <p className="text-xs text-neutral-600 font-normal">Competitive annual retainers, substantial per-shoot bonuses, health benefits, and continuous creative mentorship.</p>
          </div>
        </div>

        {/* Open Positions */}
        <div className="space-y-6">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900">Open Commissions & Positions</h2>

          {loading ? (
            <div className="h-64 rounded-2xl bg-white animate-pulse border border-neutral-200" />
          ) : careers.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-amber-900/15 shadow-sm">
              <p className="text-sm text-neutral-600">No active vacancies currently open. Please check back soon or write to us directly.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {careers.map((career) => (
                <div
                  key={career._id}
                  className="bg-white rounded-2xl p-8 flex flex-col justify-between space-y-6 border border-amber-900/15 hover:border-amber-600/50 shadow-md hover:shadow-xl transition-all group"
                >
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-3 py-1 bg-amber-500/15 text-amber-800 rounded-full text-[10px] font-bold uppercase tracking-wider border border-amber-600/30">
                        {career.department}
                      </span>
                      <span className="px-3 py-1 bg-neutral-100 text-neutral-700 rounded-full text-[10px] uppercase font-mono font-medium">
                        {career.jobType}
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl font-bold text-neutral-900 group-hover:text-amber-800 transition-colors">
                      {career.title}
                    </h3>
                    <p className="text-xs text-neutral-600 leading-relaxed font-normal">{career.description}</p>

                    <div className="space-y-2 pt-2">
                      <h4 className="text-xs font-bold text-amber-800 uppercase tracking-wider">Key Requirements:</h4>
                      <ul className="space-y-1 text-xs text-neutral-600">
                        {career.requirements?.slice(0, 3).map((r, rIdx) => (
                          <li key={rIdx} className="flex items-start space-x-2">
                            <span className="w-1 h-1 rounded-full bg-amber-700 mt-1.5 shrink-0" />
                            <span>{r}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-amber-900/10 flex items-center justify-between">
                    <span className="text-xs font-mono text-amber-800 font-bold">{career.salaryRange}</span>
                    <button
                      onClick={() => {
                        setSelectedJob(career);
                        setApplyModalOpen(true);
                      }}
                      className="px-5 py-2.5 rounded-full bg-gold-gradient text-neutral-950 font-extrabold text-xs uppercase tracking-wider shadow-sm hover:brightness-105 transition-all flex items-center btn-shimmer"
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
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-amber-900/20 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative animate-fade-in text-neutral-900">
            <div className="flex items-center justify-between pb-4 border-b border-amber-900/10 mb-6">
              <div>
                <h3 className="font-serif text-xl font-bold text-neutral-900">Apply for Position</h3>
                <p className="text-xs text-amber-800 font-semibold">{selectedJob.title} • {selectedJob.department}</p>
              </div>
              <button
                onClick={() => setApplyModalOpen(false)}
                className="p-2 text-neutral-400 hover:text-neutral-900 rounded-full bg-neutral-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleApply} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-neutral-800 font-bold uppercase text-[10.5px]">Full Name *</label>
                <input
                  type="text"
                  required
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  placeholder="e.g. Aryan Mehra"
                  className="w-full bg-[#FAF8F5] border border-neutral-300 rounded-xl px-4 py-2.5 text-neutral-900 placeholder-neutral-400 focus:border-amber-600 focus:bg-white focus:outline-none shadow-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-neutral-800 font-bold uppercase text-[10.5px]">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="aryan@gmail.com"
                    className="w-full bg-[#FAF8F5] border border-neutral-300 rounded-xl px-4 py-2.5 text-neutral-900 placeholder-neutral-400 focus:border-amber-600 focus:bg-white focus:outline-none shadow-sm"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-neutral-800 font-bold uppercase text-[10.5px]">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+91 98200 12345"
                    className="w-full bg-[#FAF8F5] border border-neutral-300 rounded-xl px-4 py-2.5 text-neutral-900 placeholder-neutral-400 focus:border-amber-600 focus:bg-white focus:outline-none shadow-sm"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-neutral-800 font-bold uppercase text-[10.5px]">Portfolio / Showreel URL *</label>
                <input
                  type="url"
                  required
                  value={form.portfolioUrl}
                  onChange={(e) => setForm({ ...form, portfolioUrl: e.target.value })}
                  placeholder="https://instagram.com/mywork or Vimeo/Website"
                  className="w-full bg-[#FAF8F5] border border-neutral-300 rounded-xl px-4 py-2.5 text-neutral-900 placeholder-neutral-400 focus:border-amber-600 focus:bg-white focus:outline-none shadow-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="text-neutral-800 font-bold uppercase text-[10.5px]">Brief Introduction & Experience</label>
                <textarea
                  rows={3}
                  value={form.coverLetter}
                  onChange={(e) => setForm({ ...form, coverLetter: e.target.value })}
                  placeholder="Tell us about your primary camera systems, weddings covered, and aesthetic philosophy..."
                  className="w-full bg-[#FAF8F5] border border-neutral-300 rounded-xl p-3 text-neutral-900 placeholder-neutral-400 focus:border-amber-600 focus:bg-white focus:outline-none shadow-sm"
                />
              </div>

              <div className="pt-4 border-t border-amber-900/10 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setApplyModalOpen(false)}
                  className="px-4 py-2 rounded-full border border-neutral-300 text-neutral-700 hover:text-neutral-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={applying}
                  className="px-6 py-2 rounded-full bg-gold-gradient text-neutral-950 font-extrabold uppercase tracking-wider shadow-sm hover:brightness-105 disabled:opacity-50 btn-shimmer"
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
