import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  MessageCircle,
  ShieldCheck,
  HeartHandshake,
} from 'lucide-react';

const eventOptions = [
  { id: 'Wedding', title: 'Royal / Heritage Wedding', desc: 'Comprehensive full-day or multi-day wedding celebration', icon: '👑' },
  { id: 'Pre-Wedding', title: 'Pre-Wedding Rendezvous', desc: 'Editorial couple portraiture in stunning locations', icon: '✨' },
  { id: 'Destination Wedding', title: 'Destination Wedding', desc: 'International or exotic destination celebration', icon: '✈️' },
  { id: 'Wedding Film', title: 'Cinematic Wedding Film', desc: 'Poetic docu-film and 4K cinema trailer', icon: '🎬' },
  { id: 'Couple Shoot', title: 'Intimate Couple Session', desc: 'Authentic chemistry and candid sunset moments', icon: '🥂' },
  { id: 'Event', title: 'Private Royal Event / Sangeet', desc: 'Cocktail, Sangeet, or milestone celebration', icon: '🎆' },
];

const serviceOptions = [
  'Royal Wedding Photography',
  'Cinematic Wedding Films',
  'Pre-Wedding Destination Shoot',
  'Drone & Aerial Master Cinematography',
  'Handcrafted Italian Leather Albums',
  '4K Live Satellite Streaming',
  'Same-Day Edit Video Reel',
];

const budgetTiers = [
  { label: '₹50K – ₹1L', desc: 'Intimate ceremony coverage' },
  { label: '₹1L – ₹2L', desc: 'Single-day photography & cinema' },
  { label: '₹2L – ₹5L', desc: 'Multi-day bespoke wedding package' },
  { label: '₹5L+', desc: 'Grand royal palace / destination signature archive' },
  { label: 'Not Sure', desc: 'Let concierge recommend custom proposal' },
];

