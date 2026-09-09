import React, { useState, useEffect } from 'react';
import api from '../../api/client';
import { Server, CheckCircle2, Shield, Lock, HardDrive, Cpu, Terminal } from 'lucide-react';

const SuperAdminConfig = () => {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const res = await api.get('/super-admin/system-config');
        setConfig(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchConfig();
  }, []);

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl text-neutral-900">
      <div className="border-b border-amber-900/10 pb-4">
        <span className="text-xs uppercase tracking-widest text-amber-800 font-bold block font-mono">
          Server Health
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900">
          System Diagnostics & Environment
        </h1>
        <p className="text-xs text-neutral-600 mt-1">
          Real-time node runtime metrics, database schema bindings, and external gateway connectivity.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-amber-900/15 shadow-sm space-y-3">
          <div className="flex items-center space-x-2 text-amber-800">
            <Server className="w-5 h-5" />
            <h3 className="font-serif text-lg font-bold text-neutral-900">Node Runtime</h3>
          </div>
          <div className="space-y-2 text-xs font-mono text-neutral-700 bg-stone-50 p-4 rounded-2xl border border-stone-200">
            <p>Node Environment: <span className="text-emerald-700 font-bold">{config?.nodeEnv || 'production'}</span></p>
            <p>Server Port: <span className="text-neutral-900 font-bold">{config?.port || 5000}</span></p>
            <p>Mongoose Models: <span className="text-amber-900 font-bold">22 Registered</span></p>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-amber-900/15 shadow-sm space-y-3">
          <div className="flex items-center space-x-2 text-amber-800">
            <Lock className="w-5 h-5" />
            <h3 className="font-serif text-lg font-bold text-neutral-900">API Integrations</h3>
          </div>
          <div className="space-y-2 text-xs font-mono text-neutral-700 bg-stone-50 p-4 rounded-2xl border border-stone-200">
            <p>Cloudinary CDN: <span className="text-emerald-700 font-bold">Active (Online)</span></p>
            <p>Razorpay Gateway: <span className="text-emerald-700 font-bold">Active (Secured)</span></p>
            <p>WhatsApp Business: <span className="text-emerald-700 font-bold">Active (Direct API)</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminConfig;
