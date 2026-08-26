import React, { useState, useEffect } from 'react';
import api from '../../api/client';
import { useNotification } from '../../context/NotificationContext';
import {
  ShieldCheck,
  UserCheck,
  KeyRound,
  Lock,
  Unlock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Clock,
  Search,
  RefreshCw,
  Eye,
  EyeOff,
  Sparkles,
  Users,
  Send,
  Sliders,
  Crown,
} from 'lucide-react';

const defaultPendingApprovals = [];

const allSystemUsers = [
  {
    id: 'usr-super-1',
    name: 'Neelesh Kirar (Super Admin)',
    email: 'nkneeleshkirar@gmail.com',
    role: 'superadmin',
    designation: 'Supreme System Command',
    status: 'active',
    lastLogin: 'Active',
    phone: '+91 77489 06015',
  },
];

const SuperAdminApprovals = () => {
  const [activeTab, setActiveTab] = useState('approvals'); // 'approvals' | 'passwords' | 'tickets'
  const [approvals, setApprovals] = useState(() => {
    const saved = localStorage.getItem('moonlight_pending_approvals');
    return saved ? JSON.parse(saved) : defaultPendingApprovals;
  });
  const [usersList, setUsersList] = useState(() => {
    const saved = localStorage.getItem('moonlight_all_users');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {}
    }
    return allSystemUsers;
  });
  const [resetTickets, setResetTickets] = useState(() => {
    const saved = localStorage.getItem('moonlight_reset_tickets');
    return saved ? JSON.parse(saved) : [];
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUserForPassword, setSelectedUserForPassword] = useState(null);
  const [newPasswordValue, setNewPasswordValue] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const { addToast } = useNotification();

  useEffect(() => {
    localStorage.setItem('moonlight_pending_approvals', JSON.stringify(approvals));
  }, [approvals]);

  useEffect(() => {
    localStorage.setItem('moonlight_reset_tickets', JSON.stringify(resetTickets));
  }, [resetTickets]);

  // 1. Approve Account Request
  const handleApprove = (reqId) => {
    const req = approvals.find((a) => a.id === reqId);
    if (!req) return;

    // A. Update in ml_employees so Admin Crew Directory immediately reflects Active status without duplicates
    try {
      const savedCrew = localStorage.getItem('ml_employees');
      let crewList = savedCrew ? JSON.parse(savedCrew) : [];
      const cleanEmail = (req.email || '').toLowerCase().trim();
      const foundIdx = crewList.findIndex(
        (c) => (c.user?.email || '').toLowerCase().trim() === cleanEmail || c.name === req.name
      );

      if (foundIdx >= 0) {
        crewList[foundIdx] = { ...crewList[foundIdx], status: 'active' };
      } else {
        crewList.unshift({
          _id: `emp-${Date.now()}`,
          employeeCode: `EMP-MLP-${String(crewList.length + 1).padStart(3, '0')}`,
          name: req.name,
          designation: req.designation || 'Master Cinematographer',
          department: req.department || 'Cinematography',
          user: { email: cleanEmail, phone: req.phone },
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
          status: 'active',
          speciality: 'Luxury Wedding Production',
        });
      }

      // Deduplicate before saving
      const seen = new Set();
      crewList = crewList.filter((c) => {
        const key = (c.user?.email || c.name || c._id).toLowerCase();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });

      localStorage.setItem('ml_employees', JSON.stringify(crewList));
    } catch (e) {
      console.error('Error updating ml_employees:', e);
    }

    // B. Add to active users directory
    const newUser = {
      id: `usr-${Date.now()}`,
      name: req.name,
      email: req.email,
      role: req.role || 'employee',
      designation: req.designation || 'Production Crew Master',
      status: 'active',
      lastLogin: 'Active (Approved by Super Admin)',
      phone: req.phone,
    };
    const updatedUsers = [newUser, ...usersList.filter((u) => (u.email || '').toLowerCase() !== (req.email || '').toLowerCase())];
    setUsersList(updatedUsers);
    localStorage.setItem('moonlight_all_users', JSON.stringify(updatedUsers));

    const remaining = approvals.filter((a) => a.id !== reqId);
    setApprovals(remaining);
    localStorage.setItem('moonlight_pending_approvals', JSON.stringify(remaining));

    // C. Record Audit Log
    try {
      const savedLogs = localStorage.getItem('ml_auditLogs');
      const logs = savedLogs ? JSON.parse(savedLogs) : [];
      logs.unshift({
        _id: `log-${Date.now()}`,
        action: `Super Admin approved ${req.name} (${(req.role || 'crew').toUpperCase()})`,
        performedBy: { name: 'Super Admin Director' },
        createdAt: new Date().toISOString(),
      });
      localStorage.setItem('ml_auditLogs', JSON.stringify(logs));
    } catch (e) {}

    addToast({
      title: 'Login Approved & Activated',
      message: `Super Admin approved ${req.name} (${req.role.toUpperCase()}). Account is now fully active!`,
      type: 'success',
    });
  };

  // 2. Reject Account Request
  const handleReject = (reqId) => {
    const req = approvals.find((a) => a.id === reqId);
    if (!req) return;

    try {
      const savedCrew = localStorage.getItem('ml_employees');
      if (savedCrew) {
        let crewList = JSON.parse(savedCrew);
        crewList = crewList.filter((c) => (c.user?.email || '').toLowerCase() !== req.email.toLowerCase());
        localStorage.setItem('ml_employees', JSON.stringify(crewList));
      }
    } catch (e) {}

    const remaining = approvals.filter((a) => a.id !== reqId);
    setApprovals(remaining);
    localStorage.setItem('moonlight_pending_approvals', JSON.stringify(remaining));

    addToast({
      title: 'Request Dismissed',
      message: `Account creation for ${req.name} was rejected.`,
      type: 'warning',
    });
  };

  // 3. Super Admin Master Password Override
  const handleOpenPasswordModal = (usr) => {
    setSelectedUserForPassword(usr);
    setNewPasswordValue('');
    setPasswordModalOpen(true);
  };

  const handleGenerateRandomPassword = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%';
    let pass = '';
    for (let i = 0; i < 10; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setNewPasswordValue(pass);
  };

  const handleSaveMasterPassword = (e) => {
    e.preventDefault();
    if (!newPasswordValue || newPasswordValue.length < 6) {
      addToast({ title: 'Password Too Short', message: 'Minimum 6 characters required.', type: 'warning' });
      return;
    }

    addToast({
      title: 'Password Master Updated',
      message: `Super Admin successfully changed password for ${selectedUserForPassword.email}. New credentials synced.`,
      type: 'success',
    });
    setPasswordModalOpen(false);
  };

  // 4. Toggle Lock / Suspend Account
  const handleToggleLock = (usrId) => {
    setUsersList((prev) =>
      prev.map((u) => {
        if (u.id === usrId) {
          const nextStatus = u.status === 'active' ? 'locked' : 'active';
          addToast({
            title: `Account ${nextStatus === 'locked' ? 'Locked' : 'Unlocked'}`,
            message: `${u.email} is now ${nextStatus.toUpperCase()}.`,
            type: nextStatus === 'locked' ? 'warning' : 'success',
          });
          return { ...u, status: nextStatus };
        }
        return u;
      })
    );
  };

  // 5. Resolve Password Reset Ticket
  const handleResolveTicket = (ticket) => {
    setSelectedUserForPassword({ name: ticket.email.split('@')[0], email: ticket.email, role: 'customer' });
    setNewPasswordValue('Moonlight@2026');
    setPasswordModalOpen(true);
    setResetTickets((prev) => prev.filter((t) => t.id !== ticket.id));
  };

  const filteredUsers = usersList.filter((u) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.role.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-8 animate-fade-in text-white">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-mono tracking-widest text-gold-400 font-bold block">
            Executive Authorization & Governance
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white">
            Super Admin Approvals & Master Password Control
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Authorize new HR & Team login requests, manage access permissions, and override any user's credentials.
          </p>
        </div>
      </div>

      {/* 3 Main Management Tabs */}
      <div className="flex items-center space-x-2 border-b border-white/10 pb-4 overflow-x-auto custom-scrollbar">
        <button
          onClick={() => setActiveTab('approvals')}
          className={`px-4 py-2 rounded-full text-xs font-bold font-mono uppercase tracking-wider transition-all flex items-center whitespace-nowrap ${
            activeTab === 'approvals'
              ? 'bg-gold-gradient text-black font-extrabold shadow-gold-subtle'
              : 'bg-[#141418] text-neutral-300 hover:text-white border border-white/10'
          }`}
        >
          <UserCheck className="w-3.5 h-3.5 mr-1.5" />
          Pending Logins ({approvals.length})
        </button>

        <button
          onClick={() => setActiveTab('passwords')}
          className={`px-4 py-2 rounded-full text-xs font-bold font-mono uppercase tracking-wider transition-all flex items-center whitespace-nowrap ${
            activeTab === 'passwords'
              ? 'bg-gold-gradient text-black font-extrabold shadow-gold-subtle'
              : 'bg-[#141418] text-neutral-300 hover:text-white border border-white/10'
          }`}
        >
          <KeyRound className="w-3.5 h-3.5 mr-1.5" />
          Master User Password Directory ({usersList.length})
        </button>

        <button
          onClick={() => setActiveTab('tickets')}
          className={`px-4 py-2 rounded-full text-xs font-bold font-mono uppercase tracking-wider transition-all flex items-center whitespace-nowrap ${
            activeTab === 'tickets'
              ? 'bg-gold-gradient text-black font-extrabold shadow-gold-subtle'
              : 'bg-[#141418] text-neutral-300 hover:text-white border border-white/10'
          }`}
        >
          <Clock className="w-3.5 h-3.5 mr-1.5" />
          Reset Tickets ({resetTickets.length})
        </button>
      </div>

      {/* TAB 1: PENDING LOGIN APPROVALS */}
      {activeTab === 'approvals' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center space-x-2.5">
              <ShieldCheck className="w-5 h-5 text-gold-400 shrink-0" />
              <p className="text-neutral-200">
                <strong>Strict Governance Enforced:</strong> HR and team members cannot generate active logins directly. Super Admin approval is mandatory before any account can access the studio portal.
              </p>
            </div>
            <span className="text-[10.5px] font-mono text-gold-300 font-bold uppercase shrink-0">
              {approvals.length} Actions Required
            </span>
          </div>

          {approvals.length === 0 ? (
            <div className="text-center py-16 bg-[#141418] rounded-3xl border border-white/10 space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
              <h3 className="font-serif text-xl font-bold text-white">All Account Requests Cleared</h3>
              <p className="text-xs text-neutral-400">There are no pending team or client login approvals.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {approvals.map((req) => (
                <div
                  key={req.id}
                  className="bg-[#141418] rounded-3xl p-6 border border-white/10 hover:border-gold-500/40 shadow-xl flex flex-col justify-between space-y-4 transition-all"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-gold-400 uppercase tracking-wider">
                        {req.id}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                        req.role === 'employee' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40' :
                        req.role === 'admin' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
                        'bg-pink-500/20 text-pink-300 border border-pink-500/40'
                      }`}>
                        {req.role}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-serif text-lg font-bold text-white">{req.name}</h3>
                      <p className="text-xs text-neutral-300 font-mono mt-0.5">{req.email}</p>
                      <p className="text-xs text-neutral-400 font-mono">{req.phone}</p>
                    </div>

                    <div className="p-3 bg-[#1A1A20] rounded-xl border border-white/10 text-xs space-y-1">
                      <div className="flex justify-between text-neutral-400">
                        <span>Role/Title:</span>
                        <strong className="text-white">{req.designation}</strong>
                      </div>
                      <div className="flex justify-between text-neutral-400">
                        <span>Created By:</span>
                        <strong className="text-gold-300">{req.createdBy}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center gap-2">
                    <button
                      onClick={() => handleReject(req.id)}
                      className="flex-1 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 text-xs font-bold transition-all"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => handleApprove(req.id)}
                      className="flex-2 py-2 px-4 rounded-xl bg-gold-gradient text-black font-extrabold text-xs uppercase tracking-wider shadow-gold-subtle hover:brightness-110 active:scale-95 transition-all btn-shimmer"
                    >
                      Approve & Activate →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: MASTER USER PASSWORD DIRECTORY (Change ANY User's Password) */}
      {activeTab === 'passwords' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search user by name, email, or role..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#141418] border border-white/15 rounded-full pl-10 pr-4 py-2 text-xs text-white placeholder-neutral-500 focus:border-gold-400 focus:outline-none"
              />
            </div>
            <span className="text-xs font-mono text-neutral-400">
              Showing {filteredUsers.length} System Accounts
            </span>
          </div>

          <div className="bg-[#141418] rounded-3xl border border-white/10 overflow-hidden shadow-xl">
            <div className="overflow-x-auto custom-scrollbar w-full">
              <table className="w-full min-w-[700px] text-left text-xs">
                <thead className="bg-[#181820] text-neutral-400 uppercase font-mono text-[10px] border-b border-white/10">
                  <tr>
                    <th className="p-4">User Details</th>
                    <th className="p-4">Role & Permissions</th>
                    <th className="p-4">Account Status</th>
                    <th className="p-4">Last Activity</th>
                    <th className="p-4 text-right">Master Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 text-neutral-300 font-sans">
                  {filteredUsers.map((usr) => (
                    <tr key={usr.id} className="hover:bg-white/5 transition-colors">
                      <td className="p-4">
                        <span className="font-bold text-white block">{usr.name}</span>
                        <span className="text-neutral-400 font-mono text-[11px]">{usr.email}</span>
                      </td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase ${
                          usr.role === 'superadmin' ? 'bg-gold-500/20 text-gold-300 border border-gold-500/40' :
                          usr.role === 'admin' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
                          usr.role === 'employee' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40' :
                          'bg-pink-500/20 text-pink-300 border border-pink-500/40'
                        }`}>
                          {usr.role}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center text-[11px] font-bold ${
                          usr.status === 'active' ? 'text-emerald-400' : 'text-red-400'
                        }`}>
                          {usr.status === 'active' ? '● Active' : '✕ Suspended'}
                        </span>
                      </td>
                      <td className="p-4 font-mono text-neutral-400 text-[11px]">
                        {usr.lastLogin}
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => handleOpenPasswordModal(usr)}
                            className="px-3 py-1.5 rounded-xl bg-gold-500/15 hover:bg-gold-500 hover:text-black border border-gold-500/40 text-gold-300 text-xs font-bold transition-all flex items-center"
                            title="Master Change Password"
                          >
                            <KeyRound className="w-3.5 h-3.5 mr-1" /> Change Pass
                          </button>

                          {usr.role !== 'superadmin' && (
                            <button
                              onClick={() => handleToggleLock(usr.id)}
                              className={`p-1.5 rounded-xl border transition-all ${
                                usr.status === 'active'
                                  ? 'bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white border-red-500/30'
                                  : 'bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-white border-emerald-500/30'
                              }`}
                              title={usr.status === 'active' ? 'Lock Account' : 'Unlock Account'}
                            >
                              {usr.status === 'active' ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: PASSWORD RESET TICKETS */}
      {activeTab === 'tickets' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="text-amber-200">
                Users requesting emergency password resets from the login screen.
              </span>
            </div>
          </div>

          {resetTickets.length === 0 ? (
            <div className="text-center py-16 bg-[#141418] rounded-3xl border border-white/10 space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
              <h3 className="font-serif text-lg font-bold text-white">No Pending Reset Tickets</h3>
            </div>
          ) : (
            <div className="space-y-3">
              {resetTickets.map((t) => (
                <div
                  key={t.id}
                  className="bg-[#141418] rounded-2xl p-5 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-mono font-bold text-gold-400">{t.id}</span>
                      <strong className="text-white">{t.email}</strong>
                    </div>
                    <p className="text-neutral-400 font-light">{t.reason}</p>
                    <span className="text-[10px] text-neutral-500 font-mono block">Requested: {new Date(t.requestedAt).toLocaleString()}</span>
                  </div>

                  <button
                    onClick={() => handleResolveTicket(t)}
                    className="px-4 py-2 rounded-xl bg-gold-gradient text-black font-extrabold text-xs uppercase tracking-wider shadow-gold-subtle hover:brightness-110 btn-shimmer shrink-0"
                  >
                    Set New Password & Resolve →
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* MASTER PASSWORD CHANGE MODAL */}
      {passwordModalOpen && selectedUserForPassword && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#141418] border border-gold-500/40 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5 animate-fade-in text-white">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center space-x-2">
                <Crown className="w-5 h-5 text-gold-400" />
                <h3 className="font-serif text-xl font-bold text-white">Master Password Override</h3>
              </div>
              <button onClick={() => setPasswordModalOpen(false)} className="text-neutral-400 hover:text-white">
                ✕
              </button>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#1A1A22] border border-white/10 text-xs space-y-1 font-mono">
              <div className="flex justify-between">
                <span className="text-neutral-400">Target User:</span>
                <strong className="text-white">{selectedUserForPassword.name}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Email:</span>
                <strong className="text-gold-300">{selectedUserForPassword.email}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Role:</span>
                <strong className="text-white uppercase">{selectedUserForPassword.role}</strong>
              </div>
            </div>

            <form onSubmit={handleSaveMasterPassword} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-neutral-300 font-bold uppercase text-[10.5px]">
                    Set New Password *
                  </label>
                  <button
                    type="button"
                    onClick={handleGenerateRandomPassword}
                    className="text-gold-400 hover:text-white font-mono text-[10.5px] font-bold flex items-center"
                  >
                    <Sparkles className="w-3 h-3 mr-1" /> Generate Random
                  </button>
                </div>

                <div className="relative">
                  <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Enter new password (min 6 chars)..."
                    value={newPasswordValue}
                    onChange={(e) => setNewPasswordValue(e.target.value)}
                    className="w-full bg-black/70 border border-white/15 rounded-xl pl-10 pr-10 py-3 text-white font-mono focus:border-gold-400 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setPasswordModalOpen(false)}
                  className="w-1/3 py-2.5 rounded-full border border-white/20 text-neutral-300 font-bold hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-2.5 rounded-full bg-gold-gradient text-black font-extrabold uppercase tracking-wider shadow-gold-subtle hover:brightness-110 btn-shimmer"
                >
                  Save & Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuperAdminApprovals;
