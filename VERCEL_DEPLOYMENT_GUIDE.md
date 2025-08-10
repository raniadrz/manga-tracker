# 🚀 Vercel Deployment Guide for Manga Tracker

## 🔧 **Pre-Deployment Checklist**

### 1. **Project Structure**
- ✅ `package.json` exists with correct dependencies
- ✅ `vite.config.js` properly configured
- ✅ `vercel.json` deployment configuration
- ✅ All source files in `src/` directory
- ✅ `index.html` in root directory

### 2. **Dependencies**
- ✅ React 19.1.1
- ✅ React Router DOM 7.8.0
- ✅ Firebase 10.7.1
- ✅ Lucide React 0.400.0
- ✅ Vite 7.1.0

## 🚨 **Common Vercel Deployment Errors & Solutions**

### **Error: "Build command failed"**
**Solution:**
```bash
# Install dependencies locally first
npm install

# Test build locally
npm run build

# Check for syntax errors
npm run lint
```

### **Error: "Module not found"**
**Solution:**
- Ensure all imports use correct file extensions (`.jsx`, `.js`)
- Check that all component files exist
- Verify import paths are correct

### **Error: "Firebase configuration missing"**
**Solution:**
- Check `src/firebase/config.js` exists
- Verify Firebase config object is complete
- Ensure environment variables are set in Vercel dashboard

### **Error: "Build output directory not found"**
**Solution:**
- Vite builds to `dist/` directory
- Verify `vercel.json` has `"outputDirectory": "dist"`
- Check build command is `"npm run build"`

## 🛠️ **Local Testing Before Deployment**

### 1. **Install Dependencies**
```bash
npm install
```

### 2. **Test Development Server**
```bash
npm run dev
```

### 3. **Test Production Build**
```bash
npm run build
npm run preview
```

### 4. **Run Linting**
```bash
npm run lint
```

## 🌐 **Vercel Dashboard Configuration**

### **Build & Development Settings**
- **Framework Preset:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

### **Environment Variables**
Set these in Vercel dashboard if needed:
```
NODE_ENV=production
```

### **Domain Settings**
- Configure custom domain if desired
- Set up redirects for SPA routing

## 📁 **File Structure for Deployment**

```
manga-tracker/
├── src/
│   ├── components/
│   │   ├── Login.jsx
│   │   ├── Header.jsx
│   │   ├── MangaList.jsx
│   │   ├── AddMangaForm.jsx
│   │   ├── MangaDetail.jsx
│   │   └── LoadingSpinner.jsx
│   ├── contexts/
│   │   └── AuthContext.jsx
│   ├── firebase/
│   │   └── config.js
│   ├── App.jsx
│   ├── main.jsx
│   ├── App.css
│   └── index.css
├── public/
├── index.html
├── package.json
├── vite.config.js
├── vercel.json
└── .gitignore
```

## 🔍 **Troubleshooting Steps**

### **Step 1: Check Local Build**
```bash
node build-test.js
```

### **Step 2: Verify Dependencies**
```bash
npm ls --depth=0
```

### **Step 3: Check for Syntax Errors**
```bash
npm run lint
```

### **Step 4: Test Production Build**
```bash
npm run build
ls -la dist/
```

### **Step 5: Check Vercel Logs**
- Go to Vercel dashboard
- Check deployment logs for specific error messages
- Look for build command failures

## 🚀 **Deployment Commands**

### **Automatic Deployment (GitHub Integration)**
1. Push changes to GitHub
2. Vercel automatically detects changes
3. Triggers new deployment

### **Manual Deployment**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

## 📱 **Post-Deployment Verification**

### **Check These URLs:**
- ✅ Main app: `https://your-app.vercel.app`
- ✅ Login page: `https://your-app.vercel.app/login`
- ✅ Protected routes redirect to login
- ✅ Authentication works properly
- ✅ Firebase connection established

### **Common Issues After Deployment:**
1. **Routing issues** - Check `vercel.json` rewrites
2. **Firebase errors** - Verify config and domain whitelist
3. **CSS not loading** - Check build output
4. **Authentication redirects** - Test login flow

## 🆘 **Still Having Issues?**

### **Check Vercel Logs:**
- Go to your project in Vercel dashboard
- Click on the failed deployment
- Review build logs for specific error messages

### **Common Error Messages:**
- `ENOENT: no such file or directory` → Missing files
- `Cannot resolve module` → Import/export issues
- `Build command failed` → Script errors
- `Module parse failed` → Syntax errors

### **Need More Help?**
- Check Vercel documentation
- Review build logs carefully
- Test locally first
- Verify all files are committed to GitHub

---

**Remember:** Always test your build locally with `npm run build` before pushing to GitHub for deployment!
