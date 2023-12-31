import Joi from 'joi';

// Schema for creating an asset
export const createAssetSchema = Joi.object({
  name: Joi.string().required(),
  type: Joi.string().valid('image', 'video', 'document').required(),
  content: Joi.string().required(),
  categories: Joi.array().items(Joi.string().guid({ version: 'uuidv4' }).required()).min(1).required()
});

// Schema to get an asset
export const assetIdSchema = Joi.object({
  id: Joi.string().guid({ version: 'uuidv4' }).required(),
});
