
import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { Mail, Lock, LogIn, UserPlus, AlertCircle, CheckCircle, Loader2, X } from 'lucide-react';

interface AuthProps {
  onClose: () => void;
}

const Auth: React.FC<AuthProps> = ({ onClose }) => {
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      ></div>
      
      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-[420px] rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-8 duration-300">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mx-auto mb-4 rotate-3">
              {isLogin ? <LogIn className="w-8 h-8 text-[#f39c12]" /> : <UserPlus className="w-8 h-8 text-[#f39c12]" />}
            </div>
            <h2 className="text-2xl font-black text-gray-800 uppercase tracking-tight">
              {isLogin ? 'Đăng nhập' : 'Đăng ký'}
            </h2>
            <p className="text-gray-400 text-sm mt-2 font-medium">
              Chào mừng bạn quay trở lại với Thắng Phạm
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl flex items-start gap-3 text-xs font-bold leading-tight">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p>{error}</p>
            </div>
          )}

          {message && (
            <div className="mb-6 p-4 bg-green-50 border border-green-100 text-green-700 rounded-2xl flex items-start gap-3 text-xs font-bold">
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
              <p>{message}</p>
            </div>
          )}

          <form onSubmit={handleAuth} className="space-y-4">
            <div>
              <label className="text-[10px] font-black uppercase text-gray-400 ml-1 mb-1 block tracking-widest">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                <input 
                  required
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-3 pl-12 pr-4 text-sm outline-none focus:ring-2 focus:ring-[#f39c12]/20 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-black uppercase text-gray-400 ml-1 mb-1 block tracking-widest">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                <input 
                  required
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-3 pl-12 pr-4 text-sm outline-none focus:ring-2 focus:ring-[#f39c12]/20 transition-all"
                />
              </div>
            </div>

            <button 
              disabled={loading}
              type="submit"
              className="w-full bg-[#f39c12] hover:bg-[#e67e22] text-white font-black py-4 rounded-2xl shadow-xl shadow-orange-100 transition-all flex items-center justify-center gap-2 mt-6 active:scale-95"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : isLogin ? 'ĐĂNG NHẬP NGAY' : 'TẠO TÀI KHOẢN MỚI'}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-50 text-center">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-gray-400 text-[11px] font-black hover:text-[#f39c12] transition-colors uppercase tracking-widest"
            >
              {isLogin ? 'Bạn chưa có tài khoản? Đăng ký' : 'Đã có tài khoản? Đăng nhập'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
