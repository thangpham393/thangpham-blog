
import { createClient } from '@supabase/supabase-js';

// Kiểm tra an toàn để tránh lỗi "process is not defined"
const getEnv = (key: string): string => {
  try {
    // Thử lấy từ process.env (Vercel/Node)
    if (typeof process !== 'undefined' && process.env && process.env[key]) {
      return process.env[key] as string;
    }
    // Thử lấy từ window.process (một số môi trường sandbox)
    if (typeof window !== 'undefined' && (window as any).process?.env?.[key]) {
      return (window as any).process.env[key];
    }
  } catch (e) {
    console.warn(`Không thể truy cập biến môi trường: ${key}`);
  }
  return '';
};

const supabaseUrl = getEnv('SUPABASE_URL');
const supabaseAnonKey = getEnv('SUPABASE_ANON_KEY');

// Khởi tạo client với giá trị mặc định nếu thiếu key để không làm sập ứng dụng
export const supabase = createClient(
  supabaseUrl || 'https://placeholder-url.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);
