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
    <div className="space-y-8 animate-fade-in text-neutral-900">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-900/10 pb-6">
        <div>
          <span className="text-xs uppercase tracking-widest text-amber-700 font-bold block">
            Alerts & Updates
          </span>
          <h1 className="font-serif text-3xl font-bold text-neutral-900 mt-1">Notifications</h1>
          <p className="text-neutral-600 text-xs font-light mt-1">
            Real-time updates regarding shoot schedule, gallery uploads, and invoices.
          </p>
        </div>

        {notifications.some((n) => !n.isRead) && (
          <button
            onClick={markAllRead}
            className="px-4 py-2 rounded-full bg-stone-100 border border-stone-300 text-xs text-neutral-700 hover:text-neutral-900 hover:bg-stone-200 transition-colors font-semibold"
          >
            Mark All as Read
          </button>
        )}
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-24 rounded-2xl bg-stone-100 animate-pulse border border-stone-200" />
          ))}
        </div>
      ) : notifications.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-amber-900/15 space-y-3 shadow-sm">
          <Bell className="w-8 h-8 text-amber-600 mx-auto opacity-70" />
          <h3 className="font-serif text-xl text-neutral-900 font-bold">No New Notifications</h3>
          <p className="text-xs text-neutral-500">You are completely up to date with your wedding production.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map((notif) => {
            const Icon = iconTypeMap[notif.type] || Bell;
            return (
              <div
                key={notif._id}
                onClick={() => !notif.isRead && markRead(notif._id)}
                className={`p-5 rounded-2xl border transition-all flex items-start space-x-4 cursor-pointer shadow-sm ${
                  notif.isRead
                    ? 'bg-stone-50 border-stone-200 text-neutral-600'
                    : 'bg-white border-amber-500/40 text-neutral-900 shadow-md'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 shrink-0 mt-0.5">
                  <Icon className="w-5 h-5" />
                </div>

                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900">
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
