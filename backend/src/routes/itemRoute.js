const express=require('express');
const router=express.Router();
const ItemController=require("../controllers/itemController")
const verifyJWT = require('../middleware/auth');
router.get("/all-items",ItemController.getAllItems);
router.get("/items",ItemController.getSearchedItems);
router.get("/items/:id",ItemController.getSingleItem);
router.post("/items", verifyJWT, ItemController.createItem);
router.put("/items/:id", verifyJWT, ItemController.updateItem);
router.delete("/items/:id", verifyJWT, ItemController.deleteItem);
module.exports=router;