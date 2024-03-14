const express = require('express');
const bcrypt = require('bcrypt');
require('dotenv').config();
const router = express.Router();
const jwt = require('jsonwebtoken');

const Student = require('../models/Student');

// @route POST api/users
// @describe Login User
// @access public
router.post('/', async (req, res) => {
  const { email, password } = req.body;
  try {
    let student = await Student.findOne({ email });
    if (!student) {
      res.status(400).json({ msg: 'User does not exist' });
    } else if (student.status === 'pending') {
      res.status(200).json({ msg: 'Your account has not been approved' });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Password Incorrect' });
    }

    const payload = {
      student: {
        id: student.id,
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
    console.error(err.message);
    res.status({ msg: 'Server error' });
  }
});

module.exports = router;
