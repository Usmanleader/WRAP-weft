# VERCEL DEPLOYMENT GUIDE - WRAP WEFT & CO

## STEP 1: PREPARE FOR VERCEL DEPLOYMENT

### Prerequisites
- GitHub account with WRAP-weft repository (✅ Done)
- Vercel account: https://vercel.com/signup
- Supabase project set up
- All environment variables documented

---

## STEP 2: CREATE VERCEL PROJECT

### Method A: Connect via Vercel Dashboard (Recommended)

1. Go to https://vercel.com/new
2. Click "Continue with GitHub"
3. Search for "WRAP-weft" repository
4. Click "Import"
5. Configure Project Settings:
   - **Project Name**: wrap-weft-co
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `.next` (auto-detected)
   - **Install Command**: `npm install` (auto-detected)

---

## STEP 3: SET ENVIRONMENT VARIABLES IN VERCEL

**Critical:** These MUST be added before deployment or the app will fail.

### In Vercel Dashboard:
1. Go to your project → Settings → Environment Variables
2. Add each variable below for **Production**, **Preview**, and **Development**

### REQUIRED ENVIRONMENT VARIABLES:

#### Supabase Configuration (PUBLIC - safe to expose)
```
NEXT_PUBLIC_SUPABASE_URL = https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = your-anon-key-from-supabase
```

#### Gemini AI Configuration (PRIVATE - keep secret)
```
GEMINI_API_KEY = sk_...your-api-key...
```

#### Application Configuration
```
APP_URL = https://your-domain.vercel.app
NODE_ENV = production
```

#### Feature Flags
```
NEXT_PUBLIC_ENABLE_PPT_DOWNLOAD = true
NEXT_PUBLIC_ENABLE_ANALYTICS = false
```

---

## STEP 4: GET YOUR CREDENTIALS

### A. Supabase API Keys
1. Go to https://supabase.com → Your Project → Settings → API
2. Copy **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
3. Copy **Anon Key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. (Optional) Copy **Service Role Key** for server-side functions

### B. Gemini API Key
1. Go to https://aistudio.google.com or Google Cloud Console
2. Create new API key
3. Paste into `GEMINI_API_KEY`

### C. Get Your Vercel Domain
- After first deployment, Vercel assigns: `your-project.vercel.app`
- Use this for `APP_URL`
- Or connect custom domain later

---

## STEP 5: DEPLOY

### First Deployment
1. In Vercel Dashboard, click **Deploy**
2. Watch the build logs for any errors
3. First build takes 2-3 minutes

### Check Build Status
- Vercel shows real-time logs
- If build fails, error messages appear in logs
- Common issues:
  - Missing environment variables
  - TypeScript errors
  - Missing dependencies

---

## STEP 6: VERIFY DEPLOYMENT

### Important Checks:
1. ✅ Homepage loads at https://your-project.vercel.app
2. ✅ Collections page loads (tests Supabase connection)
3. ✅ Contact form works
4. ✅ Images load properly
5. ✅ Navigation works on mobile
6. ✅ PPT download button appears

### Test Collections Page
- Go to /collections
- Should display 6 fabric collections
- Filter by category should work
- If data doesn't show, Supabase connection failed

### Test Contact Form
- Go to /contact
- Submit a test message
- Should show success message
- Message saved to Supabase (if connected)

---

## STEP 7: CONNECT CUSTOM DOMAIN (Optional)

1. In Vercel → Settings → Domains
2. Add your domain (e.g., wrapweft.com)
3. Update DNS records:
   - Add CNAME: `your-project.vercel.app`
   - Or use Vercel's nameservers
4. DNS takes 24-48 hours to propagate

---

## ENVIRONMENT VARIABLES - COMPLETE REFERENCE

### Production Deployment Checklist:

| Variable | Value | Scope | Required |
|----------|-------|-------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://your-id.supabase.co` | Public | ✅ Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGc...` | Public | ✅ Yes |
| `GEMINI_API_KEY` | `AIzaSy...` | Secret | ⚠️ Optional* |
| `APP_URL` | `https://wrap-weft.vercel.app` | Secret | ✅ Yes |
| `NODE_ENV` | `production` | Secret | ✅ Yes |
| `NEXT_PUBLIC_ENABLE_PPT_DOWNLOAD` | `true` | Public | ⚠️ Optional |
| `NEXT_PUBLIC_ENABLE_ANALYTICS` | `false` | Public | ⚠️ Optional |

**Note:** Gemini API only needed if using AI features. Currently not used.

---

## TROUBLESHOOTING

### Collections Page Shows No Data
- **Cause**: Supabase not configured or RLS blocking access
- **Fix**: 
  1. Verify `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in Vercel
  2. Check Supabase: Collections table → Row Level Security → Policies
  3. Should allow public read access

### Build Fails with TypeScript Errors
- **Cause**: Type mismatches in code
- **Fix**: Run locally `npm run build` to see errors first

### Images Don't Load
- **Cause**: CDN or CORS issue
- **Fix**: Check `next.config.ts` remotePatterns configuration
- Currently allows: `picsum.photos` for placeholder images

### PPT Download Button Doesn't Work
- **Cause**: pptxgenjs CDN not loading
- **Fix**: Check browser console for CORS errors
- Script loaded with `lazyOnload` strategy, may take a moment

---

## CONTINUOUS DEPLOYMENT

### Automatic Deployments
1. Every push to `main` branch triggers automatic deployment
2. Vercel builds and deploys within 1-2 minutes
3. Preview deployments for pull requests

### Manual Redeployment
1. In Vercel Dashboard → Deployments → Click "..." → Redeploy
2. Or connect CI/CD pipeline

---

## ENVIRONMENT VARIABLE SECURITY BEST PRACTICES

### DO ✅
- [ ] Use `NEXT_PUBLIC_` only for frontend-safe values
- [ ] Store API keys in Vercel secrets (without NEXT_PUBLIC_ prefix)
- [ ] Use environment-specific values (prod vs preview)
- [ ] Rotate API keys periodically
- [ ] Use service role key only on backend

### DON'T ❌
- [ ] Never commit `.env.local` to Git
- [ ] Never expose service keys in frontend code
- [ ] Never hardcode API keys
- [ ] Never share credentials in logs
- [ ] Never use same keys for dev, preview, and production

---

## VERCEL DEPLOYMENT CHECKLIST

- [ ] Vercel account created
- [ ] GitHub repository connected to Vercel
- [ ] `NEXT_PUBLIC_SUPABASE_URL` added
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` added
- [ ] `GEMINI_API_KEY` added (optional)
- [ ] `APP_URL` set to Vercel domain
- [ ] `NODE_ENV` set to `production`
- [ ] First deployment successful
- [ ] Collections page loading data
- [ ] Contact form working
- [ ] Mobile responsive tested
- [ ] Custom domain connected (optional)
- [ ] DNS propagated
- [ ] Production tracking enabled

---

## QUICK COMMAND REFERENCE

```bash
# Local testing before Vercel deployment
npm run build          # Builds the project
npm run start          # Runs production server local
npm run dev            # Development server

# Git commands for Vercel auto-deploy
git add -A
git commit -m "Fix: description"
git push origin main   # Triggers Vercel deployment

# Check for issues
npm run lint           # Run linter
npm install            # Install dependencies
```

---

## SUPPORT RESOURCES

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Supabase Docs**: https://supabase.com/docs
- **Environment Variables**: https://vercel.com/docs/projects/environment-variables
