const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderID: { type: String, required: true, unique: true },
  userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  orderedAt: { type: Date, default: Date.now },
  status: { type: String, default: 'ordered' },
  totalprice: { type: Number, required: true },
  products: [
    {
      productID: String,
      title: String,
      price: Number,
      quantity: Number
    }
  ]
});

module.exports = mongoose.model('Order', orderSchema);
