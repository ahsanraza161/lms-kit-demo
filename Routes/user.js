const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const jwt = require('jsonwebtoken');

const Student = require('../models/Student');

// @route POST api/users
// @describe Register a new User
// @access public
router.post('/', async (req, res) => {
  const {
    usertype,
    name,
    fatherName,
    dateOfBirth,
    gender,
    cnic,
    address,
    qualification,
    subject,
    completionYear,
    universityCollege,
    email,
    password,
  } = req.body;
  try {
    // Check for existing student with email
    const student = await Student.findOne({ email });
    if (student) {
      return res.status(400).send({ message: 'User already exist' });
    }

    // Hash password securely
    const saltRounds = 10; // Adjust based on security needs
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create and save new user
    const newStudent = new Student({
      usertype,
      name,
      fatherName,
      dateOfBirth,
      gender,
      cnic,
      address,
      qualification,
      subject,
      completionYear,
      universityCollege,
      email,
      password: hashedPassword,
      status: 'pending',
    });

    await newStudent.save();

    return res.status(200).json({ msg: 'Your request has been send to admin' });
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).send({ message: err });
  }
});

module.exports = router;
