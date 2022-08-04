const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
const dotenv = require('dotenv').config();
const app = express();
const colors = require('colors');
const axios = require('axios').default;
const cors = require('cors');

// init db
connectDB();

// init middleware
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// * define Routes
app.get('/', (req, res) => {
  res.json({ msg: 'Api Running...' });
});

let videos = [];
axios
  .get('http://localhost:5000/api/v1/video')
  .then((data) => (videos = data.data))
  .catch((err) => console.log(err));

app.get('/videos', (req, res) => {
  res.render('videos', { videos });
});

app.use('/api/v1/users', require('./routes/users'));
app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/profile', require('./routes/profile'));
app.use('/api/v1/channel', require('./routes/channel'));
app.use('/api/v1/video', require('./routes/video'));
app.use('/search', require('./routes/search'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server started on http://localhost:${PORT}`.cyan)
);
