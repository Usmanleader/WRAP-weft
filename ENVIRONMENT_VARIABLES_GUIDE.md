# ENVIRONMENT VARIABLES - COMPLETE IN-DEPTH GUIDE

## 🔐 SECURITY LEVELS

### PUBLIC (Browser-Exposed) - Prefix: `NEXT_PUBLIC_`
- Visible in browser source code / DevTools
- Safe for API keys that allow public access
- Examples: Supabase anon key, Stripe public key, Google Analytics ID
- **WARNING**: Never expose private API keys or secrets

### PRIVATE (Server-Only) - NO PREFIX
- Only on Node.js server (build time, API routes, server actions)
- Never leaked to browser
- Required for sensitive operations
- Examples: Database passwords, private API keys, encryption keys

---

## 📋 COMPLETE VARIABLE LISTING

### ✅ REQUIRED FOR DEPLOYMENT

#### 1. **NEXT_PUBLIC_SUPABASE_URL**
```
Type:       String (URL)
Scope:      PUBLIC (Browser)
Required:   ✅ YES
Default:    None

Purpose:    Endpoint for Supabase PostgreSQL database connection
Format:     https://{project-id}.supabase.co
Example:    https://xyzabc123.supabase.co

Where to Find:
  1. Login to supabase.com
  2. Select your project
  3. Settings (gear icon) → API
  4. Under "Project URL", copy the full URL
  5. Paste into VERCEL environment variables

What It Does:
  - Connects frontend to Supabase database
  - Used in lib/supabase.ts to create client
  - Enables real-time data fetching for collections & contacts
  - Must match your actual Supabase project

Error if Missing:
  - Collections page shows no data
  - Contact form doesn't save
  - Console error: "supabase is null"
```

#### 2. **NEXT_PUBLIC_SUPABASE_ANON_KEY**
```
Type:       String (JWT Token)
Scope:      PUBLIC (Browser)
Required:   ✅ YES
Default:    None

Purpose:    Anonymous public access key to Supabase
Format:     Long base64 encoded JWT token starting with "eyJ"
Length:     ~150+ characters
Example:    eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

Where to Find:
  1. Supabase Dashboard → Settings → API
  2. Under "Project API keys"
  3. Copy "Anon" key (NOT "Service Role Key")
  4. Paste into VERCEL environment variables

Security:
  - Designed to be public (anon = anonymous)
  - Can only access data with RLS (Row Level Security) policies
  - Limited to read/insert operations you explicitly allow
  - Regular changes recommended quarterly

What It Does:
  - Authenticates frontend to Supabase
  - Works with lib/supabase.ts createClient()
  - Enables collections display & contact form submission
  - RLS policies control what users can access/modify

Database Tables Using This:
  - collections: READ all rows (public data display)
  - contacts: INSERT new messages (public form submission)

Error if Missing:
  - Build succeeds but collections don't load
  - Contact form exists but can't submit
  - Console: "createClient requires anon key"
```

#### 3. **APP_URL**
```
Type:       String (URL)
Scope:      PRIVATE (Server)
Required:   ✅ YES
Default:    http://localhost:3000

Purpose:    Full URL where app is deployed
Used For:   Self-referential links, OAuth redirects, email links
Format:     https://{domain}

Production Values:
  - Vercel Default: https://wrap-weft.vercel.app
  - Custom Domain: https://wrapweft.com
  - Subdomain: https://app.wrapweft.com

Development Value:
  - Local: http://localhost:3000
  - With tunnel: https://abc123.local-tunnel.dev

Why It Matters:
  - Used in <Link> tags for absolute URLs
  - OAuth callbacks (if implementing auth)
  - Email links in password reset emails
  - Canonical URLs for SEO
  - Email templates

Current Usage in Project:
  - lib/ppt-generator.ts might use it for download links
  - Future: auth redirect URLs
  - Future: shareable collection links

Error if Missing:
  - Relative links might break in complex scenarios
  - Email links fail (if implemented)
  - OAuth doesn't redirect properly

Where to Set:
  Local: .env.local → APP_URL=http://localhost:3000
  Vercel: Settings → Environment Variables → Add APP_URL
```

#### 4. **NODE_ENV**
```
Type:       String (Enum: development, production, test)
Scope:      PRIVATE (Server)
Required:   ✅ YES
Default:    development

Purpose:    Tells app whether it's running locally or in production
Values:
  - development: npm run dev (local with hot reload, debug mode)
  - production: npm run build (optimized, minified, fast)
  - test: for testing frameworks

Local Setup:
  - .env.local: NODE_ENV=development
  - Auto-detected when you run: npm run dev

Vercel Setup:
  - REQUIRED in Environment Variables
  - NodeENV: production
  - Vercel automatically sets this, but be explicit

What Changes:
  development:
    ✓ Source maps (easier debugging)
    ✓ Hot reload (refresh on code change)
    ✓ Verbose error messages
    ✗ Slower performance
    ✗ No minification

  production:
    ✓ Minified code (~70% smaller)
    ✓ Source maps removed
    ✓ Optimizations enabled
    ✓ Fast performance
    ✗ Errors less detailed
    ✗ Debugging harder

Current Project Impact:
  - Tailwind CSS builds differently
  - Next.js optimizations applied
  - React DevTools work in dev only
  - Error pages different
```

