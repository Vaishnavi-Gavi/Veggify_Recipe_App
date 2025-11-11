const  Item=require("../model/ItemModel")
const mongoose = require('mongoose');

const  getAllItems= async(req,res)=>{
   const result=await Item.find().sort({createAt: -1});
   res.status(200).json(result);
}
const getSearchedItems =async (req, res) => {
    const { q }= req.query;
    console.log(q);
    try{
        let items = [];
        console.log('Search query:', q);
        if (q && q.toString().trim() !== ''){
            // search by name (case-insensitive)
            items = await Item.find({ name: { $regex: q, $options: 'i' } });
        } else {
            // no query provided -> return all items (same behaviour as getAllItems)
            items = await Item.find();
        }
        console.log('Found items:', Array.isArray(items) ? items.length : 0);
        return res.status(200).json(items);
    }
    catch(error){
        res.status(500).json({message:"No Items Found"})

    }
    
}
const getSingleItem =async (req, res) => {
    const { id }= req.params;
    try{
        let item = null;
        if (mongoose.Types.ObjectId.isValid(id)) {
            item = await Item.findById(id);
        } else {
            const menuid = isNaN(Number(id)) ? id : Number(id);
            item = await Item.findOne({ menuid });
        }
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        return res.status(200).json(item);
    }
    catch(error){
        return res.status(500).json({message:"No Items Found"});
    }
}

const createItem = async (req, res) => {
    try {
        const itemData = req.body;
        // Ensure comments array exists
        if (!itemData.comments) {
            itemData.comments = [];
        }
        const newItem = new Item(itemData);
        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        console.error('Error creating item:', error);
        res.status(500).json({ message: 'Failed to create recipe', error: error.message });
    }
}

// Update item by id (supports ObjectId or numeric/string menuid)
const updateItem = async (req, res) => {
    const { id } = req.params;
    try {
        let updated = null;
        if (mongoose.Types.ObjectId.isValid(id)) {
            updated = await Item.findByIdAndUpdate(id, req.body, { new: true });
        } else {
            const menuid = isNaN(Number(id)) ? id : Number(id);
            updated = await Item.findOneAndUpdate({ menuid }, req.body, { new: true });
        }
        if (!updated) {
            return res.status(404).json({ message: 'Item not found' });
        }
        return res.status(200).json(updated);
    } catch (error) {
        console.error('Error updating item:', error);
        return res.status(500).json({ message: 'Failed to update item', error: error.message });
    }
}

// Delete item by id (supports ObjectId or numeric/string menuid)
const deleteItem = async (req, res) => {
    const { id } = req.params;
    try {
        let result = null;
        if (mongoose.Types.ObjectId.isValid(id)) {
            result = await Item.findByIdAndDelete(id);
        } else {
            const menuid = isNaN(Number(id)) ? id : Number(id);
            result = await Item.findOneAndDelete({ menuid });
        }
        if (!result) {
            return res.status(404).json({ message: 'Item not found' });
        }
        return res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
        console.error('Error deleting item:', error);
        return res.status(500).json({ message: 'Failed to delete item', error: error.message });
    }
}

module.exports={
    getAllItems,
    getSearchedItems,
    getSingleItem,
    createItem,
    updateItem,
    deleteItem
}