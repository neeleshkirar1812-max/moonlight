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
            to="/customer/invoices"
            className="text-xs text-gold-300 hover:text-white font-bold flex items-center"
          >
            View GST Invoices & Receipts <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Link>
        </div>
      </div>

      {/* Live Order & Wedding Shoot Tracking Bar */}
      <div className="bg-[#141418] rounded-3xl p-4 sm:p-8 border border-gold-500/30 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-gold-400 font-bold block">
                Live Shoot & Film Tracker
              </span>
            </div>
            <h2 className="font-serif text-lg sm:text-2xl font-bold text-white mt-1">
              Order Lifecycle & Production Status
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] sm:text-xs px-3 py-1.5 rounded-full bg-gold-500/15 border border-gold-500/40 text-gold-300 font-bold">
              Current Stage: {(activeBooking.orderStage || 'SHOOT_SCHEDULED').replace(/_/g, ' ')}
            </span>
          </div>
        </div>

        {/* 9-Stage Progress Steps */}
        <div className="relative pt-2">
          {/* Connecting Track Line */}
          <div className="hidden lg:block absolute top-[24px] left-[4%] right-[4%] h-[3px] bg-white/10 z-0">
            <div
              className="h-full bg-gradient-to-r from-gold-500 to-amber-400 transition-all duration-700"
              style={{
                width: `${
                  (([
                    'ENQUIRY_RECEIVED',
                    'QUOTATION_SENT',
                    'ADVANCE_PAID',
                    'CONFIRMED',
                    'SHOOT_SCHEDULED',
                    'SHOOT_COMPLETED',
                    'EDITING',
                    'DELIVERED',
                    'CLOSED',
                  ].indexOf(activeBooking.orderStage || 'SHOOT_SCHEDULED') +
                    0.5) /
                    9) *
                  100
                }%`,
              }}
            ></div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-3 sm:gap-4 relative z-10">
            {[
              { key: 'ENQUIRY_RECEIVED', label: 'Enquiry Received', desc: 'Date checked' },
              { key: 'QUOTATION_SENT', label: 'Quotation Sent', desc: 'Package offered' },
              { key: 'ADVANCE_PAID', label: 'Advance Paid', desc: 'Dates locked' },
              { key: 'CONFIRMED', label: 'Confirmed', desc: 'Crew booked' },
              { key: 'SHOOT_SCHEDULED', label: 'Shoot Scheduled', desc: 'Permits & itinerary' },
              { key: 'SHOOT_COMPLETED', label: 'Shoot Completed', desc: 'RAW footage stored' },
              { key: 'EDITING', label: 'Editing & Color', desc: 'Grading & audio' },
              { key: 'DELIVERED', label: 'Delivered', desc: '4K films & albums' },
              { key: 'CLOSED', label: 'Completed', desc: 'Order archived' },
            ].map((step, idx) => {
              const stageList = [
                'ENQUIRY_RECEIVED',
                'QUOTATION_SENT',
                'ADVANCE_PAID',
                'CONFIRMED',
                'SHOOT_SCHEDULED',
                'SHOOT_COMPLETED',
                'EDITING',
                'DELIVERED',
                'CLOSED',
              ];
              const currentIdx = stageList.indexOf(activeBooking.orderStage || 'SHOOT_SCHEDULED');
              const isPassed = idx < currentIdx;
              const isCurrent = idx === currentIdx;

              return (
                <div key={step.key} className="flex flex-col items-center text-center space-y-1.5 sm:space-y-2">
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 shadow-md ${
                      isCurrent
                        ? 'bg-gold-500 text-black ring-4 ring-gold-500/30 scale-105 sm:scale-110'
                        : isPassed
                        ? 'bg-emerald-500 text-white'
                        : 'bg-[#1e1e24] text-neutral-400 border border-white/10'
                    }`}
                  >
                    {isPassed ? (
                      <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    ) : isCurrent ? (
                      <span className="font-mono text-xs sm:text-sm">{idx + 1}</span>
                    ) : (
                      <span className="font-mono text-[11px] sm:text-xs text-neutral-400">{idx + 1}</span>
                    )}
                  </div>
                  <div>
                    <h4
                      className={`text-[11px] sm:text-xs font-bold leading-tight ${
                        isCurrent ? 'text-gold-300' : isPassed ? 'text-white' : 'text-neutral-400'
                      }`}
                    >
                      {step.label}
                    </h4>
                    <p className="text-[9px] sm:text-[10px] text-neutral-400 font-light mt-0.5">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Current Stage Explanation Note */}
        <div className="p-4 rounded-2xl bg-black/40 border border-gold-500/20 flex items-start space-x-3">
          <Sparkles className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
          <div className="text-xs text-neutral-300 leading-relaxed">
            <strong className="text-gold-300 font-bold block mb-0.5">
              Production Update for {activeBooking.bookingNumber}:
            </strong>
            {activeBooking.orderStage === 'EDITING'
              ? 'Your 4K cinema feature film and photo heirlooms are in post-production. Our master colorists are grading on DaVinci Resolve with 35mm film emulation.'
              : activeBooking.orderStage === 'SHOOT_COMPLETED'
              ? 'Wedding ceremonies have been filmed! 4TB of high-resolution master footage is safely backed up in our studio archives.'
              : activeBooking.orderStage === 'DELIVERED'
              ? 'Your full wedding collection is live! You can stream films, download photo galleries, and approve album print layouts.'
              : 'Our production crew is fully prepped with 4K cinema cameras, aerial drones, and lighting packages for your wedding dates.'}
          </div>
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
