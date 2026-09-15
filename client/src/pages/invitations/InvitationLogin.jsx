import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import SEO from '../../components/common/SEO';
import {
  Sparkles,
  Heart,
  Lock,
  Mail,
  ArrowRight,
  Eye,
  EyeOff,
  Crown,
  Zap,
  ShieldCheck,
  Fingerprint,
  Phone,
  ChevronRight,
  Layers,
} from 'lucide-react';

const InvitationLogin = () => {
  const [searchParams] = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '/invitations/dashboard';
  const initialPortal = searchParams.get('portal') === 'admin' ? 'admin' : 'couple';

  const [activeTab, setActiveTab] = useState(initialPortal);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [selectedDemo, setSelectedDemo] = useState(null);

  const { login } = useAuth();
  const { addToast } = useNotification();
  const navigate = useNavigate();

  const demoPersonas = {
    couple: [
      {
        id: 'couple-1',
        title: 'Aarav & Kiara',
        subtitle: 'Royal Imperial Suite (Live RSVP)',
        email: 'aarav.kiara@moonlight.com',
        password: 'Couple@2026',
        badge: '👑 Royal Suite',
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
        subtitle: 'Invitations ERP & Guest Lists',
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

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!email) {
      addToast({ title: 'Email required', message: 'Please enter your email or username', type: 'error' });
      return;
    }

    setLoading(true);
    try {
      localStorage.setItem('moonlight_customer_email', email.trim());
      const explicitRole = activeTab === 'admin' ? 'admin' : 'customer';
      let loggedUser = null;
      if (login) {
        loggedUser = await login(email.trim(), password || (activeTab === 'admin' ? 'SuperAdmin@2026' : 'Couple@2026'), explicitRole);
      }
      addToast({
        title: 'Welcome Back! ✨',
        message: `Opening your ${activeTab === 'admin' ? 'Administration Panel' : 'Couple Workspace'}...`,
        type: 'success',
      });

      if (activeTab === 'admin') {
        if (loggedUser?.role === 'superadmin') {
          navigate('/super-admin/dashboard');
        } else {
          navigate('/invitations/admin');
        }
      } else {
        navigate(redirectUrl);
      }
    } catch (err) {
      localStorage.setItem('moonlight_customer_email', email.trim());
      if (activeTab === 'admin') {
        navigate('/invitations/admin');
      } else {
        navigate(redirectUrl);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0E0A08] text-neutral-100 pt-28 pb-16 px-4 sm:px-6 flex items-center justify-center font-sans relative selection:bg-amber-500 selection:text-neutral-950 overflow-hidden">
      <SEO
        title="2026 Digital Invitations Portal | Moonlight Luxury Suites"
        description="Access your luxury digital wedding invitation dashboard to edit details, customize scratch card messages, and monitor live guest RSVPs."
      />

      {/* 2026 Ambient Radial Backlights */}
      <div className="absolute top-10 left-1/3 w-96 h-96 rounded-full bg-amber-600/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/3 w-96 h-96 rounded-full bg-rose-600/10 blur-3xl pointer-events-none" />

      {/* Noise Texture */}
      <div
        className="fixed inset-0 pointer-events-none opacity-20 z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Main Glassmorphism Card */}
      <div className="w-full max-w-lg bg-neutral-950/85 backdrop-blur-2xl rounded-[36px] border border-amber-500/20 shadow-[0_30px_90px_-20px_rgba(0,0,0,0.9)] p-7 sm:p-10 space-y-6 relative z-10">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl border border-amber-400/50 bg-gradient-to-br from-amber-500/20 to-neutral-900 p-1 flex items-center justify-center mx-auto shadow-lg backdrop-blur-md">
            {activeTab === 'couple' ? (
              <Heart className="w-7 h-7 text-amber-400 fill-amber-400/20" />
            ) : (
              <Crown className="w-7 h-7 text-amber-400" />
            )}
          </div>

          <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-amber-400 font-bold block">
            MOONLIGHT LUXURY SUITES • 2026
          </span>

          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
            {activeTab === 'couple' ? 'Couple Invitation Portal' : 'Invitation Admin Engine'}
          </h1>

          <p className="text-xs sm:text-sm text-neutral-400 font-sans">
            {activeTab === 'couple'
              ? 'Sign in to customize door opening videos, edit ceremony schedules & track live guest RSVPs.'
              : 'Admin access for manual suite generation, client template management & guest database exports.'}
          </p>
        </div>

        {/* 2026 Segmented Dual Persona Switcher */}
        <div className="p-1 rounded-2xl bg-black/60 border border-white/10 grid grid-cols-2 gap-1 shadow-inner">
          <button
            type="button"
            onClick={() => {
              setActiveTab('couple');
              setSelectedDemo(null);
              setEmail('');
              setPassword('');
            }}
            className={`py-2.5 px-3 rounded-xl text-xs font-bold font-sans transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
              activeTab === 'couple'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-950 shadow-md'
                : 'text-neutral-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${activeTab === 'couple' ? 'fill-neutral-950 text-neutral-950' : ''}`} />
            <span>💍 Couple Portal</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('admin');
              setSelectedDemo(null);
              setEmail('');
              setPassword('');
            }}
            className={`py-2.5 px-3 rounded-xl text-xs font-bold font-sans transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
              activeTab === 'admin'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-950 shadow-md'
                : 'text-neutral-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Crown className="w-3.5 h-3.5" />
            <span>👑 Admin Portal</span>
          </button>
        </div>

        {/* 1-Click Fast Persona Fillers */}
        <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider text-amber-300 font-bold flex items-center">
              <Zap className="w-3 h-3 mr-1 text-amber-400 fill-amber-400" />
              1-Click Fast Persona Demo:
            </span>
            <span className="text-[9px] text-neutral-500 font-mono">Test Fill</span>
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

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5 text-left">
            <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300">
              {activeTab === 'couple' ? 'Couple Email or Username' : 'Admin Email or Username'}
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={
                  activeTab === 'couple' ? 'aarav.kiara@moonlight.com' : 'nkneeleshkirar@gmail.com'
                }
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/50 border border-white/15 text-white text-xs sm:text-sm placeholder-neutral-500 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20 transition-all font-sans"
              />
            </div>
          </div>

          <div className="space-y-1.5 text-left">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300">
                Password
              </label>
              <Link to="/forgot-password" className="text-amber-400 font-sans text-xs hover:underline">
                Forgot?
              </Link>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password (optional for demo)"
                className="w-full pl-10 pr-10 py-3 rounded-xl bg-black/50 border border-white/15 text-white text-xs sm:text-sm placeholder-neutral-500 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20 transition-all font-sans"
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

          {/* Remember Me */}
          <div className="flex items-center justify-between pt-1 text-xs">
            <label className="flex items-center space-x-2 cursor-pointer select-none text-neutral-300">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-white/20 bg-black/40 text-amber-500 focus:ring-amber-400 cursor-pointer"
              />
              <span>Keep session active</span>
            </label>

            <span className="text-[10px] text-neutral-400 font-mono flex items-center gap-1">
              <Fingerprint className="w-3 h-3 text-amber-400" />
              Passkey Ready
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:to-amber-600 active:scale-[0.99] text-neutral-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/25 transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <div className="w-4 h-4 rounded-full border-2 border-neutral-950 border-t-transparent animate-spin" />
            ) : (
              <>
                <span>
                  {activeTab === 'couple' ? 'ACCESS INVITATION DASHBOARD' : 'ACCESS ADMIN DASHBOARD'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="pt-4 border-t border-white/10 text-center space-y-3">
          <p className="text-xs text-neutral-400">
            Don't have a digital invitation yet?{' '}
            <Link
              to="/invitations/templates"
              className="text-amber-400 font-bold hover:underline"
            >
              Browse 31 Luxury Suites →
            </Link>
          </p>

          <div className="flex items-center justify-center space-x-2 text-[11px] text-neutral-400">
            <Phone className="w-3.5 h-3.5 text-amber-400" />
            <span>VIP Hotline:</span>
            <a href="tel:+919229229323" className="text-amber-400 font-mono font-bold hover:underline">
              +91 92292 29323
            </a>
          </div>

          <div className="text-center pt-1">
            <Link
              to="/invitations"
              className="text-[11px] text-neutral-500 hover:text-neutral-300 inline-flex items-center font-medium"
            >
              ← Back to Digital Invitations
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvitationLogin;
