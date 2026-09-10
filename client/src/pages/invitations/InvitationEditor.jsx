import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useNotification } from '../../context/NotificationContext';
import api from '../../api/client';
import SEO from '../../components/common/SEO';
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
} from 'lucide-react';

const InvitationEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToast } = useNotification();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [scratchPreviewRevealed, setScratchPreviewRevealed] = useState(false);

  const [form, setForm] = useState({
    title: 'A Royal Celebration',
    names: 'Aarav Sharma & Kiara Sen',
    eventType: 'Wedding',
    date: '2026-11-20',
    time: '19:00',
    venue: 'Jehan Numa Palace',
    venueAddress: '152 Shamla Hills, Bhopal, Madhya Pradesh',
    message: 'With joyous hearts, we request the honor of your presence to celebrate our special day.',
    scratchMessage: 'YOU’RE INVITED ♡',
    musicUrl: '',
    coverPhoto: '',
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
          setForm({
            title: inv.title || 'A Royal Celebration',
            names: inv.names || 'Couple Names',
            eventType: inv.eventType || 'Wedding',
            date: inv.date || '2026-11-20',
            time: inv.time || '19:00',
            venue: inv.venue || 'Jehan Numa Palace',
            venueAddress: inv.venueAddress || '152 Shamla Hills, Bhopal',
            message: inv.message || 'With joyous hearts, we request the honor of your presence.',
            scratchMessage: inv.scratchMessage || 'YOU’RE INVITED ♡',
            musicUrl: inv.musicUrl || '',
            coverPhoto: inv.coverPhoto || '',
            published: inv.published || false,
            slug: inv.slug || '',
          });
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
          slug: updated.slug,
        }));
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
        Loading invitation editor...
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

        {/* Published Success Banner */}
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

        {/* Main 2-Column Workspace: Left Form, Right Live Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Form Editor */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-[#E0D7C7] shadow-sm space-y-6">
            <div className="border-b border-stone-200 pb-3">
              <span className="text-[10.5px] uppercase font-mono tracking-widest text-amber-800 font-bold block">
                Editor Panel
              </span>
              <h2 className="font-serif text-2xl font-bold text-neutral-900">Personalize Your Invitation</h2>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-mono uppercase font-bold text-neutral-700 block mb-1 text-[11px]">
                    Invitation Heading
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    className="w-full bg-[#FAF8F5] border border-stone-300 rounded-xl px-4 py-2.5 text-xs text-neutral-900 focus:border-amber-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-mono uppercase font-bold text-neutral-700 block mb-1 text-[11px]">
                    Event Type
                  </label>
                  <input
                    type="text"
                    name="eventType"
                    value={form.eventType}
                    onChange={handleChange}
                    className="w-full bg-[#FAF8F5] border border-stone-300 rounded-xl px-4 py-2.5 text-xs text-neutral-900 focus:border-amber-600 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-mono uppercase font-bold text-neutral-700 block mb-1 text-[11px]">
                  Couple / Host Names (Displayed in Gold Script)
                </label>
                <input
                  type="text"
                  name="names"
                  value={form.names}
                  onChange={handleChange}
                  className="w-full bg-[#FAF8F5] border border-stone-300 rounded-xl px-4 py-2.5 text-xs text-neutral-900 focus:border-amber-600 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-mono uppercase font-bold text-neutral-700 block mb-1 text-[11px]">
                    Ceremony Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    className="w-full bg-[#FAF8F5] border border-stone-300 rounded-xl px-4 py-2.5 text-xs text-neutral-900 focus:border-amber-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-mono uppercase font-bold text-neutral-700 block mb-1 text-[11px]">
                    Ceremony Time
                  </label>
                  <input
                    type="time"
                    name="time"
                    value={form.time}
                    onChange={handleChange}
                    className="w-full bg-[#FAF8F5] border border-stone-300 rounded-xl px-4 py-2.5 text-xs text-neutral-900 focus:border-amber-600 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-mono uppercase font-bold text-neutral-700 block mb-1 text-[11px]">
                  Venue Name
                </label>
                <input
                  type="text"
                  name="venue"
                  value={form.venue}
                  onChange={handleChange}
                  className="w-full bg-[#FAF8F5] border border-stone-300 rounded-xl px-4 py-2.5 text-xs text-neutral-900 focus:border-amber-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-mono uppercase font-bold text-neutral-700 block mb-1 text-[11px]">
                  Complete Venue Address (For Google Maps)
                </label>
                <input
                  type="text"
                  name="venueAddress"
                  value={form.venueAddress}
                  onChange={handleChange}
                  className="w-full bg-[#FAF8F5] border border-stone-300 rounded-xl px-4 py-2.5 text-xs text-neutral-900 focus:border-amber-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-mono uppercase font-bold text-neutral-700 block mb-1 text-[11px]">
                  Personal Invitation Message
                </label>
                <textarea
                  rows={3}
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  className="w-full bg-[#FAF8F5] border border-stone-300 rounded-xl p-3 text-xs text-neutral-900 focus:border-amber-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-mono uppercase font-bold text-neutral-700 block mb-1 text-[11px]">
                  Scratch Card Reveal Text (e.g. YOU’RE INVITED ♡)
                </label>
                <input
                  type="text"
                  name="scratchMessage"
                  value={form.scratchMessage}
                  onChange={handleChange}
                  className="w-full bg-[#FAF8F5] border border-stone-300 rounded-xl px-4 py-2.5 text-xs text-neutral-900 focus:border-amber-600 focus:outline-none font-medium"
                />
              </div>

              <div>
                <label className="font-mono uppercase font-bold text-neutral-700 block mb-1 text-[11px]">
                  Background Music Audio Stream URL (Optional)
                </label>
                <input
                  type="url"
                  name="musicUrl"
                  placeholder="https://example.com/soundtrack.mp3"
                  value={form.musicUrl}
                  onChange={handleChange}
                  className="w-full bg-[#FAF8F5] border border-stone-300 rounded-xl px-4 py-2.5 text-xs text-neutral-900 focus:border-amber-600 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Right Live Interactive Phone Preview */}
          <div className="lg:col-span-6 sticky top-28 space-y-3">
            <div className="flex items-center justify-between px-2">
              <span className="text-[11px] font-mono uppercase font-bold text-amber-900 tracking-wider flex items-center">
                <Eye className="w-4 h-4 mr-1.5" /> Real-Time Mobile Preview
              </span>
              <span className="text-[10px] text-neutral-500 font-mono">390px Mobile View</span>
            </div>

            {/* Mobile Mockup Shell */}
            <div className="max-w-[400px] mx-auto bg-[#FFFDF8] rounded-[36px] border-4 border-neutral-800 shadow-2xl p-5 space-y-5 overflow-hidden text-center text-neutral-900">
              {/* Cover Card */}
              <div className="bg-gradient-to-b from-amber-50/80 to-white rounded-3xl p-6 border border-amber-900/15 shadow-sm space-y-3">
                <span className="text-[9px] uppercase font-mono tracking-[0.25em] text-amber-800 font-bold block">
                  ✦ Moonlight Production ✦
                </span>
                <div className="font-serif text-2xl font-bold text-amber-900 italic">
                  {form.names || 'Couple Names'}
                </div>
                <h3 className="font-serif text-base font-bold text-neutral-900">{form.title}</h3>
                <p className="text-[11px] text-neutral-600 leading-relaxed italic">
                  "{form.message}"
                </p>

                <div className="pt-2 border-t border-amber-900/10 flex flex-wrap justify-center gap-2 text-[10px] font-mono text-neutral-700">
                  <span className="flex items-center"><Calendar className="w-3 h-3 mr-1 text-amber-700" /> {form.date}</span>
                  <span>•</span>
                  <span className="flex items-center"><Clock className="w-3 h-3 mr-1 text-amber-700" /> {form.time}</span>
                </div>
              </div>

              {/* Interactive Scratch Preview */}
              <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-sm space-y-2">
                <span className="text-[9.5px] uppercase font-mono font-bold text-amber-800 block">
                  Scratch & Reveal Experience
                </span>
                <div
                  onClick={() => setScratchPreviewRevealed(!scratchPreviewRevealed)}
                  className={`h-24 rounded-xl flex items-center justify-center p-3 cursor-pointer transition-all ${
                    scratchPreviewRevealed
                      ? 'bg-amber-100 border-2 border-amber-600 text-amber-900 font-serif text-lg font-bold'
                      : 'bg-gradient-to-r from-amber-600 to-amber-700 text-white font-mono text-xs font-bold tracking-widest'
                  }`}
                >
                  {scratchPreviewRevealed ? form.scratchMessage || 'YOU’RE INVITED ♡' : 'SCRATCH HERE ✦'}
                </div>
              </div>

              {/* Venue Preview */}
              <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-sm space-y-2 text-left">
                <span className="text-[9.5px] uppercase font-mono font-bold text-neutral-500 block">
                  Venue Location
                </span>
                <div className="font-bold text-xs text-neutral-900 flex items-center">
                  <MapPin className="w-3.5 h-3.5 mr-1.5 text-amber-700 shrink-0" />
                  {form.venue}
                </div>
                <div className="text-[10px] text-neutral-500 truncate">{form.venueAddress}</div>
                <div className="w-full py-1.5 rounded-lg bg-stone-100 text-center text-[10px] font-bold text-neutral-800 border border-stone-200">
                  📍 Get Directions (Google Maps)
                </div>
              </div>

              {/* RSVP Preview */}
              <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-sm space-y-2">
                <span className="text-[9.5px] uppercase font-mono font-bold text-neutral-500 block">
                  Live Guest RSVP Form
                </span>
                <div className="flex justify-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-amber-900 text-white text-[10px] font-bold">Yes</span>
                  <span className="px-3 py-1 rounded-full bg-stone-100 text-neutral-700 text-[10px]">No</span>
                  <span className="px-3 py-1 rounded-full bg-stone-100 text-neutral-700 text-[10px]">Maybe</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvitationEditor;
