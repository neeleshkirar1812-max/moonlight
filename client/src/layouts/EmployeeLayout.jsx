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
    <div className="min-h-screen bg-[#FAF8F5] flex text-black">
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-white border-r-2 border-neutral-300 flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          <div className="h-20 flex items-center justify-between px-6 border-b border-neutral-200">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full border-2 border-gold-600 flex items-center justify-center bg-white shadow-sm overflow-hidden p-0.5">
                <img
                  src="https://ugc.production.linktr.ee/bbcf2874-0602-4cdb-b362-ad612f9fc135_zV3Uuw-tQraxE7KwMApwOHbWTg75v6W5ZJJOyWhXSJBR8O1GMQMZMOQ4CvB8uCMV4mM0SXMK-Q-s800-c-k-c0x00ffffff-no-r.jpeg?io=true&size=avatar-v3_0"
                  alt="Moonlight"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <span className="font-serif text-sm font-black tracking-wider text-black">MOONLIGHT</span>
                <p className="text-[8.5px] text-gold-800 font-mono font-black tracking-widest uppercase">Production Crew</p>
              </div>
            </Link>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-black">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4 border-b border-neutral-200 bg-[#FAF8F5]">
            <div className="flex items-center space-x-3">
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80'}
                alt={user?.name}
                className="w-10 h-10 rounded-full object-cover border-2 border-black"
              />
              <div className="overflow-hidden">
                <h4 className="text-xs font-black text-black truncate">{user?.name}</h4>
                <span className="text-[10px] bg-gold-100 text-black px-2 py-0.5 rounded-full border border-gold-600 font-mono font-black">
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
                  className={`flex items-center px-3.5 py-2.5 rounded-xl text-xs font-black transition-all ${
                    isActive
                      ? 'bg-black text-white shadow-md'
                      : 'text-neutral-800 hover:text-black hover:bg-neutral-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 mr-3 ${isActive ? 'text-gold-400' : 'text-neutral-600'}`} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-neutral-200 space-y-2">
          <Link
            to="/"
            className="flex items-center px-3.5 py-2 rounded-xl text-xs text-neutral-800 font-bold hover:text-black hover:bg-neutral-100 transition-colors"
          >
            <Home className="w-4 h-4 mr-3" />
            Website
          </Link>
          <button
            onClick={logout}
            className="w-full flex items-center px-3.5 py-2 rounded-xl text-xs text-red-600 font-bold hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-4 h-4 mr-3" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main stage */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        <header className="h-16 bg-white border-b-2 border-neutral-300 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg text-black hover:bg-neutral-100 lg:hidden"
          >
            <Menu className="w-5 h-5" />
          </button>
          <h2 className="text-sm font-black text-black tracking-wide">
            {navigation.find((n) => n.href === location.pathname)?.name || 'Crew Portal'}
          </h2>
          <span className="text-xs text-neutral-700 font-bold font-mono">{new Date().toDateString()}</span>
        </header>

        <main className="p-4 sm:p-6 lg:p-8 flex-1 max-w-7xl w-full mx-auto animate-fade-in text-black">
          <Outlet />
        </main>
      </div>

      <ToastContainer />
    </div>
  );
};

export default EmployeeLayout;
