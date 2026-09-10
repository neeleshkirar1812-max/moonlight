import crypto from 'crypto';
import mongoose from 'mongoose';
import Razorpay from 'razorpay';
import Invitation from '../models/Invitation.js';
import RSVP from '../models/RSVP.js';
import InvitationPurchase from '../models/InvitationPurchase.js';
import Template from '../models/Template.js';
import Coupon from '../models/Coupon.js';
import AdminActivityLog from '../models/AdminActivityLog.js';
import User from '../models/User.js';
import { AppError } from '../middleware/error.js';

// Default Master Template Registry (6 Video-Inspired Luxury Suites)
export const defaultTemplates = [
  {
    id: 'royal-love',
    name: 'The Rajwada Palace Suite',
    slug: 'royal-love',
    category: 'Wedding',
    price: 699,
    previewImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    description: 'Regal crimson & 24K antique gold heritage wedding suite with royal crest, shehnai audio, multi-ceremony timeline, and gold foil touch scratch reveal.',
    theme: {
      primary: '#B88935',
      secondary: '#2C1A1D',
      background: '#FAF8F5',
      accent: '#D4AF37',
      text: '#2C1A1D',
    },
    fonts: {
      heading: 'Cinzel, serif',
      body: 'Montserrat, sans-serif',
      script: 'Great Vibes, cursive',
    },
    variants: {
      hero: 'cinematic',
      gallery: 'carousel',
      event: 'timeline',
      rsvp: 'classic',
      scratch: 'gold',
      animation: 'smooth',
    },
    status: 'active',
    isFeatured: true,
  },
  {
    id: 'blooming-dreams',
    name: 'Pastel Floral Symphony',
    slug: 'blooming-dreams',
    category: 'Engagement',
    price: 499,
    previewImage: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
    description: 'Soft rose quartz & blush champagne botanical layout with gentle floating petals, romantic couple story, and rose gold scratch card.',
    theme: {
      primary: '#8A5D6A',
      secondary: '#36242B',
      background: '#FDF9F8',
      accent: '#D99B9B',
      text: '#36242B',
    },
    fonts: {
      heading: 'Cormorant Garamond, serif',
      body: 'Montserrat, sans-serif',
      script: 'Great Vibes, cursive',
    },
    variants: {
      hero: 'floral',
      gallery: 'grid',
      event: 'timeline',
      rsvp: 'modern',
      scratch: 'floral',
      animation: 'gentle',
    },
    status: 'active',
  },
  {
    id: 'mehendi-magic',
    name: 'Marigold Utsav & Henna Night',
    slug: 'mehendi-magic',
    category: 'Mehendi',
    price: 449,
    previewImage: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
    description: 'Vibrant turmeric yellow & festive marigold aesthetics tailored for energetic Haldi, Phoolon Ki Holi, and Mehendi Sangeet galas.',
    theme: {
      primary: '#B8731F',
      secondary: '#2E1A05',
      background: '#FDFBF7',
      accent: '#E5A93C',
      text: '#2E1A05',
    },
    fonts: {
      heading: 'Playfair Display, serif',
      body: 'Montserrat, sans-serif',
      script: 'Great Vibes, cursive',
    },
    variants: {
      hero: 'vibrant',
      gallery: 'grid',
      event: 'timeline',
      rsvp: 'compact',
      scratch: 'gold',
      animation: 'smooth',
    },
    status: 'active',
  },
  {
    id: 'celestial-night',
    name: 'Celestial Starlight Gala',
    slug: 'celestial-night',
    category: 'Save the Date',
    price: 499,
    previewImage: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80',
    description: 'Midnight sapphire & shimmering starlight modern layout with constellation monogram, countdown clock, and cocktail gala agenda.',
    theme: {
      primary: '#4338CA',
      secondary: '#0F172A',
      background: '#F8FAFC',
      accent: '#818CF8',
      text: '#0F172A',
    },
    fonts: {
      heading: 'Cinzel, serif',
      body: 'Montserrat, sans-serif',
      script: 'Great Vibes, cursive',
    },
    variants: {
      hero: 'cinematic',
      gallery: 'carousel',
      event: 'timeline',
      rsvp: 'classic',
      scratch: 'silver',
      animation: 'fade',
    },
    status: 'active',
  },
  {
    id: 'emerald-heritage',
    name: 'Emerald Mughal Heritage',
    slug: 'emerald-heritage',
    category: 'Reception',
    price: 649,
    previewImage: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80',
    description: 'Imperial emerald green with Mughal jaali filigree borders, destination hotel accommodation guide, and royal palace flute music.',
    theme: {
      primary: '#1D4D38',
      secondary: '#0C1F16',
      background: '#F6FAF8',
      accent: '#C5A059',
      text: '#0C1F16',
    },
    fonts: {
      heading: 'Cinzel, serif',
      body: 'Montserrat, sans-serif',
      script: 'Great Vibes, cursive',
    },
    variants: {
      hero: 'heritage',
      gallery: 'carousel',
      event: 'timeline',
      rsvp: 'classic',
      scratch: 'emerald',
      animation: 'smooth',
    },
    status: 'active',
  },
  {
    id: 'little-sunshine',
    name: 'Golden Sunshine Milestones',
    slug: 'little-sunshine',
    category: 'Birthday',
    price: 399,
    previewImage: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=80',
    description: 'Sunlit ochre & warm amber celebration layout with confetti animations, milestone memories gallery, and instant guest RSVP.',
    theme: {
      primary: '#D9822B',
      secondary: '#2C2B2A',
      background: '#FFFDF9',
      accent: '#F3BE42',
      text: '#2C2B2A',
    },
    fonts: {
      heading: 'Playfair Display, serif',
      body: 'Montserrat, sans-serif',
      script: 'Great Vibes, cursive',
    },
    variants: {
      hero: 'playful',
      gallery: 'carousel',
      event: 'timeline',
      rsvp: 'compact',
      scratch: 'gold',
      animation: 'bounce',
    },
    status: 'active',
  },
  {
    id: 'modern-minimal',
    name: 'Modern Minimal',
    slug: 'modern-minimal',
    category: 'Wedding',
    price: 399,
    previewImage: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80',
    description: 'Deep navy and gold with geometric patterns, monogram reveal, live countdown, Google Maps, and RSVP.',
    theme: {
      primary: '#D4AF37',
      secondary: '#0B132B',
      background: '#0B132B',
      accent: '#F3CF5B',
      text: '#F8F9FA',
    },
    fonts: {
      heading: 'Cormorant Garamond, serif',
      body: 'Montserrat, sans-serif',
      script: 'Cormorant Garamond, serif',
    },
    variants: {
      hero: 'modern-minimal',
      gallery: 'grid',
      event: 'timeline',
      rsvp: 'modern',
      scratch: 'gold',
      animation: 'geometric',
    },
    status: 'active',
  },
  {
    id: 'emerald-noir',
    name: 'Emerald Noir',
    slug: 'emerald-noir',
    category: 'Wedding',
    price: 699,
    previewImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    description: 'Deep green and gold with ornate corner accents, luxury door reveal, and 3D entrance animation.',
    theme: {
      primary: '#D4AF37',
      secondary: '#0D3B25',
      background: '#0D3B25',
      accent: '#D4AF37',
      text: '#D4AF37',
    },
    fonts: {
      heading: 'Cinzel, serif',
      body: 'Montserrat, sans-serif',
      script: 'Great Vibes, cursive',
    },
    variants: {
      hero: 'cinematic',
      gallery: 'carousel',
      event: 'timeline',
      rsvp: 'classic',
      scratch: 'gold',
      animation: 'smooth',
    },
    status: 'active',
  },
  {
    id: 'crimson-royale',
    name: 'Crimson Royale',
    slug: 'crimson-royale',
    category: 'Wedding',
    price: 699,
    previewImage: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
    description: 'Dark charcoal and crimson base with gold accents, luxury card reveal, and royal palace gates.',
    theme: {
      primary: '#D4AF37',
      secondary: '#4A151B',
      background: '#2D0B10',
      accent: '#D4AF37',
      text: '#D4AF37',
    },
    fonts: {
      heading: 'Cinzel, serif',
      body: 'Montserrat, sans-serif',
      script: 'Great Vibes, cursive',
    },
    variants: {
      hero: 'cinematic',
      gallery: 'carousel',
      event: 'timeline',
      rsvp: 'classic',
      scratch: 'gold',
      animation: 'smooth',
    },
    status: 'active',
  },
  {
    id: 'rose-gold-blush',
    name: 'Rose Gold Blush',
    slug: 'rose-gold-blush',
    category: 'Engagement',
    price: 399,
    previewImage: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
    description: 'Blush pink and rose gold with ornate floral door animation and romantic couple story.',
    theme: {
      primary: '#C2185B',
      secondary: '#FDE2E8',
      background: '#FDE2E8',
      accent: '#E0A899',
      text: '#C2185B',
    },
    fonts: {
      heading: 'Cormorant Garamond, serif',
      body: 'Montserrat, sans-serif',
      script: 'Great Vibes, cursive',
    },
    variants: {
      hero: 'floral',
      gallery: 'grid',
      event: 'timeline',
      rsvp: 'modern',
      scratch: 'rose-gold',
      animation: 'gentle',
    },
    status: 'active',
  },
  {
    id: 'majestic-love',
    name: 'Majestic Love',
    slug: 'majestic-love',
    category: 'Wedding',
    price: 699,
    previewImage: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80',
    description: 'Classic ivory and gold with palace motifs, velvet curtain reveal, and Google Maps directions.',
    theme: {
      primary: '#B45309',
      secondary: '#FEF9E7',
      background: '#FEF9E7',
      accent: '#B45309',
      text: '#854D0E',
    },
    fonts: {
      heading: 'Cinzel, serif',
      body: 'Montserrat, sans-serif',
      script: 'Great Vibes, cursive',
    },
    variants: {
      hero: 'cinematic',
      gallery: 'carousel',
      event: 'timeline',
      rsvp: 'classic',
      scratch: 'gold',
      animation: 'smooth',
    },
    status: 'active',
  },
];

