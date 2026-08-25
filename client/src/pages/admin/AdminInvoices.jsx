import React, { useState, useEffect } from 'react';
import api from '../../api/client';
import { useNotification } from '../../context/NotificationContext';
import { generateLuxuryInvoicePDF } from '../../utils/invoicePdfGenerator';
import InvoiceModal from '../../components/common/InvoiceModal';
import {
  FileText,
  Plus,
  Search,
  Download,
  Send,
  Trash2,
  CheckCircle2,
  CreditCard,
  Mail,
  Phone,
  User,
  MapPin,
  X,
  Eye,
  Sparkles,
} from 'lucide-react';

const AdminInvoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [previewInvoice, setPreviewInvoice] = useState(null);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [search, setSearch] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { addToast } = useNotification();

  // Invoice Form State with Direct Client Fields & Studio T&C Defaults
  const [form, setForm] = useState({
    customerId: '',
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    clientAddress: '',
    bookingId: '',
    taxRate: 18,
    paidAmount: 0,
    status: 'ISSUED',
    dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    notes: 'Payment Milestones: 30% Advance Retainer (Non-refundable) • 50% Pre-Wedding • 20% on Final Delivery (90-Day delivery SLA).',
    sendEmail: true,
    sendWhatsApp: true,
    items: [
      { description: '3-Day Royal Palace Photography & 4K Anamorphic Cinema Coverage', quantity: 1, unitPrice: 450000 },
      { description: 'Drone Aerial Cinematography & Same-Day Reception Edit Reel', quantity: 1, unitPrice: 75000 },
      { description: 'Two Handcrafted Bespoke Italian Leather Lay-Flat Heirloom Albums', quantity: 1, unitPrice: 95000 },
    ],
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [invRes, custRes, bkgRes] = await Promise.allSettled([
        api.get('/invoices'),
        api.get('/admin/customers'),
        api.get('/bookings'),
      ]);
      if (invRes.status === 'fulfilled') {
        const invList = invRes.value?.data || invRes.value || [];
        setInvoices(Array.isArray(invList) ? invList : []);
      }
      if (custRes.status === 'fulfilled') {
        const custList = custRes.value?.data || custRes.value || [];
        setCustomers(Array.isArray(custList) ? custList : []);
      }
      if (bkgRes.status === 'fulfilled') {
        const bkgList = bkgRes.value?.data || bkgRes.value || [];
        setBookings(Array.isArray(bkgList) ? bkgList : []);
      }
    } catch (err) {
      console.error('Error fetching invoices:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // When admin selects an existing customer from dropdown, autofill the fields
  const handleCustomerSelect = (e) => {
    const selectedId = e.target.value;
    if (!selectedId) {
      setForm({
        ...form,
        customerId: '',
        clientName: '',
        clientEmail: '',
        clientPhone: '',
        clientAddress: '',
      });
      return;
    }

    const found = customers.find((c) => (c.user?._id || c._id) === selectedId);
    if (found) {
      setForm({
        ...form,
        customerId: selectedId,
        clientName: found.user?.name || found.name || '',
        clientEmail: found.user?.email || found.email || '',
        clientPhone: found.user?.phone || found.phone || '',
        clientAddress: found.address?.street
          ? `${found.address.street}, ${found.address.city || ''}`
          : form.clientAddress,
      });
    }
  };

  // Line item helpers
  const handleItemChange = (index, field, value) => {
    const newItems = [...form.items];
    newItems[index][field] = value;
    setForm({ ...form, items: newItems });
  };

  const addItemRow = () => {
    setForm({
      ...form,
      items: [...form.items, { description: '', quantity: 1, unitPrice: 0 }],
    });
  };

  const removeItemRow = (index) => {
    if (form.items.length === 1) return;
    setForm({
      ...form,
      items: form.items.filter((_, i) => i !== index),
    });
  };

  // Calculations for live preview
  const calculateTotals = (itemsList = form.items, tax = form.taxRate, paid = form.paidAmount) => {
    const subtotal = itemsList.reduce((acc, it) => acc + (Number(it.quantity) || 1) * (Number(it.unitPrice) || 0), 0);
    const taxAmt = Math.round((subtotal * (Number(tax) || 18)) / 100);
    const total = subtotal + taxAmt;
    const remaining = Math.max(0, total - (Number(paid) || 0));
    return { subtotal, taxAmt, total, remaining };
  };

  const currentTotals = calculateTotals();

  // Create Invoice Submit (Direct Server-Side Send & Auto PDF Download)
  const handleCreateInvoice = async (e) => {
    e.preventDefault();
    if (!form.clientName || !form.clientEmail || !form.clientPhone) {
      addToast({
        title: 'Missing Details',
        message: 'Please provide Client Name, Email Address, and Mobile Number.',
        type: 'warning',
      });
      return;
    }

    setSubmitting(true);
    try {
      const res = await api.post('/invoices', {
        ...form,
        paidAmount: Number(form.paidAmount),
        taxRate: Number(form.taxRate),
      });

      const createdInvoice = res?.data || res;

      // 1. Immediately update table list state with new invoice
      setInvoices((prev) => [createdInvoice, ...prev.filter((i) => i._id !== createdInvoice._id)]);

      // 2. Automatically generate and download luxury PDF invoice!
      try {
        generateLuxuryInvoicePDF(createdInvoice);
      } catch (pdfErr) {
        console.error('PDF generation error:', pdfErr);
      }

      // 3. If WhatsApp channel checked, open WhatsApp Web with bill message
      if (form.sendWhatsApp && form.clientPhone) {
        const cleanPhone = form.clientPhone.replace(/[^0-9]/g, '');
        const msg = encodeURIComponent(
          `*MOONLIGHT PRODUCTION & FILMS* 🎬✨\n` +
          `*Official Studio Tax Invoice & Legal Agreement*\n\n` +
          `Dear *${createdInvoice.clientInfo?.name || form.clientName}*,\n` +
          `Your luxury wedding cinema & photography invoice has been generated.\n\n` +
          `📄 *Invoice No:* ${createdInvoice.invoiceNumber}\n` +
          `💰 *Total Amount:* ₹${Number(createdInvoice.totalAmount || 0).toLocaleString('en-IN')}\n` +
          `💳 *Advance Paid:* ₹${Number(createdInvoice.paidAmount || 0).toLocaleString('en-IN')}\n` +
          `⏳ *Remaining Balance:* ₹${Number(createdInvoice.remainingBalance || 0).toLocaleString('en-IN')}\n` +
          `📅 *Due Date:* ${new Date(createdInvoice.dueDate).toLocaleDateString('en-IN')}\n\n` +
          `*Payment Terms:* 30% Booking Advance + 50% Pre-Wedding + 20% on Final Deliverables.\n\n` +
          `*Online Portal:* https://moonlight-pink-two.vercel.app\n` +
          `*Studio Concierge:* +91 92292 29323`
        );
        window.open(`https://wa.me/${cleanPhone.startsWith('91') ? cleanPhone : '91' + cleanPhone}?text=${msg}`, '_blank');
      }

      addToast({
        title: 'Studio Bill Generated & PDF Downloaded',
        message: `Invoice ${createdInvoice.invoiceNumber} created and PDF downloaded for ${form.clientName}!`,
        type: 'success',
      });

      setModalOpen(false);
      setForm({
        customerId: '',
        clientName: '',
        clientEmail: '',
        clientPhone: '',
        clientAddress: '',
        bookingId: '',
        taxRate: 18,
        paidAmount: 0,
        status: 'ISSUED',
        dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        notes: 'Payment Milestones: 30% Advance Retainer (Non-refundable) • 50% Pre-Wedding • 20% on Final Delivery (90-Day delivery SLA).',
        sendEmail: true,
        sendWhatsApp: true,
        items: [
          { description: '3-Day Royal Palace Photography & 4K Anamorphic Cinema Coverage', quantity: 1, unitPrice: 450000 },
          { description: 'Drone Aerial Cinematography & Same-Day Reception Edit Reel', quantity: 1, unitPrice: 75000 },
          { description: 'Two Handcrafted Bespoke Italian Leather Lay-Flat Heirloom Albums', quantity: 1, unitPrice: 95000 },
        ],
      });
    } catch (err) {
      addToast({ title: 'Error', message: err.message, type: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  // Resend Invoice to Customer via Direct Backend Dispatch (No redirect)
  const handleResendInvoice = async (inv) => {
    try {
      const res = await api.post(`/invoices/${inv._id}/send`);
      addToast({
        title: 'Delivered',
        message: res.message || `Invoice resent to ${inv.clientInfo?.email} and WhatsApp!`,
        type: 'success',
      });
    } catch (err) {
      addToast({ title: 'Error', message: err.message, type: 'error' });
    }
  };

  // Delete Invoice
  const handleDeleteInvoice = async (invoiceId) => {
    if (!window.confirm('Are you sure you want to delete this invoice?')) return;
    try {
      await api.delete(`/invoices/${invoiceId}`);
      addToast({ title: 'Invoice Deleted', message: 'Invoice removed from records.', type: 'success' });
      fetchData();
    } catch (err) {
      addToast({ title: 'Error', message: err.message, type: 'error' });
    }
  };

  // Download PDF
  const downloadPDF = (inv) => {
    generateLuxuryInvoicePDF(inv);
  };

  // KPIs
  const totalInvoiced = invoices.reduce((acc, i) => acc + (i.totalAmount || 0), 0);
  const totalPaid = invoices.reduce((acc, i) => acc + (i.paidAmount || 0), 0);
  const totalPending = invoices.reduce((acc, i) => acc + (i.remainingBalance || 0), 0);

  const filteredInvoices = invoices.filter((inv) => {
    if (statusFilter !== 'ALL' && inv.status !== statusFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      const num = (inv.invoiceNumber || '').toLowerCase();
      const name = (inv.clientInfo?.name || inv.customer?.name || '').toLowerCase();
      const email = (inv.clientInfo?.email || '').toLowerCase();
      const phone = (inv.clientInfo?.phone || '').toLowerCase();
      return num.includes(q) || name.includes(q) || email.includes(q) || phone.includes(q);
    }
    return true;
  });

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold block">
            Studio Billing & Contracts
          </span>
          <h1 className="font-serif text-3xl font-bold text-white">Client Invoices & Legal Agreements</h1>
          <p className="text-xs text-neutral-400 mt-1">
            Official GST tax bills with 30% booking advance milestones, 90-day delivery SLAs, and 6-month cloud retention clauses.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-5 py-2.5 rounded-full bg-gold-gradient text-black font-bold text-xs uppercase tracking-wider shadow-gold-subtle hover:brightness-110 transition-all flex items-center shrink-0"
        >
          <Plus className="w-4 h-4 mr-1.5" /> Create & Direct Send Bill
        </button>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="luxury-card rounded-2xl p-6 border border-gold-500/30 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-mono text-neutral-400">Total Billed</span>
            <FileText className="w-5 h-5 text-gold-400" />
          </div>
          <h3 className="font-serif text-3xl font-bold text-white">₹{totalInvoiced.toLocaleString('en-IN')}</h3>
          <p className="text-[11px] text-neutral-400 font-mono">{invoices.length} Studio Invoices Issued</p>
        </div>

        <div className="luxury-card rounded-2xl p-6 border border-white/10 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-mono text-neutral-400">Total Collected</span>
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          </div>
          <h3 className="font-serif text-3xl font-bold text-emerald-400">₹{totalPaid.toLocaleString('en-IN')}</h3>
          <p className="text-[11px] text-neutral-400 font-mono">Captured via Razorpay / Bank</p>
        </div>

        <div className="luxury-card rounded-2xl p-6 border border-white/10 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-mono text-neutral-400">Outstanding Balance</span>
            <CreditCard className="w-5 h-5 text-gold-400" />
          </div>
          <h3 className="font-serif text-3xl font-bold text-gold-300">₹{totalPending.toLocaleString('en-IN')}</h3>
          <p className="text-[11px] text-amber-400 font-mono">Pre-wedding & delivery balances</p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 custom-scrollbar">
          {['ALL', 'ISSUED', 'PARTIALLY_PAID', 'PAID', 'DRAFT', 'CANCELLED'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono uppercase font-semibold transition-all whitespace-nowrap ${
                statusFilter === st
                  ? 'bg-gold-gradient text-black font-bold shadow-gold-subtle'
                  : 'bg-obsidian-300 text-neutral-400 hover:text-white border border-white/10'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by bill no, couple, email, mobile..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-obsidian-300 border border-white/15 rounded-full pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-gold-400"
          />
        </div>
      </div>

      {/* Invoices Table */}
      {loading ? (
        <div className="h-96 rounded-2xl bg-obsidian-400 animate-pulse" />
      ) : filteredInvoices.length === 0 ? (
        <div className="text-center py-20 bg-obsidian-400 rounded-3xl border border-white/10 space-y-3">
          <FileText className="w-8 h-8 text-gold-400 mx-auto opacity-50" />
          <h3 className="font-serif text-xl text-white">No Invoices Found</h3>
          <p className="text-xs text-neutral-400">Click "Create & Direct Send Bill" to generate a studio invoice.</p>
        </div>
      ) : (
        <div className="luxury-card rounded-2xl overflow-hidden border border-white/10">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-obsidian-500 border-b border-white/10 uppercase tracking-wider text-gold-400 font-mono">
                <tr>
                  <th className="p-4">Invoice Ref</th>
                  <th className="p-4">Client Details (Email & Phone)</th>
                  <th className="p-4">Total Amount</th>
                  <th className="p-4">Paid</th>
                  <th className="p-4">Remaining</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Due Date</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-neutral-300">
                {filteredInvoices.map((inv) => (
                  <tr key={inv._id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 font-mono font-bold text-white">
                      {inv.invoiceNumber}
                      {inv.booking && (
                        <span className="block text-[10px] text-neutral-400 font-normal">
                          Booking #{inv.booking.bookingNumber}
                        </span>
                      )}
                    </td>
                    <td className="p-4">
                      <strong className="text-white block">{inv.clientInfo?.name || inv.customer?.name}</strong>
                      <div className="flex flex-col text-[11px] text-neutral-400 mt-0.5 space-y-0.5 font-mono">
                        <span className="flex items-center text-gold-300">
                          <Mail className="w-3 h-3 mr-1 text-gold-400 shrink-0" />
                          {inv.clientInfo?.email || inv.customer?.email}
                        </span>
                        <span className="flex items-center text-emerald-400">
                          <Phone className="w-3 h-3 mr-1 text-emerald-400 shrink-0" />
                          {inv.clientInfo?.phone || inv.customer?.phone || 'No Phone'}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 font-serif text-sm font-bold text-white">
                      ₹{inv.totalAmount?.toLocaleString('en-IN')}
                    </td>
                    <td className="p-4 font-mono text-emerald-400">
                      ₹{inv.paidAmount?.toLocaleString('en-IN')}
                    </td>
                    <td className="p-4 font-mono text-gold-300 font-bold">
                      ₹{inv.remainingBalance?.toLocaleString('en-IN')}
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold uppercase ${
                          inv.status === 'PAID'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                            : inv.status === 'PARTIALLY_PAID'
                            ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                            : 'bg-gold-500/20 text-gold-300 border border-gold-500/40'
                        }`}
                      >
                        {inv.status}
                      </span>
                    </td>
                    <td className="p-4 font-mono text-neutral-400">
                      {new Date(inv.dueDate || inv.issueDate).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        {/* View Studio Bill & T&C Preview Modal */}
                        <button
                          onClick={() => setPreviewInvoice(inv)}
                          title="View Bill Details & Terms"
                          className="p-1.5 rounded-lg bg-obsidian-300 hover:bg-gold-500 hover:text-black border border-white/10 text-gold-300 transition-all"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>

                        {/* Direct Resend Alert */}
                        <button
                          onClick={() => handleResendInvoice(inv)}
                          title="Direct Resend to Client's Email & WhatsApp"
                          className="px-2.5 py-1.5 rounded-lg bg-gold-500/15 text-gold-300 hover:bg-gold-500 hover:text-black border border-gold-500/30 transition-all flex items-center font-bold text-[11px]"
                        >
                          <Send className="w-3 h-3 mr-1" /> Send
                        </button>

                        {/* Download PDF */}
                        <button
                          onClick={() => downloadPDF(inv)}
                          title="Download Signed Studio PDF Invoice"
                          className="p-1.5 rounded-lg bg-obsidian-300 hover:bg-white hover:text-black border border-white/10 text-neutral-300 transition-all"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </button>

                        {/* Delete Invoice */}
                        <button
                          onClick={() => handleDeleteInvoice(inv._id)}
                          title="Delete Invoice"
                          className="p-1.5 rounded-lg bg-red-950/40 text-red-400 hover:bg-red-900/50 border border-red-900/30 transition-all"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Create & Direct Send Invoice Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-obsidian-400 border border-gold-500/40 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl space-y-6 animate-fade-in max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div>
                <h3 className="font-serif text-xl font-bold text-white">Create Official Studio Bill & Contract</h3>
                <p className="text-xs text-neutral-400">Generates a luxury tax invoice with 30% advance milestones and full studio terms.</p>
              </div>
              <button onClick={() => setModalOpen(false)} className="text-neutral-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateInvoice} className="space-y-5 text-xs">
              {/* Optional Quick Auto-Fill */}
              <div className="p-3.5 rounded-2xl bg-obsidian-500/60 border border-gold-500/20 space-y-1.5">
                <label className="text-[11px] uppercase font-bold text-gold-400 tracking-wider block">
                  ⚡ Auto-Fill from Registered Client (Optional)
                </label>
                <select
                  value={form.customerId}
                  onChange={handleCustomerSelect}
                  className="w-full bg-obsidian-400 border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-gold-400"
                >
                  <option value="">-- Choose Existing Client OR Type New Details Below --</option>
                  {customers.map((c) => (
                    <option key={c._id} value={c.user?._id || c._id}>
                      {c.user?.name || c.name} — {c.user?.email || c.email} ({c.user?.phone || c.phone})
                    </option>
                  ))}
                </select>
              </div>

              {/* Direct Client Contact Info */}
              <div className="p-4 rounded-2xl bg-obsidian-500 border border-white/10 space-y-3">
                <h4 className="text-xs uppercase font-bold text-gold-300 tracking-wider flex items-center">
                  <User className="w-3.5 h-3.5 mr-1.5 text-gold-400" /> Client Contact Information
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-neutral-300 font-semibold uppercase">Client Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Aarav Singhania"
                      value={form.clientName}
                      onChange={(e) => setForm({ ...form, clientName: e.target.value })}
                      className="w-full bg-obsidian-400 border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-gold-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-neutral-300 font-semibold uppercase">Client Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. aarav@gmail.com"
                      value={form.clientEmail}
                      onChange={(e) => setForm({ ...form, clientEmail: e.target.value })}
                      className="w-full bg-obsidian-400 border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-gold-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-neutral-300 font-semibold uppercase">Mobile / WhatsApp No. *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. +91 98200 12345"
                      value={form.clientPhone}
                      onChange={(e) => setForm({ ...form, clientPhone: e.target.value })}
                      className="w-full bg-obsidian-400 border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-gold-400 font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-neutral-300 font-semibold uppercase">Palace Venue & Billing Address</label>
                  <input
                    type="text"
                    placeholder="e.g. City Palace & The Oberoi Udaivilas, Udaipur"
                    value={form.clientAddress}
                    onChange={(e) => setForm({ ...form, clientAddress: e.target.value })}
                    className="w-full bg-obsidian-400 border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-gold-400"
                  />
                </div>
              </div>

              {/* Line Items Dynamic Builder */}
              <div className="space-y-3 p-4 rounded-2xl bg-obsidian-500 border border-white/10">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs uppercase font-bold text-gold-300 tracking-wider">
                    Service Line Items & Cinema Deliverables
                  </h4>
                  <button
                    type="button"
                    onClick={addItemRow}
                    className="text-xs text-gold-400 hover:text-white font-semibold flex items-center"
                  >
                    <Plus className="w-3.5 h-3.5 mr-1" /> Add Service Row
                  </button>
                </div>

                <div className="space-y-2.5">
                  {form.items.map((item, idx) => (
                    <div key={idx} className="grid grid-cols-12 gap-2 items-center">
                      <div className="col-span-6">
                        <input
                          type="text"
                          required
                          placeholder="e.g. 3-Day Royal Palace Photography"
                          value={item.description}
                          onChange={(e) => handleItemChange(idx, 'description', e.target.value)}
                          className="w-full bg-obsidian-400 border border-white/15 rounded-lg px-3 py-2 text-white"
                        />
                      </div>
                      <div className="col-span-2">
                        <input
                          type="number"
                          min="1"
                          required
                          placeholder="Qty"
                          value={item.quantity}
                          onChange={(e) => handleItemChange(idx, 'quantity', e.target.value)}
                          className="w-full bg-obsidian-400 border border-white/15 rounded-lg px-2 py-2 text-center text-white"
                        />
                      </div>
                      <div className="col-span-3">
                        <input
                          type="number"
                          required
                          placeholder="Rate (₹)"
                          value={item.unitPrice}
                          onChange={(e) => handleItemChange(idx, 'unitPrice', e.target.value)}
                          className="w-full bg-obsidian-400 border border-white/15 rounded-lg px-3 py-2 text-white font-mono"
                        />
                      </div>
                      <div className="col-span-1 text-center">
                        {form.items.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeItemRow(idx)}
                            className="text-neutral-500 hover:text-red-400"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Financial Calculation Summary */}
              <div className="p-4 rounded-2xl bg-obsidian-500/80 border border-gold-500/30 space-y-2 font-mono">
                <div className="flex justify-between text-neutral-300">
                  <span>Subtotal:</span>
                  <strong className="text-white">₹{currentTotals.subtotal.toLocaleString('en-IN')}</strong>
                </div>
                <div className="flex justify-between text-neutral-300">
                  <span>GST ({form.taxRate}%):</span>
                  <strong className="text-gold-400">₹{currentTotals.taxAmt.toLocaleString('en-IN')}</strong>
                </div>
                <div className="flex justify-between text-neutral-300 pt-2 border-t border-white/10 text-sm">
                  <span className="font-serif text-white font-bold">Grand Total Amount:</span>
                  <strong className="font-serif text-gold-300 text-base">₹{currentTotals.total.toLocaleString('en-IN')}</strong>
                </div>
                {/* 30% Advance Retainer Indicator */}
                <div className="flex justify-between text-emerald-400 text-xs pt-1">
                  <span>Mandatory 30% Booking Retainer:</span>
                  <strong className="font-bold">₹{Math.round(currentTotals.total * 0.3).toLocaleString('en-IN')}</strong>
                </div>
              </div>

              {/* Advance Paid & Due Date */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-neutral-300 uppercase font-semibold">Advance Received (₹)</label>
                  <input
                    type="number"
                    value={form.paidAmount}
                    onChange={(e) => setForm({ ...form, paidAmount: e.target.value })}
                    className="w-full bg-obsidian-500 border border-white/15 rounded-xl px-3 py-2 text-emerald-400 font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-neutral-300 uppercase font-semibold">Due Date</label>
                  <input
                    type="date"
                    required
                    value={form.dueDate}
                    onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                    className="w-full bg-obsidian-500 border border-white/15 rounded-xl px-3 py-2 text-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-neutral-300 uppercase font-semibold">Status</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    className="w-full bg-obsidian-500 border border-white/15 rounded-xl px-2.5 py-2 text-gold-300 font-mono"
                  >
                    <option value="ISSUED">ISSUED</option>
                    <option value="DRAFT">DRAFT</option>
                    <option value="PARTIALLY_PAID">PARTIALLY_PAID</option>
                    <option value="PAID">PAID</option>
                  </select>
                </div>
              </div>

              {/* Terms & Conditions Notice */}
              <div className="p-3.5 rounded-2xl bg-obsidian-600 border border-gold-500/30 text-[11px] text-neutral-300 space-y-1">
                <strong className="text-gold-400 block uppercase font-mono">
                  📜 Embedded Studio Terms & Conditions:
                </strong>
                <p>• <strong>Payment Schedule:</strong> 30% Advance (Non-refundable) + 50% Pre-Wedding + 20% on Final Delivery.</p>
                <p>• <strong>Delivery SLA:</strong> Edited photos & 4K films delivered in 90 days (3 months).</p>
                <p>• <strong>Cloud Storage:</strong> Project files preserved on Moonlight Cloud for 6 months post-event.</p>
              </div>

              {/* Direct Channels Checklist */}
              <div className="p-4 rounded-2xl bg-obsidian-500/60 border border-white/10 space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-gold-400 block">
                  Direct Delivery Channels
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className="flex items-center space-x-2.5 cursor-pointer text-white">
                    <input
                      type="checkbox"
                      checked={form.sendEmail}
                      onChange={(e) => setForm({ ...form, sendEmail: e.target.checked })}
                      className="accent-gold-500 w-4 h-4"
                    />
                    <span>📧 Deliver to Client Email ({form.clientEmail || 'Client Email'})</span>
                  </label>

                  <label className="flex items-center space-x-2.5 cursor-pointer text-emerald-400 font-semibold">
                    <input
                      type="checkbox"
                      checked={form.sendWhatsApp}
                      onChange={(e) => setForm({ ...form, sendWhatsApp: e.target.checked })}
                      className="accent-emerald-500 w-4 h-4"
                    />
                    <span>💬 Deliver to Client WhatsApp ({form.clientPhone || 'Mobile No.'})</span>
                  </label>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex justify-end space-x-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-full border border-white/15 text-neutral-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 rounded-full bg-gold-gradient text-black font-bold uppercase tracking-wider shadow-gold-subtle hover:brightness-110 flex items-center disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5 mr-1.5" />
                  {submitting ? 'Directly Delivering...' : 'Create & Direct Send Bill'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Invoice Preview Modal */}
      {previewInvoice && (
        <InvoiceModal
          invoice={previewInvoice}
          isAdmin={true}
          onClose={() => setPreviewInvoice(null)}
          onResend={handleResendInvoice}
        />
      )}
    </div>
  );
};

export default AdminInvoices;
