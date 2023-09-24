/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async knex => {
  return knex.schema.createTable('assets', (table) => {
    table.uuid('asset_id', { primaryKey: true });
    table.string('name');
    table.enum('type', ['image', 'video', 'document']);
    table.string('path');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async knex => {
    return knex.schema.dropTable('assets');
};
