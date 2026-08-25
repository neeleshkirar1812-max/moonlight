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
      { _id: 'e1', name: 'Rohan Verma', designation: 'Lead Cinematographer', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80' },
      { _id: 'e2', name: 'Priya Mehta', designation: 'Senior Candid Master', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80' },
      { _id: 'e3', name: 'Kabir Singh', designation: '4K Drone Pilot', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80' },
    ],
  };

  const getDaysLeft = (targetDate) => {
    if (!targetDate) return 85;
    const diff = new Date(targetDate) - new Date();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 0;
  };

  return (
    <div className="space-y-8 animate-fade-in text-black">
      {/* Welcome Banner */}
      <div className="relative rounded-3xl overflow-hidden p-6 sm:p-10 border-2 border-neutral-300 bg-white shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="text-xs uppercase font-mono tracking-[0.25em] text-gold-800 font-black block">
            Moonlight Client Concierge
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-black text-black">
            Welcome, {user?.name || 'Aarav & Ananya'}
          </h1>
          <p className="text-neutral-800 text-xs sm:text-sm font-semibold leading-relaxed">
            Your personalized sanctuary for tracking shoot preparations, accessing high-resolution private galleries, managing payments, and viewing 4K wedding films.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-mono">
            <span className="px-3.5 py-1.5 rounded-full bg-gold-100 text-black border-2 border-gold-600 font-black">
              Booking Ref: {activeBooking.bookingNumber}
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-black text-white font-bold">
              {activeBooking.eventType}
            </span>
          </div>
        </div>
      </div>

      {/* Countdown Card & Active Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Days Left Card */}
        <div className="bg-white rounded-2xl p-6 flex items-center justify-between border-2 border-neutral-300 shadow-md">
          <div>
            <span className="text-[10.5px] uppercase tracking-wider text-neutral-600 font-bold font-mono block">Wedding Countdown</span>
            <h3 className="font-serif text-4xl font-black text-black mt-1">
              {getDaysLeft(activeBooking.eventDate)} <span className="text-sm font-sans font-bold text-neutral-600">Days</span>
            </h3>
            <p className="text-xs text-neutral-700 font-semibold mt-1 flex items-center">
              <MapPin className="w-3.5 h-3.5 mr-1 text-gold-800" />
              {activeBooking.venue}
            </p>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-gold-50 border-2 border-gold-600 flex items-center justify-center text-black">
            <Clock className="w-7 h-7" />
          </div>
        </div>

        {/* Payment Status Card */}
        <div className="bg-white rounded-2xl p-6 flex items-center justify-between border-2 border-neutral-300 shadow-md">
          <div>
            <span className="text-[10.5px] uppercase tracking-wider text-neutral-600 font-bold font-mono block">Payment Status</span>
            <h3 className="font-serif text-2xl font-black text-emerald-800 mt-1">
              Advance Cleared
            </h3>
            <p className="text-xs text-neutral-700 font-semibold mt-1">GST Tax Invoice #MLP-INV-841</p>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 border-2 border-emerald-600 flex items-center justify-center text-emerald-800">
            <CheckCircle2 className="w-7 h-7" />
          </div>
        </div>

        {/* Gallery Albums */}
        <div className="bg-white rounded-2xl p-6 flex items-center justify-between border-2 border-neutral-300 shadow-md">
          <div>
            <span className="text-[10.5px] uppercase tracking-wider text-neutral-600 font-bold font-mono block">Private Archives</span>
            <h3 className="font-serif text-2xl font-black text-black mt-1">
              3 Albums Ready
            </h3>
            <Link to="/customer/gallery" className="text-xs text-gold-800 font-black hover:underline mt-1 block">
              View & Download 4K Photos →
            </Link>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-gold-50 border-2 border-gold-600 flex items-center justify-center text-gold-800">
            <Sparkles className="w-7 h-7" />
          </div>
        </div>
      </div>

      {/* Quick Action Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link
          to="/customer/bookings"
          className="bg-white rounded-2xl p-6 group block border-2 border-neutral-300 hover:border-black shadow-md space-y-2 transition-all hover:shadow-xl"
        >
          <Calendar className="w-6 h-6 text-gold-700 group-hover:scale-110 transition-transform" />
          <h4 className="font-serif text-lg font-black text-black group-hover:text-gold-800 transition-colors">
            My Bookings & Timeline
          </h4>
          <p className="text-xs text-neutral-700 font-medium">View shoot itineraries, assigned crew, and deliverable checklists.</p>
        </Link>

        <Link
          to="/customer/gallery"
          className="bg-white rounded-2xl p-6 group block border-2 border-neutral-300 hover:border-black shadow-md space-y-2 transition-all hover:shadow-xl"
        >
          <Sparkles className="w-6 h-6 text-gold-700 group-hover:scale-110 transition-transform" />
          <h4 className="font-serif text-lg font-black text-black group-hover:text-gold-800 transition-colors">
            Private Photo Albums
          </h4>
          <p className="text-xs text-neutral-700 font-medium">Enter PIN, curate favorites for album printing, and download master files.</p>
        </Link>

        <Link
          to="/customer/payments"
          className="bg-white rounded-2xl p-6 group block border-2 border-neutral-300 hover:border-black shadow-md space-y-2 transition-all hover:shadow-xl"
        >
          <CreditCard className="w-6 h-6 text-gold-700 group-hover:scale-110 transition-transform" />
          <h4 className="font-serif text-lg font-black text-black group-hover:text-gold-800 transition-colors">
            Payments & Razorpay
          </h4>
          <p className="text-xs text-neutral-700 font-medium">Pay advance or balance securely via UPI, Card, or NetBanking.</p>
        </Link>

        <Link
          to="/customer/invoices"
          className="bg-white rounded-2xl p-6 group block border-2 border-neutral-300 hover:border-black shadow-md space-y-2 transition-all hover:shadow-xl"
        >
          <FileText className="w-6 h-6 text-gold-700 group-hover:scale-110 transition-transform" />
          <h4 className="font-serif text-lg font-black text-black group-hover:text-gold-800 transition-colors">
            Official GST Invoices
          </h4>
          <p className="text-xs text-neutral-700 font-medium">Download signed PDF invoices and tax receipts for your records.</p>
        </Link>
      </div>

      {/* Assigned Production Team */}
      {activeBooking.assignedEmployees?.length > 0 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-neutral-300 shadow-xl space-y-6">
          <div>
            <span className="text-xs uppercase font-mono tracking-wider text-gold-800 font-black block">Production Crew</span>
            <h3 className="font-serif text-2xl font-black text-black">Your Assigned Masters</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeBooking.assignedEmployees.map((emp) => (
              <div key={emp._id} className="p-4 rounded-2xl bg-[#FAF8F5] border-2 border-neutral-300 flex items-center space-x-3.5 shadow-sm">
                <img
                  src={emp.avatar}
                  alt={emp.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-black"
                />
                <div>
                  <h4 className="text-sm font-black text-black">{emp.name}</h4>
                  <p className="text-xs text-gold-800 font-mono font-bold">{emp.designation}</p>
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
