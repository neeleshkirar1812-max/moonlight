import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../api/client';
import { CardSkeleton } from '../../components/common/SkeletonLoader';
import { ArrowLeft, Clock, Calendar, User, Share2, Tag, ArrowRight } from 'lucide-react';

const BlogDetail = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/blogs/${slug}`);
        setBlog(res.data);
        setRelated(res.related || []);
      } catch (err) {
        console.error('Error fetching article', err);
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-obsidian text-white pt-32 pb-24 px-4 max-w-4xl mx-auto">
        <CardSkeleton count={1} height="h-[500px]" />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-obsidian text-white pt-32 pb-24 text-center">
        <h2 className="font-serif text-3xl">Article Not Found</h2>
        <Link to="/blog" className="text-gold-400 mt-4 inline-block">Return to Blog</Link>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-obsidian text-white pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Back Link */}
        <Link
          to="/blog"
          className="inline-flex items-center text-xs uppercase tracking-widest text-gold-400 hover:text-white font-semibold group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Journal
        </Link>

        {/* Header Metadata */}
        <div className="space-y-4">
          <span className="px-3.5 py-1 rounded-full bg-gold-500/20 text-gold-300 border border-gold-500/30 text-xs font-semibold uppercase tracking-widest">
            {blog.category}
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
            {blog.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 pt-4 border-y border-white/10 text-xs text-neutral-400">
            <div className="flex items-center space-x-2">
              <img
                src={blog.author?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80'}
                alt={blog.author?.name}
                className="w-8 h-8 rounded-full object-cover border border-gold-500/50"
              />
              <span className="text-white font-semibold">{blog.author?.name || 'Julian Montgomery'}</span>
            </div>
            <span className="flex items-center"><Calendar className="w-3.5 h-3.5 mr-1.5 text-gold-400" /> {new Date(blog.publishedAt).toLocaleDateString('en-US', { dateStyle: 'long' })}</span>
            <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1.5 text-gold-400" /> {blog.readingTime || '5 min read'}</span>
          </div>
        </div>

        {/* Featured Image */}
        <div className="rounded-3xl overflow-hidden aspect-[16/9] border border-gold-500/30 shadow-2xl">
          <img src={blog.featuredImage} alt={blog.title} className="w-full h-full object-cover" />
        </div>

        {/* Body Content */}
        <div className="prose prose-invert max-w-none text-neutral-300 font-light text-sm sm:text-base leading-relaxed space-y-6 pt-4 whitespace-pre-line">
          {blog.content}
        </div>

        {/* Tags */}
        {blog.tags?.length > 0 && (
          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-2">
            <Tag className="w-4 h-4 text-gold-400 mr-2" />
            {blog.tags.map((t, idx) => (
              <span key={idx} className="px-3 py-1 bg-obsidian-200 border border-white/10 rounded-full text-xs text-neutral-400">
                #{t}
              </span>
            ))}
          </div>
        )}

        {/* Related Articles */}
        {related.length > 0 && (
          <div className="pt-16 border-t border-white/10 space-y-6">
            <h3 className="font-serif text-2xl text-white font-bold">Related Essays</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {related.map((rel) => (
                <Link
                  key={rel._id}
                  to={`/blog/${rel.slug}`}
                  className="luxury-card rounded-xl p-4 group block space-y-3"
                >
                  <div className="aspect-video rounded-lg overflow-hidden bg-obsidian-300">
                    <img src={rel.featuredImage} alt={rel.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <h4 className="font-serif text-sm font-bold text-white group-hover:text-gold-200 transition-colors line-clamp-2">{rel.title}</h4>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
};

export default BlogDetail;
