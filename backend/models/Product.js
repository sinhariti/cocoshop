const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productID: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  category: { type: String },
  description: { type: String },
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 }
});

module.exports = mongoose.model('Product', productSchema);
