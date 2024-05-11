const express = require('express');
const router = express.Router();
const Material = require('../models/Material');
const Course = require('../models/Course');

// POST route to upload a material for a specific course
router.post('/:courseId/upload', async (req, res) => {
  try {
    const { title, date, attachment, tutorialLink } = req.body;
    const courseId = req.params.courseId;

    // Check if the course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Create a new material object
    const newMaterial = new Material({
      title,
      date,
      attachment,
      tutorialLink,
      courseId
    });

    // Save the material to the database
    const savedMaterial = await newMaterial.save();

    res.status(201).json(savedMaterial);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;