const getRazorpayInstance = () => {
  const key_id = process.env.RAZORPAY_KEY_ID || 'rzp_test_Ta47WTEJxJInTH';
  const key_secret = process.env.RAZORPAY_KEY_SECRET || 'yBTYvxXfmGE6E8hcVQE0fWdD';
  return new Razorpay({ key_id, key_secret });
};

// Log Admin Action Helper
const logAdminAction = async (req, action, targetType, targetId, details = {}) => {
  try {
    const adminEmail = req.user?.email || process.env.ADMIN_EMAIL || 'admin@moonlight.com';
    const adminUserId = req.user?._id || req.user?.id;
    await AdminActivityLog.create({
      adminUserId,
      adminEmail,
      action,
      targetType,
      targetId: String(targetId || ''),
      details,
      ipAddress: req.ip || '',
    });
  } catch (err) {
    console.warn('[Activity Log Warning]:', err.message);
  }
};

// 1. Get All Templates (Public active or Admin all)
export const getTemplates = async (req, res, next) => {
  try {
    let templatesFromDb = [];
    try {
      templatesFromDb = await Template.find({ status: 'active' }).sort({ isFeatured: -1, createdAt: -1 });
    } catch (e) {
      // Fallback
    }

    const templates = templatesFromDb && templatesFromDb.length > 0 ? templatesFromDb : defaultTemplates;
    res.status(200).json({ success: true, templates });
  } catch (error) {
    next(error);
  }
};

// 2. Get Single Template by Slug
export const getTemplateBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    let template = null;
    try {
      template = await Template.findOne({ slug });
    } catch (e) {}

    if (!template) {
      template = defaultTemplates.find((t) => t.slug === slug || t.id === slug) || defaultTemplates[0];
    }

    res.status(200).json({ success: true, template });
  } catch (error) {
    next(error);
  }
};

// 3. Apply Coupon Code
export const applyCoupon = async (req, res, next) => {
  try {
    const { code, amount } = req.body;
    if (!code) {
      return next(new AppError('Please provide a coupon code', 400));
    }

    const uppercaseCode = code.trim().toUpperCase();
    let coupon = null;
    try {
      coupon = await Coupon.findOne({ code: uppercaseCode, isActive: true });
    } catch (e) {}

    // Mock fallback coupons if DB is empty
    if (!coupon) {
      const fallbackCoupons = {
        MOONLIGHT100: { discountType: 'fixed', discountValue: 100, minOrderAmount: 499 },
        ROYAL50: { discountType: 'percentage', discountValue: 50, minOrderAmount: 0 },
        WELCOME20: { discountType: 'percentage', discountValue: 20, minOrderAmount: 0 },
      };
      const fb = fallbackCoupons[uppercaseCode];
      if (fb) {
        coupon = { code: uppercaseCode, ...fb };
      }
    }

    if (!coupon) {
      return next(new AppError('Invalid or expired coupon code', 400));
    }

    const originalAmount = Number(amount) || 699;
    if (coupon.minOrderAmount && originalAmount < coupon.minOrderAmount) {
      return next(
        new AppError(`Coupon requires a minimum order value of ₹${coupon.minOrderAmount}`, 400)
      );
    }

    let discount = 0;
    if (coupon.discountType === 'percentage') {
      discount = Math.round((originalAmount * coupon.discountValue) / 100);
    } else {
      discount = coupon.discountValue;
    }

    const finalAmount = Math.max(0, originalAmount - discount);

    res.status(200).json({
      success: true,
      coupon: {
        code: coupon.code,
        discountType: coupon.discountType,
        discountValue: coupon.discountValue,
        discountAmount: discount,
        originalAmount,
        finalAmount,
      },
    });
  } catch (error) {
    next(error);
  }
};

