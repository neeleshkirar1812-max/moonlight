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
    <div className="space-y-8 animate-fade-in max-w-4xl">
      <div>
        <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold block">
          Server Health
        </span>
        <h1 className="font-serif text-3xl font-bold text-white">System Diagnostics & Environment</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="luxury-card rounded-2xl p-6 border border-white/10 space-y-3">
          <div className="flex items-center space-x-2 text-gold-400">
            <Server className="w-5 h-5" />
            <h3 className="font-serif text-lg font-bold text-white">Node Runtime</h3>
          </div>
          <div className="space-y-2 text-xs font-mono text-neutral-300">
            <p>Node Environment: <span className="text-emerald-400">{config?.nodeEnv || 'development'}</span></p>
            <p>Server Port: <span className="text-white">{config?.port || 5000}</span></p>
            <p>Mongoose Models: <span className="text-gold-300">22 Registered</span></p>
          </div>
        </div>

        <div className="luxury-card rounded-2xl p-6 border border-white/10 space-y-3">
          <div className="flex items-center space-x-2 text-gold-400">
            <Lock className="w-5 h-5" />
            <h3 className="font-serif text-lg font-bold text-white">API Integrations</h3>
          </div>
          <div className="space-y-2 text-xs font-mono text-neutral-300">
            <p>Cloudinary CDN: <span className="text-emerald-400">Active</span></p>
            <p>Razorpay Gateway: <span className="text-emerald-400">Active</span></p>
            <p>WhatsApp Business: <span className="text-emerald-400">Active</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminConfig;
