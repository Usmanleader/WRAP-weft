-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create collections table
create table public.collections (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  category text not null,
  description text not null,
  long_description text not null,
  features text[] not null default '{}',
  image text not null,
  images text[] not null default '{}'
);

-- Create contacts table
create table public.contacts (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  first_name text not null,
  last_name text not null,
  email text not null,
  subject text not null,
  message text not null
);

-- Enable Row Level Security (RLS)
alter table public.collections enable row level security;
alter table public.contacts enable row level security;

-- Create policies for collections (Public read access)
create policy "Enable read access for all users" on public.collections
  for select using (true);

-- Create policies for contacts (Public insert access, no read access for public)
create policy "Enable insert access for all users" on public.contacts
  for insert with check (true);

-- Seed data for collections
insert into public.collections (title, category, description, long_description, features, image, images)
values
  (
    'Raw Denim Series',
    'Denim',
    'Unwashed, untreated, and pure. The foundation of authentic jeanswear.',
    'Our Raw Denim Series pays homage to the origins of denim. Woven on vintage shuttle looms, these fabrics feature a tight, irregular weave that develops a unique patina over time. Ideal for heritage brands and denim purists who value character and longevity.',
    ARRAY['100% Cotton', 'Selvedge Edge', 'Heavyweight (14oz+)', 'Sanforized & Unsanforized options'],
    'https://picsum.photos/800/1000?random=1',
    ARRAY['https://picsum.photos/800/1000?random=1', 'https://picsum.photos/800/1000?random=11', 'https://picsum.photos/800/1000?random=12']
  ),
  (
    'Eco-Weave Blends',
    'Sustainable',
    'Organic cotton and recycled polyester blends for a sustainable future.',
    'The Eco-Weave collection represents our commitment to the planet. By blending GOTS-certified organic cotton with REPREVE® recycled polyester, we create fabrics that are soft, durable, and environmentally responsible. Perfect for modern, eco-conscious fashion lines.',
    ARRAY['GOTS Certified Organic Cotton', 'Recycled Polyester', 'Low-impact Dyes', 'Soft Handfeel'],
    'https://picsum.photos/800/1000?random=2',
    ARRAY['https://picsum.photos/800/1000?random=2', 'https://picsum.photos/800/1000?random=21', 'https://picsum.photos/800/1000?random=22']
  ),
  (
    'Performance Stretch',
    'Performance',
    'Advanced elasticity without compromising the authentic denim look.',
    'Engineered for movement, our Performance Stretch line utilizes dual-core spun yarns to provide superior recovery and comfort. These fabrics look like authentic rigid denim but feel like your favorite activewear, making them ideal for the modern urban lifestyle.',
    ARRAY['High Elasticity', 'Shape Retention', 'Breathable', 'Authentic Slub Character'],
    'https://picsum.photos/800/1000?random=3',
    ARRAY['https://picsum.photos/800/1000?random=3', 'https://picsum.photos/800/1000?random=31', 'https://picsum.photos/800/1000?random=32']
  ),
  (
    'Vintage Selvedge',
    'Denim',
    'Recreating the golden era of denim with authentic shuttle loom weaving.',
    'Woven on restored Toyoda shuttle looms, our Vintage Selvedge collection captures the essence of mid-century denim. The slow weaving process creates a fabric with rich texture and a distinctive "self-edge" that prevents unraveling. A true collector''s choice.',
    ARRAY['Shuttle Loom Woven', 'Red/Blue ID', 'Rope Dyed Indigo', 'Natural irregularities'],
    'https://picsum.photos/800/1000?random=4',
    ARRAY['https://picsum.photos/800/1000?random=4', 'https://picsum.photos/800/1000?random=41', 'https://picsum.photos/800/1000?random=42']
  ),
  (
    'Summer Linen',
    'Lightweight',
    'Breathable linen-cotton blends perfect for warmer climates.',
    'Our Summer Linen collection combines the breathability of flax with the softness of cotton. These lightweight fabrics feature a subtle slub texture and a crisp hand, making them perfect for summer shirting, dresses, and relaxed trousers.',
    ARRAY['Breathable', 'Natural Cooling', 'Textured Surface', 'Garment Dye Ready'],
    'https://picsum.photos/800/1000?random=5',
    ARRAY['https://picsum.photos/800/1000?random=5', 'https://picsum.photos/800/1000?random=51', 'https://picsum.photos/800/1000?random=52']
  ),
  (
    'Industrial Canvas',
    'Workwear',
    'Rugged, durable canvas for workwear and accessories.',
    'Built to last, our Industrial Canvas is a heavyweight fabric designed for the toughest conditions. Tightly woven from 2-ply yarns, it offers exceptional abrasion resistance and water repellency. Ideal for jackets, bags, and utility pants.',
    ARRAY['Heavyweight (12-18oz)', 'Abrasion Resistant', 'Water Repellent Finish', 'Tight Weave'],
    'https://picsum.photos/800/1000?random=6',
    ARRAY['https://picsum.photos/800/1000?random=6', 'https://picsum.photos/800/1000?random=61', 'https://picsum.photos/800/1000?random=62']
  );
