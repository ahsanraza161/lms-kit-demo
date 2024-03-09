const express = require('express');
const bcrypt = require('bcrypt');
require('dotenv').config();
const router = express.Router();
const jwt = require('jsonwebtoken');

const User = require('../models/users');

router.post('/', async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ msg: 'User does not exist' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Password Incorrect' });
    }

    const payload = {
      user: {
        id: user.id,
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
