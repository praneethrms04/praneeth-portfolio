const { createProxyMiddleware } = require("http-proxy-middleware");

const authProxy = createProxyMiddleware({
  target: process.env.AUTH_SERVICE_URL,
  changeOrigin: true,
  on: {
    error: (err, req, res) => {
      res.status(503).json({ error: "Auth service unavailable" });
    },
  },
});

const contentProxy = createProxyMiddleware({
  target: process.env.CONTENT_SERVICE_URL,
  changeOrigin: true,
  on: {
    error: (err, req, res) => {
      res.status(503).json({ error: "Content service unavailable" });
    },
  },
});

const aiProxy = createProxyMiddleware({
  target: process.env.AI_SERVICE_URL,
  changeOrigin: true,
  on: {
    error: (err, req, res) => {
      res.status(503).json({ error: "AI service unavailable" });
    },
  },
});

module.exports = { authProxy, contentProxy, aiProxy };
