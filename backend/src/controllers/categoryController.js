const Item = require('../model/ItemModel');

const getCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const normalized = String(category || '').trim();
    if (!normalized) {
      return res.status(400).json({ message: 'Category is required' });
    }

    const query = {
      category: { $regex: new RegExp(`^${normalized}$`, 'i') }
    };

    if (req.query.prep_time) {
      const regex = new RegExp(req.query.prep_time, 'i');
      query['more.prep_time'] = { $regex: regex };
    }

    const items = await Item.find(query);
    return res.status(200).json(items);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getCategory
}