const EnquiryPlanner = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    eventType: 'Wedding',
    eventDate: '',
    eventEndDate: '',
    city: '',
    state: '',
    country: 'India',
    venue: '',
    guestCount: 250,
    requiredServices: ['Royal Wedding Photography', 'Cinematic Wedding Films'],
    budgetRange: '₹2L–₹5L',
    storyDetails: '',
    fullName: '',
    email: '',
    phone: '',
    whatsappNumber: '',
  });

  const [loading, setLoading] = useState(false);
  const [submittedEnquiry, setSubmittedEnquiry] = useState(null);
  const { addToast } = useNotification();
  const navigate = useNavigate();

  const handleNext = () => {
    // Basic step validation
    if (step === 2 && !formData.eventDate) {
      addToast({ title: 'Date Required', message: 'Please select your tentative wedding date.', type: 'warning' });
      return;
    }
    if (step === 3 && (!formData.city || !formData.venue)) {
      addToast({ title: 'Location Required', message: 'Please provide at least city and venue name.', type: 'warning' });
      return;
    }
    if (step === 5 && formData.requiredServices.length === 0) {
      addToast({ title: 'Services Required', message: 'Please select at least one required service.', type: 'warning' });
      return;
    }
    if (step < 8) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const toggleService = (srv) => {
    if (formData.requiredServices.includes(srv)) {
      setFormData({
        ...formData,
        requiredServices: formData.requiredServices.filter((s) => s !== srv),
      });
    } else {
      setFormData({
        ...formData,
        requiredServices: [...formData.requiredServices, srv],
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone) {
      addToast({ title: 'Details Incomplete', message: 'Please provide name, email, and phone number.', type: 'warning' });
      return;
    }

    setLoading(true);
    try {
      const payload = {
        eventType: formData.eventType,
        eventDate: formData.eventDate,
        eventEndDate: formData.eventEndDate || undefined,
        location: {
          city: formData.city,
          state: formData.state,
          country: formData.country,
          venue: formData.venue,
        },
        guestCount: Number(formData.guestCount),
        requiredServices: formData.requiredServices,
        budgetRange: formData.budgetRange,
        storyDetails: formData.storyDetails,
        leadSource: (() => {
          const params = new URLSearchParams(window.location.search);
          const src = params.get('utm_source') || params.get('source') || 'Website';
          if (src.toLowerCase().includes('insta')) return 'Instagram Ads';
          if (src.toLowerCase().includes('google') || src.toLowerCase().includes('ad')) return 'Google Ads';
          if (src.toLowerCase().includes('whats')) return 'WhatsApp Direct';
          if (src.toLowerCase().includes('fb') || src.toLowerCase().includes('face')) return 'Facebook Ads';
          return 'Website';
        })(),
        customerDetails: {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          whatsappNumber: formData.whatsappNumber || formData.phone,
        },
      };

      const res = await api.post('/enquiries', payload);
      setSubmittedEnquiry(res.data);
      addToast({
        title: 'Story Received ❤️',
        message: `Your reference ID is ${res.data.enquiryId}. Our concierge will connect with you shortly.`,
        type: 'success',
      });
    } catch (err) {
      addToast({
        title: 'Submission Failed',
        message: err.message || 'Unable to submit enquiry. Please try again.',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  // SUCCESS CONFIRMATION SCREEN
  if (submittedEnquiry) {
    const cleanPhone = (submittedEnquiry.customerDetails?.whatsappNumber || '919820012345').replace(/[^\d]/g, '');
    const waText = encodeURIComponent(`Hello Moonlight Production, I have just submitted my wedding enquiry (ID: ${submittedEnquiry.enquiryId}) for ${submittedEnquiry.eventType} on ${new Date(submittedEnquiry.eventDate).toLocaleDateString()}. Looking forward to speaking!`);
    const waUrl = `https://wa.me/919820012345?text=${waText}`;

    return (
      <div className="min-h-screen pt-28 pb-20 px-4 flex items-center justify-center relative">
        <div className="max-w-2xl w-full bg-obsidian-400 border border-gold-500/50 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden text-center animate-fade-in">
          <div className="w-20 h-20 mx-auto rounded-full bg-gold-500/20 border border-gold-400 flex items-center justify-center text-gold-400 mb-6 shadow-gold-glow">
            <HeartHandshake className="w-10 h-10" />
          </div>

          <h2 className="font-serif text-3xl md:text-4xl text-white font-bold mb-2">
            Your Story Has Been Received ❤️
          </h2>
          <p className="text-gold-300 text-sm tracking-widest uppercase mb-6 font-sans">
            Reference ID: <span className="font-mono font-bold text-white bg-gold-500/20 px-3 py-1 rounded-full border border-gold-500/40">{submittedEnquiry.enquiryId}</span>
          </p>

          <p className="text-neutral-300 text-sm leading-relaxed mb-8 max-w-lg mx-auto">
            Thank you, <strong className="text-white">{submittedEnquiry.customerDetails?.fullName}</strong>. Our senior director and concierge team are reviewing your celebration dates for <strong className="text-gold-200">{submittedEnquiry.location?.city}</strong>. We will formulate a tailored luxury proposal within 24 hours.
          </p>

          {/* Key Summary Pill */}
          <div className="bg-obsidian-500/80 rounded-2xl p-4 border border-white/10 text-left mb-8 grid grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-neutral-400 block">Celebration:</span>
              <strong className="text-white">{submittedEnquiry.eventType}</strong>
            </div>
            <div>
              <span className="text-neutral-400 block">Date:</span>
              <strong className="text-white">{new Date(submittedEnquiry.eventDate).toLocaleDateString('en-US', { dateStyle: 'medium' })}</strong>
            </div>
            <div>
              <span className="text-neutral-400 block">Venue:</span>
              <strong className="text-white">{submittedEnquiry.location?.venue}, {submittedEnquiry.location?.city}</strong>
            </div>
            <div>
              <span className="text-neutral-400 block">Services:</span>
              <strong className="text-gold-300">{submittedEnquiry.requiredServices?.length} Selected</strong>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={waUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-gradient-to-r from-emerald-600 to-green-500 text-white font-semibold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-lg"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Chat on WhatsApp Now
            </a>
            <Link
              to="/portfolio"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-obsidian-200 border border-white/20 text-neutral-200 hover:text-gold-300 hover:border-gold-500 font-semibold text-xs uppercase tracking-wider transition-all"
            >
              Explore Portfolio
            </Link>
            <Link
              to="/login"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-gold-500/20 text-gold-300 border border-gold-500/40 hover:bg-gold-500 hover:text-black font-semibold text-xs uppercase tracking-wider transition-all"
            >
              Sign In to Portal
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 sm:pt-28 pb-16 sm:pb-20 px-3 sm:px-6 relative w-full max-w-full overflow-x-hidden">
      {/* Background Decorative */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[350px] bg-radial-gold pointer-events-none opacity-20 overflow-hidden" />

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header Title */}
        <div className="text-center mb-8 sm:mb-10">
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] text-gold-400 font-semibold mb-2 block">
            Bespoke Wedding Concierge
          </span>
          <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl text-white font-bold">
            Plan Your Perfect Story
          </h1>
          <p className="text-neutral-400 text-xs sm:text-sm mt-2 sm:mt-3 max-w-lg mx-auto">
            Answer a few thoughtful questions so our directors can curate an unforgettable visual archive tailored to your vision.
          </p>
        </div>

        {/* Progress Bar (Step X of 8) */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center justify-between text-xs font-semibold tracking-wider uppercase mb-2">
            <span className="text-gold-300">Step {step} of 8</span>
            <span className="text-neutral-400">{Math.round((step / 8) * 100)}% Completed</span>
          </div>
          <div className="h-1.5 w-full bg-obsidian-200 rounded-full overflow-hidden border border-white/5">
            <motion.div
              className="h-full bg-gold-gradient rounded-full"
              initial={{ width: '12%' }}
              animate={{ width: `${(step / 8) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>

        {/* Wizard Card Container */}
        <div className="bg-obsidian-400/90 border border-gold-500/30 rounded-3xl p-4 sm:p-8 md:p-10 shadow-2xl backdrop-blur-xl relative">
          <AnimatePresence mode="wait">
            {/* STEP 1: EVENT TYPE */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="font-serif text-2xl text-white font-semibold">What are you planning?</h3>
                  <p className="text-xs text-neutral-400 mt-1">Select the primary celebration format</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {eventOptions.map((opt) => {
                    const isSelected = formData.eventType === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, eventType: opt.id })}
                        className={`text-left p-5 rounded-2xl border transition-all duration-300 flex items-start space-x-3.5 ${
                          isSelected
                            ? 'bg-gold-500/15 border-gold-400 text-white shadow-gold-subtle'
                            : 'bg-obsidian-500/60 border-white/10 text-neutral-300 hover:border-gold-500/50 hover:bg-obsidian-500'
                        }`}
                      >
                        <span className="text-2xl mt-0.5">{opt.icon}</span>
                        <div>
                          <h4 className="text-sm font-bold text-white">{opt.title}</h4>
                          <p className="text-xs text-neutral-400 mt-1 leading-relaxed">{opt.desc}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* STEP 2: EVENT DATE */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="font-serif text-2xl text-white font-semibold">When is the celebration?</h3>
                  <p className="text-xs text-neutral-400 mt-1">Select your auspicious wedding or shoot dates</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gold-300 uppercase tracking-wider">
                      Event Start Date *
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        value={formData.eventDate}
                        onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                        className="w-full bg-obsidian-500 border border-white/15 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-gold-400"
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                      Event End Date (Optional for multi-day)
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        value={formData.eventEndDate}
                        onChange={(e) => setFormData({ ...formData, eventEndDate: e.target.value })}
                        className="w-full bg-obsidian-500 border border-white/15 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-gold-400"
                        min={formData.eventDate || new Date().toISOString().split('T')[0]}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 3: LOCATION */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="font-serif text-2xl text-white font-semibold">Where will your story unfold?</h3>
                  <p className="text-xs text-neutral-400 mt-1">Location & Venue information</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-neutral-300 uppercase">City *</label>
                    <input
                      type="text"
                      placeholder="e.g. Udaipur, Mumbai, Lake Pichola, Udaipur"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full bg-obsidian-500 border border-white/15 rounded-xl px-4 py-3 text-white text-sm focus:border-gold-400 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-neutral-300 uppercase">State / Region</label>
                    <input
                      type="text"
                      placeholder="e.g. Rajasthan, Lombardy"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full bg-obsidian-500 border border-white/15 rounded-xl px-4 py-3 text-white text-sm focus:border-gold-400 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-2 sm:col-span-2">
                    <label className="text-xs font-semibold text-neutral-300 uppercase">Venue / Property Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. The Oberoi Udaivilas, Villa Balbiano, Taj Lake Palace"
                      value={formData.venue}
                      onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                      className="w-full bg-obsidian-500 border border-white/15 rounded-xl px-4 py-3 text-white text-sm focus:border-gold-400 focus:outline-none"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 4: GUEST COUNT */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8 text-center"
              >
                <div>
                  <h3 className="font-serif text-2xl text-white font-semibold">Anticipated Guest Count</h3>
                  <p className="text-xs text-neutral-400 mt-1">Helps us allocate the perfect number of camera operators</p>
                </div>

                <div className="space-y-4 max-w-md mx-auto">
                  <div className="font-serif text-5xl text-gold-300 font-bold tracking-tight">
                    {formData.guestCount} <span className="text-sm font-sans text-neutral-400">Guests</span>
                  </div>

                  <input
                    type="range"
                    min="10"
                    max="1500"
                    step="25"
                    value={formData.guestCount}
                    onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                    className="w-full h-2 bg-obsidian-200 rounded-lg appearance-none cursor-pointer accent-gold-500"
                  />

                  <div className="flex justify-between text-xs text-neutral-500 font-mono">
                    <span>10 (Intimate)</span>
                    <span>500</span>
                    <span>1,500+ (Grand Royal)</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 5: REQUIRED SERVICES */}
            {step === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="font-serif text-2xl text-white font-semibold">Select Required Services</h3>
                  <p className="text-xs text-neutral-400 mt-1">Multi-select all deliverables you desire</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {serviceOptions.map((srv) => {
                    const isSelected = formData.requiredServices.includes(srv);
                    return (
                      <button
                        key={srv}
                        type="button"
                        onClick={() => toggleService(srv)}
                        className={`text-left p-4 rounded-xl border transition-all flex items-center justify-between text-xs font-semibold ${
                          isSelected
                            ? 'bg-gold-500/20 border-gold-400 text-gold-200 shadow-gold-subtle'
                            : 'bg-obsidian-500/60 border-white/10 text-neutral-300 hover:border-white/25'
                        }`}
                      >
                        <span>{srv}</span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0 ml-2" />}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* STEP 6: BUDGET */}
            {step === 6 && (
              <motion.div
                key="step6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="font-serif text-2xl text-white font-semibold">Expected Investment Range</h3>
                  <p className="text-xs text-neutral-400 mt-1">Enables us to curate the highest value options</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {budgetTiers.map((tier) => {
                    const isSelected = formData.budgetRange === tier.label;
                    return (
                      <button
                        key={tier.label}
                        type="button"
                        onClick={() => setFormData({ ...formData, budgetRange: tier.label })}
                        className={`text-left p-4 rounded-xl border transition-all ${
                          isSelected
                            ? 'bg-gold-500/20 border-gold-400 text-white shadow-gold-subtle'
                            : 'bg-obsidian-500/60 border-white/10 text-neutral-300 hover:border-white/25'
                        }`}
                      >
                        <h4 className="text-sm font-bold text-gold-300">{tier.label}</h4>
                        <p className="text-xs text-neutral-400 mt-0.5">{tier.desc}</p>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* STEP 7: STORY DETAILS */}
            {step === 7 && (
              <motion.div
                key="step7"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="font-serif text-2xl text-white font-semibold">Tell us about your event</h3>
                  <p className="text-xs text-neutral-400 mt-1">Any aesthetic preferences, special musical requests, or unique rituals?</p>
                </div>

                <textarea
                  rows={5}
                  placeholder="Share your wedding theme, how you met, special traditions, or mood inspirations..."
                  value={formData.storyDetails}
                  onChange={(e) => setFormData({ ...formData, storyDetails: e.target.value })}
                  className="w-full bg-obsidian-500 border border-white/15 rounded-2xl p-4 text-white text-sm focus:border-gold-400 focus:outline-none leading-relaxed"
                />
              </motion.div>
            )}

            {/* STEP 8: CUSTOMER DETAILS */}
            {step === 8 && (
              <motion.div
                key="step8"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="font-serif text-2xl text-white font-semibold">Where should we send your proposal?</h3>
                  <p className="text-xs text-neutral-400 mt-1">Your details remain strictly confidential</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-neutral-300 uppercase">Full Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. Aarav Singhania & Ananya"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      required
                      className="w-full bg-obsidian-500 border border-white/15 rounded-xl px-4 py-3 text-white text-sm focus:border-gold-400 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-neutral-300 uppercase">Email Address *</label>
                    <input
                      type="email"
                      placeholder="aarav@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="w-full bg-obsidian-500 border border-white/15 rounded-xl px-4 py-3 text-white text-sm focus:border-gold-400 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-neutral-300 uppercase">Phone Number *</label>
                    <input
                      type="tel"
                      placeholder="+91 98200 12345"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      className="w-full bg-obsidian-500 border border-white/15 rounded-xl px-4 py-3 text-white text-sm focus:border-gold-400 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-neutral-300 uppercase">WhatsApp Number (Optional)</label>
                    <input
                      type="tel"
                      placeholder="+91 98200 12345"
                      value={formData.whatsappNumber}
                      onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                      className="w-full bg-obsidian-500 border border-white/15 rounded-xl px-4 py-3 text-white text-sm focus:border-gold-400 focus:outline-none"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="mt-8 sm:mt-10 pt-6 border-t border-white/10 flex items-center justify-between gap-3">
            {step > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="px-4 sm:px-5 py-2.5 rounded-full border border-white/20 text-neutral-300 hover:text-white hover:border-gold-500 text-xs uppercase tracking-wider font-semibold flex items-center transition-all min-h-[44px]"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </button>
            ) : (
              <div />
            )}

            {step < 8 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-gold-gradient text-black text-xs uppercase tracking-wider font-bold shadow-gold-subtle hover:brightness-110 flex items-center transition-all min-h-[44px]"
              >
                Next Step
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            ) : (
              <button
                type="button"
                disabled={loading}
                onClick={handleSubmit}
                className="px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-gradient-to-r from-gold-500 via-gold-400 to-champagne text-black text-xs uppercase tracking-widest font-bold shadow-gold-glow hover:brightness-110 flex items-center transition-all disabled:opacity-50 min-h-[44px]"
              >
                {loading ? 'Submitting Story...' : 'Complete & Receive Proposal'}
                <Sparkles className="w-4 h-4 ml-2" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnquiryPlanner;
