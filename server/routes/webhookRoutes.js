import express from 'express';
import {
  verifyMetaWebhook,
  handleMetaLeadWebhook,
  handleGoogleLeadWebhook,
  verifyWhatsAppWebhook,
  handleWhatsAppLeadWebhook,
  handleWeddingWireLeadWebhook,
  handleUniversalSocialLeadWebhook,
} from '../controllers/webhookController.js';

const router = express.Router();

// 1. Meta (Instagram & Facebook Lead Ads)
router.get('/meta-leads', verifyMetaWebhook);
router.post('/meta-leads', handleMetaLeadWebhook);
router.post('/facebook-leads', handleMetaLeadWebhook);
router.post('/instagram-leads', handleMetaLeadWebhook);

// 2. Google Ads Lead Form Extensions
router.post('/google-leads', handleGoogleLeadWebhook);

// 3. WhatsApp Ads & Cloud API
router.get('/whatsapp-leads', verifyWhatsAppWebhook);
router.post('/whatsapp-leads', handleWhatsAppLeadWebhook);

// 4. WeddingWire / WedMeGood Portals
router.post('/weddingwire-leads', handleWeddingWireLeadWebhook);
router.post('/wedmegood-leads', handleWeddingWireLeadWebhook);

// 5. Universal Pipeline Webhook (Zapier, Make, Pabbly, Google Sheets)
router.post('/social-leads', handleUniversalSocialLeadWebhook);
router.post('/universal-leads', handleUniversalSocialLeadWebhook);

export default router;
