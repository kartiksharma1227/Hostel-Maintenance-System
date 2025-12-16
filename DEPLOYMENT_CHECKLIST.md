# 🚀 Pre-Deployment Checklist

## ✅ Configuration Files Created

- [x] `.env.example` files for both client and server
- [x] `DEPLOYMENT.md` - Complete deployment guide
- [x] `URL_MIGRATION.md` - Guide for updating hardcoded URLs
- [x] `render.yaml` - Automated Render configuration
- [x] API helper functions added to utilities

## 📋 Before Deploying

### Server Setup

- [ ] Copy `server/.env.example` to `server/.env`
- [ ] Fill in all database credentials in `.env`
- [ ] Add your JWT secret key (min 32 characters)
- [ ] Configure email credentials
- [ ] Test server locally: `cd server && npm run dev`

### Client Setup

- [ ] Copy `client/.env.example` to `client/.env`
- [ ] Set `VITE_API_URL=http://localhost:4000` for local dev
- [ ] Test client locally: `cd client && npm run dev`
- [ ] Test login functionality
- [ ] Test creating a complaint

### Database Setup

- [ ] Database is accessible from external IPs
- [ ] SSL certificate is properly configured (if required)
- [ ] All required tables are created
- [ ] Test data is loaded (optional)

### Code Updates (Recommended for Production)

- [ ] Update hardcoded URLs to use `API_BASE_URL` constant
- [ ] See `URL_MIGRATION.md` for details
- [ ] Test all updated components
- [ ] Commit changes to Git

### Git Repository

- [ ] All code is committed and pushed to GitHub
- [ ] `.env` files are in `.gitignore`
- [ ] `node_modules/` are in `.gitignore`
- [ ] Repository is accessible to Render

## 🚀 Deployment Steps

### Option A: Using Render Dashboard (Recommended for First Time)

Follow the step-by-step guide in `DEPLOYMENT.md`

### Option B: Using render.yaml (Advanced)

1. Push `render.yaml` to your GitHub repository
2. In Render, click "New" → "Blueprint"
3. Connect your repository
4. Render will auto-detect `render.yaml`
5. Fill in required environment variables
6. Deploy

## 🔍 Post-Deployment Verification

### Backend Checks

- [ ] Backend service is running
- [ ] No errors in Render logs
- [ ] Database connection successful
- [ ] API endpoints respond correctly
- [ ] Test endpoint: `https://your-backend.onrender.com/api/login`

### Frontend Checks

- [ ] Frontend site is accessible
- [ ] No errors in browser console
- [ ] Login page displays correctly
- [ ] Can navigate between pages
- [ ] No CORS errors

### Integration Checks

- [ ] Can login successfully
- [ ] Dashboard loads with data
- [ ] Can create new complaints
- [ ] Notifications work
- [ ] Email sending works (test with a complaint)

## 🐛 Common Issues

### Issue: "Cannot connect to database"

**Solution**:

- Check database credentials in environment variables
- Ensure database accepts connections from Render IPs
- Verify SSL configuration

### Issue: "CORS policy blocked"

**Solution**:

- Verify `FRONTEND_URL` in backend matches your frontend URL exactly
- Include `https://` protocol
- Remove trailing slashes

### Issue: "404 on page refresh"

**Solution**:

- Check Redirects/Rewrites in frontend service
- Should be: `/* → /index.html` (status 200)

### Issue: "Service won't start"

**Solution**:

- Check Render logs for errors
- Verify `npm start` works locally
- Check all required environment variables are set

### Issue: "API calls return 404"

**Solution**:

- Verify `VITE_API_URL` is set correctly in frontend
- Check backend URL is correct
- Ensure backend service is running

## 📊 Monitoring

### Regular Checks

- [ ] Check Render logs weekly
- [ ] Monitor service uptime
- [ ] Check database storage usage
- [ ] Review error logs

### Performance

- [ ] Test response times
- [ ] Monitor free tier usage (750 hours/month)
- [ ] Consider upgrade if needed

## 🆘 Need Help?

- Check `DEPLOYMENT.md` for detailed instructions
- Check `URL_MIGRATION.md` for URL update guide
- Review Render logs for errors
- Visit Render Community forums

## 🎉 Deployment Success Criteria

All these should work:

- ✅ Frontend loads without errors
- ✅ Can login as student/admin/engineer
- ✅ Dashboard displays correctly
- ✅ Can create new complaints
- ✅ Can view complaint history
- ✅ Notifications appear
- ✅ Email notifications sent
- ✅ No console errors
- ✅ No CORS errors
- ✅ All features functional

---

**Ready to deploy? Follow the guide in `DEPLOYMENT.md`!**
