const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth.routes");
const { createUsersTable } = require("./models/user.model");

const app = express();
const PORT = process.env.AUTH_SERVICE_PORT || 3001;

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "auth-service",
    timestamp: new Date().toISOString(),
  });
});

app.use("/auth", authRoutes);

const start = async () => {
  await createUsersTable();
  app.listen(PORT, () => {
    console.log(`Auth service running on port ${PORT}`);
  });
};

start();
