import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Define types for environment variables
const SUPABASE_URL: string = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Singleton instance
let supabase: SupabaseClient | null = null;

/**
 * Returns the singleton Supabase client.
 * Initializes the client if it hasn't been created yet.
 */
export const getSupabaseClient = (): SupabaseClient => {
  if (!supabase) {
    supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }
  return supabase;
};
