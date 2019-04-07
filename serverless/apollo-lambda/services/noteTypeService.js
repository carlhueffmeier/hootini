const noteTypeRepository = require('../gateways/noteTypeRepository');
const cardRepository = require('../gateways/cardRepository');
const NoteType = require('../models/NoteType');
const { groupBy, pluck } = require('../lib/functionalUtils');

class NoteTypeService {
  constructor(user) {
    this.user = user;
  }

  createNoteType(vm) {
    const newNoteType = new NoteType();
    newNoteType.user = this.user;
    newNoteType.name = vm.name;
    newNoteType.fields = vm.fields;
    newNoteType.templates = vm.templates;
    return newNoteType.save();
  }

  async updateNoteType(whereUnique, changes) {
    const noteType = this.findOne(whereUnique);
    Object.entries(changes).forEach(([key, value]) => {
      noteType[key] = value;
    });
    await noteType.save();
    if (changes.templates) {
      await this._updateCardTemplates({
        noteTypeId: noteType.id,
        oldTemplates: noteType.templates,
        newTemplates: changes.templates,
        fieldMeta: noteType.fieldMeta
      });
    } else {
      await this._updateCardFieldMeta({
        noteTypeId: noteType.id,
        fieldMeta: noteType.fieldMeta
      });
    }
  }

  findOne(whereUnique) {
    if (whereUnique.slug) {
      return noteTypeRepository.findOneByUserAndSlug(
        this.user,
        whereUnique.slug
      );
    }
  }

  find(where) {
    if (where && where.name) {
      return noteTypeRepository.findByUserAndName(this.user, where.name);
    }
    return noteTypeRepository.findByUser(this.user);
  }

  _updateCardTemplates(data) {
    const newTemplates = groupBy('id', data.newTemplates);
    const oldIds = new Set(pluck('id', data.oldTemplates));
    const newIds = new Set(pluck('id', data.newTemplates));

    const deletedIds = [...oldIds].filter(id => !newIds.has(id));
    const pendingDeleteOps = deletedIds.map(templateId =>
      cardRepository.deleteByNoteTypeIdAndTemplateId(
        data.noteTypeId,
        templateId
      )
    );

    const pendingUpdateOps = newIds.map(templateId =>
      cardRepository.bulkUpdateByNoteTypeIdAndTemplateId(
        { noteTypeId: data.noteTypeId, templateId },
        { fieldMeta: data.fieldMeta, template: newTemplates[templateId] }
      )
    );

    return Promise.all([...pendingDeleteOps, ...pendingUpdateOps]);
  }

  _updateCardFieldMeta({ noteTypeId, fieldMeta }) {
    return cardRepository.bulkUpdateFieldMeta({ noteTypeId }, fieldMeta);
  }
}

module.exports = NoteTypeService;
