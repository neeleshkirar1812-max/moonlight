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
    <div className="space-y-8 animate-fade-in text-neutral-900">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-900/10 pb-6">
        <div>
          <span className="text-xs uppercase tracking-widest text-amber-700 font-bold block">
            Editorial CMS
          </span>
          <h1 className="font-serif text-3xl font-bold text-neutral-900 mt-1">Journal Essays & Articles</h1>
          <p className="text-neutral-600 text-xs font-light mt-1">
            Publish thought-leadership editorial pieces, wedding cinematography secrets, and palace guides.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-5 py-2.5 rounded-full bg-gold-gradient text-neutral-950 font-bold text-xs uppercase tracking-wider shadow-gold-subtle hover:scale-105 transition-all flex items-center self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 mr-1.5" /> Publish New Essay
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-72 rounded-2xl bg-stone-100 animate-pulse border border-stone-200" />
          ))}
        </div>
      ) : blogs.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-amber-900/15 space-y-3 shadow-sm">
          <BookOpen className="w-8 h-8 text-amber-600 mx-auto opacity-70" />
          <h3 className="font-serif text-xl text-neutral-900 font-bold">No Editorial Articles Found</h3>
          <p className="text-xs text-neutral-500">Publish your first journal article above.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div key={blog._id} className="bg-white rounded-2xl overflow-hidden border border-amber-900/15 hover:border-amber-500/40 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div className="relative aspect-[16/10] bg-stone-100 overflow-hidden">
                <img src={blog.featuredImage} alt={blog.title} className="w-full h-full object-cover" />
              </div>

              <div className="p-5 space-y-2">
                <span className="text-[10px] uppercase font-mono text-amber-800 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">{blog.category}</span>
                <h3 className="font-serif text-lg font-bold text-neutral-900 line-clamp-2">{blog.title}</h3>
                <p className="text-xs text-neutral-600 line-clamp-2">{blog.excerpt}</p>
              </div>

              <div className="p-4 border-t border-stone-100 flex justify-end space-x-2">
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="p-2 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 transition-colors"
                  title="Delete Essay"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-amber-900/20 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-4 animate-fade-in max-h-[90vh] overflow-y-auto text-xs text-neutral-900">
            <div className="flex items-center justify-between pb-3 border-b border-amber-900/10">
              <h3 className="font-serif text-xl font-bold text-neutral-900">Publish Editorial Essay</h3>
              <button onClick={() => setModalOpen(false)} className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-neutral-600 transition-colors"><X className="w-4 h-4" /></button>
            </div>

            <form onSubmit={handleCreateBlog} className="space-y-3">
              <div>
                <label className="text-neutral-700 font-bold block mb-1">Essay Title *</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-neutral-900 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/30"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-neutral-700 font-bold block mb-1">Category</label>
                  <input
                    type="text"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-neutral-900 focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-neutral-700 font-bold block mb-1">Reading Time</label>
                  <input
                    type="text"
                    value={form.readingTime}
                    onChange={(e) => setForm({ ...form, readingTime: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-neutral-900 focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-neutral-700 font-bold block mb-1">Featured Image URL *</label>
                <input
                  type="url"
                  required
                  value={form.featuredImage}
                  onChange={(e) => setForm({ ...form, featuredImage: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-neutral-900 font-mono text-[11px] focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-neutral-700 font-bold block mb-1">Excerpt *</label>
                <textarea
                  rows={2}
                  required
                  value={form.excerpt}
                  onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 text-neutral-900 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/30"
                />
              </div>

              <div>
                <label className="text-neutral-700 font-bold block mb-1">Full Article Content *</label>
                <textarea
                  rows={6}
                  required
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 text-neutral-900 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/30 leading-relaxed"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-stone-200">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 rounded-full border border-stone-300 text-neutral-600 hover:text-neutral-900 hover:bg-stone-50 font-semibold transition-colors">Cancel</button>
                <button type="submit" className="px-6 py-2.5 rounded-full bg-gold-gradient text-neutral-950 font-bold uppercase tracking-wider shadow-gold-subtle hover:scale-105 transition-all">Publish Essay</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBlogs;
