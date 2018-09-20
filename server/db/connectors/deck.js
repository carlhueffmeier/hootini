const mongoose = require('mongoose');
const Deck = mongoose.model('Deck');
const { checkAuth, addUserInfo, createFilter } = require('../authHelper');

// ****
// Common Aggregation Stages
// Add all cards that belong to the deck inside an array
const addCardsStage = ({ as = 'cards' } = {}) => ({
  $lookup: {
    from: 'cards',
    localField: '_id',
    foreignField: 'deck',
    as
  }
});

const addDueCardsStage = ({ input = '$cards', output = 'cardsDue' } = {}) => ({
  // Add a field 'cardsDue' that holds an array of the due cards
  $addFields: {
    [output]: {
      $filter: {
        input,
        as: 'card',
        cond: {
          $or: [
            // 'Due cards' have either a due date in the past
            { $lte: ['$card.due', new Date()] },
            // Or they have no due date at all
            { $ne: [{ $type: '$card.due' }, 'date'] }
          ]
        }
      }
    }
  }
});

const replaceArrayWithOwnSizeStage = arrayKeys => ({
  $addFields: arrayKeys.reduce(
    (stage, key) => ({
      ...stage,
      [key]: { $size: `$${key}` }
    }),
    {}
  )
});

const populateNoteTypeStages = [
  {
    $lookup: {
      from: 'notetypes',
      let: { lastNoteType: '$lastNoteType' },
      pipeline: [
        {
          $match: {
            $expr: {
              $eq: ['$_id', '$$lastNoteType']
            }
          }
        },
        {
          $addFields: {
            id: '$_id'
          }
        }
      ],
      as: 'lastNoteType'
    }
  },
  {
    $addFields: {
      lastNoteType: {
        $arrayElemAt: ['$lastNoteType', 0]
      }
    }
  }
];

function generateDeckModel({ user } = {}) {
  const find = (where = {}) => {
    checkAuth(user);
    return Deck.aggregate([
      { $match: createFilter(where, user) },
      addCardsStage({ as: 'cardsTotal' }),
      addDueCardsStage({ input: '$cardsTotal', output: 'cardsDue' }),
      replaceArrayWithOwnSizeStage(['cardsTotal', 'cardsDue']),
      ...populateNoteTypeStages,
      // We also need to add the id field for GraphQL
      { $addFields: { id: '$_id' } }
    ]);
  };

  const findOne = async where => {
    checkAuth(user);
    const result = await Deck.aggregate([
      { $match: createFilter(where, user) },
      { $limit: 1 },
      addCardsStage({ as: 'cardsTotal' }),
      addDueCardsStage({ input: '$cardsTotal', output: 'cardsDue' }),
      replaceArrayWithOwnSizeStage(['cardsTotal', 'cardsDue']),
      ...populateNoteTypeStages,
      // We also need to add the id field for GraphQL
      { $addFields: { id: '$_id' } }
    ]);
    return result.length > 0 ? result[0] : null;
  };

  const create = input => {
    checkAuth(user);
    return new Deck({ ...input, ...addUserInfo(user) }).save();
  };

  return {
    find,
    findOne,
    create
  };
}

module.exports = generateDeckModel;
