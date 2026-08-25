import Blog from '../models/Blog.js';
import { AppError } from '../middleware/error.js';

export const getBlogs = async (req, res, next) => {
  try {
    const { category, search, page = 1, limit = 9 } = req.query;
    const query = { isPublished: true };

    if (category && category !== 'All') {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } },
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);
    const total = await Blog.countDocuments(query);
    const blogs = await Blog.find(query)
      .populate('author', 'name avatar')
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      count: blogs.length,
      total,
      totalPages: Math.ceil(total / Number(limit)),
      data: blogs,
    });
  } catch (error) {
    next(error);
  }
};

export const getBlogBySlug = async (req, res, next) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug }).populate('author', 'name avatar');
    if (!blog) return next(new AppError('Article not found', 404));

    blog.viewCount += 1;
    await blog.save();

    // Fetch related articles
    const related = await Blog.find({
      category: blog.category,
      _id: { $ne: blog._id },
      isPublished: true,
    })
      .limit(3)
      .select('title slug featuredImage readingTime publishedAt');

    res.status(200).json({
      success: true,
      data: blog,
      related,
    });
  } catch (error) {
    next(error);
  }
};

export const createBlog = async (req, res, next) => {
  try {
    const { title, excerpt, content, featuredImage, category, tags, readingTime, seoTitle, seoDescription } = req.body;
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const blog = await Blog.create({
      title,
      slug,
      excerpt,
      content,
      featuredImage,
      category,
      tags: Array.isArray(tags) ? tags : (tags ? tags.split(',').map(t => t.trim()) : []),
      readingTime: readingTime || '4 min read',
      seoTitle: seoTitle || title,
      seoDescription: seoDescription || excerpt,
      author: req.user._id,
    });

    res.status(201).json({ success: true, data: blog });
  } catch (error) {
    next(error);
  }
};

export const updateBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!blog) return next(new AppError('Article not found', 404));
    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    next(error);
  }
};

export const deleteBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return next(new AppError('Article not found', 404));
    res.status(200).json({ success: true, message: 'Article deleted' });
  } catch (error) {
    next(error);
  }
};
