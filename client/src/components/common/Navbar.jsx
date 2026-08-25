import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Menu,
  X,
  Instagram,
  Youtube,
  Phone,
  LogOut,
  LayoutDashboard,
  Calendar,
  Sparkles,
  ChevronDown,
  Heart,
  ShieldCheck,
  User,
  LogIn,
} from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const { user, isAuthenticated, logout, isCustomer, isEmployee, isAdmin, isSuperAdmin } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  }, [location.pathname]);

  // Clean, tight nav links from Home to Contact
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Pre-Wedding', path: '/portfolio/pre-wedding' },
    { name: '4K Films', path: '/portfolio/films' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Journal', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  const getDashboardPath = () => {
    if (isSuperAdmin) return '/super-admin/dashboard';
    if (isAdmin) return '/admin/dashboard';
    if (isEmployee) return '/employee/dashboard';
    return '/customer/dashboard';
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-xl border-b border-neutral-300 py-2 shadow-lg shadow-black/5'
          : 'bg-white/90 backdrop-blur-md border-b border-neutral-200 py-3'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* 1. Left: Brand Logo & Studio Identity */}
        <Link to="/" className="flex items-center space-x-2 sm:space-x-2.5 group shrink-0">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-gold-600 p-0.5 flex items-center justify-center bg-white group-hover:border-black transition-all shadow-sm overflow-hidden">
            <img
              src="https://ugc.production.linktr.ee/bbcf2874-0602-4cdb-b362-ad612f9fc135_zV3Uuw-tQraxE7KwMApwOHbWTg75v6W5ZJJOyWhXSJBR8O1GMQMZMOQ4CvB8uCMV4mM0SXMK-Q-s800-c-k-c0x00ffffff-no-r.jpeg?io=true&size=avatar-v3_0"
              alt="Moonlight Production"
              className="w-full h-full object-cover rounded-full"
              onError={(e) => {
                e.target.onerror = null;
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML = '<span class="font-serif font-bold text-black text-xs">M</span>';
              }}
            />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-xs sm:text-base font-extrabold tracking-[0.14em] text-black group-hover:text-gold-700 transition-colors">
              MOONLIGHT
            </span>
            <span className="text-[7px] sm:text-[7.5px] tracking-[0.2em] text-black font-mono uppercase font-black">
              Production • Films
            </span>
          </div>
        </Link>

        {/* 2. Center: Perfectly Centered & Compact Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center justify-center space-x-1 xl:space-x-1.5 px-3">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`text-[11px] uppercase tracking-[0.1em] font-extrabold transition-all duration-200 relative py-1.5 px-2 rounded-lg ${
                  isActive
                    ? 'text-black bg-gold-100/90 shadow-sm border border-gold-300'
                    : 'text-black hover:text-gold-700 hover:bg-neutral-100'
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-2 right-2 h-[2.5px] bg-black rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* 3. Right: Desktop Dual Login & CTA Action Buttons */}
        <div className="hidden lg:flex items-center space-x-2 shrink-0">
          {isAuthenticated ? (
            /* Logged in User Profile Dropdown */
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center space-x-1.5 bg-white border-2 border-black rounded-full px-3 py-1 hover:bg-neutral-100 transition-all text-[11px] shadow-sm text-black font-bold"
              >
                <img
                  src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                  alt={user?.name}
                  className="w-4 h-4 rounded-full object-cover border border-black"
                />
                <span className="max-w-[75px] truncate">{user?.name?.split(' ')[0]}</span>
                <ChevronDown className="w-3 h-3 text-black" />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white border-2 border-neutral-300 rounded-2xl shadow-2xl py-2 z-50 animate-fade-in text-black">
                  <div className="px-4 py-2 border-b border-neutral-200">
                    <p className="text-xs font-black text-black truncate">{user?.name}</p>
                    <p className="text-[9px] text-gold-800 uppercase tracking-wider font-mono font-black">{user?.role}</p>
                  </div>
                  <Link
                    to={getDashboardPath()}
                    className="flex items-center px-4 py-2 text-[11px] text-black font-bold hover:bg-gold-50 hover:text-gold-900 transition-colors"
                  >
                    <LayoutDashboard className="w-3.5 h-3.5 mr-2 text-black" />
                    Access {user?.role} Portal
                  </Link>
                  {isCustomer && (
                    <Link
                      to="/customer/gallery"
                      className="flex items-center px-4 py-2 text-[11px] text-black font-bold hover:bg-gold-50 hover:text-gold-900 transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5 mr-2 text-gold-700" />
                      Private Photo Gallery
                    </Link>
                  )}
                  <button
                    onClick={logout}
                    className="w-full flex items-center px-4 py-2 text-[11px] text-red-600 font-bold hover:bg-red-50 transition-colors text-left"
                  >
                    <LogOut className="w-3.5 h-3.5 mr-2" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* DUAL LOGIN BUTTONS (Desktop) */
            <div className="flex items-center space-x-1.5">
              <Link
                to="/login?role=customer"
                className="px-2.5 py-1 rounded-full border-2 border-gold-600 bg-gold-50 hover:bg-gold-500 hover:text-white text-black text-[10px] font-black uppercase tracking-wider transition-all flex items-center shadow-sm group"
              >
                <Heart className="w-2.5 h-2.5 mr-1 text-gold-700 group-hover:text-white group-hover:scale-110 transition-transform" />
                Couple
              </Link>

              <Link
                to="/login?role=staff"
                className="px-2.5 py-1 rounded-full border-2 border-black bg-white hover:bg-black hover:text-white text-black text-[10px] font-black uppercase tracking-wider transition-all flex items-center shadow-sm"
              >
                <ShieldCheck className="w-2.5 h-2.5 mr-1 text-gold-700" />
                Crew
              </Link>
            </div>
          )}

          {/* Primary CTA: 8-Step Interactive Indian Wedding Planner */}
          <Link
            to="/enquiry"
            className="px-3.5 py-1.5 rounded-full bg-black hover:bg-neutral-800 text-white font-extrabold text-[10.5px] uppercase tracking-wider shadow-md hover:brightness-110 transition-all flex items-center shrink-0 btn-shimmer"
          >
            <Calendar className="w-3 h-3 mr-1 text-gold-400" />
            Book Shoot
          </Link>
        </div>

        {/* 4. Mobile Controls: Direct 1-Click Login Button + Book Button + Hamburger */}
        <div className="lg:hidden flex items-center space-x-1.5">
          {isAuthenticated ? (
            <Link
              to={getDashboardPath()}
              className="px-2.5 py-1 text-[9.5px] font-black uppercase tracking-wider bg-gold-100 border border-gold-600 text-black rounded-full shadow-sm flex items-center"
            >
              <User className="w-2.5 h-2.5 mr-1 text-gold-700" /> Portal
            </Link>
          ) : (
            <Link
              to="/login?role=customer"
              className="px-2.5 py-1 text-[9.5px] font-black uppercase tracking-wider border-2 border-gold-600 bg-gold-50 text-black rounded-full shadow-sm flex items-center"
            >
              <LogIn className="w-2.5 h-2.5 mr-1 text-gold-700" /> Login
            </Link>
          )}

          <Link
            to="/enquiry"
            className="px-2.5 py-1 text-[9.5px] font-black uppercase tracking-wider bg-black text-white rounded-full shadow-sm"
          >
            Book
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-black hover:text-neutral-700 rounded-lg focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-gold-700" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-Out Full Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[52px] bg-white/98 backdrop-blur-2xl z-50 px-5 py-5 border-t border-neutral-300 flex flex-col justify-between overflow-y-auto animate-fade-in custom-scrollbar text-black">
          {/* Quick Dual Login Action Box (Top of Mobile Menu) */}
          <div className="mb-4 p-3 rounded-2xl bg-[#FAF8F5] border-2 border-neutral-300 space-y-2">
            <span className="text-[10px] uppercase font-mono font-black text-black block tracking-wider">
              🔐 Account & Client Sanctuary
            </span>
            {isAuthenticated ? (
              <div className="space-y-2">
                <Link
                  to={getDashboardPath()}
                  className="flex items-center justify-center w-full py-2.5 rounded-xl bg-black text-white font-black text-xs uppercase tracking-wider shadow-sm"
                >
                  <LayoutDashboard className="w-3.5 h-3.5 mr-2 text-gold-400" />
                  Access {user?.role} Portal
                </Link>
                <button
                  onClick={logout}
                  className="w-full py-2 rounded-xl bg-red-50 border border-red-200 text-red-600 font-bold text-xs flex items-center justify-center"
                >
                  <LogOut className="w-3.5 h-3.5 mr-2" />
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/login?role=customer"
                  className="flex items-center justify-center py-2.5 rounded-xl border-2 border-gold-600 bg-gold-50 text-black font-black text-[11px] uppercase tracking-wider text-center shadow-sm"
                >
                  <Heart className="w-3.5 h-3.5 mr-1 text-gold-700" /> Couple Login
                </Link>
                <Link
                  to="/login?role=staff"
                  className="flex items-center justify-center py-2.5 rounded-xl border-2 border-black bg-white text-black font-black text-[11px] uppercase tracking-wider text-center shadow-sm"
                >
                  <ShieldCheck className="w-3.5 h-3.5 mr-1 text-gold-700" /> Staff Login
                </Link>
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <div className="space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="block text-base font-serif font-black tracking-wider text-black hover:text-gold-700 border-b border-neutral-200 pb-2.5 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Direct Official Social Channels in Mobile */}
          <div className="pt-4 border-t border-neutral-300">
            <div className="flex justify-around items-center text-black text-xs font-mono font-bold">
              <a href="https://instagram.com/moonlight_production__" target="_blank" rel="noreferrer" className="flex items-center hover:text-pink-600">
                <Instagram className="w-4 h-4 mr-1 text-pink-600" /> Instagram
              </a>
              <a href="https://www.youtube.com/@moonlightproductions_films" target="_blank" rel="noreferrer" className="flex items-center hover:text-red-600">
                <Youtube className="w-4 h-4 mr-1 text-red-600" /> YouTube
              </a>
              <a href="https://api.whatsapp.com/send?phone=919229229323" target="_blank" rel="noreferrer" className="flex items-center text-emerald-700 font-black">
                <Phone className="w-4 h-4 mr-1" /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
