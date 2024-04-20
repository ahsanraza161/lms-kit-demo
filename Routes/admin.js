const express = require('express');
require('dotenv').config();
const router = express.Router();
const sendMail = require('../utils/sendmail');
const { requestAcceptedEmail } = require('../utils/emails');

const Student = require('../models/Student');
const Course = require('../models/Course');

// @route GET api/admin
// @describe Get all Users with status pending
// @access private
router.get('/pending', async (req, res) => {
  try {
    const students = await Student.find({
      status: 'pending',
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
// @describe Get all teacher with status approved
// @access private
router.get('/getteacher', async (req, res) => {
  try {
    const teacher = await Student.find({
      usertype: 'Faculty',
      status: 'approved',
    });
    return res.status(200).json(teacher);
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
      .populate({
        path:"courses",
        model:"Courses"
      })
      .sort({ created_at: -1 })
      .select('-password');

    return res.status(200).json(students);
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).send({ message: err });
  }
});

// @route GET api/admin
// @describe Get all Numbers
// @access private
router.get('/getNumbers', async (req, res) => {
  try {
    const students = await Student.find({
      usertype: 'Student',
      status: 'approved',
    });
    const teachers = await Student.find({
      usertype: 'Faculty',
      status: 'approved',
    });
    const courses = await Course.find();
    return res.status(200).json({
      students: students.length,
      teachers: teachers.length,
      courses: courses.length,
    });
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
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: 'Server error' });
    }
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
// @route DELETE api/admin
// @describe delete the faculty
// @access private
router.delete('/teacher/:id', async (req, res) => {
  try {
    const id = req.params.id;

    await Student.findByIdAndDelete(id);

    return res.status(200).json({ msg: 'faculty deleted successfully' });
  } catch (err) {
    res.status(500).json({ err });
    console.error(err);
  }
});
app.post('/forgot-password', (req, res) => {
  const {email} = req.body;
  Student.findOne({email: email})
  .then(user => {
      if(!user) {
          return res.send({Status: "User not existed"})
      } 
      const token = jwt.sign({id: user._id}, "jwt_secret_key", {expiresIn: "1d"})
      var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'neweraprovider@gmail.com',
            pass: 'otil cabz xhgb onmc'
          }
        });
        
        var mailOptions = {
          from: 'youremail@gmail.com',
          to: 'user email@gmail.com',
          subject: 'Reset Password Link',
          text: `http://localhost:5173/reset_password/${user._id}/${token}`
        };
        
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            return res.send({Status: "Success"})
          }
        });
  })
})

module.exports = router;
