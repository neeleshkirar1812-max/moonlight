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
    <div className="space-y-8 animate-fade-in text-neutral-900">
      <div className="border-b border-amber-900/10 pb-4">
        <span className="text-xs uppercase tracking-widest text-amber-800 font-bold block font-mono">
          Immutable Ledger
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900">
          System Security & Audit Logs
        </h1>
        <p className="text-xs text-neutral-600 mt-1">
          Cryptographically recorded actions, authentication events, and administrative changes.
        </p>
      </div>

      <div className="bg-white rounded-3xl overflow-hidden border border-amber-900/15 shadow-sm">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full min-w-[650px] text-left text-xs">
            <thead className="bg-stone-100 border-b border-stone-200 uppercase tracking-wider text-amber-900 font-mono text-[10px]">
              <tr>
                <th className="p-4">Action Event</th>
                <th className="p-4">Resource Target</th>
                <th className="p-4">User</th>
                <th className="p-4">IP Address</th>
                <th className="p-4">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 text-neutral-800">
              {logs.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-neutral-500 font-mono">
                    No audit records logged yet.
                  </td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr key={log._id} className="hover:bg-amber-50/30 transition-colors">
                    <td className="p-4 font-mono font-bold text-neutral-900">
                      <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-[10.5px]">
                        {log.action}
                      </span>
                    </td>
                    <td className="p-4 text-neutral-700">{log.resourceType || 'General'}</td>
                    <td className="p-4 text-neutral-900 font-semibold">{log.performedBy?.name || 'System / Root'}</td>
                    <td className="p-4 font-mono text-neutral-500">{log.ipAddress || '127.0.0.1'}</td>
                    <td className="p-4 font-mono text-neutral-500">{new Date(log.createdAt).toLocaleString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminAuditLogs;
