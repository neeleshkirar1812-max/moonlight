import React, { useState, useEffect } from 'react';
import api from '../../api/client';
import { Bell, CheckCircle2, Sparkles, Calendar, CreditCard, MessageSquare } from 'lucide-react';
import { useNotification } from '../../context/NotificationContext';

const iconTypeMap = {
  NEW_ENQUIRY: MessageSquare,
  BOOKING_CONFIRMED: Calendar,
  PAYMENT_RECEIVED: CreditCard,
  GALLERY_UPLOADED: Sparkles,
  SYSTEM_NOTIFICATION: Bell,
};

const CustomerNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToast } = useNotification();

  const fetchNotifications = async () => {
    try {
      const res = await api.get('/notifications');
      setNotifications(res.data || []);
    } catch (err) {
      console.error('Error fetching notifications', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const markRead = async (id) => {
    try {
      await api.put(`/notifications/${id}/read`);
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const markAllRead = async () => {
    try {
      await api.put('/notifications/mark-all-read');
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      addToast({ title: 'Success', message: 'All notifications marked as read', type: 'success' });
    } catch (err) {
      addToast({ title: 'Error', message: err.message, type: 'error' });
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold block">
            Alerts & Updates
          </span>
          <h1 className="font-serif text-3xl font-bold text-white">Notifications</h1>
        </div>

        {notifications.some((n) => !n.isRead) && (
          <button
            onClick={markAllRead}
            className="px-4 py-2 rounded-full bg-obsidian-300 border border-white/15 text-xs text-neutral-300 hover:text-white"
          >
            Mark All as Read
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="text-center py-20 bg-obsidian-400 rounded-3xl border border-white/10 space-y-3">
          <Bell className="w-8 h-8 text-gold-400 mx-auto opacity-50" />
          <h3 className="font-serif text-xl text-white">No New Notifications</h3>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map((notif) => {
            const Icon = iconTypeMap[notif.type] || Bell;
            return (
              <div
                key={notif._id}
                onClick={() => !notif.isRead && markRead(notif._id)}
                className={`p-5 rounded-2xl border transition-all flex items-start space-x-4 cursor-pointer ${
                  notif.isRead
                    ? 'bg-obsidian-400/60 border-white/5 text-neutral-400'
                    : 'bg-obsidian-300 border-gold-500/30 text-white shadow-gold-subtle'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 shrink-0 mt-0.5">
                  <Icon className="w-5 h-5" />
                </div>

                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gold-200">
                      {notif.title}
                    </h4>
                    <span className="text-[10px] text-neutral-500 font-mono">
                      {new Date(notif.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed">{notif.message}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CustomerNotifications;
