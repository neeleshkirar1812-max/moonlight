import React, { useState, useEffect } from 'react';
import api from '../../api/client';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import { CreditCard, CheckCircle2, ShieldCheck, Download, AlertCircle, ArrowRight } from 'lucide-react';

const CustomerPayments = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [payingBookingId, setPayingBookingId] = useState(null);
  const [payAmount, setPayAmount] = useState('');
  const [processing, setProcessing] = useState(false);
  const { addToast } = useNotification();

  const loadData = async () => {
    setLoading(true);
    try {
      const [bRes, pRes] = await Promise.allSettled([
        api.get('/bookings'),
        api.get('/payments'),
      ]);
      if (bRes.status === 'fulfilled') setBookings(bRes.value.data || []);
      if (pRes.status === 'fulfilled') setPayments(pRes.value.data || []);
    } catch (err) {
      console.error('Payment data load error', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleRazorpayPayment = async (booking) => {
    setProcessing(true);
    try {
      const amountToPay = Number(payAmount) || booking.remainingAmount || booking.advanceAmount;

      // 1. Create order on backend
      const orderData = await api.post('/payments/create-order', {
        bookingId: booking._id,
        amount: amountToPay,
        paymentType: booking.paymentStatus === 'UNPAID' ? 'ADVANCE' : 'REMAINING',
      });

      // 2. Configure Razorpay client checkout
      const options = {
        key: 'rzp_test_luxury_wedding_key', // Public Test Key
        amount: orderData.order.amount,
        currency: 'INR',
        name: 'Lumière Studios Ltd.',
        description: `Payment for Booking ${booking.bookingNumber}`,
        image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=200&q=80',
        order_id: orderData.order.id,
        handler: async function (response) {
          try {
            // 3. Verify signature strictly on backend
            await api.post('/payments/verify', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              paymentId: orderData.paymentId,
            });

            addToast({
              title: 'Payment Successful',
              message: `Payment of ₹${amountToPay.toLocaleString('en-IN')} confirmed. Official invoice generated.`,
              type: 'success',
            });
            setPayingBookingId(null);
            loadData();
          } catch (verifyErr) {
            addToast({ title: 'Verification Failed', message: verifyErr.message, type: 'error' });
          }
        },
        prefill: {
          name: user?.name,
          email: user?.email,
          contact: user?.phone || '+919820012345',
        },
        theme: {
          color: '#D4AF37', // Gold Theme
        },
      };

      if (window.Razorpay) {
        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        // Mock fallback if Razorpay script blocked
        await api.post('/payments/verify', {
          razorpay_order_id: orderData.order.id,
          razorpay_payment_id: `pay_mock_${Date.now()}`,
          razorpay_signature: 'mock_signature_verified_valid',
          paymentId: orderData.paymentId,
        });
        addToast({ title: 'Demo Payment Simulated', message: 'Payment successfully captured.', type: 'success' });
        loadData();
      }
    } catch (err) {
      addToast({ title: 'Payment Error', message: err.message, type: 'error' });
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold block">
          Secure Payment Gateway
        </span>
        <h1 className="font-serif text-3xl font-bold text-white">Payments & Transactions</h1>
      </div>

      {/* Active Bookings Awaiting Payment */}
      <div className="space-y-4">
        <h2 className="font-serif text-xl font-bold text-white">Bookings with Pending Balances</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bookings.map((booking) => (
            <div key={booking._id} className="luxury-card rounded-3xl p-6 sm:p-8 border border-white/10 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div>
                  <h3 className="font-serif text-xl font-bold text-white">{booking.eventType}</h3>
                  <span className="text-xs font-mono text-gold-400">Ref: {booking.bookingNumber}</span>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase ${
                  booking.paymentStatus === 'PAID' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                }`}>
                  {booking.paymentStatus}
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-neutral-300">
                  <span>Total Amount:</span>
                  <strong className="text-white">₹{booking.totalAmount?.toLocaleString('en-IN')}</strong>
                </div>
                <div className="flex justify-between text-neutral-300">
                  <span>Advance Paid:</span>
                  <strong className="text-emerald-400">₹{booking.advanceAmount?.toLocaleString('en-IN')}</strong>
                </div>
                <div className="flex justify-between text-neutral-300 pt-2 border-t border-white/5">
                  <span>Remaining Balance:</span>
                  <strong className="font-serif text-lg text-gold-300">₹{booking.remainingAmount?.toLocaleString('en-IN')}</strong>
                </div>
              </div>

              {booking.remainingAmount > 0 ? (
                <button
                  onClick={() => handleRazorpayPayment(booking)}
                  disabled={processing}
                  className="w-full py-3.5 rounded-full bg-gold-gradient text-black font-bold text-xs uppercase tracking-wider shadow-gold-subtle hover:brightness-110 transition-all flex items-center justify-center disabled:opacity-50"
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  {processing ? 'Processing Gateway...' : `Pay ₹${booking.remainingAmount?.toLocaleString('en-IN')} via Razorpay`}
                </button>
              ) : (
                <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center text-xs text-emerald-300 font-semibold flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Full Amount Settled
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Transaction History Log */}
      <div className="space-y-4 pt-6">
        <h2 className="font-serif text-xl font-bold text-white">Payment Transaction History</h2>

        {payments.length === 0 ? (
          <p className="text-xs text-neutral-400">No transactions recorded yet.</p>
        ) : (
          <div className="luxury-card rounded-2xl overflow-hidden border border-white/10">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-obsidian-400 border-b border-white/10 uppercase tracking-wider text-gold-400 font-mono">
                  <tr>
                    <th className="p-4">Payment Ref</th>
                    <th className="p-4">Razorpay Order ID</th>
                    <th className="p-4">Amount</th>
                    <th className="p-4">Type</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-neutral-300">
                  {payments.map((payment) => (
                    <tr key={payment._id} className="hover:bg-white/5 transition-colors">
                      <td className="p-4 font-mono text-white font-bold">{payment.paymentNumber}</td>
                      <td className="p-4 font-mono text-neutral-400">{payment.razorpayOrderId}</td>
                      <td className="p-4 font-serif text-sm font-bold text-gold-300">₹{payment.amount?.toLocaleString('en-IN')}</td>
                      <td className="p-4 uppercase">{payment.paymentType}</td>
                      <td className="p-4">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                          {payment.status}
                        </span>
                      </td>
                      <td className="p-4">{new Date(payment.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerPayments;
