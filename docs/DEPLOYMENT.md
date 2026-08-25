# Production Deployment Guide — Lumière Studios

This guide covers production deployment for the **Lumière Studios** full-stack platform across cloud providers (Vercel, Render, AWS EC2, MongoDB Atlas, Cloudinary, Razorpay).

---

## 1. Prerequisites & Services
- **MongoDB Atlas**: Managed cluster (M0 or dedicated M10+).
- **Cloudinary**: Production cloud account with Gold watermark overlay uploaded.
- **Razorpay**: Production merchant account with API key, secret, and webhook secret.
- **Node.js**: v18+ LTS runtime.

---

## 2. Server Deployment (Render / Railway / AWS EC2)

1. Set environment variables:
   ```env
   NODE_ENV=production
   PORT=5000
   CLIENT_URL=https://lumierestudios.com
   MONGO_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/luxury_wedding_platform?retryWrites=true&w=majority
   JWT_SECRET=production_ultra_secret_key_2026_xyz
   JWT_REFRESH_SECRET=production_ultra_refresh_secret_key_2026_xyz
   CLOUDINARY_CLOUD_NAME=your_prod_cloud
   CLOUDINARY_API_KEY=your_prod_key
   CLOUDINARY_API_SECRET=your_prod_secret
   RAZORPAY_KEY_ID=rzp_live_your_live_key
   RAZORPAY_KEY_SECRET=your_live_secret
   RAZORPAY_WEBHOOK_SECRET=your_live_webhook_secret
   ```

2. Start command:
   ```bash
   cd server
   npm install --production
   node server.js
   ```

---

## 3. Client Frontend Deployment (Vercel / Netlify / Cloudflare Pages)

1. Set build settings:
   - **Framework Preset**: Vite
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

2. Set Environment Variables on Vercel:
   ```env
   VITE_API_URL=https://api.lumierestudios.com/api
   ```

---

## 4. Mobile Application Deployment (Expo / EAS)

1. Install EAS CLI:
   ```bash
   npm install -g eas-cli
   ```

2. Build for Android APK / AAB:
   ```bash
   cd mobile
   eas build --platform android --profile production
   ```

3. Build for iOS IPA:
   ```bash
   cd mobile
   eas build --platform ios --profile production
   ```
