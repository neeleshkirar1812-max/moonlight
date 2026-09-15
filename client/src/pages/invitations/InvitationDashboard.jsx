import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import api from '../../api/client';
import SEO from '../../components/common/SEO';
import MobileDeviceMockup from '../../components/invitations/components/MobileDeviceMockup';
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
  Smartphone,
  Crown,
  Heart,
  QrCode,
  X,
} from 'lucide-react';

const InvitationDashboard = () => {
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const { addToast } = useNotification();

  const [invitations, setInvitations] = useState([]);
  const [unlockedPlans, setUnlockedPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copiedSlug, setCopiedSlug] = useState(null);
  const [previewingInv, setPreviewingInv] = useState(null);

  const customerEmail =
    user?.email || localStorage.getItem('moonlight_customer_email') || 'customer@moonlight.com';

  const fetchDashboard = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/invitations/dashboard?email=${encodeURIComponent(customerEmail)}`);
      const data = res.data?.invitations || res.data?.data || res.data || [];
      const plans = res.data?.unlockedPlans || [];
      const savedPlans = JSON.parse(localStorage.getItem('moonlight_unlocked_plans') || '[]');
      const combinedPlans = Array.from(new Set([...plans, ...savedPlans]));

      setInvitations(data);
      setUnlockedPlans(combinedPlans);
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
    <div className="min-h-screen bg-[#0A0708] text-neutral-100 pt-24 sm:pt-32 pb-24 px-4 sm:px-6 lg:px-8 font-sans selection:bg-amber-500 selection:text-neutral-950 relative overflow-hidden">
      <SEO
        title="My Invitations Dashboard — Moonlight Production 2026"
        description="Manage, customize, and share your digital wedding invitations with live mobile phone preview and RSVP analytics."
      />

      {/* Luxury Ambient Glowing Backdrops */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-8 relative z-10">
        {/* Admin Switcher Banner if Admin is logged in */}
        {(user?.role === 'admin' || user?.role === 'superadmin') && (
          <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/80 via-neutral-900 to-amber-950/80 border border-amber-500/40 text-amber-100 flex items-center justify-between shadow-2xl backdrop-blur-md">
            <div className="flex items-center space-x-3 text-xs">
              <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>
                <strong className="text-amber-300">Administrator Command:</strong> You are viewing customer invitations with master privileges.
              </span>
            </div>
            <Link
              to="/invitations/admin"
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-md"
            >
              Admin Control Center →
            </Link>
          </div>
        )}

        {/* Payment confirmation alert if just paid */}
        {searchParams.get('paid') && (
          <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 flex items-center space-x-3 shadow-xl backdrop-blur-md animate-fade-in">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <div className="text-xs">
              <strong className="text-emerald-300">Payment Verified!</strong> Your template is unlocked and ready for customization below.
            </div>
          </div>
        )}

        {/* Dashboard Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-amber-500/20 pb-6">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-[11px] uppercase font-mono tracking-[0.25em] text-amber-400 font-bold block">
                Couple & Client Portal
              </span>
              <span className="px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-[10px] font-mono text-amber-300 font-bold">
                2026 Edition
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold bg-gradient-to-r from-amber-100 via-amber-200 to-amber-400 bg-clip-text text-transparent">
              My Invitations Suite
            </h1>
            <p className="text-neutral-400 text-xs font-mono">
              Signed in as: <span className="font-bold text-amber-300">{customerEmail}</span>
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={fetchDashboard}
              className="p-2.5 rounded-xl bg-neutral-900 border border-amber-500/30 text-neutral-300 hover:text-amber-400 hover:bg-neutral-800 transition-colors shadow-sm"
              title="Refresh Invitations"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <Link
              to="/invitations/templates"
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-neutral-950 font-extrabold text-xs uppercase tracking-wider flex items-center shadow-lg hover:brightness-110 transition-all btn-shimmer"
            >
              <Plus className="w-3.5 h-3.5 mr-1.5" />
              <span>+ Create / Choose Design</span>
            </Link>
          </div>
        </div>

        {/* Unlocked Plan Passes Status Banner */}
        {(unlockedPlans.length > 0 || user?.role === 'admin' || user?.role === 'superadmin') && (
          <div className="p-4 rounded-2xl bg-gradient-to-r from-[#241316] via-[#160B0D] to-[#241316] text-amber-100 border border-amber-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xl backdrop-blur-md">
            <div className="space-y-0.5">
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold flex items-center">
                <Crown className="w-3.5 h-3.5 mr-1.5 text-amber-400" />
                Active VIP Plan Access
              </span>
              <p className="text-xs text-neutral-200 font-medium">
                {user?.role === 'admin' || user?.role === 'superadmin' || (unlockedPlans.includes('royal') && unlockedPlans.includes('classic'))
                  ? '👑 Supreme VIP: Full Access to ALL 31 Royal 4K Gate Themes, Classic 3D Suites & Hindi Editions!'
                  : unlockedPlans.includes('royal')
                  ? '👑 Royal Suite Pass: You have unlocked ALL 13 Royal 4K Video Door Themes & Hindi Editions!'
                  : '🏛️ Classic Suite Pass: You have unlocked ALL 13 Classic 3D Gate Themes & Hindi Editions!'}
              </p>
            </div>
            <Link
              to={unlockedPlans.includes('royal') ? '/templates?collection=royal' : '/templates?collection=classic'}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-950 text-xs font-extrabold uppercase tracking-wider shadow-md hover:brightness-110 shrink-0"
            >
              Pick Any Theme (₹0) →
            </Link>
          </div>
        )}

        {/* 3 Overview Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-neutral-900/80 rounded-2xl p-5 border border-amber-500/20 shadow-lg backdrop-blur-md space-y-1">
            <span className="text-[10px] uppercase font-mono tracking-wider text-neutral-400 font-bold block">
              Total Created
            </span>
            <div className="font-serif text-3xl font-bold text-amber-400">{invitations.length}</div>
            <span className="text-[11px] text-neutral-400">Invitations in your personal suite</span>
          </div>

          <div className="bg-neutral-900/80 rounded-2xl p-5 border border-amber-500/20 shadow-lg backdrop-blur-md space-y-1">
            <span className="text-[10px] uppercase font-mono tracking-wider text-neutral-400 font-bold block">
              Live & Published
            </span>
            <div className="font-serif text-3xl font-bold text-emerald-400">{publishedCount}</div>
            <span className="text-[11px] text-neutral-400">Active and shared with wedding guests</span>
          </div>

          <div className="bg-neutral-900/80 rounded-2xl p-5 border border-amber-500/20 shadow-lg backdrop-blur-md space-y-1">
            <span className="text-[10px] uppercase font-mono tracking-wider text-neutral-400 font-bold block">
              Total RSVPs Received
            </span>
            <div className="font-serif text-3xl font-bold text-amber-300">{totalRsvps}</div>
            <span className="text-[11px] text-neutral-400">Guests confirmed attendance</span>
          </div>
        </div>

        {/* Invitations List */}
        <div className="bg-neutral-900/60 rounded-3xl p-6 sm:p-8 border border-amber-500/25 shadow-2xl backdrop-blur-md space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-amber-200">
              Your Invitation Drafts & Live Cards
            </h2>
            <span className="text-xs text-neutral-400 font-mono">{invitations.length} Cards Total</span>
          </div>

          {loading ? (
            <div className="text-center py-12 text-neutral-400 font-mono text-xs animate-pulse">
              Loading your royal invitation suite...
            </div>
          ) : invitations.length === 0 ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-14 h-14 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center mx-auto shadow-inner">
                <Sparkles className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif text-xl font-bold text-white">No invitations created yet</h3>
                <p className="text-neutral-400 text-xs max-w-sm mx-auto">
                  Pick your favorite luxury template from our marketplace to begin crafting your royal wedding card.
                </p>
              </div>
              <Link
                to="/invitations/templates"
                className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-950 font-bold text-xs uppercase tracking-wider shadow-lg hover:brightness-110"
              >
                Browse 2026 Templates
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
                    className="p-5 sm:p-6 rounded-2xl bg-neutral-950/80 border border-amber-500/30 shadow-xl space-y-4 flex flex-col justify-between hover:border-amber-400/70 transition-all group relative overflow-hidden"
                  >
                    <div className="space-y-3 relative z-10">
                      {/* Top status & template */}
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                          {inv.eventType || 'Wedding'} Suite
                        </span>
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider ${
                            inv.published
                              ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                              : 'bg-neutral-800 text-neutral-300 border border-neutral-700'
                          }`}
                        >
                          {inv.published ? '● Live & Published' : '○ Saved Draft'}
                        </span>
                      </div>

                      <div>
                        <h3 className="font-serif text-lg sm:text-xl font-bold text-white group-hover:text-amber-200 transition-colors">
                          {inv.title || 'Untitled Invitation'}
                        </h3>
                        <p className="text-xs text-amber-300/90 font-medium">{inv.names}</p>
                      </div>

                      <div className="space-y-1 text-xs text-neutral-300">
                        <div className="flex items-center">
                          <Calendar className="w-3.5 h-3.5 mr-1.5 text-amber-400 shrink-0" />
                          <span>{inv.date ? new Date(inv.date).toLocaleDateString('en-IN') : 'Date TBD'} • {inv.time || '19:00'}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-3.5 h-3.5 mr-1.5 text-amber-400 shrink-0" />
                          <span className="truncate">{inv.venue || 'Venue TBD'}</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="w-3.5 h-3.5 mr-1.5 text-amber-400 shrink-0" />
                          <span><strong>{inv.rsvpCount || 0}</strong> RSVPs Received</span>
                        </div>
                      </div>

                      {inv.published && (
                        <div className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-[11px] font-mono text-neutral-300 break-all select-all flex items-center justify-between">
                          <span className="truncate mr-2">{fullLiveUrl}</span>
                        </div>
                      )}
                    </div>

                    {/* Actions Toolbar */}
                    <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 relative z-10">
                      <div className="flex items-center space-x-2">
                        {/* 📱 Mobile Device Preview Modal Trigger */}
                        <button
                          type="button"
                          onClick={() => setPreviewingInv(inv)}
                          className="px-3.5 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-amber-300 border border-amber-500/40 font-bold text-xs flex items-center shadow-sm transition-all"
                          title="Open Interactive Mobile Phone Display"
                        >
                          <Smartphone className="w-3.5 h-3.5 mr-1 text-amber-400" />
                          <span>Mobile View</span>
                        </button>

                        <Link
                          to={`/invitations/create/${invId}`}
                          className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:brightness-110 text-neutral-950 font-bold text-xs flex items-center shadow-md transition-all"
                        >
                          <Edit3 className="w-3.5 h-3.5 mr-1" /> Edit
                        </Link>

                        {inv.published && (
                          <Link
                            to={`/i/${inv.slug}`}
                            target="_blank"
                            className="px-3 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-white font-bold text-xs flex items-center shadow-sm"
                          >
                            <ExternalLink className="w-3.5 h-3.5 mr-1 text-amber-400" /> Live
                          </Link>
                        )}
                      </div>

                      {inv.published && (
                        <div className="flex items-center space-x-1.5">
                          <button
                            onClick={() => handleCopyLink(inv.slug)}
                            className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-amber-400 transition-colors"
                            title="Copy Live Link"
                          >
                            {copiedSlug === inv.slug ? (
                              <Check className="w-4 h-4 text-emerald-400" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
                          <button
                            onClick={() => handleShareWhatsApp(inv)}
                            className="p-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
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

      {/* ========================================================================= */}
      {/* 2026 INTERACTIVE MOBILE PHONE DISPLAY MODAL */}
      {/* ========================================================================= */}
      {previewingInv && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex flex-col items-center justify-between p-3 sm:p-6 animate-fade-in font-sans">
          {/* Header */}
          <div className="w-full max-w-4xl flex items-center justify-between py-2 border-b border-amber-500/20 text-white gap-3 z-10">
            <div className="flex items-center space-x-3">
              <span className="font-serif text-lg font-bold text-amber-300 flex items-center space-x-2">
                <Smartphone className="w-5 h-5 text-amber-400" />
                <span>2026 Mobile Display Simulator</span>
              </span>
              <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-[10px] font-mono text-amber-300">
                {previewingInv.title || 'Wedding Card'}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setPreviewingInv(null)}
              className="px-4 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs uppercase tracking-wider shadow-lg transition-all"
            >
              ✕ Close Simulator
            </button>
          </div>

          {/* Simulator Screen */}
          <div className="w-full flex-1 flex items-center justify-center my-3 overflow-y-auto">
            <MobileDeviceMockup
              invitation={previewingInv}
              isPreview={true}
              showControls={true}
              defaultDevice="auto"
              maxHeight="78vh"
              showOpeningInPreview={false}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default InvitationDashboard;
