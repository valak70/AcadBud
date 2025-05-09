const User = require('../models/User');
const { removeTimetableEntriesBySubjectCode } = require('./timetableController');

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
      console.log(req.body);
      
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
      const { subjectCode } = req.params;
      const { subjectName, credits, expectedGrade } = req.body;
  
      const user = await User.findById(req.userId);
      const index = user.courses.findIndex(c => c.subjectCode === subjectCode);
  
      if (index === -1) return res.status(404).json({ message: "Course not found" });
  
      user.courses[index] = {
        ...user.courses[index],
        subjectName: subjectName || user.courses[index].subjectName,
        credits: credits ?? user.courses[index].credits,
        expectedGrade: expectedGrade ?? user.courses[index].expectedGrade
      };
  
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

exports.deleteCourse = async (req, res) => {
  try {
    const { subjectCode } = req.params;
    const { confirm } = req.query;

    const user = await User.findById(req.userId);
    const existsInTimetable = user.timetable.some(entry => entry.subjectCode === subjectCode);

    if (existsInTimetable && confirm !== 'true') {
      return res.status(400).json({
        message: "Course exists in timetable. Add ?confirm=true to also remove related timetable entries."
      });
    }

    if (existsInTimetable && confirm === 'true') {
      await removeTimetableEntriesBySubjectCode(user, subjectCode);
    }

    const before = user.courses.length;
    user.courses = user.courses.filter(course => course.subjectCode !== subjectCode);
    if (user.courses.length === before) {
      return res.status(404).json({ message: "Course not found" });
    }

    await user.save();
    res.json({ message: "Course deleted successfully" + (existsInTimetable ? " along with timetable entries." : ".") });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
