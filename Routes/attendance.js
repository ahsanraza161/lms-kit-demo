const express = require('express');
require('dotenv').config();
const router = express.Router();
const auth = require('../middlewares/auth');
const Activity = require('../models/Activity');
const Student = require('../models/Student');
const Course = require('../models/Course');
const Attendance = require('../models/Attendance');

// @route GET api/attendance
// @description View all attendance records
// @access Private (requires authentication)
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

// @route POST api/attendance
// @description Mark attendance
// @access Private (requires authentication) Only admin can mark attendance
router.post('/', auth, async (req, res) => {
  try {
    const adminId = req.user.id;
    const { attendanceList } = req.body;

    const admin = await Student.findById(adminId).select('-password');
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    const newAttendances = [];
    const activities = [];

    for (const attendance of attendanceList) {
      const { courseId, studentId, date, status } = attendance;

      const course = await Course.findById(courseId);
      if (!course) {
        return res
          .status(404)
          .json({ message: `Course not found for ID: ${courseId}` });
      }

      const student = await Student.findById(studentId);
      if (!student) {
        return res
          .status(404)
          .json({ message: `Student not found for ID: ${studentId}` });
      }

      const newAttendance = new Attendance({
        course: courseId,
        student: studentId,
        date: new Date(date),
        status,
      });

      newAttendances.push(newAttendance);

      // Capture Activity with student name
      activities.push({
        name: admin.name,
        action: 'marked attendance of',
        object: student.name,
      });
    }

    await Attendance.insertMany(newAttendances);
    await Activity.insertMany(activities);

    res.status(201).json({ message: 'Attendance marked successfully' });
  } catch (err) {
    console.error('Error marking attendance:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// @route GET api/attendance/student
// @description View own attendance
// @access Private (requires authentication)
router.get('/student', auth, async (req, res) => {
  try {
    const studentId = req.user.id;
    const attendances = await Attendance.find({ student: studentId })
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

module.exports = router;
