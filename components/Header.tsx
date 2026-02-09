
import React from 'react';
import { Search, Grid, Users, Home, Bell, ChevronDown, LogOut, LayoutDashboard, User, LogIn, Settings } from 'lucide-react';
import { supabase } from '../supabaseClient';

interface HeaderProps {
  onSearch: (q: string) => void;
  user?: any;
  onLoginClick: () => void;
  onAdminClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch, user, onLoginClick, onAdminClick }) => {
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-[1200px] mx-auto h-[56px] flex items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.reload()}>
          <div className="flex items-center">
            <span className="text-[#f39c12] font-black text-2xl tracking-tighter">TP</span>
            <div className="flex flex-col ml-2 border-l border-gray-200 pl-2 leading-none">
              <span className="text-[#f39c12] font-black text-[16px] tracking-tight uppercase">THẮNG PHẠM</span>
              <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">
                BLOG & SHARE
              </span>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-[400px] mx-8 relative hidden md:block">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Nhập từ khóa tìm kiếm..."
              onChange={(e) => onSearch(e.target.value)}
              className="w-full bg-[#f0f2f5] rounded-full py-1.5 pl-4 pr-10 text-sm focus:outline-none placeholder:text-gray-400 border border-transparent focus:border-gray-200 transition-all"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 cursor-pointer" />
          </div>
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-4 text-gray-400 mr-2">
            {/* Fix: Moved 'title' prop from Grid icon to wrapping span to resolve TypeScript error */}
            <span title="Ứng dụng" className="cursor-pointer hover:text-[#f39c12]">
              <Grid className="w-5 h-5" />
            </span>
            <div className="relative cursor-pointer">
              <Bell className="w-5 h-5 hover:text-[#f39c12]" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
            </div>
          </div>
          
          <div className="h-8 w-px bg-gray-100 mx-2 hidden sm:block"></div>

          {user ? (
            <div className="relative group">
              <button className="flex items-center gap-1 border border-gray-100 rounded-full p-0.5 pr-2 hover:bg-gray-50 transition-all">
                <div className="w-8 h-8 rounded-full bg-[#f39c12] flex items-center justify-center text-white font-bold overflow-hidden shadow-inner text-xs">
                   {user.email?.[0].toUpperCase()}
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400 group-hover:rotate-180 transition-transform" />
              </button>
              
              {/* Dropdown Menu */}
              <div className="absolute top-full right-0 mt-2 w-56 bg-white shadow-2xl rounded-xl border border-gray-100 hidden group-hover:block overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="p-4 border-b border-gray-50 bg-gray-50/50">
                   <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Tài khoản Admin</p>
                   <p className="text-xs font-bold text-gray-700 truncate">{user.email}</p>
                </div>
                <div className="p-2">
                  <button 
                    onClick={onAdminClick}
                    className="w-full text-left px-3 py-2 text-[13px] font-bold text-gray-600 hover:bg-gray-50 hover:text-[#f39c12] rounded-lg flex items-center gap-3 transition-colors"
                  >
                    <LayoutDashboard className="w-4 h-4" /> Quản lý bài viết
                  </button>
                  <button className="w-full text-left px-3 py-2 text-[13px] font-bold text-gray-600 hover:bg-gray-50 hover:text-[#f39c12] rounded-lg flex items-center gap-3 transition-colors">
                    <User className="w-4 h-4" /> Trang cá nhân
                  </button>
                  <button className="w-full text-left px-3 py-2 text-[13px] font-bold text-gray-600 hover:bg-gray-50 hover:text-[#f39c12] rounded-lg flex items-center gap-3 transition-colors">
                    <Settings className="w-4 h-4" /> Cài đặt chung
                  </button>
                </div>
                <div className="p-2 border-t border-gray-50 bg-gray-50/30">
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 text-[13px] font-black text-red-500 hover:bg-red-50 rounded-lg flex items-center gap-3 transition-colors"
                  >
                    <LogOut className="w-4 h-4" /> Đăng xuất
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <button 
              onClick={onLoginClick}
              className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-600 px-4 py-2 rounded-full font-black text-[12px] uppercase tracking-widest transition-all"
            >
              <LogIn className="w-4 h-4 text-[#f39c12]" />
              Đăng nhập
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
