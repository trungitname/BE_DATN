const express = require('express');
const Orderdetail = require('../models/orderdetails.model');
const router = express.Router();
const {cancelOrderDetail, updateOrderStatus, getOrderdetails, getOrderdetail, createOrderdetail, updateOrderdetail, deleteOrderdetail, createOrderDetail} = require('../controllers/orderdetails.controller');

router.get('/', getOrderdetails);
router.get('/:orderdetailid', getOrderdetail);
router.post('/', createOrderdetail);
router.put('/:orderdetailid', updateOrderdetail)
router.delete('/:orderdetailid', deleteOrderdetail);

// API để thanh toán giỏ hàng
router.post('/checkout', createOrderDetail);

router.put('/:orderdetailid/status', updateOrderStatus);
router.put('/:orderdetailid/status', cancelOrderDetail);

module.exports = router;
