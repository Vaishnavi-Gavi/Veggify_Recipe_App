/* eslint-disable no-console */
require('dotenv').config();
const mongoose = require('mongoose');
const Item = require('../model/ItemModel');

// Prefer env var, fallback to app connection string
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://gavivaishnavi1_db_user:KuxA0P0IySd9mZxQ@vegy-app.tt9hwes.mongodb.net/?retryWrites=true&w=majority&appName=vegy-app';
const MONGODB_URI = process.env.MONGODB_URI;

// Sample recipe data (normalized to match ItemModel schema)
const sampleRecipes = [
  {
    menuId: 0,
    name: 'Extravaganza Pizza',
    thumbnail_image:
      'https://www.elloras.in/cdn/shop/products/VegExtravaganzaPizza_693x.jpg?v=1663945798%201x,//www.elloras.in/cdn/shop/products/VegExtravaganzaPizza_693x@2x.jpg?v=1663945798%202x',
    category: 'entrees',
    tags: ['pizza', 'vegetarian', 'italian', 'cheesy', 'delicious', 'comfort food'],
    instructions:
      '1. Preheat oven to 450°F (230°C)\n2. Roll out pizza dough on floured surface\n3. Spread tomato sauce evenly\n4. Add mozzarella cheese as base\n5. Top with bell peppers, onions, mushrooms, and olives\n6. Add some sliced zucchini and cherry tomatoes for extra flavor\n7. Bake for 12-15 minutes until golden\n8. Let cool for 2 minutes before slicing\n9. Serve hot with a sprinkle of fresh basil',
    ingredients: [
      { name: 'Pizza dough', quantity: '1 lb' },
      { name: 'Tomato sauce', quantity: '1/2 cup' },
      { name: 'Mozzarella cheese', quantity: '2 cups' },
      { name: 'Bell peppers', quantity: '1 cup sliced' },
      { name: 'Red onions', quantity: '1/2 cup sliced' },
      { name: 'Mushrooms', quantity: '1/2 cup sliced' },
      { name: 'Black olives', quantity: '1/4 cup' },
      { name: 'Fresh basil', quantity: '2 tbsp' },
      { name: 'Olive oil', quantity: '2 tbsp' },
      { name: 'Garlic powder', quantity: '1 tsp' },
    ],
    comments: [
      { user: 'Pizza Lover', comment: "The best vegetarian pizza I've ever made! So many flavors!" },
      { user: 'Chef Mike', comment: 'Perfect for family dinner. Kids love all the toppings!' },
      { user: 'Foodie Sarah', comment: 'Restaurant quality pizza at home. Amazing recipe!' },
    ],
    more: {
      prep_time: '20 mins',
      cook_time: '15 mins',
...
      servings: '4',
      difficulty: 'Easy',
      source: 'Family Recipe',
    },
  },
  {
    menuId: 2,
    name: 'Garlic Mashed Potatoes',
    thumbnail_image:
      'https://img.freepik.com/free-photo/fresh-flavorful-mashed-potatoes_2829-11458.jpg',
    category: 'sides',
    instructions:
...
      '1. Peel and quarter potatoes into even pieces\n2. Boil in salted water until fork-tender (15-20 minutes)\n3. Drain thoroughly and return to pot\n4. Add butter, minced garlic, and warm milk\n5. Mash until smooth and creamy\n6. Season with salt and pepper to taste\n7. Serve hot with extra butter on top',
    tags: ['comfort food', 'garlic', 'creamy', 'traditional', 'potatoes'],
    ingredients: [
      { name: 'Russet potatoes', quantity: '2 lbs' },
      { name: 'Butter', quantity: '4 tbsp' },
      { name: 'Garlic cloves', quantity: '4 minced' },
      { name: 'Milk', quantity: '1/2 cup warm' },
...
      { user: 'College Student', comment: 'Perfect quick meal! My go-to comfort food.' },
      { user: 'Noodle Lover', comment: 'Love the upgraded version with vegetables!' },
      { user: 'Busy Mom', comment: 'Quick and satisfying. Kids love it!' },
    ],
    more: {
      prep_time: '5 mins',
      cook_time: '5 mins',
      servings: '2',
      difficulty: 'Easy',
      source: 'Student Kitchen',
    },
  },
  {
    menuId: 15,
    name: 'Gobi Manchurian',
    thumbnail_image:
      'https://png.pngtree.com/background/20250208/original/pngtree-exciting-street-food-scene-with-vibrant-gobi-manchurian-dynamic-lighting-and-picture-image_15883390.jpg',
    category: 'entrees',
    instructions:
      '1. Cut cauliflower into florets\n2. Make batter with flour and cornflour\n3. Deep fry cauliflower until golden\n4. Make sauce with onions, capsicum, soy sauce\n5. Add fried cauliflower to sauce\n6. Toss well and serve hot',