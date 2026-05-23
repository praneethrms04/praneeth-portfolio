const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth.middleware");
const {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} = require("../controllers/project.controller");

router.get("/", getAllProjects);
router.get("/:id", getProjectById);
router.post("/", protect, createProject);
router.put("/:id", protect, updateProject);
router.delete("/:id", protect, deleteProject);

module.exports = router;