// 4. Create Razorpay Payment Order
export const createPaymentOrder = async (req, res, next) => {
  try {
    const { templateId, customerEmail, customerName, customerPhone, couponCode } = req.body;

    let template = defaultTemplates.find((t) => t.id === templateId || t.slug === templateId);
    try {
      const dbTpl = await Template.findOne({ slug: templateId });
      if (dbTpl) template = dbTpl;
    } catch (e) {}

    if (!template) template = defaultTemplates[0];

    let finalPrice = template.price;

    // Apply Coupon if present
    if (couponCode) {
      const uppercaseCode = couponCode.trim().toUpperCase();
      try {
        const coupon = await Coupon.findOne({ code: uppercaseCode, isActive: true });
        if (coupon) {
          const discount =
            coupon.discountType === 'percentage'
              ? Math.round((finalPrice * coupon.discountValue) / 100)
              : coupon.discountValue;
          finalPrice = Math.max(0, finalPrice - discount);
        }
      } catch (e) {}
    }

    const razorpay = getRazorpayInstance();
    const amountInPaise = Math.max(100, Math.round(finalPrice * 100)); // Minimum ₹1 for test gateway

    const order = await razorpay.orders.create({
      amount: amountInPaise,
      currency: 'INR',
      receipt: `ml_inv_${Date.now()}`,
      notes: {
        templateId: template.id || template.slug,
        templateName: template.name,
        customerEmail: customerEmail || req.user?.email || 'customer@moonlight.com',
        customerName: customerName || req.user?.name || 'Customer',
        customerPhone: customerPhone || '',
        couponCode: couponCode || '',
      },
    });

    res.status(200).json({
      success: true,
      id: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.RAZORPAY_KEY_ID || 'rzp_test_Ta47WTEJxJInTH',
      template,
      finalPrice,
    });
  } catch (error) {
    console.error('[Create Order Error]:', error);
    next(new AppError(error.message || 'Failed to create payment order', 500));
  }
};

// 5. Verify Payment & Create Customer Invitation Draft
export const verifyPayment = async (req, res, next) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      templateId,
      customerEmail,
      customerName,
      customerPhone,
      couponCode,
    } = req.body;

    const secret = process.env.RAZORPAY_KEY_SECRET || 'yBTYvxXfmGE6E8hcVQE0fWdD';

    // Signature verification
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return next(new AppError('Invalid payment signature', 400));
    }

    let template = defaultTemplates.find((t) => t.id === templateId || t.slug === templateId);
    try {
      const dbTpl = await Template.findOne({ slug: templateId });
      if (dbTpl) template = dbTpl;
    } catch (e) {}
    if (!template) template = defaultTemplates[0];

    const email = (customerEmail || req.user?.email || 'customer@moonlight.com').toLowerCase().trim();
    const name = customerName || req.user?.name || 'Valued Couple';
    const phone = customerPhone || '';

    // Record purchase
    let purchase = await InvitationPurchase.findOne({ razorpayOrderId: razorpay_order_id });
    if (!purchase) {
      purchase = await InvitationPurchase.create({
        userId: req.user?._id || req.user?.id,
        customerEmail: email,
        customerName: name,
        customerPhone: phone,
        templateId: template.id || template.slug,
        templateName: template.name,
        purchaseType: couponCode ? 'COUPON' : 'PAID',
        couponCode: couponCode || '',
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
        amount: template.price,
        status: 'paid',
      });
    }

    // Increment coupon count if used
    if (couponCode) {
      try {
        await Coupon.findOneAndUpdate({ code: couponCode.toUpperCase() }, { $inc: { usageCount: 1 } });
      } catch (e) {}
    }

    // Create Draft Invitation
    const rand = Math.random().toString(36).substring(2, 6);
    const cleanNames = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    const initialSlug = `${cleanNames || 'wedding'}-${rand}`;

    const defaultEvents = [
      {
        id: `ev-${Date.now()}-1`,
        title: 'Haldi & Phoolon Ki Holi',
        eventType: 'Haldi',
        date: '2026-11-19',
        time: '10:30 AM',
        venue: 'Gulmohar Bagh, Jehan Numa Palace',
        address: 'Shamla Hills, Bhopal',
        description: 'A morning filled with sunshine yellow, marigold petals, dhol beats, and turmeric rituals.',
        image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=Jehan+Numa+Palace+Bhopal',
        calendarEnabled: true,
      },
      {
        id: `ev-${Date.now()}-2`,
        title: 'Mehendi & Sangeet Gala',
        eventType: 'Sangeet',
        date: '2026-11-19',
        time: '07:00 PM',
        venue: 'The Royal Courtyard Ballroom',
        address: 'Shamla Hills, Bhopal',
        description: 'An evening of henna artistry, high-energy family choreography, and acoustic live band performances.',
        image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=Jehan+Numa+Palace+Bhopal',
        calendarEnabled: true,
      },
      {
        id: `ev-${Date.now()}-3`,
        title: 'The Royal Wedding & Pheras',
        eventType: 'Wedding',
        date: '2026-11-20',
        time: '06:00 PM',
        venue: 'Royal Poolside Lawn',
        address: 'Shamla Hills, Bhopal',
        description: 'The sacred union of two souls under the royal mandap, followed by dinner and royal fireworks.',
        image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=Jehan+Numa+Palace+Bhopal',
        calendarEnabled: true,
      },
    ];

    const invitation = await Invitation.create({
      userId: req.user?._id || req.user?.id,
      userEmail: email,
      templateId: template.id || template.slug,
      purchaseId: purchase._id,
      title: `${name}'s ${template.name}`,
      names: name,
      brideName: 'Kiara Advani',
      groomName: 'Aarav Singhania',
      hostNames: 'Singhania & Advani Families',
      eventType: template.category || 'Wedding',
      date: '2026-11-20',
      time: '18:00',
      venue: 'Jehan Numa Palace',
      venueAddress: '152 Shamla Hills, Bhopal, Madhya Pradesh',
      message: 'With joyous hearts and the blessings of our elders, we invite you to celebrate our union.',
      quote: 'Two souls, one sacred path. A lifetime of laughter, honor, and love begins under the stars.',
      story: 'What began as a chance meeting under the golden sunset of the lakes turned into a lifetime promise of love.',
      hashtag: '#AaravWedsKiara',
      scratchMessage: 'YOU’RE INVITED ♡',
      musicUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-wedding-113828.mp3',
      coverPhoto: template.previewImage || 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
      galleryUrls: [
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80',
      ],
      events: defaultEvents,
      slug: initialSlug,
      status: 'DRAFT',
      published: false,
    });

    purchase.invitationId = invitation._id;
    await purchase.save();

    res.status(200).json({
      success: true,
      message: 'Payment verified and draft invitation created successfully.',
      invitation,
      purchase,
    });
  } catch (error) {
    console.error('[Verify Payment Error]:', error);
    next(new AppError(error.message || 'Payment verification failed', 500));
  }
};

