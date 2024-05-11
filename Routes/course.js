const express = require('express');
require('dotenv').config();
const router = express.Router();
const Course = require('../models/Course');
const Student = require('../models/Student');
const auth = require('../Middlewares/auth');

// @route GET api/courses
// @Describe Get all Courses
// @access private
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find().populate({
      path: 'students',
      model: 'Students', // Assuming 'Student' is the name of your student model
    });
    return res.status(200).json(courses);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ msg: 'Server error' });
  }
});

// @route POST api/courses
// @Describe Add a Course
// @access private
router.post('/', async (req, res) => {
  try {
    const { name, teacher, start_date, classes_days, total_days } = req.body;

    let course = new Course({
      name,
      teacher,
      start_date,
      classes_days,
      total_days,
    });

    course = await course.save();

    return res.status(200).json(course);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ msg: 'Server error' });
  }
});

// @route POST api/courses
// @Describe Add a Course in students and courses field
// @access private
router.post('/addcourse', async (req, res) => {
  const { studentId, courseId } = req.body;
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      { $addToSet: { courses: courseId } }, // Use $addToSet to avoid adding duplicates
      { new: true }
    );

    // Update the courses model with the student ID
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      { $addToSet: { students: studentId } }, // Use $addToSet to avoid adding duplicates
      { new: true }
    );

    res.json({ student: updatedStudent, course: updatedCourse });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ msg: 'Server error' });
  }
});

// @route DELETE api/courses
// @Describe Delete a Course
// @access private
router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await Course.findByIdAndDelete(id);

    res.status(200).json({ msg: 'Course Deleted' });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ msg: 'Server error' });
  }
});

// @Describe Delete Student from  Course
// @access private
router.delete('/deletestudent/:courseId/:studentId', async (req, res) => {
  const { courseId, studentId } = req.params;
  try {
    // Update the student document to remove the courseId from the courses array
    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      { $pull: { courses: courseId } },
      { new: true }
    );

    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      { $pull: { students: studentId } },
      { new: true }
    );

    return res.status(200).json({ updatedStudent, updatedCourse });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
