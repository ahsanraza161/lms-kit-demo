const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const jwt = require('jsonwebtoken');

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
    student.status = 'approved';

    student.save;

    return res
      .status(200)
      .json({ msg: 'Student status changed from pending to approved' });
  } catch (err) {
    res.status(500).json({ err });
    console.error(err);
  }
});

module.exports = router;
