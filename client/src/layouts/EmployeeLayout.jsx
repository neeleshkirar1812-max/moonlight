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
    <div className="min-h-screen bg-[#0B0B0C] flex text-white">
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#121216] border-r border-gold-500/20 flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          <div className="h-20 flex items-center justify-between px-6 border-b border-white/10">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full border-2 border-gold-400 flex items-center justify-center bg-black shadow-gold-subtle overflow-hidden p-0.5">
                <img
                  src="https://ugc.production.linktr.ee/bbcf2874-0602-4cdb-b362-ad612f9fc135_zV3Uuw-tQraxE7KwMApwOHbWTg75v6W5ZJJOyWhXSJBR8O1GMQMZMOQ4CvB8uCMV4mM0SXMK-Q-s800-c-k-c0x00ffffff-no-r.jpeg?io=true&size=avatar-v3_0"
                  alt="Moonlight"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <span className="font-serif text-sm font-bold tracking-wider text-white">MOONLIGHT</span>
                <p className="text-[8.5px] text-gold-400 font-mono font-bold tracking-widest uppercase">Production Crew</p>
              </div>
            </Link>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4 border-b border-white/10 bg-[#16161C]">
            <div className="flex items-center space-x-3">
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80'}
                alt={user?.name}
                className="w-10 h-10 rounded-full object-cover border-2 border-gold-400"
              />
              <div className="overflow-hidden">
                <h4 className="text-xs font-bold text-white truncate">{user?.name}</h4>
                <span className="text-[10px] bg-gold-500/20 text-gold-300 px-2 py-0.5 rounded-full border border-gold-500/40 font-mono font-bold">
                  Crew Member
                </span>
              </div>
            </div>
          </div>

          <nav className="p-4 space-y-1.5 overflow-y-auto custom-scrollbar">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-gold-gradient text-black font-extrabold shadow-gold-subtle'
                      : 'text-neutral-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-4 h-4 mr-3 ${isActive ? 'text-black' : 'text-gold-400'}`} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-white/10 space-y-2">
          <Link
            to="/"
            className="flex items-center px-3.5 py-2 rounded-xl text-xs text-neutral-300 hover:text-white hover:bg-white/5 transition-colors font-medium"
          >
            <Home className="w-4 h-4 mr-3 text-gold-400" />
            Website
          </Link>
          <button
            onClick={logout}
            className="w-full flex items-center px-3.5 py-2 rounded-xl text-xs text-red-400 hover:bg-red-500/10 transition-colors font-semibold"
          >
            <LogOut className="w-4 h-4 mr-3" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main stage */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        <header className="h-16 bg-[#0E0E12]/90 backdrop-blur-md border-b border-white/10 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg text-neutral-300 hover:text-white hover:bg-white/5 lg:hidden"
          >
            <Menu className="w-5 h-5" />
          </button>
          <h2 className="text-sm font-serif font-bold text-white tracking-wide">
            {navigation.find((n) => n.href === location.pathname)?.name || 'Crew Portal'}
          </h2>
          <span className="text-xs text-neutral-400 font-mono">{new Date().toDateString()}</span>
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
