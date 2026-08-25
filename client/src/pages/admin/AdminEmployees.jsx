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
} from 'lucide-react';

const realProductionCrew = [
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

const AdminEmployees = () => {
  const [employees, setEmployees] = useState(realProductionCrew);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const { addToast } = useNotification();

  useEffect(() => {
    // Force write realProductionCrew to guarantee 100% fresh data
    localStorage.setItem('ml_employees', JSON.stringify(realProductionCrew));
    setEmployees(realProductionCrew);
  }, []);

  const handleResetToRealCrew = () => {
    setEmployees(realProductionCrew);
    localStorage.setItem('ml_employees', JSON.stringify(realProductionCrew));
    addToast({
      title: 'Crew Directory Refreshed',
      message: 'Successfully synchronized all 9 official Moonlight Production crew members.',
      type: 'success',
    });
  };

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: 'Crew@2026',
    phone: '',
    designation: 'Master Cinematographer',
    department: 'Cinematography',
  });

  const handleCreateEmployee = (e) => {
    e.preventDefault();
    const newEmp = {
      _id: `emp-${Date.now()}`,
      employeeCode: `EMP-MLP-${String(employees.length + 1).padStart(3, '0')}`,
      name: form.name,
      designation: form.designation,
      department: form.department,
      user: { email: form.email, phone: form.phone },
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
      status: 'pending_approval',
      speciality: 'Luxury Wedding Production',
    };

    setEmployees([newEmp, ...employees]);

    // Push to Super Admin Approvals Queue
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
      message: `${form.name} queued for Super Admin clearance.`,
      type: 'success',
    });
    setModalOpen(false);
    setForm({ name: '', email: '', password: 'Crew@2026', phone: '', designation: 'Master Cinematographer', department: 'Cinematography' });
  };

  const filteredCrew = employees.filter((emp) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    const name = (emp.name || '').toLowerCase();
    const code = (emp.employeeCode || '').toLowerCase();
    const email = (emp.user?.email || '').toLowerCase();
    const phone = (emp.user?.phone || '').toLowerCase();
    const designation = (emp.designation || '').toLowerCase();
    return name.includes(q) || code.includes(q) || email.includes(q) || phone.includes(q) || designation.includes(q);
  });

  return (
    <div className="space-y-8 animate-fade-in text-white">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-mono tracking-widest text-gold-400 font-bold block">
            HR & Talent Operations
          </span>
          <h1 className="font-serif text-3xl font-bold text-white">Official Production Crew Directory</h1>
          <p className="text-xs text-neutral-400 mt-1">
            Registered cinematographers, photographers, drone pilots, and editors with contact numbers and credentials.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleResetToRealCrew}
            className="px-4 py-2.5 rounded-full bg-obsidian-300 hover:bg-gold-500 hover:text-black border border-white/15 text-gold-300 font-bold text-xs uppercase tracking-wider transition-all flex items-center shrink-0"
            title="Force reload all 9 real team members"
          >
            <Sparkles className="w-3.5 h-3.5 mr-1.5" /> 🔄 Sync 9 Real Crew
          </button>

          <button
            onClick={() => setModalOpen(true)}
            className="px-5 py-2.5 rounded-full bg-gold-gradient text-black font-extrabold text-xs uppercase tracking-wider shadow-gold-subtle hover:brightness-110 active:scale-95 transition-all flex items-center shrink-0 btn-shimmer"
          >
            <UserPlus className="w-4 h-4 mr-1.5" /> + Add New Crew Member
          </button>
        </div>
      </div>

      {/* HR Notice */}
      <div className="p-4 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-between text-xs">
        <div className="flex items-center space-x-2.5">
          <ShieldCheck className="w-5 h-5 text-gold-400 shrink-0" />
          <p className="text-neutral-200">
            <strong>Official Crew Directory:</strong> All 9 studio masters are active with verified phone numbers. Password resets and credentials governance are managed under Super Admin Control.
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search crew by name, mobile, email, or role..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-obsidian-300 border border-white/15 rounded-full pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-gold-400"
        />
      </div>

      {/* Crew Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCrew.map((emp) => {
          const cleanPhone = (emp.user?.phone || '').replace(/[^0-9]/g, '');
          return (
            <div
              key={emp._id}
              className="bg-[#141418] rounded-3xl p-6 border border-white/10 hover:border-gold-500/40 shadow-xl space-y-4 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center space-x-3">
                    <img
                      src={emp.avatar}
                      alt={emp.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-gold-400"
                    />
                    <div>
                      <span className="text-[9.5px] px-2 py-0.2 rounded-full bg-gold-500/20 text-gold-300 font-mono font-bold border border-gold-500/40">
                        {emp.employeeCode || 'EMP-MLP'}
                      </span>
                      <h3 className="font-serif text-base font-bold text-white mt-1">{emp.name}</h3>
                      <p className="text-[11px] text-gold-400 font-mono font-semibold">{emp.designation}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-neutral-300 font-mono">
                  <p className="flex items-center text-white">
                    <Phone className="w-3.5 h-3.5 mr-2 text-emerald-400 shrink-0" />
                    <strong>{emp.user?.phone}</strong>
                  </p>
                  <p className="flex items-center text-neutral-300">
                    <Mail className="w-3.5 h-3.5 mr-2 text-gold-400 shrink-0" />
                    <span className="truncate">{emp.user?.email}</span>
                  </p>
                </div>

                {emp.speciality && (
                  <div className="p-2.5 rounded-xl bg-black/50 border border-white/5 text-[11px] text-neutral-400">
                    <span className="text-gold-400 font-bold block text-[10px] uppercase tracking-wider">Speciality:</span>
                    <p className="line-clamp-2">{emp.speciality}</p>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <a
                  href={`https://wa.me/${cleanPhone.startsWith('91') ? cleanPhone : '91' + cleanPhone}?text=${encodeURIComponent(`Hello ${emp.name}, regarding upcoming shoot schedule with Moonlight Production.`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500 hover:text-black border border-emerald-500/40 text-emerald-300 font-bold text-[11px] flex items-center transition-all"
                >
                  <MessageSquare className="w-3 h-3 mr-1" /> WhatsApp
                </a>

                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                    emp.status === 'active'
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/40'
                      : 'bg-amber-500/15 text-amber-300 border border-amber-500/40'
                  }`}
                >
                  {emp.status === 'active' ? '✅ Active Crew' : '⏳ Pending Super Admin'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
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
                  placeholder="e.g. Aman Pawar"
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
                    placeholder="amanpawar074@gmail.com"
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
                    placeholder="+91 96449 67287"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full bg-black/70 border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-gold-400 font-mono"
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
