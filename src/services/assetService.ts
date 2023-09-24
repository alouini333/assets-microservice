import { AssetNotFound } from 'src/errors/AssetNotFound';
import * as AssetModel from '../models/assetModel';
import { Asset } from 'src/types/assetTypes';

export const createAssetService = async (data: Partial<Asset>): Promise<string> => {
    if (!data.name || !data.type || !data.path) {
        throw new Error('Asset data is incomplete');
    }
    
    // You can add more validations or business logic here

    return await AssetModel.createAsset(data);
}

export const getAssetByIdService = async (assetId: string): Promise<Asset> => {
    try {
        const asset = await AssetModel.findAssetById(assetId);
        if (asset === undefined) {
            throw new AssetNotFound()
        }
        return asset;
    } catch (err) {
        throw err;
    }
}

export const getAllAssetsService = async (): Promise<Asset[]> => {
    try {
        const assets = await await AssetModel.findAllAssets();;
        return assets;
    } catch (err) {
        throw err;
    }
}

export const deleteAssetService = async (assetId: string): Promise<void> => {
    return await AssetModel.deleteAssetById(assetId);
}

