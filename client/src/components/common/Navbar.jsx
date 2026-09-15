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
  ChevronRight,
  User,
  LogIn,
  Sparkles,
  Camera,
  Heart,
  Film,
  Award,
  BookOpen,
  Building2,
  Briefcase,
  MapPin,
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

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const getDashboardPath = () => {
    if (isSuperAdmin) return '/super-admin/dashboard';
    if (isAdmin) return '/admin/dashboard';
    if (isEmployee) return '/employee/dashboard';
    return '/customer/dashboard';
  };

  const isFilmsActive = location.pathname === '/portfolio/films';
  const isPortfolioActive = (location.pathname === '/portfolio' || (location.pathname.startsWith('/portfolio/') && !isFilmsActive));

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAF8F5]/95 backdrop-blur-xl border-b border-amber-900/10 py-2.5 shadow-sm'
            : 'bg-[#FAF8F5]/90 backdrop-blur-md border-b border-amber-900/10 py-3'
        }`}
      >
        <div className="max-w-7xl mx-auto px-2 xs:px-3 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* 1. Brand Logo */}
          <Link to="/" className="flex items-center space-x-1.5 sm:space-x-2 group shrink-0">
            <div className="w-7 h-7 xs:w-8 xs:h-8 sm:w-9 sm:h-9 rounded-full border-2 border-amber-600/40 p-0.5 flex items-center justify-center bg-white group-hover:border-amber-600 transition-all shadow-sm overflow-hidden shrink-0">
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
              <span className="font-serif text-xs xs:text-sm sm:text-base font-bold tracking-[0.1em] sm:tracking-[0.14em] text-neutral-900 group-hover:text-amber-700 transition-colors whitespace-nowrap">
                MOONLIGHT
              </span>
              <span className="text-[7px] sm:text-[7.5px] tracking-[0.2em] text-amber-700 font-mono uppercase font-bold hidden md:inline-block">
                Production • Films
              </span>
            </div>
          </Link>

          {/* 2. Center: Clean Minimal Navigation Pill */}
          <nav className="hidden lg:flex items-center bg-neutral-900/[0.03] border border-neutral-200/80 rounded-full p-1 space-x-0.5 shadow-2xs font-sans">
            <Link
              to="/"
              className={`text-xs font-medium transition-all py-1.5 px-3 rounded-full ${
                location.pathname === '/'
                  ? 'text-neutral-950 bg-white shadow-xs font-semibold'
                  : 'text-neutral-600 hover:text-neutral-950 hover:bg-white/60'
              }`}
            >
              Home
            </Link>

            <Link
              to="/portfolio"
              className={`text-xs font-medium transition-all py-1.5 px-3 rounded-full ${
                isPortfolioActive
                  ? 'text-neutral-950 bg-white shadow-xs font-semibold'
                  : 'text-neutral-600 hover:text-neutral-950 hover:bg-white/60'
              }`}
            >
              Weddings
            </Link>

            <Link
              to="/portfolio/films"
              className={`text-xs font-medium transition-all py-1.5 px-3 rounded-full ${
                isFilmsActive
                  ? 'text-neutral-950 bg-white shadow-xs font-semibold'
                  : 'text-neutral-600 hover:text-neutral-950 hover:bg-white/60'
              }`}
            >
              Films
            </Link>

            <Link
              to="/services"
              className={`text-xs font-medium transition-all py-1.5 px-3 rounded-full ${
                location.pathname === '/services'
                  ? 'text-neutral-950 bg-white shadow-xs font-semibold'
                  : 'text-neutral-600 hover:text-neutral-950 hover:bg-white/60'
              }`}
            >
              Pricing
            </Link>

            <Link
              to="/blog"
              className={`text-xs font-medium transition-all py-1.5 px-3 rounded-full ${
                location.pathname === '/blog'
                  ? 'text-neutral-950 bg-white shadow-xs font-semibold'
                  : 'text-neutral-600 hover:text-neutral-950 hover:bg-white/60'
              }`}
            >
              Blog
            </Link>

            <Link
              to="/about"
              className={`text-xs font-medium transition-all py-1.5 px-3 rounded-full ${
                location.pathname === '/about'
                  ? 'text-neutral-950 bg-white shadow-xs font-semibold'
                  : 'text-neutral-600 hover:text-neutral-950 hover:bg-white/60'
              }`}
            >
              About
            </Link>

            <Link
              to="/contact"
              className={`text-xs font-medium transition-all py-1.5 px-3 rounded-full ${
                location.pathname === '/contact'
                  ? 'text-neutral-950 bg-white shadow-xs font-semibold'
                  : 'text-neutral-600 hover:text-neutral-950 hover:bg-white/60'
              }`}
            >
              Contact
            </Link>

            <Link
              to="/invitations"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-xs font-medium transition-all py-1.5 px-3 rounded-full flex items-center ${
                location.pathname.startsWith('/invitations')
                  ? 'text-amber-950 bg-amber-200/90 shadow-xs font-bold'
                  : 'text-amber-900 font-semibold hover:text-amber-950 hover:bg-amber-100/70'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 mr-1 text-amber-700" /> Digital Invitations ↗
            </Link>
          </nav>

          {/* 3. Right: Desktop Sign In & Book CTA */}
          <div className="hidden lg:flex items-center space-x-2 shrink-0 font-sans">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white border border-neutral-300 text-neutral-900 hover:border-neutral-500 transition-all text-xs shadow-xs"
                >
                  <div className="w-5 h-5 rounded-full bg-neutral-900 text-white flex items-center justify-center font-bold text-[10px]">
                    {user?.name?.charAt(0) || 'U'}
                  </div>
                  <span className="font-medium max-w-[100px] truncate text-neutral-900">{user?.name}</span>
                  <ChevronDown className="w-3 h-3 text-neutral-500" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-neutral-200 rounded-xl shadow-xl py-2 z-50 text-xs animate-fade-in font-sans">
                    <div className="px-3 py-1.5 border-b border-neutral-100 text-[11px] text-neutral-500">
                      Signed in as: <strong className="text-neutral-900 block">{user?.role}</strong>
                    </div>
                    <Link
                      to={getDashboardPath()}
                      className="flex items-center px-3 py-2 text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 font-medium"
                    >
                      <LayoutDashboard className="w-3.5 h-3.5 mr-2 text-neutral-600" />
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
                className="px-3.5 py-1.5 rounded-full border border-neutral-300 hover:border-neutral-900 bg-white hover:bg-neutral-50 text-neutral-900 text-xs font-medium transition-all flex items-center shadow-xs"
              >
                <LogIn className="w-3.5 h-3.5 mr-1.5 text-neutral-600" />
                Sign In
              </Link>
            )}

            <Link
              to="/enquiry"
              className="px-4 py-1.5 rounded-full bg-neutral-950 hover:bg-neutral-800 text-white font-medium text-xs transition-all flex items-center shrink-0 shadow-xs"
            >
              <Calendar className="w-3 h-3 mr-1.5 text-neutral-300" />
              Book a Shoot
            </Link>
          </div>

          {/* 4. Mobile Controls: Direct Quick Buttons & Hamburger */}
          <div className="lg:hidden flex items-center space-x-1 xs:space-x-1.5 shrink-0 font-sans">
            {/* Quick Digital Invitations Button */}
            <Link
              to="/invitations"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2 xs:px-2.5 sm:px-3 py-1 text-[9px] xs:text-[10px] sm:text-[11px] font-semibold bg-amber-100/90 hover:bg-amber-200/90 text-amber-950 border border-amber-300/80 rounded-full shadow-xs flex items-center shrink-0 min-h-[30px] sm:min-h-[34px] transition-all whitespace-nowrap"
            >
              <Sparkles className="w-3 h-3 mr-1 text-amber-800 shrink-0" />
              <span>Digital Invitations</span>
            </Link>

            {/* Quick Book Shoot Button */}
            <Link
              to="/enquiry"
              className="px-2.5 xs:px-3 sm:px-3.5 py-1 text-[9px] xs:text-[10px] sm:text-[11px] font-semibold bg-neutral-950 hover:bg-neutral-800 text-white rounded-full shadow-xs shrink-0 min-h-[30px] sm:min-h-[34px] flex items-center transition-all whitespace-nowrap"
            >
              <Calendar className="w-3 h-3 mr-1 text-neutral-300 shrink-0" />
              <span>Book Shoot</span>
            </Link>

            {/* Portal / Sign In */}
            {isAuthenticated ? (
              <Link
                to={getDashboardPath()}
                className="p-1 xs:p-1.5 sm:px-2.5 sm:py-1 text-[9px] sm:text-[10px] font-medium bg-neutral-100 border border-neutral-200 text-neutral-800 rounded-full shadow-xs flex items-center shrink-0 min-h-[30px] sm:min-h-[34px]"
                title="Account"
              >
                <User className="w-3.5 h-3.5 text-neutral-700 shrink-0" />
                <span className="hidden md:inline-block ml-1">Account</span>
              </Link>
            ) : (
              <Link
                to="/login?role=customer"
                className="p-1 xs:p-1.5 sm:px-2.5 sm:py-1 text-[9px] sm:text-[10px] font-medium border border-neutral-300 bg-white text-neutral-800 rounded-full shadow-xs flex items-center shrink-0 min-h-[30px] sm:min-h-[34px]"
                title="Sign In"
              >
                <LogIn className="w-3.5 h-3.5 text-neutral-700 shrink-0" />
                <span className="hidden md:inline-block ml-1">Login</span>
              </Link>
            )}

            {/* Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-neutral-800 hover:text-neutral-950 rounded-lg focus:outline-none min-w-[32px] min-h-[30px] xs:min-w-[34px] xs:min-h-[32px] sm:min-w-[38px] sm:min-h-[38px] flex items-center justify-center shrink-0 p-0.5"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-neutral-900" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-Out Menu Drawer (2026 Minimal Quiet-Luxury) */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[48px] xs:top-[52px] sm:top-[58px] bottom-0 bg-[#FAF8F5] z-40 overflow-y-auto overscroll-contain animate-fade-in text-neutral-900 shadow-xl flex flex-col justify-between custom-scrollbar font-sans">
          <div className="px-3.5 xs:px-4 sm:px-6 py-4 space-y-4">
            
            {/* 1. Account / Sign In Card */}
            <div className="p-3 rounded-2xl bg-white border border-neutral-200/90 shadow-xs">
              {isAuthenticated ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-9 h-9 rounded-full bg-neutral-900 text-white flex items-center justify-center font-bold text-xs shrink-0">
                      {user?.name?.charAt(0) || 'U'}
                    </div>
                    <div>
                      <div className="font-semibold text-xs sm:text-sm text-neutral-900 leading-tight truncate max-w-[130px]">
                        {user?.name}
                      </div>
                      <div className="text-[10px] text-neutral-500 capitalize">
                        {user?.role} Portal
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <Link
                      to={getDashboardPath()}
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-3 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-medium text-xs shadow-xs flex items-center"
                    >
                      <LayoutDashboard className="w-3 h-3 mr-1 text-neutral-300" />
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        logout();
                      }}
                      className="p-1.5 rounded-xl bg-red-50 text-red-600 border border-red-200 hover:bg-red-100"
                      title="Sign Out"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-700 shrink-0">
                      <User className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-xs text-neutral-900 leading-tight">
                        Client Account
                      </div>
                      <div className="text-[10.5px] text-neutral-500 font-sans">
                        Sign in to view bookings & invitations
                      </div>
                    </div>
                  </div>
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3 py-1.5 rounded-xl border border-neutral-300 bg-white hover:bg-neutral-50 text-neutral-900 font-medium text-xs shadow-xs flex items-center shrink-0"
                  >
                    <LogIn className="w-3 h-3 mr-1 text-neutral-700" /> Sign In
                  </Link>
                </div>
              )}
            </div>

            {/* 2. Highlighted Banner: Digital Invitations */}
            <Link
              to="/invitations"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3.5 rounded-2xl bg-amber-50 hover:bg-amber-100/80 border border-amber-200 shadow-xs flex items-center justify-between group transition-all block"
            >
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-xl bg-amber-200 text-amber-950 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4 text-amber-800" />
                </div>
                <div>
                  <div className="flex items-center space-x-1.5">
                    <span className="font-bold text-xs sm:text-sm text-neutral-900">
                      Digital Invitations
                    </span>
                    <span className="px-1.5 py-0.2 rounded-full bg-amber-200 text-[9px] font-semibold text-amber-900">
                      E-Cards
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-600 font-normal leading-tight mt-0.5">
                    3D opening doors, Google maps & live RSVP
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
            </Link>

            {/* 3. Section 1: Photography & Films */}
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-semibold tracking-wider text-neutral-400 px-1 block">
                Photography & Films
              </span>

              <div className="bg-white rounded-2xl border border-neutral-200/90 shadow-xs divide-y divide-neutral-100 overflow-hidden">
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3.5 py-2.5 hover:bg-neutral-50 transition-colors"
                >
                  <div className="flex items-center space-x-2.5">
                    <div className="w-7 h-7 rounded-lg bg-neutral-100 text-neutral-700 flex items-center justify-center shrink-0">
                      <Sparkles className="w-3.5 h-3.5 text-neutral-600" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-neutral-900">Home</div>
                      <div className="text-[10.5px] text-neutral-500 font-normal">Main studio showcase</div>
                    </div>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
                </Link>

                <Link
                  to="/portfolio"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3.5 py-2.5 hover:bg-neutral-50 transition-colors"
                >
                  <div className="flex items-center space-x-2.5">
                    <div className="w-7 h-7 rounded-lg bg-neutral-100 text-neutral-700 flex items-center justify-center shrink-0">
                      <Camera className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-neutral-900">Weddings</div>
                      <div className="text-[10.5px] text-neutral-500 font-normal">Photo galleries & ceremonies</div>
                    </div>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
                </Link>

                <Link
                  to="/portfolio/pre-wedding"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3.5 py-2.5 hover:bg-neutral-50 transition-colors"
                >
                  <div className="flex items-center space-x-2.5">
                    <div className="w-7 h-7 rounded-lg bg-neutral-100 text-neutral-700 flex items-center justify-center shrink-0">
                      <Heart className="w-3.5 h-3.5 text-rose-600" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-neutral-900">Pre-Wedding</div>
                      <div className="text-[10.5px] text-neutral-500 font-normal">Couples & scenic locations</div>
                    </div>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
                </Link>

                <Link
                  to="/portfolio/films"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3.5 py-2.5 hover:bg-neutral-50 transition-colors"
                >
                  <div className="flex items-center space-x-2.5">
                    <div className="w-7 h-7 rounded-lg bg-neutral-100 text-neutral-700 flex items-center justify-center shrink-0">
                      <Film className="w-3.5 h-3.5 text-amber-700" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-neutral-900">Wedding Films</div>
                      <div className="text-[10.5px] text-neutral-500 font-normal">4K cinematic teasers & full films</div>
                    </div>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
                </Link>
              </div>
            </div>

            {/* 4. Section 2: Studio & Pricing */}
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-semibold tracking-wider text-neutral-400 px-1 block">
                Studio & Details
              </span>

              <div className="bg-white rounded-2xl border border-neutral-200/90 shadow-xs divide-y divide-neutral-100 overflow-hidden">
                <Link
                  to="/services"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3.5 py-2.5 hover:bg-neutral-50 transition-colors"
                >
                  <div className="flex items-center space-x-2.5">
                    <div className="w-7 h-7 rounded-lg bg-neutral-100 text-neutral-700 flex items-center justify-center shrink-0">
                      <Award className="w-3.5 h-3.5 text-neutral-700" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-neutral-900">Pricing & Packages</div>
                      <div className="text-[10.5px] text-neutral-500 font-normal">Transparent wedding rates</div>
                    </div>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
                </Link>

                <Link
                  to="/blog"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3.5 py-2.5 hover:bg-neutral-50 transition-colors"
                >
                  <div className="flex items-center space-x-2.5">
                    <div className="w-7 h-7 rounded-lg bg-neutral-100 text-neutral-700 flex items-center justify-center shrink-0">
                      <BookOpen className="w-3.5 h-3.5 text-neutral-700" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-neutral-900">Blog & Guides</div>
                      <div className="text-[10.5px] text-neutral-500 font-normal">Planning tips & inspiration</div>
                    </div>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
                </Link>

                <Link
                  to="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3.5 py-2.5 hover:bg-neutral-50 transition-colors"
                >
                  <div className="flex items-center space-x-2.5">
                    <div className="w-7 h-7 rounded-lg bg-neutral-100 text-neutral-700 flex items-center justify-center shrink-0">
                      <Building2 className="w-3.5 h-3.5 text-neutral-700" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-neutral-900">About Us</div>
                      <div className="text-[10.5px] text-neutral-500 font-normal">Our studio & team</div>
                    </div>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
                </Link>

                <Link
                  to="/careers"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3.5 py-2.5 hover:bg-neutral-50 transition-colors"
                >
                  <div className="flex items-center space-x-2.5">
                    <div className="w-7 h-7 rounded-lg bg-neutral-100 text-neutral-700 flex items-center justify-center shrink-0">
                      <Briefcase className="w-3.5 h-3.5 text-neutral-700" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-neutral-900">Careers</div>
                      <div className="text-[10.5px] text-neutral-500 font-normal">Join our photography team</div>
                    </div>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
                </Link>

                <Link
                  to="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3.5 py-2.5 hover:bg-neutral-50 transition-colors"
                >
                  <div className="flex items-center space-x-2.5">
                    <div className="w-7 h-7 rounded-lg bg-neutral-100 text-neutral-700 flex items-center justify-center shrink-0">
                      <MapPin className="w-3.5 h-3.5 text-neutral-700" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-neutral-900">Contact Us</div>
                      <div className="text-[10.5px] text-neutral-500 font-normal">Studio address & phone</div>
                    </div>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
                </Link>
              </div>
            </div>

            {/* 5. Direct Action CTA */}
            <Link
              to="/enquiry"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 rounded-2xl bg-neutral-950 hover:bg-neutral-800 text-white font-medium text-xs uppercase tracking-wider text-center flex items-center justify-center shadow-sm active:scale-[0.99] transition-all"
            >
              <Calendar className="w-4 h-4 mr-2 text-neutral-300" />
              Book a Shoot
            </Link>
          </div>

          {/* 6. Footer Social & Quick WhatsApp */}
          <div className="p-3.5 bg-white border-t border-neutral-200 space-y-2">
            <div className="flex items-center justify-around text-xs font-medium text-neutral-600">
              <a
                href="https://instagram.com/moonlight_production__"
                target="_blank"
                rel="noreferrer"
                className="flex items-center hover:text-pink-600 transition-colors py-1 px-2 rounded-lg hover:bg-pink-50"
              >
                <Instagram className="w-4 h-4 mr-1.5 text-pink-600" /> Instagram
              </a>
              <a
                href="https://www.youtube.com/@moonlightproductions_films"
                target="_blank"
                rel="noreferrer"
                className="flex items-center hover:text-red-600 transition-colors py-1 px-2 rounded-lg hover:bg-red-50"
              >
                <Youtube className="w-4 h-4 mr-1.5 text-red-600" /> YouTube
              </a>
              <a
                href="https://api.whatsapp.com/send?phone=919229229323"
                target="_blank"
                rel="noreferrer"
                className="flex items-center text-emerald-700 font-semibold transition-colors py-1 px-2 rounded-lg hover:bg-emerald-50"
              >
                <Phone className="w-4 h-4 mr-1.5 text-emerald-600" /> WhatsApp
              </a>
            </div>
            <div className="text-center text-[10px] text-neutral-400">
              © {new Date().getFullYear()} Moonlight Production
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
