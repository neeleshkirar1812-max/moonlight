import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import {
  ShieldCheck,
  User,
  Lock,
  ArrowRight,
  Heart,
  Camera,
  Eye,
  EyeOff,
  Crown,
  UserPlus,
  Phone,
  Sliders,
} from 'lucide-react';

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth();
  const { addToast } = useNotification();

  // Mode: 'couple' vs 'staff'
  const params = new URLSearchParams(location.search);
  const roleParam = params.get('role');
  const isStaffMode = roleParam === 'admin' || roleParam === 'superadmin' || roleParam === 'crew' || roleParam === 'employee' || roleParam === 'staff';

  // Staff sub-role: 'superadmin' | 'admin' | 'crew'
  const [staffRole, setStaffRole] = useState(
    roleParam === 'superadmin' ? 'superadmin' : roleParam === 'crew' || roleParam === 'employee' ? 'crew' : 'admin'
  );

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const currentParams = new URLSearchParams(location.search);
    const r = currentParams.get('role');
    if (r === 'superadmin') {
      setStaffRole('superadmin');
    } else if (r === 'crew' || r === 'employee') {
      setStaffRole('crew');
    } else if (r === 'admin' || r === 'staff') {
      setStaffRole('admin');
    }
    // Clear inputs on mode switch
    setEmail('');
    setPassword('');
  }, [location.search]);

  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    if (!email || !password) {
      addToast({ title: 'Missing Details', message: 'Please enter both your email and password.', type: 'warning' });
      return;
    }

    setLoading(true);
    try {
      const targetRole = isStaffMode ? (staffRole === 'crew' ? 'employee' : staffRole) : 'customer';
      const loggedUser = await login(email, password, targetRole);
      addToast({ title: 'Login Successful', message: `Welcome, ${loggedUser.name}!`, type: 'success' });

      if (targetRole === 'admin' && (loggedUser.role === 'admin' || loggedUser.role === 'superadmin')) {
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
      addToast({ title: 'Login Failed', message: err.message || 'Invalid email or password.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F1EA] text-neutral-950 pt-24 sm:pt-28 pb-16 px-4 flex items-center justify-center relative">
      <div className="max-w-md w-full bg-white border-2 border-neutral-300 rounded-3xl p-6 sm:p-8 shadow-xl relative z-10 space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-full border-2 border-amber-600 flex items-center justify-center bg-white mx-auto shadow-md overflow-hidden p-0.5">
            <img
              src="https://ugc.production.linktr.ee/bbcf2874-0602-4cdb-b362-ad612f9fc135_zV3Uuw-tQraxE7KwMApwOHbWTg75v6W5ZJJOyWhXSJBR8O1GMQMZMOQ4CvB8uCMV4mM0SXMK-Q-s800-c-k-c0x00ffffff-no-r.jpeg?io=true&size=avatar-v3_0"
              alt="Moonlight Production"
              className="w-full h-full object-cover rounded-full"
            />
          </div>

          {!isStaffMode ? (
            /* COUPLE SANCTUARY HEADER */
            <>
              <span className="text-xs font-mono uppercase tracking-widest text-amber-900 font-bold block">
                COUPLE SANCTUARY • PRIVATE ACCESS
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold text-neutral-950 tracking-tight">
                Couple Sign In
              </h1>
              <p className="text-neutral-700 text-xs sm:text-sm font-medium">
                Sign in to view your 4K wedding films, photo galleries, and shoot schedule.
              </p>
            </>
          ) : (
            /* ADMIN & STAFF PORTAL HEADER */
            <>
              <span className="text-xs font-mono uppercase tracking-widest text-amber-900 font-bold block">
                MOONLIGHT STUDIO • STAFF PORTAL
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold text-neutral-950 tracking-tight">
                Staff & Admin Sign In
              </h1>
              <p className="text-neutral-700 text-xs sm:text-sm font-medium">
                Choose your role to access your administrative workspace.
              </p>
            </>
          )}
        </div>

        {/* STAFF MODE: 3-WAY ROLE SWITCHER TABS (Super Admin / Studio Admin / Crew) */}
        {isStaffMode && (
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-neutral-900 uppercase tracking-wider block">
              Select Studio Role:
            </label>
            <div className="grid grid-cols-3 p-1.5 rounded-2xl bg-[#EBE5DA] border border-neutral-300 gap-1 text-xs">
              <button
                type="button"
                onClick={() => setStaffRole('superadmin')}
                className={`py-2 rounded-xl transition-all flex flex-col items-center justify-center text-center gap-1 font-bold ${
                  staffRole === 'superadmin'
                    ? 'bg-neutral-950 text-white shadow-md'
                    : 'text-neutral-800 hover:text-black hover:bg-white/60'
                }`}
              >
                <Crown className="w-4 h-4 text-amber-400" />
                <span className="text-[11px]">Super Admin</span>
              </button>

              <button
                type="button"
                onClick={() => setStaffRole('admin')}
                className={`py-2 rounded-xl transition-all flex flex-col items-center justify-center text-center gap-1 font-bold ${
                  staffRole === 'admin'
                    ? 'bg-amber-700 text-white shadow-md'
                    : 'text-neutral-800 hover:text-black hover:bg-white/60'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-white" />
                <span className="text-[11px]">Studio Admin</span>
              </button>

              <button
                type="button"
                onClick={() => setStaffRole('crew')}
                className={`py-2 rounded-xl transition-all flex flex-col items-center justify-center text-center gap-1 font-bold ${
                  staffRole === 'crew'
                    ? 'bg-amber-700 text-white shadow-md'
                    : 'text-neutral-800 hover:text-black hover:bg-white/60'
                }`}
              >
                <Camera className="w-4 h-4 text-white" />
                <span className="text-[11px]">Crew Lead</span>
              </button>
            </div>
          </div>
        )}

        {/* SIMPLIFIED QUICK AUTO-FILL CARD */}
        <div className="p-3.5 rounded-2xl bg-amber-50 border-2 border-amber-300 flex items-center justify-between text-neutral-900">
          <div className="space-y-0.5">
            <span className="text-xs font-bold text-amber-950 block">
              {!isStaffMode
                ? 'Demo Couple Account'
                : staffRole === 'superadmin'
                ? 'Super Admin Account (Director)'
                : staffRole === 'crew'
                ? 'Crew Lead Account'
                : 'Studio Admin Account (HR)'}
            </span>
            <span className="text-xs font-mono font-semibold text-neutral-800 block">
              {!isStaffMode
                ? 'aarav.ananya@gmail.com'
                : staffRole === 'superadmin'
                ? 'nkneeleshkirar@gmail.com'
                : staffRole === 'crew'
                ? 'amanpawar074@gmail.com'
                : 'admin@moonlightproduction.com'}
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              if (!isStaffMode) {
                setEmail('aarav.ananya@gmail.com');
                setPassword('Client@2026');
              } else if (staffRole === 'superadmin') {
                setEmail('nkneeleshkirar@gmail.com');
                setPassword('SuperAdmin@2026');
              } else if (staffRole === 'crew') {
                setEmail('amanpawar074@gmail.com');
                setPassword('Crew@2026');
              } else {
                setEmail('admin@moonlightproduction.com');
                setPassword('Admin@2026');
              }
            }}
            className="px-3.5 py-2 rounded-xl bg-amber-700 hover:bg-amber-800 text-white text-xs font-bold transition-all shrink-0 shadow-sm"
          >
            Auto Fill
          </button>
        </div>

        {/* COUPLE SELF-REGISTRATION LINK (Only in Couple Mode) */}
        {!isStaffMode && (
          <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-300 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <UserPlus className="w-4 h-4 text-amber-800 shrink-0" />
              <span className="text-xs text-neutral-800 font-medium">New couple? Request account</span>
            </div>
            <Link
              to="/register"
              className="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-black text-white text-xs font-bold transition-all shadow-sm"
            >
              Register →
            </Link>
          </div>
        )}

        {/* REAL LOGIN FORM */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-neutral-950 font-bold text-xs uppercase tracking-wider block">
              {!isStaffMode
                ? 'Couple Email Address'
                : staffRole === 'superadmin'
                ? 'Super Admin Email'
                : staffRole === 'crew'
                ? 'Crew Email Address'
                : 'Studio Admin Email'}
            </label>
            <div className="relative">
              <User className="w-5 h-5 text-neutral-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full bg-white border-2 border-neutral-400 rounded-xl pl-11 pr-4 py-3 text-neutral-950 font-medium text-sm placeholder-neutral-500 focus:border-amber-700 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-neutral-950 font-bold text-xs uppercase tracking-wider block">
                Password
              </label>
              <Link to="/forgot-password" className="text-amber-900 font-bold text-xs hover:underline">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="w-5 h-5 text-neutral-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full bg-white border-2 border-neutral-400 rounded-xl pl-11 pr-11 py-3 text-neutral-950 font-medium text-sm placeholder-neutral-500 focus:border-amber-700 focus:outline-none transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-700 hover:text-black p-1"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 mt-2 rounded-xl bg-amber-700 hover:bg-amber-800 active:bg-amber-900 text-white font-bold text-sm tracking-wide shadow-md transition-all flex items-center justify-center disabled:opacity-50"
          >
            {loading
              ? 'Verifying...'
              : !isStaffMode
              ? 'Sign In to Couple Sanctuary'
              : `Sign In as ${staffRole === 'superadmin' ? 'Super Admin' : staffRole === 'crew' ? 'Crew Member' : 'Studio Admin'}`}
            <ArrowRight className="w-4 h-4 ml-2 stroke-[2.5]" />
          </button>
        </form>

        {/* SWITCH PORTAL MODE LINK (Couple vs Staff) */}
        <div className="pt-4 border-t border-neutral-300 text-center space-y-3">
          {!isStaffMode ? (
            <div className="p-2.5 rounded-xl bg-neutral-100 border border-neutral-300">
              <span className="text-xs text-neutral-700 block mb-1">Are you Moonlight Studio Staff or Admin?</span>
              <Link
                to="/login?role=admin"
                className="inline-flex items-center text-xs text-amber-900 font-bold hover:underline"
              >
                <ShieldCheck className="w-3.5 h-3.5 mr-1 text-amber-800" />
                Go to Staff & Admin Portal (3 Roles) →
              </Link>
            </div>
          ) : (
            <div className="p-2.5 rounded-xl bg-neutral-100 border border-neutral-300">
              <span className="text-xs text-neutral-700 block mb-1">Are you a Wedding Couple / Client?</span>
              <Link
                to="/login?role=customer"
                className="inline-flex items-center text-xs text-amber-900 font-bold hover:underline"
              >
                <Heart className="w-3.5 h-3.5 mr-1 text-amber-800" />
                Go to Couple Sanctuary Sign In →
              </Link>
            </div>
          )}

          {/* Support Helpline */}
          <div className="flex items-center justify-center space-x-1.5 text-xs text-neutral-700 font-medium">
            <Phone className="w-3.5 h-3.5 text-amber-800" />
            <span>Helpline:</span>
            <a href="tel:+919229229323" className="text-amber-900 font-bold hover:underline font-mono">
              +91 92292 29323
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
