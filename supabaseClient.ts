
import { createClient } from '@supabase/supabase-js';

const getEnv = (key: string): string => {
  // Danh sách các tiền tố mà các công cụ build (Vite, Webpack, Next) thường dùng để "lộ" biến ra trình duyệt
  const prefixes = ['VITE_', 'NEXT_PUBLIC_', 'REACT_APP_', ''];
  
  for (const prefix of prefixes) {
    const fullKey = prefix + key;
    let value = '';

    try {
      // 1. Kiểm tra trong process.env (phổ biến nhất)
      if (typeof process !== 'undefined' && process.env && process.env[fullKey]) {
        value = process.env[fullKey] as string;
      } 
      // 2. Kiểm tra trong import.meta.env (dành cho Vite)
      else if (typeof (import.meta as any) !== 'undefined' && (import.meta as any).env?.[fullKey]) {
        value = (import.meta as any).env[fullKey];
      }
      // 3. Kiểm tra trong window (fallback)
      else if (typeof window !== 'undefined' && (window as any).process?.env?.[fullKey]) {
        value = (window as any).process.env[fullKey];
      }

      if (value) {
        // Xử lý trường hợp giá trị bị bao bởi dấu ngoặc kép (lỗi phổ biến khi copy-paste vào Vercel)
        return value.replace(/^["'](.+)["']$/, '$1').trim();
      }
    } catch (e) {}
  }
  return '';
};

// Chẩn đoán: Log ra các key đang tồn tại (không log giá trị để bảo mật)
if (typeof process !== 'undefined' && process.env) {
  const foundKeys = Object.keys(process.env).filter(k => k.includes('SUPABASE'));
  if (foundKeys.length > 0) {
    console.log("🔍 Tìm thấy các biến Supabase trong ENV:", foundKeys);
  } else {
    console.warn("⚠️ Không tìm thấy biến môi trường nào chứa 'SUPABASE' trong process.env");
  }
}

const supabaseUrl = getEnv('SUPABASE_URL');
const supabaseAnonKey = getEnv('SUPABASE_ANON_KEY');

// Trạng thái cấu hình
export const isPlaceholderConfig = !supabaseUrl || 
                                   supabaseUrl.includes('placeholder') || 
                                   !supabaseUrl.startsWith('http');

if (isPlaceholderConfig) {
  console.error("❌ Cấu hình Supabase không hợp lệ hoặc đang trống!");
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder-url.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);
