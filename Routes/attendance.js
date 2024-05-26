const express = require('express');
require('dotenv').config();
const router = express.Router();
const auth = require('../Middlewares/auth');
const Activity = require('../models/Activity.js');
const Student = require('../models/Student');
const Course = require('../models/Course');
const Attendance = require('../models/Attendance'); 
// @route GET api/attendance
// @description View an attendance
// @access Private (requires authentication) Only admin can mark attendance
router.get('/getattendance', async (req, res) => {
  try {
    const attendances = await Attendance.find()
      .populate('course')
      .populate('student');

    return res.status(200).json(attendances); // Send the array directly
  } catch (err) {
    console.error('Error fetching attendance:', err);
    return res.status(500).json({ error: 'Server Error', msg: err.message });
  }
});



// @route POST api/admin
// @description Mark an attendance
// @access Private (requires authentication) Only admin can mark attendance
router.post('/', auth, async (req, res) => {
  try {
    const adminid = req.user.id;
    const { attendanceList } = req.body;
    

    const admin = await Student.findById(adminid).select('-password');
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    const newAttendances = [];
    for (const attendance of attendanceList) {
      const { courseId, studentId, date, status } = attendance;

      const course = await Course.findById(courseId);
      if (!course) {
        return res.status(404).json({ message: `Course not found for ID: ${courseId}` });
      }

      const student = await Student.findById(studentId);

      if (!student) {
        return res.status(404).json({ message: `Student not found for ID: ${studentId}` });
      }

      const newAttendance = new Attendance({
        course: courseId,
        student: studentId,
        date: new Date(date),
        status,
      });

      newAttendances.push(newAttendance);
    }

    await Attendance.insertMany(newAttendances);

    // Capture Activity for each attendance
    const activities = newAttendances.map((attendance) => ({
      name: admin.name,
      action: 'marked attendance of',
      object: attendance.student,
    }));

    await Activity.insertMany(activities);

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
    const studentId = req.user.id; 
    const attendance = await Attendance.find({ student: studentId }).populate('course');

    return res.status(200).json(attendance);
  } catch (err) {
    console.error('Error getting attendance:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;