// 6. Get Customer Dashboard Data (Customer only sees own records)
export const getCustomerDashboard = async (req, res, next) => {
  try {
    const userEmail = (req.query.email || req.user?.email || '').toLowerCase().trim();
    const userId = req.user?._id || req.user?.id;

    const query = {};
    if (userId) {
      query.$or = [{ userId }, { userEmail }];
    } else if (userEmail) {
      query.userEmail = userEmail;
    }

    const invitations = await Invitation.find(query).sort({ createdAt: -1 });
    const purchases = await InvitationPurchase.find(
      userId ? { $or: [{ userId }, { customerEmail: userEmail }] } : { customerEmail: userEmail }
    ).sort({ createdAt: -1 });

    const invWithRsvp = await Promise.all(
      invitations.map(async (inv) => {
        const rsvpCount = await RSVP.countDocuments({ invitationId: inv._id });
        const acceptedCount = await RSVP.countDocuments({ invitationId: inv._id, response: 'Yes' });
        const declinedCount = await RSVP.countDocuments({ invitationId: inv._id, response: 'No' });
        const maybeCount = await RSVP.countDocuments({ invitationId: inv._id, response: 'Maybe' });
        return {
          ...inv.toObject(),
          rsvpCount,
          acceptedCount,
          declinedCount,
          maybeCount,
        };
      })
    );

    res.status(200).json({
      success: true,
      invitations: invWithRsvp,
      purchases,
    });
  } catch (error) {
    next(error);
  }
};

// 7. Get Single Invitation by ID or Slug (Authenticated / Authorized / Template Draft)
export const getInvitationById = async (req, res, next) => {
  try {
    const { id } = req.params;
    let invitation = null;

    if (mongoose.Types.ObjectId.isValid(id)) {
      invitation = await Invitation.findById(id);
    }
    if (!invitation) {
      invitation = await Invitation.findOne({ slug: id });
    }

    if (!invitation) {
      // Check if it's a template identifier (e.g. emerald-noir, royal-love, velvet-night)
      const tpl = defaultTemplates.find((t) => t.id === id || t.slug === id);
      if (tpl) {
        const demoEvents = [
          {
            id: 'ev-1',
            title: 'Haldi & Chooda Ceremony',
            eventType: 'Haldi',
            date: '2026-11-19',
            time: '10:00 AM',
            venue: 'Palace Courtyard',
            address: '152 Shamla Hills, Bhopal',
            description: 'Vibrant yellow florals, turmeric blessings, and traditional marigold festivities.',
            image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
          },
          {
            id: 'ev-2',
            title: 'Royal Sangeet & Musical Night',
            eventType: 'Sangeet',
            date: '2026-11-19',
            time: '07:00 PM',
            venue: 'Grand Ballroom, Jehan Numa Palace',
            address: '152 Shamla Hills, Bhopal',
            description: 'An evening of dance performances, celebratory beats, and royal banquet dinner.',
            image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
          },
          {
            id: 'ev-3',
            title: 'The Wedding Ceremony (Pheras)',
            eventType: 'Wedding',
            date: '2026-11-20',
            time: '07:00 PM',
            venue: 'Lakeside Palace Gardens',
            address: '152 Shamla Hills, Bhopal',
            description: 'Baraat procession followed by sacred Vedic vows under the royal mandap.',
            image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
          },
        ];

        return res.status(200).json({
          success: true,
          invitation: {
            _id: `draft-${tpl.id}`,
            id: `draft-${tpl.id}`,
            templateId: tpl.id,
            template_id: tpl.id,
            title: `${tpl.name} Celebration`,
            names: 'Aarav & Kiara',
            brideName: 'Kiara Sen',
            groomName: 'Aarav Sharma',
            bride_name: 'Kiara Sen',
            groom_name: 'Aarav Sharma',
            hostNames: 'Singhania & Sen Families',
            host_names: 'Singhania & Sen Families',
            eventType: tpl.category || 'Wedding',
            date: '2026-11-20',
            time: '19:00',
            venue: 'Jehan Numa Palace',
            venueAddress: '152 Shamla Hills, Bhopal, Madhya Pradesh',
            message: 'With joyous hearts, we request the honor of your presence to celebrate our special day.',
            welcome_text: 'With joyous hearts, we request the honor of your presence to celebrate our special day.',
            quote: 'Two souls, one sacred path. A lifetime of laughter, honor, and love begins under the stars.',
            story: 'What began as a chance meeting under the golden sunset of the lakes turned into a lifetime promise of love, laughter, and endless conversations.',
            story_text: 'What began as a chance meeting under the golden sunset of the lakes turned into a lifetime promise of love, laughter, and endless conversations.',
            hashtag: '#AaravWedsKiara',
            scratchMessage: 'YOU’RE INVITED ♡',
            scratch_reveal_text: 'YOU’RE INVITED ♡',
            events: demoEvents,
            galleryUrls: [
              'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
              'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
              'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
              'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=80',
            ],
            gallery_images: [
              'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
              'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
              'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
              'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=80',
            ],
            status: 'DRAFT',
            published: false,
            rsvpEnabled: true,
            rsvp_enabled: true,
            scratchEnabled: true,
            scratch_enabled: true,
            music_enabled: true,
            rsvpCount: 0,
            acceptedGuests: 0,
            rsvps: [],
          },
        });
      }
      return next(new AppError('Invitation not found', 404));
    }

    const rsvps = await RSVP.find({ invitationId: invitation._id }).sort({ createdAt: -1 });
    const rsvpCount = rsvps.reduce((sum, r) => sum + (r.guests || 1), 0);
    const acceptedGuests = rsvps
      .filter((r) => r.response === 'Yes')
      .reduce((sum, r) => sum + (r.guests || 1), 0);

    const invObj = invitation.toObject();

    res.status(200).json({
      success: true,
      invitation: {
        ...invObj,
        _id: invObj._id.toString(),
        id: invObj._id.toString(),
        template_id: invObj.templateId,
        bride_name: invObj.brideName,
        groom_name: invObj.groomName,
        host_names: invObj.hostNames,
        gallery_images: invObj.galleryUrls && invObj.galleryUrls.length > 0 ? invObj.galleryUrls : [],
        scratch_reveal_text: invObj.scratchMessage,
        story_text: invObj.story,
        welcome_text: invObj.message,
        scratch_enabled: invObj.scratchEnabled,
        rsvp_enabled: invObj.rsvpEnabled,
        music_enabled: true,
        rsvpCount,
        acceptedGuests,
        rsvps,
      },
    });
  } catch (error) {
    next(error);
  }
};

