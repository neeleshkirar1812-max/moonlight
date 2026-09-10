import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import api from '../../api/client';
import SEO from '../../components/common/SEO';
import {
  Sparkles,
  TrendingUp,
  CreditCard,
  Users,
  CheckCircle2,
  ExternalLink,
  Search,
  Filter,
  Download,
  Calendar,
  MapPin,
  RefreshCw,
  Mail,
  Phone,
  Plus,
  Shield,
  Layers,
  LayoutTemplate,
  Tag,
  Gift,
  FileText,
  Activity,
  Settings,
  Palette,
  BarChart3,
  Check,
  X,
  AlertTriangle,
  Eye,
  Edit,
  Trash2,
  Copy,
  Clock,
  ChevronRight,
  UserPlus,
  DollarSign,
  Send,
  PauseCircle,
  Archive,
  ArrowUpRight,
} from 'lucide-react';

const InvitationAdmin = ({ initialTab }) => {
  const { tab: urlTab } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToast } = useNotification();

  const [activeTab, setActiveTab] = useState(initialTab || urlTab || 'dashboard');
  const [loading, setLoading] = useState(true);

  // Core Data States
  const [stats, setStats] = useState({
    totalCustomers: 0,
    totalInvitations: 0,
    publishedInvitations: 0,
    draftInvitations: 0,
    suspendedInvitations: 0,
    totalPurchases: 0,
    totalRevenue: 0,
    todayOrders: 0,
    todayRevenue: 0,
    totalRSVPs: 0,
    rsvpBreakdown: { accepted: 0, declined: 0, maybe: 0 },
  });
  const [invitations, setInvitations] = useState([]);
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [rsvps, setRsvps] = useState([]);
  const [activityLogs, setActivityLogs] = useState([]);

  // Filter & Search States
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Modals & Drawers
  const [showAddCustomerModal, setShowAddCustomerModal] = useState(false);
  const [showAddTemplateModal, setShowAddTemplateModal] = useState(false);
  const [showAddCouponModal, setShowAddCouponModal] = useState(false);
  const [selectedCustomerProfile, setSelectedCustomerProfile] = useState(null);

  // Forms
  const [newCustomer, setNewCustomer] = useState({ name: '', email: '', phone: '' });
  const [manualForm, setManualForm] = useState({
    customerEmail: '',
    customerName: '',
    customerPhone: '',
    templateId: 'royal-love',
    title: 'A Royal Celebration',
    names: 'Aarav & Kiara',
    date: '2026-11-20',
    venue: 'Jehan Numa Palace',
    publishImmediately: false,
  });
  const [newTemplate, setNewTemplate] = useState({
    name: '',
    slug: '',
    category: 'Wedding',
    price: 699,
    previewImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    description: '',
    themePrimary: '#B88935',
    themeSecondary: '#2C1A1D',
    themeBackground: '#FAF8F5',
  });
  const [newCoupon, setNewCoupon] = useState({
    code: '',
    discountType: 'percentage',
    discountValue: 20,
    minOrderAmount: 0,
    usageLimit: 100,
    expiryDate: '',
  });

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      // 1. Overview & Stats
      const overviewRes = await api.get('/invitations/admin/overview');
      const overviewData = overviewRes.data || overviewRes;
      if (overviewData.stats) setStats(overviewData.stats);
      if (overviewData.invitations) setInvitations(overviewData.invitations);
      if (overviewData.recentOrders) setOrders(overviewData.recentOrders);

      // 2. Customers
      const custRes = await api.get('/invitations/admin/customers');
      const custData = custRes.data || custRes;
      if (custData.customers) setCustomers(custData.customers);

      // 3. Templates
      const tplRes = await api.get('/invitations/templates');
      const tplData = tplRes.data || tplRes;
      if (tplData.templates) setTemplates(tplData.templates);

      // 4. Coupons
      const coupRes = await api.get('/invitations/admin/coupons');
      const coupData = coupRes.data || coupRes;
      if (coupData.coupons) setCoupons(coupData.coupons);

      // 5. RSVPs
      const rsvpRes = await api.get('/invitations/admin/rsvps');
      const rsvpData = rsvpRes.data || rsvpRes;
      if (rsvpData.rsvps) setRsvps(rsvpData.rsvps);

      // 6. Activity Logs
      const logsRes = await api.get('/invitations/admin/activity-logs');
      const logsData = logsRes.data || logsRes;
      if (logsData.logs) setActivityLogs(logsData.logs);
    } catch (err) {
      console.warn('[Admin Fetch Error]:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  useEffect(() => {
    if (urlTab) setActiveTab(urlTab);
  }, [urlTab]);

  // Handle Status Update (Suspend, Publish, Unpublish, Archive)
  const handleUpdateStatus = async (invitationId, newStatus) => {
    try {
      const res = await api.put(`/invitations/admin/invitations/${invitationId}/status`, {
        status: newStatus,
      });
      addToast({
        title: 'Status Updated',
        message: `Invitation is now ${newStatus}.`,
        type: 'success',
      });
      fetchAdminData();
    } catch (err) {
      addToast({
        title: 'Error',
        message: err.message || 'Failed to update invitation status',
        type: 'error',
      });
    }
  };

  // Handle Manual Free Invitation Assignment
  const handleCreateManualInvitation = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/invitations/admin/manual-invitation', manualForm);
      addToast({
        title: 'Invitation Assigned',
        message: `Free invitation assigned to ${manualForm.customerEmail} successfully.`,
        type: 'success',
      });
      setManualForm({
        customerEmail: '',
        customerName: '',
        customerPhone: '',
        templateId: 'royal-love',
        title: 'A Royal Celebration',
        names: 'Aarav & Kiara',
        date: '2026-11-20',
        venue: 'Jehan Numa Palace',
        publishImmediately: false,
      });
      fetchAdminData();
      setActiveTab('invitations');
    } catch (err) {
      addToast({
        title: 'Assignment Failed',
        message: err.message || 'Failed to create manual invitation',
        type: 'error',
      });
    }
  };

  // Handle Add Customer
  const handleCreateCustomer = async (e) => {
    e.preventDefault();
    try {
      await api.post('/invitations/admin/customers', newCustomer);
      addToast({
        title: 'Customer Added',
        message: `Account created for ${newCustomer.email}.`,
        type: 'success',
      });
      setNewCustomer({ name: '', email: '', phone: '' });
      setShowAddCustomerModal(false);
      fetchAdminData();
    } catch (err) {
      addToast({
        title: 'Error',
        message: err.message || 'Failed to add customer',
        type: 'error',
      });
    }
  };

  // Handle Add Coupon
  const handleCreateCoupon = async (e) => {
    e.preventDefault();
    try {
      await api.post('/invitations/admin/coupons', newCoupon);
      addToast({
        title: 'Coupon Created',
        message: `Code ${newCoupon.code.toUpperCase()} is now live.`,
        type: 'success',
      });
      setNewCoupon({
        code: '',
        discountType: 'percentage',
        discountValue: 20,
        minOrderAmount: 0,
        usageLimit: 100,
        expiryDate: '',
      });
      setShowAddCouponModal(false);
      fetchAdminData();
    } catch (err) {
      addToast({
        title: 'Error',
        message: err.message || 'Failed to create coupon',
        type: 'error',
      });
    }
  };

  // Handle Add Template
  const handleCreateTemplate = async (e) => {
    e.preventDefault();
    try {
      await api.post('/invitations/admin/templates', {
        name: newTemplate.name,
        slug: newTemplate.slug || newTemplate.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        category: newTemplate.category,
        price: Number(newTemplate.price),
        previewImage: newTemplate.previewImage,
        description: newTemplate.description,
        theme: {
          primary: newTemplate.themePrimary,
          secondary: newTemplate.themeSecondary,
          background: newTemplate.themeBackground,
        },
      });
      addToast({
        title: 'Template Created',
        message: `${newTemplate.name} has been added to the database catalog.`,
        type: 'success',
      });
      setShowAddTemplateModal(false);
      fetchAdminData();
    } catch (err) {
      addToast({
        title: 'Error',
        message: err.message || 'Failed to create template',
        type: 'error',
      });
    }
  };

  // Export CSV Helper
  const exportInvitationsCSV = () => {
    const headers = ['Couple / Host', 'Email', 'Template', 'Status', 'Slug', 'RSVP Count', 'Date'];
    const rows = invitations.map((inv) => [
      `"${inv.names || 'Couple'}"`,
      `"${inv.customerEmail || inv.userEmail || ''}"`,
      `"${inv.templateId || 'royal-love'}"`,
      inv.status || (inv.published ? 'PUBLISHED' : 'DRAFT'),
      `"${inv.slug || ''}"`,
      inv.rsvpCount || 0,
      `"${new Date(inv.createdAt || Date.now()).toLocaleDateString()}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `moonlight_invitations_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addToast({ title: 'Export Complete', message: 'Invitations report downloaded.', type: 'success' });
  };

  const filteredInvitations = invitations.filter((inv) => {
    const matchesSearch =
      (inv.names || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (inv.customerEmail || inv.userEmail || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (inv.slug || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (inv.templateId || '').toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === 'ALL' ||
      (statusFilter === 'PUBLISHED' && (inv.status === 'PUBLISHED' || inv.published)) ||
      (statusFilter === 'DRAFT' && (inv.status === 'DRAFT' || (!inv.published && inv.status !== 'SUSPENDED'))) ||
      (statusFilter === 'SUSPENDED' && inv.status === 'SUSPENDED');

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-neutral-900 pt-24 pb-20 font-sans">
      <SEO
        title="Moonlight Production Control System | Master Admin"
        description="Comprehensive administrative control system for digital invitations, customer orders, manual client creation, templates, and analytics."
      />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Master Container with Left Sidebar Navigation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ========================================================================= */}
          {/* SIDEBAR NAVIGATION */}
          {/* ========================================================================= */}
          <aside className="lg:col-span-3 bg-white border border-amber-900/10 rounded-2xl shadow-sm p-5 space-y-6 sticky top-28">
            {/* Brand Header */}
            <div className="border-b border-amber-900/10 pb-5">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-800 font-bold">
                  Control System
                </span>
              </div>
              <h2 className="font-serif text-xl font-bold tracking-wider text-neutral-900 mt-1">
                MOONLIGHT PRODUCTION
              </h2>
              <p className="text-xs text-neutral-500 mt-0.5">Master Invitation Suite</p>
            </div>

            {/* Nav Groups */}
            <nav className="space-y-6 text-xs">
              {/* Group 1: Dashboard */}
              <div>
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-semibold transition-all ${
                    activeTab === 'dashboard'
                      ? 'bg-amber-900 text-amber-50 shadow-sm'
                      : 'text-neutral-700 hover:bg-amber-50/70 hover:text-amber-900'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <Activity className="w-4 h-4" />
                    <span>Dashboard</span>
                  </div>
                  {activeTab === 'dashboard' && <ChevronRight className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Group 2: SALES */}
              <div className="space-y-1">
                <span className="px-3 text-[10px] font-mono uppercase font-bold text-neutral-400 tracking-wider">
                  Sales
                </span>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl font-medium transition-all ${
                    activeTab === 'orders'
                      ? 'bg-amber-100 text-amber-950 font-bold'
                      : 'text-neutral-600 hover:bg-neutral-50'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>Orders</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-neutral-100 text-[10px] font-mono">
                    {stats.totalPurchases}
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab('payments')}
                  className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl font-medium transition-all ${
                    activeTab === 'payments'
                      ? 'bg-amber-100 text-amber-950 font-bold'
                      : 'text-neutral-600 hover:bg-neutral-50'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <DollarSign className="w-3.5 h-3.5" />
                    <span>Payments</span>
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab('coupons')}
                  className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl font-medium transition-all ${
                    activeTab === 'coupons'
                      ? 'bg-amber-100 text-amber-950 font-bold'
                      : 'text-neutral-600 hover:bg-neutral-50'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <Tag className="w-3.5 h-3.5" />
                    <span>Coupons</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-amber-50 text-[10px] font-mono text-amber-800">
                    {coupons.length}
                  </span>
                </button>
              </div>

              {/* Group 3: CUSTOMERS */}
              <div className="space-y-1">
                <span className="px-3 text-[10px] font-mono uppercase font-bold text-neutral-400 tracking-wider">
                  Customers
                </span>
                <button
                  onClick={() => setActiveTab('customers')}
                  className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl font-medium transition-all ${
                    activeTab === 'customers'
                      ? 'bg-amber-100 text-amber-950 font-bold'
                      : 'text-neutral-600 hover:bg-neutral-50'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <Users className="w-3.5 h-3.5" />
                    <span>All Customers</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-neutral-100 text-[10px] font-mono">
                    {stats.totalCustomers}
                  </span>
                </button>
                <button
                  onClick={() => setShowAddCustomerModal(true)}
                  className="w-full flex items-center space-x-2.5 px-3.5 py-2 rounded-xl text-amber-800 hover:bg-amber-50/70 font-semibold"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>+ Add Customer</span>
                </button>
              </div>

              {/* Group 4: INVITATIONS */}
              <div className="space-y-1">
                <span className="px-3 text-[10px] font-mono uppercase font-bold text-neutral-400 tracking-wider">
                  Invitations
                </span>
                <button
                  onClick={() => {
                    setStatusFilter('ALL');
                    setActiveTab('invitations');
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl font-medium transition-all ${
                    activeTab === 'invitations' && statusFilter === 'ALL'
                      ? 'bg-amber-100 text-amber-950 font-bold'
                      : 'text-neutral-600 hover:bg-neutral-50'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <FileText className="w-3.5 h-3.5" />
                    <span>All Invitations</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-neutral-100 text-[10px] font-mono">
                    {stats.totalInvitations}
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab('manual')}
                  className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl font-medium transition-all ${
                    activeTab === 'manual'
                      ? 'bg-amber-900 text-amber-50 font-bold shadow-sm'
                      : 'text-amber-800 bg-amber-50/50 hover:bg-amber-100/70'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <Gift className="w-3.5 h-3.5" />
                    <span>Manual / Free</span>
                  </div>
                  <span className="px-1.5 py-0.2 rounded bg-amber-200 text-amber-900 text-[9px] font-bold">
                    ₹0
                  </span>
                </button>
                <button
                  onClick={() => {
                    setStatusFilter('PUBLISHED');
                    setActiveTab('invitations');
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl font-medium transition-all ${
                    activeTab === 'invitations' && statusFilter === 'PUBLISHED'
                      ? 'bg-amber-100 text-amber-950 font-bold'
                      : 'text-neutral-600 hover:bg-neutral-50'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Published</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-[10px] font-mono text-emerald-800 font-bold">
                    {stats.publishedInvitations}
                  </span>
                </button>
              </div>

              {/* Group 5: TEMPLATES */}
              <div className="space-y-1">
                <span className="px-3 text-[10px] font-mono uppercase font-bold text-neutral-400 tracking-wider">
                  Templates
                </span>
                <button
                  onClick={() => setActiveTab('templates')}
                  className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl font-medium transition-all ${
                    activeTab === 'templates'
                      ? 'bg-amber-100 text-amber-950 font-bold'
                      : 'text-neutral-600 hover:bg-neutral-50'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <LayoutTemplate className="w-3.5 h-3.5" />
                    <span>All Templates</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-neutral-100 text-[10px] font-mono">
                    {templates.length}
                  </span>
                </button>
                <button
                  onClick={() => setShowAddTemplateModal(true)}
                  className="w-full flex items-center space-x-2.5 px-3.5 py-2 rounded-xl text-amber-800 hover:bg-amber-50/70 font-semibold"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Add Template</span>
                </button>
              </div>

              {/* Group 6: EVENTS & RSVP */}
              <div className="space-y-1">
                <span className="px-3 text-[10px] font-mono uppercase font-bold text-neutral-400 tracking-wider">
                  Events & Guests
                </span>
                <button
                  onClick={() => setActiveTab('rsvps')}
                  className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl font-medium transition-all ${
                    activeTab === 'rsvps'
                      ? 'bg-amber-100 text-amber-950 font-bold'
                      : 'text-neutral-600 hover:bg-neutral-50'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <Users className="w-3.5 h-3.5" />
                    <span>Guest RSVPs</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-indigo-50 text-[10px] font-mono text-indigo-800 font-bold">
                    {stats.totalRSVPs}
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab('analytics')}
                  className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl font-medium transition-all ${
                    activeTab === 'analytics'
                      ? 'bg-amber-100 text-amber-950 font-bold'
                      : 'text-neutral-600 hover:bg-neutral-50'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <BarChart3 className="w-3.5 h-3.5" />
                    <span>Analytics</span>
                  </div>
                </button>
              </div>

              {/* Group 7: SYSTEM */}
              <div className="space-y-1">
                <span className="px-3 text-[10px] font-mono uppercase font-bold text-neutral-400 tracking-wider">
                  System
                </span>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl font-medium transition-all ${
                    activeTab === 'settings'
                      ? 'bg-amber-100 text-amber-950 font-bold'
                      : 'text-neutral-600 hover:bg-neutral-50'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <Settings className="w-3.5 h-3.5" />
                    <span>Settings</span>
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab('branding')}
                  className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl font-medium transition-all ${
                    activeTab === 'branding'
                      ? 'bg-amber-100 text-amber-950 font-bold'
                      : 'text-neutral-600 hover:bg-neutral-50'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <Palette className="w-3.5 h-3.5" />
                    <span>Branding</span>
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab('activity')}
                  className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl font-medium transition-all ${
                    activeTab === 'activity'
                      ? 'bg-amber-100 text-amber-950 font-bold'
                      : 'text-neutral-600 hover:bg-neutral-50'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <Activity className="w-3.5 h-3.5" />
                    <span>Activity Logs</span>
                  </div>
                </button>
              </div>
            </nav>
          </aside>

          {/* ========================================================================= */}
          {/* MAIN CONTENT AREA */}
          {/* ========================================================================= */}
          <main className="lg:col-span-9 space-y-6">
            {/* Top Bar with Actions */}
            <div className="bg-white border border-amber-900/10 rounded-2xl p-5 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-800 font-bold">
                  Moonlight Operations
                </span>
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900 capitalize">
                  {activeTab.replace('-', ' ')}
                </h1>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  onClick={fetchAdminData}
                  className="p-2.5 rounded-xl border border-neutral-200 hover:bg-neutral-50 text-neutral-700 transition-colors shadow-sm"
                  title="Refresh Database"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveTab('manual')}
                  className="px-4 py-2.5 rounded-xl bg-amber-900 hover:bg-amber-950 text-amber-50 text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 shadow-sm transition-colors"
                >
                  <Gift className="w-3.5 h-3.5" />
                  <span>+ Create Free Invitation</span>
                </button>
                <button
                  onClick={exportInvitationsCSV}
                  className="px-3.5 py-2.5 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 text-xs font-semibold text-neutral-700 flex items-center space-x-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export</span>
                </button>
              </div>
            </div>

            {/* ========================================================================= */}
            {/* 1. DASHBOARD OVERVIEW VIEW */}
            {/* ========================================================================= */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                {/* 8 Metric Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white border border-amber-900/10 rounded-2xl p-4 shadow-sm space-y-1">
                    <div className="flex items-center justify-between text-neutral-500">
                      <span className="text-[10px] font-bold uppercase tracking-wider">Total Customers</span>
                      <Users className="w-3.5 h-3.5 text-amber-700" />
                    </div>
                    <div className="font-serif text-2xl font-bold text-neutral-900">
                      {stats.totalCustomers}
                    </div>
                    <span className="text-[10px] text-neutral-400 block font-mono">Registered accounts</span>
                  </div>

                  <div className="bg-white border border-amber-900/10 rounded-2xl p-4 shadow-sm space-y-1">
                    <div className="flex items-center justify-between text-neutral-500">
                      <span className="text-[10px] font-bold uppercase tracking-wider">Total Invitations</span>
                      <FileText className="w-3.5 h-3.5 text-indigo-700" />
                    </div>
                    <div className="font-serif text-2xl font-bold text-neutral-900">
                      {stats.totalInvitations}
                    </div>
                    <span className="text-[10px] text-neutral-400 block font-mono">
                      {stats.publishedInvitations} live · {stats.draftInvitations} drafts
                    </span>
                  </div>

                  <div className="bg-white border border-amber-900/10 rounded-2xl p-4 shadow-sm space-y-1">
                    <div className="flex items-center justify-between text-neutral-500">
                      <span className="text-[10px] font-bold uppercase tracking-wider">Published Cards</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    </div>
                    <div className="font-serif text-2xl font-bold text-emerald-700">
                      {stats.publishedInvitations}
                    </div>
                    <span className="text-[10px] text-emerald-600 block font-mono">Live on /i/:slug</span>
                  </div>

                  <div className="bg-white border border-amber-900/10 rounded-2xl p-4 shadow-sm space-y-1">
                    <div className="flex items-center justify-between text-neutral-500">
                      <span className="text-[10px] font-bold uppercase tracking-wider">Total Revenue</span>
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                    </div>
                    <div className="font-serif text-2xl font-bold text-neutral-900">
                      ₹{stats.totalRevenue.toLocaleString('en-IN')}
                    </div>
                    <span className="text-[10px] text-emerald-600 font-semibold block">
                      From real purchase ledger
                    </span>
                  </div>

                  <div className="bg-white border border-amber-900/10 rounded-2xl p-4 shadow-sm space-y-1">
                    <div className="flex items-center justify-between text-neutral-500">
                      <span className="text-[10px] font-bold uppercase tracking-wider">Today's Orders</span>
                      <CreditCard className="w-3.5 h-3.5 text-amber-700" />
                    </div>
                    <div className="font-serif text-2xl font-bold text-neutral-900">
                      {stats.todayOrders}
                    </div>
                    <span className="text-[10px] text-neutral-400 block font-mono">Completed purchases</span>
                  </div>

                  <div className="bg-white border border-amber-900/10 rounded-2xl p-4 shadow-sm space-y-1">
                    <div className="flex items-center justify-between text-neutral-500">
                      <span className="text-[10px] font-bold uppercase tracking-wider">Today's Revenue</span>
                      <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                    </div>
                    <div className="font-serif text-2xl font-bold text-neutral-900">
                      ₹{stats.todayRevenue.toLocaleString('en-IN')}
                    </div>
                    <span className="text-[10px] text-neutral-400 block font-mono">Captured today</span>
                  </div>

                  <div className="bg-white border border-amber-900/10 rounded-2xl p-4 shadow-sm space-y-1">
                    <div className="flex items-center justify-between text-neutral-500">
                      <span className="text-[10px] font-bold uppercase tracking-wider">Total Purchases</span>
                      <CreditCard className="w-3.5 h-3.5 text-amber-700" />
                    </div>
                    <div className="font-serif text-2xl font-bold text-neutral-900">
                      {stats.totalPurchases}
                    </div>
                    <span className="text-[10px] text-neutral-400 block font-mono">Lifetime orders</span>
                  </div>

                  <div className="bg-white border border-amber-900/10 rounded-2xl p-4 shadow-sm space-y-1">
                    <div className="flex items-center justify-between text-neutral-500">
                      <span className="text-[10px] font-bold uppercase tracking-wider">Guest RSVPs</span>
                      <Users className="w-3.5 h-3.5 text-indigo-600" />
                    </div>
                    <div className="font-serif text-2xl font-bold text-neutral-900">
                      {stats.totalRSVPs}
                    </div>
                    <span className="text-[10px] text-indigo-600 font-semibold block">
                      {stats.rsvpBreakdown.accepted} attending
                    </span>
                  </div>
                </div>

                {/* Recent Invitations & Recent Orders Tables */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Recent Invitations */}
                  <div className="bg-white border border-amber-900/10 rounded-2xl p-5 shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-serif text-lg font-bold text-neutral-900">Recent Invitations</h3>
                      <button
                        onClick={() => setActiveTab('invitations')}
                        className="text-xs text-amber-800 font-semibold hover:underline flex items-center space-x-1"
                      >
                        <span>View all</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="divide-y divide-neutral-100 text-xs">
                      {invitations.slice(0, 5).map((inv) => (
                        <div key={inv._id || inv.id} className="py-3 flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-neutral-900">{inv.names || 'Couple Names'}</p>
                            <span className="text-[11px] text-neutral-500 font-mono">
                              {inv.customerEmail || inv.userEmail}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                inv.status === 'PUBLISHED' || inv.published
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : inv.status === 'SUSPENDED'
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-neutral-100 text-neutral-600'
                              }`}
                            >
                              {inv.status || (inv.published ? 'PUBLISHED' : 'DRAFT')}
                            </span>
                            <Link
                              to={`/invitations/create/${inv._id || inv.id}`}
                              className="px-2 py-1 rounded bg-neutral-100 hover:bg-amber-100 font-semibold text-[11px]"
                            >
                              Edit
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recent Orders */}
                  <div className="bg-white border border-amber-900/10 rounded-2xl p-5 shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-serif text-lg font-bold text-neutral-900">Recent Orders</h3>
                      <button
                        onClick={() => setActiveTab('orders')}
                        className="text-xs text-amber-800 font-semibold hover:underline flex items-center space-x-1"
                      >
                        <span>View all</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="divide-y divide-neutral-100 text-xs">
                      {orders.slice(0, 5).map((ord) => (
                        <div key={ord._id} className="py-3 flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-neutral-900">{ord.customerName || 'Client'}</p>
                            <span className="text-[11px] text-neutral-500 font-mono">
                              {ord.templateName || ord.templateId} · {ord.purchaseType || 'PAID'}
                            </span>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-neutral-900">₹{ord.amount || 0}</p>
                            <span className="text-[10px] text-emerald-600 font-semibold capitalize">
                              {ord.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* 2. MANUAL / FREE INVITATION ASSIGNMENT VIEW */}
            {/* ========================================================================= */}
            {activeTab === 'manual' && (
              <div className="bg-white border border-amber-900/10 rounded-2xl p-6 shadow-sm space-y-6">
                <div className="border-b border-amber-900/10 pb-4">
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 text-[10px] font-bold uppercase">
                      Admin Privilege
                    </span>
                    <span className="text-xs text-neutral-500 font-mono">Zero Payment Bypass</span>
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-neutral-900 mt-1">
                    Create & Assign Free Invitation
                  </h2>
                  <p className="text-xs text-neutral-600 mt-1">
                    Assign a complete luxury digital invitation to a client at ₹0 without requiring Razorpay. The client will immediately see it in their dashboard with full edit capabilities.
                  </p>
                </div>

                <form onSubmit={handleCreateManualInvitation} className="space-y-6">
                  {/* Step 1: Customer Details */}
                  <div className="space-y-4">
                    <h3 className="font-serif text-sm font-bold text-neutral-900 flex items-center space-x-2">
                      <span className="w-5 h-5 rounded-full bg-amber-900 text-amber-50 text-[10px] flex items-center justify-center font-bold">
                        1
                      </span>
                      <span>Client Account Details</span>
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold text-neutral-700 uppercase tracking-wider mb-1">
                          Client Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={manualForm.customerEmail}
                          onChange={(e) => setManualForm({ ...manualForm, customerEmail: e.target.value })}
                          placeholder="client@gmail.com"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-xs focus:outline-none focus:border-amber-600"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-neutral-700 uppercase tracking-wider mb-1">
                          Client / Couple Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={manualForm.customerName}
                          onChange={(e) => setManualForm({ ...manualForm, customerName: e.target.value })}
                          placeholder="Rahul & Priya"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-xs focus:outline-none focus:border-amber-600"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-neutral-700 uppercase tracking-wider mb-1">
                          Phone (Optional)
                        </label>
                        <input
                          type="tel"
                          value={manualForm.customerPhone}
                          onChange={(e) => setManualForm({ ...manualForm, customerPhone: e.target.value })}
                          placeholder="+91 98765 43210"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-xs focus:outline-none focus:border-amber-600"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Step 2: Choose Template */}
                  <div className="space-y-4">
                    <h3 className="font-serif text-sm font-bold text-neutral-900 flex items-center space-x-2">
                      <span className="w-5 h-5 rounded-full bg-amber-900 text-amber-50 text-[10px] flex items-center justify-center font-bold">
                        2
                      </span>
                      <span>Select Template Suite (Price: ₹0)</span>
                    </h3>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                      {templates.map((tpl) => {
                        const isSelected = manualForm.templateId === (tpl.id || tpl.slug);
                        return (
                          <div
                            key={tpl.id || tpl.slug}
                            onClick={() => setManualForm({ ...manualForm, templateId: tpl.id || tpl.slug })}
                            className={`cursor-pointer rounded-xl border p-2 text-center transition-all ${
                              isSelected
                                ? 'border-amber-800 bg-amber-50/80 shadow-sm ring-2 ring-amber-800/30'
                                : 'border-neutral-200 hover:border-neutral-300 bg-white'
                            }`}
                          >
                            <img
                              src={tpl.previewImage || tpl.image}
                              alt={tpl.name}
                              className="w-full h-20 object-cover rounded-lg mb-1.5"
                            />
                            <p className="font-serif text-xs font-bold text-neutral-900 truncate">
                              {tpl.name}
                            </p>
                            <span className="text-[10px] text-amber-900 font-mono font-bold block">
                              Free (Admin)
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step 3: Invitation Initial Details */}
                  <div className="space-y-4">
                    <h3 className="font-serif text-sm font-bold text-neutral-900 flex items-center space-x-2">
                      <span className="w-5 h-5 rounded-full bg-amber-900 text-amber-50 text-[10px] flex items-center justify-center font-bold">
                        3
                      </span>
                      <span>Celebration Details</span>
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold text-neutral-700 uppercase tracking-wider mb-1">
                          Display Names on Invitation
                        </label>
                        <input
                          type="text"
                          value={manualForm.names}
                          onChange={(e) => setManualForm({ ...manualForm, names: e.target.value })}
                          placeholder="Aarav & Kiara"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-xs focus:outline-none focus:border-amber-600"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-neutral-700 uppercase tracking-wider mb-1">
                          Event Date
                        </label>
                        <input
                          type="date"
                          value={manualForm.date}
                          onChange={(e) => setManualForm({ ...manualForm, date: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-xs focus:outline-none focus:border-amber-600"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-bold text-neutral-700 uppercase tracking-wider mb-1">
                          Venue
                        </label>
                        <input
                          type="text"
                          value={manualForm.venue}
                          onChange={(e) => setManualForm({ ...manualForm, venue: e.target.value })}
                          placeholder="Jehan Numa Palace, Shamla Hills, Bhopal"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-xs focus:outline-none focus:border-amber-600"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Step 4: Publication Option */}
                  <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/60 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-xs text-amber-950">Publish Immediately?</p>
                      <p className="text-[11px] text-amber-800/80">
                        If checked, the public `/i/:slug` URL will be active immediately. Otherwise, it will save as a Draft for the client.
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={manualForm.publishImmediately}
                      onChange={(e) => setManualForm({ ...manualForm, publishImmediately: e.target.checked })}
                      className="w-4 h-4 text-amber-900 rounded accent-amber-900 cursor-pointer"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-amber-900 hover:bg-amber-950 text-amber-50 font-bold text-xs uppercase tracking-widest transition-colors shadow-md flex items-center justify-center space-x-2"
                  >
                    <Gift className="w-4 h-4" />
                    <span>Create & Assign to Client (₹0)</span>
                  </button>
                </form>
              </div>
            )}

            {/* ========================================================================= */}
            {/* 3. ALL INVITATIONS VIEW */}
            {/* ========================================================================= */}
            {activeTab === 'invitations' && (
              <div className="space-y-4">
                {/* Search and Status Filters */}
                <div className="bg-white border border-amber-900/10 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row gap-3 items-center justify-between">
                  <div className="relative w-full sm:w-80">
                    <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search couple, email, slug..."
                      className="w-full pl-10 pr-4 py-2 rounded-xl border border-neutral-200 text-xs focus:outline-none focus:border-amber-600"
                    />
                  </div>

                  <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
                    <span className="text-xs text-neutral-500 font-semibold">Status:</span>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="px-3 py-1.5 rounded-xl border border-neutral-200 text-xs font-semibold text-neutral-800 bg-white focus:outline-none"
                    >
                      <option value="ALL">All Status</option>
                      <option value="PUBLISHED">Published Only</option>
                      <option value="DRAFT">Drafts Only</option>
                      <option value="SUSPENDED">Suspended Only</option>
                    </select>
                  </div>
                </div>

                {/* Table */}
                <div className="bg-white border border-amber-900/10 rounded-2xl shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500 uppercase tracking-wider font-mono text-[10px]">
                        <tr>
                          <th className="py-3 px-4">Couple / Host</th>
                          <th className="py-3 px-4">Customer Email</th>
                          <th className="py-3 px-4">Template</th>
                          <th className="py-3 px-4">Status</th>
                          <th className="py-3 px-4">RSVPs</th>
                          <th className="py-3 px-4">Public URL</th>
                          <th className="py-3 px-4 text-right">Admin Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-100">
                        {filteredInvitations.map((inv) => {
                          const isLive = inv.status === 'PUBLISHED' || inv.published;
                          const isSuspended = inv.status === 'SUSPENDED';

                          return (
                            <tr key={inv._id || inv.id} className="hover:bg-amber-50/40 transition-colors">
                              <td className="py-3.5 px-4 font-semibold text-neutral-900">
                                {inv.names || 'Couple Names'}
                              </td>
                              <td className="py-3.5 px-4 font-mono text-[11px] text-neutral-600">
                                {inv.customerEmail || inv.userEmail}
                              </td>
                              <td className="py-3.5 px-4">
                                <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-900 font-semibold text-[11px] border border-amber-200/60">
                                  {inv.templateId || 'royal-love'}
                                </span>
                              </td>
                              <td className="py-3.5 px-4">
                                {isSuspended ? (
                                  <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-red-100 text-red-800 text-[10px] font-bold">
                                    ● Suspended
                                  </span>
                                ) : isLive ? (
                                  <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                                    ● Live
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600 text-[10px] font-semibold">
                                    Draft
                                  </span>
                                )}
                              </td>
                              <td className="py-3.5 px-4 font-mono font-bold text-neutral-900">
                                {inv.rsvpCount || 0}
                              </td>
                              <td className="py-3.5 px-4 font-mono text-[11px]">
                                {inv.slug ? (
                                  <a
                                    href={`/i/${inv.slug}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-amber-800 hover:underline flex items-center space-x-1"
                                  >
                                    <span>/i/{inv.slug}</span>
                                    <ArrowUpRight className="w-3 h-3" />
                                  </a>
                                ) : (
                                  <span className="text-neutral-400">—</span>
                                )}
                              </td>
                              <td className="py-3.5 px-4 text-right">
                                <div className="flex items-center justify-end space-x-1.5">
                                  <Link
                                    to={`/invitations/create/${inv._id || inv.id}`}
                                    className="px-2 py-1 rounded bg-neutral-100 hover:bg-amber-100 text-neutral-800 hover:text-amber-900 font-bold text-[11px] transition-colors"
                                  >
                                    Edit
                                  </Link>

                                  {isSuspended ? (
                                    <button
                                      onClick={() => handleUpdateStatus(inv._id || inv.id, 'PUBLISHED')}
                                      className="px-2 py-1 rounded bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-semibold text-[10px]"
                                    >
                                      Restore
                                    </button>
                                  ) : isLive ? (
                                    <button
                                      onClick={() => handleUpdateStatus(inv._id || inv.id, 'SUSPENDED')}
                                      className="px-2 py-1 rounded bg-red-50 hover:bg-red-100 text-red-800 font-semibold text-[10px]"
                                      title="Suspend public access"
                                    >
                                      Suspend
                                    </button>
                                  ) : (
                                    <button
                                      onClick={() => handleUpdateStatus(inv._id || inv.id, 'PUBLISHED')}
                                      className="px-2 py-1 rounded bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-semibold text-[10px]"
                                    >
                                      Publish
                                    </button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* 4. ORDERS & SALES VIEW */}
            {/* ========================================================================= */}
            {activeTab === 'orders' && (
              <div className="bg-white border border-amber-900/10 rounded-2xl shadow-sm overflow-hidden">
                <div className="p-5 border-b border-neutral-100 flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-neutral-900">All Customer Orders</h3>
                    <p className="text-xs text-neutral-500">Real transaction history and purchase types</p>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500 uppercase tracking-wider font-mono text-[10px]">
                      <tr>
                        <th className="py-3 px-4">Client</th>
                        <th className="py-3 px-4">Template</th>
                        <th className="py-3 px-4">Purchase Type</th>
                        <th className="py-3 px-4">Amount</th>
                        <th className="py-3 px-4">Gateway ID</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                      {orders.map((ord) => (
                        <tr key={ord._id} className="hover:bg-neutral-50">
                          <td className="py-3 px-4">
                            <p className="font-semibold text-neutral-900">{ord.customerName || 'Client'}</p>
                            <span className="text-[11px] text-neutral-500 font-mono">{ord.customerEmail}</span>
                          </td>
                          <td className="py-3 px-4 font-semibold text-amber-900">
                            {ord.templateName || ord.templateId}
                          </td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-900 border border-amber-200/60 font-mono">
                              {ord.purchaseType || 'PAID'}
                            </span>
                          </td>
                          <td className="py-3 px-4 font-bold text-neutral-900">
                            ₹{ord.amount || 0}
                          </td>
                          <td className="py-3 px-4 font-mono text-[10px] text-neutral-500">
                            {ord.razorpayOrderId || '—'}
                          </td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold capitalize">
                              {ord.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-neutral-500 text-[11px]">
                            {new Date(ord.createdAt || Date.now()).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* 5. COUPONS MANAGEMENT VIEW */}
            {/* ========================================================================= */}
            {activeTab === 'coupons' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-lg font-bold text-neutral-900">Active Discount Coupons</h3>
                  <button
                    onClick={() => setShowAddCouponModal(true)}
                    className="px-3.5 py-2 rounded-xl bg-amber-900 text-amber-50 text-xs font-bold flex items-center space-x-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ Add Coupon</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {coupons.map((c) => (
                    <div
                      key={c._id || c.code}
                      className="bg-white border border-amber-900/10 rounded-2xl p-4 shadow-sm space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-1 rounded-lg bg-amber-100 text-amber-900 font-mono font-bold text-sm tracking-wider">
                          {c.code}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold">
                          Active
                        </span>
                      </div>
                      <p className="text-xs text-neutral-600">
                        {c.discountType === 'percentage' ? `${c.discountValue}% OFF` : `₹${c.discountValue} FLAT OFF`}
                      </p>
                      <div className="flex items-center justify-between text-[11px] text-neutral-400 font-mono pt-2 border-t border-neutral-100">
                        <span>Used: {c.usageCount || 0} times</span>
                        <span>Limit: {c.usageLimit || 100}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* 6. ALL CUSTOMERS VIEW */}
            {/* ========================================================================= */}
            {activeTab === 'customers' && (
              <div className="bg-white border border-amber-900/10 rounded-2xl shadow-sm overflow-hidden">
                <div className="p-5 border-b border-neutral-100 flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-neutral-900">Customer Directory</h3>
                    <p className="text-xs text-neutral-500">
                      View client accounts, purchased suites, and lifetime value
                    </p>
                  </div>
                  <button
                    onClick={() => setShowAddCustomerModal(true)}
                    className="px-3.5 py-2 rounded-xl bg-amber-900 text-amber-50 text-xs font-bold flex items-center space-x-1.5"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>+ Add Customer</span>
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500 uppercase tracking-wider font-mono text-[10px]">
                      <tr>
                        <th className="py-3 px-4">Name</th>
                        <th className="py-3 px-4">Email</th>
                        <th className="py-3 px-4">Phone</th>
                        <th className="py-3 px-4">Suites</th>
                        <th className="py-3 px-4">Total Spent</th>
                        <th className="py-3 px-4 text-right">Profile</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                      {customers.map((cust) => (
                        <tr key={cust.email} className="hover:bg-neutral-50">
                          <td className="py-3 px-4 font-semibold text-neutral-900">{cust.name}</td>
                          <td className="py-3 px-4 font-mono text-neutral-600">{cust.email}</td>
                          <td className="py-3 px-4 text-neutral-500">{cust.phone || '—'}</td>
                          <td className="py-3 px-4 font-bold text-neutral-900">
                            {cust.invitations?.length || 0}
                          </td>
                          <td className="py-3 px-4 font-bold text-emerald-700">
                            ₹{(cust.totalSpent || 0).toLocaleString('en-IN')}
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button
                              onClick={() => setSelectedCustomerProfile(cust)}
                              className="px-2.5 py-1 rounded bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold text-[11px]"
                            >
                              View Profile
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* 7. TEMPLATES CATALOG VIEW (Database-Driven) */}
            {/* ========================================================================= */}
            {activeTab === 'templates' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-neutral-900">Database Templates Catalog</h3>
                    <p className="text-xs text-neutral-500">
                      All templates are loaded dynamically from the database and powered by the unified Template Engine.
                    </p>
                  </div>
                  <button
                    onClick={() => setShowAddTemplateModal(true)}
                    className="px-3.5 py-2 rounded-xl bg-amber-900 text-amber-50 text-xs font-bold flex items-center space-x-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ Add Template</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {templates.map((tpl) => (
                    <div
                      key={tpl.id || tpl.slug}
                      className="bg-white border border-amber-900/10 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between"
                    >
                      <div>
                        <img
                          src={tpl.previewImage || tpl.image}
                          alt={tpl.name}
                          className="w-full h-44 object-cover"
                        />
                        <div className="p-4 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 text-[10px] font-bold uppercase font-mono">
                              {tpl.category}
                            </span>
                            <span className="font-serif font-bold text-sm text-neutral-900">
                              ₹{tpl.price}
                            </span>
                          </div>
                          <h4 className="font-serif text-base font-bold text-neutral-900">{tpl.name}</h4>
                          <p className="text-xs text-neutral-500 line-clamp-2">{tpl.description}</p>
                        </div>
                      </div>

                      <div className="p-4 bg-neutral-50 border-t border-neutral-100 flex items-center justify-between text-xs">
                        <Link
                          to={`/invitations/templates/${tpl.slug || tpl.id}`}
                          target="_blank"
                          className="text-amber-800 hover:underline font-semibold flex items-center space-x-1"
                        >
                          <span>Preview</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                          Active
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* 8. GUEST RSVPS VIEW */}
            {/* ========================================================================= */}
            {activeTab === 'rsvps' && (
              <div className="bg-white border border-amber-900/10 rounded-2xl shadow-sm overflow-hidden">
                <div className="p-5 border-b border-neutral-100 flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-neutral-900">All Guest RSVPs</h3>
                    <p className="text-xs text-neutral-500">Live attendance submissions from guests</p>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500 uppercase tracking-wider font-mono text-[10px]">
                      <tr>
                        <th className="py-3 px-4">Guest Name</th>
                        <th className="py-3 px-4">Response</th>
                        <th className="py-3 px-4">Guests Count</th>
                        <th className="py-3 px-4">Contact</th>
                        <th className="py-3 px-4">Warm Wishes / Message</th>
                        <th className="py-3 px-4">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                      {rsvps.map((r) => (
                        <tr key={r._id} className="hover:bg-neutral-50">
                          <td className="py-3 px-4 font-semibold text-neutral-900">{r.name}</td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                r.response === 'Yes'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : r.response === 'No'
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-amber-100 text-amber-800'
                              }`}
                            >
                              {r.response}
                            </span>
                          </td>
                          <td className="py-3 px-4 font-mono font-bold">{r.guests || 1}</td>
                          <td className="py-3 px-4 text-neutral-500 font-mono text-[11px]">
                            {r.phone || r.email || '—'}
                          </td>
                          <td className="py-3 px-4 text-neutral-600 max-w-xs truncate">
                            {r.message || '—'}
                          </td>
                          <td className="py-3 px-4 text-neutral-400 text-[11px]">
                            {new Date(r.createdAt || Date.now()).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* 9. ACTIVITY LOGS VIEW */}
            {/* ========================================================================= */}
            {activeTab === 'activity' && (
              <div className="bg-white border border-amber-900/10 rounded-2xl shadow-sm p-5 space-y-4">
                <h3 className="font-serif text-lg font-bold text-neutral-900">Admin Audit Trail</h3>
                <div className="divide-y divide-neutral-100 text-xs">
                  {activityLogs.length === 0 ? (
                    <p className="text-neutral-500 py-6 text-center">No recent administrative logs.</p>
                  ) : (
                    activityLogs.map((log) => (
                      <div key={log._id} className="py-3 flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-neutral-900 font-mono">
                            {log.action.toUpperCase()}
                          </p>
                          <span className="text-[11px] text-neutral-500">
                            By {log.adminEmail} · Target: {log.targetType} ({log.targetId})
                          </span>
                        </div>
                        <span className="text-[10px] text-neutral-400 font-mono">
                          {new Date(log.createdAt || Date.now()).toLocaleString()}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* 10. SYSTEM SETTINGS & BRANDING */}
            {activeTab === 'settings' && (
              <div className="bg-white border border-amber-900/10 rounded-2xl p-6 shadow-sm space-y-6 text-xs">
                <h3 className="font-serif text-lg font-bold text-neutral-900">System Integration Posture</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/80 space-y-2">
                    <p className="font-bold text-neutral-900">Razorpay Payment Gateway</p>
                    <p className="text-neutral-500">Mode: TEST MODE (Active)</p>
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      Verified
                    </span>
                  </div>
                  <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/80 space-y-2">
                    <p className="font-bold text-neutral-900">Database Engine</p>
                    <p className="text-neutral-500">PostgreSQL / Supabase + Offline Resilient Store</p>
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      Connected
                    </span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'branding' && (
              <div className="bg-white border border-amber-900/10 rounded-2xl p-6 shadow-sm space-y-6 text-xs">
                <h3 className="font-serif text-lg font-bold text-neutral-900">Moonlight Production Brand System</h3>
                <p className="text-neutral-600">
                  Strictly branded under Moonlight Production. All gold foiling, Cormorant Garamond, Cinzel typography, and royal crest assets are centrally managed.
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-xl bg-[#B88935] flex items-center justify-center text-white font-bold font-mono text-xs">
                    #B88935
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-[#2C1A1D] flex items-center justify-center text-white font-bold font-mono text-xs">
                    #2C1A1D
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-[#FAF8F5] border border-neutral-300 flex items-center justify-center text-neutral-900 font-bold font-mono text-xs">
                    #FAF8F5
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODAL: ADD CUSTOMER */}
      {/* ========================================================================= */}
      {showAddCustomerModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-serif text-lg font-bold text-neutral-900">Create Customer Account</h3>
              <button
                onClick={() => setShowAddCustomerModal(false)}
                className="p-1 rounded-lg hover:bg-neutral-100"
              >
                <X className="w-4 h-4 text-neutral-500" />
              </button>
            </div>

            <form onSubmit={handleCreateCustomer} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-neutral-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={newCustomer.name}
                  onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                  placeholder="Aarav Sharma"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-amber-600"
                />
              </div>
              <div>
                <label className="block font-bold text-neutral-700 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={newCustomer.email}
                  onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                  placeholder="client@moonlight.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-amber-600"
                />
              </div>
              <div>
                <label className="block font-bold text-neutral-700 mb-1">Phone Number (Optional)</label>
                <input
                  type="tel"
                  value={newCustomer.phone}
                  onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-amber-600"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowAddCustomerModal(false)}
                  className="px-4 py-2 rounded-xl border border-neutral-200 text-neutral-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-900 text-amber-50 font-bold"
                >
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: ADD TEMPLATE */}
      {/* ========================================================================= */}
      {showAddTemplateModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-serif text-lg font-bold text-neutral-900">Add New Design Template</h3>
              <button
                onClick={() => setShowAddTemplateModal(false)}
                className="p-1 rounded-lg hover:bg-neutral-100"
              >
                <X className="w-4 h-4 text-neutral-500" />
              </button>
            </div>

            <form onSubmit={handleCreateTemplate} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-neutral-700 mb-1">Template Name</label>
                  <input
                    type="text"
                    required
                    value={newTemplate.name}
                    onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
                    placeholder="Royal Heritage Vows"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200"
                  />
                </div>
                <div>
                  <label className="block font-bold text-neutral-700 mb-1">Category</label>
                  <select
                    value={newTemplate.category}
                    onChange={(e) => setNewTemplate({ ...newTemplate, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 bg-white"
                  >
                    <option value="Wedding">Wedding</option>
                    <option value="Engagement">Engagement</option>
                    <option value="Haldi">Haldi</option>
                    <option value="Mehendi">Mehendi</option>
                    <option value="Reception">Reception</option>
                    <option value="Birthday">Birthday</option>
                    <option value="Anniversary">Anniversary</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-neutral-700 mb-1">Price (INR)</label>
                  <input
                    type="number"
                    required
                    value={newTemplate.price}
                    onChange={(e) => setNewTemplate({ ...newTemplate, price: e.target.value })}
                    placeholder="699"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200"
                  />
                </div>
                <div>
                  <label className="block font-bold text-neutral-700 mb-1">Slug</label>
                  <input
                    type="text"
                    value={newTemplate.slug}
                    onChange={(e) => setNewTemplate({ ...newTemplate, slug: e.target.value })}
                    placeholder="royal-heritage-vows"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-neutral-700 mb-1">Preview Image URL</label>
                <input
                  type="url"
                  required
                  value={newTemplate.previewImage}
                  onChange={(e) => setNewTemplate({ ...newTemplate, previewImage: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200"
                />
              </div>

              <div>
                <label className="block font-bold text-neutral-700 mb-1">Description</label>
                <textarea
                  rows="2"
                  value={newTemplate.description}
                  onChange={(e) => setNewTemplate({ ...newTemplate, description: e.target.value })}
                  placeholder="Luxury suite with gold foiling, countdown and royal crest."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowAddTemplateModal(false)}
                  className="px-4 py-2 rounded-xl border border-neutral-200 text-neutral-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-900 text-amber-50 font-bold"
                >
                  Save Template to DB
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: ADD COUPON */}
      {/* ========================================================================= */}
      {showAddCouponModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-serif text-lg font-bold text-neutral-900">Create Discount Coupon</h3>
              <button
                onClick={() => setShowAddCouponModal(false)}
                className="p-1 rounded-lg hover:bg-neutral-100"
              >
                <X className="w-4 h-4 text-neutral-500" />
              </button>
            </div>

            <form onSubmit={handleCreateCoupon} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-neutral-700 mb-1">Coupon Code</label>
                <input
                  type="text"
                  required
                  value={newCoupon.code}
                  onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value.toUpperCase() })}
                  placeholder="SUMMER30"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 uppercase font-mono font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-neutral-700 mb-1">Type</label>
                  <select
                    value={newCoupon.discountType}
                    onChange={(e) => setNewCoupon({ ...newCoupon, discountType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 bg-white"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed Amount (₹)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-neutral-700 mb-1">Value</label>
                  <input
                    type="number"
                    required
                    value={newCoupon.discountValue}
                    onChange={(e) => setNewCoupon({ ...newCoupon, discountValue: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowAddCouponModal(false)}
                  className="px-4 py-2 rounded-xl border border-neutral-200 text-neutral-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-900 text-amber-50 font-bold"
                >
                  Activate Coupon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* DRAWER: CUSTOMER PROFILE */}
      {/* ========================================================================= */}
      {selectedCustomerProfile && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end">
          <div className="bg-white max-w-md w-full h-full p-6 shadow-2xl overflow-y-auto space-y-6">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase text-amber-800 font-bold">
                  Customer Profile
                </span>
                <h3 className="font-serif text-xl font-bold text-neutral-900">
                  {selectedCustomerProfile.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedCustomerProfile(null)}
                className="p-1 rounded-lg hover:bg-neutral-100"
              >
                <X className="w-5 h-5 text-neutral-500" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-100 space-y-1 font-mono">
                <p className="text-neutral-500">Email: {selectedCustomerProfile.email}</p>
                <p className="text-neutral-500">Phone: {selectedCustomerProfile.phone || 'None'}</p>
                <p className="text-emerald-700 font-bold">
                  Lifetime Spend: ₹{(selectedCustomerProfile.totalSpent || 0).toLocaleString('en-IN')}
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-serif text-sm font-bold text-neutral-900">
                  Customer's Invitations ({selectedCustomerProfile.invitations?.length || 0})
                </h4>
                {selectedCustomerProfile.invitations?.map((inv) => (
                  <div key={inv._id || inv.id} className="p-3 rounded-xl border border-neutral-200 space-y-1">
                    <p className="font-semibold text-neutral-900">{inv.names || 'Couple'}</p>
                    <p className="text-neutral-500 text-[11px]">Template: {inv.templateId}</p>
                    {inv.slug && (
                      <a
                        href={`/i/${inv.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-amber-800 hover:underline flex items-center space-x-1 font-mono text-[11px]"
                      >
                        <span>/i/{inv.slug}</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </a>
                    )}
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

export default InvitationAdmin;
