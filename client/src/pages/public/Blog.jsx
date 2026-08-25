import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/client';
import { CardSkeleton } from '../../components/common/SkeletonLoader';
import { BookOpen, Clock, User, ArrowRight, Search, Tag } from 'lucide-react';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const query = selectedCategory !== 'All' ? `?category=${selectedCategory}` : '';
        const res = await api.get(`/blogs${query}`);
        setBlogs(res.data || []);
      } catch (err) {
        console.error('Error fetching blogs', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, [selectedCategory]);

  const filteredBlogs = blogs.filter((b) => {
    if (!search) return true;
    return b.title.toLowerCase().includes(search.toLowerCase()) || b.excerpt.toLowerCase().includes(search.toLowerCase());
  });

  const categories = ['All', 'Cinematography Insights', 'Destination Guides', 'Wedding Tips', 'Royal Heritage'];

  return (
    <div className="min-h-screen bg-obsidian text-white pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-[0.35em] text-gold-400 font-semibold block">
            The Editorial Journal
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
            Essays on Love & Cinema
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base font-light max-w-xl mx-auto">
            Insights, venue curation guides, and artistic musings from our senior creative directors and master colorists.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div className="flex items-center space-x-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 custom-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-gold-gradient text-black font-bold shadow-gold-subtle'
                    : 'bg-obsidian-200 text-neutral-300 hover:text-white border border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-obsidian-200 border border-white/15 rounded-full pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-gold-400"
            />
          </div>
        </div>

        {/* Blog Grid */}
        {loading ? (
          <CardSkeleton count={3} height="h-96" />
        ) : filteredBlogs.length === 0 ? (
          <div className="text-center py-20 bg-obsidian-400/50 rounded-3xl border border-white/5 space-y-3">
            <BookOpen className="w-8 h-8 text-gold-400 mx-auto opacity-50" />
            <h3 className="font-serif text-xl text-white">No articles matching your criteria.</h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog) => (
              <article
                key={blog._id}
                className="luxury-card rounded-2xl overflow-hidden group flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/10] bg-obsidian-300 overflow-hidden">
                    <img
                      src={blog.featuredImage}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-[10px] text-gold-300 font-semibold uppercase tracking-widest border border-gold-500/30">
                        {blog.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center space-x-4 text-[11px] text-neutral-400 font-mono">
                      <span className="flex items-center"><Clock className="w-3 h-3 mr-1 text-gold-400" /> {blog.readingTime || '5 min read'}</span>
                      <span>{new Date(blog.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>

                    <h3 className="font-serif text-xl font-bold text-white group-hover:text-gold-200 transition-colors leading-snug">
                      <Link to={`/blog/${blog.slug}`}>{blog.title}</Link>
                    </h3>

                    <p className="text-xs text-neutral-300 line-clamp-3 leading-relaxed font-light">
                      {blog.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-xs text-neutral-400">
                    <img
                      src={blog.author?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80'}
                      alt={blog.author?.name}
                      className="w-6 h-6 rounded-full object-cover border border-gold-500/40"
                    />
                    <span>{blog.author?.name || 'Julian Montgomery'}</span>
                  </div>

                  <Link
                    to={`/blog/${blog.slug}`}
                    className="inline-flex items-center text-xs font-semibold text-gold-300 hover:text-white uppercase tracking-wider group"
                  >
                    Read Essay <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
