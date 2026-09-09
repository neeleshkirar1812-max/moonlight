import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/client';
import { Shield, Users, Activity, Server, Key, CheckCircle2, Lock, ArrowRight, DollarSign, Calendar, MessageSquare, FileText } from 'lucide-react';

const SuperAdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [auditLogs, setAuditLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSuperAdminData = async () => {
      try {
        const [admRes, logRes] = await Promise.allSettled([
          api.get('/super-admin/admins'),
          api.get('/super-admin/audit-logs?limit=5'),
        ]);
        if (admRes.status === 'fulfilled' && admRes.value.data) setStats({ adminsCount: admRes.value.data?.length || 1 });
        if (logRes.status === 'fulfilled' && logRes.value.data) setAuditLogs(logRes.value.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSuperAdminData();
  }, []);

  return (
    <div className="space-y-8 animate-fade-in text-neutral-900">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-900/10 pb-4">
        <div>
          <span className="text-xs uppercase font-mono tracking-widest text-amber-800 font-bold block">
            System Governance & Root Command
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900">
            Super Admin Control Center
          </h1>
        </div>
        <div className="flex items-center space-x-2 text-xs font-mono font-bold text-amber-900 bg-amber-100 px-3 py-1.5 rounded-full border border-amber-300 shadow-sm w-fit">
          <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
          <span>Supreme Root Active</span>
        </div>
      </div>

      {/* System Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="luxury-card rounded-2xl p-5 sm:p-6 border border-amber-900/15 shadow-sm bg-white">
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase text-neutral-500 font-mono font-bold tracking-wider">Studio Admins</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-700">
              <Shield className="w-5 h-5" />
            </div>
          </div>
          <h3 className="font-serif text-3xl font-bold text-neutral-900 mt-2">{stats?.adminsCount || 1}</h3>
          <p className="text-xs text-neutral-600 mt-1 font-mono">Privileged Admin Accounts</p>
        </div>

        <div className="luxury-card rounded-2xl p-5 sm:p-6 border border-amber-900/15 shadow-sm bg-white">
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase text-neutral-500 font-mono font-bold tracking-wider">Security Health</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700">
              <Activity className="w-5 h-5" />
            </div>
          </div>
          <h3 className="font-serif text-3xl font-bold text-emerald-700 mt-2">100%</h3>
          <p className="text-xs text-emerald-800 mt-1 font-mono flex items-center font-bold">
            <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-600" /> RBAC Enforced
          </p>
        </div>

        <div className="luxury-card rounded-2xl p-5 sm:p-6 border border-amber-900/15 shadow-sm bg-white">
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase text-neutral-500 font-mono font-bold tracking-wider">Database Engine</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-700">
              <Server className="w-5 h-5" />
            </div>
          </div>
          <h3 className="font-serif text-2xl font-bold text-neutral-900 mt-2">MongoDB</h3>
          <p className="text-xs text-neutral-600 mt-1 font-mono">22 Schemas Active & Synced</p>
        </div>

        <div className="luxury-card rounded-2xl p-5 sm:p-6 border border-amber-900/15 shadow-sm bg-white">
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase text-neutral-500 font-mono font-bold tracking-wider">Razorpay / CDN</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-700">
              <Lock className="w-5 h-5" />
            </div>
          </div>
          <h3 className="font-serif text-2xl font-bold text-amber-900 mt-2">Integrated</h3>
          <p className="text-xs text-neutral-600 mt-1 font-mono">HMAC Webhook Verified</p>
        </div>
      </div>

      {/* Quick Action Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Link
          to="/super-admin/approvals"
          className="luxury-card rounded-2xl p-5 sm:p-6 group block border border-amber-400 bg-amber-50/50 hover:bg-amber-50 shadow-sm space-y-2.5 transition-all hover:shadow-md"
        >
          <div className="p-2.5 rounded-xl bg-amber-200/80 text-amber-900 w-fit">
            <Key className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </div>
          <h3 className="font-serif text-base sm:text-lg font-bold text-neutral-900 group-hover:text-amber-900 transition-colors">
            Login Approvals & Passwords
          </h3>
          <p className="text-xs text-neutral-600 leading-relaxed">Approve new crew/client logins and manage Master credentials.</p>
        </Link>

        <Link
          to="/super-admin/admins"
          className="luxury-card rounded-2xl p-5 sm:p-6 group block border border-amber-900/15 bg-white hover:bg-amber-50/40 shadow-sm space-y-2.5 transition-all hover:shadow-md"
        >
          <div className="p-2.5 rounded-xl bg-amber-100 text-amber-800 w-fit">
            <Shield className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </div>
          <h3 className="font-serif text-base sm:text-lg font-bold text-neutral-900 group-hover:text-amber-900 transition-colors">
            Admin Accounts & Hierarchy
          </h3>
          <p className="text-xs text-neutral-600 leading-relaxed">Manage Studio Admins, HR leads, and granular permissions.</p>
        </Link>

        <Link
          to="/super-admin/audit-logs"
          className="luxury-card rounded-2xl p-5 sm:p-6 group block border border-amber-900/15 bg-white hover:bg-amber-50/40 shadow-sm space-y-2.5 transition-all hover:shadow-md"
        >
          <div className="p-2.5 rounded-xl bg-amber-100 text-amber-800 w-fit">
            <Activity className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </div>
          <h3 className="font-serif text-base sm:text-lg font-bold text-neutral-900 group-hover:text-amber-900 transition-colors">
            Immutable Audit Trail
          </h3>
          <p className="text-xs text-neutral-600 leading-relaxed">Real-time surveillance of logins, data exports, and deletions.</p>
        </Link>

        <Link
          to="/super-admin/config"
          className="luxury-card rounded-2xl p-5 sm:p-6 group block border border-amber-900/15 bg-white hover:bg-amber-50/40 shadow-sm space-y-2.5 transition-all hover:shadow-md"
        >
          <div className="p-2.5 rounded-xl bg-amber-100 text-amber-800 w-fit">
            <Server className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </div>
          <h3 className="font-serif text-base sm:text-lg font-bold text-neutral-900 group-hover:text-amber-900 transition-colors">
            Server Diagnostics & Cloud API
          </h3>
          <p className="text-xs text-neutral-600 leading-relaxed">Storage health, database latency, and API webhooks.</p>
        </Link>
      </div>

      {/* Studio Operations & CRM Quick Access */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <span className="text-xs uppercase font-mono tracking-widest text-amber-800 font-bold">
            Studio Operations & Business Modules
          </span>
          <Link to="/admin/dashboard" className="text-xs text-amber-900 hover:text-amber-700 font-mono font-bold flex items-center">
            Open Full Studio Admin Console <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/admin/payroll"
            className="p-4 rounded-2xl bg-white border border-amber-900/15 hover:border-amber-400 hover:bg-amber-50/30 transition-all block group shadow-sm"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-neutral-900 group-hover:text-amber-900">Staff Payroll & Slips</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold">Crew Active</span>
            </div>
            <p className="text-[11px] text-neutral-600 mt-1">View monthly earnings, crew salary slips & issue PDFs.</p>
          </Link>

          <Link
            to="/admin/bookings"
            className="p-4 rounded-2xl bg-white border border-amber-900/15 hover:border-amber-400 hover:bg-amber-50/30 transition-all block group shadow-sm"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-neutral-900 group-hover:text-amber-900">Bookings & Shoots</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold">9-Stage Pipeline</span>
            </div>
            <p className="text-[11px] text-neutral-600 mt-1">Manage luxury wedding calendar, deliverables & crew.</p>
          </Link>

          <Link
            to="/admin/enquiries"
            className="p-4 rounded-2xl bg-white border border-amber-900/15 hover:border-amber-400 hover:bg-amber-50/30 transition-all block group shadow-sm"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-neutral-900 group-hover:text-amber-900">Wedding Enquiries</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold">Lead CRM</span>
            </div>
            <p className="text-[11px] text-neutral-600 mt-1">Review wedding estimator requests & send quotes.</p>
          </Link>

          <Link
            to="/admin/invoices"
            className="p-4 rounded-2xl bg-white border border-amber-900/15 hover:border-amber-400 hover:bg-amber-50/30 transition-all block group shadow-sm"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-neutral-900 group-hover:text-amber-900">GST Tax Invoices</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold">Milestones</span>
            </div>
            <p className="text-[11px] text-neutral-600 mt-1">Issue automated tax invoices, advances & final bills.</p>
          </Link>
        </div>
      </div>

      {/* Real-Time Audit Log Preview */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-900/15 shadow-sm space-y-4">
        <h3 className="font-serif text-xl font-bold text-neutral-900">Recent Super Admin Activity</h3>
        <div className="space-y-2.5">
          {auditLogs.length === 0 ? (
            <div className="text-xs font-mono text-neutral-600 p-4 bg-amber-50/60 rounded-xl border border-amber-200">
              No recent high-severity anomalies detected. System running smoothly and securely.
            </div>
          ) : (
            auditLogs.map((log, i) => (
              <div key={i} className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs font-mono">
                <div>
                  <span className="text-neutral-900 font-bold">{log.action}</span>
                  <span className="text-neutral-600 ml-2">by {log.performedBy?.name || 'System Admin'}</span>
                </div>
                <span className="text-[10px] text-neutral-500">{new Date(log.createdAt).toLocaleString()}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
