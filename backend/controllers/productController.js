const Product = require('../models/Product');

// CREATE
const createProduct = async (req, res) => {
  try {
    const { productID, title, category, description, price, stock } = req.body;

    const existing = await Product.findOne({ productID });
    if (existing) return res.status(400).json({ message: 'Product ID already exists' });

    const product = new Product({ productID, title, category, description, price, stock });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ ALL
const getAllProducts = async (req, res) => {
  console.log('Fetching all products');
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ ONE
const getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({ productID: req.params.productID });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
const updateProduct = async (req, res) => {
  try {
    const updated = await Product.findOneAndUpdate(
      { productID: req.params.productID },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Product not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE
const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findOneAndDelete({ productID: req.params.productID });
    if (!deleted) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
};
