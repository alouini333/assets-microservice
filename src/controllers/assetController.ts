import { NextFunction, Request, Response } from 'express';
import * as assetService from '../services/assetService';
import { AssetData } from '@/types/assetTypes';

export const getAssets = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const assets = await assetService.getAllAssetsService();
    res.status(200).json({
      status: 'success',
      data: assets,
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
    res.status(200).json({
      status: 'success',
      data: asset,
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
    await assetService.getAssetByIdService(id);
    await assetService.deleteAssetService(id);
    res.status(200).json({
      status: 'success',
      message: 'Asset deleted with success',
    });
  } catch (err) {
    next(err);
  }
};

export const createAsset = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data: Omit<AssetData, 'path'> = {
      name: req.body.name,
      type: req.body.type,
    };
    const content: string = req.body.content;
    await assetService.createAssetService(data, content);
    res.status(201).json({
      status: 'success',
      message: 'Asset created with success',
    });
  } catch (err) {
    next(err);
  }
};
