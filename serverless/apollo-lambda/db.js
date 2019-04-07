const { Pool } = require('pg');

const dbConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

const pool = new Pool(dbConfig);

async function query(text, values) {
  console.log('| DB | Executing query: ', text, '\nvalues: ', values);
  const result = await pool.query(text, values);
  console.log('| DB | Received result: ', JSON.stringify(result, null, 2));
  return result;
}

exports.query = query;