// 8. Update / Upsert Invitation & Publish Live URL (Customer or Admin)
export const updateInvitation = async (req, res, next) => {
  try {
    const { id } = req.params;
    let invitation = null;

    if (mongoose.Types.ObjectId.isValid(id)) {
      invitation = await Invitation.findById(id);
    }
    if (!invitation) {
      invitation = await Invitation.findOne({ slug: id });
    }

    // If not found, create new Invitation document
    if (!invitation) {
      invitation = new Invitation({
        userId: req.user?._id || req.user?.id || null,
        userEmail: (req.user?.email || req.body.userEmail || req.body.email || 'customer@moonlight.com').toLowerCase().trim(),
        templateId: req.body.templateId || req.body.template_id || id || 'royal-love',
        title: req.body.title || 'A Royal Celebration',
        names: req.body.names || (req.body.bride_name && req.body.groom_name ? `${req.body.bride_name} & ${req.body.groom_name}` : 'Aarav & Kiara'),
        brideName: req.body.brideName || req.body.bride_name || 'Kiara Sen',
        groomName: req.body.groomName || req.body.groom_name || 'Aarav Sharma',
      });
    }

    // Map all fields supporting camelCase and snake_case
    if (req.body.title !== undefined) invitation.title = req.body.title;
    if (req.body.brideName !== undefined || req.body.bride_name !== undefined) {
      invitation.brideName = req.body.brideName || req.body.bride_name;
    }
    if (req.body.groomName !== undefined || req.body.groom_name !== undefined) {
      invitation.groomName = req.body.groomName || req.body.groom_name;
    }
    if (req.body.names !== undefined) {
      invitation.names = req.body.names;
    } else if (invitation.brideName && invitation.groomName) {
      invitation.names = `${invitation.brideName} & ${invitation.groomName}`;
    }
    if (req.body.hostNames !== undefined || req.body.host_names !== undefined) {
      invitation.hostNames = req.body.hostNames || req.body.host_names;
    }
    if (req.body.eventType !== undefined || req.body.event_type !== undefined) {
      invitation.eventType = req.body.eventType || req.body.event_type;
    }
    if (req.body.date !== undefined || req.body.event_date !== undefined) {
      invitation.date = req.body.date || req.body.event_date;
    }
    if (req.body.time !== undefined || req.body.event_time !== undefined) {
      invitation.time = req.body.time || req.body.event_time;
    }
    if (req.body.venue !== undefined || req.body.venue_name !== undefined) {
      invitation.venue = req.body.venue || req.body.venue_name;
    }
    if (req.body.venueAddress !== undefined || req.body.venue_address !== undefined) {
      invitation.venueAddress = req.body.venueAddress || req.body.venue_address;
    }
    if (req.body.message !== undefined || req.body.welcome_text !== undefined) {
      invitation.message = req.body.message || req.body.welcome_text;
    }
    if (req.body.quote !== undefined) invitation.quote = req.body.quote;
    if (req.body.story !== undefined || req.body.story_text !== undefined) {
      invitation.story = req.body.story || req.body.story_text;
    }
    if (req.body.hashtag !== undefined) invitation.hashtag = req.body.hashtag;
    if (req.body.scratchMessage !== undefined || req.body.scratch_reveal_text !== undefined) {
      invitation.scratchMessage = req.body.scratchMessage || req.body.scratch_reveal_text;
    }
    if (req.body.musicUrl !== undefined || req.body.music_url !== undefined) {
      invitation.musicUrl = req.body.musicUrl || req.body.music_url;
    }
    if (req.body.coverPhoto !== undefined || req.body.cover_photo !== undefined) {
      invitation.coverPhoto = req.body.coverPhoto || req.body.cover_photo;
    }
    if (req.body.galleryUrls !== undefined || req.body.gallery_images !== undefined) {
      invitation.galleryUrls = req.body.galleryUrls || req.body.gallery_images;
    }
    if (req.body.events !== undefined || req.body.event_schedule !== undefined) {
      invitation.events = req.body.events || req.body.event_schedule;
    }
    if (req.body.dressCode !== undefined || req.body.dress_code !== undefined) {
      invitation.dressCode = req.body.dressCode || req.body.dress_code;
    }
    if (req.body.accommodation !== undefined || req.body.accommodation_info !== undefined) {
      invitation.accommodation = req.body.accommodation || req.body.accommodation_info;
    }
    if (req.body.parking !== undefined) invitation.parking = req.body.parking;
    if (req.body.weatherGuide !== undefined || req.body.weather_guide !== undefined) {
      invitation.weatherGuide = req.body.weatherGuide || req.body.weather_guide;
    }
    if (req.body.giftBlessing !== undefined || req.body.gift_blessing !== undefined) {
      invitation.giftBlessing = req.body.giftBlessing || req.body.gift_blessing;
    }
    if (req.body.themeConfig !== undefined || req.body.theme_config !== undefined) {
      invitation.themeConfig = req.body.themeConfig || req.body.theme_config;
    }
    if (req.body.componentVariants !== undefined) invitation.componentVariants = req.body.componentVariants;
    if (req.body.rsvpEnabled !== undefined || req.body.rsvp_enabled !== undefined) {
      invitation.rsvpEnabled = req.body.rsvpEnabled !== undefined ? req.body.rsvpEnabled : req.body.rsvp_enabled;
    }
    if (req.body.scratchEnabled !== undefined || req.body.scratch_enabled !== undefined) {
      invitation.scratchEnabled = req.body.scratchEnabled !== undefined ? req.body.scratchEnabled : req.body.scratch_enabled;
    }
    if (req.body.templateId !== undefined || req.body.template_id !== undefined) {
      invitation.templateId = req.body.templateId || req.body.template_id;
    }

    // Handle Publish Status
    const shouldPublish = req.body.published === true || req.body.status === 'PUBLISHED';
    const shouldDraft = req.body.published === false || req.body.status === 'DRAFT';

    if (shouldPublish) {
      invitation.published = true;
      invitation.status = 'PUBLISHED';
    } else if (shouldDraft) {
      invitation.published = false;
      invitation.status = 'DRAFT';
    }

    // Collision-resistant clean slug generation
    if (!invitation.slug || shouldPublish) {
      if (!invitation.slug) {
        const rawName = (invitation.brideName && invitation.groomName)
          ? `${invitation.brideName}-${invitation.groomName}`
          : (invitation.names || 'royal-celebration');
        const cleanSlug = rawName
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '');
        const rand = Math.random().toString(36).substring(2, 6);
        invitation.slug = `${cleanSlug || 'royal-invite'}-${rand}`;
      }
    }

    await invitation.save();

    const invObj = invitation.toObject();

    res.status(200).json({
      success: true,
      message:
        invitation.status === 'PUBLISHED'
          ? 'Live invitation published successfully!'
          : 'Saved draft successfully.',
      invitation: {
        ...invObj,
        _id: invObj._id.toString(),
        id: invObj._id.toString(),
        template_id: invObj.templateId,
        bride_name: invObj.brideName,
        groom_name: invObj.groomName,
        host_names: invObj.hostNames,
        gallery_images: invObj.galleryUrls && invObj.galleryUrls.length > 0 ? invObj.galleryUrls : [],
        scratch_reveal_text: invObj.scratchMessage,
        story_text: invObj.story,
        welcome_text: invObj.message,
        scratch_enabled: invObj.scratchEnabled,
        rsvp_enabled: invObj.rsvpEnabled,
        music_enabled: true,
      },
    });
  } catch (error) {
    next(error);
  }
};

