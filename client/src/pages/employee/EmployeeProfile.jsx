import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import api from '../../api/client';
import { User, Camera, Instagram, Save } from 'lucide-react';

const EmployeeProfile = () => {
  const { user, updateUser } = useAuth();
  const { addToast } = useNotification();
  const [profile, setProfile] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    bio: '',
    instagramHandle: '',
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/auth/me');
        if (res.profile) {
          setProfile({
            name: res.user.name || '',
            phone: res.user.phone || '',
            bio: res.profile.bio || '',
            instagramHandle: res.profile.instagramHandle || '',
          });
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await api.put('/auth/profile', profile);
      updateUser(res.user);
      addToast({ title: 'Profile Updated', message: 'Employee bio and contact details saved.', type: 'success' });
    } catch (err) {
      addToast({ title: 'Error', message: err.message, type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-2xl">
      <div>
        <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold block">
          Production Crew
        </span>
        <h1 className="font-serif text-3xl font-bold text-white">Employee Profile & Portfolio</h1>
      </div>

      <div className="luxury-card rounded-3xl p-8 border border-white/10 space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="space-y-1.5">
            <label className="text-neutral-300 font-semibold uppercase">Full Name</label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="w-full bg-obsidian-500 border border-white/15 rounded-xl px-4 py-2.5 text-white focus:border-gold-400 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-neutral-300 font-semibold uppercase">Phone Number</label>
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="w-full bg-obsidian-500 border border-white/15 rounded-xl px-4 py-2.5 text-white focus:border-gold-400 focus:outline-none"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-neutral-300 font-semibold uppercase">Instagram Handle</label>
              <input
                type="text"
                placeholder="@username"
                value={profile.instagramHandle}
                onChange={(e) => setProfile({ ...profile, instagramHandle: e.target.value })}
                className="w-full bg-obsidian-500 border border-white/15 rounded-xl px-4 py-2.5 text-white focus:border-gold-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-neutral-300 font-semibold uppercase">Professional Bio & Experience</label>
            <textarea
              rows={4}
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              placeholder="Detail your camera specializations, masterworks, and awards..."
              className="w-full bg-obsidian-500 border border-white/15 rounded-2xl p-4 text-white focus:border-gold-400 focus:outline-none"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 rounded-full bg-gold-gradient text-black font-bold text-xs uppercase tracking-wider shadow-gold-subtle hover:brightness-110 transition-all flex items-center disabled:opacity-50"
            >
              <Save className="w-3.5 h-3.5 mr-1.5" />
              {saving ? 'Saving...' : 'Save Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeProfile;
