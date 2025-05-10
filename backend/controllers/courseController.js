const User = require('../models/User');
const { removeTimetableEntriesByCourseId } = require('./timetableController');
const mongoose = require('mongoose');
// Generate subject code if missing
const generateSubjectCode = (name) => {
  const initials = name
    .split(' ')
    .map(w => w[0].toUpperCase())
    .join('');
  return initials + Math.floor(100 + Math.random() * 900);
};

exports.addCourse = async (req, res) => {
    try {
      const { subjectName, subjectCode, credits, expectedGrade } = req.body;
      if (!subjectName) return res.status(400).json({ message: "subjectName is required" });
      const user = await User.findById(req.userId);
      const code = subjectCode || generateSubjectCode(subjectName);
  
      const exists = user.courses.find(c => c.subjectCode === code);
      if (exists) return res.status(409).json({ message: "Course with this code already exists" });
  
      user.courses.push({ subjectName, subjectCode: code, credits, expectedGrade });
      await user.save();
  
      res.json({ message: "Course added successfully", subjectCode: code });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  };

  exports.updateCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { subjectCode, subjectName, credits, expectedGrade } = req.body;

    const user = await User.findById(req.userId);
    const course = user.courses.id(courseId);

    if (!course) return res.status(404).json({ message: "Course not found" });

    if (subjectCode !== undefined) course.subjectCode = subjectCode;
    if (subjectName !== undefined) course.subjectName = subjectName;
    if (credits !== undefined) course.credits = credits;
    if (expectedGrade !== undefined) course.expectedGrade = expectedGrade;

    await user.save();
    res.json({ message: "Course updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

  

// Get all courses
exports.getCourses = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json(user.courses || []);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getCourseById = async (req, res) => {
  const { courseId } = req.params;
  try {
    const user = await User.findById(req.userId);
    const course = user.courses.id(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json(course);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const user = req.user;

    const before = user.courses.length;
    user.courses = user.courses.filter(course => !course._id.equals(courseId));
    if (user.courses.length === before) {
      return res.status(404).json({ message: "Course not found" });
    }

    await user.save(); // Save after removing course

    // Now remove timetable entries
    await removeTimetableEntriesByCourseId(user, courseId);
    await user.save(); // Save after modifying timetable

    res.json({ message: "Course and related timetable entries deleted successfully." });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};



