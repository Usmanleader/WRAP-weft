# WRAP WEFT & CO - COMPLETE SETUP GUIDE

**Last Updated:** February 25, 2026

This guide documents the complete setup and configuration of the Wrap Weft & Co website, including all changes made during development.

---

## 📁 PROJECT STRUCTURE

```
warpweft&co/
├── app/                          # Next.js App Router pages
│   ├── about/                   # About page
│   │   └── page.tsx
│   ├── collections/             # Collections listing & detail pages
│   │   ├── page.tsx            # Main collections page with filters
│   │   └── [id]/               # Dynamic collection detail pages
│   │       └── page.tsx
│   ├── contact/                 # Contact page
│   │   └── page.tsx            # Contact form + info
│   ├── sustainability/          # Sustainability page
│   │   └── page.tsx
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Home page
├── components/                  # Reusable React components
│   ├── home/                   # Homepage sections
│   │   ├── hero.tsx           # Hero section with CTA buttons
│   │   ├── featured-collections.tsx  # Featured products grid
│   │   ├── about-snippet.tsx  # About preview section
│   │   ├── process-section.tsx # Sustainability process
│   │   └── cta-section.tsx    # Call-to-action section
│   ├── layout/                # Layout components
│   │   ├── header.tsx         # Navigation header with logo
│   │   └── footer.tsx         # Footer with links & PDF download
│   ├── collection/            # Collection-specific components
│   │   └── image-gallery.tsx  # Image gallery for collection details
│   └── ui/                    # Reusable UI components
│       ├── button.tsx        # Button component with variants
│       ├── input.tsx         # Form input
│       └── textarea.tsx      # Form textarea
├── hooks/                      # Custom React hooks
│   └── use-mobile.ts         # Mobile detection hook
├── lib/                       # Utilities & configurations
│   ├── supabase.ts           # Supabase client configuration
│   ├── data.ts               # Static collections data (fallback)
│   ├── ppt-generator.ts      # PowerPoint generation (legacy)
│   ├── utils.ts              # Utility functions (cn, etc.)
│   └── types/                # TypeScript type definitions
├── public/                    # Static assets
│   ├── WARPWEFT&CO.pdf       # Company profile PDF
│   └── retygfdh.png          # Logo image
├── .env.local                 # Local environment variables (gitignored)
├── .env.example               # Example environment variables
├── next.config.ts             # Next.js configuration
├── tsconfig.json              # TypeScript configuration
├── package.json               # Dependencies
├── supabase_schema.sql        # Original Supabase database schema
├── supabase_update_collections.sql  # Migration script for collections
└── README.md                  # Project readme

```

---

## 🚀 QUICK START

### 1. Prerequisites
- **Node.js** (v18 or higher recommended)
- **Git** for version control
- **Supabase** account (free tier works)
- **Vercel** account for deployment

### 2. Clone & Install

```bash
# Clone the repository
git clone https://github.com/Usmanleader/WRAP-weft.git
cd WRAP-weft

# Install dependencies
npm install
```

### 3. Environment Setup

Create a `.env.local` file in the project root with the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Optional: Gemini AI API Key (for PPT generation feature)
# GEMINI_API_KEY=your-gemini-api-key

# Application URL
APP_URL=http://localhost:3000

