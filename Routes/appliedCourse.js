const express = require('express');
const router = express.Router();
const AppliedCourse = require('../models/AppliedCourse');
const emailQueue = require('../utils/emailQueue');
const { applicationReceivedEmail } = require('../utils/emails');

router.post('/', async (req, res) => {
  const {
    name, fatherName, whatsappNumber, dateOfBirth, gender,
    cnic, address, qualification, subject, completionYear,
    universityCollege, course, email
  } = req.body;

  try {
    const student = await AppliedCourse.findOne({ email });
    if (student) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newCandidate = new AppliedCourse({
      name, fatherName, whatsappNumber, dateOfBirth, gender,
      cnic, address, qualification, subject, completionYear,
      universityCollege, course, email
    });

    await newCandidate.save();

    const emailData = {
      subject: 'Application Received',
      text: applicationReceivedEmail(name, course),
      to: email,
    };

    emailQueue.add(emailData);

    return res.status(200).json({ msg: 'Your application has been received! Kindly join the respected groups.' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

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
