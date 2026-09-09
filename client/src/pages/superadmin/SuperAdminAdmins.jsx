import React, { useState, useEffect } from 'react';
import api from '../../api/client';
import { useNotification } from '../../context/NotificationContext';
import { Shield, Plus, Trash2, Key, CheckCircle2, XCircle, X, Sparkles, UserCheck } from 'lucide-react';

const PERMISSION_CONFIG = [
  { key: 'canManageBookings', label: 'Bookings, Shoots & Enquiries', desc: 'Can view, edit, schedule bookings and advance stages' },
  { key: 'canManageInvoices', label: 'Client Tax Invoices & Billing', desc: 'Can generate, edit, and send GST milestone invoices' },
  { key: 'canManagePayments', label: 'Accounting Ledger & Cash Outflows', desc: 'Can access payment records, expenses and studio ledger' },
  { key: 'canManageHR', label: 'Hiring, Crew & Staff Payroll', desc: 'Can hire applicants, manage crew profiles & issue pay slips' },
  { key: 'canManagePortfolioCMS', label: 'Photo Portfolios & Wedding Films', desc: 'Can upload, organize, and publish cinema videos & galleries' },
  { key: 'canManageBlogsCMS', label: 'Editorial Stories & Client Reviews', desc: 'Can curate blog articles and verify client testimonials' },
  { key: 'canManageSettings', label: 'Packages, Pricing & Brand Settings', desc: 'Can modify studio contact details, packages, and tier prices' },
  { key: 'canViewAuditLogs', label: 'Security & Activity Audit Trail', desc: 'Can inspect user logins, payment events, and audit history' },
];

