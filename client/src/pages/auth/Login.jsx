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
  Heart,
  Camera,
  Eye,
  EyeOff,
  Crown,
  KeyRound,
  CheckCircle2,
  HelpCircle,
  UserPlus,
} from 'lucide-react';

const Login = () => {
  const [activeTab, setActiveTab] = useState('customer'); // 'customer' | 'admin' | 'crew'
  const [adminRoleType, setAdminRoleType] = useState('superadmin'); // 'superadmin' | 'admin'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { addToast } = useNotification();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const roleParam = params.get('role');
    if (roleParam === 'superadmin') {
      setActiveTab('admin');
      setAdminRoleType('superadmin');
    } else if (roleParam === 'admin' || roleParam === 'staff') {
      setActiveTab('admin');
      setAdminRoleType('admin');
    } else if (roleParam === 'employee' || roleParam === 'crew') {
      setActiveTab('crew');
    } else {
      setActiveTab('customer');
    }
  }, [location.search]);

  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    if (!email || !password) {
      addToast({ title: 'Missing Information', message: 'Please enter your registered email and password.', type: 'warning' });
      return;
    }

    setLoading(true);
    try {
      // Pass selected active tab and admin role to login
      const selectedRole = activeTab === 'admin' ? adminRoleType : activeTab === 'crew' ? 'employee' : 'customer';
      const loggedUser = await login(email, password, selectedRole);
      addToast({ title: 'Authentication Successful', message: `Welcome ${loggedUser.name}!`, type: 'success' });

      if (selectedRole === 'admin' && (loggedUser.role === 'admin' || loggedUser.role === 'superadmin')) {
        navigate('/admin/dashboard');
      } else if (loggedUser.role === 'superadmin') {
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

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-neutral-900 pt-24 sm:pt-28 pb-16 px-3 sm:px-4 flex items-center justify-center relative overflow-x-hidden w-full max-w-full">
      <div className="max-w-lg w-full bg-white border border-amber-900/15 rounded-3xl p-4 sm:p-8 md:p-10 shadow-2xl relative z-10 animate-fade-in space-y-6 text-neutral-900">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-full border-2 border-amber-600/40 flex items-center justify-center bg-white mx-auto shadow-md overflow-hidden p-0.5">
            <img
              src="https://ugc.production.linktr.ee/bbcf2874-0602-4cdb-b362-ad612f9fc135_zV3Uuw-tQraxE7KwMApwOHbWTg75v6W5ZJJOyWhXSJBR8O1GMQMZMOQ4CvB8uCMV4mM0SXMK-Q-s800-c-k-c0x00ffffff-no-r.jpeg?io=true&size=avatar-v3_0"
              alt="Moonlight Production"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-amber-700 font-bold block">
            Moonlight Production • Portal
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-wide">
            Secure Portal Sign In
          </h2>
          <p className="text-neutral-600 text-xs font-normal">
            Enter your authorized studio credentials to access your dedicated workspace.
          </p>
        </div>

        {/* 3-Way Role Switcher Tabs */}
        <div className="grid grid-cols-3 p-1 rounded-2xl bg-[#FAF8F5] border border-neutral-300 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('customer')}
            className={`py-2 rounded-xl transition-all flex flex-col sm:flex-row items-center justify-center text-center gap-1 min-h-[44px] ${
              activeTab === 'customer'
                ? 'bg-gold-gradient text-neutral-950 font-extrabold shadow-sm'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <Heart className="w-3.5 h-3.5 shrink-0" />
            <span className="text-[10.5px] sm:text-[11px]">Couple</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('admin')}
            className={`py-2 rounded-xl transition-all flex flex-col sm:flex-row items-center justify-center text-center gap-1 min-h-[44px] ${
              activeTab === 'admin'
                ? 'bg-gold-gradient text-neutral-950 font-extrabold shadow-sm'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <Crown className="w-3.5 h-3.5 shrink-0" />
            <span className="text-[10.5px] sm:text-[11px]">Admin</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('crew')}
            className={`py-2 rounded-xl transition-all flex flex-col sm:flex-row items-center justify-center text-center gap-1 min-h-[44px] ${
              activeTab === 'crew'
                ? 'bg-gold-gradient text-neutral-950 font-extrabold shadow-sm'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <Camera className="w-3.5 h-3.5 shrink-0" />
            <span className="text-[10.5px] sm:text-[11px]">Crew</span>
          </button>
        </div>

        {/* Admin Sub-Role Selector (Super Admin vs Studio Admin) */}
        {activeTab === 'admin' && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 p-1 rounded-xl bg-[#FAF8F5] border border-neutral-300 text-xs font-mono">
              <button
                type="button"
                onClick={() => setAdminRoleType('superadmin')}
                className={`py-2 rounded-lg font-bold transition-all flex items-center justify-center gap-1.5 ${
                  adminRoleType === 'superadmin'
                    ? 'bg-amber-100 text-amber-900 border border-amber-600 shadow-sm'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                <Crown className="w-3.5 h-3.5 text-amber-700" />
                <span>Super Admin</span>
              </button>

              <button
                type="button"
                onClick={() => setAdminRoleType('admin')}
                className={`py-2 rounded-lg font-bold transition-all flex items-center justify-center gap-1.5 ${
                  adminRoleType === 'admin'
                    ? 'bg-amber-100 text-amber-900 border border-amber-600 shadow-sm'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                <span>Studio Admin / HR</span>
              </button>
            </div>

            {/* Quick Auto-Fill helper card for Super Admin & Studio Admin */}
            {adminRoleType === 'superadmin' ? (
              <div className="p-3 rounded-2xl bg-amber-50 border border-amber-600/30 flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="text-[11px] font-bold text-amber-900 block">Super Admin Credentials</span>
                  <span className="text-[10px] text-neutral-600 font-mono font-medium">nkneeleshkirar@gmail.com</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setEmail('nkneeleshkirar@gmail.com');
                    setPassword('SuperAdmin@2026');
                  }}
                  className="px-3 py-1.5 rounded-lg bg-amber-100 hover:bg-amber-600 hover:text-white border border-amber-600/40 text-amber-900 text-[10px] font-mono font-bold transition-all shrink-0"
                >
                  ⚡ Auto-Fill
                </button>
              </div>
            ) : (
              <div className="p-3 rounded-2xl bg-amber-50 border border-amber-600/30 flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="text-[11px] font-bold text-amber-900 block">Studio Admin Credentials</span>
                  <span className="text-[10px] text-neutral-600 font-mono font-medium">admin@moonlightproduction.com</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setEmail('admin@moonlightproduction.com');
                    setPassword('Admin@2026');
                  }}
                  className="px-3 py-1.5 rounded-lg bg-amber-100 hover:bg-amber-600 hover:text-white border border-amber-600/40 text-amber-900 text-[10px] font-mono font-bold transition-all shrink-0"
                >
                  ⚡ Auto-Fill
                </button>
              </div>
            )}
          </div>
        )}

        {/* Quick Auto-Fill helper card for Crew */}
        {activeTab === 'crew' && (
          <div className="p-3 rounded-2xl bg-amber-50 border border-amber-600/30 flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-[11px] font-bold text-amber-900 block">Crew Lead Credentials</span>
              <span className="text-[10px] text-neutral-600 font-mono font-medium">amanpawar074@gmail.com</span>
            </div>
            <button
              type="button"
              onClick={() => {
                setEmail('amanpawar074@gmail.com');
                setPassword('Crew@2026');
              }}
              className="px-3 py-1.5 rounded-lg bg-amber-100 hover:bg-amber-600 hover:text-white border border-amber-600/40 text-amber-900 text-[10px] font-mono font-bold transition-all shrink-0"
            >
              ⚡ Auto-Fill
            </button>
          </div>
        )}

        {/* Quick Auto-Fill helper card & Self-Registration for Couples */}
        {activeTab === 'customer' && (
          <div className="space-y-2">
            <div className="p-3 rounded-2xl bg-amber-50 border border-amber-600/30 flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-[11px] font-bold text-amber-900 block">Couple Client Credentials</span>
                <span className="text-[10px] text-neutral-600 font-mono font-medium">aarav.ananya@gmail.com</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setEmail('aarav.ananya@gmail.com');
                  setPassword('Client@2026');
                }}
                className="px-3 py-1.5 rounded-lg bg-amber-100 hover:bg-amber-600 hover:text-white border border-amber-600/40 text-amber-900 text-[10px] font-mono font-bold transition-all shrink-0"
              >
                ⚡ Auto-Fill
              </button>
            </div>

            <div className="p-2.5 rounded-2xl bg-[#FAF8F5] border border-neutral-300 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <UserPlus className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                <span className="text-[11px] text-neutral-700 font-medium">New couple? Request account</span>
              </div>
              <Link
                to="/register"
                className="px-2.5 py-1 rounded-full bg-gold-gradient text-neutral-950 font-extrabold text-[10px] uppercase tracking-wider transition-all shrink-0 shadow-sm"
              >
                Register →
              </Link>
            </div>
          </div>
        )}

        {/* Real Production Login Form */}
        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div className="space-y-1.5">
            <label className="text-neutral-800 font-bold uppercase text-[10.5px] tracking-wider block">
              {activeTab === 'customer'
                ? 'Client Email Address'
                : activeTab === 'admin'
                ? `${adminRoleType === 'superadmin' ? 'Super Admin' : 'Studio Admin / HR'} Email`
                : 'Crew Member Email'}
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@domain.com"
                className="w-full bg-[#FAF8F5] border border-neutral-300 rounded-xl pl-10 pr-4 py-3 text-neutral-900 placeholder-neutral-400 focus:border-amber-600 focus:bg-white focus:outline-none transition-colors shadow-sm"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-neutral-800 font-bold uppercase text-[10.5px] tracking-wider">
                Password
              </label>
              <Link to="/forgot-password" className="text-amber-800 font-bold hover:underline text-[11px]">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#FAF8F5] border border-neutral-300 rounded-xl pl-10 pr-10 py-3 text-neutral-900 placeholder-neutral-400 focus:border-amber-600 focus:bg-white focus:outline-none transition-colors shadow-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-900"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 mt-2 rounded-full bg-gold-gradient text-neutral-950 font-extrabold text-xs uppercase tracking-widest shadow-sm hover:brightness-105 active:scale-95 transition-all flex items-center justify-center disabled:opacity-50 btn-shimmer"
          >
            {loading
              ? 'Verifying Credentials...'
              : `Sign In to ${
                  activeTab === 'customer'
                    ? 'Couple Sanctuary'
                    : activeTab === 'admin'
                    ? `${adminRoleType === 'superadmin' ? 'Super Admin Command' : 'Studio Admin Console'}`
                    : 'Crew Portal'
                }`}
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </form>

        {/* Footer Info */}
        <div className="pt-4 border-t border-amber-900/10 text-center text-xs text-neutral-600 space-y-2">
          {activeTab === 'customer' ? (
            <div>
              <p>
                Planning your wedding celebration?{' '}
                <Link to="/enquiry" className="text-amber-800 font-extrabold hover:underline">
                  Plan Shoot with Estimator →
                </Link>
              </p>
            </div>
          ) : (
            <p>
              Looking for commercial cinema vacancies?{' '}
              <Link to="/careers" className="text-amber-800 font-bold hover:underline">
                Explore Studio Openings →
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
