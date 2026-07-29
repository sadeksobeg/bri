import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

export type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  weight: string | null;
  pieces: number | null;
  category: string | null;
  image: string | null;
  sortOrder: number;
  isFeatured: boolean;
  isBestSeller: boolean;
  isNew: boolean;
  isActive: boolean;
  options: string;
  ingredients: string | null;
  wholesalePrice: number | null;
  discount: number;
  createdAt?: string;
  updatedAt?: string;
};
