const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');

const app = express();

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000'
  })
);

app.use(morgan('tiny'));
app.use(cookieParser());
// Decode the JWT so we can get the user Id on each request
app.use((req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
    // Put the userId onto the req for future requests to access
    req.userId = userId;
  }
  next();
});

app.use(async (req, res, next) => {
  if (!req.userId) {
    return next();
  }
  const user = await User.findOne({ _id: req.userId });
  req.user = user;
  next();
});

module.exports = app;
