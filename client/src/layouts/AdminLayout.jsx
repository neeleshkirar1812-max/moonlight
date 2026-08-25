import React, { useState } from 'react';
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
} from 'lucide-react';
import { ToastContainer } from '../components/common/Toast';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout, isSuperAdmin } = useAuth();
  const location = useLocation();

  const coreNav = [
    { name: 'KPI Analytics', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Enquiries Pipeline', href: '/admin/enquiries', icon: MessageSquare },
    { name: 'Bookings & Shoots', href: '/admin/bookings', icon: Calendar },
    { name: 'Client GST Invoices', href: '/admin/invoices', icon: FileText },
    { name: 'Razorpay Transactions', href: '/admin/payments', icon: CreditCard },
    { name: 'Portfolio CMS', href: '/admin/portfolio', icon: Image },
    { name: 'Private Client Galleries', href: '/admin/galleries', icon: FolderLock },
    { name: 'Wedding Films', href: '/admin/videos', icon: Film },
    { name: 'Services & Tiers', href: '/admin/services', icon: FileCheck },
    { name: 'Editorial Blogs', href: '/admin/blogs', icon: BookOpen },
    { name: 'Careers & Positions', href: '/admin/careers', icon: Briefcase },
    { name: 'Job Applications', href: '/admin/applications', icon: Inbox },
    { name: 'Client Testimonials', href: '/admin/testimonials', icon: Star },
    { name: 'Client Directory', href: '/admin/customers', icon: Users },
    { name: 'Production Crew', href: '/admin/employees', icon: UserCheck },
    { name: 'Studio Settings', href: '/admin/settings', icon: Settings },
  ];

  const superAdminNav = [
    { name: 'Admin Accounts', href: '/super-admin/admins', icon: ShieldCheck },
    { name: 'System Audit Logs', href: '/super-admin/audit-logs', icon: Activity },
    { name: 'Server Diagnostics', href: '/super-admin/system-config', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#0B0B0C] flex text-white">
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Admin Sidebar */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#121216] border-r border-gold-500/20 flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex-1 flex flex-col min-h-0">
          {/* Header */}
          <div className="h-16 flex items-center justify-between px-5 border-b border-white/10 shrink-0">
            <Link to="/" className="flex items-center space-x-2.5">
              <div className="w-7 h-7 rounded-full border-2 border-gold-400 flex items-center justify-center bg-black shadow-gold-subtle overflow-hidden p-0.5">
                <img
                  src="https://ugc.production.linktr.ee/bbcf2874-0602-4cdb-b362-ad612f9fc135_zV3Uuw-tQraxE7KwMApwOHbWTg75v6W5ZJJOyWhXSJBR8O1GMQMZMOQ4CvB8uCMV4mM0SXMK-Q-s800-c-k-c0x00ffffff-no-r.jpeg?io=true&size=avatar-v3_0"
                  alt="Moonlight"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <span className="font-serif text-sm font-bold tracking-wider text-white">MOONLIGHT</span>
                <p className="text-[8px] text-gold-400 font-mono font-bold tracking-widest uppercase">
                  {isSuperAdmin ? 'Super Admin' : 'Admin Console'}
                </p>
              </div>
            </Link>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Bar */}
          <div className="p-3 border-b border-white/10 bg-[#16161C] shrink-0 flex items-center space-x-2.5">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'}
              alt={user?.name}
              className="w-8 h-8 rounded-full object-cover border-2 border-gold-400"
            />
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-white truncate">{user?.name}</p>
              <span className="text-[9px] text-gold-400 font-mono font-bold uppercase tracking-wider">{user?.role}</span>
            </div>
          </div>

          {/* Nav List */}
          <nav className="p-3 space-y-1 overflow-y-auto flex-1 custom-scrollbar">
            <p className="text-[9px] uppercase tracking-[0.2em] text-neutral-400 font-bold px-2 py-1">
              Studio Management
            </p>
            {coreNav.map((item) => {
              const isActive = location.pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-gold-gradient text-black font-extrabold shadow-gold-subtle'
                      : 'text-neutral-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-4 h-4 mr-2.5 shrink-0 ${isActive ? 'text-black' : 'text-gold-400'}`} />
                  <span className="truncate">{item.name}</span>
                </Link>
              );
            })}

            {isSuperAdmin && (
              <>
                <div className="pt-3">
                  <p className="text-[9px] uppercase tracking-[0.2em] text-gold-400 font-bold px-2 py-1">
                    Super Admin Controls
                  </p>
                </div>
                {superAdminNav.map((item) => {
                  const isActive = location.pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                        isActive
                          ? 'bg-gold-gradient text-black font-extrabold shadow-gold-subtle'
                          : 'text-neutral-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <Icon className={`w-4 h-4 mr-2.5 shrink-0 ${isActive ? 'text-black' : 'text-gold-400'}`} />
                      <span className="truncate">{item.name}</span>
                    </Link>
                  );
                })}
              </>
            )}
          </nav>
        </div>

        {/* Footer actions */}
        <div className="p-3 border-t border-white/10 space-y-1 shrink-0 bg-[#16161C]">
          <Link
            to="/"
            className="flex items-center px-3 py-1.5 rounded-lg text-xs text-neutral-300 hover:text-white hover:bg-white/5 transition-colors font-medium"
          >
            <Home className="w-3.5 h-3.5 mr-2 text-gold-400" />
            Website
          </Link>
          <button
            onClick={logout}
            className="w-full flex items-center px-3 py-1.5 rounded-lg text-xs text-red-400 hover:bg-red-500/10 transition-colors font-semibold"
          >
            <LogOut className="w-3.5 h-3.5 mr-2" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        <header className="h-16 bg-[#0E0E12]/90 backdrop-blur-md border-b border-white/10 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg text-neutral-300 hover:text-white hover:bg-white/5 lg:hidden"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h2 className="text-sm font-serif font-bold text-white tracking-wide">
              {coreNav.concat(superAdminNav).find((n) => n.href === location.pathname)?.name || 'Admin Console'}
            </h2>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 font-mono font-bold">
              ● Live Studio Active
            </span>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8 flex-1 max-w-7xl w-full mx-auto animate-fade-in">
          <Outlet />
        </main>
      </div>

      <ToastContainer />
    </div>
  );
};

export default AdminLayout;
