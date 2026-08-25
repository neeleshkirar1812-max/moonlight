import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import api from '../../api/client';
import { User, Mail, Phone, Calendar, Lock, Save, ShieldCheck } from 'lucide-react';

const CustomerProfile = () => {
  const { user, updateUser } = useAuth();
  const { addToast } = useNotification();

  const [profile, setProfile] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    partnerName: '',
    weddingDate: '',
    address: { street: '', city: '', state: '', country: 'India' },
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/auth/me');
        if (res.profile) {
          setProfile({
            name: res.user.name || '',
            phone: res.user.phone || '',
            partnerName: res.profile.partnerName || '',
            weddingDate: res.profile.weddingDate ? res.profile.weddingDate.split('T')[0] : '',
            address: res.profile.address || { street: '', city: '', state: '', country: 'India' },
          });
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, []);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setSavingProfile(true);
    try {
      const res = await api.put('/auth/profile', profile);
      updateUser(res.user);
      addToast({ title: 'Profile Updated', message: 'Your client profile was successfully saved.', type: 'success' });
    } catch (err) {
      addToast({ title: 'Error', message: err.message, type: 'error' });
    } finally {
      setSavingProfile(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      addToast({ title: 'Mismatch', message: 'New password and confirmation do not match.', type: 'warning' });
      return;
    }

    setSavingPassword(true);
    try {
      await api.put('/auth/change-password', {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });
      addToast({ title: 'Password Changed', message: 'Your password was updated securely.', type: 'success' });
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      addToast({ title: 'Error', message: err.message, type: 'error' });
    } finally {
      setSavingPassword(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl">
      <div>
        <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold block">
          Client Sanctuary
        </span>
        <h1 className="font-serif text-3xl font-bold text-white">Profile & Account Settings</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Personal Details */}
        <div className="lg:col-span-7 luxury-card rounded-3xl p-8 border border-white/10 space-y-6">
          <h3 className="font-serif text-xl font-bold text-white">Couple & Contact Details</h3>

          <form onSubmit={handleProfileSubmit} className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <label className="text-neutral-300 font-semibold uppercase">Your Full Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full bg-obsidian-500 border border-white/15 rounded-xl px-4 py-2.5 text-white focus:border-gold-400 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-neutral-300 font-semibold uppercase">Partner's Full Name</label>
              <input
                type="text"
                value={profile.partnerName}
                onChange={(e) => setProfile({ ...profile, partnerName: e.target.value })}
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
                <label className="text-neutral-300 font-semibold uppercase">Wedding Date</label>
                <input
                  type="date"
                  value={profile.weddingDate}
                  onChange={(e) => setProfile({ ...profile, weddingDate: e.target.value })}
                  className="w-full bg-obsidian-500 border border-white/15 rounded-xl px-4 py-2.5 text-white focus:border-gold-400 focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={savingProfile}
                className="px-6 py-2.5 rounded-full bg-gold-gradient text-black font-bold text-xs uppercase tracking-wider shadow-gold-subtle hover:brightness-110 transition-all flex items-center disabled:opacity-50"
              >
                <Save className="w-3.5 h-3.5 mr-1.5" />
                {savingProfile ? 'Saving...' : 'Save Profile'}
              </button>
            </div>
          </form>
        </div>

        {/* Password Security */}
        <div className="lg:col-span-5 luxury-card rounded-3xl p-8 border border-white/10 space-y-6">
          <h3 className="font-serif text-xl font-bold text-white">Security & Password</h3>

          <form onSubmit={handlePasswordSubmit} className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <label className="text-neutral-300 font-semibold uppercase">Current Password</label>
              <input
                type="password"
                required
                value={passwordForm.currentPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                className="w-full bg-obsidian-500 border border-white/15 rounded-xl px-4 py-2.5 text-white focus:border-gold-400 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-neutral-300 font-semibold uppercase">New Password</label>
              <input
                type="password"
                required
                minLength={6}
                value={passwordForm.newPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                className="w-full bg-obsidian-500 border border-white/15 rounded-xl px-4 py-2.5 text-white focus:border-gold-400 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-neutral-300 font-semibold uppercase">Confirm New Password</label>
              <input
                type="password"
                required
                minLength={6}
                value={passwordForm.confirmPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                className="w-full bg-obsidian-500 border border-white/15 rounded-xl px-4 py-2.5 text-white focus:border-gold-400 focus:outline-none"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={savingPassword}
                className="w-full py-2.5 rounded-full bg-obsidian-300 border border-white/20 text-neutral-200 hover:text-white font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-50"
              >
                {savingPassword ? 'Updating...' : 'Update Password'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;
