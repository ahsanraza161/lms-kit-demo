const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User' // Assuming you have a User model for storing admin information
  },
  action: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  details: {
    type: Object,
    default: {}
  }
});

module.exports = mongoose.model('Activity', ActivitySchema);
