
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
import { supabase, isPlaceholderConfig } from './supabaseClient';
import { Loader2, Database, WifiOff, CheckCircle2, AlertTriangle, Info } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Trang chủ');
  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dataSource, setDataSource] = useState<'supabase' | 'mock' | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      
      if (isPlaceholderConfig) {
        setPosts(MOCK_POSTS);
        setDataSource('mock');
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
          setDataSource('supabase');
        } else {
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

            {(isPlaceholderConfig || error) && (
              <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-4 rounded-r-xl shadow-sm">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="text-amber-500 w-5 h-5 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="text-amber-800 font-bold text-sm">Chưa nhận được dữ liệu từ Supabase!</h4>
                    <p className="text-amber-700 text-xs mt-1">
                      {error ? `Lỗi: ${error}` : 'Biến môi trường SUPABASE_URL đang trống.'}
                    </p>
                    <button 
                      onClick={() => setShowHelp(!showHelp)}
                      className="text-[10px] font-bold text-amber-600 underline mt-2 uppercase tracking-tight flex items-center gap-1"
                    >
                      <Info className="w-3 h-3" /> {showHelp ? 'Đóng hướng dẫn' : 'Cách sửa lỗi này?'}
                    </button>
                    
                    {showHelp && (
                      <div className="mt-3 text-[11px] text-amber-800 space-y-2 bg-white/50 p-3 rounded-lg border border-amber-100">
                        <p>1. Đảm bảo tên biến trên Vercel là: <code className="bg-amber-200 px-1 rounded">VITE_SUPABASE_URL</code> và <code className="bg-amber-200 px-1 rounded">VITE_SUPABASE_ANON_KEY</code> (Thêm tiền tố <b>VITE_</b>).</p>
                        <p>2. Kiểm tra xem URL có bắt đầu bằng <code className="bg-amber-200 px-1 rounded">https://</code> không.</p>
                        <p>3. <b>Quan trọng:</b> Sau khi sửa trên Vercel, bạn phải nhấn <b>Redeploy</b> trong tab Deployments.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {isLoading && posts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl shadow-sm mb-4 border border-gray-100">
                <Loader2 className="w-10 h-10 text-[#f39c12] animate-spin mb-4" />
                <p className="text-gray-500 font-bold animate-pulse uppercase tracking-widest text-xs">Đang kiểm tra kết nối...</p>
              </div>
            ) : (
              <Feed posts={filteredPosts} />
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
