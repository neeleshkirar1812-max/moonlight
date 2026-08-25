import React, { useState, useEffect } from 'react';
import api from '../../api/client';
import { useNotification } from '../../context/NotificationContext';
import { BookOpen, Plus, Trash2, Edit3, X, Eye } from 'lucide-react';

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const { addToast } = useNotification();

  const [form, setForm] = useState({
    title: '',
    excerpt: '',
    content: '',
    featuredImage: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
    category: 'Cinematography Insights',
    tags: 'Wedding Film, Royal Heritage',
    readingTime: '5 min read',
  });

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await api.get('/blogs');
      setBlogs(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleCreateBlog = async (e) => {
    e.preventDefault();
    try {
      await api.post('/blogs', form);
      addToast({ title: 'Article Published', message: 'Blog article is live on the journal.', type: 'success' });
      setModalOpen(false);
      setForm({ title: '', excerpt: '', content: '', featuredImage: '', category: 'Cinematography Insights', tags: '', readingTime: '5 min read' });
      fetchBlogs();
    } catch (err) {
      addToast({ title: 'Error', message: err.message, type: 'error' });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete article?')) return;
    try {
      await api.delete(`/blogs/${id}`);
      setBlogs((prev) => prev.filter((b) => b._id !== id));
      addToast({ title: 'Deleted', message: 'Article deleted.', type: 'success' });
    } catch (err) {
      addToast({ title: 'Error', message: err.message, type: 'error' });
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold block">
            Editorial CMS
          </span>
          <h1 className="font-serif text-3xl font-bold text-white">Journal Essays & Articles</h1>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-5 py-2.5 rounded-full bg-gold-gradient text-black font-bold text-xs uppercase tracking-wider shadow-gold-subtle flex items-center"
        >
          <Plus className="w-4 h-4 mr-1.5" /> Publish New Essay
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div key={blog._id} className="luxury-card rounded-2xl overflow-hidden border border-white/10 flex flex-col justify-between">
            <div className="relative aspect-[16/10] bg-obsidian-300">
              <img src={blog.featuredImage} alt={blog.title} className="w-full h-full object-cover" />
            </div>

            <div className="p-5 space-y-2">
              <span className="text-[10px] uppercase font-mono text-gold-400">{blog.category}</span>
              <h3 className="font-serif text-lg font-bold text-white line-clamp-2">{blog.title}</h3>
              <p className="text-xs text-neutral-400 line-clamp-2">{blog.excerpt}</p>
            </div>

            <div className="p-4 border-t border-white/5 flex justify-end space-x-2">
              <button
                onClick={() => handleDelete(blog._id)}
                className="p-2 rounded-lg bg-red-950/40 text-red-400 hover:bg-red-900/50 border border-red-900/30"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-obsidian-400 border border-gold-500/40 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-4 animate-fade-in max-h-[90vh] overflow-y-auto text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="font-serif text-xl font-bold text-white">Publish Editorial Essay</h3>
              <button onClick={() => setModalOpen(false)} className="text-neutral-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>

            <form onSubmit={handleCreateBlog} className="space-y-3">
              <div>
                <label className="text-neutral-300 block mb-1">Essay Title *</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full bg-obsidian-500 border border-white/15 rounded-xl px-3 py-2 text-white focus:border-gold-400 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-neutral-300 block mb-1">Category</label>
                  <input
                    type="text"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full bg-obsidian-500 border border-white/15 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-neutral-300 block mb-1">Reading Time</label>
                  <input
                    type="text"
                    value={form.readingTime}
                    onChange={(e) => setForm({ ...form, readingTime: e.target.value })}
                    className="w-full bg-obsidian-500 border border-white/15 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-neutral-300 block mb-1">Featured Image URL *</label>
                <input
                  type="url"
                  required
                  value={form.featuredImage}
                  onChange={(e) => setForm({ ...form, featuredImage: e.target.value })}
                  className="w-full bg-obsidian-500 border border-white/15 rounded-xl px-3 py-2 text-white font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="text-neutral-300 block mb-1">Excerpt *</label>
                <textarea
                  rows={2}
                  required
                  value={form.excerpt}
                  onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                  className="w-full bg-obsidian-500 border border-white/15 rounded-xl p-2 text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="text-neutral-300 block mb-1">Full Article Content *</label>
                <textarea
                  rows={6}
                  required
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  className="w-full bg-obsidian-500 border border-white/15 rounded-xl p-2 text-white focus:outline-none leading-relaxed"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-white/10">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 rounded-full border border-white/15 text-neutral-300">Cancel</button>
                <button type="submit" className="px-6 py-2 rounded-full bg-gold-gradient text-black font-bold uppercase">Publish Essay</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBlogs;
