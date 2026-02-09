
import React from 'react';
import { Search, Grid, Users, Home, Bell, ChevronDown, LogOut } from 'lucide-react';
import { supabase } from '../supabaseClient';

interface HeaderProps {
  onSearch: (q: string) => void;
  user?: any;
}

const Header: React.FC<HeaderProps> = ({ onSearch, user }) => {
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-[1200px] mx-auto h-[56px] flex items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer">
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
              placeholder="Nhập từ khóa"
              onChange={(e) => onSearch(e.target.value)}
              className="w-full bg-[#f0f2f5] rounded-md py-1.5 pl-4 pr-10 text-sm focus:outline-none placeholder:text-gray-400"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 cursor-pointer" />
          </div>
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-4 text-gray-400">
            <Grid className="w-5 h-5 cursor-pointer hover:text-[#f39c12]" />
            <Users className="w-5 h-5 cursor-pointer hover:text-[#f39c12]" />
            <Home className="w-5 h-5 cursor-pointer hover:text-[#f39c12]" />
            <div className="relative cursor-pointer">
              <Bell className="w-5 h-5 hover:text-[#f39c12]" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-orange-500 border-2 border-white rounded-full"></span>
            </div>
          </div>
          
          {user ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 border border-gray-100 rounded-full p-0.5 pr-2 hover:bg-gray-50 cursor-pointer group relative">
                <div className="w-8 h-8 rounded-full bg-[#f39c12] flex items-center justify-center text-white font-bold overflow-hidden shadow-inner">
                   {user.email?.[0].toUpperCase()}
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
                
                {/* Dropdown Logout */}
                <div className="absolute top-full right-0 mt-2 w-40 bg-white shadow-xl rounded-lg border border-gray-100 hidden group-hover:block overflow-hidden">
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-xs font-bold text-red-500 hover:bg-red-50 flex items-center gap-2"
                  >
                    <LogOut className="w-3.5 h-3.5" /> Đăng xuất
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden shadow-inner">
               <img src="https://i.pravatar.cc/150?u=thangpham" alt="Guest" />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