---

### ⚠️ OPTIONAL BUT RECOMMENDED

#### 5. **GEMINI_API_KEY**
```
Type:       String (API Key)
Scope:      PRIVATE (Server)
Required:   ⚠️ OPTIONAL (not currently used)
Default:    None

Purpose:    Google Gemini AI API for intelligent features
Format:     starts with "AIzaSy"
Length:     ~40+ characters

Where to Get:
  1. Go to https://aistudio.google.com/apikey
     OR https://console.cloud.google.com → APIs & Services
  2. Create new API key
  3. Enable Gemini API (check docs)
  4. Copy the key
  5. Add to Vercel environment variables

Current Status:
  - ❌ NOT ACTIVELY USED in current codebase
  - But imported in package.json: "@google/genai": "^1.17.0"
  - Ready for future AI features

Future Use Cases:
  - AI-powered fabric recommendations
  - Smart search for collections
  - Auto-generate product descriptions
  - Chat support assistant

Setup:
  - Local: Add to .env.local
  - Vercel: Settings → Environment Variables → GEMINI_API_KEY

Implementation Example (for future):
  import { GoogleGenerativeAI } from "@google/genai";
  const client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

Testing:
  - If missing, features using it will error gracefully
  - Check server logs for "GEMINI_API_KEY not found"
```

#### 6. **NEXT_PUBLIC_ENABLE_PPT_DOWNLOAD**
```
Type:       String Boolean ("true" or "false")
Scope:      PUBLIC (Frontend)
Required:   ⚠️ OPTIONAL
Default:    true

Purpose:    Toggle PowerPoint generation feature on/off
Values:     "true" or "false" (must be string)

Usage:
  if (process.env.NEXT_PUBLIC_ENABLE_PPT_DOWNLOAD === "true") {
    // Show download button in footer
    // Enable generateCompanyPresentation() function
  }

Where Used:
  - components/layout/footer.tsx: Download PPT button
  - lib/ppt-generator.ts: generateCompanyPresentation()

Why Disable:
  - Testing website without PPT feature
  - Reduce bundle size (disabled ~200KB)
  - Feature flag for A/B testing
  - Maintenance/debugging PPT generation

Local (.env.local):
  NEXT_PUBLIC_ENABLE_PPT_DOWNLOAD=true

Vercel:
  Environment Variables → NEXT_PUBLIC_ENABLE_PPT_DOWNLOAD = true
```

#### 7. **NEXT_PUBLIC_ENABLE_ANALYTICS**
```
Type:       String Boolean
Scope:      PUBLIC (Frontend)
Required:   ⚠️ OPTIONAL
Default:    false

Purpose:    Toggle analytics tracking (Google Analytics, Mixpanel, etc)
Values:     "true" or "false"

Current Status:
  - NOT IMPLEMENTED yet
  - But prepared for future integration

When to Enable:
  - Track user behavior
  - Monitor page performance
  - Analyze visitor sources
  - Debug user issues

Implementation (Future):
  if (process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === "true") {
    // Initialize GA4, Mixpanel, Hotjar, etc
    initializeAnalytics();
  }

Privacy:
  - Should comply with GDPR/CCPA
  - Require user consent before enabling
  - Provide analytics opt-out option
```

---

### 🔐 SECURITY REFERENCE (Not in .env but important)

#### Service Role Key (DO NOT EXPOSE)
```
Location:   Supabase → Settings → API (under Project API keys)
Scope:      PRIVATE SERVER ONLY
Should Be:  In .env.local ONLY (never in NEXT_PUBLIC_)
Usage:      Server-side functions, admin operations

NEVER:
  ❌ Put in frontend code
  ❌ Use in NEXT_PUBLIC_ variables
  ❌ Commit to Git
  ❌ Share in public

Used For:
  - Admin operations (delete users, modify data directly)
  - Scheduled jobs
  - Email notifications
  - Backend validation

Implementation:
  // ✅ CORRECT (server-side only)
  const serviceSupabase = createClient(URL, SERVICE_KEY);
  
  // ❌ WRONG (exposed to browser)
  export const serviceSupabase = createClient(URL, SERVICE_KEY);
```

---

## 🚀 DEPLOYMENT ENVIRONMENT SETUP

