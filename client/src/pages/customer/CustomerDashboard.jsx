import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/client';
import {
  Calendar,
  Sparkles,
  CreditCard,
  FileText,
  Clock,
  ArrowRight,
  MapPin,
  Users,
  CheckCircle2,
  AlertCircle,
  Video,
} from 'lucide-react';

const CustomerDashboard = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomerOverview = async () => {
      try {
        const [bRes, gRes] = await Promise.allSettled([
          api.get('/bookings'),
          api.get('/galleries'),
        ]);
        if (bRes.status === 'fulfilled' && bRes.value.data) setBookings(bRes.value.data);
        if (gRes.status === 'fulfilled' && gRes.value.data) setGalleries(gRes.value.data);
      } catch (err) {
        console.error('Error fetching dashboard overview', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomerOverview();
  }, []);

  const activeBooking = bookings[0] || {
    bookingNumber: 'MLP-2026-9812',
    eventType: 'Royal Palace Destination Wedding',
    eventDate: '2026-11-18',
    venue: 'Ahilya Fort, Maheshwar Ghats',
    paymentStatus: 'Advance Received (60%)',
    assignedEmployees: [
      { _id: 'EMP-MLP-001', name: 'Aman Pawar', designation: 'Lead Cinematographer & Film Director', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80' },
      { _id: 'EMP-MLP-002', name: 'Bunny Singh', designation: 'Senior Candid Master & Royal Portraiture', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80' },
      { _id: 'EMP-MLP-003', name: 'Chinnu', designation: '4K Commercial Drone Cinematographer', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80' },
    ],
  };

  const getDaysLeft = (targetDate) => {
    if (!targetDate) return 85;
    const diff = new Date(targetDate) - new Date();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 0;
  };

  return (
    <div className="space-y-8 animate-fade-in text-white">
      {/* Welcome Banner */}
      <div className="relative rounded-3xl overflow-hidden p-6 sm:p-10 border border-gold-500/30 bg-[#141418] shadow-2xl">
        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="text-xs uppercase font-mono tracking-[0.25em] text-gold-400 font-bold block">
            Moonlight Client Concierge
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white">
            Welcome, {user?.name || 'Aarav & Ananya'}
          </h1>
          <p className="text-neutral-300 text-xs sm:text-sm font-light leading-relaxed">
            Your personalized sanctuary for tracking shoot preparations, accessing high-resolution private galleries, managing payments, and viewing 4K wedding films.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-mono">
            <span className="px-3.5 py-1.5 rounded-full bg-gold-500/15 text-gold-300 border border-gold-500/40 font-bold">
              Booking Ref: {activeBooking.bookingNumber}
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-black/60 border border-white/10 text-neutral-300">
              {activeBooking.eventType}
            </span>
          </div>
        </div>
      </div>

      {/* Countdown Card & Active Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Days Left Card */}
        <div className="bg-[#141418] rounded-2xl p-6 flex items-center justify-between border border-white/10 shadow-lg">
          <div>
            <span className="text-[10.5px] uppercase tracking-wider text-gold-400 font-bold font-mono block">Wedding Countdown</span>
            <h3 className="font-serif text-4xl font-bold text-white mt-1">
              {getDaysLeft(activeBooking.eventDate)} <span className="text-sm font-sans font-normal text-neutral-400">Days</span>
            </h3>
            <p className="text-xs text-neutral-400 font-light mt-1 flex items-center">
              <MapPin className="w-3.5 h-3.5 mr-1 text-gold-400" />
              {activeBooking.venue}
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-gold-500/15 border border-gold-500/40 flex items-center justify-center text-gold-400">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        {/* Shoot Crew Card */}
        <div className="bg-[#141418] rounded-2xl p-6 flex flex-col justify-between border border-white/10 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-[10.5px] uppercase tracking-wider text-gold-400 font-bold font-mono">Assigned Shoot Crew</span>
            <span className="text-xs bg-emerald-500/15 text-emerald-400 border border-emerald-500/40 px-2 py-0.5 rounded-full font-mono font-bold">
              3 Masters
            </span>
          </div>
          <div className="flex items-center space-x-2 my-2">
            {activeBooking.assignedEmployees?.map((emp, i) => (
              <img
                key={i}
                src={emp.avatar}
                alt={emp.name}
                title={`${emp.name} (${emp.designation})`}
                className="w-10 h-10 rounded-full object-cover border-2 border-gold-400"
              />
            ))}
          </div>
          <p className="text-xs text-neutral-400 font-light">Lead Cinematographer, Candid Master & Drone Pilot</p>
        </div>

        {/* Payment & Invoices */}
        <div className="bg-[#141418] rounded-2xl p-6 flex flex-col justify-between border border-white/10 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-[10.5px] uppercase tracking-wider text-gold-400 font-bold font-mono">Payment Status</span>
            <span className="text-xs text-emerald-400 font-mono font-bold">{activeBooking.paymentStatus}</span>
          </div>
          <div className="my-2">
            <span className="text-xs text-neutral-400 block font-mono">Total Commission Value</span>
            <h4 className="font-serif text-2xl font-bold text-gold-300">₹5,00,000</h4>
          </div>
          <Link
            to="/customer/payments"
            className="text-xs text-gold-300 hover:text-white font-bold flex items-center"
          >
            View GST Receipts & Invoices <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Link>
        </div>
      </div>

      {/* Quick Action Navigation Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link
          to="/customer/gallery"
          className="p-6 rounded-2xl bg-[#141418] border border-white/10 hover:border-gold-500/50 shadow-lg hover:shadow-2xl transition-all space-y-3 group"
        >
          <div className="w-10 h-10 rounded-xl bg-gold-500/15 border border-gold-500/40 flex items-center justify-center text-gold-400 group-hover:scale-110 transition-transform">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-lg font-bold text-white group-hover:text-gold-300 transition-colors">
            Private 4K Galleries
          </h3>
          <p className="text-xs text-neutral-400 font-light">
            View high-res wedding photos, approve album selections & download originals.
          </p>
        </Link>

        <Link
          to="/customer/videos"
          className="p-6 rounded-2xl bg-[#141418] border border-white/10 hover:border-gold-500/50 shadow-lg hover:shadow-2xl transition-all space-y-3 group"
        >
          <div className="w-10 h-10 rounded-xl bg-gold-500/15 border border-gold-500/40 flex items-center justify-center text-gold-400 group-hover:scale-110 transition-transform">
            <Video className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-lg font-bold text-white group-hover:text-gold-300 transition-colors">
            Wedding Cinema Films
          </h3>
          <p className="text-xs text-neutral-400 font-light">
            Stream full 4K documentary wedding films, Instagram teasers, and trailers.
          </p>
        </Link>

        <Link
          to="/customer/invoices"
          className="p-6 rounded-2xl bg-[#141418] border border-white/10 hover:border-gold-500/50 shadow-lg hover:shadow-2xl transition-all space-y-3 group"
        >
          <div className="w-10 h-10 rounded-xl bg-gold-500/15 border border-gold-500/40 flex items-center justify-center text-gold-400 group-hover:scale-110 transition-transform">
            <FileText className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-lg font-bold text-white group-hover:text-gold-300 transition-colors">
            Invoices & GST Receipts
          </h3>
          <p className="text-xs text-neutral-400 font-light">
            Download stamped tax invoices, payment schedule breakdowns, and agreements.
          </p>
        </Link>

        <Link
          to="/customer/bookings"
          className="p-6 rounded-2xl bg-[#141418] border border-white/10 hover:border-gold-500/50 shadow-lg hover:shadow-2xl transition-all space-y-3 group"
        >
          <div className="w-10 h-10 rounded-xl bg-gold-500/15 border border-gold-500/40 flex items-center justify-center text-gold-400 group-hover:scale-110 transition-transform">
            <Calendar className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-lg font-bold text-white group-hover:text-gold-300 transition-colors">
            Ceremony Timeline
          </h3>
          <p className="text-xs text-neutral-400 font-light">
            Review event dates, shoot timings, call sheets, and shot checklists.
          </p>
        </Link>
      </div>
    </div>
  );
};

export default CustomerDashboard;
