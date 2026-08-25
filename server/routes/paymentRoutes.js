import express from 'express';
import {
  createOrder,
  verifyPayment,
  getPayments,
} from '../controllers/paymentController.js';
import { protect, authorizeRoles } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, getPayments);
router.post('/create-order', protect, createOrder);
router.post('/verify', protect, verifyPayment);

// Webhook endpoint (Razorpay server-to-server)
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  console.log('[Razorpay Webhook Received]');
  res.status(200).json({ status: 'ok' });
});

export default router;
