const mongoose = require("mongoose");

const slugify = (str) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      index: true,
    },
    content: {
      type: String,
      required: true,
    },
    summary: String,
    tags: [String],
    coverImage: String,
    author: {
      name: String,
      email: String,
    },
    readingTime: {
      type: Number,
      default: 1,
    },
    published: {
      type: Boolean,
      default: false,
      index: true,
    },
    publishedAt: Date,
    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

blogSchema.pre("validate", function (next) {
  if (this.title && (!this.slug || this.isModified("title"))) {
    const base = slugify(this.title);
    this.slug = `${base}-${Date.now().toString(36)}`;
  }
  if (this.content) {
    const words = this.content.trim().split(/\s+/).length;
    this.readingTime = Math.max(1, Math.round(words / 200));
  }
  if (this.published && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  next();
});

module.exports = mongoose.model("Blog", blogSchema);
