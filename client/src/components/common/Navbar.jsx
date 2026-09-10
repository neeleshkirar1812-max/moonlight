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
  ChevronDown,
  User,
  LogIn,
  Sparkles,
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

  const getDashboardPath = () => {
    if (isSuperAdmin) return '/super-admin/dashboard';
    if (isAdmin) return '/admin/dashboard';
    if (isEmployee) return '/employee/dashboard';
    return '/customer/dashboard';
  };

  const isFilmsActive = location.pathname === '/portfolio/films';
  const isPortfolioActive = (location.pathname === '/portfolio' || (location.pathname.startsWith('/portfolio/') && !isFilmsActive));

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAF8F5]/95 backdrop-blur-xl border-b border-amber-900/10 py-2.5 shadow-sm'
          : 'bg-[#FAF8F5]/90 backdrop-blur-md border-b border-amber-900/10 py-3'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* 1. Brand Logo */}
        <Link to="/" className="flex items-center space-x-2 group shrink-0">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-amber-600/40 p-0.5 flex items-center justify-center bg-white group-hover:border-amber-600 transition-all shadow-sm overflow-hidden">
            <img
              src="https://ugc.production.linktr.ee/bbcf2874-0602-4cdb-b362-ad612f9fc135_zV3Uuw-tQraxE7KwMApwOHbWTg75v6W5ZJJOyWhXSJBR8O1GMQMZMOQ4CvB8uCMV4mM0SXMK-Q-s800-c-k-c0x00ffffff-no-r.jpeg?io=true&size=avatar-v3_0"
              alt="Moonlight Production"
              className="w-full h-full object-cover rounded-full"
              onError={(e) => {
                e.target.onerror = null;
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML = '<span class="font-serif font-bold text-amber-700 text-xs">M</span>';
              }}
            />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-sm sm:text-base font-bold tracking-[0.14em] text-neutral-900 group-hover:text-amber-700 transition-colors">
              MOONLIGHT
            </span>
            <span className="text-[7px] sm:text-[7.5px] tracking-[0.2em] text-amber-700 font-mono uppercase font-bold hidden xs:inline-block">
              Production • Films
            </span>
          </div>
        </Link>

        {/* 2. Center: Ultra-Compact Luxury Capsule (Closely Packed) */}
        <nav className="hidden lg:flex items-center bg-black/[0.04] border border-amber-900/10 rounded-full p-1 space-x-0.5 shadow-inner">
          <Link
            to="/"
            className={`text-[11px] uppercase tracking-wider font-semibold transition-all py-1 px-2.5 rounded-full ${
              location.pathname === '/'
                ? 'text-amber-900 bg-white shadow-sm font-bold'
                : 'text-neutral-600 hover:text-neutral-950 hover:bg-white/60'
            }`}
          >
            Home
          </Link>

          <Link
            to="/portfolio"
            className={`text-[11px] uppercase tracking-wider font-semibold transition-all py-1 px-2.5 rounded-full ${
              isPortfolioActive
                ? 'text-amber-900 bg-white shadow-sm font-bold'
                : 'text-neutral-600 hover:text-neutral-950 hover:bg-white/60'
            }`}
          >
            Portfolio
          </Link>

          <Link
            to="/portfolio/films"
            className={`text-[11px] uppercase tracking-wider font-semibold transition-all py-1 px-2.5 rounded-full ${
              isFilmsActive
                ? 'text-amber-900 bg-white shadow-sm font-bold'
                : 'text-neutral-600 hover:text-neutral-950 hover:bg-white/60'
            }`}
          >
            4K Films
          </Link>

          <Link
            to="/services"
            className={`text-[11px] uppercase tracking-wider font-semibold transition-all py-1 px-2.5 rounded-full ${
              location.pathname === '/services'
                ? 'text-amber-900 bg-white shadow-sm font-bold'
                : 'text-neutral-600 hover:text-neutral-950 hover:bg-white/60'
            }`}
          >
            Services
          </Link>

          <Link
            to="/blog"
            className={`text-[11px] uppercase tracking-wider font-semibold transition-all py-1 px-2.5 rounded-full ${
              location.pathname === '/blog'
                ? 'text-amber-900 bg-white shadow-sm font-bold'
                : 'text-neutral-600 hover:text-neutral-950 hover:bg-white/60'
            }`}
          >
            Blog
          </Link>

          <Link
            to="/about"
            className={`text-[11px] uppercase tracking-wider font-semibold transition-all py-1 px-2.5 rounded-full ${
              location.pathname === '/about'
                ? 'text-amber-900 bg-white shadow-sm font-bold'
                : 'text-neutral-600 hover:text-neutral-950 hover:bg-white/60'
            }`}
          >
            About
          </Link>

          <Link
            to="/contact"
            className={`text-[11px] uppercase tracking-wider font-semibold transition-all py-1 px-2.5 rounded-full ${
              location.pathname === '/contact'
                ? 'text-amber-900 bg-white shadow-sm font-bold'
                : 'text-neutral-600 hover:text-neutral-950 hover:bg-white/60'
            }`}
          >
            Contact
          </Link>

          <Link
            to="/invitations"
            target="_blank"
            rel="noopener noreferrer"
            className={`text-[11px] uppercase tracking-wider font-semibold transition-all py-1 px-2.5 rounded-full flex items-center ${
              location.pathname.startsWith('/invitations')
                ? 'text-amber-950 bg-gradient-to-r from-amber-200 to-amber-300 shadow-sm font-extrabold'
                : 'text-amber-900 font-bold hover:text-amber-950 hover:bg-amber-100/60'
            }`}
          >
            <Sparkles className="w-3 h-3 mr-1 text-amber-700" /> Digital Invitation ↗
          </Link>
        </nav>

        {/* 3. Right: Desktop User Profile / Sign In & Book CTA */}
        <div className="hidden lg:flex items-center space-x-2 shrink-0">
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white border border-neutral-300 text-neutral-900 hover:border-amber-600 transition-all text-xs shadow-sm"
              >
                <div className="w-5 h-5 rounded-full bg-gold-gradient text-neutral-900 flex items-center justify-center font-bold text-[10px]">
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <span className="font-semibold max-w-[100px] truncate text-neutral-900">{user?.name}</span>
                <ChevronDown className="w-3 h-3 text-amber-700" />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-neutral-200 rounded-xl shadow-xl py-2 z-50 text-xs animate-fade-in font-sans">
                  <div className="px-3 py-1.5 border-b border-neutral-100 text-[11px] text-neutral-500 font-mono">
                    Signed in as: <strong className="text-neutral-900 block">{user?.role}</strong>
                  </div>
                  <Link
                    to={getDashboardPath()}
                    className="flex items-center px-3 py-2 text-neutral-700 hover:bg-amber-50 hover:text-amber-900 font-medium"
                  >
                    <LayoutDashboard className="w-3.5 h-3.5 mr-2 text-amber-600" />
                    Dashboard
                  </Link>
                  <button
                    onClick={logout}
                    className="w-full flex items-center px-3 py-2 text-red-600 hover:bg-red-50 text-left font-medium"
                  >
                    <LogOut className="w-3.5 h-3.5 mr-2" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="px-3.5 py-1.5 rounded-full border border-neutral-300 hover:border-amber-700 bg-white hover:bg-neutral-50 text-neutral-900 text-xs font-bold uppercase tracking-wider transition-all flex items-center shadow-sm"
            >
              <LogIn className="w-3.5 h-3.5 mr-1.5 text-amber-700" />
              Sign In
            </Link>
          )}

          <Link
            to="/enquiry"
            className="px-4 py-1.5 rounded-full bg-gold-gradient text-neutral-950 font-extrabold text-xs uppercase tracking-wider shadow-sm hover:brightness-105 active:scale-95 transition-all flex items-center shrink-0 btn-shimmer"
          >
            <Calendar className="w-3 h-3 mr-1" />
            Book Shoot
          </Link>
        </div>

        {/* 4. Mobile Controls: Direct Buttons & Hamburger */}
        <div className="lg:hidden flex items-center space-x-1.5 shrink-0">
          {isAuthenticated ? (
            <Link
              to={getDashboardPath()}
              className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-amber-500/15 border border-amber-500/30 text-amber-900 rounded-full shadow-sm flex items-center shrink-0 min-h-[34px]"
            >
              <User className="w-3 h-3 mr-1 text-amber-700" /> Portal
            </Link>
          ) : (
            <Link
              to="/login?role=customer"
              className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider border border-neutral-300 bg-white text-neutral-900 rounded-full shadow-sm flex items-center shrink-0 min-h-[34px]"
            >
              <LogIn className="w-3 h-3 mr-1 text-amber-700" /> Login
            </Link>
          )}

          <Link
            to="/enquiry"
            className="px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider bg-gold-gradient text-neutral-950 rounded-full shadow-sm shrink-0 min-h-[34px] flex items-center"
          >
            Book
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-neutral-800 hover:text-amber-800 rounded-lg focus:outline-none min-w-[40px] min-h-[40px] flex items-center justify-center shrink-0 p-1"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-amber-700" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-Out Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[54px] sm:top-[60px] bg-[#FAF8F5]/98 backdrop-blur-2xl z-50 px-4 sm:px-6 py-5 border-t border-neutral-200 flex flex-col justify-between overflow-y-auto animate-fade-in text-neutral-900 shadow-2xl">
          <div className="space-y-3">
            {/* Account Quick Card */}
            <div className="p-3.5 rounded-2xl bg-white border border-neutral-200 space-y-2 shadow-sm">
              <span className="text-[10px] uppercase font-mono font-bold text-amber-800 block tracking-wider">
                Account & Portal
              </span>
              {isAuthenticated ? (
                <div className="space-y-2">
                  <Link
                    to={getDashboardPath()}
                    className="flex items-center justify-center w-full py-2.5 rounded-xl bg-gold-gradient text-neutral-950 font-extrabold text-xs uppercase tracking-wider shadow-sm min-h-[42px]"
                  >
                    <LayoutDashboard className="w-3.5 h-3.5 mr-2" />
                    Access {user?.role} Portal
                  </Link>
                  <button
                    onClick={logout}
                    className="w-full py-2 rounded-xl bg-red-50 border border-red-200 text-red-600 font-bold text-xs flex items-center justify-center min-h-[42px]"
                  >
                    <LogOut className="w-3.5 h-3.5 mr-2" />
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center justify-center py-2.5 rounded-xl border border-neutral-300 bg-white hover:bg-neutral-50 text-neutral-900 font-bold text-xs uppercase tracking-wider text-center shadow-sm min-h-[42px]"
                >
                  <LogIn className="w-4 h-4 mr-1.5 text-amber-700" /> Sign In to Portal
                </Link>
              )}
            </div>

            {/* Navigation Links */}
            <div className="space-y-1 pt-1">
              <Link
                to="/invitations"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center text-sm font-extrabold text-amber-950 bg-gradient-to-r from-amber-100 to-amber-200/90 border border-amber-300 px-3 py-2.5 rounded-xl my-1 shadow-sm"
              >
                <Sparkles className="w-4 h-4 mr-2 text-amber-700" /> Digital Invitation (Marketplace) ✦ ↗
              </Link>
              <Link
                to="/"
                className="flex items-center text-sm font-semibold text-neutral-800 hover:text-amber-800 border-b border-neutral-200/80 py-2.5"
              >
                Home
              </Link>
              <Link
                to="/portfolio"
                className="flex items-center text-sm font-semibold text-neutral-800 hover:text-amber-800 border-b border-neutral-200/80 py-2.5"
              >
                Royal Wedding Portfolio
              </Link>
              <Link
                to="/portfolio/pre-wedding"
                className="flex items-center text-sm font-semibold text-neutral-800 hover:text-amber-800 border-b border-neutral-200/80 py-2.5"
              >
                Pre-Wedding Shoots
              </Link>
              <Link
                to="/portfolio/films"
                className="flex items-center text-sm font-semibold text-neutral-800 hover:text-amber-800 border-b border-neutral-200/80 py-2.5"
              >
                4K Cinema Films
              </Link>
              <Link
                to="/services"
                className="flex items-center text-sm font-semibold text-neutral-800 hover:text-amber-800 border-b border-neutral-200/80 py-2.5"
              >
                Services & Pricing
              </Link>
              <Link
                to="/blog"
                className="flex items-center text-sm font-semibold text-neutral-800 hover:text-amber-800 border-b border-neutral-200/80 py-2.5"
              >
                Blog & Wedding Guides
              </Link>
              <Link
                to="/about"
                className="flex items-center text-sm font-semibold text-neutral-800 hover:text-amber-800 border-b border-neutral-200/80 py-2.5"
              >
                About Studio
              </Link>
              <Link
                to="/careers"
                className="flex items-center text-sm font-semibold text-neutral-800 hover:text-amber-800 border-b border-neutral-200/80 py-2.5"
              >
                Join Our Crew (Careers)
              </Link>
              <Link
                to="/contact"
                className="flex items-center text-sm font-semibold text-neutral-800 hover:text-amber-800 border-b border-neutral-200/80 py-2.5"
              >
                Contact & Studio Hub
              </Link>
            </div>
          </div>

          {/* Social Links Bottom */}
          <div className="pt-4 border-t border-neutral-200">
            <div className="flex justify-around items-center text-xs font-mono font-semibold text-neutral-600">
              <a href="https://instagram.com/moonlight_production__" target="_blank" rel="noreferrer" className="flex items-center hover:text-pink-600">
                <Instagram className="w-4 h-4 mr-1 text-pink-600" /> Instagram
              </a>
              <a href="https://www.youtube.com/@moonlightproductions_films" target="_blank" rel="noreferrer" className="flex items-center hover:text-red-600">
                <Youtube className="w-4 h-4 mr-1 text-red-600" /> YouTube
              </a>
              <a href="https://api.whatsapp.com/send?phone=919229229323" target="_blank" rel="noreferrer" className="flex items-center text-emerald-600 font-bold">
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
