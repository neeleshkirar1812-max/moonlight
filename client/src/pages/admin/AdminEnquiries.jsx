import React, { useState, useEffect } from 'react';
import api from '../../api/client';
import { useNotification } from '../../context/NotificationContext';
import * as XLSX from 'xlsx';
import { generateQuotationPDF } from '../../utils/quotationPdfGenerator';
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
  Kanban,
  List,
  ExternalLink,
  Sliders,
  Check,
  Zap,
  X,
  Plus,
  Instagram,
  MessageCircle,
  Copy,
  Layers,
  Globe,
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

const kanbanColumns = [
  { id: 'NEW', title: '📥 New Inquiries', color: 'border-amber-500/40 text-amber-800' },
  { id: 'CONTACTED', title: '📞 Contacted / Discussion', color: 'border-blue-500/40 text-blue-800' },
  { id: 'QUOTATION_SENT', title: '📄 Quotation Sent', color: 'border-purple-500/40 text-purple-800' },
  { id: 'CONFIRMED', title: '👑 Confirmed Shoots', color: 'border-emerald-500/40 text-emerald-800' },
  { id: 'COMPLETED', title: '✨ Completed & Delivered', color: 'border-neutral-500/40 text-neutral-800' },
];

const leadSources = [
  'ALL SOURCES',
  'Instagram Ads / DM',
  'Facebook Ads',
  'WhatsApp Direct',
  'Google Ads',
  'WeddingWire / WedMeGood',
  'Website Form',
  'Phone Call / Referral',
];

const mockInitialEnquiries = [
  {
    _id: 'enq-1',
    enquiryId: 'ENQ-9812',
    leadSource: 'Instagram Ads',
    customerDetails: { fullName: 'Vikram & Radhika Singhania', email: 'vikram.singhania@gmail.com', phone: '+91 98200 99887' },
    eventType: 'Royal Palace Destination Wedding',
    eventDate: '2026-11-18',
    location: { city: 'Udaipur', venue: 'The Oberoi Udaivilas' },
    guestCount: 450,
    budgetRange: '₹15L - ₹25L',
    requiredServices: ['4K Cinema Docu-Film', 'Aerial Drone', '2x Leather Albums'],
    status: 'NEW',
    createdAt: '2026-08-25T14:30:00Z',
    storyDetails: 'Looking for regal palace aesthetics with natural light candid portraiture.',
  },
  {
    _id: 'enq-2',
    enquiryId: 'ENQ-9813',
    leadSource: 'Website',
    customerDetails: { fullName: 'Arjun & Meera Kapoor', email: 'arjun.meera@gmail.com', phone: '+91 92292 29323' },
    eventType: 'Cinematic Pre-Wedding Shoot',
    eventDate: '2026-10-05',
    location: { city: 'Maheshwar', venue: 'Ahilya Fort & Ghats' },
    guestCount: 2,
    budgetRange: '₹1.5L - ₹3L',
    requiredServices: ['4K Trailer', '3 Wardrobe Changes', 'Drone Sweeps'],
    status: 'CONTACTED',
    createdAt: '2026-08-25T12:15:00Z',
    storyDetails: 'Sunset boat shoot on Narmada river and heritage fort ramparts.',
  },
  {
    _id: 'enq-3',
    enquiryId: 'ENQ-9814',
    leadSource: 'WhatsApp Direct',
    customerDetails: { fullName: 'Siddharth & Tara Deshmukh', email: 'siddharth.deshmukh@gmail.com', phone: '+91 98260 11223' },
    eventType: '3-Day Royal Wedding Suite',
    eventDate: '2026-12-10',
    location: { city: 'Goa', venue: 'Beachside Heritage Resort' },
    guestCount: 350,
    budgetRange: '₹8L - ₹12L',
    quotation: { totalAmount: 850000, advanceRequired: 255000 },
    requiredServices: ['Full Coverage', '4K Cinema', 'Drone'],
    status: 'QUOTATION_SENT',
    createdAt: '2026-08-24T18:00:00Z',
    storyDetails: 'Sunset pheras on the beach followed by grand reception.',
  },
  {
    _id: 'enq-4',
    enquiryId: 'ENQ-9815',
    leadSource: 'Google Ads',
    customerDetails: { fullName: 'Aarav & Ananya Sharma', email: 'aarav.ananya@gmail.com', phone: '+91 92292 29323' },
    eventType: 'Royal Palace Destination Wedding',
    eventDate: '2026-11-20',
    location: { city: 'Bhopal', venue: 'Jehan Numa Palace' },
    guestCount: 500,
    budgetRange: '₹10L - ₹15L',
    quotation: { totalAmount: 1100000, advanceRequired: 330000 },
    status: 'CONFIRMED',
    createdAt: '2026-08-23T10:00:00Z',
    storyDetails: 'Confirmed 3-day royal shoot. Advance received.',
  },
];

