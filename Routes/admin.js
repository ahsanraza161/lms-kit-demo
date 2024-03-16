const express = require('express');
require('dotenv').config();
const router = express.Router();
const sendMail = require('../utils/sendmail');

const Student = require('../models/Student');

// @route POST api/users
// @describe Get all Students with status pending
// @access private
router.get('/', async (req, res) => {
  try {
    const students = await Student.find({ status: 'pending' })
      .sort({
        created_at: -1,
      })
      .select('-password');
    res.json(students);
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).send({ message: err });
  }
});

// @route POST api/users
// @describe Change the Student status from pending to approved
// @access private
router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const student = await Student.findById(id).select('-password');
    // Update the status
    student.status = 'approved';

    // Save the updated student
    await student.save();

    // Send email to users email
    await sendMail(
      'Please Login your account',
      '<p>Your account has been approved plz login in your account</p>',
      student.email
    );

    // Return response
    return res.status(200).json({ msg: 'Email has been sent to student' });
  } catch (err) {
    res.status(500).json({ err });
    console.error(err);
  }
});

module.exports = router;
