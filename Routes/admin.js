const express = require('express');
require('dotenv').config();
const router = express.Router();
const sendMail = require('../utils/sendmail');
const { requestAcceptedEmail } = require('../utils/emails');

const Student = require('../models/Student');

// @route GET api/admin
// @describe Get all Students with status pending
// @access private
router.get('/pending', async (req, res) => {
  try {
    const students = await Student.find({
      status: 'pending',
      usertype: 'Student', // Assuming you have a field called userType
    })
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

// @route GET api/admin
// @describe Get all Students with status approved
// @access private
router.get('/approved', async (req, res) => {
  try {
    const students = await Student.find({
      status: 'approved',
      usertype: 'Student', // Assuming you have a field called userType
    })
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

// @route PUT api/admin
// @describe Change the Student status from pending to approved
// @access private
router.patch('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const student = await Student.findById(id).select('-password');
    // Update the status
    student.status = 'approved';

    // Save the updated student
    await student.save();
    try {
      await sendMail(
        'Request Accepted',
        student.email,
        requestAcceptedEmail(student.name)
      );
    } catch (err) {}
    // Send email to users email
    return res.status(200).json({ msg: 'Email Successfully Sent' });
  } catch (err) {
    res.status(500).json({ err });
    console.error(err);
  }
});

// @route DELETE api/admin
// @describe delete the students
// @access private
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;

    await Student.findByIdAndDelete(id);

    return res.status(200).json({ msg: 'Contact deleted successfully' });
  } catch (err) {
    res.status(500).json({ err });
    console.error(err);
  }
});

module.exports = router;
