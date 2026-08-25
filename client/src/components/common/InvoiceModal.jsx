import React from 'react';
import {
  X,
  Download,
  Send,
  Building,
  CreditCard,
  Calendar,
  CheckCircle2,
  AlertCircle,
  FileText,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import { generateLuxuryInvoicePDF } from '../../utils/invoicePdfGenerator';

const InvoiceModal = ({ invoice, onClose, onResend, isAdmin = false }) => {
  if (!invoice) return null;

  const handleDownload = () => {
    generateLuxuryInvoicePDF(invoice);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-obsidian-400 border border-gold-500/40 rounded-3xl max-w-3xl w-full shadow-2xl overflow-hidden animate-fade-in relative my-auto">
        {/* Top Obsidian Gold Header Banner */}
        <div className="bg-black/90 p-6 border-b border-gold-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full border border-gold-500/80 bg-obsidian flex items-center justify-center shadow-gold-subtle">
              <span className="font-serif font-bold text-gold-400 text-xl">L</span>
            </div>
            <div>
              <span className="font-serif text-lg font-bold tracking-widest text-white block">
                Moonlight Production Studio
              </span>
              <p className="text-[10px] text-gold-400 font-mono uppercase tracking-wider">
                Official Studio Tax Invoice & Production Agreement
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleDownload}
              className="px-4 py-2 rounded-full bg-gold-gradient text-black font-bold text-xs uppercase tracking-wider shadow-gold-subtle hover:brightness-110 transition-all flex items-center"
            >
              <Download className="w-3.5 h-3.5 mr-1.5" /> Download Signed PDF
            </button>
            <button onClick={onClose} className="p-2 text-neutral-400 hover:text-white rounded-full bg-obsidian-300">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Invoice Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto custom-scrollbar text-xs">
          {/* Metadata & Billed-To Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Invoice Info */}
            <div className="p-4 rounded-2xl bg-obsidian-500/80 border border-white/10 space-y-1.5 font-mono">
              <div className="flex justify-between">
                <span className="text-neutral-400">Invoice Number:</span>
                <strong className="text-gold-300 text-sm">{invoice.invoiceNumber}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Issue Date:</span>
                <span className="text-white">{new Date(invoice.issueDate).toLocaleDateString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Due Date:</span>
                <span className="text-white">{new Date(invoice.dueDate).toLocaleDateString('en-IN')}</span>
              </div>
              <div className="flex justify-between items-center pt-1">
                <span className="text-neutral-400">Status:</span>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                    invoice.status === 'PAID'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : invoice.status === 'PARTIALLY_PAID'
                      ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                      : 'bg-gold-500/20 text-gold-300 border border-gold-500/40'
                  }`}
                >
                  {invoice.status}
                </span>
              </div>
            </div>

            {/* Client Info */}
            <div className="p-4 rounded-2xl bg-obsidian-500/80 border border-white/10 space-y-1.5">
              <span className="text-[10px] uppercase font-bold text-gold-400 tracking-wider block font-mono">
                Billed To (Client Details)
              </span>
              <p className="font-serif text-sm font-bold text-white">
                {invoice.clientInfo?.name || invoice.customer?.name || 'Valued Couple'}
              </p>
              <p className="text-neutral-300 font-mono text-[11px]">{invoice.clientInfo?.email || invoice.customer?.email}</p>
              <p className="text-neutral-300 font-mono text-[11px]">{invoice.clientInfo?.phone || invoice.customer?.phone}</p>
              {invoice.clientInfo?.address && (
                <p className="text-neutral-400 text-[11px]">{invoice.clientInfo.address}</p>
              )}
            </div>
          </div>

          {/* Line Items Table */}
          <div className="rounded-2xl overflow-hidden border border-white/10">
            <table className="w-full text-left text-xs">
              <thead className="bg-obsidian-600 uppercase tracking-wider text-gold-400 font-mono border-b border-white/10">
                <tr>
                  <th className="p-3">Service & Cinema Inclusions</th>
                  <th className="p-3 text-center">Qty</th>
                  <th className="p-3 text-right">Unit Rate</th>
                  <th className="p-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 bg-obsidian-500/50">
                {(invoice.items || []).map((item, idx) => (
                  <tr key={idx}>
                    <td className="p-3 text-white font-medium">{item.description}</td>
                    <td className="p-3 text-center font-mono text-neutral-300">{item.quantity || 1}</td>
                    <td className="p-3 text-right font-mono text-neutral-300">
                      ₹{Number(item.unitPrice || 0).toLocaleString('en-IN')}
                    </td>
                    <td className="p-3 text-right font-mono text-gold-300 font-bold">
                      ₹{Number(item.total || item.unitPrice * item.quantity).toLocaleString('en-IN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Financial Calculation Box */}
          <div className="p-4 rounded-2xl bg-obsidian-500/90 border border-gold-500/30 space-y-2 font-mono">
            <div className="flex justify-between text-neutral-300">
              <span>Subtotal:</span>
              <strong className="text-white">₹{Number(invoice.subtotal || 0).toLocaleString('en-IN')}</strong>
            </div>
            <div className="flex justify-between text-neutral-300">
              <span>GST ({invoice.taxRate || 18}%):</span>
              <strong className="text-gold-400">₹{Number(invoice.taxAmount || 0).toLocaleString('en-IN')}</strong>
            </div>
            <div className="flex justify-between items-center text-sm pt-2 border-t border-white/10">
              <span className="font-serif text-white font-bold">Grand Total Amount:</span>
              <strong className="font-serif text-gold-300 text-lg">
                ₹{Number(invoice.totalAmount || 0).toLocaleString('en-IN')}
              </strong>
            </div>
            <div className="flex justify-between text-emerald-400 text-xs">
              <span>Paid to Date:</span>
              <strong>₹{Number(invoice.paidAmount || 0).toLocaleString('en-IN')}</strong>
            </div>
            <div className="flex justify-between text-amber-400 text-xs">
              <span>Remaining Balance Due:</span>
              <strong className="font-bold">₹{Number(invoice.remainingBalance || 0).toLocaleString('en-IN')}</strong>
            </div>
          </div>

          {/* Studio Bank & Payment Details Card */}
          <div className="p-4 rounded-2xl bg-obsidian-500/60 border border-white/10 space-y-1.5 font-mono">
            <span className="text-[11px] font-bold text-gold-400 uppercase tracking-wider block">
              🏦 Studio Official Bank & UPI Transfer Details:
            </span>
            <p className="text-neutral-200">
              Beneficiary: <strong>Moonlight Production Private Limited</strong>
            </p>
            <p className="text-neutral-300">
              Bank: <strong>HDFC Bank Ltd., Bandra West Branch</strong> | A/C: <strong>50200084920194</strong> | IFSC: <strong>HDFC0000043</strong>
            </p>
            <p className="text-emerald-400 font-bold">
              Official Studio UPI: <strong>Moonlight Production@hdfcbank</strong>
            </p>
          </div>

          {/* Official Studio Terms & Conditions Box */}
          <div className="p-5 rounded-2xl bg-obsidian-600/90 border border-gold-500/40 space-y-3">
            <span className="text-xs font-bold text-gold-400 uppercase tracking-widest block font-mono">
              📜 Studio Terms & Conditions (T&C):
            </span>

            <ul className="space-y-2 text-neutral-300 leading-relaxed list-disc list-inside text-[11px]">
              <li>
                <strong className="text-white">Payment Milestones:</strong> 30% advance booking retainer required to lock wedding dates; 50% payment must be cleared prior to wedding/shoot commencement; remaining 20% balance payable upon final delivery handover.
              </li>
              <li>
                <strong className="text-white">Advance Non-Refundable Policy:</strong> The 30% advance retainer is strictly non-refundable under all circumstances due to calendar reservation and dedicated crew blocking.
              </li>
              <li>
                <strong className="text-white">Editing & Deliverables Timeline:</strong> High-resolution master color-graded photographs and 4K cinematic feature films will be delivered within <strong>90 days (3 months)</strong> from the wedding date.
              </li>
              <li>
                <strong className="text-white">Digital Cloud Archive & Storage:</strong> Raw and edited master data will remain stored on our cloud servers for <strong>6 months</strong> post-event. After 6 months, storage is purged and the studio assumes no further liability for digital backup.
              </li>
              <li>
                <strong className="text-white">Client Revisions:</strong> Includes one (1) round of editorial feedback on the wedding cinema trailer within 14 days of teaser preview.
              </li>
              <li>
                <strong className="text-white">Copyright & Moral Rights:</strong> Moonlight Production retains moral creative copyright for portfolio and award entries, with unrestricted personal print/sharing rights for the couple.
              </li>
              <li>
                <strong className="text-white">Jurisdiction:</strong> All legal disputes subject to Mumbai, India court jurisdiction.
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-black/80 border-t border-white/10 flex items-center justify-between">
          <p className="text-[11px] text-neutral-400 font-mono">
            Moonlight Production • Authorized Creative Director Signature Verified
          </p>

          <div className="flex items-center space-x-3">
            {isAdmin && onResend && (
              <button
                onClick={() => onResend(invoice)}
                className="px-4 py-2 rounded-full border border-gold-500/40 text-gold-300 hover:bg-gold-500 hover:text-black font-bold text-xs uppercase transition-all flex items-center"
              >
                <Send className="w-3.5 h-3.5 mr-1" /> Direct Send
              </button>
            )}
            <button
              onClick={handleDownload}
              className="px-5 py-2 rounded-full bg-gold-gradient text-black font-bold text-xs uppercase tracking-wider shadow-gold-subtle hover:brightness-110 transition-all flex items-center"
            >
              <Download className="w-3.5 h-3.5 mr-1.5" /> Download PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceModal;
