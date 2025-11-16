 const express = require('express')
const mongoose = require('mongoose');
const app = express();
require('dotenv').config({ quiet: true });
const cors = require('cors')
const port = process.env.PORT || 7000;
//gavivaishnavi1_db_user
//qQ1O9wz4Y4KUMF92
app.use(express.json());
app.use(cors());

//routes
const ItemRoutes = require("./src/routes/itemRoute");
const AuthRoutes = require("./src/routes/authRoute");
const CategoryRoutes = require("./src/routes/categoryRoute");

async function main() {
  const MONGO_URI = process.env.MONGODB_URI && process.env.MONGODB_URI.trim().length > 0
    ? process.env.MONGODB_URI
    : 'mongodb://127.0.0.1:27017/veggify';
  const DB_NAME = process.env.DB_NAME || (MONGO_URI.startsWith('mongodb://') ? 'veggify' : undefined);

  await mongoose.connect(MONGO_URI, {
    dbName: DB_NAME,
  });
  console.log("Mongodb Connected Successfully");

  app.get('/', (req, res) => {
    res.send('Veggify Recipe App Server is Running!')
  })

  app.use('/api', ItemRoutes);
  app.use('/api', CategoryRoutes);
  app.use('/api/auth', AuthRoutes);
}
main().catch(err => {
  console.error('Mongo connection error:', err && err.message ? err.message : err);
});

module.exports = app;

if (require.main === module) {
  app.listen(port, () => {
    console.log(`App is Running on the Port ${port}`)
  });
}