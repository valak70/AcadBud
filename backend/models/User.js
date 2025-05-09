const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },

  timetable: [{
    day: { type: String, required: true },
    subjectCode: String,
    subjectName: String,
    startTime: String,
    endTime: String
  }],

  courses: [{
    subjectCode: { type: String, required: true, unique: true},
    subjectName: { type: String, required: true },
    credits: Number,
    expectedGrade: Number
  }]
});

module.exports = mongoose.model('User', userSchema);

