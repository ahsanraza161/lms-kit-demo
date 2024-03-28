const express = require('express');
require('dotenv').config();
const router = express.Router();
const Course = require('../models/Course');

// @route GET api/courses
// @Describe Get all Courses
// @access private
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find();
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
    const { course_name, teacher, start_date, classes_date } = req.body;

    let course = new Course({
      name:course_name,
      teacher,
      start_date,
      classes_date,
    });

    course = await course.save();

    return res.status(200).json(course);
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

module.exports = router;
