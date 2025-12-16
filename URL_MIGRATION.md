# Migration Guide: Update Hardcoded URLs

## ⚠️ Important Note

Your codebase currently has hardcoded `http://localhost:4000` URLs in multiple places.

For full deployment support, you should replace these with the `API_BASE_URL` constant or the `getApiUrl()` helper function.

## 📍 Files That Need Updates

Based on the codebase scan, these files contain hardcoded localhost URLs:

### Client Files to Update:

1. `client/src/components/Login.jsx` - Lines 52, 79
2. `client/src/components/AdminDashboard.jsx` - Multiple instances
3. `client/src/components/EngineerDashboard.jsx` - Lines 280, 446, 497
4. `client/src/EngineerDashboardComponents/Header.jsx` - Lines 61, 77, 94
5. `client/src/adminDashBoardComponents/engineers/EngineersList.jsx` - Line 26
6. `client/src/adminDashBoardComponents/complaints/Complaints.jsx` - Lines 86, 105
7. And more...

## ✅ How to Update URLs

### Option 1: Using API_BASE_URL constant

```javascript
// Before
axios.get("http://localhost:4000/api/admin/engineers");

// After
import { API_BASE_URL } from "../utils/constants";
axios.get(`${API_BASE_URL}/api/admin/engineers`);
```

### Option 2: Using getApiUrl() helper function

```javascript
// Before
axios.get("http://localhost:4000/api/admin/engineers");

// After
import { getApiUrl } from "../utils/helpers";
axios.get(getApiUrl("/api/admin/engineers"));
```

## 🔍 Find All Occurrences

Run this command in your terminal to find all hardcoded URLs:

```bash
cd client
grep -r "localhost:4000" src/
```

## 🛠️ Quick Fix Script

If you want to update all files automatically, you can use this find-and-replace:

```bash
# In client directory
find src/ -type f -name "*.jsx" -exec sed -i '' 's|http://localhost:4000|${API_BASE_URL}|g' {} +
```

⚠️ **Note**: This is a rough replacement. You'll need to:

1. Add the import statement in each file
2. Change string concatenation from `"url"` to template literals
3. Test each file after changes

## 📝 Manual Update Recommended

For safety and to avoid breaking your code, we recommend:

1. Update files one by one
2. Test each change
3. Commit after each successful update

## 🎯 Priority Files

Start with these high-priority files:

1. **Login.jsx** - Critical for authentication
2. **AdminDashboard.jsx** - Main admin features
3. **EngineerDashboard.jsx** - Main engineer features
4. **StudentDashboard.jsx** - Main student features

## ✨ Already Configured

We've already set up:

- ✅ `API_BASE_URL` constant in `client/src/utils/constants.js`
- ✅ `getApiUrl()` helper function in `client/src/utils/helpers.js`
- ✅ Environment variable support (`VITE_API_URL`)
- ✅ `.env.example` file for reference

## 🚀 Deployment Without URL Updates

Your app will still work on Render even without updating all URLs, but:

1. You'll need to set `VITE_API_URL=http://localhost:4000` in local development
2. Set `VITE_API_URL=https://your-backend-url.onrender.com` for production
3. The hardcoded URLs will continue to point to localhost (which won't work in production)

**For production deployment, updating these URLs is highly recommended.**

## 📞 Need Help?

If you want assistance updating specific files, just ask! For example:

- "Update Login.jsx to use API_BASE_URL"
- "Update all admin components to use getApiUrl"
- "Fix URLs in EngineerDashboard.jsx"
