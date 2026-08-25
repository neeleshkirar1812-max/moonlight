import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import { User, Mail, Lock, Phone, Calendar, Heart, ArrowRight } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    partnerName: '',
    weddingDate: '',
  });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const { addToast } = useNotification();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      addToast({ title: 'Fields Required', message: 'Please provide name, email, and password.', type: 'warning' });
      return;
    }

    setLoading(true);
    try {
      await register(formData);
      addToast({ title: 'Welcome to Moonlight', message: 'Your customer account has been created.', type: 'success' });
      navigate('/customer/dashboard');
    } catch (err) {
      addToast({ title: 'Registration Failed', message: err.message, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-obsidian text-white pt-28 pb-20 px-4 flex items-center justify-center relative">
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-radial-gold opacity-30 pointer-events-none" />

      <div className="max-w-lg w-full bg-obsidian-400 border border-gold-500/30 rounded-3xl p-8 sm:p-10 shadow-2xl relative z-10 backdrop-blur-xl animate-fade-in">
        <div className="text-center space-y-2 mb-8">
          <div className="w-12 h-12 rounded-full border border-gold-500 flex items-center justify-center bg-obsidian-600 mx-auto shadow-gold-subtle">
            <span className="font-display font-bold text-gold-400 text-xl">L</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">Create Client Account</h2>
          <p className="text-xs text-neutral-400">Unlock your private albums, timeline tracking, and invoices</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-neutral-300 font-semibold uppercase">Your Name *</label>
              <input
                type="text"
                required
                placeholder="Aarav Singhania"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-obsidian-500 border border-white/15 rounded-xl px-4 py-2.5 text-white focus:border-gold-400 focus:outline-none"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-neutral-300 font-semibold uppercase">Partner's Name</label>
              <input
                type="text"
                placeholder="Ananya Goenka"
                value={formData.partnerName}
                onChange={(e) => setFormData({ ...formData, partnerName: e.target.value })}
                className="w-full bg-obsidian-500 border border-white/15 rounded-xl px-4 py-2.5 text-white focus:border-gold-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-neutral-300 font-semibold uppercase">Email Address *</label>
              <input
                type="email"
                required
                placeholder="aarav@gmail.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-obsidian-500 border border-white/15 rounded-xl px-4 py-2.5 text-white focus:border-gold-400 focus:outline-none"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-neutral-300 font-semibold uppercase">Phone Number</label>
              <input
                type="tel"
                placeholder="+91 98200 12345"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-obsidian-500 border border-white/15 rounded-xl px-4 py-2.5 text-white focus:border-gold-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-neutral-300 font-semibold uppercase">Password *</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full bg-obsidian-500 border border-white/15 rounded-xl px-4 py-2.5 text-white focus:border-gold-400 focus:outline-none"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-neutral-300 font-semibold uppercase">Wedding Date</label>
              <input
                type="date"
                value={formData.weddingDate}
                onChange={(e) => setFormData({ ...formData, weddingDate: e.target.value })}
                className="w-full bg-obsidian-500 border border-white/15 rounded-xl px-4 py-2.5 text-white focus:border-gold-400 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 mt-4 rounded-full bg-gold-gradient text-black font-bold text-xs uppercase tracking-wider shadow-gold-subtle hover:brightness-110 transition-all flex items-center justify-center disabled:opacity-50"
          >
            {loading ? 'Creating Account...' : 'Register as Client'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/10 text-center text-xs text-neutral-400">
          <span>Already have an account? </span>
          <Link to="/login" className="text-gold-300 font-semibold hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
