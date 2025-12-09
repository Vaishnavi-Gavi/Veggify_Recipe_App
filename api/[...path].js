const path = require('path');

// Import the Express app from backend
const app = require(path.join(__dirname, '..', 'backend', 'index.js'));

// Serverless handler with logging and a simple health-check
module.exports = (req, res) => {
	try {
		console.log(`[api-proxy] ${req.method} ${req.url}`);

		// Simple health check: quick verify without hitting Mongo
		if (req.method === 'GET' && (req.url === '/api/health' || req.url === '/health')) {
			res.setHeader('Content-Type', 'application/json');
			res.statusCode = 200;
			return res.end(JSON.stringify({ ok: true, time: new Date().toISOString() }));
		}

		// Forward request to Express app
		return app(req, res);
	} catch (err) {
		console.error('[api-proxy] handler error', err && err.stack ? err.stack : err);
		res.statusCode = 500;
		res.setHeader('Content-Type', 'application/json');
		return res.end(JSON.stringify({ error: 'Internal server error' }));
	}
};
