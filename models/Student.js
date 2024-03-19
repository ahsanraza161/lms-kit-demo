const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  usertype: String,
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
  email: String,
  password: String,
  status: {
    type: String,
    enum: ['pending', 'approved'],
    required: true,
  },
});

const User = mongoose.model('Students', StudentSchema);
module.exports = User;
