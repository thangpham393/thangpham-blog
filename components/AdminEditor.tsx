
import React, { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured, saveManualConfig, clearManualConfig } from '../supabaseClient';
import { Post } from '../types';
import { 
  Send, Image as ImageIcon, FileText, Tag, Layers, 
  CheckCircle, AlertCircle, Loader2, Trash2, Eye, 
  RefreshCcw, Settings, Save, Database, AlertTriangle
} from 'lucide-react';

interface AdminEditorProps {
  onSuccess: () => void;
}

const AdminEditor: React.FC<AdminEditorProps> = ({ onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [existingPosts, setExistingPosts] = useState<Post[]>([]);
  const [status, setStatus] = useState<{ type: 'success' | 'error', msg: string } | null>(null);
  
  // States for DB Config
  const [showSetup, setShowSetup] = useState(false);
  const [manualUrl, setManualUrl] = useState('');
  const [manualKey, setManualKey] = useState('');
  const isConfigValid = isSupabaseConfigured();

  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'My Blog',
    image_url: '',
    type: 'blog'
  });

  const fetchExistingPosts = async () => {
    setFetching(true);
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('id', { ascending: false });
      if (error) throw error;
      if (data) {
        setExistingPosts(data.map((p: any) => ({
          id: String(p.id),
          title: p.title,
          category: p.category,
          date: p.date,
          views: p.views || 0,
          imageUrl: p.image_url,
          type: p.type,
          content: p.content,
          excerpt: p.excerpt,
          author: p.author
        })));
      }
    } catch (err) {
      console.error("Lỗi lấy danh sách bài viết:", err);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchExistingPosts();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const { error } = await supabase
        .from('posts')
        .insert([{
          ...formData,
          author: 'Thắng Phạm',
          views: 0,
          date: new Date().toLocaleDateString('vi-VN')
        }]);

      if (error) throw error;

      setStatus({ type: 'success', msg: 'Đăng bài viết thành công!' });
      setFormData({
        title: '',
        excerpt: '',
        content: '',
        category: 'My Blog',
        image_url: '',
        type: 'blog'
      });
      
      fetchExistingPosts();
      setTimeout(() => {
        onSuccess();
      }, 1500);

    } catch (err: any) {
      setStatus({ type: 'error', msg: 'Lỗi: ' + err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa bài viết này không?')) return;
    try {
      const { error } = await supabase.from('posts').delete().eq('id', id);
      if (error) throw error;
      setExistingPosts(prev => prev.filter(p => p.id !== id));
      onSuccess();
    } catch (err: any) {
      alert('Lỗi khi xóa: ' + err.message);
    }
  };

  return (
    <div className="space-y-6">
      {/* SECTION: DATABASE CONFIG (Moved here from homepage) */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Database className={`w-4 h-4 ${isConfigValid ? 'text-green-500' : 'text-orange-400'}`} />
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
            {isConfigValid ? 'DATABASE: SUPABASE CONNECTED' : 'DATABASE: CONFIG NEEDED'}
          </span>
        </div>
        <button 
          onClick={() => setShowSetup(!showSetup)}
          className="flex items-center gap-1.5 px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-500 rounded-full text-[10px] font-bold transition-all"
        >
          <Settings className="w-3 h-3" />
          {showSetup ? 'ẨN CẤU HÌNH' : 'HIỆN CẤU HÌNH'}
        </button>
      </div>

      {showSetup && (
        <div className="bg-white rounded-xl shadow-lg border-2 border-amber-200 p-5 animate-in slide-in-from-top duration-300">
          <div className="flex items-center gap-2 mb-4 text-amber-600">
            <AlertTriangle className="w-5 h-5" />
            <h3 className="font-black text-sm uppercase">Cài đặt kết nối Supabase</h3>
          </div>
          <div className="space-y-4">
            <input 
              type="text" 
              value={manualUrl}
              onChange={(e) => setManualUrl(e.target.value)}
              placeholder="Supabase URL"
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none"
            />
            <input 
              type="password" 
              value={manualKey}
              onChange={(e) => setManualKey(e.target.value)}
              placeholder="Anon Key"
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none"
            />
            <div className="flex gap-2">
              <button 
                onClick={() => saveManualConfig(manualUrl, manualKey)}
                className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 rounded-lg text-xs flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" /> LƯU & KẾT NỐI
              </button>
              <button onClick={clearManualConfig} className="px-4 py-2 bg-gray-100 text-gray-400 rounded-lg hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        </div>
      )}

      {/* SECTION: CREATE POST FORM */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-[#f39c12] p-4 text-white">
          <h2 className="font-black text-sm uppercase tracking-widest flex items-center gap-2">
            <FileText className="w-5 h-5" /> Soạn thảo bài viết mới
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {status && (
            <div className={`p-4 rounded-lg flex items-center gap-3 ${status.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
              {status.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
              <p className="text-sm font-bold">{status.msg}</p>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <input 
                required
                type="text" 
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
                placeholder="Tiêu đề bài viết..."
                className="w-full bg-gray-50 border border-gray-100 rounded-lg px-4 py-2.5 text-sm"
              />
              <textarea 
                rows={3}
                value={formData.excerpt}
                onChange={e => setFormData({...formData, excerpt: e.target.value})}
                placeholder="Mô tả ngắn..."
                className="w-full bg-gray-50 border border-gray-100 rounded-lg px-4 py-2.5 text-sm resize-none"
              />
              <div className="grid grid-cols-2 gap-4">
                <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="bg-gray-50 border border-gray-100 rounded-lg px-3 py-2 text-sm">
                  <option>My Blog</option><option>WordPress</option><option>Share code</option>
                </select>
                <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value as any})} className="bg-gray-50 border border-gray-100 rounded-lg px-3 py-2 text-sm">
                  <option value="blog">Bài viết</option><option value="share-code">Share code</option>
                </select>
              </div>
            </div>
            <div className="space-y-4">
              <input type="text" value={formData.image_url} onChange={e => setFormData({...formData, image_url: e.target.value})} placeholder="URL Hình ảnh..." className="w-full bg-gray-50 border border-gray-100 rounded-lg px-4 py-2.5 text-sm" />
              <div className="aspect-video bg-gray-50 rounded-xl border border-dashed border-gray-200 flex items-center justify-center overflow-hidden">
                {formData.image_url ? <img src={formData.image_url} alt="Preview" className="w-full h-full object-cover" /> : <ImageIcon className="w-8 h-8 text-gray-300" />}
              </div>
            </div>
          </div>
          <textarea required rows={6} value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} placeholder="Nội dung bài viết (Chấp nhận HTML)..." className="w-full bg-gray-50 border border-gray-100 rounded-lg px-4 py-3 text-sm font-mono" />
          <div className="flex justify-end"><button disabled={loading} type="submit" className="bg-[#f39c12] text-white px-8 py-3 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-[#e67e22]">{loading ? 'ĐANG LƯU...' : 'ĐĂNG BÀI'}</button></div>
        </form>
      </div>

      {/* SECTION: POST LIST MANAGEMENT */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-gray-400" />
            <h3 className="font-black text-[12px] uppercase tracking-widest text-gray-500">Quản lý nội dung</h3>
          </div>
          <button onClick={fetchExistingPosts} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><RefreshCcw className={`w-4 h-4 text-gray-400 ${fetching ? 'animate-spin' : ''}`} /></button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <tbody className="divide-y divide-gray-50">
              {existingPosts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <img src={post.imageUrl} className="w-12 h-10 rounded object-cover bg-gray-100" />
                    <span className="text-[13px] font-bold text-gray-800 truncate max-w-[300px]">{post.title}</span>
                  </td>
                  <td className="px-4 py-4"><span className="text-[11px] font-black uppercase text-gray-400">{post.category}</span></td>
                  <td className="px-4 py-4 text-right">
                    <button onClick={() => handleDelete(post.id)} className="p-2 text-gray-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminEditor;
