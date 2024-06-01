const express = require('express');
require('dotenv').config();
const router = express.Router();
const auth = require('../Middlewares/auth');
const Activity = require('../models/Activity.js');
const Student = require('../models/Student');
const Course = require('../models/Course');
const Attendance = require('../models/Attendance');

// @route GET api/admin/attendance
// @description Get attendance records
// @access Private (requires authentication) Only admin can access attendance records
router.get('/', auth, async (req, res) => {
  try {
    const attendances = await Attendance.find({})
      .populate('student', 'name')
      .populate('course', 'name total_days');

    if (!attendances.length) {
      return res.status(404).json({ message: 'No attendance records found' });
    }

    res.status(200).json(attendances);
  } catch (err) {
    console.error('Error fetching attendance records:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// @route POST api/admin
// @description Mark an attendance
// @access Private (requires authentication) Only admin can mark attendance
router.get('/', auth, async (req, res) => {
  try {
    // Fetch all attendance records with status "present" and populate student name, course name, total_days
    const attendances = await Attendance.find({ status: 'present' })
      .populate('student', 'name')
      .populate('course', 'name total_days')
      .select('student course');

    // Check if no attendance records are found
    if (!attendances.length) {
      return res.status(404).json({ message: 'No attendance records found' });
    }

    // Send the attendance records as a response
    res.status(200).json(attendances);
  } catch (err) {
    console.error('Error fetching attendance records:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});


module.exports = router;
