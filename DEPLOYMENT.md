# 🚀 Deployment Guide for Render

This guide will help you deploy both the frontend and backend of the Hostel Maintenance System to Render.

## 📋 Prerequisites

1. **GitHub Account** - Your code should be pushed to a GitHub repository
2. **Render Account** - Sign up at [render.com](https://render.com) (free tier available)
3. **MySQL Database** - Set up on PlanetScale, AWS RDS, or other cloud provider
4. **Environment Variables** - Keep your `.env` files ready

---

## 🗄️ Step 1: Set Up Database

### Option A: PlanetScale (Recommended - Free Tier Available)

1. Go to [planetscale.com](https://planetscale.com) and create account
2. Create new database
3. Get connection string from dashboard
4. Import your database schema
5. Note: PlanetScale handles SSL automatically

### Option B: Other MySQL Providers

- AWS RDS
- Google Cloud SQL
- Azure Database for MySQL
- Railway

---

## 🔧 Step 2: Deploy Backend to Render

### 2.1 Create Web Service

1. **Login to Render** → Click **"New"** → Select **"Web Service"**

2. **Connect Repository**

   - Connect your GitHub account
   - Select your repository: `Hostel-Maintenance-System`

3. **Configure Service**
   - **Name**: `hostel-maintenance-backend`
   - **Region**: Choose closest to your users
   - **Branch**: `main`
   - **Root Directory**: `server`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free

### 2.2 Set Environment Variables

Click **"Advanced"** → **"Add Environment Variable"** and add:

```bash
# Database Configuration
DB_HOST=your-database-host-here
DB_USER=your-database-username
DB_PASS=your-database-password
DB_NAME=your-database-name
PORT=3306

# SSL Certificate (if required by your database)
CA=/etc/ssl/certs/ca-certificates.crt

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-min-32-chars
JWT_EXPIRY=1h

# Email Configuration (Gmail example)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-specific-password
EMAIL=your-email@gmail.com

# Frontend URL (will be added after frontend deployment)
FRONTEND_URL=http://localhost:5173
```

### 2.3 Deploy

1. Click **"Create Web Service"**
2. Wait for deployment to complete (5-10 minutes)
3. **Copy your backend URL**: `https://hostel-maintenance-backend.onrender.com`

---

## 🎨 Step 3: Deploy Frontend to Render

### 3.1 Create Static Site

1. **Login to Render** → Click **"New"** → Select **"Static Site"**

2. **Connect Repository**

   - Select your repository

3. **Configure Static Site**
   - **Name**: `hostel-maintenance-frontend`
   - **Branch**: `main`
   - **Root Directory**: `client`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

### 3.2 Set Environment Variables

Click **"Advanced"** → **"Add Environment Variable"**:

```bash
VITE_API_URL=https://hostel-maintenance-backend.onrender.com
```

⚠️ **Important**: Replace with your actual backend URL from Step 2.3

### 3.3 Configure Redirects for React Router

1. Click **"Redirects/Rewrites"**
2. Add rule:
   - **Source**: `/*`
   - **Destination**: `/index.html`
   - **Status**: `200` (Rewrite)

### 3.4 Deploy

1. Click **"Create Static Site"**
2. Wait for deployment to complete
3. **Copy your frontend URL**: `https://hostel-maintenance-frontend.onrender.com`

---

## 🔄 Step 4: Update CORS Configuration

Now that you have both URLs, update your backend:

1. Go to your **backend service** on Render
2. Click **"Environment"**
3. Update `FRONTEND_URL` to your actual frontend URL:
   ```
   FRONTEND_URL=https://hostel-maintenance-frontend.onrender.com
   ```
4. Click **"Save Changes"**
5. Service will automatically redeploy

---

## 📧 Step 5: Configure Email (Gmail Example)

### For Gmail:

1. Enable 2-Factor Authentication on your Google Account
2. Go to Google Account → Security → 2-Step Verification
3. At bottom, click **"App passwords"**
4. Select **"Mail"** and **"Other"** (name it "Hostel Maintenance")
5. Copy the 16-character password
6. Use this in your `EMAIL_PASS` environment variable

---

## ✅ Step 6: Test Your Deployment

1. **Visit your frontend URL**
2. **Try these features**:

   - Login page loads
   - Can login with credentials
   - Dashboard displays properly
   - Can submit complaints
   - Notifications work
   - Email sending works

3. **Check for errors**:
   - Browser Console (F12)
   - Render Logs (Service → Logs tab)

---

## 🐛 Troubleshooting

### Backend Issues

**Problem**: Service won't start

- Check Render logs for errors
- Verify all environment variables are set
- Check database connection

**Problem**: CORS errors

- Ensure `FRONTEND_URL` matches your frontend URL exactly
- Include protocol (`https://`)
- No trailing slash

### Frontend Issues

**Problem**: API calls failing

- Verify `VITE_API_URL` is set correctly
- Check browser console for errors
- Ensure backend is running

**Problem**: 404 errors on page refresh

- Check Redirects/Rewrites are configured
- Rule should be `/* → /index.html` (200)

### Database Issues

**Problem**: Connection timeout

- Check database firewall settings
- Verify credentials
- Ensure database allows connections from Render IPs

---

## 💰 Free Tier Limitations

### Render Free Tier:

- **750 hours/month** (enough for 1 service running 24/7)
- **Services spin down after 15 minutes of inactivity**
- **First request after spin-down takes 30-50 seconds**
- **No custom domain SSL on free tier** (use Render subdomain)

### Workarounds:

- Use a service like UptimeRobot to ping your backend every 14 minutes
- Upgrade to paid tier ($7/month per service) for always-on

---

## 🔐 Security Best Practices

1. ✅ Never commit `.env` files to Git
2. ✅ Use strong JWT secrets (minimum 32 characters)
3. ✅ Use app-specific passwords for email
4. ✅ Keep database credentials secure
5. ✅ Regularly rotate secrets
6. ✅ Use HTTPS only (Render provides this automatically)

---

## 📝 Useful Commands

### View Logs

```bash
# In Render Dashboard
Service → Logs tab
```

### Trigger Manual Deploy

```bash
# In Render Dashboard
Service → Manual Deploy → Deploy latest commit
```

### Check Service Status

```bash
# Visit your service URL
curl https://your-backend.onrender.com
```

---

## 🆘 Getting Help

- **Render Docs**: [docs.render.com](https://docs.render.com)
- **Render Community**: [community.render.com](https://community.render.com)
- **Check Logs**: Always check service logs first

---

## 🎉 Success Checklist

- [ ] Database is set up and accessible
- [ ] Backend deployed and running
- [ ] Frontend deployed and accessible
- [ ] Environment variables configured
- [ ] CORS configured correctly
- [ ] Email service working
- [ ] All features tested
- [ ] No errors in logs
- [ ] Login works
- [ ] Complaints can be created

---

**Congratulations! Your Hostel Maintenance System is now live! 🚀**

For updates, just push to your GitHub repository and Render will automatically redeploy.
