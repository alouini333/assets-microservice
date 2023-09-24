/// <reference types="jest" />
require('dotenv').config({ path: '.env.test' });
import { AssetData } from "../../src/types/assetTypes";
import { knex } from '../../src/models/db';
import { createAssetService, deleteAssetService, getAllAssetsService, getAssetByIdService } from "../../src/services/assetService";


describe('assetService', () => {
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
    it('assetService: Should get all assets', async () => {
        const assets = await getAllAssetsService()
        expect(assets).toHaveLength(4);
        expect(Array.isArray(assets)).toBeTruthy();
    });
    it('assetService: Should get an asset when id is correct', async () => {
        const asset = await getAssetByIdService('57bd4af8-3401-40da-99e9-86c6bc3db996');
        expect(asset).toBeDefined();
        expect(asset?.name).toBe('asset 1');
    });
    it('assetService: Should throw an error when id does not exists', async () => {
        await expect(getAssetByIdService('uuid-does-not-exist')).rejects.toThrow('Asset not found');
    });
    it('assetService: Should create a new asset', async () => {
        const newAsset: Omit<AssetData, 'path'> = {
            name: 'new asset',
            type: 'video'
        }
        const categories = [
            ''
        ]
        const uuid = await createAssetService(newAsset, 'content', categories);
        expect(uuid).toBeDefined();
        expect(typeof uuid === 'string').toBeTruthy();
    });
    it('assetService: Should delete an asset', async () => {
        // delete asset 1
        await deleteAssetService('57bd4af8-3401-40da-99e9-86c6bc3db996');
        await expect(getAssetByIdService('57bd4af8-3401-40da-99e9-86c6bc3db996')).rejects.toThrow('Asset not found');
    })
})