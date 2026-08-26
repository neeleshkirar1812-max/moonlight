import React, { useState, useEffect } from 'react';
import api from '../../api/client';
import { Activity, Shield, Filter, Search } from 'lucide-react';

const SuperAdminAuditLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await api.get('/super-admin/audit-logs');
        setLogs(res.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold block">
          Immutable Ledger
        </span>
        <h1 className="font-serif text-3xl font-bold text-white">System Security & Audit Logs</h1>
      </div>

      <div className="luxury-card rounded-2xl overflow-hidden border border-white/10">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full min-w-[650px] text-left text-xs">
            <thead className="bg-obsidian-500 border-b border-white/10 uppercase tracking-wider text-gold-400 font-mono">
              <tr>
                <th className="p-4">Action Event</th>
                <th className="p-4">Resource Target</th>
                <th className="p-4">User</th>
                <th className="p-4">IP Address</th>
                <th className="p-4">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-neutral-300">
              {logs.map((log) => (
                <tr key={log._id} className="hover:bg-white/5 transition-colors">
                  <td className="p-4 font-mono font-bold text-white">
                    <span className="px-2.5 py-0.5 rounded bg-gold-500/20 text-gold-300 border border-gold-500/30">
                      {log.action}
                    </span>
                  </td>
                  <td className="p-4 text-neutral-300">{log.resourceType}</td>
                  <td className="p-4 text-white font-medium">{log.performedBy?.name || 'System / Guest'}</td>
                  <td className="p-4 font-mono text-neutral-400">{log.ipAddress || '127.0.0.1'}</td>
                  <td className="p-4 font-mono text-neutral-400">{new Date(log.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminAuditLogs;
