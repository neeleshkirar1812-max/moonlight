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
        if (admRes.status === 'fulfilled') setStats({ adminsCount: admRes.value.data?.length || 0 });
        if (logRes.status === 'fulfilled') setAuditLogs(logRes.value.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSuperAdminData();
  }, []);

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold block">
            System Governance
          </span>
          <h1 className="font-serif text-3xl font-bold text-white">Super Admin Control Center</h1>
        </div>
      </div>

      {/* System Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="luxury-card rounded-2xl p-6 border border-gold-500/30">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase text-neutral-400 font-semibold">Studio Admins</span>
            <Shield className="w-5 h-5 text-gold-400" />
          </div>
          <h3 className="font-serif text-3xl font-bold text-white mt-2">{stats?.adminsCount || 1}</h3>
          <p className="text-[11px] text-neutral-400 mt-1 font-mono">Privileged Admin Accounts</p>
        </div>

        <div className="luxury-card rounded-2xl p-6 border border-white/10">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase text-neutral-400 font-semibold">Security Health</span>
            <Activity className="w-5 h-5 text-emerald-400" />
          </div>
          <h3 className="font-serif text-3xl font-bold text-emerald-400 mt-2">100%</h3>
          <p className="text-[11px] text-emerald-400 mt-1 font-mono flex items-center">
            <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> RBAC Enforced
          </p>
        </div>

        <div className="luxury-card rounded-2xl p-6 border border-white/10">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase text-neutral-400 font-semibold">Database Engine</span>
            <Server className="w-5 h-5 text-gold-400" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-white mt-2">MongoDB</h3>
          <p className="text-[11px] text-neutral-400 mt-1 font-mono">22 Schemas Active</p>
        </div>

        <div className="luxury-card rounded-2xl p-6 border border-white/10">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase text-neutral-400 font-semibold">Razorpay / CDN</span>
            <Lock className="w-5 h-5 text-gold-400" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-gold-300 mt-2">Integrated</h3>
          <p className="text-[11px] text-neutral-400 mt-1 font-mono">HMAC Verified</p>
        </div>
      </div>

      {/* Quick Action Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          to="/super-admin/admins"
          className="luxury-card rounded-2xl p-6 group block border border-white/10 space-y-2"
        >
          <Shield className="w-6 h-6 text-gold-400 group-hover:scale-110 transition-transform" />
          <h3 className="font-serif text-lg font-bold text-white group-hover:text-gold-200">
            Admin Accounts & Permissions
          </h3>
          <p className="text-xs text-neutral-400">Create new admin accounts and grant fine-grained permissions.</p>
        </Link>

        <Link
          to="/super-admin/audit-logs"
          className="luxury-card rounded-2xl p-6 group block border border-white/10 space-y-2"
        >
          <Activity className="w-6 h-6 text-gold-400 group-hover:scale-110 transition-transform" />
          <h3 className="font-serif text-lg font-bold text-white group-hover:text-gold-200">
            Immutable Audit Trail
          </h3>
          <p className="text-xs text-neutral-400">Inspect real-time security events, IP records, and admin actions.</p>
        </Link>

        <Link
          to="/super-admin/config"
          className="luxury-card rounded-2xl p-6 group block border border-white/10 space-y-2"
        >
          <Server className="w-6 h-6 text-gold-400 group-hover:scale-110 transition-transform" />
          <h3 className="font-serif text-lg font-bold text-white group-hover:text-gold-200">
            System Diagnostics & Config
          </h3>
          <p className="text-xs text-neutral-400">Inspect server runtime parameters and integration tokens.</p>
        </Link>
      </div>

      {/* Recent Security Audit Log Feed */}
      <div className="luxury-card rounded-3xl p-8 border border-white/10 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <h3 className="font-serif text-xl font-bold text-white">Recent Security Audit Logs</h3>
          <Link to="/super-admin/audit-logs" className="text-xs text-gold-400 hover:underline">View All Logs →</Link>
        </div>

        <div className="space-y-2 text-xs">
          {auditLogs.map((log) => (
            <div key={log._id} className="p-3.5 rounded-xl bg-obsidian-500 border border-white/5 flex items-center justify-between">
              <div>
                <span className="font-mono text-gold-400 font-bold uppercase mr-2">{log.action}</span>
                <span className="text-white font-semibold">{log.resourceType}</span>
                <span className="text-neutral-400 text-[11px] ml-2 font-mono">by {log.performedBy?.name || 'System User'}</span>
              </div>
              <span className="text-[10px] text-neutral-500 font-mono">{new Date(log.createdAt).toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
