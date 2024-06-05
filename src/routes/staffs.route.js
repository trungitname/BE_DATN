const express = require('express');
const Staff = require('../models/staffs.model');
const router = express.Router();
const {getStaffs, getStaff, createStaff, updateStaff, deleteStaff} = require('../controllers/staffs.controller');



router.get('/', getStaffs);
router.get('/:staffid', getStaff);
router.post('/', createStaff);
router.put('/:staffid', updateStaff)
router.delete('/:staffid', deleteStaff);



module.exports = router;

