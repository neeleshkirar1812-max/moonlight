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
    <div className="min-h-screen bg-obsidian-600 flex text-neutral-200">
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Admin Sidebar */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-obsidian-400 border-r border-white/10 flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex-1 flex flex-col min-h-0">
          {/* Header */}
          <div className="h-16 flex items-center justify-between px-5 border-b border-white/10 shrink-0">
            <Link to="/" className="flex items-center space-x-2.5">
              <div className="w-7 h-7 rounded-full border border-gold-500 flex items-center justify-center bg-obsidian-600 shadow-gold-subtle">
                <ShieldCheck className="w-4 h-4 text-gold-400" />
              </div>
              <div>
                <span className="font-display text-base font-bold tracking-[0.2em] text-white">LUMIÈRE</span>
                <p className="text-[8px] text-gold-400 font-sans tracking-widest uppercase">
                  {isSuperAdmin ? 'Super Admin' : 'Admin Console'}
                </p>
              </div>
            </Link>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-neutral-400">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Bar */}
          <div className="p-3 border-b border-white/5 bg-obsidian-500/60 shrink-0 flex items-center space-x-2.5">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'}
              alt={user?.name}
              className="w-8 h-8 rounded-full object-cover border border-gold-500/40"
            />
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-white truncate">{user?.name}</p>
              <span className="text-[9px] text-gold-300 font-mono uppercase tracking-wider">{user?.role}</span>
            </div>
          </div>

          {/* Nav List */}
          <nav className="p-3 space-y-1 overflow-y-auto flex-1 custom-scrollbar">
            <p className="text-[9px] uppercase tracking-[0.2em] text-neutral-500 font-bold px-2 py-1">
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
                  className={`flex items-center px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-gold-500/15 text-gold-300 border border-gold-500/40 shadow-gold-subtle'
                      : 'text-neutral-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-4 h-4 mr-2.5 shrink-0 ${isActive ? 'text-gold-400' : 'text-neutral-400'}`} />
                  <span className="truncate">{item.name}</span>
                </Link>
              );
            })}

            {isSuperAdmin && (
              <>
                <div className="pt-3">
                  <p className="text-[9px] uppercase tracking-[0.2em] text-gold-500 font-bold px-2 py-1">
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
                      className={`flex items-center px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                        isActive
                          ? 'bg-amber-500/20 text-gold-200 border border-gold-400 shadow-gold-subtle'
                          : 'text-neutral-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <Icon className={`w-4 h-4 mr-2.5 shrink-0 ${isActive ? 'text-gold-400' : 'text-neutral-400'}`} />
                      <span className="truncate">{item.name}</span>
                    </Link>
                  );
                })}
              </>
            )}
          </nav>
        </div>

        {/* Footer actions */}
        <div className="p-3 border-t border-white/10 space-y-1 shrink-0 bg-obsidian-500/40">
          <Link
            to="/"
            className="flex items-center px-3 py-1.5 rounded-lg text-xs text-neutral-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <Home className="w-3.5 h-3.5 mr-2" />
            Website
          </Link>
          <button
            onClick={logout}
            className="w-full flex items-center px-3 py-1.5 rounded-lg text-xs text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5 mr-2" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        <header className="h-16 bg-obsidian-400 border-b border-white/10 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg text-neutral-400 hover:text-white lg:hidden"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h2 className="text-sm font-semibold text-white tracking-wide">
              {coreNav.concat(superAdminNav).find((n) => n.href === location.pathname)?.name || 'Admin Console'}
            </h2>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-xs px-2.5 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-300 font-mono">
              Live System Active
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
