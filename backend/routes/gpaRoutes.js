const express = require('express');
const router = express.Router();
const requireAuth = require('../middlewares/requireAuth');
const { calculateGPA, calculateCGPA } = require('../controllers/gpaController');

router.use(requireAuth); // Auth middleware for all routes

router.get('/calculate', calculateGPA);
router.get('/cgpa', calculateCGPA);

module.exports = router;
