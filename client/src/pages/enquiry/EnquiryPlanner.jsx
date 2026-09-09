import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/client';
import { useNotification } from '../../context/NotificationContext';
import {
  Calendar,
  MapPin,
  Users,
  Camera,
  DollarSign,
  FileText,
  User,
  CheckCircle2,
  Sparkles,
  MessageCircle,
  Phone,
  Mail,
  ShieldCheck,
  HeartHandshake,
  Clock,
  ArrowRight,
} from 'lucide-react';

const eventTypeOptions = [
  { id: 'Royal Wedding', title: 'Royal / Heritage Wedding', desc: 'Full wedding celebrations with grand ceremony', icon: '👑' },
  { id: 'Pre-Wedding', title: 'Pre-Wedding Shoot', desc: 'Cinematic portraiture in heritage/exotic locations', icon: '✨' },
  { id: 'Destination Wedding', title: 'Destination Wedding', desc: 'All-India / International palace celebration', icon: '✈️' },
  { id: 'Wedding Film', title: 'Cinematic Wedding Film', desc: '4K docu-film and signature teaser trailer', icon: '🎬' },
  { id: 'Couple Shoot', title: 'Intimate Couple Session', desc: 'Romantic chemistry and sunset moments', icon: '🥂' },
  { id: 'Royal Event', title: 'Sangeet / Reception / Event', desc: 'Milestone ceremonies & gala celebrations', icon: '🎆' },
];

const serviceOptions = [
  { id: 'Royal Candid & Traditional Photography', label: 'Royal Candid & Traditional Photography', desc: 'Master Sony Alpha portraits & family candids' },
  { id: '4K Cinematic Wedding Docu-Films', label: '4K Cinematic Wedding Films', desc: 'Sony FX6 cinema-grade wedding movie' },
  { id: 'Pre-Wedding Destination Shoot', label: 'Pre-Wedding Destination Shoot', desc: 'Heritage locations, palace & ghat sessions' },
  { id: '4K Drone & Aerial Cinematography', label: '4K Drone & Aerial Cinematography', desc: 'Cinematic FPV and palace drone coverage' },
  { id: 'Handcrafted Italian Leather Albums', label: 'Handcrafted Italian Leather Albums', desc: 'Heirloom archival flush-mount photo books' },
  { id: 'Same-Day Edit Instagram Reels', label: 'Same-Day Edit Instagram Reels', desc: 'Instant viral reels for social media on event night' },
  { id: '4K Live YouTube / Satellite Streaming', label: '4K Live YouTube / Satellite Streaming', desc: 'Multi-cam broadcast for relatives worldwide' },
];

const guestTierOptions = [
  { label: '50 - 150', desc: 'Intimate Ceremony' },
  { label: '150 - 300', desc: 'Medium Gathering' },
  { label: '300 - 600', desc: 'Grand Wedding' },
  { label: '600+', desc: 'Royal Palace Scale' },
];

const budgetOptions = [
  { label: '₹50K – ₹1 Lakh', desc: 'Single function / Pre-wedding session' },
  { label: '₹1 Lakh – ₹2 Lakh', desc: 'Full-day Photography & Cinema' },
  { label: '₹2 Lakh – ₹5 Lakh', desc: '2-3 Days Royal Wedding Package' },
  { label: '₹5 Lakh+', desc: 'Grand Royal Palace / Destination Archive' },
  { label: 'Flexible / Recommend Package', desc: 'Custom package based on discussion' },
];

