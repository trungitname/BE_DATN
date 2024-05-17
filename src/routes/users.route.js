const express = require('express');
const User = require('../models/users.model');
const router = express.Router();
const {getUsers, getUser, createUser, updateUser, deleteUser} = require('../controllers/users.controller');

router.get('/', getUsers);
router.get('/:userid', getUser);
router.post('/', createUser);
router.put('/:userid', updateUser);
router.delete('/:userid', deleteUser);


module.exports = router;