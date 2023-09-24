import { v4 as uuidv4 } from 'uuid';
import { Asset, AssetData } from '../types/assetTypes';
import * as DB from './db';

export const createAsset = async (data: AssetData): Promise<string> => {
    try {
        const { name, type, path } = data;
        const uuid = uuidv4();
        const values = {asset_id: uuid, name, type, path};
        await DB.knex('assets').insert(values);
        return uuid;
    } catch (err) {
        console.error('Something went wrong during: createAsset')
        console.error(err);
        throw err;
    }
}

export const findAssetById = async (assetId: string): Promise<Asset | undefined>  => {
    try {
        const res = await DB.knex('assets').first().where({ asset_id: assetId });
        return res;
    } catch (err) {
        console.error('Something went wrong during: findAssetById')
        console.error(err);
        throw err;
    }
}


export const findAllAssets = async (): Promise<Asset[]>  => {
    try {
        const res = await DB.knex('assets');
        return res;
    } catch (err) {
        console.error('Something went wrong during: findAllAssets')
        console.error(err);
        throw err;
    }
}


export const deleteAssetById = async (assetId: string): Promise<void>  => {
    try {
        await DB.knex('assets').where({ asset_id: assetId }).delete();
    } catch (err) {
        console.error('Something went wrong during: deleteAssetById')
        console.error(err);
        throw err;
    }
}