/* eslint-disable no-console */
const mongoose = require('mongoose');
const Item = require('../model/ItemModel');

// Prefer env var, fallback to app connection string
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://gavivaishnavi1_db_user:KuxA0P0IySd9mZxQ@vegy-app.tt9hwes.mongodb.net/?retryWrites=true&w=majority&appName=vegy-app';

// Sample recipe data (normalized to match ItemModel schema)
const sampleRecipes = [
  {
    menuId: 0,
    name: 'Extravaganza Pizza',
    thumbnail_image:
      'https://www.elloras.in/cdn/shop/products/VegExtravaganzaPizza_693x.jpg?v=1663945798%201x,//www.elloras.in/cdn/shop/products/VegExtravaganzaPizza_693x@2x.jpg?v=1663945798%202x',
    category: 'entrees',
    instructions:
      '1. Preheat oven to 450°F (230°C)\n2. Roll out pizza dough on floured surface\n3. Spread tomato sauce evenly\n4. Add mozzarella cheese as base\n5. Top with bell peppers, onions, mushrooms, olives\n6. Add pepperoni, sausage, and extra cheese\n7. Bake for 12-15 minutes until golden\n8. Let cool for 2 minutes before slicing\n9. Serve hot with garlic bread',
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
      servings: '6-8',
      difficulty: 'Medium',
      source: 'Italian Kitchen',
    },
  },
  {
    menuId: 1,
    name: 'Classic Caesar Salad',
    thumbnail_image:
      'https://media.chefdehome.com/750/0/0/caesar/classic-caesar-salad.jpg',
    category: 'sides',
    instructions:
      '1. Wash and dry romaine lettuce leaves thoroughly\n2. Tear into bite-sized pieces and place in a large bowl\n3. Add croutons and freshly grated parmesan cheese\n4. Drizzle with your favorite Caesar dressing\n5. Toss gently to combine all ingredients\n6. Serve immediately while fresh',
    tags: ['healthy', 'vegetarian', 'quick', 'classic', 'salad'],
    ingredients: [
      { name: 'Romaine lettuce', quantity: '1 large head' },
      { name: 'Croutons', quantity: '1 cup' },
      { name: 'Parmesan cheese', quantity: '1/2 cup grated' },
      { name: 'Caesar dressing', quantity: '1/4 cup' },
      { name: 'Lemon juice', quantity: '1 tbsp' },
      { name: 'Black pepper', quantity: 'to taste' },
    ],
    comments: [
      { user: 'Sarah', comment: 'Perfect for a light lunch! The dressing is amazing.' },
      { user: 'Mike', comment: 'Love the homemade croutons in this recipe. So crispy!' },
      { user: 'Emma', comment: 'This is my go-to salad recipe. Always a hit!' },
    ],
    more: {
      prep_time: '10 mins',
      cook_time: '0 mins',
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
      '1. Peel and quarter potatoes into even pieces\n2. Boil in salted water until fork-tender (15-20 minutes)\n3. Drain thoroughly and return to pot\n4. Add butter, minced garlic, and warm milk\n5. Mash until smooth and creamy\n6. Season with salt and pepper to taste\n7. Serve hot with extra butter on top',
    tags: ['comfort food', 'garlic', 'creamy', 'traditional', 'potatoes'],
    ingredients: [
      { name: 'Russet potatoes', quantity: '2 lbs' },
      { name: 'Butter', quantity: '4 tbsp' },
      { name: 'Garlic cloves', quantity: '4 minced' },
      { name: 'Milk', quantity: '1/2 cup warm' },
      { name: 'Salt', quantity: '1 tsp' },
      { name: 'Black pepper', quantity: '1/2 tsp' },
      { name: 'Fresh chives', quantity: '2 tbsp chopped' },
    ],
    comments: [
      { user: 'Emma', comment: 'The garlic really makes this special! So creamy.' },
      { user: 'John', comment: 'Perfect side for any main dish. My family loves it!' },
      { user: 'Chef Sarah', comment: "Best mashed potatoes I've ever made!" },
    ],
    more: {
      prep_time: '15 mins',
      cook_time: '20 mins',
      servings: '6',
      difficulty: 'Easy',
      source: "Grandma's Kitchen",
    },
  },
  {
    menuId: 3,
    name: 'Roasted Brussels Sprouts',
    thumbnail_image:
      'https://savoryspin.com/wp-content/uploads/2024/11/My-favorite-Oven-Roasted-Brussels-sprouts-with-Berbere.jpg',
    category: 'sides',
    instructions:
      '1. Preheat oven to 400°F (200°C)\n2. Trim and halve Brussels sprouts evenly\n3. Toss with olive oil, salt, and pepper\n4. Spread on baking sheet in single layer\n5. Roast for 20-25 minutes until golden and crispy\n6. Drizzle with balsamic glaze before serving\n7. Garnish with fresh herbs if desired',
    tags: ['healthy', 'roasted', 'vegetables', 'balsamic', 'low-carb'],
    ingredients: [
      { name: 'Brussels sprouts', quantity: '1 lb' },
      { name: 'Olive oil', quantity: '2 tbsp' },
      { name: 'Salt', quantity: '1 tsp' },
      { name: 'Black pepper', quantity: '1/2 tsp' },
      { name: 'Balsamic glaze', quantity: '2 tbsp' },
      { name: 'Parmesan cheese', quantity: '1/4 cup grated' },
    ],
    comments: [
      { user: 'Lisa', comment: 'Even my kids love these! So crispy and delicious.' },
      { user: 'David', comment: 'The balsamic glaze is the perfect touch. Amazing!' },
      { user: 'Health Nut', comment: 'Perfect healthy side dish. Making this weekly!' },
    ],
    more: {
      prep_time: '10 mins',
      cook_time: '25 mins',
      servings: '4',
      difficulty: 'Easy',
      source: 'Healthy Living Magazine',
    },
  },
  {
    menuId: 4,
    name: 'Fluffy Pancakes',
    thumbnail_image:
      'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=387',
    category: 'breakfast',
    instructions:
      '1. Mix all dry ingredients in a large bowl\n2. Whisk wet ingredients in separate bowl\n3. Combine wet and dry ingredients gently\n4. Heat griddle or pan over medium heat\n5. Pour batter and cook until bubbles form\n6. Flip and cook until golden brown\n7. Serve with syrup, butter, and fresh berries',
    tags: ['breakfast', 'fluffy', 'sweet', 'family favorite', 'weekend'],
    ingredients: [
      { name: 'All-purpose flour', quantity: '2 cups' },
      { name: 'Sugar', quantity: '2 tbsp' },
      { name: 'Baking powder', quantity: '2 tsp' },
      { name: 'Salt', quantity: '1/2 tsp' },
      { name: 'Eggs', quantity: '2 large' },
      { name: 'Milk', quantity: '1 1/2 cups' },
      { name: 'Butter', quantity: '3 tbsp melted' },
      { name: 'Vanilla extract', quantity: '1 tsp' },
    ],
    comments: [
      { user: 'Mom', comment: 'Perfect Sunday morning treat! Kids love them.' },
      { user: 'Tom', comment: 'My kids ask for these every weekend. So fluffy!' },
      { user: 'Breakfast Lover', comment: 'Best pancake recipe ever. Never fails!' },
    ],
    more: {
      prep_time: '10 mins',
      cook_time: '15 mins',
      servings: '4',
      difficulty: 'Easy',
      source: 'Family Breakfast Book',
    },
  },
  {
    menuId: 5,
    name: 'Avocado Toast',
    thumbnail_image:
      'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1000&q=80',
    category: 'breakfast',
    instructions:
      '1. Toast bread slices until golden\n2. Mash avocado with lime juice and salt\n3. Spread avocado mixture on toast\n4. Add toppings of choice (tomatoes, seeds, etc.)\n5. Season with salt, pepper, and red pepper flakes\n6. Serve immediately while fresh',
    tags: ['healthy', 'quick', 'avocado', 'modern', 'instagram-worthy'],
    ingredients: [
      { name: 'Sourdough bread', quantity: '4 slices' },
      { name: 'Avocados', quantity: '2 ripe' },
      { name: 'Lime juice', quantity: '1 tbsp' },
      { name: 'Salt', quantity: 'to taste' },
      { name: 'Red pepper flakes', quantity: 'pinch' },
      { name: 'Cherry tomatoes', quantity: '1/2 cup halved' },
    ],
    comments: [
      { user: 'Anna', comment: 'So simple yet so delicious! Perfect breakfast.' },
      { user: 'Chris', comment: 'Perfect healthy breakfast option. Love the crunch!' },
      { user: 'Foodie', comment: 'Instagram-worthy and absolutely delicious!' },
    ],
    more: {
      prep_time: '5 mins',
      cook_time: '2 mins',
      servings: '2',
      difficulty: 'Easy',
      source: 'Modern Breakfast Guide',
    },
  },
  {
    menuId: 6,
    name: 'Paneer Butter Masala',
    thumbnail_image:
      'https://mealpractice.b-cdn.net/47023705355849728/paneer-tikka-masala-with-garlic-naan-bpst8g22r6.webp',
    category: 'entrees',
    instructions:
      '1. Cut paneer into cubes and fry until golden\n2. Make tomato-based gravy with onions and spices\n3. Add cream and butter to gravy\n4. Add fried paneer to gravy\n5. Simmer and serve with naan or rice',
    tags: ['vegetarian', 'indian', 'creamy', 'paneer', 'curry'],
    ingredients: [
      { name: 'Paneer', quantity: '300g' },
      { name: 'Tomatoes', quantity: '4 large' },
      { name: 'Onions', quantity: '2 medium' },
      { name: 'Cream', quantity: '1/2 cup' },
      { name: 'Butter', quantity: '4 tbsp' },
      { name: 'Ginger garlic paste', quantity: '2 tbsp' },
      { name: 'Garam masala', quantity: '1 tsp' },
    ],
    comments: [
      { user: 'Vegetarian', comment: 'Perfect paneer curry! So creamy and delicious.' },
      { user: 'Indian Food Fan', comment: 'Authentic taste! Perfect with naan bread.' },
      { user: 'Spice Lover', comment: 'The gravy is amazing. Rich and flavorful!' },
    ],
    more: {
      prep_time: '15 mins',
      cook_time: '25 mins',
      servings: '4',
      difficulty: 'Medium',
      source: 'Indian Kitchen',
    },
  },
  {
    menuId: 7,
    name: 'Chocolate Chip Cookies',
    thumbnail_image:
      'https://media.istockphoto.com/id/1265001647/photo/chocolate-chip-cookies.jpg?s=612x612&w=0&k=20&c=3fhn-GzRbWuHJmjWbjaga5mkD9S673OtJv9gMUSSoBo=',
    category: 'desserts',
    instructions:
      '1. Preheat oven to 375°F (190°C)\n2. Cream butter and sugars until fluffy\n3. Add eggs and vanilla extract\n4. Mix in flour and baking soda gradually\n5. Fold in chocolate chips gently\n6. Drop rounded tablespoons onto baking sheet\n7. Bake 9-11 minutes until golden edges\n8. Cool on wire rack before serving',
    tags: ['sweet', 'chocolate', 'baking', 'classic', 'homemade'],
    ingredients: [
      { name: 'All-purpose flour', quantity: '2 1/4 cups' },
      { name: 'Butter', quantity: '1 cup softened' },
      { name: 'Brown sugar', quantity: '3/4 cup' },
      { name: 'White sugar', quantity: '1/4 cup' },
      { name: 'Eggs', quantity: '2 large' },
      { name: 'Vanilla extract', quantity: '2 tsp' },
      { name: 'Baking soda', quantity: '1 tsp' },
      { name: 'Chocolate chips', quantity: '2 cups' },
    ],
    comments: [
      { user: 'Baking Queen', comment: 'These are absolutely perfect! So chewy and delicious.' },
      { user: 'Cookie Monster', comment: 'Best chocolate chip cookies ever! Making these weekly.' },
      { user: 'Sweet Tooth', comment: 'Perfect balance of crispy and chewy. Amazing!' },
    ],
    more: {
      prep_time: '15 mins',
      cook_time: '10 mins',
      servings: '24',
      difficulty: 'Easy',
      source: "Grandma's Cookie Jar",
    },
  },
  {
    menuId: 8,
    name: 'Fresh Lemonade',
    thumbnail_image:
      'https://img.freepik.com/premium-photo/lemonade-most-amazing-trending-hd-wallpaper_915071-53200.jpg',
    category: 'drinks',
    instructions:
      '1. Juice fresh lemons to get 1 cup of juice\n2. Make simple syrup by heating sugar and water\n3. Combine lemon juice and cooled syrup\n4. Add cold water to taste (usually 3-4 cups)\n5. Serve over plenty of ice\n6. Garnish with lemon slices and mint\n7. Enjoy this refreshing summer drink!',
    tags: ['refreshing', 'summer', 'citrus', 'homemade', 'healthy'],
    ingredients: [
      { name: 'Fresh lemons', quantity: '6-8 large' },
      { name: 'Sugar', quantity: '1 cup' },
      { name: 'Water', quantity: '4 cups' },
      { name: 'Ice cubes', quantity: 'as needed' },
      { name: 'Fresh mint', quantity: 'for garnish' },
    ],
    comments: [
      { user: 'Summer Lover', comment: 'Perfect for hot summer days! So refreshing.' },
      { user: 'Lemon Fan', comment: 'Nothing beats fresh lemonade. This is the best!' },
      { user: 'Thirsty', comment: 'Made this for a party and everyone loved it!' },
    ],
    more: {
      prep_time: '10 mins',
      cook_time: '5 mins',
      servings: '6',
      difficulty: 'Easy',
      source: 'Summer Drinks Collection',
    },
  },
  {
    menuId: 9,
    name: 'Idli with Sambar',
    thumbnail_image:
      'https://img.freepik.com/premium-photo/idly-sambar-idli-with-sambhar-green-red-chutney-popular-south-indian-breakfast_999766-2544.jpg',
    category: 'breakfast',
    instructions:
      '1. Soak rice and urad dal separately for 4-6 hours\n2. Grind to smooth batter, mix together\n3. Ferment overnight in warm place\n4. Pour batter into idli molds\n5. Steam for 10-12 minutes\n6. Serve hot with sambar and coconut chutney',
    tags: ['indian', 'healthy', 'fermented', 'traditional', 'south indian'],
    ingredients: [
      { name: 'Raw rice', quantity: '2 cups' },
      { name: 'Urad dal', quantity: '1 cup' },
      { name: 'Salt', quantity: 'to taste' },
      { name: 'Water', quantity: 'as needed' },
      { name: 'Oil', quantity: '1 tsp' },
    ],
    comments: [
      { user: 'South Indian', comment: 'Perfect traditional breakfast! So soft and fluffy.' },
      { user: 'Health Conscious', comment: 'Great probiotic food. Love the fermentation process!' },
      { user: 'Chef', comment: 'Authentic South Indian recipe. Brings back childhood memories.' },
    ],
    more: {
      prep_time: '30 mins',
      cook_time: '15 mins',
      servings: '4',
      difficulty: 'Medium',
      source: 'South Indian Kitchen',
    },
  },
  {
    menuId: 10,
    name: 'Masala Dosa',
    thumbnail_image:
      'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    category: 'breakfast',
    instructions:
      '1. Prepare dosa batter (rice and urad dal)\n2. Make potato masala filling\n3. Heat tawa, pour batter in circular motion\n4. Add oil, cook until crispy\n5. Add potato masala in center\n6. Fold dosa and serve hot',
    tags: ['indian', 'crispy', 'spicy', 'street food', 'south indian'],
    ingredients: [
      { name: 'Dosa batter', quantity: '2 cups' },
      { name: 'Potatoes', quantity: '3 medium' },
      { name: 'Onions', quantity: '2 medium' },
      { name: 'Green chilies', quantity: '3-4' },
      { name: 'Turmeric', quantity: '1/2 tsp' },
      { name: 'Mustard seeds', quantity: '1 tsp' },
      { name: 'Curry leaves', quantity: '10-12' },
    ],
    comments: [
      { user: 'Dosa Lover', comment: 'Crispy and delicious! Perfect street food at home.' },
      { user: 'Spice Fan', comment: 'The masala filling is amazing. So flavorful!' },
      { user: 'Breakfast King', comment: 'Best breakfast ever. Making this every weekend!' },
    ],
    more: {
      prep_time: '20 mins',
      cook_time: '10 mins',
      servings: '3',
      difficulty: 'Medium',
      source: 'Street Food Special',
    },
  },
  {
    menuId: 11,
    name: 'Vegetable Biryani',
    thumbnail_image: 'https://wallpaperaccess.com/full/8734324.jpg',
    category: 'lunch',
    instructions:
      '1. Soak basmati rice for 30 minutes\n2. Prepare mixed vegetables (carrots, beans, peas, potatoes)\n3. Layer rice and vegetables in pot\n4. Add saffron, fried onions, mint\n5. Seal with foil, cook on dum\n6. Serve with raita and salad',
    tags: ['vegetarian', 'indian', 'aromatic', 'rice', 'healthy'],
    ingredients: [
      { name: 'Basmati rice', quantity: '2 cups' },
      { name: 'Mixed vegetables', quantity: '2 cups' },
      { name: 'Yogurt', quantity: '1/2 cup' },
      { name: 'Onions', quantity: '4 large' },
      { name: 'Ginger garlic paste', quantity: '2 tbsp' },
      { name: 'Biryani masala', quantity: '2 tbsp' },
      { name: 'Saffron', quantity: 'pinch' },
    ],
    comments: [
      { user: 'Vegetarian', comment: 'Perfect veg biryani! So aromatic and delicious.' },
      { user: 'Healthy Eater', comment: 'Great way to eat vegetables. So flavorful!' },
      { user: 'Rice Lover', comment: 'This is restaurant quality veg biryani at home!' },
    ],
    more: {
      prep_time: '30 mins',
      cook_time: '45 mins',
      servings: '6',
      difficulty: 'Medium',
      source: 'Vegetarian Kitchen',
    },
  },
  {
    menuId: 12,
    name: 'Dal Makhani',
    thumbnail_image:
      'https://www.shutterstock.com/image-photo/dal-makhani-makhni-popular-dish-600nw-1204892983.jpg',
    category: 'lunch',
    instructions:
      '1. Soak black urad dal overnight\n2. Pressure cook dal until soft\n3. Heat butter, add onions and tomatoes\n4. Add spices and cooked dal\n5. Simmer for 30 minutes\n6. Add cream and butter, serve hot',
    tags: ['indian', 'creamy', 'comfort food', 'vegetarian', 'rich'],
    ingredients: [
      { name: 'Black urad dal', quantity: '1 cup' },
      { name: 'Rajma', quantity: '1/4 cup' },
      { name: 'Butter', quantity: '4 tbsp' },
      { name: 'Cream', quantity: '1/2 cup' },
      { name: 'Onions', quantity: '2 medium' },
      { name: 'Tomatoes', quantity: '3 large' },
      { name: 'Ginger garlic paste', quantity: '1 tbsp' },
    ],
    comments: [
      { user: 'Dal Lover', comment: 'Creamy and rich! Perfect comfort food.' },
      { user: 'Vegetarian', comment: 'Best dal recipe ever. So satisfying!' },
      { user: 'North Indian', comment: 'Authentic Punjabi dal makhani. Delicious!' },
    ],
    more: {
      prep_time: '30 mins',
      cook_time: '45 mins',
      servings: '4',
      difficulty: 'Medium',
      source: 'Punjabi Kitchen',
    },
  },
  {
    menuId: 13,
    name: 'Chana Masala',
    thumbnail_image: 'https://www.thekitchykitchen.com/wp-content/uploads/2013/08/DSC_2815.jpg',
    category: 'entrees',
    instructions:
      '1. Soak chickpeas overnight and cook until tender\n2. Sauté onions, tomatoes and spices\n3. Add cooked chickpeas and simmer\n4. Garnish with cilantro and serve with rice or naan',
    tags: ['vegetarian', 'protein-rich', 'spicy', 'comfort food'],
    ingredients: [
      { name: 'Chickpeas', quantity: '2 cups cooked' },
      { name: 'Onions', quantity: '2 medium' },
      { name: 'Tomatoes', quantity: '3 large' },
      { name: 'Ginger garlic paste', quantity: '1 tbsp' },
      { name: 'Chana masala powder', quantity: '2 tbsp' },
      { name: 'Cilantro', quantity: 'for garnish' },
    ],
    comments: [
      { user: 'Comfort Food Fan', comment: 'Hearty and full of flavor. Perfect with rice!' },
      { user: 'Spice Lover', comment: 'Great tang and spice balance.' },
      { user: 'Home Cook', comment: 'Family favorite, makes great leftovers.' },
    ],
    more: {
      prep_time: '15 mins',
      cook_time: '35 mins',
      servings: '4',
      difficulty: 'Medium',
      source: 'Street Food Classics',
    },
  },
  {
    menuId: 14,
    name: 'Veg Maggi Noodles',
    thumbnail_image:
      'https://t3.ftcdn.net/jpg/10/05/36/42/240_F_1005364296_LjHZuKz506g99t1HLFHzFXX9x9uyKp3u.jpg',
    category: 'entrees',
    instructions:
      '1. Boil water and add maggi noodles\n2. Add masala and mixed vegetables\n3. Cook until vegetables are tender and noodles are soft\n4. Garnish with spring onions and serve hot',
    tags: ['quick', 'comfort food', 'instant', 'college favorite', 'easy'],
    ingredients: [
      { name: 'Maggi noodles', quantity: '2 packets' },
      { name: 'Onions', quantity: '1 medium' },
      { name: 'Tomatoes', quantity: '1 medium' },
      { name: 'Capsicum', quantity: '1/2' },
      { name: 'Mixed peas & carrots', quantity: '1 cup' },
      { name: 'Oil', quantity: '1 tbsp' },
      { name: 'Water', quantity: '2 cups' },
    ],
    comments: [
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
    tags: ['indian chinese', 'vegetarian', 'crispy', 'spicy', 'fusion'],
    ingredients: [
      { name: 'Cauliflower', quantity: '1 medium' },
      { name: 'All-purpose flour', quantity: '1/2 cup' },
      { name: 'Cornflour', quantity: '1/4 cup' },
      { name: 'Onions', quantity: '2 medium' },
      { name: 'Capsicum', quantity: '1' },
      { name: 'Soy sauce', quantity: '2 tbsp' },
      { name: 'Ginger garlic paste', quantity: '1 tbsp' },
    ],
    comments: [
      { user: 'Vegetarian', comment: 'Perfect vegetarian dish! So crispy and flavorful.' },
      { user: 'Fusion Food Fan', comment: 'Love the Indo-Chinese fusion. Delicious!' },
      { user: 'Cauliflower Lover', comment: 'Best way to eat cauliflower. Restaurant style!' },
    ],
    more: {
      prep_time: '20 mins',
      cook_time: '15 mins',
      servings: '4',
      difficulty: 'Medium',
      source: 'Indo-Chinese Fusion',
    },
  },
  {
    menuId: 16,
    name: 'Mango Lassi',
    thumbnail_image:
      'https://media.istockphoto.com/id/1365859011/photo/drink-mango-lassi-in-two-glasses-on-rustic-concrete-table-with-fresh-ripe-cut-manfo-from-above.jpg?s=612x612&w=0&k=20&c=uHnr_0raQDe2sgUYHdP5GSa2raaj3ILG4m1cmFHtVJA=',
    category: 'drinks',
    instructions:
      '1. Peel and chop ripe mangoes\n2. Blend mango with yogurt\n3. Add sugar and cardamom powder\n4. Blend until smooth\n5. Add ice cubes and blend again\n6. Serve chilled in glasses',
    tags: ['indian', 'refreshing', 'sweet', 'summer', 'yogurt'],
    ingredients: [
      { name: 'Ripe mangoes', quantity: '2 large' },
      { name: 'Yogurt', quantity: '1 cup' },
      { name: 'Sugar', quantity: '2 tbsp' },
      { name: 'Cardamom powder', quantity: '1/4 tsp' },
      { name: 'Ice cubes', quantity: '4-5' },
      { name: 'Milk', quantity: '1/4 cup' },
    ],
    comments: [
      { user: 'Mango Lover', comment: 'Perfect summer drink! So refreshing and sweet.' },
      { user: 'Yogurt Fan', comment: 'Great probiotic drink. Healthy and delicious!' },
      { user: 'Summer Drinker', comment: 'Best way to beat the heat. Love it!' },
    ],
    more: {
      prep_time: '10 mins',
      cook_time: '0 mins',
      servings: '2',
      difficulty: 'Easy',
      source: 'Indian Summer Drinks',
    },
  },
  {
    menuId: 17,
    name: 'Chocolate Milkshake',
    thumbnail_image:
      'https://images.unsplash.com/photo-1572490122747-3968b75cc699?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'drinks',
    instructions:
      '1. Add milk, chocolate syrup, and ice cream to blender\n2. Add a pinch of salt and vanilla extract\n3. Blend until smooth and frothy\n4. Add more ice cream for thickness\n5. Pour into tall glasses\n6. Top with whipped cream and chocolate chips',
    tags: ['sweet', 'chocolate', 'milkshake', 'dessert drink', 'indulgent'],
    ingredients: [
      { name: 'Milk', quantity: '2 cups' },
      { name: 'Chocolate syrup', quantity: '3 tbsp' },
      { name: 'Vanilla ice cream', quantity: '2 scoops' },
      { name: 'Chocolate chips', quantity: '2 tbsp' },
      { name: 'Whipped cream', quantity: 'for topping' },
      { name: 'Vanilla extract', quantity: '1/2 tsp' },
    ],
    comments: [
      { user: 'Chocolate Fan', comment: 'Rich and creamy! Perfect dessert drink.' },
      { user: 'Sweet Tooth', comment: 'Indulgent treat. Kids and adults love it!' },
      { user: 'Milkshake Lover', comment: 'Best chocolate milkshake recipe. So thick and delicious!' },
    ],
    more: {
      prep_time: '5 mins',
      cook_time: '0 mins',
      servings: '2',
      difficulty: 'Easy',
      source: 'Dessert Drinks',
    },
  },
  {
    menuId: 18,
    name: 'Gulab Jamun',
    thumbnail_image:
      'https://bikanermawabhandar.com/wp-content/uploads/2024/04/WhatsApp-Image-2024-04-16-at-16.59.43.jpeg',
    category: 'desserts',
    instructions:
      '1. Mix khoya, flour, and baking soda\n2. Add milk gradually to make soft dough\n3. Make small balls and deep fry\n4. Make sugar syrup with cardamom\n5. Soak fried balls in warm syrup\n6. Serve warm or cold',
    tags: ['indian', 'sweet', 'festive', 'traditional', 'syrup'],
    ingredients: [
      { name: 'Khoya', quantity: '200g' },
      { name: 'All-purpose flour', quantity: '2 tbsp' },
      { name: 'Baking soda', quantity: 'pinch' },
      { name: 'Sugar', quantity: '1 cup' },
      { name: 'Cardamom', quantity: '4-5 pods' },
      { name: 'Rose water', quantity: '1 tsp' },
      { name: 'Oil', quantity: 'for frying' },
    ],
    comments: [
      { user: 'Sweet Lover', comment: 'Perfect Indian dessert! Soft and syrupy.' },
      { user: 'Festive Food', comment: 'Great for festivals. Traditional and delicious!' },
      { user: 'Dessert Expert', comment: 'Authentic recipe. Brings back childhood memories!' },
    ],
    more: {
      prep_time: '30 mins',
      cook_time: '20 mins',
      servings: '6',
      difficulty: 'Medium',
      source: 'Traditional Indian Desserts',
    },
  },
];

// Normalize to match ItemModel (menuId -> menuid, more -> [more])
function normalize(rec) {
  const { menuId, more, ...rest } = rec;
  return {
    ...rest,
    menuid: typeof menuId === 'number' ? menuId : Number(menuId),
    more: more ? [more] : [],
    comments: Array.isArray(rec.comments) ? rec.comments : [],
    ingredients: Array.isArray(rec.ingredients) ? rec.ingredients : [],
  };
}

async function seed() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected.');

    console.log('Clearing existing items...');
    await Item.deleteMany({});

    const payload = sampleRecipes.map(normalize);
    console.log(`Inserting ${payload.length} items...`);
    await Item.insertMany(payload);

    const count = await Item.countDocuments();
    console.log(`Total recipes in database: ${count}`);
  } catch (err) {
    console.error('Seed error:', err.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected.');
  }
}

seed();
