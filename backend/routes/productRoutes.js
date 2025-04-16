const express = require('express');
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');

// Create product
router.post('/', createProduct);

// Get all products
router.get('/', getAllProducts);

// Get one product by productID
router.get('/:productID', getProductById);

// Update product by productID
router.put('/:productID', updateProduct);

// Delete product by productID
router.delete('/:productID', deleteProduct);

module.exports = router;
