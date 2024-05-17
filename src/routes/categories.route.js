const express = require('express');
const Category = require('../models/categories.model');
const router = express.Router();
const {getCategories, getCategory, createCategory, updateCategory, deleteCategory} = require('../controllers/categories.controller');

router.get('/', getCategories);
router.get('/:categoryid', getCategory);
router.post('/', createCategory);
router.put('/:categoryid', updateCategory);
router.delete('/:categoryid', deleteCategory);



module.exports = router;