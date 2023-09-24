import dotenv from 'dotenv'

dotenv.config()

const knex = require('knex')({
    client: 'pg',
    connection: {
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT || ''),
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
    },
    pool: {
      min: 2,
      max: 10
    }
})

export { knex }