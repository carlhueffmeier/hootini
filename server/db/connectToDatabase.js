const mongoose = require('mongoose');

function connectToDatabase() {
  return new Promise((resolve, reject) => {
    mongoose.connect(
      process.env.MONGO_URL,
      { useNewUrlParser: true }
    );
    mongoose.Promise = global.Promise; // use ES6 promises
    mongoose.connection.on('error', err => {
      reject(`Can't connect to database → ${err.message}`);
    });
    mongoose.connection.once('open', resolve);

    // Load all models
    require('./models/card');
    require('./models/deck');
    require('./models/note');
    require('./models/noteType');
    require('./models/template');
    require('./models/user');
  });
}

module.exports = connectToDatabase;
