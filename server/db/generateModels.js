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
