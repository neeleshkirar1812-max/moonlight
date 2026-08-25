import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import {
  User,
  Mail,
  Lock,
  Phone,
  Calendar,
  Heart,
  ArrowRight,
  Sparkles,
  MapPin,
  Eye,
  EyeOff,
  CheckCircle2,
} from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    partnerName: '',
    email: '',
    phone: '',
    password: '',
    weddingDate: '',
    city: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const { addToast } = useNotification();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      addToast({ title: 'Fields Required', message: 'Please provide your name, email, and password.', type: 'warning' });
      return;
    }

    setLoading(true);
    try {
      const user = await register(formData);
      addToast({
        title: 'Welcome to Moonlight Production',
        message: `Sanctuary account created for ${user.name}!`,
        type: 'success',
      });
      navigate('/customer/dashboard');
    } catch (err) {
      addToast({ title: 'Registration Error', message: err.message || 'Could not create account.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B0C] text-white pt-24 sm:pt-28 pb-16 px-4 flex items-center justify-center relative overflow-hidden">
      {/* Ambient Radial Backlight Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-b from-gold-500/15 via-gold-600/5 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-lg w-full bg-[#121215]/90 border border-gold-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl relative z-10 backdrop-blur-2xl animate-fade-in space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-full border-2 border-gold-400/80 flex items-center justify-center bg-black/80 mx-auto shadow-gold-glow overflow-hidden p-0.5">
            <img
              src="https://ugc.production.linktr.ee/bbcf2874-0602-4cdb-b362-ad612f9fc135_zV3Uuw-tQraxE7KwMApwOHbWTg75v6W5ZJJOyWhXSJBR8O1GMQMZMOQ4CvB8uCMV4mM0SXMK-Q-s800-c-k-c0x00ffffff-no-r.jpeg?io=true&size=avatar-v3_0"
              alt="Moonlight Production"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-gold-400 font-bold block">
            Moonlight Production • Client Sanctuary
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            Create Couple Account
          </h2>
          <p className="text-xs text-neutral-400 max-w-sm mx-auto">
            Register to unlock private high-res 4K galleries, shoot timelines, and custom wedding cinema.
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4 text-xs">
          {/* Couple Names Split */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="space-y-1.5">
              <label className="text-neutral-300 font-bold uppercase text-[10.5px] tracking-wider">
                Your Full Name *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Aarav Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-black/70 border border-white/15 rounded-xl pl-10 pr-3 py-2.5 text-white placeholder-neutral-500 focus:border-gold-400 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-neutral-300 font-bold uppercase text-[10.5px] tracking-wider">
                Partner's Name
              </label>
              <div className="relative">
                <Heart className="w-4 h-4 text-pink-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="e.g. Ananya Goenka"
                  value={formData.partnerName}
                  onChange={(e) => setFormData({ ...formData, partnerName: e.target.value })}
                  className="w-full bg-black/70 border border-white/15 rounded-xl pl-10 pr-3 py-2.5 text-white placeholder-neutral-500 focus:border-gold-400 focus:outline-none transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Email & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="space-y-1.5">
              <label className="text-neutral-300 font-bold uppercase text-[10.5px] tracking-wider">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="aarav@gmail.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-black/70 border border-white/15 rounded-xl pl-10 pr-3 py-2.5 text-white placeholder-neutral-500 focus:border-gold-400 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-neutral-300 font-bold uppercase text-[10.5px] tracking-wider">
                WhatsApp Phone *
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  required
                  placeholder="+91 92292 29323"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-black/70 border border-white/15 rounded-xl pl-10 pr-3 py-2.5 text-white placeholder-neutral-500 focus:border-gold-400 focus:outline-none transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Password & Wedding Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="space-y-1.5">
              <label className="text-neutral-300 font-bold uppercase text-[10.5px] tracking-wider">
                Create Password *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-black/70 border border-white/15 rounded-xl pl-10 pr-10 py-2.5 text-white placeholder-neutral-500 focus:border-gold-400 focus:outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-neutral-300 font-bold uppercase text-[10.5px] tracking-wider">
                Auspicious Wedding Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={formData.weddingDate}
                  onChange={(e) => setFormData({ ...formData, weddingDate: e.target.value })}
                  className="w-full bg-black/70 border border-white/15 rounded-xl px-3 py-2.5 text-white focus:border-gold-400 focus:outline-none transition-colors font-mono"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 mt-3 rounded-full bg-gold-gradient text-black font-extrabold text-xs uppercase tracking-widest shadow-gold-subtle hover:brightness-110 active:scale-95 transition-all flex items-center justify-center disabled:opacity-50 btn-shimmer"
          >
            {loading ? 'Creating Sanctuary Account...' : 'Complete Registration & Enter Sanctuary'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </form>

        {/* Footer Back Link to Login */}
        <div className="pt-4 border-t border-white/10 text-center text-xs text-neutral-400 flex items-center justify-center gap-2">
          <span>Already have an account?</span>
          <Link to="/login" className="text-gold-300 font-bold hover:underline flex items-center">
            Sign In Here →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
