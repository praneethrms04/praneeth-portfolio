const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const projectRoutes = require("./routes/project.routes");
const blogRoutes = require("./routes/blog.routes");

const app = express();
const PORT = process.env.CONTENT_SERVICE_PORT || 3002;

app.use(cors());
app.use(express.json());

const healthHandler = (req, res) => {
  res.json({
    status: "ok",
    service: "content-service",
    timestamp: new Date().toISOString(),
  });
};

app.get("/health", healthHandler);
app.get("/content/health", healthHandler);

app.use("/content/projects", projectRoutes);
app.use("/content/blogs", blogRoutes);

const start = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Content service running on port ${PORT}`);
  });
};

start();
