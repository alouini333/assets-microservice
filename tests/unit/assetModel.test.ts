require('dotenv').config({ path: '.env.test' });
import { createAsset, deleteAssetById, findAllAssets, findAssetById } from "../../src/models/assetModel"
import { AssetData } from "../../src/types/assetTypes";
import { knex } from '../../src/models/db';


describe('assetModel', () => {
    beforeEach(async () => {
        // Run migrations to set up in-memory db schema before each test
        await knex.migrate.latest();
        await knex.seed.run();
    });
    
    afterEach(async () => {
        // Rollback migrations after each test to ensure a clean slate
        await knex.migrate.rollback();
    });
    
    afterAll(async () => {
        // Destroy the connection after all tests have run
        await knex.destroy();
    });
    it('assetModel: Should find all assets', async () => {
        const assets = await findAllAssets()
        expect(assets).toHaveLength(4);
        expect(Array.isArray(assets)).toBeTruthy();
    });
    it('assetModel: Should find an asset when id is correct', async () => {
        const asset = await findAssetById('57bd4af8-3401-40da-99e9-86c6bc3db996');
        expect(asset).toBeDefined();
        expect(asset?.name).toBe('asset 1');
    });
    it('assetModel: Should return undefined when id does not exists', async () => {
        const asset = await findAssetById('uuid-does-not-exist');
        expect(asset).toBeUndefined();
    });
    it('assetModel: Should create a new asset', async () => {
        const newAsset: AssetData = {
            name: 'new asset',
            type: 'video',
            path: 'path_to_new_asset'
        }
        const uuid = await createAsset(newAsset);
        expect(uuid).toBeDefined();
        expect(typeof uuid === 'string').toBeTruthy();
    });
    it('assetModel: Should delete an asset', async () => {
        // delete asset 1
        await deleteAssetById('57bd4af8-3401-40da-99e9-86c6bc3db996');
        const asset = await findAssetById('57bd4af8-3401-40da-99e9-86c6bc3db996');
        expect(asset).toBeUndefined();
    })
})