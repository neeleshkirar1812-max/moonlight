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
      <div className="min-h-screen bg-[#FAF8F5] text-neutral-900 pt-32 pb-24 px-4 max-w-4xl mx-auto">
        <CardSkeleton count={1} height="h-[500px]" />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] text-neutral-900 pt-32 pb-24 text-center">
        <h2 className="font-serif text-3xl text-neutral-900 font-bold">Article Not Found</h2>
        <Link to="/blog" className="text-amber-700 font-bold mt-4 inline-block">Return to Blog</Link>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-[#FAF8F5] text-neutral-900 pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Back Link */}
        <Link
          to="/blog"
          className="inline-flex items-center text-xs uppercase tracking-widest text-amber-700 hover:text-neutral-900 font-bold group font-mono"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Journal
        </Link>

        {/* Header Metadata */}
        <div className="space-y-4">
          <span className="px-3.5 py-1 rounded-full bg-amber-500/15 text-amber-800 border border-amber-600/30 text-xs font-bold uppercase tracking-widest font-mono">
            {blog.category}
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 leading-tight">
            {blog.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 pt-4 border-y border-amber-900/10 text-xs text-neutral-600">
            <div className="flex items-center space-x-2">
              <img
                src={blog.author?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80'}
                alt={blog.author?.name}
                className="w-8 h-8 rounded-full object-cover border border-amber-600/40"
              />
              <span className="text-neutral-900 font-bold">{blog.author?.name || 'Moonlight Editorial'}</span>
            </div>
            <span className="flex items-center"><Calendar className="w-3.5 h-3.5 mr-1.5 text-amber-700" /> {new Date(blog.publishedAt).toLocaleDateString('en-US', { dateStyle: 'long' })}</span>
            <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1.5 text-amber-700" /> {blog.readingTime || '5 min read'}</span>
          </div>
        </div>

        {/* Featured Image */}
        <div className="rounded-3xl overflow-hidden aspect-[16/9] border border-amber-900/15 shadow-xl">
          <img src={blog.featuredImage} alt={blog.title} className="w-full h-full object-cover" />
        </div>

        {/* Body Content */}
        <div className="prose max-w-none text-neutral-700 font-normal text-sm sm:text-base leading-relaxed space-y-6 pt-4 whitespace-pre-line">
          {blog.content}
        </div>

        {/* Tags */}
        {blog.tags?.length > 0 && (
          <div className="pt-6 border-t border-amber-900/10 flex flex-wrap items-center gap-2">
            <Tag className="w-4 h-4 text-amber-700 mr-2" />
            {blog.tags.map((t, idx) => (
              <span key={idx} className="px-3 py-1 bg-white border border-neutral-300 rounded-full text-xs text-neutral-600 font-medium shadow-sm">
                #{t}
              </span>
            ))}
          </div>
        )}

        {/* Related Articles */}
        {related.length > 0 && (
          <div className="pt-16 border-t border-amber-900/10 space-y-6">
            <h3 className="font-serif text-2xl text-neutral-900 font-bold">Related Essays</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {related.map((rel) => (
                <Link
                  key={rel._id}
                  to={`/blog/${rel.slug}`}
                  className="bg-white rounded-xl p-4 group block space-y-3 border border-amber-900/15 hover:border-amber-600/50 shadow-md hover:shadow-xl transition-all"
                >
                  <div className="aspect-video rounded-lg overflow-hidden bg-neutral-100">
                    <img src={rel.featuredImage} alt={rel.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <h4 className="font-serif text-sm font-bold text-neutral-900 group-hover:text-amber-800 transition-colors line-clamp-2">{rel.title}</h4>
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
