import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../api/client';
import SEO from '../../components/common/SEO';
import { DEFAULT_BLOGS } from '../../data/defaultBlogs';
import { CardSkeleton } from '../../components/common/SkeletonLoader';
import { ArrowLeft, Clock, Calendar, Share2, Tag, ArrowRight, BookOpen } from 'lucide-react';

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
        if (res.data) {
          setBlog(res.data);
          setRelated(res.related || []);
        } else {
          // Fallback to default blogs
          const fallback = DEFAULT_BLOGS.find((b) => b.slug === slug);
          setBlog(fallback || null);
          setRelated(DEFAULT_BLOGS.filter((b) => b.slug !== slug).slice(0, 2));
        }
      } catch (err) {
        console.warn('Article fetch failed, checking default articles:', err);
        const fallback = DEFAULT_BLOGS.find((b) => b.slug === slug);
        setBlog(fallback || null);
        setRelated(DEFAULT_BLOGS.filter((b) => b.slug !== slug).slice(0, 2));
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] text-neutral-900 pt-32 pb-24 px-4 max-w-4xl mx-auto">
        <CardSkeleton count={1} height="h-[500px]" />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] text-neutral-900 pt-32 pb-24 text-center px-4">
        <div className="max-w-md mx-auto bg-white p-8 rounded-3xl border border-amber-900/15 shadow-sm space-y-4">
          <BookOpen className="w-10 h-10 text-amber-700 mx-auto opacity-70" />
          <h2 className="font-serif text-2xl text-neutral-900 font-bold">Article Not Found</h2>
          <p className="text-xs text-neutral-600">The guide you are looking for might have been moved or updated.</p>
          <Link
            to="/blog"
            className="px-6 py-2.5 rounded-full bg-gold-gradient text-neutral-950 font-bold text-xs uppercase tracking-wider inline-block shadow-sm"
          >
            Return to Blog
          </Link>
        </div>
      </div>
    );
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: blog.title,
    image: blog.coverImage || 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=85',
    datePublished: blog.publishedAt || '2026-01-01',
    author: {
      '@type': 'Person',
      name: blog.author?.name || 'Moonlight Creative Team',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Moonlight Production',
      logo: {
        '@type': 'ImageObject',
        url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=85',
      },
    },
    description: blog.excerpt || blog.title,
  };

  return (
    <article className="min-h-screen bg-[#FAF8F5] text-neutral-900 pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <SEO
        title={blog.title}
        description={blog.excerpt || blog.title}
        keywords={`${blog.category}, Indian wedding photography, Moonlight Production blog, ${blog.tags ? blog.tags.join(', ') : ''}`}
        image={blog.coverImage}
        type="article"
        schema={articleSchema}
      />
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Back Link */}
        <Link
          to="/blog"
          className="inline-flex items-center text-xs uppercase tracking-widest text-amber-700 hover:text-neutral-900 font-bold group font-mono"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Blog
        </Link>

        {/* Header Metadata */}
        <div className="space-y-4">
          <span className="px-3.5 py-1 rounded-full bg-amber-500/15 text-amber-800 border border-amber-600/30 text-xs font-bold uppercase tracking-widest font-mono inline-block">
            {blog.category}
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 leading-tight">
            {blog.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 pt-4 border-y border-amber-900/10 text-xs text-neutral-600 font-mono">
            <div className="flex items-center space-x-2">
              <img
                src={
                  blog.author?.avatar ||
                  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80'
                }
                alt={blog.author?.name}
                className="w-8 h-8 rounded-full object-cover border border-amber-600/40"
              />
              <span className="text-neutral-900 font-bold">{blog.author?.name || 'Moonlight Editorial'}</span>
            </div>
            <span className="flex items-center">
              <Calendar className="w-3.5 h-3.5 mr-1.5 text-amber-700" />
              {new Date(blog.publishedAt).toLocaleDateString('en-US', { dateStyle: 'long' })}
            </span>
            <span className="flex items-center">
              <Clock className="w-3.5 h-3.5 mr-1.5 text-amber-700" />
              {blog.readingTime || '5 min read'}
            </span>
          </div>
        </div>

        {/* Featured Image */}
        <div className="rounded-3xl overflow-hidden aspect-[16/9] border border-amber-900/15 shadow-xl">
          <img src={blog.featuredImage} alt={blog.title} className="w-full h-full object-cover" />
        </div>

        {/* Body Content */}
        <div className="prose max-w-none text-neutral-800 font-normal text-sm sm:text-base leading-relaxed space-y-6 pt-4 whitespace-pre-line bg-white p-6 sm:p-10 rounded-3xl border border-amber-900/15 shadow-sm">
          {blog.content}
        </div>

        {/* Tags */}
        {blog.tags?.length > 0 && (
          <div className="pt-6 border-t border-amber-900/10 flex flex-wrap items-center gap-2">
            <Tag className="w-4 h-4 text-amber-700 mr-2" />
            {blog.tags.map((t, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-white border border-neutral-300 rounded-full text-xs text-neutral-600 font-medium shadow-sm"
              >
                #{t}
              </span>
            ))}
          </div>
        )}

        {/* Related Articles */}
        {related.length > 0 && (
          <div className="pt-12 border-t border-amber-900/10 space-y-6">
            <h3 className="font-serif text-2xl font-bold text-neutral-900">More Wedding Guides & Insights</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {related.map((rel) => (
                <Link
                  key={rel._id || rel.slug}
                  to={`/blog/${rel.slug}`}
                  className="bg-white rounded-2xl p-4 border border-amber-900/15 hover:border-amber-600/50 transition-all flex items-center space-x-4 shadow-sm group"
                >
                  <img
                    src={rel.featuredImage}
                    alt={rel.title}
                    className="w-20 h-20 rounded-xl object-cover shrink-0"
                  />
                  <div>
                    <span className="text-[10px] uppercase font-mono font-bold text-amber-700 block">
                      {rel.category}
                    </span>
                    <h4 className="font-serif text-sm font-bold text-neutral-900 group-hover:text-amber-800 transition-colors line-clamp-2">
                      {rel.title}
                    </h4>
                  </div>
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
