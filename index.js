const express = require('express');
const cors = require('cors');
const connectdb = require('./db/db');

const app = express();
const corsOptions = {
  origin:  '*',
};
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));

connectdb();

// Api routes
app.use('/api/users', require('./Routes/user'));
app.use('/api/auth', require('./Routes/auth'));
app.use('/api/admin', require('./Routes/admin'));
app.use('/api/courses', require('./Routes/course'));
app.use('/api/students', require('./Routes/student'));
app.use('/api/attendance', require('./Routes/attendance'));
app.use('/api/note', require('./Routes/note'));

app.get('/', (req, res) => res.send('<h1>Hello</h1>'));

app.listen(8080, () => {
  console.log('server is listening on port 8080');
});
