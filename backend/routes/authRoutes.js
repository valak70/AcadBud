const express = require('express');
const router = express.Router();
const { register, login, logout, getCurrentUser, verifyEmail } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const { verify } = require('jsonwebtoken');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', authMiddleware, getCurrentUser);
router.get('/verify-email', verifyEmail);

module.exports = router;
