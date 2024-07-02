const express = require('express');
const cors = require('cors');
const path = require('path');
const connectdb = require('./db/db');

const app = express();
const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Enable pre-flight

connectdb();

// Serve static files from the "uploads" directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Api routes
app.use('/api/users', require('./routes/user'));
app.use('/api/appliedCourse', require('./routes/appliedCourse'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/courses', require('./routes/course'));
app.use('/api/materials', require('./routes/material'));
app.use('/api/students', require('./routes/student'));
app.use('/api/attendance', require('./routes/attendance'));
app.use('/api/note', require('./routes/note'));
app.use('/api/activity', require('./routes/activity'));

app.get('/', (req, res) => res.send('<h1>Hello</h1>'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
