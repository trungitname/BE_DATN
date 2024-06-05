const express = require('express');
const Storechane = require('../models/storechain.model');
const router = express.Router();
const {getStorechains, getStorechain, createStorechain, updateStorechain, deleteStorechain} = require('../controllers/storechain.controller');



router.get('/', getStorechains);
router.get('/:storeid', getStorechain);
router.post('/', createStorechain);
router.put('/:storeid', updateStorechain)
router.delete('/:storeid', deleteStorechain);



module.exports = router;

