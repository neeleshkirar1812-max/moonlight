import crypto from 'crypto';
import Razorpay from 'razorpay';
import Invitation from '../models/Invitation.js';
import RSVP from '../models/RSVP.js';
import InvitationPurchase from '../models/InvitationPurchase.js';
import { AppError } from '../middleware/error.js';

// Pre-defined template list with pricing
export const templates = [
  { id: 'royal-love', name: 'Royal Love', category: 'Wedding', price: 699, image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80', description: 'Regal gold & velvet heritage wedding suite with countdown and royal crest.' },
  { id: 'blooming-dreams', name: 'Blooming Dreams', category: 'Engagement', price: 499, image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80', description: 'Pastel floral luxury invitation with interactive scratch card and gentle animations.' },
  { id: 'little-sunshine', name: 'A Little Sunshine', category: 'Birthday', price: 399, image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=80', description: 'Joyful celebration layout with balloons, timeline, and instant guest RSVP.' },
  { id: 'together-forever', name: 'Together Forever', category: 'Anniversary', price: 599, image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=80', description: 'Timeless anniversary design with couple memories gallery and music player.' },
  { id: 'golden-vows', name: 'Golden Vows', category: 'Reception', price: 649, image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=80', description: 'Opulent gold foil accents and cinematic countdown for gala receptions.' },
  { id: 'ethereal-bloom', name: 'Ethereal Bloom', category: 'Haldi', price: 449, image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80', description: 'Vibrant marigold & turmeric aesthetics designed for joyous Haldi & Mehendi festivities.' },
];

export const getTemplateById = (id) => templates.find((t) => t.id === id) || templates[0];

const getRazorpayInstance = () => {
  const key_id = process.env.RAZORPAY_KEY_ID || 'rzp_test_Ta47WTEJxJInTH';
  const key_secret = process.env.RAZORPAY_KEY_SECRET || 'yBTYvxXfmGE6E8hcVQE0fWdD';
  return new Razorpay({ key_id, key_secret });
};

// 1. Create Razorpay Order
export const createPaymentOrder = async (req, res, next) => {
  try {
    const { templateId, customerEmail, customerName } = req.body;
    const template = getTemplateById(templateId);

    const razorpay = getRazorpayInstance();
    const amountInPaise = template.price * 100;

    const order = await razorpay.orders.create({
      amount: amountInPaise,
      currency: 'INR',
      receipt: `moonlight_inv_${Date.now()}`,
      notes: {
        templateId: template.id,
        templateName: template.name,
        customerEmail: customerEmail || req.user?.email || 'customer@moonlight.com',
        customerName: customerName || req.user?.name || 'Customer',
      },
    });

    res.status(200).json({
      success: true,
      id: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.RAZORPAY_KEY_ID || 'rzp_test_Ta47WTEJxJInTH',
      template,
    });
  } catch (error) {
    console.error('[Create Order Error]:', error);
    next(new AppError(error.message || 'Failed to create payment order', 500));
  }
};

// 2. Verify Razorpay Payment & Create Draft Invitation
export const verifyPayment = async (req, res, next) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, templateId, customerEmail, customerName } = req.body;
    const secret = process.env.RAZORPAY_KEY_SECRET || 'yBTYvxXfmGE6E8hcVQE0fWdD';

    // Signature verification
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return next(new AppError('Invalid payment signature', 400));
    }

    const template = getTemplateById(templateId);
    const email = customerEmail || req.user?.email || 'customer@moonlight.com';
    const name = customerName || req.user?.name || 'Valued Couple';

    // Record purchase
    let purchase = await InvitationPurchase.findOne({ razorpayOrderId: razorpay_order_id });
    if (!purchase) {
      purchase = await InvitationPurchase.create({
        userId: req.user?._id,
        customerEmail: email,
        customerName: name,
        templateId: template.id,
        templateName: template.name,
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
        amount: template.price,
        status: 'paid',
      });
    }

    // Create Draft Invitation
    const rand = Math.random().toString(36).substring(2, 6);
    const cleanNames = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    const initialSlug = `${cleanNames || 'wedding'}-${rand}`;

    const invitation = await Invitation.create({
      userId: req.user?._id,
      userEmail: email,
      templateId: template.id,
      purchaseId: purchase._id,
      title: `${name}'s ${template.name}`,
      names: name,
      eventType: template.category,
      date: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      time: '19:00',
      venue: 'Jehan Numa Palace',
      venueAddress: '152 Shamla Hills, Bhopal, Madhya Pradesh',
      message: 'With joyous hearts, we request the honor of your presence to celebrate our special day.',
      scratchMessage: 'YOU’RE INVITED ♡',
      slug: initialSlug,
      published: false,
    });

    purchase.invitationId = invitation._id;
    await purchase.save();

    res.status(200).json({
      success: true,
      message: 'Payment verified and draft invitation created successfully.',
      invitation,
    });
  } catch (error) {
    console.error('[Verify Payment Error]:', error);
    next(new AppError(error.message || 'Payment verification failed', 500));
  }
};

// 3. Get Customer Dashboard & Invitations
export const getCustomerDashboard = async (req, res, next) => {
  try {
    const userEmail = req.query.email || req.user?.email;
    const query = userEmail ? { userEmail } : {};

    const invitations = await Invitation.find(query).sort({ createdAt: -1 });

    // Attach RSVP counts
    const invWithRsvp = await Promise.all(
      invitations.map(async (inv) => {
        const rsvpCount = await RSVP.countDocuments({ invitationId: inv._id });
        const acceptedCount = await RSVP.countDocuments({ invitationId: inv._id, response: 'Yes' });
        return {
          ...inv.toObject(),
          rsvpCount,
          acceptedCount,
        };
      })
    );

    res.status(200).json({
      success: true,
      invitations: invWithRsvp,
    });
  } catch (error) {
    next(error);
  }
};

// 4. Get Invitation by ID
export const getInvitationById = async (req, res, next) => {
  try {
    const invitation = await Invitation.findById(req.params.id);
    if (!invitation) {
      return next(new AppError('Invitation not found', 404));
    }
    const rsvpCount = await RSVP.countDocuments({ invitationId: invitation._id });
    res.status(200).json({
      success: true,
      invitation: {
        ...invitation.toObject(),
        rsvpCount,
      },
    });
  } catch (error) {
    next(error);
  }
};

// 5. Update / Publish Invitation
export const updateInvitation = async (req, res, next) => {
  try {
    const { title, names, eventType, date, time, venue, venueAddress, message, scratchMessage, musicUrl, coverPhoto, galleryUrls, published, rsvpEnabled, scratchEnabled } = req.body;

    const invitation = await Invitation.findById(req.params.id);
    if (!invitation) {
      return next(new AppError('Invitation not found', 404));
    }

    if (title !== undefined) invitation.title = title;
    if (names !== undefined) invitation.names = names;
    if (eventType !== undefined) invitation.eventType = eventType;
    if (date !== undefined) invitation.date = date;
    if (time !== undefined) invitation.time = time;
    if (venue !== undefined) invitation.venue = venue;
    if (venueAddress !== undefined) invitation.venueAddress = venueAddress;
    if (message !== undefined) invitation.message = message;
    if (scratchMessage !== undefined) invitation.scratchMessage = scratchMessage;
    if (musicUrl !== undefined) invitation.musicUrl = musicUrl;
    if (coverPhoto !== undefined) invitation.coverPhoto = coverPhoto;
    if (galleryUrls !== undefined) invitation.galleryUrls = galleryUrls;
    if (rsvpEnabled !== undefined) invitation.rsvpEnabled = rsvpEnabled;
    if (scratchEnabled !== undefined) invitation.scratchEnabled = scratchEnabled;

    if (published !== undefined) {
      invitation.published = published;
      if (published && !invitation.slug) {
        const cleanNames = (invitation.names || 'event').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
        const rand = Math.random().toString(36).substring(2, 6);
        invitation.slug = `${cleanNames}-${rand}`;
      }
    }

    await invitation.save();

    res.status(200).json({
      success: true,
      message: invitation.published ? 'Live invitation published successfully!' : 'Saved as draft.',
      invitation,
    });
  } catch (error) {
    next(error);
  }
};

// 6. Public Invitation by Slug (No login required)
export const getPublicInvitationBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const invitation = await Invitation.findOne({ slug, published: true });

    if (!invitation) {
      return next(new AppError('Invitation not found or not published yet.', 404));
    }

    const template = getTemplateById(invitation.templateId);
    const rsvpCount = await RSVP.countDocuments({ invitationId: invitation._id });

    res.status(200).json({
      success: true,
      invitation: {
        ...invitation.toObject(),
        template,
        rsvpCount,
      },
    });
  } catch (error) {
    next(error);
  }
};

