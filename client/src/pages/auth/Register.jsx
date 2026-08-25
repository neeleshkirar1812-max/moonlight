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
      department: 'Client Sanctuary',
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
    <div className="min-h-screen bg-[#0B0B0C] text-white pt-24 sm:pt-28 pb-16 px-4 flex items-center justify-center relative overflow-hidden">
      {/* Ambient Radial Backlight Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-b from-gold-500/15 via-gold-600/5 to-transparent rounded-full blur-3xl pointer-events-none" />

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
            Moonlight Production • Client Access
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            {isSubmitted ? 'Request Under Review' : 'Request Sanctuary Access'}
          </h2>
          <p className="text-xs text-neutral-400 max-w-sm mx-auto">
            {isSubmitted
              ? 'Your profile is awaiting clearance in the Super Admin Control Center.'
              : 'Submit your wedding details to request personalized access to private galleries & cinema.'}
          </p>
        </div>

        {isSubmitted ? (
          <div className="p-6 rounded-3xl bg-[#181820] border border-gold-500/40 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-gold-500/20 border border-gold-400 flex items-center justify-center text-gold-400 mx-auto">
              <Clock className="w-6 h-6" />
            </div>

            <div>
              <h3 className="font-serif text-lg font-bold text-white">
                Verification Queued with Super Admin
              </h3>
              <p className="text-xs text-neutral-300 mt-1.5 leading-relaxed">
                Thank you, <strong>{formData.name}</strong>. In accordance with Moonlight studio security governance, all new client IDs are verified and activated by our <strong>Super Admin Director</strong>.
              </p>
            </div>

            <div className="p-3 bg-black/60 rounded-xl border border-white/10 text-xs font-mono text-gold-300">
              <span>Status: ⏳ Pending Super Admin Authorization</span>
            </div>

            <div className="pt-2">
              <Link
                to="/login"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-gold-gradient text-black font-extrabold text-xs uppercase tracking-wider shadow-gold-subtle hover:brightness-110 transition-all btn-shimmer"
              >
                Return to Login Portal →
              </Link>
            </div>
          </div>
        ) : (
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
                  Requested Password *
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
                  Wedding / Shoot Date
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

            {/* Security Notice */}
            <div className="p-3 bg-black/60 rounded-xl border border-white/10 text-[10.5px] text-neutral-400 flex items-start space-x-2">
              <ShieldCheck className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
              <span>
                To protect client privacy, registrations are reviewed by the Super Admin Director before login activation.
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 mt-3 rounded-full bg-gold-gradient text-black font-extrabold text-xs uppercase tracking-widest shadow-gold-subtle hover:brightness-110 active:scale-95 transition-all flex items-center justify-center disabled:opacity-50 btn-shimmer"
            >
              {loading ? 'Submitting Request...' : 'Submit Request for Super Admin Clearance'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </form>
        )}

        {/* Footer Back Link to Login */}
        <div className="pt-4 border-t border-white/10 text-center text-xs text-neutral-400 flex items-center justify-center gap-2">
          <span>Already have approved credentials?</span>
          <Link to="/login" className="text-gold-300 font-bold hover:underline flex items-center">
            Sign In Here →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
