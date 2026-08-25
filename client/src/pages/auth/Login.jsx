import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import {
  ShieldCheck,
  User,
  Lock,
  ArrowRight,
  Sparkles,
  Key,
  Heart,
  Camera,
  Briefcase,
} from 'lucide-react';

const Login = () => {
  const [activeTab, setActiveTab] = useState('customer'); // 'customer' | 'staff'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { addToast } = useNotification();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const roleParam = params.get('role');
    if (roleParam === 'staff' || roleParam === 'admin' || roleParam === 'employee') {
      setActiveTab('staff');
    } else {
      setActiveTab('customer');
    }
  }, [location.search]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      addToast({ title: 'Missing Credentials', message: 'Please provide email and password.', type: 'warning' });
      return;
    }

    setLoading(true);
    try {
      const loggedUser = await login(email, password);
      addToast({ title: 'Welcome Back', message: `Logged in as ${loggedUser.name}`, type: 'success' });

      if (loggedUser.role === 'superadmin') {
        navigate('/super-admin/dashboard');
      } else if (loggedUser.role === 'admin') {
        navigate('/admin/dashboard');
      } else if (loggedUser.role === 'employee') {
        navigate('/employee/dashboard');
      } else {
        navigate('/customer/dashboard');
      }
    } catch (err) {
      addToast({ title: 'Authentication Failed', message: err.message || 'Invalid credentials.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const setTestRole = (testEmail, testPass) => {
    setEmail(testEmail);
    setPassword(testPass);
  };

  return (
    <div className="min-h-screen bg-obsidian text-white pt-28 pb-20 px-4 flex items-center justify-center relative">
      {/* Background Ambient Glow */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-radial-gold opacity-25 pointer-events-none" />

      <div className="max-w-md w-full bg-obsidian-400 border border-gold-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl relative z-10 backdrop-blur-2xl animate-fade-in space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full border border-gold-500/70 flex items-center justify-center bg-obsidian-600 mx-auto shadow-gold-subtle">
            <span className="font-serif font-bold text-gold-400 text-xl">L</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-wide">
            Lumière Atelier Sign In
          </h2>
          <p className="text-xs text-neutral-400">
            {activeTab === 'customer'
              ? 'Access your private wedding album, 4K films & invoices'
              : 'Studio administration, shoot operations & crew management'}
          </p>
        </div>

        {/* Dual Tab Switcher */}
        <div className="grid grid-cols-2 p-1 rounded-2xl bg-obsidian-500 border border-white/10 text-xs font-semibold">
          <button
            type="button"
            onClick={() => {
              setActiveTab('customer');
              setEmail('');
              setPassword('');
            }}
            className={`py-2.5 rounded-xl transition-all flex items-center justify-center ${
              activeTab === 'customer'
                ? 'bg-gold-gradient text-black font-bold shadow-gold-subtle'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Heart className="w-3.5 h-3.5 mr-1.5" /> Couple Sanctuary
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('staff');
              setEmail('');
              setPassword('');
            }}
            className={`py-2.5 rounded-xl transition-all flex items-center justify-center ${
              activeTab === 'staff'
                ? 'bg-white text-black font-bold shadow-md'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 mr-1.5 text-gold-400" /> Studio & Staff
          </button>
        </div>

        {/* Quick Demo 1-Click Buttons */}
        {activeTab === 'customer' ? (
          <div className="p-3.5 rounded-2xl bg-obsidian-500/80 border border-gold-500/30 space-y-2">
            <div className="flex items-center justify-between text-[10px] text-gold-400 font-mono font-bold uppercase tracking-wider">
              <span>👰 Couple Test Credentials</span>
              <span>PIN: 2026</span>
            </div>
            <button
              type="button"
              onClick={() => setTestRole('aarav.ananya@gmail.com', 'Customer@2026')}
              className="w-full py-2 px-3 rounded-xl bg-obsidian-300 hover:bg-gold-500/20 text-neutral-200 hover:text-gold-300 text-xs text-left border border-white/5 flex items-center justify-between font-mono"
            >
              <span>aarav.ananya@gmail.com</span>
              <span className="text-[10px] text-gold-400 font-sans font-bold">1-Click Login →</span>
            </button>
          </div>
        ) : (
          <div className="p-3.5 rounded-2xl bg-obsidian-500/80 border border-white/10 space-y-2">
            <span className="text-[10px] text-gold-400 font-mono font-bold uppercase tracking-wider block">
              🛡️ Studio & Crew Test Credentials
            </span>
            <div className="grid grid-cols-1 gap-1.5 text-xs font-mono">
              <button
                type="button"
                onClick={() => setTestRole('admin@lumierestudios.com', 'Admin@2026')}
                className="py-1.5 px-3 rounded-xl bg-obsidian-300 hover:bg-gold-500/20 text-neutral-200 hover:text-gold-300 text-left border border-white/5 flex items-center justify-between"
              >
                <span>🛡️ Studio Admin</span>
                <span className="text-[10px] text-gold-400 font-sans font-bold">1-Click →</span>
              </button>
              <button
                type="button"
                onClick={() => setTestRole('superadmin@lumierestudios.com', 'SuperAdmin@2026')}
                className="py-1.5 px-3 rounded-xl bg-obsidian-300 hover:bg-gold-500/20 text-neutral-200 hover:text-gold-300 text-left border border-white/5 flex items-center justify-between"
              >
                <span>👑 Super Admin</span>
                <span className="text-[10px] text-gold-400 font-sans font-bold">1-Click →</span>
              </button>
              <button
                type="button"
                onClick={() => setTestRole('lead.photographer@lumierestudios.com', 'Employee@2026')}
                className="py-1.5 px-3 rounded-xl bg-obsidian-300 hover:bg-gold-500/20 text-neutral-200 hover:text-gold-300 text-left border border-white/5 flex items-center justify-between"
              >
                <span>📸 Lead Crew</span>
                <span className="text-[10px] text-gold-400 font-sans font-bold">1-Click →</span>
              </button>
            </div>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div className="space-y-1.5">
            <label className="text-neutral-300 font-semibold uppercase">Email Address</label>
            <div className="relative">
              <User className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@domain.com"
                className="w-full bg-obsidian-500 border border-white/15 rounded-xl pl-10 pr-4 py-3 text-white focus:border-gold-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-neutral-300 font-semibold uppercase">Password</label>
              <Link to="/forgot-password" className="text-gold-400 hover:underline text-[11px]">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-obsidian-500 border border-white/15 rounded-xl pl-10 pr-4 py-3 text-white focus:border-gold-400 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 mt-2 rounded-full bg-gold-gradient text-black font-bold text-xs uppercase tracking-wider shadow-gold-subtle hover:brightness-110 transition-all flex items-center justify-center disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : `Sign In to ${activeTab === 'customer' ? 'Client Sanctuary' : 'Studio Portal'}`}
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </form>

        {/* Footer info */}
        <div className="pt-4 border-t border-white/10 text-center text-xs text-neutral-400">
          {activeTab === 'customer' ? (
            <p>
              New couple planning a celebration?{' '}
              <Link to="/enquiry" className="text-gold-300 font-bold hover:underline">
                Plan Your Wedding Here →
              </Link>
            </p>
          ) : (
            <p>
              Looking to join the cinema crew?{' '}
              <Link to="/careers" className="text-gold-300 font-bold hover:underline">
                Explore Careers & Openings →
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
