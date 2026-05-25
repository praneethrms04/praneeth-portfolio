const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth.middleware");
const {
  getAllBlogs,
  getBlogBySlugOrId,
  createBlog,
  updateBlog,
  deleteBlog,
  getTags,
} = require("../controllers/blog.controller");

router.get("/", getAllBlogs);
router.get("/tags", getTags);
router.get("/:idOrSlug", getBlogBySlugOrId);
router.post("/", protect, createBlog);
router.put("/:id", protect, updateBlog);
router.delete("/:id", protect, deleteBlog);

module.exports = router;
