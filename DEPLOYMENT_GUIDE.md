# 🚀 Moonlight Production - Deployment & GitHub Guide

## 1. 📦 GitHub Par Code Upload Karne Ke Steps

### Step 1: GitHub Par New Repository Banayein
1. [github.com/new](https://github.com/new) par jayein.
2. Repository name likhein: `moonlight-production-platform` (ya aapki marzi ka naam).
3. **Public** ya **Private** select karein aur **Create repository** par click karein.
4. Apni repository ka URL copy karein (jaise: `https://github.com/your-username/moonlight-production-platform.git`).

### Step 2: VS Code Terminal Me Yeh Commands Run Karein
Apne VS Code terminal me `luxury-wedding-platform` folder ke andar yeh commands chalayein:

```bash
# 1. Git initialize karein
git init

# 2. Files ko stage karein
git add .

# 3. Commit karein
git commit -m "Initial release: Moonlight Production Luxury Platform with Tesla UI & 30+ 4K YouTube Films"

# 4. Main branch set karein
git branch -M main

# 5. Apna GitHub repository link add karein (apna link replace karein)
git remote add origin https://github.com/your-username/moonlight-production-platform.git

# 6. GitHub par upload / push karein
git push -u origin main
```

---

## 2. ⚡ Frontend Ko Vercel Par Free Deploy Karein (60 Seconds)

1. [vercel.com](https://vercel.com) par jayein aur GitHub se Login karein.
2. **"Add New Project"** par click karke apni repository select karein.
3. **Root Directory**: `client` select karein.
4. **Build Settings**:
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. **Deploy** button dabayein. 1 minute me aapki website live ho jayegi (jaise `https://moonlight-pink-two.vercel.app`)!

---

## 3. 🍃 MongoDB Atlas Par Free Cloud Database Banayein (2 Minutes)

Aapka backend MongoDB database mangta hai:
1. [mongodb.com/atlas](https://www.mongodb.com/cloud/atlas/register) par free account banayein.
2. **"Create a Deployment"** me **M0 (Free)** cluster chunein (AWS/Mumbai region choose kar sakte hain).
3. **Database Access**:
   - Username set karein (e.g. `moonlight_admin`)
   - Password banayein aur copy kar lein (e.g. `MoonlightPass2026!`)
4. **Network Access**:
   - **"Add IP Address"** par click karein aur **`Allow Access from Anywhere (0.0.0.0/0)`** select karein (kyunki Render ka dynamic IP hota hai).
5. **Connection String Copy Karein**:
   - **Database** -> **Connect** -> **Drivers (Node.js)** par click karein.
   - Connection string copy karein, jaise:
     `mongodb+srv://moonlight_admin:MoonlightPass2026!@cluster0.xxxxx.mongodb.net/moonlight_production?retryWrites=true&w=majority`

---

## 4. 🌐 Backend Server Ko Render.com Par Free Deploy Karein

1. [render.com](https://render.com) par jayein aur GitHub se Sign In karein.
2. **New +** -> **Web Service** click karein aur GitHub repository `moonlight` connect karein.
3. **Configuration Settings**:
   - **Name**: `moonlight-backend`
   - **Region**: Singapore ya Frankfurt
   - **Root Directory**: `server` (Important!)
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Instance Type**: `Free`
4. **Environment Variables** (Neeche scroll karke add karein):
   - `PORT`: `5000`
   - `NODE_ENV`: `production`
   - `MONGO_URI`: *(Aapka MongoDB Atlas ka connection string jo Step 3 me mila)*
   - `MONGODB_URI`: *(Same connection string)*
   - `JWT_SECRET`: `moonlight_ultra_secret_key_2026_!@#$%^`
   - `JWT_REFRESH_SECRET`: `moonlight_refresh_secret_987654321`
   - `CLIENT_URL`: `https://moonlight-pink-two.vercel.app`
5. **Create Web Service** par click karein.
6. 2-3 minute me deploy hone ke baad upar Render aapko aapka live backend URL dega:
   * Jaise: `https://moonlight-backend.onrender.com`

---

## 5. 🔗 SABSE IMPORTANT CRITICAL STEP: Frontend Ko Live Backend Se Connect Karein

Backend deploy hone ke baad, aapko Vercel ko batana hoga ki backend kahan chal raha hai:

1. [vercel.com](https://vercel.com) dashboard par jayein.
2. Apne **Moonlight Project** par click karein.
3. **Settings** tab -> Left sidebar me **Environment Variables** par click karein.
4. Naya variable add karein:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://<your-render-backend-url>.onrender.com/api`
     *(Dhyan dein: aage `/api` zaroor lagayein, e.g. `https://moonlight-backend.onrender.com/api`)*
   - Environment: Production, Preview, Development (teeno tick rehne dein).
   - **Save** dabayein.
5. **Vercel Redeploy Trigger Karein**:
   - Vercel me **Deployments** tab par jayein.
   - Sabse upar wali deployment ke right side me `...` (three dots) par click karein aur **Redeploy** par click karein!
   - *(Redeploy karna zaroori hai taaki Vite naye environment variable ko compile kare)*.

✅ **Done! Ab aapka MERN Stack (React Vite + Express + MongoDB Atlas) 100% interconnected live chalega!**
