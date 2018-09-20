const mongoose = require('mongoose');
const Template = mongoose.model('Template');
const { createFilter, checkAuth } = require('../authHelper');
const { pluck } = require('../../helper/utils');

function generateTemplateModel({ user }) {
  const find = (where = {}) => {
    checkAuth(user);
    return Template.find(createFilter(where, user));
  };

  const findOne = (where = {}) => {
    checkAuth(user);
    return Template.findOne(createFilter(where, user));
  };

  const findOneAndUpdate = (where = {}, update = {}) => {
    checkAuth(user);
    return Template.findOneAndUpdate(createFilter(where, user), update, {
      new: true
    });
  };

  const upsertMany = async templates => {
    checkAuth(user);
    const bulkOps = templates.map(
      ({ id: templateId, ...templateData }) =>
        templateId
          ? {
              updateOne: {
                filter: createFilter({ _id: templateId }, user),
                update: { $set: templateData }
              }
            }
          : {
              insertOne: {
                document: templateData
              }
            }
    );
    const bulkWriteResult = await Template.bulkWrite(bulkOps);
    const insertedIds = pluck('_id', bulkWriteResult.getInsertedIds()).map(mongoose.Types.ObjectId);
    const existingIds = pluck('id', templates).map(mongoose.Types.ObjectId);
    return {
      existingIds,
      insertedIds,
      allIds: [...existingIds, ...insertedIds]
    };
  };

  return {
    find,
    findOne,
    findOneAndUpdate,
    upsertMany
  };
}

module.exports = generateTemplateModel;