// 7. Submit RSVP (Public for published invitations)
export const submitRSVP = async (req, res, next) => {
  try {
    const { invitationId, name, phone, email, guests, response, message } = req.body;

    if (!invitationId || !name) {
      return next(new AppError('Please provide your name and invitation reference.', 400));
    }

    const invitation = await Invitation.findById(invitationId);
    if (!invitation || !invitation.published) {
      return next(new AppError('This invitation is not accepting RSVPs currently.', 400));
    }

    const rsvp = await RSVP.create({
      invitationId,
      name,
      phone: phone || '',
      email: email || '',
      guests: Number(guests) || 1,
      response: response || 'Yes',
      message: message || '',
    });

    res.status(201).json({
      success: true,
      message: 'RSVP received with joy! Thank you.',
      rsvp,
    });
  } catch (error) {
    next(error);
  }
};

// 8. Get RSVPs for an invitation
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

// 9. Admin Overview Stats
export const getAdminStats = async (req, res, next) => {
  try {
    const totalPurchases = await InvitationPurchase.countDocuments({ status: 'paid' });
    const purchases = await InvitationPurchase.find().sort({ createdAt: -1 }).limit(100);
    const totalRevenue = purchases.reduce((sum, p) => sum + (p.status === 'paid' ? p.amount : 0), 0);

    const totalInvitations = await Invitation.countDocuments();
    const publishedInvitations = await Invitation.countDocuments({ published: true });
    const invitations = await Invitation.find().sort({ createdAt: -1 }).limit(100);

    const totalRSVPs = await RSVP.countDocuments();

    res.status(200).json({
      success: true,
      stats: {
        totalPurchases,
        totalRevenue,
        totalInvitations,
        publishedInvitations,
        totalRSVPs,
      },
      purchases,
      invitations,
    });
  } catch (error) {
    next(error);
  }
};
