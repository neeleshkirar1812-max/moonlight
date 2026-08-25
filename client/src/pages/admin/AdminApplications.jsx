import React, { useState, useEffect } from 'react';
import api from '../../api/client';
import { useNotification } from '../../context/NotificationContext';
import { Inbox, ExternalLink, CheckCircle2, XCircle, Clock } from 'lucide-react';

const AdminApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToast } = useNotification();

  const fetchApps = async () => {
    setLoading(true);
    try {
      const res = await api.get('/careers/admin/applications');
      setApplications(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApps();
  }, []);

  const handleStatusUpdate = async (id, status) => {
    try {
      await api.put(`/careers/admin/applications/${id}`, { status });
      setApplications((prev) => prev.map((a) => (a._id === id ? { ...a, status } : a)));
      addToast({ title: 'Status Updated', message: `Applicant status set to ${status}`, type: 'success' });
    } catch (err) {
      addToast({ title: 'Error', message: err.message, type: 'error' });
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold block">
          Candidate Pipeline
        </span>
        <h1 className="font-serif text-3xl font-bold text-white">Job Applications & Portfolios</h1>
      </div>

      {loading ? (
        <div className="h-64 rounded-2xl bg-obsidian-400 animate-pulse" />
      ) : applications.length === 0 ? (
        <div className="text-center py-20 bg-obsidian-400 rounded-3xl border border-white/10 space-y-3">
          <Inbox className="w-8 h-8 text-gold-400 mx-auto opacity-50" />
          <h3 className="font-serif text-xl text-white">No Applications Received Yet</h3>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <div key={app._id} className="luxury-card rounded-2xl p-6 border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <h3 className="font-serif text-lg font-bold text-white">{app.fullName}</h3>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase bg-gold-500/20 text-gold-300 border border-gold-500/30">
                    {app.career?.title || 'General Position'}
                  </span>
                </div>
                <p className="text-xs text-neutral-400">
                  Email: <strong className="text-white">{app.email}</strong> • Phone: <strong className="text-white">{app.phone}</strong> • Experience: {app.yearsOfExperience} Years
                </p>
                {app.coverLetter && (
                  <p className="text-xs text-neutral-300 italic max-w-xl line-clamp-2">"{app.coverLetter}"</p>
                )}
                {app.portfolioUrl && (
                  <a
                    href={app.portfolioUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center text-xs text-gold-300 hover:underline pt-1"
                  >
                    View Showreel / Portfolio <ExternalLink className="w-3.5 h-3.5 ml-1" />
                  </a>
                )}
              </div>

              <div className="flex items-center space-x-3 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-4 md:pt-0 border-white/5">
                <select
                  value={app.status}
                  onChange={(e) => handleStatusUpdate(app._id, e.target.value)}
                  className="bg-obsidian-500 border border-white/15 rounded-lg px-3 py-1.5 text-xs text-gold-300 font-mono focus:outline-none"
                >
                  <option value="PENDING">PENDING</option>
                  <option value="REVIEWING">REVIEWING</option>
                  <option value="SHORTLISTED">SHORTLISTED</option>
                  <option value="REJECTED">REJECTED</option>
                  <option value="HIRED">HIRED</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminApplications;
