
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
import { supabase, isSupabaseConfigured, saveManualConfig, clearManualConfig } from './supabaseClient';
import { Loader2, Database, WifiOff, CheckCircle2, AlertTriangle, Settings, Save, Trash2 } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Trang chủ');
  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dataSource, setDataSource] = useState<'supabase' | 'mock' | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // State cho việc cấu hình thủ công
  const [showSetup, setShowSetup] = useState(false);
  const [manualUrl, setManualUrl] = useState('');
  const [manualKey, setManualKey] = useState('');

  const isConfigValid = isSupabaseConfigured();

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      
      if (!isConfigValid) {
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
  }, [isConfigValid]);

  const handleSaveSetup = () => {
    if (manualUrl && manualKey) {
      saveManualConfig(manualUrl, manualKey);
    }
  };

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
            {/* Status & Settings Bar */}
            <div className="mb-4 flex items-center justify-between px-4 py-2 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-2">
                <Database className={`w-4 h-4 ${dataSource === 'supabase' ? 'text-green-500' : 'text-orange-400'}`} />
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  {dataSource === 'supabase' ? 'DATABASE: SUPABASE' : 'DATABASE: OFFLINE MOCK'}
                </span>
              </div>
              <button 
                onClick={() => setShowSetup(!showSetup)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold transition-all ${
                  !isConfigValid ? 'bg-amber-100 text-amber-700 animate-pulse' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
              >
                <Settings className="w-3 h-3" />
                {isConfigValid ? 'CẤU HÌNH' : 'SỬA LỖI KẾT NỐI'}
              </button>
            </div>

            {/* Manual Setup Form */}
            {showSetup && (
              <div className="bg-white rounded-xl shadow-lg border-2 border-amber-200 p-5 mb-6 animate-in slide-in-from-top duration-300">
                <div className="flex items-center gap-2 mb-4 text-amber-600">
                  <AlertTriangle className="w-5 h-5" />
                  <h3 className="font-black text-sm uppercase">Cài đặt kết nối Supabase</h3>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-500 mb-1 uppercase">Supabase URL</label>
                    <input 
                      type="text" 
                      value={manualUrl}
                      onChange={(e) => setManualUrl(e.target.value)}
                      placeholder="https://xyz.supabase.co"
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-500 mb-1 uppercase">Anon Key</label>
                    <input 
                      type="password" 
                      value={manualKey}
                      onChange={(e) => setManualKey(e.target.value)}
                      placeholder="Dán key dài của bạn vào đây..."
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 outline-none"
                    />
                  </div>
                  
                  <div className="flex gap-2 pt-2">
                    <button 
                      onClick={handleSaveSetup}
                      className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 rounded-lg text-xs flex items-center justify-center gap-2 transition-colors"
                    >
                      <Save className="w-4 h-4" /> LƯU & KẾT NỐI LẠI
                    </button>
                    <button 
                      onClick={clearManualConfig}
                      className="px-4 py-2 bg-gray-100 hover:bg-red-50 hover:text-red-500 text-gray-500 rounded-lg transition-colors"
                      title="Xóa cấu hình thủ công"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <p className="text-[10px] text-gray-400 leading-relaxed">
                    * Nếu biến môi trường trên Vercel không hoạt động, hãy dán trực tiếp thông tin vào đây. 
                    Thông tin sẽ được lưu an toàn trong trình duyệt của bạn (LocalStorage).
                  </p>
                </div>
              </div>
            )}

            {isLoading && posts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl shadow-sm mb-4 border border-gray-100">
                <Loader2 className="w-10 h-10 text-[#f39c12] animate-spin mb-4" />
                <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Đang khởi tạo dữ liệu...</p>
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
