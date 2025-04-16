const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to user
  productID: { type: String, required: true }, // Reference to product
  quantity: { type: Number, required: true }
});

module.exports = mongoose.model('CartItem', cartItemSchema);
