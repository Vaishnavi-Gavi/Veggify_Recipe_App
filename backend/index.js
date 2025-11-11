 const express = require('express')
 const mongoose =require('mongoose');
 const app = express();
 const cors=require('cors')
 const port = process.env.PORT || 7000;
//gavivaishnavi1_db_user
 //qQ1O9wz4Y4KUMF92
app.use(express.json());
app.use(cors());

 async function main() {
   await mongoose.connect('mongodb+srv://gavivaishnavi1_db_user:KuxA0P0IySd9mZxQ@vegy-app.tt9hwes.mongodb.net/?retryWrites=true&w=majority&appName=vegy-app');
   app.get('/', (req, res) => {
   res.send('Veggify Recipe App Server is Running!')
 })
 }
 main().then(()=> console.log("Mongodb Connected Successfully")).catch(err => console.log(err));

//routes
const ItemRoutes = require("./src/routes/itemRoute");
const AuthRoutes = require("./src/routes/authRoute");
const CategoryRoutes = require("./src/routes/categoryRoute");
app.use('/api', ItemRoutes);
app.use('/api',CategoryRoutes);
app.use('/api/auth', AuthRoutes);
 app.listen(port, () => {
   console.log(`App is Runnung on the Port ${port}`)
 })