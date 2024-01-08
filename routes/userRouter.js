const express = require('express');
const router = express.Router();
const { createUser, getUsers, authUser } = require('../controllers/userController');

router.post('/users', createUser);
router.post('/users/auth', authUser);
router.get('/users', getUsers);

module.exports = router;