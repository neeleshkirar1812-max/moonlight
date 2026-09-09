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

const InvoiceModal = ({ invoice, onClose, onResend, onPay, isAdmin = false }) => {
  if (!invoice) return null;

  const handleDownload = () => {
    generateLuxuryInvoicePDF(invoice);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto w-full max-w-full">
      <div className="bg-white border border-amber-900/20 rounded-3xl max-w-3xl w-full shadow-2xl overflow-hidden animate-fade-in relative my-auto max-h-[95dvh] flex flex-col text-neutral-900">
        {/* Top Header Banner */}
        <div className="bg-amber-50/90 p-4 sm:p-6 border-b border-amber-900/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
          <div className="flex items-center space-x-3 min-w-0">
            <div className="w-10 h-10 rounded-full border border-amber-600/40 bg-amber-100 flex items-center justify-center shadow-sm shrink-0">
              <span className="font-serif font-bold text-amber-900 text-xl">M</span>
            </div>
            <div className="min-w-0">
              <span className="font-serif text-base sm:text-lg font-bold tracking-wider text-neutral-900 block truncate">
                Moonlight Production Studio
              </span>
              <p className="text-[9.5px] sm:text-[10px] text-amber-800 font-mono uppercase tracking-wider font-bold truncate">
                Official Studio Tax Invoice & Production Agreement
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 shrink-0 justify-end w-full sm:w-auto">
            <button
              onClick={handleDownload}
              className="px-3.5 sm:px-4 py-2 rounded-full bg-gold-gradient text-neutral-950 font-bold text-[11px] sm:text-xs uppercase tracking-wider shadow-gold-subtle hover:brightness-105 transition-all flex items-center min-h-[40px]"
            >
              <Download className="w-3.5 h-3.5 mr-1.5" /> Signed PDF
            </button>
            <button
              onClick={onClose}
              className="p-2 text-neutral-500 hover:text-neutral-900 rounded-full bg-stone-100 hover:bg-stone-200 min-w-[40px] min-h-[40px] flex items-center justify-center shrink-0 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Invoice Body */}
        <div className="p-4 sm:p-6 md:p-8 space-y-6 max-h-[75vh] overflow-y-auto custom-scrollbar text-xs flex-1">
          {/* Metadata & Billed-To Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Invoice Info */}
            <div className="p-4 rounded-2xl bg-stone-50 border border-neutral-200 space-y-1.5 font-mono">
              <div className="flex justify-between">
                <span className="text-neutral-500">Invoice Number:</span>
                <strong className="text-amber-900 text-sm font-bold">{invoice.invoiceNumber}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Issue Date:</span>
                <span className="text-neutral-800 font-bold">{new Date(invoice.issueDate).toLocaleDateString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Due Date:</span>
                <span className="text-neutral-800 font-bold">{new Date(invoice.dueDate).toLocaleDateString('en-IN')}</span>
              </div>
              <div className="flex justify-between items-center pt-1">
                <span className="text-neutral-500">Status:</span>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase font-bold border ${
                  (invoice.status || '').toUpperCase() === 'PAID'
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                    : (invoice.status || '').toUpperCase() === 'PARTIALLY_PAID'
                    ? 'bg-blue-50 text-blue-800 border-blue-300'
                    : 'bg-amber-50 text-amber-800 border-amber-300'
                }`}>
                  {invoice.status || 'ISSUED'}
                </span>
              </div>
            </div>

            {/* Billed To */}
            <div className="p-4 rounded-2xl bg-stone-50 border border-neutral-200 space-y-1">
              <span className="text-neutral-500 font-mono text-[10px] uppercase block tracking-wider font-bold">Billed To (Client):</span>
              <p className="font-serif text-sm font-bold text-neutral-900">
                {invoice.clientInfo?.name || invoice.customer?.name || 'Valued Couple'}
              </p>
              <p className="text-neutral-600 font-mono text-[11px]">{invoice.clientInfo?.email || invoice.customer?.email}</p>
              <p className="text-neutral-600 font-mono text-[11px]">{invoice.clientInfo?.phone || invoice.customer?.phone}</p>
              {invoice.clientInfo?.address && (
                <p className="text-neutral-500 text-[11px]">{invoice.clientInfo.address}</p>
              )}
            </div>
          </div>

          {/* Line Items Table */}
          <div className="rounded-2xl overflow-x-auto custom-scrollbar border border-neutral-200">
            <table className="w-full min-w-[480px] text-left text-xs">
              <thead className="bg-amber-50/80 uppercase tracking-wider text-amber-900 font-mono text-[10.5px] border-b border-neutral-200 font-bold">
                <tr>
                  <th className="p-3">Service & Cinema Inclusions</th>
                  <th className="p-3 text-center">Qty</th>
                  <th className="p-3 text-right">Unit Rate</th>
                  <th className="p-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 bg-white">
                {(invoice.items || []).map((item, idx) => (
                  <tr key={idx}>
                    <td className="p-3 text-neutral-900 font-medium">{item.description}</td>
                    <td className="p-3 text-center font-mono text-neutral-600">{item.quantity || 1}</td>
                    <td className="p-3 text-right font-mono text-neutral-600">
                      ₹{Number(item.unitPrice || 0).toLocaleString('en-IN')}
                    </td>
                    <td className="p-3 text-right font-mono text-amber-900 font-bold">
                      ₹{Number(item.total || item.unitPrice * item.quantity).toLocaleString('en-IN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Financial Calculation Box */}
          <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-300/70 space-y-2 font-mono">
            <div className="flex justify-between text-neutral-700">
              <span>Subtotal:</span>
              <strong className="text-neutral-900 font-bold">₹{Number(invoice.subtotal || 0).toLocaleString('en-IN')}</strong>
            </div>
            <div className="flex justify-between text-neutral-700">
              <span>GST ({invoice.taxRate || 18}%):</span>
              <strong className="text-amber-800 font-bold">₹{Number(invoice.taxAmount || 0).toLocaleString('en-IN')}</strong>
            </div>
            <div className="flex justify-between items-center text-sm pt-2 border-t border-amber-900/15">
              <span className="font-serif text-neutral-900 font-bold">Grand Total Amount:</span>
              <strong className="font-serif text-amber-900 text-lg font-bold">
                ₹{Number(invoice.totalAmount || 0).toLocaleString('en-IN')}
              </strong>
            </div>
            <div className="flex justify-between text-emerald-700 text-xs">
              <span>Paid to Date:</span>
              <strong className="font-bold">₹{Number(invoice.paidAmount || 0).toLocaleString('en-IN')}</strong>
            </div>
            <div className="flex justify-between text-amber-900 text-xs">
              <span>Remaining Balance Due:</span>
              <strong className="font-bold">₹{Number(invoice.remainingBalance || 0).toLocaleString('en-IN')}</strong>
            </div>
          </div>

          {/* Studio Bank & Payment Details Card */}
          <div className="p-4 rounded-2xl bg-stone-50 border border-neutral-200 space-y-1.5 font-mono">
            <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block">
              🏦 Studio Official Bank & UPI Transfer Details:
            </span>
            <p className="text-neutral-800">
              Beneficiary: <strong>Moonlight Production Private Limited</strong>
            </p>
            <p className="text-neutral-600">
              Bank: <strong>HDFC Bank Ltd., Bandra West Branch</strong> | A/C: <strong>50200084920194</strong> | IFSC: <strong>HDFC0000043</strong>
            </p>
            <p className="text-emerald-700 font-bold">
              Official Studio UPI: <strong>Moonlight Production@hdfcbank</strong>
            </p>
          </div>

          {/* Official Studio Terms & Conditions Box */}
          <div className="p-5 rounded-2xl bg-stone-50 border border-amber-900/15 space-y-3">
            <span className="text-xs font-bold text-amber-900 uppercase tracking-widest block font-mono">
              📜 Studio Terms & Conditions (T&C):
            </span>

            <ul className="space-y-2 text-neutral-700 leading-relaxed list-disc list-inside text-[11px]">
              <li>
                <strong className="text-neutral-900">Payment Milestones:</strong> 30% advance booking retainer required to lock wedding dates; 50% payment must be cleared prior to wedding/shoot commencement; remaining 20% balance payable upon final delivery handover.
              </li>
              <li>
                <strong className="text-neutral-900">Advance Non-Refundable Policy:</strong> The 30% advance retainer is strictly non-refundable under all circumstances due to calendar reservation and dedicated crew blocking.
              </li>
              <li>
                <strong className="text-neutral-900">Editing & Deliverables Timeline:</strong> High-resolution master color-graded photographs and 4K cinematic feature films will be delivered within <strong>90 days (3 months)</strong> from the wedding date.
              </li>
              <li>
                <strong className="text-neutral-900">Digital Cloud Archive & Storage:</strong> Raw and edited master data will remain stored on our cloud servers for <strong>6 months</strong> post-event. After 6 months, storage is purged and the studio assumes no further liability for digital backup.
              </li>
              <li>
                <strong className="text-neutral-900">Client Revisions:</strong> Includes one (1) round of editorial feedback on the wedding cinema trailer within 14 days of teaser preview.
              </li>
              <li>
                <strong className="text-neutral-900">Copyright & Moral Rights:</strong> Moonlight Production retains moral creative copyright for portfolio and award entries, with unrestricted personal print/sharing rights for the couple.
              </li>
              <li>
                <strong className="text-neutral-900">Jurisdiction:</strong> All legal disputes subject to Mumbai, India court jurisdiction.
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-stone-50 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-neutral-500 font-mono text-center sm:text-left">
            Moonlight Production • Authorized Creative Director Signature Verified
          </p>

          <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
            {!isAdmin && onPay && Number(invoice.remainingBalance || 0) > 0 && (
              <button
                onClick={onPay}
                className="px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all flex items-center"
              >
                <CreditCard className="w-3.5 h-3.5 mr-1.5" /> Pay Online
              </button>
            )}
            {isAdmin && onResend && (
              <button
                onClick={() => onResend(invoice)}
                className="px-4 py-2 rounded-full border border-amber-600/40 text-amber-800 hover:bg-amber-100 font-bold text-xs uppercase transition-all flex items-center"
              >
                <Send className="w-3.5 h-3.5 mr-1" /> Direct Send
              </button>
            )}
            <button
              onClick={handleDownload}
              className="px-5 py-2 rounded-full bg-gold-gradient text-neutral-950 font-bold text-xs uppercase tracking-wider shadow-gold-subtle hover:brightness-105 transition-all flex items-center"
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
