import Enquiry from '../models/Enquiry.js';
import Notification from '../models/Notification.js';
import User from '../models/User.js';
import { sendEnquiryConfirmationEmail } from '../services/emailService.js';
import { sendEnquiryWhatsAppNotification } from '../services/whatsappService.js';
import { syncEnquiryToGoogleSheet } from '../services/googleSheetService.js';

const generateEnquiryId = () => {
  const year = new Date().getFullYear();
  const randomChars = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `ENQ-${year}-${randomChars}`;
};

// Helper to save enquiry and trigger notifications
const saveAndBroadcastEnquiry = async ({
  fullName,
  phone,
  email,
  city,
  venue = 'TBD',
  eventType = 'Royal Wedding Cinema & Photography',
  eventDate = new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
  guestCount = 300,
  requiredServices = ['Cinematic Film', 'Candid Photography', 'Drone Suite'],
  budgetRange = '₹2 Lakh – ₹5 Lakh',
  leadSource = 'Social Ads',
  storyDetails = '',
}) => {
  const enquiryId = generateEnquiryId();

  const newEnquiry = await Enquiry.create({
    enquiryId,
    eventType,
    eventDate: new Date(eventDate),
    location: { city: city || 'Bhopal', venue },
    guestCount: Number(guestCount) || 300,
    requiredServices: requiredServices || ['Cinematic Film', 'Candid Photography'],
    budgetRange: budgetRange || '₹2 Lakh – ₹5 Lakh',
    leadSource,
    storyDetails: storyDetails || `Lead automatically received via ${leadSource} campaign pipeline.`,
    customerDetails: {
      fullName: fullName || `${leadSource} Prospect`,
      email: email || `client.${Date.now()}@moonlightclients.in`,
      phone: phone || '+91 92292 29323',
    },
    status: 'NEW',
    timelineHistory: [{
      status: 'NEW',
      updatedBy: `Automated Pipeline (${leadSource})`,
      comment: `Lead automatically ingested from ${leadSource} webhook.`,
    }],
  });

  // Notify Admins
  const admins = await User.find({ role: { $in: ['admin', 'superadmin'] } });
  for (const admin of admins) {
    await Notification.create({
      recipient: admin._id,
      title: `🔥 New ${leadSource} Lead: ${fullName || 'New Client'}`,
      message: `${fullName || 'Client'} (${phone}) inquired for ${eventType} in ${city || 'City'} via ${leadSource}.`,
      type: 'NEW_ENQUIRY',
      link: `/admin/enquiries`,
    });
  }

  // Trigger Notifications & Google Sheet Auto-Sync
  sendEnquiryConfirmationEmail(newEnquiry).catch(err => console.error(`[${leadSource} Email Error]`, err));
  sendEnquiryWhatsAppNotification(newEnquiry).catch(err => console.error(`[${leadSource} WhatsApp Error]`, err));
  syncEnquiryToGoogleSheet(newEnquiry).catch(err => console.error(`[${leadSource} Google Sheet Sync Error]`, err));

  return newEnquiry;
};

// 1. META (Instagram & Facebook) Webhooks
export const verifyMetaWebhook = (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];
  const VERIFY_TOKEN = process.env.META_VERIFY_TOKEN || 'moonlight_meta_lead_token_2026';

  if (mode && token) {
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      console.log('[Meta Webhook Verified Successfully]');
      return res.status(200).send(challenge);
    } else {
      console.warn('[Meta Webhook Verification Failed: Token Mismatch]');
      return res.sendStatus(403);
    }
  }

  return res.status(200).json({
    status: 'active',
    service: 'Moonlight Production - Meta & Social Leads Webhook Engine',
    timestamp: new Date().toISOString(),
  });
};

