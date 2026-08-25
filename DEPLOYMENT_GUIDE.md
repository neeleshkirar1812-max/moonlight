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
5. **Deploy** button dabayein. 1 minute me aapki website live ho jayegi (jaise `moonlight-production.vercel.app`)!

---

## 3. 🌐 Backend Server Ko Render.com Par Free Deploy Karein

1. [render.com](https://render.com) par jayein aur GitHub se Sign In karein.
2. **New +** -> **Web Service** click karein aur GitHub repository connect karein.
3. **Root Directory**: `server`
4. **Build Command**: `npm install`
5. **Start Command**: `npm start`
6. **Environment Variables**:
   - `PORT`: `5000`
   - `JWT_SECRET`: `your_super_secret_jwt_key`
   - `MONGO_URI`: `your_mongodb_connection_string`
7. **Create Web Service** par click karein.
