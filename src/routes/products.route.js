const express = require('express');
const Product = require('../models/products.model');
const router = express.Router();
const {getProducts, getProduct, createProduct, updateProduct, deleteProduct} = require('../controllers/products.controller');


router.get('/', getProducts);

router.get('/:productid', getProduct);

router.post('/', createProduct);

router.put('/:productid', updateProduct);

router.delete('/:productid', deleteProduct);

module.exports = router;