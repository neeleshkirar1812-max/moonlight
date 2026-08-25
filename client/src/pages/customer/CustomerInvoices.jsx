import React, { useState, useEffect } from 'react';
import api from '../../api/client';
import { generateLuxuryInvoicePDF } from '../../utils/invoicePdfGenerator';
import InvoiceModal from '../../components/common/InvoiceModal';
import { FileText, Download, CheckCircle2, Building, Eye, CreditCard } from 'lucide-react';

const CustomerInvoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  useEffect(() => {
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
    fetchInvoices();
  }, []);

  const downloadPDF = (invoice) => {
    generateLuxuryInvoicePDF(invoice);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold block">
          Client Sanctuary Billing & Legal
        </span>
        <h1 className="font-serif text-3xl font-bold text-white">Official Tax Invoices & Agreements</h1>
        <p className="text-xs text-neutral-400 mt-1">
          Review itemized cinema inclusions, payment milestone schedules, and studio delivery terms.
        </p>
      </div>

      {loading ? (
        <div className="h-64 rounded-2xl bg-obsidian-400 animate-pulse" />
      ) : invoices.length === 0 ? (
        <div className="text-center py-20 bg-obsidian-400 rounded-3xl border border-white/10 space-y-3">
          <FileText className="w-8 h-8 text-gold-400 mx-auto opacity-50" />
          <h3 className="font-serif text-xl text-white">No Invoices Generated Yet</h3>
          <p className="text-xs text-neutral-400">Invoices will appear here automatically as booking payments are scheduled.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {invoices.map((inv) => (
            <div
              key={inv._id}
              className="luxury-card rounded-2xl p-6 border border-white/10 hover:border-gold-500/30 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
            >
              <div className="space-y-1">
                <div className="flex items-center space-x-3">
                  <span className="font-mono text-sm font-bold text-gold-300">{inv.invoiceNumber}</span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase ${
                      inv.status === 'PAID'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : inv.status === 'PARTIALLY_PAID'
                        ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                        : 'bg-gold-500/20 text-gold-300 border border-gold-500/40'
                    }`}
                  >
                    {inv.status}
                  </span>
                </div>
                <p className="text-xs text-neutral-300 font-medium">
                  Issued on {new Date(inv.issueDate).toLocaleDateString()} • {inv.booking?.eventType || 'Royal Wedding Shoot'}
                </p>
                <p className="text-xs text-neutral-400 font-mono">
                  Subtotal: ₹{inv.subtotal?.toLocaleString('en-IN')} + 18% GST: ₹{inv.taxAmount?.toLocaleString('en-IN')}
                </p>
                <p className="text-[11px] text-emerald-400 font-mono">
                  Paid to Date: ₹{inv.paidAmount?.toLocaleString('en-IN')} | Remaining: ₹{inv.remainingBalance?.toLocaleString('en-IN')}
                </p>
              </div>

              <div className="flex items-center space-x-4 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-4 md:pt-0 border-white/5">
                <div className="text-right">
                  <span className="text-[10px] uppercase text-neutral-400 block font-mono">Grand Total</span>
                  <span className="font-serif text-xl font-bold text-white">
                    ₹{inv.totalAmount?.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setSelectedInvoice(inv)}
                    className="p-2 rounded-full bg-obsidian-300 hover:bg-gold-500 hover:text-black border border-white/10 text-gold-300 transition-all"
                    title="View Bill Details & Terms"
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => downloadPDF(inv)}
                    className="px-5 py-2.5 rounded-full bg-gold-gradient text-black font-bold text-xs uppercase tracking-wider shadow-gold-subtle hover:brightness-110 transition-all flex items-center"
                  >
                    <Download className="w-3.5 h-3.5 mr-1.5" />
                    Download PDF
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Invoice Details & Terms Modal */}
      {selectedInvoice && (
        <InvoiceModal
          invoice={selectedInvoice}
          isAdmin={false}
          onClose={() => setSelectedInvoice(null)}
        />
      )}
    </div>
  );
};

export default CustomerInvoices;
