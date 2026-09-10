import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import api from '../../api/client';
import SEO from '../../components/common/SEO';
import {
  Sparkles,
  Plus,
  Edit3,
  ExternalLink,
  Share2,
  Copy,
  Check,
  Calendar,
  MapPin,
  Clock,
  Users,
  CheckCircle2,
  AlertCircle,
  Eye,
  RefreshCw,
} from 'lucide-react';

const InvitationDashboard = () => {
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const { addToast } = useNotification();

  const [invitations, setInvitations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copiedSlug, setCopiedSlug] = useState(null);

  const customerEmail =
    user?.email || localStorage.getItem('moonlight_customer_email') || 'customer@moonlight.com';

  const fetchDashboard = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/invitations/dashboard?email=${encodeURIComponent(customerEmail)}`);
      const data = res.data?.invitations || res.data?.data || res.data || [];
      setInvitations(data);
    } catch (err) {
      console.warn('[Dashboard Fetch Error]', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, [customerEmail]);

  const handleCopyLink = (slug) => {
    const fullUrl = `${window.location.origin}/i/${slug}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedSlug(slug);
    addToast({
      title: 'Link Copied!',
      message: `${fullUrl} copied to clipboard.`,
      type: 'success',
    });
    setTimeout(() => setCopiedSlug(null), 2500);
  };

  const handleShareWhatsApp = (inv) => {
    const fullUrl = `${window.location.origin}/i/${inv.slug}`;
    const text = encodeURIComponent(
      `Namaste! ✨\nYou are cordially invited to celebrate ${inv.title || 'our wedding celebration'} on ${inv.date || 'the wedding day'}.\n\nTap the live link below to view the luxury invitation, event countdown, venue directions & RSVP:\n${fullUrl}\n\nWith love,\n${inv.names || 'Moonlight Production'}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const publishedCount = invitations.filter((i) => i.published).length;
  const totalRsvps = invitations.reduce((sum, i) => sum + (i.rsvpCount || 0), 0);

  return (
    <div className="min-h-screen bg-[#F5F1E8] text-neutral-900 pt-24 sm:pt-32 pb-20 px-4 sm:px-6 lg:px-8 font-sans">
      <SEO
        title="My Invitations Dashboard — Moonlight Production"
        description="Manage, customize, and share your digital wedding invitations with live RSVP analytics."
      />

      <div className="max-w-6xl mx-auto space-y-8">
        {/* Admin Switcher Banner if Admin is logged in */}
        {(user?.role === 'admin' || user?.role === 'superadmin') && (
          <div className="p-4 rounded-2xl bg-amber-900 text-amber-50 flex items-center justify-between shadow-md">
            <div className="flex items-center space-x-3 text-xs">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>
                <strong>Administrator Mode:</strong> You are viewing customer invitations as an Admin.
              </span>
            </div>
            <Link
              to="/invitations/admin"
              className="px-3.5 py-1.5 rounded-xl bg-white text-amber-950 font-bold text-xs uppercase tracking-wider hover:bg-amber-100 transition-all shadow-sm"
            >
              Open Admin Control Center →
            </Link>
          </div>
        )}

        {/* Payment confirmation alert if just paid */}
        {searchParams.get('paid') && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 flex items-center space-x-3 shadow-sm animate-fade-in">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <div className="text-xs">
              <strong>Payment Verified!</strong> Your template is unlocked and ready for customization below.
            </div>
          </div>
        )}

        {/* Dashboard Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-[#DDD2C0] pb-6">
          <div className="space-y-1">
            <span className="text-[11px] uppercase font-mono tracking-[0.25em] text-amber-800 font-bold block">
              Customer Portal
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900">
              My Invitations Suite
            </h1>
            <p className="text-neutral-600 text-xs font-mono">
              Signed in as: <span className="font-bold text-neutral-900">{customerEmail}</span>
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={fetchDashboard}
              className="p-2.5 rounded-xl bg-white border border-stone-200 text-neutral-600 hover:text-amber-800 hover:bg-stone-50 transition-colors shadow-sm"
              title="Refresh Invitations"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <Link
              to="/invitations/templates"
              className="px-5 py-2.5 rounded-full bg-amber-900 hover:bg-amber-800 text-white font-bold text-xs uppercase tracking-wider flex items-center shadow-sm"
            >
              <Plus className="w-3.5 h-3.5 mr-1.5" /> Buy New Template
            </Link>
          </div>
        </div>

        {/* 3 Overview Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-[#E0D7C7] shadow-sm space-y-1">
            <span className="text-[10px] uppercase font-mono tracking-wider text-neutral-500 font-bold block">
              Total Created
            </span>
            <div className="font-serif text-3xl font-bold text-amber-900">{invitations.length}</div>
            <span className="text-[11px] text-neutral-500">Invitations in your suite</span>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-[#E0D7C7] shadow-sm space-y-1">
            <span className="text-[10px] uppercase font-mono tracking-wider text-neutral-500 font-bold block">
              Live & Published
            </span>
            <div className="font-serif text-3xl font-bold text-emerald-700">{publishedCount}</div>
            <span className="text-[11px] text-neutral-500">Accessible by guests</span>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-[#E0D7C7] shadow-sm space-y-1">
            <span className="text-[10px] uppercase font-mono tracking-wider text-neutral-500 font-bold block">
              Total RSVPs Received
            </span>
            <div className="font-serif text-3xl font-bold text-indigo-900">{totalRsvps}</div>
            <span className="text-[11px] text-neutral-500">Guests responded</span>
          </div>
        </div>

        {/* Invitations List */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E0D7C7] shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-stone-200 pb-4">
            <h2 className="font-serif text-xl font-bold text-neutral-900">Your Invitation Drafts & Live Cards</h2>
            <span className="text-xs text-neutral-500 font-mono">{invitations.length} Items</span>
          </div>

          {loading ? (
            <div className="text-center py-12 text-neutral-500 font-mono text-xs">
              Loading your invitation suite...
            </div>
          ) : invitations.length === 0 ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mx-auto">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif text-lg font-bold text-neutral-900">No invitations created yet</h3>
                <p className="text-neutral-500 text-xs max-w-sm mx-auto">
                  Pick your favorite luxury template from our marketplace to begin crafting your royal invitation.
                </p>
              </div>
              <Link
                to="/invitations/templates"
                className="inline-flex items-center px-6 py-3 rounded-full bg-amber-900 text-white font-bold text-xs uppercase tracking-wider shadow-sm"
              >
                Browse Templates
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {invitations.map((inv) => {
                const invId = inv._id || inv.id;
                const fullLiveUrl = `${window.location.origin}/i/${inv.slug}`;

                return (
                  <div
                    key={invId}
                    className="p-5 sm:p-6 rounded-2xl bg-[#FFFDF9] border border-[#E0D6C6] shadow-sm space-y-4 flex flex-col justify-between hover:border-amber-600/40 transition-all"
                  >
                    <div className="space-y-3">
                      {/* Top status & template */}
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-amber-800 bg-amber-100/70 px-2.5 py-0.5 rounded-full border border-amber-300">
                          {inv.eventType || 'Wedding'} Suite
                        </span>
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider ${
                            inv.published
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : 'bg-stone-100 text-stone-700 border border-stone-300'
                          }`}
                        >
                          {inv.published ? '● Published & Live' : '○ Saved as Draft'}
                        </span>
                      </div>

                      <div>
                        <h3 className="font-serif text-lg sm:text-xl font-bold text-neutral-900">
                          {inv.title || 'Untitled Invitation'}
                        </h3>
                        <p className="text-xs text-neutral-600 font-medium">{inv.names}</p>
                      </div>

                      <div className="space-y-1 text-xs text-neutral-600">
                        <div className="flex items-center">
                          <Calendar className="w-3.5 h-3.5 mr-1.5 text-amber-700 shrink-0" />
                          <span>{inv.date ? new Date(inv.date).toLocaleDateString('en-IN') : 'Date TBD'} • {inv.time || '19:00'}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-3.5 h-3.5 mr-1.5 text-amber-700 shrink-0" />
                          <span className="truncate">{inv.venue || 'Venue TBD'}</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="w-3.5 h-3.5 mr-1.5 text-amber-700 shrink-0" />
                          <span><strong>{inv.rsvpCount || 0}</strong> RSVPs Received</span>
                        </div>
                      </div>

                      {inv.published && (
                        <div className="p-2.5 rounded-xl bg-stone-100 border border-stone-200 text-[11px] font-mono text-neutral-700 break-all select-all flex items-center justify-between">
                          <span className="truncate mr-2">{fullLiveUrl}</span>
                        </div>
                      )}
                    </div>

                    {/* Actions Toolbar */}
                    <div className="pt-3 border-t border-stone-200 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center space-x-2">
                        <Link
                          to={`/invitations/create/${invId}`}
                          className="px-3.5 py-1.5 rounded-xl bg-amber-900 hover:bg-amber-800 text-white font-bold text-xs flex items-center shadow-sm"
                        >
                          <Edit3 className="w-3.5 h-3.5 mr-1" /> Edit Details
                        </Link>

                        {inv.published && (
                          <Link
                            to={`/i/${inv.slug}`}
                            target="_blank"
                            className="px-3 py-1.5 rounded-xl bg-white hover:bg-stone-100 border border-stone-300 text-neutral-900 font-bold text-xs flex items-center shadow-sm"
                          >
                            <ExternalLink className="w-3.5 h-3.5 mr-1 text-amber-700" /> Open Live
                          </Link>
                        )}
                      </div>

                      {inv.published && (
                        <div className="flex items-center space-x-1.5">
                          <button
                            onClick={() => handleCopyLink(inv.slug)}
                            className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-neutral-700 transition-colors"
                            title="Copy Live Link"
                          >
                            {copiedSlug === inv.slug ? (
                              <Check className="w-4 h-4 text-emerald-600" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
                          <button
                            onClick={() => handleShareWhatsApp(inv)}
                            className="p-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
                            title="Share on WhatsApp"
                          >
                            <Share2 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InvitationDashboard;
