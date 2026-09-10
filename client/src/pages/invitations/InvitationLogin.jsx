import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
        message: 'Opening your invitation management dashboard...',
        type: 'success',
      });
      navigate('/invitations/dashboard');
    } catch (err) {
      // Even if generic login fails, set email for invitation dashboard access
      localStorage.setItem('moonlight_customer_email', email.trim());
      navigate('/invitations/dashboard');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-neutral-900 pt-28 pb-16 flex items-center justify-center px-4 font-sans">
      <SEO
        title="Sign In to Digital Invitations | Moonlight Production"
        description="Access your luxury digital wedding invitation dashboard to edit details, customize scratch card messages, and monitor live guest RSVPs."
      />

      <div className="w-full max-w-md bg-white rounded-3xl border border-amber-900/10 shadow-xl p-8 sm:p-10 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mx-auto mb-3">
            <Heart className="w-6 h-6 text-amber-700" />
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900">
            Invitation Portal
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 font-sans">
            Sign in to manage your digital invitation suite & live RSVPs
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="couple@moonlight.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-3 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-amber-900 hover:bg-amber-950 text-white font-bold text-xs uppercase tracking-widest transition-all shadow-md flex items-center justify-center space-x-2"
          >
            {loading ? (
              <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
            ) : (
              <>
                <span>Access Invitations</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="pt-4 border-t border-neutral-100 text-center space-y-3">
          <p className="text-xs text-neutral-500">
            Don't have an invitation yet?{' '}
            <Link
              to="/invitations/templates"
              className="text-amber-800 font-bold hover:underline"
            >
              Browse Templates
            </Link>
          </p>
          <div className="text-center">
            <Link
              to="/invitations"
              className="text-[11px] text-neutral-400 hover:text-neutral-700 inline-flex items-center"
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
