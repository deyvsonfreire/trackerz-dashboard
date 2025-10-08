import { createClient } from '@supabase/supabase-js';
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Database } from '@/types/supabase';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}