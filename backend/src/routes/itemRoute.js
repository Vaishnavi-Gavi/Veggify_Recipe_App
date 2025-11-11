const express=require('express');
const router=express.Router();
const ItemController=require("../controllers/itemController")
router.get("/all-items",ItemController.getAllItems);
router.get("/items",ItemController.getSearchedItems);
router.get("/items/:id",ItemController.getSingleItem);
router.post("/items",ItemController.createItem);
router.put("/items/:id", ItemController.updateItem);
router.delete("/items/:id", ItemController.deleteItem);
module.exports=router;