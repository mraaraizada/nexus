# Render Environment Variables

## Required Environment Variables for Backend

Add these in Render Dashboard → Your Web Service → Environment:

### Basic Configuration
```
NODE_ENV=production
PORT=10000
```

### Database (PostgreSQL)
```
DATABASE_URL=postgresql://user:password@hostname.render.com/database
```
**Get this from:** Render PostgreSQL → Info → Internal Database URL

### CORS (Optional)
```
FRONTEND_URL=https://your-app.vercel.app
```
**Replace with:** Your actual Vercel frontend URL

---

## How to Add Environment Variables

1. Go to your Render Web Service
2. Click **Environment** in left sidebar
3. Click **Add Environment Variable**
4. Enter **Key** and **Value**
5. Click **Save Changes**
6. Service will auto-restart

---

## Minimum Required (to start)
```
NODE_ENV=production
```

## Add Later (when ready)
- `DATABASE_URL` - After creating PostgreSQL database
- `FRONTEND_URL` - After deploying to Vercel
