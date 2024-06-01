const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema({
  title: {
    type: String,
    // required: true
  },
  date: {
    type: Date,
    // required: true
  },
  attachment: {
    type: String,
    // required: true
  },
  tutorialLink: {
    type: String
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  }
});

const Material = mongoose.model('Material', materialSchema);

module.exports = Material;