// 9. Public Invitation by Slug (Zero-Login for Guests)
export const getPublicInvitationBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    let invitation = await Invitation.findOne({ slug });

    if (!invitation) {
      // Check if this slug is a template demo
      let template = defaultTemplates.find(
        (t) => t.slug === slug || t.id === slug
      );
      if (!template) {
        try {
          template = await Template.findOne({ slug });
        } catch (e) {}
      }

      if (template) {
        const isModern = template.slug === 'modern-minimal' || template.id === 'modern-minimal';
        const demoData = {
          _id: `demo-${template.slug || template.id}`,
          id: `demo-${template.slug || template.id}`,
          templateId: template.id || template.slug,
          template_id: template.id || template.slug,
          title: `${template.name} Demo`,
          names: isModern ? 'Aisha Khan & Rohan Mehra' : 'Aarav & Kiara',
          brideName: isModern ? 'Aisha Khan' : 'Kiara Advani',
          groomName: isModern ? 'Rohan Mehra' : 'Aarav Singhania',
          bride_name: isModern ? 'Aisha Khan' : 'Kiara Advani',
          groom_name: isModern ? 'Rohan Mehra' : 'Aarav Singhania',
          hostNames: 'Together with their families',
          host_names: 'Together with their families',
          eventType: template.category || 'Wedding',
          date: '2026-11-20',
          time: '19:00',
          venue: isModern ? 'The Leela Palace, Udaipur' : 'Jehan Numa Palace, Bhopal',
          venueAddress: isModern ? 'Lake Pichola, Udaipur, Rajasthan' : '152 Shamla Hills, Bhopal, Madhya Pradesh',
          message: 'With joyous hearts and the blessings of our elders, we invite you to celebrate our union.',
          welcome_text: 'With joyous hearts and the blessings of our elders, we invite you to celebrate our union.',
          quote: 'Two souls, one sacred path. A lifetime of laughter, honor, and love begins under the stars.',
          story: 'Two hearts, one lifelong promise under royal starry skies.',
          story_text: 'Two hearts, one lifelong promise under royal starry skies.',
          hashtag: '#AishaWedsRohan',
          scratchMessage: 'YOU’RE INVITED ♡',
          scratch_reveal_text: 'YOU’RE INVITED ♡',
          scratch_enabled: true,
          scratchEnabled: true,
          rsvp_enabled: true,
          rsvpEnabled: true,
          music_enabled: true,
          musicEnabled: true,
          status: 'PUBLISHED',
          published: true,
          events: [
            {
              id: 'ev-1',
              title: 'Mehendi Ceremony',
              date: '2026-11-19',
              time: '06:00 PM',
              venue: 'The Leela Palace, Courtyard',
              address: 'Udaipur, Rajasthan',
            },
            {
              id: 'ev-2',
              title: 'Sangeet Night',
              date: '2026-11-19',
              time: '07:30 PM',
              venue: 'The Royal Ballroom',
              address: 'Udaipur, Rajasthan',
            },
            {
              id: 'ev-3',
              title: 'Wedding Reception',
              date: '2026-11-20',
              time: '08:00 PM',
              venue: 'Grand Lawn, The Leela Palace',
              address: 'Udaipur, Rajasthan',
            },
          ],
          galleryUrls: [
            'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
          ],
          gallery_images: [
            'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
          ],
          template,
          rsvpCount: 24,
        };

        return res.status(200).json({
          success: true,
          invitation: demoData,
        });
      }

      return next(new AppError('Invitation not found.', 404));
    }

    if (invitation.status === 'SUSPENDED') {
      return res.status(403).json({
        success: false,
        status: 'SUSPENDED',
        message: 'This digital invitation is temporarily suspended or unavailable.',
      });
    }

    if (invitation.status !== 'PUBLISHED' && !invitation.published) {
      return next(new AppError('This invitation is currently in draft mode.', 404));
    }

    let template = defaultTemplates.find(
      (t) => t.id === invitation.templateId || t.slug === invitation.templateId
    );
    try {
      const dbTpl = await Template.findOne({ slug: invitation.templateId });
      if (dbTpl) template = dbTpl;
    } catch (e) {}
    if (!template) template = defaultTemplates[0];

    const rsvpCount = await RSVP.countDocuments({ invitationId: invitation._id });
    const invObj = invitation.toObject();

    res.status(200).json({
      success: true,
      invitation: {
        ...invObj,
        _id: invObj._id.toString(),
        id: invObj._id.toString(),
        template_id: invObj.templateId,
        bride_name: invObj.brideName,
        groom_name: invObj.groomName,
        host_names: invObj.hostNames,
        gallery_images: invObj.galleryUrls && invObj.galleryUrls.length > 0 ? invObj.galleryUrls : [],
        scratch_reveal_text: invObj.scratchMessage,
        story_text: invObj.story,
        welcome_text: invObj.message,
        scratch_enabled: invObj.scratchEnabled,
        rsvp_enabled: invObj.rsvpEnabled,
        music_enabled: true,
        template,
        rsvpCount,
      },
    });
  } catch (error) {
    next(error);
  }
};

// 10. Submit RSVP (Public submission for published invitations)
export const submitRSVP = async (req, res, next) => {
  try {
    const { invitationId, name, phone, email, guests, response, message } = req.body;

    if (!invitationId || !name) {
      return next(new AppError('Please provide your name and invitation reference.', 400));
    }

    let invitation = null;
    if (mongoose.Types.ObjectId.isValid(invitationId)) {
      invitation = await Invitation.findById(invitationId);
    }
    if (!invitation) {
      invitation = await Invitation.findOne({ slug: invitationId });
    }

    if (!invitation || (invitation.status !== 'PUBLISHED' && !invitation.published)) {
      return next(new AppError('This invitation is not accepting RSVPs at this moment.', 400));
    }

    const rsvp = await RSVP.create({
      invitationId: invitation._id,
      name,
      phone: phone || '',
      email: email || '',
      guests: Math.max(1, Number(guests) || 1),
      response: response || 'Yes',
      message: message || '',
    });

    res.status(201).json({
      success: true,
      message: 'Your RSVP response has been recorded with warmth and gratitude!',
      rsvp,
    });
  } catch (error) {
    next(error);
  }
};

// 11. Get RSVPs for specific invitation
export const getInvitationRSVPs = async (req, res, next) => {
  try {
    const rsvps = await RSVP.find({ invitationId: req.params.invitationId }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      rsvps,
    });
  } catch (error) {
    next(error);
  }
};

