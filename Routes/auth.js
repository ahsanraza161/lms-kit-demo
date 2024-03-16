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
      return res.status(400).json({ msg: 'User does not exist' });
    } else if (student.status === 'pending') {
      return res
        .status(400)
        .json({ msg: 'Your account request has been sent to admin,You can not login now' });
    }
    const isMatch = await bcrypt.compare(password, student.password);

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
        if (err) {
          console.error(err.message);
          return res.status(500).json({ msg: 'Server error' });
        }
        return res.status(200).json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
