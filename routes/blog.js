const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');

// Create a new blog
router.post('/create', async (req, res) => {
  const { title, content, author, imageUrl } = req.body; // ✅ include imageUrl

  if (!title || !content || !author) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newBlog = new Blog({ title, content, author, imageUrl }); // ✅ save imageUrl
    await newBlog.save();
    res.status(201).json({ message: "Blog created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong, please try again later" });
  }
});

// Get top 5–6 blogs (with pagination)
router.get('/top', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 6;

  try {
    const blogs = await Blog.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
    res.status(200).json(blogs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// Get blog by id
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json(blog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// Get blogs by a specific user (author)
router.get('/user/:userId', async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.params.userId });
    if (blogs.length === 0) {
      return res.status(404).json({ message: "No blogs found for this user" });
    }
    res.status(200).json(blogs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// Get the count of blogs for a specific user
router.get('/user/:userId/count', async (req, res) => {
  try {
    const count = await Blog.countDocuments({ author: req.params.userId });
    res.status(200).json({ count });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// Delete a blog by ID
router.delete('/:id', async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Update a blog by ID
router.put('/:id', async (req, res) => {
  const { title, content, imageUrl } = req.body; // ✅ include imageUrl

  try {
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, content, imageUrl }, // ✅ allow updating imageUrl
      { new: true }
    );

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.status(200).json({ message: 'Blog updated successfully', blog });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;