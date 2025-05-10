const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  date: {
    type: Date,
    required: true
  },
  startTime: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['present', 'absent'],
    required: true
  }
});

// Prevent duplicate entry of same course on same day and slot
attendanceSchema.index({ user: 1, courseId: 1, date: 1, startTime: 1 }, { unique: true });

module.exports = mongoose.model('Attendance', attendanceSchema);
