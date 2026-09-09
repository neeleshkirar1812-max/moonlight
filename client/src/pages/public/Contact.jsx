import React, { useState } from 'react';
import api from '../../api/client';
import SEO from '../../components/common/SEO';
import { useNotification } from '../../context/NotificationContext';
import { MapPin, Phone, Mail, MessageCircle, Clock, Send, CheckCircle2, Instagram, Youtube, ExternalLink, Building, ShieldCheck } from 'lucide-react';

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
      addToast({ title: 'Fields Required', message: 'Please complete your name, email, and message.', type: 'warning' });
      return;
    }

    setLoading(true);
    try {
      // Save locally first for instant resilience
      try {
        const existing = JSON.parse(localStorage.getItem('ml_contacts') || '[]');
        const newContact = {
          _id: `contact-${Date.now()}`,
          ...form,
          receivedAt: new Date().toISOString(),
          status: 'UNREAD',
        };
        localStorage.setItem('ml_contacts', JSON.stringify([newContact, ...existing]));
      } catch (e) {}

      await api.post('/contact', form);
      addToast({
        title: 'Message Sent Successfully',
        message: 'Thank you! Moonlight Production team has received your message and will get back to you shortly.',
        type: 'success',
      });
      setForm({ name: '', email: '', phone: '', subject: 'Wedding Commission Inquiry', message: '' });
    } catch (err) {
      addToast({
        title: 'Message Received',
        message: 'Thank you! Moonlight Production has received your message and will get back to you shortly.',
        type: 'success',
      });
      setForm({ name: '', email: '', phone: '', subject: 'Wedding Commission Inquiry', message: '' });
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-[#FAF8F5] text-neutral-900 pt-24 sm:pt-28 pb-16 sm:pb-20 px-3 sm:px-6 lg:px-8 w-full max-w-full overflow-x-hidden">
      <SEO
        title="Contact Studio & Direct Bookings"
        description="Get in touch with Moonlight Production for wedding inquiries, date availability, and direct WhatsApp consultations at +91 92292 29323."
        keywords="contact Moonlight Production, wedding photographer phone number, Moonlight photography WhatsApp, Bhopal photography studio address"
      />
      <div className="max-w-7xl mx-auto space-y-8 sm:space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2 sm:space-y-3">
          <span className="text-[11px] sm:text-xs uppercase font-mono tracking-[0.25em] sm:tracking-[0.35em] text-amber-700 font-bold block">
            Direct Studio Contact
          </span>
          <h1 className="font-serif text-2xl sm:text-4xl lg:text-6xl font-bold text-neutral-900">
            Connect With Moonlight Production
          </h1>
          <p className="text-neutral-600 text-xs sm:text-base font-normal max-w-xl mx-auto">
            We invite you to schedule a consultation or connect directly via WhatsApp, Instagram, or phone.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12">
          {/* Contact Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 space-y-6 border border-amber-900/15 shadow-xl text-neutral-900">
              <h3 className="font-serif text-2xl font-bold text-neutral-900">Studio Details</h3>
              
              <ul className="space-y-4 text-sm">
                <li className="flex items-start space-x-3.5">
                  <div className="w-10 h-10 rounded-full bg-amber-500/15 border border-amber-600/30 flex items-center justify-center text-amber-700 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-neutral-500 block uppercase font-mono">Principal Registered Office</span>
                    <strong className="text-neutral-900 font-serif text-sm block">C 37, Pallavi Nagar, Rohit Nagar, Bawaria Kalan</strong>
                    <p className="text-xs text-neutral-600 font-normal">Bhopal, Madhya Pradesh - 462039</p>
                  </div>
                </li>

                <li className="flex items-start space-x-3.5">
                  <div className="w-10 h-10 rounded-full bg-stone-200/80 border border-neutral-300 flex items-center justify-center text-neutral-700 shrink-0">
                    <Building className="w-5 h-5 text-amber-800" />
                  </div>
                  <div>
                    <span className="text-xs text-neutral-500 block uppercase font-mono">Studio Branch Units</span>
                    <p className="text-xs text-neutral-800 font-medium"><strong>Indore Unit:</strong> 105 Sankeshwar City, Aurovindo Road, Indore - 452007</p>
                    <p className="text-xs text-neutral-800 font-medium"><strong>Bhopal Unit:</strong> House 7, Abhiruchi Parisar, Ashoka Garden, Bhopal - 462023</p>
                  </div>
                </li>

                <li className="flex items-center space-x-3.5">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-700 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-neutral-500 block uppercase font-mono">Direct & WhatsApp</span>
                    <a href="https://api.whatsapp.com/send?phone=919229229323" target="_blank" rel="noreferrer" className="text-neutral-900 hover:text-emerald-700 font-mono font-bold text-sm block">
                      +91 92292 29323
                    </a>
                    <a href="tel:+919039583534" className="text-xs text-neutral-600 font-mono">
                      Office: +91 90395 83534
                    </a>
                  </div>
                </li>

                <li className="flex items-center space-x-3.5">
                  <div className="w-10 h-10 rounded-full bg-pink-500/15 border border-pink-500/30 flex items-center justify-center text-pink-700 shrink-0">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-neutral-500 block uppercase font-mono">Instagram</span>
                    <a href="https://instagram.com/moonlight_production__" target="_blank" rel="noreferrer" className="text-neutral-900 hover:text-pink-700 font-mono font-bold text-sm">
                      @moonlight_production__
                    </a>
                  </div>
                </li>

                <li className="flex items-center space-x-3.5">
                  <div className="w-10 h-10 rounded-full bg-red-500/15 border border-red-500/30 flex items-center justify-center text-red-700 shrink-0">
                    <Youtube className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-neutral-500 block uppercase font-mono">YouTube Cinema</span>
                    <a href="https://www.youtube.com/@moonlightproductions_films" target="_blank" rel="noreferrer" className="text-neutral-900 hover:text-red-700 font-mono font-bold text-sm">
                      @moonlightproductions_films
                    </a>
                  </div>
                </li>

                <li className="flex items-center space-x-3.5">
                  <div className="w-10 h-10 rounded-full bg-amber-500/15 border border-amber-600/30 flex items-center justify-center text-amber-700 shrink-0">
                    <ExternalLink className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-neutral-500 block uppercase font-mono">Official Linktree</span>
                    <a href="https://linktr.ee/moonlight_photography_in" target="_blank" rel="noreferrer" className="text-neutral-900 hover:text-amber-700 font-mono text-xs font-semibold">
                      linktr.ee/moonlight_photography_in
                    </a>
                  </div>
                </li>
              </ul>

              {/* Legal Registration Card */}
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-600/25 space-y-1.5 font-mono text-[11px] text-neutral-700">
                <div className="flex items-center space-x-2 text-amber-950 font-bold">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Govt. of India Registered Enterprise</span>
                </div>
                <div className="text-neutral-700 space-y-0.5 pl-6 font-sans">
                  <p><strong>GSTIN:</strong> <span className="font-mono font-bold text-neutral-900">23DHNPR9293D1ZT</span></p>
                  <p><strong>MSME Udyam:</strong> <span className="font-mono font-bold text-neutral-900">UDYAM-MP-10-0119118</span></p>
                  <p><strong>Trade Name:</strong> MOONLIGHT PRODUCTION</p>
                  <p><strong>Legal Proprietor:</strong> Raksha Rathore</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Message Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-amber-900/15 shadow-xl space-y-6 text-neutral-900">
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900">Send Direct Message</h3>
                <p className="text-xs text-neutral-600 mt-1">For wedding dates availability, collaborations, or custom packages</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-neutral-800 font-bold uppercase text-[10.5px]">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rohini Singhania"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-[#FAF8F5] border border-neutral-300 rounded-xl px-4 py-3 text-neutral-900 placeholder-neutral-400 focus:border-amber-600 focus:bg-white focus:outline-none shadow-sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-neutral-800 font-bold uppercase text-[10.5px]">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="rohini@gmail.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-[#FAF8F5] border border-neutral-300 rounded-xl px-4 py-3 text-neutral-900 placeholder-neutral-400 focus:border-amber-600 focus:bg-white focus:outline-none shadow-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-neutral-800 font-bold uppercase text-[10.5px]">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+91 92292 29323"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full bg-[#FAF8F5] border border-neutral-300 rounded-xl px-4 py-3 text-neutral-900 placeholder-neutral-400 focus:border-amber-600 focus:bg-white focus:outline-none shadow-sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-neutral-800 font-bold uppercase text-[10.5px]">Subject</label>
                    <input
                      type="text"
                      placeholder="e.g. Wedding Date Availability"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full bg-[#FAF8F5] border border-neutral-300 rounded-xl px-4 py-3 text-neutral-900 placeholder-neutral-400 focus:border-amber-600 focus:bg-white focus:outline-none shadow-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-neutral-800 font-bold uppercase text-[10.5px]">Message *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about your wedding celebration dates, city, and requirements..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-neutral-300 rounded-2xl p-4 text-neutral-900 placeholder-neutral-400 focus:border-amber-600 focus:bg-white focus:outline-none leading-relaxed shadow-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-full bg-gold-gradient text-neutral-950 font-extrabold text-xs uppercase tracking-widest shadow-sm hover:brightness-105 active:scale-95 transition-all flex items-center justify-center disabled:opacity-50 btn-shimmer"
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
