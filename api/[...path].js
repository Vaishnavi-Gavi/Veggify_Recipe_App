const path = require('path');
require('dotenv').config({ quiet: true });

// Import the Express app from backend
const app = require(path.join(__dirname, '..', 'backend', 'index.js'));

// Serverless handler with logging, health check, and timeout handling
module.exports = (req, res) => {
  try {
    console.log(`[api-proxy] ${req.method} ${req.url}`);

    // Simple health check: quick verify without hitting Mongo
    if (req.method === 'GET' && (req.url === '/api/health' || req.url === '/health')) {
      console.log('[api-proxy] Health check requested');
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 200;
      return res.end(JSON.stringify({ ok: true, time: new Date().toISOString() }));
    }

    // Debug endpoint: report presence of required environment variables
    if (req.method === 'GET' && (req.url === '/api/debug' || req.url === '/debug')) {
      console.log('[api-proxy] Debug info requested');
      const hasMongo = !!process.env.MONGODB_URI;
      const hasJwt = !!process.env.JWT_SECRET;
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 200;
      return res.end(JSON.stringify({ 
        ok: true, 
        hasMongo, 
        hasJwt, 
        nodeEnv: process.env.NODE_ENV || null,
        mongoUri: hasMongo ? `***${process.env.MONGODB_URI.slice(-20)}` : null,
        jwtSecret: hasJwt ? `***${process.env.JWT_SECRET.slice(-10)}` : null
      }));
    }

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