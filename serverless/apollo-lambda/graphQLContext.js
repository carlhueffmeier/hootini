const { AuthenticationError } = require('apollo-server-lambda');
const { getUserFromRequest } = require('./lib/utils');
const UserService = require('./services/userService');
const DeckService = require('./services/deckService');
const NoteService = require('./services/noteService');
const CardService = require('./services/cardService');
const NoteTypeService = require('./services/noteTypeService');

function createContext({ event, context }) {
  // Validate token if present
  let user;
  try {
    user = getUserFromRequest(event);
  } catch (error) {
    throw new AuthenticationError(error.message);
  }

  return {
    headers: event.headers,
    functionName: context.functionName,
    event,
    context,
    user,
    services: {
      user: new UserService(user),
      deck: new DeckService(user),
      note: new NoteService(user),
      card: new CardService(user),
      noteType: new NoteTypeService(user)
    }
  };
}

exports.createContext = createContext;