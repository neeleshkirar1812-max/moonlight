import React, { useState, useEffect } from 'react';
import api from '../../api/client';
import { useNotification } from '../../context/NotificationContext';
import { Shield, Plus, Trash2, Key, CheckCircle2, X } from 'lucide-react';

const SuperAdminAdmins = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const { addToast } = useNotification();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: 'Admin@2026',
    phone: '',
    roleTitle: 'Studio Operations Admin',
    permissions: {
      canManagePortfolios: true,
      canManageEnquiries: true,
      canManageFinances: true,
      canManageUsers: true,
      canAccessSystemSettings: false,
    },
  });

  const fetchAdmins = async () => {
    setLoading(true);
    try {
      const res = await api.get('/super-admin/admins');
      setAdmins(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    try {
      await api.post('/super-admin/admins', form);
      addToast({ title: 'Admin Provisioned', message: 'New studio admin created with specified permissions.', type: 'success' });
      setModalOpen(false);
      setForm({
        name: '',
        email: '',
        password: 'Admin@2026',
        phone: '',
        roleTitle: 'Studio Operations Admin',
        permissions: { canManagePortfolios: true, canManageEnquiries: true, canManageFinances: true, canManageUsers: true, canAccessSystemSettings: false },
      });
      fetchAdmins();
    } catch (err) {
      addToast({ title: 'Error', message: err.message, type: 'error' });
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold block">
            Role Delegation
          </span>
          <h1 className="font-serif text-3xl font-bold text-white">Studio Admin Accounts & Permissions</h1>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-5 py-2.5 rounded-full bg-gold-gradient text-black font-bold text-xs uppercase tracking-wider shadow-gold-subtle flex items-center"
        >
          <Plus className="w-4 h-4 mr-1.5" /> Provision New Admin
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {admins.map((adm) => (
          <div key={adm._id} className="luxury-card rounded-2xl p-6 border border-white/10 space-y-4">
            <div className="flex items-center space-x-3.5 pb-3 border-b border-white/10">
              <div className="w-12 h-12 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 font-bold font-serif">
                {adm.user?.name?.charAt(0) || 'A'}
              </div>
              <div>
                <h3 className="font-serif text-base font-bold text-white">{adm.user?.name}</h3>
                <p className="text-[11px] text-gold-300 font-mono">{adm.roleTitle}</p>
                <p className="text-[10px] text-neutral-400">{adm.user?.email}</p>
              </div>
            </div>

            <div className="space-y-1 text-xs">
              <span className="text-[10px] uppercase font-mono text-neutral-400 block">Granted Permissions</span>
              <ul className="space-y-1 text-neutral-300">
                {adm.permissions?.canManagePortfolios && <li className="flex items-center"><CheckCircle2 className="w-3 h-3 mr-1.5 text-emerald-400" /> Manage Portfolios & Media</li>}
                {adm.permissions?.canManageEnquiries && <li className="flex items-center"><CheckCircle2 className="w-3 h-3 mr-1.5 text-emerald-400" /> Manage Enquiries & Quotes</li>}
                {adm.permissions?.canManageFinances && <li className="flex items-center"><CheckCircle2 className="w-3 h-3 mr-1.5 text-emerald-400" /> Financials & Razorpay Ledgers</li>}
                {adm.permissions?.canManageUsers && <li className="flex items-center"><CheckCircle2 className="w-3 h-3 mr-1.5 text-emerald-400" /> Client & Crew Profiles</li>}
                {adm.permissions?.canAccessSystemSettings && <li className="flex items-center"><CheckCircle2 className="w-3 h-3 mr-1.5 text-gold-400" /> Studio Global Settings</li>}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-obsidian-400 border border-gold-500/40 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4 animate-fade-in text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="font-serif text-xl font-bold text-white">Provision Studio Admin</h3>
              <button onClick={() => setModalOpen(false)} className="text-neutral-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>

            <form onSubmit={handleCreateAdmin} className="space-y-3">
              <div>
                <label className="text-neutral-300 block mb-1">Admin Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Natasha Roy"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-obsidian-500 border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-neutral-300 block mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="natasha@Moonlight Production.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-obsidian-500 border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-neutral-300 block mb-1">Password</label>
                  <input
                    type="text"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="w-full bg-obsidian-500 border border-white/15 rounded-xl px-3 py-2 text-gold-300 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-neutral-300 block mb-1">Role Title</label>
                <input
                  type="text"
                  value={form.roleTitle}
                  onChange={(e) => setForm({ ...form, roleTitle: e.target.value })}
                  className="w-full bg-obsidian-500 border border-white/15 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="space-y-2 pt-2 border-t border-white/10">
                <span className="text-neutral-300 font-semibold uppercase block">Permissions</span>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={form.permissions.canManagePortfolios}
                    onChange={(e) => setForm({ ...form, permissions: { ...form.permissions, canManagePortfolios: e.target.checked } })}
                    className="accent-gold-500"
                  />
                  <span className="text-neutral-200">Manage Portfolios & Media</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={form.permissions.canManageEnquiries}
                    onChange={(e) => setForm({ ...form, permissions: { ...form.permissions, canManageEnquiries: e.target.checked } })}
                    className="accent-gold-500"
                  />
                  <span className="text-neutral-200">Manage Enquiries & Quotations</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={form.permissions.canManageFinances}
                    onChange={(e) => setForm({ ...form, permissions: { ...form.permissions, canManageFinances: e.target.checked } })}
                    className="accent-gold-500"
                  />
                  <span className="text-neutral-200">Manage Financials & Invoices</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={form.permissions.canAccessSystemSettings}
                    onChange={(e) => setForm({ ...form, permissions: { ...form.permissions, canAccessSystemSettings: e.target.checked } })}
                    className="accent-gold-500"
                  />
                  <span className="text-neutral-200">Access Global Brand Settings</span>
                </label>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-white/10">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 rounded-full border border-white/15 text-neutral-300">Cancel</button>
                <button type="submit" className="px-6 py-2 rounded-full bg-gold-gradient text-black font-bold uppercase">Provision Admin</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuperAdminAdmins;