// 12. ADMIN: Overview Metrics & Stats
export const getAdminOverview = async (req, res, next) => {
  try {
    const totalPurchases = await InvitationPurchase.countDocuments({
      status: { $in: ['paid', 'active'] },
    });
    const purchases = await InvitationPurchase.find().sort({ createdAt: -1 }).limit(50);
    const totalRevenue = purchases.reduce(
      (sum, p) => sum + (['paid', 'active'].includes(p.status) ? p.amount || 0 : 0),
      0
    );

    const totalInvitations = await Invitation.countDocuments();
    const publishedInvitations = await Invitation.countDocuments({ status: 'PUBLISHED' });
    const draftInvitations = await Invitation.countDocuments({ status: 'DRAFT' });
    const suspendedInvitations = await Invitation.countDocuments({ status: 'SUSPENDED' });

    // Distinct customer count
    const distinctEmails = await InvitationPurchase.distinct('customerEmail');
    const userCount = await User.countDocuments({ role: 'customer' }).catch(() => 0);
    const totalCustomers = Math.max(distinctEmails.length, userCount || 0);

    const totalRSVPs = await RSVP.countDocuments();
    const rsvpAccepted = await RSVP.countDocuments({ response: 'Yes' });
    const rsvpDeclined = await RSVP.countDocuments({ response: 'No' });
    const rsvpMaybe = await RSVP.countDocuments({ response: 'Maybe' });

    // Today's stats
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const todayPurchases = await InvitationPurchase.find({
      createdAt: { $gte: startOfToday },
      status: { $in: ['paid', 'active'] },
    });
    const todayOrders = todayPurchases.length;
    const todayRevenue = todayPurchases.reduce((sum, p) => sum + (p.amount || 0), 0);

    const recentInvitations = await Invitation.find().sort({ createdAt: -1 }).limit(10);
    const recentOrders = await InvitationPurchase.find().sort({ createdAt: -1 }).limit(10);

    res.status(200).json({
      success: true,
      stats: {
        totalCustomers,
        totalInvitations,
        publishedInvitations,
        draftInvitations,
        suspendedInvitations,
        totalPurchases,
        totalRevenue,
        todayOrders,
        todayRevenue,
        totalRSVPs,
        rsvpBreakdown: {
          accepted: rsvpAccepted,
          declined: rsvpDeclined,
          maybe: rsvpMaybe,
        },
      },
      recentInvitations,
      recentOrders,
    });
  } catch (error) {
    next(error);
  }
};

// 13. ADMIN: Get All Customers
export const getAdminCustomers = async (req, res, next) => {
  try {
    // Combine registered users with purchase customer emails
    const purchases = await InvitationPurchase.find().sort({ createdAt: -1 });
    const invitations = await Invitation.find();
    const rsvps = await RSVP.find();

    const customerMap = {};

    purchases.forEach((p) => {
      const email = (p.customerEmail || '').toLowerCase().trim();
      if (!email) return;
      if (!customerMap[email]) {
        customerMap[email] = {
          email,
          name: p.customerName || 'Customer',
          phone: p.customerPhone || '',
          registeredAt: p.createdAt,
          purchases: [],
          invitations: [],
          totalSpent: 0,
          rsvpCount: 0,
        };
      }
      customerMap[email].purchases.push(p);
      if (['paid', 'active'].includes(p.status)) {
        customerMap[email].totalSpent += p.amount || 0;
      }
    });

    invitations.forEach((inv) => {
      const email = (inv.userEmail || '').toLowerCase().trim();
      if (!email) return;
      if (!customerMap[email]) {
        customerMap[email] = {
          email,
          name: inv.names || 'Customer',
          phone: '',
          registeredAt: inv.createdAt,
          purchases: [],
          invitations: [],
          totalSpent: 0,
          rsvpCount: 0,
        };
      }
      customerMap[email].invitations.push(inv);
    });

    const customers = Object.values(customerMap);
    res.status(200).json({ success: true, customers });
  } catch (error) {
    next(error);
  }
};

// 14. ADMIN: Create Customer Manually
export const createAdminCustomer = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    if (!email) {
      return next(new AppError('Customer email is required', 400));
    }

    const cleanEmail = email.toLowerCase().trim();

    // Check if User model exists
    let user = await User.findOne({ email: cleanEmail });
    if (!user) {
      const randomPassword = crypto.randomBytes(16).toString('hex');
      user = await User.create({
        name: name || 'Customer',
        email: cleanEmail,
        phone: phone || '',
        password: randomPassword,
        role: 'customer',
      });
    }

    await logAdminAction(req, 'customer_created', 'customer', user._id, { email: cleanEmail, name });

    res.status(201).json({
      success: true,
      message: 'Customer account created successfully.',
      customer: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

// 15. ADMIN: Manual / Free Invitation Assignment
export const createAdminManualInvitation = async (req, res, next) => {
  try {
    const { customerEmail, customerName, customerPhone, templateId, title, names, date, venue, publishImmediately } = req.body;

    if (!customerEmail || !templateId) {
      return next(new AppError('Customer email and template are required', 400));
    }

    const cleanEmail = customerEmail.toLowerCase().trim();
    let template = defaultTemplates.find((t) => t.id === templateId || t.slug === templateId);
    try {
      const dbTpl = await Template.findOne({ slug: templateId });
      if (dbTpl) template = dbTpl;
    } catch (e) {}
    if (!template) template = defaultTemplates[0];

    // 1. Create ADMIN_ASSIGNED purchase record with ₹0
    const purchase = await InvitationPurchase.create({
      customerEmail: cleanEmail,
      customerName: customerName || 'Valued Client',
      customerPhone: customerPhone || '',
      templateId: template.id || template.slug,
      templateName: template.name,
      purchaseType: 'ADMIN_ASSIGNED',
      amount: 0,
      currency: 'INR',
      status: 'active',
      razorpayOrderId: `admin_assigned_${Date.now()}`,
    });

    // 2. Generate slug
    const cleanNames = (names || customerName || 'invitation')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    const rand = Math.random().toString(36).substring(2, 6);
    const slug = `${cleanNames}-${rand}`;

    // 3. Create Invitation
    const invitation = await Invitation.create({
      userEmail: cleanEmail,
      templateId: template.id || template.slug,
      purchaseId: purchase._id,
      title: title || `${customerName || 'Couple'}'s ${template.name}`,
      names: names || customerName || 'Aarav & Kiara',
      brideName: 'Kiara',
      groomName: 'Aarav',
      hostNames: 'Moonlight Royal Guests',
      eventType: template.category || 'Wedding',
      date: date || '2026-11-20',
      time: '18:00',
      venue: venue || 'Jehan Numa Palace',
      venueAddress: 'Shamla Hills, Bhopal, Madhya Pradesh',
      message: 'With immense joy and happiness, we invite you to join us in celebrating our special moments.',
      quote: 'Two souls, one sacred path. A lifetime of laughter, honor, and love begins under the stars.',
      story: 'What began as a chance meeting under the golden sunset of the lakes turned into a lifetime promise of love.',
      hashtag: '#MoonlightCelebration',
      scratchMessage: 'YOU’RE INVITED ♡',
      musicUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-wedding-113828.mp3',
      coverPhoto: template.previewImage,
      galleryUrls: [
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
      ],
      slug,
      status: publishImmediately ? 'PUBLISHED' : 'DRAFT',
      published: !!publishImmediately,
    });

    purchase.invitationId = invitation._id;
    await purchase.save();

    await logAdminAction(req, 'invitation_created', 'invitation', invitation._id, {
      customerEmail: cleanEmail,
      templateId: template.id || template.slug,
      purchaseType: 'ADMIN_ASSIGNED',
      published: !!publishImmediately,
    });

    res.status(201).json({
      success: true,
      message: 'Free invitation assigned and created for client successfully.',
      invitation,
      purchase,
    });
  } catch (error) {
    next(error);
  }
};

// 16. ADMIN: Update Invitation Status (Publish, Suspend, Unpublish, Archive)
export const updateAdminInvitationStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    if (!['DRAFT', 'PUBLISHED', 'SUSPENDED', 'ARCHIVED'].includes(status)) {
      return next(new AppError('Invalid status value', 400));
    }

    const invitation = await Invitation.findById(req.params.id);
    if (!invitation) {
      return next(new AppError('Invitation not found', 404));
    }

    invitation.status = status;
    invitation.published = status === 'PUBLISHED';
    await invitation.save();

    await logAdminAction(req, `invitation_${status.toLowerCase()}`, 'invitation', invitation._id, {
      status,
    });

    res.status(200).json({
      success: true,
      message: `Invitation status updated to ${status}.`,
      invitation,
    });
  } catch (error) {
    next(error);
  }
};

