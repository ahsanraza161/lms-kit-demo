const express = require('express');
const cors = require('cors');
const connectdb = require('./db/db');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

connectdb();

app.use('/api/users', require('./Routes/user'));
app.use('/api/auth', require('./Routes/auth'));
app.use('/api/admin', require('./Routes/admin'));

app.get('/', (req, res) => res.send('<h1>Hello</h1>'));

app.listen(8080, () => {
  console.log('server is listening on port 8080');
});
