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

const demoAccounts = [
  {
    role: 'customer',
    label: 'Couple',
    icon: Heart,
    email: 'aarav.ananya@gmail.com',
    pass: 'Client@2026',
    desc: '4K Films & Gallery',
  },
  {
    role: 'superadmin',
    label: 'Admin',
    icon: Crown,
    email: 'nkneeleshkirar@gmail.com',
    pass: 'SuperAdmin@2026',
    desc: 'Full Studio Command',
  },
  {
    role: 'admin',
    label: 'HR',
    icon: ShieldCheck,
    email: 'admin@moonlightproduction.com',
    pass: 'Admin@2026',
    desc: 'HR & Operations',
  },
  {
    role: 'employee',
    label: 'Team',
    icon: Camera,
    email: 'amanpawar074@gmail.com',
    pass: 'Crew@2026',
    desc: 'Shoots & Pay Slips',
  },
];

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [selectedDemo, setSelectedDemo] = useState(null);

  const { login } = useAuth();
  const { addToast } = useNotification();
  const navigate = useNavigate();

  const handleSelectDemo = (demo) => {
    setSelectedDemo(demo.role);
    setEmail(demo.email);
    setPassword(demo.pass);
  };

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
    <div className="min-h-screen bg-[#F4F1EA] text-neutral-950 pt-20 sm:pt-24 pb-12 px-3 sm:px-6 flex items-center justify-center relative">
      <SEO
        title="Client & Crew Portal Sign In"
        description="Sign in to your Moonlight Production client portal to view 4K wedding films, proof wedding photo galleries, and access studio management tools."
      />
      <div className="max-w-5xl w-full bg-white border-2 border-neutral-300 rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 relative z-10">
        
        {/* LEFT COLUMN: Modern Luxury Cinematic Showcase Panel (Market Standard for Luxury SaaS & Studios) */}
        <div className="hidden lg:flex lg:col-span-5 bg-gradient-to-br from-neutral-950 via-neutral-900 to-amber-950 p-10 flex-col justify-between relative text-white">
          {/* Background Ambient Poster */}
          <div className="absolute inset-0 z-0 opacity-35">
            <img
              src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80"
              alt="Moonlight Royal Wedding Cinema"
              className="w-full h-full object-cover filter brightness-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-transparent" />
          </div>

          {/* Top Brand Crest */}
          <div className="relative z-10 space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-11 h-11 rounded-full border-2 border-gold-500 flex items-center justify-center bg-white p-0.5 shadow-md">
                <img
                  src="https://ugc.production.linktr.ee/bbcf2874-0602-4cdb-b362-ad612f9fc135_zV3Uuw-tQraxE7KwMApwOHbWTg75v6W5ZJJOyWhXSJBR8O1GMQMZMOQ4CvB8uCMV4mM0SXMK-Q-s800-c-k-c0x00ffffff-no-r.jpeg?io=true&size=avatar-v3_0"
                  alt="Moonlight Production"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <span className="font-serif text-lg font-bold tracking-[0.16em] text-white block">
                  MOONLIGHT
                </span>
                <span className="text-[9px] tracking-[0.25em] text-gold-400 font-mono uppercase font-bold">
                  Production • Cinema House
                </span>
              </div>
            </div>

            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-gold-300 text-[10px] font-mono uppercase font-bold backdrop-blur-md">
              <Award className="w-3.5 h-3.5 text-gold-400" />
              <span>Vogue & WeddingSutra Master Directors</span>
            </div>
          </div>

          {/* Center Quote */}
          <div className="relative z-10 space-y-4 my-auto py-8">
            <blockquote className="font-serif text-xl sm:text-2xl font-bold leading-snug text-neutral-100 italic">
              “Every sacred moment immortalized with royal grandeur, raw emotional depth, and master DaVinci color grading.”
            </blockquote>
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-full bg-gold-gradient text-neutral-950 font-bold flex items-center justify-center text-xs">
                MP
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Moonlight Production Team</h4>
                <p className="text-[10px] text-neutral-400">Bhopal • Maheshwar • Udaipur • Goa</p>
              </div>
            </div>
          </div>

          {/* Bottom Highlights */}
          <div className="relative z-10 pt-4 border-t border-white/15 grid grid-cols-2 gap-4 text-xs font-mono">
            <div>
              <span className="text-[10px] text-neutral-400 uppercase block">Total Coverage</span>
              <span className="font-bold text-gold-300 text-sm">500+ Weddings</span>
            </div>
            <div>
              <span className="text-[10px] text-neutral-400 uppercase block">Film Quality</span>
              <span className="font-bold text-gold-300 text-sm">4K Master Cinema</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Universal Sign In Form Panel */}
        <div className="lg:col-span-7 p-6 sm:p-10 md:p-12 flex flex-col justify-between space-y-6">
          
          {/* Header */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-widest text-amber-900 font-bold">
                SECURE ACCESS
              </span>
              <span className="text-[11px] text-neutral-600 font-mono">2026 Portal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-neutral-950 tracking-tight">
              Sign In to Your Workspace
            </h1>
            <p className="text-neutral-700 text-xs sm:text-sm font-medium">
              Enter your registered credentials. The system will automatically route you to your dedicated dashboard.
            </p>
          </div>

          {/* Fast 1-Click Demo Persona Bar (Instant Switching for Testing / Clients) */}
          <div className="space-y-2 p-3.5 rounded-2xl bg-[#FAF8F5] border-2 border-neutral-300">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-neutral-900 uppercase tracking-wider flex items-center">
                <Sparkles className="w-3.5 h-3.5 text-amber-700 mr-1" />
                Quick-Fill Demo Accounts:
              </span>
              <span className="text-[10px] text-neutral-500 font-mono">1-Click Test</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 pt-1">
              {demoAccounts.map((d) => {
                const IconComponent = d.icon;
                const isSelected = selectedDemo === d.role;
                return (
                  <button
                    key={d.role}
                    type="button"
                    onClick={() => handleSelectDemo(d)}
                    className={`p-2 rounded-xl text-left border transition-all flex flex-col justify-between min-h-[56px] ${
                      isSelected
                        ? 'bg-amber-700 text-white border-amber-800 shadow-md scale-[1.02]'
                        : 'bg-white text-neutral-800 border-neutral-300 hover:border-amber-700 hover:bg-neutral-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <IconComponent className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-amber-800'}`} />
                      <span className={`text-[9px] font-mono font-bold uppercase ${isSelected ? 'text-amber-200' : 'text-neutral-500'}`}>
                        {d.role === 'customer' ? 'Couple' : d.role === 'superadmin' ? 'Admin' : d.role === 'admin' ? 'HR' : 'Team'}
                      </span>
                    </div>
                    <span className="text-[10.5px] font-bold leading-tight line-clamp-1 mt-1">
                      {d.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Clean Sign In Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-neutral-950 font-bold text-xs uppercase tracking-wider block">
                Email Address
              </label>
              <div className="relative">
                <User className="w-5 h-5 text-neutral-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setSelectedDemo(null);
                  }}
                  placeholder="name@domain.com"
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
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setSelectedDemo(null);
                  }}
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

            {/* Remember Me Checkbox */}
            <div className="flex items-center justify-between pt-1 text-xs">
              <label className="flex items-center space-x-2 cursor-pointer select-none text-neutral-800 font-medium">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-neutral-400 text-amber-700 focus:ring-amber-500 cursor-pointer"
                />
                <span>Remember this device</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 mt-2 rounded-xl bg-amber-700 hover:bg-amber-800 active:bg-amber-900 text-white font-bold text-sm tracking-wide shadow-md transition-all flex items-center justify-center disabled:opacity-50"
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Verifying & Routing...</span>
                </div>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4 ml-2 stroke-[2.5]" />
                </>
              )}
            </button>
          </form>

          {/* Footer Self-Service & Hotline */}
          <div className="pt-4 border-t border-neutral-300 space-y-3 text-center text-xs">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-neutral-700">
              <span>New client couple without an ID?</span>
              <Link to="/register" className="text-amber-900 font-bold hover:underline">
                Request Couple Access →
              </Link>
            </div>

            <div className="flex items-center justify-center space-x-1.5 text-neutral-600 font-medium">
              <Phone className="w-3.5 h-3.5 text-amber-800" />
              <span>Studio Hotline:</span>
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
