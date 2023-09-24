import * as _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { Asset, AssetCategory, AssetData } from '../types/assetTypes';
import * as DB from './db';

export const createAsset = async (data: AssetData): Promise<string> => {
  try {
    const { name, type, path } = data;
    const uuid = uuidv4();
    const values = { asset_id: uuid, name, type, path };
    await DB.knex('assets').insert(values);
    return uuid;
  } catch (err) {
    console.error('Something went wrong during: createAsset');
    console.error(err);
    throw err;
  }
};

export const findAssetById = async (
  assetId: string,
): Promise<Asset | undefined> => {
  try {
    const res: Asset | undefined = await DB.knex('assets').first().where({ asset_id: assetId });
    if (res !== undefined) {
      const categories = await findAssetCategoriesById(assetId);
      res.categoryIds = categories.map(category => category.category_id);
    }
    return res;
  } catch (err) {
    console.error('Something went wrong during: findAssetById');
    console.error(err);
    throw err;
  }
};

export const findAssetCategoriesById = async (
  assetId: string,
): Promise<AssetCategory[]> => {
  try {
    const res = await DB
      .knex('assets_categories')
      .where({ asset_id: assetId });
    return res;
  } catch (err) {
    console.error('Something went wrong during: findAssetCategoriesById');
    console.error(err);
    throw err;
  }
};

export const findAllAssets = async (): Promise<Asset[]> => {
  try {
    const res = await DB.knex('assets')
      .leftJoin('assets_categories', 'assets.asset_id', 'assets_categories.asset_id')
      .groupBy('assets.asset_id', 'assets_categories.asset_id', 'assets_categories.category_id')
      .then(assets => {
        const promises = assets.map(asset => {
          return DB.knex('assets_categories')
            .where('asset_id', asset.asset_id)
            .pluck('category_id')
            .then(categoryIds => {
              asset.categoryIds = categoryIds;
              return asset;
            });
        });
        return Promise.all(promises);
      })
      .then(results => _.uniqBy(results, 'asset_id'));
    return res;
  } catch (err) {
    console.error('Something went wrong during: findAllAssets');
    console.error(err);
    throw err;
  }
};

export const deleteAssetById = async (assetId: string): Promise<void> => {
  try {
    await DB.knex('assets').where({ asset_id: assetId }).delete();
  } catch (err) {
    console.error('Something went wrong during: deleteAssetById');
    console.error(err);
    throw err;
  }
};

export const assignCategoriesToAsset = async (assetId: string, categoryIds: string[]) => {
  try {
    await DB.knex.transaction((trx) => {
      const queries: any[] = [];
      categoryIds.map(categoryId => {
        const query = DB.knex('assets_categories').insert({ asset_id: assetId, category_id: categoryId }).transacting(trx);
        queries.push(query);
      });
      Promise.all(queries).then(trx.commit).catch(trx.rollback);
    });
  } catch (err) {
    console.error('Something went wrong during: assignCategoriesToAsset');
    console.error(err);
    throw err;
  }
}
