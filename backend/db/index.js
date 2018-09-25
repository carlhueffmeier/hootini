const mongoose = require('mongoose');

mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true }
);
mongoose.Promise = global.Promise; // use ES6 promises
mongoose.connection.on('error', err => {
  console.error(`Can't connect to database → ${err.message}`);
});

// Import mongoose models
require('./models/user');
require('./models/deck');
require('./models/note');
require('./models/noteType');
require('./models/template');
require('./models/card');

const generateUserModel = require('./connectors/user');
const generateDeckModel = require('./connectors/deck');
const generateNoteModel = require('./connectors/note');
const generateNoteTypeModel = require('./connectors/noteType');
const generateTemplateModel = require('./connectors/template');
const generateCardModel = require('./connectors/card');

module.exports = ({ user }) => ({
  user: generateUserModel({ user }),
  deck: generateDeckModel({ user }),
  note: generateNoteModel({ user }),
  noteType: generateNoteTypeModel({ user }),
  template: generateTemplateModel({ user }),
  card: generateCardModel({ user })
});
