import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import SEO from '../../components/common/SEO';
import { Sparkles, Mail, User, Phone, ArrowRight, Lock } from 'lucide-react';

const InvitationSignup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const { addToast } = useNotification();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const redirectUrl = searchParams.get('redirect') || '/templates';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !name) {
      addToast({ title: 'Missing fields', message: 'Please enter your name and email', type: 'error' });
      return;
    }

    setLoading(true);
    try {
      if (register) {
        await register({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim() || '+91 92292 29323',
          password: password || 'Client@2026',
        });
      }
      localStorage.setItem('moonlight_customer_email', email.trim());

      addToast({
        title: 'Account Created! 🎉',
        message: 'Proceeding to your selected invitation checkout...',
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

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-neutral-900 pt-28 pb-16 flex items-center justify-center px-4 font-sans">
      <SEO
        title="Create Account | Moonlight Digital Invitations"
        description="Register to build your luxury wedding digital invitation."
      />

      <div className="w-full max-w-md bg-white rounded-3xl border border-amber-900/10 shadow-2xl p-8 sm:p-10 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mx-auto mb-3 shadow-inner">
            <Sparkles className="w-6 h-6 text-amber-700" />
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900">
            Create Your Account
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 font-sans">
            Sign up to unlock and customize your luxury digital invitation
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
              Full Name / Couple Names *
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Aarav Sharma & Kiara Sen"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-amber-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. aarav.kiara@gmail.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-amber-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
              WhatsApp Phone Number (Optional)
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98260 00000"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-amber-600"
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
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-amber-600"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 hover:from-amber-800 hover:to-amber-800 text-white font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center space-x-2 transition-all cursor-pointer"
          >
            <span>{loading ? 'Creating Account...' : 'Continue to Payment →'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-2 border-t border-neutral-100">
          <p className="text-xs text-neutral-500">
            Already have an account?{' '}
            <Link
              to={`/invitations/login?redirect=${encodeURIComponent(redirectUrl)}`}
              className="text-amber-800 font-bold hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default InvitationSignup;
