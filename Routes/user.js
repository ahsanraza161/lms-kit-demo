const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const jwt = require('jsonwebtoken');

const User = require('../models/users');

router.post('/', async (req, res) => {
  const {
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
    // Check for existing user with email
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).send({ message: 'User already exist' });
    }

    // Hash password securely
    const saltRounds = 10; // Adjust based on security needs
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create and save new user
    const newUser = new User({
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
    });

    await newUser.save();

    const payload = {
      user: {
        id: newUser.id,
      },
    };

    jwt.sign(
      payload,
      process.env.jwtsecret,
      {
        expiresIn: 3600000,
      },
      (err, token) => {
        if (err) throw err.message;
        return res.json({ token });
      }
    );
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).send({ message: err });
  }
});

module.exports = router;
