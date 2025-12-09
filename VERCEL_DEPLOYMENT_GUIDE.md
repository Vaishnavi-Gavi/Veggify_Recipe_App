# Vercel Deployment Guide for Veggify Recipe App

## ✅ What Has Been Fixed

Your project now has the following configuration files for proper Vercel deployment:

### 1. **Backend Configuration** (`backend/vercel.json`)
- Configured Node.js serverless functions
- All routes properly routed through `index.js`
- Environment variables setup for MongoDB and JWT

### 2. **Frontend Configuration** (`frontend/vercel.json`)
- Vite framework auto-detection
- Build command and output directory properly configured
- Rewrites configured for React Router SPA routing

### 3. **SPA Routing** (`frontend/public/_redirects`)
- Created `_redirects` file to handle all routes to `index.html`
- This fixes the 404 errors when visiting non-root routes

### 4. **Production Environment** (`frontend/.env.production`)
- Created for backend API URL configuration on production

## 📋 Deployment Steps

### Step 1: Update Environment Variables on Vercel

**For Backend:**
1. Go to Vercel Dashboard → Your Backend Project → Settings → Environment Variables
2. Add the following variables:
   - `MONGODB_URI` = Your MongoDB connection string
   - `JWT_SECRET` = Your JWT secret key
   - `DB_NAME` = `veggify`
   - `PORT` = (optional, Vercel sets this automatically)

**For Frontend:**
1. Go to Vercel Dashboard → Your Frontend Project → Settings → Environment Variables
2. Add:
   - `VITE_API_URL` = Your backend Vercel URL (e.g., `https://your-backend.vercel.app`)

### Step 2: Update Frontend API URL (After Backend Deployment)

After deploying the backend, update `frontend/.env.production`:
```
VITE_API_URL=https://your-backend-url.vercel.app
```

Then update your frontend files to use the environment variable for production:

In files like `Login.jsx`, `Signup.jsx`, `Recipes.jsx`, etc., update API calls:
```javascript
// Instead of hardcoding '/api'
const apiUrl = import.meta.env.VITE_API_URL || '';
const response = await fetch(`${apiUrl}/api/auth/login`, {
  // ... rest of config
});
```

### Step 3: Deploy Process

**Backend First:**
```bash
# In backend folder
git add .
git commit -m "Add Vercel configuration"
git push origin master
```
- Connect to Vercel
- Select backend folder
- Set root directory to `backend/`
- Add environment variables
- Deploy

**Frontend After:**
```bash
# In frontend folder
git add .
git commit -m "Add Vercel configuration and environment setup"
git push origin master
```
- Connect to Vercel
- Select frontend folder
- Set root directory to `frontend/`
- Set Build Command: `npm run build`
- Set Output Directory: `dist`
- Add environment variables (including VITE_API_URL pointing to backend)
- Deploy

## 🔧 Key Files Created/Modified

```
backend/
└── vercel.json (NEW)

frontend/
├── vercel.json (NEW)
├── .env.production (NEW)
├── public/
│   └── _redirects (NEW)
└── vite.config.js (UPDATED)
```

## 🐛 Common Issues & Solutions

### Issue: 404 on Non-Root Routes
**Solution:** The `_redirects` file now handles this automatically.

### Issue: Backend API Returns 404
**Solution:** Ensure `MONGODB_URI` environment variable is correctly set in Vercel.

### Issue: CORS Errors
**Solution:** Your backend already has CORS enabled. Make sure frontend is calling correct backend URL.

### Issue: Image/Asset 404s
**Solution:** Check that public assets are in `frontend/public/` folder and are properly referenced in code.

## ✨ Important Notes

1. **Environment Variables Must Be Set:** Without them, your app will fail on Vercel
2. **MongoDB Connection:** Ensure your MongoDB instance accepts connections from Vercel IPs
3. **JWT Secret:** Use a strong random string for JWT_SECRET
4. **Backend Root Directory:** When deploying to Vercel, set root directory to `backend/`
5. **Frontend Root Directory:** Set root directory to `frontend/`

## 🚀 Next Steps

1. Commit all these new files to git
2. Deploy backend to Vercel first
3. Get the backend URL
4. Update frontend `.env.production` with backend URL
5. Deploy frontend to Vercel
6. Test all routes and API calls

## 📞 Troubleshooting

If you still see 404 errors after deployment:

1. Check Vercel Build Logs for errors
2. Verify environment variables are set
3. Test backend API directly: `https://your-backend.vercel.app/`
4. Check frontend network requests in browser DevTools
5. Ensure MongoDB connection is working from Vercel servers
