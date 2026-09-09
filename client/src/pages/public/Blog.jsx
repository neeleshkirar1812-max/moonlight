import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/client';
import SEO from '../../components/common/SEO';
import { DEFAULT_BLOGS } from '../../data/defaultBlogs';
import { CardSkeleton } from '../../components/common/SkeletonLoader';
import { BookOpen, Clock, User, ArrowRight, Search, Tag, Sparkles } from 'lucide-react';

const Blog = () => {
  const [blogs, setBlogs] = useState(DEFAULT_BLOGS);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const query = selectedCategory !== 'All' ? `?category=${selectedCategory}` : '';
        const res = await api.get(`/blogs${query}`);
        if (res.data && Array.isArray(res.data) && res.data.length > 0) {
          setBlogs(res.data);
        } else {
          // Filter default blogs by category if backend has no custom blogs yet
          if (selectedCategory === 'All') {
            setBlogs(DEFAULT_BLOGS);
          } else {
            setBlogs(DEFAULT_BLOGS.filter((b) => b.category === selectedCategory));
          }
        }
      } catch (err) {
        console.warn('Using default blog articles fallback:', err);
        if (selectedCategory === 'All') {
          setBlogs(DEFAULT_BLOGS);
        } else {
          setBlogs(DEFAULT_BLOGS.filter((b) => b.category === selectedCategory));
        }
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, [selectedCategory]);

  const filteredBlogs = blogs.filter((b) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      b.title.toLowerCase().includes(q) ||
      b.excerpt?.toLowerCase().includes(q) ||
      b.category?.toLowerCase().includes(q)
    );
  });

  const categories = [
    'All',
    'Destination Guides',
    'Wedding Tips',
    'Cinematography Insights',
    'Royal Heritage',
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-neutral-900 pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <SEO
        title="Wedding Photography Blog, Tips & Royal Guides"
        description="Read expert guides on Indian wedding planning, pre-wedding shoot location ideas in Maheshwar & Udaipur, photography poses, and cinematography tips by Moonlight Production."
        keywords="wedding photography blog, Maheshwar pre wedding locations, Indian wedding tips, cinematography guide, bridal poses ideas"
      />
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-600/20 text-amber-800 text-xs font-mono font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>Moonlight Studio Blog</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900">
            Wedding Photography & Cinema Guides
          </h1>
          <p className="text-neutral-600 text-sm sm:text-base font-normal max-w-2xl mx-auto leading-relaxed">
            Expert tips, destination wedding guides, outfit lighting advice, and 4K cinema insights from the Moonlight creative team.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-amber-900/10">
          <div className="flex items-center space-x-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 custom-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-gold-gradient text-neutral-950 font-extrabold shadow-sm'
                    : 'bg-white text-neutral-700 hover:text-neutral-900 border border-neutral-300 shadow-sm'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search wedding guides..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border border-neutral-300 rounded-full pl-9 pr-4 py-2 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-amber-600 shadow-sm"
            />
          </div>
        </div>

        {/* Blog Grid */}
        {loading ? (
          <CardSkeleton count={3} height="h-96" />
        ) : filteredBlogs.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-amber-900/10 space-y-3 shadow-sm">
            <BookOpen className="w-8 h-8 text-amber-700 mx-auto opacity-70" />
            <h3 className="font-serif text-xl text-neutral-900 font-bold">No articles matching your criteria.</h3>
            <p className="text-xs text-neutral-500">Try selecting "All" or clearing your search keywords.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog) => (
              <article
                key={blog._id || blog.slug}
                className="bg-white rounded-2xl overflow-hidden group flex flex-col justify-between border border-amber-900/15 hover:border-amber-600/50 shadow-md hover:shadow-xl transition-all"
              >
                <div>
                  <div className="relative aspect-[16/10] bg-neutral-100 overflow-hidden">
                    <img
                      src={blog.featuredImage}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-[10px] text-gold-300 font-semibold uppercase tracking-widest border border-gold-500/30 shadow-sm">
                        {blog.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center space-x-4 text-[11px] text-neutral-500 font-mono">
                      <span className="flex items-center">
                        <Clock className="w-3 h-3 mr-1 text-amber-700" /> {blog.readingTime || '5 min read'}
                      </span>
                      <span>
                        {new Date(blog.publishedAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    </div>

                    <h3 className="font-serif text-xl font-bold text-neutral-900 group-hover:text-amber-800 transition-colors leading-snug">
                      <Link to={`/blog/${blog.slug}`}>{blog.title}</Link>
                    </h3>

                    <p className="text-xs text-neutral-600 line-clamp-3 leading-relaxed font-normal">
                      {blog.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-3 border-t border-amber-900/10 flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-xs text-neutral-600">
                    <img
                      src={
                        blog.author?.avatar ||
                        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80'
                      }
                      alt={blog.author?.name}
                      className="w-6 h-6 rounded-full object-cover border border-amber-600/40"
                    />
                    <span className="font-medium truncate max-w-[130px]">
                      {blog.author?.name || 'Moonlight Editorial'}
                    </span>
                  </div>

                  <Link
                    to={`/blog/${blog.slug}`}
                    className="inline-flex items-center text-xs font-bold text-amber-700 hover:text-neutral-900 uppercase tracking-wider group"
                  >
                    Read Article{' '}
                    <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
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
