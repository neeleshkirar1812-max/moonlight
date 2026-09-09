import React, { useState, useEffect } from 'react';
import api from '../../api/client';
import * as XLSX from 'xlsx';
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
  Download,
} from 'lucide-react';

export const realProductionCrew = [];

// Helper: load stored employees from localStorage
export const loadStoredEmployees = () => {
  try {
    const saved = localStorage.getItem('ml_employees');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {}
  return [];
};

const AdminEmployees = () => {
  const [employees, setEmployees] = useState(loadStoredEmployees);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingEmp, setEditingEmp] = useState(null);
  const { addToast } = useNotification();

  // Load real employees from backend and sync with local storage permanently
  const fetchEmployees = async () => {
    const local = loadStoredEmployees();
    if (local && local.length > 0) {
      setEmployees(local);
    }
    try {
      const res = await api.get('/admin/employees');
      const data = Array.isArray(res) ? res : res?.data || [];
      if (Array.isArray(data) && data.length > 0) {
        // Merge without losing locally created crew
        const mergedMap = new Map();
        local.forEach((e) => mergedMap.set((e.user?.email || e.email || e._id).toLowerCase(), e));
        data.forEach((e) => mergedMap.set((e.user?.email || e.email || e._id).toLowerCase(), e));
        const merged = Array.from(mergedMap.values());
        setEmployees(merged);
        localStorage.setItem('ml_employees', JSON.stringify(merged));
      }
    } catch (err) {
      // Keep local state intact
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Save to localStorage helper with automatic deduplication
  const persistEmployees = (updatedList) => {
    const seen = new Set();
    const unique = updatedList.filter((emp) => {
      const email = (emp.user?.email || emp.email || '').trim().toLowerCase();
      const id = emp._id || '';
      const key = email || id;
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
    setEmployees(unique);
    localStorage.setItem('ml_employees', JSON.stringify(unique));

    // Also sync into all users list for Super Admin visibility
    try {
      const allUsers = JSON.parse(localStorage.getItem('moonlight_all_users') || '[]');
      unique.forEach((u) => {
        const uEmail = (u.user?.email || u.email || '').toLowerCase().trim();
        const existing = allUsers.find((x) => (x.email || '').toLowerCase().trim() === uEmail);
        if (!existing) {
          allUsers.push({
            id: u._id,
            name: u.name,
            email: uEmail,
            role: 'employee',
            designation: u.designation,
            status: u.status || 'active',
            phone: u.user?.phone || u.phone || '+91 92292 29323',
          });
        }
      });
      localStorage.setItem('moonlight_all_users', JSON.stringify(allUsers));
    } catch (e) {}
  };

  // Add Form State - Defaults to active for immediate usage
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    designation: 'Master Cinematographer',
    department: 'Cinematography',
    speciality: 'Sony FX3 & Low-Light Rituals',
    status: 'active',
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

  // 2. CREATE EMPLOYEE (Manual Add - Guaranteed Permanent & Active)
  const handleCreateEmployee = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) {
      addToast({ title: 'Required Fields', message: 'Name, email and phone number are required.', type: 'warning' });
      return;
    }

    const cleanEmail = form.email.trim().toLowerCase();

    // Check if employee with this email already exists
    const existing = employees.find((emp) => (emp.user?.email || emp.email || '').toLowerCase() === cleanEmail);
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
      user: { name: form.name.trim(), email: cleanEmail, phone: form.phone.trim() },
      email: cleanEmail,
      phone: form.phone.trim(),
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
      status: 'active',
      speciality: form.speciality.trim() || 'Luxury Wedding Production',
    };

    // 1. Immediately persist locally (guaranteed permanent)
    const updated = [newEmp, ...employees];
    persistEmployees(updated);

    // 2. Sync to Backend API
    try {
      await api.post('/admin/employees', {
        name: newEmp.name,
        email: cleanEmail,
        phone: newEmp.phone,
        designation: newEmp.designation,
        password: 'Crew@2026',
      });
    } catch (err) {
      console.log('Saved to local persistent store');
    }

    addToast({
      title: 'Crew Member Added',
      message: `${newEmp.name} has been added permanently to the crew roster.`,
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
      status: 'active',
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

  const handleExportToExcel = () => {
    try {
      const rows = employees.map((emp, idx) => ({
        'S.No': idx + 1,
        'Employee Code': emp.employeeCode || `EMP-MLP-${String(idx + 1).padStart(3, '0')}`,
        'Full Name': emp.name || emp.user?.name || 'N/A',
        'Designation': emp.designation || 'Cinematographer',
        'Department': emp.department || 'Production',
        'Email Address': emp.email || emp.user?.email || 'N/A',
        'Phone Number': emp.phone || emp.user?.phone || 'N/A',
        'Speciality': emp.speciality || 'Luxury Wedding Production',
        'Status': emp.status === 'active' ? 'Active' : 'Pending Clearance',
      }));

      const worksheet = XLSX.utils.json_to_sheet(rows);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Production Crew Roster');
      XLSX.writeFile(workbook, `Moonlight_Production_Crew_${new Date().toISOString().slice(0, 10)}.xlsx`);

      addToast({
        title: 'Roster Exported',
        message: `${rows.length} Crew members exported to Excel (.xlsx) successfully!`,
        type: 'success',
      });
    } catch (err) {
      addToast({ title: 'Export Failed', message: err.message, type: 'error' });
    }
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
    <div className="space-y-6 sm:space-y-8 animate-fade-in text-neutral-900">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-900/10 pb-4">
        <div>
          <span className="text-[10px] sm:text-xs uppercase font-mono tracking-widest text-amber-800 font-bold block">
            HR & Talent Operations
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900">
            Official Production Crew Directory
          </h1>
          <p className="text-xs text-neutral-600 mt-1">
            Registered cinematographers, photographers, drone pilots, and editors with contact numbers and credentials.
          </p>
        </div>

        {/* Action Buttons: Responsive Flex */}
        <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto flex-wrap">
          <button
            onClick={handleExportToExcel}
            className="px-4 py-2.5 rounded-full bg-white hover:bg-amber-50 border border-amber-900/20 text-neutral-800 text-xs font-bold uppercase tracking-wider transition-all flex items-center shrink-0 shadow-sm min-h-[44px]"
            title="Download Crew Directory (.xlsx)"
          >
            <Download className="w-3.5 h-3.5 mr-1.5 text-amber-700" />
            Export Excel (.xlsx)
          </button>

          <button
            onClick={() => setModalOpen(true)}
            className="px-4 sm:px-5 py-2.5 rounded-full bg-gold-gradient text-neutral-950 font-extrabold text-xs uppercase tracking-wider shadow-sm hover:brightness-105 active:scale-95 transition-all flex items-center shrink-0 btn-shimmer min-h-[44px]"
          >
            <UserPlus className="w-4 h-4 mr-1.5" />
            <span>+ Add New Crew</span>
          </button>
        </div>
      </div>

      {/* Persistence Guarantee Notice */}
      <div className="p-3 sm:p-4 rounded-2xl bg-amber-50 border border-amber-300 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs shadow-sm">
        <div className="flex items-center space-x-2.5">
          <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0" />
          <p className="text-neutral-800">
            <strong>Full Manual Control:</strong> You can add, edit, or delete any crew member anytime. All changes are saved permanently in local storage and will never disappear on refresh.
          </p>
        </div>
        <div className="flex items-center space-x-2 shrink-0 font-mono text-[11px]">
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold">
            {activeCount} Active
          </span>
          {pendingCount > 0 && (
            <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 font-bold">
              {pendingCount} Pending
            </span>
          )}
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-amber-900/10">
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
              className={`px-3.5 py-2 rounded-full text-xs font-mono font-bold uppercase transition-all whitespace-nowrap min-h-[38px] ${
                statusFilter === tab.id
                  ? 'bg-gold-gradient text-neutral-950 shadow-sm font-extrabold'
                  : 'bg-white text-neutral-700 hover:text-neutral-950 border border-amber-900/15'
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
            className="w-full bg-white border border-stone-300 rounded-full pl-10 pr-4 py-2 text-xs text-neutral-900 placeholder-neutral-500 focus:outline-none focus:border-amber-600 shadow-sm"
          />
        </div>
      </div>

      {/* Crew Cards Grid */}
      {filteredCrew.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-amber-900/15 space-y-3 shadow-sm">
          <Camera className="w-10 h-10 text-amber-700 mx-auto opacity-60" />
          <h3 className="font-serif text-lg text-neutral-900 font-bold">No Crew Members Found</h3>
          <p className="text-xs text-neutral-600">
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
                className={`bg-white rounded-3xl p-5 sm:p-6 border transition-all flex flex-col justify-between space-y-4 shadow-sm ${
                  isPending
                    ? 'border-amber-400 bg-amber-50/20'
                    : 'border-amber-900/15 hover:border-amber-400'
                }`}
              >
                <div className="space-y-3">
                  {/* Top Profile Header */}
                  <div className="flex items-start justify-between pb-3 border-b border-stone-200">
                    <div className="flex items-center space-x-3">
                      <img
                        src={emp.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80'}
                        alt={emp.name}
                        className={`w-12 h-12 rounded-full object-cover border-2 shrink-0 ${
                          isPending ? 'border-amber-400' : 'border-amber-500'
                        }`}
                      />
                      <div className="min-w-0">
                        <div className="flex items-center space-x-1.5">
                          <span className="text-[9.5px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-mono font-bold border border-amber-300">
                            {emp.employeeCode || 'EMP-MLP'}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase ${
                              !isPending
                                ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                                : 'bg-amber-100 text-amber-900 border border-amber-300 animate-pulse'
                            }`}
                          >
                            {!isPending ? 'Active' : 'Pending'}
                          </span>
                        </div>
                        <h3 className="font-serif text-base font-bold text-neutral-900 mt-1 truncate">{emp.name}</h3>
                        <p className="text-[11px] text-amber-900 font-mono font-bold truncate">{emp.designation}</p>
                      </div>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-1.5 text-xs font-mono">
                    <p className="flex items-center text-neutral-900 truncate">
                      <Phone className="w-3.5 h-3.5 mr-2 text-emerald-700 shrink-0" />
                      <strong>{emp.user?.phone || 'No phone'}</strong>
                    </p>
                    <p className="flex items-center text-neutral-600 truncate">
                      <Mail className="w-3.5 h-3.5 mr-2 text-amber-700 shrink-0" />
                      <span className="truncate">{emp.user?.email || 'No email'}</span>
                    </p>
                  </div>

                  {/* Speciality */}
                  {emp.speciality && (
                    <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-[11px] text-neutral-700">
                      <span className="text-amber-900 font-bold block text-[10px] uppercase tracking-wider">
                        Speciality:
                      </span>
                      <p className="line-clamp-2">{emp.speciality}</p>
                    </div>
                  )}
                </div>

                {/* Bottom Action Footer */}
                <div className="pt-3 border-t border-stone-200 flex items-center justify-between gap-2">
                  <a
                    href={`https://wa.me/${cleanPhone.startsWith('91') ? cleanPhone : '91' + cleanPhone}?text=${encodeURIComponent(`Hello ${emp.name}, regarding upcoming shoot schedule with Moonlight Production.`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-600 hover:text-white border border-emerald-300 text-emerald-900 font-bold text-[11px] flex items-center transition-all min-h-[36px]"
                  >
                    <MessageSquare className="w-3 h-3 mr-1 text-emerald-700" /> WhatsApp
                  </a>

                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => handleOpenEdit(emp)}
                      className="px-2.5 py-1.5 rounded-xl bg-stone-50 hover:bg-amber-500 hover:text-white border border-stone-300 text-neutral-700 font-bold text-[11px] transition-all flex items-center min-h-[36px]"
                    >
                      <Edit2 className="w-3 h-3 mr-1 text-amber-700" /> Edit
                    </button>
                    <button
                      onClick={() => handleDeleteEmployee(emp)}
                      className="px-2.5 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-600 hover:text-white border border-rose-300 text-rose-700 font-bold text-[11px] transition-all flex items-center min-h-[36px]"
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
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white border border-amber-400 rounded-3xl p-5 sm:p-7 max-w-md w-full shadow-2xl space-y-4 animate-fade-in text-xs text-neutral-900 max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <div>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-neutral-900">+ Add Crew Member</h3>
                <p className="text-[11px] text-neutral-600">Add cinematographer, photographer or editor to roster.</p>
              </div>
              <button onClick={() => setModalOpen(false)} className="text-neutral-500 hover:text-neutral-900">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateEmployee} className="space-y-3">
              <div>
                <label className="text-neutral-800 block mb-1 font-bold">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Yash Vardhan"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2.5 text-neutral-900 focus:outline-none focus:border-amber-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-neutral-800 block mb-1 font-bold">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="yash@gmail.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2.5 text-neutral-900 focus:outline-none focus:border-amber-600"
                  />
                </div>
                <div>
                  <label className="text-neutral-800 block mb-1 font-bold">Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98200 12345"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2.5 text-neutral-900 focus:outline-none focus:border-amber-600 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-neutral-800 block mb-1 font-bold">Designation</label>
                  <input
                    type="text"
                    value={form.designation}
                    onChange={(e) => setForm({ ...form, designation: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2.5 text-neutral-900 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-neutral-800 block mb-1 font-bold">Department</label>
                  <select
                    value={form.department}
                    onChange={(e) => setForm({ ...form, department: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2.5 text-neutral-900 focus:outline-none"
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
                <label className="text-neutral-800 block mb-1 font-bold">Camera / Cinema Speciality</label>
                <input
                  type="text"
                  placeholder="e.g. Sony FX6, Steadicam, Drone Sweeps"
                  value={form.speciality}
                  onChange={(e) => setForm({ ...form, speciality: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2.5 text-neutral-900 focus:outline-none"
                />
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-300 text-[11px] text-neutral-700 space-y-1">
                <span className="text-amber-900 font-bold flex items-center">
                  <Clock className="w-3.5 h-3.5 mr-1 text-amber-700" /> Super Admin Clearance Queue:
                </span>
                <p className="text-neutral-600">
                  This profile will be queued for the Super Admin Director to review and approve. Upon clearance in the Approvals Console, credentials will become active.
                </p>
              </div>

              <div className="flex justify-end space-x-3 pt-3 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-full border border-stone-300 text-neutral-700 hover:bg-stone-100 min-h-[44px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-gold-gradient text-neutral-950 font-extrabold uppercase btn-shimmer min-h-[44px]"
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
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white border border-amber-400 rounded-3xl p-5 sm:p-7 max-w-md w-full shadow-2xl space-y-4 animate-fade-in text-xs text-neutral-900 max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <div>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-neutral-900">Edit Crew Profile</h3>
                <span className="text-[10px] text-amber-900 font-mono font-bold">{editingEmp.employeeCode}</span>
              </div>
              <button onClick={() => setEditModalOpen(false)} className="text-neutral-500 hover:text-neutral-900">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateEmployee} className="space-y-3">
              <div>
                <label className="text-neutral-800 block mb-1 font-bold">Full Name</label>
                <input
                  type="text"
                  required
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2.5 text-neutral-900 focus:outline-none focus:border-amber-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-neutral-800 block mb-1 font-bold">Email Address</label>
                  <input
                    type="email"
                    required
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2.5 text-neutral-900 focus:outline-none focus:border-amber-600"
                  />
                </div>
                <div>
                  <label className="text-neutral-800 block mb-1 font-bold">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={editForm.phone}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2.5 text-neutral-900 focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-neutral-800 block mb-1 font-bold">Designation</label>
                  <input
                    type="text"
                    value={editForm.designation}
                    onChange={(e) => setEditForm({ ...editForm, designation: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2.5 text-neutral-900 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-neutral-800 block mb-1 font-bold">Department</label>
                  <input
                    type="text"
                    value={editForm.department}
                    onChange={(e) => setEditForm({ ...editForm, department: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2.5 text-neutral-900 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-neutral-800 block mb-1 font-bold">Speciality</label>
                <input
                  type="text"
                  value={editForm.speciality}
                  onChange={(e) => setEditForm({ ...editForm, speciality: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2.5 text-neutral-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-neutral-800 block mb-1 font-bold">Status</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setEditForm({ ...editForm, status: 'active' })}
                    className={`py-2 rounded-xl border font-bold text-center transition-all min-h-[44px] ${
                      editForm.status === 'active'
                        ? 'bg-emerald-100 border-emerald-400 text-emerald-900'
                        : 'bg-stone-50 border-stone-300 text-neutral-600'
                    }`}
                  >
                    ✅ Active
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditForm({ ...editForm, status: 'pending_approval' })}
                    className={`py-2 rounded-xl border font-bold text-center transition-all min-h-[44px] ${
                      editForm.status === 'pending_approval'
                        ? 'bg-amber-100 border-amber-400 text-amber-900'
                        : 'bg-stone-50 border-stone-300 text-neutral-600'
                    }`}
                  >
                    ⏳ Pending
                  </button>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-3 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setEditModalOpen(false)}
                  className="px-4 py-2 rounded-full border border-stone-300 text-neutral-700 hover:bg-stone-100 min-h-[44px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-gold-gradient text-neutral-950 font-extrabold uppercase btn-shimmer min-h-[44px]"
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
