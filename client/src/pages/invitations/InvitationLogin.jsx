import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import SEO from '../../components/common/SEO';
import { Sparkles, Heart, Lock, Mail, ArrowRight, Eye, EyeOff } from 'lucide-react';

const InvitationLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const { addToast } = useNotification();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '/templates';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      addToast({ title: 'Email required', message: 'Please enter your email', type: 'error' });
      return;
    }

    setLoading(true);
    try {
      localStorage.setItem('moonlight_customer_email', email.trim());
      if (login) {
        await login(email.trim(), password || 'Guest@2026');
      }
      addToast({
        title: 'Welcome Back! ✨',
        message: 'Opening your selection...',
        type: 'success',
      });
      navigate(redirectUrl);
    } catch (err) {
      localStorage.setItem('moonlight_customer_email', email.trim());
      navigate(redirectUrl);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = async (roleType) => {
    setLoading(true);
    try {
      if (roleType === 'admin') {
        localStorage.setItem('moonlight_customer_email', 'admin@moonlightproduction.com');
        if (login) {
          await login('nkneeleshkirar@gmail.com', 'SuperAdmin@2026');
        }
        addToast({
          title: 'Admin Session Active 👑',
          message: 'Opening Moonlight Invitations Control System...',
          type: 'success',
        });
        navigate('/invitations/admin');
      } else {
        localStorage.setItem('moonlight_customer_email', 'aarav.ananya@gmail.com');
        if (login) {
          await login('aarav.ananya@gmail.com', 'Client@2026');
        }
        addToast({
          title: 'Welcome Couple! ✨',
          message: 'Opening your Invitation Dashboard...',
          type: 'success',
        });
        navigate(redirectUrl);
      }
    } catch (err) {
      if (roleType === 'admin') {
        navigate('/invitations/admin');
      } else {
        navigate(redirectUrl);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-neutral-900 pt-28 pb-16 flex items-center justify-center px-4 font-sans relative selection:bg-amber-200 selection:text-amber-900">
      <SEO
        title="Sign In to Digital Invitations | Moonlight Luxury Suites"
        description="Access your luxury digital wedding invitation dashboard to edit details, customize scratch card messages, and monitor live guest RSVPs."
      />

      {/* Decorative Ambient Background */}
      <div className="absolute top-12 left-1/3 w-80 h-80 rounded-full bg-amber-200/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-12 right-1/3 w-80 h-80 rounded-full bg-rose-200/25 blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-white rounded-[32px] border border-stone-300 shadow-2xl p-8 sm:p-10 space-y-6 relative z-10">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-full border-2 border-amber-500/40 bg-amber-50 text-amber-900 flex items-center justify-center mx-auto mb-2 shadow-inner">
            <Heart className="w-7 h-7 text-amber-800" fill="currentColor" />
          </div>
          <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-amber-800 font-bold block">
            MOONLIGHT LUXURY SUITES
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
            Couple Invitation Portal
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 font-sans">
            Sign in to manage your live digital invitation, custom door videos & guest RSVPs
          </p>
        </div>

        {/* 1-Click Fast Persona Switchers */}
        <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-stone-300 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-amber-900 font-bold flex items-center">
              <Sparkles className="w-3.5 h-3.5 mr-1 text-amber-700" />
              1-Click Instant Login
            </span>
            <span className="text-[10px] text-neutral-500 font-mono">Test Access</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickLogin('customer')}
              className="py-2.5 px-3 rounded-xl bg-amber-900 hover:bg-amber-950 text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center space-x-1.5 cursor-pointer active:scale-95"
            >
              <span>💍 As Couple Demo</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('admin')}
              className="py-2.5 px-3 rounded-xl bg-white border border-stone-300 hover:border-amber-700 hover:bg-stone-50 text-neutral-900 text-xs font-bold transition-all shadow-sm flex items-center justify-center space-x-1.5 cursor-pointer active:scale-95"
            >
              <span>👑 As Admin</span>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-800 font-sans">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="couple@moonlight.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#FAF8F5] border border-stone-300 text-neutral-900 text-xs sm:text-sm placeholder-neutral-400 focus:outline-none focus:border-amber-700 focus:bg-white focus:ring-2 focus:ring-amber-500/20 transition-all font-medium"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-800 font-sans">
                Password
              </label>
              <Link to="/forgot-password" className="text-amber-800 font-bold text-xs hover:underline">
                Forgot?
              </Link>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password (optional for demo)"
                className="w-full pl-10 pr-10 py-3 rounded-xl bg-[#FAF8F5] border border-stone-300 text-neutral-900 text-xs sm:text-sm placeholder-neutral-400 focus:outline-none focus:border-amber-700 focus:bg-white focus:ring-2 focus:ring-amber-500/20 transition-all font-medium"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-800 p-1 cursor-pointer"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900 hover:from-amber-800 hover:to-amber-950 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg flex items-center justify-center space-x-2 cursor-pointer active:scale-[0.99]"
          >
            {loading ? (
              <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
            ) : (
              <>
                <span>Access Invitation Dashboard</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </>
            )}
          </button>
        </form>

        <div className="pt-4 border-t border-stone-200 text-center space-y-3">
          <p className="text-xs text-neutral-600">
            Don't have an invitation yet?{' '}
            <Link
              to="/invitations/templates"
              className="text-amber-900 font-bold hover:underline"
            >
              Browse 31 Luxury Templates →
            </Link>
          </p>
          <div className="text-center">
            <Link
              to="/invitations"
              className="text-[11px] text-neutral-500 hover:text-neutral-800 inline-flex items-center font-medium"
            >
              ← Back to Digital Invitations
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvitationLogin;
