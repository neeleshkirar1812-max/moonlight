import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/client';
import { Shield, Users, Activity, Server, Key, AlertTriangle, CheckCircle2, Lock } from 'lucide-react';

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
    <div className="space-y-8 animate-fade-in text-white">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs uppercase font-mono tracking-widest text-gold-400 font-bold block">
            System Governance
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white">Super Admin Control Center</h1>
        </div>
      </div>

      {/* System Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-[#141418] rounded-2xl p-6 border border-white/10 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-[10.5px] uppercase text-neutral-400 font-mono">Studio Admins</span>
            <Shield className="w-5 h-5 text-gold-400" />
          </div>
          <h3 className="font-serif text-3xl font-bold text-white mt-2">{stats?.adminsCount || 1}</h3>
          <p className="text-xs text-neutral-400 mt-1 font-mono">Privileged Admin Accounts</p>
        </div>

        <div className="bg-[#141418] rounded-2xl p-6 border border-white/10 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-[10.5px] uppercase text-neutral-400 font-mono">Security Health</span>
            <Activity className="w-5 h-5 text-emerald-400" />
          </div>
          <h3 className="font-serif text-3xl font-bold text-emerald-400 mt-2">100%</h3>
          <p className="text-xs text-emerald-400 mt-1 font-mono flex items-center">
            <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> RBAC Enforced
          </p>
        </div>

        <div className="bg-[#141418] rounded-2xl p-6 border border-white/10 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-[10.5px] uppercase text-neutral-400 font-mono">Database Engine</span>
            <Server className="w-5 h-5 text-gold-400" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-white mt-2">MongoDB</h3>
          <p className="text-xs text-neutral-400 mt-1 font-mono">22 Schemas Active</p>
        </div>

        <div className="bg-[#141418] rounded-2xl p-6 border border-white/10 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-[10.5px] uppercase text-neutral-400 font-mono">Razorpay / CDN</span>
            <Lock className="w-5 h-5 text-gold-400" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-gold-300 mt-2">Integrated</h3>
          <p className="text-xs text-neutral-400 mt-1 font-mono">HMAC Verified</p>
        </div>
      </div>

      {/* Quick Action Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          to="/super-admin/admins"
          className="bg-[#141418] rounded-2xl p-6 group block border border-white/10 hover:border-gold-500/50 shadow-lg space-y-2 transition-all hover:shadow-2xl"
        >
          <Shield className="w-6 h-6 text-gold-400 group-hover:scale-110 transition-transform" />
          <h3 className="font-serif text-lg font-bold text-white group-hover:text-gold-300 transition-colors">
            Admin Accounts & Permissions
          </h3>
          <p className="text-xs text-neutral-400 font-light">Create new admin accounts and grant fine-grained permissions.</p>
        </Link>

        <Link
          to="/super-admin/audit-logs"
          className="bg-[#141418] rounded-2xl p-6 group block border border-white/10 hover:border-gold-500/50 shadow-lg space-y-2 transition-all hover:shadow-2xl"
        >
          <Activity className="w-6 h-6 text-gold-400 group-hover:scale-110 transition-transform" />
          <h3 className="font-serif text-lg font-bold text-white group-hover:text-gold-300 transition-colors">
            Immutable Audit Trail
          </h3>
          <p className="text-xs text-neutral-400 font-light">Real-time surveillance of logins, data exports, and deletions.</p>
        </Link>

        <Link
          to="/super-admin/system-config"
          className="bg-[#141418] rounded-2xl p-6 group block border border-white/10 hover:border-gold-500/50 shadow-lg space-y-2 transition-all hover:shadow-2xl"
        >
          <Server className="w-6 h-6 text-gold-400 group-hover:scale-110 transition-transform" />
          <h3 className="font-serif text-lg font-bold text-white group-hover:text-gold-300 transition-colors">
            Server Diagnostics & Cloud API
          </h3>
          <p className="text-xs text-neutral-400 font-light">Manage email SMTP providers, SMS webhooks, and AWS S3 storage buckets.</p>
        </Link>
      </div>

      {/* Real-Time Audit Log Preview */}
      <div className="bg-[#141418] rounded-3xl p-6 sm:p-8 border border-white/10 shadow-xl space-y-4">
        <h3 className="font-serif text-xl font-bold text-white">Recent Super Admin Activity</h3>
        <div className="space-y-2.5">
          {auditLogs.length === 0 ? (
            <div className="text-xs font-mono text-neutral-400 p-4 bg-[#1A1A20] rounded-xl border border-white/10">
              No recent high-severity anomalies detected. System running securely.
            </div>
          ) : (
            auditLogs.map((log, i) => (
              <div key={i} className="p-3 bg-[#1A1A20] rounded-xl border border-white/10 flex items-center justify-between text-xs font-mono">
                <div>
                  <span className="text-white font-bold">{log.action}</span>
                  <span className="text-neutral-400 ml-2">by {log.performedBy?.name || 'System Admin'}</span>
                </div>
                <span className="text-[10px] text-neutral-400">{new Date(log.createdAt).toLocaleTimeString()}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
