const Attendance = require('../models/Attendance');
const User = require('../models/User');

// 🎯 Mark Attendance
exports.markAttendance = async (req, res) => {
  const { courseId, date, startTime, status } = req.body;

  if (!courseId || !date || !startTime || !status) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Ensure the subject exists in user's timetable
    const isValidSubject = req.user.timetable.some(
      (slot) => slot.courseId.equals(courseId) && slot.startTime === startTime
    );

    if (!isValidSubject) {
      return res.status(400).json({ error: 'Invalid subject or class time' });
    }

    // Create or update attendance
    const attendance = await Attendance.findOneAndUpdate(
      { user: req.user._id, courseId, date, startTime },
      { status },
      { upsert: true, new: true }
    );

    res.status(200).json({ message: 'Attendance marked', attendance });
  } catch (err) {
    res.status(500).json({ error: 'Failed to mark attendance' });
  }
};

// 🎯 Get Attendance Summary
exports.getAttendanceSummary = async (req, res) => {
  const { courseId } = req.params;

  if (!courseId) {
    return res.status(400).json({ error: 'CourseId is required' });
  }

  try {
    const totalClasses = await Attendance.countDocuments({ user: req.user._id, courseId });
    const presentCount = await Attendance.countDocuments({ user: req.user._id, courseId, status: 'present' });

    const percentage = totalClasses > 0 ? (presentCount / totalClasses) * 100 : 0;

    res.status(200).json({
      courseId,
      totalClasses,
      presentCount,
      percentage: percentage.toFixed(2)
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch attendance summary' });
  }
};
