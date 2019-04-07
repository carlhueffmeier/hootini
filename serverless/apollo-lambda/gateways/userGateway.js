const db = require('../db');
const { path } = require('../lib/functionalUtils');

const getSingleResult = path(['rows', 0]);

const COLUMNS = ['id', 'email', 'password', 'name', 'created_at', 'updated_at'];
const ALL_COLUMNS = COLUMNS.join(', ');
const TABLE = 'users';

class UserGateway {
  insert(user) {
    const statement =
      `insert into ${TABLE} ` +
      `(email, password, name, created_at, updated_at) values ` +
      `($1, $2, $3, now(), now()) ` +
      `returning ${ALL_COLUMNS}`;
    const values = [user.email, user.password, user.name];
    return db.query(statement, values).then(getSingleResult);
  }

  findOneById(id) {
    const statement = `select ${ALL_COLUMNS} from ${TABLE} where id = $1`;
    return db.query(statement, [id]).then(getSingleResult);
  }

  findOneByEmail(email) {
    const statement = `select ${ALL_COLUMNS} from ${TABLE} where email = $1`;
    return db.query(statement, [email]).then(getSingleResult);
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
    values.push(id);
    setStatements.push('updated_at = now()');
    const statement =
      `update ${TABLE} set ${setStatements.join()}` +
      `where id=$${values.length}`;
    return db.query(statement, values);
  }
}

module.exports = UserGateway;
