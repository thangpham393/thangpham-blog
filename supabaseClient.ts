
import { createClient } from '@supabase/supabase-js';

// Vercel sẽ tự động tiêm các biến này nếu bạn đã cấu hình trong Environment Variables
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
