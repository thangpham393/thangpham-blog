
import React from 'react';
import { Facebook, Instagram, Youtube, Twitter, CheckCircle2, CloudDownload, Globe, Share2 } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <div className="bg-white rounded-b-xl shadow-sm overflow-hidden mb-4 border-b border-gray-100">
      {/* Cover Image */}
      <div className="h-[280px] md:h-[350px] relative overflow-hidden">
        <img 
          src="https://picsum.photos/seed/family/1200/400" 
          alt="Cover" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Profile Area */}
      <div className="px-8 pb-6 -mt-16 relative z-10 flex flex-col md:flex-row items-end justify-between gap-4">
        <div className="flex flex-col md:flex-row items-end gap-5">
          {/* Avatar */}
          <div className="relative">
            <div className="w-[168px] h-[168px] rounded-full border-[5px] border-white overflow-hidden shadow-md bg-white">
              <img src="https://i.pravatar.cc/300?u=thangpham" alt="Thắng Phạm" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Name Info */}
          <div className="pb-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
              <h1 className="text-2xl font-bold text-gray-900">Phạm Văn Thắng</h1>
              <span className="text-gray-500 font-medium">(Thắng Phạm)</span>
              <CheckCircle2 className="w-5 h-5 text-green-500 fill-white" />
            </div>
            <p className="text-gray-500 text-sm font-medium mb-3">3271 thành viên</p>
            
            {/* Social Icons - Specific set from demo */}
            <div className="flex items-center justify-center md:justify-start gap-4">
              <a href="#" className="text-blue-600 hover:scale-110 transition-transform"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="text-pink-600 hover:scale-110 transition-transform"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="text-black hover:scale-110 transition-transform">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1 .05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z"/></svg>
              </a>
              <a href="#" className="text-red-600 hover:scale-110 transition-transform"><Youtube className="w-5 h-5" /></a>
              <a href="#" className="text-orange-500 hover:scale-110 transition-transform"><Globe className="w-5 h-5" /></a>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="pb-2 w-full md:w-auto">
          <button className="flex items-center justify-center gap-2 bg-[#f39c12] text-white px-5 py-2 rounded-lg font-bold w-full md:w-auto hover:bg-[#e67e22] transition-colors shadow-sm">
            <CloudDownload className="w-4 h-4" />
            Kho tài nguyên
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
