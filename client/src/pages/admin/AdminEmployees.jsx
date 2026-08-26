import React, { useState, useEffect } from 'react';
import api from '../../api/client';
import { useNotification } from '../../context/NotificationContext';
import {
  ShieldCheck,
  Plus,
  UserPlus,
  Phone,
  Mail,
  Camera,
  X,
  Clock,
  CheckCircle2,
  AlertCircle,
  Search,
  MessageSquare,
  Award,
  Video,
  Sparkles,
  Edit2,
  Trash2,
  Filter,
} from 'lucide-react';

export const realProductionCrew = [
  {
    _id: 'emp-1',
    employeeCode: 'EMP-MLP-001',
    name: 'Aman Pawar',
    designation: 'Lead Cinematographer & Film Director',
    department: 'Cinematography',
    user: { email: 'amanpawar074@gmail.com', phone: '+91 96449 67287' },
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    status: 'active',
    speciality: 'Sony FX6 Cinema Line & Royal Palace Steadicam',
  },
  {
    _id: 'emp-2',
    employeeCode: 'EMP-MLP-002',
    name: 'Bunny Singh',
    designation: 'Senior Candid Master & Royal Portraiture',
    department: 'Photography',
    user: { email: 'bunnysingh@gmail.com', phone: '+91 84358 29345' },
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    status: 'active',
    speciality: 'Master Fine-Art Bridal Portraiture & Low-Light Rituals',
  },
  {
    _id: 'emp-3',
    employeeCode: 'EMP-MLP-003',
    name: 'Chinnu',
    designation: '4K Commercial Drone Cinematographer',
    department: 'Aerial Cinematography',
    user: { email: 'xxx@gmail.com', phone: '+91 88275 68013' },
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
    status: 'active',
    speciality: 'DJI Inspire 3 Aerial Sweeps & Waterfront Forts',
  },
  {
    _id: 'emp-4',
    employeeCode: 'EMP-MLP-004',
    name: 'Rohit Manekar',
    designation: 'Senior 4K Colorist & Film Editor',
    department: 'Post-Production',
    user: { email: 'rohitmanekar475@gmail.com', phone: '+91 78284 24137' },
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80',
    status: 'active',
    speciality: 'DaVinci Resolve Color Grading & Same-Day Teasers',
  },
  {
    _id: 'emp-5',
    employeeCode: 'EMP-MLP-005',
    name: 'Sumit',
    designation: 'Gimbal Operator & 2nd Camera Master',
    department: 'Cinematography',
    user: { email: 'sumit.moonlight@gmail.com', phone: '+91 96305 08294' },
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80',
    status: 'active',
    speciality: 'Ronin RS3 Pro Dynamic Movement & Baraat Processions',
  },
  {
    _id: 'emp-6',
    employeeCode: 'EMP-MLP-006',
    name: 'Tarun Rathore',
    designation: 'Lighting Director & Technical Lead',
    department: 'Production & Lighting',
    user: { email: 'rsthoretsrun@gmail.com', phone: '+91 90395 83534' },
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80',
    status: 'active',
    speciality: 'Aputure & Nanlite Palace Mandap Ambience Lighting',
  },
  {
    _id: 'emp-7',
    employeeCode: 'EMP-MLP-007',
    name: 'Santosh Rathore',
    designation: 'Audio & Sound Recordist',
    department: 'Audio Engineering',
    user: { email: 'santosh.moonlight@gmail.com', phone: '+91 73978 82436' },
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    status: 'active',
    speciality: '32-Bit Float Audio Capture & Multi-Mic Vows Setup',
  },
  {
    _id: 'emp-8',
    employeeCode: 'EMP-MLP-008',
    name: 'Lucky',
    designation: 'Post-Production Editor & Teaser Specialist',
    department: 'Post-Production',
    user: { email: 'lucky@gmail.com', phone: '+91 88188 58557' },
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80',
    status: 'active',
    speciality: 'Instagram Reels, Social Teasers & Sound FX Synchronization',
  },
  {
    _id: 'emp-9',
    employeeCode: 'EMP-MLP-009',
    name: 'Priyanshu',
    designation: 'Shoot Logistics & Production Lead',
    department: 'Studio Operations',
    user: { email: 'priyanshu@gmail.com', phone: '+91 93028 45731' },
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
    status: 'active',
    speciality: 'Call Sheets, Venue Permits, Hotel Accommodations & Gear Inventory',
  },
];

