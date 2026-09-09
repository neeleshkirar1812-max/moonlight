import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/client';
import SEO from '../../components/common/SEO';
import { useNotification } from '../../context/NotificationContext';
import {
  Calendar,
  MapPin,
  Camera,
  DollarSign,
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
  { id: 'Royal Wedding', title: 'Royal Wedding', desc: 'Full wedding celebrations & rituals', icon: '👑' },
  { id: 'Pre-Wedding', title: 'Pre-Wedding Shoot', desc: 'Portraits in heritage / outdoor locations', icon: '✨' },
  { id: 'Destination Wedding', title: 'Destination Wedding', desc: 'Palace, beach, or outstation wedding', icon: '✈️' },
  { id: 'Wedding Film', title: 'Cinematic Wedding Film', desc: '4K docu-film and teaser trailer', icon: '🎬' },
  { id: 'Engagement / Sangeet', title: 'Engagement / Sangeet', desc: 'Ring ceremony, cocktail, or sangeet', icon: '🥂' },
  { id: 'Other Event', title: 'Other Special Event', desc: 'Anniversary, milestone celebration', icon: '🎆' },
];

const serviceOptions = [
  { id: 'Photo & Video (Full Coverage)', label: 'Photo & Video Coverage', desc: 'Traditional + Candid Sony FX6' },
  { id: 'Cinematic 4K Wedding Film', label: 'Cinematic 4K Film', desc: 'High-end cinema trailer & full movie' },
  { id: 'Pre-Wedding Shoot', label: 'Pre-Wedding Shoot', desc: 'Location couple portrait session' },
  { id: '4K Drone Cinematography', label: '4K Drone Shoot', desc: 'Aerial drone footage of venue & entries' },
  { id: 'Luxury Wedding Album', label: 'Handcrafted Album', desc: 'Premium leather flush-mount photo book' },
  { id: 'Instagram Reels & Teasers', label: 'Instagram Reels', desc: 'Same-day reels and quick highlights' },
  { id: 'Live YouTube Streaming', label: 'Live Streaming (YouTube)', desc: 'Multi-cam HD broadcast for relatives' },
];

const guestTierOptions = [
  { label: '50 - 150', desc: 'Intimate' },
  { label: '150 - 300', desc: 'Medium' },
  { label: '300 - 500', desc: 'Grand' },
  { label: '500+', desc: 'Royal Scale' },
];

