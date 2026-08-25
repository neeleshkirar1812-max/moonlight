import React, { useState, useEffect } from 'react';
import api from '../../api/client';
import { CreditCard, DollarSign, Download, Search, CheckCircle2 } from 'lucide-react';

const AdminPayments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await api.get('/payments');
        setPayments(res.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, []);

  const totalCaptured = payments.filter((p) => p.status === 'CAPTURED').reduce((acc, c) => acc + (c.amount || 0), 0);

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold block">
            Financial Ledger
          </span>
          <h1 className="font-serif text-3xl font-bold text-white">Payment Transactions & Razorpay Gateway</h1>
        </div>

        <div className="p-4 rounded-2xl bg-obsidian-400 border border-gold-500/30 flex items-center space-x-4">
          <div>
            <span className="text-[10px] uppercase text-neutral-400 font-mono">Gross Captured</span>
            <p className="font-serif text-2xl font-bold text-gold-300">₹{totalCaptured.toLocaleString('en-IN')}</p>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="h-64 rounded-2xl bg-obsidian-400 animate-pulse" />
      ) : payments.length === 0 ? (
        <div className="text-center py-20 bg-obsidian-400 rounded-3xl border border-white/10 space-y-3">
          <CreditCard className="w-8 h-8 text-gold-400 mx-auto opacity-50" />
          <h3 className="font-serif text-xl text-white">No Transactions Recorded</h3>
        </div>
      ) : (
        <div className="luxury-card rounded-2xl overflow-hidden border border-white/10">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-obsidian-500 border-b border-white/10 uppercase tracking-wider text-gold-400 font-mono">
                <tr>
                  <th className="p-4">Payment Ref</th>
                  <th className="p-4">Client</th>
                  <th className="p-4">Booking Ref</th>
                  <th className="p-4">Razorpay Order ID</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Type</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-neutral-300">
                {payments.map((p) => (
                  <tr key={p._id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 font-mono font-bold text-white">{p.paymentNumber}</td>
                    <td className="p-4 font-medium text-white">{p.customer?.name}</td>
                    <td className="p-4 font-mono text-neutral-400">{p.booking?.bookingNumber}</td>
                    <td className="p-4 font-mono text-neutral-400">{p.razorpayOrderId}</td>
                    <td className="p-4 font-serif text-sm font-bold text-gold-300">₹{p.amount?.toLocaleString('en-IN')}</td>
                    <td className="p-4 uppercase">{p.paymentType}</td>
                    <td className="p-4">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                        {p.status}
                      </span>
                    </td>
                    <td className="p-4">{new Date(p.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPayments;
