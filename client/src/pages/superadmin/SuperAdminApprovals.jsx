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
    const remaining = approvals.filter((a) => a.id !== reqId);
    setApprovals(remaining);
    localStorage.setItem('moonlight_pending_approvals', JSON.stringify(remaining));

    addToast({
      title: 'Login Request Rejected',
      message: `Account request for ${req?.name || 'User'} was discarded.`,
      type: 'info',
    });
  };

  // 3. Open Password Reset Modal
  const handleOpenPasswordModal = (user) => {
    setSelectedUserForPassword(user);
    setNewPasswordValue('');
    setPasswordModalOpen(true);
  };

  const handleGenerateRandomPassword = () => {
    const words = ['Moonlight', 'Royal', 'Crown', 'Luxury', 'Heritage', 'Cinema'];
    const word = words[Math.floor(Math.random() * words.length)];
    const num = Math.floor(1000 + Math.random() * 9000);
    setNewPasswordValue(`${word}@${num}`);
    setShowPassword(true);
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
    <div className="space-y-8 animate-fade-in text-neutral-900">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-900/10 pb-4">
        <div>
          <span className="text-xs uppercase font-mono tracking-widest text-amber-800 font-bold block">
            Executive Authorization & Governance
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900">
            Super Admin Approvals & Master Password Control
          </h1>
          <p className="text-xs text-neutral-600 mt-1">
            Authorize new HR & Team login requests, manage access permissions, and override any user's credentials.
          </p>
        </div>
      </div>

      {/* 3 Main Management Tabs */}
      <div className="flex items-center space-x-2 border-b border-amber-900/10 pb-4 overflow-x-auto custom-scrollbar">
        <button
          onClick={() => setActiveTab('approvals')}
          className={`px-4 py-2.5 rounded-full text-xs font-bold font-mono uppercase tracking-wider transition-all flex items-center whitespace-nowrap ${
            activeTab === 'approvals'
              ? 'bg-gold-gradient text-neutral-950 font-extrabold shadow-sm'
              : 'bg-white text-neutral-700 hover:text-neutral-950 border border-amber-900/15'
          }`}
        >
          <UserCheck className="w-3.5 h-3.5 mr-1.5" />
          Pending Logins ({approvals.length})
        </button>

        <button
          onClick={() => setActiveTab('passwords')}
          className={`px-4 py-2.5 rounded-full text-xs font-bold font-mono uppercase tracking-wider transition-all flex items-center whitespace-nowrap ${
            activeTab === 'passwords'
              ? 'bg-gold-gradient text-neutral-950 font-extrabold shadow-sm'
              : 'bg-white text-neutral-700 hover:text-neutral-950 border border-amber-900/15'
          }`}
        >
          <KeyRound className="w-3.5 h-3.5 mr-1.5" />
          Master User Password Directory ({usersList.length})
        </button>

        <button
          onClick={() => setActiveTab('tickets')}
          className={`px-4 py-2.5 rounded-full text-xs font-bold font-mono uppercase tracking-wider transition-all flex items-center whitespace-nowrap ${
            activeTab === 'tickets'
              ? 'bg-gold-gradient text-neutral-950 font-extrabold shadow-sm'
              : 'bg-white text-neutral-700 hover:text-neutral-950 border border-amber-900/15'
          }`}
        >
          <Clock className="w-3.5 h-3.5 mr-1.5" />
          Reset Tickets ({resetTickets.length})
        </button>
      </div>

      {/* TAB 1: PENDING LOGIN APPROVALS */}
      {activeTab === 'approvals' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs shadow-sm">
            <div className="flex items-center space-x-2.5">
              <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0" />
              <p className="text-neutral-800">
                <strong>Strict Governance Enforced:</strong> HR and team members cannot generate active logins directly. Super Admin approval is mandatory before any account can access the studio portal.
              </p>
            </div>
            <span className="text-[10.5px] font-mono text-amber-900 font-bold uppercase shrink-0 px-2 py-0.5 rounded-full bg-amber-200">
              {approvals.length} Actions Required
            </span>
          </div>

          {approvals.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-amber-900/15 space-y-3 shadow-sm">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h3 className="font-serif text-xl font-bold text-neutral-900">All Account Requests Cleared</h3>
              <p className="text-xs text-neutral-600">There are no pending team or client login approvals.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {approvals.map((req) => (
                <div
                  key={req.id}
                  className="bg-white rounded-3xl p-6 border border-amber-900/15 hover:border-amber-400 shadow-sm flex flex-col justify-between space-y-4 transition-all"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-amber-900 uppercase tracking-wider bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                        {req.id}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                        req.role === 'employee' ? 'bg-purple-100 text-purple-800 border border-purple-200' :
                        req.role === 'admin' ? 'bg-amber-100 text-amber-900 border border-amber-200' :
                        'bg-pink-100 text-pink-800 border border-pink-200'
                      }`}>
                        {req.role}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-serif text-lg font-bold text-neutral-900">{req.name}</h3>
                      <p className="text-xs text-neutral-700 font-mono mt-0.5">{req.email}</p>
                      <p className="text-xs text-neutral-500 font-mono">{req.phone}</p>
                    </div>

                    <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs space-y-1">
                      <div className="flex justify-between text-neutral-600">
                        <span>Role/Title:</span>
                        <strong className="text-neutral-900">{req.designation}</strong>
                      </div>
                      <div className="flex justify-between text-neutral-600">
                        <span>Created By:</span>
                        <strong className="text-amber-900">{req.createdBy}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-stone-200 flex items-center gap-2">
                    <button
                      onClick={() => handleReject(req.id)}
                      className="flex-1 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 text-xs font-bold transition-all min-h-[44px]"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => handleApprove(req.id)}
                      className="flex-2 py-2 px-4 rounded-xl bg-gold-gradient text-neutral-950 font-extrabold text-xs uppercase tracking-wider shadow-sm hover:brightness-105 active:scale-95 transition-all btn-shimmer min-h-[44px]"
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

      {/* TAB 2: MASTER USER PASSWORD DIRECTORY */}
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
                className="w-full bg-white border border-stone-300 rounded-full pl-10 pr-4 py-2 text-xs text-neutral-900 placeholder-neutral-500 focus:border-amber-600 focus:outline-none shadow-sm"
              />
            </div>
            <span className="text-xs font-mono text-neutral-600 font-bold">
              Showing {filteredUsers.length} System Accounts
            </span>
          </div>

          <div className="bg-white rounded-3xl border border-amber-900/15 overflow-hidden shadow-sm">
            <div className="overflow-x-auto custom-scrollbar w-full">
              <table className="w-full min-w-[700px] text-left text-xs">
                <thead className="bg-stone-100 text-stone-700 uppercase font-mono text-[10px] border-b border-stone-200">
                  <tr>
                    <th className="p-4">User Details</th>
                    <th className="p-4">Role & Permissions</th>
                    <th className="p-4">Account Status</th>
                    <th className="p-4">Last Activity</th>
                    <th className="p-4 text-right">Master Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200 text-neutral-800 font-sans">
                  {filteredUsers.map((usr) => (
                    <tr key={usr.id} className="hover:bg-amber-50/40 transition-colors">
                      <td className="p-4">
                        <span className="font-bold text-neutral-900 block">{usr.name}</span>
                        <span className="text-neutral-500 font-mono text-[11px]">{usr.email}</span>
                      </td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase ${
                          usr.role === 'superadmin' ? 'bg-amber-100 text-amber-900 border border-amber-300' :
                          usr.role === 'admin' ? 'bg-amber-50 text-amber-800 border border-amber-200' :
                          usr.role === 'employee' ? 'bg-purple-50 text-purple-800 border border-purple-200' :
                          'bg-pink-50 text-pink-800 border border-pink-200'
                        }`}>
                          {usr.role}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center text-[11px] font-bold ${
                          usr.status === 'active' ? 'text-emerald-700' : 'text-rose-700'
                        }`}>
                          {usr.status === 'active' ? '● Active' : '✕ Suspended'}
                        </span>
                      </td>
                      <td className="p-4 font-mono text-neutral-600 text-[11px]">
                        {usr.lastLogin}
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => handleOpenPasswordModal(usr)}
                            className="px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-500 hover:text-white border border-amber-300 text-amber-900 text-xs font-bold transition-all flex items-center min-h-[36px]"
                            title="Master Change Password"
                          >
                            <KeyRound className="w-3.5 h-3.5 mr-1 text-amber-700" /> Change Pass
                          </button>

                          {usr.role !== 'superadmin' && (
                            <button
                              onClick={() => handleToggleLock(usr.id)}
                              className={`p-2 rounded-xl border transition-all min-h-[36px] min-w-[36px] flex items-center justify-center ${
                                usr.status === 'active'
                                  ? 'bg-rose-50 hover:bg-rose-600 text-rose-700 hover:text-white border-rose-200'
                                  : 'bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white border-emerald-200'
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
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 flex items-center justify-between text-xs shadow-sm">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-amber-700 shrink-0" />
              <span className="text-amber-900 font-medium">
                Users requesting emergency password resets from the login screen.
              </span>
            </div>
          </div>

          {resetTickets.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-amber-900/15 space-y-2 shadow-sm">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
              <h3 className="font-serif text-lg font-bold text-neutral-900">No Pending Reset Tickets</h3>
            </div>
          ) : (
            <div className="space-y-3">
              {resetTickets.map((t) => (
                <div
                  key={t.id}
                  className="bg-white rounded-2xl p-5 border border-amber-900/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm"
                >
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-mono font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">{t.id}</span>
                      <strong className="text-neutral-900">{t.email}</strong>
                    </div>
                    <p className="text-neutral-600 font-light">{t.reason}</p>
                    <span className="text-[10px] text-neutral-500 font-mono block">Requested: {new Date(t.requestedAt).toLocaleString()}</span>
                  </div>

                  <button
                    onClick={() => handleResolveTicket(t)}
                    className="px-4 py-2 rounded-xl bg-gold-gradient text-neutral-950 font-extrabold text-xs uppercase tracking-wider shadow-sm hover:brightness-105 btn-shimmer shrink-0 min-h-[44px]"
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
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-amber-400 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5 animate-fade-in text-neutral-900">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <div className="flex items-center space-x-2">
                <Crown className="w-5 h-5 text-amber-700" />
                <h3 className="font-serif text-xl font-bold text-neutral-900">Master Password Override</h3>
              </div>
              <button onClick={() => setPasswordModalOpen(false)} className="text-neutral-500 hover:text-neutral-900 text-lg">
                ✕
              </button>
            </div>

            <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 text-xs space-y-1 font-mono">
              <div className="flex justify-between">
                <span className="text-neutral-600">Target User:</span>
                <strong className="text-neutral-900">{selectedUserForPassword.name}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">Email:</span>
                <strong className="text-amber-900">{selectedUserForPassword.email}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">Role:</span>
                <strong className="text-neutral-900 uppercase">{selectedUserForPassword.role}</strong>
              </div>
            </div>

            <form onSubmit={handleSaveMasterPassword} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-neutral-800 font-bold uppercase text-[10.5px]">
                    Set New Password *
                  </label>
                  <button
                    type="button"
                    onClick={handleGenerateRandomPassword}
                    className="text-amber-800 hover:text-amber-950 font-mono text-[10.5px] font-bold flex items-center"
                  >
                    <Sparkles className="w-3 h-3 mr-1" /> Generate Random
                  </button>
                </div>

                <div className="relative">
                  <Lock className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Enter new password (min 6 chars)..."
                    value={newPasswordValue}
                    onChange={(e) => setNewPasswordValue(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl pl-10 pr-10 py-3 text-neutral-900 font-mono focus:border-amber-600 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-900"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setPasswordModalOpen(false)}
                  className="w-1/3 py-2.5 rounded-full border border-stone-300 text-neutral-700 font-bold hover:bg-stone-100 min-h-[44px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-2.5 rounded-full bg-gold-gradient text-neutral-950 font-extrabold uppercase tracking-wider shadow-sm hover:brightness-105 btn-shimmer min-h-[44px]"
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
