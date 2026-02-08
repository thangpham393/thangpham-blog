
import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Post } from '../types';
import { 
  Send, Image as ImageIcon, FileText, Tag, Layers, 
  CheckCircle, AlertCircle, Loader2, Trash2, Eye, 
  RefreshCcw, Search, MoreVertical 
} from 'lucide-react';

interface AdminEditorProps {
  onSuccess: () => void;
}

const AdminEditor: React.FC<AdminEditorProps> = ({ onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [existingPosts, setExistingPosts] = useState<Post[]>([]);
  const [status, setStatus] = useState<{ type: 'success' | 'error', msg: string } | null>(null);
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
    if (!window.confirm('Bạn có chắc chắn muốn xóa bài viết này không? Thao tác này không thể hoàn tác.')) return;

    try {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setExistingPosts(prev => prev.filter(p => p.id !== id));
      onSuccess(); // Cập nhật lại Feed ở trang chủ
    } catch (err: any) {
      alert('Lỗi khi xóa: ' + err.message);
    }
  };

  return (
    <div className="space-y-6">
      {/* SECTION: CREATE POST FORM */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-[#f39c12] p-4 text-white flex justify-between items-center">
          <h2 className="font-black text-sm uppercase tracking-widest flex items-center gap-2">
            <FileText className="w-5 h-5" /> Soạn thảo bài viết mới
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {status && (
            <div className={`p-4 rounded-lg flex items-center gap-3 animate-in fade-in duration-300 ${
              status.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'
            }`}>
              {status.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
              <p className="text-sm font-bold">{status.msg}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-[11px] font-black text-gray-400 uppercase mb-1.5 tracking-wider">Tiêu đề bài viết</label>
                <input 
                  required
                  type="text" 
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  placeholder="Ví dụ: Hướng dẫn học WordPress cơ bản..."
                  className="w-full bg-gray-50 border border-gray-100 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#f39c12] outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-[11px] font-black text-gray-400 uppercase mb-1.5 tracking-wider">Mô tả ngắn (Excerpt)</label>
                <textarea 
                  rows={3}
                  value={formData.excerpt}
                  onChange={e => setFormData({...formData, excerpt: e.target.value})}
                  placeholder="Tóm tắt nội dung bài viết..."
                  className="w-full bg-gray-50 border border-gray-100 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#f39c12] outline-none transition-all resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-black text-gray-400 uppercase mb-1.5 tracking-wider">Chuyên mục</label>
                  <select 
                    value={formData.category}
                    onChange={e => setFormData({...formData, category: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-100 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-[#f39c12] outline-none"
                  >
                    <option>My Blog</option>
                    <option>WordPress</option>
                    <option>Share code</option>
                    <option>Marketing</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-black text-gray-400 uppercase mb-1.5 tracking-wider">Loại nội dung</label>
                  <select 
                    value={formData.type}
                    onChange={e => setFormData({...formData, type: e.target.value as any})}
                    className="w-full bg-gray-50 border border-gray-100 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-[#f39c12] outline-none"
                  >
                    <option value="blog">Bài viết</option>
                    <option value="share-code">Share code</option>
                    <option value="video">Video</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-[11px] font-black text-gray-400 uppercase mb-1.5 tracking-wider">URL Hình ảnh</label>
                <input 
                  type="text" 
                  value={formData.image_url}
                  onChange={e => setFormData({...formData, image_url: e.target.value})}
                  placeholder="https://example.com/image.jpg"
                  className="w-full bg-gray-50 border border-gray-100 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#f39c12] outline-none"
                />
              </div>
              <div className="aspect-video bg-gray-50 rounded-xl border border-dashed border-gray-200 flex items-center justify-center overflow-hidden">
                {formData.image_url ? (
                  <img src={formData.image_url} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon className="w-8 h-8 text-gray-300" />
                )}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-black text-gray-400 uppercase mb-1.5 tracking-wider">Nội dung chi tiết</label>
            <textarea 
              required
              rows={6}
              value={formData.content}
              onChange={e => setFormData({...formData, content: e.target.value})}
              placeholder="Nội dung bài viết..."
              className="w-full bg-gray-50 border border-gray-100 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-[#f39c12] outline-none"
            />
          </div>

          <div className="flex justify-end">
            <button 
              disabled={loading}
              type="submit"
              className="flex items-center gap-2 bg-[#f39c12] text-white px-8 py-3 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-[#e67e22] transition-all disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />} ĐĂNG BÀI
            </button>
          </div>
        </form>
      </div>

      {/* SECTION: POST LIST MANAGEMENT */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-gray-400" />
            <h3 className="font-black text-[12px] uppercase tracking-widest text-gray-500">Danh sách bài viết đã đăng</h3>
          </div>
          <button 
            onClick={fetchExistingPosts}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            title="Làm mới danh sách"
          >
            <RefreshCcw className={`w-4 h-4 text-gray-400 ${fetching ? 'animate-spin' : ''}`} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">
                <th className="px-6 py-4">Bài viết</th>
                <th className="px-4 py-4">Chuyên mục</th>
                <th className="px-4 py-4">Ngày đăng</th>
                <th className="px-4 py-4 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {fetching && existingPosts.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center">
                    <Loader2 className="w-8 h-8 text-orange-400 animate-spin mx-auto mb-2" />
                    <p className="text-[11px] font-bold text-gray-400 uppercase">Đang tải danh sách...</p>
                  </td>
                </tr>
              ) : existingPosts.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center text-gray-400 italic text-sm">
                    Chưa có bài viết nào trong Database.
                  </td>
                </tr>
              ) : (
                existingPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                          <img src={post.imageUrl} className="w-full h-full object-cover" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[13px] font-bold text-gray-800 truncate max-w-[200px]">{post.title}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="flex items-center gap-1 text-[10px] text-gray-400 font-medium">
                              <Eye className="w-3 h-3" /> {post.views}
                            </span>
                            <span className="px-1.5 py-0.5 bg-orange-50 text-orange-500 rounded text-[9px] font-black uppercase">
                              {post.type}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-[12px] font-bold text-gray-600">{post.category}</span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-[12px] text-gray-400">{post.date}</span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button 
                          onClick={() => window.open('/', '_blank')}
                          className="p-2 text-gray-400 hover:text-[#f39c12] transition-colors"
                          title="Xem trên web"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(post.id)}
                          className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                          title="Xóa bài viết"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminEditor;
