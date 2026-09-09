import React, { useState, useEffect } from 'react';
import api from '../../api/client';
import { useNotification } from '../../context/NotificationContext';
import { Settings, Save, Globe, Phone, Mail, MapPin, Instagram, Youtube } from 'lucide-react';

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    siteName: 'Moonlight Production',
    tagline: 'Luxury Wedding Photography & Cinematic Heirlooms',
    contactEmail: 'info@moonlightproduction.com',
    contactPhone: '+91 92292 29323',
    whatsappNumber: '+919229229323',
    address: 'Moonlight Production, VIP Road, Bhopal, MP 462001',
    instagramUrl: 'https://instagram.com/moonlight_production__',
    youtubeUrl: 'https://youtube.com/@moonlightproductions_films',
    defaultCurrency: 'INR',
    enableWatermarkByDefault: false,
  });
  const [saving, setSaving] = useState(false);
  const { addToast } = useNotification();

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get('/settings');
        if (res.data) setSettings(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSettings();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put('/settings', settings);
      addToast({ title: 'Settings Saved', message: 'Studio platform configuration updated.', type: 'success' });
    } catch (err) {
      addToast({ title: 'Error', message: err.message, type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl text-neutral-900">
      <div className="border-b border-amber-900/10 pb-6">
        <span className="text-xs uppercase tracking-widest text-amber-700 font-bold block">
          Platform Configuration
        </span>
        <h1 className="font-serif text-3xl font-bold text-neutral-900 mt-1">Studio Brand & Global Settings</h1>
        <p className="text-neutral-600 text-xs font-light mt-1">
          Customize contact details, studio addresses, social handles, and default currencies.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-900/15 shadow-sm space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-neutral-700 font-bold uppercase text-[11px]">Brand / Studio Name</label>
              <input
                type="text"
                value={settings.siteName}
                onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-neutral-900 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/30 font-serif text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-neutral-700 font-bold uppercase text-[11px]">Tagline / Brand Statement</label>
              <input
                type="text"
                value={settings.tagline}
                onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-neutral-900 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/30"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="space-y-1.5">
              <label className="text-neutral-700 font-bold uppercase text-[11px]">Studio Email</label>
              <input
                type="email"
                value={settings.contactEmail}
                onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-neutral-900 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/30 font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-neutral-700 font-bold uppercase text-[11px]">Telephone</label>
              <input
                type="text"
                value={settings.contactPhone}
                onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-neutral-900 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/30 font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-neutral-700 font-bold uppercase text-[11px]">WhatsApp Business Number</label>
              <input
                type="text"
                value={settings.whatsappNumber}
                onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-neutral-900 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/30 font-mono"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-neutral-700 font-bold uppercase text-[11px]">Studio Physical Address</label>
            <input
              type="text"
              value={settings.address}
              onChange={(e) => setSettings({ ...settings, address: e.target.value })}
              className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-neutral-900 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/30"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-neutral-700 font-bold uppercase text-[11px]">Instagram URL</label>
              <input
                type="url"
                value={settings.instagramUrl}
                onChange={(e) => setSettings({ ...settings, instagramUrl: e.target.value })}
                className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-neutral-900 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/30 font-mono text-[11px]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-neutral-700 font-bold uppercase text-[11px]">YouTube Channel URL</label>
              <input
                type="url"
                value={settings.youtubeUrl}
                onChange={(e) => setSettings({ ...settings, youtubeUrl: e.target.value })}
                className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-neutral-900 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/30 font-mono text-[11px]"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-stone-200 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="px-8 py-3 rounded-full bg-gold-gradient text-neutral-950 font-bold text-xs uppercase tracking-wider shadow-gold-subtle hover:scale-105 transition-all flex items-center disabled:opacity-50"
            >
              <Save className="w-4 h-4 mr-2" />
              {saving ? 'Saving...' : 'Save Configuration'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminSettings;
