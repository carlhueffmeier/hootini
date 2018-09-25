const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const { setSchemaOptions } = require('../schemaOptions');

const templateSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  name: {
    type: String,
    trim: true,
    required: 'You must supply a name'
  },
  front: {
    type: String,
    trim: true
  },
  back: {
    type: String,
    trim: true
  }
});

setSchemaOptions(templateSchema);
module.exports = mongoose.model('Template', templateSchema);
