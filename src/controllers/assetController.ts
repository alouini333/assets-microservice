import { NextFunction, Request, Response } from 'express';
import * as assetService from '../services/assetService';

export const getAssets = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const assets = await assetService.getAllAssetsService();
    res.json({
        status: 'success',
        data: assets
    });
  } catch (err) {
    next(err);
  }
};

export const getAsset = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const asset = await assetService.getAssetByIdService(id);
    res.json({
        status: 'success',
        data: asset
    });
  } catch (err) {
    next(err);
  }
};

export const deleteAsset = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
        const { id } = req.params;
        await assetService.deleteAssetService(id);
        res.json({
            status: 'success',
            message: 'Asset deleted with success'
        });
    } catch (err) {
        next(err);
      }
  }


  export const createAsset = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
        const { id } = req.params;
        await assetService.deleteAssetService(id);
        res.json({
            status: 'success',
            message: 'Asset deleted with success'
        });
    } catch (err) {
        next(err);
      }
  }

