const asyncHandler = require("express-async-handler");
const Category = require("../models/Category");
const Post = require("../models/Post");

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find().sort({ name: 1 });

  const withCounts = await Promise.all(
    categories.map(async (cat) => {
      const count = await Post.countDocuments({ categories: cat._id, published: true });
      return { ...cat.toObject(), postCount: count };
    })
  );

  res.json(withCounts);
});

// @desc    Create category
// @route   POST /api/categories
// @access  Private/Admin
const createCategory = asyncHandler(async (req, res) => {
  const { name, image } = req.body;
  const exists = await Category.findOne({ name });
  if (exists) {
    res.status(400);
    throw new Error("Category already exists");
  }
  const category = await Category.create({ name, image });
  res.status(201).json(category);
});

// @desc    Delete category
// @route   DELETE /api/categories/:id
// @access  Private/Admin
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    res.status(404);
    throw new Error("Category not found");
  }
  await category.deleteOne();
  res.json({ message: "Category removed" });
});

module.exports = { getCategories, createCategory, deleteCategory };
