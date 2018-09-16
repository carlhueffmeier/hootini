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
  console.log('Got cookies? 😬', req.cookies);
  if (token) {
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
    // Put the userId onto the req for future requests to access
    req.userId = userId;
    console.log('Who are you? 👀', userId);
  }
  next();
});

app.use(async (req, res, next) => {
  if (!req.userId) {
    console.log('no user id');
    return next();
  }
  const user = await User.findOne({ _id: req.userId });
  req.user = user;
  console.log('Someone I know 😍', user);
  next();
});

module.exports = app;
