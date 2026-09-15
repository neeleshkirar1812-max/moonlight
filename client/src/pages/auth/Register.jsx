import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  ShieldCheck,
  Clock,
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
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { addToast } = useNotification();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password || !formData.phone) {
      addToast({ title: 'Fields Required', message: 'Please provide all required details.', type: 'warning' });
      return;
    }

    setLoading(true);

    // Save as Pending Approval in Super Admin Queue
    const pending = JSON.parse(localStorage.getItem('moonlight_pending_approvals') || '[]');
    const newReq = {
      id: `REQ-${Date.now().toString().slice(-4)}`,
      name: `${formData.name}${formData.partnerName ? ' & ' + formData.partnerName : ''}`,
      email: formData.email.toLowerCase(),
      phone: formData.phone,
      role: 'customer',
      designation: `Couple (${formData.city || 'Royal Wedding'} • ${formData.weddingDate || '2026'})`,
      createdBy: 'Self-Registration Request',
      department: 'Client Portal',
      requestedAt: new Date().toISOString(),
      status: 'pending',
    };
    pending.unshift(newReq);
    localStorage.setItem('moonlight_pending_approvals', JSON.stringify(pending));

    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
      addToast({
        title: 'Access Request Dispatched',
        message: 'Your registration was delivered to the Super Admin Director for security clearance.',
        type: 'success',
      });
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#0E0A08] text-neutral-100 pt-24 sm:pt-28 pb-16 px-4 flex items-center justify-center font-sans relative selection:bg-amber-500 selection:text-neutral-950 overflow-hidden">
      {/* 2026 Ambient Radial Backlights */}
      <div className="absolute top-10 left-1/3 w-96 h-96 rounded-full bg-amber-600/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/3 w-96 h-96 rounded-full bg-rose-600/10 blur-3xl pointer-events-none" />

      {/* Noise Texture */}
      <div
        className="fixed inset-0 pointer-events-none opacity-20 z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-lg w-full bg-neutral-950/85 backdrop-blur-2xl border border-amber-500/20 rounded-[36px] p-7 sm:p-10 shadow-[0_30px_90px_-20px_rgba(0,0,0,0.9)] relative z-10 space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-2xl border border-amber-400/50 bg-gradient-to-br from-amber-500/20 to-neutral-900 flex items-center justify-center mx-auto shadow-lg backdrop-blur-md overflow-hidden p-1">
            <Heart className="w-8 h-8 text-amber-400 fill-amber-400/20" />
          </div>
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-amber-400 font-bold block">
            MOONLIGHT PRODUCTION • 2026
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
            {isSubmitted ? 'Request Submitted' : 'Couple Account Request'}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 font-sans max-w-sm mx-auto">
            {isSubmitted
              ? 'Your account request is awaiting activation by the studio director.'
              : 'Enter your details to create your private wedding portal account.'}
          </p>
        </div>

        {isSubmitted ? (
          <div className="p-6 rounded-3xl bg-amber-500/10 border border-amber-400/30 text-center space-y-4 backdrop-blur-md">
            <div className="w-14 h-14 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 mx-auto shadow-sm">
              <Clock className="w-7 h-7" />
            </div>

            <div>
              <h2 className="text-xl font-serif font-bold text-white">
                Request Sent to Super Admin
              </h2>
              <p className="text-xs sm:text-sm text-neutral-300 mt-1.5 font-sans leading-relaxed">
                Thank you, <strong>{formData.name}</strong>. Your account has been received and will be activated shortly by our Super Admin team.
              </p>
            </div>

            <div className="p-3 bg-black/40 rounded-xl border border-amber-400/20 text-xs font-mono font-bold text-amber-300 shadow-sm">
              Status: ⏳ Pending Super Admin Approval
            </div>

            <div className="pt-2">
              <Link
                to="/login"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer"
              >
                Return to Login →
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleRegister} className="space-y-4">
            {/* Couple Names Split */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="space-y-1.5 text-left">
                <label className="text-neutral-300 font-mono text-xs uppercase tracking-wider block">
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
                    className="w-full bg-black/50 border border-white/15 rounded-xl pl-10 pr-3 py-2.5 text-white text-xs sm:text-sm placeholder-neutral-500 focus:border-amber-400 focus:outline-none font-sans"
                  />
                </div>
              </div>

              <div className="space-y-1.5 text-left">
                <label className="text-neutral-300 font-mono text-xs uppercase tracking-wider block">
                  Partner's Name
                </label>
                <div className="relative">
                  <Heart className="w-4 h-4 text-rose-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="e.g. Kiara Malhotra"
                    value={formData.partnerName}
                    onChange={(e) => setFormData({ ...formData, partnerName: e.target.value })}
                    className="w-full bg-black/50 border border-white/15 rounded-xl pl-10 pr-3 py-2.5 text-white text-xs sm:text-sm placeholder-neutral-500 focus:border-amber-400 focus:outline-none font-sans"
                  />
                </div>
              </div>
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="space-y-1.5 text-left">
                <label className="text-neutral-300 font-mono text-xs uppercase tracking-wider block">
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
                    className="w-full bg-black/50 border border-white/15 rounded-xl pl-10 pr-3 py-2.5 text-white text-xs sm:text-sm placeholder-neutral-500 focus:border-amber-400 focus:outline-none font-sans"
                  />
                </div>
              </div>

              <div className="space-y-1.5 text-left">
                <label className="text-neutral-300 font-mono text-xs uppercase tracking-wider block">
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
                    className="w-full bg-black/50 border border-white/15 rounded-xl pl-10 pr-3 py-2.5 text-white text-xs sm:text-sm placeholder-neutral-500 focus:border-amber-400 focus:outline-none font-sans"
                  />
                </div>
              </div>
            </div>

            {/* Password & Wedding Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="space-y-1.5 text-left">
                <label className="text-neutral-300 font-mono text-xs uppercase tracking-wider block">
                  Password *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full bg-black/50 border border-white/15 rounded-xl pl-10 pr-10 py-2.5 text-white text-xs sm:text-sm placeholder-neutral-500 focus:border-amber-400 focus:outline-none font-sans"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white p-1 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-1.5 text-left">
                <label className="text-neutral-300 font-mono text-xs uppercase tracking-wider block">
                  Wedding / Shoot Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={formData.weddingDate}
                    onChange={(e) => setFormData({ ...formData, weddingDate: e.target.value })}
                    className="w-full bg-black/50 border border-white/15 rounded-xl px-3 py-2.5 text-white text-xs sm:text-sm focus:border-amber-400 focus:outline-none font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Security Notice */}
            <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-400/30 text-xs text-amber-200 flex items-start space-x-2 font-sans backdrop-blur-md">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                All new client accounts are securely reviewed and activated by our studio director.
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 mt-3 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:to-amber-600 active:scale-[0.99] text-neutral-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/25 transition-all flex items-center justify-center disabled:opacity-50 cursor-pointer"
            >
              {loading ? 'Submitting...' : 'Submit Account Request'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </form>
        )}

        {/* Footer Back Link to Login */}
        <div className="pt-4 border-t border-white/10 text-center text-xs text-neutral-400 flex items-center justify-center gap-2 font-sans">
          <span>Already have an account?</span>
          <Link to="/login" className="text-amber-400 font-bold hover:underline flex items-center">
            Sign In Here →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
