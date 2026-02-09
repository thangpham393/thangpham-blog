
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
import Auth from './components/Auth';
import { Post } from './types';
import { MOCK_POSTS } from './mockData';
import { supabase, isSupabaseConfigured } from './supabaseClient';
import { Loader2, ShieldAlert, ArrowLeft } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Trang chủ');
  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [user, setUser] = useState<any>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  
  const isConfigValid = isSupabaseConfigured();
  const isAdmin = user?.user_metadata?.role === 'admin';

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) setShowAuthModal(false);
    });

    return () => subscription.unsubscribe();
  }, []);

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

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Lọc theo Category dựa trên Tab đang chọn (trừ Trang chủ và Quản lý)
    if (activeTab === 'WordPress') return matchesSearch && post.category === 'WordPress';
    if (activeTab === 'Video') return matchesSearch && post.type === 'video';
    
    return matchesSearch;
  });

  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setSelectedPost(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f0f2f5]">
      <Header 
        onSearch={setSearchQuery} 
        user={user} 
        onLoginClick={() => setShowAuthModal(true)}
        onAdminClick={() => handleTabChange('Quản lý')}
      />
      
      <main className="flex-grow max-w-[1200px] w-full mx-auto pb-8 px-2 md:px-4">
        {/* HIỂN THỊ HERO SECTION TRÊN TẤT CẢ CÁC TAB (TRỪ QUẢN LÝ VÀ CHI TIẾT BÀI VIẾT) */}
        {!selectedPost && activeTab !== 'Quản lý' && <HeroSection />}
        
        <Navbar activeTab={activeTab} setActiveTab={handleTabChange} />
        
        <div className={`grid grid-cols-1 ${selectedPost ? 'lg:grid-cols-1' : 'lg:grid-cols-12'} gap-5 mt-2`}>
          
          {!selectedPost && (
            <div className="lg:col-span-3 space-y-4 hidden lg:block">
              <SidebarLeft />
            </div>
          )}
          
          <div className={`${selectedPost ? 'lg:col-span-1 max-w-[900px] mx-auto w-full' : 'lg:col-span-6'} relative`}>
            {selectedPost ? (
              <PostDetail post={selectedPost} onBack={() => setSelectedPost(null)} />
            ) : activeTab === 'Quản lý' ? (
              user ? (
                isAdmin ? (
                  <AdminEditor onSuccess={() => { fetchPosts(); handleTabChange('Trang chủ'); }} />
                ) : (
                  <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 flex flex-col items-center shadow-sm">
                    <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6">
                      <ShieldAlert className="w-8 h-8" />
                    </div>
                    <h2 className="text-xl font-black text-gray-800 uppercase mb-3">Truy cập bị hạn chế</h2>
                    <p className="text-gray-400 font-medium text-sm max-w-sm mb-8 leading-relaxed">
                      Xin lỗi <span className="text-gray-700 font-bold">{user.email}</span>, tài khoản của bạn chưa có quyền quản trị để thực hiện thao tác này.
                    </p>
                    <button 
                      onClick={() => handleTabChange('Trang chủ')} 
                      className="flex items-center gap-2 bg-gray-100 text-gray-600 px-6 py-2.5 rounded-xl font-black text-[11px] uppercase tracking-widest hover:bg-gray-200 transition-all"
                    >
                      <ArrowLeft className="w-4 h-4" /> Quay lại trang chủ
                    </button>
                  </div>
                )
              ) : (
                <div className="bg-white rounded-xl p-20 text-center border border-gray-100">
                   <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Vui lòng đăng nhập để truy cập trang này</p>
                   <button onClick={() => setShowAuthModal(true)} className="mt-4 bg-[#f39c12] text-white px-6 py-2 rounded-lg font-bold">Đăng nhập ngay</button>
                </div>
              )
            ) : isLoading && posts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl shadow-sm mb-4 border border-gray-100">
                <Loader2 className="w-10 h-10 text-[#f39c12] animate-spin mb-4" />
                <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Đang tải dữ liệu...</p>
              </div>
            ) : (
              <Feed posts={filteredPosts} onPostClick={handlePostClick} />
            )}
          </div>
          
          {!selectedPost && (
            <div className="lg:col-span-3 space-y-4">
              <SidebarRight />
            </div>
          )}
        </div>
      </main>
      
      {showAuthModal && <Auth onClose={() => setShowAuthModal(false)} />}
      
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
