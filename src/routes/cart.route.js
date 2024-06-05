const express = require('express');
const { getCartItems, addCartItem, removeCartItem } = require('../controllers/cart.controller');

const router = express.Router();

router.get('/:userid/cart', getCartItems);
router.post('/:userid/cart', addCartItem);
router.delete('/:userid/cart/:productid', removeCartItem);

module.exports = router;
