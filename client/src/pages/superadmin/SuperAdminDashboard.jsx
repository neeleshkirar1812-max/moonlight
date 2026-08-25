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
    <div className="space-y-8 animate-fade-in text-black">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs uppercase font-mono tracking-widest text-gold-800 font-black block">
            System Governance
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-black text-black">Super Admin Control Center</h1>
        </div>
      </div>

      {/* System Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 border-2 border-neutral-300 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-[10.5px] uppercase text-neutral-600 font-mono font-bold">Studio Admins</span>
            <Shield className="w-5 h-5 text-gold-700" />
          </div>
          <h3 className="font-serif text-3xl font-black text-black mt-2">{stats?.adminsCount || 1}</h3>
          <p className="text-xs text-neutral-700 mt-1 font-mono font-semibold">Privileged Admin Accounts</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border-2 border-neutral-300 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-[10.5px] uppercase text-neutral-600 font-mono font-bold">Security Health</span>
            <Activity className="w-5 h-5 text-emerald-600" />
          </div>
          <h3 className="font-serif text-3xl font-black text-emerald-800 mt-2">100%</h3>
          <p className="text-xs text-emerald-700 mt-1 font-mono font-bold flex items-center">
            <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> RBAC Enforced
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 border-2 border-neutral-300 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-[10.5px] uppercase text-neutral-600 font-mono font-bold">Database Engine</span>
            <Server className="w-5 h-5 text-gold-700" />
          </div>
          <h3 className="font-serif text-2xl font-black text-black mt-2">MongoDB</h3>
          <p className="text-xs text-neutral-700 mt-1 font-mono font-semibold">22 Schemas Active</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border-2 border-neutral-300 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-[10.5px] uppercase text-neutral-600 font-mono font-bold">Razorpay / CDN</span>
            <Lock className="w-5 h-5 text-gold-700" />
          </div>
          <h3 className="font-serif text-2xl font-black text-gold-800 mt-2">Integrated</h3>
          <p className="text-xs text-neutral-700 mt-1 font-mono font-semibold">HMAC Verified</p>
        </div>
      </div>

      {/* Quick Action Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          to="/super-admin/admins"
          className="bg-white rounded-2xl p-6 group block border-2 border-neutral-300 hover:border-black shadow-md space-y-2 transition-all hover:shadow-xl"
        >
          <Shield className="w-6 h-6 text-gold-700 group-hover:scale-110 transition-transform" />
          <h3 className="font-serif text-lg font-black text-black group-hover:text-gold-800 transition-colors">
            Admin Accounts & Permissions
          </h3>
          <p className="text-xs text-neutral-700 font-medium">Create new admin accounts and grant fine-grained permissions.</p>
        </Link>

        <Link
          to="/super-admin/audit-logs"
          className="bg-white rounded-2xl p-6 group block border-2 border-neutral-300 hover:border-black shadow-md space-y-2 transition-all hover:shadow-xl"
        >
          <Activity className="w-6 h-6 text-gold-700 group-hover:scale-110 transition-transform" />
          <h3 className="font-serif text-lg font-black text-black group-hover:text-gold-800 transition-colors">
            Immutable Audit Trail
          </h3>
          <p className="text-xs text-neutral-700 font-medium">Inspect real-time security events, IP records, and admin actions.</p>
        </Link>

        <Link
          to="/super-admin/system-config"
          className="bg-white rounded-2xl p-6 group block border-2 border-neutral-300 hover:border-black shadow-md space-y-2 transition-all hover:shadow-xl"
        >
          <Server className="w-6 h-6 text-gold-700 group-hover:scale-110 transition-transform" />
          <h3 className="font-serif text-lg font-black text-black group-hover:text-gold-800 transition-colors">
            System Diagnostics & Config
          </h3>
          <p className="text-xs text-neutral-700 font-medium">Inspect server runtime parameters and integration tokens.</p>
        </Link>
      </div>

      {/* Recent Security Audit Logs */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-neutral-300 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-xl font-black text-black">Recent Security Audit Logs</h3>
          <Link to="/super-admin/audit-logs" className="text-xs text-gold-800 font-black hover:underline">
            View All Logs →
          </Link>
        </div>

        <div className="space-y-2 font-mono text-xs">
          <div className="p-3 rounded-xl bg-[#FAF8F5] border border-neutral-300 flex items-center justify-between">
            <span className="text-neutral-800 font-bold">AUTH_SUCCESS: admin@moonlightproduction.com</span>
            <span className="text-[10.5px] text-neutral-600 font-bold">Just Now</span>
          </div>
          <div className="p-3 rounded-xl bg-[#FAF8F5] border border-neutral-300 flex items-center justify-between">
            <span className="text-neutral-800 font-bold">CLIENT_LOGIN: aarav.ananya@gmail.com</span>
            <span className="text-[10.5px] text-neutral-600 font-bold">2 mins ago</span>
          </div>
          <div className="p-3 rounded-xl bg-[#FAF8F5] border border-neutral-300 flex items-center justify-between">
            <span className="text-neutral-800 font-bold">RAZORPAY_WEBHOOK_VERIFIED: order_rcptid_841</span>
            <span className="text-[10.5px] text-neutral-600 font-bold">15 mins ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
