import { createClient } from '@supabase/supabase-js';

const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

// Proxy through same-origin to bypass Indian ISP DNS blocking of Supabase.
// Vite dev server and Vercel rewrites both handle /api/supabase/* -> Supabase.
const supabaseUrl = `${window.location.origin}/api/supabase`;

export const supabase =
  supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;
