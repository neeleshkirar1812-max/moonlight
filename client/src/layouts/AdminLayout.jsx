import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  MessageSquare,
  Calendar,
  CreditCard,
  Image,
  FolderLock,
  Film,
  BookOpen,
  Briefcase,
  Users,
  Star,
  Settings,
  ShieldCheck,
  Activity,
  FileCheck,
  LogOut,
  Menu,
  X,
  Home,
  UserCheck,
  Inbox,
  FileText,
  Crown,
  KeyRound,
  Sparkles,
  AlertCircle,
  DollarSign,
} from 'lucide-react';
import { ToastContainer } from '../components/common/Toast';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout, isSuperAdmin } = useAuth();
  const location = useLocation();

  // Pending Approvals Count for Super Admin Notification Pill
  const [pendingApprovalsCount, setPendingApprovalsCount] = useState(0);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('moonlight_pending_approvals');
      if (saved) {
        const parsed = JSON.parse(saved);
        setPendingApprovalsCount(parsed.filter((a) => a.status === 'pending').length);
      } else {
        setPendingApprovalsCount(3);
      }
    } catch (e) {
      setPendingApprovalsCount(3);
    }
  }, [location.pathname]);

  const coreNav = [
    { name: 'Studio Performance', href: '/admin/dashboard', icon: LayoutDashboard, permission: null },
    { name: 'Digital Invitations', href: '/invitations/admin', icon: Sparkles, permission: null },
    { name: 'Wedding Enquiries', href: '/admin/enquiries', icon: MessageSquare, permission: 'canManageBookings' },
    { name: 'Bookings & Shoots', href: '/admin/bookings', icon: Calendar, permission: 'canManageBookings' },
    { name: 'Client GST Invoices', href: '/admin/invoices', icon: FileText, permission: 'canManageInvoices' },
    { name: 'Accounting & Ledger', href: '/admin/payments', icon: CreditCard, permission: 'canManagePayments' },
    { name: 'Staff Payroll & Slips', href: '/admin/payroll', icon: DollarSign, permission: 'canManageHR' },
    { name: 'Photo Portfolio', href: '/admin/portfolio', icon: Image, permission: 'canManagePortfolioCMS' },
    { name: 'Client Private Galleries', href: '/admin/galleries', icon: FolderLock, permission: 'canManagePortfolioCMS' },
    { name: 'Wedding Cinema Films', href: '/admin/videos', icon: Film, permission: 'canManagePortfolioCMS' },
    { name: 'Packages & Services', href: '/admin/services', icon: FileCheck, permission: 'canManageSettings' },
    { name: 'Blog & Articles', href: '/admin/blogs', icon: BookOpen, permission: 'canManageBlogsCMS' },
    { name: 'Job Openings', href: '/admin/careers', icon: Briefcase, permission: 'canManageHR' },
    { name: 'Job Applications', href: '/admin/applications', icon: Inbox, permission: 'canManageHR' },
    { name: 'Client Reviews', href: '/admin/testimonials', icon: Star, permission: 'canManageBlogsCMS' },
    { name: 'Customer Directory', href: '/admin/customers', icon: Users, permission: 'canManageBookings' },
    { name: 'Shoot Crew & Team', href: '/admin/employees', icon: UserCheck, permission: 'canManageHR' },
    { name: 'Studio Settings', href: '/admin/settings', icon: Settings, permission: 'canManageSettings' },
  ];

  const superAdminNav = [
    { name: 'Super Admin Command', href: '/super-admin/dashboard', icon: Crown },
    {
      name: 'Login Approvals & Passwords',
      href: '/super-admin/approvals',
      icon: KeyRound,
      badge: pendingApprovalsCount > 0 ? pendingApprovalsCount : null,
    },
    { name: 'Admin Accounts & Hierarchy', href: '/super-admin/admins', icon: ShieldCheck },
    { name: 'System Audit Logs', href: '/super-admin/audit-logs', icon: Activity },
    { name: 'Server Diagnostics', href: '/super-admin/config', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#F5F2EB] flex text-neutral-900 w-full max-w-full overflow-x-hidden min-w-0">
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Admin Sidebar */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#FAF8F5] border-r border-amber-900/10 flex flex-col justify-between transition-transform duration-300 shadow-xl lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex-1 flex flex-col min-h-0">
          {/* Brand Header */}
          <div className="h-16 flex items-center justify-between px-5 border-b border-amber-900/10 shrink-0 bg-white/80">
            <Link to="/" className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-full border-2 border-amber-500/60 flex items-center justify-center bg-amber-50 shadow-sm overflow-hidden p-0.5">
                <img
                  src="https://ugc.production.linktr.ee/bbcf2874-0602-4cdb-b362-ad612f9fc135_zV3Uuw-tQraxE7KwMApwOHbWTg75v6W5ZJJOyWhXSJBR8O1GMQMZMOQ4CvB8uCMV4mM0SXMK-Q-s800-c-k-c0x00ffffff-no-r.jpeg?io=true&size=avatar-v3_0"
                  alt="Moonlight"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <span className="font-serif text-sm font-bold tracking-wider text-neutral-900">MOONLIGHT</span>
                <p className="text-[8px] text-amber-800 font-mono font-bold tracking-widest uppercase">
                  {isSuperAdmin ? '👑 Super Admin Control' : '👩‍💼 Studio Admin Console'}
                </p>
              </div>
            </Link>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-neutral-700 hover:text-neutral-950">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Capsule & Accountability Identity */}
          <div className="p-3.5 border-b border-amber-900/10 bg-white shrink-0">
            <div className="flex items-center space-x-2.5">
              <img
                src={
                  user?.avatar ||
                  (isSuperAdmin
                    ? 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80'
                    : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80')
                }
                alt={user?.name}
                className={`w-9 h-9 rounded-full object-cover border-2 ${
                  isSuperAdmin ? 'border-amber-500 shadow-sm' : 'border-amber-400'
                }`}
              />
              <div className="overflow-hidden flex-1">
                <p className="text-xs font-bold text-neutral-900 truncate">{user?.name || 'Studio Administrator'}</p>
                <div className="flex items-center space-x-1 mt-0.5">
                  <span
                    className={`text-[9px] px-2 py-0.2 rounded-full font-mono font-bold uppercase tracking-wider ${
                      isSuperAdmin
                        ? 'bg-amber-100 text-amber-900 border border-amber-300'
                        : 'bg-amber-50 text-amber-800 border border-amber-200'
                    }`}
                  >
                    {isSuperAdmin ? '👑 Super Admin' : '👩‍💼 Studio Admin'}
                  </span>
                </div>
              </div>
            </div>
            <p className="text-[10px] text-neutral-500 font-mono truncate mt-1.5 pl-0.5">{user?.email}</p>
          </div>

          {/* Nav List */}
          <nav className="p-3 space-y-1 overflow-y-auto flex-1 custom-scrollbar">
            {/* Super Admin Privileged Section */}
            {isSuperAdmin && (
              <div className="mb-3 p-2 rounded-xl bg-amber-50 border border-amber-300/80 space-y-1 shadow-sm">
                <p className="text-[9px] uppercase tracking-[0.2em] text-amber-900 font-bold px-1.5 py-0.5 flex items-center">
                  <Crown className="w-3 h-3 mr-1 text-amber-700" /> Supreme Command
                </p>
                {superAdminNav.map((item) => {
                  const isActive = location.pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                        isActive
                          ? 'bg-amber-400 text-neutral-950 font-extrabold shadow-sm'
                          : 'text-amber-950 hover:bg-amber-200/60'
                      }`}
                    >
                      <div className="flex items-center space-x-2 truncate">
                        <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-neutral-950' : 'text-amber-700'}`} />
                        <span className="truncate">{item.name}</span>
                      </div>
                      {item.badge && (
                        <span className="px-1.5 py-0.2 rounded-full bg-rose-500 text-white font-mono text-[9.5px] font-bold shadow-sm">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            )}

            <p className="text-[9px] uppercase tracking-[0.2em] text-neutral-500 font-bold px-2 py-1">
              Studio Operations & CRM
            </p>
            {coreNav
              .filter((item) => {
                if (isSuperAdmin) return true;
                if (!item.permission) return true;
                if (user?.permissions && user.permissions[item.permission] === false) {
                  return false;
                }
                return true;
              })
              .map((item) => {
                const isActive = location.pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-gold-gradient text-neutral-950 font-extrabold shadow-sm'
                        : 'text-neutral-700 hover:text-neutral-950 hover:bg-amber-500/10'
                    }`}
                  >
                    <Icon className={`w-4 h-4 mr-2.5 shrink-0 ${isActive ? 'text-neutral-950' : 'text-amber-700'}`} />
                    <span className="truncate">{item.name}</span>
                  </Link>
                );
              })}
          </nav>
        </div>

        {/* Footer actions */}
        <div className="p-3 border-t border-amber-900/10 space-y-1 shrink-0 bg-white/80">
          <Link
            to="/"
            className="flex items-center px-3 py-1.5 rounded-lg text-xs text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100 transition-colors font-medium"
          >
            <Home className="w-3.5 h-3.5 mr-2 text-amber-700" />
            Website
          </Link>
          <button
            onClick={logout}
            className="w-full flex items-center px-3 py-1.5 rounded-lg text-xs text-rose-700 hover:bg-rose-50 transition-colors font-semibold"
          >
            <LogOut className="w-3.5 h-3.5 mr-2" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 w-full max-w-full overflow-x-hidden lg:pl-64">
        {/* Header with High-Visibility Role Accountability Banner */}
        <header className="h-16 bg-white/95 backdrop-blur-md border-b border-amber-900/10 px-3 sm:px-6 flex items-center justify-between sticky top-0 z-30 shadow-sm">
          <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100 lg:hidden shrink-0 min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Open sidebar menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="min-w-0">
              <h2 className="text-xs sm:text-sm font-serif font-bold text-neutral-900 tracking-wide truncate max-w-[130px] xs:max-w-[200px] sm:max-w-none">
                {coreNav.concat(superAdminNav).find((n) => n.href === location.pathname)?.name || 'Admin Console'}
              </h2>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
            {/* Role & Accountability Identity Badge */}
            <div className="hidden sm:flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-300/80 text-xs font-mono shadow-sm">
              <span
                className={`w-2 h-2 rounded-full ${
                  isSuperAdmin ? 'bg-amber-600 animate-pulse' : 'bg-emerald-600'
                }`}
              />
              <span className="text-neutral-700 font-bold">Logged In:</span>
              <span className={isSuperAdmin ? 'text-amber-900 font-bold' : 'text-amber-800 font-bold'}>
                {isSuperAdmin ? '👑 Super Admin' : '👩‍💼 Studio Admin'}
              </span>
            </div>

            {/* Super Admin Quick Approvals Link */}
            {isSuperAdmin && pendingApprovalsCount > 0 && (
              <Link
                to="/super-admin/approvals"
                className="px-2.5 sm:px-3 py-1 rounded-full bg-amber-100 hover:bg-amber-200 border border-amber-400 text-amber-950 text-xs font-mono font-bold transition-all flex items-center space-x-1 shadow-sm"
                title="Pending Approvals Awaiting Clearance"
              >
                <KeyRound className="w-3 h-3 text-amber-700" />
                <span className="hidden sm:inline">{pendingApprovalsCount} Approvals Pending</span>
                <span className="sm:hidden">{pendingApprovalsCount}</span>
              </Link>
            )}
          </div>
        </header>

        <main className="p-3 sm:p-6 lg:p-8 flex-1 max-w-7xl w-full mx-auto animate-fade-in min-w-0 overflow-x-hidden">
          <Outlet />
        </main>
      </div>

      <ToastContainer />
    </div>
  );
};

export default AdminLayout;
