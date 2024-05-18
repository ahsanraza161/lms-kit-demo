const jwt = require('jsonwebtoken');
const Student = require('../models/Student');
const Activity = require('../models/Activity');

module.exports = async function (req, res, next) {
  const token = req.header('token');
  if (!token) {
    return res.status(401).json({
      msg: 'Autorization denied, token missing',
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.jwtsecret);
    const ID = decoded.student.id;
    const user = await Student.findById(ID).select('-password');

    const activity = new Activity({

    })
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ msg: 'Invalid token' });
  }
};
