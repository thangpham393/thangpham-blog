
import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { Send, Image as ImageIcon, FileText, Tag, Layers, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

interface AdminEditorProps {
  onSuccess: () => void;
}

const AdminEditor: React.FC<AdminEditorProps> = ({ onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error', msg: string } | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'My Blog',
    image_url: '',
    type: 'blog'
  });

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
      
      // Thông báo cho App.tsx để load lại dữ liệu
      setTimeout(() => {
        onSuccess();
      }, 1500);

    } catch (err: any) {
      setStatus({ type: 'error', msg: 'Lỗi: ' + err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="bg-[#f39c12] p-4 text-white">
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
          {/* Cột trái */}
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
                <div className="relative">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <select 
                    value={formData.category}
                    onChange={e => setFormData({...formData, category: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-100 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-[#f39c12] outline-none appearance-none"
                  >
                    <option>My Blog</option>
                    <option>WordPress</option>
                    <option>Share code</option>
                    <option>Marketing</option>
                    <option>Kinh nghiệm</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-black text-gray-400 uppercase mb-1.5 tracking-wider">Loại nội dung</label>
                <div className="relative">
                  <Layers className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <select 
                    value={formData.type}
                    onChange={e => setFormData({...formData, type: e.target.value as any})}
                    className="w-full bg-gray-50 border border-gray-100 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-[#f39c12] outline-none appearance-none"
                  >
                    <option value="blog">Bài viết (Blog)</option>
                    <option value="share-code">Chia sẻ code</option>
                    <option value="video">Video</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Cột phải */}
          <div className="space-y-4">
            <div>
              <label className="block text-[11px] font-black text-gray-400 uppercase mb-1.5 tracking-wider">URL Hình ảnh</label>
              <div className="relative">
                <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  value={formData.image_url}
                  onChange={e => setFormData({...formData, image_url: e.target.value})}
                  placeholder="https://example.com/image.jpg"
                  className="w-full bg-gray-50 border border-gray-100 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-[#f39c12] outline-none transition-all"
                />
              </div>
            </div>

            <div className="aspect-video bg-gray-50 rounded-xl border border-dashed border-gray-200 flex flex-col items-center justify-center overflow-hidden relative group">
              {formData.image_url ? (
                <img src={formData.image_url} alt="Preview" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/800x450?text=Lỗi+URL+Ảnh')} />
              ) : (
                <>
                  <ImageIcon className="w-10 h-10 text-gray-300 mb-2" />
                  <p className="text-[10px] font-bold text-gray-400 uppercase">Xem trước hình ảnh</p>
                </>
              )}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-black text-gray-400 uppercase mb-1.5 tracking-wider">Nội dung chi tiết (Markdown/HTML)</label>
          <textarea 
            required
            rows={8}
            value={formData.content}
            onChange={e => setFormData({...formData, content: e.target.value})}
            placeholder="Viết nội dung bài viết của bạn tại đây..."
            className="w-full bg-gray-50 border border-gray-100 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-[#f39c12] outline-none transition-all font-mono"
          />
        </div>

        <div className="flex justify-end pt-4">
          <button 
            disabled={loading}
            type="submit"
            className="flex items-center gap-2 bg-[#f39c12] text-white px-8 py-3 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-[#e67e22] transition-all disabled:opacity-50 shadow-lg shadow-orange-200 active:scale-95"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> ĐANG LƯU...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" /> ĐĂNG BÀI NGAY
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminEditor;
