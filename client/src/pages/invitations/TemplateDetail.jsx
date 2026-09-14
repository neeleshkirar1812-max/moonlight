import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getTemplateById, invitationTemplates } from '../../data/invitationTemplates';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import api from '../../api/client';
import SEO from '../../components/common/SEO';
import {
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  CreditCard,
  Gift,
  ArrowLeft,
  Lock,
  Eye,
  Crown,
  Check,
  ArrowRight,
  RefreshCw,
  Zap,
} from 'lucide-react';

const TemplateDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const template = getTemplateById(slug) || invitationTemplates.find((t) => t.id === slug || t.slug === slug) || invitationTemplates[0];
  const { user } = useAuth();
  const { addToast } = useNotification();

  const [loading, setLoading] = useState(false);
  const [customerName, setCustomerName] = useState(user?.name || '');
  const [customerEmail, setCustomerEmail] = useState(
    user?.email || localStorage.getItem('moonlight_customer_email') || ''
  );
  const [scratchRevealed, setScratchRevealed] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // Pricing Tier Selection: 'suite' (Full Collection Pass ₹799) or 'single' (Single Template ₹499)
  const [pricingPlan, setPricingPlan] = useState('single');

  // Check if template is Royal or Classic
  const isRoyal =
    template.id?.includes('royal') ||
    template.id?.includes('pichola') ||
    template.id?.includes('udaipur') ||
    template.id?.includes('jaipur') ||
    template.id?.includes('marigold') ||
    template.id?.includes('sunset') ||
    template.id?.includes('shubh-vivah') ||
    template.id?.includes('rajwada') ||
    template.id?.includes('shahi-farman');
  const planCategory = isRoyal ? 'royal' : 'classic';

  // Check if already unlocked in user account
  const [isAlreadyUnlocked, setIsAlreadyUnlocked] = useState(false);
  const [redirectCountdown, setRedirectCountdown] = useState(null);

  useEffect(() => {
    // If not logged in, redirect to Signup first!
    if (!user) {
      addToast({
        title: 'Sign Up Required ✨',
        message: 'Please create an account or sign in to complete payment and unlock your invitation.',
        type: 'info',
      });
      navigate(`/invitations/signup?redirect=${encodeURIComponent('/templates/' + template.id)}`);
    }
  }, [user, template.id, navigate]);

  const basePrice = isRoyal
    ? (pricingPlan === 'suite' ? 1499 : 699)
    : (pricingPlan === 'suite' ? 1199 : 499);

  const originalPrice = isRoyal
    ? (pricingPlan === 'suite' ? 3499 : 1999)
    : (pricingPlan === 'suite' ? 2499 : 1299);

  const currentPayable = appliedCoupon
    ? appliedCoupon.finalAmount
    : basePrice;

  const handleApplyCodeDirectly = async (codeToApply) => {
    try {
      const res = await api.post('/invitations/coupons/apply', {
        code: codeToApply,
        amount: basePrice,
      });
      const data = res.data?.coupon || res.coupon;
      if (data) {
        setAppliedCoupon(data);
        addToast({
          title: 'Coupon Applied!',
          message: `Discount of ₹${data.discountAmount} applied. Final payable: ₹${data.finalAmount}`,
          type: 'success',
        });
      }
    } catch (err) {
      addToast({ title: 'Coupon Error', message: err.message || 'Invalid coupon code.', type: 'error' });
    }
  };

  const handleProceedToEditor = async (isFreeAdmin = false) => {
    const emailToUse = customerEmail.trim() || user?.email || 'couple@moonlight.com';
    const nameToUse = customerName.trim() || user?.name || 'Aarav & Kiara';

    setLoading(true);
    try {
      const verifyRes = await api.post('/invitations/payments/verify', {
        razorpay_order_id: `instant_${Date.now()}`,
        razorpay_payment_id: `free_${Date.now()}`,
        razorpay_signature: 'instant_verified',
        templateId: template.id,
        planType: pricingPlan,
        customerEmail: emailToUse,
        customerName: nameToUse,
        couponCode: isFreeAdmin ? 'ADMIN_FREE' : appliedCoupon?.code || 'INSTANT_UNLOCKED',
      });

      // Save unlocks to local storage
      if (pricingPlan === 'suite' || isFreeAdmin) {
        const currentSaved = JSON.parse(localStorage.getItem('moonlight_unlocked_plans') || '[]');
        if (!currentSaved.includes(planCategory)) {
          currentSaved.push(planCategory);
          localStorage.setItem('moonlight_unlocked_plans', JSON.stringify(currentSaved));
        }
      } else {
        const currentSavedTpls = JSON.parse(localStorage.getItem('moonlight_unlocked_templates') || '[]');
        if (!currentSavedTpls.includes(template.id)) {
          currentSavedTpls.push(template.id);
          localStorage.setItem('moonlight_unlocked_templates', JSON.stringify(currentSavedTpls));
        }
      }

      localStorage.setItem('moonlight_customer_email', emailToUse);

      addToast({
        title: 'Design Suite Unlocked! ✨',
        message: 'Opening your invitation customization suite...',
        type: 'success',
      });

      const invId = verifyRes.data?.invitation?._id || verifyRes.data?.invitation?.id || template.id;
      navigate(`/invitations/create/${invId}`);
    } catch (err) {
      addToast({
        title: 'Unlock Failed',
        message: err.message || 'Could not unlock template.',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBuyTemplate = async () => {
    if (!user && !customerEmail && !localStorage.getItem('moonlight_customer_email')) {
      addToast({
        title: 'Sign Up Required ✨',
        message: 'Please sign up or log in first before completing payment.',
        type: 'info',
      });
      navigate(`/invitations/signup?redirect=/templates/${template.id}`);
      return;
    }
    if (currentPayable === 0) {
      return handleProceedToEditor(false);
    }

    if (!customerEmail) {
      addToast({
        title: 'Email Required',
        message: 'Please enter your email to receive your invitation dashboard access.',
        type: 'error',
      });
      return;
    }

    setLoading(true);
    try {
      const emailToUse = customerEmail.trim();
      const nameToUse = customerName.trim() || 'Valued Couple';

      // 1. Create Order
      const res = await api.post('/invitations/payments/create-order', {
        templateId: template.id,
        planType: pricingPlan,
        customerEmail: emailToUse,
        customerName: nameToUse,
        couponCode: appliedCoupon?.code || '',
        price: currentPayable,
      });

      const orderData = res.data;

      // 2. Razorpay Options
      const options = {
        key: orderData.key || 'rzp_test_Ta47WTEJxJInTH',
        amount: orderData.amount,
        currency: orderData.currency || 'INR',
        name: 'Moonlight Production',
        description: pricingPlan === 'suite'
          ? `${isRoyal ? 'Royal 4K' : 'Classic 3D'} All-Access Suite Pass`
          : `${template.name} Digital Invitation`,
        image: 'https://ugc.production.linktr.ee/bbcf2874-0602-4cdb-b362-ad612f9fc135_zV3Uuw-tQraxE7KwMApwOHbWTg75v6W5ZJJOyWhXSJBR8O1GMQMZMOQ4CvB8uCMV4mM0SXMK-Q-s800-c-k-c0x00ffffff-no-r.jpeg?io=true&size=avatar-v3_0',
        order_id: orderData.id,
        handler: async function (response) {
          try {
            const verifyRes = await api.post('/invitations/payments/verify', {
              razorpay_order_id: response.razorpay_order_id || orderData.id,
              razorpay_payment_id: response.razorpay_payment_id || `pay_${Date.now()}`,
              razorpay_signature: response.razorpay_signature || 'verified_sig',
              templateId: template.id,
              planType: pricingPlan,
              customerEmail: emailToUse,
              customerName: nameToUse,
              couponCode: appliedCoupon?.code || '',
              amount: currentPayable,
            });

            // Save active customer email
            localStorage.setItem('moonlight_customer_email', emailToUse);

            // Save unlock state
            if (pricingPlan === 'suite') {
              const currentSaved = JSON.parse(localStorage.getItem('moonlight_unlocked_plans') || '[]');
              if (!currentSaved.includes(planCategory)) {
                currentSaved.push(planCategory);
                localStorage.setItem('moonlight_unlocked_plans', JSON.stringify(currentSaved));
              }
            } else {
              const currentSavedTpls = JSON.parse(localStorage.getItem('moonlight_unlocked_templates') || '[]');
              if (!currentSavedTpls.includes(template.id)) {
                currentSavedTpls.push(template.id);
                localStorage.setItem('moonlight_unlocked_templates', JSON.stringify(currentSavedTpls));
              }
            }

            addToast({
              title: 'Payment Successful! 🎉',
              message: 'Your template is unlocked. Opening customization suite...',
              type: 'success',
            });

            const invId = verifyRes.data?.invitation?._id || verifyRes.data?.invitation?.id || template.id;
            navigate(`/invitations/create/${invId}`);
          } catch (err) {
            addToast({
              title: 'Verification Error',
              message: err.message || 'Payment verification failed.',
              type: 'error',
            });
          }
        },
        prefill: {
          name: nameToUse,
          email: emailToUse,
          contact: '+919229229323',
        },
        theme: {
          color: '#B98A32',
        },
      };

      if (window.Razorpay) {
        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        // Fallback test payment
        const mockPaymentId = `pay_mock_${Date.now()}`;
        options.handler({
          razorpay_order_id: orderData.id,
          razorpay_payment_id: mockPaymentId,
          razorpay_signature: 'mock_verified_sig',
        });
      }
    } catch (err) {
      addToast({
        title: 'Checkout Error',
        message: err.message || 'Unable to initiate checkout.',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F1E8] text-neutral-900 pt-24 sm:pt-32 pb-20 px-4 sm:px-6 lg:px-8 font-sans">
      <SEO
        title={`${template.name} — Luxury Digital Invitation Suite`}
        description={template.description}
      />

      <div className="max-w-6xl mx-auto space-y-8">
        {/* Back navigation */}
        <div className="flex items-center justify-between">
          <Link
            to="/invitations/templates"
            className="inline-flex items-center text-xs font-mono font-bold text-amber-900 hover:text-amber-950 uppercase tracking-wider"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1.5" /> Back to Templates Catalog
          </Link>

          <span className="text-[11px] font-mono uppercase tracking-widest text-amber-800 font-bold bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
            {isRoyal ? '👑 Royal 4K Gate Collection' : '🏛️ Classic 3D Gate Collection'}
          </span>
        </div>

        (
          /* ========================================================================= */
          /* MAIN 2-COLUMN REDESIGNED CHECKOUT LAYOUT */
          /* ========================================================================= */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* LEFT COLUMN: Template Hero Image, Live Demo & Scratch Card */}
            <div className="lg:col-span-7 space-y-6">
              {/* High-Resolution Cover Box */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-[#DFD4C2] bg-neutral-950 group">
                <img
                  src={template.coverImage}
                  alt={template.name}
                  className="w-full h-[400px] sm:h-[460px] object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                {/* Top Badges */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-amber-900/90 text-amber-200 text-xs font-mono font-bold uppercase tracking-wider border border-amber-500/40 shadow-md">
                    {template.badge || 'Palace Luxe'}
                  </span>
                </div>

                <div className="absolute top-4 right-4">
                  <Link
                    to={`/i/${template.slug}`}
                    target="_blank"
                    className="px-4 py-2 rounded-full bg-black/75 hover:bg-black/95 backdrop-blur-md border border-amber-400/80 text-amber-300 font-bold text-xs uppercase tracking-wider flex items-center space-x-1.5 shadow-xl transition-all"
                  >
                    <Eye className="w-3.5 h-3.5 text-amber-400" />
                    <span>Live Preview ↗</span>
                  </Link>
                </div>

                {/* Bottom Overlay Title */}
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                  <span className="text-xs uppercase font-mono tracking-[0.25em] text-amber-400 font-bold block">
                    {template.category} Luxury Digital Suite
                  </span>
                  <h1 className="font-serif text-3xl sm:text-4xl font-bold">{template.name}</h1>
                  <p className="text-xs text-neutral-300 max-w-lg leading-relaxed">{template.description}</p>
                </div>
              </div>

              {/* Interactive Scratch Preview Demo */}
              <div className="bg-[#FFFDF9] rounded-3xl p-6 border border-[#E0D7C7] shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold uppercase text-amber-900 tracking-wider flex items-center">
                    <Gift className="w-4 h-4 mr-1.5 text-purple-600" /> Interactive Scratch Card Demo
                  </span>
                  <span className="text-[10px] text-neutral-500 italic">Tap to test scratch effect</span>
                </div>

                <div
                  onClick={() => setScratchRevealed(!scratchRevealed)}
                  className={`h-24 rounded-2xl flex items-center justify-center p-4 cursor-pointer transition-all duration-300 select-none shadow-inner ${
                    scratchRevealed
                      ? 'bg-amber-100 border-2 border-amber-600 text-amber-950 font-serif font-bold text-lg'
                      : 'bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 border-2 border-amber-400 text-white font-mono font-bold tracking-widest text-xs'
                  }`}
                >
                  {scratchRevealed ? (
                    <div className="text-center font-serif font-bold text-amber-900 animate-fade-in">
                      YOU’RE INVITED ♡
                    </div>
                  ) : (
                    <div className="flex items-center space-x-1.5">
                      <Sparkles className="w-4 h-4" />
                      <span>SCRATCH HERE ✦</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Suite Features Checklist */}
              <div className="bg-white rounded-3xl p-6 border border-[#E0D7C7] shadow-sm space-y-3">
                <span className="text-xs font-mono uppercase font-bold text-neutral-800 tracking-wider block">
                  Included in this Luxury Digital Suite:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-neutral-700">
                  <div className="flex items-center">
                    <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-600 shrink-0" />
                    <span>4K Animated Opening Doors Reveal</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-600 shrink-0" />
                    <span>Multi-Ceremony Event Schedule</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-600 shrink-0" />
                    <span>Google Maps 1-Click Navigation</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-600 shrink-0" />
                    <span>Interactive Scratch Card for Guests</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-600 shrink-0" />
                    <span>Live RSVP Tracking & Guest List</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-600 shrink-0" />
                    <span>Unlimited WhatsApp Broadcasts</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Plan Selector, Customer Inputs & Razorpay Unlock */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-amber-900/20 shadow-xl space-y-6">
                {/* Header title */}
                <div className="space-y-1">
                  <span className="text-[10.5px] uppercase font-mono tracking-widest text-amber-800 font-bold block">
                    STEP 1: SELECT YOUR PLAN
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900">
                    Unlock Invitation Suite
                  </h2>
                </div>

                {/* 2-TIER PLAN SELECTOR CARDS */}
                <div className="space-y-3">
                  {/* OPTION 1: Full Suite Pass (Recommended) */}
                  <div
                    onClick={() => setPricingPlan('suite')}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all relative select-none ${
                      pricingPlan === 'suite'
                        ? 'bg-amber-50/90 border-amber-600 shadow-md ring-2 ring-amber-500/20'
                        : 'bg-[#FAF8F5] border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-600 text-white text-[9.5px] font-mono font-bold uppercase tracking-wider">
                        BEST VALUE 👑
                      </span>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 shrink-0 ${
                        pricingPlan === 'suite' ? 'border-amber-700 bg-amber-600 text-white' : 'border-neutral-400'
                      }`}>
                        {pricingPlan === 'suite' && <Check className="w-3.5 h-3.5" />}
                      </div>

                      <div className="space-y-1 pr-16">
                        <span className="font-serif font-bold text-neutral-950 text-sm block">
                          {isRoyal ? '👑 Royal Collection Pass (All 13 Royal Themes)' : '🏛️ Classic Collection Pass (All 13 Classic Themes)'}
                        </span>
                        <p className="text-[11px] text-neutral-600 leading-tight">
                          {isRoyal
                            ? 'Unlocks ALL 13 Royal 4K Gate Themes & Hindi Editions with lifetime unlimited switches!'
                            : 'Unlocks ALL 13 Classic 3D Gate Themes & Hindi Editions with lifetime unlimited switches!'}
                        </p>
                        <div className="flex items-baseline space-x-2 pt-1">
                          <span className="font-serif text-xl font-bold text-amber-900">
                            ₹{isRoyal ? 1499 : 1199}
                          </span>
                          <span className="text-xs text-neutral-400 line-through font-mono">
                            ₹{isRoyal ? 3499 : 2499}
                          </span>
                          <span className="text-[10px] font-mono font-bold text-emerald-700">
                            Save {isRoyal ? '57%' : '52%'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* OPTION 2: Single Design License */}
                  <div
                    onClick={() => setPricingPlan('single')}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all relative select-none ${
                      pricingPlan === 'single'
                        ? 'bg-amber-50/90 border-amber-600 shadow-md ring-2 ring-amber-500/20'
                        : 'bg-[#FAF8F5] border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 shrink-0 ${
                        pricingPlan === 'single' ? 'border-amber-700 bg-amber-600 text-white' : 'border-neutral-400'
                      }`}>
                        {pricingPlan === 'single' && <Check className="w-3.5 h-3.5" />}
                      </div>

                      <div className="space-y-1">
                        <span className="font-serif font-bold text-neutral-950 text-sm block">
                          🌟 Single Template Access ({template.name})
                        </span>
                        <p className="text-[11px] text-neutral-600 leading-tight">
                          Unlocks only this 1 selected invitation design for full customization & publishing.
                        </p>
                        <div className="flex items-baseline space-x-2 pt-1">
                          <span className="font-serif text-xl font-bold text-amber-900">
                            ₹{isRoyal ? 699 : 499}
                          </span>
                          <span className="text-xs text-neutral-400 line-through font-mono">
                            ₹{isRoyal ? 1999 : 1299}
                          </span>
                          <span className="text-[10px] font-mono font-bold text-emerald-700">Save 60%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Customer Checkout Form */}
                <div className="space-y-3 pt-4 border-t border-stone-200">
                  <span className="text-[10.5px] uppercase font-mono tracking-widest text-amber-800 font-bold block">
                    STEP 2: YOUR CONTACT DETAILS
                  </span>

                  <div>
                    <label className="text-[11px] font-mono uppercase font-bold text-neutral-700 block mb-1">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Aarav Sharma & Kiara Sen"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-[#FAF8F5] border border-neutral-300 rounded-xl px-4 py-2.5 text-xs text-neutral-900 focus:border-amber-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono uppercase font-bold text-neutral-700 block mb-1">
                      Email Address (For Dashboard Access) *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. aarav.kiara@gmail.com"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="w-full bg-[#FAF8F5] border border-neutral-300 rounded-xl px-4 py-2.5 text-xs text-neutral-900 focus:border-amber-600 focus:outline-none"
                    />
                  </div>

                  {/* Coupon Code Section */}
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] font-mono uppercase font-bold text-neutral-700 block">
                        Have a Discount Coupon?
                      </label>
                      <span className="text-[10px] text-amber-800 font-mono">Tap below to apply</span>
                    </div>

                    {/* Clickable Quick Coupon Chips */}
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        { code: 'MOONLIGHT100', label: '⚡ 100% Free (MOONLIGHT100)' },
                        { code: 'ROYAL50', label: '50% Off (ROYAL50)' },
                        { code: 'WELCOME20', label: '20% Off (WELCOME20)' },
                      ].map((c) => (
                        <button
                          key={c.code}
                          type="button"
                          onClick={() => {
                            setCouponCode(c.code);
                            handleApplyCodeDirectly(c.code);
                          }}
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-mono border transition-all ${
                            appliedCoupon?.code === c.code
                              ? 'bg-amber-100 border-amber-600 text-amber-950 font-bold shadow-sm'
                              : 'bg-stone-50 border-stone-200 text-neutral-600 hover:bg-amber-50 hover:text-amber-900'
                          }`}
                        >
                          {c.label}
                        </button>
                      ))}
                    </div>

                    <div className="flex space-x-2">
                      <input
                        type="text"
                        placeholder="Enter coupon code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                        className="w-full bg-[#FAF8F5] border border-neutral-300 rounded-xl px-3.5 py-2 text-xs font-mono uppercase focus:border-amber-600 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => handleApplyCodeDirectly(couponCode)}
                        className="px-4 py-2 rounded-xl bg-amber-900 hover:bg-amber-950 text-amber-50 font-bold text-xs shrink-0 shadow-sm"
                      >
                        Apply
                      </button>
                    </div>

                    {appliedCoupon && (
                      <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-300 text-[11px] text-emerald-800 font-semibold flex items-center justify-between animate-fade-in">
                        <span className="flex items-center">
                          <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                          Coupon <strong>{appliedCoupon.code}</strong> applied!
                        </span>
                        <span className="font-bold font-mono">Pay: ₹{currentPayable}</span>
                      </div>
                    )}
                  </div>

                  {/* Main Action Buttons */}
                  <div className="space-y-2.5 pt-3">
                    {/* Admin Free Unlock */}
                    {(user?.role === 'admin' || user?.role === 'superadmin') && (
                      <button
                        type="button"
                        onClick={() => handleProceedToEditor(true)}
                        disabled={loading}
                        className="w-full py-3 rounded-2xl bg-amber-900 hover:bg-amber-950 text-amber-50 font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-md transition-all"
                      >
                        <Crown className="w-4 h-4 text-amber-300" />
                        <span>👑 Admin Instant Free Access (₹0)</span>
                      </button>
                    )}

                    {/* Razorpay Standard Checkout Button */}
                    <button
                      type="button"
                      onClick={handleBuyTemplate}
                      disabled={loading}
                      className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 hover:from-amber-800 hover:to-amber-800 text-white font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center space-x-2 transition-all transform hover:-translate-y-0.5 disabled:opacity-50 btn-shimmer"
                    >
                      <CreditCard className="w-4 h-4" />
                      <span>
                        {loading
                          ? 'Opening Editor...'
                          : currentPayable === 0
                          ? '⚡ Unlock for Free (₹0) & Start Editing Now'
                          : `Unlock with Razorpay for ₹${currentPayable} & Start Editing`}
                      </span>
                    </button>

                    {/* 1-Click Instant Test Unlock (Bypass Payment) */}
                    <button
                      type="button"
                      onClick={() => handleProceedToEditor(false)}
                      disabled={loading}
                      className="w-full py-2.5 rounded-2xl bg-[#FFFDF9] border border-amber-800/30 hover:bg-amber-50 text-amber-900 font-bold text-xs flex items-center justify-center space-x-1.5 transition-all shadow-sm"
                    >
                      <Zap className="w-3.5 h-3.5 text-amber-700" />
                      <span>⚡ 1-Click Instant Test Unlock (Bypass Payment)</span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-center space-x-4 text-[10.5px] text-neutral-500 font-mono pt-1">
                  <span className="flex items-center">
                    <ShieldCheck className="w-3.5 h-3.5 mr-1 text-emerald-600" /> Razorpay 256-Bit SSL
                  </span>
                  <span className="flex items-center">
                    <Lock className="w-3.5 h-3.5 mr-1 text-amber-700" /> Instant Activation
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default TemplateDetail;
