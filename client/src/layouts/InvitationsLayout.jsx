import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import WhatsAppFloatingButton from '../components/common/WhatsAppFloatingButton';
import { ToastContainer } from '../components/common/Toast';
import {
  Sparkles,
  LayoutDashboard,
  ShieldCheck,
  LogIn,
  LogOut,
  ChevronDown,
  Menu,
  X,
  Crown,
  Heart,
  Mail,
  Phone,
  MapPin,
  PlusCircle,
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
      {/* 1. ROYAL IVORY & GOLD NAVBAR (Zareqia Exact Structure) */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-50 bg-[#FAF8F5]/90 backdrop-blur-xl border-b border-amber-900/10 shadow-[0_4px_30px_rgba(0,0,0,0.04)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          {/* Brand Logo */}
          <Link to="/invitations" className="flex items-center space-x-2.5 group shrink-0">
            <div className="w-9 h-9 rounded-xl bg-amber-100 border border-amber-400/60 flex items-center justify-center text-amber-800 shadow-xs group-hover:scale-105 transition-all">
              <Crown className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg font-bold tracking-wider text-neutral-900 group-hover:text-amber-800 transition-colors">
                MOONLIGHT
              </span>
              <span className="text-[8.5px] tracking-[0.25em] text-amber-800 font-mono uppercase font-semibold">
                Digital Invitations
              </span>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center space-x-6 text-xs font-semibold uppercase tracking-wider text-neutral-600">
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
            <a href="/invitations#comparison" className="hover:text-amber-900 transition-colors py-1">
              Why Digital
            </a>
            <a href="/invitations#how-it-works" className="hover:text-amber-900 transition-colors py-1">
              How It Works
            </a>
            <a href="/invitations#pricing" className="hover:text-amber-900 transition-colors py-1">
              Pricing
            </a>
            <a href="/invitations#faq" className="hover:text-amber-900 transition-colors py-1">
              FAQ
            </a>
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
          <div className="hidden sm:flex items-center space-x-3">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center space-x-2 px-3.5 py-2 rounded-full border border-amber-300 bg-amber-50/80 hover:bg-amber-100/80 text-neutral-900 text-xs font-semibold transition-all cursor-pointer shadow-xs"
                >
                  <LayoutDashboard className="w-3.5 h-3.5 text-amber-700" />
                  <span>{user?.name?.split(' ')[0] || 'My Account'}</span>
                  <ChevronDown className="w-3 h-3 text-neutral-500" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-white border border-amber-200/80 shadow-xl py-2 z-50 text-xs animate-fade-in">
                    <Link
                      to="/invitations/dashboard"
                      className="flex items-center space-x-2 px-4 py-2.5 text-neutral-700 hover:bg-amber-50 hover:text-amber-900"
                    >
                      <LayoutDashboard className="w-4 h-4 text-amber-700" />
                      <span>My Invitations</span>
                    </Link>
                    <Link
                      to="/invitations/templates"
                      className="flex items-center space-x-2 px-4 py-2.5 text-neutral-700 hover:bg-amber-50 hover:text-amber-900"
                    >
                      <PlusCircle className="w-4 h-4 text-amber-700" />
                      <span>Create Invitation</span>
                    </Link>
                    <div className="border-t border-neutral-100 my-1" />
                    <button
                      type="button"
                      onClick={logout}
                      className="w-full flex items-center space-x-2 px-4 py-2.5 text-rose-600 hover:bg-rose-50 text-left cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/invitations/login"
                  className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-neutral-700 hover:text-amber-900 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/invitations/templates"
                  className="px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-neutral-950 font-bold text-xs uppercase tracking-wider shadow-sm transition-all hover:scale-105"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger Menu Toggle */}
          <div className="flex sm:hidden items-center space-x-2">
            {!isAuthenticated && (
              <Link
                to="/invitations/templates"
                className="px-3 py-1.5 rounded-full bg-amber-500 text-neutral-950 font-bold text-[11px] uppercase tracking-wider shadow-xs"
              >
                Start
              </Link>
            )}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-neutral-100 text-neutral-700 hover:text-neutral-950 cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="sm:hidden bg-[#FAF8F5] border-t border-amber-900/10 px-4 pt-3 pb-6 space-y-3 shadow-xl animate-fade-in">
            <Link
              to="/invitations"
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-neutral-800 hover:bg-amber-100"
            >
              Home
            </Link>
            <Link
              to="/invitations/templates"
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-neutral-800 hover:bg-amber-100"
            >
              Browse Templates
            </Link>
            <a
              href="/invitations#features"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-neutral-800 hover:bg-amber-100"
            >
              Features
            </a>
            <a
              href="/invitations#comparison"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-neutral-800 hover:bg-amber-100"
            >
              Why Digital
            </a>
            <a
              href="/invitations#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-neutral-800 hover:bg-amber-100"
            >
              How It Works
            </a>
            <a
              href="/invitations#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-neutral-800 hover:bg-amber-100"
            >
              Pricing
            </a>
            <a
              href="/invitations#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-neutral-800 hover:bg-amber-100"
            >
              FAQ
            </a>

            <div className="border-t border-neutral-200 pt-3 space-y-2">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/invitations/dashboard"
                    className="block w-full py-2.5 rounded-xl bg-amber-100 text-amber-950 font-bold text-xs text-center"
                  >
                    My Invitations Dashboard
                  </Link>
                  <button
                    type="button"
                    onClick={logout}
                    className="block w-full py-2.5 rounded-xl border border-rose-300 text-rose-700 font-semibold text-xs text-center"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/invitations/login"
                    className="block w-full py-2.5 rounded-xl border border-neutral-300 text-neutral-800 font-semibold text-xs text-center"
                  >
                    Login
                  </Link>
                  <Link
                    to="/invitations/templates"
                    className="block w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-neutral-950 font-bold text-xs text-center uppercase tracking-wider shadow-sm"
                  >
                    Create My Invitation
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Main Content Viewport */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* ========================================================================= */}
      {/* 2. LUXURY FOOTER (Zareqia Exact Footer Layout) */}
      {/* ========================================================================= */}
      <footer className="bg-neutral-950 text-white border-t border-amber-900/30 pt-16 pb-12 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Column 1: Brand */}
            <div className="space-y-4 md:col-span-1">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/50 flex items-center justify-center text-amber-400">
                  <Crown className="w-4 h-4" />
                </div>
                <span className="font-serif text-lg font-bold tracking-wider text-white">
                  MOONLIGHT
                </span>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                India's premier royal digital invitation suite. Create animated, interactive wedding & celebration webpages with 4K video gates, touch scratch cards, and instant WhatsApp delivery.
              </p>
            </div>

            {/* Column 2: Navigation */}
            <div className="space-y-3">
              <h4 className="font-serif text-sm font-bold text-amber-400 uppercase tracking-wider">
                Explore
              </h4>
              <ul className="space-y-2 text-xs text-neutral-400">
                <li><Link to="/invitations/templates" className="hover:text-white transition-colors">Browse Templates</Link></li>
                <li><a href="/invitations#features" className="hover:text-white transition-colors">Premium Features</a></li>
                <li><a href="/invitations#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
                <li><a href="/invitations#pricing" className="hover:text-white transition-colors">Pricing Plans</a></li>
                <li><a href="/invitations#reviews" className="hover:text-white transition-colors">Client Stories</a></li>
              </ul>
            </div>

            {/* Column 3: Occasions */}
            <div className="space-y-3">
              <h4 className="font-serif text-sm font-bold text-amber-400 uppercase tracking-wider">
                Occasions
              </h4>
              <ul className="space-y-2 text-xs text-neutral-400">
                <li><Link to="/invitations/templates?type=wedding" className="hover:text-white transition-colors">Royal Weddings</Link></li>
                <li><Link to="/invitations/templates?type=engagement" className="hover:text-white transition-colors">Ring Engagements</Link></li>
                <li><Link to="/invitations/templates?type=mehendi" className="hover:text-white transition-colors">Sangeet & Mehendi</Link></li>
                <li><Link to="/invitations/templates?type=anniversary" className="hover:text-white transition-colors">Anniversaries</Link></li>
                <li><Link to="/invitations/templates?type=housewarming" className="hover:text-white transition-colors">Griha Pravesh</Link></li>
              </ul>
            </div>

            {/* Column 4: Legal & Support */}
            <div className="space-y-3">
              <h4 className="font-serif text-sm font-bold text-amber-400 uppercase tracking-wider">
                Legal & Support
              </h4>
              <ul className="space-y-2 text-xs text-neutral-400">
                <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact Support</Link></li>
                <li><a href="mailto:tarunrathore3435@gmail.com" className="hover:text-white transition-colors">tarunrathore3435@gmail.com</a></li>
                <li><a href="tel:+919229229323" className="hover:text-white transition-colors">+91 92292 29323</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-neutral-800 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
            <p>© {new Date().getFullYear()} Moonlight Production. All rights reserved.</p>
            <p className="flex items-center space-x-1">
              <span>Crafted with</span>
              <Heart size={12} className="text-amber-500 fill-amber-500" />
              <span>for Royal Indian Celebrations</span>
            </p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Quick Action Button */}
      <WhatsAppFloatingButton />

      {/* Global Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default InvitationsLayout;
