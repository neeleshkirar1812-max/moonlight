import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import WhatsAppFloatingButton from '../components/common/WhatsAppFloatingButton';
import { ToastContainer } from '../components/common/Toast';
import {
  Sparkles,
  LayoutDashboard,
  ShieldCheck,
  ArrowLeft,
  LogIn,
  LogOut,
  ChevronDown,
  Menu,
  X,
  ExternalLink,
  Crown,
  Heart,
} from 'lucide-react';

const InvitationsLayout = () => {
  const { user, isAuthenticated, logout, isAdmin, isSuperAdmin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  useEffect(() => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-neutral-900 flex flex-col selection:bg-amber-200 selection:text-amber-900 font-sans overflow-x-hidden">
      {/* ========================================================================= */}
      {/* 1. ROYAL IVORY & GOLD INVITATIONS HEADER */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-50 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-amber-900/10 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Link to="/invitations" className="flex items-center space-x-2.5 group shrink-0">
              <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-300 flex items-center justify-center text-amber-700 shadow-xs group-hover:border-amber-500 transition-all">
                <Crown className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-base sm:text-lg font-bold tracking-wider text-neutral-900 group-hover:text-amber-800 transition-colors flex items-center space-x-1">
                  <span>MOONLIGHT</span>
                </span>
                <span className="text-[8.5px] tracking-[0.2em] text-amber-800 font-mono uppercase font-semibold">
                  Digital Invitations
                </span>
              </div>
            </Link>
          </div>

          {/* Center Nav Links */}
          <nav className="hidden md:flex items-center space-x-6 text-xs font-semibold uppercase tracking-wider text-neutral-600">
            <Link
              to="/invitations"
              className={`hover:text-amber-900 transition-colors py-1 ${
                location.pathname === '/invitations' ? 'text-amber-900 font-bold border-b-2 border-amber-700' : ''
              }`}
            >
              Home
            </Link>
            <Link
              to="/invitations/templates"
              className={`hover:text-amber-900 transition-colors py-1 ${
                location.pathname.startsWith('/invitations/templates') ? 'text-amber-900 font-bold border-b-2 border-amber-700' : ''
              }`}
            >
              Templates
            </Link>
            <a href="/invitations#features" className="hover:text-amber-900 transition-colors py-1">
              Features
            </a>
            <a href="/invitations#pricing" className="hover:text-amber-900 transition-colors py-1">
              Pricing
            </a>
            <Link
              to="/invitations/dashboard"
              className={`hover:text-amber-900 transition-colors py-1 ${
                location.pathname.startsWith('/invitations/dashboard') ? 'text-amber-900 font-bold border-b-2 border-amber-700' : ''
              }`}
            >
              My Invitations
            </Link>
            {(isAdmin || isSuperAdmin) && (
              <Link
                to="/invitations/admin"
                className="text-amber-800 hover:text-amber-950 font-bold flex items-center space-x-1 py-1"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                <span>Admin</span>
              </Link>
            )}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center space-x-3 shrink-0">
            {/* Main Studio Website Link */}
            <Link
              to="/"
              className="text-xs text-neutral-600 hover:text-neutral-900 px-2.5 py-1.5 rounded-lg hover:bg-neutral-100 transition-all font-mono flex items-center space-x-1"
              title="Return to Moonlight Photography Studio"
            >
              <ArrowLeft className="w-3 h-3 text-amber-700" />
              <span>Studio</span>
            </Link>

            {/* Auth / Account */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white border border-neutral-300 text-neutral-900 hover:border-amber-600 transition-all text-xs shadow-xs"
                >
                  <div className="w-5 h-5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-neutral-950 flex items-center justify-center font-bold text-[10px]">
                    {user?.name?.charAt(0) || 'U'}
                  </div>
                  <span className="font-semibold max-w-[90px] truncate">{user?.name}</span>
                  <ChevronDown className="w-3 h-3 text-neutral-500" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white border border-neutral-200 rounded-xl shadow-xl py-2 z-50 text-xs animate-fade-in font-sans text-neutral-800">
                    <div className="px-3.5 py-2 border-b border-neutral-100 text-[11px] text-neutral-500 font-mono">
                      Signed in as: <strong className="text-amber-900 block truncate">{user?.email}</strong>
                    </div>
                    <Link
                      to="/invitations/dashboard"
                      className="flex items-center px-3.5 py-2 hover:bg-amber-50 hover:text-amber-900 font-medium"
                    >
                      <LayoutDashboard className="w-3.5 h-3.5 mr-2 text-amber-600" />
                      My Invitations
                    </Link>
                    {(isAdmin || isSuperAdmin) && (
                      <Link
                        to="/invitations/admin"
                        className="flex items-center px-3.5 py-2 hover:bg-amber-50 hover:text-amber-900 font-medium"
                      >
                        <ShieldCheck className="w-3.5 h-3.5 mr-2 text-amber-600" />
                        Admin Control Center
                      </Link>
                    )}
                    <button
                      onClick={logout}
                      className="w-full flex items-center px-3.5 py-2 text-rose-600 hover:bg-rose-50 text-left font-medium"
                    >
                      <LogOut className="w-3.5 h-3.5 mr-2" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/invitations/login"
                className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-neutral-800 hover:text-amber-900 hover:bg-amber-50 transition-all border border-neutral-300"
              >
                Login
              </Link>
            )}

            {/* Primary Get Started Button */}
            <Link
              to="/invitations/templates"
              className="px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-neutral-950 font-bold text-xs uppercase tracking-wider transition-all shadow-xs flex items-center space-x-1.5"
            >
              <span>Get Started</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-2 md:hidden">
            <Link
              to="/invitations/templates"
              className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-neutral-950 font-bold text-xs shadow-xs"
            >
              Get Started
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg bg-white text-neutral-800 border border-neutral-300"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-amber-700" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#FAF8F5] border-b border-amber-900/10 px-4 py-4 space-y-3 animate-fade-in text-neutral-800 shadow-lg">
            <div className="space-y-1.5 text-xs font-semibold">
              <Link to="/invitations" className="block py-2 px-2 hover:bg-amber-50 rounded-lg">
                Home
              </Link>
              <Link to="/invitations/templates" className="block py-2 px-2 text-amber-900 font-bold bg-amber-100/60 rounded-lg">
                Templates Catalog
              </Link>
              <a href="/invitations#features" className="block py-2 px-2 hover:bg-amber-50 rounded-lg">
                Features
              </a>
              <a href="/invitations#pricing" className="block py-2 px-2 hover:bg-amber-50 rounded-lg">
                Pricing
              </a>
              <Link to="/invitations/dashboard" className="block py-2 px-2 hover:bg-amber-50 rounded-lg">
                My Invitations
              </Link>
              {(isAdmin || isSuperAdmin) && (
                <Link to="/invitations/admin" className="block py-2 px-2 text-amber-900 font-bold hover:bg-amber-50 rounded-lg">
                  Admin Control Center
                </Link>
              )}
            </div>

            <div className="pt-3 border-t border-neutral-200 flex flex-col space-y-2">
              <Link to="/" className="text-xs text-neutral-600 hover:text-neutral-900 flex items-center space-x-1 py-1">
                <ArrowLeft className="w-3.5 h-3.5 text-amber-700" />
                <span>Return to Photography Studio</span>
              </Link>
              {isAuthenticated ? (
                <button
                  onClick={logout}
                  className="w-full py-2 text-xs font-semibold text-rose-700 bg-rose-50 rounded-xl border border-rose-200 text-center"
                >
                  Sign Out ({user?.name})
                </button>
              ) : (
                <Link
                  to="/invitations/login"
                  className="w-full py-2 text-xs font-semibold text-center bg-white text-neutral-900 rounded-xl border border-neutral-300"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </header>

      {/* ========================================================================= */}
      {/* 2. MAIN CONTENT */}
      {/* ========================================================================= */}
      <main className="flex-grow w-full max-w-full overflow-x-hidden min-w-0 bg-[#FAF8F5]">
        <Outlet />
      </main>

      {/* ========================================================================= */}
      {/* 3. ROYAL IVORY & GOLD FOOTER */}
      {/* ========================================================================= */}
      <footer className="bg-[#F2ECE4] border-t border-amber-900/15 text-neutral-700 text-xs py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3">
              <span className="font-serif text-base font-bold text-neutral-900 tracking-wider block">
                MOONLIGHT <span className="text-amber-800 font-normal italic">Invitations</span>
              </span>
              <p className="text-neutral-600 text-xs leading-relaxed">
                Premium digital invitations for all events. 3D animated door reveals, interactive touch scratch cards, instant WhatsApp sharing, and real-time RSVP guest management.
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-neutral-900 font-bold uppercase tracking-wider text-[11px] font-mono block text-amber-900">
                Occasions
              </span>
              <ul className="space-y-1.5 text-xs text-neutral-600">
                <li><Link to="/invitations/templates" className="hover:text-amber-900 transition-colors">Wedding Invitations</Link></li>
                <li><Link to="/invitations/templates" className="hover:text-amber-900 transition-colors">Engagement & Ring Ceremony</Link></li>
                <li><Link to="/invitations/templates" className="hover:text-amber-900 transition-colors">Birthday Celebrations</Link></li>
                <li><Link to="/invitations/templates" className="hover:text-amber-900 transition-colors">Housewarming & Parties</Link></li>
              </ul>
            </div>

            <div className="space-y-2">
              <span className="text-neutral-900 font-bold uppercase tracking-wider text-[11px] font-mono block text-amber-900">
                Signature Features
              </span>
              <ul className="space-y-1.5 text-xs text-neutral-600">
                <li>✦ 3D Palace Door Opening Animation</li>
                <li>✦ Interactive Touch Scratch Card</li>
                <li>✦ Live RSVP & Guest Count Tracker</li>
                <li>✦ 1-Tap Google Maps Navigation</li>
              </ul>
            </div>

            <div className="space-y-2">
              <span className="text-neutral-900 font-bold uppercase tracking-wider text-[11px] font-mono block text-amber-900">
                Studio Hub
              </span>
              <p className="text-xs leading-relaxed text-neutral-600">
                152 Shamla Hills, Bhopal, MP<br />
                WhatsApp: +91 92292 29323
              </p>
              <Link to="/" className="inline-flex items-center space-x-1 text-amber-800 hover:text-amber-950 font-bold text-xs pt-1">
                <span>Moonlight Photography Studio</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>

          <div className="pt-6 border-t border-amber-900/10 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-2">
            <span>© {new Date().getFullYear()} Moonlight Production • Crafted with luxury for grand celebrations.</span>
            <div className="flex space-x-4">
              <Link to="/privacy" className="hover:text-neutral-900">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-neutral-900">Terms of Service</Link>
              <Link to="/invitations/admin" className="text-amber-800 font-semibold hover:underline">Admin</Link>
            </div>
          </div>
        </div>
      </footer>

      <WhatsAppFloatingButton />
      <ToastContainer />
    </div>
  );
};

export default InvitationsLayout;