const budgetOptions = [
  { label: '₹50,000 – ₹1 Lakh', desc: 'Intimate / Pre-Wedding' },
  { label: '₹1 Lakh – ₹2 Lakh', desc: 'Full Day Photo & Cinema' },
  { label: '₹2 Lakh – ₹5 Lakh', desc: '2-3 Days Complete Wedding' },
  { label: '₹5 Lakh+', desc: 'Palace / Destination Wedding' },
  { label: 'Flexible / Need Advice', desc: 'Custom tailored quote' },
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
      'Photo & Video (Full Coverage)',
      'Cinematic 4K Wedding Film',
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

    if (!formData.fullName.trim()) {
      addToast({ title: 'Name Required', message: 'Please enter your full name.', type: 'warning' });
      return;
    }
    if (!formData.phone.trim()) {
      addToast({ title: 'Phone Required', message: 'Please enter your contact phone number.', type: 'warning' });
      return;
    }
    if (!formData.eventDate) {
      addToast({ title: 'Date Required', message: 'Please select your wedding / event date.', type: 'warning' });
      return;
    }
    if (!formData.city.trim() || !formData.venue.trim()) {
      addToast({ title: 'Location Required', message: 'Please enter city and venue name.', type: 'warning' });
      return;
    }
    if (formData.requiredServices.length === 0) {
      addToast({ title: 'Services Required', message: 'Please select at least one service.', type: 'warning' });
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
        leadSource: 'Website 1-Page Form',
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
        title: 'Enquiry Submitted',
        message: `Reference ID: ${enq?.enquiryId || 'ENQ-2026'}. We will contact you shortly!`,
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

  // SUCCESS CONFIRMATION
  if (submittedEnquiry) {
    const waText = encodeURIComponent(
      `Hello Moonlight Production, I have just submitted my wedding enquiry (ID: ${submittedEnquiry.enquiryId || 'ENQ'}) for ${submittedEnquiry.eventType} on ${new Date(submittedEnquiry.eventDate).toLocaleDateString()}. Please share availability & quotation!`
    );
    const waUrl = `https://wa.me/919229229323?text=${waText}`;

    return (
      <div className="min-h-screen bg-[#FAF8F5] pt-28 pb-20 px-4 flex items-center justify-center">
        <div className="max-w-xl w-full bg-white border border-neutral-300 rounded-3xl p-6 sm:p-10 shadow-2xl text-center animate-fade-in text-neutral-900">
          <div className="w-16 h-16 mx-auto rounded-full bg-emerald-50 border border-emerald-300 flex items-center justify-center text-emerald-600 mb-5 shadow-sm">
            <HeartHandshake className="w-8 h-8" />
          </div>

          <span className="text-[11px] uppercase font-mono tracking-widest text-emerald-700 font-bold block mb-1">
            Enquiry Received
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-neutral-900 font-bold mb-2">
            Wedding Dates Registered Successfully!
          </h2>
          <p className="text-amber-800 text-xs tracking-widest uppercase mb-5 font-mono font-bold">
            Reference ID:{' '}
            <span className="font-mono font-bold text-neutral-900 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
              {submittedEnquiry.enquiryId || 'ENQ-CONFIRMED'}
            </span>
          </p>

          <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
            Thank you, <strong className="text-neutral-900">{submittedEnquiry.customerDetails?.fullName}</strong>. Our team is checking shoot availability for{' '}
            <strong className="text-amber-800">{submittedEnquiry.location?.city}</strong>. We will share your quotation within 24 hours.
          </p>

          <div className="bg-[#FAF8F5] rounded-2xl p-4 border border-neutral-200 text-left mb-6 grid grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-neutral-500 block">Event:</span>
              <strong className="text-neutral-900 font-bold">{submittedEnquiry.eventType}</strong>
            </div>
            <div>
              <span className="text-neutral-500 block">Date:</span>
              <strong className="text-neutral-900 font-bold">
                {submittedEnquiry.eventDate ? new Date(submittedEnquiry.eventDate).toLocaleDateString('en-IN', { dateStyle: 'medium' }) : 'Tentative'}
              </strong>
            </div>
            <div>
              <span className="text-neutral-500 block">City & Venue:</span>
              <strong className="text-neutral-900 font-bold">
                {submittedEnquiry.location?.venue}, {submittedEnquiry.location?.city}
              </strong>
            </div>
            <div>
              <span className="text-neutral-500 block">Services:</span>
              <strong className="text-amber-800 font-bold">
                {submittedEnquiry.requiredServices?.length || 2} Selected
              </strong>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={waUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Chat on WhatsApp
            </a>
            <Link
              to="/portfolio"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-full bg-white border border-neutral-300 text-neutral-800 hover:text-amber-700 hover:border-amber-600 font-semibold text-xs uppercase tracking-wider transition-all shadow-sm"
            >
              View Portfolio
            </Link>
            <Link
              to="/login"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-full bg-gold-gradient text-neutral-950 font-extrabold text-xs uppercase tracking-wider shadow-sm hover:brightness-105 transition-all btn-shimmer"
            >
              Login Portal
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // UNIFIED 1-PAGE FORM (ALL 4 SECTIONS INSIDE ONE MASTER CARD)
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-neutral-900 pt-24 sm:pt-28 pb-16 sm:pb-24 px-3 sm:px-6 lg:px-8 w-full max-w-full overflow-x-hidden">
      <SEO
        title="Book Wedding Shoot & Check Date Availability"
        description="Book your royal Indian wedding photography and 4K cinema coverage with Moonlight Production. Fast 1-page form to check shoot dates and get custom quotation."
        keywords="book wedding photographer, wedding date availability, wedding photography booking form, Moonlight Production shoot booking"
      />
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Top Header */}
        <div className="text-center space-y-2">
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-600/30 text-amber-800 text-[11px] font-mono font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>Direct Wedding Booking</span>
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900">
            Book Your Wedding Shoot
          </h1>
          <p className="text-neutral-600 text-xs sm:text-sm max-w-lg mx-auto">
            Fill in your event details below to check date availability and receive a custom package quotation.
          </p>

          {/* WhatsApp Direct Chat Banner */}
          <div className="pt-1">
            <a
              href="https://api.whatsapp.com/send?phone=919229229323&text=Hello%20Moonlight%20Production,%20I%20want%20to%20inquire%20about%20wedding%20photography%20and%20cinema%20dates."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center space-x-2 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 px-4 py-1.5 rounded-full transition-all shadow-sm"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>Direct WhatsApp: +91 92292 29323</span>
            </a>
          </div>
        </div>

        {/* MASTER UNIFIED FORM CARD */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl border border-neutral-300/80 shadow-2xl p-5 sm:p-8 md:p-10 space-y-8"
        >
          {/* 1. CONTACT DETAILS */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2.5 pb-2 border-b border-neutral-200">
              <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-900 font-mono font-bold text-xs flex items-center justify-center border border-amber-300">
                1
              </span>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-neutral-900 flex items-center gap-1.5">
                <User className="w-4 h-4 text-amber-700" />
                Contact Information
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 text-xs">
              <div className="space-y-1">
                <label className="text-neutral-800 font-bold uppercase text-[10.5px]">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Bride / Groom / Contact Name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full bg-[#FAF8F5] border border-neutral-300 rounded-xl px-3.5 py-2.5 text-neutral-900 placeholder-neutral-400 focus:border-amber-600 focus:bg-white focus:outline-none shadow-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="text-neutral-800 font-bold uppercase text-[10.5px]">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98200 12345"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-[#FAF8F5] border border-neutral-300 rounded-xl px-3.5 py-2.5 text-neutral-900 placeholder-neutral-400 focus:border-amber-600 focus:bg-white focus:outline-none shadow-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="text-neutral-800 font-bold uppercase text-[10.5px]">
                  WhatsApp Number (Optional)
                </label>
                <input
                  type="tel"
                  placeholder="+91 98200 12345 (If Different)"
                  value={formData.whatsappNumber}
                  onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                  className="w-full bg-[#FAF8F5] border border-neutral-300 rounded-xl px-3.5 py-2.5 text-neutral-900 placeholder-neutral-400 focus:border-amber-600 focus:bg-white focus:outline-none shadow-sm"
                />
              </div>

              <div className="space-y-1 sm:col-span-2 lg:col-span-3">
                <label className="text-neutral-800 font-bold uppercase text-[10.5px]">
                  Email Address (For PDF Quotation)
                </label>
                <input
                  type="email"
                  placeholder="your.email@gmail.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#FAF8F5] border border-neutral-300 rounded-xl px-3.5 py-2.5 text-neutral-900 placeholder-neutral-400 focus:border-amber-600 focus:bg-white focus:outline-none shadow-sm"
                />
              </div>
            </div>
          </div>

          {/* 2. WEDDING & EVENT DETAILS */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2.5 pb-2 border-b border-neutral-200">
              <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-900 font-mono font-bold text-xs flex items-center justify-center border border-amber-300">
                2
              </span>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-neutral-900 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-amber-700" />
                Wedding & Event Details
              </h3>
            </div>

            {/* Event Type Grid */}
            <div className="space-y-1.5">
              <label className="text-neutral-800 font-bold uppercase text-[10.5px] block">
                Event Type *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {eventTypeOptions.map((opt) => {
                  const isSelected = formData.eventType === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, eventType: opt.id })}
                      className={`text-left p-3 rounded-xl border transition-all flex items-start space-x-2.5 ${
                        isSelected
                          ? 'bg-amber-100 border-amber-600 text-neutral-900 shadow-sm ring-1 ring-amber-500'
                          : 'bg-[#FAF8F5] border-neutral-200 text-neutral-700 hover:border-amber-400 hover:bg-white'
                      }`}
                    >
                      <span className="text-xl shrink-0 mt-0.5">{opt.icon}</span>
                      <div>
                        <h4 className="text-xs font-bold text-neutral-900">{opt.title}</h4>
                        <p className="text-[10px] text-neutral-500 mt-0.5 leading-snug">{opt.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Date, City, Venue Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 text-xs pt-1">
              <div className="space-y-1">
                <label className="text-neutral-800 font-bold uppercase text-[10.5px]">
                  Event Start Date *
                </label>
                <input
                  type="date"
                  required
                  value={formData.eventDate}
                  onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full bg-[#FAF8F5] border border-neutral-300 rounded-xl px-3.5 py-2.5 text-neutral-900 focus:border-amber-600 focus:bg-white focus:outline-none shadow-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="text-neutral-800 font-bold uppercase text-[10.5px]">
                  End Date (Optional)
                </label>
                <input
                  type="date"
                  value={formData.eventEndDate}
                  onChange={(e) => setFormData({ ...formData, eventEndDate: e.target.value })}
                  min={formData.eventDate || new Date().toISOString().split('T')[0]}
                  className="w-full bg-[#FAF8F5] border border-neutral-300 rounded-xl px-3.5 py-2.5 text-neutral-900 focus:border-amber-600 focus:bg-white focus:outline-none shadow-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="text-neutral-800 font-bold uppercase text-[10.5px]">
                  City / Location *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Udaipur, Bhopal, Maheshwar"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full bg-[#FAF8F5] border border-neutral-300 rounded-xl px-3.5 py-2.5 text-neutral-900 placeholder-neutral-400 focus:border-amber-600 focus:bg-white focus:outline-none shadow-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="text-neutral-800 font-bold uppercase text-[10.5px]">
                  Venue Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Resort / Palace Name"
                  value={formData.venue}
                  onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                  className="w-full bg-[#FAF8F5] border border-neutral-300 rounded-xl px-3.5 py-2.5 text-neutral-900 placeholder-neutral-400 focus:border-amber-600 focus:bg-white focus:outline-none shadow-sm"
                />
              </div>
            </div>

            {/* Guest Count */}
            <div className="space-y-1.5 pt-1">
              <label className="text-neutral-800 font-bold uppercase text-[10.5px] block">
                Estimated Guest Count:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {guestTierOptions.map((tier) => {
                  const isSelected = formData.guestTier === tier.label;
                  return (
                    <button
                      key={tier.label}
                      type="button"
                      onClick={() => setFormData({ ...formData, guestTier: tier.label })}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        isSelected
                          ? 'bg-amber-100 border-amber-600 text-neutral-900 font-bold shadow-sm ring-1 ring-amber-500'
                          : 'bg-[#FAF8F5] border-neutral-200 text-neutral-700 hover:border-amber-300 hover:bg-white'
                      }`}
                    >
                      <span className="font-mono font-bold text-xs text-neutral-900 block">{tier.label}</span>
                      <span className="text-[10px] text-neutral-500 block">{tier.desc}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 3. SELECT SERVICES */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2.5 pb-2 border-b border-neutral-200">
              <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-900 font-mono font-bold text-xs flex items-center justify-center border border-amber-300">
                3
              </span>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-neutral-900 flex items-center gap-1.5">
                <Camera className="w-4 h-4 text-amber-700" />
                Select Services (Multi-Select)
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs">
              {serviceOptions.map((srv) => {
                const isSelected = formData.requiredServices.includes(srv.id);
                return (
                  <button
                    key={srv.id}
                    type="button"
                    onClick={() => toggleService(srv.id)}
                    className={`text-left p-3 rounded-xl border transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-amber-100 border-amber-600 text-neutral-900 font-bold shadow-sm ring-1 ring-amber-500'
                        : 'bg-[#FAF8F5] border-neutral-200 text-neutral-700 hover:border-amber-300 hover:bg-white'
                    }`}
                  >
                    <div>
                      <h4 className="text-xs font-bold text-neutral-900">{srv.label}</h4>
                      <p className="text-[10px] text-neutral-500 mt-0.5">{srv.desc}</p>
                    </div>
                    {isSelected ? (
                      <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0 ml-1.5" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-neutral-300 shrink-0 ml-1.5" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. BUDGET & MESSAGE */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2.5 pb-2 border-b border-neutral-200">
              <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-900 font-mono font-bold text-xs flex items-center justify-center border border-amber-300">
                4
              </span>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-neutral-900 flex items-center gap-1.5">
                <DollarSign className="w-4 h-4 text-amber-700" />
                Budget & Message
              </h3>
            </div>

            {/* Budget Options */}
            <div className="space-y-1.5">
              <label className="text-neutral-800 font-bold uppercase text-[10.5px] block">
                Estimated Budget:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                {budgetOptions.map((tier) => {
                  const isSelected = formData.budgetRange === tier.label;
                  return (
                    <button
                      key={tier.label}
                      type="button"
                      onClick={() => setFormData({ ...formData, budgetRange: tier.label })}
                      className={`text-left p-2.5 rounded-xl border transition-all ${
                        isSelected
                          ? 'bg-amber-100 border-amber-600 text-neutral-900 font-bold shadow-sm ring-1 ring-amber-500'
                          : 'bg-[#FAF8F5] border-neutral-200 text-neutral-700 hover:border-amber-300 hover:bg-white'
                      }`}
                    >
                      <h4 className="text-[11px] font-bold text-amber-900 font-mono">{tier.label}</h4>
                      <p className="text-[9.5px] text-neutral-500 mt-0.5 leading-tight">{tier.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Message / Special Notes */}
            <div className="space-y-1 pt-1">
              <label className="text-neutral-800 font-bold uppercase text-[10.5px] block">
                Message / Special Notes (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="Any special ceremonies, theme inspirations, or questions for our team..."
                value={formData.storyDetails}
                onChange={(e) => setFormData({ ...formData, storyDetails: e.target.value })}
                className="w-full bg-[#FAF8F5] border border-neutral-300 rounded-xl p-3 text-neutral-900 text-xs focus:border-amber-600 focus:bg-white focus:outline-none shadow-sm leading-relaxed"
              />
            </div>
          </div>

          {/* SUBMIT BUTTON & FOOTER WITHIN SAME CARD */}
          <div className="pt-4 border-t border-neutral-200 text-center space-y-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto min-w-[280px] inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-gold-gradient text-neutral-950 text-xs uppercase tracking-widest font-extrabold shadow-md hover:brightness-105 active:scale-95 transition-all disabled:opacity-50 btn-shimmer"
            >
              {loading ? (
                <span>Submitting Enquiry...</span>
              ) : (
                <>
                  <span>Submit Enquiry & Check Dates</span>
                  <Sparkles className="w-4 h-4 ml-1.5 text-neutral-950" />
                </>
              )}
            </button>

            {/* Clean Trust Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-neutral-600 text-xs">
              <div className="flex items-center justify-center space-x-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="text-[11px]">100% Privacy</span>
              </div>
              <div className="flex items-center justify-center space-x-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                <span className="text-[11px]">24h Fast Quote</span>
              </div>
              <div className="flex items-center justify-center space-x-1.5">
                <Camera className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                <span className="text-[11px]">Sony FX6 Cinema</span>
              </div>
              <div className="flex items-center justify-center space-x-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="text-[11px]">All-India Shoots</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EnquiryPlanner;