NODE_ENV=development
```

**⚠️ Important:** `.env.local` is already in `.gitignore` - never commit your secrets!

### 4. Supabase Setup

#### A. Create Supabase Project
1. Go to https://supabase.com and sign in
2. Click "New Project"
3. Choose your organization and region
4. Wait for database to be created

#### B. Get API Credentials
1. In your Supabase project, go to **Settings** → **API**
2. Copy the **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
3. Copy the **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

#### C. Run Database Schema
1. Go to **SQL Editor** in Supabase dashboard
2. Click "New Query"
3. Copy and paste contents of `supabase_schema.sql`
4. Click **Run** (or press Ctrl+Enter)

This creates:
- `collections` table (with `is_featured` column)
- `contacts` table
- Row Level Security (RLS) policies
- Sample data (6 original collections)

#### D. Update Collections with Product Data
1. In SQL Editor, create a new query
2. Copy and paste contents of `supabase_update_collections.sql`
3. Click **Run**

This replaces the sample data with your actual product collections:
- **Jeans**: Slim Fit, Relaxed Fit
- **Jackets**: Classic Denim, Denim Vests
- **Skirts**: Denim Skirts, Denim Skorts

**Note:** The script uses `TRUNCATE` to clear existing data, then inserts new collections with product images.

### 5. Configure Image Domains

The project uses external images from various domains. These must be whitelisted in `next.config.ts`:

```typescript
images: {
  remotePatterns: [
    { hostname: 'picsum.photos' },
    { hostname: 'engine.com.pk' },
    { hostname: 'shop.mango.com' },
    { hostname: 'www.exportleftovers.com' },
  ],
}
```

**Add your own image domains** if you're using different product image URLs.

### 6. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📝 CONFIGURATION DETAILS

### Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ Yes | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ Yes | Supabase anonymous key (public) |
| `GEMINI_API_KEY` | ⚠️ Optional | Google Gemini API key for AI features |
| `APP_URL` | ✅ Yes | Application URL (localhost for dev) |
| `NODE_ENV` | ✅ Yes | Environment (development/production) |

### Database Schema

#### Collections Table
```sql
CREATE TABLE collections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  long_description TEXT NOT NULL,
  features TEXT[] NOT NULL DEFAULT '{}',
  image TEXT NOT NULL,
  images TEXT[] NOT NULL DEFAULT '{}',
  is_featured BOOLEAN DEFAULT false
);
```

#### Contacts Table
```sql
CREATE TABLE contacts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL
);
```

**Row Level Security (RLS):**
- Collections: Public read access
- Contacts: Public insert access (no read)

### Category Filtering

The collections page filters by these categories:
- **Jeans** (slim-fit, relaxed-fit)
- **Jackets** (denim jackets, vests)
- **Skirts** (denim skirts, skorts)

Make sure your database collections use these exact category names (case-sensitive).

---

## 🎨 CUSTOMIZATION GUIDE

### Updating Collections

1. **Edit the SQL file**: Modify `supabase_update_collections.sql` with your product data
2. **Update static fallback**: Edit `lib/data.ts` with the same data (used when Supabase is unavailable)
3. **Run the migration**: Execute the SQL in Supabase SQL Editor
4. **Restart dev server**: Changes will reflect immediately

### Adding New Categories

1. Update the `categories` array in `app/collections/page.tsx`:
```typescript
const categories = ['All', 'Jeans', 'Jackets', 'Skirts', 'NewCategory'];
```

2. Add collections with that category in the SQL and `data.ts`

### Changing Logo

1. Replace `public/retygfdh.png` with your logo file (keep same filename or update references)
2. Logo appears in:
   - `components/layout/header.tsx` (navigation)
   - `components/layout/footer.tsx` (footer)

### Updating Contact Information

Edit `app/contact/page.tsx`:
- Address: Lines with `MapPin` icon
- Phone: Lines with `Phone` icon
- Email: Lines with `Mail` icon

Current values:
- **Address**: Plot G 4, 10B, Nazimabad Number 2 Block 2, Nazimabad, Karachi, 74600, Pakistan
- **Phone**: +92 3362793950, +92 3121278031
- **Email**: info@warpweftco.com

### PDF Download

The PDF download button appears in:
- Hero section (`components/home/hero.tsx`)
- Footer (`components/layout/footer.tsx`)

To change the PDF:
1. Replace `public/WARPWEFT&CO.pdf` with your file (keep same filename or update `href` and `download` attributes)
2. Button text can be edited in the respective files

---

## 🔧 TECHNICAL STACK

- **Framework**: Next.js 15+ (App Router)
- **UI Library**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel
- **Icons**: Lucide React

---

## 🚢 DEPLOYMENT TO VERCEL

### One-Click Deploy
1. Push your code to GitHub (main branch)
2. Go to https://vercel.com/new
3. Import your repository
4. Add Environment Variables (same as `.env.local`)
5. Click **Deploy**

### Required Environment Variables on Vercel

Add these in Vercel Dashboard → Project → Settings → Environment Variables:

**Supabase:**
```
NEXT_PUBLIC_SUPABASE_URL = https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = your-anon-key
```

**Application:**
```
APP_URL = https://your-domain.vercel.app
NODE_ENV = production
```

**Optional:**
```
GEMINI_API_KEY = your-gemini-key  # if using AI features
```

### Custom Domain (Optional)
1. In Vercel project, go to **Domains**
2. Click **Add Domain**
3. Enter your custom domain
4. Update DNS records as instructed
5. Update `APP_URL` environment variable

---

## 🐛 TROUBLESHOOTING

### Images Not Loading
**Error:** `Invalid src prop... hostname is not configured`

**Solution:** Add the image hostname to `next.config.ts` under `images.remotePatterns` and restart dev server.

### Collections Not Showing
**Issue:** "No collections found in this category"

**Check:**
1. Database has collections with correct `category` values
2. Category filter buttons match database categories exactly (case-sensitive)
3. Supabase credentials are correct in `.env.local`
4. Check browser console for Supabase errors

### Build Errors on Vercel
Common issues:
- Missing environment variables
- TypeScript errors (run `npm run build` locally first)
- Uncommitted files

### Dev Server Won't Start
If you see path errors with `&` character in `E:\warpweft&co`:
```bash
# Use explicit node path
& "C:\Program Files\nodejs\node.exe" "E:\warpweft&co\node_modules\next\dist\bin\next" dev --port 3000 --webpack
```

---

## 📦 WHAT WAS CHANGED TODAY (Feb 25, 2026)

### 1. Logo Implementation
- Added logo image (`retygfdh.png`) to `public/` folder
- Replaced text "Wrap Weft & Co" with logo image in Header and Footer
- Removed the "W" initial badge

### 2. PDF Download Update
- Replaced PPT download with PDF download
- PDF file: `WARPWEFT&CO.pdf` in `public/` folder
- Updated button text to "Download Company Profile"
- Updated both Hero button and Footer link

### 3. Contact Information Update
- **Address**: Plot G 4, 10B, Nazimabad Number 2 Block 2, Nazimabad, Karachi, 74600, Pakistan
- **Phone**: +92 3362793950, +92 3121278031
- **Email**: info@warpweftco.com
- Updated timezone: PKT (Pakistan Standard Time)

### 4. Collections Transformation
Changed from generic fabric collections to specific denim products:

**New Categories:**
- **Jeans**: Slim Fit Jeans, Relaxed Fit Jeans
- **Jackets**: Classic Denim Jackets, Denim Vests
- **Skirts**: Denim Skirts Collection, Denim Skorts

**Updated Files:**
- `lib/data.ts` - Static fallback data with product images
- `supabase_update_collections.sql` - Migration script
- `app/collections/page.tsx` - Category filter updated to Jeans, Jackets, Skirts
- `next.config.ts` - Added image domains for external product images

### 5. Image Domain Configuration
Added these external image hosts to `next.config.ts`:
- `engine.com.pk`
- `shop.mango.com`
- `www.exportleftovers.com`

### 6. Hero Section Update
- Removed "Est. 1985" from tagline
- Kept "Premium Textile Manufacturing" badge

---

## 📞 SUPPORT

For issues or questions:
- Check the browser console for errors
- Verify Supabase connection in Network tab
- Ensure all environment variables are set
- Review Vercel deployment logs

---

**Happy Coding! 🎉**
