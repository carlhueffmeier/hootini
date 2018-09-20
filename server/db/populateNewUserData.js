const mongoose = require('mongoose');
const NoteType = mongoose.model('NoteType');
const Template = mongoose.model('Template');
const { addUserInfo } = require('./authHelper');

const starterNoteTypes = [
  {
    noteType: {
      name: 'Basic',
      fieldDefinitions: [{ key: 'Front' }, { key: 'Back' }]
    },
    templates: [
      {
        name: 'Normal',
        front: '<%Front%>',
        back: '<%Front%>\n\n----\n\n<%Back%>'
      }
    ]
  },
  {
    noteType: {
      name: 'Basic (with reverse)',
      fieldDefinitions: [{ key: 'Front' }, { key: 'Back' }]
    },
    templates: [
      {
        name: 'Normal',
        front: '<%Front%>',
        back: '<%Front%>\n\n----\n\n<%Back%>'
      },
      {
        name: 'Reverse',
        front: '<%Back%>',
        back: '<%Back%>\n\n----\n\n<%Front%>'
      }
    ]
  }
];

async function populateNewUserData(user) {
  for (let type of starterNoteTypes) {
    const templateIds = await Template.insertMany(
      type.templates.map(template => ({ ...template, ...addUserInfo(user) }))
    );
    new NoteType({ ...type.noteType, templates: templateIds, ...addUserInfo(user) }).save();
  }
}

module.exports = populateNewUserData;
