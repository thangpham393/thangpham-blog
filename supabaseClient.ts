
import { createClient } from '@supabase/supabase-js';

// These should be set in Vercel Environment Variables
const supabaseUrl = (window as any).process?.env?.SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = (window as any).process?.env?.SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Note for the user:
 * To use real data, create a 'posts' table in Supabase with the structure matching our Post interface.
 * Then update the blogService.ts to fetch from this client.
 */
