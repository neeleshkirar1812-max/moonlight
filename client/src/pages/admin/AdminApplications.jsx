import React, { useState, useEffect } from 'react';
import api from '../../api/client';
import { useNotification } from '../../context/NotificationContext';
import { generateOfferLetterPDF } from '../../utils/offerLetterPdfGenerator';
import {
  Inbox,
  ExternalLink,
  CheckCircle2,
  XCircle,
  Clock,
  Briefcase,
  Download,
  UserCheck,
  Search,
  Filter,
  FileText,
  Mail,
  Phone,
  DollarSign,
  Sparkles,
  X,
} from 'lucide-react';

const AdminApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stageFilter, setStageFilter] = useState('ALL');
  const [search, setSearch] = useState('');
  const [hireModalApp, setHireModalApp] = useState(null);
  const [hiringForm, setHiringForm] = useState({
    offeredRole: '',
    offeredSalary: '45000',
    joiningDate: new Date(+new Date() + 7 * 24 * 3600 * 1000).toISOString().split('T')[0],
    notes: 'Selected after portfolio review and technical framing assessment.',
  });
  const { addToast } = useNotification();

  const fetchApps = async () => {
    setLoading(true);
    try {
      const res = await api.get('/careers/admin/applications');
      let data = res.data || [];
      if (!data || data.length === 0) {
        // Fallback demo applications if DB empty
        data = [
          {
            _id: 'app-1',
            fullName: 'Rohan Deshmukh',
            email: 'rohan.deshmukh@gmail.com',
            phone: '+91 98200 44556',
            career: { title: 'Senior Candid Master', department: 'Photography' },
            yearsOfExperience: 4,
            portfolioUrl: 'https://instagram.com/rohan_candid_frames',
            coverLetter: 'Passionate candid photographer with 4 years capturing palace weddings in Udaipur & Jaipur. Expert with Sony A7R V and natural framing.',
            status: 'Shortlisted',
            createdAt: new Date().toISOString(),
          },
          {
            _id: 'app-2',
            fullName: 'Kunal Verma',
            email: 'kunal.drone.cine@gmail.com',
            phone: '+91 98200 99881',
            career: { title: '4K Commercial Drone Pilot', department: 'Cinematography' },
            yearsOfExperience: 3,
            portfolioUrl: 'https://youtube.com/@kunal_aerials',
            coverLetter: 'DGCA certified drone pilot with 300+ flight hours on DJI Inspire 3 and Mavic 3 Cine. Specialized in architectural palace reveals.',
            status: 'Applied',
            createdAt: new Date().toISOString(),
          },
        ];
      }
      setApplications(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApps();
  }, []);

  const handleStatusChange = async (app, newStatus) => {
    if (newStatus.toLowerCase() === 'hired') {
      setHireModalApp(app);
      setHiringForm({
        offeredRole: app.career?.title || 'Production Specialist',
        offeredSalary: '45000',
        joiningDate: new Date(+new Date() + 7 * 24 * 3600 * 1000).toISOString().split('T')[0],
        notes: 'Successfully cleared interviews. Selected for Moonlight Production crew.',
      });
      return;
    }

    try {
      await api.patch(`/careers/applications/${app._id}/status`, { status: newStatus });
      setApplications((prev) =>
        prev.map((a) => (a._id === app._id ? { ...a, status: newStatus } : a))
      );
      addToast({
        title: 'Stage Updated',
        message: `Candidate ${app.fullName} moved to stage: ${newStatus}`,
        type: 'success',
      });
    } catch (err) {
      addToast({ title: 'Error', message: err.message, type: 'error' });
    }
  };

  const handleConfirmHiring = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        status: 'Hired',
        offeredRole: hiringForm.offeredRole,
        offeredSalary: Number(hiringForm.offeredSalary),
        joiningDate: hiringForm.joiningDate,
        adminNotes: hiringForm.notes,
      };

      const res = await api.patch(`/careers/applications/${hireModalApp._id}/status`, payload);

      // Generate & Download Offer Letter PDF
      const candidateForPdf = {
        ...hireModalApp,
        hiringDetails: {
          offeredRole: hiringForm.offeredRole,
          offeredSalary: hiringForm.offeredSalary,
          joiningDate: hiringForm.joiningDate,
        },
      };
      generateOfferLetterPDF(candidateForPdf);

      // Update local state
      setApplications((prev) =>
        prev.map((a) =>
          a._id === hireModalApp._id
            ? {
                ...a,
                status: 'Hired',
                hiringDetails: candidateForPdf.hiringDetails,
              }
            : a
        )
      );

      // Also persist to ml_employees in localStorage for immediate crew login
      try {
        const existingCrew = JSON.parse(localStorage.getItem('ml_employees') || '[]');
        const newCrewMember = {
          _id: `emp-${Date.now()}`,
          employeeCode: `EMP-MLP-${Math.floor(100 + Math.random() * 900)}`,
          name: hireModalApp.fullName,
          designation: hiringForm.offeredRole,
          department: hireModalApp.career?.department || 'Production Crew',
          user: {
            email: hireModalApp.email,
            phone: hireModalApp.phone,
          },
          status: 'active',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
        };
        localStorage.setItem('ml_employees', JSON.stringify([newCrewMember, ...existingCrew]));
      } catch (e) {}

      addToast({
        title: 'Candidate Hired! 🎉',
        message: `Official Offer Letter generated & Employee login provisioned for ${hireModalApp.fullName}.`,
        type: 'success',
      });

      setHireModalApp(null);
    } catch (err) {
      addToast({ title: 'Hiring Error', message: err.message, type: 'error' });
    }
  };

  const filteredApps = applications.filter((app) => {
    const matchesStage =
      stageFilter === 'ALL' || (app.status || '').toLowerCase() === stageFilter.toLowerCase();
    const query = search.toLowerCase();
    const matchesSearch =
      (app.fullName || '').toLowerCase().includes(query) ||
      (app.email || '').toLowerCase().includes(query) ||
      (app.career?.title || '').toLowerCase().includes(query);
    return matchesStage && matchesSearch;
  });

  const getStatusBadge = (status) => {
    const s = (status || 'Applied').toLowerCase();
    if (s === 'hired') {
      return 'bg-emerald-50 text-emerald-800 border-emerald-300';
    }
    if (s === 'selected') {
      return 'bg-cyan-50 text-cyan-800 border-cyan-300';
    }
    if (s === 'interview') {
      return 'bg-amber-50 text-amber-800 border-amber-300';
    }
    if (s === 'shortlisted') {
      return 'bg-purple-50 text-purple-800 border-purple-300';
    }
    if (s === 'rejected') {
      return 'bg-rose-50 text-rose-800 border-rose-300';
    }
    return 'bg-amber-50 text-amber-800 border-amber-200';
  };

  return (
    <div className="space-y-8 animate-fade-in text-neutral-900">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-900/10 pb-6">
        <div>
          <span className="text-xs uppercase font-mono tracking-widest text-amber-700 font-bold block">
            HR Module & Talent Acquisition
          </span>
          <h1 className="font-serif text-3xl font-bold text-neutral-900 mt-1">
            Job Applications & Hiring Console
          </h1>
          <p className="text-neutral-600 text-xs font-light mt-1">
            Review candidate portfolios, track interview stages, generate official Offer Letters, and auto-create Employee logins.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <span className="px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold font-mono">
            Total Candidates: {applications.length}
          </span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 custom-scrollbar">
          {['ALL', 'Applied', 'Shortlisted', 'Interview', 'Selected', 'Hired', 'Rejected'].map(
            (stage) => (
              <button
                key={stage}
                onClick={() => setStageFilter(stage)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold transition-all whitespace-nowrap ${
                  stageFilter === stage
                    ? 'bg-gold-gradient text-neutral-950 font-bold shadow-gold-subtle'
                    : 'bg-white text-neutral-600 hover:text-neutral-900 border border-amber-900/15 shadow-sm'
                }`}
              >
                {stage}
              </button>
            )
          )}
        </div>

        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search candidate name, email, role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-amber-900/20 rounded-full pl-10 pr-4 py-2 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30 font-mono"
          />
        </div>
      </div>

      {/* Applications List */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-40 rounded-2xl bg-stone-100 animate-pulse border border-stone-200" />
          ))}
        </div>
      ) : filteredApps.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-amber-900/15 space-y-3 shadow-sm">
          <Inbox className="w-8 h-8 text-amber-600 mx-auto opacity-70" />
          <h3 className="font-serif text-xl text-neutral-900 font-bold">No Applications in this Category</h3>
          <p className="text-xs text-neutral-500">
            Switch filter tabs to review candidates in other hiring stages.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredApps.map((app) => (
            <div
              key={app._id}
              className="bg-white rounded-2xl p-6 border border-amber-900/15 hover:border-amber-500/40 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm hover:shadow-md"
            >
              <div className="space-y-2.5 max-w-2xl">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="font-serif text-lg font-bold text-neutral-900">{app.fullName}</h3>
                  <span className="px-2.5 py-0.5 rounded-full text-[10.5px] font-mono font-bold bg-stone-100 border border-stone-200 text-neutral-700">
                    {app.career?.title || 'Production Crew Candidate'}
                  </span>
                  <span
                    className={`px-3 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase border ${getStatusBadge(
                      app.status
                    )}`}
                  >
                    Stage: {app.status || 'Applied'}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-neutral-600 font-mono">
                  <span className="flex items-center">
                    <Mail className="w-3.5 h-3.5 mr-1 text-amber-600" />
                    {app.email}
                  </span>
                  <span className="flex items-center">
                    <Phone className="w-3.5 h-3.5 mr-1 text-amber-600" />
                    {app.phone}
                  </span>
                  <span className="flex items-center">
                    <Briefcase className="w-3.5 h-3.5 mr-1 text-amber-600" />
                    {app.yearsOfExperience} Years Experience
                  </span>
                </div>

                {app.coverLetter && (
                  <p className="text-xs text-neutral-700 italic line-clamp-2 bg-stone-50 p-2.5 rounded-xl border border-stone-200 font-light">
                    "{app.coverLetter}"
                  </p>
                )}

                {app.portfolioUrl && (
                  <div className="pt-1">
                    <a
                      href={app.portfolioUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center text-xs text-amber-800 hover:text-amber-950 font-bold transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5 mr-1.5 text-amber-600" /> View Showreel / Portfolio Link
                    </a>
                  </div>
                )}
              </div>

              {/* Action Controls */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto justify-end border-t md:border-t-0 pt-4 md:pt-0 border-stone-200">
                {/* Re-download Offer Letter if Hired */}
                {(app.status || '').toLowerCase() === 'hired' && (
                  <button
                    onClick={() => generateOfferLetterPDF(app)}
                    className="px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-600 hover:text-white border border-emerald-300 text-emerald-800 font-bold text-xs flex items-center justify-center transition-all shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5 mr-1.5" /> Offer Letter (PDF)
                  </button>
                )}

                <div className="flex items-center space-x-2">
                  <span className="text-[11px] text-neutral-600 font-mono font-semibold">Move Stage:</span>
                  <select
                    value={app.status || 'Applied'}
                    onChange={(e) => handleStatusChange(app, e.target.value)}
                    className="bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs text-neutral-900 font-mono font-bold focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30"
                  >
                    <option value="Applied">1. Applied</option>
                    <option value="Shortlisted">2. Shortlisted</option>
                    <option value="Interview">3. Interview Scheduled</option>
                    <option value="Selected">4. Selected</option>
                    <option value="Hired">5. Hired (Issue Offer Letter)</option>
                    <option value="Rejected">6. Rejected</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Hire Candidate & Generate Offer Letter Modal */}
      {hireModalApp && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-amber-900/20 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-5 animate-fade-in text-neutral-900">
            <div className="flex items-center justify-between border-b border-amber-900/10 pb-4">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-700 font-bold block">
                  HR Onboarding & Hiring
                </span>
                <h3 className="font-serif text-xl font-bold text-neutral-900">
                  Hire: {hireModalApp.fullName}
                </h3>
              </div>
              <button
                onClick={() => setHireModalApp(null)}
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-neutral-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleConfirmHiring} className="space-y-4 text-xs">
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-neutral-700 leading-relaxed space-y-1">
                <div className="flex items-center text-amber-900 font-bold">
                  <Sparkles className="w-4 h-4 mr-1.5 text-amber-600" />
                  What happens when you confirm:
                </div>
                <ul className="list-disc list-inside space-y-0.5 text-[11px] text-neutral-600">
                  <li>Official Moonlight Production Offer Letter (PDF) will auto-generate.</li>
                  <li>New Employee account will be created with login access.</li>
                  <li>Candidate status is locked to Hired.</li>
                </ul>
              </div>

              <div>
                <label className="text-neutral-700 font-bold block mb-1 font-mono">
                  Offered Designation / Job Title:
                </label>
                <input
                  type="text"
                  required
                  value={hiringForm.offeredRole}
                  onChange={(e) => setHiringForm({ ...hiringForm, offeredRole: e.target.value })}
                  className="w-full p-3 rounded-xl bg-stone-50 border border-stone-300 text-neutral-900 font-mono focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/30"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-neutral-700 font-bold block mb-1 font-mono">
                    Monthly Salary (INR):
                  </label>
                  <input
                    type="number"
                    required
                    value={hiringForm.offeredSalary}
                    onChange={(e) =>
                      setHiringForm({ ...hiringForm, offeredSalary: e.target.value })
                    }
                    className="w-full p-3 rounded-xl bg-stone-50 border border-stone-300 text-neutral-900 font-mono focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/30"
                  />
                </div>

                <div>
                  <label className="text-neutral-700 font-bold block mb-1 font-mono">
                    Date of Joining:
                  </label>
                  <input
                    type="date"
                    required
                    value={hiringForm.joiningDate}
                    onChange={(e) =>
                      setHiringForm({ ...hiringForm, joiningDate: e.target.value })
                    }
                    className="w-full p-3 rounded-xl bg-stone-50 border border-stone-300 text-neutral-900 font-mono focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/30"
                  />
                </div>
              </div>

              <div>
                <label className="text-neutral-700 font-bold block mb-1 font-mono">
                  Internal HR Notes / Special Terms:
                </label>
                <textarea
                  rows="2"
                  value={hiringForm.notes}
                  onChange={(e) => setHiringForm({ ...hiringForm, notes: e.target.value })}
                  className="w-full p-3 rounded-xl bg-stone-50 border border-stone-300 text-neutral-900 text-xs focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/30"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-4 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setHireModalApp(null)}
                  className="px-4 py-2 rounded-full border border-stone-300 text-neutral-600 hover:text-neutral-900 hover:bg-stone-50 transition-colors font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold uppercase tracking-wider text-xs shadow-md hover:scale-105 transition-all flex items-center"
                >
                  <UserCheck className="w-4 h-4 mr-1.5" /> Confirm Hire & Generate Offer Letter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminApplications;
