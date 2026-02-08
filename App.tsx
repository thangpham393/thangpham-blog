
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


const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Trang chủ');
  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);

  // Filter posts based on search or category (simulated)
  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
// ... bên trong component App
useEffect(() => {
  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('date', { ascending: false });
    
    if (data) setPosts(data);
  };
  fetchPosts();
}, []);


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
          <div className="lg:col-span-6">
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
