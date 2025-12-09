const path = require('path');

// Import the Express app from backend
const app = require(path.join(__dirname, '..', 'backend', 'index.js'));

// Serverless handler with logging, health check, and timeout handling
module.exports = (req, res) => {
  try {
    console.log(`[api-proxy] ${req.method} ${req.url}`);

    // Set a 25-second timeout for the request (Vercel serverless timeout is 30s)
    const timeoutId = setTimeout(() => {
      console.error(`[api-proxy] Request timeout for ${req.method} ${req.url}`);
      if (!res.headersSent) {
        res.statusCode = 504;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Request timeout' }));
      }
    }, 25000);

    // Clear timeout when response is sent
    res.on('finish', () => {
      clearTimeout(timeoutId);
      console.log(`[api-proxy] Response sent for ${req.method} ${req.url}: ${res.statusCode}`);
    });

    // Simple health check: quick verify without hitting Mongo
    if (req.method === 'GET' && (req.url === '/api/health' || req.url === '/health')) {
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 200;
      return res.end(JSON.stringify({ ok: true, time: new Date().toISOString() }));
    }

    // Debug endpoint: report presence of required environment variables (DO NOT return values)
    if (req.method === 'GET' && (req.url === '/api/debug' || req.url === '/debug')) {
      const hasMongo = !!process.env.MONGODB_URI;
      const hasJwt = !!process.env.JWT_SECRET;
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 200;
      return res.end(JSON.stringify({ ok: true, hasMongo, hasJwt, nodeEnv: process.env.NODE_ENV || null }));
    }

    // Forward request to Express app
    return app(req, res);
  } catch (err) {
    console.error('[api-proxy] handler error', err && err.stack ? err.stack : err);
    if (!res.headersSent) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'Internal server error', message: err && err.message ? err.message : 'Unknown error' }));
    }
  }
};