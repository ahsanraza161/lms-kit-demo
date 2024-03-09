const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect('mongodb+srv://karachilms:4.karachilms@userregistry.nyhdtbg.mongodb.net/?retryWrites=true&w=majority&appName=userregistry');
    console.log("MongoDB connected successfully!");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}

module.exports = connectDB;