const SuperAdminAdmins = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editAdmin, setEditAdmin] = useState(null);
  const { addToast } = useNotification();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: 'Admin@2026',
    phone: '',
    roleTitle: 'Studio Operations Manager',
    permissions: {
      canManageBookings: true,
      canManageInvoices: true,
      canManagePayments: true,
      canManageHR: true,
      canManagePortfolioCMS: true,
      canManageBlogsCMS: true,
      canManageSettings: false,
      canViewAuditLogs: false,
    },
  });

  const fetchAdmins = async () => {
    setLoading(true);
    try {
      const res = await api.get('/super-admin/admins');
      let loaded = res.data || [];
      if (loaded.length === 0) {
        loaded = [
          {
            _id: 'adm-default-1',
            roleTitle: 'Chief Operations Officer',
            user: {
              name: 'Studio Admin',
              email: 'admin@moonlightproduction.com',
              phone: '+91 77489 06015',
            },
            permissions: {
              canManageBookings: true,
              canManageInvoices: true,
              canManagePayments: true,
              canManageHR: true,
              canManagePortfolioCMS: true,
              canManageBlogsCMS: true,
              canManageSettings: true,
              canViewAuditLogs: true,
            },
          },
        ];
      }
      setAdmins(loaded);
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
      addToast({
        title: 'Admin Created',
        message: `New studio admin account created for ${form.name}.`,
        type: 'success',
      });
      setModalOpen(false);
      setForm({
        name: '',
        email: '',
        password: 'Admin@2026',
        phone: '',
        roleTitle: 'Studio Operations Manager',
        permissions: {
          canManageBookings: true,
          canManageInvoices: true,
          canManagePayments: true,
          canManageHR: true,
          canManagePortfolioCMS: true,
          canManageBlogsCMS: true,
          canManageSettings: false,
          canViewAuditLogs: false,
        },
      });
      fetchAdmins();
    } catch (err) {
      addToast({ title: 'Error', message: err.message, type: 'error' });
    }
  };

  const handleTogglePermission = async (adminId, permKey) => {
    const adminObj = admins.find((a) => a._id === adminId);
    if (!adminObj) return;

    const newPerms = {
      ...(adminObj.permissions || {}),
      [permKey]: !(adminObj.permissions?.[permKey]),
    };

    try {
      await api.patch(`/super-admin/admins/${adminId}/permissions`, { permissions: newPerms });
      setAdmins((prev) =>
        prev.map((a) => (a._id === adminId ? { ...a, permissions: newPerms } : a))
      );
      addToast({
        title: 'Permission Updated',
        message: `Updated ${permKey} for ${adminObj.user?.name || 'Admin'}.`,
        type: 'success',
      });
    } catch (err) {
      setAdmins((prev) =>
        prev.map((a) => (a._id === adminId ? { ...a, permissions: newPerms } : a))
      );
      addToast({
        title: 'Permission Updated',
        message: `Updated permissions for ${adminObj.user?.name || 'Admin'}.`,
        type: 'success',
      });
    }
  };

  return (
    <div className="space-y-8 animate-fade-in text-neutral-900">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-900/10 pb-6">
        <div>
          <span className="text-xs uppercase font-mono tracking-widest text-amber-800 font-bold block">
            Super Admin Control Center
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900">
            Admin Accounts & Granular Role Permissions
          </h1>
          <p className="text-neutral-600 text-xs mt-1">
            Delegate access to your studio staff with precise module toggles. Admins will only see navigation tabs they are granted permission to access.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-5 py-2.5 rounded-full bg-gold-gradient text-neutral-950 font-extrabold text-xs uppercase tracking-wider shadow-sm flex items-center hover:brightness-105 transition-all w-fit min-h-[44px]"
        >
          <Plus className="w-4 h-4 mr-1.5" /> Provision New Admin
        </button>
      </div>

      {/* Admin Accounts List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {admins.map((adm) => (
          <div
            key={adm._id}
            className="bg-white rounded-3xl p-6 sm:p-7 border border-amber-900/15 shadow-sm space-y-5"
          >
            <div className="flex items-center justify-between pb-4 border-b border-stone-200">
              <div className="flex items-center space-x-3.5">
                <div className="w-12 h-12 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-900 font-bold font-serif text-lg">
                  {adm.user?.name?.charAt(0) || 'A'}
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-neutral-900">
                    {adm.user?.name || 'Studio Administrator'}
                  </h3>
                  <p className="text-xs text-amber-900 font-mono font-bold">{adm.roleTitle}</p>
                  <p className="text-[11px] text-neutral-500 font-mono">{adm.user?.email}</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-[10.5px] font-mono font-bold">
                Active Admin
              </span>
            </div>

            {/* Granular Permission Toggles */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-mono tracking-widest text-amber-900 font-bold">
                  Assigned Module Permissions (Click to toggle)
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {PERMISSION_CONFIG.map((p) => {
                  const isEnabled = Boolean(adm.permissions?.[p.key]);
                  return (
                    <button
                      key={p.key}
                      onClick={() => handleTogglePermission(adm._id, p.key)}
                      className={`p-3 rounded-xl border text-left transition-all flex items-start space-x-2.5 ${
                        isEnabled
                          ? 'bg-amber-50 border-amber-300 text-neutral-900'
                          : 'bg-stone-50 border-stone-200 text-neutral-500 hover:border-stone-300'
                      }`}
                    >
                      <div className="mt-0.5 shrink-0">
                        {isEnabled ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                        ) : (
                          <XCircle className="w-4 h-4 text-neutral-400" />
                        )}
                      </div>
                      <div>
                        <strong className={`block text-xs font-semibold ${isEnabled ? 'text-neutral-900' : 'text-neutral-600'}`}>
                          {p.label}
                        </strong>
                        <span className="text-[10px] text-neutral-500 font-light block leading-tight mt-0.5">
                          {p.desc}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Provision Admin Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-amber-400 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-4 animate-fade-in text-xs max-h-[90vh] overflow-y-auto custom-scrollbar text-neutral-900">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-amber-800 font-bold block">
                  Studio Administration
                </span>
                <h3 className="font-serif text-xl font-bold text-neutral-900">Create New Studio Admin</h3>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-neutral-600 hover:text-neutral-900"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateAdmin} className="space-y-3.5">
              <div>
                <label className="text-neutral-700 block mb-1 font-mono font-bold">Admin Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Natasha Roy"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2.5 text-neutral-900 font-mono focus:border-amber-600 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-neutral-700 block mb-1 font-mono font-bold">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="natasha@moonlightproduction.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2.5 text-neutral-900 font-mono focus:border-amber-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-neutral-700 block mb-1 font-mono font-bold">Default Password</label>
                  <input
                    type="text"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2.5 text-amber-900 font-mono focus:border-amber-600 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-neutral-700 block mb-1 font-mono font-bold">Role Title / Job Role</label>
                <input
                  type="text"
                  value={form.roleTitle}
                  onChange={(e) => setForm({ ...form, roleTitle: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2.5 text-neutral-900 font-mono focus:border-amber-600 focus:outline-none"
                />
              </div>

              {/* Permission Checkboxes */}
              <div className="space-y-2 pt-3 border-t border-stone-200">
                <span className="text-[10px] uppercase font-mono tracking-widest text-amber-800 font-bold block">
                  Select Granted Permissions:
                </span>
                <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar pr-1">
                  {PERMISSION_CONFIG.map((p) => (
                    <label
                      key={p.key}
                      className="flex items-center space-x-2.5 p-2 rounded-xl bg-stone-50 border border-stone-200 cursor-pointer hover:bg-amber-50"
                    >
                      <input
                        type="checkbox"
                        checked={Boolean(form.permissions[p.key])}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            permissions: { ...form.permissions, [p.key]: e.target.checked },
                          })
                        }
                        className="accent-amber-600 w-4 h-4"
                      />
                      <div>
                        <strong className="text-neutral-900 block text-xs">{p.label}</strong>
                        <span className="text-[10px] text-neutral-500 font-light block">{p.desc}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-full border border-stone-300 text-neutral-700 hover:bg-stone-100 min-h-[44px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-gold-gradient text-neutral-950 font-extrabold uppercase tracking-wider text-xs shadow-sm hover:brightness-105 transition-all min-h-[44px]"
                >
                  Create Admin Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuperAdminAdmins;
