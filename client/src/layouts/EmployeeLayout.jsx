import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  Calendar,
  CheckSquare,
  Bell,
  User,
  LogOut,
  Menu,
  X,
  Home,
  Camera,
} from 'lucide-react';
import { ToastContainer } from '../components/common/Toast';

const EmployeeLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  const navigation = [
    { name: 'Assignments Dashboard', href: '/employee/dashboard', icon: LayoutDashboard },
    { name: 'Shoots & Projects', href: '/employee/projects', icon: Calendar },
    { name: 'Gear & Tasks', href: '/employee/tasks', icon: CheckSquare },
    { name: 'Notifications', href: '/employee/notifications', icon: Bell },
    { name: 'Employee Profile', href: '/employee/profile', icon: User },
  ];

  return (
    <div className="min-h-screen bg-obsidian-600 flex text-neutral-200">
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-obsidian-400 border-r border-white/10 flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          <div className="h-20 flex items-center justify-between px-6 border-b border-white/10">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full border border-gold-500 flex items-center justify-center bg-obsidian-600 shadow-gold-subtle">
                <Camera className="w-4 h-4 text-gold-400" />
              </div>
              <div>
                <span className="font-display text-lg font-bold tracking-[0.2em] text-white">LUMIÈRE</span>
                <p className="text-[9px] text-gold-400 font-sans tracking-widest uppercase">Production Crew</p>
              </div>
            </Link>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-neutral-400">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4 border-b border-white/5 bg-obsidian-500/50">
            <div className="flex items-center space-x-3">
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80'}
                alt={user?.name}
                className="w-10 h-10 rounded-full object-cover border border-gold-500/40"
              />
              <div className="overflow-hidden">
                <h4 className="text-xs font-bold text-white truncate">{user?.name}</h4>
                <span className="text-[10px] bg-gold-500/20 text-gold-300 px-1.5 py-0.5 rounded border border-gold-500/30">
                  Crew Member
                </span>
              </div>
            </div>
          </div>

          <nav className="p-4 space-y-1.5 overflow-y-auto">
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

        <div className="p-4 border-t border-white/10 space-y-2">
          <Link
            to="/"
            className="flex items-center px-3.5 py-2 rounded-xl text-xs text-neutral-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <Home className="w-4 h-4 mr-3" />
            Website
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

      {/* Main stage */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        <header className="h-16 bg-obsidian-400 border-b border-white/10 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg text-neutral-400 hover:text-white lg:hidden"
          >
            <Menu className="w-5 h-5" />
          </button>
          <h2 className="text-sm font-semibold text-white tracking-wide">
            {navigation.find((n) => n.href === location.pathname)?.name || 'Crew Portal'}
          </h2>
          <span className="text-xs text-neutral-400">{new Date().toDateString()}</span>
        </header>

        <main className="p-4 sm:p-6 lg:p-8 flex-1 max-w-7xl w-full mx-auto animate-fade-in">
          <Outlet />
        </main>
      </div>

      <ToastContainer />
    </div>
  );
};

export default EmployeeLayout;
