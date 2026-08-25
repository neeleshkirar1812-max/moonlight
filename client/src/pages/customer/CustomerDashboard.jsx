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
        if (bRes.status === 'fulfilled') setBookings(bRes.value.data || []);
        if (gRes.status === 'fulfilled') setGalleries(gRes.value.data || []);
      } catch (err) {
        console.error('Error fetching dashboard overview', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomerOverview();
  }, []);

  const activeBooking = bookings[0] || null;

  // Calculate wedding countdown in days
  const getDaysLeft = (targetDate) => {
    if (!targetDate) return null;
    const diff = new Date(targetDate) - new Date();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 0;
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Banner */}
      <div className="relative rounded-3xl overflow-hidden p-8 sm:p-12 border border-gold-500/40 bg-gradient-to-r from-obsidian-400 via-obsidian-300 to-obsidian-500 shadow-2xl">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial-gold opacity-25 pointer-events-none" />
        
        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="text-xs uppercase tracking-[0.3em] text-gold-400 font-semibold block">
            Client Concierge Suite
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white">
            Welcome, {user?.name}
          </h1>
          <p className="text-neutral-300 text-xs sm:text-sm font-light leading-relaxed">
            Your personalized sanctuary for tracking shoot preparations, accessing high-resolution private galleries, managing payments, and viewing wedding films.
          </p>

          {activeBooking && (
            <div className="pt-4 flex flex-wrap items-center gap-4 text-xs font-mono">
              <span className="px-3.5 py-1.5 rounded-full bg-gold-500/20 text-gold-300 border border-gold-500/40">
                Booking Ref: {activeBooking.bookingNumber}
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-white/10 text-white">
                {activeBooking.eventType}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Countdown Card & Active Status */}
      {activeBooking && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Days Left Card */}
          <div className="luxury-card rounded-2xl p-6 flex items-center justify-between border border-white/10">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-neutral-400 block">Wedding Countdown</span>
              <h3 className="font-serif text-4xl font-bold text-gold-300 mt-1">
                {getDaysLeft(activeBooking.eventDate)} <span className="text-sm font-sans text-neutral-400">Days</span>
              </h3>
              <p className="text-xs text-neutral-400 mt-1">{new Date(activeBooking.eventDate).toLocaleDateString('en-US', { dateStyle: 'long' })}</p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400">
              <Clock className="w-7 h-7" />
            </div>
          </div>

          {/* Payment Status Card */}
          <div className="luxury-card rounded-2xl p-6 flex items-center justify-between border border-white/10">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-neutral-400 block">Payment Status</span>
              <h3 className="font-serif text-2xl font-bold text-white mt-1">
                {activeBooking.paymentStatus === 'PAID' ? 'Fully Settled' : activeBooking.paymentStatus === 'PARTIAL' ? 'Advance Paid' : 'Unpaid'}
              </h3>
              <p className="text-xs text-neutral-400 mt-1">
                Remaining: <strong className="text-gold-300">₹{activeBooking.remainingAmount?.toLocaleString('en-IN')}</strong>
              </p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400">
              <CreditCard className="w-7 h-7" />
            </div>
          </div>

          {/* Private Album Quick Link */}
          <div className="luxury-card rounded-2xl p-6 flex items-center justify-between border border-white/10">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-neutral-400 block">Private Albums</span>
              <h3 className="font-serif text-2xl font-bold text-white mt-1">
                {galleries.length} {galleries.length === 1 ? 'Album Ready' : 'Albums Ready'}
              </h3>
              <Link to="/customer/gallery" className="text-xs text-gold-400 hover:underline mt-1 block">
                View & Download Photos →
              </Link>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400">
              <Sparkles className="w-7 h-7" />
            </div>
          </div>
        </div>
      )}

      {/* Quick Action Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link
          to="/customer/bookings"
          className="luxury-card rounded-2xl p-6 group block border border-white/10 space-y-3"
        >
          <Calendar className="w-6 h-6 text-gold-400 group-hover:scale-110 transition-transform" />
          <h4 className="font-serif text-base font-bold text-white group-hover:text-gold-300 transition-colors">
            My Bookings & Timeline
          </h4>
          <p className="text-xs text-neutral-400 font-light">View shoot itineraries, assigned crew, and deliverable checklists.</p>
        </Link>

        <Link
          to="/customer/gallery"
          className="luxury-card rounded-2xl p-6 group block border border-white/10 space-y-3"
        >
          <Sparkles className="w-6 h-6 text-gold-400 group-hover:scale-110 transition-transform" />
          <h4 className="font-serif text-base font-bold text-white group-hover:text-gold-300 transition-colors">
            Private Photo Albums
          </h4>
          <p className="text-xs text-neutral-400 font-light">Enter PIN, curate favorites for album printing, and download master files.</p>
        </Link>

        <Link
          to="/customer/payments"
          className="luxury-card rounded-2xl p-6 group block border border-white/10 space-y-3"
        >
          <CreditCard className="w-6 h-6 text-gold-400 group-hover:scale-110 transition-transform" />
          <h4 className="font-serif text-base font-bold text-white group-hover:text-gold-300 transition-colors">
            Payments & Razorpay
          </h4>
          <p className="text-xs text-neutral-400 font-light">Pay advance or balance securely via UPI, Card, or NetBanking.</p>
        </Link>

        <Link
          to="/customer/invoices"
          className="luxury-card rounded-2xl p-6 group block border border-white/10 space-y-3"
        >
          <FileText className="w-6 h-6 text-gold-400 group-hover:scale-110 transition-transform" />
          <h4 className="font-serif text-base font-bold text-white group-hover:text-gold-300 transition-colors">
            Official GST Invoices
          </h4>
          <p className="text-xs text-neutral-400 font-light">Download signed PDF invoices and tax receipts for your records.</p>
        </Link>
      </div>

      {/* Assigned Production Team */}
      {activeBooking && activeBooking.assignedEmployees?.length > 0 && (
        <div className="luxury-card rounded-3xl p-8 border border-white/10 space-y-6">
          <div>
            <span className="text-xs uppercase tracking-wider text-gold-400 font-semibold block">Production Crew</span>
            <h3 className="font-serif text-2xl font-bold text-white">Your Assigned Masters</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeBooking.assignedEmployees.map((emp) => (
              <div key={emp._id} className="p-4 rounded-2xl bg-obsidian-500 border border-white/5 flex items-center space-x-3.5">
                <img
                  src={emp.avatar || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80'}
                  alt={emp.name}
                  className="w-12 h-12 rounded-full object-cover border border-gold-500/50"
                />
                <div>
                  <h4 className="text-sm font-bold text-white">{emp.name}</h4>
                  <p className="text-[11px] text-gold-300 font-mono">{emp.designation || 'Master Specialist'}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerDashboard;
