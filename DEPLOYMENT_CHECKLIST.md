# DEPLOYMENT CHECKLIST - WRAP WEFT & CO

## ✅ PRE-DEPLOYMENT VERIFICATION

### Code Quality
- [ ] No TypeScript errors: `npm run build`
- [ ] No ESLint warnings: `npm run lint`
- [ ] All imports resolved and working
- [ ] No console errors in Chrome DevTools
- [ ] Responsive design tested on mobile (Chrome DevTools)

### Environment Setup (Local)
- [ ] `.env.local` file created with all variables
- [ ] `.env.local` is in `.gitignore` (never commit secrets)
- [ ] All REQUIRED variables populated:
  - [ ] `NEXT_PUBLIC_SUPABASE_URL`
  - [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - [ ] `APP_URL` = http://localhost:3000
  - [ ] `NODE_ENV` = development

### GitHub Setup
- [ ] Repository created: https://github.com/Usmanleader/WRAP-weft ✅
- [ ] All code pushed to main branch ✅
- [ ] `.gitignore` includes `.env.local` ✅
- [ ] `.gitignore` includes `/node_modules` ✅
- [ ] No sensitive files committed ✅

### Supabase Setup
- [ ] Supabase account created at https://supabase.com
- [ ] New project created
- [ ] Project URL noted: `https://[project-id].supabase.co`
- [ ] Anon key copied (NOT service role key)
- [ ] Collections table created with correct schema:
  ```sql
  CREATE TABLE collections (
    id UUID PRIMARY KEY,
    title TEXT,
    category TEXT,
    description TEXT,
    long_description TEXT,
    features TEXT[],
    image TEXT,
    images TEXT[],
    is_featured BOOLEAN,
    created_at TIMESTAMP
  );
  ```
- [ ] Sample data inserted (6 collections)
- [ ] Contacts table created:
  ```sql
  CREATE TABLE contacts (
    id UUID PRIMARY KEY,
    first_name TEXT,
    last_name TEXT,
    email TEXT,
    subject TEXT,
    message TEXT,
    created_at TIMESTAMP
  );
  ```
- [ ] Row Level Security (RLS) policies configured:
  - [ ] Collections: Public read (disabled RLS or open policy)
  - [ ] Contacts: Public insert allowed

### Feature Testing (Local)
- [ ] Run: `npm run dev`
- [ ] **Homepage** (`http://localhost:3000`)
  - [ ] All sections load
  - [ ] Links to other pages work
  - [ ] Images display
  - [ ] Animations smooth
  - [ ] Mobile responsive
- [ ] **Collections** (`/collections`)
  - [ ] All 6 collections display
  - [ ] Category filters work
  - [ ] Data loads from Supabase (or static fallback)
  - [ ] Clicking collection goes to detail page
- [ ] **Collections Detail** (`/collections/raw-denim` etc)
  - [ ] Collection details display
  - [ ] Images load
  - [ ] Description complete
- [ ] **About** (`/about`)
  - [ ] Content displays
  - [ ] Images load
  - [ ] Responsive on mobile
- [ ] **Sustainability** (`/sustainability`)
  - [ ] Content displays correctly
- [ ] **Contact** (`/contact`)
  - [ ] Form fields display
  - [ ] Form validation works
  - [ ] Submit button works
  - [ ] Success message shows
  - [ ] (Optional) Data saves to Supabase
- [ ] **Footer**
  - [ ] All links work
  - [ ] "Download Company Profile" button appears
  - [ ] PPT generation works (click button to test)
- [ ] **Header**
  - [ ] Logo clickable
  - [ ] Navigation works
  - [ ] Mobile hamburger menu works

---

## 🚀 VERCEL DEPLOYMENT STEPS

### Step 1: Create Vercel Account
- [ ] Go to https://vercel.com/signup
- [ ] Sign up with GitHub account (recommended)
- [ ] Verify email

### Step 2: Import GitHub Repository
- [ ] Dashboard (https://vercel.com/dashboard)
- [ ] Click "Add New..." → "Project"
- [ ] Click "Import Git Repository"
- [ ] Search "WRAP-weft" repository
- [ ] Click "Import"

### Step 3: Configure Project
In the import dialog:
- [ ] **Project Name**: `wrap-weft` (or preferred name)
- [ ] **Framework**: Next.js (auto-selected)
- [ ] **Build Command**: `npm run build` (default)
- [ ] **Output Directory**: `.next` (default)
- [ ] **Install Command**: `npm install` (default)

### Step 4: Add Environment Variables
**CRITICAL**: Don't skip this step or app will fail!

In the import dialog, scroll to "Environment Variables":

| Variable | Value | Copy From |
|----------|-------|-----------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://[project-id].supabase.co` | Supabase Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJ...` | Supabase Settings → API (Anon key) |
| `GEMINI_API_KEY` | `AIzaSy...` | Google AI Studio (optional) |
| `APP_URL` | `https://wrap-weft.vercel.app` | Vercel will assign (use default for now) |
| `NODE_ENV` | `production` | Type this |
| `NEXT_PUBLIC_ENABLE_PPT_DOWNLOAD` | `true` | Type this |
| `NEXT_PUBLIC_ENABLE_ANALYTICS` | `false` | Type this |

### Step 5: Deploy
- [ ] Click "Deploy" button
- [ ] Wait for build to complete (2-3 minutes)
- [ ] Deployment successful page shows

### Step 6: Get Production URL
- [ ] Copy the deployment URL (e.g., `https://wrap-weft.vercel.app`)
- [ ] Save this URL
- [ ] Update `APP_URL` in Vercel environment variables to this URL
- [ ] Redeploy to apply changes

---

## 🧪 POST-DEPLOYMENT VERIFICATION

### Website Access
- [ ] Visit `https://wrap-weft.vercel.app` (or your URL)
- [ ] Homepage loads successfully
- [ ] No 500 errors
- [ ] No console errors (F12 DevTools)

### Critical Features Test
- [ ] **Collections Page**
  - [ ] Loads all 6 collections
  - [ ] Images display
  - [ ] Categories filter (optional, might need Supabase RLS fix)
  - [ ] Click collection → Details page works
- [ ] **Contact Form**
  - [ ] Form visible
  - [ ] Can fill out fields
  - [ ] Submit button clickable
  - [ ] Success message shows
  - [ ] (Optional) Check Supabase: contacts table for new entry
- [ ] **PPT Download**
  - [ ] Button visible in footer
  - [ ] Click button → PPT downloads in 2-5 seconds
  - [ ] File named: `Wrap-Weft-Company-Profile.pptx`
  - [ ] Open PPT in PowerPoint/Google Slides (verify content)
- [ ] **Navigation**
  - [ ] All page links work
  - [ ] Mobile menu works (tap hamburger)
  - [ ] No 404 errors

### Performance Check
- [ ] Page load time < 3 seconds (Vercel built-in metrics)
- [ ] Images optimized (check DevTools Network tab)
- [ ] No layout shift (CLS = 0)
- [ ] Mobile performance good (Lighthouse score > 80)

### Responsive Design
- [ ] Desktop (> 1024px) - full layout
- [ ] Tablet (768-1024px) - optimized columns
- [ ] Mobile (< 768px) - hamburger menu, stacked layout
- [ ] Tested in Chrome, Firefox, Safari

### Security Verification
- [ ] HTTPS enabled (green lock icon)
- [ ] No secrets exposed in source code
- [ ] Cookie security headers present
- [ ] CORS properly configured

---

## 📊 MONITORING & ANALYTICS

### Vercel Dashboard
- [ ] Visit https://vercel.com/dashboard
- [ ] Select project
- [ ] Monitor:
  - [ ] **Deployments** tab - shows all versions
  - [ ] **Analytics** tab - real-time traffic
  - [ ] **Logs** tab - error monitoring
  - [ ] **Metrics** tab - performance data

### Errors to Watch For
- [ ] 500 Internal Server Error
- [ ] Environment variable missing errors
- [ ] Supabase connection errors
- [ ] Image loading errors

### First Week Monitoring
- [ ] Check once daily for errors
- [ ] Monitor performance metrics
- [ ] Test all features weekly
- [ ] Monitor Supabase database size
- [ ] Check error logs for patterns

---

## 🔄 CONTINUOUS DEPLOYMENT WORKFLOW

### For Future Updates
1. Make code changes locally
2. Test thoroughly: `npm run dev` & `npm run build`
3. Commit: `git commit -m "description"`
4. Push: `git push origin main`
5. Vercel auto-deploys (check dashboard)
6. Verify production site

### Environment Variable Updates
- [ ] Never commit `.env.local` to Git
- [ ] Update variables in Vercel Dashboard:
  - Settings → Environment Variables
  - Edit/Add variable
  - Redeploy for changes to take effect

---

## 🎯 SUCCESS CRITERIA

Your deployment is COMPLETE when:

✅ **All Boxes Checked:**
- [ ] Website accessible at vercel domain
- [ ] Homepage loads in < 2 seconds
- [ ] Collections page displays all 6 fabrics from Supabase
- [ ] Contact form submits successfully
- [ ] Images load correctly
- [ ] Mobile responsive (tested in Chrome mobile view)
- [ ] PPT download generates presentation
- [ ] No errors in browser console
- [ ] All navigation links work
- [ ] HTTPS/SSL enabled (green lock)

✅ **Business Goals Met:**
- [ ] Customers can browse fabric collections
- [ ] Customers can request quotes via contact form
- [ ] Company can download PPT for presentations
- [ ] Website represents brand professionally

---

## 🚨 TROUBLESHOOTING QUICK REFERENCE

### Collections Page Blank
```
Problem:  /collections shows loading spinner forever
Solution:
  1. Check Vercel Logs:
     Settings → Function Logs → View Error
  2. Verify in Vercel Dashboard:
     Settings → Environment Variables
     - Confirm NEXT_PUBLIC_SUPABASE_URL present
     - Confirm NEXT_PUBLIC_SUPABASE_ANON_KEY present
  3. If variables correct:
     - Go to Supabase
     - Check "collections" table exists
     - Check row_security is OFF or policies allow public read
```

### 500 Error on Page Load
```
Problem:  Page shows 500 Internal Server Error
Solution:
  1. Check Vercel Logs for specific error
  2. Most common: Missing environment variable
  3. Redeploy after adding variable
```

### Contact Form Doesn't Submit
```
Problem:  Click submit, nothing happens or error
Solution:
  1. Check browser console (F12) for CORS error
  2. If CORS error:
     - Verify NEXT_PUBLIC_SUPABASE_URL correct
     - Ensure Supabase project is active (not paused)
  3. If form validation error:
     - Check all fields filled (no empty fields)
     - Check email format valid
```

### PPT Download Doesn't Work
```
Problem:  Click button, nothing happens
Solution:
  1. Wait a moment (pptxgenjs loads lazily)
  2. Check browser console for errors
  3. If CORS error on bundle.js:
     - CDN might be blocked
     - Try again in incognito mode
     - Clear cache and reload
```

### Images Don't Display
```
Problem:  Collections show placeholder "image" instead of actual photo
Solution:
  1. Currently uses picsum.photos (placeholder service)
  2. To use real images:
     - Replace image URLs in Supabase collections table
     - Point to your product images
     - Or use AWS S3 / Cloudinary CDN
```

---

## 📞 ESCALATION & SUPPORT

### If Something Breaks
1. **Check Vercel Logs:**
   - Vercel Dashboard → Project → Logs
   - Look for error messages

2. **Check Supabase Status:**
   - Go to supabase.com → Status
   - Is the database online?

3. **Verify Environment Variables:**
   - Vercel → Settings → Environment Variables
   - Are all required variables present?

4. **Local Testing:**
   - Run locally: `npm run dev`
   - Does it work locally but not on Vercel?
   - If yes: Environment variables issue

5. **Last Resort:**
   - Restart WebSocket connection
   - Redeploy from Vercel dashboard
   - Clear browser cache
   - Try incognito mode

---

## 📈 NEXT PHASES

### Phase 2: Custom Domain (Week 1-2)
- [ ] Purchase domain (GoDaddy, Namecheap, etc)
- [ ] Add to Vercel: Settings → Domains
- [ ] Update DNS records
- [ ] Wait 24-48 hours for propagation
- [ ] Update `APP_URL` environment variable

### Phase 3: Analytics (Week 2-3)
- [ ] Set up Google Analytics
- [ ] Add GA tracking code
- [ ] Enable Vercel Analytics
- [ ] Monitor traffic patterns

### Phase 4: Form Notifications (Week 3-4)
- [ ] Set up SendGrid for email notifications
- [ ] Auto-reply to contact form submissions
- [ ] Admin notifications on new contacts
- [ ] Store email templates

### Phase 5: E-Commerce (Month 2)
- [ ] Set up Stripe account
- [ ] Add shopping cart & checkout
- [ ] Order management system
- [ ] Inventory tracking

---

## 📋 FINAL CHECKLIST SUMMARY

```
🅿️ PRE-DEPLOYMENT
  ✅ Code tested locally (npm run dev works)
  ✅ Build successful (npm run build passes)
  ✅ GitHub pushed (all code in main branch)
  ✅ Supabase project created and tables ready
  ✅ Environment variables documented

🚀 DEPLOYMENT
  ✅ Vercel account created
  ✅ GitHub repository connected
  ✅ Environment variables in Vercel
  ✅ Deployment successful (no errors)
  ✅ Production URL noted

🧪 POST-DEPLOYMENT
  ✅ Website loads at production URL
  ✅ Collections page working
  ✅ Contact form functional
  ✅ Mobile responsive
  ✅ All features tested

✅ READY FOR PRODUCTION
```

---

**Created:** February 20, 2026
**Status:** Ready to Deploy
**Next Action:** Click "Deploy" on Vercel
