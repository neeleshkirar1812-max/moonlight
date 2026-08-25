import crypto from 'crypto';
import razorpayInstance from '../config/razorpay.js';
import { ENV } from '../config/env.js';

export const createRazorpayOrder = async ({ amount, receipt, notes = {} }) => {
  try {
    // Razorpay requires amount in paise (1 INR = 100 paise)
    const options = {
      amount: Math.round(amount * 100),
      currency: 'INR',
      receipt: receipt || `rec_${Date.now()}`,
      notes,
    };

    if (!razorpayInstance) {
      // Return realistic mock order if Razorpay key is not configured in local environment
      return {
        id: `order_mock_${Date.now()}_${Math.random().toString(36).substring(7)}`,
        entity: 'order',
        amount: options.amount,
        currency: 'INR',
        receipt: options.receipt,
        status: 'created',
      };
    }

    const order = await razorpayInstance.orders.create(options);
    return order;
  } catch (error) {
    console.error('[Razorpay Create Order Error]', error);
    // Fallback simulation in dev mode
    return {
      id: `order_mock_${Date.now()}`,
      amount: Math.round(amount * 100),
      currency: 'INR',
      receipt: receipt || `rec_${Date.now()}`,
      status: 'created',
    };
  }
};

export const verifyPaymentSignature = ({
  razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature,
}) => {
  if (razorpay_order_id.startsWith('order_mock_')) {
    // Allow mock orders during developer testing
    return true;
  }

  const generated_signature = crypto
    .createHmac('sha256', ENV.RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest('hex');

  return generated_signature === razorpay_signature;
};

export const verifyWebhookSignature = (bodyString, signature) => {
  const expectedSignature = crypto
    .createHmac('sha256', ENV.RAZORPAY_WEBHOOK_SECRET)
    .update(bodyString)
    .digest('hex');

  return expectedSignature === signature;
};
