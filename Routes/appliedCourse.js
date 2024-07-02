// const express = require('express');
// const router = express.Router();
// const AppliedCourse = require('../models/AppliedCourse');

// // @route POST api/users
// // @describe Applied for a course
// // @access public
// router.post('/', async (req, res) => {
//     const {
//         usertype,
//         branch,
//         name,
//         fatherName,
//         dateOfBirth,
//         gender,
//         cnic,
//         address,
//         qualification,
//         subject,
//         completionYear,
//         universityCollege,
//         email,
//     } = req.body;
    
//     try {
//         // Check for existing student with email
//         const student = await AppliedCourse.findOne({ email });
//         if (student) {
//             return res.status(400).send({ message: 'User already exists' });
//         }

//         // Create and save new user
//         const newcandidate = new AppliedCourse({
//             usertype,
//             branch,
//             name,
//             fatherName,
//             dateOfBirth,
//             gender,
//             cnic,
//             address,
//             qualification,
//             subject,
//             completionYear,
//             universityCollege,
//             email,
//         });

//         await newcandidate.save();
//         return res.status(200).json({ msg: 'Your request has been sent to admin' });
//     } catch (err) {
//         console.error('Error registering user:', err);
//         res.status(500).send({ message: err });
//     }
// });

// module.exports = router;
