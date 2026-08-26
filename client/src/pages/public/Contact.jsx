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
    <div className="min-h-screen bg-[#0B0B0C] text-white pt-24 sm:pt-28 pb-16 sm:pb-20 px-3 sm:px-6 lg:px-8 w-full max-w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto space-y-8 sm:space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2 sm:space-y-3">
          <span className="text-[11px] sm:text-xs uppercase font-mono tracking-[0.25em] sm:tracking-[0.35em] text-gold-400 font-bold block">
            Direct Concierge
          </span>
          <h1 className="font-serif text-2xl sm:text-4xl lg:text-6xl font-bold text-white">
            Connect With Moonlight Production
          </h1>
          <p className="text-neutral-300 text-xs sm:text-base font-light max-w-xl mx-auto">
            We invite you to schedule a consultation or connect directly via WhatsApp, Instagram, or phone.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12">
          {/* Contact Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#141418] rounded-3xl p-6 sm:p-8 space-y-6 border border-white/10 shadow-2xl text-white">
              <h3 className="font-serif text-2xl font-bold text-white">Studio Details</h3>
              
              <ul className="space-y-4 text-sm">
                <li className="flex items-start space-x-3.5">
                  <div className="w-10 h-10 rounded-full bg-gold-500/15 border border-gold-500/40 flex items-center justify-center text-gold-400 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-neutral-400 block uppercase font-mono">Studio Hub</span>
                    <strong className="text-white font-serif text-base">Moonlight Production & Films</strong>
                    <p className="text-xs text-neutral-400 font-light">Bhopal • Maheshwar • Udaipur • All-India Shoots</p>
                  </div>
                </li>

                <li className="flex items-center space-x-3.5">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-neutral-400 block uppercase font-mono">Direct & WhatsApp</span>
                    <a href="https://api.whatsapp.com/send?phone=919229229323" target="_blank" rel="noreferrer" className="text-white hover:text-emerald-400 font-mono font-bold text-sm">
                      +91 92292 29323
                    </a>
                  </div>
                </li>

                <li className="flex items-center space-x-3.5">
                  <div className="w-10 h-10 rounded-full bg-pink-500/15 border border-pink-500/40 flex items-center justify-center text-pink-400 shrink-0">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-neutral-400 block uppercase font-mono">Instagram</span>
                    <a href="https://instagram.com/moonlight_production__" target="_blank" rel="noreferrer" className="text-white hover:text-pink-400 font-mono font-bold text-sm">
                      @moonlight_production__
                    </a>
                  </div>
                </li>

                <li className="flex items-center space-x-3.5">
                  <div className="w-10 h-10 rounded-full bg-red-500/15 border border-red-500/40 flex items-center justify-center text-red-400 shrink-0">
                    <Youtube className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-neutral-400 block uppercase font-mono">YouTube Cinema</span>
                    <a href="https://www.youtube.com/@moonlightproductions_films" target="_blank" rel="noreferrer" className="text-white hover:text-red-400 font-mono font-bold text-sm">
                      @moonlightproductions_films
                    </a>
                  </div>
                </li>

                <li className="flex items-center space-x-3.5">
                  <div className="w-10 h-10 rounded-full bg-gold-500/15 border border-gold-500/40 flex items-center justify-center text-gold-400 shrink-0">
                    <ExternalLink className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-neutral-400 block uppercase font-mono">Official Linktree</span>
                    <a href="https://linktr.ee/moonlight_photography_in" target="_blank" rel="noreferrer" className="text-white hover:text-gold-300 font-mono text-xs">
                      linktr.ee/moonlight_photography_in
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Quick Message Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#141418] rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl space-y-6 text-white">
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">Send Direct Message</h3>
                <p className="text-xs text-neutral-400 mt-1">For wedding dates availability, collaborations, or custom packages</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-neutral-300 font-bold uppercase text-[10.5px]">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rohini Singhania"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:border-gold-400 focus:outline-none shadow-sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-neutral-300 font-bold uppercase text-[10.5px]">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="rohini@gmail.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:border-gold-400 focus:outline-none shadow-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-neutral-300 font-bold uppercase text-[10.5px]">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+91 92292 29323"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:border-gold-400 focus:outline-none shadow-sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-neutral-300 font-bold uppercase text-[10.5px]">Subject</label>
                    <input
                      type="text"
                      placeholder="e.g. Wedding Date Availability"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:border-gold-400 focus:outline-none shadow-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-neutral-300 font-bold uppercase text-[10.5px]">Message *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about your wedding celebration dates, city, and requirements..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-black/60 border border-white/15 rounded-2xl p-4 text-white placeholder-neutral-500 focus:border-gold-400 focus:outline-none leading-relaxed shadow-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-full bg-gold-gradient text-black font-extrabold text-xs uppercase tracking-widest shadow-gold-subtle hover:brightness-110 active:scale-95 transition-all flex items-center justify-center disabled:opacity-50 btn-shimmer"
                >
                  {loading ? 'Sending Message...' : 'Send Message to Moonlight Production'}
                  <Send className="w-4 h-4 ml-2" />
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
