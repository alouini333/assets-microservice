import dotenv from 'dotenv';
import knexModule from 'knex';

dotenv.config();

const isTesting = process.env.NODE_ENV === 'test';

const config = {
  client: isTesting ? 'sqlite3' : 'pg',
  connection: isTesting
    ? {
        filename: ':memory:',
      }
    : {
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT || '', 10),
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
      },
  pool: isTesting ? { min: 1, max: 1 } : { min: 2, max: 10 }, // For SQLite, use a single connection
  useNullAsDefault: isTesting, // This is needed for SQLite
};

const knex = knexModule(config);

export { knex };
