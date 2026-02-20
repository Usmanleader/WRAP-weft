# WRAP WEFT & CO - COMPLETE PROJECT MEMORIZATION GUIDE

## 📱 PROJECT OVERVIEW

**Name:** Wrap Weft & Co
**Type:** Premium Textile Supplier B2B Website
**Founded (Fictional):** 1985
**Tech Stack:** Next.js 15 + React 19 + TypeScript + Tailwind CSS + Supabase
**Deployment:** Vercel (recommended)
**GitHub:** https://github.com/Usmanleader/WRAP-weft

---

## 🎯 PROJECT PURPOSE

Connect premium denim & textile manufacturers with fashion designers and brands worldwide.

### Core Business Model:
- **Customers:** Fashion houses, clothing brands, designers
- **Products:** High-quality fabric collections (denim, sustainable, performance, etc.)
- **Services:** 
  - Browse collections with detailed descriptions
  - Download company presentation (PPT format)
  - Submit contact inquiries
  - Request quotes

---

## 📊 FABRIC COLLECTIONS (6 Total)

| ID | Collection | Category | USP | Key Features |
|---|---|---|---|---|
| 1 | Raw Denim Series | Denim | Authentic & vintage | 100% cotton, selvedge, heavyweight |
| 2 | Eco-Weave Blends | Sustainable | Eco-conscious | GOTS organic, recycled poly, low-impact dyes |
| 3 | Performance Stretch | Performance | Modern comfort | High elasticity, shape retention, breathable |
| 4 | Vintage Selvedge | Denim | Collector's item | Shuttle loom, rope dyed indigo, natural irregularities |
| 5 | Summer Linen | Lightweight | Breathable | Linen-cotton blend, textured, garment dye ready |
| 6 | Industrial Canvas | Workwear | Rugged durability | 12-18oz, abrasion resistant, water repellent |

**Location:** `lib/data.ts` - Static data that also syncs with Supabase

---

## 🏗️ PROJECT ARCHITECTURE

### Directory Structure:
```
e:\weft/
├── app/                          # Next.js app router
│   ├── layout.tsx               # Root layout with fonts, Toaster, PPT script
│   ├── page.tsx                 # Home page (hero, featured, about, process, CTA)
│   ├── about/                   # Company heritage & values
│   ├── collections/             # All collections grid + filtering
│   ├── collections/[id]/        # Individual collection details
│   ├── contact/                 # Contact form with Supabase integration
│   ├── sustainability/          # Sustainability commitments
│   └── globals.css              # Global Tailwind styles
│
├── components/                   # Reusable React components
│   ├── home/                    # Home page sections
│   │   ├── hero.tsx             # Main hero section
│   │   ├── featured-collections.tsx
│   │   ├── about-snippet.tsx   # Brief company intro
│   │   ├── process-section.tsx # Company process
│   │   └── cta-section.tsx     # Call to action
│   ├── collection/
│   │   └── image-gallery.tsx   # Multi-image carousel
│   ├── layout/
│   │   ├── header.tsx           # Navigation + logo
│   │   └── footer.tsx           # Links + PPT download
│   └── ui/                      # Shadcn-like components
│       ├── button.tsx           # Reusable button
│       ├── input.tsx            # Form input
│       └── textarea.tsx         # Form textarea
│
├── lib/                          # Utilities & services
│   ├── supabase.ts              # Supabase client setup
│   ├── data.ts                  # Static collection data
│   ├── ppt-generator.ts         # PowerPoint generation
│   └── utils.ts                 # Helper functions (cn for Tailwind merge)
│
├── hooks/
│   └── use-mobile.ts            # Mobile detection hook
│
├── package.json                  # Dependencies
├── tsconfig.json                # TypeScript config
├── next.config.ts               # Next.js config (image optimization)
├── tailwind.config.ts           # Tailwind CSS setup
├── .env.local                   # Environment variables (local)
├── .env.example                 # Template for env vars
└── .gitignore                   # Git ignore rules
```

---

## 🔑 KEY DEPENDENCIES

### Core Framework
- **next** ^15.4.9 - Framework
- **react** ^19.2.1 - UI library
- **react-dom** ^19.2.1 - React DOM rendering

### Styling
- **tailwindcss** 4.1.11 - CSS utility framework
- **@tailwindcss/postcss** 4.1.11 - PostCSS plugin
- **postcss** ^8.5.6 - CSS processing
- **class-variance-authority** ^0.7.1 - Component variants (like styled-system)
- **clsx** ^2.1.1 - Conditional classNames
- **tailwind-merge** ^3.3.1 - Merge Tailwind classes without conflicts

