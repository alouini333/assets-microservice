import { AssetNotFound } from '../errors/AssetNotFound';
import * as AssetModel from '../models/assetModel';
import * as CategoryModel from '../models/categoryModel';
import { AssetData, AssetWithCategories } from '../types/assetTypes';
import { store } from '../utils/storage';

export const createAssetService = async (
  data: Omit<AssetData, 'path'>,
  contentBase64: string,
  categoryIds: string[]
): Promise<string> => {
  try {
    // Simulate the upload of the asset to one of the system files
    const path = store(contentBase64, data.type);
    const assetId = await AssetModel.createAsset({ ...data, path });
    await AssetModel.assignCategoriesToAsset(assetId, categoryIds);
    return assetId;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getAssetByIdService = async (assetId: string): Promise<> => {
  try {
    const asset = await AssetModel.findAssetById(assetId);
    if (asset === undefined) {
      throw new AssetNotFound();
    }
    const allCategories = await CategoryModel.findAllCategories();
    const categories = allCategories.filter(category => {
      return asset.categoryIds.indexOf(category.uuid) !== -1;
    });
    const {
      asset_id,
      name,
      type,
      path
    } = asset;
    return {
      asset_id,
      name,
      type,
      path,
      categories
    };
  } catch (err) {
    throw err;
  }
};

export const getAllAssetsService = async (): Promise<AssetWithCategories[]> => {
  try {
    const assets = await AssetModel.findAllAssets();
    const categories = await CategoryModel.findAllCategories();
    const assetsWithCategories: AssetWithCategories[] = assets.map(asset => {
      const assetCategories = categories.filter(category => {
        return asset.categoryIds.indexOf(category.category_id) !== -1;
      });
      const {
        asset_id,
        name,
        type,
        path
      } = asset;
      return {
        asset_id,
        name,
        type,
        path,
        categories: assetCategories
      }
    })
    return assetsWithCategories;
  } catch (err) {
    throw err;
  }
};

export const deleteAssetService = async (assetId: string): Promise<void> => {
  try {
    await AssetModel.deleteAssetById(assetId);
  } catch (err) {
    console.error(err);
    throw err;
  }
};
