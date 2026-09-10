import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getTemplateById } from '../../data/invitationTemplates';
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
  MapPin,
  Music,
  Share2,
  ArrowLeft,
  Lock,
} from 'lucide-react';

const TemplateDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const template = getTemplateById(slug);
  const { user, isAuthenticated } = useAuth();
  const { addToast } = useNotification();

  const [loading, setLoading] = useState(false);
  const [customerName, setCustomerName] = useState(user?.name || '');
  const [customerEmail, setCustomerEmail] = useState(user?.email || '');
  const [scratchRevealed, setScratchRevealed] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  const handleApplyCodeDirectly = async (codeToApply) => {
    try {
      const res = await api.post('/invitations/coupons/apply', {
        code: codeToApply,
        amount: template.price,
      });
      const data = res.data?.coupon || res.coupon;
      if (data) {
        setAppliedCoupon(data);
        addToast({
          title: 'Coupon Applied!',
          message: `Discount of ₹${data.discountAmount} applied. Final price: ₹${data.finalAmount}`,
          type: 'success',
        });
      }
    } catch (err) {
      addToast({ title: 'Coupon Error', message: err.message || 'Invalid coupon code.', type: 'error' });
    }
  };

  const handleQuickUnlock = async (isFreeAdmin = false) => {
    const emailToUse = customerEmail.trim() || user?.email || 'couple@moonlight.com';
    const nameToUse = customerName.trim() || user?.name || 'Aarav & Kiara';

    setLoading(true);
    try {
      const verifyRes = await api.post('/invitations/payments/verify', {
        razorpay_order_id: `instant_${Date.now()}`,
        razorpay_payment_id: `free_${Date.now()}`,
        razorpay_signature: 'instant_verified',
        templateId: template.id,
        customerEmail: emailToUse,
        customerName: nameToUse,
        couponCode: isFreeAdmin ? 'ADMIN_FREE' : appliedCoupon?.code || 'INSTANT_FREE',
      });

      addToast({
        title: isFreeAdmin ? '👑 Admin Template Assigned!' : 'Template Unlocked! ✨',
        message: 'Opening your invitation customization suite...',
        type: 'success',
      });

      localStorage.setItem('moonlight_customer_email', emailToUse);
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
    if (appliedCoupon && appliedCoupon.finalAmount === 0) {
      return handleQuickUnlock(false);
    }

    if (!customerEmail) {
      addToast({
        title: 'Email Required',
        message: 'Please enter your email to receive your invitation access.',
        type: 'error',
      });
      return;
    }

    setLoading(true);
    try {
      // 1. Create Razorpay Order via API
      const res = await api.post('/invitations/payments/create-order', {
        templateId: template.id,
        customerEmail: customerEmail.trim(),
        customerName: customerName.trim() || 'Valued Couple',
        couponCode: appliedCoupon?.code || '',
        price: appliedCoupon ? appliedCoupon.finalAmount : template.price,
      });

      const orderData = res.data;

      // 2. Open Razorpay Checkout modal
      const options = {
        key: orderData.key || 'rzp_test_Ta47WTEJxJInTH',
        amount: orderData.amount,
        currency: orderData.currency || 'INR',
        name: 'Moonlight Production',
        description: `${template.name} Digital Invitation Suite`,
        image: 'https://ugc.production.linktr.ee/bbcf2874-0602-4cdb-b362-ad612f9fc135_zV3Uuw-tQraxE7KwMApwOHbWTg75v6W5ZJJOyWhXSJBR8O1GMQMZMOQ4CvB8uCMV4mM0SXMK-Q-s800-c-k-c0x00ffffff-no-r.jpeg?io=true&size=avatar-v3_0',
        order_id: orderData.id,
        handler: async function (response) {
          try {
            // 3. Verify Payment on Server
            const verifyRes = await api.post('/invitations/payments/verify', {
              razorpay_order_id: response.razorpay_order_id || orderData.id,
              razorpay_payment_id: response.razorpay_payment_id || `pay_${Date.now()}`,
              razorpay_signature: response.razorpay_signature || 'mock_verified_sig',
              templateId: template.id,
              customerEmail: customerEmail.trim(),
              customerName: customerName.trim() || 'Valued Couple',
              couponCode: appliedCoupon?.code || '',
            });

            addToast({
              title: 'Payment Successful! 🎉',
              message: 'Your luxury template is unlocked. Let us customize your invitation!',
              type: 'success',
            });

            // Save active customer email in local session
            localStorage.setItem('moonlight_customer_email', customerEmail.trim());

            const invId = verifyRes.data?.invitation?._id || verifyRes.data?.invitation?.id;
            if (invId) {
              navigate(`/invitations/create/${invId}`);
            } else {
              navigate('/invitations/dashboard?paid=true');
            }
          } catch (err) {
            addToast({
              title: 'Verification Error',
              message: err.message || 'Payment verification failed.',
              type: 'error',
            });
          }
        },
        prefill: {
          name: customerName || 'Valued Couple',
          email: customerEmail || 'customer@moonlight.com',
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
        // Fallback simulate test payment for demo/offline
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
        message: err.message || 'Unable to initiate Razorpay checkout.',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F1E8] text-neutral-900 pt-24 sm:pt-32 pb-16 px-4 sm:px-6 lg:px-8 font-sans">
      <SEO
        title={`${template.name} (${template.category}) — Digital Invitation Suite`}
        description={template.description}
      />

      <div className="max-w-6xl mx-auto space-y-8">
        {/* Back navigation */}
        <Link
          to="/invitations"
          className="inline-flex items-center text-xs font-mono font-bold text-amber-900 hover:text-amber-950 uppercase tracking-wider"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-1.5" /> Back to Templates
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: High-Res Template Mockup & Demo Scratch */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-[#DFD4C2] bg-neutral-950">
              <img
                src={template.coverImage}
                alt={template.name}
                className="w-full h-[400px] sm:h-[480px] object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full bg-amber-900/90 text-amber-200 text-xs font-mono font-bold uppercase tracking-wider border border-amber-500/30">
                  {template.badge}
                </span>
              </div>

              <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                <span className="text-xs uppercase font-mono tracking-[0.25em] text-amber-400 font-bold block">
                  {template.category} Digital Suite
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl font-bold">{template.name}</h1>
                <p className="text-xs text-neutral-300 max-w-lg leading-relaxed">{template.description}</p>
              </div>
            </div>

            {/* Interactive Scratch Preview Box */}
            <div className="bg-[#FFFDF9] rounded-3xl p-6 border border-[#E0D7C7] shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold uppercase text-amber-900 tracking-wider flex items-center">
                  <Gift className="w-4 h-4 mr-1.5 text-purple-600" /> Interactive Scratch Card Demo
                </span>
                <span className="text-[10px] text-neutral-500 italic">Tap to test</span>
              </div>

              <div
                onClick={() => setScratchRevealed(!scratchRevealed)}
                className={`h-28 rounded-2xl flex items-center justify-center p-4 cursor-pointer transition-all duration-300 select-none shadow-inner ${
                  scratchRevealed
                    ? 'bg-amber-100 border-2 border-amber-600 text-amber-950'
                    : 'bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 border-2 border-amber-400 text-white font-mono font-bold tracking-widest'
                }`}
              >
                {scratchRevealed ? (
                  <div className="text-center font-serif text-xl font-bold text-amber-900 animate-fade-in">
                    YOU’RE INVITED ♡
                  </div>
                ) : (
                  <div className="text-xs tracking-widest flex items-center">
                    <Sparkles className="w-3.5 h-3.5 mr-1" /> SCRATCH HERE ✦
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Features & Razorpay Checkout Box */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-amber-900/20 shadow-xl space-y-6">
              <div className="space-y-2 border-b border-stone-200 pb-5">
                <span className="text-[10.5px] uppercase font-mono tracking-widest text-amber-800 font-bold block">
                  Official Moonlight License
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900">
                  {template.name}
                </h2>
                <div className="flex items-baseline space-x-3 pt-1">
                  <span className="font-serif text-4xl font-bold text-amber-900">
                    ₹{template.price}
                  </span>
                  <span className="text-sm text-neutral-400 line-through font-mono">
                    ₹{template.originalPrice}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10.5px] font-mono font-bold">
                    Save {Math.round(((template.originalPrice - template.price) / template.originalPrice) * 100)}%
                  </span>
                </div>
              </div>

              {/* Included Suite Features */}
              <div className="space-y-3">
                <span className="text-xs uppercase font-mono font-bold text-neutral-700 tracking-wider block">
                  Included in This Suite:
                </span>
                <ul className="space-y-2 text-xs text-neutral-700">
                  {template.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center">
                      <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-600 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                  <li className="flex items-center">
                    <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-600 shrink-0" />
                    <span>Unlimited Guest Link Broadcasts (WhatsApp Ready)</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-600 shrink-0" />
                    <span>Lifetime Access & Free Edits from Dashboard</span>
                  </li>
                </ul>
              </div>

              {/* Customer Checkout Form */}
              <div className="space-y-3 pt-4 border-t border-stone-200">
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
                    Email Address (For Dashboard & Live Link) *
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
                <div className="space-y-2 pt-1">
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
                      placeholder="Or enter custom coupon code"
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
                        Coupon <strong>{appliedCoupon.code}</strong> applied! Saved ₹{appliedCoupon.discountAmount}
                      </span>
                      <span className="font-bold font-mono">Pay: ₹{appliedCoupon.finalAmount}</span>
                    </div>
                  )}
                </div>

                {/* Main Action Buttons */}
                <div className="space-y-2.5 pt-2">
                  {/* Admin Free Unlock Button (Visible for Admins or direct bypass) */}
                  {(user?.role === 'admin' || user?.role === 'superadmin') && (
                    <button
                      type="button"
                      onClick={() => handleQuickUnlock(true)}
                      disabled={loading}
                      className="w-full py-3 rounded-2xl bg-amber-900 hover:bg-amber-950 text-amber-50 font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-md transition-all"
                    >
                      <Sparkles className="w-4 h-4 text-amber-300" />
                      <span>👑 Admin Free Instant Unlock (₹0)</span>
                    </button>
                  )}

                  {/* Razorpay Standard Checkout Button */}
                  <button
                    type="button"
                    onClick={handleBuyTemplate}
                    disabled={loading}
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 hover:from-amber-800 hover:to-amber-800 text-white font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center space-x-2 transition-all transform hover:-translate-y-0.5 disabled:opacity-50"
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>
                      {loading
                        ? 'Processing...'
                        : appliedCoupon?.finalAmount === 0
                        ? '⚡ Unlock for Free (₹0) & Edit Now'
                        : `Unlock with Razorpay for ₹${appliedCoupon ? appliedCoupon.finalAmount : template.price}`}
                    </span>
                  </button>

                  {/* 1-Click Test / Demo Instant Unlock */}
                  <button
                    type="button"
                    onClick={() => handleQuickUnlock(false)}
                    disabled={loading}
                    className="w-full py-2.5 rounded-2xl bg-[#FFFDF9] border border-amber-800/30 hover:bg-amber-50 text-amber-900 font-bold text-xs flex items-center justify-center space-x-1.5 transition-all shadow-sm"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                    <span>⚡ 1-Click Instant Test Unlock (Bypass Payment)</span>
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-center space-x-4 text-[10.5px] text-neutral-500 font-mono pt-1">
                <span className="flex items-center"><ShieldCheck className="w-3.5 h-3.5 mr-1 text-emerald-600" /> Razorpay 256-Bit SSL</span>
                <span className="flex items-center"><Lock className="w-3.5 h-3.5 mr-1 text-amber-700" /> Instant Activation</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateDetail;
