require('dotenv').config()

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  test: {
    client: 'sqlite3',
    connection: {
      filename: ':memory:',
    },
    useNullAsDefault: true
  },
  development: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '', 10),
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    }
  }
};
