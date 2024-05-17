const express = require('express');
const Product = require('../models/products.model');
const router = express.Router();
const {getProducts, getProduct, createProduct, updateProduct, deleteProduct} = require('../controllers/products.controller');


const multer = require('multer');
const path = require('path');

// Thiết lập cấu hình cho multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, '../assets/images'));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });



router.get('/', getProducts);

router.get('/:productid', getProduct);

router.post('/', upload.single('imageurl'), createProduct);

router.put('/:productid', upload.single('imageurl'),  updateProduct);

router.delete('/:productid', deleteProduct);

module.exports = router;