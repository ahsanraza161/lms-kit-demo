const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
    unique: true,
  },
  teacher: {
    required: true,
    type: String,
  },
  start_date: {
    required: true,
    type: Date,
  },
  classes_date: {
    required: true,
    type: Date,
  },
  students: [
    {
      type: mongoose.Schema.Types.ObjectId, // Array of ObjectIDs
      ref: 'Student', // Reference to the Student model
    },
  ],
});

const Courses = mongoose.model('Courses', CourseSchema); // Use "Courses" as the model name
module.exports = Courses;
