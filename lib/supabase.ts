import {createClient} from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Only create the client if the environment variables are available
export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

export type Collection = {
  id: string;
  title: string;
  category: string;
  description: string;
  long_description: string;
  features: string[];
  image: string;
  images: string[];
  is_featured?: boolean;
  created_at?: string;
};

export type Contact = {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  subject: string;
  message: string;
  created_at?: string;
};
