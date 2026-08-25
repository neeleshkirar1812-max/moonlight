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
    if (e) e.preventDefault();
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

  const instantDemoLogin = async (testEmail, testPass) => {
    setEmail(testEmail);
    setPassword(testPass);
    setLoading(true);
    try {
      const loggedUser = await login(testEmail, testPass);
      addToast({ title: 'Demo Access Granted', message: `Logged in as ${loggedUser.name}`, type: 'success' });
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
      addToast({ title: 'Authentication Error', message: err.message, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-black pt-28 pb-20 px-4 flex items-center justify-center relative">
      <div className="max-w-md w-full bg-white border-2 border-neutral-300 rounded-3xl p-6 sm:p-10 shadow-2xl relative z-10 space-y-6 text-black">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full border-2 border-gold-600 flex items-center justify-center bg-white mx-auto shadow-md overflow-hidden p-0.5">
            <img
              src="https://ugc.production.linktr.ee/bbcf2874-0602-4cdb-b362-ad612f9fc135_zV3Uuw-tQraxE7KwMApwOHbWTg75v6W5ZJJOyWhXSJBR8O1GMQMZMOQ4CvB8uCMV4mM0SXMK-Q-s800-c-k-c0x00ffffff-no-r.jpeg?io=true&size=avatar-v3_0"
              alt="Moonlight Production"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-black text-black tracking-wide">
            Moonlight Production Sign In
          </h2>
          <p className="text-xs text-neutral-700 font-medium">
            {activeTab === 'customer'
              ? 'Access your private wedding album, 4K films & GST invoices'
              : 'Studio administration, shoot operations & crew management'}
          </p>
        </div>

        {/* Dual Tab Switcher */}
        <div className="grid grid-cols-2 p-1 rounded-2xl bg-neutral-100 border border-neutral-300 text-xs font-bold">
          <button
            type="button"
            onClick={() => {
              setActiveTab('customer');
              setEmail('');
              setPassword('');
            }}
            className={`py-2.5 rounded-xl transition-all flex items-center justify-center ${
              activeTab === 'customer'
                ? 'bg-black text-white font-black shadow-md'
                : 'text-neutral-700 hover:text-black'
            }`}
          >
            <Heart className="w-3.5 h-3.5 mr-1.5 text-gold-400" /> Couple Sanctuary
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
                ? 'bg-black text-white font-black shadow-md'
                : 'text-neutral-700 hover:text-black'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 mr-1.5 text-gold-400" /> Studio & Staff
          </button>
        </div>

        {/* Quick Demo 1-Click Buttons (Guaranteed 100% working on Vercel Live) */}
        {activeTab === 'customer' ? (
          <div className="p-3.5 rounded-2xl bg-gold-50 border-2 border-gold-400 space-y-2">
            <div className="flex items-center justify-between text-[10.5px] text-gold-900 font-mono font-black uppercase tracking-wider">
              <span>👰 Couple Test Credentials</span>
              <span>PIN: 2026</span>
            </div>
            <button
              type="button"
              onClick={() => instantDemoLogin('aarav.ananya@gmail.com', 'Customer@2026')}
              className="w-full py-2.5 px-3 rounded-xl bg-white hover:bg-black hover:text-white text-black text-xs text-left border border-neutral-300 flex items-center justify-between font-mono font-bold shadow-sm transition-all group"
            >
              <span>aarav.ananya@gmail.com</span>
              <span className="text-[10.5px] text-gold-800 group-hover:text-gold-400 font-sans font-black">1-Click Login →</span>
            </button>
          </div>
        ) : (
          <div className="p-3.5 rounded-2xl bg-neutral-50 border-2 border-neutral-300 space-y-2">
            <span className="text-[10.5px] text-black font-mono font-black uppercase tracking-wider block">
              🛡️ Studio & Crew Test Credentials
            </span>
            <div className="grid grid-cols-1 gap-1.5 text-xs font-mono">
              <button
                type="button"
                onClick={() => instantDemoLogin('admin@moonlightproduction.com', 'Admin@2026')}
                className="py-2 px-3 rounded-xl bg-white hover:bg-black hover:text-white text-black font-bold text-left border border-neutral-300 flex items-center justify-between shadow-sm transition-all group"
              >
                <span>🛡️ Studio Admin</span>
                <span className="text-[10.5px] text-gold-800 group-hover:text-gold-400 font-sans font-black">1-Click →</span>
              </button>
              <button
                type="button"
                onClick={() => instantDemoLogin('superadmin@moonlightproduction.com', 'SuperAdmin@2026')}
                className="py-2 px-3 rounded-xl bg-white hover:bg-black hover:text-white text-black font-bold text-left border border-neutral-300 flex items-center justify-between shadow-sm transition-all group"
              >
                <span>👑 Super Admin</span>
                <span className="text-[10.5px] text-gold-800 group-hover:text-gold-400 font-sans font-black">1-Click →</span>
              </button>
              <button
                type="button"
                onClick={() => instantDemoLogin('lead.photographer@moonlightproduction.com', 'Employee@2026')}
                className="py-2 px-3 rounded-xl bg-white hover:bg-black hover:text-white text-black font-bold text-left border border-neutral-300 flex items-center justify-between shadow-sm transition-all group"
              >
                <span>📸 Lead Crew</span>
                <span className="text-[10.5px] text-gold-800 group-hover:text-gold-400 font-sans font-black">1-Click →</span>
              </button>
            </div>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div className="space-y-1.5">
            <label className="text-black font-extrabold uppercase text-[11px]">Email Address</label>
            <div className="relative">
              <User className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@domain.com"
                className="w-full bg-white border-2 border-neutral-300 rounded-xl pl-10 pr-4 py-3 text-black font-semibold focus:border-black focus:outline-none shadow-sm"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-black font-extrabold uppercase text-[11px]">Password</label>
              <Link to="/forgot-password" className="text-gold-800 hover:underline text-[11px] font-bold">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white border-2 border-neutral-300 rounded-xl pl-10 pr-4 py-3 text-black font-semibold focus:border-black focus:outline-none shadow-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 mt-2 rounded-full bg-black hover:bg-neutral-800 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 transition-all flex items-center justify-center disabled:opacity-50 btn-shimmer"
          >
            {loading ? 'Authenticating...' : `Sign In to ${activeTab === 'customer' ? 'Client Sanctuary' : 'Studio Portal'}`}
            <ArrowRight className="w-4 h-4 ml-2 text-gold-400" />
          </button>
        </form>

        {/* Footer info */}
        <div className="pt-4 border-t border-neutral-200 text-center text-xs text-neutral-700 font-medium">
          {activeTab === 'customer' ? (
            <p>
              New couple planning a wedding celebration?{' '}
              <Link to="/enquiry" className="text-black font-black hover:underline">
                Plan Your Wedding Here →
              </Link>
            </p>
          ) : (
            <p>
              Looking to join the cinema crew?{' '}
              <Link to="/careers" className="text-black font-black hover:underline">
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
