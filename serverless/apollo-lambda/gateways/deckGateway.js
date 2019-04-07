const db = require('../db');
const { path } = require('../lib/functionalUtils');

const getResults = path(['rows']);
const getSingleResult = path(['rows', 0]);

const TABLE = 'decks';
const COLUMNS = [
  'id',
  'owner',
  'name',
  'slug',
  'description',
  'created_at',
  'updated_at'
];
const ALL_COLUMNS = COLUMNS.join(', ');

class DeckGateway {
  constructor(userId) {
    this.userId = userId;
  }

  insert(deck) {
    const statement =
      `insert into ${TABLE} ` +
      `(owner, name, slug, description, created_at, updated_at) values ` +
      `($1, $2, $3, $4, now(), now()) ` +
      `returning ${ALL_COLUMNS}`;
    const values = [this.userId, deck.name, deck.slug, deck.description];
    return db.query(statement, values).then(getSingleResult);
  }

  findAll() {
    const statement =
      `select ${ALL_COLUMNS} from ${TABLE} ` + `where owner = $1`;
    return db.query(statement, [this.userId]).then(getResults);
  }

  findOneById(id) {
    const statement =
      `select ${ALL_COLUMNS} from ${TABLE} ` + `where owner = $1 and id = $2`;
    return db.query(statement, [this.userId, id]).then(getSingleResult);
  }

  findOneBySlug(slug) {
    const statement =
      `select ${ALL_COLUMNS} from ${TABLE} ` + `where owner = $1 and slug = $2`;
    return db.query(statement, [this.userId, slug]).then(getSingleResult);
  }

  findByName(name) {
    const statement =
      `select ${ALL_COLUMNS} from ${TABLE} ` +
      `where owner = $1 and name like $2`;
    return db.query(statement, [this.userId, `%${name}%`]).then(getResults);
  }

  findSimilarSlugs(slug) {
    const statement =
      `select slug from ${TABLE} ` + `where owner = $1 and slug like $2`;
    return db.query(statement, [this.userId, slug + '%']).then(getResults);
  }

  findByIdAndUpdate(id, changes) {
    const { setStatements, values } = COLUMNS.reduce(
      (update, column, index) => {
        if (changes.hasOwnProperty(column)) {
          update.setStatements.push(`${column} = $${index + 1}`);
          update.values.push(changes[column]);
        }
        return update;
      },
      { setStatements: [], values: [] }
    );

    if (setStatements.length === 0) {
      return;
    }
    setStatements.push('updated_at = now()');
    values.push(this.userId);
    values.push(id);
    const statement =
      `update ${TABLE} set ${setStatements.join()}` +
      `where owner=$${values.length - 1} and slug=$${values.length}`;
    return db.query(statement, values);
  }

  findByOwnerAndSlugAndUpdate(slug, changes) {
    const { setStatements, values } = COLUMNS.reduce(
      (update, column, index) => {
        if (changes.hasOwnProperty(column)) {
          update.setStatements.push(`${column} = $${index + 1}`);
          update.values.push(changes[column]);
        }
        return update;
      },
      { setStatements: [], values: [] }
    );

    if (setStatements.length === 0) {
      return;
    }
    setStatements.push('updated_at = now()');
    values.push(this.userId);
    values.push(slug);
    const statement =
      `update ${TABLE} set ${setStatements.join()}` +
      `where owner=$${values.length - 1} and slug=$${values.length}`;
    return db.query(statement, values);
  }
}

module.exports = DeckGateway;
