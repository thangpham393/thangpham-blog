
import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import Navbar from './components/Navbar';
import SidebarLeft from './components/SidebarLeft';
import SidebarRight from './components/SidebarRight';
import Feed from './components/Feed';
import AIChat from './components/AIChat';
import AdminEditor from './components/AdminEditor';
import PostDetail from './components/PostDetail';
import { Post } from './types';
import { MOCK_POSTS } from './mockData';
import { supabase, isSupabaseConfigured } from './supabaseClient';
import { Loader2 } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Trang chủ');
  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  
  const isConfigValid = isSupabaseConfigured();

  const fetchPosts = useCallback(async () => {
    setIsLoading(true);
    if (!isConfigValid) {
      setPosts(MOCK_POSTS);
      setIsLoading(false);
      return;
    }

    try {
      const { data, error: sbError } = await supabase
        .from('posts')
        .select('*')
        .order('id', { ascending: false });

      if (sbError) throw sbError;

      if (data && data.length > 0) {
        const formattedPosts: Post[] = data.map((p: any) => ({
          id: String(p.id),
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
        setPosts(MOCK_POSTS);
      }
    } catch (err: any) {
      console.error("Lỗi kết nối Supabase:", err.message);
      setPosts(MOCK_POSTS);
    } finally {
      setIsLoading(false);
    }
  }, [isConfigValid]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setSelectedPost(null); // Reset bài viết đang xem khi chuyển tab
  };

  const handlePostSuccess = () => {
    fetchPosts();
    handleTabChange('Trang chủ');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f0f2f5]">
      <Header onSearch={setSearchQuery} />
      
      <main className="flex-grow max-w-[1200px] w-full mx-auto pb-8 px-2 md:px-4">
        <HeroSection />
        
        <Navbar activeTab={activeTab} setActiveTab={handleTabChange} />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Sidebar Trái */}
          <div className="lg:col-span-3 space-y-4 hidden lg:block">
            <SidebarLeft />
          </div>
          
          <div className="lg:col-span-6 relative">
            {/* Nội dung chính: Chi tiết, Admin, hoặc Feed */}
            {selectedPost ? (
              <PostDetail post={selectedPost} onBack={() => setSelectedPost(null)} />
            ) : activeTab === 'Quản lý' ? (
              <AdminEditor onSuccess={handlePostSuccess} />
            ) : isLoading && posts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl shadow-sm mb-4 border border-gray-100">
                <Loader2 className="w-10 h-10 text-[#f39c12] animate-spin mb-4" />
                <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Đang tải dữ liệu...</p>
              </div>
            ) : (
              <Feed posts={filteredPosts} onPostClick={handlePostClick} />
            )}
          </div>
          
          <div className="lg:col-span-3 space-y-4">
            <SidebarRight />
          </div>
        </div>
      </main>
      
      <AIChat />

      <footer className="mt-auto bg-transparent py-10 px-4 flex flex-col items-center justify-center gap-3">
        <p className="text-gray-600 text-[13px] font-medium text-center">
          Copyright © 2024 Blog ThangPham.
        </p>
      </footer>
    </div>
  );
};

export default App;
