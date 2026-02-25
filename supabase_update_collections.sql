-- Migration: Update Collections with Product-Specific Denim Items
-- This script replaces the old collections with new product-focused collections

-- Add is_featured column if it doesn't exist
ALTER TABLE public.collections ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false;

-- First, delete all existing data
TRUNCATE public.collections RESTART IDENTITY CASCADE;

-- Insert new collections with product-specific denim items
-- The id column will auto-generate using uuid_generate_v4() default
INSERT INTO public.collections (title, category, description, long_description, features, image, images, is_featured, created_at)
VALUES
(
  'Slim Fit Jeans',
  'Jeans',
  'Modern slim fit denim jeans with superior comfort and style.',
  'Our Slim Fit Jeans collection offers a contemporary silhouette that''s both stylish and comfortable. Crafted from premium stretch denim, these jeans provide a sleek, modern look while allowing freedom of movement. Perfect for the urban professional seeking a refined denim experience.',
  ARRAY['Slim Fit Design', 'Stretch Denim', '5-Pocket Styling', 'Available in Multiple Washes'],
  'https://shop.mango.com/assets/rcs/pics/static/T8/fotos/S/87059065_TM.jpg?imwidth=2048&imdensity=1&ts=1743766540265',
  ARRAY['https://shop.mango.com/assets/rcs/pics/static/T8/fotos/S/87059065_TM.jpg?imwidth=2048&imdensity=1&ts=1743766540265', 'https://shop.mango.com/assets/rcs/pics/static/T8/fotos/outfit/S/87059065_TM-99999999_01.jpg?imwidth=2048&imdensity=1&ts=1743766540265', 'https://shop.mango.com/assets/rcs/pics/static/T8/fotos/S/87059065_TM_D1.jpg?imwidth=2048&imdensity=1&ts=1743766540265'],
  true,
  NOW()
),
(
  'Classic Denim Jackets',
  'Jackets',
  'Timeless denim jackets crafted for durability and style.',
  'Our Classic Denim Jackets are built to last. Made from heavyweight, durable denim with authentic construction details, these jackets age beautifully and develop a unique character over time. A wardrobe staple that never goes out of style.',
  ARRAY['Heavyweight Denim', 'Classic Trucker Style', 'Double-Stitched Seams', 'Metal Hardware'],
  'https://shop.mango.com/assets/rcs/pics/static/T8/fotos/S/87059065_TM.jpg?imwidth=2048&imdensity=1&ts=1743766540265',
  ARRAY['https://shop.mango.com/assets/rcs/pics/static/T8/fotos/S/87059065_TM.jpg?imwidth=2048&imdensity=1&ts=1743766540265', 'https://shop.mango.com/assets/rcs/pics/static/T8/fotos/outfit/S/87059065_TM-99999999_01.jpg?imwidth=2048&imdensity=1&ts=1743766540265', 'https://shop.mango.com/assets/rcs/pics/static/T8/fotos/S/87059065_TM_D1.jpg?imwidth=2048&imdensity=1&ts=1743766540265'],
  true,
  NOW()
),
(
  'Denim Skirts Collection',
  'Skirts',
  'Versatile denim skirts for casual and elevated looks.',
  'Our Denim Skirts collection combines classic denim aesthetics with modern cuts. From mini to midi lengths, these skirts offer versatility for any occasion. Made with soft, comfortable denim that moves with you.',
  ARRAY['Multiple Length Options', 'A-Line Silhouette', 'Comfort Stretch', 'Classic 5-Pocket Detail'],
  'https://shop.mango.com/assets/rcs/pics/static/T8/fotos/S/87059065_TM.jpg?imwidth=2048&imdensity=1&ts=1743766540265',
  ARRAY['https://shop.mango.com/assets/rcs/pics/static/T8/fotos/S/87059065_TM.jpg?imwidth=2048&imdensity=1&ts=1743766540265', 'https://shop.mango.com/assets/rcs/pics/static/T8/fotos/outfit/S/87059065_TM-99999999_01.jpg?imwidth=2048&imdensity=1&ts=1743766540265', 'https://shop.mango.com/assets/rcs/pics/static/T8/fotos/S/87059065_TM_D1.jpg?imwidth=2048&imdensity=1&ts=1743766540265'],
  true,
  NOW()
),
(
  'Relaxed Fit Jeans',
  'Jeans',
  'Comfort-first relaxed fit denim for everyday wear.',
  'Our Relaxed Fit Jeans prioritize comfort without sacrificing style. With extra room through the seat and thigh, these jeans are perfect for those who value comfort and a laid-back aesthetic. Made from premium cotton denim with just the right amount of stretch.',
  ARRAY['Relaxed Fit', 'Comfort Stretch', 'Sits at Waist', 'Classic 5-Pocket'],
  'https://shop.mango.com/assets/rcs/pics/static/T8/fotos/S/87059065_TM.jpg?imwidth=2048&imdensity=1&ts=1743766540265',
  ARRAY['https://shop.mango.com/assets/rcs/pics/static/T8/fotos/S/87059065_TM.jpg?imwidth=2048&imdensity=1&ts=1743766540265', 'https://shop.mango.com/assets/rcs/pics/static/T8/fotos/outfit/S/87059065_TM-99999999_01.jpg?imwidth=2048&imdensity=1&ts=1743766540265', 'https://shop.mango.com/assets/rcs/pics/static/T8/fotos/S/87059065_TM_D1.jpg?imwidth=2048&imdensity=1&ts=1743766540265'],
  false,
  NOW()
),
(
  'Denim Vests',
  'Jackets',
  'Stylish sleeveless denim vests for layering.',
  'Our Denim Vests offer a versatile layering piece that bridges the gap between casual and statement-making. Perfect for pairing with tees, shirts, or dresses, these vests add instant character to any outfit.',
  ARRAY['Sleeveless Design', 'Button Front Closure', 'Collar Options', 'Multiple Wash Finishes'],
  'https://shop.mango.com/assets/rcs/pics/static/T8/fotos/S/87059065_TM.jpg?imwidth=2048&imdensity=1&ts=1743766540265',
  ARRAY['https://shop.mango.com/assets/rcs/pics/static/T8/fotos/S/87059065_TM.jpg?imwidth=2048&imdensity=1&ts=1743766540265', 'https://shop.mango.com/assets/rcs/pics/static/T8/fotos/outfit/S/87059065_TM-99999999_01.jpg?imwidth=2048&imdensity=1&ts=1743766540265', 'https://shop.mango.com/assets/rcs/pics/static/T8/fotos/S/87059065_TM_D1.jpg?imwidth=2048&imdensity=1&ts=1743766540265'],
  false,
  NOW()
),
(
  'Denim Skorts',
  'Skirts',
  'The best of both worlds - shorts comfort with skirt style.',
  'Our Denim Skorts combine the practicality of shorts with the feminine look of a skirt. Perfect for active lifestyles, these skorts offer freedom of movement while maintaining a polished appearance. Ideal for golf, tennis, or casual outings.',
  ARRAY['Built-in Shorts', 'Pleated Design', 'Comfort Waistband', 'Multiple Lengths'],
  'https://shop.mango.com/assets/rcs/pics/static/T8/fotos/S/87059065_TM.jpg?imwidth=2048&imdensity=1&ts=1743766540265',
  ARRAY['https://shop.mango.com/assets/rcs/pics/static/T8/fotos/S/87059065_TM.jpg?imwidth=2048&imdensity=1&ts=1743766540265', 'https://shop.mango.com/assets/rcs/pics/static/T8/fotos/outfit/S/87059065_TM-99999999_01.jpg?imwidth=2048&imdensity=1&ts=1743766540265', 'https://shop.mango.com/assets/rcs/pics/static/T8/fotos/S/87059065_TM_D1.jpg?imwidth=2048&imdensity=1&ts=1743766540265'],
  false,
  NOW()
);
