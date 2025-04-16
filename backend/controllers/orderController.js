const Order = require('../models/Order');
const CartItem = require('../models/CartItem');
const Product = require('../models/Product');
const { v4: uuidv4 } = require('uuid');

exports.checkout = async (req, res) => {
  try {
    const userID = req.userID;
    const cartItems = await CartItem.find({ userID });

    if (cartItems.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    let totalPrice = 0;
    const products = [];

    for (const item of cartItems) {
      const product = await Product.findOne({ productID: item.productID });
      if (!product) continue;

      if (product.stock < item.quantity) {
        return res.status(400).json({ message: `Not enough stock for ${product.title}` });
      }

      product.stock -= item.quantity;
      await product.save();

      totalPrice += product.price * item.quantity;
      products.push({
        productID: product.productID,
        title: product.title,
        price: product.price,
        quantity: item.quantity
      });
    }

    const order = new Order({
      orderID: uuidv4(),
      userID,
      totalprice: totalPrice,
      products
    });

    await order.save();
    await CartItem.deleteMany({ userID });

    res.status(200).json({ message: 'Order placed successfully', order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

