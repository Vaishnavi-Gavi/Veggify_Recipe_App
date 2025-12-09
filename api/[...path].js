const path = require('path');

// Import the Express app from backend
const app = require(path.join(__dirname, '..', 'backend', 'index.js'));

// Export the app as the serverless function handler
module.exports = app;
