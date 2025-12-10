 const express = require('express')
const mongoose = require('mongoose');
require('dotenv').config({ quiet: true });
const cors = require('cors')
const port = process.env.PORT || 7000;

const app = express();
app.use(express.json());
app.use(cors());

//routes
const ItemRoutes = require("./src/routes/itemRoute");
const AuthRoutes = require("./src/routes/authRoute");
const CategoryRoutes = require("./src/routes/categoryRoute");

let mongoConnected = false;

async function initializeBackend() {
  if (mongoConnected) return;

  const MONGO_URI = process.env.MONGODB_URI && process.env.MONGODB_URI.trim().length > 0
    ? process.env.MONGODB_URI
    : 'mongodb://127.0.0.1:27017/veggify';
  const DB_NAME = process.env.DB_NAME || (MONGO_URI.startsWith('mongodb://') ? 'veggify' : undefined);

  console.log('[backend] ========================================');
  console.log('[backend] Starting Veggify Backend Server');
  console.log('[backend] Node Environment:', process.env.NODE_ENV || 'development');
  console.log('[backend] MONGODB_URI is set:', !!process.env.MONGODB_URI);
  console.log('[backend] JWT_SECRET is set:', !!process.env.JWT_SECRET);
  console.log('[backend] ========================================');

  try {
    console.log('[backend] Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI, {
      dbName: DB_NAME,
    });
    console.log("[backend] ✓ MongoDB Connected Successfully");
    mongoConnected = true;
  } catch (mongoErr) {
    console.error('[backend] ✗ MongoDB connection failed:', mongoErr && mongoErr.message ? mongoErr.message : mongoErr);
    console.error('[backend] Make sure MONGODB_URI is set in Vercel Environment Variables');
    throw mongoErr;
  }
}

// Root route
app.get('/', (req, res) => {
  res.send('Veggify Recipe App Server is Running!')
})

// Middleware to ensure backend is initialized before handling API requests
app.use('/api', async (req, res, next) => {
  try {
    if (!mongoConnected) {
      await initializeBackend();
    }
    next();
  } catch (err) {
    console.error('[backend] API request before init failed:', err && err.message ? err.message : err);
    res.status(503).json({ error: 'Service unavailable', message: 'Backend initializing' });
  }
});

app.use('/api', ItemRoutes);
app.use('/api', CategoryRoutes);
app.use('/api/auth', AuthRoutes);

console.log('[backend] ✓ Route handlers registered');

// Global error handler
app.use((err, req, res, next) => {
  console.error('[backend] request error:', err && err.stack ? err.stack : err);
  res.status(500).json({ error: 'Internal server error', message: err && err.message ? err.message : 'Unknown error' });
});

// For local development
if (require.main === module) {
  initializeBackend().then(() => {
    app.listen(port, () => {
      console.log(`App is Running on the Port ${port}`)
    });
  }).catch(err => {
    console.error('[backend] FATAL ERROR:', err);
    process.exit(1);
  });
}

module.exports = app;