
import React from 'react';
import { Post } from '../types';
import { Calendar, FolderOpen, Eye, ArrowLeft, User, Share2, ThumbsUp, MessageSquare } from 'lucide-react';

interface PostDetailProps {
  post: Post;
  onBack: () => void;
}

const PostDetail: React.FC<PostDetailProps> = ({ post, onBack }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Nút quay lại */}
      <div className="p-4 border-b border-gray-50 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-10">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-[12px] font-black text-gray-400 hover:text-[#f39c12] transition-colors uppercase tracking-widest"
        >
          <ArrowLeft className="w-4 h-4" /> Quay lại trang chủ
        </button>
        <div className="flex items-center gap-4">
          <Share2 className="w-4 h-4 text-gray-400 cursor-pointer hover:text-[#f39c12]" />
        </div>
      </div>

      <article className="p-6 md:p-8">
        {/* Tiêu đề & Meta */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-orange-50 text-[#f39c12] text-[10px] font-black uppercase rounded-full">
              {post.category}
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight mb-6">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-y-3 gap-x-6 text-[12px] font-bold text-gray-400 border-y border-gray-50 py-4">
            <span className="flex items-center gap-2">
              <User className="w-4 h-4 text-[#f39c12]" /> {post.author}
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#f39c12]" /> {post.date}
            </span>
            <span className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-[#f39c12]" /> {post.views} lượt xem
            </span>
          </div>
        </div>

        {/* Ảnh đại diện bài viết */}
        <div className="rounded-2xl overflow-hidden mb-8 shadow-md border border-gray-50">
          <img src={post.imageUrl} alt={post.title} className="w-full h-auto object-cover max-h-[500px]" />
        </div>

        {/* Nội dung bài viết */}
        <div 
          className="prose prose-orange max-w-none text-gray-700 leading-relaxed text-[15px]"
          dangerouslySetInnerHTML={{ __html: post.content || post.excerpt }}
        />

        {/* Tương tác cuối bài */}
        <div className="mt-12 pt-8 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button className="flex items-center gap-2 text-gray-400 hover:text-blue-500 font-bold text-sm transition-colors">
              <ThumbsUp className="w-5 h-5" /> Thích
            </button>
            <button className="flex items-center gap-2 text-gray-400 hover:text-[#f39c12] font-bold text-sm transition-colors">
              <MessageSquare className="w-5 h-5" /> 0 bình luận
            </button>
          </div>
          <button className="flex items-center gap-2 text-white bg-[#f39c12] px-6 py-2 rounded-full font-black text-[12px] uppercase tracking-wider shadow-lg shadow-orange-100">
            <Share2 className="w-4 h-4" /> Chia sẻ ngay
          </button>
        </div>
      </article>
    </div>
  );
};

export default PostDetail;
