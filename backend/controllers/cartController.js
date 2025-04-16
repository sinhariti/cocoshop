const CartItem = require('../models/CartItem');
const Product = require('../models/Product');

const addToCart = async (req, res) => {
  try {
    const userID = req.userID;
    const { productID, quantity } = req.body;

    let item = await CartItem.findOne({ userID, productID });

    const product = await Product.findOne({ productID });
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }
    
    if (product.stock <= 0) {
        return res.status(400).json({ message: 'Product is out of stock' });
    }

    if (product.stock < quantity) {
        return res.status(400).json({ message: 'Insufficient stock' });
    }
    
    if (item) item.quantity += quantity;
    else item = new CartItem({ userID, productID, quantity });

    await item.save();
    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateCartItem = async (req, res) => {
  try {
    const userID = req.userID;
    const { productID, quantity } = req.body;
    const updated = await CartItem.findOneAndUpdate(
      { userID, productID },
      { quantity },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: 'Item not found in cart' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getCartByUser = async (req, res) => {
    try {
        const userID = req.userID; // pulled from the token
        const cart = await CartItem.find({ userID });
        res.json(cart);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
};

const removeCartItem = async (req, res) => {
  try {
    const userID = req.userID;
    const { productID } = req.body;
    await CartItem.findOneAndDelete({ userID, productID });
    res.json({ message: 'Item removed from cart' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
    addToCart,
    updateCartItem,
    getCartByUser,
    removeCartItem
}
