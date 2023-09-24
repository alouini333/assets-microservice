/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async knex => {
    return knex.schema.createTable('assets_categories', (table) => {
      table.uuid('asset_id');
      table.uuid('category_id');
      table.foreign('asset_id').references('asset_id').inTable('assets')
      table.primary(['asset_id', 'category_id']);
    })
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = async knex => {
      return knex.schema.dropTable('assets_categories');
  };