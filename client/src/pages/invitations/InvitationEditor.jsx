import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import api from '../../api/client';
import SEO from '../../components/common/SEO';
import InvitationRenderer from '../../components/invitations/engine/InvitationRenderer';
import { getTemplateById } from '../../data/invitationTemplates';
import { templateDemoDataMap } from '../public/PublicInvitation';
import {
  Sparkles,
  Eye,
  ExternalLink,
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Gift,
  Share2,
  Copy,
  Check,
  CheckCircle2,
  Plus,
  Trash2,
  Heart,
  Image as ImageIcon,
  Send,
  Upload,
} from 'lucide-react';

const InvitationEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToast } = useNotification();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [showFullscreenPreview, setShowFullscreenPreview] = useState(false);
  const [previewDevice, setPreviewDevice] = useState('mobile');

  const [form, setForm] = useState({
    template_id: 'rose-gold-blush-royal',
    title: 'A Royal Celebration',
    names: 'Aarav Sharma & Kiara Sen',
    bride_name: 'Kiara Sen',
    groom_name: 'Aarav Sharma',
    host_names: 'Mr. & Mrs. Sharma and Mr. & Mrs. Sen',
    eventType: 'Wedding',
    date: '2026-11-20',
    time: '19:00',
    venue: 'Jehan Numa Palace',
    venueAddress: '152 Shamla Hills, Bhopal, Madhya Pradesh',
    opening_heading: 'Cordially Invites You To The Celebration Of',
    door_video_url: '',
    welcome_text: 'With joyous hearts, we request the honor of your presence to celebrate our special day.',
    message: 'With joyous hearts, we request the honor of your presence to celebrate our special day.',
    coverPhoto: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',

    // Events List
    events: [
      {
        id: 'ev-1',
        title: 'Haldi & Chooda Ceremony',
        date: '2026-11-19',
        time: '10:00 AM',
        venue: 'Palace Courtyard',
        address: '152 Shamla Hills, Bhopal',
        description: 'Vibrant yellow florals, turmeric blessings, and traditional marigold festivities.',
        image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 'ev-2',
        title: 'Royal Sangeet & Musical Night',
        date: '2026-11-19',
        time: '07:00 PM',
        venue: 'Grand Ballroom, Jehan Numa Palace',
        address: '152 Shamla Hills, Bhopal',
        description: 'An evening of dance performances, celebratory beats, and royal banquet dinner.',
        image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 'ev-3',
        title: 'The Wedding Ceremony (Pheras)',
        date: '2026-11-20',
        time: '07:00 PM',
        venue: 'Lakeside Palace Gardens',
        address: '152 Shamla Hills, Bhopal',
        description: 'Baraat procession followed by sacred Vedic vows under the royal mandap.',
        image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
      },
    ],

    // Gallery Images
    gallery_images: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=80',
    ],

    // Scratch card
    scratch_enabled: true,
    scratch_reveal_text: "YOU’RE INVITED ♡\nWe can't wait to celebrate with you.",

    // RSVP
    rsvp_enabled: true,
    rsvp_heading: 'Guest RSVP',
    rsvp_message: 'Kindly confirm your attendance by submitting your details below:',

    published: false,
    slug: '',
  });

  const activeTemplate = getTemplateById(form.template_id) || { name: 'Selected Luxury Suite', category: 'Wedding' };

  useEffect(() => {
    const fetchInvitation = async () => {
      setLoading(true);
      const matchedTemplate = getTemplateById(id);
      const templateIdToUse = matchedTemplate?.id || id || 'rose-gold-blush-royal';
      const presetData = templateDemoDataMap[templateIdToUse] || templateDemoDataMap['rose-gold-blush-royal'] || {};

      try {
        const res = await api.get(`/invitations/${id}`);
        const inv = res.data?.invitation || res.data?.data || res.data;
        if (inv && !inv._id?.startsWith('demo-')) {
          setForm((prev) => ({
            ...prev,
            ...inv,
            _id: inv._id || inv.id || prev._id,
            template_id: inv.template_id || inv.templateId || prev.template_id,
            bride_name: inv.bride_name || inv.brideName || prev.bride_name,
            groom_name: inv.groom_name || inv.groomName || prev.groom_name,
            host_names: inv.host_names || inv.hostNames || prev.host_names,
            names: inv.names || (inv.bride_name && inv.groom_name ? `${inv.bride_name} & ${inv.groom_name}` : prev.names),
            title: inv.title || prev.title,
            eventType: inv.eventType || inv.event_type || prev.eventType,
            date: inv.date || inv.event_date || prev.date,
            time: inv.time || inv.event_time || prev.time,
            venue: inv.venue || inv.venue_name || prev.venue,
            venueAddress: inv.venueAddress || inv.venue_address || prev.venueAddress,
            message: inv.message || inv.welcome_text || prev.message,
            story_text: inv.story_text || inv.story || prev.story_text,
            scratch_reveal_text: inv.scratch_reveal_text || inv.scratchMessage || prev.scratch_reveal_text,
            scratch_enabled: inv.scratch_enabled !== undefined ? inv.scratch_enabled : prev.scratch_enabled,
            rsvp_enabled: inv.rsvp_enabled !== undefined ? inv.rsvp_enabled : prev.rsvp_enabled,
            events: inv.events && inv.events.length > 0 ? inv.events : prev.events,
            gallery_images: inv.gallery_images && inv.gallery_images.length > 0 ? inv.gallery_images : prev.gallery_images,
          }));
          setLoading(false);
          return;
        }
      } catch (err) {
        // Fallback or not found
      }

      // Check if user is authorized to edit
      const savedPlans = JSON.parse(localStorage.getItem('moonlight_unlocked_plans') || '[]');
      const savedTemplates = JSON.parse(localStorage.getItem('moonlight_unlocked_templates') || '[]');
      const isRoyal =
        templateIdToUse.includes('royal') ||
        templateIdToUse.includes('pichola') ||
        templateIdToUse.includes('udaipur') ||
        templateIdToUse.includes('jaipur') ||
        templateIdToUse.includes('marigold') ||
        templateIdToUse.includes('sunset') ||
        templateIdToUse.includes('shubh-vivah') ||
        templateIdToUse.includes('rajwada') ||
        templateIdToUse.includes('shahi-farman');
      const planCategory = isRoyal ? 'royal' : 'classic';

      const isUnlocked =
        user?.role === 'admin' ||
        user?.role === 'superadmin' ||
        id?.startsWith('inv-') ||
        id?.startsWith('pur-') ||
        savedPlans.includes(planCategory) ||
        savedTemplates.includes(templateIdToUse);

      if (!isUnlocked) {
        addToast({
          title: 'Unlock Template Required ✨',
          message: 'Please complete checkout to customize and publish this luxury template.',
          type: 'info',
        });
        navigate(`/templates/${templateIdToUse}`);
        return;
      }

      setForm((prev) => ({
        ...prev,
        template_id: templateIdToUse,
        title: presetData.title || prev.title,
        names: presetData.names || prev.names,
        groom_name: presetData.groom_name || prev.groom_name,
        bride_name: presetData.bride_name || prev.bride_name,
        groom_parents: presetData.groom_parents || prev.groom_parents,
        bride_parents: presetData.bride_parents || prev.bride_parents,
        host_names: presetData.host_names || prev.host_names,
        eventType: presetData.eventType || prev.eventType,
        date: presetData.date || prev.date,
        time: presetData.time || prev.time,
        venue: presetData.venue || prev.venue,
        venueAddress: presetData.venueAddress || prev.venueAddress,
        story_text: presetData.story_text || prev.story_text,
        message: presetData.message || prev.message,
        welcome_text: presetData.welcome_text || prev.welcome_text,
        scratch_reveal_text: presetData.scratch_reveal_text || prev.scratch_reveal_text,
        events: presetData.events || prev.events,
        gallery_images: presetData.gallery_images || prev.gallery_images,
      }));
      setLoading(false);
    };

    fetchInvitation();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleAddEvent = () => {
    const newEvent = {
      id: `ev-${Date.now()}`,
      title: 'New Celebration Ceremony',
      date: form.date || '2026-11-20',
      time: '18:00',
      venue: form.venue || 'Celebration Venue',
      address: form.venueAddress || '',
      description: 'Join us for joyful blessings and festivities.',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    };
    setForm((prev) => ({
      ...prev,
      events: [...prev.events, newEvent],
    }));
  };

  const handleUpdateEvent = (idx, field, value) => {
    setForm((prev) => {
      const updated = [...prev.events];
      updated[idx] = { ...updated[idx], [field]: value };
      return { ...prev, events: updated };
    });
  };

  const handleDeleteEvent = (idx) => {
    setForm((prev) => ({
      ...prev,
      events: prev.events.filter((_, i) => i !== idx),
    }));
  };

  const handleAddGalleryImage = (url) => {
    if (!url) return;
    setForm((prev) => ({
      ...prev,
      gallery_images: [...prev.gallery_images, url],
    }));
  };

  const handleDeleteGalleryImage = (idx) => {
    setForm((prev) => ({
      ...prev,
      gallery_images: prev.gallery_images.filter((_, i) => i !== idx),
    }));
  };

  const handleSave = async (shouldPublish = false) => {
    setSaving(true);
    try {
      const isPublishing = shouldPublish || form.published;
      const payload = {
        ...form,
        published: isPublishing,
        status: isPublishing ? 'PUBLISHED' : 'DRAFT',
      };

      const targetId = form._id || id;
      const res = await api.put(`/invitations/${targetId}`, payload);
      const updated = res.data?.invitation || res.data?.data || res.data;

      if (updated) {
        setForm((prev) => ({
          ...prev,
          ...updated,
          _id: updated._id,
          id: updated._id,
          published: updated.published !== undefined ? updated.published : isPublishing,
          slug: updated.slug || prev.slug,
        }));

        if (updated._id && updated._id !== id && !id.startsWith('draft-')) {
          window.history.replaceState(null, '', `/invitations/edit/${updated._id}`);
        }
      }

      if (shouldPublish) {
        setShowPublishModal(true);
      }

      const activeSlug = updated?.slug || form.slug;
      addToast({
        title: isPublishing ? '🎉 Live Invitation Published!' : '💾 Draft Saved to Dashboard!',
        message: isPublishing
          ? `Your invitation is live online at /i/${activeSlug}`
          : 'All changes saved securely! You can continue editing or view it from your Dashboard (मेरे इनविटेशन).',
        type: 'success',
      });
    } catch (err) {
      addToast({
        title: 'Save Failed',
        message: err.message || 'Could not update invitation.',
        type: 'error',
      });
    } finally {
      setSaving(false);
    }
  };

  const fullLiveUrl = `${window.location.origin}/i/${form.slug}`;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F1E8] flex items-center justify-center font-mono text-xs text-neutral-500">
        Loading invitation editor suite...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-neutral-900 pt-24 sm:pt-28 pb-20 px-4 sm:px-6 lg:px-8 font-sans">
      <SEO title={`Design Invitation: ${form.title} — Moonlight Production`} />

      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* ========================================================================= */}
        {/* TOP BAR: Navigation & Actions */}
        {/* ========================================================================= */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-amber-900/10 pb-4">
          <div>
            <Link
              to="/invitations/dashboard"
              className="inline-flex items-center text-xs font-mono font-bold text-amber-900 hover:text-amber-950 uppercase tracking-wider mb-1"
            >
              <ArrowLeft className="w-3.5 h-3.5 mr-1.5" /> Back to Dashboard
            </Link>
            <div className="flex items-center space-x-3">
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900">
                Invitation Details
              </h1>
              <span className="px-3 py-0.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-[11px] font-mono font-bold">
                {activeTemplate.name}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={() => setShowFullscreenPreview(true)}
              className="px-4 py-2.5 rounded-full bg-amber-100 hover:bg-amber-200 border border-amber-300 text-amber-950 font-bold text-xs uppercase tracking-wider shadow-sm flex items-center space-x-1.5 transition-all"
            >
              <Eye className="w-3.5 h-3.5 text-amber-800" />
              <span>Preview</span>
            </button>
            <button
              type="button"
              onClick={() => handleSave(false)}
              disabled={saving}
              className="px-5 py-2.5 rounded-full bg-white hover:bg-stone-50 border border-stone-300 text-neutral-800 font-bold text-xs uppercase tracking-wider shadow-sm transition-all"
            >
              {saving ? 'Saving...' : 'Save Draft'}
            </button>
            <button
              type="button"
              onClick={() => handleSave(true)}
              disabled={saving}
              className="px-6 py-2.5 rounded-full bg-gold-gradient text-neutral-950 font-extrabold text-xs uppercase tracking-wider shadow-md hover:brightness-105 flex items-center transition-all btn-shimmer"
            >
              <Sparkles className="w-3.5 h-3.5 mr-1.5" />
              {saving ? 'Publishing...' : form.published ? 'Update Live Invite' : 'Publish Live Invite'}
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* PUBLISHED BANNER */}
        {/* ========================================================================= */}
        {form.published && form.slug && (
          <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50 border border-emerald-300 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div className="space-y-0.5">
              <span className="text-[10px] uppercase font-mono font-bold text-emerald-800 tracking-wider flex items-center">
                <CheckCircle2 className="w-4 h-4 mr-1.5 text-emerald-600" /> Invitation is Live Online!
              </span>
              <p className="text-xs text-neutral-800 font-mono font-bold select-all">{fullLiveUrl}</p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(fullLiveUrl);
                  setCopiedLink(true);
                  setTimeout(() => setCopiedLink(false), 2000);
                }}
                className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-stone-50 border border-emerald-300 text-emerald-900 font-bold text-xs flex items-center shadow-sm"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 mr-1" /> : <Copy className="w-3.5 h-3.5 mr-1" />}
                {copiedLink ? 'Copied!' : 'Copy Link'}
              </button>
              <Link
                to={`/i/${form.slug}`}
                target="_blank"
                className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center shadow-sm"
              >
                <ExternalLink className="w-3.5 h-3.5 mr-1" /> Open Live
              </Link>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* MAIN LAYOUT: Left Single Unified Form, Right Sticky Live 390px Viewport */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ------------------------------------------------------------- */}
          {/* LEFT: SINGLE UNIFIED COMPACT FORM */}
          {/* ------------------------------------------------------------- */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-amber-900/10 shadow-sm space-y-6">
            
            {/* 1. Couple & Event Title */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 border-b border-amber-900/10 pb-2">
                <Heart className="w-4 h-4 text-amber-700" />
                <h3 className="font-serif text-base font-bold text-neutral-900">
                  Couple & Event Information
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="font-mono uppercase font-bold text-neutral-700 block mb-1">
                    Event Title / Heading
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="A Royal Celebration"
                    className="w-full bg-[#FAF8F5] border border-stone-300 rounded-xl px-3.5 py-2 text-xs text-neutral-900 focus:border-amber-600 focus:outline-none font-medium"
                  />
                </div>
                <div>
                  <label className="font-mono uppercase font-bold text-neutral-700 block mb-1">
                    Combined Couple Heading
                  </label>
                  <input
                    type="text"
                    name="names"
                    value={form.names}
                    onChange={handleChange}
                    placeholder="Aarav Sharma & Kiara Sen"
                    className="w-full bg-[#FAF8F5] border border-stone-300 rounded-xl px-3.5 py-2 text-xs text-neutral-900 focus:border-amber-600 focus:outline-none font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="font-mono uppercase font-bold text-neutral-700 block mb-1">
                    Bride's Name
                  </label>
                  <input
                    type="text"
                    name="bride_name"
                    value={form.bride_name}
                    onChange={handleChange}
                    placeholder="Kiara Sen"
                    className="w-full bg-[#FAF8F5] border border-stone-300 rounded-xl px-3.5 py-2 text-xs text-neutral-900 focus:border-amber-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-mono uppercase font-bold text-neutral-700 block mb-1">
                    Groom's Name
                  </label>
                  <input
                    type="text"
                    name="groom_name"
                    value={form.groom_name}
                    onChange={handleChange}
                    placeholder="Aarav Sharma"
                    className="w-full bg-[#FAF8F5] border border-stone-300 rounded-xl px-3.5 py-2 text-xs text-neutral-900 focus:border-amber-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="text-xs">
                <label className="font-mono uppercase font-bold text-neutral-700 block mb-1">
                  Host Family Salutations
                </label>
                <input
                  type="text"
                  name="host_names"
                  value={form.host_names}
                  onChange={handleChange}
                  placeholder="Mr. & Mrs. Sharma and Mr. & Mrs. Sen"
                  className="w-full bg-[#FAF8F5] border border-stone-300 rounded-xl px-3.5 py-2 text-xs text-neutral-900 focus:border-amber-600 focus:outline-none"
                />
              </div>
            </div>

            {/* 2. Date, Time & Main Venue */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center space-x-2 border-b border-amber-900/10 pb-2">
                <Calendar className="w-4 h-4 text-amber-700" />
                <h3 className="font-serif text-base font-bold text-neutral-900">
                  Main Date, Time & Venue
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="font-mono uppercase font-bold text-neutral-700 block mb-1">
                    Ceremony Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    className="w-full bg-[#FAF8F5] border border-stone-300 rounded-xl px-3.5 py-2 text-xs text-neutral-900 focus:border-amber-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-mono uppercase font-bold text-neutral-700 block mb-1">
                    Ceremony Time
                  </label>
                  <input
                    type="time"
                    name="time"
                    value={form.time}
                    onChange={handleChange}
                    className="w-full bg-[#FAF8F5] border border-stone-300 rounded-xl px-3.5 py-2 text-xs text-neutral-900 focus:border-amber-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="font-mono uppercase font-bold text-neutral-700 block mb-1">
                    Venue Name
                  </label>
                  <input
                    type="text"
                    name="venue"
                    value={form.venue}
                    onChange={handleChange}
                    placeholder="Jehan Numa Palace"
                    className="w-full bg-[#FAF8F5] border border-stone-300 rounded-xl px-3.5 py-2 text-xs text-neutral-900 focus:border-amber-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-mono uppercase font-bold text-neutral-700 block mb-1">
                    Full Address (Google Maps)
                  </label>
                  <input
                    type="text"
                    name="venueAddress"
                    value={form.venueAddress}
                    onChange={handleChange}
                    placeholder="152 Shamla Hills, Bhopal"
                    className="w-full bg-[#FAF8F5] border border-stone-300 rounded-xl px-3.5 py-2 text-xs text-neutral-900 focus:border-amber-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="text-xs">
                <label className="font-mono uppercase font-bold text-neutral-700 block mb-1">
                  Welcome / Invitation Message
                </label>
                <textarea
                  rows={2}
                  name="welcome_text"
                  value={form.welcome_text}
                  onChange={handleChange}
                  placeholder="With joyous hearts, we request the honor of your presence..."
                  className="w-full bg-[#FAF8F5] border border-stone-300 rounded-xl p-2.5 text-xs text-neutral-900 focus:border-amber-600 focus:outline-none"
                />
              </div>
            </div>

            {/* 3. Multi-Ceremony Schedule */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between border-b border-amber-900/10 pb-2">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-amber-700" />
                  <h3 className="font-serif text-base font-bold text-neutral-900">
                    Ceremonies & Itinerary
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={handleAddEvent}
                  className="px-3 py-1 rounded-xl bg-amber-900 hover:bg-amber-950 text-white font-bold text-[11px] flex items-center space-x-1 shadow-sm transition-all"
                >
                  <Plus className="w-3 h-3" />
                  <span>Add Ceremony</span>
                </button>
              </div>

              <div className="space-y-3 text-xs">
                {form.events.map((ev, idx) => (
                  <div
                    key={ev.id || idx}
                    className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-stone-300 space-y-2.5 relative"
                  >
                    <div className="flex items-center justify-between border-b border-stone-200 pb-1.5">
                      <span className="font-mono font-bold text-amber-900 text-[11px]">
                        Ceremony {idx + 1}: {ev.title}
                      </span>
                      {form.events.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleDeleteEvent(idx)}
                          className="text-red-500 hover:text-red-700 p-0.5"
                          title="Delete Ceremony"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <div className="sm:col-span-2">
                        <input
                          type="text"
                          value={ev.title}
                          onChange={(e) => handleUpdateEvent(idx, 'title', e.target.value)}
                          placeholder="Ceremony Title (e.g. Sangeet)"
                          className="w-full bg-white border border-stone-300 rounded-lg px-2.5 py-1.5 text-xs text-neutral-900 font-medium"
                        />
                      </div>
                      <div>
                        <input
                          type="date"
                          value={ev.date}
                          onChange={(e) => handleUpdateEvent(idx, 'date', e.target.value)}
                          className="w-full bg-white border border-stone-300 rounded-lg px-2 py-1.5 text-xs text-neutral-900"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={ev.time}
                        onChange={(e) => handleUpdateEvent(idx, 'time', e.target.value)}
                        placeholder="Time (e.g. 07:00 PM)"
                        className="w-full bg-white border border-stone-300 rounded-lg px-2.5 py-1.5 text-xs text-neutral-900"
                      />
                      <input
                        type="text"
                        value={ev.venue}
                        onChange={(e) => handleUpdateEvent(idx, 'venue', e.target.value)}
                        placeholder="Venue / Hall"
                        className="w-full bg-white border border-stone-300 rounded-lg px-2.5 py-1.5 text-xs text-neutral-900"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Photos & Visuals */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between border-b border-amber-900/10 pb-2">
                <div className="flex items-center space-x-2">
                  <ImageIcon className="w-4 h-4 text-amber-700" />
                  <h3 className="font-serif text-base font-bold text-neutral-900">
                    Couple Portraits & Gallery
                  </h3>
                </div>

                <label className="px-3 py-1 rounded-xl bg-amber-900 hover:bg-amber-950 text-white font-bold text-[11px] flex items-center space-x-1 cursor-pointer shadow-sm transition-all">
                  <Upload className="w-3 h-3" />
                  <span>Upload Photo</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = () => handleAddGalleryImage(reader.result);
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </label>
              </div>

              <div className="text-xs">
                <label className="font-mono uppercase font-bold text-neutral-700 block mb-1">
                  Hero Cover Photo URL
                </label>
                <input
                  type="url"
                  name="coverPhoto"
                  value={form.coverPhoto || ''}
                  onChange={handleChange}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-[#FAF8F5] border border-stone-300 rounded-xl px-3.5 py-2 text-xs text-neutral-900 focus:border-amber-600 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                {form.gallery_images.map((img, idx) => (
                  <div
                    key={idx}
                    className="relative aspect-square rounded-xl overflow-hidden border border-stone-300 group shadow-sm"
                  >
                    <img src={img} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => handleDeleteGalleryImage(idx)}
                      className="absolute top-1 right-1 p-1 rounded-full bg-red-600 text-white opacity-90 hover:opacity-100 shadow transition-all"
                      title="Delete Image"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Scratch Card & RSVP Options */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center space-x-2 border-b border-amber-900/10 pb-2">
                <Gift className="w-4 h-4 text-amber-700" />
                <h3 className="font-serif text-base font-bold text-neutral-900">
                  Interactive Experience & RSVP
                </h3>
              </div>

              {/* Scratch card toggle */}
              <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-stone-300 space-y-2 text-xs">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="scratch_enabled"
                    name="scratch_enabled"
                    checked={form.scratch_enabled}
                    onChange={handleChange}
                    className="rounded border-stone-300 text-amber-600 focus:ring-amber-500 w-4 h-4"
                  />
                  <label htmlFor="scratch_enabled" className="font-bold text-neutral-800">
                    Enable Gold Foil Touch Scratch Card
                  </label>
                </div>
                {form.scratch_enabled && (
                  <input
                    type="text"
                    name="scratch_reveal_text"
                    value={form.scratch_reveal_text}
                    onChange={handleChange}
                    placeholder="YOU’RE INVITED ♡ We can't wait to celebrate with you."
                    className="w-full bg-white border border-stone-300 rounded-lg px-2.5 py-1.5 text-xs text-neutral-900"
                  />
                )}
              </div>

              {/* RSVP toggle */}
              <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-stone-300 space-y-2 text-xs">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="rsvp_enabled"
                    name="rsvp_enabled"
                    checked={form.rsvp_enabled}
                    onChange={handleChange}
                    className="rounded border-stone-300 text-amber-600 focus:ring-amber-500 w-4 h-4"
                  />
                  <label htmlFor="rsvp_enabled" className="font-bold text-neutral-800">
                    Enable Online Guest RSVP Form & Attendance
                  </label>
                </div>
                {form.rsvp_enabled && (
                  <input
                    type="text"
                    name="rsvp_heading"
                    value={form.rsvp_heading}
                    onChange={handleChange}
                    placeholder="Guest RSVP"
                    className="w-full bg-white border border-stone-300 rounded-lg px-2.5 py-1.5 text-xs text-neutral-900"
                  />
                )}
              </div>
            </div>

            {/* Form Bottom Save / Publish Actions */}
            <div className="pt-3 border-t border-amber-900/10 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-neutral-500 font-mono">
                All changes sync automatically to live preview.
              </span>
              <div className="flex items-center space-x-2.5 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={() => handleSave(false)}
                  disabled={saving}
                  className="px-4 py-2 rounded-full bg-stone-100 hover:bg-stone-200 text-neutral-800 font-bold text-xs uppercase tracking-wider transition-all"
                >
                  Save Draft
                </button>
                <button
                  type="button"
                  onClick={() => handleSave(true)}
                  disabled={saving}
                  className="px-5 py-2 rounded-full bg-gold-gradient text-neutral-950 font-extrabold text-xs uppercase tracking-wider shadow-md hover:brightness-105 flex items-center transition-all btn-shimmer"
                >
                  <Sparkles className="w-3.5 h-3.5 mr-1" />
                  {saving ? 'Publishing...' : form.published ? 'Update Live Invite' : 'Publish Live'}
                </button>
              </div>
            </div>

          </div>

          {/* ------------------------------------------------------------- */}
          {/* RIGHT: STICKY REAL-TIME 390px PREVIEW */}
          {/* ------------------------------------------------------------- */}
          <div className="lg:col-span-6 sticky top-24 space-y-3">
            <div className="flex items-center justify-between px-2">
              <span className="text-[11px] font-mono uppercase font-bold text-amber-900 tracking-wider flex items-center">
                <Eye className="w-4 h-4 mr-1.5" /> Live Preview
              </span>
              <button
                type="button"
                onClick={() => setShowFullscreenPreview(true)}
                className="px-3 py-1 rounded-full bg-amber-900 hover:bg-amber-950 text-amber-100 text-[10.5px] font-mono font-bold flex items-center space-x-1 shadow transition-all"
                title="Open Fullscreen Preview"
              >
                <Eye className="w-3.5 h-3.5 text-amber-400" />
                <span>Preview</span>
              </button>
            </div>

            {/* Mobile Viewport Mockup */}
            <div className="max-w-[410px] mx-auto rounded-[40px] border-4 border-neutral-900 shadow-2xl overflow-hidden max-h-[85vh] overflow-y-auto scrollbar-thin relative bg-black">
              <InvitationRenderer
                invitation={form}
                isPreview={true}
                showOpeningInPreview={false}
              />
            </div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* LIVE PUBLICATION SUCCESS MODAL */}
        {/* ========================================================================= */}
        {showPublishModal && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in font-sans">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 border-2 border-amber-500/30 shadow-2xl relative">
              <div className="text-center space-y-2">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-800 font-bold block">
                  Moonlight Live Distribution
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900">
                  Your Invitation is Live! ✨
                </h3>
                <p className="text-xs text-neutral-600 font-sans">
                  Guests can now open your invitation, scratch the card, view map directions, and submit RSVPs online.
                </p>
              </div>

              {/* Public Link Box */}
              <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-2">
                <span className="text-[10px] uppercase font-mono font-bold text-amber-900 block">
                  Unique Live URL:
                </span>
                <div className="flex items-center justify-between bg-white px-3 py-2 rounded-xl border border-amber-300 text-xs font-mono text-neutral-900 break-all select-all">
                  <span className="truncate mr-2">{`${window.location.origin}/i/${form.slug}`}</span>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(`${window.location.origin}/i/${form.slug}`);
                      setCopiedLink(true);
                      setTimeout(() => setCopiedLink(false), 2000);
                    }}
                    className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-neutral-800 shrink-0"
                    title="Copy Link"
                  >
                    {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Quick Actions Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                    `Namaste! ✨\nYou are cordially invited to celebrate ${form.title} on ${form.date}.\n\nTap the live link to view the invitation, itinerary, scratch card & RSVP:\n${window.location.origin}/i/${form.slug}\n\nWith love,\n${form.names}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-md transition-all"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Broadcast WhatsApp</span>
                </a>

                <a
                  href={`/i/${form.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 rounded-2xl bg-amber-900 hover:bg-amber-950 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-md transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Open Live Page</span>
                </a>
              </div>

              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => setShowPublishModal(false)}
                  className="text-xs font-semibold text-neutral-500 hover:text-neutral-900"
                >
                  Close & Keep Editing
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* FULLSCREEN PREVIEW MODAL */}
        {/* ========================================================================= */}
        {showFullscreenPreview && (
          <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-between p-3 sm:p-6 animate-fade-in font-sans">
            {/* Top Toolbar */}
            <div className="w-full max-w-5xl flex flex-col sm:flex-row items-center justify-between py-2 border-b border-white/10 text-white gap-3 z-10">
              <div className="flex items-center space-x-3">
                <span className="font-serif text-base sm:text-lg font-bold text-amber-300 flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Invitation Preview</span>
                </span>
                <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-white/10 text-[10px] font-mono uppercase text-neutral-300">
                  {activeTemplate.name}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                {/* Device Mode Toggle */}
                <div className="bg-white/10 rounded-xl p-1 flex items-center space-x-1 text-xs font-mono">
                  <button
                    type="button"
                    onClick={() => setPreviewDevice('mobile')}
                    className={`px-3 py-1 rounded-lg transition-all ${
                      previewDevice === 'mobile'
                        ? 'bg-amber-500 text-black font-bold shadow'
                        : 'text-neutral-300 hover:text-white'
                    }`}
                  >
                    📱 Mobile
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewDevice('desktop')}
                    className={`px-3 py-1 rounded-lg transition-all ${
                      previewDevice === 'desktop'
                        ? 'bg-amber-500 text-black font-bold shadow'
                        : 'text-neutral-300 hover:text-white'
                    }`}
                  >
                    💻 Desktop
                  </button>
                </div>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setShowFullscreenPreview(false)}
                  className="px-4 py-1.5 rounded-xl bg-white text-black font-bold text-xs uppercase hover:bg-neutral-200 transition-all"
                >
                  ✕ Close
                </button>
              </div>
            </div>

            {/* Simulator Screen Container */}
            <div className="w-full flex-1 flex items-center justify-center my-3 overflow-hidden">
              <div
                className={`h-full max-h-[82vh] overflow-y-auto scrollbar-thin transition-all duration-300 ${
                  previewDevice === 'mobile'
                    ? 'w-[390px] border-4 border-neutral-800 shadow-2xl bg-black rounded-[40px]'
                    : 'w-full max-w-5xl border border-white/20 shadow-2xl bg-neutral-950 rounded-2xl'
                }`}
              >
                <InvitationRenderer
                  invitation={form}
                  isPreview={true}
                  showOpeningInPreview={false}
                />
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default InvitationEditor;
