const mongoose = require('mongoose');

const AppliedCourseSchema = new mongoose.Schema({
  usertype: String,
  branch: String,
  name: String,
  fatherName: String,
  dateOfBirth: String,
  gender: String,
  cnic: String,
  address: String,
  qualification: String,
  subject: String,
  completionYear: Number,
  universityCollege: String,
  email: {
    type: String,
    unique: true,
  },
});

const AppliedCourse = mongoose.model('AppliedCourse', AppliedCourseSchema);
module.exports = AppliedCourse;
