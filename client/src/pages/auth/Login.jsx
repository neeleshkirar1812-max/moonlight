import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
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
  Phone,
  Layers,
  Zap,
  Fingerprint,
  Mail,
  ChevronRight,
} from 'lucide-react';

const Login = () => {
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('portal') === 'admin' ? 'admin' : 'couple';

  const [activeTab, setActiveTab] = useState(initialTab); // 'couple' | 'admin'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [selectedDemo, setSelectedDemo] = useState(null);

  const { login } = useAuth();
  const { addToast } = useNotification();
  const navigate = useNavigate();

  // Fast Demo Personas for 2026 Seamless One-Click Login Testing
  const demoPersonas = {
    couple: [
      {
        id: 'couple-1',
        title: 'Aarav & Kiara',
        subtitle: 'Royal Imperial Suite (Live RSVP)',
        email: 'aarav.kiara@moonlight.com',
        password: 'Couple@2026',
        badge: '👑 Royal Video Suite',
      },
      {
        id: 'couple-2',
        title: 'Kabir & Meera',
        subtitle: 'Majesty Suite & Photo Vault',
        email: 'kabir.meera@gmail.com',
        password: 'Client@2026',
        badge: '✨ Classic Suite',
      },
    ],
    admin: [
      {
        id: 'admin-super',
        title: 'Tarun Rathore',
        subtitle: 'Founder & Super Admin (Root Access)',
        email: 'nkneeleshkirar@gmail.com',
        password: 'SuperAdmin@2026',
        badge: '🔱 Super Admin',
      },
      {
        id: 'admin-manager',
        title: 'Studio Management',
        subtitle: 'CRM, Bookings & Template Control',
        email: 'admin@moonlightproduction.com',
        password: 'Admin@2026',
        badge: '👑 Studio Admin',
      },
    ],
  };

  const handleSelectDemo = (persona) => {
    setSelectedDemo(persona.id);
    setEmail(persona.email);
    setPassword(persona.password);
  };

  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    if (!email || !password) {
      addToast({
        title: 'Required Details Missing',
        message: 'Please enter your email or username and password.',
        type: 'warning',
      });
      return;
    }

    setLoading(true);
    try {
      const explicitRole = activeTab === 'admin' ? 'admin' : 'customer';
      const loggedUser = await login(email, password, explicitRole);
      
      addToast({
        title: 'Authentication Successful',
        message: `Welcome back, ${loggedUser?.name || 'Guest'}! ✨`,
        type: 'success',
      });

      // Role-Based Intelligent Redirection
      if (activeTab === 'admin') {
        if (loggedUser?.role === 'superadmin') {
          navigate('/super-admin/dashboard');
        } else if (loggedUser?.role === 'employee') {
          navigate('/employee/dashboard');
        } else {
          navigate('/admin/dashboard');
        }
      } else {
        if (loggedUser?.role === 'superadmin') {
          navigate('/super-admin/dashboard');
        } else if (loggedUser?.role === 'admin') {
          navigate('/invitations/admin');
        } else {
          navigate('/invitations/dashboard');
        }
      }
    } catch (err) {
      addToast({
        title: 'Sign In Failed',
        message: err.message || 'Invalid credentials. Please verify your login details.',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0E0A08] text-neutral-100 pt-24 pb-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center font-sans relative selection:bg-amber-500 selection:text-neutral-950 overflow-hidden">
      <SEO
        title="2026 Luxury Portal Access | Moonlight Studio & Digital Suites"
        description="Sign in to your private couple wedding workspace or studio administration panel."
      />

      {/* 2026 Ambient Golden Mesh & Radial Lighting Effects */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-amber-600/15 via-rose-600/10 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-tl from-amber-500/10 via-amber-900/20 to-transparent blur-3xl pointer-events-none" />
      
      {/* Delicate Noise Grain Overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-20 z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E")`,
        }}
      />

      {/* MAIN CONTAINER: 2026 ULTRA-LUXURY GLASS CARD */}
      <div className="max-w-5xl w-full bg-neutral-950/80 backdrop-blur-2xl border border-amber-500/20 rounded-[36px] shadow-[0_30px_90px_-20px_rgba(0,0,0,0.9)] overflow-hidden grid grid-cols-1 lg:grid-cols-12 relative z-10">

        {/* ========================================================================= */}
        {/* LEFT CANVAS: DYNAMIC 2026 PERSONA SHOWCASE */}
        {/* ========================================================================= */}
        <div className="hidden lg:flex lg:col-span-5 bg-gradient-to-b from-[#18110D] via-[#120D0A] to-[#0A0705] p-10 flex-col justify-between relative text-white overflow-hidden border-r border-amber-500/15">
          
          {/* Background Ambient Poster with Smooth Transition */}
          <div className="absolute inset-0 z-0 opacity-40">
            <img
              src={
                activeTab === 'couple'
                  ? 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80'
                  : 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80'
              }
              alt="Moonlight Production Luxury Canvas"
              className="w-full h-full object-cover filter brightness-70 scale-105 transition-all duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0E0A08] via-[#0E0A08]/75 to-transparent" />
          </div>

          {/* Top Brand Crest & 2026 Ecosystem Badge */}
          <div className="relative z-10 space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-2xl border border-amber-400/50 bg-gradient-to-br from-amber-500/20 to-neutral-900 p-1 shadow-lg backdrop-blur-md flex items-center justify-center">
                <Crown className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <span className="font-serif text-lg font-bold tracking-[0.2em] text-white block">
                  MOONLIGHT
                </span>
                <span className="text-[9px] tracking-[0.25em] text-amber-400 font-mono uppercase font-semibold">
                  LUXURY WEDDING ECOSYSTEM
                </span>
              </div>
            </div>

            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[10px] font-mono uppercase font-medium backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>2026 Next-Gen Architecture</span>
            </div>
          </div>

          {/* Center Dynamic Preview Card */}
          <div className="relative z-10 my-auto py-6">
            {activeTab === 'couple' ? (
              /* Couple Workspace Spotlight Widget */
              <div className="p-5 rounded-2xl bg-white/[0.04] border border-amber-400/20 backdrop-blur-xl space-y-3 shadow-xl">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1.5">
                    <Heart className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    LIVE DIGITAL INVITATION
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-[9px] text-emerald-300 font-mono">
                    ● ACTIVE
                  </span>
                </div>
                
                <h3 className="font-serif text-xl text-neutral-100 font-medium">
                  Aarav & Kiara’s Royal Vivah
                </h3>
                
                <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                  <div className="p-2 rounded-xl bg-black/40 border border-white/5">
                    <span className="text-[10px] text-neutral-400 block font-mono">RSVP Received</span>
                    <span className="font-bold text-amber-300 text-sm">184 Guests</span>
                  </div>
                  <div className="p-2 rounded-xl bg-black/40 border border-white/5">
                    <span className="text-[10px] text-neutral-400 block font-mono">Gate Sequence</span>
                    <span className="font-bold text-amber-300 text-sm">4K Video Open</span>
                  </div>
                </div>

                <p className="text-[11px] text-neutral-400 italic">
                  “Real-time guest notifications, instant WhatsApp cards, and private memory vault.”
                </p>
              </div>
            ) : (
              /* Admin Studio Command Spotlight Widget */
              <div className="p-5 rounded-2xl bg-white/[0.04] border border-amber-400/20 backdrop-blur-xl space-y-3 shadow-xl">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-amber-400" />
                    STUDIO COMMAND CENTER
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-[9px] text-amber-300 font-mono">
                    ● EXECUTIVE
                  </span>
                </div>
                
                <h3 className="font-serif text-xl text-neutral-100 font-medium">
                  Moonlight Studio ERP & CRM
                </h3>
                
                <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                  <div className="p-2 rounded-xl bg-black/40 border border-white/5">
                    <span className="text-[10px] text-neutral-400 block font-mono">Live Inquiries</span>
                    <span className="font-bold text-amber-300 text-sm">38 Active</span>
                  </div>
                  <div className="p-2 rounded-xl bg-black/40 border border-white/5">
                    <span className="text-[10px] text-neutral-400 block font-mono">Suites Online</span>
                    <span className="font-bold text-amber-300 text-sm">31 Templates</span>
                  </div>
                </div>

                <p className="text-[11px] text-neutral-400 italic">
                  “Multi-tier role access, booking calendars, invoice generator, and automated client workflows.”
                </p>
              </div>
            )}
          </div>

          {/* Bottom Security & Trust Badges */}
          <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-neutral-400 font-mono">
            <div className="flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>256-Bit SSL Secured</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Fingerprint className="w-4 h-4 text-amber-400" />
              <span>Passkey Ready</span>
            </div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* RIGHT COLUMN: 2026 HIGH-PRECISION AUTHENTICATION FORM */}
        {/* ========================================================================= */}
        <div className="lg:col-span-7 p-6 sm:p-10 md:p-12 flex flex-col justify-between space-y-6 bg-gradient-to-b from-neutral-900/90 to-neutral-950/95">
          
          {/* 1. PORTAL SWITCHER: 2026 SEGMENTED GLASS TABS */}
          <div className="p-1.5 rounded-2xl bg-black/60 border border-white/10 grid grid-cols-2 gap-1.5 shadow-inner">
            <button
              type="button"
              onClick={() => {
                setActiveTab('couple');
                setSelectedDemo(null);
                setEmail('');
                setPassword('');
              }}
              className={`py-3 px-4 rounded-xl text-xs font-bold font-sans transition-all flex items-center justify-center space-x-2 cursor-pointer ${
                activeTab === 'couple'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-950 shadow-lg shadow-amber-500/20'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Heart className={`w-4 h-4 ${activeTab === 'couple' ? 'fill-neutral-950 text-neutral-950' : ''}`} />
              <span>💍 Couple & Client Portal</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('admin');
                setSelectedDemo(null);
                setEmail('');
                setPassword('');
              }}
              className={`py-3 px-4 rounded-xl text-xs font-bold font-sans transition-all flex items-center justify-center space-x-2 cursor-pointer ${
                activeTab === 'admin'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-950 shadow-lg shadow-amber-500/20'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Crown className="w-4 h-4" />
              <span>👑 Studio Administration</span>
            </button>
          </div>

          {/* 2. HEADER: CONTEXTUAL TITLE & PURPOSE */}
          <div className="space-y-1.5 text-left">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-amber-400 font-bold flex items-center">
                <Sparkles className="w-3.5 h-3.5 mr-1.5 text-amber-400" />
                {activeTab === 'couple' ? 'COUPLE SUITE LOGIN' : 'STUDIO EXECUTIVE ACCESS'}
              </span>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/20">
                PRO 2026
              </span>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {activeTab === 'couple'
                ? 'Welcome to Your Couple Workspace'
                : 'Moonlight Studio Administration'}
            </h1>

            <p className="text-neutral-400 text-xs sm:text-sm font-sans">
              {activeTab === 'couple'
                ? 'Sign in to customize your live digital invitation, manage gate videos, and view guest RSVPs.'
                : 'Access studio operations, CRM inquiries, client wedding films, template market, and payroll.'}
            </p>
          </div>

          {/* 3. 1-CLICK FAST PERSONA DEMO PILLS */}
          <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-wider text-amber-300 font-bold flex items-center">
                <Zap className="w-3 h-3 mr-1 text-amber-400 fill-amber-400" />
                1-Click Instant Test Personas:
              </span>
              <span className="text-[9px] text-neutral-500 font-mono">Instant Fill</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {demoPersonas[activeTab].map((persona) => (
                <button
                  key={persona.id}
                  type="button"
                  onClick={() => handleSelectDemo(persona)}
                  className={`p-2.5 rounded-xl border text-left text-xs transition-all flex flex-col justify-between cursor-pointer ${
                    selectedDemo === persona.id
                      ? 'bg-amber-500/20 border-amber-400 text-amber-200'
                      : 'bg-black/40 border-white/10 text-neutral-300 hover:border-amber-500/40 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="font-bold">{persona.title}</span>
                    <span className="text-[9px] font-mono opacity-80">{persona.badge}</span>
                  </div>
                  <span className="text-[10px] text-neutral-400 font-sans mt-0.5 truncate">
                    {persona.subtitle}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* 4. AUTHENTICATION FORM */}
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email / Username Field */}
            <div className="space-y-1.5 text-left">
              <label className="text-neutral-300 font-mono text-xs uppercase tracking-wider block">
                {activeTab === 'couple' ? 'Couple Email or Username' : 'Admin Username or Official Email'}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={
                    activeTab === 'couple'
                      ? 'aarav.kiara@moonlight.com or couple username'
                      : 'nkneeleshkirar@gmail.com or Moonlight'
                  }
                  className="w-full bg-black/50 border border-white/15 rounded-xl pl-10 pr-4 py-3 text-white text-xs sm:text-sm placeholder-neutral-500 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20 transition-all font-sans"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5 text-left">
              <div className="flex items-center justify-between">
                <label className="text-neutral-300 font-mono text-xs uppercase tracking-wider block">
                  Password
                </label>
                <Link to="/forgot-password" className="text-amber-400 font-sans text-xs hover:underline">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your secure password"
                  className="w-full bg-black/50 border border-white/15 rounded-xl pl-10 pr-10 py-3 text-white text-xs sm:text-sm placeholder-neutral-500 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20 transition-all font-sans"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white p-1 cursor-pointer"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Device Trust */}
            <div className="flex items-center justify-between pt-1 text-xs">
              <label className="flex items-center space-x-2 cursor-pointer select-none text-neutral-300">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-white/20 bg-black/40 text-amber-500 focus:ring-amber-400 cursor-pointer"
                />
                <span>Remember this secure workstation</span>
              </label>

              <span className="text-[10px] text-neutral-400 font-mono flex items-center gap-1">
                <Fingerprint className="w-3 h-3 text-amber-400" />
                Biometric Ready
              </span>
            </div>

            {/* Main Action Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:to-amber-600 active:scale-[0.99] text-neutral-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/25 transition-all flex items-center justify-center cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <span className="w-4 h-4 border-2 border-neutral-950 border-t-transparent rounded-full animate-spin" />
                  <span>Verifying Credentials & Initializing...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <span>
                    {activeTab === 'couple'
                      ? 'ACCESS COUPLE WORKSPACE'
                      : 'ACCESS STUDIO ADMINISTRATION'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </button>
          </form>

          {/* 5. FOOTER: ASSISTANCE, REGISTRATION & HOTLINE */}
          <div className="pt-4 border-t border-white/10 space-y-3 text-center text-xs">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-neutral-400">
              <span>Looking to create a new wedding invitation?</span>
              <Link to="/templates" className="text-amber-400 font-bold hover:underline flex items-center gap-1">
                <span>Browse 31 Luxury Suites</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="flex items-center justify-center space-x-2 text-neutral-400 text-xs">
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>Direct VIP Concierge:</span>
              <a href="tel:+919229229323" className="text-amber-400 font-mono font-bold hover:underline">
                +91 92292 29323
              </a>
              <span className="text-neutral-600">•</span>
              <a
                href="https://api.whatsapp.com/send?phone=919229229323&text=Hello%20Moonlight%20Production,%20I%20need%20assistance%20with%20portal%20access."
                target="_blank"
                rel="noreferrer"
                className="text-emerald-400 font-bold hover:underline"
              >
                WhatsApp Chat
              </a>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Login;

