const express = require('express');
const { handleUserRegister, handleUserLogin, handlePermission, handleSendVerificationEmail, handleVerifyEmail, } = require('../controllers/auth.controller');

const router = express.Router();

router.post('/register', handleUserRegister);

router.post("/login", handleUserLogin);

router.get('/auth', handlePermission);

router.post('/verify-email', handleSendVerificationEmail);

router.get('/verify', handleVerifyEmail);

module.exports = router;