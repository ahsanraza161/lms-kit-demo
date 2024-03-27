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
});
const Course = mongoose.model('Courses', CourseSchema);
module.exports = Course;
