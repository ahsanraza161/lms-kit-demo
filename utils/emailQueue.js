const Queue = require('bull');
const sendMail = require('./sendmail');
require('dotenv').config();

const emailQueue = new Queue('email', {
  redis: {
    host: '127.0.0.1',
    port: 6379,
    maxRetriesPerRequest: null,
    connectTimeout: 60000, 
  },
});

emailQueue.process(async (job, done) => {
  try {
    const { subject, text, to } = job.data;
    await sendMail(subject, text, to);
    done();
  } catch (error) {
    done(error);
  }
});

emailQueue.on('completed', (job) => {
  console.log(`Email job ${job.id} completed`);
});

emailQueue.on('failed', (job, err) => {
  console.error(`Email job ${job.id} failed: ${err.message}`);
});

module.exports = emailQueue;
