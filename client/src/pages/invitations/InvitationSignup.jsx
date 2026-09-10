import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import SEO from '../../components/common/SEO';
import { Sparkles, Heart, Lock, Mail, User, Phone, ArrowRight } from 'lucide-react';

const InvitationSignup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const { addToast } = useNotification();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !name) {
      addToast({ title: 'Missing fields', message: 'Please enter your name and email', type: 'error' });
      return;
    }

    setLoading(true);
    try {
      localStorage.setItem('moonlight_customer_email', email.trim());
      if (register) {
        await register({ name: name.trim(), email: email.trim(), phone: phone.trim(), password: password || 'Client@2026' });
      }
      addToast({
        title: 'Account Created! 🎉',
        message: 'Welcome to Moonlight Digital Invitations.',
        type: 'success',
      });
      navigate('/invitations/templates');
    } catch (err) {
      localStorage.setItem('moonlight_customer_email', email.trim());
      navigate('/invitations/templates');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-neutral-900 pt-28 pb-16 flex items-center justify-center px-4 font-sans">
      <SEO
        title="Create Account | Moonlight Digital Invitations"
        description="Register to build your luxury wedding digital invitation, personalize interactive features, and share live RSVP links with your wedding guests."
      />

      <div className="w-full max-w-md bg-white rounded-3xl border border-amber-900/10 shadow-xl p-8 sm:p-10 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mx-auto mb-3">
            <Sparkles className="w-6 h-6 text-amber-700" />
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900">
            Create Your Account
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 font-sans">
            Start creating your royal digital wedding invitation
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
              Full Name / Couple Names
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Aarav & Kiara"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600"
              />
            </div>
          </div>

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
                placeholder="couple@gmail.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
              WhatsApp Phone Number
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
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
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600"
              />
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
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="pt-4 border-t border-neutral-100 text-center space-y-3">
          <p className="text-xs text-neutral-500">
            Already registered?{' '}
            <Link to="/invitations/login" className="text-amber-800 font-bold hover:underline">
              Sign In
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

export default InvitationSignup;
