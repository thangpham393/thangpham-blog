
import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { Mail, Lock, LogIn, UserPlus, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      if (isLogin) {
        const { error: loginError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (loginError) throw loginError;
      } else {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });
        if (signUpError) throw signUpError;
        setMessage('Đăng ký thành công! Vui lòng kiểm tra email để xác nhận.');
      }
    } catch (err: any) {
      setError(err.message || 'Có lỗi xảy ra, vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="p-8 max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-4">
            {isLogin ? <LogIn className="w-8 h-8 text-[#f39c12]" /> : <UserPlus className="w-8 h-8 text-[#f39c12]" />}
          </div>
          <h2 className="text-2xl font-black text-gray-800 uppercase tracking-tight">
            {isLogin ? 'Đăng nhập Admin' : 'Đăng ký tài khoản'}
          </h2>
          <p className="text-gray-400 text-sm mt-2">
            {isLogin ? 'Vui lòng đăng nhập để quản lý bài viết' : 'Chỉ admin mới có quyền thực thi sau khi đăng ký'}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl flex items-start gap-3 text-sm font-medium">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {message && (
          <div className="mb-6 p-4 bg-green-50 border border-green-100 text-green-700 rounded-xl flex items-start gap-3 text-sm font-medium">
            <CheckCircle className="w-5 h-5 flex-shrink-0" />
            <p>{message}</p>
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
            <input 
              required
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email của bạn"
              className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 pl-12 pr-4 text-sm outline-none focus:ring-2 focus:ring-[#f39c12]/20 transition-all"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
            <input 
              required
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mật khẩu"
              className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 pl-12 pr-4 text-sm outline-none focus:ring-2 focus:ring-[#f39c12]/20 transition-all"
            />
          </div>

          <button 
            disabled={loading}
            type="submit"
            className="w-full bg-[#f39c12] hover:bg-[#e67e22] text-white font-black py-3 rounded-xl shadow-lg shadow-orange-100 transition-all flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : isLogin ? 'ĐĂNG NHẬP NGAY' : 'TẠO TÀI KHOẢN'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-gray-400 text-xs font-bold hover:text-[#f39c12] transition-colors uppercase tracking-widest"
          >
            {isLogin ? 'Bạn chưa có tài khoản? Đăng ký ngay' : 'Đã có tài khoản? Quay lại đăng nhập'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
