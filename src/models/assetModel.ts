import { v4 as uuidv4 } from 'uuid';
import { Asset, AssetData } from '../types/assetTypes';
import { getDbClient } from '../../getDbClient';

const client = getDbClient();

export const createAsset = async (data: AssetData): Promise<string> => {
    try {
        const { name, type, path } = data;
        const uuid = uuidv4();
        await client.connect();
        const query = `
            INSERT INTO assets(asset_id, name, type, path) 
            VALUES($1, $2, $3, $4)
        `;
        const values = [uuid, name, type, path];
        await client.query(query, values);
        return uuid;
    } catch (err) {
        console.error('Something went wrong during: createAsset')
        console.error(err);
        throw err;
    }
}

export const findAssetById = async (assetId: string): Promise<Asset | undefined>  => {
    try {
        await client.connect();
        const query = `
             SELECT * FROM assets WHERE asset_id = $1
        `;
        const values = [assetId];
        const data = await client.query(query, values);
        return data.rows[0];
    } catch (err) {
        console.error('Something went wrong during: findAssetById')
        console.error(err);
        throw err;
    }
}


export const findAllAssets = async (): Promise<Asset[]>  => {
    try {
        await client.connect();
        const query = `
             SELECT * FROM assets orderby created_at desc
        `;
        const data = await client.query(query);
        return data.rows;
    } catch (err) {
        console.error('Something went wrong during: findAllAssets')
        console.error(err);
        throw err;
    }
}


export const deleteAssetById = async (assetId: string): Promise<void>  => {
    try {
        await client.connect();
        const query = `
             DELETE FROM assets WHERE asset_id = $1
        `;
        const values = [assetId];
        await client.query(query, values);
    } catch (err) {
        console.error('Something went wrong during: deleteAssetById')
        console.error(err);
        throw err;
    }
}