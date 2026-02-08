
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
import { Loader2, Database, WifiOff, CheckCircle2 } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Trang chủ');
  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dataSource, setDataSource] = useState<'supabase' | 'mock' | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
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
          setDataSource('supabase');
        } else {
          console.log("Database trống, sử dụng dữ liệu mẫu.");
          setPosts(MOCK_POSTS);
          setDataSource('mock');
        }
      } catch (err: any) {
        console.error("Lỗi kết nối Supabase:", err.message);
        setError(err.message);
        setPosts(MOCK_POSTS);
        setDataSource('mock');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

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
          <div className="lg:col-span-3 space-y-4 hidden lg:block">
            <SidebarLeft />
          </div>
          
          <div className="lg:col-span-6 relative">
            {/* Status Indicator */}
            {!isLoading && (
              <div className="mb-4 flex items-center justify-between px-4 py-2 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-2">
                  <Database className={`w-4 h-4 ${dataSource === 'supabase' ? 'text-green-500' : 'text-orange-500'}`} />
                  <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                    Nguồn: {dataSource === 'supabase' ? 'Supabase Realtime' : 'Dữ liệu mẫu (Offline)'}
                  </span>
                </div>
                {dataSource === 'supabase' ? (
                  <div className="flex items-center gap-1 text-[10px] text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3 h-3" /> Đã kết nối
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-[10px] text-orange-600 font-bold bg-orange-50 px-2 py-0.5 rounded-full">
                    <WifiOff className="w-3 h-3" /> Chưa kết nối
                  </div>
                )}
              </div>
            )}

            {isLoading && posts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl shadow-sm mb-4 border border-gray-100">
                <Loader2 className="w-10 h-10 text-[#f39c12] animate-spin mb-4" />
                <p className="text-gray-500 font-bold animate-pulse">ĐANG ĐỒNG BỘ DỮ LIỆU...</p>
              </div>
            ) : (
              <>
                {error && dataSource === 'mock' && (
                  <div className="bg-red-50 text-red-500 p-3 rounded-lg text-[11px] mb-4 border border-red-100 font-medium">
                    Lỗi kết nối Supabase: {error}. Vui lòng kiểm tra lại ENV trên Vercel.
                  </div>
                )}
                <Feed posts={filteredPosts} />
              </>
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
          Copyright © 2024 Blog ThangPham. Design by <span className="font-bold">Thắng Phạm</span>.
        </p>
      </footer>
    </div>
  );
};

export default App;
