const express = require('express');
const { handleUserRegister, handleUserLogin, handlePermission, } = require('../controllers/auth.controller');

const router = express.Router();

router.post('/register', handleUserRegister);

router.post("/login", handleUserLogin);

router.get('/auth', handlePermission);

module.exports = router;