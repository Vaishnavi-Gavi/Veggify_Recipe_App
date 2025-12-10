# Vercel Deployment Checklist for Veggify

## CRITICAL: Set Environment Variables in Vercel (Most Common Fix)

### Step 1: Open Vercel Dashboard
1. Go to https://vercel.com/dashboard
2. Click on your project **veggify-recipe-app**
3. Click **Settings** (top navigation)
4. Click **Environment Variables** (left sidebar)

### Step 2: Add MONGODB_URI
1. Click **Add New**
2. Name: `MONGODB_URI`
3. Value: Copy-paste the entire value from your `backend/.env`:
   ```
   mongodb+srv://gavivaishnavi1_db_user:veggifygavi@vegy-app.tt9hwes.mongodb.net/?appName=vegy-app
   ```
4. Select **Production** (or leave as "All" for all environments)
5. Click **Save**

### Step 3: Add JWT_SECRET
1. Click **Add New**
2. Name: `JWT_SECRET`
3. Value: Copy-paste the entire value from your `backend/.env`:
   ```
   6a6e42e27e6d094ab5162dff2a108e2add3c4f8685e65e4885d885fc717f6ed0afa77681c5346f1398d58df3c581de3e0a703fa29a8914f358392396251f7091
   ```
4. Select **Production** (or leave as "All")
5. Click **Save**

### Step 4: (Optional) Add DB_NAME
1. Click **Add New**
2. Name: `DB_NAME`
3. Value: `veggify`
4. Click **Save**

## Step 5: Redeploy with Clean Cache

1. Go to **Deployments** tab (top navigation)
2. Find the latest deployment
3. Click the **⋮** (three dots) menu
4. Click **Redeploy**
5. **IMPORTANT:** Uncheck **"Use existing build cache"**
6. Click **Redeploy** and wait 2-3 minutes for build to complete

## Step 6: Test the Endpoints

After redeploy finishes, test these in your browser (replace domain):

### Health Check (no DB needed)
```
https://your-domain.vercel.app/api/health
```
Expected response: `{ "ok": true, "time": "..." }`

### Debug (check env vars are present)
```
https://your-domain.vercel.app/api/debug
```
Expected response: `{ "ok": true, "hasMongo": true, "hasJwt": true, "nodeEnv": null }`

If `hasMongo` or `hasJwt` is **false**, go back to Step 2/3 and verify you pasted the values correctly.

### Test Signup
```bash
curl -X POST https://your-domain.vercel.app/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"pass123"}'
```

Expected: 201 status with `{ "message": "User created successfully." }`

## Troubleshooting

### If `/api/health` returns 404
- The backend function didn't deploy
- Check Vercel Deployments → Functions tab to see if a function exists
- Check Build Logs for errors

### If `/api/debug` shows `hasMongo: false`
- `MONGODB_URI` is not set in Vercel Environment Variables
- Go back to Step 2 and add it

### If `/api/debug` shows `hasJwt: false`
- `JWT_SECRET` is not set in Vercel Environment Variables
- Go back to Step 3 and add it

### If signup still fails with 5xx error
- Check Vercel Function Logs (Deployments → select deployment → Functions → click backend/index.js → Logs)
- Look for `[backend]` or `[auth]` log lines showing the error
- Common causes:
  - MongoDB connection timeout (network whitelist issue)
  - Missing database or collection
  - Schema validation errors

## Quick Reference: Your Credentials

Do not commit these to Git!

- **MONGODB_URI**: `mongodb+srv://gavivaishnavi1_db_user:veggifygavi@vegy-app.tt9hwes.mongodb.net/?appName=vegy-app`
- **JWT_SECRET**: `6a6e42e27e6d094ab5162dff2a108e2add3c4f8685e65e4885d885fc717f6ed0afa77681c5346f1398d58df3c581de3e0a703fa29a8914f358392396251f7091`
- **DB_NAME**: `veggify` (optional)

## What to Do Right Now

1. **Follow Steps 1-5 above** (add env vars and redeploy)
2. **Test `/api/health`** in your browser
3. **Test `/api/debug`** and confirm both values are true
4. **Try signup** on your site or via curl
5. If still failing, paste the `/api/debug` response and any Vercel function log lines here and I'll debug further
