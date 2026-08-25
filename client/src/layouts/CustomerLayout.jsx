import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  Calendar,
  Sparkles,
  CreditCard,
  FileText,
  Video,
  User,
  Bell,
  LogOut,
  Menu,
  X,
  Home,
  MessageSquare,
} from 'lucide-react';
import { ToastContainer } from '../components/common/Toast';

const CustomerLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const navigation = [
    { name: 'Dashboard', href: '/customer/dashboard', icon: LayoutDashboard },
    { name: 'My Bookings', href: '/customer/bookings', icon: Calendar },
    { name: 'Private Galleries', href: '/customer/gallery', icon: Sparkles },
    { name: 'Wedding Films', href: '/customer/videos', icon: Video },
    { name: 'Payments & Checkout', href: '/customer/payments', icon: CreditCard },
    { name: 'Invoices & Receipts', href: '/customer/invoices', icon: FileText },
    { name: 'Enquiry Tracker', href: '/customer/enquiries', icon: MessageSquare },
    { name: 'Notifications', href: '/customer/notifications', icon: Bell },
    { name: 'Profile & Settings', href: '/customer/profile', icon: User },
  ];

  return (
    <div className="min-h-screen bg-obsidian-600 flex text-neutral-200">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar Component */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-obsidian-400 border-r border-white/10 flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Brand Header */}
          <div className="h-20 flex items-center justify-between px-6 border-b border-white/10">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full border border-gold-500 flex items-center justify-center bg-obsidian-600 shadow-gold-subtle">
                <span className="font-display font-bold text-gold-400 text-sm">L</span>
              </div>
              <div>
                <span className="font-display text-lg font-bold tracking-[0.2em] text-white">LUMIÈRE</span>
                <p className="text-[9px] text-gold-400 font-sans tracking-widest uppercase">Customer Suite</p>
              </div>
            </Link>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-neutral-400">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Capsule */}
          <div className="p-4 border-b border-white/5 bg-obsidian-500/50">
            <div className="flex items-center space-x-3">
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                alt={user?.name}
                className="w-10 h-10 rounded-full object-cover border border-gold-500/40"
              />
              <div className="overflow-hidden">
                <h4 className="text-xs font-bold text-white truncate">{user?.name}</h4>
                <p className="text-[11px] text-gold-400/90 truncate font-mono">{user?.email}</p>
              </div>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="p-4 space-y-1.5 overflow-y-auto max-h-[calc(100vh-280px)]">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-gold-500/15 text-gold-300 border border-gold-500/40 shadow-gold-subtle'
                      : 'text-neutral-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-4 h-4 mr-3 ${isActive ? 'text-gold-400' : 'text-neutral-400'}`} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-white/10 space-y-2">
          <Link
            to="/"
            className="flex items-center px-3.5 py-2 rounded-xl text-xs text-neutral-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <Home className="w-4 h-4 mr-3" />
            Public Website
          </Link>
          <button
            onClick={logout}
            className="w-full flex items-center px-3.5 py-2 rounded-xl text-xs text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-4 h-4 mr-3" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        {/* Top bar for mobile trigger & quick actions */}
        <header className="h-16 bg-obsidian-400 border-b border-white/10 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg text-neutral-400 hover:text-white lg:hidden"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h2 className="text-sm font-semibold text-white tracking-wide">
              {navigation.find((n) => n.href === location.pathname)?.name || 'Client Portal'}
            </h2>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              to="/enquiry"
              className="px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider bg-gold-gradient text-black rounded-full shadow-gold-subtle hover:brightness-110 transition-all"
            >
              + New Enquiry
            </Link>
          </div>
        </header>

        {/* Outlet Content */}
        <main className="p-4 sm:p-6 lg:p-8 flex-1 max-w-7xl w-full mx-auto animate-fade-in">
          <Outlet />
        </main>
      </div>

      <ToastContainer />
    </div>
  );
};

export default CustomerLayout;
