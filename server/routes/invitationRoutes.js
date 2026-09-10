import express from 'express';
import {
  getTemplates,
  getTemplateBySlug,
  applyCoupon,
  createPaymentOrder,
  verifyPayment,
  getCustomerDashboard,
  getInvitationById,
  updateInvitation,
  getPublicInvitationBySlug,
  submitRSVP,
  getInvitationRSVPs,
  getAdminOverview,
  getAdminCustomers,
  createAdminCustomer,
  createAdminManualInvitation,
  updateAdminInvitationStatus,
  deleteAdminInvitation,
  getAdminTemplates,
  createAdminTemplate,
  updateAdminTemplate,
  duplicateAdminTemplate,
  getAdminCoupons,
  createAdminCoupon,
  updateAdminCoupon,
  getAdminAllRSVPs,
  getAdminActivityLogs,
  paymentWebhook,
} from '../controllers/invitationController.js';

const router = express.Router();

// 1. Templates Catalog & Details
router.get('/templates', getTemplates);
router.get('/templates/:slug', getTemplateBySlug);

// 2. Coupons
router.post('/coupons/apply', applyCoupon);

// 3. Payments
router.post('/payments/create-order', createPaymentOrder);
router.post('/payments/verify', verifyPayment);
router.post('/payments/webhook', paymentWebhook);

// 4. Customer Dashboard & CRUD
router.get('/dashboard', getCustomerDashboard);

// 5. Admin Operations
router.get('/admin/overview', getAdminOverview);
router.get('/admin/stats', getAdminOverview);
router.get('/admin/customers', getAdminCustomers);
router.post('/admin/customers', createAdminCustomer);
router.get('/admin/invitations', getAdminOverview);
router.post('/admin/manual-invitation', createAdminManualInvitation);
router.put('/admin/invitations/:id/status', updateAdminInvitationStatus);
router.delete('/admin/invitations/:id', deleteAdminInvitation);

router.get('/admin/templates', getAdminTemplates);
router.post('/admin/templates', createAdminTemplate);
router.put('/admin/templates/:id', updateAdminTemplate);
router.post('/admin/templates/:id/duplicate', duplicateAdminTemplate);

router.get('/admin/coupons', getAdminCoupons);
router.post('/admin/coupons', createAdminCoupon);
router.put('/admin/coupons/:id', updateAdminCoupon);

router.get('/admin/rsvps', getAdminAllRSVPs);
router.get('/admin/activity-logs', getAdminActivityLogs);

// 6. Public Guest Invitation & RSVP
router.get('/public/:slug', getPublicInvitationBySlug);
router.post('/rsvp', submitRSVP);
router.get('/:invitationId/rsvps', getInvitationRSVPs);

// 7. Individual Invitation CRUD
router.get('/:id', getInvitationById);
router.put('/:id', updateInvitation);

export default router;
