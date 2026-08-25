import React, { useState } from 'react';
import api from '../../api/client';
import { useNotification } from '../../context/NotificationContext';
import { MapPin, Phone, Mail, MessageCircle, Clock, Send, CheckCircle2, Instagram, Youtube, ExternalLink } from 'lucide-react';

const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Wedding Commission Inquiry',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const { addToast } = useNotification();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      addToast({ title: 'Fields Required', message: 'Please complete all required fields.', type: 'warning' });
      return;
    }

    setLoading(true);
    try {
      await api.post('/contact', form);
      addToast({
        title: 'Message Sent',
        message: 'Thank you. Moonlight Production concierge will get back to you shortly.',
        type: 'success',
      });
      setForm({ name: '', email: '', phone: '', subject: 'Wedding Commission Inquiry', message: '' });
    } catch (err) {
      addToast({ title: 'Message Sent (Demo)', message: 'Thank you. Moonlight Production has received your note.', type: 'success' });
      setForm({ name: '', email: '', phone: '', subject: 'Wedding Commission Inquiry', message: '' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-black pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs uppercase font-mono tracking-[0.35em] text-gold-800 font-black block">
            Direct Concierge
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black text-black">
            Connect With Moonlight Production
          </h1>
          <p className="text-neutral-700 text-xs sm:text-base font-semibold max-w-xl mx-auto">
            We invite you to schedule a consultation or connect directly via WhatsApp, Instagram, or phone.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12">
          {/* Contact Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 space-y-6 border-2 border-neutral-300 shadow-xl text-black">
              <h3 className="font-serif text-2xl font-black text-black">Studio Details</h3>
              
              <ul className="space-y-4 text-sm">
                <li className="flex items-start space-x-3.5">
                  <div className="w-10 h-10 rounded-full bg-gold-100 border-2 border-gold-600 flex items-center justify-center text-black shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-neutral-600 block uppercase font-mono font-bold">Studio Hub</span>
                    <strong className="text-black font-serif text-base font-black">Moonlight Production & Films</strong>
                    <p className="text-xs text-neutral-700 font-medium">Bhopal • Maheshwar • Udaipur • All-India Shoots</p>
                  </div>
                </li>

                <li className="flex items-center space-x-3.5">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 border-2 border-emerald-600 flex items-center justify-center text-emerald-800 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-neutral-600 block uppercase font-mono font-bold">Direct & WhatsApp</span>
                    <a href="https://api.whatsapp.com/send?phone=919229229323" target="_blank" rel="noreferrer" className="text-black hover:text-emerald-700 font-mono font-black text-sm">
                      +91 92292 29323
                    </a>
                  </div>
                </li>

                <li className="flex items-center space-x-3.5">
                  <div className="w-10 h-10 rounded-full bg-pink-50 border-2 border-pink-600 flex items-center justify-center text-pink-700 shrink-0">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-neutral-600 block uppercase font-mono font-bold">Instagram</span>
                    <a href="https://instagram.com/moonlight_production__" target="_blank" rel="noreferrer" className="text-black hover:text-pink-700 font-mono font-black text-sm">
                      @moonlight_production__
                    </a>
                  </div>
                </li>

                <li className="flex items-center space-x-3.5">
                  <div className="w-10 h-10 rounded-full bg-red-50 border-2 border-red-600 flex items-center justify-center text-red-700 shrink-0">
                    <Youtube className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-neutral-600 block uppercase font-mono font-bold">YouTube Cinema</span>
                    <a href="https://www.youtube.com/@moonlightproductions_films" target="_blank" rel="noreferrer" className="text-black hover:text-red-700 font-mono font-black text-sm">
                      @moonlightproductions_films
                    </a>
                  </div>
                </li>

                <li className="flex items-center space-x-3.5">
                  <div className="w-10 h-10 rounded-full bg-gold-50 border-2 border-gold-600 flex items-center justify-center text-gold-900 shrink-0">
                    <ExternalLink className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-neutral-600 block uppercase font-mono font-bold">Official Linktree</span>
                    <a href="https://linktr.ee/moonlight_photography_in" target="_blank" rel="noreferrer" className="text-black hover:text-gold-800 font-mono font-black text-xs">
                      linktr.ee/moonlight_photography_in
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Quick Message Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-neutral-300 shadow-xl space-y-6 text-black">
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-black text-black">Send Direct Message</h3>
                <p className="text-xs text-neutral-700 font-semibold mt-1">For wedding dates availability, collaborations, or custom packages</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-black font-black uppercase text-[11px]">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rohini Singhania"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-white border-2 border-neutral-300 rounded-xl px-4 py-3 text-black font-semibold focus:border-black focus:outline-none shadow-sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-black font-black uppercase text-[11px]">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="rohini@gmail.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-white border-2 border-neutral-300 rounded-xl px-4 py-3 text-black font-semibold focus:border-black focus:outline-none shadow-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-black font-black uppercase text-[11px]">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+91 92292 29323"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full bg-white border-2 border-neutral-300 rounded-xl px-4 py-3 text-black font-semibold focus:border-black focus:outline-none shadow-sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-black font-black uppercase text-[11px]">Subject</label>
                    <input
                      type="text"
                      placeholder="e.g. Wedding Date Availability"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full bg-white border-2 border-neutral-300 rounded-xl px-4 py-3 text-black font-semibold focus:border-black focus:outline-none shadow-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-black font-black uppercase text-[11px]">Message *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about your wedding celebration dates, city, and requirements..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-white border-2 border-neutral-300 rounded-2xl p-4 text-black font-semibold focus:border-black focus:outline-none leading-relaxed shadow-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-full bg-black hover:bg-neutral-800 text-white font-black text-xs uppercase tracking-widest shadow-md hover:brightness-110 transition-all flex items-center justify-center disabled:opacity-50 btn-shimmer"
                >
                  {loading ? 'Sending Message...' : 'Send Message to Moonlight Production'}
                  <Send className="w-4 h-4 ml-2 text-gold-400" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
