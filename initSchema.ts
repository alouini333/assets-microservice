import { getDbClient } from './getDbClient'

const client = getDbClient()

async function createSchema() {
  try {
    await client.connect()

    // Define your schema creation queries here
    const schemaQueries = [
      `CREATE TYPE asset_type AS ENUM ('video', 'document', 'image')`,
      'CREATE TABLE IF NOT EXISTS assets (asset_id UUID PRIMARY KEY, name VARCHAR(50), "type" asset_type, path TEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)',
      'CREATE TABLE IF NOT EXISTS assets_categories(asset_id UUID REFERENCES assets(asset_id), category_id UUID, PRIMARY KEY (asset_id, category_id))'
    ];

    for (const query of schemaQueries) {
      await client.query(query)
      console.log('Executed query:', query)
    }

    console.log('Schema creation completed successfully!')
  } catch (error) {
    console.error('Error creating schema:', error)
  } finally {
    await client.end()
  }
}

createSchema()
