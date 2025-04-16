const express = require('express');
const router = express.Router();
const { checkout } = require('../controllers/orderController');
const auth = require('../middlewares/auth');

router.post('/checkout', auth, checkout);

module.exports = router;