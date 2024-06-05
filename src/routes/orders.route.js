const express = require('express');
const Order = require('../models/orders.model');
const router = express.Router();
const {getOrders, getOrder, createOrder, updateOrder, deleteOrder} = require('../controllers/orders.controller');

router.get('/', getOrders);
router.get('/:orderid', getOrder);
router.post('/', createOrder);
router.put('/:orderid', updateOrder)
router.delete('/:orderid', deleteOrder);

module.exports = router;
