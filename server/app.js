const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

// CORS policy
app.use(cors());
app.use(morgan('tiny'));

module.exports = app;
