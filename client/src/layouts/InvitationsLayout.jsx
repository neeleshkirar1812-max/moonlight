import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import WhatsAppFloatingButton from '../components/common/WhatsAppFloatingButton';
import { ToastContainer } from '../components/common/Toast';
import {
  Sparkles,
  LayoutDashboard,
  Layers,
  PlusCircle,
  ShieldCheck,
  ArrowLeft,
  LogIn,
  LogOut,
  ChevronDown,
  Menu,
  X,
  Heart,
  ExternalLink,
  Crown,
} from 'lucide-react';

const InvitationsLayout = () => {
  const { user, isAuthenticated, logout, isAdmin, isSuperAdmin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Overview', path: '/invitations' },
    { label: 'Templates Catalog', path: '/invitations/templates' },
    { label: 'My Invitations', path: '/invitations/dashboard' },
  ];

  if (isAdmin || isSuperAdmin) {
    navLinks.push({ label: 'Admin Control Center', path: '/invitations/admin', highlight: true });
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-neutral-900 flex flex-col selection:bg-amber-400 selection:text-neutral-950 font-sans overflow-x-hidden">
      {/* ========================================================================= */}
      {/* 1. DEDICATED MOONLIGHT DIGITAL INVITATIONS TOP NAVIGATION */}
      {/* ========================================================================= */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#150D08]/95 backdrop-blur-xl border-b border-amber-500/20 py-2.5 shadow-xl text-white'
            : 'bg-[#1A100A]/90 backdrop-blur-md border-b border-amber-500/20 py-3 text-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo & Tag */}
          <div className="flex items-center space-x-3">
            <Link to="/invitations" className="flex items-center space-x-2.5 group shrink-0">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-amber-400 via-amber-600 to-amber-700 p-0.5 shadow-md flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-[#120904] flex items-center justify-center">
                  <Crown className="w-4 h-4 text-amber-400" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-sm sm:text-base font-bold tracking-[0.14em] text-white group-hover:text-amber-300 transition-colors flex items-center space-x-1.5">
                  <span>MOONLIGHT</span>
                  <span className="text-amber-400 font-normal">INVITATIONS</span>
                </span>
                <span className="text-[7px] sm:text-[7.5px] tracking-[0.2em] text-amber-300/80 font-mono uppercase font-bold">
                  Royal Digital Suites • RSVP Engine
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links Capsule */}
          <nav className="hidden lg:flex items-center bg-white/5 border border-white/10 rounded-full p-1 space-x-1 shadow-inner">
            {navLinks.map((item) => {
              const active =
                item.path === '/invitations'
                  ? location.pathname === '/invitations'
                  : location.pathname.startsWith(item.path);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-[11px] uppercase tracking-wider font-semibold transition-all py-1.5 px-3.5 rounded-full flex items-center space-x-1.5 ${
                    active
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-950 font-extrabold shadow'
                      : item.highlight
                      ? 'text-amber-300 hover:text-white hover:bg-white/10 font-bold'
                      : 'text-neutral-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {item.highlight && <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />}
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center space-x-3 shrink-0">
            {/* Back to Photography Studio */}
            <Link
              to="/"
              className="text-[11px] text-amber-200/70 hover:text-amber-300 flex items-center space-x-1 transition-all font-mono"
              title="Return to Moonlight Photography Studio"
            >
              <ArrowLeft className="w-3 h-3" />
              <span>Photography Studio</span>
            </Link>

            {/* Create Invitation CTA */}
            <Link
              to="/invitations/templates"
              className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold text-xs uppercase tracking-wider shadow-md hover:scale-105 active:scale-95 transition-all flex items-center space-x-1.5 border border-amber-200"
            >
              <Sparkles className="w-3 h-3" />
              <span>Browse Designs</span>
            </Link>

            {/* User Account / Profile */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-white hover:bg-white/20 transition-all text-xs"
                >
                  <div className="w-5 h-5 rounded-full bg-amber-500 text-black flex items-center justify-center font-bold text-[10px]">
                    {user?.name?.charAt(0) || 'U'}
                  </div>
                  <span className="font-semibold max-w-[100px] truncate">{user?.name}</span>
                  <ChevronDown className="w-3 h-3 text-amber-400" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-[#1A100A] border border-amber-500/30 rounded-2xl shadow-2xl py-2 z-50 text-xs animate-fade-in font-sans text-neutral-200">
                    <div className="px-3.5 py-2 border-b border-white/10 text-[11px] text-neutral-400 font-mono">
                      Signed in as: <strong className="text-amber-300 block">{user?.email}</strong>
                    </div>
                    <Link
                      to="/invitations/dashboard"
                      className="flex items-center px-3.5 py-2 hover:bg-white/10 hover:text-amber-300 font-medium"
                    >
                      <LayoutDashboard className="w-3.5 h-3.5 mr-2 text-amber-400" />
                      My Invitations Portal
                    </Link>
                    {(isAdmin || isSuperAdmin) && (
                      <Link
                        to="/invitations/admin"
                        className="flex items-center px-3.5 py-2 hover:bg-white/10 hover:text-amber-300 font-medium"
                      >
                        <ShieldCheck className="w-3.5 h-3.5 mr-2 text-amber-400" />
                        Admin Control Center
                      </Link>
                    )}
                    <button
                      onClick={logout}
                      className="w-full flex items-center px-3.5 py-2 text-red-400 hover:bg-red-950/40 text-left font-medium"
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
                className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center"
              >
                <LogIn className="w-3.5 h-3.5 mr-1.5 text-amber-400" />
                <span>Client Login</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center space-x-2 lg:hidden">
            <Link
              to="/invitations/templates"
              className="px-3 py-1 rounded-full bg-amber-500 text-neutral-950 font-bold text-[11px] uppercase tracking-wider shadow flex items-center space-x-1"
            >
              <Sparkles className="w-3 h-3" />
              <span>Explore</span>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-white/10 text-white hover:bg-white/20"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-amber-400" /> : <Menu className="w-5 h-5 text-amber-400" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#140B06] border-b border-amber-500/20 px-4 py-4 space-y-3 animate-fade-in text-neutral-200">
            <div className="space-y-1">
              <Link
                to="/invitations"
                className="flex items-center text-sm font-semibold hover:text-amber-300 py-2 border-b border-white/5"
              >
                ✨ Overview & Features
              </Link>
              <Link
                to="/invitations/templates"
                className="flex items-center text-sm font-semibold hover:text-amber-300 py-2 border-b border-white/5"
              >
                💎 Template Catalog & Designs
              </Link>
              <Link
                to="/invitations/dashboard"
                className="flex items-center text-sm font-semibold hover:text-amber-300 py-2 border-b border-white/5"
              >
                💌 My Invitations Dashboard
              </Link>
              {(isAdmin || isSuperAdmin) && (
                <Link
                  to="/invitations/admin"
                  className="flex items-center text-sm font-bold text-amber-400 py-2 border-b border-white/5"
                >
                  🛡️ Admin Control Center
                </Link>
              )}
            </div>

            <div className="pt-2 flex flex-col space-y-2">
              <Link
                to="/"
                className="text-xs text-neutral-400 hover:text-white flex items-center space-x-1 py-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Main Photography Studio Website</span>
              </Link>
              {isAuthenticated ? (
                <button
                  onClick={logout}
                  className="w-full py-2 text-xs font-bold text-red-400 bg-red-950/30 rounded-xl flex items-center justify-center space-x-1"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out ({user?.name})</span>
                </button>
              ) : (
                <Link
                  to="/invitations/login"
                  className="w-full py-2.5 text-xs font-bold text-center uppercase tracking-wider bg-white/10 text-white rounded-xl border border-white/20"
                >
                  Client Sign In
                </Link>
              )}
            </div>
          </div>
        )}
      </header>

      {/* ========================================================================= */}
      {/* 2. DEDICATED MAIN CONTENT AREA */}
      {/* ========================================================================= */}
      <main className="flex-grow w-full max-w-full overflow-x-hidden min-w-0">
        <Outlet />
      </main>

      {/* ========================================================================= */}
      {/* 3. DEDICATED MOONLIGHT DIGITAL INVITATIONS FOOTER */}
      {/* ========================================================================= */}
      <footer className="bg-[#120803] border-t border-amber-500/20 text-neutral-400 text-xs font-sans py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Col 1: Brand */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-full bg-amber-500 flex items-center justify-center text-black font-bold font-serif text-xs">
                  M
                </div>
                <span className="font-serif text-base font-bold text-white tracking-wider">
                  MOONLIGHT <span className="text-amber-400">INVITATIONS</span>
                </span>
              </div>
              <p className="text-neutral-400 leading-relaxed text-[11px]">
                India's premier digital wedding invitation studio. Bespoke 3D palace door opening suites, live RSVP tracking, and instant WhatsApp distribution.
              </p>
              <div className="text-[10px] text-amber-300 font-mono">
                A Division of Moonlight Production
              </div>
            </div>

            {/* Col 2: Invitation Suites */}
            <div className="space-y-2">
              <span className="font-serif text-xs font-bold text-white uppercase tracking-widest block">
                Invitation Suites
              </span>
              <ul className="space-y-1.5 text-[11px]">
                <li>
                  <Link to="/invitations/templates" className="hover:text-amber-300 transition-colors">
                    Royal Rajwada Palace Suite
                  </Link>
                </li>
                <li>
                  <Link to="/invitations/templates" className="hover:text-amber-300 transition-colors">
                    Pastel Floral Symphony
                  </Link>
                </li>
                <li>
                  <Link to="/invitations/templates" className="hover:text-amber-300 transition-colors">
                    Golden Udaipur Elegance
                  </Link>
                </li>
                <li>
                  <Link to="/invitations/templates" className="hover:text-amber-300 transition-colors">
                    South Indian Temple Serenade
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 3: Features */}
            <div className="space-y-2">
              <span className="font-serif text-xs font-bold text-white uppercase tracking-widest block">
                Key Features
              </span>
              <ul className="space-y-1.5 text-[11px]">
                <li>✦ 3D Palace Doors Entrance</li>
                <li>✦ Interactive Touch Scratch Card</li>
                <li>✦ Live Online RSVP & WhatsApp Sync</li>
                <li>✦ 1-Tap Google Maps Navigation</li>
                <li>✦ Background Shehnai & Sitar Music</li>
              </ul>
            </div>

            {/* Col 4: Studio Hub */}
            <div className="space-y-2">
              <span className="font-serif text-xs font-bold text-white uppercase tracking-widest block">
                Moonlight Studio
              </span>
              <p className="text-[11px] text-neutral-400 leading-relaxed">
                152 Shamla Hills, Bhopal, MP<br />
                WhatsApp: +91 92292 29323<br />
                Instagram: @moonlight_production__
              </p>
              <Link
                to="/"
                className="inline-flex items-center space-x-1 text-amber-400 hover:text-amber-300 text-[11px] font-bold"
              >
                <span>Visit Main Photography Website</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-500 gap-3">
            <span>© {new Date().getFullYear()} Moonlight Production. All rights reserved.</span>
            <div className="flex space-x-4">
              <Link to="/privacy" className="hover:text-neutral-300">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-neutral-300">Terms of Service</Link>
              <Link to="/invitations/admin" className="hover:text-amber-400">Admin Control</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Buttons & Toasts */}
      <WhatsAppFloatingButton />
      <ToastContainer />
    </div>
  );
};

export default InvitationsLayout;
