const express = require('express');
require('dotenv').config();
const router = express.Router();
const auth = require('../Middlewares/auth');
const Activity = require('../models/Activity.js');
const Student = require('../models/Student');
const Course = require('../models/Course');
const Attendance = require('../models/Attendance'); // Import the Attendance model

// @route GET api/attendance
// @description View an attendance
// @access Private (requires authentication) Only admin can mark attendance
router.get('/getattendance', async (req, res) => {
  try {
    const Attendances = await Attendance.find()
      .populate('course')
      .populate('students');

    return res.status(200).json({ Attendances });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: 'Server Error' });
  }
});

// @route POST api/admin
// @description Mark an attendance
// @access Private (requires authentication) Only admin can mark attendance
router.post('/', auth, async (req, res) => {
  try {
    const adminid = req.user.id;
    // Extract the course ID, student ID, and date from the request body
    const { courseId, studentId, date } = req.body;

    // Check if the course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check if the student exists
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    // Create the attendance record
    const attendance = new Attendance({
      course: courseId,
      student: studentId,
      date: new Date(date), // Convert the date string to a Date object
    });
    // Save the attendance record to the database
    await attendance.save();
    // Capture Activity;
    const admin = await Student.findById(adminid).select('-password');
    const newActivity = new Activity({
      name: admin.name,
      action: 'mark attendence of',
      object: student.name,
    });
  
    await newActivity.save();
    

    res.status(201).json({ message: 'Attendance marked successfully' });
  } catch (err) {
    console.error('Error marking attendance:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// @route GET api/admin
// @description Get attendance for a student
// @access Private (requires authentication)
router.get('/', auth, async (req, res) => {
  try {
    // Extract the student ID from the request
    const studentId = req.user.id; // Assuming the user object contains the student ID after authentication

    // Find all attendance records for the given student ID
    const attendance = await Attendance.find({ student: studentId }).populate(
      'course'
    );

    return res.status(200).json(attendance);
  } catch (err) {
    console.error('Error getting attendance:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
