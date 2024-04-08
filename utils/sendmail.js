const nodemailer = require('nodemailer');
require('dotenv').config;

var transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "a91b76f2148575",
    pass: "********e41a"
  }
});

async function sendMail(subject, to, email) {
  if (!subject) {
    console.error('Subject is required to send an email');
    return; // Do not proceed if subject or text is missing
  }

  var mailOptions = {
    from: process.env.sender,
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