### Local Development (.env.local)
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
GEMINI_API_KEY=your-gemini-key
APP_URL=http://localhost:3000
NODE_ENV=development
NEXT_PUBLIC_ENABLE_PPT_DOWNLOAD=true
NEXT_PUBLIC_ENABLE_ANALYTICS=false
```

### Vercel Production
1. Go to https://vercel.com → Your Project → Settings → Environment Variables
2. Add each variable below:

**Production Environment:**
```
NEXT_PUBLIC_SUPABASE_URL = https://your-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = your-anon-key
GEMINI_API_KEY = (optional) your-gemini-key
APP_URL = https://wrap-weft.vercel.app
NODE_ENV = production
NEXT_PUBLIC_ENABLE_PPT_DOWNLOAD = true
NEXT_PUBLIC_ENABLE_ANALYTICS = false
```

**Preview Environment (for pull requests):**
```
Same as Production, but:
APP_URL = [Will be auto-generated by Vercel]
NODE_ENV = production
```

**Development Environment:**
```
NEXT_PUBLIC_ENABLE_ANALYTICS = false
NEXT_PUBLIC_ENABLE_PPT_DOWNLOAD = true
```

---

## ✅ VERIFICATION CHECKLIST

### Before First Deployment:
- [ ] All REQUIRED variables have values
- [ ] NEXT_PUBLIC_ variables are safe (no secrets)
- [ ] Supabase credentials are correct
- [ ] APP_URL matches your domain
- [ ] NODE_ENV set to production for Vercel
- [ ] No hardcoded values in code

### After Deployment:
- [ ] Collections page loads (Supabase connected)
- [ ] Images display correctly
- [ ] Contact form works (can submit)
- [ ] PPT download button appears (if enabled)
- [ ] No console errors for missing variables
- [ ] No 500 errors in server logs

### Testing Commands:
```bash
# Local test build (simulates production)
npm run build
npm run start
# Visit http://localhost:3000/collections

# Check environment variables loaded
console.log(process.env.NEXT_PUBLIC_SUPABASE_URL) // should print URL
```

---

## 🐛 DEBUGGING ENVIRONMENT ISSUES

### Problem: Collections page blank
**Check:**
```
1. Is NEXT_PUBLIC_SUPABASE_URL correct?
   - Go to supabase.com and verify exact URL
   
2. Is NEXT_PUBLIC_SUPABASE_ANON_KEY correct?
   - Must be "anon" key, not "service" key
   - ~150+ characters
   
3. Does Supabase table exist?
   - Go to Supabase: tables → "collections" should exist
   
4. Is RLS disabled for collections table?
   - Supabase: collections table → RLS disabled (for now)
   - Or RLS policies allow public read
```

### Problem: Contact form can't submit
**Check:**
```
1. Same Supabase checks as above
2. contacts table exists in Supabase
3. RLS allows public insert
4. Check browser console for CORS errors
```

### Problem: Build fails with missing variable
**Check:**
```
1. Variable missing from .env.local (for local)
   - Add to .env.local file
   - Restart dev server: npm run dev
   
2. Variable missing from Vercel
   - Go to Vercel → Settings → Environment Variables
   - Add the variable
   - Redeploy: click "Deploy" button
```

---

## 📚 QUICK REFERENCE TABLE

| Variable | Type | Scope | Required | Format |
|----------|------|-------|----------|--------|
| NEXT_PUBLIC_SUPABASE_URL | String | PUBLIC | ✅ | URL: `https://...supabase.co` |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | String | PUBLIC | ✅ | JWT: `eyJ...` |
| GEMINI_API_KEY | String | PRIVATE | ⚠️ | `AIzaSy...` |
| APP_URL | String | PRIVATE | ✅ | `https://domain.com` |
| NODE_ENV | String | PRIVATE | ✅ | `production`/`development` |
| NEXT_PUBLIC_ENABLE_PPT_DOWNLOAD | String | PUBLIC | ⚠️ | `true`/`false` |
| NEXT_PUBLIC_ENABLE_ANALYTICS | String | PUBLIC | ⚠️ | `true`/`false` |

---

## 🎯 MEMORY SUMMARY

### The Core 4 (Must Have Now):
1. **NEXT_PUBLIC_SUPABASE_URL** - Database endpoint
2. **NEXT_PUBLIC_SUPABASE_ANON_KEY** - Database access token
3. **APP_URL** - Where app is deployed
4. **NODE_ENV** - Dev or production mode

### The Important 2 (Optional but useful):
5. **GEMINI_API_KEY** - AI features (when needed)
6. Feature flags - Turn features on/off

### Security Rule:
- `NEXT_PUBLIC_` = Safe for browser (public keys only)
- No prefix = Secret (server-only)

### Deployment:
- Local: Store in `.env.local`
- Vercel: Store in Settings → Environment Variables
- Never commit `.env.local` to Git
