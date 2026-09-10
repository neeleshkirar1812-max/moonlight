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
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col selection:bg-[#d4af37] selection:text-black font-sans overflow-x-hidden">
      {/* ========================================================================= */}
      {/* 1. SLEEK DARK & GOLD INVITATIONS HEADER */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-[#27272a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Link to="/invitations" className="flex items-center space-x-2.5 group shrink-0">
              <div className="w-8 h-8 rounded-lg bg-[#141414] border border-[#d4af37]/60 flex items-center justify-center text-[#d4af37] shadow-sm group-hover:border-[#d4af37] transition-all">
                <Crown className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-base sm:text-lg font-bold tracking-wider text-white group-hover:text-[#d4af37] transition-colors flex items-center space-x-1">
                  <span>MOONLIGHT</span>
                </span>
                <span className="text-[8px] tracking-[0.2em] text-[#a1a1aa] font-mono uppercase">
                  Digital Invitations
                </span>
              </div>
            </Link>
          </div>

          {/* Center Nav Links */}
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-[#a1a1aa]">
            <Link to="/invitations" className={`hover:text-white transition-colors ${location.pathname === '/invitations' ? 'text-white font-semibold' : ''}`}>
              Home
            </Link>
            <Link to="/invitations/templates" className={`hover:text-white transition-colors ${location.pathname.startsWith('/invitations/templates') ? 'text-[#d4af37] font-semibold' : ''}`}>
              Templates
            </Link>
            <a href="/invitations#features" className="hover:text-white transition-colors">
              Features
            </a>
            <a href="/invitations#pricing" className="hover:text-white transition-colors">
              Pricing
            </a>
            <Link to="/invitations/dashboard" className={`hover:text-white transition-colors ${location.pathname.startsWith('/invitations/dashboard') ? 'text-[#d4af37] font-semibold' : ''}`}>
              My Invitations
            </Link>
            {(isAdmin || isSuperAdmin) && (
              <Link to="/invitations/admin" className="text-[#d4af37] hover:text-[#f3cf5b] font-semibold flex items-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Admin</span>
              </Link>
            )}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center space-x-3 shrink-0">
            {/* Main Studio Website Link */}
            <Link
              to="/"
              className="text-xs text-[#a1a1aa] hover:text-white px-2.5 py-1.5 rounded-md hover:bg-[#141414] transition-all font-mono flex items-center space-x-1"
              title="Return to Moonlight Photography Studio"
            >
              <ArrowLeft className="w-3 h-3" />
              <span>Studio</span>
            </Link>

            {/* Auth / Account */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center space-x-2 px-3 py-1.5 rounded-md bg-[#141414] border border-[#27272a] text-white hover:border-[#d4af37] transition-all text-xs"
                >
                  <div className="w-5 h-5 rounded-full bg-[#d4af37] text-black flex items-center justify-center font-bold text-[10px]">
                    {user?.name?.charAt(0) || 'U'}
                  </div>
                  <span className="font-semibold max-w-[90px] truncate">{user?.name}</span>
                  <ChevronDown className="w-3 h-3 text-[#a1a1aa]" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-[#141414] border border-[#27272a] rounded-xl shadow-2xl py-2 z-50 text-xs animate-fade-in font-sans text-neutral-200">
                    <div className="px-3.5 py-2 border-b border-[#27272a] text-[11px] text-[#a1a1aa] font-mono">
                      Signed in as: <strong className="text-[#d4af37] block truncate">{user?.email}</strong>
                    </div>
                    <Link
                      to="/invitations/dashboard"
                      className="flex items-center px-3.5 py-2 hover:bg-[#27272a] hover:text-[#d4af37] font-medium"
                    >
                      <LayoutDashboard className="w-3.5 h-3.5 mr-2 text-[#d4af37]" />
                      My Invitations
                    </Link>
                    {(isAdmin || isSuperAdmin) && (
                      <Link
                        to="/invitations/admin"
                        className="flex items-center px-3.5 py-2 hover:bg-[#27272a] hover:text-[#d4af37] font-medium"
                      >
                        <ShieldCheck className="w-3.5 h-3.5 mr-2 text-[#d4af37]" />
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
                className="px-3.5 py-1.5 rounded-md text-xs font-medium text-white hover:bg-white/10 transition-all"
              >
                Login
              </Link>
            )}

            {/* Primary Get Started Button */}
            <Link
              to="/invitations/templates"
              className="px-4 py-2 rounded-md bg-[#d4af37] hover:bg-[#f3cf5b] text-black font-semibold text-xs transition-all shadow-md flex items-center space-x-1.5"
            >
              <span>Get Started</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-2 md:hidden">
            <Link
              to="/invitations/templates"
              className="px-3 py-1.5 rounded-md bg-[#d4af37] text-black font-semibold text-xs"
            >
              Get Started
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-[#141414] text-white border border-[#27272a]"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#d4af37]" /> : <Menu className="w-5 h-5 text-[#d4af37]" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0a0a0a] border-b border-[#27272a] px-4 py-4 space-y-3 animate-fade-in text-neutral-300">
            <div className="space-y-2">
              <Link to="/invitations" className="block text-sm py-1 hover:text-white">
                Home
              </Link>
              <Link to="/invitations/templates" className="block text-sm py-1 hover:text-[#d4af37] text-[#d4af37] font-semibold">
                Templates Catalog
              </Link>
              <a href="/invitations#features" className="block text-sm py-1 hover:text-white">
                Features
              </a>
              <a href="/invitations#pricing" className="block text-sm py-1 hover:text-white">
                Pricing
              </a>
              <Link to="/invitations/dashboard" className="block text-sm py-1 hover:text-white">
                My Invitations
              </Link>
              {(isAdmin || isSuperAdmin) && (
                <Link to="/invitations/admin" className="block text-sm py-1 text-[#d4af37] font-semibold">
                  Admin Control Center
                </Link>
              )}
            </div>

            <div className="pt-3 border-t border-[#27272a] flex flex-col space-y-2">
              <Link to="/" className="text-xs text-[#a1a1aa] hover:text-white flex items-center space-x-1 py-1">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Photography Studio</span>
              </Link>
              {isAuthenticated ? (
                <button
                  onClick={logout}
                  className="w-full py-2 text-xs font-semibold text-red-400 bg-red-950/20 rounded-md border border-red-900/30 text-center"
                >
                  Sign Out ({user?.name})
                </button>
              ) : (
                <Link
                  to="/invitations/login"
                  className="w-full py-2 text-xs font-semibold text-center bg-[#141414] text-white rounded-md border border-[#27272a]"
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
      <main className="flex-grow w-full max-w-full overflow-x-hidden min-w-0 bg-[#0a0a0a]">
        <Outlet />
      </main>

      {/* ========================================================================= */}
      {/* 3. SLEEK FOOTER */}
      {/* ========================================================================= */}
      <footer className="bg-[#0a0a0a] border-t border-[#27272a] text-[#a1a1aa] text-xs py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3">
              <span className="font-serif text-base font-bold text-white tracking-wider block">
                MOONLIGHT <span className="text-[#d4af37]">INVITATIONS</span>
              </span>
              <p className="text-[#a1a1aa] text-xs leading-relaxed">
                Premium digital invitations for all events. 3D animated reveals, interactive scratch cards, instant WhatsApp sharing, and live RSVP tracking.
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-white font-semibold block">Occasions</span>
              <ul className="space-y-1.5 text-xs">
                <li><Link to="/invitations/templates" className="hover:text-[#d4af37]">Wedding Invitations</Link></li>
                <li><Link to="/invitations/templates" className="hover:text-[#d4af37]">Engagement & Ring Ceremony</Link></li>
                <li><Link to="/invitations/templates" className="hover:text-[#d4af37]">Birthday Celebrations</Link></li>
                <li><Link to="/invitations/templates" className="hover:text-[#d4af37]">Anniversaries & Parties</Link></li>
              </ul>
            </div>

            <div className="space-y-2">
              <span className="text-white font-semibold block">Features</span>
              <ul className="space-y-1.5 text-xs">
                <li>✦ 3D Palace Door Opening Animation</li>
                <li>✦ Interactive Touch Scratch Card</li>
                <li>✦ Live RSVP & WhatsApp Confirmation</li>
                <li>✦ Embedded Google Maps Navigation</li>
              </ul>
            </div>

            <div className="space-y-2">
              <span className="text-white font-semibold block">Studio Hub</span>
              <p className="text-xs leading-relaxed text-[#a1a1aa]">
                152 Shamla Hills, Bhopal, MP<br />
                WhatsApp: +91 92292 29323
              </p>
              <Link to="/" className="inline-flex items-center space-x-1 text-[#d4af37] hover:text-[#f3cf5b] font-semibold text-xs pt-1">
                <span>Moonlight Photography Studio</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>

          <div className="pt-6 border-t border-[#27272a] flex flex-col sm:flex-row items-center justify-between text-xs text-[#a1a1aa] gap-2">
            <span>© {new Date().getFullYear()} Moonlight Production. All rights reserved.</span>
            <div className="flex space-x-4">
              <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-white">Terms of Service</Link>
              <Link to="/invitations/admin" className="hover:text-[#d4af37]">Admin</Link>
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
