const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const Card = mongoose.model('Card');
const { rescheduleCard } = require('../../helper/scheduler');
const { checkAuth, createFilter, authStage } = require('../authHelper');

const addDeckStages = [
  {
    $lookup: {
      from: 'decks',
      foreignField: '_id',
      localField: 'deck',
      as: 'deck'
    }
  },
  {
    $addFields: {
      deck: {
        $arrayElemAt: ['$deck', 0]
      }
    }
  }
];

const addTemplateStages = [
  {
    $lookup: {
      from: 'templates',
      foreignField: '_id',
      localField: 'template',
      as: 'template'
    }
  },
  {
    $addFields: {
      template: {
        $arrayElemAt: ['$template', 0]
      }
    }
  }
];

const addFieldsStages = [
  {
    $lookup: {
      from: 'notes',
      foreignField: '_id',
      localField: 'note',
      as: 'note'
    }
  },
  {
    $addFields: {
      fields: {
        $arrayElemAt: ['$note', 0]
      }
    }
  },
  {
    $addFields: {
      fields: '$note.fields'
    }
  },
  {
    $addFields: {
      fields: {
        $arrayElemAt: ['$fields', 0]
      }
    }
  }
];

const aliasIdStage = { $addFields: { id: '$_id' } };

function generateCardModel({ user } = {}) {
  const find = async (where = {}) => {
    checkAuth(user);
    const pipeline = [];
    pipeline.push(authStage(user));
    if (where.deckId) {
      pipeline.push({ $match: { deck: ObjectId(where.deckId) } });
    }
    if (where.deckSlug) {
      pipeline.push(...addDeckStages);
      pipeline.push({ $match: { 'deck.slug': where.deckSlug } });
    }
    if (where.dueTime_in && where.dueTime_in.length !== 2) {
      throw new Error('Hey, you need to pass two dateTimes to dueTime_in.');
    }
    if (where.dueTime_in) {
      pipeline.push({
        $match: {
          $or: [
            { due: { $gt: new Date(where.dueTime_in[0]), $lt: new Date(where.dueTime_in[1]) } },
            { due: null }
          ]
        }
      });
    }
    if (where.dueTime_gt) {
      pipeline.push({
        $match: {
          $or: [{ due: { $gt: new Date(where.dueTime_gt) } }, { due: null }]
        }
      });
    }
    if (where.dueTime_lt) {
      pipeline.push({
        $match: {
          $or: [{ due: { $lt: new Date(where.dueTime_lt) } }, { due: null }]
        }
      });
    }

    pipeline.push(...addFieldsStages, ...addTemplateStages, aliasIdStage);
    const res = await Card.aggregate(pipeline);
    return res;
  };

  const findOne = (where = {}) => {
    checkAuth(user);
    return Card.findOne(createFilter(where, user));
  };

  const review = async ({ id, answer, timeOfReview }) => {
    checkAuth(user);
    const reviewedCard = await findOne(createFilter({ _id: id }, user));
    if (!reviewedCard) {
      return null;
    }
    const update = rescheduleCard({
      due: reviewedCard.due,
      ease: reviewedCard.ease,
      consecutiveCorrectAnswers: reviewedCard.consecutiveCorrectAnswers,
      answer
    });
    return Card.findByIdAndUpdate(createFilter({ _id: id }, user), update, {
      new: true
    });
  };

  return {
    find,
    findOne,
    review
  };
}

module.exports = generateCardModel;
