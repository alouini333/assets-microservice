/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('assets').del()
  await knex('assets').insert([
    {asset_id: '57bd4af8-3401-40da-99e9-86c6bc3db996', name: 'asset 1', type: 'image', path: 'path_to_asset1.png'},
    {asset_id: '4219e893-dfee-4c49-b081-5a8fca4eb771', name: 'asset 2', type: 'image', path: 'path_to_asset1.png'},
    {asset_id: '6276ceaf-ac9c-4051-a727-9825665d3b0f', name: 'asset 3', type: 'image', path: 'path_to_asset1.png'},
    {asset_id: '3cc6b998-db6d-4e35-8ac8-d533f11b03ae', name: 'asset 4', type: 'image', path: 'path_to_asset1.png'}
  ]);
  await knex('assets_categories').insert([
    // Asset 1 categories
    {asset_id: '57bd4af8-3401-40da-99e9-86c6bc3db996', category_id: '27b74e98-9e40-4118-8263-804f54f25292'},
    {asset_id: '57bd4af8-3401-40da-99e9-86c6bc3db996', category_id: '399397e4-998e-4f81-955a-17a4b1399782'},
    // Asset 2 categories
    {asset_id: '4219e893-dfee-4c49-b081-5a8fca4eb771', category_id: '0c373ed2-1a92-44b7-9dcb-1024f16b38fb'},
    // Asset 3 categories
    {asset_id: '6276ceaf-ac9c-4051-a727-9825665d3b0f', category_id: '72f76ba1-9f36-4614-9568-a225a96a11b9'},
    // Asset 4 categories
    {asset_id: '3cc6b998-db6d-4e35-8ac8-d533f11b03ae', category_id: '72f76ba1-9f36-4614-9568-a225a96a11b9'}
  ]);
};
