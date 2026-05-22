const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.AUTH_SERVICE_PORT || 3001;

app.use(cors());
app.use(express.json());

// Health check route
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "auth-service",
    timestamp: new Date().toISOString(),
  });
});
app.listen(PORT, () => {
  console.log(`Auth service running on port ${PORT}`);
});
