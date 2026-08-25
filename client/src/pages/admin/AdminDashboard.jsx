import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/client';
import {
  Users,
  MessageSquare,
  Calendar,
  CreditCard,
  Image,
  BookOpen,
  DollarSign,
  TrendingUp,
  Clock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchKPIs = async () => {
      try {
        const res = await api.get('/admin/dashboard');
        setDashboardData(res.data);
      } catch (err) {
        console.error('Error fetching admin dashboard KPIs', err);
      } finally {
        setLoading(false);
      }
    };
    fetchKPIs();
  }, []);

  const kpis = dashboardData?.kpis || {};
  const recentEnquiries = dashboardData?.recentEnquiries || [];
  const recentBookings = dashboardData?.recentBookings || [];
  const monthlyStats = dashboardData?.monthlyStats || [];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold block">
            Executive Operations
          </span>
          <h1 className="font-serif text-3xl font-bold text-white">Studio Performance Dashboard</h1>
        </div>
        <div className="flex items-center space-x-3">
          <Link
            to="/admin/enquiries"
            className="px-4 py-2 rounded-full bg-gold-gradient text-black font-bold text-xs uppercase tracking-wider shadow-gold-subtle hover:brightness-110"
          >
            Review Enquiries
          </Link>
          <Link
            to="/admin/portfolio"
            className="px-4 py-2 rounded-full bg-obsidian-300 border border-white/15 text-xs font-semibold text-neutral-300 hover:text-white uppercase tracking-wider"
          >
            + Upload Portfolio
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Revenue */}
        <div className="luxury-card rounded-2xl p-6 border border-gold-500/30 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold">Total Revenue Captured</span>
            <DollarSign className="w-5 h-5 text-gold-400" />
          </div>
          <h3 className="font-serif text-3xl font-bold text-white mt-2">
            ₹{kpis.totalRevenue?.toLocaleString('en-IN') || '0'}
          </h3>
          <p className="text-[11px] text-emerald-400 mt-1 flex items-center font-mono">
            <TrendingUp className="w-3.5 h-3.5 mr-1" /> +18.4% this quarter
          </p>
        </div>

        {/* Total Bookings */}
        <div className="luxury-card rounded-2xl p-6 border border-white/10 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold">Confirmed Bookings</span>
            <Calendar className="w-5 h-5 text-gold-400" />
          </div>
          <h3 className="font-serif text-3xl font-bold text-white mt-2">
            {kpis.confirmedBookings || kpis.totalBookings || 0}
          </h3>
          <p className="text-[11px] text-neutral-400 mt-1 font-mono">
            Across 18 international venues
          </p>
        </div>

        {/* Total Enquiries */}
        <div className="luxury-card rounded-2xl p-6 border border-white/10 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold">Active Enquiries</span>
            <MessageSquare className="w-5 h-5 text-gold-400" />
          </div>
          <h3 className="font-serif text-3xl font-bold text-white mt-2">
            {kpis.totalEnquiries || 0}
          </h3>
          <p className="text-[11px] text-amber-400 mt-1 font-mono">
            {kpis.newEnquiries || 0} new awaiting quotation
          </p>
        </div>

        {/* Pending Payments */}
        <div className="luxury-card rounded-2xl p-6 border border-white/10 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold">Pending Receivables</span>
            <CreditCard className="w-5 h-5 text-gold-400" />
          </div>
          <h3 className="font-serif text-3xl font-bold text-gold-300 mt-2">
            ₹{kpis.pendingPaymentsAmount?.toLocaleString('en-IN') || '0'}
          </h3>
          <p className="text-[11px] text-neutral-400 mt-1 font-mono">
            Balance due on delivery
          </p>
        </div>
      </div>

      {/* Analytics Chart & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Monthly Performance Trend Bar Chart (Custom Styled Pure React/Tailwind) */}
        <div className="lg:col-span-8 luxury-card rounded-3xl p-8 border border-white/10 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif text-xl font-bold text-white">Monthly Revenue & Enquiry Velocity</h3>
              <p className="text-xs text-neutral-400">Quarterly trend analysis across luxury bookings</p>
            </div>
            <span className="text-xs text-gold-400 font-mono">2026 Fiscal Year</span>
          </div>

          <div className="h-64 flex items-end justify-between gap-2 pt-8 pb-2 border-b border-white/10">
            {monthlyStats.map((stat, idx) => {
              const heightPercent = Math.min(100, Math.round((stat.revenue / 1200000) * 100));
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                  <div className="relative w-full flex justify-center">
                    <div
                      style={{ height: `${Math.max(15, heightPercent)}%` }}
                      className="w-full max-w-[28px] bg-gradient-to-t from-gold-600 to-champagne rounded-t-md group-hover:brightness-125 transition-all shadow-gold-subtle"
                    />
                    <div className="absolute -top-7 opacity-0 group-hover:opacity-100 transition-opacity bg-black/90 text-gold-300 text-[9px] px-1.5 py-0.5 rounded border border-gold-500/30 whitespace-nowrap pointer-events-none">
                      ₹{Math.round(stat.revenue / 1000)}k
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-neutral-400 group-hover:text-gold-300">{stat.month}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Directory Count */}
        <div className="lg:col-span-4 luxury-card rounded-3xl p-8 border border-white/10 flex flex-col justify-between space-y-6">
          <div>
            <h3 className="font-serif text-xl font-bold text-white mb-1">Studio Assets</h3>
            <p className="text-xs text-neutral-400">Active portfolios & talent records</p>
          </div>

          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-obsidian-500 border border-white/5">
              <span className="flex items-center text-neutral-300"><Users className="w-4 h-4 mr-2 text-gold-400" /> Total Clients</span>
              <strong className="font-mono text-white text-sm">{kpis.totalCustomers || 0}</strong>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-xl bg-obsidian-500 border border-white/5">
              <span className="flex items-center text-neutral-300"><ShieldCheck className="w-4 h-4 mr-2 text-gold-400" /> Production Crew</span>
              <strong className="font-mono text-white text-sm">{kpis.totalEmployees || 0}</strong>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-xl bg-obsidian-500 border border-white/5">
              <span className="flex items-center text-neutral-300"><Image className="w-4 h-4 mr-2 text-gold-400" /> Published Portfolios</span>
              <strong className="font-mono text-white text-sm">{kpis.totalPortfolioItems || 0}</strong>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-xl bg-obsidian-500 border border-white/5">
              <span className="flex items-center text-neutral-300"><BookOpen className="w-4 h-4 mr-2 text-gold-400" /> Editorial Essays</span>
              <strong className="font-mono text-white text-sm">{kpis.totalBlogs || 0}</strong>
            </div>
          </div>

          <Link
            to="/admin/settings"
            className="w-full py-2.5 text-center rounded-xl bg-obsidian-300 border border-white/10 text-neutral-300 hover:text-white text-xs font-semibold uppercase tracking-wider transition-colors"
          >
            Manage Studio Settings
          </Link>
        </div>
      </div>

      {/* Recent Enquiries & Bookings Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Enquiries */}
        <div className="luxury-card rounded-3xl p-6 sm:p-8 border border-white/10 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <h3 className="font-serif text-lg font-bold text-white">Recent Enquiries</h3>
            <Link to="/admin/enquiries" className="text-xs text-gold-400 hover:underline">View All →</Link>
          </div>

          <div className="space-y-3">
            {recentEnquiries.map((enq) => (
              <div key={enq._id} className="p-4 rounded-xl bg-obsidian-500 border border-white/5 flex items-center justify-between text-xs">
                <div>
                  <span className="font-mono text-gold-400 font-bold mr-2">{enq.enquiryId}</span>
                  <strong className="text-white">{enq.customerDetails?.fullName}</strong>
                  <p className="text-[11px] text-neutral-400">{enq.eventType} • {enq.location?.city}</p>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold uppercase bg-gold-500/20 text-gold-300 border border-gold-500/30">
                  {enq.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="luxury-card rounded-3xl p-6 sm:p-8 border border-white/10 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <h3 className="font-serif text-lg font-bold text-white">Confirmed Shoots</h3>
            <Link to="/admin/bookings" className="text-xs text-gold-400 hover:underline">View All →</Link>
          </div>

          <div className="space-y-3">
            {recentBookings.map((bkg) => (
              <div key={bkg._id} className="p-4 rounded-xl bg-obsidian-500 border border-white/5 flex items-center justify-between text-xs">
                <div>
                  <span className="font-mono text-gold-400 font-bold mr-2">{bkg.bookingNumber}</span>
                  <strong className="text-white">{bkg.customer?.name}</strong>
                  <p className="text-[11px] text-neutral-400">{bkg.eventType} • {new Date(bkg.eventDate).toLocaleDateString()}</p>
                </div>
                <div className="text-right font-mono">
                  <span className="font-serif font-bold text-gold-300">₹{bkg.totalAmount?.toLocaleString('en-IN')}</span>
                  <p className="text-[10px] text-emerald-400">{bkg.paymentStatus}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
