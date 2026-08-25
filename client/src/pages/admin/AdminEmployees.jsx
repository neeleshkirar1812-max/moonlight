import React, { useState, useEffect } from 'react';
import api from '../../api/client';
import { useNotification } from '../../context/NotificationContext';
import { ShieldCheck, Plus, UserPlus, Phone, Mail, Camera, X, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

const defaultCrew = [
  {
    _id: 'emp-1',
    name: 'Rohan Verma',
    designation: 'Lead Cinematographer & Director',
    department: 'Cinematography',
    user: { email: 'lead.photographer@moonlightproduction.com', phone: '+91 92292 29323' },
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    status: 'active',
  },
  {
    _id: 'emp-2',
    name: 'Priya Mehta',
    designation: 'Senior Candid Master',
    department: 'Royal Portraiture',
    user: { email: 'priya.candid@moonlightproduction.com', phone: '+91 97555 12340' },
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    status: 'pending_approval',
  },
  {
    _id: 'emp-3',
    name: 'Kabir Singh',
    designation: '4K Commercial Drone Pilot',
    department: 'Aerial Cinematography',
    user: { email: 'kabir.drone@moonlightproduction.com', phone: '+91 98260 44556' },
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    status: 'pending_approval',
  },
];

const AdminEmployees = () => {
  const [employees, setEmployees] = useState(defaultCrew);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { addToast } = useNotification();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: 'Employee@2026',
    phone: '',
    designation: 'Master Cinematographer',
    department: 'Cinematography',
  });

  const handleCreateEmployee = (e) => {
    e.preventDefault();
    const newEmp = {
      _id: `emp-${Date.now()}`,
      name: form.name,
      designation: form.designation,
      department: form.department,
      user: { email: form.email, phone: form.phone },
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
      status: 'pending_approval',
    };

    setEmployees([newEmp, ...employees]);

    // Also push to Super Admin Pending Approvals Queue in localStorage
    const pending = JSON.parse(localStorage.getItem('moonlight_pending_approvals') || '[]');
    pending.unshift({
      id: `REQ-${Date.now().toString().slice(-3)}`,
      name: form.name,
      email: form.email,
      phone: form.phone,
      role: 'employee',
      designation: form.designation,
      createdBy: 'HR / Studio Admin',
      department: form.department,
      requestedAt: new Date().toISOString(),
      status: 'pending',
    });
    localStorage.setItem('moonlight_pending_approvals', JSON.stringify(pending));

    addToast({
      title: 'Crew Registration Submitted',
      message: 'Account request forwarded to Super Admin for login clearance.',
      type: 'success',
    });
    setModalOpen(false);
    setForm({ name: '', email: '', password: 'Employee@2026', phone: '', designation: 'Master Cinematographer', department: 'Cinematography' });
  };

  return (
    <div className="space-y-8 animate-fade-in text-white">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-mono tracking-widest text-gold-400 font-bold block">
            HR & Talent Operations
          </span>
          <h1 className="font-serif text-3xl font-bold text-white">Production Crew & Employees</h1>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-5 py-2.5 rounded-full bg-gold-gradient text-black font-extrabold text-xs uppercase tracking-wider shadow-gold-subtle hover:brightness-110 active:scale-95 transition-all flex items-center btn-shimmer"
        >
          <UserPlus className="w-4 h-4 mr-1.5" /> Add New Crew Member
        </button>
      </div>

      {/* HR Delegation Notice */}
      <div className="p-4 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-between text-xs">
        <div className="flex items-center space-x-2.5">
          <ShieldCheck className="w-5 h-5 text-gold-400 shrink-0" />
          <p className="text-neutral-200">
            <strong>HR Delegation Notice:</strong> HR creates team member profiles with shoot designations. The Super Admin Director reviews and grants final login clearance.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {employees.map((emp) => (
          <div key={emp._id} className="bg-[#141418] rounded-3xl p-6 border border-white/10 hover:border-gold-500/40 shadow-xl space-y-4 transition-all">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center space-x-3">
                <img
                  src={emp.avatar}
                  alt={emp.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-gold-400"
                />
                <div>
                  <h3 className="font-serif text-base font-bold text-white">{emp.name}</h3>
                  <p className="text-[11px] text-gold-400 font-mono">{emp.designation}</p>
                </div>
              </div>
            </div>

            <div className="space-y-1.5 text-xs text-neutral-300">
              <p className="flex items-center"><Mail className="w-3.5 h-3.5 mr-2 text-gold-400" /> {emp.user?.email}</p>
              <p className="flex items-center"><Phone className="w-3.5 h-3.5 mr-2 text-gold-400" /> {emp.user?.phone}</p>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-[10px] font-mono text-neutral-400">Department: {emp.department}</span>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                emp.status === 'active'
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/40'
                  : 'bg-amber-500/15 text-amber-300 border border-amber-500/40'
              }`}>
                {emp.status === 'active' ? '✅ Active Login' : '⏳ Pending Super Admin'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#141418] border border-gold-500/40 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4 animate-fade-in text-xs text-white">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="font-serif text-xl font-bold text-white">Add Crew Member (HR Request)</h3>
              <button onClick={() => setModalOpen(false)} className="text-neutral-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>

            <form onSubmit={handleCreateEmployee} className="space-y-3">
              <div>
                <label className="text-neutral-300 block mb-1 font-bold">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vikramaditya Seth"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-black/70 border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-gold-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-neutral-300 block mb-1 font-bold">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="vikram@moonlightproduction.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-black/70 border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-gold-400"
                  />
                </div>
                <div>
                  <label className="text-neutral-300 block mb-1 font-bold">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98200 12345"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full bg-black/70 border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-gold-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-neutral-300 block mb-1 font-bold">Designation</label>
                  <input
                    type="text"
                    value={form.designation}
                    onChange={(e) => setForm({ ...form, designation: e.target.value })}
                    className="w-full bg-black/70 border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-neutral-300 block mb-1 font-bold">Department</label>
                  <input
                    type="text"
                    value={form.department}
                    onChange={(e) => setForm({ ...form, department: e.target.value })}
                    className="w-full bg-black/70 border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="p-3 bg-black/60 rounded-xl border border-white/10 text-[11px] text-neutral-400 space-y-1">
                <span className="text-gold-400 font-bold block">🔒 Super Admin Clearance:</span>
                <p>After clicking submit, this profile will be queued for Super Admin approval before credentials become active.</p>
              </div>

              <div className="flex justify-end space-x-3 pt-3 border-t border-white/10">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 rounded-full border border-white/15 text-neutral-300">Cancel</button>
                <button type="submit" className="px-6 py-2 rounded-full bg-gold-gradient text-black font-extrabold uppercase btn-shimmer">Submit for Approval</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEmployees;