// Helper: load stored employees from localStorage with permanent merge guarantee
export const loadStoredEmployees = () => {
  try {
    const saved = localStorage.getItem('ml_employees');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Guarantee all 9 official crew are present, AND all custom crew added by user are preserved!
        const parsedEmails = new Set(parsed.map((e) => (e.user?.email || '').toLowerCase().trim()));
        const missingOfficial = realProductionCrew.filter(
          (official) => !parsedEmails.has((official.user?.email || '').toLowerCase().trim())
        );
        const merged = [...parsed, ...missingOfficial];

        const seen = new Set();
        const unique = merged.filter((emp) => {
          const email = (emp.user?.email || '').trim().toLowerCase();
          const id = emp._id || '';
          const key = email || id;
          if (seen.has(key)) return false;
          seen.add(key);
          return true;
        });

        localStorage.setItem('ml_employees', JSON.stringify(unique));
        return unique;
      }
    }
  } catch (e) {}

  localStorage.setItem('ml_employees', JSON.stringify(realProductionCrew));
  return realProductionCrew;
};

const AdminEmployees = () => {
  const [employees, setEmployees] = useState(loadStoredEmployees);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingEmp, setEditingEmp] = useState(null);
  const { addToast } = useNotification();

  // Keep state updated if storage changes externally
  useEffect(() => {
    const current = loadStoredEmployees();
    setEmployees(current);
  }, []);

  // Save to localStorage helper with automatic deduplication
  const persistEmployees = (updatedList) => {
    const seen = new Set();
    const unique = updatedList.filter((emp) => {
      const email = (emp.user?.email || '').trim().toLowerCase();
      const id = emp._id || '';
      const key = email || id;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
    setEmployees(unique);
    localStorage.setItem('ml_employees', JSON.stringify(unique));
  };

  // Add Form State - Defaults to pending_approval for Super Admin Clearance
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    designation: 'Master Cinematographer',
    department: 'Cinematography',
    speciality: 'Sony FX3 & Low-Light Rituals',
    status: 'pending_approval',
  });

  // Edit Form State
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    phone: '',
    designation: '',
    department: '',
    speciality: '',
    status: 'active',
  });

  // 2. CREATE EMPLOYEE (Manual Add - Guaranteed No Duplicate & Guaranteed Super Admin Approval)
  const handleCreateEmployee = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) {
      addToast({ title: 'Required Fields', message: 'Name, email and phone number are required.', type: 'warning' });
      return;
    }

    const cleanEmail = form.email.trim().toLowerCase();

    // Check if employee with this email already exists
    const existing = employees.find((emp) => (emp.user?.email || '').toLowerCase() === cleanEmail);
    if (existing) {
      addToast({
        title: 'Already Exists',
        message: `A crew member with email ${form.email} is already in the directory. Please edit the existing profile instead.`,
        type: 'warning',
      });
      return;
    }

    const newEmp = {
      _id: `emp-${Date.now()}`,
      employeeCode: `EMP-MLP-${String(employees.length + 1).padStart(3, '0')}`,
      name: form.name.trim(),
      designation: form.designation.trim() || 'Master Cinematographer',
      department: form.department.trim() || 'Cinematography',
      user: { email: cleanEmail, phone: form.phone.trim() },
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
      status: 'pending_approval',
      speciality: form.speciality.trim() || 'Luxury Wedding Production',
    };

    // 1. Add single unique copy to roster
    const updated = [newEmp, ...employees];
    persistEmployees(updated);

    // 2. ALWAYS dispatch to Super Admin Approvals Queue
    try {
      const pendingStr = localStorage.getItem('moonlight_pending_approvals');
      let pending = pendingStr ? JSON.parse(pendingStr) : [];
      // Remove any existing request with same email to prevent queue duplicates
      pending = pending.filter((p) => (p.email || '').toLowerCase() !== cleanEmail);
      pending.unshift({
        id: `REQ-${Date.now().toString().slice(-4)}`,
        name: newEmp.name,
        email: cleanEmail,
        phone: newEmp.user.phone,
        role: 'employee',
        designation: newEmp.designation,
        createdBy: 'Studio Admin / HR (Neelesh Kirar)',
        department: newEmp.department,
        requestedAt: new Date().toISOString(),
        status: 'pending',
      });
      localStorage.setItem('moonlight_pending_approvals', JSON.stringify(pending));
    } catch (err) {
      console.error('Error queuing approval request:', err);
    }

    addToast({
      title: 'Sent for Super Admin Approval',
      message: `${newEmp.name} queued for Super Admin clearance. Super Admin can now approve in Approvals tab.`,
      type: 'success',
    });

    setModalOpen(false);
    setForm({
      name: '',
      email: '',
      phone: '',
      designation: 'Master Cinematographer',
      department: 'Cinematography',
      speciality: 'Sony FX3 & Low-Light Rituals',
      status: 'pending_approval',
    });
  };

  // 3. OPEN EDIT MODAL
  const handleOpenEdit = (emp) => {
    setEditingEmp(emp);
    setEditForm({
      name: emp.name || '',
      email: emp.user?.email || '',
      phone: emp.user?.phone || '',
      designation: emp.designation || '',
      department: emp.department || '',
      speciality: emp.speciality || '',
      status: emp.status || 'active',
    });
    setEditModalOpen(true);
  };

  // 4. SUBMIT EDIT (Manual Update)
  const handleUpdateEmployee = async (e) => {
    e.preventDefault();
    if (!editingEmp) return;

    const updatedList = employees.map((emp) => {
      if (emp._id === editingEmp._id) {
        return {
          ...emp,
          name: editForm.name.trim(),
          designation: editForm.designation.trim(),
          department: editForm.department.trim(),
          speciality: editForm.speciality.trim(),
          status: editForm.status,
          user: {
            ...emp.user,
            email: editForm.email.trim(),
            phone: editForm.phone.trim(),
          },
        };
      }
      return emp;
    });

    persistEmployees(updatedList);

    try {
      await api.put(`/admin/employees/${editingEmp._id}`, editForm);
    } catch (err) {}

    addToast({
      title: 'Profile Updated',
      message: `Updated profile for ${editForm.name}.`,
      type: 'success',
    });
    setEditModalOpen(false);
    setEditingEmp(null);
  };

  // 5. DELETE EMPLOYEE (Manual Delete)
  const handleDeleteEmployee = async (emp) => {
    if (!window.confirm(`Are you sure you want to delete ${emp.name} from the crew directory? This action cannot be undone.`)) {
      return;
    }

    const updated = employees.filter((e) => e._id !== emp._id);
    persistEmployees(updated);

    try {
      await api.delete(`/admin/employees/${emp._id}`);
    } catch (err) {}

    addToast({
      title: 'Crew Member Deleted',
      message: `${emp.name} was removed from the roster.`,
      type: 'success',
    });
  };

  // Filtering
  const filteredCrew = employees.filter((emp) => {
    if (statusFilter !== 'ALL') {
      const isPending = emp.status === 'pending_approval' || emp.status === 'pending';
      if (statusFilter === 'ACTIVE' && isPending) return false;
      if (statusFilter === 'PENDING' && !isPending) return false;
    }
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    const name = (emp.name || '').toLowerCase();
    const code = (emp.employeeCode || '').toLowerCase();
    const email = (emp.user?.email || '').toLowerCase();
    const phone = (emp.user?.phone || '').toLowerCase();
    const designation = (emp.designation || '').toLowerCase();
    const department = (emp.department || '').toLowerCase();
    return (
      name.includes(q) ||
      code.includes(q) ||
      email.includes(q) ||
      phone.includes(q) ||
      designation.includes(q) ||
      department.includes(q)
    );
  });

  const activeCount = employees.filter((e) => e.status === 'active' || !e.status).length;
  const pendingCount = employees.filter((e) => e.status === 'pending_approval' || e.status === 'pending').length;

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in text-white">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] sm:text-xs uppercase font-mono tracking-widest text-gold-400 font-bold block">
            HR & Talent Operations
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            Official Production Crew Directory
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Registered cinematographers, photographers, drone pilots, and editors with contact numbers and credentials.
          </p>
        </div>

        {/* Action Buttons: Responsive Flex */}
        <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
          <button
            onClick={() => setModalOpen(true)}
            className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-gold-gradient text-black font-extrabold text-xs uppercase tracking-wider shadow-gold-subtle hover:brightness-110 active:scale-95 transition-all flex items-center shrink-0 btn-shimmer"
          >
            <UserPlus className="w-4 h-4 mr-1.5" />
            <span>+ Add New Crew</span>
          </button>
        </div>
      </div>

      {/* Persistence Guarantee Notice */}
      <div className="p-3 sm:p-4 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
        <div className="flex items-center space-x-2.5">
          <ShieldCheck className="w-5 h-5 text-gold-400 shrink-0" />
          <p className="text-neutral-200">
            <strong>Full Manual Control:</strong> You can add, edit, or delete any crew member anytime. All changes are saved permanently in local storage and will never disappear on refresh.
          </p>
        </div>
        <div className="flex items-center space-x-2 shrink-0 font-mono text-[11px]">
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
            {activeCount} Active
          </span>
          {pendingCount > 0 && (
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
              {pendingCount} Pending
            </span>
          )}
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-white/10">
        {/* Status Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 sm:pb-0 custom-scrollbar">
          {[
            { id: 'ALL', label: `All (${employees.length})` },
            { id: 'ACTIVE', label: `Active (${activeCount})` },
            { id: 'PENDING', label: `Pending Clearance (${pendingCount})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-mono font-bold uppercase transition-all whitespace-nowrap ${
                statusFilter === tab.id
                  ? 'bg-gold-gradient text-black shadow-gold-subtle'
                  : 'bg-[#181820] text-neutral-400 hover:text-white border border-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search crew by name, mobile, role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#181820] border border-white/15 rounded-full pl-10 pr-4 py-2 text-xs text-white focus:outline-none focus:border-gold-400"
          />
        </div>
      </div>

      {/* Crew Cards Grid */}
      {filteredCrew.length === 0 ? (
        <div className="text-center py-16 bg-[#141418] rounded-3xl border border-white/10 space-y-3">
          <Camera className="w-10 h-10 text-gold-400 mx-auto opacity-40" />
          <h3 className="font-serif text-lg text-white font-bold">No Crew Members Found</h3>
          <p className="text-xs text-neutral-400">
            {search ? 'Try clearing your search filters.' : 'Click "+ Add New Crew" to add your first crew member.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredCrew.map((emp) => {
            const cleanPhone = (emp.user?.phone || '').replace(/[^0-9]/g, '');
            const isPending = emp.status === 'pending_approval' || emp.status === 'pending';
            return (
              <div
                key={emp._id}
                className={`bg-[#141418] rounded-3xl p-5 sm:p-6 border transition-all flex flex-col justify-between space-y-4 ${
                  isPending
                    ? 'border-amber-500/40 shadow-amber-900/20'
                    : 'border-white/10 hover:border-gold-500/40 shadow-xl'
                }`}
              >
                <div className="space-y-3">
                  {/* Top Profile Header */}
                  <div className="flex items-start justify-between pb-3 border-b border-white/10">
                    <div className="flex items-center space-x-3">
                      <img
                        src={emp.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80'}
                        alt={emp.name}
                        className={`w-12 h-12 rounded-full object-cover border-2 shrink-0 ${
                          isPending ? 'border-amber-400' : 'border-gold-400'
                        }`}
                      />
                      <div className="min-w-0">
                        <div className="flex items-center space-x-1.5">
                          <span className="text-[9.5px] px-2 py-0.5 rounded-full bg-gold-500/20 text-gold-300 font-mono font-bold border border-gold-500/40">
                            {emp.employeeCode || 'EMP-MLP'}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase ${
                              !isPending
                                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/40'
                                : 'bg-amber-500/15 text-amber-300 border border-amber-500/40 animate-pulse'
                            }`}
                          >
                            {!isPending ? 'Active' : 'Pending'}
                          </span>
                        </div>
                        <h3 className="font-serif text-base font-bold text-white mt-1 truncate">{emp.name}</h3>
                        <p className="text-[11px] text-gold-400 font-mono font-semibold truncate">{emp.designation}</p>
                      </div>
                    </div>

                    {/* Top Edit / Delete Quick Icons */}
                    <div className="flex items-center space-x-1 shrink-0">
                      <button
                        onClick={() => handleOpenEdit(emp)}
                        className="p-1.5 rounded-lg text-neutral-400 hover:text-gold-300 hover:bg-white/5 transition-colors"
                        title="Edit profile"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteEmployee(emp)}
                        className="p-1.5 rounded-lg text-neutral-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                        title="Delete crew member"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-1.5 text-xs text-neutral-300 font-mono">
                    <p className="flex items-center text-white truncate">
                      <Phone className="w-3.5 h-3.5 mr-2 text-emerald-400 shrink-0" />
                      <strong>{emp.user?.phone || 'No phone'}</strong>
                    </p>
                    <p className="flex items-center text-neutral-300 truncate">
                      <Mail className="w-3.5 h-3.5 mr-2 text-gold-400 shrink-0" />
                      <span className="truncate">{emp.user?.email || 'No email'}</span>
                    </p>
                  </div>

                  {/* Speciality */}
                  {emp.speciality && (
                    <div className="p-2.5 rounded-xl bg-black/50 border border-white/5 text-[11px] text-neutral-400">
                      <span className="text-gold-400 font-bold block text-[10px] uppercase tracking-wider">
                        Speciality:
                      </span>
                      <p className="line-clamp-2">{emp.speciality}</p>
                    </div>
                  )}
                </div>

                {/* Bottom Action Footer */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                  <a
                    href={`https://wa.me/${cleanPhone.startsWith('91') ? cleanPhone : '91' + cleanPhone}?text=${encodeURIComponent(`Hello ${emp.name}, regarding upcoming shoot schedule with Moonlight Production.`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500 hover:text-black border border-emerald-500/40 text-emerald-300 font-bold text-[11px] flex items-center transition-all"
                  >
                    <MessageSquare className="w-3 h-3 mr-1" /> WhatsApp
                  </a>

                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => handleOpenEdit(emp)}
                      className="px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-gold-500 hover:text-black border border-white/10 text-neutral-300 hover:border-gold-400 font-bold text-[11px] transition-all flex items-center"
                    >
                      <Edit2 className="w-3 h-3 mr-1" /> Edit
                    </button>
                    <button
                      onClick={() => handleDeleteEmployee(emp)}
                      className="px-2.5 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-600 hover:text-white border border-red-500/30 text-red-400 font-bold text-[11px] transition-all flex items-center"
                    >
                      <Trash2 className="w-3 h-3 mr-1" /> Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 1. ADD NEW CREW MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
          <div className="bg-[#141418] border border-gold-500/40 rounded-3xl p-5 sm:p-7 max-w-md w-full shadow-2xl space-y-4 animate-fade-in text-xs text-white max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-white">+ Add Crew Member</h3>
                <p className="text-[11px] text-neutral-400">Add cinematographer, photographer or editor to roster.</p>
              </div>
              <button onClick={() => setModalOpen(false)} className="text-neutral-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateEmployee} className="space-y-3">
              <div>
                <label className="text-neutral-300 block mb-1 font-bold">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Yash Vardhan"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-black/70 border border-white/15 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-gold-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-neutral-300 block mb-1 font-bold">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="yash@gmail.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-black/70 border border-white/15 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-gold-400"
                  />
                </div>
                <div>
                  <label className="text-neutral-300 block mb-1 font-bold">Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98200 12345"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full bg-black/70 border border-white/15 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-gold-400 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-neutral-300 block mb-1 font-bold">Designation</label>
                  <input
                    type="text"
                    value={form.designation}
                    onChange={(e) => setForm({ ...form, designation: e.target.value })}
                    className="w-full bg-black/70 border border-white/15 rounded-xl px-3 py-2.5 text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-neutral-300 block mb-1 font-bold">Department</label>
                  <select
                    value={form.department}
                    onChange={(e) => setForm({ ...form, department: e.target.value })}
                    className="w-full bg-black/70 border border-white/15 rounded-xl px-3 py-2.5 text-white focus:outline-none"
                  >
                    <option value="Cinematography">Cinematography</option>
                    <option value="Photography">Photography</option>
                    <option value="Aerial Cinematography">Aerial Cinematography</option>
                    <option value="Post-Production">Post-Production</option>
                    <option value="Production & Lighting">Production & Lighting</option>
                    <option value="Audio Engineering">Audio Engineering</option>
                    <option value="Studio Operations">Studio Operations</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-neutral-300 block mb-1 font-bold">Camera / Cinema Speciality</label>
                <input
                  type="text"
                  placeholder="e.g. Sony FX6, Steadicam, Drone Sweeps"
                  value={form.speciality}
                  onChange={(e) => setForm({ ...form, speciality: e.target.value })}
                  className="w-full bg-black/70 border border-white/15 rounded-xl px-3 py-2.5 text-white focus:outline-none"
                />
              </div>

              <div className="p-3 bg-black/60 rounded-xl border border-amber-500/30 text-[11px] text-neutral-300 space-y-1">
                <span className="text-amber-400 font-bold flex items-center">
                  <Clock className="w-3.5 h-3.5 mr-1 text-amber-400" /> Super Admin Clearance Queue:
                </span>
                <p className="text-neutral-400">
                  This profile will be queued for the Super Admin Director to review and approve. Upon clearance in the Approvals Console, credentials will become active.
                </p>
              </div>

              <div className="flex justify-end space-x-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-full border border-white/15 text-neutral-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-gold-gradient text-black font-extrabold uppercase btn-shimmer"
                >
                  Save to Directory
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. EDIT CREW MODAL */}
      {editModalOpen && editingEmp && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
          <div className="bg-[#141418] border border-gold-500/40 rounded-3xl p-5 sm:p-7 max-w-md w-full shadow-2xl space-y-4 animate-fade-in text-xs text-white max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-white">Edit Crew Profile</h3>
                <span className="text-[10px] text-gold-400 font-mono">{editingEmp.employeeCode}</span>
              </div>
              <button onClick={() => setEditModalOpen(false)} className="text-neutral-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateEmployee} className="space-y-3">
              <div>
                <label className="text-neutral-300 block mb-1 font-bold">Full Name</label>
                <input
                  type="text"
                  required
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full bg-black/70 border border-white/15 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-gold-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-neutral-300 block mb-1 font-bold">Email Address</label>
                  <input
                    type="email"
                    required
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    className="w-full bg-black/70 border border-white/15 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-gold-400"
                  />
                </div>
                <div>
                  <label className="text-neutral-300 block mb-1 font-bold">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={editForm.phone}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                    className="w-full bg-black/70 border border-white/15 rounded-xl px-3 py-2.5 text-white focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-neutral-300 block mb-1 font-bold">Designation</label>
                  <input
                    type="text"
                    value={editForm.designation}
                    onChange={(e) => setEditForm({ ...editForm, designation: e.target.value })}
                    className="w-full bg-black/70 border border-white/15 rounded-xl px-3 py-2.5 text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-neutral-300 block mb-1 font-bold">Department</label>
                  <input
                    type="text"
                    value={editForm.department}
                    onChange={(e) => setEditForm({ ...editForm, department: e.target.value })}
                    className="w-full bg-black/70 border border-white/15 rounded-xl px-3 py-2.5 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-neutral-300 block mb-1 font-bold">Speciality</label>
                <input
                  type="text"
                  value={editForm.speciality}
                  onChange={(e) => setEditForm({ ...editForm, speciality: e.target.value })}
                  className="w-full bg-black/70 border border-white/15 rounded-xl px-3 py-2.5 text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="text-neutral-300 block mb-1 font-bold">Status</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setEditForm({ ...editForm, status: 'active' })}
                    className={`py-2 rounded-xl border font-bold text-center transition-all ${
                      editForm.status === 'active'
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                        : 'bg-black/50 border-white/10 text-neutral-400'
                    }`}
                  >
                    ✅ Active
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditForm({ ...editForm, status: 'pending_approval' })}
                    className={`py-2 rounded-xl border font-bold text-center transition-all ${
                      editForm.status === 'pending_approval'
                        ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                        : 'bg-black/50 border-white/10 text-neutral-400'
                    }`}
                  >
                    ⏳ Pending
                  </button>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setEditModalOpen(false)}
                  className="px-4 py-2 rounded-full border border-white/15 text-neutral-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-gold-gradient text-black font-extrabold uppercase btn-shimmer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEmployees;
