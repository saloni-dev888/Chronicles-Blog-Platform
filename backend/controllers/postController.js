const asyncHandler = require("express-async-handler");
const Post = require("../models/Post");

// @desc    Get all posts (with pagination, category & search filters)
// @route   GET /api/posts?page=1&limit=9&category=technology&search=ai
// @access  Public
const getPosts = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 9;
  const skip = (page - 1) * limit;

  const filter = { published: true };

  if (req.query.category) {
    filter.categories = req.query.category;
  }

  if (req.query.search) {
    filter.$text = { $search: req.query.search };
  }

  if (req.query.featured) {
    filter.featured = req.query.featured === "true";
  }

  const [posts, total] = await Promise.all([
    Post.find(filter)
      .populate("categories", "name slug")
      .populate("author", "name avatar bio")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Post.countDocuments(filter),
  ]);

  res.json({
    posts,
    page,
    pages: Math.ceil(total / limit),
    total,
  });
});

// @desc    Get single post by slug
// @route   GET /api/posts/:slug
// @access  Public
const getPostBySlug = asyncHandler(async (req, res) => {
  const post = await Post.findOneAndUpdate(
    { slug: req.params.slug },
    { $inc: { views: 1 } },
    { new: true }
  )
    .populate("categories", "name slug")
    .populate("author", "name avatar bio");

  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }

  res.json(post);
});

// @desc    Create a post
// @route   POST /api/posts
// @access  Private/Admin
const createPost = asyncHandler(async (req, res) => {
  const { title, excerpt, content, coverImage, categories, readTimeMinutes, featured } =
    req.body;

  const post = await Post.create({
    title,
    excerpt,
    content,
    coverImage,
    categories,
    readTimeMinutes,
    featured,
    author: req.user._id,
  });

  res.status(201).json(post);
});

// @desc    Update a post
// @route   PUT /api/posts/:id
// @access  Private/Admin
const updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }

  Object.assign(post, req.body);
  const updated = await post.save();
  res.json(updated);
});

// @desc    Delete a post
// @route   DELETE /api/posts/:id
// @access  Private/Admin
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }

  await post.deleteOne();
  res.json({ message: "Post removed" });
});

module.exports = { getPosts, getPostBySlug, createPost, updatePost, deletePost };
