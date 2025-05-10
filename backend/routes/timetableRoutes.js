const express = require('express');
const router = express.Router();
const requireAuth = require('../middlewares/requireAuth');
const { getTimetable, updateTimetable, removeSingleEntry, removeAllEntriesForSubject } = require('../controllers/timetableController');

router.use(requireAuth); // All routes protected

router.get('/', getTimetable);
router.put('/', updateTimetable);
router.delete('/entry', removeSingleEntry);
router.delete('/course/:courseId', removeAllEntriesForSubject);

module.exports = router;
