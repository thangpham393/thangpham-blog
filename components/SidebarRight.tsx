
import React from 'react';
import { Play, TrendingUp, ChevronRight, CheckSquare } from 'lucide-react';

const SidebarRight: React.FC = () => {
  return (
    <div className="space-y-4">
      {/* Top Banner Card */}
      <div className="bg-[#27ae60] rounded-xl overflow-hidden text-white p-4 shadow-sm relative group cursor-pointer">
        <div className="absolute top-0 right-0 p-2 opacity-20"><TrendingUp className="w-12 h-12" /></div>
        <h4 className="font-black text-sm uppercase mb-1">KHÓA HỌC WORDPRESS</h4>
        <p className="text-[12px] font-medium leading-tight">THIẾT KẾ WEB THỰC CHIẾN CÙNG VỚI <span className="font-black text-yellow-300">HUY KIRA</span></p>
      </div>

      {/* Category Widget */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <h3 className="text-[14px] font-black uppercase tracking-wider text-[#2c3e50] mb-3">CHUYÊN MỤC</h3>
        <div className="space-y-0.5">
          {['Share code', 'My Blog', 'Webmaster', 'Woocommerce', 'Thiết kế', 'Share plugin', 'Bán code'].map(cat => (
            <div key={cat} className="flex items-center gap-2 text-[13px] text-gray-600 hover:text-[#f39c12] cursor-pointer py-1.5 border-b border-dashed border-gray-100 group">
              <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-[#f39c12]" />
              <span className="font-medium">{cat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Most Viewed Widget */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <h3 className="text-[14px] font-black uppercase tracking-wider text-gray-800 mb-4 flex items-center gap-2">XEM NHIỀU</h3>
        <div className="space-y-4">
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="flex gap-2 group cursor-pointer items-start">
              <div className="bg-blue-50 text-blue-400 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black flex-shrink-0 group-hover:bg-[#f39c12] group-hover:text-white">
                {i}
              </div>
              <p className="text-[12px] font-bold leading-snug text-gray-700 line-clamp-2 group-hover:text-[#f39c12]">
                {i === 1 ? 'Share full code web shop, web bán hàng sử dụng wordpress' : 'Hướng dẫn lấy bài viết trong wordpress (Vòng lặp get post và Wp_query)'}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Many Video Widget */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <h3 className="text-[14px] font-black uppercase tracking-wider text-gray-800 mb-4">NHIỀU VIDEO</h3>
        <div className="relative rounded-lg overflow-hidden group cursor-pointer shadow-sm aspect-video">
          <img src="https://picsum.photos/seed/vid1/400/225" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
          <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/30">
             <div className="w-12 h-12 bg-[#f39c12] rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                <Play className="w-6 h-6 text-white fill-white ml-1" />
             </div>
          </div>
        </div>
      </div>

      {/* Friends Widget */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <h3 className="text-[14px] font-black uppercase tracking-wider text-[#3498db] mb-4">BẠN BÈ</h3>
        <div className="space-y-2.5">
          {['Quảng cáo facebook', 'VănNamIt Blog', 'Dana Seo', 'Trắc nghiệm Online', 'Khóa học Wordpress', 'JKS Digital Marketing', 'Học WordPress'].map(friend => (
            <div key={friend} className="text-[13px] text-gray-500 hover:text-[#f39c12] font-medium cursor-pointer border-b border-gray-50 pb-1.5 transition-colors">
              {friend}
            </div>
          ))}
        </div>
      </div>

      {/* Notable Projects Widget */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <h3 className="text-[14px] font-black uppercase tracking-wider text-gray-800 mb-4">DỰ ÁN NỔI BẬT</h3>
        <div className="space-y-2">
          {['Tr.CĐ Thương Mại', 'BV Tâm Thần Đà Nẵng', 'THPT Hòa Hoa Thám', 'Font Tiếng Việt', 'Kênh thời tiết', 'Giấy SG Miền Trung'].map(p => (
             <div key={p} className="text-[13px] text-gray-600 font-bold hover:text-[#f39c12] cursor-pointer bg-gray-50 p-2 rounded-md border border-gray-100 transition-all hover:bg-white hover:shadow-sm">
                {p}
             </div>
          ))}
        </div>
      </div>

      {/* Image Banners */}
      <div className="space-y-3">
        {[
          { title: 'Thiết kế website', img: 'https://picsum.photos/seed/srv1/400/150' },
          { title: 'Đào tạo WordPress', img: 'https://picsum.photos/seed/srv2/400/150' },
          { title: 'Domain & Hosting', img: 'https://picsum.photos/seed/srv3/400/150' },
          { title: 'Quảng cáo Google & Facebook', img: 'https://picsum.photos/seed/srv4/400/150' },
          { title: 'Dịch vụ content', img: 'https://picsum.photos/seed/srv5/400/150' }
        ].map(srv => (
          <div key={srv.title} className="relative rounded-xl overflow-hidden h-[86px] group cursor-pointer shadow-md">
             <img src={srv.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
             <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-4">
                <span className="text-white font-black text-[13px] uppercase tracking-wider text-center">{srv.title}</span>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SidebarRight;
