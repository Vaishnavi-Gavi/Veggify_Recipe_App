const path = require('path');

// Import the Express app from backend
const app = require(path.join(__dirname, '..', 'backend', 'index.js'));

// Export a function handler that forwards requests to the Express app
module.exports = (req, res) => {
	// Express app is a function (req, res) => {}
	return app(req, res);
};
