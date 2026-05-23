const http = require("http");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const logger = require("./middleware/logger");
const { limiter, authLimiter } = require("./config/rateLimit");
const { authProxy, contentProxy, aiProxy } = require("./routes/proxy");
const { initSocket } = require("./socket");

const app = express();
const PORT = process.env.GATEWAY_PORT || 8000;

app.use(cors());
app.use(logger);
app.use(limiter);

// Health check
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "api-gateway",
    timestamp: new Date().toISOString(),
    services: {
      auth: process.env.AUTH_SERVICE_URL,
      content: process.env.CONTENT_SERVICE_URL,
      ai: process.env.AI_SERVICE_URL,
    },
  });
});

// Routes — all traffic goes through here
app.use("/auth", authLimiter, authProxy);
app.use("/content", contentProxy);
app.use("/ai", aiProxy);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.originalUrl} not found` });
});

const server = http.createServer(app);
initSocket(server);

server.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
  console.log(`Socket.io listening on ws://localhost:${PORT}`);
  console.log(`Auth service → ${process.env.AUTH_SERVICE_URL}`);
  console.log(`Content service → ${process.env.CONTENT_SERVICE_URL}`);
  console.log(`AI service → ${process.env.AI_SERVICE_URL}`);
});
