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
    <div className="space-y-8 animate-fade-in text-neutral-900">
      <div className="border-b border-amber-900/10 pb-6">
        <span className="text-xs uppercase tracking-widest text-amber-700 font-bold block">
          Confirmed Commissions
        </span>
        <h1 className="font-serif text-3xl font-bold text-neutral-900 mt-1">My Wedding Bookings</h1>
        <p className="text-neutral-600 text-xs font-light mt-1">
          Review your shoot schedule, production timeline, package deliverables, and financial ledger.
        </p>
      </div>

      {loading ? (
        <CardSkeleton count={2} height="h-96" />
      ) : bookings.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-amber-900/15 space-y-4 shadow-sm">
          <Calendar className="w-10 h-10 text-amber-600 mx-auto opacity-70" />
          <h3 className="font-serif text-2xl text-neutral-900 font-bold">No Active Bookings</h3>
          <p className="text-xs text-neutral-500 max-w-sm mx-auto">
            You currently have no confirmed bookings. Submit an enquiry to reserve your dates with our masters.
          </p>
          <Link
            to="/enquiry"
            className="inline-flex items-center px-6 py-3 rounded-full bg-gold-gradient text-neutral-950 font-bold text-xs uppercase tracking-wider shadow-gold-subtle hover:scale-105 transition-all"
          >
            Plan an Event
          </Link>
        </div>
      ) : (
        <div className="space-y-8">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white rounded-3xl p-6 sm:p-10 border border-amber-900/15 shadow-sm space-y-8"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-amber-900/10">
                <div>
                  <span className="text-[11px] font-mono text-amber-800 uppercase tracking-widest font-bold bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200">
                    Reference: {booking.bookingNumber}
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900 mt-2">
                    {booking.eventType}
                  </h2>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-600 mt-2 font-mono">
                    <span className="flex items-center"><Calendar className="w-3.5 h-3.5 mr-1 text-amber-600" /> {new Date(booking.eventDate).toLocaleDateString('en-US', { dateStyle: 'full' })}</span>
                    <span className="flex items-center"><MapPin className="w-3.5 h-3.5 mr-1 text-amber-600" /> {booking.location?.venue || booking.location?.city}</span>
                  </div>
                </div>

                <div className="flex flex-col items-start sm:items-end space-y-1.5">
                  <span className="px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-bold uppercase tracking-wider font-mono">
                    {booking.bookingStatus}
                  </span>
                  <span className="text-xs text-neutral-500 font-mono">
                    Payment: <strong className="text-amber-900">{booking.paymentStatus}</strong>
                  </span>
                </div>
              </div>

              {/* Package & Financial Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-neutral-500 font-bold">Total Investment</span>
                  <p className="font-serif text-2xl font-bold text-neutral-900">₹{booking.totalAmount?.toLocaleString('en-IN')}</p>
                  <p className="text-[11px] text-neutral-500">Includes taxes & deliverables</p>
                </div>
                <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-neutral-500 font-bold">Advance Paid</span>
                  <p className="font-serif text-2xl font-bold text-emerald-700">₹{booking.advanceAmount?.toLocaleString('en-IN')}</p>
                  <p className="text-[11px] text-neutral-500">Received via Razorpay</p>
                </div>
                <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-neutral-500 font-bold">Balance Due</span>
                  <p className="font-serif text-2xl font-bold text-amber-900">₹{booking.remainingAmount?.toLocaleString('en-IN')}</p>
                  {booking.remainingAmount > 0 ? (
                    <Link to="/customer/payments" className="text-[11px] text-amber-800 font-bold hover:underline">
                      Pay Remaining Balance →
                    </Link>
                  ) : (
                    <p className="text-[11px] text-emerald-700 font-semibold">Full amount settled</p>
                  )}
                </div>
              </div>

              {/* Deliverables Checklist */}
              {booking.deliverablesStatus?.length > 0 && (
                <div className="space-y-4 pt-4 border-t border-amber-900/10">
                  <h3 className="font-serif text-lg font-bold text-neutral-900">Deliverables & Post-Production Status</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    {booking.deliverablesStatus.map((del, dIdx) => (
                      <div key={dIdx} className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between">
                        <span className="text-neutral-800 font-medium">{del.item}</span>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                          del.status === 'Ready' || del.status === 'Delivered'
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                            : 'bg-amber-50 text-amber-900 border border-amber-300'
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
                <div className="space-y-4 pt-4 border-t border-amber-900/10">
                  <h3 className="font-serif text-lg font-bold text-neutral-900">Event Itinerary & Timeline</h3>
                  <div className="space-y-2.5 text-xs">
                    {booking.scheduleTimeline.map((item, sIdx) => (
                      <div key={sIdx} className="p-3 rounded-xl bg-stone-50 border border-stone-200 flex items-center space-x-4">
                        <span className="font-mono text-amber-800 font-bold w-24 shrink-0">{item.time}</span>
                        <span className="text-neutral-900 font-semibold flex-1">{item.event}</span>
                        <span className="text-neutral-500 text-[11px] hidden sm:inline">{item.notes}</span>
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
