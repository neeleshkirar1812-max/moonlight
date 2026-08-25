import React, { useState, useEffect } from 'react';
import api from '../../api/client';
import { useNotification } from '../../context/NotificationContext';
import * as XLSX from 'xlsx';
import {
  MessageSquare,
  Search,
  Filter,
  User,
  Phone,
  Mail,
  Calendar,
  MapPin,
  Users,
  CreditCard,
  FileText,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRight,
  Send,
  UserPlus,
  RefreshCw,
  Download,
  Share2,
  Sparkles,
} from 'lucide-react';

const statuses = [
  'ALL',
  'NEW',
  'CONTACTED',
  'DISCUSSION',
  'QUOTATION_SENT',
  'ADVANCE_PENDING',
  'CONFIRMED',
  'COMPLETED',
  'CANCELLED',
];

const leadSources = [
  'ALL SOURCES',
  'Instagram Ads',
  'Google Ads',
  'Website',
  'WhatsApp Direct',
  'Facebook Ads',
  'Referral',
];

const AdminEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [sourceFilter, setSourceFilter] = useState('ALL SOURCES');
  const [search, setSearch] = useState('');
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [quotationAmount, setQuotationAmount] = useState('');
  const [quotationNotes, setQuotationNotes] = useState('');
  const [assignedCrew, setAssignedCrew] = useState([]);
  const { addToast } = useNotification();

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const [eRes, empRes] = await Promise.allSettled([
        api.get(`/enquiries?status=${statusFilter}&search=${search}`),
        api.get('/admin/employees'),
      ]);
      if (eRes.status === 'fulfilled') setEnquiries(eRes.value.data || []);
      if (empRes.status === 'fulfilled') setEmployees(empRes.value.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, [statusFilter]);

  const handleStatusChange = async (enquiryId, newStatus) => {
    try {
      await api.put(`/enquiries/${enquiryId}/status`, { status: newStatus });
      setEnquiries((prev) =>
        prev.map((e) => (e._id === enquiryId ? { ...e, status: newStatus } : e))
      );
      if (selectedEnquiry?._id === enquiryId) {
        setSelectedEnquiry((prev) => ({ ...prev, status: newStatus }));
      }
      addToast({ title: 'Status Updated', message: `Enquiry status changed to ${newStatus}`, type: 'success' });
    } catch (err) {
      addToast({ title: 'Error', message: err.message, type: 'error' });
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!newNote) return;
    try {
      const res = await api.post(`/enquiries/${selectedEnquiry._id}/notes`, { note: newNote });
      setSelectedEnquiry((prev) => ({ ...prev, internalNotes: res.data }));
      setNewNote('');
      addToast({ title: 'Note Added', message: 'Internal note saved to history.', type: 'success' });
    } catch (err) {
      addToast({ title: 'Error', message: err.message, type: 'error' });
    }
  };

  const handleSendQuotation = async (e) => {
    e.preventDefault();
    if (!quotationAmount) return;
    try {
      const res = await api.post(`/enquiries/${selectedEnquiry._id}/quotation`, {
        totalAmount: Number(quotationAmount),
        advanceRequired: Math.round(Number(quotationAmount) * 0.25),
        notes: quotationNotes,
      });
      setSelectedEnquiry((prev) => ({ ...prev, quotation: res.data, status: 'QUOTATION_SENT' }));
      handleStatusChange(selectedEnquiry._id, 'QUOTATION_SENT');
      addToast({ title: 'Quotation Dispatched', message: `Proposal of ₹${Number(quotationAmount).toLocaleString('en-IN')} sent.`, type: 'success' });
    } catch (err) {
      addToast({ title: 'Error', message: err.message, type: 'error' });
    }
  };

  const handleConvertToBooking = async (enquiryId) => {
    try {
      const res = await api.post(`/enquiries/${enquiryId}/convert-to-booking`);
      addToast({
        title: 'Converted to Booking',
        message: `Booking #${res.data?.bookingNumber} confirmed. Client account created automatically.`,
        type: 'success',
      });
      fetchEnquiries();
      setDrawerOpen(false);
    } catch (err) {
      addToast({ title: 'Conversion Failed', message: err.message, type: 'error' });
    }
  };

  // Filtered Enquiries (by search, status, and lead source)
  const filteredEnquiries = enquiries.filter((enq) => {
    if (sourceFilter !== 'ALL SOURCES') {
      const enqSource = enq.leadSource || 'Website';
      if (!enqSource.toLowerCase().includes(sourceFilter.toLowerCase().replace(' ads', ''))) {
        return false;
      }
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      const id = (enq.enquiryId || '').toLowerCase();
      const name = (enq.customerDetails?.fullName || '').toLowerCase();
      const email = (enq.customerDetails?.email || '').toLowerCase();
      const phone = (enq.customerDetails?.phone || '').toLowerCase();
      const city = (enq.location?.city || '').toLowerCase();
      return id.includes(q) || name.includes(q) || email.includes(q) || phone.includes(q) || city.includes(q);
    }
    return true;
  });

  // Export Enquiries directly to Excel Spreadsheet (.xlsx)
  const handleExportExcel = () => {
    try {
      const rows = filteredEnquiries.map((enq) => ({
        'Enquiry Ref ID': enq.enquiryId || '',
        'Lead Source': enq.leadSource || 'Website',
        'Client Full Name': enq.customerDetails?.fullName || '',
        'Email Address': enq.customerDetails?.email || '',
        'Mobile / WhatsApp': enq.customerDetails?.whatsappNumber || enq.customerDetails?.phone || '',
        'Event Type': enq.eventType || '',
        'Event Date': enq.eventDate ? new Date(enq.eventDate).toLocaleDateString('en-IN') : '',
        'City & Venue': `${enq.location?.city || ''}${enq.location?.venue ? ' - ' + enq.location.venue : ''}`,
        'Guest Count': enq.guestCount || 0,
        'Budget Range': enq.budgetRange || '',
        'Required Services': (enq.requiredServices || []).join(', '),
        'Quotation (INR)': enq.quotation?.totalAmount ? `₹${enq.quotation.totalAmount.toLocaleString('en-IN')}` : 'Pending Proposal',
        'Status': enq.status || 'NEW',
        'Enquiry Date & Time': enq.createdAt ? new Date(enq.createdAt).toLocaleString('en-IN') : '',
        'Client Story & Notes': enq.storyDetails || '',
      }));

      const worksheet = XLSX.utils.json_to_sheet(rows);
      worksheet['!cols'] = [
        { wch: 18 },
        { wch: 18 },
        { wch: 25 },
        { wch: 28 },
        { wch: 18 },
        { wch: 22 },
        { wch: 14 },
        { wch: 25 },
        { wch: 12 },
        { wch: 20 },
        { wch: 30 },
        { wch: 20 },
        { wch: 16 },
        { wch: 22 },
        { wch: 40 },
      ];

      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Enquiries Pipeline');
      XLSX.writeFile(workbook, `Moonlight_Enquiries_AutoSheet_${new Date().toISOString().split('T')[0]}.xlsx`);

      addToast({
        title: 'Auto-Excel Sheet Exported',
        message: `${rows.length} Enquiries (Website, Instagram & Google Ads) saved to Excel (.xlsx)!`,
        type: 'success',
      });
    } catch (e) {
      addToast({ title: 'Export Failed', message: e.message, type: 'error' });
    }
  };

  const getSourceBadge = (source = 'Website') => {
    const s = source.toLowerCase();
    if (s.includes('insta')) {
      return 'bg-pink-500/20 text-pink-300 border border-pink-500/40';
    }
    if (s.includes('google') || s.includes('ad')) {
      return 'bg-blue-500/20 text-blue-300 border border-blue-500/40';
    }
    if (s.includes('whats')) {
      return 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40';
    }
    return 'bg-gold-500/20 text-gold-300 border border-gold-500/40';
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold block">
            Lead Capture & Conversion
          </span>
          <h1 className="font-serif text-3xl font-bold text-white">Enquiries Pipeline & Auto-Excel</h1>
          <p className="text-xs text-neutral-400 mt-1">
            Tracking website, Instagram Ads, and Google Ads leads with auto-synced Excel spreadsheet generator.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          {/* Export to Excel (.xlsx) Button */}
          <button
            onClick={handleExportExcel}
            className="px-5 py-2.5 rounded-full bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500 hover:text-black border border-emerald-500/40 font-bold text-xs uppercase tracking-wider transition-all flex items-center shadow-lg"
          >
            <Download className="w-4 h-4 mr-2" /> Export to Excel (.xlsx)
          </button>

          <button
            onClick={fetchEnquiries}
            className="p-2.5 rounded-full bg-obsidian-400 border border-white/10 text-neutral-400 hover:text-white"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filter Tabs & Lead Source Bar */}
      <div className="space-y-3 pb-4 border-b border-white/10">
        {/* Status Filters */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 custom-scrollbar">
          {statuses.map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold transition-all whitespace-nowrap ${
                statusFilter === st
                  ? 'bg-gold-gradient text-black font-bold shadow-gold-subtle'
                  : 'bg-obsidian-300 text-neutral-400 hover:text-white border border-white/10'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        {/* Lead Source Filter Buttons & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 custom-scrollbar">
            <span className="text-[11px] text-gold-400 uppercase font-bold tracking-wider shrink-0 mr-1">
              Source:
            </span>
            {leadSources.map((src) => (
              <button
                key={src}
                onClick={() => setSourceFilter(src)}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-semibold transition-all whitespace-nowrap ${
                  sourceFilter === src
                    ? 'bg-white text-black font-bold'
                    : 'bg-obsidian-400 text-neutral-400 hover:text-white border border-white/10'
                }`}
              >
                {src}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by ID, name, email, phone, city..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-obsidian-300 border border-white/15 rounded-full pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-gold-400"
            />
          </div>
        </div>
      </div>

      {/* Enquiries Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="h-64 rounded-2xl bg-obsidian-400 animate-pulse" />
          ))}
        </div>
      ) : filteredEnquiries.length === 0 ? (
        <div className="text-center py-20 bg-obsidian-400 rounded-3xl border border-white/10 space-y-3">
          <MessageSquare className="w-8 h-8 text-gold-400 mx-auto opacity-50" />
          <h3 className="font-serif text-xl text-white">No Enquiries Found</h3>
          <p className="text-xs text-neutral-400">Try changing status or lead source filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEnquiries.map((enq) => (
            <div
              key={enq._id}
              onClick={() => {
                setSelectedEnquiry(enq);
                setDrawerOpen(true);
              }}
              className="luxury-card rounded-2xl p-5 border border-white/10 hover:border-gold-500/40 cursor-pointer transition-all space-y-4 group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-white group-hover:text-gold-300 transition-colors">
                    {enq.enquiryId}
                  </span>
                  
                  {/* Lead Source Badge */}
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider ${getSourceBadge(enq.leadSource)}`}>
                    {enq.leadSource || 'Website'}
                  </span>
                </div>

                <div>
                  <h3 className="font-serif text-base font-bold text-white">
                    {enq.customerDetails?.fullName}
                  </h3>
                  <p className="text-xs text-gold-300/90 font-medium">{enq.eventType}</p>
                </div>

                <div className="space-y-1.5 text-xs text-neutral-400 font-mono">
                  <div className="flex items-center">
                    <Calendar className="w-3.5 h-3.5 mr-2 text-gold-400 shrink-0" />
                    <span>{new Date(enq.eventDate).toLocaleDateString('en-US', { dateStyle: 'medium' })}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-3.5 h-3.5 mr-2 text-gold-400 shrink-0" />
                    <span>{enq.location?.city}{enq.location?.venue ? ` (${enq.location.venue})` : ''}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-3.5 h-3.5 mr-2 text-gold-400 shrink-0" />
                    <span>~{enq.guestCount} Guests • Budget: {enq.budgetRange}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-mono uppercase font-semibold ${
                    enq.status === 'CONFIRMED'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : enq.status === 'QUOTATION_SENT'
                      ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                      : 'bg-gold-500/20 text-gold-300 border border-gold-500/40'
                  }`}
                >
                  {enq.status}
                </span>

                <span className="text-gold-400 text-xs flex items-center group-hover:translate-x-1 transition-transform">
                  Details <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Slide-Over Drawer Details */}
      {drawerOpen && selectedEnquiry && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-xl bg-obsidian-400 border-l border-gold-500/30 h-full overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl animate-fade-in custom-scrollbar">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <span className="text-[10px] font-mono uppercase text-gold-400 block font-bold">
                  Source: {selectedEnquiry.leadSource || 'Website'}
                </span>
                <h2 className="font-serif text-2xl font-bold text-white">{selectedEnquiry.enquiryId}</h2>
              </div>
              <button onClick={() => setDrawerOpen(false)} className="text-neutral-400 hover:text-white p-2">
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            {/* Client Contact Block */}
            <div className="luxury-card rounded-2xl p-5 border border-white/10 space-y-3">
              <h3 className="text-xs uppercase font-bold text-gold-400 tracking-wider">Client Contact</h3>
              <div className="space-y-2 text-xs">
                <p className="text-white text-sm font-bold">{selectedEnquiry.customerDetails?.fullName}</p>
                <p className="text-neutral-300 flex items-center font-mono">
                  <Mail className="w-3.5 h-3.5 mr-2 text-gold-400" /> {selectedEnquiry.customerDetails?.email}
                </p>
                <p className="text-neutral-300 flex items-center font-mono">
                  <Phone className="w-3.5 h-3.5 mr-2 text-emerald-400" /> {selectedEnquiry.customerDetails?.phone}
                </p>
              </div>
            </div>

            {/* Quick Status Updater */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase text-neutral-300">Update Status</label>
              <div className="grid grid-cols-3 gap-2">
                {statuses.filter((s) => s !== 'ALL').map((st) => (
                  <button
                    key={st}
                    onClick={() => handleStatusChange(selectedEnquiry._id, st)}
                    className={`px-2 py-2 rounded-xl text-[10px] font-mono uppercase font-bold transition-all ${
                      selectedEnquiry.status === st
                        ? 'bg-gold-gradient text-black font-bold shadow-gold-subtle'
                        : 'bg-obsidian-500 text-neutral-400 hover:text-white border border-white/10'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Quotation Sender */}
            <div className="luxury-card rounded-2xl p-5 border border-gold-500/30 space-y-4">
              <h3 className="text-xs uppercase font-bold text-gold-400 tracking-wider flex items-center">
                <CreditCard className="w-4 h-4 mr-2" /> Send Proposal / Quotation
              </h3>
              <form onSubmit={handleSendQuotation} className="space-y-3 text-xs">
                <div>
                  <label className="text-neutral-300 block mb-1">Total Package Amount (₹)</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 1850000"
                    value={quotationAmount}
                    onChange={(e) => setQuotationAmount(e.target.value)}
                    className="w-full bg-obsidian-500 border border-white/15 rounded-xl px-3 py-2 text-white font-mono focus:border-gold-400"
                  />
                  {quotationAmount && (
                    <span className="text-[10px] text-emerald-400 font-mono mt-1 block">
                      Auto 25% Advance: ₹{Math.round(Number(quotationAmount) * 0.25).toLocaleString('en-IN')}
                    </span>
                  )}
                </div>

                <div>
                  <label className="text-neutral-300 block mb-1">Proposal Inclusions & Notes</label>
                  <textarea
                    rows={2}
                    placeholder="e.g. 2 Master Directors, 4K Cinema Docu-film, Drone and 2 Italian Leather Albums included."
                    value={quotationNotes}
                    onChange={(e) => setQuotationNotes(e.target.value)}
                    className="w-full bg-obsidian-500 border border-white/15 rounded-xl px-3 py-2 text-white focus:border-gold-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-gold-gradient text-black font-bold uppercase tracking-wider text-xs shadow-gold-subtle hover:brightness-110 flex items-center justify-center"
                >
                  <Send className="w-3.5 h-3.5 mr-1.5" /> Dispatch Quotation
                </button>
              </form>
            </div>

            {/* Convert to Confirmed Booking */}
            <div className="pt-2">
              <button
                onClick={() => handleConvertToBooking(selectedEnquiry._id)}
                className="w-full py-3.5 rounded-2xl bg-emerald-500 text-black font-bold uppercase tracking-widest text-xs shadow-lg hover:brightness-110 flex items-center justify-center transition-all"
              >
                <CheckCircle2 className="w-4 h-4 mr-2" /> Convert to Confirmed Booking
              </button>
            </div>

            {/* Internal Notes History */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              <h3 className="text-xs uppercase font-bold text-neutral-300 tracking-wider">Internal Studio Notes</h3>
              <form onSubmit={handleAddNote} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add private note for crew..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  className="flex-1 bg-obsidian-500 border border-white/15 rounded-xl px-3 py-2 text-xs text-white"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-white/10 hover:bg-gold-500 hover:text-black rounded-xl text-xs font-bold text-white transition-colors"
                >
                  Save
                </button>
              </form>

              <div className="space-y-2 max-h-40 overflow-y-auto custom-scrollbar">
                {selectedEnquiry.internalNotes?.map((n, i) => (
                  <div key={i} className="p-3 bg-obsidian-500/60 rounded-xl text-xs space-y-1">
                    <p className="text-neutral-200">{n.note}</p>
                    <span className="text-[10px] text-neutral-500 font-mono block">
                      {n.authorName} • {new Date(n.createdAt).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEnquiries;
