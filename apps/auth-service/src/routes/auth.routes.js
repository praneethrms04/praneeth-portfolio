const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/auth.controller");
const { protect } = require("../middleware/auth.middleware");
const { findUserById } = require("../models/user.model");

router.post("/register", register);
router.post("/login", login);

router.get("/me", protect, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
