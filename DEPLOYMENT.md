# Deployment Guide - Vercel + Render + PostgreSQL

## Overview
- **Frontend:** Vercel (React + Vite)
- **Backend:** Render (Node.js + Express)
- **Database:** Render PostgreSQL

---

## Backend (Render) - PostgreSQL Setup

### Step 1: Create PostgreSQL Database

1. Go to [Render Dashboard](https://dashboard.render.com/) → New → PostgreSQL
2. Fill in:
   - **Name:** nexus-attendance-db
   - **Database:** nexus_db
   - **User:** (auto-generated)
   - **Region:** Choose closest to your users
   - **Plan:** Free tier (or paid)
3. Click "Create Database"
4. Wait 1-2 minutes for provisioning

### Step 2: Get Database Connection URL

After database is created:
1. Go to your PostgreSQL database page
2. Find **Internal Database URL** (looks like this):
   ```
   postgresql://user:password@hostname.render.com/database
   ```
3. Copy this URL - you'll need it in Step 4

### Step 3: Create Web Service for Backend

1. Go to Render Dashboard → New → Web Service
2. Connect your GitHub repository
3. Configure:
   - **Name:** nexus-attendance-api
   - **Region:** Same as your database
   - **Branch:** main
   - **Root Directory:** `backend`
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - **Plan:** Free tier (or paid)

### Step 4: Set Environment Variables

In your Web Service → Environment tab, add:

```bash
NODE_ENV=production
PORT=10000
DATABASE_URL=postgresql://user:password@hostname.render.com/database
FRONTEND_URL=https://your-app.vercel.app
```

**Replace:**
- `DATABASE_URL` with your actual Internal Database URL from Step 2
- `FRONTEND_URL` with your Vercel app URL (add this after deploying frontend)

**Important Notes:**
- Use **Internal Database URL** (not External) for better performance
- The backend is configured to automatically use `DATABASE_URL`
- SSL is enabled automatically for Render PostgreSQL

### Step 5: Deploy Backend

1. Click "Create Web Service"
2. Wait for deployment (3-5 minutes)
3. Your API will be available at: `https://your-service-name.onrender.com`

### Step 6: Initialize Database Schema

After deployment succeeds, initialize the database:

**Option A: Using Render Shell (Recommended)**
1. Go to your Web Service → Shell tab
2. Run these commands:
```bash
node db/setup.js
node db/attendance-setup.js
```

**Option B: Using Local PSQL**
1. Install PostgreSQL client locally
2. Go to your database → Connect tab
3. Copy the External Database URL
4. Connect and run:
```bash
psql "postgresql://user:password@hostname.render.com/database"
\i backend/db/schema.sql
\i backend/db/attendance-schema.sql
```

### Step 7: Test Backend

Visit: `https://your-service-name.onrender.com/api/health`

You should see:
```json
{
  "status": "OK",
  "message": "Nexus Attendance API is running"
}
```

---

## Frontend (Vercel)

### Step 1: Create Vercel Project

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New" → Project
3. Import your GitHub repository
4. Configure:
   - **Framework Preset:** Vite
   - **Root Directory:** `./` (leave as root)
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

### Step 2: Set Environment Variables

Before deploying, add environment variable:

1. Go to Settings → Environment Variables
2. Add:
```
VITE_API_URL=https://your-backend-service.onrender.com/api
```

**Replace** `your-backend-service` with your actual Render service name

3. Set for: Production, Preview, and Development

### Step 3: Deploy Frontend

1. Click "Deploy"
2. Wait 2-3 minutes
3. Your app will be available at: `https://your-app.vercel.app`

### Step 4: Update Backend CORS

1. Go back to Render → Your Web Service → Environment
2. Update `FRONTEND_URL` with your actual Vercel URL:
```
FRONTEND_URL=https://your-app.vercel.app
```
3. Service will auto-restart

---

## Quick Setup Checklist

### Render (Backend + Database)
- [ ] Create PostgreSQL database
- [ ] Copy Internal Database URL
- [ ] Create Web Service from GitHub
- [ ] Set `DATABASE_URL` environment variable
- [ ] Set `NODE_ENV=production`
- [ ] Deploy backend
- [ ] Initialize database schema
- [ ] Test `/api/health` endpoint

### Vercel (Frontend)
- [ ] Create project from GitHub
- [ ] Set `VITE_API_URL` with Render backend URL
- [ ] Deploy frontend
- [ ] Test app in browser

### Final Steps
- [ ] Update `FRONTEND_URL` in Render with Vercel URL
- [ ] Test full app functionality
- [ ] Check browser console for errors

---

## Database Connection Details

Your backend (`backend/db/connection.js`) is configured to:
- Use `DATABASE_URL` environment variable (Render PostgreSQL)
- Enable SSL automatically for production
- Fall back to local credentials for development

**Local Development:**
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=nexus_db
DB_USER=postgres
DB_PASSWORD=postgres
```

**Production (Render):**
```env
DATABASE_URL=postgresql://user:password@hostname.render.com/database
```

---

## Troubleshooting

### Backend can't connect to database
- Verify `DATABASE_URL` is set correctly in Render
- Use **Internal Database URL** (not External)
- Check database status in Render dashboard
- Look at service logs for connection errors

### Frontend can't reach backend
- Check `VITE_API_URL` in Vercel environment variables
- Verify backend is running: visit `/api/health`
- Check browser console for CORS errors
- Ensure `FRONTEND_URL` is set in Render

### Database schema not initialized
- Run `node db/setup.js` in Render Shell
- Or connect via PSQL and run SQL files manually
- Check service logs for migration errors

### Render free tier limitations
- Services sleep after 15 minutes of inactivity
- First request after sleep takes 30-60 seconds
- Database has 90-day expiration on free tier
- Consider upgrading for production use

---

## Environment Variables Summary

### Vercel (Frontend)
```
VITE_API_URL=https://your-backend.onrender.com/api
```

### Render (Backend)
```
NODE_ENV=production
PORT=10000
DATABASE_URL=postgresql://user:password@hostname.render.com/database
FRONTEND_URL=https://your-app.vercel.app
```

---

## Useful Commands

### Check backend logs
```bash
# In Render dashboard → Logs tab
# Or use Render CLI
render logs -s your-service-name
```

### Run database migrations
```bash
# In Render Shell
node db/setup.js
node db/attendance-setup.js
```

### Test API locally
```bash
cd backend
npm install
npm start
# Visit http://localhost:5000/api/health
```

### Build frontend locally
```bash
npm install
npm run build
npm run preview
```

---

## Next Steps

After successful deployment:
1. Set up custom domain (optional)
2. Configure monitoring and alerts
3. Set up automated backups for database
4. Add environment-specific configurations
5. Set up CI/CD for automated deployments
