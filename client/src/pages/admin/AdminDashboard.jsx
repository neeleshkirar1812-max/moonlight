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
    <div className="space-y-8 animate-fade-in text-neutral-900">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-mono tracking-widest text-amber-800 font-bold block">
            Executive Operations
          </span>
          <h1 className="font-serif text-2xl sm:text-4xl font-bold text-neutral-900">Studio Performance Dashboard</h1>
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <Link
            to="/admin/enquiries"
            className="px-4 py-2 rounded-full bg-gold-gradient text-neutral-950 font-extrabold text-xs uppercase tracking-wider shadow-md hover:brightness-105 transition-all btn-shimmer min-h-[44px] flex items-center"
          >
            Review Enquiries
          </Link>
          <Link
            to="/admin/portfolio"
            className="px-4 py-2 rounded-full bg-white hover:bg-neutral-50 border border-neutral-300 text-xs font-bold text-neutral-800 uppercase tracking-wider shadow-sm transition-all min-h-[44px] flex items-center"
          >
            + Upload Portfolio
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Revenue */}
        <div className="bg-white rounded-2xl p-6 border border-amber-900/15 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10.5px] uppercase tracking-wider text-neutral-500 font-mono">Total Revenue Captured</span>
            <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-300 flex items-center justify-center text-emerald-700 shadow-sm">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <h3 className="font-serif text-3xl font-bold text-amber-900 mt-2">
            ₹{kpis.totalRevenue?.toLocaleString('en-IN')}
          </h3>
          <p className="text-xs text-emerald-700 font-mono mt-1 flex items-center">
            <TrendingUp className="w-3 h-3 mr-1" /> +24% YoY Growth
          </p>
        </div>

        {/* Confirmed Shoots */}
        <div className="bg-white rounded-2xl p-6 border border-amber-900/15 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10.5px] uppercase tracking-wider text-neutral-500 font-mono">Confirmed Shoots</span>
            <div className="w-8 h-8 rounded-full bg-amber-50 border border-amber-300 flex items-center justify-center text-amber-800 shadow-sm">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <h3 className="font-serif text-3xl font-bold text-neutral-900 mt-2">
            {kpis.confirmedBookings}
          </h3>
          <p className="text-xs text-neutral-500 font-mono mt-1">2026 – 2027 Season</p>
        </div>

        {/* Active Enquiries */}
        <div className="bg-white rounded-2xl p-6 border border-amber-900/15 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10.5px] uppercase tracking-wider text-neutral-500 font-mono">Inquiry Pipeline</span>
            <div className="w-8 h-8 rounded-full bg-amber-50 border border-amber-300 flex items-center justify-center text-amber-800 shadow-sm">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <h3 className="font-serif text-3xl font-bold text-neutral-900 mt-2">
            {kpis.totalEnquiries}
          </h3>
          <p className="text-xs text-amber-800 font-mono mt-1 font-semibold">{kpis.newEnquiries} New Leads Pending</p>
        </div>

        {/* Crew Dispatched */}
        <div className="bg-white rounded-2xl p-6 border border-amber-900/15 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10.5px] uppercase tracking-wider text-neutral-500 font-mono">Crew Members</span>
            <div className="w-8 h-8 rounded-full bg-purple-50 border border-purple-300 flex items-center justify-center text-purple-700 shadow-sm">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <h3 className="font-serif text-3xl font-bold text-neutral-900 mt-2">
            {kpis.totalEmployees}
          </h3>
          <p className="text-xs text-neutral-500 font-mono mt-1">Cinematographers & Editors</p>
        </div>
      </div>

      {/* Revenue Graph & Quick Logs Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Revenue Velocity Bar Chart */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-amber-900/15 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs uppercase font-mono tracking-wider text-amber-800 font-bold">Revenue Velocity</span>
              <h3 className="font-serif text-2xl font-bold text-neutral-900">Monthly Booking Volume</h3>
            </div>
            <span className="text-xs font-mono text-neutral-500">INR Lakhs</span>
          </div>

          {/* Bar Chart Visualization */}
          <div className="h-64 flex items-end justify-between gap-3 pt-6 pb-2 border-b border-neutral-200">
            {monthlyStats.map((item, idx) => {
              const heightPercent = Math.min(100, Math.round((item.revenue / 1200000) * 100));
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                  <span className="text-[10px] font-mono text-neutral-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    ₹{(item.revenue / 100000).toFixed(1)}L
                  </span>
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className="w-full rounded-t-lg bg-gold-gradient hover:brightness-105 transition-all shadow-sm"
                  />
                  <span className="text-xs font-mono text-neutral-700 font-bold">{item.month}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Enquiries Pipeline */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-amber-900/15 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-xl font-bold text-neutral-900">Latest Inquiries</h3>
            <Link to="/admin/enquiries" className="text-xs text-amber-800 hover:text-amber-950 font-bold">
              View All →
            </Link>
          </div>

          <div className="space-y-3">
            {recentEnquiries.map((enq) => (
              <div
                key={enq._id}
                className="p-4 rounded-2xl bg-amber-50/50 border border-amber-900/10 flex items-center justify-between text-xs"
              >
                <div>
                  <h4 className="font-bold text-neutral-900">{enq.customerDetails?.fullName}</h4>
                  <p className="text-neutral-600 text-[11px] mt-0.5">{enq.eventType} • {enq.location?.city}</p>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase bg-amber-100 text-amber-900 border border-amber-300">
                  {enq.status.replace('_', ' ')}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
