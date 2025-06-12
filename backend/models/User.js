const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  timetable: [{
    day: { type: String, required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, required: true },
    startTime: String,
    endTime: String
  }],

  courses: [{
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  subjectName: { type: String, required: true },
  subjectCode: String,
  credits: Number,
  expectedGrade: String,
  attendanceThreshold: { type: Number, default: 75 },
}]

});

module.exports = mongoose.model('User', userSchema);

