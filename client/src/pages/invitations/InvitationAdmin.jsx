import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
} from 'lucide-react';

const InvitationAdmin = () => {
  const { user } = useAuth();
  const { addToast } = useNotification();

  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalPurchases: 0,
    totalPublished: 0,
    totalRSVPs: 0,
  });
  const [invitations, setInvitations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const res = await api.get('/invitations/admin/stats');
      const data = res.data || res;
      setStats({
        totalRevenue: data.totalRevenue || 0,
        totalPurchases: data.totalPurchases || 0,
        totalPublished: data.totalPublished || 0,
        totalRSVPs: data.totalRSVPs || 0,
      });
      setInvitations(data.invitations || []);
    } catch (err) {
      console.warn('[Admin Invitations Error]', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const filteredInvitations = invitations.filter((inv) => {
    const matchesSearch =
      (inv.names || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (inv.customerEmail || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (inv.slug || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (inv.templateId || '').toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      filterStatus === 'ALL' ||
      (filterStatus === 'PUBLISHED' && inv.published) ||
      (filterStatus === 'DRAFT' && !inv.published);

    return matchesSearch && matchesStatus;
  });

  const exportCSV = () => {
    const headers = ['Names', 'Email', 'Template', 'Status', 'Slug', 'RSVP Count', 'Date'];
    const rows = filteredInvitations.map((inv) => [
      `"${inv.names || 'Couple'}"`,
      `"${inv.customerEmail || ''}"`,
      `"${inv.templateId || 'royal-love'}"`,
      inv.published ? 'Published' : 'Draft',
      `"${inv.slug || ''}"`,
      inv.rsvpCount || 0,
      `"${new Date(inv.createdAt || Date.now()).toLocaleDateString()}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `moonlight_invitations_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addToast({ title: 'Exported CSV', message: 'Invitations report downloaded successfully.', type: 'success' });
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-neutral-900 pt-28 pb-20 font-sans">
      <SEO
        title="Digital Invitations Admin | Moonlight Production"
        description="Monitor digital invitation orders, customer publications, guest RSVP counters, and revenue metrics."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-amber-900/10 pb-6">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-mono text-xs uppercase font-bold">
                Admin Command
              </span>
              <span className="text-xs text-neutral-500 font-mono">Digital Invitations Suite</span>
            </div>
            <h1 className="font-serif text-3xl font-bold text-neutral-900 mt-1">
              Digital Invitation Operations
            </h1>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={fetchAdminData}
              className="p-2.5 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-700 transition-colors shadow-sm"
              title="Refresh Data"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={exportCSV}
              className="px-4 py-2.5 rounded-xl bg-amber-900 hover:bg-amber-950 text-amber-50 text-xs font-bold uppercase tracking-wider flex items-center space-x-2 shadow-sm transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-amber-900/10 rounded-2xl p-5 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-neutral-500">
              <span className="text-xs font-bold uppercase tracking-wider">Total Revenue</span>
              <TrendingUp className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900">
              ₹{stats.totalRevenue.toLocaleString('en-IN')}
            </div>
            <span className="text-[11px] text-emerald-600 font-semibold block">
              100% Direct Razorpay Collections
            </span>
          </div>

          <div className="bg-white border border-amber-900/10 rounded-2xl p-5 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-neutral-500">
              <span className="text-xs font-bold uppercase tracking-wider">Total Orders</span>
              <CreditCard className="w-4 h-4 text-amber-700" />
            </div>
            <div className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900">
              {stats.totalPurchases}
            </div>
            <span className="text-[11px] text-neutral-500 block font-mono">
              Completed purchases
            </span>
          </div>

          <div className="bg-white border border-amber-900/10 rounded-2xl p-5 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-neutral-500">
              <span className="text-xs font-bold uppercase tracking-wider">Published Links</span>
              <CheckCircle2 className="w-4 h-4 text-amber-700" />
            </div>
            <div className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900">
              {stats.totalPublished}
            </div>
            <span className="text-[11px] text-neutral-500 block font-mono">
              Live on /i/:slug
            </span>
          </div>

          <div className="bg-white border border-amber-900/10 rounded-2xl p-5 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-neutral-500">
              <span className="text-xs font-bold uppercase tracking-wider">Guest RSVPs</span>
              <Users className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900">
              {stats.totalRSVPs}
            </div>
            <span className="text-[11px] text-indigo-600 font-semibold block">
              Responses registered
            </span>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white border border-amber-900/10 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search couples, email, slug..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-neutral-200 text-xs sm:text-sm focus:outline-none focus:border-amber-600"
            />
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
            <span className="text-xs text-neutral-500 font-semibold">Status:</span>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-neutral-200 text-xs font-semibold text-neutral-800 bg-white focus:outline-none"
            >
              <option value="ALL">All Status</option>
              <option value="PUBLISHED">Published Only</option>
              <option value="DRAFT">Drafts Only</option>
            </select>
          </div>
        </div>

        {/* Invitations Table */}
        <div className="bg-white border border-amber-900/10 rounded-2xl shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-12 text-center space-y-3">
              <div className="w-8 h-8 rounded-full border-2 border-amber-700 border-t-transparent animate-spin mx-auto" />
              <p className="text-xs text-neutral-500 font-mono">Loading invitation registries...</p>
            </div>
          ) : filteredInvitations.length === 0 ? (
            <div className="p-12 text-center space-y-2">
              <p className="font-serif text-lg font-bold text-neutral-900">No invitations found</p>
              <p className="text-xs text-neutral-500">
                Purchases and customer invitations will automatically appear here.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500 uppercase tracking-wider font-mono text-[10px]">
                  <tr>
                    <th className="py-3 px-4">Couple / Host</th>
                    <th className="py-3 px-4">Contact</th>
                    <th className="py-3 px-4">Template</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">RSVPs</th>
                    <th className="py-3 px-4">Live URL</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {filteredInvitations.map((inv) => (
                    <tr key={inv._id || inv.id} className="hover:bg-amber-50/40 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-neutral-900">
                        {inv.names || 'Couple Names'}
                      </td>
                      <td className="py-3.5 px-4 text-neutral-600">
                        <div className="flex flex-col">
                          <span className="font-mono text-[11px]">{inv.customerEmail}</span>
                          {inv.customerPhone && (
                            <span className="text-[10px] text-neutral-400">{inv.customerPhone}</span>
                          )}
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-900 font-semibold text-[11px] border border-amber-200/60">
                          {inv.templateId || 'royal-love'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        {inv.published ? (
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
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        ) : (
                          <span className="text-neutral-400">—</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <Link
                          to={`/invitations/create/${inv._id || inv.id}`}
                          className="px-2.5 py-1 rounded-lg bg-neutral-100 hover:bg-amber-100 text-neutral-800 hover:text-amber-900 font-bold text-[11px] transition-colors"
                        >
                          Edit
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InvitationAdmin;
