import { AssetNotFound } from '../errors/AssetNotFound';
import * as AssetModel from '../models/assetModel';
import { Asset, AssetData } from '../types/assetTypes';
import { store } from '../utils/storage';

export const createAssetService = async (data: Omit<AssetData, "path">, contentBase64: string): Promise<string> => {
    try {
        // Simulate the upload of the asset to one of the system files
        const path = store(contentBase64);
        const assetId = await AssetModel.createAsset({ ...data, path });
        return assetId;
    } catch (err) {
        console.error(err);
        throw err;
    }
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
    try {
        await AssetModel.deleteAssetById(assetId);
    } catch (err) {
        console.error(err);
        throw err;
    }
}

