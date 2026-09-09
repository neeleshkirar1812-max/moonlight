import React, { useState, useEffect } from 'react';
import api from '../../api/client';
import SEO from '../../components/common/SEO';
import { DEFAULT_CAREERS } from '../../data/defaultCareers';
import { useNotification } from '../../context/NotificationContext';
import {
  Briefcase,
  MapPin,
  DollarSign,
  Clock,
  CheckCircle2,
  ArrowRight,
  X,
  Sparkles,
  Camera,
  Award,
  Phone,
  Film,
} from 'lucide-react';

const Careers = () => {
  const [careers, setCareers] = useState(DEFAULT_CAREERS);
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
        if (res.data && Array.isArray(res.data) && res.data.length > 0) {
          setCareers(res.data);
        } else {
          setCareers(DEFAULT_CAREERS);
        }
      } catch (err) {
        console.warn('Using default careers fallback:', err);
        setCareers(DEFAULT_CAREERS);
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
        title: 'Application Received 🎉',
        message: 'Thank you for applying. Our creative director will review your portfolio and reach out.',
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
      <SEO
        title="Careers & Crew Recruitment | Join Moonlight Production"
        description="Join Moonlight Production as a wedding cinematographer, candid photographer, drone pilot, or video editor. Explore current openings and apply today."
        keywords="wedding photography jobs, cinematographer hiring Bhopal, wedding video editor career, drone pilot jobs India, Moonlight Production careers"
      />
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 text-xs font-mono font-bold uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>We're Hiring • 2026 Wedding Season</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900">
            Careers at Moonlight Production
          </h1>
          <p className="text-neutral-600 text-sm sm:text-base font-normal max-w-2xl mx-auto leading-relaxed">
            Are you a passionate wedding cinematographer, candid portraitist, FPV drone specialist, or DaVinci Resolve colorist? Step into Moonlight Production and capture breathtaking royal palace destinations with cinema-grade Sony FX6 rigs and master prime optics.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <a
              href="tel:+918817789498"
              className="inline-flex items-center px-5 py-2.5 rounded-full bg-white hover:bg-neutral-50 border border-amber-900/15 text-neutral-800 text-xs font-bold uppercase tracking-wider shadow-sm transition-all"
            >
              <Phone className="w-3.5 h-3.5 mr-2 text-amber-700" />
              Talent Hotline: +91 88177 89498
            </a>
            <a
              href="https://api.whatsapp.com/send?phone=919229229323"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 mr-2" />
              Direct WhatsApp Inquiry
            </a>
          </div>
        </div>

        {/* Culture & Perks Grid (The 4 Key Pillars) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl p-6 space-y-2 border border-amber-900/15 shadow-md">
            <Camera className="w-6 h-6 text-amber-700" />
            <h3 className="font-serif text-lg font-bold text-neutral-900">Sony FX6 & FX3 Rigs</h3>
            <p className="text-xs text-neutral-600 font-normal leading-relaxed">
              Cinema optics, DJI Ronin 4D & Inspire 3 gear provided for all wedding projects.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 space-y-2 border border-amber-900/15 shadow-md">
            <MapPin className="w-6 h-6 text-amber-700" />
            <h3 className="font-serif text-lg font-bold text-neutral-900">Palace Destinations</h3>
            <p className="text-xs text-neutral-600 font-normal leading-relaxed">
              All-expenses-paid luxury shoots across Udaipur, Jaipur, Goa, Maheshwar, and abroad.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 space-y-2 border border-amber-900/15 shadow-md">
            <DollarSign className="w-6 h-6 text-amber-700" />
            <h3 className="font-serif text-lg font-bold text-neutral-900">Top-Tier Pay</h3>
            <p className="text-xs text-neutral-600 font-normal leading-relaxed">
              Industry-leading monthly CTC + handsome per-event bonus incentives and prompt payout.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 space-y-2 border border-amber-900/15 shadow-md">
            <Award className="w-6 h-6 text-amber-700" />
            <h3 className="font-serif text-lg font-bold text-neutral-900">Vogue & Film Credits</h3>
            <p className="text-xs text-neutral-600 font-normal leading-relaxed">
              Get your name recognized on luxury wedding cinema covers and social media features.
            </p>
          </div>
        </div>

        {/* Open Positions */}
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-900/10 pb-4">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900">
                Open Positions ({careers.length} Roles Active)
              </h2>
              <p className="text-xs text-neutral-600 font-normal mt-1">
                Select a position to view detailed requirements and submit your portfolio directly.
              </p>
            </div>
          </div>

          {loading ? (
            <div className="h-64 rounded-2xl bg-white animate-pulse border border-neutral-200" />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {careers.map((career) => (
                <div
                  key={career._id}
                  className="bg-white rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6 border border-amber-900/15 hover:border-amber-600/50 shadow-md hover:shadow-xl transition-all group"
                >
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center space-x-2">
                        <span className="px-3 py-1 bg-amber-500/15 text-amber-800 rounded-full text-[10px] font-bold uppercase tracking-wider border border-amber-600/30">
                          {career.department}
                        </span>
                        <span className="px-3 py-1 bg-neutral-100 text-neutral-700 rounded-full text-[10px] uppercase font-mono font-medium">
                          {career.jobType}
                        </span>
                      </div>
                      <span className="text-[10.5px] font-mono text-amber-800 font-bold bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                        {career.experienceRequired || '2+ Yrs'}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-serif text-2xl font-bold text-neutral-900 group-hover:text-amber-800 transition-colors">
                        {career.title}
                      </h3>
                      <p className="text-xs text-neutral-500 font-mono mt-1 flex items-center">
                        <MapPin className="w-3 h-3 text-amber-700 mr-1 shrink-0" />
                        {career.location}
                      </p>
                    </div>

                    <p className="text-xs text-neutral-600 leading-relaxed font-normal">{career.description}</p>

                    <div className="space-y-2 pt-2">
                      <h4 className="text-xs font-bold text-amber-800 uppercase tracking-wider font-mono">
                        Key Requirements:
                      </h4>
                      <ul className="space-y-1.5 text-xs text-neutral-600">
                        {career.requirements?.slice(0, 4).map((r, rIdx) => (
                          <li key={rIdx} className="flex items-start space-x-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-700 mt-1.5 shrink-0" />
                            <span>{r}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-amber-900/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <span className="text-xs font-mono text-amber-800 font-bold">{career.salaryRange}</span>
                    <button
                      onClick={() => {
                        setSelectedJob(career);
                        setApplyModalOpen(true);
                      }}
                      className="px-6 py-2.5 rounded-full bg-gold-gradient text-neutral-950 font-extrabold text-xs uppercase tracking-wider shadow-sm hover:brightness-105 transition-all flex items-center justify-center btn-shimmer"
                    >
                      Apply for This Role <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
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
                  placeholder="https://instagram.com/mywork or Vimeo/Drive link"
                  className="w-full bg-[#FAF8F5] border border-neutral-300 rounded-xl px-4 py-2.5 text-neutral-900 placeholder-neutral-400 focus:border-amber-600 focus:bg-white focus:outline-none shadow-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="text-neutral-800 font-bold uppercase text-[10.5px]">Brief Introduction & Camera Experience</label>
                <textarea
                  rows={3}
                  value={form.coverLetter}
                  onChange={(e) => setForm({ ...form, coverLetter: e.target.value })}
                  placeholder="Tell us about your primary camera systems, weddings covered, and cinematic background..."
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