const EnquiryPlanner = () => {
  const [formData, setFormData] = useState({
    eventType: 'Royal Wedding',
    eventDate: '',
    eventEndDate: '',
    city: '',
    state: '',
    country: 'India',
    venue: '',
    guestTier: '150 - 300',
    guestCount: 250,
    requiredServices: [
      'Royal Candid & Traditional Photography',
      '4K Cinematic Wedding Docu-Films',
    ],
    budgetRange: '₹2 Lakh – ₹5 Lakh',
    storyDetails: '',
    fullName: '',
    email: '',
    phone: '',
    whatsappNumber: '',
  });

  const [loading, setLoading] = useState(false);
  const [submittedEnquiry, setSubmittedEnquiry] = useState(null);
  const { addToast } = useNotification();

  const toggleService = (serviceId) => {
    if (formData.requiredServices.includes(serviceId)) {
      setFormData({
        ...formData,
        requiredServices: formData.requiredServices.filter((s) => s !== serviceId),
      });
    } else {
      setFormData({
        ...formData,
        requiredServices: [...formData.requiredServices, serviceId],
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.fullName.trim()) {
      addToast({ title: 'Full Name Required', message: 'Please enter bride/groom or contact person name.', type: 'warning' });
      return;
    }
    if (!formData.phone.trim()) {
      addToast({ title: 'Phone Number Required', message: 'Please enter your phone/WhatsApp number.', type: 'warning' });
      return;
    }
    if (!formData.eventDate) {
      addToast({ title: 'Event Date Required', message: 'Please select your tentative wedding/event date.', type: 'warning' });
      return;
    }
    if (!formData.city.trim() || !formData.venue.trim()) {
      addToast({ title: 'City & Venue Required', message: 'Please provide wedding city and venue name.', type: 'warning' });
      return;
    }
    if (formData.requiredServices.length === 0) {
      addToast({ title: 'Select Services', message: 'Please select at least one required service.', type: 'warning' });
      return;
    }

    setLoading(true);
    try {
      const payload = {
        eventType: formData.eventType,
        eventDate: formData.eventDate,
        eventEndDate: formData.eventEndDate || undefined,
        location: {
          city: formData.city.trim(),
          state: formData.state.trim() || undefined,
          country: formData.country || 'India',
          venue: formData.venue.trim(),
        },
        guestCount: formData.guestCount || 250,
        guestTier: formData.guestTier,
        requiredServices: formData.requiredServices,
        budgetRange: formData.budgetRange,
        storyDetails: formData.storyDetails,
        leadSource: (() => {
          const params = new URLSearchParams(window.location.search);
          const src = params.get('utm_source') || params.get('source') || 'Website 1-Page Form';
          if (src.toLowerCase().includes('insta')) return 'Instagram Ads';
          if (src.toLowerCase().includes('google') || src.toLowerCase().includes('ad')) return 'Google Ads';
          if (src.toLowerCase().includes('whats')) return 'WhatsApp Direct';
          return 'Website Form';
        })(),
        customerDetails: {
          fullName: formData.fullName.trim(),
          email: formData.email.trim() || `${formData.phone.replace(/[^\d]/g, '')}@moonlightclients.in`,
          phone: formData.phone.trim(),
          whatsappNumber: formData.whatsappNumber.trim() || formData.phone.trim(),
        },
      };

      const res = await api.post('/enquiries', payload);
      const enq = res?.data?.data || res?.data || res;
      setSubmittedEnquiry(enq);
      addToast({
        title: 'Enquiry Received ❤️',
        message: `Your reference ID is ${enq?.enquiryId || 'ENQ-2026'}. We will connect with you shortly!`,
        type: 'success',
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      addToast({
        title: 'Submission Failed',
        message: err.message || 'Unable to submit enquiry. Please try WhatsApp directly.',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  // SUCCESS CONFIRMATION SCREEN
  if (submittedEnquiry) {
    const waText = encodeURIComponent(
      `Hello Moonlight Production, I have just submitted my wedding enquiry (ID: ${submittedEnquiry.enquiryId || 'ENQ'}) for ${submittedEnquiry.eventType} on ${new Date(submittedEnquiry.eventDate).toLocaleDateString()}. Please share availability & custom quotation!`
    );
    const waUrl = `https://wa.me/919229229323?text=${waText}`;

    return (
      <div className="min-h-screen bg-[#FAF8F5] pt-28 pb-20 px-4 flex items-center justify-center relative">
        <div className="max-w-2xl w-full bg-white border border-amber-900/15 rounded-3xl p-6 sm:p-12 shadow-2xl relative overflow-hidden text-center animate-fade-in text-neutral-900">
          <div className="w-20 h-20 mx-auto rounded-full bg-emerald-50 border border-emerald-300 flex items-center justify-center text-emerald-700 mb-6 shadow-sm">
            <HeartHandshake className="w-10 h-10" />
          </div>

          <span className="text-[11px] uppercase font-mono tracking-widest text-emerald-700 font-bold block mb-1">
            Enquiry Successfully Submitted
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-neutral-900 font-bold mb-2">
            Your Wedding Dates Are Registered!
          </h2>
          <p className="text-amber-800 text-xs sm:text-sm tracking-widest uppercase mb-6 font-mono font-bold">
            Reference ID:{' '}
            <span className="font-mono font-bold text-neutral-900 bg-amber-100 px-3.5 py-1 rounded-full border border-amber-400">
              {submittedEnquiry.enquiryId || 'ENQ-CONFIRMED'}
            </span>
          </p>

          <p className="text-neutral-600 text-sm leading-relaxed mb-6 max-w-lg mx-auto font-normal">
            Thank you, <strong className="text-neutral-900">{submittedEnquiry.customerDetails?.fullName}</strong>. Our senior director is reviewing your dates for{' '}
            <strong className="text-amber-800">{submittedEnquiry.location?.city}</strong>. We will share your custom pricing and proposal within 24 hours.
          </p>

          {/* Key Summary Box */}
          <div className="bg-[#FAF8F5] rounded-2xl p-5 border border-amber-900/15 text-left mb-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-neutral-500 block">Event Type:</span>
              <strong className="text-neutral-900 font-bold text-sm">{submittedEnquiry.eventType}</strong>
            </div>
            <div>
              <span className="text-neutral-500 block">Wedding Date:</span>
              <strong className="text-neutral-900 font-bold text-sm">
                {submittedEnquiry.eventDate ? new Date(submittedEnquiry.eventDate).toLocaleDateString('en-IN', { dateStyle: 'medium' }) : 'As requested'}
              </strong>
            </div>
            <div>
              <span className="text-neutral-500 block">Venue & City:</span>
              <strong className="text-neutral-900 font-bold text-sm">
                {submittedEnquiry.location?.venue}, {submittedEnquiry.location?.city}
              </strong>
            </div>
            <div>
              <span className="text-neutral-500 block">Selected Services:</span>
              <strong className="text-amber-800 font-bold text-sm">
                {submittedEnquiry.requiredServices?.length || 2} Services Configured
              </strong>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={waUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Chat on WhatsApp Now
            </a>
            <Link
              to="/portfolio"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-white border border-neutral-300 text-neutral-800 hover:text-amber-700 hover:border-amber-600 font-semibold text-xs uppercase tracking-wider transition-all shadow-sm"
            >
              View Photo & Film Portfolio
            </Link>
            <Link
              to="/login"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-gold-gradient text-neutral-950 font-extrabold text-xs uppercase tracking-wider shadow-sm hover:brightness-105 transition-all btn-shimmer"
            >
              Couple Portal Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 1-PAGE WEDDING BOOKING & COST ENQUIRY FORM
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-neutral-900 pt-24 sm:pt-28 pb-16 sm:pb-24 px-3 sm:px-6 lg:px-8 w-full max-w-full overflow-x-hidden">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Page Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-600/30 text-amber-800 text-[11px] font-mono font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>Direct Wedding Booking & Date Availability</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-neutral-900 leading-tight">
            Book Your Wedding Shoot
          </h1>
          <p className="text-neutral-600 text-xs sm:text-base max-w-xl mx-auto font-normal">
            Fill in your wedding details below in this fast 1-page form. Our directors will check calendar availability and formulate your custom luxury quotation.
          </p>

          {/* Instant WhatsApp Banner */}
          <div className="pt-2">
            <a
              href="https://api.whatsapp.com/send?phone=919229229323&text=Hello%20Moonlight%20Production,%20I%20want%20to%20inquire%20about%20wedding%20photography%20and%20cinema%20dates."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center space-x-2 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 px-4 py-2 rounded-full transition-all shadow-sm"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>Need Urgent Booking? Chat Directly on WhatsApp: +91 92292 29323</span>
            </a>
          </div>
        </div>

        {/* The 1-Page Form Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* SECTION 1: CONTACT DETAILS */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-900/15 shadow-xl space-y-6">
            <div className="flex items-center space-x-3 border-b border-amber-900/10 pb-4">
              <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-900 font-mono font-bold text-xs flex items-center justify-center border border-amber-300">
                1
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-neutral-900 flex items-center gap-2">
                  <User className="w-4 h-4 text-amber-700" />
                  Bride / Groom & Contact Details
                </h3>
                <p className="text-xs text-neutral-500">How should our team reach out to you?</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="space-y-1.5">
                <label className="text-neutral-800 font-bold uppercase text-[10.5px]">
                  Bride & Groom Name(s) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aarav Singhania & Ananya"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full bg-[#FAF8F5] border border-neutral-300 rounded-xl px-4 py-3 text-neutral-900 placeholder-neutral-400 focus:border-amber-600 focus:bg-white focus:outline-none shadow-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-neutral-800 font-bold uppercase text-[10.5px]">
                  Phone / Calling Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98200 12345"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-[#FAF8F5] border border-neutral-300 rounded-xl px-4 py-3 text-neutral-900 placeholder-neutral-400 focus:border-amber-600 focus:bg-white focus:outline-none shadow-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-neutral-800 font-bold uppercase text-[10.5px]">
                  WhatsApp Number (If Different)
                </label>
                <input
                  type="tel"
                  placeholder="+91 98200 12345"
                  value={formData.whatsappNumber}
                  onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                  className="w-full bg-[#FAF8F5] border border-neutral-300 rounded-xl px-4 py-3 text-neutral-900 placeholder-neutral-400 focus:border-amber-600 focus:bg-white focus:outline-none shadow-sm"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-3">
                <label className="text-neutral-800 font-bold uppercase text-[10.5px]">
                  Email Address (For Official PDF Quotation)
                </label>
                <input
                  type="email"
                  placeholder="aarav.ananya@gmail.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#FAF8F5] border border-neutral-300 rounded-xl px-4 py-3 text-neutral-900 placeholder-neutral-400 focus:border-amber-600 focus:bg-white focus:outline-none shadow-sm"
                />
              </div>
            </div>
          </div>

          {/* SECTION 2: CELEBRATION & WEDDING DETAILS */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-900/15 shadow-xl space-y-6">
            <div className="flex items-center space-x-3 border-b border-amber-900/10 pb-4">
              <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-900 font-mono font-bold text-xs flex items-center justify-center border border-amber-300">
                2
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-neutral-900 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-amber-700" />
                  Celebration Format & Wedding Dates
                </h3>
                <p className="text-xs text-neutral-500">Tell us where and when your wedding will happen</p>
              </div>
            </div>

            {/* Event Format Selection Cards */}
            <div className="space-y-2">
              <label className="text-neutral-800 font-bold uppercase text-[10.5px] block">
                Select Event Type *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {eventTypeOptions.map((opt) => {
                  const isSelected = formData.eventType === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, eventType: opt.id })}
                      className={`text-left p-3.5 rounded-2xl border transition-all flex items-start space-x-3 ${
                        isSelected
                          ? 'bg-amber-100/80 border-amber-600 text-neutral-900 shadow-sm ring-1 ring-amber-500'
                          : 'bg-[#FAF8F5] border-neutral-200 text-neutral-700 hover:border-amber-400 hover:bg-white'
                      }`}
                    >
                      <span className="text-2xl mt-0.5">{opt.icon}</span>
                      <div>
                        <h4 className="text-xs font-bold text-neutral-900">{opt.title}</h4>
                        <p className="text-[11px] text-neutral-500 mt-0.5 leading-snug">{opt.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Dates & Location Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs pt-2">
              <div className="space-y-1.5">
                <label className="text-neutral-800 font-bold uppercase text-[10.5px]">
                  Event Start Date *
                </label>
                <input
                  type="date"
                  required
                  value={formData.eventDate}
                  onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full bg-[#FAF8F5] border border-neutral-300 rounded-xl px-4 py-3 text-neutral-900 focus:border-amber-600 focus:bg-white focus:outline-none shadow-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-neutral-800 font-bold uppercase text-[10.5px]">
                  Event End Date (Optional)
                </label>
                <input
                  type="date"
                  value={formData.eventEndDate}
                  onChange={(e) => setFormData({ ...formData, eventEndDate: e.target.value })}
                  min={formData.eventDate || new Date().toISOString().split('T')[0]}
                  className="w-full bg-[#FAF8F5] border border-neutral-300 rounded-xl px-4 py-3 text-neutral-900 focus:border-amber-600 focus:bg-white focus:outline-none shadow-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-neutral-800 font-bold uppercase text-[10.5px]">
                  City / Destination *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Udaipur, Maheshwar, Bhopal"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full bg-[#FAF8F5] border border-neutral-300 rounded-xl px-4 py-3 text-neutral-900 placeholder-neutral-400 focus:border-amber-600 focus:bg-white focus:outline-none shadow-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-neutral-800 font-bold uppercase text-[10.5px]">
                  Venue / Palace / Resort *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Udaivilas, Ahilya Fort, Jehan Numa"
                  value={formData.venue}
                  onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                  className="w-full bg-[#FAF8F5] border border-neutral-300 rounded-xl px-4 py-3 text-neutral-900 placeholder-neutral-400 focus:border-amber-600 focus:bg-white focus:outline-none shadow-sm"
                />
              </div>
            </div>

            {/* Guest Scale */}
            <div className="space-y-2 pt-2">
              <label className="text-neutral-800 font-bold uppercase text-[10.5px] block">
                Estimated Guest Count:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {guestTierOptions.map((tier) => {
                  const isSelected = formData.guestTier === tier.label;
                  return (
                    <button
                      key={tier.label}
                      type="button"
                      onClick={() => setFormData({ ...formData, guestTier: tier.label })}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        isSelected
                          ? 'bg-amber-100 border-amber-600 text-neutral-900 font-bold shadow-sm ring-1 ring-amber-500'
                          : 'bg-[#FAF8F5] border-neutral-200 text-neutral-700 hover:border-amber-300 hover:bg-white'
                      }`}
                    >
                      <span className="font-mono font-bold text-xs text-neutral-900 block">{tier.label}</span>
                      <span className="text-[10.5px] text-neutral-500 block">{tier.desc}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* SECTION 3: SERVICES DESIRED */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-900/15 shadow-xl space-y-6">
            <div className="flex items-center space-x-3 border-b border-amber-900/10 pb-4">
              <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-900 font-mono font-bold text-xs flex items-center justify-center border border-amber-300">
                3
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-neutral-900 flex items-center gap-2">
                  <Camera className="w-4 h-4 text-amber-700" />
                  Select Desired Services
                </h3>
                <p className="text-xs text-neutral-500">Multi-select all deliverables you desire for your wedding shoot</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {serviceOptions.map((srv) => {
                const isSelected = formData.requiredServices.includes(srv.id);
                return (
                  <button
                    key={srv.id}
                    type="button"
                    onClick={() => toggleService(srv.id)}
                    className={`text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-amber-100/90 border-amber-600 text-neutral-900 font-bold shadow-sm ring-1 ring-amber-500'
                        : 'bg-[#FAF8F5] border-neutral-200 text-neutral-700 hover:border-amber-300 hover:bg-white'
                    }`}
                  >
                    <div>
                      <h4 className="text-xs font-bold text-neutral-900">{srv.label}</h4>
                      <p className="text-[10.5px] text-neutral-500 mt-0.5">{srv.desc}</p>
                    </div>
                    {isSelected ? (
                      <CheckCircle2 className="w-5 h-5 text-amber-700 shrink-0 ml-2" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border border-neutral-300 shrink-0 ml-2" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* SECTION 4: BUDGET & SPECIAL NOTES */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-900/15 shadow-xl space-y-6">
            <div className="flex items-center space-x-3 border-b border-amber-900/10 pb-4">
              <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-900 font-mono font-bold text-xs flex items-center justify-center border border-amber-300">
                4
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-neutral-900 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-amber-700" />
                  Budget Range & Vision
                </h3>
                <p className="text-xs text-neutral-500">Helps us curate the right crew size and camera gear package</p>
              </div>
            </div>

            {/* Budget Options */}
            <div className="space-y-2">
              <label className="text-neutral-800 font-bold uppercase text-[10.5px] block">
                Estimated Budget Range:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {budgetOptions.map((tier) => {
                  const isSelected = formData.budgetRange === tier.label;
                  return (
                    <button
                      key={tier.label}
                      type="button"
                      onClick={() => setFormData({ ...formData, budgetRange: tier.label })}
                      className={`text-left p-3.5 rounded-2xl border transition-all ${
                        isSelected
                          ? 'bg-amber-100/90 border-amber-600 text-neutral-900 font-bold shadow-sm ring-1 ring-amber-500'
                          : 'bg-[#FAF8F5] border-neutral-200 text-neutral-700 hover:border-amber-300 hover:bg-white'
                      }`}
                    >
                      <h4 className="text-xs font-bold text-amber-900 font-mono">{tier.label}</h4>
                      <p className="text-[10.5px] text-neutral-500 mt-0.5 leading-snug">{tier.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Story / Special Notes */}
            <div className="space-y-1.5 pt-2">
              <label className="text-neutral-800 font-bold uppercase text-[10.5px] flex items-center justify-between">
                <span>Special Requests / Wedding Theme (Optional)</span>
                <span className="text-neutral-400 font-normal lowercase">e.g. theme, rituals, specific song inspirations</span>
              </label>
              <textarea
                rows={3}
                placeholder="Share any special vision, destination details, cultural ceremonies, or preferred visual aesthetic..."
                value={formData.storyDetails}
                onChange={(e) => setFormData({ ...formData, storyDetails: e.target.value })}
                className="w-full bg-[#FAF8F5] border border-neutral-300 rounded-2xl p-4 text-neutral-900 text-xs focus:border-amber-600 focus:bg-white focus:outline-none leading-relaxed shadow-sm"
              />
            </div>
          </div>

          {/* SUBMIT BUTTON & TRUST BADGES */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-900/15 shadow-xl text-center space-y-5">
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto min-w-[280px] inline-flex items-center justify-center px-8 sm:px-12 py-4 rounded-full bg-gold-gradient text-neutral-950 text-sm uppercase tracking-widest font-extrabold shadow-lg hover:brightness-105 active:scale-95 transition-all disabled:opacity-50 btn-shimmer"
            >
              {loading ? (
                <span>Submitting Your Enquiry...</span>
              ) : (
                <>
                  <span>Submit Wedding Enquiry & Check Dates</span>
                  <Sparkles className="w-4 h-4 ml-2 text-neutral-950" />
                </>
              )}
            </button>

            <p className="text-[11px] text-neutral-500 font-normal max-w-md mx-auto">
              By submitting, your date inquiry will be logged with Moonlight Production. We respect your privacy and never spam.
            </p>

            {/* Trust Badges */}
            <div className="pt-4 border-t border-amber-900/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div className="flex items-center justify-center space-x-2 text-neutral-700">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-[11px] font-semibold">100% Confidential</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-neutral-700">
                <Clock className="w-4 h-4 text-amber-700 shrink-0" />
                <span className="text-[11px] font-semibold">24-Hour Quotation</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-neutral-700">
                <Camera className="w-4 h-4 text-amber-700 shrink-0" />
                <span className="text-[11px] font-semibold">Master Prime & FX6</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-neutral-700">
                <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-[11px] font-semibold">All-India Destinations</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EnquiryPlanner;
