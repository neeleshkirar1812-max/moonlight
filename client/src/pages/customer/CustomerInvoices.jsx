import React, { useState, useEffect } from 'react';
import api from '../../api/client';
import { useNotification } from '../../context/NotificationContext';
import { generateLuxuryInvoicePDF } from '../../utils/invoicePdfGenerator';
import InvoiceModal from '../../components/common/InvoiceModal';
import { FileText, Download, CheckCircle2, Building, Eye, CreditCard, X, ShieldCheck, QrCode, ArrowRight } from 'lucide-react';

const CustomerInvoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [payModalOpen, setPayModalOpen] = useState(false);
  const [payingInvoice, setPayingInvoice] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [utrNumber, setUtrNumber] = useState('');
  const [processing, setProcessing] = useState(false);
  const { addToast } = useNotification();

  const fetchInvoices = async () => {
    try {
      const res = await api.get('/invoices');
      setInvoices(res.data || []);
    } catch (err) {
      console.error('Error fetching invoices', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const downloadPDF = (invoice) => {
    generateLuxuryInvoicePDF(invoice);
  };

  // Open Pay Modal
  const openPayModal = (inv) => {
    setPayingInvoice(inv);
    const suggested = inv.paidAmount === 0 
      ? Math.round(Number(inv.totalAmount || 0) * 0.3)
      : Number(inv.remainingBalance || 0);
    setPaymentAmount(suggested);
    setUtrNumber(`UPI-${Math.floor(100000000 + Math.random() * 900000000)}`);
    setPayModalOpen(true);
  };

  // Handle Client Online Payment Submit
  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    if (!payingInvoice) return;

    setProcessing(true);
    try {
      const payAmt = Number(paymentAmount);
      const currentPaid = Number(payingInvoice.paidAmount || 0);
      const totalAmt = Number(payingInvoice.totalAmount || 0);
      const newPaid = currentPaid + payAmt;
      const newRemaining = Math.max(0, totalAmt - newPaid);
      const newStatus = newRemaining === 0 ? 'PAID' : 'PARTIALLY_PAID';

      const updatedInvoice = {
        ...payingInvoice,
        paidAmount: newPaid,
        remainingBalance: newRemaining,
        status: newStatus,
        lastPaymentDate: new Date().toISOString(),
      };

      // Record transaction
      const newTxn = {
        _id: `pay-${Date.now()}`,
        invoiceId: payingInvoice._id,
        invoiceNumber: payingInvoice.invoiceNumber,
        clientName: payingInvoice.clientInfo?.name || 'Valued Couple',
        amount: payAmt,
        method: paymentMethod,
        reference: utrNumber,
        date: new Date().toISOString(),
        status: 'SUCCESS',
      };

      await api.post('/payments', newTxn);

      // Save locally
      const updatedList = invoices.map((inv) => (inv._id === payingInvoice._id ? updatedInvoice : inv));
      setInvoices(updatedList);
      localStorage.setItem('ml_invoices', JSON.stringify(updatedList));

      addToast({
        title: 'Payment Successful',
        message: `₹${payAmt.toLocaleString('en-IN')} paid successfully for Invoice ${payingInvoice.invoiceNumber}!`,
        type: 'success',
      });

      setPayModalOpen(false);
      setPayingInvoice(null);
    } catch (err) {
      addToast({ title: 'Payment Error', message: err.message, type: 'error' });
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in text-neutral-900">
      <div className="border-b border-amber-900/10 pb-6">
        <span className="text-xs uppercase tracking-widest text-amber-700 font-bold block">
          Client Sanctuary Billing & Legal
        </span>
        <h1 className="font-serif text-3xl font-bold text-neutral-900 mt-1">Official Tax Invoices & Agreements</h1>
        <p className="text-neutral-600 text-xs font-light mt-1">
          Review itemized cinema inclusions, download signed tax PDFs, and pay your 30% booking advance or milestone dues online.
        </p>
      </div>

      {loading ? (
        <div className="h-64 rounded-2xl bg-stone-100 animate-pulse border border-stone-200" />
      ) : invoices.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-amber-900/15 space-y-3 shadow-sm">
          <FileText className="w-8 h-8 text-amber-600 mx-auto opacity-70" />
          <h3 className="font-serif text-xl text-neutral-900 font-bold">No Invoices Generated Yet</h3>
          <p className="text-xs text-neutral-500">Invoices will appear here automatically as booking payments are scheduled.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {invoices.map((inv) => (
            <div
              key={inv._id}
              className="bg-white rounded-2xl p-6 border border-amber-900/15 hover:border-amber-500/40 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
            >
              <div className="space-y-1">
                <div className="flex items-center space-x-3">
                  <span className="font-mono text-sm font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded border border-amber-200">{inv.invoiceNumber}</span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase font-bold ${
                      (inv.status || '').toUpperCase() === 'PAID'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                        : (inv.status || '').toUpperCase() === 'PARTIALLY_PAID'
                        ? 'bg-blue-50 text-blue-800 border border-blue-300'
                        : 'bg-amber-50 text-amber-900 border border-amber-300'
                    }`}
                  >
                    {inv.status || 'ISSUED'}
                  </span>
                </div>
                <p className="text-xs text-neutral-900 font-medium pt-1">
                  Issued on {new Date(inv.issueDate || Date.now()).toLocaleDateString()} • {inv.booking?.eventType || 'Royal Wedding Cinema & Photography'}
                </p>
                <p className="text-xs text-neutral-500 font-mono">
                  Subtotal: ₹{Number(inv.subtotal || 0).toLocaleString('en-IN')} + 18% GST: ₹{Number(inv.taxAmount || 0).toLocaleString('en-IN')}
                </p>
                <div className="flex items-center space-x-3 text-xs pt-1 font-mono">
                  <span className="text-emerald-700 font-bold">
                    Paid: ₹{Number(inv.paidAmount || 0).toLocaleString('en-IN')}
                  </span>
                  <span className="text-neutral-300">|</span>
                  <span className="text-amber-900 font-bold">
                    Remaining Balance: ₹{Number(inv.remainingBalance || 0).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-4 md:pt-0 border-stone-100">
                <div className="text-left sm:text-right">
                  <span className="text-[10px] uppercase text-neutral-500 block font-mono font-bold">Grand Total</span>
                  <span className="font-serif text-xl font-bold text-neutral-900">
                    ₹{Number(inv.totalAmount || 0).toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="flex items-center space-x-2 flex-wrap gap-y-2">
                  {/* Pay Remaining Balance Button */}
                  {Number(inv.remainingBalance || 0) > 0 && (
                    <button
                      onClick={() => openPayModal(inv)}
                      className="px-3.5 sm:px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-md transition-all flex items-center shrink-0 min-h-[44px]"
                    >
                      <CreditCard className="w-3.5 h-3.5 mr-1.5" /> Pay Online
                    </button>
                  )}

                  <button
                    onClick={() => setSelectedInvoice(inv)}
                    className="p-2.5 rounded-full bg-stone-100 hover:bg-stone-200 border border-stone-300 text-neutral-700 transition-all min-w-[44px] min-h-[44px] flex items-center justify-center shrink-0 shadow-sm"
                    title="View Bill Details & Terms"
                    aria-label="View invoice details"
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => downloadPDF(inv)}
                    className="px-3.5 sm:px-4 py-2 rounded-full bg-gold-gradient text-neutral-950 font-bold text-xs uppercase tracking-wider shadow-gold-subtle hover:scale-105 transition-all flex items-center shrink-0 min-h-[44px]"
                  >
                    <Download className="w-3.5 h-3.5 mr-1.5" /> PDF
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Online Payment Modal */}
      {payModalOpen && payingInvoice && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-amber-900/20 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5 animate-fade-in text-neutral-900 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-amber-900/10">
              <div className="flex items-center space-x-2">
                <CreditCard className="w-5 h-5 text-emerald-600" />
                <h3 className="font-serif text-xl font-bold text-neutral-900">Online Payment Gateway</h3>
              </div>
              <button onClick={() => setPayModalOpen(false)} className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-neutral-600 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Bill Summary */}
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1.5 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-neutral-500">Invoice Ref:</span>
                <strong className="text-neutral-900">{payingInvoice.invoiceNumber}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Total Invoice Amount:</span>
                <span className="text-neutral-900 font-bold">₹{Number(payingInvoice.totalAmount || 0).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Advance Already Paid:</span>
                <span className="text-emerald-700 font-bold">₹{Number(payingInvoice.paidAmount || 0).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-stone-200">
                <span className="text-amber-900 font-bold">Remaining Due:</span>
                <strong className="text-amber-900 font-bold">₹{Number(payingInvoice.remainingBalance || 0).toLocaleString('en-IN')}</strong>
              </div>
            </div>

            <form onSubmit={handlePaymentSubmit} className="space-y-4 text-xs">
              {/* Payment Amount Input */}
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <label className="text-neutral-700 font-bold uppercase text-[10.5px]">Amount to Pay (₹) *</label>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setPaymentAmount(Math.round(Number(payingInvoice.totalAmount || 0) * 0.3))}
                      className="px-2 py-0.5 bg-amber-50 text-amber-800 border border-amber-300 rounded text-[9.5px] font-mono font-bold"
                    >
                      30% Retainer
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentAmount(Number(payingInvoice.remainingBalance || 0))}
                      className="px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-300 rounded text-[9.5px] font-mono font-bold"
                    >
                      Full Balance
                    </button>
                  </div>
                </div>
                <input
                  type="number"
                  required
                  min="1"
                  max={payingInvoice.remainingBalance}
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2.5 text-emerald-700 font-mono text-base font-bold focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Payment Method Selector */}
              <div className="space-y-1.5">
                <label className="text-neutral-700 font-bold uppercase text-[10.5px]">Select Payment Mode</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('UPI')}
                    className={`py-2 rounded-xl border text-xs font-mono font-bold transition-all ${
                      paymentMethod === 'UPI'
                        ? 'bg-emerald-50 border-emerald-400 text-emerald-800'
                        : 'bg-stone-50 border-stone-200 text-neutral-600'
                    }`}
                  >
                    UPI / QR Code
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('RAZORPAY')}
                    className={`py-2 rounded-xl border text-xs font-mono font-bold transition-all ${
                      paymentMethod === 'RAZORPAY'
                        ? 'bg-emerald-50 border-emerald-400 text-emerald-800'
                        : 'bg-stone-50 border-stone-200 text-neutral-600'
                    }`}
                  >
                    Cards / Netbanking
                  </button>
                </div>
              </div>

              {/* Official UPI Details */}
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-[11px] font-mono space-y-1 text-neutral-800">
                <span className="text-amber-900 font-bold block">Official Studio UPI ID:</span>
                <p className="text-neutral-900 font-bold select-all">moonlightproduction@hdfcbank</p>
                <p className="text-neutral-500 text-[10px]">HDFC Bank Ltd. • Moonlight Production & Films</p>
              </div>

              <div className="space-y-1">
                <label className="text-neutral-700 font-semibold uppercase text-[10.5px]">Transaction Ref / UTR Number</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. UTR-982001923"
                  value={utrNumber}
                  onChange={(e) => setUtrNumber(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-neutral-900 font-mono focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-3 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setPayModalOpen(false)}
                  className="px-4 py-2 rounded-full border border-stone-300 text-neutral-600 hover:text-neutral-900 hover:bg-stone-50 font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={processing}
                  className="px-6 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold uppercase tracking-wider shadow-md flex items-center disabled:opacity-50 transition-all"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />
                  {processing ? 'Confirming...' : 'Authorize & Pay'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Invoice Details & Terms Modal */}
      {selectedInvoice && (
        <InvoiceModal
          invoice={selectedInvoice}
          isAdmin={false}
          onClose={() => setSelectedInvoice(null)}
          onPay={() => {
            const inv = selectedInvoice;
            setSelectedInvoice(null);
            openPayModal(inv);
          }}
        />
      )}
    </div>
  );
};

export default CustomerInvoices;
