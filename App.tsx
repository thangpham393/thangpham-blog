
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import Navbar from './components/Navbar';
import SidebarLeft from './components/SidebarLeft';
import SidebarRight from './components/SidebarRight';
import Feed from './components/Feed';
import AIChat from './components/AIChat';
import { Post } from './types';
import { MOCK_POSTS } from './mockData';
import { supabase } from './supabaseClient';
import { Loader2 } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Trang chủ');
  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        // Thử lấy dữ liệu từ Supabase
        const { data, error: sbError } = await supabase
          .from('posts')
          .select('*')
          .order('id', { ascending: false });

        if (sbError) throw sbError;

        if (data && data.length > 0) {
          // Map dữ liệu từ snake_case (DB) sang camelCase (UI) nếu cần
          const formattedPosts: Post[] = data.map((p: any) => ({
            id: p.id,
            title: p.title,
            content: p.content || '',
            excerpt: p.excerpt || '',
            author: p.author || 'Thắng Phạm',
            category: p.category || 'Chưa phân loại',
            views: p.views || 0,
            date: p.date || new Date().toLocaleDateString('vi-VN'),
            imageUrl: p.image_url || 'https://picsum.photos/800/450',
            type: p.type || 'blog'
          }));
          setPosts(formattedPosts);
        } else {
          // Nếu database trống, dùng tạm Mock Data để giữ giao diện đẹp
          console.log("Database trống, đang hiển thị dữ liệu mẫu.");
          setPosts(MOCK_POSTS);
        }
      } catch (err: any) {
        console.error("Lỗi kết nối Supabase:", err.message);
        setError(err.message);
        setPosts(MOCK_POSTS); // Fallback
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Filter posts based on search
  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#f0f2f5]">
      <Header onSearch={setSearchQuery} />
      
      <main className="flex-grow max-w-[1200px] w-full mx-auto pb-8 px-2 md:px-4">
        <HeroSection />
        
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left Sidebar */}
          <div className="lg:col-span-3 space-y-4 hidden lg:block">
            <SidebarLeft />
          </div>
          
          {/* Main Feed */}
          <div className="lg:col-span-6 relative">
            {isLoading && (
              <div className="flex flex-col items-center justify-center py-12 bg-white rounded-xl shadow-sm mb-4">
                <Loader2 className="w-8 h-8 text-[#f39c12] animate-spin mb-2" />
                <p className="text-gray-400 text-sm font-medium">Đang đồng bộ dữ liệu...</p>
              </div>
            )}
            
            {error && !isLoading && (
              <div className="bg-red-50 text-red-500 p-3 rounded-lg text-xs mb-4 border border-red-100">
                Lưu ý: Không thể kết nối Supabase (đang dùng data mẫu). Lỗi: {error}
              </div>
            )}

            <Feed posts={filteredPosts} />
          </div>
          
          {/* Right Sidebar */}
          <div className="lg:col-span-3 space-y-4">
            <SidebarRight />
          </div>
        </div>
      </main>
      
      {/* Floating AI Assistant */}
      <AIChat />

      <footer className="mt-auto bg-transparent py-10 px-4 flex flex-col items-center justify-center gap-3">
        <p className="text-gray-600 text-[13px] font-medium text-center">
          Copyright © 2024 Blog ThangPham. Design by <span className="font-bold">Thắng Phạm</span>. Server được tài trợ bởi <span className="text-blue-500 font-bold">PowerNet</span>
        </p>
        <div className="flex justify-center">
          <img 
            src="https://images.dmca.com/Badges/dmca-badge-w100-5x1-01.png?ID=939393" 
            alt="DMCA.com Protection Status" 
            className="h-[30px]"
          />
        </div>
      </footer>
    </div>
  );
};

export default App;
