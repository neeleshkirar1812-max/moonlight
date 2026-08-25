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

  return (
    <div className="min-h-screen bg-[#0B0B0C] text-white pt-24 sm:pt-28 pb-16 px-4 flex items-center justify-center relative overflow-hidden">
      {/* Background Ambient Radial Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-b from-gold-500/15 via-gold-600/5 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-gold-400/10 rounded-full blur-3xl pointer-events-none" />

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
            Moonlight Production • Portal
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-white tracking-wide">
            Sign In to Atelier
          </h2>
          <p className="text-xs text-neutral-400 max-w-sm mx-auto">
            {activeTab === 'customer' && 'Access private wedding albums, 4K films, download selections & receipts.'}
            {activeTab === 'admin' && 'Studio management, client pipelines, shoot logistics & command control.'}
            {activeTab === 'crew' && 'Assigned shoot schedules, camera gear checklists & project briefs.'}
          </p>
        </div>

        {/* 3-Way Role Switcher Tabs */}
        <div className="grid grid-cols-3 p-1 rounded-2xl bg-black/60 border border-white/10 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('customer')}
            className={`py-2.5 rounded-xl transition-all flex flex-col sm:flex-row items-center justify-center text-center gap-1 ${
              activeTab === 'customer'
                ? 'bg-gold-gradient text-black font-extrabold shadow-gold-subtle'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Heart className="w-3.5 h-3.5 shrink-0" />
            <span className="text-[11px]">Couple</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('admin')}
            className={`py-2.5 rounded-xl transition-all flex flex-col sm:flex-row items-center justify-center text-center gap-1 ${
              activeTab === 'admin'
                ? 'bg-gold-gradient text-black font-extrabold shadow-gold-subtle'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Crown className="w-3.5 h-3.5 shrink-0" />
            <span className="text-[11px]">Admin</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('crew')}
            className={`py-2.5 rounded-xl transition-all flex flex-col sm:flex-row items-center justify-center text-center gap-1 ${
              activeTab === 'crew'
                ? 'bg-gold-gradient text-black font-extrabold shadow-gold-subtle'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Camera className="w-3.5 h-3.5 shrink-0" />
            <span className="text-[11px]">Crew</span>
          </button>
        </div>

        {/* Admin Sub-Role Selector (Super Admin vs Studio Admin) */}
        {activeTab === 'admin' && (
          <div className="grid grid-cols-2 p-1 rounded-xl bg-[#181820] border border-white/10 text-xs font-mono">
            <button
              type="button"
              onClick={() => setAdminRoleType('superadmin')}
              className={`py-2 rounded-lg font-bold transition-all flex items-center justify-center gap-1.5 ${
                adminRoleType === 'superadmin'
                  ? 'bg-gold-500/20 text-gold-300 border border-gold-500/40 shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Crown className="w-3.5 h-3.5 text-gold-400" />
              <span>Super Admin</span>
            </button>

            <button
              type="button"
              onClick={() => setAdminRoleType('admin')}
              className={`py-2 rounded-lg font-bold transition-all flex items-center justify-center gap-1.5 ${
                adminRoleType === 'admin'
                  ? 'bg-gold-500/20 text-gold-300 border border-gold-500/40 shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
              <span>Studio Admin / HR</span>
            </button>
          </div>
        )}

        {/* Highlighted Self-Registration Option for Couples */}
        {activeTab === 'customer' && (
          <div className="p-3 rounded-2xl bg-white/5 border border-gold-500/30 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <UserPlus className="w-4 h-4 text-gold-400 shrink-0" />
              <div>
                <span className="text-xs font-bold text-white block">New Couple Registration?</span>
                <span className="text-[10px] text-neutral-400">Request private sanctuary credentials from studio.</span>
              </div>
            </div>
            <Link
              to="/register"
              className="px-3.5 py-1.5 rounded-full bg-gold-500/20 hover:bg-gold-500 hover:text-black border border-gold-500/50 text-gold-300 font-extrabold text-[10.5px] uppercase tracking-wider transition-all shrink-0"
            >
              Request Access →
            </Link>
          </div>
        )}

        {/* Real Production Login Form */}
        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div className="space-y-1.5">
            <label className="text-neutral-300 font-bold uppercase text-[10.5px] tracking-wider block">
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
                className="w-full bg-black/70 border border-white/15 rounded-xl pl-10 pr-4 py-3 text-white placeholder-neutral-500 focus:border-gold-400 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-neutral-300 font-bold uppercase text-[10.5px] tracking-wider">
                Password
              </label>
              <Link to="/forgot-password" className="text-gold-400 hover:underline text-[11px]">
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
                className="w-full bg-black/70 border border-white/15 rounded-xl pl-10 pr-10 py-3 text-white placeholder-neutral-500 focus:border-gold-400 focus:outline-none transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 mt-2 rounded-full bg-gold-gradient text-black font-extrabold text-xs uppercase tracking-widest shadow-gold-subtle hover:brightness-110 active:scale-95 transition-all flex items-center justify-center disabled:opacity-50 btn-shimmer"
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
        <div className="pt-4 border-t border-white/10 text-center text-xs text-neutral-400 space-y-2">
          {activeTab === 'customer' ? (
            <div>
              <p>
                Planning your wedding celebration?{' '}
                <Link to="/enquiry" className="text-gold-300 font-extrabold hover:underline">
                  Plan Shoot with Estimator →
                </Link>
              </p>
            </div>
          ) : (
            <p>
              Looking for commercial cinema vacancies?{' '}
              <Link to="/careers" className="text-gold-300 font-bold hover:underline">
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