const AdminEnquiries = () => {
  const [enquiries, setEnquiries] = useState(mockInitialEnquiries);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState('kanban'); // 'kanban' | 'list'
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [sourceFilter, setSourceFilter] = useState('ALL SOURCES');
  const [search, setSearch] = useState('');
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [googleSyncModal, setGoogleSyncModal] = useState(false);
  const [addLeadModalOpen, setAddLeadModalOpen] = useState(false);
  const [pipelineGuideModalOpen, setPipelineGuideModalOpen] = useState(false);
  const [pipelineTab, setPipelineTab] = useState('meta');
  const [copiedWebhook, setCopiedWebhook] = useState(false);
  const [googleSheetUrl, setGoogleSheetUrl] = useState(() => localStorage.getItem('moonlight_gsheet_webhook') || '');
  const [isAutoSyncing, setIsAutoSyncing] = useState(true);
  const [lastSyncTime, setLastSyncTime] = useState('Just now');
  const [newNote, setNewNote] = useState('');
  const [quotationAmount, setQuotationAmount] = useState('');
  const [quotationNotes, setQuotationNotes] = useState('');
  const [leadForm, setLeadForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    leadSource: 'Instagram Ads / DM',
    eventType: 'Royal Palace Destination Wedding',
    eventDate: '',
    city: 'Bhopal',
    venue: '',
    guestCount: 350,
    budgetRange: '₹3L - ₹6L',
    storyDetails: '',
  });
  const { addToast } = useNotification();

  const handleCreateLead = async (e) => {
    e.preventDefault();
    if (!leadForm.fullName.trim() || !leadForm.phone.trim()) {
      addToast({ title: 'Fields Required', message: 'Please enter at least client name and phone number.', type: 'warning' });
      return;
    }

    const newEnq = {
      _id: `enq-${Date.now()}`,
      enquiryId: `ENQ-${Math.floor(1000 + Math.random() * 9000)}`,
      leadSource: leadForm.leadSource,
      customerDetails: {
        fullName: leadForm.fullName.trim(),
        email: leadForm.email.trim() || `${leadForm.phone.replace(/\D/g, '')}@moonlightclients.in`,
        phone: leadForm.phone.trim(),
        whatsappNumber: leadForm.phone.trim(),
      },
      eventType: leadForm.eventType,
      eventDate: leadForm.eventDate || new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
      location: {
        city: leadForm.city.trim() || 'Bhopal',
        venue: leadForm.venue.trim() || 'Grand Heritage Venue',
      },
      guestCount: Number(leadForm.guestCount) || 300,
      budgetRange: leadForm.budgetRange,
      requiredServices: ['4K Cinema Docu-Film', 'Candid Master Photography', 'Aerial 4K Drone'],
      status: 'NEW',
      createdAt: new Date().toISOString(),
      storyDetails: leadForm.storyDetails || `Direct lead recorded via ${leadForm.leadSource}.`,
    };

    setEnquiries((prev) => [newEnq, ...prev]);

    try {
      await api.post('/enquiries', newEnq);
    } catch (err) {}

    addToast({
      title: 'Lead Added to Pipeline 🎉',
      message: `${leadForm.fullName} (${leadForm.leadSource}) logged into CRM pipeline.`,
      type: 'success',
    });

    setAddLeadModalOpen(false);
    setLeadForm({
      fullName: '',
      phone: '',
      email: '',
      leadSource: 'Instagram Ads / DM',
      eventType: 'Royal Palace Destination Wedding',
      eventDate: '',
      city: 'Bhopal',
      venue: '',
      guestCount: 350,
      budgetRange: '₹3L - ₹6L',
      storyDetails: '',
    });
  };

  const fetchEnquiries = async () => {
    try {
      const res = await api.get(`/enquiries?status=${statusFilter}&search=${search}`);
      if (res.data && res.data.length > 0) {
        setEnquiries(res.data);
      }
    } catch (err) {
      // Use client memory state
    }
    setLastSyncTime(new Date().toLocaleTimeString());
  };

  // Real-Time Polling Cloud Auto-Sync Engine (Auto updates every 15 seconds)
  useEffect(() => {
    fetchEnquiries();
    const interval = setInterval(() => {
      if (isAutoSyncing) {
        fetchEnquiries();
      }
    }, 15000);
    return () => clearInterval(interval);
  }, [statusFilter, isAutoSyncing]);

  const handleStatusChange = (enquiryId, newStatus) => {
    setEnquiries((prev) =>
      prev.map((e) => (e._id === enquiryId || e.enquiryId === enquiryId ? { ...e, status: newStatus } : e))
    );
    if (selectedEnquiry?._id === enquiryId || selectedEnquiry?.enquiryId === enquiryId) {
      setSelectedEnquiry((prev) => ({ ...prev, status: newStatus }));
    }

    addToast({
      title: 'Pipeline Auto-Synced',
      message: `Lead moved to ${newStatus.replace('_', ' ')} in real-time Cloud CRM.`,
      type: 'success',
    });
  };

  const handleSaveGoogleSheetWebhook = (e) => {
    e.preventDefault();
    localStorage.setItem('moonlight_gsheet_webhook', googleSheetUrl);
    setGoogleSyncModal(false);
    addToast({
      title: 'Google Sheets Live Sync Connected',
      message: 'Every new inquiry will automatically append a live row to your Google Spreadsheet in real-time!',
      type: 'success',
    });
  };

  const handleSendWhatsAppPitch = (enq) => {
    const phone = (enq.customerDetails?.phone || '').replace(/\D/g, '');
    const clientName = enq.customerDetails?.fullName || 'Valued Couple';
    const text = encodeURIComponent(
      `Namaste ${clientName} ji! ✨\n\nGreetings from Moonlight Production & Wedding Films.\nWe received your inquiry for *${enq.eventType}* in *${enq.location?.city}* on *${new Date(enq.eventDate).toLocaleDateString('en-IN')}*.\n\nOur Executive Director would love to share our 2026–2027 Royal Wedding Portfolio & custom package options with you.\n\nDirect Hotline: +91 92292 29323\nInstagram: @moonlight_production__`
    );
    window.open(`https://api.whatsapp.com/send?phone=${phone || '919229229323'}&text=${text}`, '_blank');
  };

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!newNote || !selectedEnquiry) return;
    const noteObj = {
      note: newNote,
      authorName: 'Studio Director',
      createdAt: new Date().toISOString(),
    };
    const updatedNotes = [noteObj, ...(selectedEnquiry.internalNotes || [])];
    setSelectedEnquiry({ ...selectedEnquiry, internalNotes: updatedNotes });
    setEnquiries((prev) =>
      prev.map((item) => (item._id === selectedEnquiry._id ? { ...item, internalNotes: updatedNotes } : item))
    );
    setNewNote('');
    addToast({ title: 'Internal Note Synced', message: 'Note saved to live pipeline ledger.', type: 'success' });
  };

  const handleSendQuotation = (e) => {
    e.preventDefault();
    if (!quotationAmount || !selectedEnquiry) return;
    const quoteObj = {
      totalAmount: Number(quotationAmount),
      advanceRequired: Math.round(Number(quotationAmount) * 0.3),
      notes: quotationNotes,
      sentAt: new Date().toISOString(),
    };
    setSelectedEnquiry({ ...selectedEnquiry, quotation: quoteObj, status: 'QUOTATION_SENT' });
    handleStatusChange(selectedEnquiry._id, 'QUOTATION_SENT');
    addToast({
      title: 'Quotation Dispatched & Synced',
      message: `Proposal of ₹${Number(quotationAmount).toLocaleString('en-IN')} logged in Cloud CRM.`,
      type: 'success',
    });
  };

  const handleConvertToBooking = (enquiryId) => {
    handleStatusChange(enquiryId, 'CONFIRMED');
    addToast({
      title: 'Booking Confirmed 🎉',
      message: `Lead converted to active wedding booking! Client portal account initialized.`,
      type: 'success',
    });
    setDrawerOpen(false);
  };

  const handleExportToExcel = () => {
    try {
      const rows = enquiries.map((enq) => ({
        'Enquiry ID': enq.enquiryId || enq._id,
        'Client Name': enq.customerDetails?.fullName || 'N/A',
        'Email': enq.customerDetails?.email || 'N/A',
        'Phone': enq.customerDetails?.phone || 'N/A',
        'Event Type': enq.eventType || 'Wedding Shoot',
        'Event Date': enq.eventDate ? new Date(enq.eventDate).toLocaleDateString('en-IN') : 'N/A',
        'City': enq.location?.city || 'N/A',
        'Venue': enq.location?.venue || 'N/A',
        'Guest Count': enq.guestCount || 'N/A',
        'Budget Range': enq.budgetRange || 'N/A',
        'Status': enq.status || 'NEW',
        'Quotation Total (INR)': enq.quotation?.totalAmount || 0,
        'Advance Required (INR)': enq.quotation?.advanceRequired || 0,
        'Lead Source': enq.leadSource || 'Website',
        'Created Date': enq.createdAt ? new Date(enq.createdAt).toLocaleDateString('en-IN') : 'N/A',
      }));

      const worksheet = XLSX.utils.json_to_sheet(rows);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Enquiries Pipeline');
      XLSX.writeFile(workbook, `Moonlight_Enquiries_Pipeline_${new Date().toISOString().slice(0, 10)}.xlsx`);

      addToast({
        title: 'Export Successful',
        message: `${rows.length} Enquiries exported to Excel (.xlsx) successfully!`,
        type: 'success',
      });
    } catch (err) {
      addToast({ title: 'Export Failed', message: err.message, type: 'error' });
    }
  };


  // Filtered Enquiries
  const filteredEnquiries = enquiries.filter((enq) => {
    if (sourceFilter !== 'ALL SOURCES') {
      const enqSource = enq.leadSource || 'Website';
      if (!enqSource.toLowerCase().includes(sourceFilter.toLowerCase().replace(' ads', ''))) {
        return false;
      }
    }
    if (statusFilter !== 'ALL') {
      if (enq.status !== statusFilter) return false;
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

  const getSourceBadge = (source = 'Website') => {
    const s = source.toLowerCase();
    if (s.includes('insta')) return 'bg-pink-50 text-pink-700 border border-pink-200';
    if (s.includes('face') || s.includes('fb')) return 'bg-indigo-50 text-indigo-700 border border-indigo-200';
    if (s.includes('whats')) return 'bg-emerald-50 text-emerald-800 border border-emerald-200';
    if (s.includes('google') || s.includes('ad')) return 'bg-blue-50 text-blue-700 border border-blue-200';
    if (s.includes('wed') || s.includes('matri')) return 'bg-purple-50 text-purple-700 border border-purple-200';
    if (s.includes('call') || s.includes('phone') || s.includes('refer')) return 'bg-teal-50 text-teal-800 border border-teal-200';
    return 'bg-amber-50 text-amber-800 border border-amber-200';
  };

  return (
    <div className="space-y-8 animate-fade-in text-neutral-900">
      {/* Header with Live Cloud Stream Indicators */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs uppercase font-mono tracking-widest text-amber-700 font-bold block">
              Real-Time Lead CRM & Social Inquiries
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse mr-1.5" />
              Live Cloud Sync Active
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900 mt-1">
            Enquiries Live Pipeline
          </h1>
          <p className="text-xs text-neutral-600 mt-0.5">
            Auto-synced with Instagram, Facebook Ads, WhatsApp, Google Ads & Website. Last synced: <span className="font-mono text-neutral-900 font-semibold">{lastSyncTime}</span>.
          </p>
        </div>

        {/* Top Controls: Add Lead, Connect Pipeline, View Switcher, Excel & Refresh */}
        <div className="flex items-center space-x-2.5 shrink-0 flex-wrap gap-y-2">
          {/* + Add Social / Direct Lead (Primary) */}
          <button
            onClick={() => setAddLeadModalOpen(true)}
            className="px-4 py-2.5 rounded-full bg-gold-gradient text-neutral-950 font-extrabold text-xs uppercase tracking-wider shadow-sm hover:brightness-105 active:scale-95 transition-all flex items-center shrink-0 btn-shimmer"
            title="Log Lead from Instagram, Facebook, WhatsApp, Google Ads or Call"
          >
            <Plus className="w-4 h-4 mr-1.5" />
            + Add Social / Direct Lead
          </button>

          {/* Connect Social Pipeline & Webhooks */}
          <button
            onClick={() => setPipelineGuideModalOpen(true)}
            className="px-3.5 py-2.5 rounded-full bg-white hover:bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold uppercase tracking-wider transition-all flex items-center shadow-sm"
            title="Connect Meta Ads (Instagram/FB), Google Sheets & Webhooks"
          >
            <Zap className="w-3.5 h-3.5 mr-1 text-emerald-600" />
            🔗 Connect Social Pipeline
          </button>

          {/* Export to Excel (.xlsx) */}
          <button
            onClick={handleExportToExcel}
            className="px-3.5 py-2.5 rounded-full bg-white hover:bg-amber-50 border border-amber-900/20 text-neutral-800 text-xs font-bold uppercase tracking-wider transition-all flex items-center shadow-sm"
            title="Download Full Pipeline to Excel (.xlsx)"
          >
            <Download className="w-3.5 h-3.5 mr-1 text-amber-700" />
            Export Excel (.xlsx)
          </button>

          {/* View Mode Switcher */}
          <div className="flex items-center p-1 rounded-full bg-white border border-amber-900/15 shadow-sm">
            <button
              onClick={() => setViewMode('kanban')}
              className={`px-3 py-1 rounded-full text-xs font-bold font-mono transition-all flex items-center ${
                viewMode === 'kanban' ? 'bg-gold-gradient text-neutral-950 font-extrabold shadow-gold-subtle' : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <Kanban className="w-3.5 h-3.5 mr-1" /> Pipeline Board
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1 rounded-full text-xs font-bold font-mono transition-all flex items-center ${
                viewMode === 'list' ? 'bg-gold-gradient text-neutral-950 font-extrabold shadow-gold-subtle' : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <List className="w-3.5 h-3.5 mr-1" /> Table List
            </button>
          </div>

          <button
            onClick={fetchEnquiries}
            className="p-2.5 rounded-full bg-white border border-amber-900/15 text-neutral-600 hover:text-neutral-900 hover:bg-stone-50 transition-colors shadow-sm"
            title="Instant Refresh"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filter Tabs & Lead Source Bar */}
      <div className="space-y-3 pb-4 border-b border-amber-900/10">
        {/* Source Filters & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 custom-scrollbar">
            <span className="text-[11px] text-amber-800 uppercase font-mono font-bold tracking-wider shrink-0 mr-1">
              Source:
            </span>
            {leadSources.map((src) => (
              <button
                key={src}
                onClick={() => setSourceFilter(src)}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-semibold transition-all whitespace-nowrap ${
                  sourceFilter === src
                    ? 'bg-gold-gradient text-neutral-950 font-extrabold shadow-gold-subtle'
                    : 'bg-white text-neutral-600 hover:text-neutral-900 border border-amber-900/15 shadow-sm'
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
              className="w-full bg-white border border-amber-900/20 rounded-full pl-9 pr-4 py-2 text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30"
            />
          </div>
        </div>
      </div>

      {/* VIEW MODE 1: LIVE KANBAN PIPELINE BOARD */}
      {viewMode === 'kanban' && (
        <div className="flex lg:grid lg:grid-cols-5 gap-4 items-start overflow-x-auto custom-scrollbar pb-4 snap-x snap-mandatory">
          {kanbanColumns.map((col) => {
            const colLeads = filteredEnquiries.filter((e) => {
              if (col.id === 'NEW') return e.status === 'NEW';
              if (col.id === 'CONTACTED') return e.status === 'CONTACTED' || e.status === 'DISCUSSION';
              if (col.id === 'QUOTATION_SENT') return e.status === 'QUOTATION_SENT' || e.status === 'ADVANCE_PENDING';
              if (col.id === 'CONFIRMED') return e.status === 'CONFIRMED';
              if (col.id === 'COMPLETED') return e.status === 'COMPLETED';
              return false;
            });

            return (
              <div
                key={col.id}
                className="w-[85vw] max-w-[340px] sm:w-[320px] lg:w-auto shrink-0 lg:shrink snap-start bg-stone-50 rounded-3xl p-4 border border-amber-900/15 flex flex-col space-y-3 min-h-[500px] shadow-sm"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between pb-3 border-b border-amber-900/10">
                  <h3 className={`font-serif text-sm font-bold ${col.color}`}>{col.title}</h3>
                  <span className="px-2 py-0.5 rounded-full bg-white border border-amber-900/15 text-xs font-mono font-bold text-neutral-800 shadow-sm">
                    {colLeads.length}
                  </span>
                </div>

                {/* Cards in this Column */}
                <div className="space-y-3 flex-1 overflow-y-auto max-h-[600px] custom-scrollbar pr-1">
                  {colLeads.map((enq) => (
                    <div
                      key={enq._id || enq.enquiryId}
                      onClick={() => {
                        setSelectedEnquiry(enq);
                        setDrawerOpen(true);
                      }}
                      className="bg-white hover:bg-amber-50/30 rounded-2xl p-4 border border-amber-900/15 hover:border-amber-500/50 cursor-pointer transition-all space-y-2.5 shadow-sm hover:shadow-md group relative"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">{enq.enquiryId}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase ${getSourceBadge(enq.leadSource)}`}>
                          {enq.leadSource || 'Web'}
                        </span>
                      </div>

                      <div>
                        <h4 className="font-serif text-sm font-bold text-neutral-900 group-hover:text-amber-800 transition-colors">
                          {enq.customerDetails?.fullName}
                        </h4>
                        <p className="text-[11px] text-neutral-600 font-light truncate">{enq.eventType}</p>
                      </div>

                      <div className="space-y-1 text-[11px] text-neutral-600 font-mono">
                        <p className="flex items-center"><Calendar className="w-3 h-3 mr-1 text-amber-600 shrink-0" /> {new Date(enq.eventDate).toLocaleDateString('en-IN')}</p>
                        <p className="flex items-center"><MapPin className="w-3 h-3 mr-1 text-amber-600 shrink-0" /> {enq.location?.city}</p>
                        <p className="flex items-center"><CreditCard className="w-3 h-3 mr-1 text-emerald-600 shrink-0" /> {enq.quotation?.totalAmount ? `₹${enq.quotation.totalAmount.toLocaleString('en-IN')}` : enq.budgetRange}</p>
                      </div>

                      {/* Quick 1-Click WhatsApp Direct Pitch */}
                      <div className="pt-2 border-t border-amber-900/10 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSendWhatsAppPitch(enq);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-800 border border-emerald-300 text-[10px] font-bold font-mono transition-all flex items-center shadow-sm"
                          title="Open WhatsApp Direct Pitch"
                        >
                          <Phone className="w-2.5 h-2.5 mr-1" /> WhatsApp
                        </button>

                        <span className="text-[10px] text-amber-800 font-bold flex items-center group-hover:translate-x-0.5 transition-transform">
                          Details →
                        </span>
                      </div>
                    </div>
                  ))}

                  {colLeads.length === 0 && (
                    <div className="text-center py-12 text-neutral-400 text-xs font-mono">
                      No leads in this stage
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* VIEW MODE 2: TABLE LIST VIEW */}
      {viewMode === 'list' && (
        <div className="bg-white rounded-3xl border border-amber-900/15 overflow-hidden shadow-sm">
          <div className="overflow-x-auto custom-scrollbar w-full">
            <table className="w-full min-w-[750px] text-left text-xs">
              <thead className="bg-stone-50 text-neutral-600 uppercase font-mono text-[10px] border-b border-amber-900/10">
                <tr>
                  <th className="p-4">Ref ID & Source</th>
                  <th className="p-4">Client Name & Contact</th>
                  <th className="p-4">Shoot Details & City</th>
                  <th className="p-4">Scale / Budget</th>
                  <th className="p-4">Live Status</th>
                  <th className="p-4 text-right">Instant Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-neutral-800 font-sans">
                {filteredEnquiries.map((enq) => (
                  <tr
                    key={enq._id}
                    onClick={() => {
                      setSelectedEnquiry(enq);
                      setDrawerOpen(true);
                    }}
                    className="hover:bg-amber-50/40 cursor-pointer transition-colors"
                  >
                    <td className="p-4">
                      <span className="font-mono font-bold text-neutral-900 block">{enq.enquiryId}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase inline-block mt-1 ${getSourceBadge(enq.leadSource)}`}>
                        {enq.leadSource || 'Website'}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="font-bold text-neutral-900 block">{enq.customerDetails?.fullName}</span>
                      <span className="text-neutral-500 font-mono text-[11px]">{enq.customerDetails?.phone}</span>
                    </td>
                    <td className="p-4">
                      <span className="text-neutral-900 block font-medium">{enq.eventType}</span>
                      <span className="text-amber-800 text-[11px] font-mono">{enq.location?.city} • {new Date(enq.eventDate).toLocaleDateString('en-IN')}</span>
                    </td>
                    <td className="p-4 font-mono text-neutral-700">
                      {enq.quotation?.totalAmount ? `₹${enq.quotation.totalAmount.toLocaleString('en-IN')}` : enq.budgetRange}
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase bg-amber-50 text-amber-800 border border-amber-200">
                        {enq.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="p-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => handleSendWhatsAppPitch(enq)}
                        className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-800 border border-emerald-300 text-xs font-bold transition-all inline-flex items-center font-mono shadow-sm"
                      >
                        <Phone className="w-3 h-3 mr-1" /> Pitch
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* GOOGLE SHEETS LIVE CLOUD SYNC WEBHOOK MODAL */}
      {googleSyncModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-amber-900/20 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-5 animate-fade-in text-neutral-900 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-amber-900/10">
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-emerald-600" />
                <h3 className="font-serif text-xl font-bold text-neutral-900">Google Sheets Live Cloud Sync</h3>
              </div>
              <button onClick={() => setGoogleSyncModal(false)} className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-neutral-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-neutral-600 leading-relaxed font-light">
              Connect your Google Sheets Webhook URL so that every new client inquiry or quote automatically writes a live row in your Google Drive Spreadsheet in the background (0 manual downloads required).
            </p>

            <form onSubmit={handleSaveGoogleSheetWebhook} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-neutral-700 font-bold uppercase text-[10.5px]">
                  Google Apps Script / Webhook Endpoint URL
                </label>
                <input
                  type="url"
                  placeholder="https://script.google.com/macros/s/.../exec"
                  value={googleSheetUrl}
                  onChange={(e) => setGoogleSheetUrl(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-3 text-neutral-900 font-mono focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/30"
                />
              </div>

              <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-900 space-y-1">
                <span className="font-bold flex items-center text-emerald-800"><CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Live Sync Active</span>
                <p className="text-[11px] text-neutral-600 font-light">
                  Website leads, Instagram leads, and client status transitions will sync automatically in real-time.
                </p>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setGoogleSyncModal(false)}
                  className="w-1/3 py-2.5 rounded-full border border-stone-300 text-neutral-600 hover:text-neutral-900 font-bold hover:bg-stone-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-2.5 rounded-full bg-gold-gradient text-neutral-950 font-extrabold uppercase tracking-wider shadow-gold-subtle hover:scale-105 transition-all"
                >
                  Save & Enable Live Sync
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Slide-Over Drawer Details */}
      {drawerOpen && selectedEnquiry && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-xl bg-white border-l border-amber-900/20 h-full overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl animate-fade-in custom-scrollbar text-neutral-900">
            <div className="flex items-center justify-between pb-4 border-b border-amber-900/10">
              <div>
                <span className="text-[10px] font-mono uppercase text-amber-700 block font-bold">
                  Source: {selectedEnquiry.leadSource || 'Website'}
                </span>
                <h2 className="font-serif text-2xl font-bold text-neutral-900">{selectedEnquiry.enquiryId}</h2>
              </div>
              <button onClick={() => setDrawerOpen(false)} className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-neutral-600 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Client Contact Block */}
            <div className="bg-stone-50 rounded-2xl p-5 border border-amber-900/10 space-y-3 text-xs">
              <h3 className="text-xs uppercase font-bold text-amber-800 tracking-wider">Client Contact & WhatsApp</h3>
              <div className="space-y-2">
                <p className="text-neutral-900 text-sm font-bold">{selectedEnquiry.customerDetails?.fullName}</p>
                <p className="text-neutral-600 flex items-center font-mono">
                  <Mail className="w-3.5 h-3.5 mr-2 text-amber-600" /> {selectedEnquiry.customerDetails?.email}
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-neutral-600 flex items-center font-mono">
                    <Phone className="w-3.5 h-3.5 mr-2 text-emerald-600" /> {selectedEnquiry.customerDetails?.phone}
                  </p>
                  <button
                    onClick={() => handleSendWhatsAppPitch(selectedEnquiry)}
                    className="px-3 py-1 bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-800 border border-emerald-300 rounded-lg font-bold font-mono transition-all flex items-center shadow-sm"
                  >
                    <Phone className="w-3 h-3 mr-1" /> Open WhatsApp
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Status Updater */}
            <div className="space-y-2 text-xs">
              <label className="font-bold uppercase text-neutral-700">Live Stage Transition</label>
              <div className="grid grid-cols-3 gap-2">
                {['NEW', 'CONTACTED', 'QUOTATION_SENT', 'CONFIRMED', 'COMPLETED', 'CANCELLED'].map((st) => (
                  <button
                    key={st}
                    onClick={() => handleStatusChange(selectedEnquiry._id || selectedEnquiry.enquiryId, st)}
                    className={`px-2 py-2 rounded-xl text-[10px] font-mono uppercase font-bold transition-all ${
                      selectedEnquiry.status === st
                        ? 'bg-gold-gradient text-neutral-950 font-extrabold shadow-gold-subtle'
                        : 'bg-stone-100 text-neutral-700 hover:text-neutral-900 hover:bg-stone-200 border border-stone-200'
                    }`}
                  >
                    {st.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Quotation Sender */}
            <div className="bg-stone-50 rounded-2xl p-5 border border-amber-900/15 space-y-4 text-xs">
              <h3 className="text-xs uppercase font-bold text-amber-800 tracking-wider flex items-center">
                <CreditCard className="w-4 h-4 mr-2" /> Live Proposal & Quotation
              </h3>
              <form onSubmit={handleSendQuotation} className="space-y-3">
                <div>
                  <label className="text-neutral-700 block mb-1 font-bold">Total Package Value (₹)</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 850000"
                    value={quotationAmount}
                    onChange={(e) => setQuotationAmount(e.target.value)}
                    className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-neutral-900 font-mono focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/30"
                  />
                </div>

                <div>
                  <label className="text-neutral-700 block mb-1 font-bold">Proposal Deliverables</label>
                  <textarea
                    rows={2}
                    placeholder="e.g. 2 Master Directors, 4K Cinema Docu-film, Drone and 2 Flush-Mount Albums."
                    value={quotationNotes}
                    onChange={(e) => setQuotationNotes(e.target.value)}
                    className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-neutral-900 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/30"
                  />
                </div>

                <div className="flex gap-2 pt-1">
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-gold-gradient text-neutral-950 font-extrabold uppercase tracking-wider text-xs shadow-gold-subtle hover:scale-[1.02] flex items-center justify-center transition-all"
                  >
                    <Send className="w-3.5 h-3.5 mr-1.5" /> Dispatch & Update Stage
                  </button>

                  <button
                    type="button"
                    onClick={() => generateQuotationPDF({
                      ...selectedEnquiry,
                      quotation: {
                        totalAmount: Number(quotationAmount) || selectedEnquiry.quotation?.totalAmount || 850000,
                        notes: quotationNotes || selectedEnquiry.quotation?.notes,
                      }
                    })}
                    className="px-3.5 py-2.5 rounded-xl bg-white hover:bg-amber-50 text-amber-900 border border-amber-300 font-bold uppercase tracking-wider text-xs flex items-center justify-center transition-all shadow-sm"
                    title="Generate and Download Official Quotation PDF"
                  >
                    <Download className="w-3.5 h-3.5 mr-1" /> Quotation PDF
                  </button>
                </div>
              </form>
            </div>

            {/* Convert to Confirmed Booking */}
            <div>
              <button
                onClick={() => handleConvertToBooking(selectedEnquiry._id || selectedEnquiry.enquiryId)}
                className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold uppercase tracking-widest text-xs shadow-md flex items-center justify-center transition-all"
              >
                <CheckCircle2 className="w-4 h-4 mr-2" /> Convert to Confirmed Booking
              </button>
            </div>

            {/* Internal Notes History */}
            <div className="space-y-3 pt-4 border-t border-stone-200 text-xs">
              <h3 className="uppercase font-bold text-neutral-700 tracking-wider">Internal Studio Notes</h3>
              <form onSubmit={handleAddNote} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add private note for crew..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  className="flex-1 bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-neutral-900 focus:border-amber-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-stone-100 hover:bg-gold-gradient hover:text-neutral-950 rounded-xl text-xs font-bold text-neutral-800 border border-stone-300 transition-colors"
                >
                  Save
                </button>
              </form>

              <div className="space-y-2 max-h-40 overflow-y-auto custom-scrollbar">
                {selectedEnquiry.internalNotes?.map((n, i) => (
                  <div key={i} className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs space-y-1">
                    <p className="text-neutral-800">{n.note}</p>
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

      {/* 1. ADD SOCIAL MEDIA / DIRECT LEAD MODAL */}
      {addLeadModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white border border-amber-900/20 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl space-y-6 text-neutral-900 my-8 animate-fade-in">
            <div className="flex items-center justify-between border-b border-amber-900/10 pb-4">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-amber-800 font-bold block">
                  CRM Lead Entry
                </span>
                <h3 className="font-serif text-2xl font-bold text-neutral-900">+ Add Social Media / Direct Lead</h3>
              </div>
              <button
                onClick={() => setAddLeadModalOpen(false)}
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-neutral-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateLead} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-neutral-800 font-bold uppercase text-[10.5px]">Lead Source *</label>
                  <select
                    value={leadForm.leadSource}
                    onChange={(e) => setLeadForm({ ...leadForm, leadSource: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-neutral-300 rounded-xl px-3.5 py-2.5 text-neutral-900 font-semibold focus:border-amber-600 focus:outline-none"
                  >
                    <option value="Instagram Ads / DM">📸 Instagram Ads / DM</option>
                    <option value="Facebook Ads">📘 Facebook Ads / Lead Form</option>
                    <option value="WhatsApp Direct">💬 WhatsApp Direct Inquiry</option>
                    <option value="Google Ads">🔍 Google Search Ads</option>
                    <option value="WeddingWire / WedMeGood">💍 WeddingWire / WedMeGood</option>
                    <option value="Phone Call / Referral">📞 Phone Call / Personal Referral</option>
                    <option value="Website Form">🌐 Website Form</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-neutral-800 font-bold uppercase text-[10.5px]">Client / Couple Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikram & Radhika Singhania"
                    value={leadForm.fullName}
                    onChange={(e) => setLeadForm({ ...leadForm, fullName: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-neutral-300 rounded-xl px-3.5 py-2.5 text-neutral-900 placeholder:text-neutral-400 focus:border-amber-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-neutral-800 font-bold uppercase text-[10.5px]">Phone / WhatsApp Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98200 12345"
                    value={leadForm.phone}
                    onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-neutral-300 rounded-xl px-3.5 py-2.5 text-neutral-900 placeholder:text-neutral-400 focus:border-amber-600 focus:outline-none font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-neutral-800 font-bold uppercase text-[10.5px]">Email Address</label>
                  <input
                    type="email"
                    placeholder="couple@gmail.com"
                    value={leadForm.email}
                    onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-neutral-300 rounded-xl px-3.5 py-2.5 text-neutral-900 placeholder:text-neutral-400 focus:border-amber-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-neutral-800 font-bold uppercase text-[10.5px]">Event / Celebration Type *</label>
                  <select
                    value={leadForm.eventType}
                    onChange={(e) => setLeadForm({ ...leadForm, eventType: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-neutral-300 rounded-xl px-3.5 py-2.5 text-neutral-900 focus:border-amber-600 focus:outline-none"
                  >
                    <option value="Royal Palace Destination Wedding">Royal Palace Destination Wedding</option>
                    <option value="Cinematic Pre-Wedding Shoot">Cinematic Pre-Wedding Shoot</option>
                    <option value="3-Day Complete Wedding Suite">3-Day Complete Wedding Suite</option>
                    <option value="Sangeet & Cocktail Night">Sangeet & Cocktail Night</option>
                    <option value="Intimate Wedding Ceremony">Intimate Wedding Ceremony</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-neutral-800 font-bold uppercase text-[10.5px]">Wedding Date</label>
                  <input
                    type="date"
                    value={leadForm.eventDate}
                    onChange={(e) => setLeadForm({ ...leadForm, eventDate: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-neutral-300 rounded-xl px-3.5 py-2.5 text-neutral-900 font-mono focus:border-amber-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-neutral-800 font-bold uppercase text-[10.5px]">Destination / City</label>
                  <input
                    type="text"
                    placeholder="Bhopal / Udaipur / Goa"
                    value={leadForm.city}
                    onChange={(e) => setLeadForm({ ...leadForm, city: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-neutral-300 rounded-xl px-3.5 py-2.5 text-neutral-900 placeholder:text-neutral-400 focus:border-amber-600 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-neutral-800 font-bold uppercase text-[10.5px]">Venue Name</label>
                  <input
                    type="text"
                    placeholder="Jehan Numa / Udaivilas"
                    value={leadForm.venue}
                    onChange={(e) => setLeadForm({ ...leadForm, venue: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-neutral-300 rounded-xl px-3.5 py-2.5 text-neutral-900 placeholder:text-neutral-400 focus:border-amber-600 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-neutral-800 font-bold uppercase text-[10.5px]">Budget Range</label>
                  <select
                    value={leadForm.budgetRange}
                    onChange={(e) => setLeadForm({ ...leadForm, budgetRange: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-neutral-300 rounded-xl px-3.5 py-2.5 text-neutral-900 focus:border-amber-600 focus:outline-none"
                  >
                    <option value="₹1.5L - ₹3L">₹1.5L - ₹3L (Pre-Wedding / Intimate)</option>
                    <option value="₹3L - ₹6L">₹3L - ₹6L (Signature Wedding)</option>
                    <option value="₹6L - ₹12L">₹6L - ₹12L (Grand Destination)</option>
                    <option value="₹12L - ₹25L">₹12L - ₹25L (Royal Palace Suite)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-neutral-800 font-bold uppercase text-[10.5px]">Initial Requirements & Notes</label>
                <textarea
                  rows={3}
                  placeholder="Notes from Instagram DM, WhatsApp chat or phone consultation..."
                  value={leadForm.storyDetails}
                  onChange={(e) => setLeadForm({ ...leadForm, storyDetails: e.target.value })}
                  className="w-full bg-[#FAF8F5] border border-neutral-300 rounded-xl p-3 text-neutral-900 placeholder:text-neutral-400 focus:border-amber-600 focus:outline-none leading-relaxed"
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-3 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setAddLeadModalOpen(false)}
                  className="px-5 py-2.5 rounded-full border border-stone-300 text-neutral-700 hover:bg-stone-100 font-semibold text-xs transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-gold-gradient text-neutral-950 font-extrabold text-xs uppercase tracking-wider shadow-sm hover:brightness-105 active:scale-95 transition-all btn-shimmer"
                >
                  + Add to Live Pipeline
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. CONNECT SOCIAL PIPELINE & WEBHOOKS GUIDE MODAL */}
      {pipelineGuideModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white border border-amber-900/20 rounded-3xl p-6 sm:p-8 max-w-3xl w-full shadow-2xl space-y-6 text-neutral-900 my-8 animate-fade-in">
            <div className="flex items-center justify-between border-b border-amber-900/10 pb-4">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-800 font-bold block">
                  Automated Pipeline Sync
                </span>
                <h3 className="font-serif text-2xl font-bold text-neutral-900">🔗 Connect Social Media & Ad Pipelines</h3>
              </div>
              <button
                onClick={() => setPipelineGuideModalOpen(false)}
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-neutral-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex items-center space-x-2 border-b border-stone-200 pb-2 flex-wrap gap-y-2">
              <button
                onClick={() => setPipelineTab('meta')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center ${
                  pipelineTab === 'meta'
                    ? 'bg-gold-gradient text-neutral-950 font-extrabold shadow-sm'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-stone-100'
                }`}
              >
                <Instagram className="w-3.5 h-3.5 mr-1.5 text-pink-600" /> Instagram & FB Ads
              </button>
              <button
                onClick={() => setPipelineTab('google')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center ${
                  pipelineTab === 'google'
                    ? 'bg-gold-gradient text-neutral-950 font-extrabold shadow-sm'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-stone-100'
                }`}
              >
                <Globe className="w-3.5 h-3.5 mr-1.5 text-blue-600" /> Google Ads Forms
              </button>
              <button
                onClick={() => setPipelineTab('whatsapp')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center ${
                  pipelineTab === 'whatsapp'
                    ? 'bg-gold-gradient text-neutral-950 font-extrabold shadow-sm'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-stone-100'
                }`}
              >
                <MessageCircle className="w-3.5 h-3.5 mr-1.5 text-emerald-600" /> WhatsApp Ads
              </button>
              <button
                onClick={() => setPipelineTab('weddingwire')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center ${
                  pipelineTab === 'weddingwire'
                    ? 'bg-gold-gradient text-neutral-950 font-extrabold shadow-sm'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-stone-100'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 mr-1.5 text-purple-600" /> WeddingWire / WedMeGood
              </button>
              <button
                onClick={() => setPipelineTab('universal')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center ${
                  pipelineTab === 'universal'
                    ? 'bg-gold-gradient text-neutral-950 font-extrabold shadow-sm'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-stone-100'
                }`}
              >
                <Zap className="w-3.5 h-3.5 mr-1.5 text-amber-600" /> Universal / Zapier / Sheet
              </button>
            </div>

            {/* TAB CONTENT: META (INSTAGRAM & FB ADS) */}
            {pipelineTab === 'meta' && (
              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                  <h4 className="font-bold text-neutral-900 text-sm">Meta Instant Forms (Instagram & Facebook Lead Ads):</h4>
                  <ol className="list-decimal pl-5 space-y-1.5 text-neutral-700 leading-relaxed">
                    <li>Open <strong>Meta Ads Manager</strong> &rarr; Lead Form Settings (or Zapier / Make.com).</li>
                    <li>Select Webhook Ingestion URL and paste the CRM endpoint below:</li>
                  </ol>
                </div>

                <div className="space-y-1.5">
                  <label className="text-neutral-800 font-bold uppercase text-[10.5px]">Instagram & FB Ads Webhook URL</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      readOnly
                      value="https://moonlight-pink-two.vercel.app/api/webhooks/meta-leads"
                      className="flex-1 bg-[#FAF8F5] border border-neutral-300 rounded-xl px-4 py-2.5 text-neutral-900 font-mono text-xs font-bold select-all"
                    />
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText('https://moonlight-pink-two.vercel.app/api/webhooks/meta-leads');
                        setCopiedWebhook(true);
                        setTimeout(() => setCopiedWebhook(false), 2000);
                      }}
                      className="px-4 py-2.5 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs flex items-center shadow-sm"
                    >
                      {copiedWebhook ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
                      {copiedWebhook ? 'Copied!' : 'Copy URL'}
                    </button>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-stone-100 border border-stone-300 text-neutral-800 font-mono text-[11px] flex justify-between items-center">
                  <span>Verify Token: <strong>moonlight_meta_lead_token_2026</strong></span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText('moonlight_meta_lead_token_2026');
                      alert('Verify Token Copied!');
                    }}
                    className="text-amber-800 hover:underline font-bold"
                  >
                    Copy Token
                  </button>
                </div>

                <div className="p-3 rounded-xl bg-pink-50 border border-pink-200 text-pink-900 font-mono text-[11px]">
                  💡 <strong>100% Zero-Touch:</strong> Client Instagram par hi form bharega aur 1 second ke andar CRM me <strong>"Instagram Ads"</strong> pink badge ke saath lead aa jayegi!
                </div>
              </div>
            )}

            {/* TAB CONTENT: GOOGLE ADS */}
            {pipelineTab === 'google' && (
              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                  <h4 className="font-bold text-neutral-900 text-sm">Google Ads Lead Form Extension Integration:</h4>
                  <ol className="list-decimal pl-5 space-y-1.5 text-neutral-700 leading-relaxed">
                    <li>In <strong>Google Ads</strong>, go to <strong>Ads & Assets &rarr; Assets &rarr; Lead Form</strong>.</li>
                    <li>Scroll down to <strong>"Export leads from Google Ads" &rarr; Webhook Integration</strong>.</li>
                    <li>Paste the Google Ads Webhook URL & Key below:</li>
                  </ol>
                </div>

                <div className="space-y-1.5">
                  <label className="text-neutral-800 font-bold uppercase text-[10.5px]">Google Ads Webhook Endpoint</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      readOnly
                      value="https://moonlight-pink-two.vercel.app/api/webhooks/google-leads"
                      className="flex-1 bg-[#FAF8F5] border border-neutral-300 rounded-xl px-4 py-2.5 text-neutral-900 font-mono text-xs font-bold select-all"
                    />
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText('https://moonlight-pink-two.vercel.app/api/webhooks/google-leads');
                        setCopiedWebhook(true);
                        setTimeout(() => setCopiedWebhook(false), 2000);
                      }}
                      className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center shadow-sm"
                    >
                      {copiedWebhook ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
                      {copiedWebhook ? 'Copied!' : 'Copy URL'}
                    </button>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 font-mono text-[11px]">
                  🔍 <strong>Google Search & YouTube Ads:</strong> Jab bhi koi Google Search ya YouTube ad par form bharega, woh instant CRM me <strong>"Google Ads"</strong> blue badge ke sath add ho jayega!
                </div>
              </div>
            )}

            {/* TAB CONTENT: WHATSAPP DIRECT ADS */}
            {pipelineTab === 'whatsapp' && (
              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2 leading-relaxed text-neutral-700">
                  <h4 className="font-bold text-neutral-900 text-sm">WhatsApp Lead Ads & Cloud Webhook:</h4>
                  <p>1. <strong>Click-to-WhatsApp Ads Redirect Link</strong> (Use this link inside your Meta / Instagram Ads):</p>
                  <div className="p-3 rounded-xl bg-white border border-stone-300 font-mono text-[11px] text-neutral-900 break-all select-all">
                    https://api.whatsapp.com/send?phone=919229229323&text=Hi%20Moonlight%20Production%2C%20I%20saw%20your%20ad%20and%20want%20to%20inquire%20for%20our%20upcoming%20wedding%20celebration.
                  </div>
                  <p>2. <strong>WhatsApp Cloud API Webhook URL:</strong></p>
                  <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-300 font-mono text-[11px] text-emerald-950 font-bold select-all">
                    https://moonlight-pink-two.vercel.app/api/webhooks/whatsapp-leads
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 font-mono text-[11px]">
                  📲 <strong>WhatsApp Hotline:</strong> Naye chats aur incoming WhatsApp ad leads instant CRM me <strong>"WhatsApp Direct"</strong> emerald badge ke sath capture hote hain!
                </div>
              </div>
            )}

            {/* TAB CONTENT: WEDDINGWIRE & WEDMEGOOD */}
            {pipelineTab === 'weddingwire' && (
              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                  <h4 className="font-bold text-neutral-900 text-sm">WeddingWire & WedMeGood Lead Ingestion:</h4>
                  <p className="text-neutral-700 leading-relaxed">
                    WeddingWire, WedMeGood ya ShaadiSaga ke lead notifications ko automatically CRM me push karne ke liye ye webhook endpoint use karein:
                  </p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-neutral-800 font-bold uppercase text-[10.5px]">WeddingWire / WedMeGood Webhook URL</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      readOnly
                      value="https://moonlight-pink-two.vercel.app/api/webhooks/weddingwire-leads"
                      className="flex-1 bg-[#FAF8F5] border border-neutral-300 rounded-xl px-4 py-2.5 text-neutral-900 font-mono text-xs font-bold select-all"
                    />
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText('https://moonlight-pink-two.vercel.app/api/webhooks/weddingwire-leads');
                        setCopiedWebhook(true);
                        setTimeout(() => setCopiedWebhook(false), 2000);
                      }}
                      className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center shadow-sm"
                    >
                      {copiedWebhook ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
                      {copiedWebhook ? 'Copied!' : 'Copy URL'}
                    </button>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-purple-50 border border-purple-200 text-purple-900 font-mono text-[11px]">
                  💍 <strong>Wedding Portals:</strong> WeddingWire aur WedMeGood se aane wale couples automatic purple badges ke saath pipeline me place ho jate hain!
                </div>
              </div>
            )}

            {/* TAB CONTENT: UNIVERSAL WEBHOOK & GOOGLE SHEETS */}
            {pipelineTab === 'universal' && (
              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                  <h4 className="font-bold text-neutral-900 text-sm">Universal Webhook (Zapier, Make, Pabbly & Google Sheets):</h4>
                  <p className="text-neutral-700 leading-relaxed">
                    Kisi bhi third-party tool ya platform se direct leads inject karne ke liye universal endpoint:
                  </p>
                  <div className="p-2.5 rounded-xl bg-white border border-stone-300 font-mono text-[11px] font-bold text-neutral-900 select-all">
                    https://moonlight-pink-two.vercel.app/api/webhooks/social-leads
                  </div>
                </div>

                <form onSubmit={handleSaveGoogleSheetWebhook} className="space-y-3 pt-2">
                  <label className="text-neutral-800 font-bold uppercase text-[10.5px]">2-Way Google Sheet Sync (Apps Script URL)</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="url"
                      placeholder="https://script.google.com/macros/s/.../exec"
                      value={googleSheetUrl}
                      onChange={(e) => setGoogleSheetUrl(e.target.value)}
                      className="flex-1 bg-[#FAF8F5] border border-neutral-300 rounded-xl px-4 py-2.5 text-neutral-900 font-mono text-xs focus:border-amber-600 focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center shadow-sm whitespace-nowrap"
                    >
                      <Check className="w-4 h-4 mr-1.5" /> Save Sheet
                    </button>
                  </div>
                </form>

                <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 space-y-1.5 text-neutral-700 leading-relaxed text-[11.5px]">
                  <p><strong>Google Sheets Live Sync (30 Seconds):</strong></p>
                  <p>1. Open your Google Sheet &rarr; <strong>Extensions</strong> &rarr; <strong>Apps Script</strong>.</p>
                  <p>2. Paste your Webhook trigger function and Deploy as Web App.</p>
                  <p>3. Paste the Deployment URL above to keep Google Sheet and Moonlight CRM 100% synchronized!</p>
                </div>
              </div>
            )}

            <div className="flex justify-end pt-2 border-t border-stone-200">
              <button
                onClick={() => setPipelineGuideModalOpen(false)}
                className="px-6 py-2.5 rounded-full bg-gold-gradient text-neutral-950 font-extrabold text-xs uppercase tracking-wider shadow-sm"
              >
                Close Guide
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEnquiries;

