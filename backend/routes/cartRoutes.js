const express = require('express');
const router = express.Router();

const {addToCart, updateCartItem, getCartByUser, removeCartItem} = require('../controllers/cartController');
const authenticate = require('../middlewares/auth');


router.post('/add', authenticate, addToCart);
router.put('/update', authenticate, updateCartItem);
router.get('/:userID', authenticate, getCartByUser);
router.delete('/remove', authenticate, removeCartItem);


module.exports = router;
