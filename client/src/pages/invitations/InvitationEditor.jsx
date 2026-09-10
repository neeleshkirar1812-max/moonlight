import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useNotification } from '../../context/NotificationContext';
import api from '../../api/client';
import SEO from '../../components/common/SEO';
import InvitationRenderer from '../../components/invitations/engine/InvitationRenderer';
import { invitationTemplates } from '../../data/invitationTemplates';
import {
  Sparkles,
  Save,
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
  Palette,
  Send,
  Upload,
  DoorClosed,
} from 'lucide-react';

const sectionsNav = [
  { id: 'sec-basic', label: '1. Essentials & Doors', icon: Calendar },
  { id: 'sec-couple', label: '2. Couple & Host', icon: Heart },
  { id: 'sec-events', label: '3. Events Schedule', icon: Clock },
  { id: 'sec-gallery', label: '4. Photo Gallery', icon: ImageIcon },
  { id: 'sec-scratch', label: '5. Scratch Card', icon: Gift },
  { id: 'sec-rsvp', label: '6. Guest RSVP', icon: Send },
  { id: 'sec-theme', label: '7. Theme Suite', icon: Palette },
];

const InvitationEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToast } = useNotification();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [showFullscreenPreview, setShowFullscreenPreview] = useState(false);
  const [previewDevice, setPreviewDevice] = useState('mobile');
  const [previewDoorKey, setPreviewDoorKey] = useState(0);

  const [form, setForm] = useState({
    template_id: 'royal-love',
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

  useEffect(() => {
    const fetchInvitation = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/invitations/${id}`);
        const inv = res.data?.invitation || res.data?.data || res.data;
        if (inv) {
          setForm((prev) => ({
            ...prev,
            ...inv,
            template_id: inv.template_id || inv.templateId || prev.template_id,
            date: inv.date || inv.event_date || prev.date,
            time: inv.time || inv.event_time || prev.time,
            venue: inv.venue || inv.venue_name || prev.venue,
            venueAddress: inv.venueAddress || inv.venue_address || prev.venueAddress,
            events: inv.events && inv.events.length > 0 ? inv.events : prev.events,
            gallery_images:
              inv.gallery_images && inv.gallery_images.length > 0
                ? inv.gallery_images
                : inv.galleryUrls && inv.galleryUrls.length > 0
                ? inv.galleryUrls
                : prev.gallery_images,
          }));
        }
      } catch (err) {
        console.warn('[Fetch Invitation Error]', err);
      } finally {
        setLoading(false);
      }
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

  const scrollToSection = (secId) => {
    const el = document.getElementById(secId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSave = async (shouldPublish = false) => {
    setSaving(true);
    try {
      const payload = {
        ...form,
        published: shouldPublish ? true : form.published,
      };

      const res = await api.put(`/invitations/${id}`, payload);
      const updated = res.data?.invitation || res.data?.data || res.data;

      if (updated) {
        setForm((prev) => ({
          ...prev,
          published: updated.published,
          slug: updated.slug || prev.slug,
        }));
      }

      if (shouldPublish) {
        setShowPublishModal(true);
      }

      addToast({
        title: shouldPublish || form.published ? 'Live Invitation Published! ✦' : 'Draft Saved',
        message:
          shouldPublish || form.published
            ? `Your invitation is live at /i/${updated?.slug || form.slug}`
            : 'All your changes have been saved.',
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
    <div className="min-h-screen bg-[#F5F1E8] text-neutral-900 pt-24 sm:pt-28 pb-20 px-4 sm:px-6 lg:px-8 font-sans">
      <SEO title={`Design Invitation: ${form.title} — Moonlight Production`} />

      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* ========================================================================= */}
        {/* TOP BAR: Navigation & Actions */}
        {/* ========================================================================= */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#DDD2C0] pb-4">
          <div>
            <Link
              to="/invitations/dashboard"
              className="inline-flex items-center text-xs font-mono font-bold text-amber-900 hover:text-amber-950 uppercase tracking-wider mb-1"
            >
              <ArrowLeft className="w-3.5 h-3.5 mr-1.5" /> Back to Dashboard
            </Link>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900">
              Invitation Suite Designer
            </h1>
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={() => setShowFullscreenPreview(true)}
              className="px-4 py-2.5 rounded-full bg-amber-100 hover:bg-amber-200 border border-amber-300 text-amber-950 font-bold text-xs uppercase tracking-wider shadow-sm flex items-center space-x-1.5 transition-all"
            >
              <Eye className="w-3.5 h-3.5 text-amber-800" />
              <span>Live Preview</span>
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
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900 hover:from-amber-800 hover:to-amber-950 text-white font-bold text-xs uppercase tracking-wider shadow-md flex items-center transition-all"
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
        {/* QUICK JUMP ANCHOR PILLS (Navigate in 1 click) */}
        {/* ========================================================================= */}
        <div className="bg-white/80 backdrop-blur-md p-2 rounded-2xl border border-stone-300 shadow-sm overflow-x-auto scrollbar-none sticky top-20 z-30">
          <div className="flex items-center space-x-1.5 min-w-max">
            <span className="text-[10px] uppercase font-mono font-bold text-amber-900 px-2 py-1 flex items-center">
              <span>Quick Jump:</span>
            </span>
            {sectionsNav.map((sec) => {
              const Icon = sec.icon;
              return (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => scrollToSection(sec.id)}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold text-neutral-700 hover:bg-amber-100 hover:text-amber-950 transition-all flex items-center space-x-1.5 border border-transparent hover:border-amber-300/60"
                >
                  <Icon className="w-3.5 h-3.5 text-amber-800" />
                  <span>{sec.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MAIN LAYOUT: Left Clean Form, Right Sticky Live 390px Viewport */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ------------------------------------------------------------- */}
          {/* LEFT: FOCUSED UNIFIED SINGLE-PAGE FORM */}
          {/* ------------------------------------------------------------- */}
          <div className="lg:col-span-6 space-y-6">

            {/* SECTION 1: ESSENTIALS & PALACE DOORS */}
            <div
              id="sec-basic"
              className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E0D7C7] shadow-sm space-y-5 scroll-mt-36"
            >
              <div className="flex items-center space-x-2 border-b border-stone-200 pb-3">
                <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-900 font-bold flex items-center justify-center font-mono text-xs">
                  01
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-neutral-900">
                    Celebration Essentials & Palace Doors
                  </h3>
                  <p className="text-[11px] text-neutral-500 font-sans">
                    Basic event dates, venue location, and opening sequence.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="font-mono uppercase font-bold text-neutral-700 block mb-1">
                    Event Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    className="w-full bg-[#FAF8F5] border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs text-neutral-900 focus:border-amber-600 focus:outline-none font-medium"
                  />
                </div>
                <div>
                  <label className="font-mono uppercase font-bold text-neutral-700 block mb-1">
                    Event Type
                  </label>
                  <input
                    type="text"
                    name="eventType"
                    value={form.eventType}
                    onChange={handleChange}
                    placeholder="Wedding / Engagement / Reception"
                    className="w-full bg-[#FAF8F5] border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs text-neutral-900 focus:border-amber-600 focus:outline-none font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="font-mono uppercase font-bold text-neutral-700 block mb-1">
                    Main Ceremony Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    className="w-full bg-[#FAF8F5] border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs text-neutral-900 focus:border-amber-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-mono uppercase font-bold text-neutral-700 block mb-1">
                    Main Ceremony Time
                  </label>
                  <input
                    type="time"
                    name="time"
                    value={form.time}
                    onChange={handleChange}
                    className="w-full bg-[#FAF8F5] border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs text-neutral-900 focus:border-amber-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="text-xs space-y-3">
                <div>
                  <label className="font-mono uppercase font-bold text-neutral-700 block mb-1">
                    Main Venue Name
                  </label>
                  <input
                    type="text"
                    name="venue"
                    value={form.venue}
                    onChange={handleChange}
                    className="w-full bg-[#FAF8F5] border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs text-neutral-900 focus:border-amber-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-mono uppercase font-bold text-neutral-700 block mb-1">
                    Complete Venue Address (For Google Maps Navigation)
                  </label>
                  <input
                    type="text"
                    name="venueAddress"
                    value={form.venueAddress}
                    onChange={handleChange}
                    className="w-full bg-[#FAF8F5] border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs text-neutral-900 focus:border-amber-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-mono uppercase font-bold text-neutral-700 block mb-1">
                    Welcome / Invitation Message
                  </label>
                  <textarea
                    rows={3}
                    name="welcome_text"
                    value={form.welcome_text}
                    onChange={handleChange}
                    className="w-full bg-[#FAF8F5] border border-stone-300 rounded-xl p-3 text-xs text-neutral-900 focus:border-amber-600 focus:outline-none"
                  />
                </div>
              </div>

              {/* Royal Palace Doors & Video Curtain Configuration */}
              <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-serif font-bold text-sm text-amber-950 flex items-center space-x-1.5">
                    <span>🚪</span>
                    <span>Royal Palace Double Doors & Wax Seal Opening</span>
                  </span>
                  <span className="text-[10px] font-mono uppercase bg-amber-200 text-amber-900 px-2 py-0.5 rounded-full font-bold">
                    3D Interactive
                  </span>
                </div>

                <div>
                  <label className="font-mono uppercase font-bold text-neutral-700 block mb-1 text-[11px]">
                    Door Opening Top Tagline
                  </label>
                  <input
                    type="text"
                    name="opening_heading"
                    value={form.opening_heading || ''}
                    onChange={handleChange}
                    placeholder="Cordially Invites You To Celebrate"
                    className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs text-neutral-900"
                  />
                </div>

                <div>
                  <label className="font-mono uppercase font-bold text-neutral-700 block mb-1 text-[11px]">
                    Optional Custom Door Video URL (MP4)
                  </label>
                  <input
                    type="url"
                    name="door_video_url"
                    value={form.door_video_url || ''}
                    onChange={handleChange}
                    placeholder="Leave empty to use 3D Carved Palace Teak Doors"
                    className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs text-neutral-900"
                  />
                  <p className="text-[10px] text-neutral-500 mt-1">
                    By default, guests experience interactive 3D Royal Teak Palace Doors with 24K gold jaali arches, brass lion knockers, wax seal crest & falling petals.
                  </p>
                </div>
              </div>
            </div>

            {/* SECTION 2: COUPLE & HOST */}
            <div
              id="sec-couple"
              className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E0D7C7] shadow-sm space-y-4 scroll-mt-36 text-xs"
            >
              <div className="flex items-center space-x-2 border-b border-stone-200 pb-3">
                <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-900 font-bold flex items-center justify-center font-mono text-xs">
                  02
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-neutral-900">Couple & Host Details</h3>
                  <p className="text-[11px] text-neutral-500 font-sans">
                    Bride and Groom names, family salutations, and cover portrait.
                  </p>
                </div>
              </div>

              <div>
                <label className="font-mono uppercase font-bold text-neutral-700 block mb-1">
                  Combined Display Heading Names
                </label>
                <input
                  type="text"
                  name="names"
                  value={form.names}
                  onChange={handleChange}
                  placeholder="Aarav Sharma & Kiara Sen"
                  className="w-full bg-[#FAF8F5] border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs text-neutral-900 focus:border-amber-600 focus:outline-none font-bold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-mono uppercase font-bold text-neutral-700 block mb-1">
                    Bride Name
                  </label>
                  <input
                    type="text"
                    name="bride_name"
                    value={form.bride_name}
                    onChange={handleChange}
                    placeholder="Kiara Sen"
                    className="w-full bg-[#FAF8F5] border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs text-neutral-900 focus:border-amber-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-mono uppercase font-bold text-neutral-700 block mb-1">
                    Groom Name
                  </label>
                  <input
                    type="text"
                    name="groom_name"
                    value={form.groom_name}
                    onChange={handleChange}
                    placeholder="Aarav Sharma"
                    className="w-full bg-[#FAF8F5] border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs text-neutral-900 focus:border-amber-600 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-mono uppercase font-bold text-neutral-700 block mb-1">
                  Host Families Line
                </label>
                <input
                  type="text"
                  name="host_names"
                  value={form.host_names}
                  onChange={handleChange}
                  placeholder="Mr. & Mrs. Sharma and Mr. & Mrs. Sen"
                  className="w-full bg-[#FAF8F5] border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs text-neutral-900 focus:border-amber-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-mono uppercase font-bold text-neutral-700 block mb-1">
                  Hero Cover Photo URL
                </label>
                <input
                  type="url"
                  name="coverPhoto"
                  value={form.coverPhoto || ''}
                  onChange={handleChange}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-[#FAF8F5] border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs text-neutral-900 focus:border-amber-600 focus:outline-none"
                />
              </div>
            </div>

            {/* SECTION 3: MULTI-EVENT SCHEDULE */}
            <div
              id="sec-events"
              className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E0D7C7] shadow-sm space-y-4 scroll-mt-36 text-xs"
            >
              <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-900 font-bold flex items-center justify-center font-mono text-xs">
                    03
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-neutral-900">Multi-Event Schedule</h3>
                    <p className="text-[11px] text-neutral-500 font-sans">
                      Haldi, Mehendi, Sangeet, Wedding Ceremony, Reception.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleAddEvent}
                  className="px-3 py-1.5 rounded-xl bg-amber-900 hover:bg-amber-950 text-white font-bold text-xs flex items-center space-x-1 shadow-sm transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Ceremony</span>
                </button>
              </div>

              <div className="space-y-4">
                {form.events.map((ev, idx) => (
                  <div
                    key={ev.id || idx}
                    className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-300 space-y-3 relative"
                  >
                    <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                      <span className="font-mono font-bold text-amber-900 text-xs">
                        Ceremony {idx + 1}: {ev.title}
                      </span>
                      {form.events.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleDeleteEvent(idx)}
                          className="text-red-500 hover:text-red-700 p-1"
                          title="Delete Event"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>
                        <label className="font-mono text-[10px] uppercase font-bold text-neutral-600 block mb-1">
                          Ceremony Name
                        </label>
                        <input
                          type="text"
                          value={ev.title}
                          onChange={(e) => handleUpdateEvent(idx, 'title', e.target.value)}
                          placeholder="e.g. Royal Sangeet & Musical Night"
                          className="w-full bg-white border border-stone-300 rounded-lg p-2 text-xs text-neutral-900"
                        />
                      </div>
                      <div>
                        <label className="font-mono text-[10px] uppercase font-bold text-neutral-600 block mb-1">
                          Date
                        </label>
                        <input
                          type="date"
                          value={ev.date}
                          onChange={(e) => handleUpdateEvent(idx, 'date', e.target.value)}
                          className="w-full bg-white border border-stone-300 rounded-lg p-2 text-xs text-neutral-900"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>
                        <label className="font-mono text-[10px] uppercase font-bold text-neutral-600 block mb-1">
                          Time
                        </label>
                        <input
                          type="text"
                          value={ev.time}
                          onChange={(e) => handleUpdateEvent(idx, 'time', e.target.value)}
                          placeholder="07:00 PM"
                          className="w-full bg-white border border-stone-300 rounded-lg p-2 text-xs text-neutral-900"
                        />
                      </div>
                      <div>
                        <label className="font-mono text-[10px] uppercase font-bold text-neutral-600 block mb-1">
                          Venue / Hall
                        </label>
                        <input
                          type="text"
                          value={ev.venue}
                          onChange={(e) => handleUpdateEvent(idx, 'venue', e.target.value)}
                          placeholder="Grand Ballroom"
                          className="w-full bg-white border border-stone-300 rounded-lg p-2 text-xs text-neutral-900"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="font-mono text-[10px] uppercase font-bold text-neutral-600 block mb-1">
                        Short Description / Highlights
                      </label>
                      <input
                        type="text"
                        value={ev.description}
                        onChange={(e) => handleUpdateEvent(idx, 'description', e.target.value)}
                        placeholder="An evening of dance performances and royal banquet..."
                        className="w-full bg-white border border-stone-300 rounded-lg p-2 text-xs text-neutral-900"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 4: PHOTO GALLERY */}
            <div
              id="sec-gallery"
              className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E0D7C7] shadow-sm space-y-4 scroll-mt-36 text-xs"
            >
              <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-900 font-bold flex items-center justify-center font-mono text-xs">
                    04
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-neutral-900">Photo Gallery</h3>
                    <p className="text-[11px] text-neutral-500 font-sans">
                      Interactive swipe carousel & lightbox photos.
                    </p>
                  </div>
                </div>

                <label className="px-3 py-1.5 rounded-xl bg-amber-900 hover:bg-amber-950 text-white font-bold text-xs flex items-center space-x-1 cursor-pointer shadow-sm transition-all">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload Image</span>
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

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {form.gallery_images.map((img, idx) => (
                  <div
                    key={idx}
                    className="relative aspect-square rounded-xl overflow-hidden border border-stone-300 group shadow-sm"
                  >
                    <img src={img} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => handleDeleteGalleryImage(idx)}
                      className="absolute top-1.5 right-1.5 p-1 rounded-full bg-red-600 text-white opacity-90 hover:opacity-100 shadow transition-all"
                      title="Delete Image"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 5: SCRATCH CARD */}
            <div
              id="sec-scratch"
              className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E0D7C7] shadow-sm space-y-4 scroll-mt-36 text-xs"
            >
              <div className="flex items-center space-x-2 border-b border-stone-200 pb-3">
                <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-900 font-bold flex items-center justify-center font-mono text-xs">
                  05
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-neutral-900">Interactive Scratch Card</h3>
                  <p className="text-[11px] text-neutral-500 font-sans">
                    Touch foil scratch card with secret reveal message.
                  </p>
                </div>
              </div>

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
                  Enable Interactive Gold Foil Touch Scratch Card
                </label>
              </div>

              <div>
                <label className="font-mono uppercase font-bold text-neutral-700 block mb-1">
                  Secret Revealed Message
                </label>
                <textarea
                  rows={3}
                  name="scratch_reveal_text"
                  value={form.scratch_reveal_text}
                  onChange={handleChange}
                  placeholder="YOU’RE INVITED ♡&#10;We can't wait to celebrate with you."
                  className="w-full bg-[#FAF8F5] border border-stone-300 rounded-xl p-3 text-xs text-neutral-900 font-bold"
                />
              </div>
            </div>

            {/* SECTION 6: RSVP SETTINGS */}
            <div
              id="sec-rsvp"
              className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E0D7C7] shadow-sm space-y-4 scroll-mt-36 text-xs"
            >
              <div className="flex items-center space-x-2 border-b border-stone-200 pb-3">
                <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-900 font-bold flex items-center justify-center font-mono text-xs">
                  06
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-neutral-900">Guest RSVP Settings</h3>
                  <p className="text-[11px] text-neutral-500 font-sans">
                    Collect guest attendance, counts, and WhatsApp confirmations.
                  </p>
                </div>
              </div>

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
                  Enable Online Guest RSVP Form & WhatsApp Attendance
                </label>
              </div>

              <div>
                <label className="font-mono uppercase font-bold text-neutral-700 block mb-1">
                  RSVP Form Title
                </label>
                <input
                  type="text"
                  name="rsvp_heading"
                  value={form.rsvp_heading}
                  onChange={handleChange}
                  className="w-full bg-[#FAF8F5] border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs text-neutral-900"
                />
              </div>
            </div>

            {/* SECTION 7: TEMPLATE SUITE */}
            <div
              id="sec-theme"
              className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E0D7C7] shadow-sm space-y-4 scroll-mt-36 text-xs"
            >
              <div className="flex items-center space-x-2 border-b border-stone-200 pb-3">
                <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-900 font-bold flex items-center justify-center font-mono text-xs">
                  07
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-neutral-900">Switch Template Suite</h3>
                  <p className="text-[11px] text-neutral-500 font-sans">
                    Choose from the 6 authentic video-inspired luxury suites. Music and styling are automatically preset by Moonlight Production.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {invitationTemplates.map((tpl) => (
                  <button
                    key={tpl.id}
                    type="button"
                    onClick={() => setForm((prev) => ({ ...prev, template_id: tpl.id }))}
                    className={`p-3 rounded-2xl border text-left space-y-1 transition-all ${
                      form.template_id === tpl.id
                        ? 'bg-amber-100 border-amber-600 ring-2 ring-amber-400 shadow-sm'
                        : 'bg-[#FAF8F5] border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    <span className="font-serif font-bold text-xs text-neutral-900 block truncate">
                      {tpl.name}
                    </span>
                    <span className="text-[10px] text-amber-800 uppercase font-mono block">
                      {tpl.category}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* BOTTOM ACTION BAR */}
            <div className="p-6 rounded-3xl bg-white border border-[#E0D7C7] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-neutral-500 font-sans">
                Ready to share with family and friends?
              </div>
              <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={() => handleSave(false)}
                  disabled={saving}
                  className="px-5 py-2.5 rounded-full bg-stone-100 hover:bg-stone-200 text-neutral-800 font-bold text-xs uppercase tracking-wider"
                >
                  Save Draft
                </button>
                <button
                  type="button"
                  onClick={() => handleSave(true)}
                  disabled={saving}
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900 hover:from-amber-800 hover:to-amber-950 text-white font-bold text-xs uppercase tracking-wider shadow-md flex items-center"
                >
                  <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                  {saving ? 'Publishing...' : form.published ? 'Update Live Invite' : 'Publish Live Invite'}
                </button>
              </div>
            </div>

          </div>

          {/* ------------------------------------------------------------- */}
          {/* RIGHT: STICKY REAL-TIME 390px MOBILE PREVIEW */}
          {/* ------------------------------------------------------------- */}
          <div className="lg:col-span-6 sticky top-24 space-y-3">
            <div className="flex items-center justify-between px-2">
              <span className="text-[11px] font-mono uppercase font-bold text-amber-900 tracking-wider flex items-center">
                <Eye className="w-4 h-4 mr-1.5" /> Real-Time Live Preview
              </span>
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => setShowFullscreenPreview(true)}
                  className="px-2.5 py-1 rounded-full bg-amber-900 hover:bg-amber-950 text-amber-100 text-[10px] font-mono font-bold flex items-center space-x-1 shadow transition-all"
                  title="Open Fullscreen Interactive Preview"
                >
                  <Eye className="w-3 h-3 text-amber-400" />
                  <span>Fullscreen Live Preview</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewDoorKey((prev) => prev + 1)}
                  className="px-2.5 py-1 rounded-full bg-stone-200 hover:bg-stone-300 text-neutral-800 text-[10px] font-mono font-bold flex items-center space-x-1 shadow transition-all"
                  title="Re-test Palace Door Entrance"
                >
                  <DoorClosed className="w-3 h-3 text-neutral-700" />
                  <span>Test Doors</span>
                </button>
                <span className="text-[10px] text-neutral-500 font-mono hidden sm:inline">390px Mobile</span>
              </div>
            </div>

            {/* Mobile Viewport Mockup */}
            <div className="max-w-[410px] mx-auto rounded-[40px] border-4 border-neutral-900 shadow-2xl overflow-hidden max-h-[85vh] overflow-y-auto scrollbar-thin relative bg-black">
              <InvitationRenderer
                key={`preview-${previewDoorKey}`}
                invitation={form}
                isPreview={true}
                showOpeningInPreview={previewDoorKey > 0}
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
                  Guests can now open your royal double doors, scratch the card, view the map directions, and submit RSVPs online.
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
                    `Namaste! ✨\nYou are cordially invited to celebrate ${form.title} on ${form.date}.\n\nTap the live link to view the royal door entrance, itinerary, scratch card & RSVP:\n${window.location.origin}/i/${form.slug}\n\nWith love,\n${form.names}`
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
        {/* FULLSCREEN LIVE GUEST PREVIEW SIMULATOR MODAL */}
        {/* ========================================================================= */}
        {showFullscreenPreview && (
          <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-between p-3 sm:p-6 animate-fade-in font-sans">
            {/* Top Toolbar */}
            <div className="w-full max-w-5xl flex flex-col sm:flex-row items-center justify-between py-2 border-b border-white/10 text-white gap-3 z-10">
              <div className="flex items-center space-x-3">
                <span className="font-serif text-base sm:text-lg font-bold text-amber-300 flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Live Guest Experience Preview</span>
                </span>
                <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-white/10 text-[10px] font-mono uppercase text-neutral-300">
                  Palace Doors Opening + Full Scroll
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
                    📱 Mobile (390px)
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
                    💻 Desktop View
                  </button>
                </div>

                {/* Replay Doors */}
                <button
                  type="button"
                  onClick={() => setPreviewDoorKey((prev) => prev + 1)}
                  className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-amber-300 text-xs font-bold flex items-center space-x-1"
                  title="Replay Entrance"
                >
                  <DoorClosed className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Replay Doors</span>
                </button>

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
                  key={`modal-preview-${previewDoorKey}`}
                  invitation={form}
                  isPreview={true}
                  showOpeningInPreview={true}
                />
              </div>
            </div>

            <div className="text-[11px] text-neutral-400 font-mono text-center">
              <span>✨ Tap or scroll down the royal doors to open and explore the full live invitation.</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default InvitationEditor;
