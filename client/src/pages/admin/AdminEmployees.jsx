import React, { useState, useEffect } from 'react';
import api from '../../api/client';
import { useNotification } from '../../context/NotificationContext';
import { ShieldCheck, Plus, UserPlus, Phone, Mail, Camera, X } from 'lucide-react';

const AdminEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
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

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const res = await api.get('/admin/employees');
      setEmployees(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleCreateEmployee = async (e) => {
    e.preventDefault();
    try {
      await api.post('/admin/employees', form);
      addToast({ title: 'Employee Created', message: 'New crew member account registered.', type: 'success' });
      setModalOpen(false);
      setForm({ name: '', email: '', password: 'Employee@2026', phone: '', designation: 'Master Cinematographer', department: 'Cinematography' });
      fetchEmployees();
    } catch (err) {
      addToast({ title: 'Error', message: err.message, type: 'error' });
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold block">
            Guild of Masters
          </span>
          <h1 className="font-serif text-3xl font-bold text-white">Production Crew & Employees</h1>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-5 py-2.5 rounded-full bg-gold-gradient text-black font-bold text-xs uppercase tracking-wider shadow-gold-subtle flex items-center"
        >
          <UserPlus className="w-4 h-4 mr-1.5" /> Add New Crew Member
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {employees.map((emp) => (
          <div key={emp._id} className="luxury-card rounded-2xl p-6 border border-white/10 space-y-4">
            <div className="flex items-center space-x-3.5 pb-3 border-b border-white/10">
              <img
                src={emp.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'}
                alt={emp.user?.name}
                className="w-12 h-12 rounded-full object-cover border border-gold-500/50"
              />
              <div>
                <h3 className="font-serif text-base font-bold text-white">{emp.user?.name || emp.name}</h3>
                <p className="text-[11px] text-gold-300 font-mono">{emp.designation}</p>
              </div>
            </div>

            <div className="space-y-1.5 text-xs text-neutral-300">
              <p className="flex items-center"><Mail className="w-3.5 h-3.5 mr-2 text-gold-400" /> {emp.user?.email}</p>
              <p className="flex items-center"><Phone className="w-3.5 h-3.5 mr-2 text-gold-400" /> {emp.user?.phone || '+91 98200 12345'}</p>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-obsidian-400 border border-gold-500/40 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4 animate-fade-in text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="font-serif text-xl font-bold text-white">Add Crew Member</h3>
              <button onClick={() => setModalOpen(false)} className="text-neutral-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>

            <form onSubmit={handleCreateEmployee} className="space-y-3">
              <div>
                <label className="text-neutral-300 block mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vikramaditya Seth"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-obsidian-500 border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-neutral-300 block mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="vikram@Moonlight Production.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-obsidian-500 border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-neutral-300 block mb-1">Phone</label>
                  <input
                    type="tel"
                    placeholder="+91 98200 12345"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full bg-obsidian-500 border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-neutral-300 block mb-1">Designation</label>
                  <input
                    type="text"
                    value={form.designation}
                    onChange={(e) => setForm({ ...form, designation: e.target.value })}
                    className="w-full bg-obsidian-500 border border-white/15 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-neutral-300 block mb-1">Temporary Password</label>
                  <input
                    type="text"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="w-full bg-obsidian-500 border border-white/15 rounded-xl px-3 py-2 text-gold-300 font-mono"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-white/10">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 rounded-full border border-white/15 text-neutral-300">Cancel</button>
                <button type="submit" className="px-6 py-2 rounded-full bg-gold-gradient text-black font-bold uppercase">Register Crew</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEmployees;
