const express = require('express');
const router = express.Router();
const requireAuth = require('../middlewares/requireAuth');
const { markAttendance, getAttendanceSummary } = require('../controllers/attendanceController');

router.use(requireAuth); // Protect all attendance routes

router.post('/mark', markAttendance);
router.get('/summary', getAttendanceSummary);

module.exports = router;
