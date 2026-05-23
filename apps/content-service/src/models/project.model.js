const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    techStack: [
      {
        type: String,
      },
    ],
    githubUrl: String,
    liveUrl: String,
    thumbnail: String,
    featured: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["in-progress", "completed", "archived"],
      default: "in-progress",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Project", projectSchema);
