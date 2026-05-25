const { createProxyMiddleware } = require("http-proxy-middleware");

// NOTE: gateway mounts these with `app.use("/auth", ...)` etc., which strips
// the prefix from req.url before the proxy runs. We add the prefix back via
// pathRewrite so the downstream service receives the original full path
// (auth-service mounts routes at /auth, content-service at /content, etc.).

const authProxy = createProxyMiddleware({
  target: process.env.AUTH_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: (path) => `/auth${path}`,
  on: {
    error: (err, req, res) => {
      res.status(503).json({ error: "Auth service unavailable" });
    },
  },
});

const contentProxy = createProxyMiddleware({
  target: process.env.CONTENT_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: (path) => `/content${path}`,
  on: {
    error: (err, req, res) => {
      res.status(503).json({ error: "Content service unavailable" });
    },
  },
});

// ai-service mounts routes at /chat, /summarize, /health (no /ai prefix),
// so the stripped path from Express is exactly what it expects.
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