### UI Components & Animations
- **motion** ^12.23.24 - Framer Motion animations
- **lucide-react** ^0.553.0 - Icon library
- **@radix-ui/react-slot** ^1.2.4 - Radix UI slot component
- **sonner** ^2.0.7 - Toast notifications

### Backend & Data
- **@supabase/supabase-js** ^2.97.0 - Supabase client
- **@google/genai** ^1.17.0 - Google Gemini AI (prepared, not active)

### PowerPoint Generation
- **pptxgenjs** ^4.0.1 - Server-side PPT generation

### Forms & Validation
- **@hookform/resolvers** ^5.2.1 - Form hook validation

### Development
- **typescript** 5.9.3 - Type safety
- **eslint** 9.39.1 - Code linting
- **firebase-tools** ^15.0.0 - Firebase CLI (might be unused)

---

## 📄 PAGES & ROUTES

### 1. **Homepage** (`/`)
**File:** `app/page.tsx`
**Components:**
- Header (navigation)
- Hero (main banner)
- AboutSnippet (company intro)
- FeaturedCollections (grid of best sellers)
- ProcessSection (company process)
- CtaSection (call to action)
- Footer

**Features:**
- Responsive design
- Animations using Framer Motion
- Links to other pages

---

### 2. **Collections** (`/collections`)
**File:** `app/collections/page.tsx`
**State:** Client-side
**Features:**
- Grid display of all 6 collections
- Category filtering (All, Denim, Sustainable, Performance, Lightweight, Workwear)
- Animations on scroll
- Images from picsum.photos (placeholder)
- Supabase integration (fetches from DB, falls back to static data)

**Data Flow:**
```
Load page
→ useEffect triggers
→ IF supabase configured:
    → Query "collections" table from Supabase
    → If error: Use static data from lib/data.ts
→ Else: Use static data
→ Display in grid with category filter
```

**Error Handling:**
- If Supabase fails: Toast notification + fallback to static data
- Collections still display even if database is down

---

### 3. **Collection Details** (`/collections/[id]`)
**File:** `app/collections/[id]/page.tsx`
**Features:**
- Individual collection view
- Image gallery with multiple angles
- Detailed description
- Features list
- Related collections

---

### 4. **About** (`/about`)
**File:** `app/about/page.tsx`
**Content:**
- Company heritage (Founded 1985)
- Founder story (Elias Thorne)
- Core values (Quality First, Sustainability, Artisan Partnership)
- Manufacturing details
- Team information (fictional)

---

### 5. **Sustainability** (`/sustainability`)
**File:** `app/sustainability/page.tsx`
**Content:**
- Environmental commitments
- Eco-friendly practices
- Carbon footprint reduction
- Partnership with sustainability orgs

---

### 6. **Contact** (`/contact`)
**File:** `app/contact/page.tsx`
**State:** Client-side with form handling
**Features:**
- Contact form with fields:
  - First Name
  - Last Name
  - Email
  - Subject
  - Message
- Form validation
- Supabase integration (saves to "contacts" table)
- Success/error feedback with Sonner toasts

**Form Flow:**
```
User fills form
→ Click submit
→ IF supabase configured:
    → Insert into "contacts" table
    → If error: Toast error + simulate success
→ Else: Simulate 1.5s delay
→ Show success screen with checkmark
→ Option to send another message
```

---

## 🗄️ DATABASE SCHEMA (Supabase)

### collections Table
```sql
CREATE TABLE collections (
  id UUID PRIMARY KEY,
  title TEXT,
  category TEXT,
  description TEXT,
  long_description TEXT,
  features TEXT[],          -- Array of strings
  image TEXT,               -- Main image URL
  images TEXT[],            -- Array of image URLs
  is_featured BOOLEAN,
  created_at TIMESTAMP
);
```

**Indexes:** 
- id (primary key)
- category (for filtering)

**Row Level Security (RLS):**
- Public read access
- No write access for anonymous users

---

### contacts Table
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

**RLS:**
- Public insert access (for form submissions)
- Private read access (admin only)

---

## 🎨 DESIGN SYSTEM

