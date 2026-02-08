
import { Home, User, Laptop, Video, Image, HelpCircle, Phone, LayoutDashboard } from 'lucide-react';
import React from 'react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { name: 'Trang chủ', icon: Home },
    { name: 'Quản lý', icon: LayoutDashboard }, // Tab mới cho Backend
    { name: 'Giới thiệu', icon: User },
    { name: 'WordPress', icon: Laptop },
    { name: 'Video', icon: Video },
    { name: 'Hình ảnh', icon: Image },
    { name: 'Hỏi đáp', icon: HelpCircle },
    { name: 'Liên hệ', icon: Phone },
  ];

  return (
    <nav className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-4">
      <div className="flex items-center px-4 overflow-x-auto whitespace-nowrap scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`flex items-center gap-2 px-6 py-3 font-bold text-[13px] transition-all my-1.5 rounded-md ${
              activeTab === tab.name 
                ? 'bg-[#f39c12] text-white shadow-sm' 
                : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.name}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
