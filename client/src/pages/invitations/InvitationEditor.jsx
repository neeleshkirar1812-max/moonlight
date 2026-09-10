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
  Music,
  Share2,
  Copy,
  Check,
  CheckCircle2,
  Plus,
  Trash2,
  Heart,
  Image as ImageIcon,
  Shirt,
  Building,
  Car,
  CloudSun,
  Palette,
  Send,
  Upload,
} from 'lucide-react';

const tabsList = [
  { id: 'basic', label: '1. Basic Details', icon: Calendar },
  { id: 'couple', label: '2. Couple / Host', icon: Heart },
  { id: 'events', label: '3. Events Schedule', icon: Clock },
  { id: 'story', label: '4. Our Story', icon: Sparkles },
  { id: 'gallery', label: '5. Photo Gallery', icon: ImageIcon },
  { id: 'things', label: '6. Things To Know', icon: Shirt },
  { id: 'scratch', label: '7. Scratch Card', icon: Gift },
  { id: 'rsvp', label: '8. RSVP Settings', icon: Send },
  { id: 'music', label: '9. Background Music', icon: Music },
  { id: 'theme', label: '10. Theme & Style', icon: Palette },
];

const InvitationEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToast } = useNotification();

  const [activeTab, setActiveTab] = useState('basic');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [showPublishModal, setShowPublishModal] = useState(false);
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
    
    // Story
    story_title: 'How Our Journey Began',
    story_text: 'From a chance encounter that turned into endless midnight conversations, our bond grew with every shared laughter and quiet sunrise. Today, we stand ready to embark on our forever journey.',
    story_quote: 'In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine.',
    hashtags: '#AaravWedsKiara',

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

    // Things to know
    dress_code: {
      title: 'Royal Ethnic & Pastel Glamour',
      description: 'We encourage our guests to dress in celebratory traditional Indian attire.',
      palette: [
        { event: 'Haldi', colors: 'Turmeric Yellow, Mustard & Floral White' },
        { event: 'Mehendi & Sangeet', colors: 'Emerald Green, Teal & Rose Gold' },
        { event: 'Wedding', colors: 'Regal Ivory, Crimson Velvet & Gold' },
      ],
    },
    accommodation_info: {
      hotel: 'Jehan Numa Palace & Retreat',
      address: '152 Shamla Hills, Bhopal',
      details: 'Complimentary luxury room arrangements available for all out-of-town guests from Nov 19 to Nov 22.',
    },
    parking_info: {
      valet: 'Complimentary Valet Parking Available',
      instructions: 'Please pull up to the main Palace Portico where our attendants will assist you.',
    },
    weather_info: {
      summary: 'Pleasant & Cool (16°C – 26°C)',
      note: 'Evenings in late November are delightfully crisp. Light evening shawls or jackets are recommended.',
    },

    // Scratch card
    scratch_enabled: true,
    scratch_reveal_text: "YOU’RE INVITED ♡\nWe can't wait to celebrate with you.",

    // RSVP
    rsvp_enabled: true,
    rsvp_heading: 'Guest RSVP',
    rsvp_message: 'Kindly confirm your attendance by submitting your details below:',

    // Music
    music_enabled: true,
    music_url: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-wedding-113828.mp3',

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

  const handleNestedChange = (parent, field, value) => {
    setForm((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value,
      },
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
            : 'Your changes have been saved.',
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
    <div className="min-h-screen bg-[#F5F1E8] text-neutral-900 pt-24 sm:pt-32 pb-20 px-4 sm:px-6 lg:px-8 font-sans">
      <SEO title={`Customize: ${form.title} — Moonlight Invitations`} />

      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#DDD2C0] pb-4">
          <Link
            to="/invitations/dashboard"
            className="inline-flex items-center text-xs font-mono font-bold text-amber-900 hover:text-amber-950 uppercase tracking-wider"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1.5" /> Back to Dashboard
          </Link>

          <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={() => handleSave(false)}
              disabled={saving}
              className="px-5 py-2.5 rounded-full bg-white hover:bg-stone-50 border border-stone-300 text-neutral-800 font-bold text-xs uppercase tracking-wider shadow-sm"
            >
              Save Draft
            </button>
            <button
              type="button"
              onClick={() => handleSave(true)}
              disabled={saving}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 text-white font-bold text-xs uppercase tracking-wider shadow-md flex items-center"
            >
              <Sparkles className="w-3.5 h-3.5 mr-1.5" />
              {saving ? 'Publishing...' : form.published ? 'Update Live Invite' : 'Publish Live Invite'}
            </button>
          </div>
        </div>

        {/* Published Banner */}
        {form.published && form.slug && (
          <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50 border border-emerald-300 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div className="space-y-0.5">
              <span className="text-[10px] uppercase font-mono font-bold text-emerald-800 tracking-wider flex items-center">
                <CheckCircle2 className="w-4 h-4 mr-1.5 text-emerald-600" /> Invitation is Live!
              </span>
              <p className="text-xs text-neutral-800 font-mono font-bold select-all">{fullLiveUrl}</p>
            </div>
            <div className="flex items-center space-x-2">
              <button
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

        {/* Workspace: Left Tabbed Form, Right Live Real-Time 390px Mobile Viewport */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Form Panel */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-[#E0D7C7] shadow-sm space-y-6">
            {/* Tabs Navigation */}
            <div className="flex items-center space-x-1 overflow-x-auto pb-2 scrollbar-none border-b border-stone-200">
              {tabsList.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center space-x-1.5 ${
                      activeTab === tab.id
                        ? 'bg-amber-900 text-white shadow-sm'
                        : 'text-neutral-600 hover:bg-stone-100 hover:text-neutral-900'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* TAB 1: BASIC DETAILS */}
            {activeTab === 'basic' && (
              <div className="space-y-4 text-xs animate-fade-in">
                <h3 className="font-serif text-lg font-bold text-neutral-900">Celebration Essentials</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-mono uppercase font-bold text-neutral-700 block mb-1">
                      Event Heading
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={form.title}
                      onChange={handleChange}
                      className="w-full bg-[#FAF8F5] border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs text-neutral-900 focus:border-amber-600 focus:outline-none"
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
                      className="w-full bg-[#FAF8F5] border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs text-neutral-900 focus:border-amber-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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

                {/* Royal Palace Doors Configuration */}
                <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-bold text-sm text-amber-950 flex items-center space-x-1.5">
                      <span>🚪</span>
                      <span>Royal Palace Double Doors & Wax Seal</span>
                    </span>
                    <span className="text-[10px] font-mono uppercase bg-amber-200 text-amber-900 px-2 py-0.5 rounded-full font-bold">
                      Interactive 3D
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
                      Optional Custom Door Opening Video (MP4 URL)
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
                      By default, guests experience interactive 3D Royal Teak Palace Doors with 24K gold jaali arches, brass knockers, wax seal crest & falling petals.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: COUPLE / HOST */}
            {activeTab === 'couple' && (
              <div className="space-y-4 text-xs animate-fade-in">
                <h3 className="font-serif text-lg font-bold text-neutral-900">Couple & Host Names</h3>
                <div>
                  <label className="font-mono uppercase font-bold text-neutral-700 block mb-1">
                    Full Combined Display Names
                  </label>
                  <input
                    type="text"
                    name="names"
                    value={form.names}
                    onChange={handleChange}
                    placeholder="Aarav Sharma & Kiara Sen"
                    className="w-full bg-[#FAF8F5] border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs text-neutral-900 focus:border-amber-600 focus:outline-none"
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
                    Opening Salutation Heading
                  </label>
                  <input
                    type="text"
                    name="opening_heading"
                    value={form.opening_heading}
                    onChange={handleChange}
                    placeholder="Together with their families"
                    className="w-full bg-[#FAF8F5] border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs text-neutral-900 focus:border-amber-600 focus:outline-none"
                  />
                </div>
              </div>
            )}

            {/* TAB 3: EVENTS SCHEDULE */}
            {activeTab === 'events' && (
              <div className="space-y-4 text-xs animate-fade-in">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-lg font-bold text-neutral-900">Celebration Schedule</h3>
                  <button
                    type="button"
                    onClick={handleAddEvent}
                    className="px-3 py-1.5 rounded-xl bg-amber-900 text-white font-bold text-xs flex items-center space-x-1 shadow-sm"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Event</span>
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
                          Event 0{idx + 1}: {ev.title}
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
                        <input
                          type="text"
                          value={ev.title}
                          onChange={(e) => handleUpdateEvent(idx, 'title', e.target.value)}
                          placeholder="Event Title (e.g. Sangeet)"
                          className="bg-white border border-stone-300 rounded-lg p-2 text-xs text-neutral-900"
                        />
                        <input
                          type="date"
                          value={ev.date}
                          onChange={(e) => handleUpdateEvent(idx, 'date', e.target.value)}
                          className="bg-white border border-stone-300 rounded-lg p-2 text-xs text-neutral-900"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={ev.time}
                          onChange={(e) => handleUpdateEvent(idx, 'time', e.target.value)}
                          placeholder="Time (e.g. 07:00 PM)"
                          className="bg-white border border-stone-300 rounded-lg p-2 text-xs text-neutral-900"
                        />
                        <input
                          type="text"
                          value={ev.venue}
                          onChange={(e) => handleUpdateEvent(idx, 'venue', e.target.value)}
                          placeholder="Venue / Hall"
                          className="bg-white border border-stone-300 rounded-lg p-2 text-xs text-neutral-900"
                        />
                      </div>

                      <input
                        type="text"
                        value={ev.description}
                        onChange={(e) => handleUpdateEvent(idx, 'description', e.target.value)}
                        placeholder="Short ceremony description..."
                        className="w-full bg-white border border-stone-300 rounded-lg p-2 text-xs text-neutral-900"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: OUR STORY */}
            {activeTab === 'story' && (
              <div className="space-y-4 text-xs animate-fade-in">
                <h3 className="font-serif text-lg font-bold text-neutral-900">Our Story & Quotes</h3>
                <div>
                  <label className="font-mono uppercase font-bold text-neutral-700 block mb-1">
                    Story Section Title
                  </label>
                  <input
                    type="text"
                    name="story_title"
                    value={form.story_title}
                    onChange={handleChange}
                    className="w-full bg-[#FAF8F5] border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs text-neutral-900 focus:border-amber-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-mono uppercase font-bold text-neutral-700 block mb-1">
                    Our Story Text
                  </label>
                  <textarea
                    rows={4}
                    name="story_text"
                    value={form.story_text}
                    onChange={handleChange}
                    className="w-full bg-[#FAF8F5] border border-stone-300 rounded-xl p-3 text-xs text-neutral-900 focus:border-amber-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-mono uppercase font-bold text-neutral-700 block mb-1">
                    Romantic Quote
                  </label>
                  <input
                    type="text"
                    name="story_quote"
                    value={form.story_quote}
                    onChange={handleChange}
                    className="w-full bg-[#FAF8F5] border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs text-neutral-900 focus:border-amber-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-mono uppercase font-bold text-neutral-700 block mb-1">
                    Wedding Hashtag
                  </label>
                  <input
                    type="text"
                    name="hashtags"
                    value={form.hashtags}
                    onChange={handleChange}
                    placeholder="#AaravWedsKiara"
                    className="w-full bg-[#FAF8F5] border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs text-neutral-900 focus:border-amber-600 focus:outline-none font-mono"
                  />
                </div>
              </div>
            )}

            {/* TAB 5: GALLERY */}
            {activeTab === 'gallery' && (
              <div className="space-y-4 text-xs animate-fade-in">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-lg font-bold text-neutral-900">Photo Gallery</h3>
                  <label className="px-3 py-1.5 rounded-xl bg-amber-900 text-white font-bold text-xs flex items-center space-x-1 cursor-pointer shadow-sm">
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

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {form.gallery_images.map((img, idx) => (
                    <div
                      key={idx}
                      className="relative aspect-square rounded-xl overflow-hidden border border-stone-300 group"
                    >
                      <img src={img} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => handleDeleteGalleryImage(idx)}
                        className="absolute top-1.5 right-1.5 p-1 rounded-full bg-red-600 text-white opacity-90 hover:opacity-100 shadow"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 6: THINGS TO KNOW */}
            {activeTab === 'things' && (
              <div className="space-y-4 text-xs animate-fade-in">
                <h3 className="font-serif text-lg font-bold text-neutral-900">Things To Know</h3>
                <div>
                  <label className="font-mono uppercase font-bold text-neutral-700 block mb-1">
                    Dress Code Guidance
                  </label>
                  <input
                    type="text"
                    value={form.dress_code?.title || ''}
                    onChange={(e) => handleNestedChange('dress_code', 'title', e.target.value)}
                    placeholder="Royal Ethnic & Pastel Glamour"
                    className="w-full bg-[#FAF8F5] border border-stone-300 rounded-xl px-3.5 py-2 text-xs text-neutral-900 mb-1.5"
                  />
                  <textarea
                    rows={2}
                    value={form.dress_code?.description || ''}
                    onChange={(e) => handleNestedChange('dress_code', 'description', e.target.value)}
                    placeholder="Dress code instructions..."
                    className="w-full bg-[#FAF8F5] border border-stone-300 rounded-xl p-2 text-xs text-neutral-900"
                  />
                </div>

                <div>
                  <label className="font-mono uppercase font-bold text-neutral-700 block mb-1">
                    Accommodation & Hospitality
                  </label>
                  <input
                    type="text"
                    value={form.accommodation_info?.hotel || ''}
                    onChange={(e) => handleNestedChange('accommodation_info', 'hotel', e.target.value)}
                    placeholder="Hotel Name"
                    className="w-full bg-[#FAF8F5] border border-stone-300 rounded-xl px-3.5 py-2 text-xs text-neutral-900 mb-1.5"
                  />
                  <textarea
                    rows={2}
                    value={form.accommodation_info?.details || ''}
                    onChange={(e) => handleNestedChange('accommodation_info', 'details', e.target.value)}
                    placeholder="Room booking details..."
                    className="w-full bg-[#FAF8F5] border border-stone-300 rounded-xl p-2 text-xs text-neutral-900"
                  />
                </div>

                <div>
                  <label className="font-mono uppercase font-bold text-neutral-700 block mb-1">
                    Valet & Parking
                  </label>
                  <input
                    type="text"
                    value={form.parking_info?.valet || ''}
                    onChange={(e) => handleNestedChange('parking_info', 'valet', e.target.value)}
                    placeholder="Complimentary Valet Parking Available"
                    className="w-full bg-[#FAF8F5] border border-stone-300 rounded-xl px-3.5 py-2 text-xs text-neutral-900"
                  />
                </div>
              </div>
            )}

            {/* TAB 7: SCRATCH CARD */}
            {activeTab === 'scratch' && (
              <div className="space-y-4 text-xs animate-fade-in">
                <h3 className="font-serif text-lg font-bold text-neutral-900">Interactive Scratch Card</h3>
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
                    Enable Interactive Scratch Card Reveal
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
            )}

            {/* TAB 8: RSVP */}
            {activeTab === 'rsvp' && (
              <div className="space-y-4 text-xs animate-fade-in">
                <h3 className="font-serif text-lg font-bold text-neutral-900">Guest RSVP Settings</h3>
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
                    Enable Online RSVP Collection & WhatsApp RSVP
                  </label>
                </div>

                <div>
                  <label className="font-mono uppercase font-bold text-neutral-700 block mb-1">
                    RSVP Heading
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
            )}

            {/* TAB 9: MUSIC */}
            {activeTab === 'music' && (
              <div className="space-y-4 text-xs animate-fade-in">
                <h3 className="font-serif text-lg font-bold text-neutral-900">Background Soundtrack</h3>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="music_enabled"
                    name="music_enabled"
                    checked={form.music_enabled}
                    onChange={handleChange}
                    className="rounded border-stone-300 text-amber-600 focus:ring-amber-500 w-4 h-4"
                  />
                  <label htmlFor="music_enabled" className="font-bold text-neutral-800">
                    Enable Background Music Player
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    {
                      name: '🎺 Royal Shehnai',
                      url: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-wedding-113828.mp3',
                    },
                    {
                      name: '🎻 Romantic Guitar',
                      url: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=acoustic-guitars-ambient-uplifting-11244.mp3',
                    },
                    {
                      name: '🎹 Gentle Piano',
                      url: 'https://cdn.pixabay.com/download/audio/2021/08/04/audio_0625c1539c.mp3?filename=gentle-piano-love-story-8714.mp3',
                    },
                  ].map((track) => (
                    <button
                      key={track.name}
                      type="button"
                      onClick={() => setForm((prev) => ({ ...prev, music_url: track.url }))}
                      className={`p-2.5 rounded-xl border text-xs font-semibold text-left transition-all ${
                        form.music_url === track.url
                          ? 'bg-amber-100 border-amber-600 text-amber-950 font-bold'
                          : 'bg-stone-50 border-stone-200 text-neutral-700 hover:bg-amber-50'
                      }`}
                    >
                      {track.name}
                    </button>
                  ))}
                </div>

                <input
                  type="url"
                  name="music_url"
                  placeholder="Or paste custom MP3 stream URL..."
                  value={form.music_url}
                  onChange={handleChange}
                  className="w-full bg-[#FAF8F5] border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs text-neutral-900"
                />
              </div>
            )}

            {/* TAB 10: THEME & TEMPLATE */}
            {activeTab === 'theme' && (
              <div className="space-y-4 text-xs animate-fade-in">
                <h3 className="font-serif text-lg font-bold text-neutral-900">Switch Template Suite</h3>
                <div className="grid grid-cols-2 gap-3">
                  {invitationTemplates.map((tpl) => (
                    <button
                      key={tpl.id}
                      type="button"
                      onClick={() => setForm((prev) => ({ ...prev, template_id: tpl.id }))}
                      className={`p-3 rounded-2xl border text-left space-y-1 transition-all ${
                        form.template_id === tpl.id
                          ? 'bg-amber-100 border-amber-600 ring-2 ring-amber-400'
                          : 'bg-[#FAF8F5] border-stone-200 hover:bg-stone-100'
                      }`}
                    >
                      <span className="font-serif font-bold text-xs text-neutral-900 block">
                        {tpl.name}
                      </span>
                      <span className="text-[10px] text-amber-800 uppercase font-mono block">
                        {tpl.category}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Live Interactive 390px Mobile Viewport */}
          <div className="lg:col-span-6 sticky top-24 space-y-3">
            <div className="flex items-center justify-between px-2">
              <span className="text-[11px] font-mono uppercase font-bold text-amber-900 tracking-wider flex items-center">
                <Eye className="w-4 h-4 mr-1.5" /> Real-Time Live Preview
              </span>
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => setPreviewDoorKey((prev) => prev + 1)}
                  className="px-2.5 py-1 rounded-full bg-amber-900 text-amber-100 hover:bg-amber-950 text-[10px] font-mono font-bold flex items-center space-x-1 shadow"
                  title="Preview 3D Palace Doors Entrance"
                >
                  <span>🚪 Test Door Opening</span>
                </button>
                <span className="text-[10px] text-neutral-500 font-mono hidden sm:inline">390px Mobile</span>
              </div>
            </div>

            {/* Mobile Viewport Phone Mockup Container */}
            <div className="max-w-[410px] mx-auto rounded-[40px] border-4 border-neutral-900 shadow-2xl overflow-hidden max-h-[85vh] overflow-y-auto scrollbar-thin relative">
              <InvitationRenderer
                key={`preview-${previewDoorKey}`}
                invitation={form}
                isPreview={previewDoorKey === 0}
                showOpeningInPreview={previewDoorKey > 0}
              />
            </div>
          </div>
        </div>

        {/* Live Publication Modal */}
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
                  Guests can now open your invitation, scratch the card, view the map directions, and submit RSVPs online.
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
                    `Namaste! ✨\nYou are cordially invited to celebrate ${form.title} on ${form.date}.\n\nTap the live link to view the itinerary, scratch card & RSVP:\n${window.location.origin}/i/${form.slug}\n\nWith love,\n${form.names}`
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
      </div>
    </div>
  );
};

export default InvitationEditor;
