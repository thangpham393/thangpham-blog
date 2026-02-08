
import React from 'react';
import { MapPin, Briefcase, GraduationCap, Home, Users, ChevronRight, Star, Heart } from 'lucide-react';
import { MOCK_COMMENTS, MOCK_COURSES } from '../mockData';

const SidebarLeft: React.FC = () => {
  return (
    <div className="space-y-4">
      {/* Intro Widget */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <h3 className="text-[14px] font-black mb-4 uppercase tracking-wider text-gray-800">GIỚI THIỆU</h3>
        <p className="text-[13px] text-gray-600 mb-4 text-center">Developer, Designer, Blogger, Freelancer... Và một số cái dở dở mà chưa nhắc...</p>
        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-3 text-[13px]">
            <Briefcase className="w-4 h-4 text-[#f39c12]" />
            <span className="text-gray-700">CEO & Founder tại <span className="font-bold">JKS Digital Marketing</span></span>
          </div>
          <div className="flex items-center gap-3 text-[13px]">
            <Briefcase className="w-4 h-4 text-[#f39c12]" />
            <span className="text-gray-700">Từng làm DM tại <span className="font-bold text-[#f39c12]">GCO Software</span></span>
          </div>
          <div className="flex items-center gap-3 text-[13px]">
            <Briefcase className="w-4 h-4 text-[#f39c12]" />
            <span className="text-gray-700">Từng làm Developer tại <span className="font-bold">BAP</span></span>
          </div>
          <div className="flex items-center gap-3 text-[13px]">
            <Home className="w-4 h-4 text-[#f39c12]" />
            <span className="text-gray-700">Sống tại <span className="font-bold">Đà Nẵng</span></span>
          </div>
          <div className="flex items-center gap-3 text-[13px]">
            <MapPin className="w-4 h-4 text-[#f39c12]" />
            <span className="text-gray-700">Đến từ <span className="font-bold">Tam kỳ, Quảng Nam</span></span>
          </div>
          <div className="flex items-center gap-3 text-[13px]">
            <GraduationCap className="w-4 h-4 text-[#f39c12]" />
            <span className="text-gray-700">Từng học tại <span className="font-bold">Trường Đại Học Sư phạm - ĐH Đà Nẵng</span></span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-1 mt-4">
          <img src="https://picsum.photos/seed/intro1/200/200" className="rounded-md h-24 w-full object-cover" />
          <img src="https://picsum.photos/seed/intro2/200/200" className="rounded-md h-24 w-full object-cover" />
          <img src="https://picsum.photos/seed/intro3/200/200" className="rounded-md h-24 w-full object-cover" />
        </div>
        <button className="w-full mt-4 text-[12px] font-bold text-gray-500 bg-gray-50 py-2 rounded-md hover:bg-gray-100 transition-colors">Xem nhiều hơn</button>
      </div>

      {/* Gallery Widget */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-[14px] font-black uppercase tracking-wider text-gray-800">HÌNH ẢNH</h3>
          <span className="text-[12px] text-blue-500 hover:underline cursor-pointer">Xem tất cả</span>
        </div>
        <div className="grid grid-cols-3 gap-1">
          {[...Array(9)].map((_, i) => (
            <img key={i} src={`https://picsum.photos/seed/gallery${i}/200/200`} className="w-full aspect-square rounded-sm object-cover hover:opacity-90 cursor-pointer" />
          ))}
        </div>
      </div>

      {/* Top Reputation Widget */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-[14px] font-black uppercase tracking-wider text-[#3498db]">TOP UY TÍN</h3>
          <span className="text-[12px] text-blue-500 hover:underline cursor-pointer">Xem tất cả</span>
        </div>
        <div className="grid grid-cols-3 gap-y-4 gap-x-2">
          {['Em Phúc', 'Em Hậu', 'Anh Vy', 'Anh Phúc', 'Xuân Hoàng', 'Thành Trung', 'Anh Khánh', 'Anh Hùng', 'Long Phạm'].map((name, i) => (
            <div key={i} className="text-center group cursor-pointer">
              <img src={`https://i.pravatar.cc/150?u=rep${i}`} className="w-14 h-14 rounded-md mx-auto mb-1 object-cover group-hover:scale-105 transition-transform" />
              <p className="text-[11px] font-bold text-gray-700 truncate leading-tight">{name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* New Comments Widget */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <h3 className="text-[14px] font-black uppercase tracking-wider text-[#27ae60] mb-4">BÌNH LUẬN MỚI</h3>
        <div className="space-y-4">
          {[
            { user: 'HoangLong', text: 'Thanks your share', color: 'bg-blue-100' },
            { user: 'Jr', text: 'Ok', color: 'bg-green-100' },
            { user: 'Thanh', text: 'source trang bán hàng wp đâu bạn', color: 'bg-gray-100' },
            { user: 'Huy Nguyen', text: 'không cập nhật bản mới nữa à bác ơi!', color: 'bg-yellow-100' }
          ].map((c, i) => (
            <div key={i} className="flex gap-3 items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-[10px] font-bold ${c.color} text-gray-600`}>
                <img src={`https://i.pravatar.cc/50?u=com${i}`} className="w-10 h-10 rounded-full" alt="" />
              </div>
              <div className="flex-1">
                <p className="text-[12px] font-black text-gray-800">{c.user}</p>
                <p className="text-[11px] text-gray-500 line-clamp-1">{c.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Courses Widget */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <h3 className="text-[14px] font-black uppercase tracking-wider text-[#f39c12] mb-4">KHÓA HỌC WORDPRESS ONLINE</h3>
        <div className="space-y-4">
          {MOCK_COURSES.map(course => (
            <div key={course.id} className="flex gap-3 cursor-pointer group">
              <img src={course.image} className="w-16 h-16 rounded-md object-cover flex-shrink-0 group-hover:opacity-80 transition-opacity" />
              <div className="flex-1">
                <h4 className="text-[12px] font-bold text-gray-800 leading-tight mb-1 group-hover:text-[#f39c12] line-clamp-2">{course.title}</h4>
                <div className="flex items-center gap-2">
                  <span className="text-[#e74c3c] font-black text-[12px]">{course.price}</span>
                  {course.oldPrice && <span className="text-gray-400 text-[10px] line-through">{course.oldPrice}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SidebarLeft;