### Colors (Tailwind)
- Primary: `blue-900` (#1e3a8a) - Professional navy
- Secondary: `slate-900` (#0f172a) - Dark charcoal
- Accent: `blue-500` (#3b82f6) - Bright blue
- Backgrounds: `slate-50` (#f8fafc) - Very light gray
- Text: `slate-600` (#475569) - Medium gray

### Typography
- **Serif:** Playfair Display (headings) - Elegant, luxury feel
- **Sans:** Inter (body text) - Clean, modern, readable
- Default sizes: 14px (body) → 44px+ (headings)

### Spacing
- Uses Tailwind defaults: 4px unit (p-4 = 16px, etc.)
- Container max-width: 1280px

### Components
- All UI components in `components/ui/`
- Extend with Tailwind `@apply` in globals.css
- Button variants: primary, outline, denim, ghost

### Animations
- Framer Motion (motion/react)
- Fade-in on scroll: `initial={{}} whileInView={{}} viewport={{once: true}}`
- Hover effects: scale, shadow, color transitions

---

## 🔌 KEY INTEGRATIONS

### 1. Supabase (Database & Auth)
**Setup:**
```typescript
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';
const supabase = createClient(URL, ANON_KEY);
```

**Used in:**
- `/collections` - Fetch all collections
- `/collections/[id]` - Fetch single collection
- `/contact` - Insert contact form submissions

**Fallback:** Static data in `lib/data.ts` if Supabase unavailable

---

### 2. PowerPoint Generation
**Library:** pptxgenjs v4.0.1
**Setup:**
```typescript
// Loaded via CDN in app/layout.tsx
<Script src="https://cdn.jsdelivr.net/npm/pptxgenjs@3.12.0/dist/pptxgen.bundle.js" />
```

**Usage:**
```typescript
// lib/ppt-generator.ts
async function generateCompanyPresentation() {
  const pptx = new window.PptxGenJS();
  // Create slides with company info, collections, etc.
  pptx.save({fileName: 'Wrap-Weft-Company-Profile.pptx'});
}
```

**Slides Generated:**
1. Title slide (company name, tagline, founded year)
2. About Us (company story)
3. Sustainability (eco-commitments)
4. Collections (dynamic slides for each fabric)
5. Contact (company contact info)

**Used in:**
- Footer "Download Company Profile" button
- Triggered by `handleDownloadPPT` onClick

---

### 3. Google Gemini AI
**Status:** Prepared but NOT actively used
**Setup:**
```typescript
// Not imported in active code, but available via:
import { GoogleGenerativeAI } from "@google/genai";
```

**Future Use Cases:**
- Smart fabric recommendations
- Chat assistant
- Content generation
- Search enhancements

**To Activate:**
1. Get API key from Google AI Studio
2. Add `GEMINI_API_KEY` to environment
3. Import and use in server actions or API routes

---

### 4. Animations (Framer Motion)
**Import:** `import { motion } from 'motion/react'`

**Common Patterns:**
```typescript
// Fade in on view
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ delay: 0.1 * index }}
>
  Content
</motion.div>

// Hover effect
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Click me
</motion.button>
```

**Used in:**
- Collection cards
- Value cards (about page)
- CTA buttons
- Modals/overlays

---

## 🚀 DEPLOYMENT FLOW

### Local Development
```bash
npm install              # Install dependencies
npm run dev              # Start dev server (localhost:3000)
npm run build            # Build for production
npm run lint             # Run ESLint
```

### GitHub
```bash
git add -A
git commit -m "message"
git push origin main     # Triggers Vercel auto-deploy
```

### Vercel
1. Connect GitHub repo
2. Add environment variables in Settings
3. Auto-deploy on every push to main
4. Get production URL: `wrap-weft.vercel.app`

---

## 🔐 ENVIRONMENT VARIABLES (MEMORIZED)

### MUST HAVE ✅
- `NEXT_PUBLIC_SUPABASE_URL` - Database URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Database access token
- `APP_URL` - Deployment domain
- `NODE_ENV` - production/development

### OPTIONAL ⚠️
- `GEMINI_API_KEY` - Google Gemini AI (future use)
- `NEXT_PUBLIC_ENABLE_PPT_DOWNLOAD` - Toggle PPT feature
- `NEXT_PUBLIC_ENABLE_ANALYTICS` - Toggle analytics

### SECURITY RULES 🔐
- `NEXT_PUBLIC_*` = Visible in browser (only public keys)
- No prefix = Server-only secrets
- Never commit `.env.local` to Git
- Rotate keys quarterly

---

## 📈 PERFORMANCE NOTES

### Optimizations Implemented
- ✅ Next.js image optimization (placeholders)
- ✅ Lazy loading (Framer Motion `viewport={{ once: true }}`)
- ✅ CSS utility framework (Tailwind, no runtime)
- ✅ TypeScript for type safety
- ✅ ESLint for code quality
- ✅ PostCSS for CSS processing

### Potential Improvements
- [ ] Image compression (real product photos vs. picsum)
- [ ] Database query optimization (add indexes)
- [ ] API caching headers
- [ ] CDN for static assets
- [ ] Web fonts optimization (already optimized via @next/font)
- [ ] Minification (already done in build)

---

## 🐛 COMMON ISSUES & FIXES

### Collections not displaying
```
❌ Problem: Collections page blank
✅ Solution: Check Supabase environment variables
  1. Verify NEXT_PUBLIC_SUPABASE_URL
  2. Verify NEXT_PUBLIC_SUPABASE_ANON_KEY
  3. Check if "collections" table exists in Supabase
  4. Check RLS policies allow public read
```

### Contact form doesn't save
```
❌ Problem: Form submits but no data saved
✅ Solution: Same Supabase checks + RLS policies
  1. Verify "contacts" table exists
  2. Check RLS allows public insert
  3. Check browser console for CORS errors
```

### Build fails locally
```
❌ Problem: npm run build fails
✅ Solution:
  1. npm run lint → Check for ESLint errors
  2. Check tsconfig.json → TypeScript errors
  3. Delete node_modules & .next, then reinstall
  4. Check for missing environment variables
```

### PPT download doesn't work
```
❌ Problem: Button doesn't generate PPT
✅ Solution:
  1. Check if window.PptxGenJS loaded (Chrome DevTools)
  2. Wait a moment after page load (lazy loading)
  3. Check browser console for errors
  4. Verify script in app/layout.tsx loaded correctly
```

---

## 📚 FILE DEPENDENCY MAP

```
Homepage (page.tsx)
├── Header (layout/header.tsx)
├── Hero (home/hero.tsx)
├── AboutSnippet (home/about-snippet.tsx)
├── FeaturedCollections (home/featured-collections.tsx)
│   └── Fetches from lib/data.ts
├── ProcessSection (home/process-section.tsx)
├── CtaSection (home/cta-section.tsx)
└── Footer (layout/footer.tsx)
    └── Calls lib/ppt-generator.ts on download

Collections Page (collections/page.tsx)
├── Supabase client (lib/supabase.ts)
├── Static data (lib/data.ts) - fallback
├── Toast notifications (import sonner)
└── Animations (import motion)

Contact Page (contact/page.tsx)
├── Supabase client (lib/supabase.ts)
├── Form inputs (components/ui/input.tsx, textarea.tsx)
├── Button (components/ui/button.tsx)
└── Toast notifications (import sonner)
```

---

## 🎯 NEXT STEPS FOR PRODUCTION

### Immediate (Week 1)
- [ ] Get Supabase project set up
- [ ] Add real product images (replace picsum)
- [ ] Configure environment variables
- [ ] Deploy to Vercel
- [ ] Test all pages and forms

### Short-term (Week 2-3)
- [ ] Connect custom domain
- [ ] Set up SSL certificate
- [ ] Configure email notifications (SendGrid)
- [ ] Add analytics (Google Analytics)
- [ ] Set up monitoring (Vercel analytics)

### Medium-term (Month 2)
- [ ] Add e-commerce (Stripe integration)
- [ ] Order management system
- [ ] User authentication (Supabase Auth)
- [ ] Admin dashboard (modify collections)
- [ ] Email templates for contact responses

### Long-term (Month 3+)
- [ ] AI-powered recommendations (Gemini API)
- [ ] Chatbot support (Claude)
- [ ] SEO optimization
- [ ] Performance monitoring
- [ ] A/B testing framework

---

## 💡 BUSINESS LOGIC SUMMARY

**Company Story:**
- Founded 1985 by Elias Thorne
- Master weaver focusing on quality
- Serves fashion brands worldwide
- 6 collection types for different segments

**Customer Journey:**
1. Visit homepage → Learn about company
2. Browse collections → Get inspired
3. Read detailed specs → Understand products
4. Fill contact form → Request quote
5. Receive response → Start negotiation
6. Download PPT → Share with team

**Revenue Model:**
- B2B textile supplier
- Quote-based pricing
- Volume discounts (implied)
- Long-term partnerships

---

## ✨ MEMORABLE TAKEAWAYS

### The 3 Core Pillars
1. **Frontend Excellence** - Next.js + React + Tailwind
2. **Database Integration** - Supabase for collections & contacts
3. **Client Experience** - PPT generation + animations + responsive design

### The 6 Collections (Know These!)
1. Raw Denim - Authentic, vintage
2. Eco-Weave - Sustainable, certified organic
3. Performance Stretch - Modern, comfortable
4. Vintage Selvedge - Collector's item
5. Summer Linen - Breathable, lightweight
6. Industrial Canvas - Rugged, workwear

### The 4 Core Pages
1. Home - Landing page
2. Collections - Product showcase
3. Contact - Lead generation
4. About - Company story

### Deployment Checklist
✅ GitHub push
✅ Vercel connection
✅ Environment variables
✅ Supabase setup
✅ Test all features

---

**Created:** February 20, 2026
**Project Status:** Ready for Production Deployment
**Next Action:** Set up Supabase + Deploy to Vercel
