const mongoose = require('mongoose');

const AppliedCourseSchema = new mongoose.Schema({
  branch: { type: String, required: true },
  name: { type: String, required: true },
  fatherName: { type: String, required: true },
  whatsappNumber: { type: String, required: true },
  dateOfBirth: { type: String, required: true },
  gender: { type: String, required: true },
  cnic: { type: String, required: true },
  address: { type: String, required: true },
  qualification: { type: String, required: true },
  subject: { type: String, required: true },
  completionYear: { type: Number, required: true },
  universityCollege: { type: String, required: true },
  course: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

const AppliedCourse = mongoose.model('AppliedCourse', AppliedCourseSchema);
module.exports = AppliedCourse;
