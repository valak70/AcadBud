const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  subjectCode: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  startTime: { // single string is enough to uniquely identify the slot
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['present', 'absent'],
    required: true
  }
});

// Prevent duplicate marking of the same subject's same class on same day
attendanceSchema.index({ user: 1, subjectCode: 1, date: 1, startTime: 1 }, { unique: true });

module.exports = mongoose.model('Attendance', attendanceSchema);
