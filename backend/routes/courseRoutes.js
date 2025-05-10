const express = require('express');
const router = express.Router();
const requireAuth = require('../middlewares/requireAuth');
const {
  getCourses,
  deleteCourse,
  getCourseById
} = require('../controllers/courseController');
const { updateCourse } = require('../controllers/courseController');
const { addCourse } = require('../controllers/courseController');
const auth = require('../middlewares/authMiddleware');

router.use(requireAuth);

router.post('/', auth, addCourse);
router.get('/', auth, getCourses);
router.get('/:courseId', auth, getCourseById);
router.delete('/:courseId', auth, deleteCourse);
router.put('/:courseId', auth, updateCourse);

module.exports = router;
