const mongoose = require("mongoose");
const Blog = require("../models/blog.model");

const isObjectId = (val) => mongoose.Types.ObjectId.isValid(val);

const getAllBlogs = async (req, res) => {
  try {
    const { tag, q, all } = req.query;
    const filter = {};

    if (!all) filter.published = true;
    if (tag) filter.tags = tag;
    if (q) {
      filter.$or = [
        { title: { $regex: q, $options: "i" } },
        { summary: { $regex: q, $options: "i" } },
        { content: { $regex: q, $options: "i" } },
      ];
    }

    const blogs = await Blog.find(filter)
      .select("-content")
      .sort({ publishedAt: -1, createdAt: -1 });

    res.json({ blogs });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
};

const getBlogBySlugOrId = async (req, res) => {
  try {
    const { idOrSlug } = req.params;
    const query = isObjectId(idOrSlug)
      ? { _id: idOrSlug }
      : { slug: idOrSlug };

    const blog = await Blog.findOneAndUpdate(
      query,
      { $inc: { views: 1 } },
      { new: true },
    );

    if (!blog) return res.status(404).json({ error: "Blog not found" });
    res.json({ blog });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch blog" });
  }
};

const createBlog = async (req, res) => {
  try {
    const payload = { ...req.body };
    if (req.user) {
      payload.author = {
        name: req.body?.author?.name || req.user.email?.split("@")[0],
        email: req.user.email,
      };
    }
    const blog = await Blog.create(payload);
    res.status(201).json({ message: "Blog created", blog });
  } catch (err) {
    if (err?.code === 11000) {
      return res
        .status(409)
        .json({ error: "A blog with that slug already exists" });
    }
    res.status(500).json({ error: "Failed to create blog" });
  }
};

const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: "Blog not found" });

    const updatable = [
      "title",
      "content",
      "summary",
      "tags",
      "coverImage",
      "published",
    ];
    for (const key of updatable) {
      if (key in req.body) blog[key] = req.body[key];
    }

    await blog.save();
    res.json({ message: "Blog updated", blog });
  } catch (err) {
    res.status(500).json({ error: "Failed to update blog" });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ error: "Blog not found" });
    res.json({ message: "Blog deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete blog" });
  }
};

const getTags = async (req, res) => {
  try {
    const tags = await Blog.distinct("tags", { published: true });
    res.json({ tags: tags.filter(Boolean).sort() });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tags" });
  }
};

module.exports = {
  getAllBlogs,
  getBlogBySlugOrId,
  createBlog,
  updateBlog,
  deleteBlog,
  getTags,
};
