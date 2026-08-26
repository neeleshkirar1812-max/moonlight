import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });
dotenv.config();

export const ENV = {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || 'production',
  MONGODB_URI:
    process.env.MONGODB_URI ||
    process.env.MONGO_URI ||
    'mongodb+srv://admin:admin@cluster0.61illn3.mongodb.net/lumiere_studios?retryWrites=true&w=majority&appName=Cluster0',
  JWT_SECRET: process.env.JWT_SECRET || 'moonlight_luxury_jwt_super_secret_key_2026_!@#$%^',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'moonlight_refresh_secret_key_luxury_wedding_987654321',
  JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN || '30d',
  
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || 'moonlight-production',
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || '123456789012345',
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || 'mock_cloudinary_api_secret_key',
  
  RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID || 'rzp_test_luxury_wedding_key',
  RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET || 'mock_razorpay_secret_key_2026',
  RAZORPAY_WEBHOOK_SECRET: process.env.RAZORPAY_WEBHOOK_SECRET || 'mock_razorpay_webhook_secret',
  
  EMAILJS_SERVICE_ID: process.env.EMAILJS_SERVICE_ID || 'service_moonlight',
  EMAILJS_TEMPLATE_ID: process.env.EMAILJS_TEMPLATE_ID || 'template_moonlight',
  EMAILJS_PUBLIC_KEY: process.env.EMAILJS_PUBLIC_KEY || 'public_key_emailjs',
  
  WHATSAPP_API_URL: process.env.WHATSAPP_API_URL || 'https://graph.facebook.com/v18.0',
  WHATSAPP_ACCESS_TOKEN: process.env.WHATSAPP_ACCESS_TOKEN || 'mock_whatsapp_access_token',
  WHATSAPP_PHONE_NUMBER_ID: process.env.WHATSAPP_PHONE_NUMBER_ID || '1029384756',
  
  CLIENT_URL: process.env.CLIENT_URL || 'https://moonlight-pink-two.vercel.app',
};
