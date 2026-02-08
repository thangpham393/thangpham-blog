
import { createClient } from '@supabase/supabase-js';

const getEnv = (key: string): string => {
  // 1. Kiểm tra localStorage (Dành cho việc cấu hình nhanh trên trình duyệt)
  const localValue = typeof window !== 'undefined' ? localStorage.getItem(`SB_${key}`) : null;
  if (localValue) return localValue;

  // 2. Danh sách các tiền tố phổ biến
  const prefixes = ['VITE_', 'NEXT_PUBLIC_', 'REACT_APP_', ''];
  
  for (const prefix of prefixes) {
    const fullKey = prefix + key;
    let value = '';

    try {
      // Kiểm tra process.env
      if (typeof process !== 'undefined' && process.env && process.env[fullKey]) {
        value = process.env[fullKey] as string;
      } 
      // Kiểm tra import.meta.env (Vite)
      else if (typeof (import.meta as any) !== 'undefined' && (import.meta as any).env?.[fullKey]) {
        value = (import.meta as any).env[fullKey];
      }
      // Kiểm tra window.ENV (Một số host inject vào đây)
      else if (typeof window !== 'undefined' && (window as any).ENV?.[fullKey]) {
        value = (window as any).ENV[fullKey];
      }

      if (value && typeof value === 'string' && value.length > 5) {
        // Xử lý dấu ngoặc kép và khoảng trắng
        return value.replace(/^["']|["']$/g, '').trim();
      }
    } catch (e) {}
  }
  return '';
};

const supabaseUrl = getEnv('SUPABASE_URL');
const supabaseAnonKey = getEnv('SUPABASE_ANON_KEY');

// Kiểm tra xem cấu hình có hợp lệ không
export const isSupabaseConfigured = () => {
  return (
    supabaseUrl && 
    supabaseUrl.startsWith('http') && 
    !supabaseUrl.includes('placeholder') &&
    supabaseAnonKey && 
    supabaseAnonKey.length > 20
  );
};

// Khởi tạo client
export const supabase = createClient(
  supabaseUrl || 'https://placeholder-url.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);

// Hàm hỗ trợ lưu cấu hình thủ công nếu ENV bị lỗi
export const saveManualConfig = (url: string, key: string) => {
  localStorage.setItem('SB_SUPABASE_URL', url);
  localStorage.setItem('SB_SUPABASE_ANON_KEY', key);
  window.location.reload();
};

export const clearManualConfig = () => {
  localStorage.removeItem('SB_SUPABASE_URL');
  localStorage.removeItem('SB_SUPABASE_ANON_KEY');
  window.location.reload();
};
