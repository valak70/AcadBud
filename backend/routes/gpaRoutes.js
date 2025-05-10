const express = require('express');
const router = express.Router();
const requireAuth = require('../middlewares/requireAuth');
const { calculateGPA, calculateCGPA } = require('../controllers/gpaController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(requireAuth); // Auth middleware for all routes

router.get('/calculate',authMiddleware, calculateGPA);
router.get('/cgpa',authMiddleware, calculateCGPA);

module.exports = router;
