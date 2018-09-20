const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const { getUserIdFromCookie } = require('./helper/utils');

const app = express();

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000'
  })
);

app.use(morgan('tiny'));
app.use(cookieParser());

// Extract the user id and store for this request
app.use((req, res, next) => {
  const userId = getUserIdFromCookie(req);
  if (userId) {
    req.userId = userId;
  }
  next();
});

// If a user id was found, query the user data
app.use(async (req, res, next) => {
  if (!req.userId) {
    return next();
  }
  const user = await User.findOne({ _id: req.userId });
  req.user = user;
  next();
});

module.exports = app;