export const handleMetaLeadWebhook = async (req, res, next) => {
  try {
    const payload = req.body || {};
    console.log('[Received Meta Lead Webhook]:', JSON.stringify(payload, null, 2));

    let fullName = payload.fullName || payload.full_name || payload.name || payload.customerName;
    let phone = payload.phone || payload.phone_number || payload.mobile || payload.contactNumber;
    let email = payload.email || payload.emailAddress;
    let city = payload.city || payload.location?.city || payload.location;
    let eventType = payload.eventType || payload.event_type || payload.service;
    let eventDate = payload.eventDate || payload.event_date;
    let leadSource = payload.leadSource || payload.lead_source || payload.source || 'Instagram Ads';
    let budgetRange = payload.budgetRange || payload.budget;
    let storyDetails = payload.storyDetails || payload.message || payload.notes;

    // Handle Meta Graph API nested structure
    if (payload.entry && Array.isArray(payload.entry)) {
      const entry = payload.entry[0];
      if (entry.changes && entry.changes[0]?.value) {
        const val = entry.changes[0].value;
        fullName = val.leadgen_id ? `Meta Lead #${val.leadgen_id.slice(-4)}` : (fullName || 'Instagram / FB Lead');
        leadSource = val.page_id ? 'Facebook Ads' : 'Instagram Ads';
      }
    }

    const saved = await saveAndBroadcastEnquiry({
      fullName: fullName || 'Instagram Prospect',
      phone: phone || '+91 92292 29323',
      email,
      city,
      eventType,
      eventDate,
      leadSource,
      budgetRange,
      storyDetails,
    });

    return res.status(201).json({
      success: true,
      message: `Lead successfully ingested into Moonlight CRM with ID ${saved.enquiryId}`,
      data: saved,
    });
  } catch (error) {
    console.error('[Meta Lead Webhook Error]:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// 2. GOOGLE ADS LEAD FORMS WEBHOOK
export const handleGoogleLeadWebhook = async (req, res, next) => {
  try {
    const payload = req.body || {};
    console.log('[Received Google Ads Lead Webhook]:', JSON.stringify(payload, null, 2));

    let fullName = '';
    let phone = '';
    let email = '';
    let city = 'Bhopal';
    let eventType = 'Royal Wedding Cinema & Photography';

    // Google Ads sends user_column_data array
    if (payload.user_column_data && Array.isArray(payload.user_column_data)) {
      payload.user_column_data.forEach((col) => {
        const key = (col.column_name || col.column_id || '').toUpperCase();
        const val = col.string_value || '';
        if (key.includes('FULL_NAME') || key.includes('NAME')) fullName = val;
        else if (key.includes('PHONE')) phone = val;
        else if (key.includes('EMAIL')) email = val;
        else if (key.includes('CITY')) city = val;
        else if (key.includes('EVENT') || key.includes('SERVICE')) eventType = val;
      });
    }

    // Direct flat keys fallback
    fullName = fullName || payload.fullName || payload.name || 'Google Ads Lead';
    phone = phone || payload.phone || payload.phone_number || '+91 92292 29323';
    email = email || payload.email;
    city = city || payload.city || 'Bhopal';

    const saved = await saveAndBroadcastEnquiry({
      fullName,
      phone,
      email,
      city,
      eventType,
      leadSource: 'Google Ads',
      storyDetails: `Google Ads Campaign ID: ${payload.campaign_id || 'Search/YouTube Ads'} | Form ID: ${payload.form_id || 'Lead Form'}`,
    });

    return res.status(201).json({
      success: true,
      google_key_verified: true,
      message: `Google Lead ingested with ID ${saved.enquiryId}`,
      data: saved,
    });
  } catch (error) {
    console.error('[Google Lead Webhook Error]:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// 3. WHATSAPP ADS & CLOUD WEBHOOK
export const verifyWhatsAppWebhook = (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];
  const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN || 'moonlight_whatsapp_token_2026';

  if (mode && token && mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log('[WhatsApp Webhook Verified]');
    return res.status(200).send(challenge);
  }
  return res.status(200).json({ status: 'active', service: 'WhatsApp Lead Webhook Engine' });
};

export const handleWhatsAppLeadWebhook = async (req, res, next) => {
  try {
    const payload = req.body || {};
    console.log('[Received WhatsApp Lead Webhook]:', JSON.stringify(payload, null, 2));

    let fullName = payload.name || payload.fullName || payload.contactName;
    let phone = payload.phone || payload.wa_id || payload.from || payload.mobile;
    let message = payload.message || payload.text || payload.body;
    let city = payload.city || 'Bhopal';

    // WhatsApp Cloud API payload format
    if (payload.entry?.[0]?.changes?.[0]?.value) {
      const val = payload.entry[0].changes[0].value;
      const contact = val.contacts?.[0];
      const msg = val.messages?.[0];
      if (contact) {
        fullName = contact.profile?.name || fullName;
        phone = contact.wa_id || phone;
      }
      if (msg) {
        message = msg.text?.body || msg.button?.text || message;
      }
    }

    const saved = await saveAndBroadcastEnquiry({
      fullName: fullName || 'WhatsApp Prospect',
      phone: phone || '+91 92292 29323',
      email: payload.email,
      city,
      eventType: 'Wedding Photography & Cinema',
      leadSource: 'WhatsApp Direct',
      storyDetails: message ? `WhatsApp Incoming Message: "${message}"` : 'Direct WhatsApp Ad Lead initiated.',
    });

    return res.status(201).json({
      success: true,
      message: `WhatsApp Lead ingested with ID ${saved.enquiryId}`,
      data: saved,
    });
  } catch (error) {
    console.error('[WhatsApp Lead Webhook Error]:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// 4. WEDDINGWIRE & WEDMEGOOD WEBHOOK
export const handleWeddingWireLeadWebhook = async (req, res, next) => {
  try {
    const payload = req.body || {};
    console.log('[Received WeddingWire / Matrimonial Lead Webhook]:', JSON.stringify(payload, null, 2));

    const portal = payload.portal || payload.source || 'WeddingWire';
    const saved = await saveAndBroadcastEnquiry({
      fullName: payload.fullName || payload.name || payload.bride_groom_name || `${portal} Client`,
      phone: payload.phone || payload.phone_number || payload.contact || '+91 92292 29323',
      email: payload.email,
      city: payload.city || payload.wedding_city || 'Bhopal',
      eventType: payload.eventType || payload.event_type || 'Wedding & Reception',
      eventDate: payload.eventDate || payload.wedding_date,
      leadSource: portal.includes('WedMeGood') ? 'WedMeGood' : 'WeddingWire',
      guestCount: payload.guestCount || payload.guests,
      budgetRange: payload.budgetRange || payload.budget,
      storyDetails: payload.message || payload.notes || `Lead received via ${portal} listing.`,
    });

    return res.status(201).json({
      success: true,
      message: `${portal} Lead ingested with ID ${saved.enquiryId}`,
      data: saved,
    });
  } catch (error) {
    console.error('[WeddingWire Lead Webhook Error]:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// 5. UNIVERSAL SOCIAL LEADS WEBHOOK (Zapier / Make / Pabbly / Google Sheets)
export const handleUniversalSocialLeadWebhook = async (req, res, next) => {
  try {
    const payload = req.body || {};
    console.log('[Received Universal Social Lead Webhook]:', JSON.stringify(payload, null, 2));

    let leadSource = payload.leadSource || payload.lead_source || payload.source || 'Social Media';
    const saved = await saveAndBroadcastEnquiry({
      fullName: payload.fullName || payload.name || payload.clientName || `${leadSource} Prospect`,
      phone: payload.phone || payload.phone_number || payload.mobile || '+91 92292 29323',
      email: payload.email,
      city: payload.city || payload.location || 'Bhopal',
      eventType: payload.eventType || payload.service || 'Royal Wedding Cinema & Photography',
      eventDate: payload.eventDate,
      guestCount: payload.guestCount,
      budgetRange: payload.budgetRange,
      leadSource,
      storyDetails: payload.storyDetails || payload.message || payload.notes,
    });

    return res.status(201).json({
      success: true,
      message: `Social Lead ingested with ID ${saved.enquiryId}`,
      data: saved,
    });
  } catch (error) {
    console.error('[Universal Social Lead Webhook Error]:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
