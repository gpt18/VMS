const express = require('express');
const { userRegister } = require('../controllers/auth');

const router = express.Router();

router.post('/user/register', userRegister);

module.exports = router;