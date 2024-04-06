const nodemailer = require('nodemailer');
require('dotenv').config;

var transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "b1442b297ac3db",
    pass: "3821d88f04b4e5"
  }
});
async function sendMail(subject, to, email) {
  if (!subject) {
    console.error('Subject is required to send an email');
    return; // Do not proceed if subject or text is missing
  }

  var mailOptions = {
    from: 'neweraprovider@gmail.com',
    //! Change
    to: to || 'neweraprovider@gmail.com',
    subject: subject,
    html: email,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: ' + info.response);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

module.exports = sendMail;
