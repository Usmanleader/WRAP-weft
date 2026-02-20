# WRAP WEFT & CO - COMPLETE SETUP AND HOSTING GUIDE

**Last Updated:** February 20, 2026  
**Project:** Premium Textile Supplier Website  
**Tech Stack:** Next.js 15 | React 19 | Vercel | Supabase | TypeScript  
**Live Site:** https://weft-kohl.vercel.app

---

## TABLE OF CONTENTS

1. [Project Overview](#project-overview)
2. [Prerequisites](#prerequisites)
3. [Local Development Setup](#local-development-setup)
4. [Database Setup (Supabase)](#database-setup-supabase)
5. [Environment Variables](#environment-variables)
6. [GitHub Setup](#github-setup)
7. [Vercel Deployment](#vercel-deployment)
8. [PPT Download Setup](#ppt-download-setup)
9. [Testing & Verification](#testing--verification)
10. [Troubleshooting](#troubleshooting)
11. [Maintenance & Updates](#maintenance--updates)
12. [Architecture & Structure](#architecture--structure)

---

## PROJECT OVERVIEW

**What is Wrap Weft & Co?**
- B2B textile supplier connecting premium denim/fabric manufacturers with fashion brands
- Showcases 6 fabric collections (Raw Denim, Sustainable, Performance, Vintage, Summer Linen, Canvas)
- Allows customers to browse collections, contact company, and download company profile

**Key Features:**
- ✅ Responsive homepage with animations
- ✅ Collections catalog with filtering
- ✅ Contact form with Supabase integration
- ✅ PPT company profile download
- ✅ About & Sustainability pages
- ✅ SEO optimized
- ✅ Mobile-first design

**Business Model:**
- Customers browse collections
- Request samples via contact form
- Download company presentation
- Leads stored in Supabase database

---

## PREREQUISITES

Before starting, ensure you have:

### Software Required:
- **Node.js** (v18+) - https://nodejs.org
- **npm** (v9+) - Comes with Node.js
- **Git** - https://git-scm.com
- **PowerShell 5.1** (Windows) or Terminal (Mac/Linux)
- **VS Code** (recommended) - https://code.visualstudio.com

### Accounts Required:
- **GitHub** Account - https://github.com
- **Vercel** Account - https://vercel.com
- **Supabase** Account - https://supabase.com

### Verify Installation:
```bash
# Check Node.js version (should be v18+)
node --version

# Check npm version (should be v9+)
npm --version

# Check Git version
git --version
```

If any are missing, install them before proceeding.

---

## LOCAL DEVELOPMENT SETUP

### Step 1: Clone Repository

```bash
# Navigate to desired folder
cd E:\Projects  # or your preferred location

# Clone the repository
git clone https://github.com/Usmanleader/WRAP-weft.git

# Navigate into project
cd WRAP-weft
```

### Step 2: Install Dependencies

```bash
# Install all npm packages
npm install

# This installs:
# - Next.js 15 (React framework)
# - React 19 (UI library)
# - Tailwind CSS (styling)
# - Supabase client (database)
# - Framer Motion (animations)
# - Toast notifications (Sonner)
# - And 30+ other dependencies
```

**Installation Time:** 2-5 minutes depending on internet speed

### Step 3: Create Local Environment File

```bash
# Create .env.local file (copy from .env.example)
cp .env.example .env.local
```

Or manually create `.env.local` in root folder with:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
GEMINI_API_KEY=your-api-key-here
APP_URL=http://localhost:3000
NODE_ENV=development
NEXT_PUBLIC_ENABLE_PPT_DOWNLOAD=true
NEXT_PUBLIC_ENABLE_ANALYTICS=false
```

### Step 4: Run Development Server

```bash
# Start local development server
npm run dev

# Output will show:
# > next dev
# ▲ Next.js 15.4.9
# - ready on http://localhost:3000

# Open browser and visit: http://localhost:3000
```

**Development Server Features:**
- Hot reload (code changes refresh automatically)
- Faster compilation
- Detailed error messages
- Debug tools enabled

**Stop Server:** Press `Ctrl + C` in terminal

---

## DATABASE SETUP (SUPABASE)

### What is Supabase?
PostgreSQL database in the cloud. We use it to store:
- **collections** - All 6 fabric products
- **contacts** - Customer inquiries from contact form

### Step 1: Create Supabase Project

1. Go to https://supabase.com
2. Click "New Project"
3. Sign in with GitHub (recommended) or Email
4. Fill in project details:
   - **Project Name:** `weft` or `wrap-weft`
   - **Database Password:** Create strong password (save it!)
   - **Region:** Choose closest to you (e.g., us-east-1)
5. Click "Create Project"
6. Wait 1-2 minutes for database creation

### Step 2: Get API Credentials

1. In Supabase Dashboard, click **Settings** (gear icon)
2. Click **API** in left sidebar
3. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **Anon Key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

**Never share these keys!** Keep them secret.

### Step 3: Create Collections Table

1. In Supabase, click **SQL Editor** (left sidebar)
2. Click **New Query**
3. Paste this SQL:

```sql
-- Create collections table
CREATE TABLE collections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  long_description TEXT,
  features TEXT[] DEFAULT ARRAY[]::text[],
  image TEXT,
  images TEXT[] DEFAULT ARRAY[]::text[],
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT now()
);

-- Create index for better query performance
CREATE INDEX collections_category_idx ON collections(category);

-- Enable Row Level Security (RLS)
ALTER TABLE collections ENABLE ROW LEVEL SECURITY;

-- Create policy: Allow anyone to read
CREATE POLICY "Allow public read" ON collections
  FOR SELECT
  USING (true);
```

4. Click **Run** (blue button)
5. Success message appears

### Step 4: Create Contacts Table

```sql
-- Create contacts table
CREATE TABLE contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT now()
);

-- Enable RLS
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Create policy: Allow anyone to insert
CREATE POLICY "Allow public insert" ON contacts
  FOR INSERT
  WITH CHECK (true);

-- Create policy: Admin can read (optional)
CREATE POLICY "Admin can read" ON contacts
  FOR SELECT
  USING (auth.role() = 'authenticated');
```

### Step 5: Insert Sample Data

```sql
-- Insert 6 fabric collections
INSERT INTO collections (title, category, description, long_description, features, image, images, is_featured)
VALUES
  (
    'Raw Denim Series',
    'Denim',
    'Unwashed, untreated, and pure.',
    'Our Raw Denim Series pays homage to the origins of denim. Perfect for heritage brands.',
    ARRAY['100% Cotton', 'Selvedge Edge', 'Heavyweight (14oz+)'],
    'https://picsum.photos/800/1000?random=1',
    ARRAY['https://picsum.photos/800/1000?random=1', 'https://picsum.photos/800/1000?random=11'],
    true
  ),
  (
    'Eco-Weave Blends',
    'Sustainable',
    'Organic cotton and recycled polyester blends.',
    'Sustainable fabrics with GOTS-certified organic cotton and REPREVE® recycled polyester.',
    ARRAY['GOTS Certified', 'Recycled Polyester', 'Low-impact Dyes'],
    'https://picsum.photos/800/1000?random=2',
    ARRAY['https://picsum.photos/800/1000?random=2', 'https://picsum.photos/800/1000?random=21'],
    true
  ),
  (
    'Performance Stretch',
    'Performance',
    'Advanced elasticity without compromising denim look.',
    'Engineered for movement with superior recovery and comfort.',
    ARRAY['High Elasticity', 'Shape Retention', 'Breathable'],
    'https://picsum.photos/800/1000?random=3',
    ARRAY['https://picsum.photos/800/1000?random=3', 'https://picsum.photos/800/1000?random=31'],
    true
  ),
  (
    'Vintage Selvedge',
    'Denim',
    'Recreating the golden era of denim.',
    'Woven on restored Toyoda shuttle looms for authentic vintage feel.',
    ARRAY['Shuttle Loom Woven', 'Red/Blue ID', 'Rope Dyed Indigo'],
    'https://picsum.photos/800/1000?random=4',
    ARRAY['https://picsum.photos/800/1000?random=4', 'https://picsum.photos/800/1000?random=41'],
    false
  ),
  (
    'Summer Linen',
    'Lightweight',
    'Breathable linen-cotton blends for warmer climates.',
    'Features a subtle slub texture and crisp hand for summer shirting.',
    ARRAY['Breathable', 'Natural Cooling', 'Textured Surface'],
    'https://picsum.photos/800/1000?random=5',
    ARRAY['https://picsum.photos/800/1000?random=5', 'https://picsum.photos/800/1000?random=51'],
    false
  ),
  (
    'Industrial Canvas',
    'Workwear',
    'Rugged, durable canvas for workwear and accessories.',
    'Heavyweight fabric with exceptional abrasion resistance.',
    ARRAY['Heavyweight (12-18oz)', 'Abrasion Resistant', 'Water Repellent'],
    'https://picsum.photos/800/1000?random=6',
    ARRAY['https://picsum.photos/800/1000?random=6', 'https://picsum.photos/800/1000?random=61'],
    false
  );
```

### Step 6: Verify Tables

1. In Supabase, click **Table Editor** (left sidebar)
2. You should see:
   - `collections` table with 6 rows
   - `contacts` table (empty, for form submissions)

---

## ENVIRONMENT VARIABLES

### Overview

Environment variables are sensitive settings stored securely:
- **PUBLIC** (`NEXT_PUBLIC_*`): Safe to expose in browser
- **PRIVATE**: Secret, server-only, never expose

### Required Variables

#### 1. NEXT_PUBLIC_SUPABASE_URL
```
What: Database endpoint URL
Format: https://[project-id].supabase.co
Where: Supabase Settings → API → Project URL
Why: Connects frontend to database
```

#### 2. NEXT_PUBLIC_SUPABASE_ANON_KEY
```
What: Public authentication key for database
Format: eyJ... (JWT token ~150+ characters)
Where: Supabase Settings → API → Anon Key
Why: Allows secure anonymous access to database
```

#### 3. APP_URL
```
What: Where your app is deployed
Format: https://weft-kohl.vercel.app (production)
        http://localhost:3000 (development)
Why: Used for self-referential links, email callbacks
```

#### 4. NODE_ENV
```
What: Environment mode
Values: "development" (local) or "production" (Vercel)
Why: Changes build optimization, error verbosity
```

### Optional Variables

#### GEMINI_API_KEY
```
What: Google Gemini AI API key
Format: AIzaSy...
Why: For future AI features (not currently used)
```

#### NEXT_PUBLIC_ENABLE_PPT_DOWNLOAD
```
What: Toggle PPT download feature
Format: "true" or "false"
Why: Turn feature on/off for testing
```

### Where to Add Variables

**Local Development (.env.local):**
```bash
# In project root, create .env.local
NEXT_PUBLIC_SUPABASE_URL=https://mouocihgagmroxszummh.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
APP_URL=http://localhost:3000
NODE_ENV=development
```

**Production (Vercel):**
1. Go to https://vercel.com/dashboard
2. Click `weft` project
3. Settings → Environment Variables
4. Add each variable for "Production" environment

---

## GITHUB SETUP

### Why GitHub?
- Version control for code changes
- Backup of project
- Triggers automatic Vercel deployments

### Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Fill in:
   - **Repository name:** `WRAP-weft`
   - **Description:** Premium textile supplier website
   - **Visibility:** Public (for Vercel to access)
3. Click "Create repository"

### Step 2: Initialize Local Git

```bash
# Navigate to project
cd e:\weft

# Initialize Git
git init

# Configure user (one-time)
git config user.email "your-email@example.com"
git config user.name "Your Name"

# Add all files
git add -A

# Create initial commit
git commit -m "Initial commit: Wrap Weft & Co textile supplier website"
```

### Step 3: Push to GitHub

```bash
# Add remote repository
git remote add origin https://github.com/Usmanleader/WRAP-weft.git

# Rename branch to main
git branch -M main

# Push to GitHub
git push -u origin main

# First push may ask for authentication
# Use Personal Access Token if password doesn't work
```

### Step 4: Verify GitHub

1. Go to https://github.com/Usmanleader/WRAP-weft
2. You should see all your project files
3. Recent commit message visible

**Making Changes Going Forward:**
```bash
# Make changes to files
vi components/home/hero.tsx  # Edit file

# Commit changes
git add -A
git commit -m "Fix: Update hero section styling"

# Push to GitHub (triggers Vercel auto-deploy)
git push origin main
```

---

## VERCEL DEPLOYMENT

### What is Vercel?
- Hosting platform optimized for Next.js
- Auto-deploys on GitHub push
- Free tier perfect for this project
- CDN for fast global delivery

### Step 1: Connect Vercel to GitHub

1. Go to https://vercel.com/new
2. Click "Continue with GitHub"
3. Authorize Vercel to access your GitHub
4. Search and select `WRAP-weft` repository
5. Click "Import"

### Step 2: Configure Import Settings

In the import dialog:
- **Project Name:** `weft`
- **Framework:** Next.js (auto-detected)
- **Build Command:** `npm run build` (auto-filled)
- **Output Directory:** `.next` (auto-filled)

### Step 3: Add Environment Variables in Vercel

**CRITICAL:** Don't skip this or site won't work!

In the import dialog, scroll to "Environment Variables":

Add these 4 variables:

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://mouocihgagmroxszummh.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |
| `NODE_ENV` | `production` |
| `APP_URL` | `https://weft-kohl.vercel.app` |

Click "Deploy"

### Step 4: Wait for Deployment

- Initial build takes 2-3 minutes
- Watch logs for any errors
- Success page shows deployment URL

### Step 5: Access Your Site

Your site is now live at: **https://weft-kohl.vercel.app**

### Step 6: Auto-Deployment

From now on:
1. Make code changes locally
2. Commit: `git commit -m "message"`
3. Push: `git push origin main`
4. Vercel auto-deploys within 1 minute
5. Changes live immediately

### Troubleshooting Vercel Deployment

**If build fails:**
1. Check Vercel Logs tab
2. Look for error messages
3. Common issues:
   - Missing environment variables
   - TypeScript errors
   - Missing dependencies

**Fix and redeploy:**
```bash
# Fix local issue
git commit -m "Fix: Build error"
git push origin main

# Or manual redeploy in Vercel Dashboard
# Click Deployments → Latest → Redeploy
```

---

## PPT DOWNLOAD SETUP

### What We're Doing
Making the "Download PPT" button downloadable from the public folder.

### File Location
- **File:** `public/Denim Profile A.pptx` (5.5MB)
- **Accessible at:** `https://weft-kohl.vercel.app/Denim Profile A.pptx`

### Where Download Button Appears
1. **Homepage Hero Section** - Blue "Download PPT" button
2. **Footer** - "Download Company PPT" link

### How Downloads Work

**Button Code (Hero):**
```tsx
<a
  href="/Denim Profile A.pptx"
  download="Denim-Profile.pptx"
>
  <FileText className="mr-2 h-4 w-4" />
  Download PPT
</a>
```

**Button Code (Footer):**
```tsx
<a 
  href="/Denim Profile A.pptx"
  download="Denim-Profile.pptx"
  className="hover:text-blue-400 flex items-center gap-2"
>
  <FileText className="h-3 w-3" />
  Download Company PPT
</a>
```

### To Replace PPTX File

1. Prepare new `.pptx` file
2. Copy to `public/` folder
3. Update href in hero.tsx and footer.tsx:
   ```tsx
   href="/YourNewFile.pptx"
   download="YourNewFile.pptx"
   ```
4. Commit and push
5. Vercel auto-deploys

### Testing Download (Local)

```bash
# Run dev server
npm run dev

# Visit http://localhost:3000
# Click "Download PPT" button
# File downloads to Downloads folder
```

---

## TESTING & VERIFICATION

### Pre-Deployment Testing (Local)

#### Step 1: Build Test
```bash
npm run build

# Should output:
# ✓ Creating optimized production build
# ✓ Compiled successfully
# ✓ Linting and checking validity of types
# ✓ Collecting pagedata
# ✓ Generating static pages (7/7)
# ✓ Finalizing page optimization
```

#### Step 2: Run Production Build Locally
```bash
npm run start

# Starts on http://localhost:3000 (production mode)
```

#### Step 3: Test All Pages

| Page | Steps | Expected |
|------|-------|----------|
| Home | Visit `/` | Hero loads, animations smooth, buttons clickable |
| Collections | Click "View Collections" | 6 fabrics display, category filters work |
| Collection Detail | Click a collection | Detailed view opens with description |
| Contact | Click "Request Samples" | Form displays, can fill, submit works |
| About | Scroll footer, click About | Page loads with company background |
| Download PPT | Click "Download PPT" | PPTX file downloads |

#### Step 4: Test Supabase Connection
```bash
# Open Collections page
# Should show: collections loading from Supabase

# Open Contact form, fill and submit
# Success message appears
# Check Supabase: contacts table has new entry
```

#### Step 5: Test Mobile Responsive
```bash
# Chrome DevTools
# Press F12
# Click device toggle (mobile icon)
# Test on iPhone 12, iPad, etc.

# Should work:
# - Menu becomes hamburger on mobile
# - Text readable without zooming
# - Buttons touch-friendly (48px minimum)
```

### Post-Deployment Testing (Production)

1. Visit https://weft-kohl.vercel.app
2. Verify all pages load
3. Test contact form (check Supabase for submission)
4. Download PPT file
5. Test on mobile via DevTools

---

## TROUBLESHOOTING

### Collections Page Shows No Data

**Problem:** `/collections` displays empty

**Solution:**
1. Check environment variables in Vercel:
   - Is `NEXT_PUBLIC_SUPABASE_URL` set?
   - Is `NEXT_PUBLIC_SUPABASE_ANON_KEY` present?
2. Verify Supabase database:
   - Go to Supabase → Table Editor
   - Does "collections" table exist?
   - Does it have 6 rows?
3. Check RLS policies:
   - Table Editor → collections → RLS
   - Should allow public read

**If issue persists:**
- Contact form should still work (uses fallback data)
- Check browser console (F12) for error messages

### Contact Form Won't Submit

**Problem:** Click "Submit" button, nothing happens

**Solution:**
1. Check browser console (F12 → Console tab) for errors
2. Verify Supabase credentials in Vercel
3. In Supabase, verify "contacts" table exists
4. Check RLS policies allow public insert

**Try:**
- Clear browser cache
- Try incognito mode
- Check all form fields are filled

### Build Fails on Vercel

**Problem:** Deployment errors in Vercel logs

**Solution:**
1. Check Vercel Logs tab for specific error
2. Run locally first: `npm run build`
3. Fix errors locally
4. Push changes: `git push origin main`
5. Vercel auto-redeploys

**Common issues:**
```
Error: NEXT_PUBLIC_SUPABASE_URL is not set
→ Add to Vercel environment variables

Error: Cannot find module '@supabase/supabase-js'
→ Run: npm install

Error: Type checking failed
→ Fix TypeScript errors locally
```

### PPT Download Link Broken

**Problem:** Download button doesn't work

**Solution:**
1. File should exist: `public/Denim Profile A.pptx`
2. File path must be correct in code:
   - `href="/Denim Profile A.pptx"` (exact filename)
3. Clear browser cache
4. Try incognito mode

**Verify file exists:**
```bash
ls -la public/
# Should show: Denim Profile A.pptx
```

### Slow Performance

**Problem:** Site loads slowly

**Solution:**
1. Check Vercel Analytics:
   - Dashboard → project → Analytics
2. Check images:
   - Using CDN? Currently uses picsum.photos
   - Replace with optimized images
3. Database performance:
   - Add indexes in Supabase
   - Optimize queries

### White screen or 404 on Vercel

**Problem:** Getting blank page or "page not found"

**Solution:**
1. Verify build succeeded in Vercel Logs
2. Check if app URL is correct
3. Redeploy:
   - Vercel Dashboard → Deployments
   - Click latest → "..." → Redeploy

```bash
# Or redeploy via Git
git commit --allow-empty -m "Trigger redeploy"
git push origin main
```

---

## MAINTENANCE & UPDATES

### Weekly Tasks
- [ ] Monitor Vercel analytics
- [ ] Check error logs in Vercel
- [ ] Monitor Supabase database size
- [ ] Review new contact form submissions

### Monthly Tasks
- [ ] Update npm packages: `npm update`
- [ ] Security audit: `npm audit`
- [ ] Review analytics and traffic

### When Adding Features

```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Make changes locally
npm run dev

# Test everything
npm run build

# Commit changes
git add -A
git commit -m "feat: Add new feature"

# Push feature branch
git push origin feature/your-feature-name

# Create Pull Request on GitHub
# Review changes
# Merge to main

# Vercel auto-deploys main branch
```

### Updating Collections

**Option 1: Via Supabase UI**
1. Go to Supabase Table Editor
2. Click "collections" table
3. Edit/add rows directly
4. Changes appear immediately on site

**Option 2: Via SQL**
```sql
-- Update a collection
UPDATE collections
SET description = 'New description'
WHERE title = 'Raw Denim Series';

-- Add new collection
INSERT INTO collections (title, category, description, ...)
VALUES ('New Fabric', 'Denim', '...', ...);

-- Delete collection
DELETE FROM collections WHERE id = 'uuid-here';
```

### Deploying Code Changes

```bash
# Make changes to files in VS Code
# Test locally: npm run dev

# When ready to deploy:
git add -A
git commit -m "feat: Describe your changes"
git push origin main

# Vercel automatically deploys
# Check: https://weft-kohl.vercel.app
```

---

## ARCHITECTURE & STRUCTURE

### Project Directory

```
e:\weft/
├── app/                              # Next.js app router
│   ├── page.tsx                      # Homepage
│   ├── layout.tsx                    # Root layout (fonts, scripts)
│   ├── globals.css                   # Global Tailwind styles
│   ├── about/page.tsx                # About page
│   ├── collections/                  # Collections pages
│   │   ├── page.tsx                  # Collections grid
│   │   └── [id]/page.tsx             # Collection detail
│   ├── contact/page.tsx              # Contact form
│   └── sustainability/page.tsx       # Sustainability page
│
├── components/                       # Reusable React components
│   ├── home/                         # Homepage sections
│   │   ├── hero.tsx                  # Hero banner with CTA
│   │   ├── featured-collections.tsx  # Top collections grid
│   │   ├── about-snippet.tsx         # Brief company intro
│   │   ├── process-section.tsx       # Company process
│   │   └── cta-section.tsx           # Call to action
│   ├── collection/
│   │   └── image-gallery.tsx         # Multi-image carousel
│   ├── layout/
│   │   ├── header.tsx                # Navigation & logo
│   │   └── footer.tsx                # Footer with links
│   └── ui/                           # Reusable UI components
│       ├── button.tsx                # Button variants
│       ├── input.tsx                 # Form input
│       └── textarea.tsx              # Form textarea
│
├── lib/                              # Utilities & services
│   ├── supabase.ts                   # Supabase client setup
│   ├── data.ts                       # Static collection data (fallback)
│   ├── ppt-generator.ts              # PPT generation (legacy)
│   └── utils.ts                      # Helper functions
│
├── hooks/
│   └── use-mobile.ts                 # Mobile detection hook
│
├── public/                           # Static files (accessible via HTTP)
│   └── Denim Profile A.pptx          # Downloadable company profile
│
├── .env.local                        # Local environment variables (NEVER commit)
├── .env.example                      # Template for env vars
├── .gitignore                        # Files to ignore in Git
├── package.json                      # Project dependencies
├── tsconfig.json                     # TypeScript config
├── next.config.ts                    # Next.js config
├── tailwind.config.ts                # Tailwind CSS config
└── README.md                         # Project documentation
```

### Data Flow

#### Collections (Display) Flow:
```
User visits /collections
    ↓
Collections page loads (collections/page.tsx)
    ↓
useEffect hook runs
    ↓
If Supabase configured:
  → Query collections table
  → Display in grid with filters
Else:
  → Use static data from lib/data.ts
  ↓
Show 6 fabric collections
```

#### Contact Form Flow:
```
User fills contact form
    ↓
User clicks Submit
    ↓
Form validation runs
    ↓
Sends data to Supabase contacts table
    ↓
If successful: Show success message
If failed: Show error, use static fallback
    ↓
Data stored in database
```

#### PPT Download Flow:
```
User clicks "Download PPT"
    ↓
Browser requests /Denim Profile A.pptx
    ↓
Vercel serves file from /public folder
    ↓
File downloads to Downloads folder
    ↓
File opens in PowerPoint/Google Slides
```

### Tech Stack Explanation

| Technology | Purpose | Version |
|-----------|---------|---------|
| Next.js | React framework, SSR, optimizations | 15.4.9 |
| React | UI library | 19.2.1 |
| TypeScript | Type safety | 5.9.3 |
| Tailwind CSS | Styling utilities | 4.1.11 |
| Supabase | PostgreSQL database | 2.97.0 |
| Framer Motion | Animations | 12.23.24 |
| Lucide React | Icons | 0.553.0 |
| Sonner | Toast notifications | 2.0.7 |
| Vercel | Hosting & deployment | - |

### How Sites Gets Served

```
User types: https://weft-kohl.vercel.app
    ↓
Vercel CDN (globally distributed servers)
    ↓
Serves optimized HTML/JS/CSS
    ↓
Browser downloads and renders
    ↓
JavaScript executes on browser
    ↓
Requests data from Supabase API
    ↓
Database returns collections/contacts
    ↓
Page displays with data
    ↓
User sees beautiful textile portfolio!
```

---

## QUICK REFERENCE

### Common Commands

```bash
# Development
npm run dev              # Start dev server (localhost:3000)
npm run build            # Build for production
npm run start            # Run production build locally
npm run lint             # Check code quality

# Git
git status               # Show changed files
git add -A               # Stage all changes
git commit -m "message"  # Commit with message
git push origin main     # Push to GitHub (auto-deploys)
git pull origin main     # Pull latest changes

# Vercel
vercel login             # Authenticate with Vercel
vercel deploy --prod     # Deploy production
vercel env ls            # List environment variables
```

### Environment Variables Checklist

Before deployment, verify:
- [ ] `NEXT_PUBLIC_SUPABASE_URL` - Database URL
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Anon key
- [ ] `APP_URL` - Deployment domain
- [ ] `NODE_ENV` - Set to "production"

### Pre-Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Vercel environment variables set
- [ ] Supabase tables created with data
- [ ] Build passing locally (`npm run build`)
- [ ] All pages tested
- [ ] Contact form works
- [ ] PPT download works
- [ ] Mobile responsive verified

---

## SUCCESS INDICATORS

✅ **Your setup is complete when:**

- Website loads at https://weft-kohl.vercel.app
- Collections display from Supabase
- Contact form saves to database
- PPT file downloads
- Mobile responsive design works
- No errors in browser console
- All pages accessible and functional

---

## SUPPORT & RESOURCES

- **Next.js Docs:** https://nextjs.org/docs
- **Supabase Docs:** https://supabase.com/docs
- **Tailwind CSS:** https://tailwindcss.com/docs
- **Vercel Docs:** https://vercel.com/docs
- **TypeScript:** https://www.typescriptlang.org/docs

---

## NEXT STEPS (Future Enhancements)

1. **Custom Domain:** Add wrapweft.com or custom domain
2. **Email Notifications:** SendGrid for form submissions
3. **Analytics:** Google Analytics 4 for traffic tracking
4. **E-Commerce:** Add Stripe for product purchases
5. **User Auth:** Supabase authentication for clients
6. **Admin Dashboard:** Manage collections without code
7. **Email Campaigns:** Mailchimp integration
8. **SEO Optimization:** Meta tags, structured data, sitemap

---

**Created:** February 20, 2026  
**Last Updated:** February 20, 2026  
**Version:** 1.0  
**Status:** Production Ready ✅

For questions or updates, refer to GitHub repository: https://github.com/Usmanleader/WRAP-weft
