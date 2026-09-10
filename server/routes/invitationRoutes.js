import express from 'express';
import {
  templates,
  createPaymentOrder,
  verifyPayment,
  getCustomerDashboard,
  getInvitationById,
  updateInvitation,
  getPublicInvitationBySlug,
  submitRSVP,
  getInvitationRSVPs,
  getAdminStats,
  paymentWebhook,
} from '../controllers/invitationController.js';

const router = express.Router();

// Templates catalog
router.get('/templates', (req, res) => {
  res.status(200).json({ success: true, templates });
});

// Payments
router.post('/payments/create-order', createPaymentOrder);
router.post('/payments/verify', verifyPayment);
router.post('/payments/webhook', paymentWebhook);

// Dashboard & Invitations CRUD
router.get('/dashboard', getCustomerDashboard);
router.get('/admin/stats', getAdminStats);
router.get('/public/:slug', getPublicInvitationBySlug);

router.get('/:id', getInvitationById);
router.put('/:id', updateInvitation);

// RSVP
router.post('/rsvp', submitRSVP);
router.get('/:invitationId/rsvps', getInvitationRSVPs);

export default router;
