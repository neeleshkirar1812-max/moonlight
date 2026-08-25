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
        if (res.data) setDashboardData(res.data);
      } catch (err) {
        console.error('Error fetching admin dashboard KPIs', err);
      } finally {
        setLoading(false);
      }
    };
    fetchKPIs();
  }, []);

  const kpis = dashboardData?.kpis || {
    totalRevenue: 2850000,
    confirmedBookings: 14,
    totalEnquiries: 38,
    newEnquiries: 6,
    pendingPaymentsAmount: 640000,
    totalCustomers: 42,
    totalEmployees: 8,
    totalPortfolioItems: 24,
    totalBlogs: 12,
  };

  const recentEnquiries = dashboardData?.recentEnquiries || [
    { _id: '1', enquiryId: 'ENQ-901', customerDetails: { fullName: 'Vikram & Radhika Singhania' }, eventType: '3-Day Palace Wedding', location: { city: 'Udaipur' }, status: 'new' },
    { _id: '2', enquiryId: 'ENQ-902', customerDetails: { fullName: 'Arjun & Meera Kapoor' }, eventType: 'Cinematic Pre-Wedding', location: { city: 'Maheshwar' }, status: 'proposal_sent' },
    { _id: '3', enquiryId: 'ENQ-903', customerDetails: { fullName: 'Siddharth & Tara Deshmukh' }, eventType: 'Royal Destination', location: { city: 'Goa' }, status: 'in_review' },
  ];

  const recentBookings = dashboardData?.recentBookings || [
    { _id: '1', bookingNumber: 'BK-2026-44', customer: { name: 'Aarav & Ananya Sharma' }, eventType: 'Royal Palace Wedding', eventDate: '2026-11-18', totalAmount: 750000, paymentStatus: 'Advance Paid (60%)' },
    { _id: '2', bookingNumber: 'BK-2026-45', customer: { name: 'Rohan & Sanjana Nair' }, eventType: 'Heritage Pre-Wedding', eventDate: '2026-10-05', totalAmount: 320000, paymentStatus: 'Fully Paid' },
  ];

  const monthlyStats = dashboardData?.monthlyStats || [
    { month: 'Jan', revenue: 450000 },
    { month: 'Feb', revenue: 620000 },
    { month: 'Mar', revenue: 850000 },
    { month: 'Apr', revenue: 540000 },
    { month: 'May', revenue: 950000 },
    { month: 'Jun', revenue: 1150000 },
  ];

  return (
    <div className="space-y-8 animate-fade-in text-black">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-mono tracking-widest text-gold-800 font-black block">
            Executive Operations
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-black text-black">Studio Performance Dashboard</h1>
        </div>
        <div className="flex items-center space-x-3">
          <Link
            to="/admin/enquiries"
            className="px-4 py-2 rounded-full bg-black hover:bg-neutral-800 text-white font-black text-xs uppercase tracking-wider shadow-sm transition-all btn-shimmer"
          >
            Review Enquiries
          </Link>
          <Link
            to="/admin/portfolio"
            className="px-4 py-2 rounded-full bg-white hover:bg-black hover:text-white border-2 border-black text-xs font-black text-black uppercase tracking-wider shadow-sm transition-all"
          >
            + Upload Portfolio
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Revenue */}
        <div className="bg-white rounded-2xl p-6 border-2 border-neutral-300 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-[10.5px] uppercase tracking-wider text-neutral-600 font-bold font-mono">Total Revenue Captured</span>
            <DollarSign className="w-5 h-5 text-gold-700" />
          </div>
          <h3 className="font-serif text-3xl font-black text-black mt-2">
            ₹{kpis.totalRevenue?.toLocaleString('en-IN') || '0'}
          </h3>
          <p className="text-xs text-emerald-800 mt-1 flex items-center font-mono font-bold">
            <TrendingUp className="w-3.5 h-3.5 mr-1" /> +18.4% this quarter
          </p>
        </div>

        {/* Total Bookings */}
        <div className="bg-white rounded-2xl p-6 border-2 border-neutral-300 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-[10.5px] uppercase tracking-wider text-neutral-600 font-bold font-mono">Confirmed Bookings</span>
            <Calendar className="w-5 h-5 text-gold-700" />
          </div>
          <h3 className="font-serif text-3xl font-black text-black mt-2">
            {kpis.confirmedBookings || kpis.totalBookings || 0}
          </h3>
          <p className="text-xs text-neutral-700 mt-1 font-mono font-semibold">
            Across 18 royal destinations
          </p>
        </div>

        {/* Total Enquiries */}
        <div className="bg-white rounded-2xl p-6 border-2 border-neutral-300 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-[10.5px] uppercase tracking-wider text-neutral-600 font-bold font-mono">Active Enquiries</span>
            <MessageSquare className="w-5 h-5 text-gold-700" />
          </div>
          <h3 className="font-serif text-3xl font-black text-black mt-2">
            {kpis.totalEnquiries || 0}
          </h3>
          <p className="text-xs text-amber-800 mt-1 font-mono font-bold">
            {kpis.newEnquiries || 0} new awaiting quotation
          </p>
        </div>

        {/* Pending Payments */}
        <div className="bg-white rounded-2xl p-6 border-2 border-neutral-300 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-[10.5px] uppercase tracking-wider text-neutral-600 font-bold font-mono">Pending Receivables</span>
            <CreditCard className="w-5 h-5 text-gold-700" />
          </div>
          <h3 className="font-serif text-3xl font-black text-gold-800 mt-2">
            ₹{kpis.pendingPaymentsAmount?.toLocaleString('en-IN') || '0'}
          </h3>
          <p className="text-xs text-neutral-700 mt-1 font-mono font-semibold">
            Balance due on delivery
          </p>
        </div>
      </div>

      {/* Analytics Chart & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Monthly Performance Trend Bar Chart */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border-2 border-neutral-300 shadow-xl space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif text-xl font-black text-black">Monthly Revenue Velocity</h3>
              <p className="text-xs text-neutral-700 font-medium">Quarterly trend analysis across luxury bookings</p>
            </div>
            <span className="text-xs text-gold-800 font-mono font-bold">2026 Fiscal Year</span>
          </div>

          <div className="h-64 flex items-end justify-between gap-2 pt-8 pb-2 border-b-2 border-neutral-200">
            {monthlyStats.map((stat, idx) => {
              const heightPercent = Math.min(100, Math.round((stat.revenue / 1200000) * 100));
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                  <div className="relative w-full flex justify-center">
                    <div
                      style={{ height: `${Math.max(20, heightPercent)}%` }}
                      className="w-full max-w-[32px] bg-black group-hover:bg-gold-600 rounded-t-md transition-all shadow-sm"
                    />
                    <div className="absolute -top-7 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-[9.5px] font-bold px-2 py-0.5 rounded shadow-lg whitespace-nowrap pointer-events-none">
                      ₹{Math.round(stat.revenue / 1000)}k
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-neutral-700 group-hover:text-black">{stat.month}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Directory Count */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-8 border-2 border-neutral-300 shadow-xl flex flex-col justify-between space-y-6">
          <div>
            <h3 className="font-serif text-xl font-black text-black mb-1">Studio Assets</h3>
            <p className="text-xs text-neutral-700 font-medium">Active portfolios & talent records</p>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#FAF8F5] border border-neutral-300">
              <span className="flex items-center text-black font-bold"><Users className="w-4 h-4 mr-2 text-gold-700" /> Total Clients</span>
              <strong className="font-mono text-black font-black text-sm">{kpis.totalCustomers || 0}</strong>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#FAF8F5] border border-neutral-300">
              <span className="flex items-center text-black font-bold"><ShieldCheck className="w-4 h-4 mr-2 text-gold-700" /> Production Crew</span>
              <strong className="font-mono text-black font-black text-sm">{kpis.totalEmployees || 0}</strong>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#FAF8F5] border border-neutral-300">
              <span className="flex items-center text-black font-bold"><Image className="w-4 h-4 mr-2 text-gold-700" /> Published Portfolios</span>
              <strong className="font-mono text-black font-black text-sm">{kpis.totalPortfolioItems || 0}</strong>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#FAF8F5] border border-neutral-300">
              <span className="flex items-center text-black font-bold"><BookOpen className="w-4 h-4 mr-2 text-gold-700" /> Editorial Essays</span>
              <strong className="font-mono text-black font-black text-sm">{kpis.totalBlogs || 0}</strong>
            </div>
          </div>

          <Link
            to="/admin/settings"
            className="w-full py-2.5 text-center rounded-xl bg-black hover:bg-neutral-800 text-white text-xs font-black uppercase tracking-wider transition-colors shadow-sm"
          >
            Manage Studio Settings
          </Link>
        </div>
      </div>

      {/* Recent Enquiries & Bookings Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Enquiries */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-neutral-300 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
            <h3 className="font-serif text-lg font-black text-black">Recent Enquiries</h3>
            <Link to="/admin/enquiries" className="text-xs text-gold-800 font-black hover:underline">View All →</Link>
          </div>

          <div className="space-y-3">
            {recentEnquiries.map((enq) => (
              <div key={enq._id} className="p-4 rounded-xl bg-[#FAF8F5] border border-neutral-300 flex items-center justify-between text-xs">
                <div>
                  <span className="font-mono text-gold-800 font-black mr-2">{enq.enquiryId}</span>
                  <strong className="text-black font-black">{enq.customerDetails?.fullName}</strong>
                  <p className="text-[11px] text-neutral-700 font-semibold">{enq.eventType} • {enq.location?.city}</p>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10.5px] font-mono font-bold uppercase bg-gold-100 text-black border border-gold-600">
                  {enq.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-neutral-300 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
            <h3 className="font-serif text-lg font-black text-black">Confirmed Shoots</h3>
            <Link to="/admin/bookings" className="text-xs text-gold-800 font-black hover:underline">View All →</Link>
          </div>

          <div className="space-y-3">
            {recentBookings.map((bkg) => (
              <div key={bkg._id} className="p-4 rounded-xl bg-[#FAF8F5] border border-neutral-300 flex items-center justify-between text-xs">
                <div>
                  <span className="font-mono text-gold-800 font-black mr-2">{bkg.bookingNumber}</span>
                  <strong className="text-black font-black">{bkg.customer?.name}</strong>
                  <p className="text-[11px] text-neutral-700 font-semibold">{bkg.eventType} • {new Date(bkg.eventDate).toLocaleDateString()}</p>
                </div>
                <div className="text-right font-mono">
                  <span className="font-serif font-black text-black">₹{bkg.totalAmount?.toLocaleString('en-IN')}</span>
                  <p className="text-[10.5px] text-emerald-800 font-bold">{bkg.paymentStatus}</p>
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
