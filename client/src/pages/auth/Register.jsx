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
    <div className="min-h-screen bg-[#F4F1EA] text-neutral-950 pt-24 sm:pt-28 pb-16 px-4 flex items-center justify-center relative">
      <div className="max-w-lg w-full bg-white border-2 border-neutral-300 rounded-3xl p-6 sm:p-8 shadow-xl relative z-10 space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-full border-2 border-amber-600 flex items-center justify-center bg-white mx-auto shadow-md overflow-hidden p-0.5">
            <img
              src="https://ugc.production.linktr.ee/bbcf2874-0602-4cdb-b362-ad612f9fc135_zV3Uuw-tQraxE7KwMApwOHbWTg75v6W5ZJJOyWhXSJBR8O1GMQMZMOQ4CvB8uCMV4mM0SXMK-Q-s800-c-k-c0x00ffffff-no-r.jpeg?io=true&size=avatar-v3_0"
              alt="Moonlight Production"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <span className="text-xs font-mono tracking-widest uppercase text-amber-900 font-bold block">
            MOONLIGHT PRODUCTION
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-neutral-950 tracking-tight">
            {isSubmitted ? 'Request Submitted' : 'Couple Account Request'}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-700 font-medium max-w-sm mx-auto">
            {isSubmitted
              ? 'Your account request is awaiting activation by the studio director.'
              : 'Enter your details to create your private wedding portal account.'}
          </p>
        </div>

        {isSubmitted ? (
          <div className="p-6 rounded-3xl bg-amber-50 border-2 border-amber-300 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-amber-100 border-2 border-amber-400 flex items-center justify-center text-amber-900 mx-auto shadow-sm">
              <Clock className="w-7 h-7" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-neutral-950">
                Request Sent to Super Admin
              </h2>
              <p className="text-xs sm:text-sm text-neutral-800 mt-1.5 font-medium leading-relaxed">
                Thank you, <strong>{formData.name}</strong>. Your account has been received and will be activated shortly by our Super Admin team.
              </p>
            </div>

            <div className="p-3 bg-white rounded-xl border border-neutral-300 text-xs font-bold text-amber-900 shadow-sm">
              Status: ⏳ Pending Super Admin Approval
            </div>

            <div className="pt-2">
              <Link
                to="/login"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-sm tracking-wider shadow-md transition-all"
              >
                Return to Login →
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleRegister} className="space-y-4">
            {/* Couple Names Split */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="space-y-1.5">
                <label className="text-neutral-950 font-bold text-xs uppercase tracking-wider block">
                  Your Full Name *
                </label>
                <div className="relative">
                  <User className="w-5 h-5 text-neutral-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Aarav Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white border-2 border-neutral-400 rounded-xl pl-11 pr-3 py-2.5 text-neutral-950 font-medium text-sm placeholder-neutral-500 focus:border-amber-700 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-neutral-950 font-bold text-xs uppercase tracking-wider block">
                  Partner's Name
                </label>
                <div className="relative">
                  <Heart className="w-5 h-5 text-rose-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="e.g. Ananya Goenka"
                    value={formData.partnerName}
                    onChange={(e) => setFormData({ ...formData, partnerName: e.target.value })}
                    className="w-full bg-white border-2 border-neutral-400 rounded-xl pl-11 pr-3 py-2.5 text-neutral-950 font-medium text-sm placeholder-neutral-500 focus:border-amber-700 focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="space-y-1.5">
                <label className="text-neutral-950 font-bold text-xs uppercase tracking-wider block">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-5 h-5 text-neutral-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="aarav@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white border-2 border-neutral-400 rounded-xl pl-11 pr-3 py-2.5 text-neutral-950 font-medium text-sm placeholder-neutral-500 focus:border-amber-700 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-neutral-950 font-bold text-xs uppercase tracking-wider block">
                  WhatsApp Phone *
                </label>
                <div className="relative">
                  <Phone className="w-5 h-5 text-neutral-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    placeholder="+91 92292 29323"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-white border-2 border-neutral-400 rounded-xl pl-11 pr-3 py-2.5 text-neutral-950 font-medium text-sm placeholder-neutral-500 focus:border-amber-700 focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Password & Wedding Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="space-y-1.5">
                <label className="text-neutral-950 font-bold text-xs uppercase tracking-wider block">
                  Password *
                </label>
                <div className="relative">
                  <Lock className="w-5 h-5 text-neutral-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full bg-white border-2 border-neutral-400 rounded-xl pl-11 pr-10 py-2.5 text-neutral-950 font-medium text-sm placeholder-neutral-500 focus:border-amber-700 focus:outline-none transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-700 hover:text-black"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-neutral-950 font-bold text-xs uppercase tracking-wider block">
                  Wedding / Shoot Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={formData.weddingDate}
                    onChange={(e) => setFormData({ ...formData, weddingDate: e.target.value })}
                    className="w-full bg-white border-2 border-neutral-400 rounded-xl px-3 py-2.5 text-neutral-950 font-medium text-sm focus:border-amber-700 focus:outline-none transition-colors font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Security Notice */}
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-300 text-xs text-neutral-800 flex items-start space-x-2 font-medium">
              <ShieldCheck className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
              <span>
                All new client accounts are securely reviewed and activated by our studio director.
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 mt-3 rounded-xl bg-amber-700 hover:bg-amber-800 active:bg-amber-900 text-white font-bold text-sm tracking-wide shadow-md transition-all flex items-center justify-center disabled:opacity-50"
            >
              {loading ? 'Submitting...' : 'Submit Account Request'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </form>
        )}

        {/* Footer Back Link to Login */}
        <div className="pt-4 border-t border-neutral-300 text-center text-xs text-neutral-700 flex items-center justify-center gap-2 font-medium">
          <span>Already have an account?</span>
          <Link to="/login" className="text-amber-900 font-bold hover:underline flex items-center">
            Sign In Here →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
