import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import SEO from '../../components/common/SEO';
import { useNotification } from '../../context/NotificationContext';
import {
  User,
  Lock,
  ArrowRight,
  Eye,
  EyeOff,
  Sparkles,
  Heart,
  Crown,
  ShieldCheck,
  Camera,
  Phone,
  CheckCircle2,
  Play,
  Film,
  Award,
} from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const { addToast } = useNotification();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    if (!email || !password) {
      addToast({
        title: 'Required Details Missing',
        message: 'Please enter both your email address and password.',
        type: 'warning',
      });
      return;
    }

    setLoading(true);
    try {
      // Market Standard: Universal Intelligent Login (Auto-routes by role from backend/AuthContext)
      const loggedUser = await login(email, password);
      addToast({
        title: 'Authentication Successful',
        message: `Welcome back, ${loggedUser.name}!`,
        type: 'success',
      });

      // Intelligent Automatic Routing
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
      addToast({
        title: 'Sign In Failed',
        message: err.message || 'Invalid email or password. Please verify your credentials.',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-neutral-900 pt-24 pb-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center font-sans relative selection:bg-amber-200 selection:text-amber-900">
      <SEO
        title="Sign In to Your Workspace | Moonlight Production"
        description="Access your luxury wedding films, private client galleries, digital invitation suites, and studio workspace."
      />

      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-10 left-1/4 w-96 h-96 rounded-full bg-amber-200/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 rounded-full bg-rose-200/20 blur-3xl pointer-events-none" />

      <div className="max-w-5xl w-full bg-white border border-stone-300 rounded-[32px] shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 relative z-10">
        
        {/* ========================================================================= */}
        {/* LEFT COLUMN: CINEMATIC LUXURY VISUAL CANVAS */}
        {/* ========================================================================= */}
        <div className="hidden lg:flex lg:col-span-5 bg-gradient-to-br from-[#120D0A] via-[#1E1510] to-[#2B1B12] p-10 flex-col justify-between relative text-white overflow-hidden">
          {/* Background Ambient Poster */}
          <div className="absolute inset-0 z-0 opacity-40">
            <img
              src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80"
              alt="Moonlight Royal Wedding Cinema"
              className="w-full h-full object-cover filter brightness-75 scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#120D0A] via-[#120D0A]/70 to-transparent" />
          </div>

          {/* Top Brand Crest */}
          <div className="relative z-10 space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full border-2 border-amber-400/80 flex items-center justify-center bg-white p-0.5 shadow-lg">
                <img
                  src="https://ugc.production.linktr.ee/bbcf2874-0602-4cdb-b362-ad612f9fc135_zV3Uuw-tQraxE7KwMApwOHbWTg75v6W5ZJJOyWhXSJBR8O1GMQMZMOQ4CvB8uCMV4mM0SXMK-Q-s800-c-k-c0x00ffffff-no-r.jpeg?io=true&size=avatar-v3_0"
                  alt="Moonlight Production"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <span className="font-serif text-lg font-bold tracking-[0.18em] text-white block">
                  MOONLIGHT
                </span>
                <span className="text-[9px] tracking-[0.2em] text-amber-400 font-sans uppercase font-bold">
                  Production • Luxury Cinema
                </span>
              </div>
            </div>

            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-amber-300 text-[10px] font-sans uppercase font-semibold backdrop-blur-md">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>India's Premier Wedding Studio</span>
            </div>
          </div>

          {/* Center Quote / Testimonial */}
          <div className="relative z-10 space-y-4 my-auto py-8">
            <blockquote className="font-serif text-xl sm:text-2xl font-normal leading-snug text-neutral-100 italic">
              “Every sacred moment immortalized with royal grandeur, raw emotion, and master 4K color grading.”
            </blockquote>
            <div className="flex items-center space-x-3 pt-2">
              <div className="w-9 h-9 rounded-full bg-gradient-to-r from-amber-500 to-amber-700 text-neutral-950 font-bold flex items-center justify-center text-xs shadow">
                MP
              </div>
              <div>
                <h4 className="text-xs font-bold text-white font-sans">Moonlight Cinema & Invitations</h4>
                <p className="text-[10px] text-neutral-400 font-sans">Bhopal • Udaipur • Goa • Destination</p>
              </div>
            </div>
          </div>

          {/* Bottom Statistics */}
          <div className="relative z-10 pt-4 border-t border-white/15 grid grid-cols-2 gap-4 text-xs font-sans">
            <div>
              <span className="text-[10px] text-neutral-400 uppercase block font-medium">Royal Celebrations</span>
              <span className="font-bold text-amber-300 text-sm">500+ Weddings</span>
            </div>
            <div>
              <span className="text-[10px] text-neutral-400 uppercase block font-medium">Digital Suites</span>
              <span className="font-bold text-amber-300 text-sm">31 4K Gate Themes</span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT COLUMN: REFINED AUTHENTICATION FORM */}
        {/* ========================================================================= */}
        <div className="lg:col-span-7 p-6 sm:p-10 md:p-12 flex flex-col justify-between space-y-6 bg-white">
          
          {/* Header */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-sans uppercase tracking-wider text-amber-800 font-bold flex items-center">
                <Sparkles className="w-3.5 h-3.5 mr-1.5 text-amber-600" />
                SECURE AUTHENTICATION
              </span>
              <span className="text-[10px] font-sans font-medium text-neutral-500 px-2.5 py-0.5 rounded-full bg-stone-100 border border-stone-200">
                2026 Portal
              </span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
              Sign In to Your Workspace
            </h1>
            <p className="text-neutral-600 text-xs sm:text-sm font-sans">
              Enter your credentials below. The platform will automatically route you to your dedicated couple portal or administration panel.
            </p>
          </div>

          {/* Sign In Form */}
          <form onSubmit={handleLogin} className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <label className="text-neutral-900 font-bold text-xs uppercase tracking-wider block font-sans">
                Username or Email Address
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter username (e.g. Moonlight) or email"
                  className="w-full bg-[#FAF8F5] border border-stone-300 rounded-xl pl-10 pr-4 py-3 text-neutral-900 font-medium text-xs sm:text-sm placeholder-neutral-400 focus:border-amber-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-neutral-900 font-bold text-xs uppercase tracking-wider block font-sans">
                  Password
                </label>
                <Link to="/forgot-password" className="text-amber-800 font-bold text-xs hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setSelectedDemo(null);
                  }}
                  placeholder="Enter your password"
                  className="w-full bg-[#FAF8F5] border border-stone-300 rounded-xl pl-10 pr-10 py-3 text-neutral-900 font-medium text-xs sm:text-sm placeholder-neutral-400 focus:border-amber-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all"
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

            {/* Remember Me Checkbox */}
            <div className="flex items-center justify-between pt-1 text-xs">
              <label className="flex items-center space-x-2 cursor-pointer select-none text-neutral-700 font-medium">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-stone-300 text-amber-700 focus:ring-amber-500 cursor-pointer"
                />
                <span>Remember this device</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 mt-2 rounded-xl bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900 hover:from-amber-800 hover:to-amber-950 active:scale-[0.99] text-white font-bold text-xs uppercase tracking-wider shadow-lg transition-all flex items-center justify-center disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Verifying & Opening Workspace...</span>
                </div>
              ) : (
                <>
                  <span>Sign In to Your Workspace</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </button>
          </form>

          {/* Footer Links & Studio Hotline */}
          <div className="pt-4 border-t border-stone-200 space-y-3 text-center text-xs">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-neutral-600">
              <span>New couple creating an invitation?</span>
              <Link to="/templates" className="text-amber-900 font-bold hover:underline">
                Explore Digital Suites →
              </Link>
            </div>

            <div className="flex items-center justify-center space-x-1.5 text-neutral-500 font-medium">
              <Phone className="w-3.5 h-3.5 text-amber-800" />
              <span>Direct Studio Assistance:</span>
              <a href="tel:+919229229323" className="text-amber-900 font-bold hover:underline font-mono">
                +91 92292 29323
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;
