import Razorpay from 'razorpay';
import { ENV } from './env.js';

let razorpayInstance = null;

try {
  razorpayInstance = new Razorpay({
    key_id: ENV.RAZORPAY_KEY_ID,
    key_secret: ENV.RAZORPAY_KEY_SECRET,
  });
} catch (error) {
  console.warn('[Razorpay Init Warning]', error.message);
}

export default razorpayInstance;
