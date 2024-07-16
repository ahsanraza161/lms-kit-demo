const express = require('express');
const router = express.Router();
const AppliedCourse = require('../models/AppliedCourse');

// @route POST api/appliedCourse
// @describe Apply for a course
// @access Public
router.post('/', async (req, res) => {
    const {
        // branch,
        name, fatherName, whatsappNumber, dateOfBirth, gender,
        cnic, address, qualification, subject, completionYear,
        universityCollege, course, email
    } = req.body;

    try {
        // Check for existing student with email
        const student = await AppliedCourse.findOne({ email });
        if (student) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create and save new candidate
        const newCandidate = new AppliedCourse({
            // branch, 
            name, fatherName, whatsappNumber, dateOfBirth, gender,
            cnic, address, qualification, subject, completionYear,
            universityCollege, course, email
        });

        await newCandidate.save();
        return res.status(200).json({ msg: 'Your application has been received! Kindly join the respected groups.' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error' });
      }
});

// @route GET api/appliedCourse
// @description Get all applied courses
// @access Public
router.get('/', async (req, res) => {
    try {
        const appliedCourses = await AppliedCourse.find();
        res.json(appliedCourses);
    } catch (err) {
        console.error('Error retrieving applied courses:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;


