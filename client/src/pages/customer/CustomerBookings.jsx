import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/client';
import { CardSkeleton } from '../../components/common/SkeletonLoader';
import { Calendar, MapPin, CheckCircle2, Clock, Users, FileText, CreditCard, Sparkles } from 'lucide-react';

const CustomerBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await api.get('/bookings');
        setBookings(res.data || []);
      } catch (err) {
        console.error('Error fetching customer bookings', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold block">
          Confirmed Commissions
        </span>
        <h1 className="font-serif text-3xl font-bold text-white">My Wedding Bookings</h1>
      </div>

      {loading ? (
        <CardSkeleton count={2} height="h-96" />
      ) : bookings.length === 0 ? (
        <div className="text-center py-20 bg-obsidian-400 rounded-3xl border border-white/10 space-y-4">
          <Calendar className="w-10 h-10 text-gold-400 mx-auto opacity-50" />
          <h3 className="font-serif text-2xl text-white">No Active Bookings</h3>
          <p className="text-xs text-neutral-400 max-w-sm mx-auto">
            You currently have no confirmed bookings. Submit an enquiry to reserve your dates with our masters.
          </p>
          <Link
            to="/enquiry"
            className="inline-flex items-center px-6 py-3 rounded-full bg-gold-gradient text-black font-bold text-xs uppercase tracking-wider"
          >
            Plan an Event
          </Link>
        </div>
      ) : (
        <div className="space-y-8">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="luxury-card rounded-3xl p-8 sm:p-10 border border-white/10 space-y-8"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div>
                  <span className="text-[11px] font-mono text-gold-400 uppercase tracking-widest">
                    Reference: {booking.bookingNumber}
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
                    {booking.eventType}
                  </h2>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-400 mt-2">
                    <span className="flex items-center"><Calendar className="w-3.5 h-3.5 mr-1 text-gold-400" /> {new Date(booking.eventDate).toLocaleDateString('en-US', { dateStyle: 'full' })}</span>
                    <span className="flex items-center"><MapPin className="w-3.5 h-3.5 mr-1 text-gold-400" /> {booking.location?.venue || booking.location?.city}</span>
                  </div>
                </div>

                <div className="flex flex-col items-start sm:items-end space-y-1.5">
                  <span className="px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-semibold uppercase tracking-wider font-mono">
                    {booking.bookingStatus}
                  </span>
                  <span className="text-xs text-neutral-400">
                    Payment: <strong className="text-gold-300">{booking.paymentStatus}</strong>
                  </span>
                </div>
              </div>

              {/* Package & Financial Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-5 rounded-2xl bg-obsidian-500 border border-white/5 space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-neutral-400">Total Investment</span>
                  <p className="font-serif text-2xl font-bold text-white">₹{booking.totalAmount?.toLocaleString('en-IN')}</p>
                  <p className="text-[11px] text-neutral-400">Includes taxes & deliverables</p>
                </div>
                <div className="p-5 rounded-2xl bg-obsidian-500 border border-white/5 space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-neutral-400">Advance Paid</span>
                  <p className="font-serif text-2xl font-bold text-emerald-400">₹{booking.advanceAmount?.toLocaleString('en-IN')}</p>
                  <p className="text-[11px] text-neutral-400">Received via Razorpay</p>
                </div>
                <div className="p-5 rounded-2xl bg-obsidian-500 border border-white/5 space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-neutral-400">Balance Due</span>
                  <p className="font-serif text-2xl font-bold text-gold-300">₹{booking.remainingAmount?.toLocaleString('en-IN')}</p>
                  {booking.remainingAmount > 0 ? (
                    <Link to="/customer/payments" className="text-[11px] text-gold-400 hover:underline">
                      Pay Remaining Balance →
                    </Link>
                  ) : (
                    <p className="text-[11px] text-emerald-400">Full amount settled</p>
                  )}
                </div>
              </div>

              {/* Deliverables Checklist */}
              {booking.deliverablesStatus?.length > 0 && (
                <div className="space-y-4 pt-4 border-t border-white/10">
                  <h3 className="font-serif text-lg font-bold text-white">Deliverables & Post-Production Status</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    {booking.deliverablesStatus.map((del, dIdx) => (
                      <div key={dIdx} className="p-3.5 rounded-xl bg-obsidian-500/70 border border-white/5 flex items-center justify-between">
                        <span className="text-neutral-200">{del.item}</span>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold uppercase ${
                          del.status === 'Ready' || del.status === 'Delivered'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        }`}>
                          {del.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Day Schedule Timeline */}
              {booking.scheduleTimeline?.length > 0 && (
                <div className="space-y-4 pt-4 border-t border-white/10">
                  <h3 className="font-serif text-lg font-bold text-white">Event Itinerary & Timeline</h3>
                  <div className="space-y-2.5 text-xs">
                    {booking.scheduleTimeline.map((item, sIdx) => (
                      <div key={sIdx} className="p-3 rounded-xl bg-obsidian-500 border border-white/5 flex items-center space-x-4">
                        <span className="font-mono text-gold-400 font-bold w-24 shrink-0">{item.time}</span>
                        <span className="text-white font-semibold flex-1">{item.event}</span>
                        <span className="text-neutral-400 text-[11px] hidden sm:inline">{item.notes}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomerBookings;
