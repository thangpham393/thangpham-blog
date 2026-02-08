
import React from 'react';
import { ThumbsUp, MessageSquare, Share2, Eye, Calendar, FolderOpen, MoreHorizontal } from 'lucide-react';
import { Post } from '../types';

interface FeedProps {
  posts: Post[];
}

const Feed: React.FC<FeedProps> = ({ posts }) => {
  const featuredPost = posts[0];
  const listPosts = posts.slice(1, 4);
  const sharePosts = posts.filter(p => p.type === 'share-code');

  return (
    <div className="space-y-4">
      {/* Quick Access Stories */}
      <div className="grid grid-cols-4 gap-2">
        {[1,2,3,4].map(i => (
          <div key={i} className="relative h-[160px] rounded-xl overflow-hidden group cursor-pointer shadow-sm border border-gray-100">
            <img src={`https://picsum.photos/seed/st${i}/300/600`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>
            <p className="absolute bottom-3 left-2 right-2 text-white text-[11px] font-bold leading-tight line-clamp-2">
              Hướng dẫn xây dựng chức năng thay đổi theme cho website
            </p>
          </div>
        ))}
      </div>

      {/* Post Interaction Box */}
      <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
         <div className="flex gap-2 mb-4 overflow-x-auto scrollbar-hide">
            {['Liên hệ', 'Hỏi đáp', 'Chém gió', 'Công việc'].map((item, idx) => (
              <button key={item} className={`text-[12px] font-black px-4 py-1.5 rounded-full whitespace-nowrap ${idx === 0 ? 'bg-[#27ae60] text-white shadow-sm' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
                {item}
              </button>
            ))}
         </div>
         <div className="bg-[#f0f2f5] rounded-xl p-3">
            <textarea 
               placeholder="Để lại lời nhắn cho mình nhé..." 
               className="w-full bg-transparent border-none text-[13px] focus:outline-none resize-none h-14 placeholder:text-gray-400"
            />
         </div>
      </div>

      {/* Main Blog Post Section */}
      <div className="space-y-4">
        {/* Featured Post Card */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          <div className="p-5">
            <h2 className="text-[18px] font-black text-gray-800 leading-tight hover:text-[#f39c12] cursor-pointer mb-3">
              {featuredPost.title}
            </h2>
            <div className="flex items-center gap-4 text-[11px] font-bold text-gray-400">
              <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-[#f39c12]" /> {featuredPost.date}</span>
              <span className="flex items-center gap-1.5"><FolderOpen className="w-3.5 h-3.5 text-[#f39c12]" /> {featuredPost.category}</span>
              <span className="flex items-center gap-1.5"><Eye className="w-3.5 h-3.5 text-[#f39c12]" /> {featuredPost.views} lượt xem</span>
            </div>
          </div>
          <div className="px-5 pb-4">
            <img src={featuredPost.imageUrl} className="w-full rounded-xl object-cover aspect-video hover:opacity-95 transition-opacity cursor-pointer shadow-sm border border-gray-50" />
            <p className="mt-4 text-[13px] text-gray-500 leading-relaxed line-clamp-3">
              {featuredPost.excerpt || 'Bạn đã bao giờ muốn xây dựng một website hoàn chỉnh với những tính năng chuyên nghiệp mà không mất quá nhiều thời gian? Hãy khám phá bí quyết ngay sau đây...'}
            </p>
          </div>
          <div className="flex items-center justify-between px-6 py-3 bg-gray-50 border-t border-gray-100">
            <div className="flex items-center gap-8">
              <button className="flex items-center gap-2 text-gray-500 text-[12px] font-black hover:text-[#f39c12]">
                <ThumbsUp className="w-4 h-4" /> Thích (0)
              </button>
              <button className="flex items-center gap-2 text-gray-500 text-[12px] font-black hover:text-[#f39c12]">
                <MessageSquare className="w-4 h-4" /> Bình luận (0)
              </button>
            </div>
            <button className="flex items-center gap-2 text-gray-500 text-[12px] font-black hover:text-[#f39c12]">
              <Share2 className="w-4 h-4" /> Chia sẻ
            </button>
          </div>
        </div>

        {/* List of Posts */}
        <div className="space-y-4">
          {listPosts.map(post => (
            <div key={post.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex gap-4 cursor-pointer hover:bg-gray-50 transition-colors group">
              <div className="w-[120px] h-[80px] rounded-lg overflow-hidden flex-shrink-0 shadow-sm border border-gray-100">
                <img src={post.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-[14px] font-black text-gray-800 leading-snug group-hover:text-[#f39c12] line-clamp-2 mb-2">{post.title}</h3>
                <div className="flex items-center gap-3 text-[10px] font-bold text-gray-400">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-[#f39c12]" /> {post.date}</span>
                  <span className="flex items-center gap-1"><FolderOpen className="w-3 h-3 text-[#f39c12]" /> {post.category}</span>
                  <span className="flex items-center gap-1"><Eye className="w-3 h-3 text-[#f39c12]" /> {post.views} lượt xem</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Share Code Section */}
      <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
        <h3 className="text-[14px] font-black text-gray-400 uppercase tracking-widest mb-6 pb-2 border-b border-gray-50">SHARE CODE</h3>
        <div className="grid grid-cols-2 gap-x-5 gap-y-8">
          {sharePosts.map(post => (
            <div key={post.id} className="group cursor-pointer">
              <div className="relative rounded-xl overflow-hidden aspect-video shadow-md mb-3 border border-gray-100">
                <img src={post.imageUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <h4 className="font-black text-[13px] text-gray-800 leading-tight group-hover:text-[#f39c12] line-clamp-2 mb-2">{post.title}</h4>
              <div className="flex items-center justify-between text-[10px] font-bold text-gray-400">
                <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-[#f39c12]" /> {post.date}</span>
                <span className="flex items-center gap-1.5"><Eye className="w-3.5 h-3.5 text-[#f39c12]" /> {post.views}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feed;