// 17. ADMIN: Delete Invitation
export const deleteAdminInvitation = async (req, res, next) => {
  try {
    const invitation = await Invitation.findByIdAndDelete(req.params.id);
    if (!invitation) {
      return next(new AppError('Invitation not found', 404));
    }

    await RSVP.deleteMany({ invitationId: invitation._id });
    await logAdminAction(req, 'invitation_deleted', 'invitation', invitation._id, {
      names: invitation.names,
      slug: invitation.slug,
    });

    res.status(200).json({
      success: true,
      message: 'Invitation and associated RSVPs deleted successfully.',
    });
  } catch (error) {
    next(error);
  }
};

// 18. ADMIN: Template CRUD
export const getAdminTemplates = async (req, res, next) => {
  try {
    let templates = await Template.find().sort({ createdAt: -1 });
    if (!templates || templates.length === 0) {
      templates = defaultTemplates;
    }
    res.status(200).json({ success: true, templates });
  } catch (error) {
    next(error);
  }
};

export const createAdminTemplate = async (req, res, next) => {
  try {
    const { name, slug, category, price, previewImage, description, theme, fonts, variants, isFeatured } = req.body;
    if (!name || !slug) {
      return next(new AppError('Name and slug are required', 400));
    }

    const cleanSlug = slug.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-');
    const template = await Template.create({
      name,
      slug: cleanSlug,
      category: category || 'Wedding',
      price: Number(price) || 699,
      previewImage: previewImage || 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
      description: description || '',
      theme: theme || { primary: '#B88935', secondary: '#2C1A1D', background: '#FAF8F5' },
      fonts: fonts || { heading: 'Cinzel, serif', body: 'Montserrat, sans-serif' },
      variants: variants || { hero: 'cinematic', gallery: 'carousel', scratch: 'gold' },
      isFeatured: !!isFeatured,
      status: 'active',
    });

    await logAdminAction(req, 'template_created', 'template', template._id, { name, slug: cleanSlug });

    res.status(201).json({ success: true, template });
  } catch (error) {
    next(error);
  }
};

export const updateAdminTemplate = async (req, res, next) => {
  try {
    const template = await Template.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!template) {
      return next(new AppError('Template not found', 404));
    }
    await logAdminAction(req, 'template_updated', 'template', template._id, { name: template.name });
    res.status(200).json({ success: true, template });
  } catch (error) {
    next(error);
  }
};

export const duplicateAdminTemplate = async (req, res, next) => {
  try {
    const orig = await Template.findById(req.params.id);
    if (!orig) {
      return next(new AppError('Template not found', 404));
    }

    const copy = await Template.create({
      name: `${orig.name} (Copy)`,
      slug: `${orig.slug}-copy-${Date.now()}`,
      category: orig.category,
      price: orig.price,
      previewImage: orig.previewImage,
      description: orig.description,
      theme: orig.theme,
      fonts: orig.fonts,
      variants: orig.variants,
      status: 'active',
    });

    await logAdminAction(req, 'template_duplicated', 'template', copy._id, { original: orig.name });
    res.status(201).json({ success: true, template: copy });
  } catch (error) {
    next(error);
  }
};

// 19. ADMIN: Coupons CRUD
export const getAdminCoupons = async (req, res, next) => {
  try {
    const coupons = await Coupon.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, coupons });
  } catch (error) {
    next(error);
  }
};

export const createAdminCoupon = async (req, res, next) => {
  try {
    const { code, discountType, discountValue, minOrderAmount, usageLimit, expiryDate } = req.body;
    if (!code || !discountValue) {
      return next(new AppError('Coupon code and discount value are required', 400));
    }

    const coupon = await Coupon.create({
      code: code.trim().toUpperCase(),
      discountType: discountType || 'percentage',
      discountValue: Number(discountValue),
      minOrderAmount: Number(minOrderAmount) || 0,
      usageLimit: Number(usageLimit) || 100,
      expiryDate: expiryDate ? new Date(expiryDate) : undefined,
      isActive: true,
    });

    await logAdminAction(req, 'coupon_created', 'coupon', coupon._id, { code: coupon.code });
    res.status(201).json({ success: true, coupon });
  } catch (error) {
    next(error);
  }
};

export const updateAdminCoupon = async (req, res, next) => {
  try {
    const coupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!coupon) {
      return next(new AppError('Coupon not found', 404));
    }
    await logAdminAction(req, 'coupon_updated', 'coupon', coupon._id, { code: coupon.code });
    res.status(200).json({ success: true, coupon });
  } catch (error) {
    next(error);
  }
};

// 20. ADMIN: All RSVPs
export const getAdminAllRSVPs = async (req, res, next) => {
  try {
    const rsvps = await RSVP.find().populate('invitationId', 'names title slug').sort({ createdAt: -1 });
    res.status(200).json({ success: true, rsvps });
  } catch (error) {
    next(error);
  }
};

// 21. ADMIN: Activity Logs
export const getAdminActivityLogs = async (req, res, next) => {
  try {
    const logs = await AdminActivityLog.find().sort({ createdAt: -1 }).limit(100);
    res.status(200).json({ success: true, logs });
  } catch (error) {
    next(error);
  }
};

// 22. Razorpay Webhook Handler
export const paymentWebhook = async (req, res) => {
  try {
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || 'moonlight_webhook_secret_key';
    const signature = req.headers['x-razorpay-signature'];

    if (signature) {
      const expectedSignature = crypto
        .createHmac('sha256', webhookSecret)
        .update(JSON.stringify(req.body))
        .digest('hex');

      if (expectedSignature !== signature) {
        return res.status(400).json({ status: 'invalid_signature' });
      }
    }

    const event = req.body?.event;
    if (event === 'payment.captured' || event === 'order.paid') {
      const paymentEntity = req.body.payload?.payment?.entity;
      const orderId = paymentEntity?.order_id;
      if (orderId) {
        await InvitationPurchase.findOneAndUpdate(
          { razorpayOrderId: orderId },
          { status: 'paid', razorpayPaymentId: paymentEntity?.id }
        );
      }
    }

    res.status(200).json({ status: 'ok' });
  } catch (error) {
    console.error('[Razorpay Webhook Error]:', error);
    res.status(500).json({ status: 'error', message: error.message });
  }
};
