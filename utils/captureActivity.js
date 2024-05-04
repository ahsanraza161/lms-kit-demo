const mongoose = require('mongoose');

async function captureActivity(userId, action, details = {}) {
  const Activity = mongoose.model('Activity'); // Assuming you have an Activity model

  try {
    const timestamp = new Date().toISOString();
    const activityLog = new Activity({ userId, action, timestamp, ...details });

    await activityLog.save();

    console.log(`Activity captured: ${userId} performed ${action}`);
  } catch (err) {
    console.error("Error capturing activity:", err);
  }
}

module.exports = captureActivity;
