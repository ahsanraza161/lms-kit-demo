const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
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
});

const User = mongoose.model('userresgistry', UsersSchema);
module.exports = User;
